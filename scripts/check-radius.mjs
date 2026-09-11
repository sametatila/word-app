/**
 * Ölçek dışı yarıçap denetimi: `node scripts/check-radius.mjs --check`
 *
 * NEDEN VAR. Projenin yarıçap ölçeği beş basamak ve gerekçesi `globals.css`
 * "YARIÇAP ÖLÇEĞİ" bloğunda yazılı; mobil ona BİREBİR uyuyor (`radii`
 * sm/md/lg/xl/xxl = chip/tile/panel/card/float). Web'de ise Tailwind'in KENDİ
 * varsayılanları (`rounded-lg` 8, `rounded-xl` 12, `rounded-2xl` 16 …) yan yana
 * kullanılıyordu. O bloğun kendi yorumu bunu zaten söylüyor: adlar bilerek
 * farklı seçilmiş, çünkü Tailwind'in adlarını ezmek "depodaki her
 * `rounded-lg`'yi 8'den 20'ye sıçratırdı - hiçbiri gözden geçirilmeden". Yani
 * gözden geçirme işi ERTELENMİŞTİ ve erteleneni sayan bir şey yoktu.
 *
 * Ölçüm (2026-09-11): `rounded-full` dışında 167 kullanım ölçek dışıydı.
 *
 * KAPI BİR BORÇ SAYACI. Tek seferde 167 yuvayı çevirmek, her birinin hangi
 * basamağa gittiğine bakmadan yapılamaz (rozet mi, ikon karosu mu, panel mi,
 * kartın kendisi mi - ad zaten bunu söylüyor). O yüzden `i18n-hardcoded` ile
 * aynı kalıp: dosya başına taban, ARTIŞ hata. Borç tur tur düşüyor, yeni borç
 * eklenemiyor.
 *
 * `rounded-full` sayılmıyor: mobilin `radii.pill` karşılığı, meşru.
 *
 * Kullanım:
 *   node scripts/check-radius.mjs --baseline   # bugünkü sayıları taban yaz
 *   node scripts/check-radius.mjs --check      # taban aşılırsa hata (CI)
 *   node scripts/check-radius.mjs --hits       # satır satır döküm
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const BASELINE = path.join(ROOT, "scripts", "check-radius-baseline.json");
const mode = process.argv[2] ?? "--check";

/**
 * Ölçeğe girmeyen ama MEŞRU olan kullanımlar, sebepleriyle.
 *
 * Anahtar dosya yolu, değer [parça, sebep] çiftleri: satır numarası değil
 * PARÇA eşleşiyor, çünkü kod kaydıkça satır numarası kayar ve istisna sessizce
 * başka bir yuvaya geçerdi.
 */
const ALLOW = new Map([
  ["src/components/skills/writing-player.tsx", [
    ["h-5 w-5 shrink-0 items-center justify-center rounded-md",
     "20 px onay kutusu: ölçeğin en küçüğü (chip 10) kareyi daireye çevirir ve daire radyo düğmesi demek. Mobil karşılığı da 6 (`AuthScreen` güven kutusu)"],
  ]],
  ["src/components/lessons/lesson-player.tsx", [
    ["h-full flex-1 rounded-sm",
     "saç teli kalınlığındaki adım çubuğu; mobil aynı çubuğa 3 yazıyor (`LessonScreen`), chip 10 çubuğu tamamen yuvarlatırdı"],
  ]],
]);

/** Yorumlar SATIR SAYISI KORUNARAK siliniyor: döküm satır numarası veriyor. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + m.slice(p.length).replace(/[^\n]/g, " "));
}

const STEP = /\brounded-(?:[a-z]{1,2}-)?(?:sm|md|lg|xl|2xl|3xl)\b/g;

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
    const found = lines[i].match(STEP);
    if (!found) continue;
    const muaf = allow.find(([parca]) => lines[i].includes(parca));
    if (muaf) { used.add(rel + "|" + muaf[0]); continue; }
    counts[rel] = (counts[rel] ?? 0) + found.length;
    (hits[rel] ??= []).push({ line: i + 1, text: lines[i].trim(), what: found.join(" ") });
  }
}

const total = Object.values(counts).reduce((a, b) => a + b, 0);

/* ÖLÜ İSTİSNA SESSİZCE DURMASIN - `check:colors` aynı denetimi yapıyor ve
   orada bir istisnanın karşılıksız kalması gerçek bir bulguydu. */
const dead = [];
for (const [file, list] of ALLOW) for (const [parca] of list) {
  if (!used.has(file + "|" + parca)) dead.push(`${file}: ${parca}`);
}

if (mode === "--baseline") {
  fs.writeFileSync(BASELINE, JSON.stringify(counts, null, 2) + "\n");
  console.log(`taban yazıldı: ${total} kullanım / ${Object.keys(counts).length} dosya`);
} else if (mode === "--hits") {
  for (const [f, list] of Object.entries(hits)) {
    console.log(f);
    for (const h of list) console.log(`  ${h.line}: ${h.what}  ${h.text.slice(0, 110)}`);
  }
  console.log(`\ntoplam ${total}`);
} else {
  if (!fs.existsSync(BASELINE)) {
    console.error("taban yok; önce: node scripts/check-radius.mjs --baseline");
    process.exit(1);
  }
  const base = JSON.parse(fs.readFileSync(BASELINE, "utf8"));
  const over = Object.entries(counts).filter(([f, n]) => n > (base[f] ?? 0));
  if (over.length || dead.length) {
    if (over.length) {
      console.error("check:radius — ölçek dışı yarıçap ARTMIŞ:\n");
      for (const [f, n] of over) {
        console.error(`  ${f}: ${base[f] ?? 0} → ${n}`);
        for (const h of hits[f]) console.error(`      ${h.line}: ${h.what}`);
      }
      console.error("\nÖlçek: chip 10 (rozet) · tile 14 (ikon karosu, giriş, geri düğmesi) ·");
      console.error("panel 20 (iç panel, liste satırı, buton) · card 26 (kartın kendisi) · float 34.");
      console.error("Taban gerçekten düştüyse: node scripts/check-radius.mjs --baseline");
    }
    for (const d of dead) console.error(`  istisna artık karşılıksız (ALLOW): ${d}`);
    process.exit(1);
  }
  const baseTotal = Object.values(base).reduce((a, b) => a + b, 0);
  const muaf = [...ALLOW.values()].reduce((n, l) => n + l.length, 0);
  console.log(`check:radius — ölçek dışı yarıçap: ${total} kullanım (taban ${baseTotal}, ${muaf} kayıtlı istisna)`);
}
