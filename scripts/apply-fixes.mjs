/**
 * Madde başlığı düzeltmelerini uygular: `node scripts/apply-fixes.mjs [--dry]`
 *
 * Düzeltmeler `data/fixes/headwords.json` içinde tek tek gerekçesiyle durur.
 * Betik yalnızca uygular ve denetler; hangi maddenin neden değiştiği kararı
 * veri dosyasında, kodda değil — böylece değişiklik gözden geçirilebilir kalır.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const ROOT = new URL("..", import.meta.url).pathname;
const DRY = process.argv.includes("--dry");

const words = JSON.parse(readFileSync(`${ROOT}data/app/words.json`, "utf8"));
const fixes = JSON.parse(readFileSync(`${ROOT}data/fixes/headwords.json`, "utf8"));
const byId = new Map(words.map((w) => [w.id, w]));

let changed = 0;
const problems = [];
/** Düşürülecek id → yerine korunan id. */
const dropped = new Map();

for (const [key, fix] of Object.entries(fixes)) {
  if (key.startsWith("_")) continue;
  const id = Number(key);
  const row = byId.get(id);
  if (!row) {
    // Daha önce düşürülmüş bir madde ise betik yeniden çalıştırılmıştır; bu bir
    // sorun değil. Aksi hâlde gerçekten eksik bir id vardır.
    if (fix.drop === undefined) problems.push(`id ${id} kaynakta yok`);
    continue;
  }
  if (!fix.not) problems.push(`id ${id} gerekçesiz`);

  const before = { de: row.de, tr: row.tr };
  if (fix.drop !== undefined) {
    if (!byId.has(fix.drop)) problems.push(`id ${id} → korunacak ${fix.drop} kaynakta yok`);
    dropped.set(id, fix.drop);
    continue;
  }
  if (fix.de !== undefined) row.de = fix.de;
  if (fix.tr !== undefined) row.tr = fix.tr;
  if (fix.artikel !== undefined) row.artikel = fix.artikel;
  if (fix.formen !== undefined) row.formen = fix.formen;

  if (before.de !== row.de || before.tr !== row.tr) {
    changed++;
    console.log(`${String(id).padStart(5)}  ${before.de}`);
    console.log(`       → ${row.de}${fix.tr ? `   [${before.tr} → ${row.tr}]` : ""}`);
  }
}

// Düşürülenler kaynaktan ve Zürih parçalarından birlikte çıkarılır: seed-zurich
// kaynağı olmayan bir lehçe kaydı görürse yüklemeyi durduruyor.
const survivors = words.filter((w) => !dropped.has(w.id));
let gswRemoved = 0;
const zurichDir = `${ROOT}data/zurich`;
const zurichFiles = readdirSync(zurichDir).filter((f) => /^chunk-\d+\.json$/.test(f));
const zurichUpdates = [];
for (const file of zurichFiles) {
  const path = `${zurichDir}/${file}`;
  const rows = JSON.parse(readFileSync(path, "utf8"));
  const kept = rows.filter((r) => !dropped.has(r.id));
  if (kept.length !== rows.length) {
    gswRemoved += rows.length - kept.length;
    zurichUpdates.push([path, kept]);
  }
}
if (dropped.size) {
  console.log(`\n${dropped.size} yinelenen madde düşürülüyor:`);
  for (const [id, keep] of dropped) {
    const gone = byId.get(id);
    console.log(`${String(id).padStart(5)}  ${gone?.de} → ${keep} korunuyor`);
  }
  console.log(`Zürih karşılığı da çıkarılan kayıt: ${gswRemoved}`);
  if (gswRemoved !== dropped.size)
    problems.push(`Zürih tarafında ${dropped.size} bekleniyordu, ${gswRemoved} bulundu`);
}

// Uygulamadan sonra artık kalmamalı.
const leftovers = survivors.filter((w) => /→|\((D|A|CH)$|\(Pl\.\)\s*\(/.test(w.de));
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
  const body = survivors.map((w) => JSON.stringify(w)).join(",\n");
  writeFileSync(`${ROOT}data/app/words.json`, `[\n${body}\n]\n`);
  console.log(`data/app/words.json yazıldı (${survivors.length} madde).`);
  for (const [path, rows] of zurichUpdates) {
    const line = (r) =>
      `{ "id": ${r.id}, "gsw": ${JSON.stringify(r.gsw)}, "artikel": ${JSON.stringify(r.artikel)}, "beispiel": ${JSON.stringify(r.beispiel)} }`;
    writeFileSync(path, `[\n${rows.map(line).join(",\n")}\n]\n`);
  }
  if (zurichUpdates.length) console.log(`${zurichUpdates.length} Zürih parçası güncellendi.`);
}
process.exit(problems.length ? 1 : 0);
