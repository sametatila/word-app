/**
 * Paketi yazar: `node data/lessons/vocab/write.mjs <paket> < en-satirlari.txt`
 *
 * Girdi, paketin SIRASIYLA bire bir eşleşen İngilizce karşılık satırlarıdır.
 * `lesson` alanı paket dosyasından kopyalanır, yazan taraf ona hiç dokunmaz.
 *
 * Neden böyle: ilk pakette `lesson` alanını Almanca kelimeden tahmin ettim ve
 * elli maddenin otuz altısı tutmadı. Kapı yakaladı, ama hatanın kaynağı
 * baştan engellenebilir bir şeydi — yazan taraf yalnız karşılığı seçmeli,
 * anahtarı değil. Aynı Almanca başlık bir pakette iki kez geçebildiği için
 * eşleme sıraya göre, kelimeye göre değil.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const packet = process.argv[2];
if (!packet) throw new Error("paket adı gerekli");

const src = JSON.parse(readFileSync(`${DIR}in/${packet}.json`, "utf8"));
const lines = readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

if (lines.length !== src.words.length)
  throw new Error(`${packet}: ${src.words.length} madde bekleniyor, ${lines.length} satır geldi`);

const out = src.words.map((w, i) => ({ lesson: w.lesson, de: w.de, en: lines[i] }));
mkdirSync(`${DIR}out`, { recursive: true });
writeFileSync(
  `${DIR}out/${packet}.json`,
  `[\n${out
    .map((r) => ` { "lesson": ${JSON.stringify(r.lesson)}, "de": ${JSON.stringify(r.de)}, "en": ${JSON.stringify(r.en)} }`)
    .join(",\n")}\n]\n`,
);
console.log(`${packet}: ${out.length} madde yazıldı`);
