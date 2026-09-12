/**
 * Deneme sınavlarını mobil pakete döker — KAYNAKTAN.
 *
 * Kâğıtlar `src/lib/mock-exams` altında TypeScript olarak duruyor: web ve
 * doğrulayıcı onları doğrudan okuyor. Mobil bunu yapamaz (RN paketine
 * `src/` girmiyor), bu yüzden aynı liste tek bir JSON'a yazılıyor ve
 * `mobile/src/data/exams.ts` yalnız onu import ediyor.
 *
 * Beceri paketiyle aynı mantık (bkz. `dump-skills-mobile.ts`): tek kaynak
 * web tarafında, mobil türev. Kâğıt değiştiğinde bu betik yeniden
 * çalıştırılmazsa mobil eski içerikte kalır — bu yüzden dökümün sonunda
 * kâğıt ve madde sayısı basılıyor, fark gözden kaçmasın.
 *
 * Kullanım: npm run dump:mock-exams
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { MOCK_PAPERS } from "../src/lib/mock-exams";

/**
 * Kursun mobil paketi: dosya yolu + yazılacak JSON.
 *
 * `check-dumps` aynı işlevi çağırıp dosyayla BAYT BAYT karşılaştırıyor.
 * Yukarıdaki "kâğıt değiştiğinde bu betik yeniden çalıştırılmazsa mobil eski
 * içerikte kalır" cümlesi 2026-09-12'de ÖLÇÜLDÜ: `papers-en.json` bir
 * gerekçede hâlâ «Ayşe» taşıyordu, kaynak ise c2f714b8'te «Ayse»ye
 * çekilmişti. Sayı basmak yetmemiş; kapı artık metne bakıyor.
 */
export function buildPaperDump(course: string) {
  const keep = MOCK_PAPERS.filter((p) => p.course === course);
  const file =
    course === "de" ? "mobile/src/data/exams/papers.json" : `mobile/src/data/exams/papers-${course}.json`;
  return { file, json: JSON.stringify(keep), rows: keep };
}

if (process.argv[1]?.endsWith("dump-mock-exams-mobile.ts")) {
  const course = (process.argv[2] ?? "de").toLowerCase();
  const { file, json, rows } = buildPaperDump(course);
  if (!rows.length) {
    console.error(`"${course}" kursu için deneme sınavı yok — paket yazılmadı.`);
    process.exit(1);
  }
  const out = join(process.cwd(), file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, json);

  const items = rows.reduce((a, p) => a + p.parts.reduce((b, s) => b + s.tasks.reduce((c, t) => c + t.items.length, 0), 0), 0);
  const byLevel: Record<string, number> = {};
  for (const p of rows) byLevel[p.level] = (byLevel[p.level] ?? 0) + 1;
  console.log(course, "yazıldı:", rows.length, "kâğıt,", items, "madde", JSON.stringify(byLevel));
}
