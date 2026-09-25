/**
 * Paketi yazar: `node data/conversations/meta/write.mjs <paket> < satirlar.txt`
 *
 * Her konuşma İKİ satır alıyor: önce başlık, sonra özet. Tek satıra sığdırıp
 * ayırıcı kullanmak, özetin içindeki noktalama yüzünden kırılgan olurdu.
 *
 * `conversation` alanı paket dosyasından kopyalanıyor — sözlükçe hattında anahtarı
 * elle yazınca elli maddenin otuz altısı tutmamıştı; yazan taraf yalnız
 * metni veriyor.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const packet = process.argv[2];
if (!packet) throw new Error("paket adı gerekli");

const src = JSON.parse(readFileSync(`${DIR}in/${packet}.json`, "utf8"));
const lines = readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

if (lines.length !== src.words.length * 2)
  throw new Error(`${packet}: ${src.words.length * 2} satır bekleniyor, ${lines.length} geldi`);

const out = src.words.map((w, i) => ({
  conversation: w.conversation,
  titleEn: lines[i * 2],
  summaryEn: lines[i * 2 + 1],
}));
mkdirSync(`${DIR}out`, { recursive: true });
writeFileSync(
  `${DIR}out/${packet}.json`,
  `[\n${out
    .map(
      (r) =>
        ` { "conversation": ${JSON.stringify(r.conversation)}, "titleEn": ${JSON.stringify(r.titleEn)}, "summaryEn": ${JSON.stringify(r.summaryEn)} }`,
    )
    .join(",\n")}\n]\n`,
);
console.log(`${packet}: ${out.length} konuşma yazıldı`);
