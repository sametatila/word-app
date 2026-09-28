#!/usr/bin/env node
/**
 * Çekilen ekran görüntülerini tanıtım sayfasının WebP'lerine çevirir.
 *
 *   node scripts/shots/to-webp.mjs <set> [kaynak]
 *
 * <set>: dil çifti, `tr-de` | `en-de` | `de-en` | `tr-en` (bkz. `src/content/landing.ts`
 * `SCREEN_SET`). Kaynak varsayılan `.shots/<set>` (scripts/shots/sim.sh `cap` çıktısı):
 * `light/<ekran>.png` ve `dark/<ekran>.png`. Çıktı `public/landing/<set>/<ekran>-<tema>-<480|720>.webp`.
 * Yöntem: docs/store/screenshots.md
 */
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [set, src = path.join(".shots", set ?? "")] = process.argv.slice(2);
if (!set || !/^(tr|en|de)-(de|en)$/.test(set)) {
  console.error("kullanım: node scripts/shots/to-webp.mjs <tr-de|en-de|de-en|tr-en> [kaynak]");
  process.exit(1);
}
const out = path.join("public/landing", set);
mkdirSync(out, { recursive: true });
let n = 0;
for (const theme of ["light", "dark"]) {
  const dir = path.join(src, theme);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".png"))) {
    const screen = f.replace(/\.png$/, "");
    for (const w of [480, 720]) {
      await sharp(path.join(dir, f)).resize({ width: w }).webp({ quality: 80 }).toFile(path.join(out, `${screen}-${theme}-${w}.webp`));
      n++;
    }
  }
}
console.log(`${n} dosya → ${out}`);
