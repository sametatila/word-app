/**
 * Tipografi ölçeği denetimi: `node scripts/check-type-scale.mjs --check`
 *
 * NEDEN VAR. `globals.css`'in "TİPOGRAFİ ÖLÇEĞİ" bloğu durumu kendi
 * cümlesiyle anlatıyor: mobilde her metin `<Text variant="…">` ile yazılıyor ve
 * SERBEST PUNTO YOK; web'de ise punto her sayfada yeniden seçiliyordu ve
 * "aynı işi gören iki başlık iki ayrı boyutta çıkıyordu". Sekiz basamaklı ölçek
 * (`text-display/h1/h2/h3/strong/body/caption/micro`) bunu kapatmak için
 * yazıldı ve `check:tokens` iki platformda birebir aynı olduğunu doğruluyor.
 *
 * Ama o blok şunu da yazıyor: "ekranlar şerit şerit buraya taşınıyor". Yani
 * taşıma SÜRÜYOR ve taşınmayanı sayan bir şey yoktu.
 *
 * Ölçüm (2026-09-11): ölçek jetonları 237 yerde, Tailwind'in kendi
 * varsayılanları 1167 yerde kullanılıyordu — `text-sm` 504, `text-xs` 461.
 * Bunlar ölçekte YOK: `text-sm` 14 px (mobilde 15), `text-xs` 12 (mobilde
 * 12.5), `text-lg` 18 ve `text-2xl` 24 hiçbir basamağa karşılık gelmiyor.
 *
 * KAPI BİR BORÇ SAYACI (`i18n-hardcoded` kalıbı): dosya başına taban, ARTIŞ
 * hata. Çevirme mekanik değil, çünkü jeton puntoyu VE ağırlığı birlikte
 * taşıyor - `text-sm font-bold` → `strong` (15/700), yalnız `text-sm` → `body`
 * (15/500), `text-xs font-bold uppercase` → `micro` (11/700), ağırlıklı
 * `text-xs` → `caption` (12.5/600). Yuva yuva karar gerekiyor.
 *
 * Kullanım:
 *   node scripts/check-type-scale.mjs --baseline
 *   node scripts/check-type-scale.mjs --check
 *   node scripts/check-type-scale.mjs --hits [yol parçası]
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const BASELINE = path.join(ROOT, "scripts", "check-type-scale-baseline.json");
const mode = process.argv[2] ?? "--check";
const filter = process.argv[3] ?? "";

/**
 * Ölçek dışında kalması KABUL EDİLEN puntolar, sebepleriyle.
 *
 * Anahtar dosya yolu, değer [parça, sebep]: satır numarası değil PARÇA
 * eşleşiyor, çünkü kod kaydıkça numara kayar.
 */
const ALLOW = new Map([
  /* Bugün boş ve bu bir sonuç: ilk yazımda `screen-diag`in `text-[11px]`i
     "geliştirici katmanı" diye muaf tutulmuştu, sonra o satır da ölçeğe
     geçti (11 px zaten `micro`) ve kapı istisnanın KARŞILIKSIZ kaldığını
     bildirdi. Muafiyet gerekmiyordu. */
]);

/**
 * Tailwind'in kendi punto ölçeği + serbest punto: ikisi de ölçek dışı.
 *
 * SON SINIR `\b` DEĞİL. İlk yazımda öyleydi ve serbest puntoları HİÇ
 * saymıyordu: `text-[11px]` deseninin sonundaki `]`den sonra `"` geliyor,
 * ikisi de kelime karakteri değil, yani `\b` orada tutmuyor. Kapı 80 kullanımı
 * görmüyordu ve bunu ancak seksenini birden çevirip sayacın 2 düşmesine bakınca
 * anladım - "kapı ne ölçüyor" sorusunun bu turlardaki kaçıncı tekrarı olduğu
 * defterde yazılı. `(?![\w-])` hem `]` sonrasını hem `text-xs-foo` gibi bir
 * uzantıyı doğru ele alıyor.
 */
