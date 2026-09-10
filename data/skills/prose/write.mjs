/**
 * Paketi yazar: `node data/skills/prose/write.mjs <paket> < satirlar.txt`
 *
 * Anahtar paket dosyasından kopyalanıyor; yazan taraf yalnız metni veriyor.
 * Sözlükçe hattında anahtarı elle yazınca elli maddenin otuz altısı
 * tutmamıştı.
 *
 * SATIR SAYISI TUTMAZSA NEREDE KAYDIĞINI DA SÖYLÜYOR. Kardeş hatlarda bu
 * durumda yalnız sayı bildiriliyordu ve eksik satırı bulmak elle
 * ayıklama gerektiriyordu — son noktalama sınıflarını karşılaştırmak bu
 * pakette işe yaramıyor, çünkü yüz elli satırın hepsi noktayla bitiyor.
 *
 * Çalışan ölçüt ALINTI: Türkçe satırdaki „…“ açıklığı İngilizcede de
 * birebir durmak zorunda (kapının kuralı da bu). İlk tutmayan satır
 * kaymanın başladığı yerdir. Ölçüt yalnız TEŞHİS için — Türkçe açıklıklar
 * atlanıyor ve hiçbir şey bulunamazsa yalnız sayı bildiriliyor.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const packet = process.argv[2];
if (!packet) throw new Error("paket adı gerekli");

const src = JSON.parse(readFileSync(`${DIR}in/${packet}.json`, "utf8"));
const lines = readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

if (lines.length !== src.words.length) {
  const flat = (t) => String(t).replace(/[„“”‚‘’]/g, '"').replace(/\s+/g, " ").trim();
  let at = null;
  for (let i = 0; i < src.words.length && at === null; i++) {
    for (const m of String(src.words[i].tr).matchAll(/[„"]([^„"“”]{4,})[“"]/g)) {
      if (/[ışğİĞŞ]/.test(m[1])) continue;
      if (!flat(lines[i] ?? "").includes(flat(m[1]))) at = i;
    }
  }
  throw new Error(
    `${packet}: ${src.words.length} satır bekleniyor, ${lines.length} geldi` +
      (at === null
        ? ""
        : `\n  kayma ${at + 1}. satırda başlıyor:\n    tr: ${src.words[at].tr}\n    en: ${lines[at] ?? "(yok)"}`),
  );
}

const out = src.words.map((w, i) => ({ tr: w.tr, kind: w.kind, en: lines[i] }));
mkdirSync(`${DIR}out`, { recursive: true });
writeFileSync(
  `${DIR}out/${packet}.json`,
  `[\n${out
    .map((r) => ` { "tr": ${JSON.stringify(r.tr)}, "kind": ${JSON.stringify(r.kind)}, "en": ${JSON.stringify(r.en)} }`)
    .join(",\n")}\n]\n`,
);
console.log(`${packet}: ${out.length} dize yazıldı`);
