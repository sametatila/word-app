/**
 * Uygulama ikonlarını tek bir kaynaktan üretir: `node scripts/icons.mjs`
 *
 * Kaynak MASKOTUN KENDİSİ: `public/erdi.svg` içinden Erdi'nin kafası kesilip
 * kehribar-kestane bir yuvarlak kareye oturtuluyor. Elle çizilmiş ayrı bir
 * marka yok — logo ile maskot birebir aynı çizim, çünkü ikisi ayrı çizildiğinde
 * biri değiştiğinde diğeri sessizce eskiyor.
 *
 * Önceki logo gradyan bir kutuda geometrik bir "W" ve umlaut noktalarıydı.
 * Fikir iyiydi ama maskotla hiçbir bağı yoktu: uygulamayı açan kişi ana
 * ekranda bir harf, içeride bir mirket görüyordu.
 *
 * ## Kadraj
 *
 * Kafanın sınırları erdi.svg'nin alfa profilinden ÖLÇÜLDÜ (640x942 tuvalde):
 * kulaklar x 163..569 arasında en geniş yerinde 407 birim, tepe y=0, boyun
 * y=313'te daralıyor, gözler y~150'de. Kadraj bu ölçülerden türetiliyor:
 * gözler karenin %42 yüksekliğine oturuyor (portre kuralı) ve kafa genişliği
 * kenarın belirtilen oranı kadar oluyor.
 *
 * Oran boyuta göre değişiyor, çünkü her ikonun işi farklı:
 *   - favikon 16-48 px: yüz büyük olmalı, yoksa sekmede kahverengi bir leke
 *   - maskable: Android tuvali daireye kadar kırpabiliyor, kafa içeride kalmalı
 *   - apple-touch: iOS köşeleri kendi yuvarlıyor, zemin tam dolu veriliyor
 *
 * ## Zemin
 *
 * Kestane gradyan, kehribar değil. Maskotun kürkü kehribar; kehribar zeminde
 * figür zemine gömülüyordu. Gradyanın iki ucu da maskotun kendi paletinden:
 * koyu kürk (brand-800) ve maskotun kontur rengi (#2F1911).
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);
const PUBLIC = new URL("../public/", import.meta.url);
const APP = new URL("../src/app/", import.meta.url);

const mascot = await readFile(new URL("erdi.svg", PUBLIC), "utf8");

/* Kafanın erdi.svg içindeki ölçülen konumu. */
const HEAD = { width: 407, centerX: 366, eyeY: 150 };

/** Zemin gradyanı — iki ucu da maskotun paletinden. */
const PLATE_FROM = "#653916"; // brand-800: koyu kürk
const PLATE_TO = "#2F1911"; // maskotun kontur rengi

/**
 * Kafayı kare bir kadraja alır.
 *
 * @param {number} fill kafa genişliğinin kare kenarına oranı
 * @param {number} eye  gözlerin karedeki dikey konumu (0=tepe, 1=dip)
 */
function head(fill, eye = 0.42) {
  const side = HEAD.width / fill;
  const x = HEAD.centerX - side / 2;
  const y = HEAD.eyeY - eye * side;
  return mascot.replace(
    /<svg[^>]*>/,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x.toFixed(1)} ${y.toFixed(1)} ${side.toFixed(1)} ${side.toFixed(1)}" width="${side.toFixed(0)}" height="${side.toFixed(0)}">`,
  );
}

/** Yuvarlak kare zemin. */
function plate(radius) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PLATE_FROM}"/>
      <stop offset="100%" stop-color="${PLATE_TO}"/>
    </linearGradient>
    <radialGradient id="gloss" cx="0.3" cy="0.1" r="0.9">
      <stop offset="0%" stop-color="#EDA45D" stop-opacity="0.18"/>
      <stop offset="70%" stop-color="#EDA45D" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="${radius}" fill="url(#g)"/>
  <rect width="512" height="512" rx="${radius}" fill="url(#gloss)"/>
</svg>`;
}

/** Zemin + kafa birleşimi, 512 birimlik tuvalde. */
async function icon({ radius = 112, fill = 0.74, eye = 0.42 } = {}) {
  const bg = await sharp(Buffer.from(plate(radius))).png().toBuffer();
  const fg = await sharp(Buffer.from(head(fill, eye))).resize(512, 512).png().toBuffer();
  return sharp(bg).composite([{ input: fg }]).png().toBuffer();
}

const write = (buf, size, file, base = PUBLIC) =>
  sharp(buf)
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(new URL(file, base).pathname);

await mkdir(PUBLIC, { recursive: true });

const rounded = await icon();
// iOS ve maskable ikonlar tuvali kendileri kırpar; arka plan tam dolu olmalı.
const square = await icon({ radius: 0, fill: 0.78 });
const maskable = await icon({ radius: 0, fill: 0.56 });
// Küçük boyutta yüz büyük olmalı: 16 pikselde kulak ve boyun ayrıntı değil gürültü.
const small = await icon({ radius: 96, fill: 0.92, eye: 0.46 });

await Promise.all([
  write(rounded, 512, "icon-512.png"),
  write(rounded, 192, "icon-192.png"),
  write(square, 180, "apple-touch-icon.png"),
  write(maskable, 512, "icon-maskable-512.png"),
  write(small, 48, "favicon-48.png"),
  write(small, 32, "favicon-32.png"),
  write(small, 16, "favicon-16.png"),
  // Gezinme çubuğundaki marka; 3x ekranlarda da net kalsın diye 128.
  write(rounded, 128, "logo-mark.png"),
  // Next.js dosya sözleşmesi. SVG değil PNG: maskotun izlenmiş SVG'si 275 KB
  // ve bir favikon için kabul edilemez; kesilmiş hâli de öyle.
  write(rounded, 192, "icon.png", APP),
]);

// Çok boyutlu favicon.ico — eski tarayıcılar ve tarayıcı sekmesi için.
await run("convert", [
  new URL("favicon-16.png", PUBLIC).pathname,
  new URL("favicon-32.png", PUBLIC).pathname,
  new URL("favicon-48.png", PUBLIC).pathname,
  new URL("favicon.ico", PUBLIC).pathname,
]);

console.log("İkonlar üretildi: maskotun kafasından.");
