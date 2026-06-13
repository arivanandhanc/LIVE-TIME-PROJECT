// Generates simple branded PNG icons (no external deps) for the PWA manifest.
// Run with: node scripts/generate-icons.mjs
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

const BG = [66, 96, 137]; // brand-600
const FG = [255, 255, 255];

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function makePng(size, maskable) {
  // Build RGBA pixels: brand background, a white clock face + hands.
  const px = Buffer.alloc(size * size * 4);
  const cx = size / 2;
  const cy = size / 2;
  const pad = maskable ? size * 0.28 : size * 0.18;
  const rFace = size / 2 - pad;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let col = BG;
      if (dist < rFace) {
        // white face
        col = FG;
        // draw hands: a vertical (12) and a horizontal-ish (4 o'clock)
        const onHourHand = Math.abs(dx) < size * 0.018 && dy < 0 && dy > -rFace * 0.62;
        const onMinHand =
          Math.abs(dy - dx * 0.6) < size * 0.018 && dx > 0 && dx < rFace * 0.72 && dy > 0;
        if (onHourHand || onMinHand || dist < size * 0.03) col = BG;
      }
      px[i] = col[0];
      px[i + 1] = col[1];
      px[i + 2] = col[2];
      px[i + 3] = 255;
    }
  }

  // Add filter byte (0) at the start of each scanline.
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    px.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const idat = deflateSync(raw);
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

writeFileSync(join(outDir, 'icon-192.png'), makePng(192, false));
writeFileSync(join(outDir, 'icon-512.png'), makePng(512, false));
writeFileSync(join(outDir, 'maskable-512.png'), makePng(512, true));
console.log('Icons written to public/icons/');
