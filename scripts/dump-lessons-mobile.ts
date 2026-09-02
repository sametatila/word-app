/**
 * Ders kataloğunu mobil pakete döker (seviye başına bir JSON).
 *
 * Web dersi koddan okuyor (findLesson); mobilin de aynı içeriğe ihtiyacı var
 * çünkü /api/lesson yalnızca SONUCU kaydeder, içeriği sunmaz. Çevrimdışı
 * roleplay senaryosu (script) hariç tutulur: mobil konuşmayı /api/roleplay ile
 * yürütür, senaryo sunucuda durur — böylece paket şişmez.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { lessonsFor } from "../src/lib/lessons/index";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
const out = join(process.cwd(), "mobile/src/data/lessons");
mkdirSync(out, { recursive: true });

/**
 * Dökülecek kurs: `npm run dump:lessons -- <kurs>` (varsayılan "de").
 *
 * Kurs sabit "de" yazılıydı ve dosya adı da öyle üretiliyordu; ikinci bir dil
 * eklendiğinde bu betik sessizce yine Almanca paketi yazardı. Mobil yükleyici
 * paketleri kurs adına göre ayırıyor (data/lessons/index.ts).
 */
const course = (process.argv[2] ?? "de").toLowerCase();
const all = lessonsFor(course);
if (!all.length) {
  console.error(`"${course}" kursu için ders yok — paket yazılmadı.`);
  process.exit(1);
}
let total = 0;
for (const level of LEVELS) {
  const lessons = all
    .filter((l) => l.level === level)
    .map((l) => {
      const rp = l.roleplay as Record<string, unknown>;
      const { script, ...roleplay } = rp;
      return {
        id: l.id, level: l.level, course: l.course, icon: l.icon,
        title: l.title, titleTr: l.titleTr, summary: l.summary, minutes: l.minutes,
        focusId: l.focusId, vocab: l.vocab, patterns: l.patterns,
        lecture: l.lecture, roleplay,
      };
    });
  const file = join(out, `${course}-${level.toLowerCase()}.json`);
  writeFileSync(file, JSON.stringify(lessons));
  total += lessons.length;
  console.log(level.padEnd(3), String(lessons.length).padStart(4), "ders");
}
console.log(course, "toplam", total);
