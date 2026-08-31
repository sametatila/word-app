/**
 * Züritüütsch gözden geçirme paketleri: `node data/review/make-zh-packets.mjs A1`
 *
 * Almanca tarafın aksine burada denetlenen şey Türkçe değil: lehçe karşılığı
 * gerçekten Züritüütsch mü, Almanca maddeyle aynı şeyi mi söylüyor, örnek cümle
 * lehçede mi. Bu yüzden pakette hem Almanca madde hem lehçe karşılığı duruyor.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";

const ROOT = new URL("../..", import.meta.url).pathname;
const LEVEL = (process.argv[2] || "").toUpperCase();
const SIZE = Number(process.argv[3] || 110);
if (!LEVEL) throw new Error("kullanım: make-zh-packets.mjs <SEVİYE> [paket boyutu]");

const words = JSON.parse(readFileSync(`${ROOT}data/app/words.json`, "utf8"));
const zurich = new Map();
for (const f of readdirSync(`${ROOT}data/zurich`).filter((f) => /^chunk-\d+\.json$/.test(f)))
  for (const r of JSON.parse(readFileSync(`${ROOT}data/zurich/${f}`, "utf8"))) zurich.set(r.id, r);

const rows = words.filter((w) => w.niveau === LEVEL && zurich.has(w.id));
if (!rows.length) throw new Error(`${LEVEL} seviyesinde eşleşen madde yok`);

// Aynı lehçe karşılığını taşıyan başka maddeler: Almanca tarafta ayrı olan iki
// kelime lehçede aynıysa ya gerçekten öyledir ya da biri yanlış çevrilmiştir.
const byGsw = new Map();
for (const r of zurich.values()) {
  const k = (r.gsw || "").trim().toLowerCase();
  if (!k) continue;
  if (!byGsw.has(k)) byGsw.set(k, []);
  byGsw.get(k).push(r.id);
}

const dir = `${ROOT}data/review`;
mkdirSync(`${dir}/out`, { recursive: true });
const slug = `zh-${LEVEL.toLowerCase()}`;
let flagged = 0;
const packets = [];
for (let i = 0; i < rows.length; i += SIZE) packets.push(rows.slice(i, i + SIZE));

packets.forEach((chunk, i) => {
  const body = chunk.map((w) => {
    const z = zurich.get(w.id);
    const twins = (byGsw.get((z.gsw || "").trim().toLowerCase()) || [])
      .filter((id) => id !== w.id)
      .map((id) => {
        const o = words.find((x) => x.id === id);
        return `${o ? o.de : "?"} (${o ? o.niveau : "?"})`;
      });
    if (twins.length) flagged++;
    return {
      id: w.id,
      de: `${w.artikel ? w.artikel + " " : ""}${w.de}`,
      tr: w.tr,
      deBeispiel: w.beispiel || "",
      gsw: z.gsw,
      gswArtikel: z.artikel,
      gswBeispiel: z.beispiel || "",
      ...(twins.length ? { sameDialect: twins } : {}),
    };
  });
  writeFileSync(`${dir}/${slug}-${String(i + 1).padStart(2, "0")}.json`, JSON.stringify(body, null, 1) + "\n");
});
console.log(`${LEVEL} Züritüütsch: ${rows.length} madde → ${packets.length} paket`);
console.log(`aynı lehçe karşılığı işaretli: ${flagged}`);
