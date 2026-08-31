/**
 * Paletin ölçümü: `node scripts/palette-check.mjs`
 *
 * Renkleri BURADA tutmuyor, `src/app/globals.css` dosyasından OKUYOR. Sabit bir
 * kopya tutulsaydı palet değiştiğinde araç sessizce eskiyecek ve "geçti" demeye
 * devam edecekti — ölçmeyen bir ölçüm aracı, hiç olmamasından kötüdür.
 *
 * İki şey ölçülüyor:
 *
 *   WCAG 2.1 kontrast oranı — okunabilirlik. Normal metin için eşik 4.5.
 *
 *   CIEDE2000 (ΔE) — iki rengin insan gözüne ne kadar ayrı geldiği. Kategorik
 *   ölçeklerde (CEFR rozetleri, der/die/das) renk TEK BAŞINA anlam taşıyor;
 *   iki renk karışırsa kullanıcı yanlış bilgi okur.
 *
 * ── İKİ KADEMELİ EŞİK ──────────────────────────────────────────────────────
 *
 *   KATI (ΔE >= 20): rengin tek taşıyıcı olduğu yerler — seviye rozetleri,
 *   artikel renkleri. Yanlarında rengi açıklayan etiket yok.
 *
 *   GEVŞEK (ΔE >= 12): rengin ikon ve etiketle birlikte çalıştığı yerler —
 *   başlıktaki seri (ateş ikonu + sayı) ile XP (kıvılcım ikonu + sayı).
 *
 * Çıkış kodu başarısız ölçüm sayısıdır, yani doğrudan bir denetim adımı olarak
 * kullanılabilir.
 */
import { readFile } from "node:fs/promises";

const CSS = new URL("../src/app/globals.css", import.meta.url);

// ─── renk uzayı ────────────────────────────────────────────────────────────

const hex2rgb = (h) => {
  let s = h.replace("#", "").trim();
  if (s.length === 3) s = s.split("").map((c) => c + c).join("");
  const n = parseInt(s, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const rgb2hex = ([r, g, b]) =>
  "#" + [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");

function luminance(hex) {
  const [r, g, b] = hex2rgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG kontrast oranı, 1 ile 21 arasında. */
function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

function lab(hex) {
  const [r, g, b] = hex2rgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  const X = (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) / 0.95047;
  const Y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
  const Z = (r * 0.0193339 + g * 0.119192 + b * 0.9503041) / 1.08883;
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (841 / 108) * t + 4 / 29);
  const [fx, fy, fz] = [f(X), f(Y), f(Z)];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

/** CIEDE2000 — algısal renk farkı. */
function deltaE(h1, h2) {
  const [L1, a1, b1] = lab(h1), [L2, a2, b2] = lab(h2);
  const rad = Math.PI / 180, deg = 180 / Math.PI;
  const C1 = Math.hypot(a1, b1), C2 = Math.hypot(a2, b2), Cb = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)));
  const ap1 = (1 + G) * a1, ap2 = (1 + G) * a2;
  const Cp1 = Math.hypot(ap1, b1), Cp2 = Math.hypot(ap2, b2);
  const hp = (bb, ap) => { if (bb === 0 && ap === 0) return 0; const d = Math.atan2(bb, ap) * deg; return d >= 0 ? d : d + 360; };
  const hp1 = hp(b1, ap1), hp2 = hp(b2, ap2);
  const dLp = L2 - L1, dCp = Cp2 - Cp1;
  let dhp = 0;
  if (Cp1 * Cp2 !== 0) { dhp = hp2 - hp1; if (dhp > 180) dhp -= 360; else if (dhp < -180) dhp += 360; }
  const dHp = 2 * Math.sqrt(Cp1 * Cp2) * Math.sin((dhp / 2) * rad);
  const Lbp = (L1 + L2) / 2, Cbp = (Cp1 + Cp2) / 2;
  let hbp = hp1 + hp2;
  if (Cp1 * Cp2 !== 0) { if (Math.abs(hp1 - hp2) > 180) hbp = hbp < 360 ? hbp + 360 : hbp - 360; hbp /= 2; }
  const T = 1 - 0.17 * Math.cos((hbp - 30) * rad) + 0.24 * Math.cos(2 * hbp * rad)
    + 0.32 * Math.cos((3 * hbp + 6) * rad) - 0.2 * Math.cos((4 * hbp - 63) * rad);
  const Rc = 2 * Math.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7));
  const Sl = 1 + (0.015 * (Lbp - 50) ** 2) / Math.sqrt(20 + (Lbp - 50) ** 2);
  const Sc = 1 + 0.045 * Cbp, Sh = 1 + 0.015 * Cbp * T;
  const Rt = -Math.sin(2 * (30 * Math.exp(-(((hbp - 275) / 25) ** 2))) * rad) * Rc;
  return Math.sqrt((dLp / Sl) ** 2 + (dCp / Sc) ** 2 + (dHp / Sh) ** 2 + Rt * (dCp / Sc) * (dHp / Sh));
}

