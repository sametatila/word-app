/**
 * Ders kalıplarının İngilizce kullanım notlarını denetler:
 *   `node data/lessons/patterns/check.mjs [paket|all]`
 *
 * Kurallar sözlükçe kapısıyla aynı aileden ama bir tanesi farklı: burada
 * yazılan şey kalıbın ÇEVİRİSİ değil, ne işe yaradığı. O yüzden "karşılık
 * Almancanın aynısı" kuralı yok — zaten olamaz — ama "not, Almanca kalıbın
 * kendisiyle başlıyor" bir uyarı: kullanım notu yerine çeviri yazılmış
 * olabilir.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractVocab } from "../vocab/extract.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors = [];
const warnings = [];
const written = new Map();

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json"))) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8"))) {
      const key = `${r.lesson} ${r.de}`;
      const H = (m) => errors.push(`  [${packet}] ${r.lesson} «${r.de}» — ${m}`);
      const U = (m) => warnings.push(`  [${packet}] ${r.lesson} «${r.de}» — ${m}`);
      if (written.has(key)) H("aynı kalıp iki pakette");
      const en = String(r.en ?? "").trim();
      if (!en) H("not boş");
      else if (en.length < 4) H(`not çok kısa: «${en}»`);
      else if (en.length > 90) U(`not uzun (${en.length})`);
      written.set(key, en);
    }
  }

// Pakete ait olmayan kalıp — anahtar elle yazılmışsa sessizce kaybolurdu.
const real = new Set(extractVocab("patterns").map((r) => `${r.lesson} ${r.de}`));
for (const key of written.keys())
  if (!real.has(key)) errors.push(`  [pakete ait değil] ${key}`);

let coverage = null;
if (ARG === "all") {
  const rows = extractVocab("patterns");
  const missing = rows.filter((r) => !written.has(`${r.lesson} ${r.de}`)).length;
  coverage = { rows: rows.length, missing };
  if (missing) errors.push(`  [kapsam] ${missing} kalıbın İngilizce notu yok`);
}

if (errors.length) {
  console.log(`\nHATA (${errors.length}):`);
  console.log(errors.slice(0, 40).join("\n"));
  if (errors.length > 40) console.log(`  … ${errors.length - 40} tane daha`);
}
if (warnings.length) {
  console.log(`\nuyarı (${warnings.length}):`);
  console.log(warnings.slice(0, 20).join("\n"));
}
console.log(
  `\nözet: ${written.size} kalıp notu · ${errors.length} hata · ${warnings.length} uyarı` +
    (coverage ? `\nkapsam: ${coverage.rows - coverage.missing}/${coverage.rows}` : ""),
);
process.exit(errors.length ? 1 : 0);
