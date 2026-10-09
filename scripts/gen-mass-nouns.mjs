#!/usr/bin/env node
/**
 * Sohbet süzgecinin (`lib/conversations/fix-guard`) sayılamayan isim listesi:
 * data/app/words.json'da biçimi "(Sg.)" olan Almanca isimler (Zahnpasta, Wasser,
 * Geld…). Süzgeç bunların önüne yalnız belirsiz artikel ekleyen düzeltmeyi siliyor
 * (QA F-0008: "Ich brauche Zahnpasta → Ich brauche eine Zahnpasta (Artikel)").
 * Liste üretilir, elle düzenlenmez: `node scripts/gen-mass-nouns.mjs`; güncelliğini
 * `npm run test:fix-guard` denetliyor.
 */
import { readFileSync, writeFileSync } from "node:fs";

export function massNouns() {
  const rows = JSON.parse(readFileSync("data/app/words.json", "utf8"));
  const list = (Array.isArray(rows) ? rows : rows.words ?? [])
    .filter((r) => r && r.typ === "Nomen" && /\(Sg\.\)/.test(r.formen ?? "") && /^[\p{L}-]+$/u.test(r.de ?? ""))
    .map((r) => r.de.toLocaleLowerCase("de-DE").replace(/ß/g, "ss"));
  return [...new Set(list)].sort();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const out = "src/lib/conversations/mass-nouns.generated.json";
  writeFileSync(out, JSON.stringify(massNouns()) + "\n");
  console.log(`${out}: ${massNouns().length} isim`);
}
