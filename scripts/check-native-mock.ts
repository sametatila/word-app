/**
 * Çözücüyü GERÇEK deneme kâğıtları üzerinde denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/check-native-mock.ts`
 *
 * Hattın kendi kapısı (`data/mock-exams/prose/check.ts`) YAZILANI ölçüyor:
 * çıkarıcının bulduğu her dizenin karşılığı var mı, kurallara uyuyor mu.
 * Bu betik tersini soruyor — üretilmiş sözlüğü açıp `resolveMockPaper`i
 * çalıştırıyor. İkisinin arası bir süre boş kaldı ve o boşlukta 6.627 dize
 * yazılmış ama HİÇBİRİ uygulamaya ulaşmıyordu: `apply.mjs` dizini
 * okumuyordu ve hiçbir kapı bunu görmüyordu.
 *
 * Ölçüt SERT, çözücününkiyle aynı: bir dize bile eksikse kâğıt reddedilir.
 * Yarım çevrilmiş bir sınav kâğıdı, çevrilmemişinden kötüdür.
 */
import { readFileSync } from "node:fs";
import { MOCK_PAPERS } from "@/lib/mock-exams";
import {
  resolveMockPaper,
  mockKey,
  isTurkishStem,
  type MockShape,
  type NativeDict,
} from "@/lib/lessons/native";
import { extractMock } from "../data/mock-exams/prose/make.js";

const dict = JSON.parse(
  readFileSync("src/lib/lessons/generated/native-en.json", "utf8"),
) as NativeDict;

/* Almanca kâğıtlar. İngilizce kâğıtlar zaten İngilizce ve ANADİLİ İngilizce
   olan biri İngilizce kursu almıyor — o eksen `PAIR_READY`de kapalı. */
const papers = MOCK_PAPERS.filter((p) => p.course === "de");

/* SÖZLÜK ÖNCE: çıkarıcının bulduğu her anahtar sözlükte var mı. Kâğıt
   reddedildiğinde hangi dizenin eksik olduğunu söylemek için gerekiyor —
   `resolveMockPaper` yalnız "düştü" diyor, nerede düştüğünü demiyor.
   Anahtarı ÇÖZÜCÜNÜN kendi işlevi kuruyor (`mockKey`); ayracı burada
   tekrar yazmak, kapının ölçtüğü şeyle uygulamanın kullandığı şeyi
   ayrıştırabilirdi. */
const rows = extractMock();
const missing = rows.filter((r) => dict.mock[mockKey(r.kind, r.tr)] === undefined);

/* ÇIKTIDA TÜRKÇE KALDI MI — kâğıdın HER dizesi, alan adına bakmadan.
   Yukarıdaki iki ölçüt yalnız ÇIKARICININ BİLDİĞİ alanları görüyor: yeni bir
   Türkçe alan eklenirse çıkarıcı onu görmez, sözlükte aranmaz, kapı yeşil
   kalır ve Türkçe doğrudan ekrana çıkar. Bu tarama tam da o boşluk için —
   ve ilk koşuşunda 408 dize buldu: metinlerin `gloss` sözlükçeleri hiç
   katlanmıyordu. */
const leftover = new Map<string, string>();
let strings = 0;
const walk = (v: unknown, id: string): void => {
  if (typeof v === "string") {
    strings++;
    if (isTurkishStem(v)) leftover.set(v, id);
    return;
  }
  if (Array.isArray(v)) {
    for (const x of v) walk(x, id);
    return;
  }
  if (v && typeof v === "object") for (const x of Object.values(v)) walk(x, id);
};

const bad: string[] = [];
let resolved = 0;
for (const p of papers) {
  const out = resolveMockPaper(dict, p as unknown as MockShape);
  if (out) {
    resolved++;
    walk(out, p.id);
  } else bad.push(p.id);
}

console.log(
  `deneme kâğıdı ${papers.length} · sözlük ${Object.keys(dict.mock).length} girdi · ` +
    `çıkarıcı ${rows.length} dize · çözülen kâğıt ${resolved} · taranan dize ${strings}`,
);

if (missing.length) {
  console.log(`\nHATA: ${missing.length} dize sözlükte yok\n`);
  for (const r of missing.slice(0, 15))
    console.log(`  [${r.kind}] ${JSON.stringify(r.tr.slice(0, 80))}`);
  process.exit(1);
}
if (bad.length) {
  console.log(`\nHATA: ${bad.length} kâğıt reddedildi: ${bad.slice(0, 10).join(", ")}`);
  process.exit(1);
}
if (leftover.size) {
  console.log(`\nHATA: çözüldükten sonra ${leftover.size} dize hâlâ Türkçe görünüyor\n`);
  for (const [text, id] of [...leftover].slice(0, 25))
    console.log(`  [${id}] ${JSON.stringify(text.slice(0, 90))}`);
  process.exit(1);
}
console.log(
  "\ntamam: her Almanca deneme kâğıdının Türkçe yüzü — sözlükçesi dahil —" +
    " İngilizceye çözülüyor",
);
