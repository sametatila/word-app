/**
 * Gözden geçirme paketlerini üretir: `node data/review/make-packets.mjs A2`
 *
 * Her paket, ajanın bir oturumda gerçekten okuyabileceği kadar madde taşır.
 * `sameMeaning` alanı kritik: havuzun tamamında birebir aynı Türkçe karşılığı
 * taşıyan diğer maddeleri listeler, böylece ajan ayrım gerektiren yerleri
 * aramak zorunda kalmaz — önüne gelir.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const ROOT = new URL("../..", import.meta.url).pathname;
const LEVEL = (process.argv[2] || "").toUpperCase();
const SIZE = Number(process.argv[3] || 122);
if (!LEVEL) throw new Error("kullanım: make-packets.mjs <SEVİYE> [paket boyutu]");

const words = JSON.parse(readFileSync(`${ROOT}data/app/words.json`, "utf8"));

// Aynı Türkçe karşılık haritası havuzun TAMAMI üzerinden kurulur: A2'deki bir
// kelime B1'deki bir kelimeyle çakışıyorsa bunu da görmek gerekiyor.
const byTr = new Map();
for (const w of words) {
  const k = w.tr.trim().toLowerCase();
  if (!byTr.has(k)) byTr.set(k, []);
  byTr.get(k).push(w);
}

const rows = words.filter((w) => w.niveau === LEVEL);
if (!rows.length) throw new Error(`${LEVEL} seviyesinde madde yok`);

let flagged = 0;
const packets = [];
for (let i = 0; i < rows.length; i += SIZE) {
  packets.push(
    rows.slice(i, i + SIZE).map((w) => {
      const twins = byTr
        .get(w.tr.trim().toLowerCase())
        .filter((o) => o.id !== w.id)
        .map((o) => `${o.artikel ? o.artikel + " " : ""}${o.de} (${o.niveau})`);
      if (twins.length) flagged++;
      return {
        id: w.id,
        de: `${w.artikel ? w.artikel + " " : ""}${w.de}`,
        typ: w.typ,
        tr: w.tr,
        formen: w.formen || "",
        beispiel: w.beispiel || "",
        ...(twins.length ? { sameMeaning: twins } : {}),
      };
    }),
  );
}

const dir = `${ROOT}data/review`;
mkdirSync(`${dir}/out`, { recursive: true });
const slug = LEVEL.toLowerCase();
packets.forEach((p, i) => {
  const name = `${slug}-${String(i + 1).padStart(2, "0")}.json`;
  writeFileSync(`${dir}/${name}`, JSON.stringify(p, null, 1) + "\n");
});
console.log(`${LEVEL}: ${rows.length} madde → ${packets.length} paket (${SIZE}'lik)`);
console.log(`aynı anlam işaretli: ${flagged}`);
