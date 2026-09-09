/**
 * Ders başlık ve özetlerinin İngilizcesini denetler:
 *   `node data/lessons/meta/check.mjs [paket|all]`
 *
 * Kurallar kardeş hatlarla aynı aileden; iki tanesi bu alana özgü:
 *
 * - Özet bir CÜMLEDİR (ders neyi öğretiyor), başlık ise bir AD. Başlığın
 *   nokta ile bitmesi ya da özetin bitmemesi ikisinin karıştığını gösterir.
 * - Başlık, Almanca `title` alanının çevirisi DEĞİL: Almanca başlık dersin
 *   kendi cümlesidir ("Hallo!"), Türkçe başlık ise konunun adı ("Tanışma").
 *   İngilizcesi de konunun adı olmalı, o yüzden Almancanın aynısı uyarı.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractMeta } from "./make.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors = [];
const warnings = [];
const written = new Map();
const german = new Map(extractMeta().map((r) => [r.lesson, r.title]));

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json"))) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8"))) {
      const H = (m) => errors.push(`  [${packet}] ${r.lesson} — ${m}`);
      const U = (m) => warnings.push(`  [${packet}] ${r.lesson} — ${m}`);
      if (written.has(r.lesson)) H("aynı ders iki pakette");
      const t = String(r.titleEn ?? "").trim();
      const s = String(r.summaryEn ?? "").trim();
      if (!t) H("başlık boş");
      else if (t.length > 40) U(`başlık uzun (${t.length})`);
      else if (/[.]$/.test(t)) U("başlık nokta ile bitiyor — özetle karışmış olabilir");
      else if (german.get(r.lesson) && t.toLowerCase() === german.get(r.lesson).toLowerCase())
        U("başlık Almancanın aynısı — konu adı değil ders cümlesi yazılmış olabilir");
      if (!s) H("özet boş");
      else if (!/[.!?]$/.test(s)) H("özet noktalama ile bitmiyor");
      else if (s.length < 20) H(`özet çok kısa (${s.length})`);
      written.set(r.lesson, true);
    }
  }

for (const lesson of written.keys())
  if (!german.has(lesson)) errors.push(`  [pakete ait değil] ${lesson}`);

let coverage = null;
if (ARG === "all") {
  const rows = extractMeta();
  const missing = rows.filter((r) => !written.has(r.lesson)).length;
  coverage = { rows: rows.length, missing };
  if (missing) errors.push(`  [kapsam] ${missing} dersin İngilizce başlık/özeti yok`);
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
  `\nözet: ${written.size} ders · ${errors.length} hata · ${warnings.length} uyarı` +
    (coverage ? `\nkapsam: ${coverage.rows - coverage.missing}/${coverage.rows}` : ""),
);
process.exit(errors.length ? 1 : 0);