/** CSS `color-mix(in srgb, A p%, B)` karşılığı. */
const mix = (a, p, b) => {
  const [r1, g1, b1] = hex2rgb(a), [r2, g2, b2] = hex2rgb(b), t = p / 100;
  return rgb2hex([r1 * t + r2 * (1 - t), g1 * t + g2 * (1 - t), b1 * t + b2 * (1 - t)]);
};

// ─── globals.css'i oku ─────────────────────────────────────────────────────

const css = await readFile(CSS, "utf8");

/** Bir blok içindeki `--ad: değer;` çiftlerini toplar. */
function block(selector) {
  const i = css.indexOf(selector);
  if (i < 0) throw new Error(`globals.css içinde ${selector} yok`);
  const open = css.indexOf("{", i);
  let depth = 0, end = open;
  for (let j = open; j < css.length; j++) {
    if (css[j] === "{") depth++;
    else if (css[j] === "}" && --depth === 0) { end = j; break; }
  }
  const out = {};
  for (const m of css.slice(open, end).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

const theme = block("@theme");
const root = block(":root");
const dark = block(".dark");

/** `var(--x)` zincirlerini gerçek hex'e indirger. */
function resolve(value, scope) {
  let v = value, guard = 0;
  while (v.startsWith("var(") && guard++ < 10) {
    const name = v.slice(4, v.indexOf(")")).trim();
    v = (scope[name] ?? theme[name] ?? "").trim();
    if (!v) throw new Error(`çözülemedi: ${value}`);
  }
  return v;
}

const L = {}, D = {};
for (const k of ["--bg", "--surface", "--surface-2", "--border", "--text", "--text-muted"]) {
  L[k] = resolve(root[k], root);
  D[k] = resolve(dark[k] ?? root[k], dark);
}
/** Tema duyarlı vurgu: açık ya da koyu temadaki gerçek değeri. */
const tone = (fam, theme_) => resolve((theme_ === "dark" ? dark : root)[`--color-${fam}`], theme_ === "dark" ? dark : root);
/** Sabit rampa basamağı. */
const step = (fam, n) => resolve(theme[`--color-${fam}-${n}`], root);

// ─── raporlama ─────────────────────────────────────────────────────────────

const C = { ok: "\x1b[32m", warn: "\x1b[33m", bad: "\x1b[31m", dim: "\x1b[2m", b: "\x1b[1m", off: "\x1b[0m" };
const sw = (hex) => { const [r, g, b] = hex2rgb(hex); return `\x1b[48;2;${r};${g};${b}m   ${C.off}`; };
let fails = 0;

const title = (t) => console.log(`\n${C.b}${t}${C.off}`);

function contrastRows(rows, min = 4.5) {
  for (const [name, fg, bg, need = min] of rows) {
    const c = contrast(fg, bg), pass = c >= need;
    if (!pass) fails++;
    console.log(`  ${sw(bg)}${sw(fg)} ${name.padEnd(32)} ${(pass ? C.ok : C.bad)}${c.toFixed(2).padStart(5)}${C.off} ${C.dim}/ ${need}${C.off}  ${pass ? "gecer" : "KALIR"}`);
  }
}

function distinct(named, min, note) {
  const keys = Object.keys(named);
  let worst = Infinity, pair = "";
  for (let i = 0; i < keys.length; i++)
    for (let j = i + 1; j < keys.length; j++) {
      const d = deltaE(named[keys[i]], named[keys[j]]);
      if (d < worst) { worst = d; pair = `${keys[i]} / ${keys[j]}`; }
      if (d < min) fails++;
    }
  const ok = worst >= min;
  console.log(`  ${Object.values(named).map(sw).join("")} ${note.padEnd(30)} en yakin ${pair.padEnd(16)} ${(ok ? C.ok : C.bad)}dE ${worst.toFixed(1).padStart(5)}${C.off} ${C.dim}/ ${min}${C.off}  ${ok ? "gecer" : "KALIR"}`);
}

const W = "#ffffff";
const MASCOT_INK = "#2f1911";

title("1. TEMEL METIN");
contrastRows([
  ["acik: metin / zemin", L["--text"], L["--bg"]],
  ["acik: metin / kart", L["--text"], L["--surface"]],
  ["acik: metin / yuzey-2", L["--text"], L["--surface-2"]],
  ["acik: soluk / zemin", L["--text-muted"], L["--bg"]],
  ["acik: soluk / kart", L["--text-muted"], L["--surface"]],
  ["koyu: metin / zemin", D["--text"], D["--bg"]],
  ["koyu: metin / kart", D["--text"], D["--surface"]],
  ["koyu: metin / yuzey-2", D["--text"], D["--surface-2"]],
  ["koyu: soluk / zemin", D["--text-muted"], D["--bg"]],
  ["koyu: soluk / kart", D["--text-muted"], D["--surface"]],
]);

title("2. BIRINCIL BUTON  (kehribar zemin + maskotun koyu kahvesi)");
contrastRows([
  ["koyu kahve / kehribar 300", MASCOT_INK, step("brand", 300)],
  ["koyu kahve / kehribar 400", MASCOT_INK, step("brand", 400)],
  ["koyu kahve / kehribar 500", MASCOT_INK, step("brand", 500)],
  ["beyaz / derin panel 600", W, step("brand", 600)],
  ["beyaz / derin panel 800", W, step("brand", 800)],
]);

title("3. TEMA DUYARLI VURGULAR  (yazi olarak)");
const FAMS = ["brand", "mint", "rose", "flame", "sky", "violet"];
contrastRows(FAMS.flatMap((f) => [
  [`acik: ${f} / kart`, tone(f, "light"), L["--surface"]],
  [`acik: ${f} / zemin`, tone(f, "light"), L["--bg"]],
  [`koyu: ${f} / kart`, tone(f, "dark"), D["--surface"]],
  [`koyu: ${f} / zemin`, tone(f, "dark"), D["--bg"]],
]));

title("4. CEFR ROZETLERI  (dolu zemin + beyaz yazi)  [KATI]");
const BADGE = { A1: step("mint", 600), A2: step("sky", 600), B1: step("violet", 600), B2: step("brand", 600), C1: step("rose", 600) };
contrastRows(Object.entries(BADGE).map(([k, v]) => [`beyaz / ${k}`, W, v]));
distinct(BADGE, 20, "renk tek tasiyici");

title("5. ARTIKEL der / die / das  [KATI]");
const AL = { der: step("sky", 600), die: step("rose", 600), das: step("mint", 600) };
const AD = { der: step("sky", 300), die: step("rose", 300), das: step("mint", 300) };
contrastRows([
  ...Object.entries(AL).map(([k, v]) => [`acik: ${k} yazi / kart`, v, L["--surface"]]),
  ...Object.entries(AD).map(([k, v]) => [`koyu: ${k} yazi / kart`, v, D["--surface"]]),
  ...Object.entries(AL).map(([k, v]) => [`${k} rozet zemini / beyaz`, W, v]),
]);
distinct(AL, 20, "acik tema");
distinct(AD, 20, "koyu tema");

title("6. SONUC SERITLERI  (globals.css color-mix formulu)");
contrastRows([["acik", "light", L], ["koyu", "dark", D]].flatMap(([tn, key, T]) =>
  [["correct", "mint"], ["wrong", "rose"]].map(([vn, fam]) => {
    const a = tone(fam, key);
    return [`${tn}: ${vn} seridi`, mix(a, 55, T["--text"]), mix(a, 16, T["--surface"])];
  })));

title("7. SIK DURUMLARI");
contrastRows([["acik", "light", L], ["koyu", "dark", D]].flatMap(([tn, key, T]) => [
  ...[["correct", "mint"], ["wrong", "rose"]].map(([vn, fam]) =>
    [`${tn}: ${vn} sik metni`, T["--text"], mix(tone(fam, key), 14, T["--surface"])]),
  [`${tn}: secili sik metni`, T["--text"], mix(tone("brand", key), 8, T["--surface"])],
]));

title("8. AYRISMA  [GEVSEK — ikon ve etiketle birlikte]");
for (const [tn, key] of [["acik", "light"], ["koyu", "dark"]]) {
  distinct({ brand: tone("brand", key), streak: tone("flame", key), wrong: tone("rose", key) }, 12, `${tn}: brand / streak / wrong`);
  distinct(Object.fromEntries(FAMS.map((f) => [f, tone(f, key)])), 12, `${tn}: alti modul vurgusu`);
}

console.log(
  fails === 0
    ? `\n${C.ok}${C.b}TUM OLCUMLER GECTI${C.off}\n`
    : `\n${C.bad}${C.b}${fails} OLCUM BASARISIZ${C.off}\n`,
);
process.exit(Math.min(fails, 250));
