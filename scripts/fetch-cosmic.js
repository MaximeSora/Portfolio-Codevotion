/**
 * fetch-cosmic.js
 *
 * Fetches case study data from the Cosmic workspace API and writes it to
 * src/data/projects.json with blocks in cosmic-blocks format.
 *
 * If the Cosmic API is unreachable, falls back to converting the existing
 * legacy Notion blocks in projects.json to cosmic-blocks format locally
 * (same logic as cosmic-workspace's convertLegacyNotionBlocksToPortfolioDocument).
 *
 * Usage:
 *   node scripts/fetch-cosmic.js
 *
 * Environment:
 *   COSMIC_API_URL  – base URL of the Cosmic workspace (default: https://cosmic-workspace.vercel.app)
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PROJECTS_JSON = resolve(ROOT, 'src/data/projects.json');
const COSMIC_API_URL = process.env.COSMIC_API_URL || 'https://cosmic-workspace.vercel.app';

// ── Helpers ──────────────────────────────────────────────

let idCounter = 0;
function makeId(prefix) {
  idCounter++;
  return `${prefix}-${Date.now()}-${idCounter}-${Math.random().toString(36).slice(2, 6)}`;
}

function richTextToPlain(items = []) {
  return items.map(item => item?.plain_text ?? '').join('').trim();
}

function getLegacyBlockText(block) {
  if (!block?.type) return '';
  if (block.type === 'callout') {
    return richTextToPlain(block.callout?.rich_text ?? []);
  }
  if (block.type === 'toggle') {
    return richTextToPlain(block.toggle?.rich_text ?? []);
  }
  const payload = block[block.type];
  return richTextToPlain(payload?.rich_text ?? []);
}

function flattenLegacyBlocks(blocks = []) {
  const lines = [];
  for (const block of blocks) {
    const text = getLegacyBlockText(block);
    if (block.type === 'heading_2' || block.type === 'heading_3') {
      if (text) lines.push(text.toUpperCase());
    } else if (block.type === 'bulleted_list_item') {
      if (text) lines.push(`- ${text}`);
    } else if (block.type === 'numbered_list_item') {
      if (text) lines.push(`1. ${text}`);
    } else if (block.type === 'paragraph' || block.type === 'callout') {
      if (text) lines.push(text);
    } else if (block.type === 'toggle') {
      if (text) lines.push(text);
      const childText = flattenLegacyBlocks(block.children ?? []);
      if (childText) lines.push(childText);
    }
  }
  return lines.join('\n\n').trim();
}

// ── Block converters (ported from cosmic-workspace/src/lib/portfolio-blocks.ts) ──

function convertLegacyColumnList(block) {
  const columns = (block.children ?? []).filter(c => c.type === 'column');
  const items = columns.map((column, index) => {
    const children = column.children ?? [];
    const firstHeading = children.find(c => c.type === 'heading_3' || c.type === 'heading_2');
    const paragraphs = children.filter(c => c.type === 'paragraph' || c.type === 'bulleted_list_item');
    const labelFromParagraph = paragraphs[0] ? getLegacyBlockText(paragraphs[0]).replace(/:$/, '') : '';
    const valueBlocks = labelFromParagraph ? paragraphs.slice(1) : paragraphs;
    const value = flattenLegacyBlocks(valueBlocks).replace(/^- /gm, '').trim();

    return {
      label: getLegacyBlockText(firstHeading ?? children[0] ?? {}) || labelFromParagraph || `Column ${index + 1}`,
      value: value || flattenLegacyBlocks(children) || 'To define',
    };
  });

  return { id: String(block.id ?? makeId('facts')), type: 'facts', title: 'Project frame', items };
}

function convertLegacyCallout(block) {
  const icon = block.callout?.icon?.emoji ?? '';
  const text = getLegacyBlockText(block);
  const segments = text.split('|').map(s => s.trim()).filter(Boolean);
  const lower = text.toLowerCase();

  // Before/After pattern
  if (icon === '↔️' || lower.startsWith('before/after') || lower.startsWith('avant/apres') || lower.startsWith('avant/après')) {
    return {
      id: String(block.id ?? makeId('before-after')),
      type: 'beforeAfter',
      title: segments[1] || 'Before / After',
      intro: segments[2] || '',
      beforeLabel: 'Before',
      beforeBody: 'Legacy before visual or initial state',
      afterLabel: 'After',
      afterBody: 'Legacy after visual or target state',
      note: segments.slice(3).join(' - '),
    };
  }

  // Visual placeholder
  if (
    icon === '🖼️' || icon === '🎞️'
    || lower.startsWith('visual placeholder')
    || lower.startsWith('placeholder image')
    || lower.startsWith('motion placeholder')
    || lower.startsWith('placeholder video')
  ) {
    return {
      id: String(block.id ?? makeId('visual')),
      type: 'visual',
      title: segments[1] || 'Visual proof',
      description: segments[2] || text,
      assetUrl: '',
      caption: icon === '🎞️' ? 'Motion placeholder' : 'Visual placeholder',
    };
  }

  // Default: treat as quote/callout
  return {
    id: String(block.id ?? makeId('quote')),
    type: 'quote',
    quote: text,
    attribution: 'Imported note',
    role: icon ? `Callout ${icon}` : 'Callout',
  };
}

function convertLegacyToggle(block) {
  return {
    id: String(block.id ?? makeId('toggle')),
    type: 'toggle',
    title: getLegacyBlockText(block) || 'Details',
    content: flattenLegacyBlocks(block.children ?? []),
  };
}

function convertLegacyNotionBlocks(legacyBlocks, caseStudy) {
  const blocks = [];

  for (let i = 0; i < legacyBlocks.length; i++) {
    const block = legacyBlocks[i];
    if (!block?.type) continue;

    // List items: group consecutive items
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      const style = block.type === 'bulleted_list_item' ? 'bullets' : 'checks';
      const items = [];
      let cursor = i;
      while (cursor < legacyBlocks.length && legacyBlocks[cursor]?.type === block.type) {
        const text = getLegacyBlockText(legacyBlocks[cursor]);
        if (text) items.push(text);
        cursor++;
      }
      blocks.push({
        id: String(block.id ?? makeId('list')),
        type: 'list',
        title: 'Key points',
        style,
        items,
      });
      i = cursor - 1;
      continue;
    }

    // Headings
    if (block.type === 'heading_2' || block.type === 'heading_3') {
      blocks.push({
        id: String(block.id ?? makeId('heading')),
        type: 'heading',
        eyebrow: block.type === 'heading_2' ? 'Section' : 'Subsection',
        title: getLegacyBlockText(block) || 'Section',
      });
      continue;
    }

    // Paragraphs
    if (block.type === 'paragraph') {
      const text = getLegacyBlockText(block);
      if (text) {
        blocks.push({
          id: String(block.id ?? makeId('paragraph')),
          type: 'paragraph',
          content: text,
        });
      }
      continue;
    }

    // Callouts
    if (block.type === 'callout') {
      blocks.push(convertLegacyCallout(block));
      continue;
    }

    // Column lists -> facts
    if (block.type === 'column_list') {
      blocks.push(convertLegacyColumnList(block));
      continue;
    }

    // Toggles
    if (block.type === 'toggle') {
      blocks.push(convertLegacyToggle(block));
      continue;
    }

    // Images
    if (block.type === 'image') {
      const src = block.image?.file?.url ?? block.image?.external?.url ?? '';
      blocks.push({
        id: String(block.id ?? makeId('visual')),
        type: 'visual',
        title: '',
        description: '',
        assetUrl: src,
        caption: richTextToPlain(block.image?.caption ?? []),
      });
      continue;
    }
  }

  // If no blocks converted, build a starter document
  if (blocks.length === 0) {
    return buildStarterDocument(caseStudy);
  }

  return { kind: 'cosmic-blocks', version: 1, blocks };
}

function buildStarterDocument(caseStudy) {
  return {
    kind: 'cosmic-blocks',
    version: 1,
    blocks: [
      { id: makeId('heading'), type: 'heading', eyebrow: 'Overview', title: caseStudy.name },
      { id: makeId('paragraph'), type: 'paragraph', content: caseStudy.headline ?? caseStudy.summary ?? 'Write the core project narrative here.' },
      {
        id: makeId('facts'), type: 'facts', title: 'Project frame',
        items: [
          { label: 'Company', value: caseStudy.company ?? 'To define' },
          { label: 'Year', value: caseStudy.year ?? 'To define' },
          { label: 'Role', value: caseStudy.roleSummary ?? 'To define' },
        ],
      },
      {
        id: makeId('metrics'), type: 'metrics', title: 'Outcome',
        intro: caseStudy.outcomeHighlight ?? 'Add outcome signals here.',
        items: [
          { value: '01', label: caseStudy.impact ?? 'Impact to define' },
        ],
      },
    ],
  };
}

// ── Main ─────────────────────────────────────────────────

async function fetchFromCosmicAPI() {
  const url = `${COSMIC_API_URL}/api/public/portfolio/case-studies`;
  console.log(`🌐 Fetching from Cosmic API: ${url}`);

  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`API returned ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('API returned empty or invalid data');
  }

  console.log(`   Found ${data.length} case studies from Cosmic API`);

  // Map API response to portfolio format
  return data.map(cs => ({
    id: cs.id,
    slug: cs.slug,
    name: cs.name ?? cs.title,
    company: cs.company,
    year: cs.year,
    headline: cs.headline,
    roleSummary: cs.roleSummary,
    outcomeHighlight: cs.outcomeHighlight,
    summary: cs.summary,
    challenge: cs.challenge,
    impact: cs.impact,
    tags: (cs.tags ?? []).map(t => ({ name: t.name, color: t.color })),
    cover: cs.cover,
    blocks: cs.blocks, // Already cosmic-blocks format from API
  }));
}

function convertLocally() {
  console.log(`📂 Reading existing projects.json for local conversion...`);

  const raw = readFileSync(PROJECTS_JSON, 'utf-8');
  const projects = JSON.parse(raw);

  console.log(`   Found ${projects.length} projects`);

  let converted = 0;
  const result = projects.map(project => {
    // Already cosmic-blocks? Keep as-is
    if (project.blocks?.kind === 'cosmic-blocks') {
      console.log(`   ✓ ${project.name} — already cosmic-blocks`);
      return project;
    }

    // Legacy Notion blocks array? Convert
    if (Array.isArray(project.blocks) && project.blocks.length > 0) {
      console.log(`   ↻ ${project.name} — converting ${project.blocks.length} Notion blocks`);
      const document = convertLegacyNotionBlocks(project.blocks, project);
      converted++;
      return { ...project, blocks: document };
    }

    // No blocks? Build starter
    console.log(`   + ${project.name} — building starter document`);
    converted++;
    return { ...project, blocks: buildStarterDocument(project) };
  });

  console.log(`   Converted ${converted} projects to cosmic-blocks format`);
  return result;
}

async function main() {
  let projects;

  // Try Cosmic API first
  try {
    projects = await fetchFromCosmicAPI();
    console.log('✅ Data fetched from Cosmic API');
  } catch (err) {
    console.warn(`⚠️  Cosmic API unavailable: ${err.message}`);
    console.log('   Falling back to local conversion...');
    projects = convertLocally();
  }

  // Write output
  mkdirSync(resolve(ROOT, 'src/data'), { recursive: true });
  writeFileSync(PROJECTS_JSON, JSON.stringify(projects, null, 2), 'utf-8');

  console.log(`\n✅ ${projects.length} projects written to src/data/projects.json`);
  console.log(`   All blocks are now in cosmic-blocks format`);
}

main().catch(err => {
  console.error('❌', err.message);
  process.exit(1);
});
