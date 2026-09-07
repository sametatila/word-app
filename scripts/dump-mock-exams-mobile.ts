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

const course = (process.argv[2] ?? "de").toLowerCase();
const keep = MOCK_PAPERS.filter((p) => p.course === course);
if (!keep.length) {
  console.error(`"${course}" kursu için deneme sınavı yok — paket yazılmadı.`);
  process.exit(1);
}

const out = join(process.cwd(), course === "de" ? "mobile/src/data/exams/papers.json" : `mobile/src/data/exams/papers-${course}.json`);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(keep));

const items = keep.reduce((a, p) => a + p.parts.reduce((b, s) => b + s.tasks.reduce((c, t) => c + t.items.length, 0), 0), 0);
const byLevel: Record<string, number> = {};
for (const p of keep) byLevel[p.level] = (byLevel[p.level] ?? 0) + 1;
console.log(course, "yazıldı:", keep.length, "kâğıt,", items, "madde", JSON.stringify(byLevel));
