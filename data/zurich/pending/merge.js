// zh-out/*.json -> data/zurich/chunk-NN.json  + bütünlük denetimi
const fs = require("fs"), path = require("path");
const SP = __dirname, ROOT = "/mnt/windows/Users/LinkinqArk/Desktop/Workspace/word-app";
const DRY = process.argv.includes("--dry");

const src = JSON.parse(fs.readFileSync(path.join(ROOT, "data/app/words.json"), "utf8"));
const srcById = new Map(src.map(r => [r.id, r]));
const have = new Set();
for (const f of fs.readdirSync(path.join(ROOT, "data/zurich")).filter(f => /^chunk-\d+\.json$/.test(f)))
  for (const g of JSON.parse(fs.readFileSync(path.join(ROOT, "data/zurich", f), "utf8"))) have.add(g.id);

const dir = path.join(SP, "zh-out");
const rows = [];
const bad = { id: [], artikel: [], sz: [], leer: [], kelimeyok: [] };
for (const f of (fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith(".json")).sort() : [])) {
  let arr;
  try { arr = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")); }
  catch (e) { console.error(`PARSE ${f}: ${e.message}`); continue; }
  for (const g of arr) {
    const s = srcById.get(g.id);
    if (!s) { bad.id.push(`${f}: ${g.id}`); continue; }
    if (have.has(g.id)) continue;                       // zaten var
    if (!g.gsw || !String(g.gsw).trim()) { bad.leer.push(`${f}: ${g.id}`); continue; }
    if (g.artikel != null && !["de", "d", "s"].includes(g.artikel)) { bad.artikel.push(`${f}: ${g.id} ${g.artikel}`); continue; }
    if (/ß/.test(JSON.stringify(g))) bad.sz.push(`${f}: ${g.id}`);
    const stem = String(g.gsw).replace(/^(de|d|s)\s+/, "").slice(0, 5);
    if (g.beispiel && stem.length >= 4 && !g.beispiel.toLowerCase().includes(stem.toLowerCase()))
      bad.kelimeyok.push(`${g.gsw} → ${g.beispiel}`);
    rows.push({ id: g.id, gsw: String(g.gsw).trim(), artikel: g.artikel ?? null, beispiel: (g.beispiel || "").trim() });
  }
}
rows.sort((a, b) => a.id - b.id);
console.log("yeni gsw madde:", rows.length);
console.log("HATA — bilinmeyen id:", bad.id.length, "| artikel:", bad.artikel.length, "| ß:", bad.sz.length, "| boş gsw:", bad.leer.length);
console.log("UYARI — cümlede kelime yok:", bad.kelimeyok.length, bad.kelimeyok.slice(0, 5));
const eksik = src.filter(r => !have.has(r.id) && !rows.some(x => x.id === r.id));
console.log("hâlâ gsw karşılığı olmayan kaynak madde:", eksik.length);
if (DRY) { console.log("(kuru çalıştırma)"); process.exit(0); }

const line = r => `{ "id": ${r.id}, "gsw": ${JSON.stringify(r.gsw)}, "artikel": ${JSON.stringify(r.artikel)}, "beispiel": ${JSON.stringify(r.beispiel)} }`;
const CH = 250;
let n = 17;   // mevcut son parça chunk-17
for (let i = 0; i < rows.length; i += CH) {
  n++;
  const p = path.join(ROOT, "data/zurich", `chunk-${String(n).padStart(2, "0")}.json`);
  fs.writeFileSync(p, "[\n" + rows.slice(i, i + CH).map(line).join(",\n") + "\n]\n");
  console.log("yazıldı:", path.basename(p), rows.slice(i, i + CH).length);
}
