// Re-encode and downscale images under public/assets so the deployed bundle
// stays light without visible quality loss. Operates in-place. Idempotent.
//
// Run with: node scripts/optimize-images.mjs
//
// After running, also run `node scripts/generate-blurhashes.mjs` so the hash
// map matches the new pixel data (the hashes themselves don't really change,
// but it keeps the data file in sync).

import { readFile, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { optimize as svgoOptimize } from 'svgo';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const PUB = join(ROOT, 'public', 'assets');

// Display sizes (max CSS px the asset is ever rendered at) → target file px
// at ~2x for crisp retina. Quality 80 is the visual sweet spot for webp.
const WEBP_QUALITY = 80;

const tasks = [
  // Hero cards render at 200px desktop / 175px mobile.
  { pattern: 'hero/hero-*.webp', maxWidth: 600 },
  // Backstory polaroids render at 160px.
  { pattern: 'backstory/photo-*.webp', maxWidth: 480 },
  // HappierIntro phones render at 280-360px wide. The originals are 1024×2218
  // PNGs misnamed as .webp — re-encode as true WebP.
  { pattern: 'happier/phone-left.webp', maxWidth: 800 },
  { pattern: 'happier/phone-right.webp', maxWidth: 800 },
  // WhatItsLike photos render at 167-200px.
  { pattern: 'whatitslike/photo-*.webp', maxWidth: 480 },
  // Press cards render at ~360px wide (card width on mobile).
  { pattern: 'press/press-*.webp', maxWidth: 720 },
];

async function expandGlob(pattern) {
  // We only support simple `dir/*name*.webp` patterns. Resolve with readdir.
  const { readdir } = await import('node:fs/promises');
  const [dir, file] = pattern.split('/');
  const entries = await readdir(join(PUB, dir));
  const re = new RegExp(
    '^' + file.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$',
  );
  return entries.filter((n) => re.test(n)).map((n) => ({ rel: `${dir}/${n}`, abs: join(PUB, dir, n) }));
}

async function fileSize(p) {
  return (await stat(p)).size;
}

function fmtBytes(n) {
  if (n > 1024 * 1024) return (n / 1024 / 1024).toFixed(2) + ' MB';
  return (n / 1024).toFixed(1) + ' KB';
}

async function optimizeWebp(absPath, maxWidth) {
  const before = await fileSize(absPath);
  const buf = await sharp(absPath)
    .rotate() // honour EXIF orientation, then strip it
    .resize({ width: maxWidth, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: WEBP_QUALITY, effort: 5 })
    .toBuffer();
  // Only write if smaller; sharp re-encode can occasionally inflate already-tight assets.
  if (buf.length < before) {
    await writeFile(absPath, buf);
    return { before, after: buf.length, written: true };
  }
  return { before, after: before, written: false };
}

async function optimizeOgImage() {
  const abs = join(PUB, 'og-careers.png');
  const before = await fileSize(abs);
  // Twitter/Facebook recommend 1200×630; current source is 2400×1260.
  const buf = await sharp(abs)
    .resize({ width: 1200, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer();
  if (buf.length < before) {
    await writeFile(abs, buf);
    return { before, after: buf.length, written: true };
  }
  return { before, after: before, written: false };
}

async function optimizeSvg(rel) {
  const abs = join(PUB, rel);
  const before = await fileSize(abs);
  const source = await readFile(abs, 'utf8');
  const { data } = svgoOptimize(source, {
    multipass: true,
    plugins: [
      // preset-default in svgo 4 already keeps viewBox by default.
      { name: 'preset-default' },
      // Crunch numeric precision a bit further.
      { name: 'cleanupNumericValues', params: { floatPrecision: 2 } },
    ],
  });
  if (data.length < before) {
    await writeFile(abs, data, 'utf8');
    return { before, after: data.length, written: true };
  }
  return { before, after: before, written: false };
}

const main = async () => {
  let totalBefore = 0;
  let totalAfter = 0;
  const log = (label, { before, after, written }) => {
    totalBefore += before;
    totalAfter += after;
    const delta = before - after;
    const pct = before ? Math.round((delta / before) * 100) : 0;
    console.log(
      `${written ? '✓' : '·'} ${label.padEnd(40)} ${fmtBytes(before).padStart(10)} → ${fmtBytes(after).padStart(10)}  (-${pct}%)`,
    );
  };

  for (const { pattern, maxWidth } of tasks) {
    const files = await expandGlob(pattern);
    for (const { rel, abs } of files) {
      const r = await optimizeWebp(abs, maxWidth);
      log(rel, r);
    }
  }

  log('og-careers.png', await optimizeOgImage());
  log('team/dotted-map.svg', await optimizeSvg('team/dotted-map.svg'));

  console.log(
    `\nTotal: ${fmtBytes(totalBefore)} → ${fmtBytes(totalAfter)}  (saved ${fmtBytes(totalBefore - totalAfter)})`,
  );
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
