/**
 * Paketi yazar: `node data/lessons/exam-de/write.mjs <paket> < satirlar.txt`
 *
 * Kardeşi `data/lessons/exam/write.mjs` ile aynı: anahtar PAKET DOSYASINDAN
 * kopyalanıyor, yazan taraf yalnız metni veriyor. Sözlükçe hattında anahtarı
 * elle yazınca elli maddenin otuz altısı tutmamıştı.
 *
 * Tek fark alan adı: burada karşılık ALMANCA ve `de` alanına yazılıyor
 * (`apply-de.mjs` `r.de ?? r.en` okuyor).
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const packet = process.argv[2];
if (!packet) throw new Error("paket adı gerekli");

const src = JSON.parse(readFileSync(`${DIR}in/${packet}.json`, "utf8"));
const lines = readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

if (lines.length !== src.words.length)
  throw new Error(`${packet}: ${src.words.length} satır bekleniyor, ${lines.length} geldi`);

const out = src.words.map((w, i) => ({ tr: w.tr, kind: w.kind, de: lines[i] }));
mkdirSync(`${DIR}out`, { recursive: true });
writeFileSync(
  `${DIR}out/${packet}.json`,
  `[\n${out
    .map((r) => ` { "tr": ${JSON.stringify(r.tr)}, "kind": ${JSON.stringify(r.kind)}, "de": ${JSON.stringify(r.de)} }`)
    .join(",\n")}\n]\n`,
);
console.log(`${packet}: ${out.length} dize yazıldı`);
