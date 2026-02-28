import { Client } from '@notionhq/client';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Fetch all blocks of a page, recursively for children
async function fetchBlocks(blockId) {
  const blocks = [];
  let cursor;

  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(...res.results);
    cursor = res.next_cursor;
  } while (cursor);

  for (const block of blocks) {
    if (block.has_children) {
      block.children = await fetchBlocks(block.id);
    }
  }

  return blocks;
}

function toSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  if (!process.env.NOTION_TOKEN) {
    console.error('❌ NOTION_TOKEN manquant dans .env');
    process.exit(1);
  }

  console.log('🔄 Fetching Case studies from Notion...');

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    sorts: [{ timestamp: 'created_time', direction: 'descending' }],
  });

  const projects = [];

  for (const page of response.results) {
    const name = page.properties.Name?.title?.[0]?.plain_text ?? '';
    const tags = (page.properties.Tags?.multi_select ?? []).map(t => ({
      name: t.name,
      color: t.color,
    }));
    const company = page.properties.Company?.rich_text?.[0]?.plain_text ?? '';
    const year = page.properties.Year?.rich_text?.[0]?.plain_text ?? '';

    const cover =
      page.cover?.external?.url ??
      page.cover?.file?.url ??
      null;

    const slug = toSlug(name);

    console.log(`  → ${name}`);
    const blocks = await fetchBlocks(page.id);

    projects.push({ id: page.id, slug, name, company, year, tags, cover, blocks });
  }

  mkdirSync(resolve(ROOT, 'src/data'), { recursive: true });
  writeFileSync(
    resolve(ROOT, 'src/data/projects.json'),
    JSON.stringify(projects, null, 2),
    'utf-8'
  );

  console.log(`✅ ${projects.length} projets écrits dans src/data/projects.json`);
}

main().catch(err => {
  console.error('❌', err.message);
  process.exit(1);
});
