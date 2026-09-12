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
 * Hepsi çevrildi; kapı artık MUTLAK - tek bir ölçek dışı kullanım hata.
 *
 * Çevirme rol adına göre yapıldı, çünkü ölçeğin adları zaten rolü söylüyor:
 * rozet ve satır içi etiket chip, ikon karosu ve giriş alanı tile, iç panel ve
 * liste satırı ve buton panel, kartın kendisi card. Sayıya en yakın basamağa
 * yuvarlamak yanlış olurdu - 16 px'lik bir kart iskeleti sayıca tile'a (14)
 * yakın ama ROLÜ card (26), ve mobil `SkeletonCard` doğrudan `Card`'ı sarıyor.
 *
 * `rounded-full` sayılmıyor: mobilin `radii.pill` karşılığı, meşru. Metin
 * satırı iskeletleri de orada: mobil `SkeletonLine` yarıçapı
 * `min(radii.sm, yükseklik/2)` yazıyor, yani 20 px'e kadar çubuk tamamen
 * yuvarlak - web'de karşılığı `rounded-full`.
 *
 * Kullanım:
 *   node scripts/check-radius.mjs           # ölçek dışı kullanım varsa hata
 *   node scripts/check-radius.mjs --hits    # satır satır döküm
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
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

/* ── mobil taraf ──────────────────────────────────────────────────────────
 * Simetri: web'in yaricaplari policelenirken mobilin ham sayilari serbest
 * kalirsa kapi tek tarafli olur ve ayrisma oradan geri gelir.
 *
 * Mobil olcegi JETONLA yaziyor (`radii.sm/md/lg/xl/xxl`) ama 105 yerde ham
 * sayi da var. Hepsi kusur DEGIL - iki mesru sinif:
 *
 *   DAIRE / PILL: yaricap boyutun yarisi (48'lik dairede 24, 22'lik basparmakta
 *     11). Mobilin kendi `SkeletonBar`/`SkeletonPill`i de boyle hesapliyor.
 *   SAC TELI CUBUK: 2-9 px yaricap, ilerleme cubuklarinin ucu. Olcegin en
 *     kucugu (10) bu cubuklari tamamen yuvarlatirdi; webde de ayni sinif
 *     kayitli istisna (`lesson-player` adim cubugu).
 *
 * Kalan iki durum kusur ve ikisi de kesin olculebiliyor:
 *   1. Sayi olcekteki bir degere ESIT (10/14/20/26/34) -> jeton yazilmali,
 *      yoksa jeton degistiginde bu yuva geride kalir.
 *   2. Sayi 10'un ustunde, olcekte yok ve bir dairenin yarisi da degil.
 */
/*
 * OLCEK DOSYADAN OKUNUYOR, BURADA KOPYA DURMUYOR.
 *
 * Bu tablo elle yazili duruyordu: `{ 10: "sm", 14: "md", 20: "lg", 26: "xl",
 * 34: "xxl" }`. Yani olcegi POLISLEYEN kapi, olcegin bir KOPYASINI tasiyordu -
 * projenin her yerde savastigi sinif. `radii.lg` 20'den 22'ye cekilse kapi
 * hala 20'yi "jeton" sayar, 22'yi "olcek disi" diye bildirirdi: kirmizi
 * verirken yanlis sebebi soyleyen bir kapi.
 *
 * Vakumluk taramasinda bulundu (`mobile/src/theme/tokens.ts` bosaltildiginda
 * bu kapinin kilini kipirdatmamasi ipucuydu). Olcek artik kaynaktan geliyor
 * ve okunamazsa kapi DURUYOR - sessizce bos bir olcekle calismiyor.
 *
 * `pill` (999) disarida: o bir basamak degil "tamamen yuvarlak" isareti.
 */
