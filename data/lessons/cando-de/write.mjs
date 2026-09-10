/**
 * Paketi yazar: `node data/lessons/cando-de/write.mjs <paket> < satirlar.txt`
 * Bir satır bir ifade.
 *
 * Anahtar (`id`) paket dosyasından kopyalanıyor; yazan taraf yalnız metni
 * veriyor — kardeş hatlarda anahtarı elle yazmak defalarca tutmadı.
 *
 * SATIR SAYISI TUTMAZSA NEREDE KAYDIĞINI DA SÖYLÜYOR. Buradaki ölçüt
 * kardeşlerinkinden basit ve daha kesin: her ifade `id`siyle birlikte
 * SEVİYE ve BECERİ taşıyor (`A1.SPK.1`), Almancasında da o sıra
 * korunuyor. Kayma, seviye sınırının geçtiği yerde hemen görünür —
 * beceri adı da öyle: konuşma ifadesinin altına okuma ifadesi gelirse
 * uzunluk değil, SIRA bozulur.
 *
 * İkinci ölçüt sayı: harfe bitişik olmayan sayılar iki tarafta da aynı.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const packet = process.argv[2];
if (!packet) throw new Error("paket adı gerekli");

const src = JSON.parse(readFileSync(`${DIR}in/${packet}.json`, "utf8"));
const lines = readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

if (lines.length !== src.words.length) {
  const nums = (t) => [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).join(",");
  let at = null;
  for (let i = 0; i < src.words.length && at === null; i++)
    if (nums(src.words[i].tr) !== nums(lines[i] ?? "")) at = i;
  throw new Error(
    `${packet}: ${src.words.length} satır bekleniyor, ${lines.length} geldi` +
      (at === null
        ? ""
        : `\n  kayma ${at + 1}. satırda başlıyor (sayı ölçütü):` +
          `\n    tr: ${src.words[at].tr}\n    de: ${lines[at] ?? "(yok)"}`),
  );
}

const out = src.words.map((w, i) => ({ id: w.id, de: lines[i] }));
mkdirSync(`${DIR}out`, { recursive: true });
writeFileSync(
  `${DIR}out/${packet}.json`,
  `[\n${out.map((r) => ` { "id": ${JSON.stringify(r.id)}, "de": ${JSON.stringify(r.de)} }`).join(",\n")}\n]\n`,
);
console.log(`${packet}: ${out.length} ifade yazıldı`);
