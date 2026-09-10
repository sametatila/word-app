/**
 * Paketi yazar: `node data/lessons/lecture/write.mjs <paket> < satirlar.txt`
 *
 * Her dize BİR satır. Anahtar paket dosyasından kopyalanıyor; yazan taraf
 * yalnız metni veriyor (sözlükçe hattında anahtarı elle yazınca elli
 * maddenin otuz altısı tutmamıştı).
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const packet = process.argv[2];
if (!packet) throw new Error("paket adı gerekli");

const src = JSON.parse(readFileSync(`${DIR}in/${packet}.json`, "utf8"));
const lines = readFileSync(0, "utf8").split("\n");
// Boş satır ATILMIYOR: bir parçanın İngilizcesi boş olamaz ama satır sayısı
// tutmazsa hangi dizenin kaydığı anlaşılmaz. Sondaki tek boşluk kırpılıyor.
while (lines.length && lines.at(-1).trim() === "") lines.pop();
const out = lines.map((l) => l.trim());

if (out.length !== src.words.length)
  throw new Error(`${packet}: ${src.words.length} satır bekleniyor, ${out.length} geldi`);

mkdirSync(`${DIR}out`, { recursive: true });
writeFileSync(
  `${DIR}out/${packet}.json`,
  `[\n${src.words
    .map(
      (w, i) =>
        ` { "tr": ${JSON.stringify(w.tr)}${w.de ? `, "de": ${JSON.stringify(w.de)}` : ""}, "en": ${JSON.stringify(out[i])} }`,
    )
    .join(",\n")}\n]\n`,
);
console.log(`${packet}: ${out.length} dize yazıldı`);
