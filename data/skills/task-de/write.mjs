/**
 * Paketi yazar: `node data/skills/task-de/write.mjs <paket> < satirlar.txt`
 *
 * Anahtar paket dosyasından kopyalanıyor; yazan taraf yalnız metni veriyor.
 *
 * SATIR SAYISI TUTMAZSA NEREDE KAYDIĞINI DA SÖYLÜYOR. Ölçüt KANIT: satırın
 * ilgili olduğu İngilizce cümlede (`de` alanı) birebir geçen bir açıklık,
 * Almanca karşılıkta da birebir durmak zorunda (kapının kuralı da bu). İlk
 * tutmayan satır kaymanın başladığı yerdir. Ölçüt yalnız TEŞHİS için:
 * kanıtsız satırlar atlanıyor ve hiçbir şey bulunamazsa yalnız sayı
 * bildiriliyor.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const packet = process.argv[2];
if (!packet) throw new Error("paket adı gerekli");

const src = JSON.parse(readFileSync(`${DIR}in/${packet}.json`, "utf8"));
const lines = readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

const flat = (t) => String(t).replace(/[„“”‚‘’'"]/g, "'").replace(/\s+/g, " ").trim();
const lower = (t) => flat(t).toLowerCase();
const WORD = /\p{L}+(?:'\p{L}+)*/gu;
const spans = (t) => {
  const out = [];
  for (const m of String(t).matchAll(/[„"«]([^„"“”«»]{2,})[“"»]/g)) out.push(m[1]);
  for (const m of String(t).matchAll(/\(([^()]{2,})\)/g)) out.push(m[1]);
  return out;
};
const evidence = (row) => {
  const surface = lower(row.de ?? "");
  const words = new Set(surface.match(WORD) ?? []);
  return spans(row.tr).filter((s) => {
    const l = lower(s);
    if (!surface.includes(l)) return false;
    return /\s/.test(l) ? true : words.has(l);
  });
};

if (lines.length !== src.words.length) {
  let at = null;
  for (let i = 0; i < src.words.length && at === null; i++)
    for (const s of evidence(src.words[i]))
      if (!flat(lines[i] ?? "").includes(flat(s))) at = i;
  throw new Error(
    `${packet}: ${src.words.length} satır bekleniyor, ${lines.length} geldi` +
      (at === null
        ? ""
        : `\n  kayma ${at + 1}. satırda başlıyor:\n    tr: ${src.words[at].tr}\n    de: ${lines[at] ?? "(yok)"}`),
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
