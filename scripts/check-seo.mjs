#!/usr/bin/env node
/**
 * ARAMA KAPISI (Search Console, 2026-10-07) — `npm run check:seo`.
 *
 * Uygulama sayfaları (`src/app/(app)/*`) oturum istiyor; girişsiz istek `src/proxy.ts`te gerçek
 * 307 → /login alıyor, yoksa sayfa akışla 200 dönüp yönlendirmeyi içinde yapıyor ve Google onu
 * içeriksiz sayfa olarak tarıyor ("Tarandı, dizine eklenmedi"). Bu kapı:
 *   1. `APP_SECTIONS` = `(app)` altındaki bölüm klasörleri (fazla/eksik yok);
 *   2. her bölüm eşleştiricide `/<bölüm>/:path*` olarak var;
 *   3. `(app)/layout.tsx` `noindex` taşıyor;
 *   4. hukuki belgelerin dil alt yolları eşleştiricide.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const appDir = join(root, "src/app/(app)");
const dirs = readdirSync(appDir).filter((d) => statSync(join(appDir, d)).isDirectory() && !d.startsWith("(") && !d.startsWith("_")).sort();
const proxy = readFileSync(join(root, "src/proxy.ts"), "utf8");
const listMatch = proxy.match(/APP_SECTIONS = \[([\s\S]*?)\] as const/);
const sections = listMatch ? [...listMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]).sort() : [];
const errors = [];
const missing = dirs.filter((d) => !sections.includes(d));
const extra = sections.filter((s) => !dirs.includes(s));
if (missing.length) errors.push(`APP_SECTIONS'ta yok (aramaya açık kalır): ${missing.join(", ")}`);
if (extra.length) errors.push(`APP_SECTIONS'ta fazla (klasör yok): ${extra.join(", ")}`);
const matcher = proxy.slice(proxy.indexOf("export const config"));
for (const d of dirs) if (!matcher.includes(`"/${d}/:path*"`)) errors.push(`eşleştiricide yok: /${d}/:path*`);
for (const doc of ["privacy", "terms", "support", "impressum"]) if (!matcher.includes(`"/${doc}/:locale"`)) errors.push(`eşleştiricide yok: /${doc}/:locale`);
const layout = readFileSync(join(appDir, "layout.tsx"), "utf8");
if (!/robots:\s*\{\s*index:\s*false/.test(layout)) errors.push("(app)/layout.tsx noindex taşımıyor");
if (errors.length) {
  console.error("check:seo — " + errors.length + " sorun:\n  " + errors.join("\n  "));
  process.exit(1);
}
console.log(`check:seo — tamam: ${dirs.length} uygulama bölümü proxy'de ve noindex, 4 hukuki belgenin dil yolu eşleşiyor`);
