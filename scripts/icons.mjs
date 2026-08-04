/**
 * Uygulama ikonlarını tek bir kaynaktan üretir: `node scripts/icons.mjs`
 *
 * Logo: gradyan bir kutu içinde geometrik bir "W" ve üstünde iki nokta.
 *   W  → Wort / Wortspiel
 *   ¨  → Almancanın görsel imzası olan umlaut
 * İkisi birlikte "Almanca kelime" fikrini tek bakışta anlatır ve 16 piksele
 * kadar okunaklı kalır.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);
const PUBLIC = new URL("../public/", import.meta.url);
const APP = new URL("../src/app/", import.meta.url);

/**
 * @param {object} o
 * @param {number} [o.radius] köşe yuvarlaklığı (512 birimlik tuvalde)
 * @param {number} [o.scale]  markanın tuvale göre büyüklüğü
 * @param {boolean} [o.bold]  küçük boyutlar için kalınlaştırılmış çizim
 */
function svg({ radius = 112, scale = 0.94, bold = false } = {}) {
  const stroke = bold ? 52 : 43;
  const dot = bold ? 28 : 24;
  const t = `translate(256 256) scale(${scale}) translate(-256 -256)`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="52%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
    <radialGradient id="gloss" cx="0.28" cy="0.12" r="0.9">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="65%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="${radius}" fill="url(#bg)"/>
  <rect width="512" height="512" rx="${radius}" fill="url(#gloss)"/>
  <g transform="${t}" fill="#ffffff">
    <circle cx="224" cy="146" r="${dot}"/>
    <circle cx="288" cy="146" r="${dot}"/>
    <path d="M126 218 L188 392 L256 244 L324 392 L386 218" fill="none" stroke="#ffffff"
          stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;
}

const png = (source, size, file) =>
  sharp(Buffer.from(source))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(new URL(file, PUBLIC).pathname);

await mkdir(PUBLIC, { recursive: true });

const rounded = svg();
// iOS ve maskable ikonlar tuvali kendileri kırpar; arka plan tam dolu olmalı.
const square = svg({ radius: 0, scale: 0.92 });
const maskable = svg({ radius: 0, scale: 0.78 });
const small = svg({ radius: 96, scale: 1.16, bold: true });

await Promise.all([
  png(rounded, 512, "icon-512.png"),
  png(rounded, 192, "icon-192.png"),
  png(square, 180, "apple-touch-icon.png"),
  png(maskable, 512, "icon-maskable-512.png"),
  png(small, 48, "favicon-48.png"),
  png(small, 32, "favicon-32.png"),
  png(small, 16, "favicon-16.png"),
  writeFile(new URL("icon.svg", APP), `${rounded}\n`),
]);

// Çok boyutlu favicon.ico — eski tarayıcılar ve tarayıcı sekmesi için.
await run("convert", [
  new URL("favicon-16.png", PUBLIC).pathname,
  new URL("favicon-32.png", PUBLIC).pathname,
  new URL("favicon-48.png", PUBLIC).pathname,
  new URL("favicon.ico", PUBLIC).pathname,
]);

console.log("İkonlar üretildi.");
