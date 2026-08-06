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
  if (fix.typ !== undefined) row.typ = fix.typ;
  // Başlık düzelince örnek cümle bazen artık kelimeyi taşımıyor (bkz. 697);
  // o durumda cümlenin de düzeltilebilmesi gerekiyor.
  if (fix.beispiel !== undefined) row.beispiel = fix.beispiel;

  if (before.de !== row.de || before.tr !== row.tr) {
    changed++;
    console.log(`${String(id).padStart(5)}  ${before.de}`);
    console.log(`       → ${row.de}${fix.tr ? `   [${before.tr} → ${row.tr}]` : ""}`);
  }
}

// Düşürülenler kaynaktan ve Zürih parçalarından birlikte çıkarılır: seed-zurich
// kaynağı olmayan bir lehçe kaydı görürse yüklemeyi durduruyor.
// Almanca başlık düzeltilince lehçe karşılığı aynı artığı taşımaya devam
// edebiliyor (bkz. 697 "(Kredit-)Charte"); o yüzden gsw alanları da buradan
// düzeltilebiliyor.
const survivors = words.filter((w) => !dropped.has(w.id));
const gswFixes = new Map();
for (const [key, fix] of Object.entries(fixes)) {
  if (key.startsWith("_") || fix.drop !== undefined) continue;
  if (fix.gsw !== undefined || fix.gswBeispiel !== undefined) gswFixes.set(Number(key), fix);
}
let gswRemoved = 0;
let gswChanged = 0;
const zurichDir = `${ROOT}data/zurich`;
const zurichFiles = readdirSync(zurichDir).filter((f) => /^chunk-\d+\.json$/.test(f));
const zurichUpdates = [];
for (const file of zurichFiles) {
  const path = `${zurichDir}/${file}`;
  const rows = JSON.parse(readFileSync(path, "utf8"));
  const kept = rows.filter((r) => !dropped.has(r.id));
  let touched = kept.length !== rows.length;
  gswRemoved += rows.length - kept.length;
  for (const r of kept) {
    const fix = gswFixes.get(r.id);
    if (!fix) continue;
    if (fix.gsw !== undefined) r.gsw = fix.gsw;
    if (fix.gswBeispiel !== undefined) r.beispiel = fix.gswBeispiel;
    gswFixes.delete(r.id);
    touched = true;
    gswChanged++;
  }
  if (touched) zurichUpdates.push([path, kept]);
}
for (const id of gswFixes.keys()) problems.push(`id ${id} → Zürih karşılığı bulunamadı`);
if (gswChanged) console.log(`\n${gswChanged} Zürih karşılığı düzeltildi.`);
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
