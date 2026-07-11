/**
 * One-shot OG image generator. Not part of `pnpm build`.
 *
 * Usage: pnpm generate:og
 *
 * Light theme matching the app chrome: cool paper, black wordmark,
 * yellow brand icon, unofficial line.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outPath = join(root, 'public', 'og.png');
const iconPath = join(root, 'public', 'favicon.png');

const iconPng = await sharp(iconPath).resize(160, 160).png().toBuffer();
const iconB64 = iconPng.toString('base64');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f3f4f6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#wash)"/>
  <rect x="48" y="48" width="1104" height="534" rx="12" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>
  <image href="data:image/png;base64,${iconB64}" x="96" y="120" width="96" height="96"/>
  <text x="96" y="300" font-family="'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="88" font-weight="700" fill="#101828" letter-spacing="-1.5">ohmyhf</text>
  <text x="96" y="368" font-family="'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="28" font-weight="400" fill="#4b5563">The Hugging Face desktop client that should have existed.</text>
  <text x="96" y="520" font-family="'IBM Plex Mono', ui-monospace, Menlo, monospace" font-size="18" font-weight="500" fill="#6a7282" letter-spacing="1">unofficial · open source · v0.0.4</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(outPath, png);
console.log(`Wrote ${outPath} (${png.length} bytes)`);
