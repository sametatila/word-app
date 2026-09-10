/**
 * Çözücüyü GERÇEK ders nesneleri üzerinde denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/check-native-lessons.ts`
 *
 * Hatların kendi kapıları (her hattın `check.mjs`'i) yazılanı denetliyor
 * ama hepsi ÇIKARIM üzerinden çalışıyor: `make.mjs` içerik dosyalarını
 * düzenli ifadeyle tarıyor. Bu betik tersini yapıyor — dersleri import edip
 * çalışma anındaki parçaları geziyor. İkisi arasındaki her sapma burada
 * görünür:
 *
 *   - şablonun ürettiği dize (`word()`), taramanın hiç görmediği metin
 *   - kaçış karakteri yüzünden farklı çıkan dize
 *   - `say` dışındaki diziler (`hint`, `why`)
 *
 * Ölçüt SERT: bir parça bile çözülemezse ders reddediliyor. Yarım ders —
 * içinde tek bir Türkçe cümle kalmış İngilizce anlatım — çalışıyor görünen
 * en kötü biçim.
 *
 * İKİ ÖLÇÜT VAR ve ikincisi ALAN ADINA HİÇ BAKMIYOR. Birincisi anlatım
 * parçalarını tek tek çözüyor ve nerede eksik olduğunu söylüyor; ikincisi
 * dersin TAMAMINI çözüp çıktıyı geziyor — hangi alan olduğu umurunda değil.
 * Fark, birincinin yalnız BİLDİĞİ alanları görmesi: bir kalıp maddesi tam
 * o boşluktan kaçtı (sondaki virgül yüzünden çıkarıcı onu hiç görmedi) ve
 * ders İngilizce açılıp altında Türkçe bir kullanım notu taşıdı.
 */
import { readFileSync } from "node:fs";
import { LESSONS } from "@/lib/lessons";
import {
  resolveSegments,
  resolveLesson,
  resolveExam,
  isTurkishStem,
  type ExamShape,
  type NativeDict,
} from "@/lib/lessons/native";
import { MODULE_EXAMS } from "@/lib/lessons/module-exam";
import type { Segment } from "@/lib/lessons/types";

const dict = JSON.parse(
  readFileSync("src/lib/lessons/generated/native-en.json", "utf8"),
) as NativeDict;

const lessons = LESSONS.filter((l) => l.course === "de");

let segs = 0;
let ok = 0;
const misses = new Map<string, { lesson: string; prev: string | null; n: number }>();

for (const l of lessons) {
  for (const step of l.lecture ?? []) {
    const arrays: (Segment[] | undefined)[] = [step.say];
    const e = step.expect as { hint?: Segment[]; why?: Segment[] } | undefined;
    if (e?.hint) arrays.push(e.hint);
    if (e?.why) arrays.push(e.why);
    for (const arr of arrays) {
      if (!arr) continue;
      // Parça parça deneniyor: `resolveSegments` ilk hatada duruyor, oysa
      // rapor bütün eksikleri göstermeli.
      let prev: string | null = null;
      for (const s of arr) {
        if (s.lang !== "tr") {
          prev = s.text;
          continue;
        }
        segs++;
        const r = resolveSegments(dict, l.id, prev ? [{ lang: "de", text: prev }, s] : [s]);
        if (r) ok++;
        else {
          const k = s.text;
          const m = misses.get(k) ?? { lesson: l.id, prev, n: 0 };
          m.n++;
          misses.set(k, m);
        }
        prev = null;
      }
    }
  }
}

/* ÇIKTI TARAMASI — dersin TAMAMI çözülüyor mu, ve çözüldükten sonra Türkçe
   kalan var mı.

   Yukarıdaki ölçüt yalnız ANLATIM parçalarına bakıyor ve uzun süre tek
   ölçüt oydu. Bir kalıp maddesi tam da o boşluktan kaçtı: kaynakta sondaki
   virgül yüzünden çıkarıcı onu hiç görmedi, sözlüğe girmedi, `resolveLesson`
   sessizce Türkçesine düştü ve HİÇBİR kapı bunu göremedi — çünkü hepsi aynı
   çıkarıcıya soruyordu. Alan adına bakan bir ölçüt, ancak BİLDİĞİ alanlar
   kadar geniş; bu tarama alan adına hiç bakmıyor.

   `match` ATLANIYOR ve bu bir istisna değil, tür farkı: senaryo dallarının
   eşleştirme kökleri ekranda görünmüyor, öğrencinin SÖYLEDİĞİNE bakıyor ve
   Türkçe bir kök orada meşru ("teşekkür", Türkçe yolun kendisi). */
const SKIP = new Set(["match"]);
const rejected: string[] = [];
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
  if (v && typeof v === "object")
    for (const [k, x] of Object.entries(v)) if (!SKIP.has(k)) walk(x, id);
};
for (const l of lessons) {
  const out = resolveLesson(dict, l);
  if (!out) rejected.push(l.id);
  else walk(out, l.id);
}

/* MODÜL SINAVI da bu eksenin parçası: sözlükteki `exam` tablosu (1.781 dize)
   `apply.mjs` içinde ders hattıyla birlikte kuruluyor ve `resolveExam` onu
   okuyor. Ama BUGÜNE KADAR hiçbir kapı `resolveExam`i çalıştırmıyordu —
   hattın kendi kapısı (`check:lessons-exam`) yalnız yazılanı ölçüyor.
   Ölçüldü: 58 kâğıt, 6.728 dize, 0 reddedilen, 0 Türkçe. Yani bugün temiz;
   tarama bunun ÖYLE KALDIĞINI ölçüyor. */
for (const p of MODULE_EXAMS) {
  const id = `sınav ${p.level}:${p.index}`;
  const out = resolveExam(dict, p as unknown as ExamShape);
  if (!out) rejected.push(id);
  else walk(out, id);
}

console.log(
  `ders ${lessons.length} · tr parça ${segs} · çözülen ${ok} · ` +
    `modül sınavı ${MODULE_EXAMS.length} · ` +
    `çözülen ${lessons.length + MODULE_EXAMS.length - rejected.length} · taranan dize ${strings}`,
);
if (misses.size) {
  const total = [...misses.values()].reduce((a, m) => a + m.n, 0);
  console.log(`\nHATA: ${misses.size} benzersiz dize çözülemedi (${total} parça)\n`);
  for (const [text, m] of [...misses].sort((a, b) => b[1].n - a[1].n).slice(0, 25))
    console.log(`  ${String(m.n).padStart(4)}x [${m.lesson}] önce:${m.prev ?? "—"}\n       ${JSON.stringify(text.slice(0, 90))}`);
  process.exit(1);
}
if (rejected.length) {
  console.log(`\nHATA: ${rejected.length} ders/kâğıt reddedildi: ${rejected.slice(0, 10).join(", ")}`);
  process.exit(1);
}
if (leftover.size) {
  console.log(`\nHATA: çözüldükten sonra ${leftover.size} dize hâlâ Türkçe görünüyor\n`);
  for (const [text, id] of [...leftover].slice(0, 25))
    console.log(`  [${id}] ${JSON.stringify(text.slice(0, 90))}`);
  process.exit(1);
}
console.log(
  "\ntamam: her Türkçe parçanın İngilizcesi var; çözülmüş derste ve modül" +
    " sınavında Türkçe kalmıyor",
);
