import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const content = JSON.parse(readFileSync(new URL('../src/content/contributions.json', import.meta.url), 'utf8'));
const allowed = new Set(['heading', 'paragraph', 'quote', 'formula', 'figure', 'table', 'gallery', 'note']);
const slugs = content.pieces.map(({ slug }) => slug);

if (!content.intro?.title || !content.pieces?.length) throw new Error('Contributions need an intro and at least one piece.');
if (new Set(slugs).size !== slugs.length) throw new Error('Contribution slugs must be unique.');

for (const piece of content.pieces) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(piece.slug)) throw new Error(`Invalid slug: ${piece.slug}`);
  for (const block of piece.blocks || []) {
    if (!allowed.has(block.type)) throw new Error(`Unknown block type: ${block.type}`);
    if (block.type === 'table' && block.rows.some((row) => row.length !== block.headers.length)) throw new Error(`Uneven table in ${piece.slug}`);
    for (const src of [block.src, ...(block.images || []).map((image) => image.src)].filter(Boolean)) {
      if (src.startsWith('/assets/') && !existsSync(fileURLToPath(new URL(`../public${src}`, import.meta.url)))) throw new Error(`Missing asset: ${src}`);
    }
  }
}

console.log(`Checked ${content.pieces.length} contribution page(s).`);
