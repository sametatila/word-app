/**
 * Ders kataloğunu mobil pakete döker (seviye başına bir JSON).
 *
 * Web dersi koddan okuyor (findLesson); mobilin de aynı içeriğe ihtiyacı var
 * çünkü /api/lesson yalnızca SONUCU kaydeder, içeriği sunmaz.
 *
 * ÇEVRİMDIŞI SENARYO ARTIK DÖKÜLÜYOR. Eskiden `script` hariç tutuluyordu
 * ("mobil konuşmayı /api/roleplay ile yürütür") ve bu, sağlayıcı kapalıyken
 * Android'de hiçbir konuşma dersinin geçilememesi demekti — geçme koşulu
 * konuşmanın yapılmasını istiyor. Web o durumda senaryoya düşüyor; mobil de
 * artık düşüyor (`game/offlineRoleplay`).
 *
 * Paket şişmesi ölçüldü: senaryo 780 dersin yalnız 10'unda var.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { lessonsFor } from "../src/lib/lessons/index";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
const DIR = "mobile/src/data/lessons";

/**
 * Bir kursun mobil paketleri: dosya yolu + yazılacak JSON, seviye seviye.
 *
 * AYRI BİR İŞLEV, ÇÜNKÜ KAPI DA AYNI PROJEKSİYONU İSTİYOR. `check-dumps`
 * bunu çağırıp dosyayla BAYT BAYT karşılaştırıyor; kimlik kümesi eşitliği
 * metin sapmasını görmüyordu (gerekçe orada). Projeksiyon tek yerde durmalı,
 * yoksa kapı dökümün kendisinden ayrı düşer ve yanlış yeri gösterir.
 *
 * Dersi olmayan seviye için dosya YAZILMIYOR: mobil yükleyici paketleri tek
 * tek import ediyor (`mobile/src/data/lessons/index.ts`) ve boş bir dosyayı
 * hiçbir şey import etmez — yazmak yalnız depoya ölü dosya bırakırdı.
 */
export function buildLessonDump(course: string) {
  const all = lessonsFor(course);
  const packs: { level: string; file: string; json: string; count: number }[] = [];
  for (const level of LEVELS) {
    const lessons = all
      .filter((l) => l.level === level)
      .map((l) => {
        return {
          id: l.id, level: l.level, course: l.course, icon: l.icon,
          title: l.title, titleTr: l.titleTr, summary: l.summary, minutes: l.minutes,
          focusId: l.focusId, vocab: l.vocab, patterns: l.patterns,
          lecture: l.lecture, roleplay: l.roleplay,
        };
      });
    if (!lessons.length) continue;
    packs.push({
      level,
      file: `${DIR}/${course}-${level.toLowerCase()}.json`,
      json: JSON.stringify(lessons),
      count: lessons.length,
    });
  }
  return packs;
}

/**
 * Dökülecek kurs: `npm run dump:lessons -- <kurs>` (varsayılan "de").
 *
 * Kurs sabit "de" yazılıydı ve dosya adı da öyle üretiliyordu; ikinci bir dil
 * eklendiğinde bu betik sessizce yine Almanca paketi yazardı. Mobil yükleyici
 * paketleri kurs adına göre ayırıyor (data/lessons/index.ts).
 */
if (process.argv[1]?.endsWith("dump-lessons-mobile.ts")) {
  const course = (process.argv[2] ?? "de").toLowerCase();
  const packs = buildLessonDump(course);
  if (!packs.length) {
    console.error(`"${course}" kursu için ders yok — paket yazılmadı.`);
    process.exit(1);
  }
  mkdirSync(join(process.cwd(), DIR), { recursive: true });
  let total = 0;
  for (const level of LEVELS) {
    const pack = packs.find((p) => p.level === level);
    if (!pack) {
      console.log(level.padEnd(3), "   —  ders yok, dosya yazılmadı");
      continue;
    }
    writeFileSync(join(process.cwd(), pack.file), pack.json);
    total += pack.count;
    console.log(level.padEnd(3), String(pack.count).padStart(4), "ders");
  }
  console.log(course, "toplam", total);
}
