#!/usr/bin/env node
/**
 * Sohbet süzgecinin artikel sözlüğü (`lib/conversations/article-check`): data/app/words.json'daki
 * Almanca isimlerin cinsiyeti (der/die/das). Birden çok cinsiyeti olan isim (der/das Teil, der/die See)
 * ve çok sözcüklü kayıtlar dışarıda: süzgeç emin olmadığı ismi düzeltmez.
 * Üretilir, elle düzenlenmez: `node scripts/gen-noun-gender.mjs`; güncelliğini `npm run test:fix-guard` denetliyor.
 */
import { readFileSync, writeFileSync } from "node:fs";

export function nounGender() {
  const rows = JSON.parse(readFileSync("data/app/words.json", "utf8"));
  const list = Array.isArray(rows) ? rows : rows.words ?? [];
  const seen = new Map();
  for (const r of list) {
    if (!r || r.typ !== "Nomen" || !["der", "die", "das"].includes(r.artikel) || !/^[\p{Lu}][\p{L}]+$/u.test(r.de ?? "")) continue;
    const k = r.de.toLocaleLowerCase("de-DE");
    const prev = seen.get(k);
    seen.set(k, prev && prev !== r.artikel ? "?" : r.artikel);
  }
  return Object.fromEntries([...seen].filter(([, a]) => a !== "?").sort(([a], [b]) => (a < b ? -1 : 1)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const out = "src/lib/conversations/noun-gender.generated.json";
  const g = nounGender();
  writeFileSync(out, JSON.stringify(g) + "\n");
  console.log(`${out}: ${Object.keys(g).length} isim`);
}
