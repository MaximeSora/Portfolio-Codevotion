import { Client } from '@notionhq/client';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const IMAGES_DIR = resolve(ROOT, 'public/notion-images');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Extract extension from URL (before query string)
function getExt(url) {
  const path = url.split('?')[0];
  const ext = path.split('.').pop().toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext) ? ext : 'jpg';
}

// Download an image and return its local public path, or null on failure
async function downloadImage(url, filename) {
  if (!url) return null;
  mkdirSync(IMAGES_DIR, { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ⚠️  Image download failed (${res.status}): ${filename}`);
      return null;
    }
    const buffer = await res.arrayBuffer();
    writeFileSync(resolve(IMAGES_DIR, filename), Buffer.from(buffer));
    return `/notion-images/${filename}`;
  } catch (err) {
    console.warn(`  ⚠️  Image download error: ${filename} — ${err.message}`);
    return null;
  }
}

// Recursively walk blocks and download every image, replacing S3 URLs with local paths
async function processBlocks(blocks) {
  for (const block of blocks) {
    if (block.type === 'image') {
      const src = block.image?.file?.url ?? block.image?.external?.url;
      if (src) {
        const ext = getExt(src);
        const filename = `${block.id}.${ext}`;
        const localPath = await downloadImage(src, filename);
        if (localPath) {
          if (block.image.file) block.image.file.url = localPath;
          else if (block.image.external) block.image.external.url = localPath;
        }
      }
    }
    if (block.children?.length) {
      await processBlocks(block.children);
    }
  }
}

// Fetch all blocks of a page, recursively
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
    const slug = toSlug(name);

    console.log(`  → ${name}`);

    // Download cover image
    const rawCover = page.cover?.file?.url ?? page.cover?.external?.url ?? null;
    let cover = rawCover;
    if (rawCover) {
      const ext = getExt(rawCover);
      cover = await downloadImage(rawCover, `cover-${page.id}.${ext}`);
    }

    const blocks = await fetchBlocks(page.id);
    await processBlocks(blocks);

    projects.push({ id: page.id, slug, name, company, year, tags, cover, blocks });
  }

  mkdirSync(resolve(ROOT, 'src/data'), { recursive: true });
  writeFileSync(
    resolve(ROOT, 'src/data/projects.json'),
    JSON.stringify(projects, null, 2),
    'utf-8'
  );

  console.log(`✅ ${projects.length} projets écrits dans src/data/projects.json`);
  console.log(`🖼️  Images téléchargées dans public/notion-images/`);
}

main().catch(err => {
  console.error('❌', err.message);
  process.exit(1);
});
