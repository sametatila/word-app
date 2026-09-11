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
 * Hepsi çevrildi; kapı artık MUTLAK - ölçek dışı tek bir punto hata.
 *
 * Çevirme mekanik değildi, çünkü jeton puntoyu VE ağırlığı birlikte taşıyor:
 * `text-sm font-bold` → `strong` (15/700), yalnız `text-sm` → `body` (15/500),
 * `text-xs` büyük harfle → `micro` (11/700), ağırlıklı `text-xs` → `caption`
 * (12.5/600), düğme etiketi → `h3` (mobil düğme etiketi de h3), kart/ekran
 * başlığı → `h3`, bölüm kapağı → `h2`, büyük sayaç → `h1`/`display`. Sınav ve
 * ders oynatıcılarının başlıkları tek tek mobil karşılığındaki
 * `<Text variant>`e bakılarak eşlendi.
 *
 * Kullanım:
 *   node scripts/check-type-scale.mjs         # ölçek dışı punto varsa hata
 *   node scripts/check-type-scale.mjs --hits  # satır satır döküm
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const mode = process.argv[2] ?? "--check";
const filter = process.argv[3] ?? "";

/**
 * Ölçek dışında kalması KABUL EDİLEN puntolar, sebepleriyle.
 *
 * Anahtar dosya yolu, değer [parça, sebep]: satır numarası değil PARÇA
 * eşleşiyor, çünkü kod kaydıkça numara kayar.
 */
const ALLOW = new Map([
  ["src/app/page.tsx", [
    ["text-4xl font-black leading-tight sm:text-6xl",
     "inis sayfasinin kahraman basligi: pazarlama yuzeyi, mobil karsiligi YOK ve uygulama ici olcegin ustune bilerek cikiyor"],
  ]],
  /* OYUN TURUNUN CEVAP ALANI IKI PLATFORMDA DA 18 px. Mobil ayni alani
     `fontSize: 18` ile yaziyor (`game/rounds.tsx`, dort giris) ve olcekte 18
     basamagi yok. Burada `body`ye (15) cekmek PARITENIN KENDISINI bozardi -
     olcum yapilmasa "kural geregi" kucultulecekti. Beceri yazma alanlari
     AYRI: mobil onlari 15 px yaziyor (`skillQuiz`) ve web de oyle. */
  ["src/components/games/cloze-game.tsx", [
    ["card min-h-14 w-full px-4 text-lg outline-none", "oyun cevap alani: mobil ayni alani fontSize 18 yaziyor"],
  ]],
  ["src/components/games/typing-game.tsx", [
    ["card min-h-14 w-full px-4 text-lg outline-none", "oyun cevap alani: mobil ayni alani fontSize 18 yaziyor"],
  ]],
  ["src/components/games/translate-game.tsx", [
    ["card min-h-16 w-full resize-none px-4 py-3 text-lg outline-none", "oyun cevap alani: mobil ayni alani fontSize 18 yaziyor"],
  ]],
  ["src/components/games/free-sentence-game.tsx", [
    ["card min-h-20 w-full resize-none px-4 py-3 text-lg outline-none", "oyun cevap alani: mobil ayni alani fontSize 18 yaziyor"],
  ]],
  /* GORELI PUNTO, SABIT DEGIL. `em` ebeveynin puntosuna gore olcekleniyor:
     Ingilizce karsilik, ustundeki kelime hangi basamakta yazilmissa onun
     %85-92'si kaliyor. Sabit bir basamak vermek bu bagi koparirdi. Mobilde
     karsiligi yok (React Native goreli punto tanimiyor; orada iki satir ayri
     `variant` tasiyor). */
  ["src/components/meaning-text.tsx", [
    ["block text-[0.92em] opacity-60", "goreli punto: Ingilizce karsilik ebeveyn kelimenin %92'si"],
  ]],
  ["src/components/skills/gloss-entry.tsx", [
    ["text-[0.9em] opacity-60", "goreli punto: Ingilizce karsilik ebeveynin %90'i"],
    ["text-[0.85em] opacity-50", "goreli punto: not satiri ebeveynin %85'i"],
  ]],
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

if (mode === "--hits") {
  for (const [f, list] of Object.entries(hits)) {
    if (filter && !f.includes(filter)) continue;
    console.log(f);
    for (const h of list) console.log(`  ${h.line}: ${h.what}  ${h.text.slice(0, 120)}`);
  }
  console.log(`\ntoplam ${total}`);
} else {
  if (total || dead.length) {
    if (total) {
      console.error("check:type — ölçek dışı punto:\n");
      for (const [f, list] of Object.entries(hits)) {
        console.error(`  ${f}`);
        for (const h of list) console.error(`      ${h.line}: ${h.what}  ${h.text.slice(0, 100)}`);
      }
      console.error("\nÖlçek punto VE ağırlığı birlikte taşıyor:");
      console.error("  micro   11/700   rozet üstü etiket, büyük harfli etiket");
      console.error("  caption 12.5/600 alt satır, sönük açıklama");
      console.error("  body    15/500   gövde metni, beceri yazma alanı");
      console.error("  strong  15/700   satır başlığı, soru metni, kalın gövde");
      console.error("  h3      16/700   kart/ekran başlığı, düğme etiketi");
      console.error("  h2      20/700   bölüm kapağı · h1 26/800 büyük sayaç · display 32/800");
      console.error("Meşru bir istisnaysa betikteki ALLOW listesine SEBEBİYLE ekle.");
    }
    for (const d of dead) console.error(`  istisna artık karşılıksız (ALLOW): ${d}`);
    process.exit(1);
  }
  const muaf = [...ALLOW.values()].reduce((n, l) => n + l.length, 0);
  console.log(`check:type — web'in puntoları sekiz basamaklı ölçekte: tamam (${muaf} kayıtlı istisna)`);
}
