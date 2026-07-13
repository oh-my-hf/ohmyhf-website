/**
 * Build browser-tab / manifest icons: fill transparent pixels with white.
 * Source: public/icon-source.png → public/favicon*.png, apple-touch-icon.png
 *
 * Usage: node scripts/generate-favicon.mjs
 */
import { existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const sourcePath = join(root, 'public', 'icon-source.png');

if (!existsSync(sourcePath)) {
  throw new Error(`Missing ${sourcePath}`);
}

const targets = [
  { file: 'favicon-32.png', size: 32 },
  { file: 'favicon-192.png', size: 192 },
  { file: 'favicon-512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
  // Kept for any code/bookmarks still pointing at the original 512px filename.
  { file: 'favicon.png', size: 512 },
];

for (const { file, size } of targets) {
  const outPath = join(root, 'public', file);
  const png = await sharp(sourcePath)
    .ensureAlpha()
    .resize(size, size)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toBuffer();

  writeFileSync(outPath, png);
  console.log(`Wrote ${outPath} (white-backed, ${size}x${size}, ${png.length} bytes)`);
}
