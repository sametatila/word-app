/**
 * Tasarım jetonu paritesi: `node scripts/check-tokens.mjs`
 *
 * Tipografi, yarıçap ve boşluk ölçekleri iki platformda ELLE hizalanmış ve
 * gerekçeleri yazılı (`globals.css` "TİPOGRAFİ" / "YARIÇAP" blokları,
 * `mobile/src/theme/tokens.ts`). Bugün birebir aynılar - ama hiçbir şey bunu
 * ÖLÇMÜYOR. Mobilde `radii.lg`yi 20'den 18'e çeken bir düzenleme webi sessizce
 * ayırır ve hata ancak iki ekranı yan yana koyan biri fark ederse görünür.
 *
 * `parity-check.mjs` kayıt defterlerini (kurslar, oyunlar, seviyeler) ölçüyor;
 * bu betik aynı işi TASARIM ölçekleri için yapıyor.
 *
 * Yön: mobil KAYNAK, web ona uyar (Android en ileride olan taraf).
 *
 * Çıkış kodu ayrışma sayısı.
 */
import { readFile, readdir } from "node:fs/promises";

const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const mob = await readFile(new URL("../mobile/src/theme/tokens.ts", import.meta.url), "utf8");
const pal = await readFile(new URL("../mobile/src/theme/colors.ts", import.meta.url), "utf8");

/** `--ad: değer;` → değer (ilk tanım; ölçekler tek yerde duruyor). */
function cssVar(name) {
  const m = new RegExp(`--${name}:\\s*([^;]+);`).exec(css);
  return m ? m[1].trim() : null;
}
/** Aynısının `.dark` bloğundaki hâli: koyu tema kendi değerini yeniden tanımlıyor. */
const darkBlock = css.slice(css.indexOf("\n.dark {"));
function darkVar(name) {
  const m = new RegExp(`--${name}:\\s*([^;]+);`).exec(darkBlock);
  return m ? m[1].trim() : null;
}
/** `2rem` / `0.9375rem` → piksel (taban 16). */
function rem(value) {
  const m = /^([\d.]+)rem$/.exec(value ?? "");
  return m ? Number(m[1]) * 16 : null;
}

const problems = [];
const eq = (label, mobile, web) => {
  if (mobile === web) return;
  problems.push(`${label}: mobil ${mobile} · web ${web}`);
};

/* ── tipografi ─────────────────────────────────────────────────────────────
   Mobilin `bodyStrong`u webde `strong`: Tailwind'in kendi `font-strong`
   üretimiyle çakışmadığı için ad kısaltılmış, değer aynı. */
const TYPE = [
  ["display", "display"], ["h1", "h1"], ["h2", "h2"], ["h3", "h3"],
  ["body", "body"], ["bodyStrong", "strong"], ["caption", "caption"], ["micro", "micro"],
];

for (const [mName, wName] of TYPE) {
  const block = new RegExp(`${mName}:\\s*\\{([^}]+)\\}`).exec(mob);
  if (!block) { problems.push(`tipografi ${mName}: mobilde bulunamadı`); continue; }
  const size = Number(/fontSize:\s*([\d.]+)/.exec(block[1])?.[1]);
  const weight = /fontWeight:\s*"(\d+)"/.exec(block[1])?.[1];
  const track = /letterSpacing:\s*(-?[\d.]+)/.exec(block[1])?.[1];

  eq(`punto ${mName}`, size, rem(cssVar(`text-${wName}`)));
  eq(`ağırlık ${mName}`, weight, cssVar(`text-${wName}--font-weight`));

  /*
   * Harf aralığı mobilde PİKSEL, webde `em`. Karşılaştırma PİKSEL cinsinden
   * ve toleransı 0.05px: `em` değeri üç haneye yuvarlanmış (ör. -0.3/26 =
   * -0.011538 → -0.012) ve o yuvarlama gerçek bir ayrım değil, 0.012px'lik
   * bir fark. `em` üzerinden karşılaştırmak yuvarlamayı ayrım sanıyordu.
   */
  const wTrack = cssVar(`text-${wName}--letter-spacing`);
  if (track === undefined && wTrack) problems.push(`harf aralığı ${mName}: mobilde yok · web ${wTrack}`);
  if (track !== undefined) {
    const em = Number(/(-?[\d.]+)em/.exec(wTrack ?? "")?.[1] ?? NaN);
    const webPx = em * size;
    if (!(Math.abs(Number(track) - webPx) <= 0.05)) {
      problems.push(`harf aralığı ${mName}: mobil ${track}px · web ${wTrack} (=${webPx.toFixed(3)}px @${size})`);
    }
  }
}

