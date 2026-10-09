#!/usr/bin/env node
/**
 * Değerlendirmenin ayrılabilir fiil denetiminin (`lib/separable-check`) fiil
 * listesi: data/app/words.json'da biçimi "<gövde> <önek>, …" olan Almanca
 * fiiller (abbiegen "biegt ab", mitnehmen "nimmt mit"). Her satır
 * [mastar, önek, 3. tekil gövde]; gövdenin öbür çekimleri denetimde türetiliyor.
 * Liste üretilir, elle düzenlenmez: `node scripts/gen-separable-verbs.mjs`;
 * güncelliğini `npm run test:separable` denetliyor.
 */
import { readFileSync, writeFileSync } from "node:fs";

/** Ayrılabilen önekler. durch/über/unter/um-belirsizlerinden yalnız "um" (umsteigen, umziehen) alındı. */
export const PREFIXES = "ab an auf aus bei ein fern fest fort her heraus herein hin hinaus los mit nach vor vorbei weg weiter zu zurück zusammen um".split(" ");

export function separableVerbs() {
  const rows = JSON.parse(readFileSync("data/app/words.json", "utf8"));
  const prefixes = new Set(PREFIXES);
  const out = new Map();
  for (const r of Array.isArray(rows) ? rows : rows.words ?? []) {
    if (!r || r.typ !== "Verb" || !r.formen || !r.de) continue;
    const inf = String(r.de).replace(/^sich\s+/, "").trim();
    if (!/^[\p{Ll}]+$/u.test(inf)) continue; // "auf sein", "kennen lernen" gibi öbekler dışarıda
    const m = String(r.formen).split(",")[0].trim().match(/^(?:sich\s+)?(\p{Ll}+)\s+(\p{Ll}+)$/u);
    if (!m || !prefixes.has(m[2]) || !inf.startsWith(m[2]) || inf.length <= m[2].length + 2) continue;
    out.set(inf, [inf, m[2], m[1]]);
  }
  return [...out.values()].sort((a, b) => a[0].localeCompare(b[0], "de"));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const file = "src/lib/separable-verbs.generated.json";
  const list = separableVerbs();
  writeFileSync(file, JSON.stringify(list) + "\n");
  console.log(`${file}: ${list.length} fiil`);
}
