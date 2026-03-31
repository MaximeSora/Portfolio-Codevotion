/**
 * download-project-images.js
 *
 * Downloads selected images from old Notion case study pages and saves them
 * locally in public/assets/projects/[slug]/.
 *
 * Images are stored at /assets/projects/[slug]/[filename] — a plain local path.
 * When you move to your own server, upload the same files and update
 * PUBLIC_ASSETS_BASE in this file (or in an env var). Nothing else changes.
 *
 * Usage:
 *   node scripts/download-project-images.js
 *   node scripts/download-project-images.js --dry-run   (lists images, no download)
 *   node scripts/download-project-images.js --apply     (also patches projects.json)
 */

import { Client } from '@notionhq/client';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PROJECTS_JSON = resolve(ROOT, 'src/data/projects.json');

// ── Configuration ──────────────────────────────────────────────────────────────

/**
 * Local public folder where images are saved.
 * Change this if you restructure the project.
 */
const LOCAL_ASSETS_DIR = resolve(ROOT, 'public/assets/projects');

/**
 * URL prefix used in projects.json assetUrl values.
 *
 * On localhost/Vercel:  '/assets/projects'   (default, relative path)
 * On your own server:   'https://cdn.example.com/portfolio/projects'
 *
 * Changing this is the only step needed when you migrate away from local files.
 */
const PUBLIC_ASSETS_BASE = process.env.ASSETS_BASE_URL ?? '/assets/projects';

// ── Notion page IDs (old case studies that contain process images) ─────────────
//
// NOTE: These are the 2024 archived case study pages.
// They must be shared with the "Portfolio Projects" Notion integration to work.
// To share: open the Notion page → Share → invite the integration by name.

const NOTION_PAGES = [
  {
    slug: 'mypowerbox-mobile-app-mv',
    pageId: '22f09244-3b97-4072-88be-00f292cff8f6',
    // Match by URL filename (unique names in this page)
    images: [
      { targetFilename: 'wireframe.png',       matchInUrl: 'wireframe.png' },
      { targetFilename: 'flow.png',             matchInUrl: 'flow.png' },
      { targetFilename: 'concept-workshop.png', matchInUrl: 'concept_workshop.png' },
      { targetFilename: 'mvp-result.png',       matchInUrl: 'Image_from.png' },
    ],
  },
  {
    slug: 'fleetui-web-app-design',
    pageId: 'eefd6d47-2e17-4316-9bcb-45ccb8fdbb1e',
    images: [
      { targetFilename: 'asset-details.png', matchInUrl: 'Asset_details_-_overview.png' },
      { targetFilename: 'map-fleet.png',     matchInUrl: 'Map_Fleet.png' },
      { targetFilename: 'events-log.png',    matchInUrl: 'Events_log.png' },
    ],
  },
  {
    slug: 'citadel-team-mobile-web-app',
    pageId: '32842e09-8249-81a7-b730-f9d524914246',
    // Citadel images are all named "Untitled.png" — match by Notion block UUID instead
    images: [
      { targetFilename: 'audit.png',      matchByBlockId: 'de03414c-ce07-4605-858e-9821a5f6f6cd' },
      { targetFilename: 'benchmark.png',  matchByBlockId: '03abb38e-3e6b-4586-a6a9-f07b8f610d6c' },
      { targetFilename: 'workshop.png',   matchByBlockId: '08b0f078-92d6-42cc-8b90-62feac857aa8' },
      { targetFilename: 'user-tests.png', matchByBlockId: '6345730a-1745-4f7c-b911-5c34c7ca0f3e' },
      { targetFilename: 'mobile-ui.png',  matchByBlockId: 'd3722199-7a50-4aef-aa53-2617adf68929' },
      { targetFilename: 'web-ui.png',     matchByBlockId: '1d27de06-598a-408d-a206-4c69e7bdfc24' },
    ],
  },
  {
    slug: 'citadel-team-design-system-implementation',
    pageId: '32842e09-8249-81e4-b136-dc784a333bee',
    images: [
      { targetFilename: 'ds-audit.png',      matchByBlockId: '2c0f48f6-75c0-41c4-9c3f-89089132d2bf' },
      { targetFilename: 'ds-tracking.png',   matchByBlockId: 'c3d8e947-0283-41c8-be9e-421c05b1f8c4' },
      { targetFilename: 'figma-templates.png', matchByBlockId: 'b660e6a9-59e4-47f5-b0d1-bb97a40428ff' },
      { targetFilename: 'zeroheight.png',    matchByBlockId: 'a8c8ed33-7472-436f-a900-77daa6ff6e06' },
      { targetFilename: 'ds-desktop.png',    matchByBlockId: '8d5451fe-1021-4136-92c4-cb76aa6aa241' },
    ],
  },
];

