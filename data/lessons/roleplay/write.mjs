/**
 * Paketi yazar: `node data/lessons/roleplay/write.mjs <paket> < satirlar.txt`
 *
 * Her ders DÖRT satır alıyor, hep aynı sırayla:
 *
 *   1. scene      görev
 *   2. partner    karşıdaki kim (öbek — nokta YOK)
 *   3. openingTr  Almanca `opening`in İngilizcesi
 *   4. goal       başarı koşulu
 *
 * `lesson` paket dosyasından kopyalanıyor; yazan taraf yalnız metni veriyor
 * (sözlükçe hattında anahtarı elle yazınca elli maddenin otuz altısı
 * tutmamıştı).
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const packet = process.argv[2];
if (!packet) throw new Error("paket adı gerekli");

const src = JSON.parse(readFileSync(`${DIR}in/${packet}.json`, "utf8"));
const lines = readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

if (lines.length !== src.words.length * 4)
  throw new Error(`${packet}: ${src.words.length * 4} satır bekleniyor, ${lines.length} geldi`);

const out = src.words.map((w, i) => ({
  lesson: w.lesson,
  sceneEn: lines[i * 4],
  partnerEn: lines[i * 4 + 1],
  openingEn: lines[i * 4 + 2],
  goalEn: lines[i * 4 + 3],
}));
mkdirSync(`${DIR}out`, { recursive: true });
writeFileSync(
  `${DIR}out/${packet}.json`,
  `[\n${out
    .map(
      (r) =>
        ` {\n  "lesson": ${JSON.stringify(r.lesson)},\n` +
        `  "sceneEn": ${JSON.stringify(r.sceneEn)},\n` +
        `  "partnerEn": ${JSON.stringify(r.partnerEn)},\n` +
        `  "openingEn": ${JSON.stringify(r.openingEn)},\n` +
        `  "goalEn": ${JSON.stringify(r.goalEn)}\n }`,
    )
    .join(",\n")}\n]\n`,
);
console.log(`${packet}: ${out.length} ders yazıldı`);
