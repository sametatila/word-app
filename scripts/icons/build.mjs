/**
 * Arayüz ikon setini tek kaynaktan üretir: `npm run icons:build`
 * Kapı: `npm run icons:check` (yazmaz; üretilen dosyalar kaynaktan ayrıştıysa 1 döner).
 *
 * KAYNAK: `data/icons/picks.json` — ANLAM başına bir satır (`id`, `meaning`,
 * `remix`). Samet ikon seçim sayfasında her anlama bir Remix Icon glifi seçti
 * (2026-09-29). Eski set elle çizilmişti ve bir glif birden çok anlam
 * taşıyordu: `BoltIcon` yedi yerde yedi ayrı şey demekti (XP, günlük tur, yeni
 * kelime, süre bonusu, karışık tur, "güçlü" tepkisi, hoş geldin); aynı adlı
 * ikon webde ve mobilde iki ayrı çizimdi (el sıkışma, zarf, kupa, …).
 *
 * ÇIKTI: iki dosya, AYNI yol verisiyle.
 *   - web:   `src/components/icons.remix.generated.tsx` (`<svg>`)
 *   - mobil: `mobile/src/ui/icons.remix.generated.tsx` (`react-native-svg`)
 * Bileşen adı satırın kimliğinden: `xp` → `XpIcon`, `tab-learn` →
 * `TabLearnIcon`. İki platformda aynı ad aynı anlam aynı glif; `check:parity`
 * iki dosyanın ad → yol eşlemesini birebir karşılaştırıyor.
 *
 * NEDEN 4.8.0'A SABİT: Remix Icon 4.9.0'da (Ocak 2026) lisansını Apache-2.0'dan
 * kendi "Remix Icon License v1.0"ına çevirdi (paketin `package.json`ı hâlâ
 * Apache-2.0 diyor, `License` dosyası demiyor). Seçilen 109 glifin hepsi
 * 4.8.0'da bayt bayt aynı. Sürüm `package.json`da `^`siz yazılı ve betik
 * lisans dosyasını da okuyor: yükseltme sessizce lisans değiştirmesin.
 *
 * Font ve CSS pakete girmiyor: yalnız SVG yol verisi okunup koda gömülüyor.
 * Glifler dolgu tabanlı (Remix "line" ailesi, 24×24, 2 birim çizginin
 * dışlanmış hâli): webde `fill="currentColor"`, mobilde `fill={color}`.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const PICKS = path.join(ROOT, "data", "icons", "picks.json");
const OUT_WEB = path.join(ROOT, "src", "components", "icons.remix.generated.tsx");
const OUT_MOBILE = path.join(ROOT, "mobile", "src", "ui", "icons.remix.generated.tsx");
const REMIX_VERSION = "4.8.0";

const require = createRequire(import.meta.url);
const remixRoot = path.dirname(require.resolve("remixicon/package.json", { paths: [ROOT] }));
const remixPkg = JSON.parse(readFileSync(path.join(remixRoot, "package.json"), "utf8"));
const fail = (msg) => {
  console.error(`icons: ${msg}`);
  process.exit(1);
};
if (remixPkg.version !== REMIX_VERSION) fail(`remixicon ${remixPkg.version} kurulu, beklenen ${REMIX_VERSION} (npm ci).`);
if (!/^\s*Apache License\s+Version 2\.0/.test(readFileSync(path.join(remixRoot, "License"), "utf8")))
  fail("remixicon lisans dosyası Apache-2.0 değil; sürümü yükseltmeden önce lisansı yeniden değerlendir.");

/* Kategori klasörünü bilmeden ada göre bul: `icons/<Kategori>/<ad>.svg`. */
const byName = new Map();
{
  const { readdirSync } = await import("node:fs");
  const dir = path.join(remixRoot, "icons");
  for (const cat of readdirSync(dir)) {
    for (const f of readdirSync(path.join(dir, cat))) if (f.endsWith(".svg")) byName.set(f.slice(0, -4), path.join(dir, cat, f));
  }
}

