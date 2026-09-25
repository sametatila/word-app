/**
 * Paketi yazar: `node data/weekly-quiz/prose/write.mjs <paket> [--de] < satirlar.txt`
 * Bir satır bir dize, `in/<paket>.json` sırasıyla. `--de` Almanca tarafı
 * yazar (`in-de/` → `out-de/`, alan `de`); bayraksız İngilizce (`in/` →
 * `out/`, alan `en`).
 *
 * Anahtar paket dosyasından kopyalanıyor; yazan taraf yalnız metni veriyor
 * (kardeş hatlarda anahtarı elle yazmak ellide otuz altı kez tutmamıştı).
 *
 * SATIR SAYISI TUTMAZSA KAYMANIN BAŞLADIĞI YERİ SÖYLÜYOR: ilk olarak sayı
 * paritesinin, sonra ters tırnaklı kanıtın bozulduğu satır. Quiz
 * açıklamalarının çoğu hedef dili ters tırnakla alıntılıyor, o yüzden
 * ikinci ölçüt burada kardeş hattakinden çok daha keskin.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const packet = process.argv[2];
if (!packet) throw new Error("paket adı gerekli");
const DE = process.argv.includes("--de");
const SUFFIX = DE ? "-de" : "";
const FIELD = DE ? "de" : "en";

const src = JSON.parse(readFileSync(`${DIR}in${SUFFIX}/${packet}.json`, "utf8"));
const lines = readFileSync(0, "utf8")
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean);

if (lines.length !== src.words.length) {
  const nums = (t) => [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).join(",");
  const ticks = (t) => [...String(t).matchAll(/`([^`]+)`/g)].map((m) => m[1]).filter((s) => !/[ışğİĞŞ]/.test(s));
  let at = null;
  for (let i = 0; i < src.words.length && at === null; i++) {
    const tr = src.words[i].tr;
    const en = lines[i] ?? "";
    if (nums(tr) !== nums(en) || ticks(tr).some((s) => !en.includes(s))) at = i;
  }
  throw new Error(
    `${packet}: ${src.words.length} satır bekleniyor, ${lines.length} geldi` +
      (at === null ? "" : `\n  kayma ${at + 1}. satırda başlıyor:\n    tr: ${src.words[at].tr}\n    ${FIELD}: ${lines[at] ?? "(yok)"}`),
  );
}

mkdirSync(`${DIR}out${SUFFIX}`, { recursive: true });
writeFileSync(
  `${DIR}out${SUFFIX}/${packet}.json`,
  `[\n${src.words
    .map((w, i) => ` { "tr": ${JSON.stringify(w.tr)}, "kind": ${JSON.stringify(w.kind)}, "${FIELD}": ${JSON.stringify(lines[i])} }`)
    .join(",\n")}\n]\n`,
);
console.log(`${packet}: ${src.words.length} dize yazıldı`);