/* ── yarıçap ───────────────────────────────────────────────────────────────
   Adlar bilerek farklı: mobilin `sm/md/lg/xl/xxl`si Tailwind'in kendi
   `rounded-*` adlarıyla çakışıyordu, web adları NEREDE kullanıldıklarını
   söylüyor. Gerekçe `globals.css` içinde yazılı. `pill` (999) webde
   `rounded-full`, sayısal karşılığı yok. */
const RADII = [["sm", "chip"], ["md", "tile"], ["lg", "panel"], ["xl", "card"], ["xxl", "float"]];
const radiiBlock = /export const radii = \{([^}]+)\}/.exec(mob)?.[1] ?? "";
for (const [mName, wName] of RADII) {
  const v = Number(new RegExp(`${mName}:\\s*(\\d+)`).exec(radiiBlock)?.[1]);
  eq(`yarıçap ${mName}/${wName}`, v, rem(cssVar(`radius-${wName}`)));
}

/* ── boşluk ────────────────────────────────────────────────────────────────
   Webde ayrı jeton YOK ve gerekmiyor: mobilin ölçeği Tailwind'in 0.25rem
   tabanına birebir oturuyor (1 2 3 4 5 7 10). Ölçülen şey o oturmanın hâlâ
   doğru olduğu - bir değer 4'ün katı olmaktan çıkarsa Tailwind sınıfı
   karşılığını kaybeder ve web sessizce yuvarlar. */
const spacingBlock = /export const spacing = \{([^}]+)\}/.exec(mob)?.[1] ?? "";
const WANT_SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 40 };
for (const [k, want] of Object.entries(WANT_SPACING)) {
  const v = Number(new RegExp(`${k}:\\s*(\\d+)`).exec(spacingBlock)?.[1]);
  if (v !== want) problems.push(`boşluk ${k}: mobil ${v} · Tailwind karşılığı olan değer ${want} (0.25rem katı)`);
}

/* ── gölge ─────────────────────────────────────────────────────────────────
   Mobil `softShadow(color, elevation, opacity)` iOS'ta üç sabit kullanıyor: y
   ofseti yüksekliğin 0.7'si, bulanıklık 1.6'sı, opaklık 0.16. Web aynı formülü
   ÜÇ BASAMAĞA DONDURMUŞ halde taşıyor (`--shadow-soft-sm/-soft/-soft-lg`,
   sırasıyla elevation 6/10/16) ve formül değişirse webin donmuş değerleri
   sessizce eskiyor - ölçülen tam olarak bu.

   `spread` (-2/-4/-6px) ve CSS bulanıklığının iOS `shadowRadius`ıyla birebir
   olmayan anlamı kapsam dışı: ikisi de webe özgü ve kayıtlı bir yaklaşım.

   NÖTR GÖLGENİN RENGİ de ölçülüyor, İKİ TEMADA DA. Bir tur boyunca kapsam
   dışıydı ("koyu tema webe özgü") ve tam orada bir hata birikti: mobildeki
   yedi kart çağrısı sabit `#5a3418` geçiyordu, yani koyu temada gölge koyu
   zeminin üstünde %16 opak bir kahveydi - görünmüyordu. Artık iki tarafta da
   temayla değişen bir jeton var (`colors.ts` `shadowTint`/`shadowStrength`,
   webde `.dark` bloğundaki `--shadow-soft*`). */
const shadowFn = /shadowOffset: \{ width: 0, height: elevation \* ([\d.]+) \}, shadowOpacity: opacity, shadowRadius: elevation \* ([\d.]+)/.exec(mob);
const shadowDefault = /export function softShadow\([^)]*opacity = ([\d.]+)\)/.exec(mob);
if (!shadowFn || !shadowDefault) {
  problems.push("gölge: mobil `softShadow` formülü okunamadı (imza değişmiş olabilir)");
} else {
  const [, yF, blurF] = shadowFn;
  const opacity = shadowDefault[1];
  for (const [name, elevation] of [["shadow-soft-sm", 6], ["shadow-soft", 10], ["shadow-soft-lg", 16]]) {
    const raw = cssVar(name);
    const m = /^0 (\d+)px (\d+)px -\d+px rgb\(([^/]+)\/ ([\d.]+)\)$/.exec(raw ?? "");
    if (!m) { problems.push(`gölge ${name}: web değeri çözülemedi (${raw})`); continue; }
    eq(`gölge ${name} y`, Math.round(elevation * Number(yF)), Number(m[1]));
    eq(`gölge ${name} bulanıklık`, Math.round(elevation * Number(blurF)), Number(m[2]));
    eq(`gölge ${name} opaklık`, Number(opacity), Number(m[4]));
  }
}

