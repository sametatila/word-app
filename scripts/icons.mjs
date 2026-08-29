/**
 * Uygulama ikonlarını tek kaynaktan üretir: `node scripts/icons.mjs`
 *
 * Kaynak: `scripts/logo-source.png` — maskotun (Erdi) sağa bakan portresinin
 * turuncu app-ikon hâli (marka görseli #6'dan temizlenmiş: siyah kenar +
 * yuvarlak köşe kalıntısı atılmış, düz turuncu içerik). Logo ile maskot AYNI
 * karakter; maskotun tam gövdesi `public/erdi.svg`, logo ise portresi.
 *
 * Kadraj:
 *   - büyük ikonlar (192/512/apple/maskable/logo-mark): #6 çerçevesi (portre).
 *   - favikon 16-48: YÜZE sıkı kırpım — 16 pikselde bile kafa net (yoksa turuncu leke).
 * Yuvarlatma bende: "any" ikonlar rx maskeli, apple/maskable full-bleed (tuvali
 * platform yuvarlıyor/kırpıyor).
 */
import { mkdir } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);
const PUBLIC = new URL("../public/", import.meta.url);
const APP = new URL("../src/app/", import.meta.url);
const SRC = new URL("logo-source.png", import.meta.url);

await mkdir(PUBLIC, { recursive: true });
const content = await sharp(SRC.pathname).resize(1024, 1024).png().toBuffer();
// Favikonlar için yüz-kırpımı (1024² içinden ölçüldü).
const face = await sharp(content).extract({ left: 300, top: 300, width: 600, height: 600 }).png().toBuffer();

const rmask = (s, rx) => Buffer.from(`<svg width="${s}" height="${s}"><rect width="${s}" height="${s}" rx="${rx}" fill="#fff"/></svg>`);
const R = (src, s, rx, file, base = PUBLIC) =>
  sharp(src).resize(s, s).composite([{ input: rmask(s, rx), blend: "dest-in" }]).png({ compressionLevel: 9 }).toFile(new URL(file, base).pathname);
const S = (src, s, file, base = PUBLIC) =>
  sharp(src).resize(s, s).png({ compressionLevel: 9 }).toFile(new URL(file, base).pathname);

await Promise.all([
  R(content, 512, 112, "icon-512.png"),
  R(content, 192, 42, "icon-192.png"),
  R(content, 128, 28, "logo-mark.png"),
  S(content, 180, "apple-touch-icon.png"),
  S(content, 512, "icon-maskable-512.png"),
  R(face, 48, 11, "favicon-48.png"),
  R(face, 32, 7, "favicon-32.png"),
  R(face, 16, 4, "favicon-16.png"),
  R(content, 192, 42, "icon.png", APP), // Next dosya sözleşmesi
]);

// Çok boyutlu favicon.ico.
await run("magick", [
  new URL("favicon-16.png", PUBLIC).pathname,
  new URL("favicon-32.png", PUBLIC).pathname,
  new URL("favicon-48.png", PUBLIC).pathname,
  new URL("favicon.ico", PUBLIC).pathname,
]).catch(() =>
  run("convert", [
    new URL("favicon-16.png", PUBLIC).pathname,
    new URL("favicon-32.png", PUBLIC).pathname,
    new URL("favicon-48.png", PUBLIC).pathname,
    new URL("favicon.ico", PUBLIC).pathname,
  ]),
);

console.log("İkonlar üretildi: logo-source.png (Erdi portresi).");
