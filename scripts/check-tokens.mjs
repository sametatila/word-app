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
import { readFile } from "node:fs/promises";

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

if (problems.length) {
  console.error("check:tokens — tasarım ölçekleri ayrışmış:");
  for (const p of problems) console.error("  " + p);
  console.error("\nMobil kaynak, web ona uyar. Ayrım bilinçliyse betikteki eşleme tablosuna SEBEBİYLE yaz.");
} else {
  console.log(`check:tokens — tipografi (${TYPE.length}), yarıçap (${RADII.length}), boşluk (${Object.keys(WANT_SPACING).length}) ve gölge (3 basamak + iki temanın tinti) ölçekleri iki platformda birebir: tamam`);
}
process.exit(problems.length);
