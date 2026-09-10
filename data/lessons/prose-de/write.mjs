/**
 * Paketi yazar: `node data/lessons/prose-de/write.mjs <paket> < satirlar.txt`
 * Bir satır bir dize; çok satırlı dizeler için ayraç `%%`.
 *
 * Anahtar paket dosyasından kopyalanıyor; yazan taraf yalnız metni veriyor.
 * Kardeş hatlarda anahtarı elle yazmak defalarca tutmadı.
 *
 * SATIR SAYISI TUTMAZSA NEREDE KAYDIĞINI DA SÖYLÜYOR — deneme kâğıdı
 * hattındaki üç ölçüt burada da geçerli, sırasıyla:
 *
 *   sayı      harfe bitişik olmayan sayılar iki tarafta da aynı olmalı
 *   kanıt     dersin İngilizce yüzeyinde geçen alıntı aynen durmalı
 *   uzunluk   kayık hizanın üç satır üst üste daha iyi oturduğu ilk yer
 *
 * KANIT ÖLÇÜTÜ BURADA DAHA GÜVENİLİR. Deneme kâğıdı hattında açıklığın
 * Almanca olup olmadığı harf ve büyük-küçük ölçütüyle TAHMİN ediliyordu;
 * burada tahmine gerek yok, çünkü paket satırı dersin İngilizce yüzeyini
 * (`en` alanı) yanında taşıyor. Açıklık orada varsa İngilizcedir.
 *
 * Uzunluk ölçütünün ilettiği yer kaymanın GÖRÜNÜR olduğu yerdir,
 * başladığı yer değil; ileti bunu söylüyor.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const packet = process.argv[2];
if (!packet) throw new Error("paket adı gerekli");

const src = JSON.parse(readFileSync(`${DIR}in/${packet}.json`, "utf8"));
const raw = readFileSync(0, "utf8");

const lines = /^%%$/m.test(raw)
  ? raw.split(/^%%$/m).map((r) => r.replace(/^\s+|\s+$/g, "")).filter(Boolean)
  : raw.split("\n").map((l) => l.trim()).filter(Boolean);

if (lines.length !== src.words.length) {
  const flat = (t) =>
    String(t).replace(/[„“”‚‘’'"]/g, "'").replace(/\.\.\./g, "…").replace(/\s+/g, " ").trim().toLowerCase();
  const spans = (t) => [
    ...[...String(t).matchAll(/[„"«]([^„"“”«»]{2,})[“"»]/g)].map((m) => m[1]),
    ...[...String(t).matchAll(/\(([^()]{2,})\)/g)].map((m) => m[1]),
  ];
  const nums = (t) => [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).join(",");
  let at = null;
  let why = "";
  for (let i = 0; i < src.words.length && at === null; i++) {
    const w = src.words[i];
    if (nums(w.tr) !== nums(lines[i] ?? "")) {
      at = i;
      why = "sayı";
      break;
    }
    const surface = flat((w.en ?? []).join(" | "));
    for (const s of spans(w.tr)) {
      if (!surface.includes(flat(s))) continue;
      if (!flat(lines[i] ?? "").includes(flat(s))) {
        at = i;
        why = "kanıt";
        break;
      }
    }
  }
  if (at === null)
    for (let i = 0; i + 3 < src.words.length && at === null; i++) {
      let n = 0;
      for (let k = 0; k < 3; k++) {
        const de = (lines[i + k] ?? "").length;
        const same = Math.abs(de - String(src.words[i + k].tr).length);
        const next = Math.abs(de - String(src.words[i + k + 1]?.tr ?? "").length);
        if (next + 12 < same) n++;
      }
      if (n === 3) {
        at = i;
        why = "uzunluk";
      }
    }

  throw new Error(
    `${packet}: ${src.words.length} satır bekleniyor, ${lines.length} geldi` +
      (at === null
        ? ""
        : `\n  kayma ${why === "uzunluk" ? `en geç ${at + 1}. satırda GÖRÜNÜR oluyor (uzunluk ölçütü — başlangıcı daha yukarıda olabilir)` : `${at + 1}. satırda başlıyor (${why} ölçütü)`}:` +
          `\n    tr: ${src.words[at].tr}\n    de: ${lines[at] ?? "(yok)"}`),
  );
}

const out = src.words.map((w, i) => ({ tr: w.tr, kind: w.kind, de: lines[i] }));
mkdirSync(`${DIR}out`, { recursive: true });
writeFileSync(
  `${DIR}out/${packet}.json`,
  `[\n${out
    .map((r) => ` { "tr": ${JSON.stringify(r.tr)}, "kind": ${JSON.stringify(r.kind)}, "de": ${JSON.stringify(r.de)} }`)
    .join(",\n")}\n]\n`,
);
console.log(`${packet}: ${out.length} dize yazıldı`);
