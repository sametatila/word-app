/**
 * Madde başlığı düzeltmelerini uygular: `node scripts/apply-fixes.mjs [--dry]`
 *
 * Düzeltmeler `data/fixes/headwords.json` içinde tek tek gerekçesiyle durur.
 * Betik yalnızca uygular ve denetler; hangi maddenin neden değiştiği kararı
 * veri dosyasında, kodda değil — böylece değişiklik gözden geçirilebilir kalır.
 */
import { readFileSync, writeFileSync } from "node:fs";

const ROOT = new URL("..", import.meta.url).pathname;
const DRY = process.argv.includes("--dry");

const words = JSON.parse(readFileSync(`${ROOT}data/app/words.json`, "utf8"));
const fixes = JSON.parse(readFileSync(`${ROOT}data/fixes/headwords.json`, "utf8"));
const byId = new Map(words.map((w) => [w.id, w]));

let changed = 0;
const problems = [];

for (const [key, fix] of Object.entries(fixes)) {
  if (key === "_") continue;
  const id = Number(key);
  const row = byId.get(id);
  if (!row) {
    problems.push(`id ${id} kaynakta yok`);
    continue;
  }
  if (!fix.not) problems.push(`id ${id} gerekçesiz`);

  const before = { de: row.de, tr: row.tr };
  if (fix.de !== undefined) row.de = fix.de;
  if (fix.tr !== undefined) row.tr = fix.tr;
  if (fix.artikel !== undefined) row.artikel = fix.artikel;

  if (before.de !== row.de || before.tr !== row.tr) {
    changed++;
    console.log(`${String(id).padStart(5)}  ${before.de}`);
    console.log(`       → ${row.de}${fix.tr ? `   [${before.tr} → ${row.tr}]` : ""}`);
  }
}

// Uygulamadan sonra artık kalmamalı.
const leftovers = words.filter((w) => /→|\((D|A|CH)$|\(Pl\.\)\s*\(/.test(w.de));
if (leftovers.length) {
  problems.push(`hâlâ artık taşıyan ${leftovers.length} madde: ${leftovers.slice(0, 5).map((w) => w.de).join(" | ")}`);
}

console.log(`\n${changed} madde değişti.`);
if (problems.length) {
  console.log("SORUN:");
  for (const p of problems) console.log("  -", p);
}
if (!DRY) {
  // Kaynak biçim korunur (madde başına tek satır): aksi hâlde yeniden
  // biçimlendirme 7.429 satırlık sahte bir fark üretir ve gerçek değişiklik
  // gözden kaybolur.
  const body = words.map((w) => JSON.stringify(w)).join(",\n");
  writeFileSync(`${ROOT}data/app/words.json`, `[\n${body}\n]\n`);
  console.log("data/app/words.json yazıldı.");
}
process.exit(problems.length ? 1 : 0);