/* Nötr gölgenin iki temadaki rengi ve gücü. Mobilde tek bir formül var, o
   yüzden web tarafında ORTA basamak (`--shadow-soft`, elevation 10 - en çok
   kullanılan kart gölgesi) karşılaştırılıyor. */
const tint = (label, hex, raw) => {
  const m = /rgb\(([\d\s]+)\/\s*([\d.]+)\)/.exec(raw ?? "");
  if (!m) { problems.push(`${label}: web değeri çözülemedi (${raw})`); return; }
  const web = "#" + m[1].trim().split(/\s+/).map((n) => Number(n).toString(16).padStart(2, "0")).join("");
  eq(label, hex.toLowerCase(), web);
  return Number(m[2]);
};
for (const [theme, read, want] of [["açık", cssVar, "light"], ["koyu", darkVar, "dark"]]) {
  const block = new RegExp(`export const ${want}: Palette = \\{([\\s\\S]*?)\\n\\};`).exec(pal)?.[1] ?? "";
  const hex = /shadowTint:\s*"([^"]+)"/.exec(block)?.[1];
  const strength = Number(/shadowStrength:\s*([\d.]+)/.exec(block)?.[1]);
  if (!hex || Number.isNaN(strength)) { problems.push(`gölge tinti (${theme}): mobil palette okunamadı`); continue; }
  const webOpacity = tint(`gölge tinti (${theme})`, hex, read("shadow-soft"));
  if (webOpacity !== undefined) eq(`gölge gücü (${theme})`, strength, webOpacity);
}

/* ── boşluğun ÇAĞRI YERLERİ ────────────────────────────────────────────────
 *
 * Ölçeğin var olması onu kimsenin kullandığı anlamına gelmiyor: ölçüm mobilde
 * ölçek basamağına EŞİT 253 ham sayı buldu (`padding: 16` diye yazılmış
 * `spacing.lg`ler). Jeton değişse o 253 yer yerinde kalırdı. Hepsi jetona
 * çevrildi; burada ölçülen şey geri gelmemeleri.
 *
 * İKİ PLATFORMUN ORTAK IZGARASI da ölçüldü (piksel histogramı): 2, 4, 6, 8,
 * 10, 12, 14, 16, 20 iki tarafta da yoğun kullanılıyor - yani adlandırılmış
 * yedi basamak ızgaranın yalnız bir kısmı, gerisini iki taraf da aynı şekilde
 * kullanıyor. AYRIŞAN iki şey var ve ikisi de borç listesinde:
 *
 *   - web 24 px (`p-6` ve kardeşleri) ve 32 px (`p-8`): Android'in ölçeğinde
 *     bu basamaklar YOK, 20'den 28'e atlıyor. Web'in kart dolgusu ağırlıklı
 *     olarak 16 (Android `Card` `padding: spacing.lg` ile aynı), ama bir
 *     avuç yüzey 24/32 kullanıyor.
 *   - mobilde TEK sayılı boşluklar (15, 3, 5, 11, 9, 7, 13, 17, 1): web
 *     bunları Tailwind'in çeyrek-rem ızgarasında yazamıyor, yani o yüzeyler
 *     eşlenemez.
 *
 * Sayılar TAVAN: büyürse kapı düşer, küçülmesi serbest. Toplu bir düzeltme
 * yüz on dokuz yüzeyin görünümünü değiştirirdi ve hangi basamağa gideceği
 * yüzey yüzey bir karar - ölçüyü koyup borcu dondurmak dürüst olanı. */