const picks = JSON.parse(readFileSync(PICKS, "utf8"));
const rows = picks.rows;
const pascal = (id) => id.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join("") + "Icon";
const seenId = new Set();
const icons = rows.map((r) => {
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(r.id)) fail(`geçersiz kimlik: ${r.id}`);
  if (seenId.has(r.id)) fail(`kimlik iki kez: ${r.id}`);
  seenId.add(r.id);
  const file = byName.get(r.remix);
  if (!file) fail(`${r.id}: remixicon'da "${r.remix}" yok`);
  const svg = readFileSync(file, "utf8");
  if (!/viewBox="0 0 24 24"/.test(svg)) fail(`${r.remix}: 24×24 değil`);
  const paths = [...svg.matchAll(/<path\b([^>]*)\/?>/g)];
  /* Seçilen gliflerin hepsi tek yol, ek öznitelik yok (fill-rule, opacity).
     Öyle olmayan bir glif gelirse sessizce yarım çizilmesin. */
  if (paths.length !== 1 || /<(?!svg|path|\/svg)/.test(svg)) fail(`${r.remix}: tek <path> değil`);
  const d = (paths[0][1].match(/\sd="([^"]+)"/) ?? [])[1];
  if (!d || /\s(fill-rule|clip-rule|opacity|transform)=/.test(paths[0][1])) fail(`${r.remix}: beklenmeyen yol öznitelikleri`);
  return { id: r.id, name: pascal(r.id), meaning: r.meaning, remix: r.remix, d };
});

const HEAD = (platform) => `/*
 * ÜRETİLDİ — elle düzenleme. Kaynak: data/icons/picks.json + remixicon@${REMIX_VERSION}
 * (Apache-2.0, © Remix Design). Yeniden üret: \`npm run icons:build\`; kapı:
 * \`npm run icons:check\` ve \`check:parity\` (web ve mobil yol verisi birebir).
 *
 * Anlam başına bir bileşen; ad satır kimliğinden (\`xp\` → \`XpIcon\`). Bir
 * glifi başka bir anlam için kullanma: yeni anlam picks.json'a yeni satır.
 * ${platform}
 */`;

const body = icons
  .map((i) => `/** ${i.meaning} — remix \`${i.remix}\` */\nexport const ${i.name} = /* @__PURE__ */ icon("${i.name}", "${i.d}");`)
  .join("\n");
const meanings = `/** Anlam kimlikleri — sunucunun gönderdiği glif adı (ör. rozet \`glyph\`) bu kümeden. */\nexport type IconMeaning =\n${icons.map((i) => `  | "${i.id}"`).join("\n")};`;

const web = `${HEAD("Web: `fill=\"currentColor\"`, boy `size` (varsayılan 24), öteki öznitelikler `<svg>`e.")}
import type { SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "strokeWidth"> & { size?: number };

function icon(name: string, d: string) {
  const C = ({ size = 24, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d={d} />
    </svg>
  );
  C.displayName = name;
  return C;
}

${meanings}

${body}
`;

const mobile = `${HEAD("Mobil: `react-native-svg`, `fill={color}`, boy `size` (varsayılan 24).")}
import React from "react";
import Svg, { Path } from "react-native-svg";

export type IconProps = { color?: string; size?: number };

function icon(name: string, d: string) {
  const C = ({ color = "#000", size = 24 }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={d} fill={color} />
    </Svg>
  );
  C.displayName = name;
  return C;
}

${meanings}

${body}
`;

const outputs = [
  [OUT_WEB, web],
  [OUT_MOBILE, mobile],
];
if (process.argv.includes("--check")) {
  const stale = outputs.filter(([p, s]) => {
    try {
      return readFileSync(p, "utf8") !== s;
    } catch {
      return true;
    }
  });
  for (const [p] of stale) console.error(`icons: ${path.relative(ROOT, p)} kaynaktan ayrışmış — \`npm run icons:build\``);
  if (stale.length) process.exit(1);
  console.log(`icons: ${icons.length} ikon, iki dosya güncel`);
} else {
  for (const [p, s] of outputs) writeFileSync(p, s);
  console.log(`icons: ${icons.length} ikon → ${outputs.map(([p]) => path.relative(ROOT, p)).join(", ")}`);
}