const OFF = /\btext-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\[[\d.]+(?:px|rem|em)\])(?![\w-])/g;

/** Yorumlar SATIR SAYISI KORUNARAK siliniyor: döküm satır numarası veriyor. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + m.slice(p.length).replace(/[^\n]/g, " "));
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/node_modules/.test(p)) walk(p, out); }
    else if (/\.tsx?$/.test(e.name)) out.push(p);
  }
  return out;
}

const counts = {};
const hits = {};
const used = new Set();

for (const abs of walk(path.join(ROOT, "src"))) {
  const rel = path.relative(ROOT, abs);
  const lines = stripComments(fs.readFileSync(abs, "utf8")).split("\n");
  const allow = ALLOW.get(rel) ?? [];
  for (let i = 0; i < lines.length; i++) {
    const found = lines[i].match(OFF);
    if (!found) continue;
    const muaf = allow.find(([parca]) => lines[i].includes(parca));
    if (muaf) { used.add(rel + "|" + muaf[0]); continue; }
    counts[rel] = (counts[rel] ?? 0) + found.length;
    (hits[rel] ??= []).push({ line: i + 1, what: found.join(" "), text: lines[i].trim() });
  }
}

const total = Object.values(counts).reduce((a, b) => a + b, 0);

/* Ölü istisna sessizce durmasın - `check:colors` ve `check:radius` aynı
   denetimi yapıyor ve ilkinde bu gerçek bir bulguydu. */
const dead = [];
for (const [file, list] of ALLOW) for (const [parca] of list) {
  if (!used.has(file + "|" + parca)) dead.push(`${file}: ${parca}`);
}

if (mode === "--baseline") {
  fs.writeFileSync(BASELINE, JSON.stringify(counts, null, 2) + "\n");
  console.log(`taban yazıldı: ${total} kullanım / ${Object.keys(counts).length} dosya`);
} else if (mode === "--hits") {
  for (const [f, list] of Object.entries(hits)) {
    if (filter && !f.includes(filter)) continue;
    console.log(f);
    for (const h of list) console.log(`  ${h.line}: ${h.what}  ${h.text.slice(0, 120)}`);
  }
  console.log(`\ntoplam ${total}`);
} else {
  if (!fs.existsSync(BASELINE)) {
    console.error("taban yok; önce: node scripts/check-type-scale.mjs --baseline");
    process.exit(1);
  }
  const base = JSON.parse(fs.readFileSync(BASELINE, "utf8"));
  const over = Object.entries(counts).filter(([f, n]) => n > (base[f] ?? 0));
  if (over.length || dead.length) {
    if (over.length) {
      console.error("check:type — ölçek dışı punto ARTMIŞ:\n");
      for (const [f, n] of over) {
        console.error(`  ${f}: ${base[f] ?? 0} → ${n}`);
        for (const h of hits[f]) console.error(`      ${h.line}: ${h.what}`);
      }
      console.error("\nÖlçek punto VE ağırlığı birlikte taşıyor:");
      console.error("  micro   11/700   rozet üstü etiket, büyük harf");
      console.error("  caption 12.5/600 alt satır, sönük açıklama");
      console.error("  body    15/500   gövde metni");
      console.error("  strong  15/700   satır başlığı, kalın gövde");
      console.error("  h3      16/700 · h2 20/700 · h1 26/800 · display 32/800");
      console.error("Taban gerçekten düştüyse: node scripts/check-type-scale.mjs --baseline");
    }
    for (const d of dead) console.error(`  istisna artık karşılıksız (ALLOW): ${d}`);
    process.exit(1);
  }
  const baseTotal = Object.values(base).reduce((a, b) => a + b, 0);
  const muaf = [...ALLOW.values()].reduce((n, l) => n + l.length, 0);
  console.log(`check:type — ölçek dışı punto: ${total} kullanım (taban ${baseTotal}, ${muaf} kayıtlı istisna)`);
}
