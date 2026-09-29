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
  ["src/components/conversations/conversation-player.tsx", [
    ["h-full flex-1 rounded-sm",
     "saç teli kalınlığındaki adım çubuğu; mobil aynı çubuğa 3 yazıyor (`ConversationScreen`), chip 10 çubuğu tamamen yuvarlatırdı"],
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
 *     kayitli istisna (`conversation-player` adim cubugu).
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

/* ── KENARLIK KALINLIĞI (iki platform) ────────────────────────────────────
 *
 * 2026-09-29, Samet: "yürüyüş modu ve deneme sınavlarındaki kenarlık güzel,
 * diğer ekranlardaki kutu, seçenek ve butonlarda çok kalın". O iki ekran 1 px
 * çiziyordu (`Card` hairline, seçili hâl 1 + marka rengi); geri kalan yerlerde
 * 1.5 / 2 / 2.5 / 3 karışık duruyordu ve seçim çoğu yerde KALINLIKLA
 * (`on ? 2 : 1`) anlatılıyordu. Kural:
 *
 *   1 px    kart, kutu, şık, çip, düğme, giriş alanı, seçim karoları,
 *           iskeletler. Seçili hâl RENKLE (marka kenarlık + yumuşak dolgu).
 *   1.5 px  yalnız küçük denetimler: onay kutusu, radyo halkası, boş seçim
 *           halkası, kesikli boş yer tutucu (1 px'te kesikler kayboluyor).
 *   serbest halka/çizim olanlar: dönen yükleme halkası, avatar halkası,
 *           kaydırıcı başparmağı, renk örneği, ünite durum halkası, sol vurgu
 *           şeridi, odak halkası.
 *
 * Kapı 1'in üstündeki her kalınlığı sayıyor; yalnız aşağıdaki listede
 * SEBEBİYLE kayıtlı olan geçiyor. Liste parça eşleşmesiyle (satır numarası
 * kayar) ve karşılıksız kalan kayıt da hata (ölü istisna).
 *
 * Kapsam dışı: `src/app/admin` (iç panel, sekme alt çizgisi `border-b-2`) ve
 * `landing.module.css` (tanıtım sayfasının kendi dili; uygulama yüzeyi değil).
 */
const BORDER_ALLOW = new Map([
  /* ── mobil ── */
  ["mobile/src/ui/Checkbox.tsx", [["borderWidth: 1.5", "küçük denetim: onay kutusu (web `checkbox.tsx`)"]]],
  ["mobile/src/ui/RadioDot.tsx", [["borderWidth: 1.5", "küçük denetim: radyo halkası (web `report-dialog` halkası)"]]],
  ["mobile/src/ui/UnlockProgress.tsx", [["borderWidth: c.ok ? 0 : 1.5", "küçük denetim: 20 px boş koşul halkası (web `unlock-progress`)"]]],
  ["mobile/src/game/skillLibrary.tsx", [["width: 22, height: 22, borderRadius: 6, borderWidth: 1.5", "küçük denetim: 22 px öz denetim onay kutusu"]]],
  ["mobile/src/game/rounds.tsx", [["borderWidth: 1.5,", "kesikli boş yer tutucu: boşluk doldurmanın boş yuvası (`BlankSlot`)"]]],
  ["mobile/src/screens/AvatarScreen.tsx", [
    ["borderWidth: 1.5, borderStyle: \"dashed\"", "kesikli boş yer tutucu: 'yok' karosu dairesi"],
    ["borderWidth: 3, borderColor: sel ? colors.text : colors.bg", "renk örneği: seçim halkası dairenin kendisi"],
    ["borderWidth: 6, borderColor: tile.swatch.from", "renk örneği: iki renkli daire (çizim)"],
  ]],
  ["mobile/src/ui/ListenButton.tsx", [["borderWidth: 3", "dönen yükleme halkası"]]],
  ["mobile/src/ui/Avatar.tsx", [
    ["borderWidth: ring ? 2 : 0", "avatar halkası (web `avatar.tsx` 0 0 0 2px)"],
    ["borderWidth: 5", "avatar sahnesinin beyaz dairesi (web 0 0 0 5px)"],
  ]],
  ["mobile/src/screens/PathScreen.tsx", [["borderWidth: 3", "ünite durum halkası: tamam/şimdi/kilitli rengini taşıyan çizim (web `immersion-hub` 3px)"]]],
  ["mobile/src/screens/MockExamScreen.tsx", [["borderLeftWidth: 2", "sol vurgu şeridi (alıntı çizgisi), çerçeve değil"]]],
  /* ── web ── */
  ["src/components/checkbox.tsx", [["border-[1.5px]", "küçük denetim: onay kutusu (mobil `ui/Checkbox`)"]]],
  ["src/components/report-dialog.tsx", [["border: `1.5px solid", "küçük denetim: radyo halkası (mobil `ui/RadioDot`)"]]],
  ["src/components/course-onboarding.tsx", [["rounded-full border-[1.5px]", "küçük denetim: 24 px radyo halkası"]]],
  ["src/components/unlock-progress.tsx", [["rounded-full border-[1.5px]", "küçük denetim: boş koşul halkası"]]],
  ["src/components/avatar-editor.tsx", [
    ["1.5px dashed var(--border)", "kesikli boş yer tutucu: 'yok' karosu dairesi"],
    ["border: `3px solid ${colorNow", "renk örneği: seçim halkası dairenin kendisi"],
    ["border: `6px solid ${tile.swatch.from}", "renk örneği: iki renkli daire (çizim)"],
  ]],
  ["src/components/listen-button.tsx", [["border-[3px]", "dönen yükleme halkası"]]],
  ["src/components/conversations/conversation-scored.tsx", [["animate-spin rounded-full border-2", "dönen yükleme halkası"]]],
  ["src/components/avatar.tsx", [
    ["0 0 0 2px ${ring}", "avatar halkası (mobil `ui/Avatar` ring 2)"],
    ["0 0 0 5px rgba(255,255,255,.85)", "avatar sahnesinin beyaz dairesi"],
  ]],
  ["src/components/immersion/immersion-hub.tsx", [["border: `3px solid ${ringColor}`", "ünite durum halkası (mobil `PathScreen` 3)"]]],
  ["src/components/achievement-badge.tsx", [["outline: selected ? `2px solid", "seçili rozetin DIŞ halkası (2 px boşluklu outline), kutunun kenarlığı değil"]]],
  ["src/components/mock-exam-player.tsx", [["border-l-2", "sol vurgu şeridi (alıntı çizgisi), çerçeve değil"]]],
  ["src/components/skills/writing-player.tsx", [["border-l-4", "sol vurgu şeridi (model metin), çerçeve değil"]]],
  ["src/app/globals.css", [
    ["outline: 2px solid var(--color-brand)", "odak halkası (`.range:focus-visible`)"],
    ["box-shadow: 0 0 0 3px color-mix", "odak halkası (`.input:focus-visible`)"],
  ]],
]);
const borderHits = [];
const borderUsed = new Set();
/* Karşılaştırmadaki sayılar kalınlık değil (`i === 4 ? 0 : 1`): önce onlar düşüyor. */
const nums = (s) => [...s.replace(/(?:[=!]==?|[<>]=?)\s*\d+(?:\.\d+)?/g, " ").matchAll(/(?<![\w.])(\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
function borderScan(rel, text, finders) {
  const lines = stripComments(text).split("\n");
  const allow = BORDER_ALLOW.get(rel) ?? [];
  for (let i = 0; i < lines.length; i++) {
    for (const find of finders) {
      for (const m of lines[i].matchAll(find.re)) {
        const w = Math.max(0, ...find.widths(m));
        if (w <= 1) continue;
        const muaf = allow.find(([parca]) => lines[i].includes(parca));
        if (muaf) { borderUsed.add(rel + "|" + muaf[0]); continue; }
        borderHits.push({ file: rel, line: i + 1, w, text: lines[i].trim().slice(0, 110) });
      }
    }
  }
}
/* Mobil: `borderWidth` / `borderLeftWidth` … değerindeki bütün sayılar
   (`on ? 2 : 1` gibi koşullularda en büyüğü). Değişkenle yazılanlar okunmuyor. */
const MOB_BORDER = [{ re: /border(?:Top|Bottom|Left|Right|Start|End)?Width:\s*([^,}\n]+)/g, widths: (m) => nums(m[1]) }];
/* Web: Tailwind sınıfları (odak varyantları hariç), satır içi `borderWidth`,
   `Npx solid|dashed|dotted` (border/outline, CSS ve şablon dizgeleri) ve
   `0 0 0 Npx` gölge halkaları. */
const WEB_BORDER = [
  { re: /(?<![\w:-])(?:(?!focus)[a-z-]+:)*(?:border(?:-[xytblrse])?|outline|ring|divide-[xy])-(\d+|\[\d+(?:\.\d+)?px\])(?![\w-])/g, widths: (m) => nums(m[1]) },
  { re: /borderWidth:\s*([^,}\n]+)/g, widths: (m) => nums(m[1]) },
  { re: /\b(\d+(?:\.\d+)?)px (?:solid|dashed|dotted)\b/g, widths: (m) => [Number(m[1])] },
  { re: /\b0 0 0 (\d+(?:\.\d+)?)px\b/g, widths: (m) => [Number(m[1])] },
];
for (const abs of walk(path.join(ROOT, "mobile", "src"))) {
  borderScan(path.relative(ROOT, abs), fs.readFileSync(abs, "utf8"), MOB_BORDER);
}
for (const abs of walk(path.join(ROOT, "src"))) {
  const rel = path.relative(ROOT, abs);
  if (rel.startsWith("src/app/admin/")) continue;
  borderScan(rel, fs.readFileSync(abs, "utf8"), WEB_BORDER);
}
borderScan("src/app/globals.css", fs.readFileSync(path.join(ROOT, "src/app/globals.css"), "utf8"), WEB_BORDER);
const borderDead = [];
for (const [file, list] of BORDER_ALLOW) for (const [parca] of list) {
  if (!borderUsed.has(file + "|" + parca)) borderDead.push(`${file}: ${parca}`);
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
  for (const h of borderHits) console.log(`kenarlık ${h.file}:${h.line}  ${h.w}  ${h.text}`);
} else {
  if (total || dead.length || mobHits.length || borderHits.length || borderDead.length) {
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
    if (borderHits.length) {
      console.error("\ncheck:radius — 1 px'ten kalın kenarlık:\n");
      for (const h of borderHits) console.error(`  ${h.file}:${h.line}  ${h.w}\n      ${h.text}`);
      console.error("\nKutu, şık, çip, düğme, giriş alanı, seçim karosu 1 px; seçili hâl RENKLE (marka kenarlık + yumuşak dolgu).");
      console.error("1.5 yalnız küçük denetim (onay kutusu, radyo halkası). Halka/çizimse BORDER_ALLOW'a SEBEBİYLE ekle.");
    }
    for (const d of borderDead) console.error(`  istisna artık karşılıksız (BORDER_ALLOW): ${d}`);
    process.exit(1);
  }
  const muaf = [...ALLOW.values()].reduce((n, l) => n + l.length, 0);
  console.log(`check:radius — iki platformun yarıçapları beş basamaklı ölçekte: tamam (${muaf} kayıtlı istisna, mobilde daire ve çubuklar dışında ham sayı yok)`);
  const kMuaf = [...BORDER_ALLOW.values()].reduce((n, l) => n + l.length, 0);
  console.log(`check:radius — kenarlıklar 1 px (küçük denetim 1.5): tamam (${kMuaf} kayıtlı halka/denetim istisnası)`);
}
