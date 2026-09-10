/**
 * Paketi yazar: `node data/skills/task/write.mjs <paket> < satirlar.txt`
 *
 * Anahtar paket dosyasından kopyalanıyor; yazan taraf yalnız metni veriyor.
 * Sözlükçe hattında anahtarı elle yazınca elli maddenin otuz altısı
 * tutmamıştı.
 *
 * SATIR SAYISI TUTMAZSA NEREDE KAYDIĞINI DA SÖYLÜYOR. Bu hatta kayma
 * ölçütü iki kanıt açıklığına birden bakıyor — „…“ VE (…) — çünkü Almanca
 * kanıtın iki taşıyıcısı var: 462 satır tırnakta, 385 satır parantezde.
 * Yalnız tırnağa bakan bir ölçüt `free.checklist` paketlerinde hiçbir şey
 * bulamazdı; o türün kanıtı hep parantezde ("(Ich heiße …)").
 *
 * ÖLÇÜT DAR: açıklık ancak TARTIŞMASIZ Almanca görünüyorsa (ä/ß taşıyor ya
 * da büyük harfle başlayan bir sözcüğü var) kullanılıyor. İlk yazımda ölçüt
 * yalnız Türkçeye özgü harfleri atlıyordu ve t-004'te YANLIŞ satırı
 * gösterdi: „hep dürüst ol“ Türkçe ama ı/ş/ğ taşımıyor. Teşhis aracının
 * yanlış yeri göstermesi, hiçbir şey göstermemesinden kötü.
 *
 * Kapıdaki `foreign()` ile aynı olmak ZORUNDA DEĞİL — bu bir kural değil,
 * teşhis. Orada ölçüt geniş tutulup yanlış ret pahasına kanıt korunuyor;
 * burada dar tutulup yanlış işaret önleniyor.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const packet = process.argv[2];
if (!packet) throw new Error("paket adı gerekli");

const src = JSON.parse(readFileSync(`${DIR}in/${packet}.json`, "utf8"));
const lines = readFileSync(0, "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

if (lines.length !== src.words.length) {
  const flat = (t) => String(t).replace(/[„“”‚‘’]/g, '"').replace(/\s+/g, " ").trim();
  const spans = (t) => [
    ...[...String(t).matchAll(/[„"]([^„"“”]{4,})[“"]/g)].map((m) => m[1]),
    ...[...String(t).matchAll(/\(([^()]{4,})\)/g)].map((m) => m[1]),
  ];
  const german = (s) => /[äßÄ]/.test(s) || /[A-ZÄÖÜ][a-zäöüß]{2,}/.test(s);
  let at = null;
  for (let i = 0; i < src.words.length && at === null; i++)
    for (const s of spans(src.words[i].tr)) {
      if (/[ışğİĞŞ]/.test(s) || !german(s)) continue;
      if (!flat(lines[i] ?? "").includes(flat(s))) at = i;
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