const TOKENS = path.join(ROOT, "mobile/src/theme/tokens.ts");
const RADII = (() => {
  const src = fs.readFileSync(TOKENS, "utf8");
  const blok = src.match(/export const radii = \{([^}]*)\}/);
  if (!blok) {
    console.error(`check:radius — mobil yaricap olcegi okunamadi (${path.relative(ROOT, TOKENS)} icinde \`radii\` yok).`);
    process.exit(1);
  }
  const out = {};
  for (const m of blok[1].matchAll(/(\w+):\s*(\d+)/g)) if (m[1] !== "pill") out[m[2]] = m[1];
  if (Object.keys(out).length < 5) {
    console.error(`check:radius — yaricap olcegi eksik okundu (${Object.keys(out).length} basamak, en az 5 bekleniyor).`);
    process.exit(1);
  }
  return out;
})();
const BAR_MAX = 9;
/** Yaricap civardaki bir genislik/yuksekligin yarisi mi (daire/pill)? */
function isCircle(lines, i, r) {
  for (let j = Math.max(0, i - 4); j <= Math.min(lines.length - 1, i + 4); j++) {
    for (const m of lines[j].matchAll(/(?:width|height|size|inner|bar):\s*(\d+)\b/g)) {
      if (r === Math.round(Number(m[1]) / 2)) return true;
    }
  }
  return /\/\s*2\b/.test(lines[i]);
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
    const found = lines[i].match(STEP);
    if (!found) continue;
    const muaf = allow.find(([parca]) => lines[i].includes(parca));
    if (muaf) { used.add(rel + "|" + muaf[0]); continue; }
    counts[rel] = (counts[rel] ?? 0) + found.length;
    (hits[rel] ??= []).push({ line: i + 1, text: lines[i].trim(), what: found.join(" ") });
  }
}

const total = Object.values(counts).reduce((a, b) => a + b, 0);

/* ── mobil: ham sayilar ──────────────────────────────────────────────────── */
const mobHits = [];
for (const abs of walk(path.join(ROOT, "mobile", "src"))) {
  const rel = path.relative(ROOT, abs);
  const lines = stripComments(fs.readFileSync(abs, "utf8")).split("\n");
  for (let i = 0; i < lines.length; i++) {
    for (const m of lines[i].matchAll(/borderRadius:\s*(\d+)\b/g)) {
      const r = Number(m[1]);
      if (r <= BAR_MAX) continue;                       // sac teli cubuk
      if (isCircle(lines, i, r)) continue;              // daire / pill
      mobHits.push({
        file: rel, line: i + 1, r,
        why: RADII[r] ? `jeton yazilmali: radii.${RADII[r]}` : "olcek disi",
        text: lines[i].trim().slice(0, 100),
      });
    }
  }
}

/* ÖLÜ İSTİSNA SESSİZCE DURMASIN - `check:colors` aynı denetimi yapıyor ve
   orada bir istisnanın karşılıksız kalması gerçek bir bulguydu. */
const dead = [];
for (const [file, list] of ALLOW) for (const [parca] of list) {
  if (!used.has(file + "|" + parca)) dead.push(`${file}: ${parca}`);
}

if (mode === "--hits") {
  for (const [f, list] of Object.entries(hits)) {
    console.log(f);
    for (const h of list) console.log(`  ${h.line}: ${h.what}  ${h.text.slice(0, 110)}`);
  }
  for (const h of mobHits) console.log(`${h.file}:${h.line}  ${h.r}  ${h.why}`);
  console.log(`\ntoplam web ${total} · mobil ${mobHits.length}`);
} else {
  if (total || dead.length || mobHits.length) {
    if (total) {
      console.error("check:radius — ölçek dışı yarıçap:\n");
      for (const [f, list] of Object.entries(hits)) {
        console.error(`  ${f}`);
        for (const h of list) console.error(`      ${h.line}: ${h.what}  ${h.text.slice(0, 100)}`);
      }
      console.error("\nÖlçek ROLE göre seçilir, sayıya en yakın basamağa göre DEĞİL:");
      console.error("  chip 10   rozet, satır içi etiket, küçük ikon düğmesi");
      console.error("  tile 14   ikon karosu, giriş alanı, geri düğmesi, iskelet blok");
      console.error("  panel 20  iç panel, uyarı bloğu, liste satırı, buton");
      console.error("  card 26   kartın kendisi ve kart iskeleti");
      console.error("  float 34  yüzen sekme çubuğu");
      console.error("Meşru bir istisnaysa betikteki ALLOW listesine SEBEBİYLE ekle.");
    }
    if (mobHits.length) {
      console.error("\ncheck:radius — mobilde ham yarıçap sayısı:\n");
      for (const h of mobHits) console.error(`  ${h.file}:${h.line}  ${h.r}  ${h.why}\n      ${h.text}`);
      console.error("\nDaire (boyutun yarısı) ve 2-9 px'lik çubuklar sayılmıyor; kalanı jeton olmalı.");
    }
    for (const d of dead) console.error(`  istisna artık karşılıksız (ALLOW): ${d}`);
    process.exit(1);
  }
  const muaf = [...ALLOW.values()].reduce((n, l) => n + l.length, 0);
  console.log(`check:radius — iki platformun yarıçapları beş basamaklı ölçekte: tamam (${muaf} kayıtlı istisna, mobilde daire ve çubuklar dışında ham sayı yok)`);
}
