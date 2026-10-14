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

/**
 * Sayı belirsiz isimler (panel #123, #124; 2026-10-14):
 * - `samePlural`: çoğulu tekiliyle aynı ("-": Kuchen, Lehrer, Zimmer). Artikelsiz hâli çoğul
 *   okunabilir: "Ich bringe Kuchen mit" doğru, "einen Kuchen" eklemek düzeltme değil.
 * - `numberFree`: fiil tekil de çoğul da olabilir ya da yalnız çoğul olur: dişil "-" (Jeans,
 *   SMS: "die Jeans gefallen/gefällt") ve "(Pl.)" (Eltern, Leute). Fiili tekile çeken düzeltme siliniyor.
 */
export function nounNumber() {
  const rows = JSON.parse(readFileSync("data/app/words.json", "utf8"));
  const nouns = (Array.isArray(rows) ? rows : rows.words ?? []).filter((r) => r && r.typ === "Nomen" && /^[\p{L}-]+$/u.test(r.de ?? ""));
  const key = (r) => r.de.toLocaleLowerCase("de-DE").replace(/ß/g, "ss");
  const uniq = (list) => [...new Set(list.map(key))].sort();
  return {
    samePlural: uniq(nouns.filter((r) => r.formen === "-")),
    numberFree: uniq(nouns.filter((r) => r.formen === "(Pl.)" || (r.formen === "-" && r.artikel === "die"))),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const out = "src/lib/conversations/mass-nouns.generated.json";
  writeFileSync(out, JSON.stringify(massNouns()) + "\n");
  console.log(`${out}: ${massNouns().length} isim`);
  const out2 = "src/lib/conversations/noun-number.generated.json";
  const nn = nounNumber();
  writeFileSync(out2, JSON.stringify(nn) + "\n");
  console.log(`${out2}: ${nn.samePlural.length} aynı çoğul, ${nn.numberFree.length} sayısı serbest`);
}
