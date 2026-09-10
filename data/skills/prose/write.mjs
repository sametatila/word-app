/**
 * Paketi yazar: `node data/skills/prose/write.mjs <paket> < satirlar.txt`
 *
 * Anahtar paket dosyasından kopyalanıyor; yazan taraf yalnız metni veriyor.
 * Sözlükçe hattında anahtarı elle yazınca elli maddenin otuz altısı
 * tutmamıştı.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const packet = process.argv[2];
if (!packet) throw new Error("paket adı gerekli");

const src = JSON.parse(readFileSync(`${DIR}in/${packet}.json`, "utf8"));
const lines = readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

if (lines.length !== src.words.length)
  throw new Error(`${packet}: ${src.words.length} satır bekleniyor, ${lines.length} geldi`);

const out = src.words.map((w, i) => ({ tr: w.tr, kind: w.kind, en: lines[i] }));
mkdirSync(`${DIR}out`, { recursive: true });
writeFileSync(
  `${DIR}out/${packet}.json`,
  `[\n${out
    .map((r) => ` { "tr": ${JSON.stringify(r.tr)}, "kind": ${JSON.stringify(r.kind)}, "en": ${JSON.stringify(r.en)} }`)
    .join(",\n")}\n]\n`,
);
console.log(`${packet}: ${out.length} dize yazıldı`);