// ── Mapping: which projects.json block indices get which local image ───────────
// Format: { slug, blockIndex, imageFilename, caption }
const BLOCK_ASSIGNMENTS = [
  // MyPowerbox
  { slug: 'mypowerbox-mobile-app-mv',  blockIndex: 14, imageFilename: 'wireframe.png',       caption: 'Wireframes and initial flows' },
  { slug: 'mypowerbox-mobile-app-mv',  blockIndex: 19, imageFilename: 'concept-workshop.png', caption: 'Brainwriting workshop — ideation session' },
  { slug: 'mypowerbox-mobile-app-mv',  blockIndex: 25, imageFilename: 'flow.png',              caption: 'Redesigned pairing flow' },
  { slug: 'mypowerbox-mobile-app-mv',  blockIndex: 32, imageFilename: 'mvp-result.png',        caption: 'MVP result' },
  // FleetUI
  { slug: 'fleetui-web-app-design',    blockIndex: 14, imageFilename: 'asset-details.png',    caption: 'Asset details screen' },
  { slug: 'fleetui-web-app-design',    blockIndex: 19, imageFilename: 'events-log.png',         caption: 'Events log — existing product state' },
  { slug: 'fleetui-web-app-design',    blockIndex: 31, imageFilename: 'map-fleet.png',          caption: 'Fleet map view' },
  // Citadel App
  { slug: 'citadel-team-mobile-web-app', blockIndex: 17, imageFilename: 'audit.png',       caption: 'Internal audit — UX issues identified' },
  { slug: 'citadel-team-mobile-web-app', blockIndex: 25, imageFilename: 'workshop.png',    caption: 'Ideation workshop (6-to-1 method)' },
  { slug: 'citadel-team-mobile-web-app', blockIndex: 39, imageFilename: 'mobile-ui.png',   caption: 'Final mobile UI — video conference redesign' },
  // Citadel DS
  { slug: 'citadel-team-design-system-implementation', blockIndex: 17, imageFilename: 'ds-audit.png',    caption: 'Design System audit and planning sessions' },
  { slug: 'citadel-team-design-system-implementation', blockIndex: 25, imageFilename: 'ds-tracking.png', caption: 'Component tracking sheet' },
  { slug: 'citadel-team-design-system-implementation', blockIndex: 41, imageFilename: 'zeroheight.png',  caption: 'ZeroHeight documentation' },
];

// ── Notion helpers ─────────────────────────────────────────────────────────────

const notion = new Client({ auth: process.env.NOTION_TOKEN });

/** Recursively fetch all blocks from a Notion page, following has_more pagination. */
async function fetchAllBlocks(blockId, depth = 0) {
  const blocks = [];
  let cursor;
  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    for (const block of res.results) {
      blocks.push(block);
      if (block.has_children && depth < 3) {
        block.children = await fetchAllBlocks(block.id, depth + 1);
      }
    }
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return blocks;
}

/** Walk block tree and collect all image URLs with their filename and block ID. */
function collectImages(blocks, collected = []) {
  for (const block of blocks) {
    if (block.type === 'image') {
      const url = block.image?.file?.url ?? block.image?.external?.url ?? '';
      if (url) {
        const rawPath = url.split('?')[0];
        const parts = rawPath.split('/');
        const filename = decodeURIComponent(parts[parts.length - 1]);
        // blockId: strip dashes to match Notion's UUID format in S3 paths
        const blockId = parts[parts.length - 2]; // S3 UUID before filename
        collected.push({ url, filename, blockId, notionBlockId: block.id });
      }
    }
    if (block.children?.length) {
      collectImages(block.children, collected);
    }
  }
  return collected;
}

