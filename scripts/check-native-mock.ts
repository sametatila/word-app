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
import { resolveMockPaper, mockKey, type MockShape, type NativeDict } from "@/lib/lessons/native";
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

const bad: string[] = [];
let resolved = 0;
for (const p of papers) {
  if (resolveMockPaper(dict, p as unknown as MockShape)) resolved++;
  else bad.push(p.id);
}

console.log(
  `deneme kâğıdı ${papers.length} · sözlük ${Object.keys(dict.mock).length} girdi · ` +
    `çıkarıcı ${rows.length} dize · çözülen kâğıt ${resolved}`,
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
console.log("\ntamam: her Almanca deneme kâğıdının Türkçe yüzü İngilizceye çözülüyor");