const ALAN_RE = /(?:padding|paddingTop|paddingBottom|paddingLeft|paddingRight|paddingHorizontal|paddingVertical|margin|marginTop|marginBottom|marginLeft|marginRight|marginHorizontal|marginVertical|gap|rowGap|columnGap):\s*([\d.]+)/g;
const UTIL_RE = /(?<![\w-])(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y)-(\[[\d.]+px\]|[\d.]+)(?![\w-])/g;
const stripJs = (x) => x.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
async function walkDir(dir, out = []) {
  for (const e of await readdir(new URL("../" + dir + "/", import.meta.url), { withFileTypes: true })) {
    if (e.isDirectory()) await walkDir(dir + "/" + e.name, out);
    else if (/\.tsx?$/.test(e.name)) out.push(dir + "/" + e.name);
  }
  return out;
}
const OLCEK_PX = new Set(Object.values(WANT_SPACING));
const jetonOlmayan = [];
let tekPiksel = 0;
for (const f of await walkDir("mobile/src")) {
  if (/\/theme\//.test(f)) continue;
  const src = stripJs(await readFile(new URL("../" + f, import.meta.url), "utf8"));
  for (const m of src.matchAll(ALAN_RE)) {
    const px = Number(m[1]);
    if (OLCEK_PX.has(px)) jetonOlmayan.push(`${f}: ${m[0].trim()}`);
    else if (px % 2 === 1) tekPiksel += 1;
  }
}
/* ── TANIMSIZ JETON ────────────────────────────────────────────────────────
 *
 * `var(--radius-sm)` yazmak SESSİZCE hiçbir şey yapmıyor: CSS tanımsız bir
 * özel değişkeni görünce özelliği başlangıç değerine bırakıyor, yani köşe
 * yuvarlanmıyor ve hiçbir yerde hata çıkmıyor. Tam bu hata bu turda yazıldı:
 * ölçeğin `sm` basamağının web'deki adı `--radius-chip`, `--radius-sm` diye
 * bir jeton yok. Derleyici de, linter da, `check:radius` de sustu.
 *
 * Kural: `var(--x)` ile okunan her jeton bir yerde TANIMLI olmalı. Tanım üç
 * yerden gelebilir - CSS bloğu (`--x: …`), React stil nesnesi
 * (`"--x": …`) ve çalışma anında `setProperty("--x", …)`. Adı çalışma anında
 * kurulan jetonlar (`var(--color-${tone})`) kapsam dışı: adın kendisi sabit
 * değil. */
const cssVarTanim = new Set();
const cssVarKullanim = new Map();
/* `walkDir` YALNIZ .ts/.tsx doneruyor - CSS dosyalari disarida kaliyor ve ilk
   yazimda jetonlarin ASIL tanim yeri (globals.css) hic okunmadi: kapi yirmi
   jetonu "tanimsiz" saydi. Stil sayfasi ayrica ekleniyor. */
for (const m of css.matchAll(/(?:^|[\s;{])(--[\w-]+)\s*:/gm)) cssVarTanim.add(m[1]);
for (const f of [...(await walkDir("src"))]) {
  const src = await readFile(new URL("../" + f, import.meta.url), "utf8");
  for (const m of src.matchAll(/(?:^|[\s;{])(--[\w-]+)\s*:/gm)) cssVarTanim.add(m[1]);
  for (const m of src.matchAll(/["'](--[\w-]+)["']\s*[:,]/g)) cssVarTanim.add(m[1]);
  for (const m of src.matchAll(/setProperty\(\s*["'](--[\w-]+)["']/g)) cssVarTanim.add(m[1]);
  for (const m of src.matchAll(/var\((--[\w-]+)\s*[,)]/g)) {
    if (!cssVarKullanim.has(m[1])) cssVarKullanim.set(m[1], []);
    cssVarKullanim.get(m[1]).push(f);
  }
}
const tanimsiz = [...cssVarKullanim.entries()].filter(([v]) => !cssVarTanim.has(v));
if (tanimsiz.length) {
  for (const [v, yer] of tanimsiz) {
    problems.push(`tanımsız jeton: ${v} okunuyor ama hiçbir yerde tanımlı değil (${[...new Set(yer)].slice(0, 2).join(", ")})`);
  }
}

/* ── BİRİNCİL DÜĞMENİN DİKEY DOLGUSU ───────────────────────────────────────
 *
 * Aynı düğme iki platformda bir piksel farkla duruyordu: Android'in tam
 * genişlikli birincil düğmesi `paddingVertical: 15` (otuz altı yer), web'in
 * karşılığı `btn ... w-full py-3.5` yani 14 (kırk bir yer). Etiket zaten
 * aynıydı (`variant="h3"` ↔ `--text-h3`, 16/700), yani ayrışan tek şey
 * dolguydu - ve ikisi de ölçek dışıydı (15 ve 14).
 *
 * İkisi de `spacing.lg`/`py-4` (16) oldu: düğme yüksekliği artık iki
 * platformda aynı ve iki taraf da ölçek basamağında. Bu tek değişiklik tek
 * sayılı boşluk borcunun otuz altısını da kapattı.
 *
 * Ölçü ikisinin de GERİ DÖNMEDİĞİ: ne mobilde 15, ne webde tam genişlikli
 * bir `py-3.5`. */
let ctaSapan = [];
for (const f of await walkDir("mobile/src")) {
  const src = stripJs(await readFile(new URL("../" + f, import.meta.url), "utf8"));
  if (/paddingVertical: 15(?![\d.])/.test(src)) ctaSapan.push(`${f}: paddingVertical 15`);
}
for (const f of await walkDir("src")) {
  const src = stripJs(await readFile(new URL("../" + f, import.meta.url), "utf8"));
  for (const m of src.matchAll(/className="([^"]*)"/g)) {
    const cls = m[1];
    /* YALNIZ TAM GENISLIKLI dugme. Ilk yazimda `flex-1` de kapsamdaydi ve
       onay diyalogunun YAN YANA iki dugmesini de cevirmisti - oysa Android'de
       o dugmeler 14 (`ui/ConfirmDialog` `paddingVertical: 14`) ve deponun
       kendi kapisi ("onay diyalogunun olculeri") bunu hemen yakaladi. */
    if (/\bbtn\b/.test(cls) && /(?<![\w-])py-3\.5(?![\w-])/.test(cls) && /\bw-full\b/.test(cls)) {
      ctaSapan.push(`${f}: btn w-full py-3.5`);
    }
  }
}
if (ctaSapan.length) {
  problems.push(`birincil düğme dolgusu: ${ctaSapan.length} yüzey ölçek dışına döndü (ilk üç: ${ctaSapan.slice(0, 3).join(" · ")}) — iki platformda da 16`);
}

/* ── KART DOLGUSU ──────────────────────────────────────────────────────────
 *
 * Android'de kartın dolgusu TEK sayı: `ui/Card` `padding: spacing.lg` (16) ve
 * yüz yirmi dokuz kullanımın yalnız sekizinde yalnız DİKEY bir ayar var.
 * Web'de aynı `card` sınıfı beş ayrı dolguyla kullanılıyordu (20 seksen, 16
 * altmış dokuz, 24 on yedi, 12 yirmi dört, 32 üç). Yirmi yüzey Android'deki
 * karşılığı ölçülerek 16'ya çevrildi (sınav oynatıcısı, deneme oynatıcısı,
 * beceri sayfası ve dört iskelet - iskeletlerinki ayrıca ZIPLAMA hatasıydı:
 * gerçek sayfanın kartı 16, iskeleti 20'de duruyordu).
 *
 * MUAF olanlar ve sebepleri - hepsi ÖLÇÜLDÜ:
 *   diyaloglar (onay, mikrofon izni, bildirim)  Android'de de 20
 *       (`ui/ConfirmDialog` `padding: spacing.xl`)
 *   seviye testi                                Android `PlacementScreen`
 *       kart kullanmıyor, `padding: spacing.xl` (20)
 *   rol yapma sınavı                            Android `RoleplayExamScreen`
 *       dört yüzeyinin hepsinde `padding: spacing.xl` (20)
 *   tur sonucu ve başarım kartları               Android'in kendi bölünmüş
 *       ölçüleri (28/16 ve 20/16) - tek `p-` değil, yatay ve dikey ayrı yazılı
 *   tanıtım ve demo sayfaları (`app/page`, `demo-*`, `admin/*`)
 *       Android karşılığı YOK
 *   `components/skills/*` oynatıcıları            başka bir oturumun etkin
 *       alanı (beceri kütüphanesi); karşılığı da orada yazılıyor
 *
 * Geri kalan yirmi üç yüzey TAVAN: büyürse kapı düşer, küçülmesi serbest.
 * Her biri kendi Android karşılığına bakılarak çevrilebilir - bu turda yirmi
 * üç yüzey öyle çevrildi (sınav ve deneme oynatıcıları, beceri sayfası, dört
 * iskelet, boss, meydan okuma, giriş kabuğu) ve her birinin gerekçesi commit
 * mesajında yazılı. */
const KART_MUAF = /\/(?:confirm-dialog|mic-disclosure|report-dialog|placement-test|demo-placement|session-player|achievement-unlock|roleplay-exam)\.tsx$|\/placement\/loading\.tsx$|^src\/app\/page\.tsx$|^src\/app\/demo-|^src\/app\/admin\/|^src\/components\/skills\//;
let kartSapan = 0;
const kartYer = [];
for (const f of await walkDir("src")) {
  if (KART_MUAF.test(f)) continue;
  const satirlar = stripJs(await readFile(new URL("../" + f, import.meta.url), "utf8")).split("\n");
  satirlar.forEach((l, i) => {
    for (const m of l.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
      const cls = m[1] ?? m[2] ?? "";
      if (!/(?:^|\s)card(?:\s|$)/.test(cls)) continue;
      const p = cls.match(/(?<![\w-])p-([\d.]+)(?![\w-])/);
      if (!p || p[1] === "4") continue;
      kartSapan += 1;
      kartYer.push(`${f}:${i + 1} p-${p[1]}`);
    }
  });
}

let web24 = 0;
for (const f of await walkDir("src")) {
  const src = stripJs(await readFile(new URL("../" + f, import.meta.url), "utf8"));
  for (const m of src.matchAll(UTIL_RE)) {
    const raw = m[1];
    const px = raw.startsWith("[") ? Number(raw.slice(1, -3)) : Number(raw) * 4;
    if (px === 24 || px === 32) web24 += 1;
  }
}
/* Ölçüldüğü ANDAKİ sayılar. Küçülmesi serbest, büyümesi ayrışma. Web tarafı
   ilk ölçümde 119'du; on bir yüzey Android'in kendi sayılarına çevrildi:
   yedi uyarı kartı + hata sayfası (`card p-6` → `p-4`, web'in kendi
   `EmptyCard`ı da 16), iki tur sonucu kartı (`p-8` → 16/28, Android
   `rounds` sonuç kartı) ve başarım kartı (24 → 16/20, Android
   `AchievementUnlock`). */
const TAVAN = { tekPiksel: 75, web24: 104, kartSapan: 23 };
if (jetonOlmayan.length) {
  problems.push(`boşluk: mobilde ölçek basamağına eşit ${jetonOlmayan.length} ham sayı (ilk üç: ${jetonOlmayan.slice(0, 3).join(" · ")}) — \`spacing.*\` kullan`);
}
if (tekPiksel > TAVAN.tekPiksel) {
  problems.push(`boşluk: mobilde tek sayılı boşluk ${tekPiksel} (tavan ${TAVAN.tekPiksel}) — web bunları çeyrek-rem ızgarasında yazamıyor`);
}
if (kartSapan > TAVAN.kartSapan) {
  problems.push(`kart dolgusu: Android'in tek sayısından (16) sapan ${kartSapan} yüzey (tavan ${TAVAN.kartSapan}): ${kartYer.slice(0, 4).join(" · ")}`);
}
if (web24 > TAVAN.web24) {
  problems.push(`boşluk: webde 24/32 px boşluk ${web24} (tavan ${TAVAN.web24}) — Android ölçeği 20'den 28'e atlıyor`);
}

if (problems.length) {
  console.error("check:tokens — tasarım ölçekleri ayrışmış:");
  for (const p of problems) console.error("  " + p);
  console.error("\nMobil kaynak, web ona uyar. Ayrım bilinçliyse betikteki eşleme tablosuna SEBEBİYLE yaz.");
} else {
  console.log(`check:tokens — tipografi (${TYPE.length}), yarıçap (${RADII.length}), boşluk (${Object.keys(WANT_SPACING).length}) ve gölge (3 basamak + iki temanın tinti) ölçekleri iki platformda birebir: tamam`);
  console.log(`check:tokens — ${cssVarKullanim.size} jeton okunuyor, hepsi tanımlı (${cssVarTanim.size} tanım)`);
  console.log(`check:tokens — birincil düğmenin dikey dolgusu iki platformda da 16 (ölçek dışına dönen yok)`);
  console.log(`check:tokens — boşluğun çağrı yerleri: mobilde ölçeğe eşit ham sayı yok; borç: tek sayılı ${tekPiksel}/${TAVAN.tekPiksel} · web 24-32 px ${web24}/${TAVAN.web24} · kart dolgusu ${kartSapan}/${TAVAN.kartSapan}`);
}
process.exit(problems.length);