// ── Download helper ────────────────────────────────────────────────────────────

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buffer = await res.arrayBuffer();
  writeFileSync(destPath, Buffer.from(buffer));
}

// ── Main ───────────────────────────────────────────────────────────────────────

const DRY_RUN = process.argv.includes('--dry-run');
const APPLY   = process.argv.includes('--apply');

async function main() {
  if (!process.env.NOTION_TOKEN) {
    console.error('❌  NOTION_TOKEN env var is not set. Add it to your .env file.');
    process.exit(1);
  }

  console.log(DRY_RUN ? '🔍  Dry run — no files will be written.\n' : '');

  // Map of { slug -> { targetFilename -> localPath } } for results
  const downloaded = {};

  for (const page of NOTION_PAGES) {
    console.log(`📄  Fetching Notion page for ${page.slug}…`);
    let allImages;
    try {
      const blocks = await fetchAllBlocks(page.pageId);
      allImages = collectImages(blocks);
    } catch (err) {
      console.error(`  ❌  Failed to fetch blocks: ${err.message}`);
      continue;
    }

    console.log(`  Found ${allImages.length} image(s) in page.`);
    downloaded[page.slug] = {};

    for (const { targetFilename, matchInUrl, matchByBlockId } of page.images) {
      const match = matchByBlockId
        ? allImages.find(img => img.blockId === matchByBlockId || img.notionBlockId === matchByBlockId)
        : allImages.find(img => img.filename.toLowerCase() === matchInUrl.toLowerCase());

      if (!match) {
        console.warn(`  ⚠️  Image not found: ${matchInUrl}`);
        continue;
      }

      const destDir  = resolve(LOCAL_ASSETS_DIR, page.slug);
      const destPath = resolve(destDir, targetFilename);
      const publicPath = `${PUBLIC_ASSETS_BASE}/${page.slug}/${targetFilename}`;

      console.log(`  ✅  ${matchInUrl} → ${publicPath}`);
      downloaded[page.slug][targetFilename] = publicPath;

      if (!DRY_RUN) {
        mkdirSync(destDir, { recursive: true });
        try {
          await downloadImage(match.url, destPath);
        } catch (err) {
          console.error(`  ❌  Download failed: ${err.message}`);
          delete downloaded[page.slug][targetFilename];
        }
      }
    }
  }

  // ── Patch projects.json ──────────────────────────────────────────────────────
  if (APPLY && !DRY_RUN) {
    console.log('\n📝  Patching projects.json…');
    const projects = JSON.parse(
      (await import('fs')).readFileSync(PROJECTS_JSON, 'utf8')
    );

    for (const { slug, blockIndex, imageFilename, caption } of BLOCK_ASSIGNMENTS) {
      const proj = projects.find(p => p.slug === slug);
      if (!proj?.blocks?.blocks) continue;

      const localPath = downloaded[slug]?.[imageFilename];
      if (!localPath) {
        console.warn(`  ⚠️  Skipping ${slug}[${blockIndex}] — image not downloaded.`);
        continue;
      }

      const block = proj.blocks.blocks[blockIndex];
      if (!block) {
        console.warn(`  ⚠️  Block index ${blockIndex} not found in ${slug}.`);
        continue;
      }

      block.assetUrl = localPath;
      if (caption) block.caption = caption;
      console.log(`  ✅  ${slug}[${blockIndex}].assetUrl = ${localPath}`);
    }

    writeFileSync(PROJECTS_JSON, JSON.stringify(projects, null, 2) + '\n');
    console.log('\n✅  projects.json updated.');
  } else if (!APPLY) {
    console.log('\n💡  Add --apply to also patch projects.json with the downloaded paths.');
  }

  // ── Summary ──────────────────────────────────────────────────────────────────
  console.log('\n── Summary ──────────────────────────────────────────────────');
  for (const [slug, files] of Object.entries(downloaded)) {
    console.log(`${slug}:`);
    for (const [fn, path] of Object.entries(files)) {
      console.log(`  ${fn} → ${path}`);
    }
  }

  if (DRY_RUN) {
    console.log('\n(Dry run complete — run without --dry-run to download files.)');
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
