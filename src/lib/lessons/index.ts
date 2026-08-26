import type { Lesson } from "./types";
import { deA1B01 } from "./content/de-a1-b01";
import { deA1B02 } from "./content/de-a1-b02";
import { deA1B03 } from "./content/de-a1-b03";
import { deA1B04 } from "./content/de-a1-b04";
import { deA1B05 } from "./content/de-a1-b05";
import { deA1B06 } from "./content/de-a1-b06";
import { deA1B07 } from "./content/de-a1-b07";
import { deA1B08 } from "./content/de-a1-b08";
import { deA1B09 } from "./content/de-a1-b09";
import { deA1B10 } from "./content/de-a1-b10";
import { deA2B01 } from "./content/de-a2-b01";
import { deA2B02 } from "./content/de-a2-b02";
import { deA2B03 } from "./content/de-a2-b03";
import { deA2B04 } from "./content/de-a2-b04";
import { deA2B05 } from "./content/de-a2-b05";
import { deA2B06 } from "./content/de-a2-b06";
import { deA2B07 } from "./content/de-a2-b07";
import { deA2B08 } from "./content/de-a2-b08";
import { deA2B09 } from "./content/de-a2-b09";
import { deA2B10 } from "./content/de-a2-b10";
import { deB1B01 } from "./content/de-b1-b01";
import { deB1B02 } from "./content/de-b1-b02";
import { deB1B03 } from "./content/de-b1-b03";
import { deB1B04 } from "./content/de-b1-b04";
import { deB1B05 } from "./content/de-b1-b05";
import { A1_SCRIPTS } from "./content/scripts-a1";

/**
 * Ders kataloğu.
 *
 * Beceri içeriğinden farklı olarak veritabanına yüklenmiyor: dersler bütünüyle
 * kod, çünkü hem anlatım senaryosu hem rol yapma istemi ders metninden
 * üretiliyor ve ikisinin ayrı yerlerde durması istemin içeriğe göre değişmesini
 * zorlaştırırdı. İlerleme (hangi ders bitti, hangi kural zayıf) veritabanında.
 *
 * Şimdilik yalnızca Almanca kursu: katalog Learna kurgusuna (anlatım + konuşma)
 * yeni geçti ve önce bu yapının oturması gerekiyor. Zürih dersleri aynı iskelet
 * doğrulandıktan sonra bu yapıda yeniden yazılacak.
 */
/**
 * Çevrimdışı senaryolar derse kimliğiyle bağlanıyor (WP-04). Ders dosyasına
 * gömülmemesinin sebebi içerik hattı: senaryolar ayrı üretilip ayrı gözden
 * geçiriliyor (WP-71/72) ve ders metnine dokunmadan eklenebiliyor. Derste
 * zaten `script` varsa o kazanır.
 */
const SCRIPTS: Record<string, Lesson["roleplay"]["script"]> = { ...A1_SCRIPTS };

function withScript(lesson: Lesson): Lesson {
  if (lesson.roleplay.script || !SCRIPTS[lesson.id]) return lesson;
  return { ...lesson, roleplay: { ...lesson.roleplay, script: SCRIPTS[lesson.id] } };
}

export const LESSONS: Lesson[] = [
  ...[

  ...deA1B01,
  ...deA1B02,
  ...deA1B03,
  ...deA1B04,
  ...deA1B05,
  ...deA1B06,
  ...deA1B07,
  ...deA1B08,
  ...deA1B09,
  ...deA1B10,
  ...deA2B01,
  ...deA2B02,
  ...deA2B03,
  ...deA2B04,
  ...deA2B05,
  ...deA2B06,
  ...deA2B07,
  ...deA2B08,
  ...deA2B09,
  ...deA2B10,
  ...deB1B01,
  ...deB1B02,
  ...deB1B03,
  ...deB1B04,
  ...deB1B05,
  ].map(withScript),
];

export const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"] as const;

/** Seviyenin sıradaki dizini — karşılaştırma için. Bilinmeyen seviye 0 sayılır. */
export function levelIndex(level: string): number {
  const at = LEVEL_ORDER.indexOf(level as (typeof LEVEL_ORDER)[number]);
  return at < 0 ? 0 : at;
}

export function lessonsFor(course: string): Lesson[] {
  const key = course === "gsw-zh" ? "gsw-zh" : "de";
  return LESSONS.filter((l) => l.course === key).sort(
    (a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level),
  );
}

export function findLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

/**
 * Dersin kendi seviyesindeki sırası (0 tabanlı).
 *
 * Modül pankartları ve rol yapma karakterleri bu sayıdan türüyor: katalogda
 * dersler seviye seviye sıralı olduğu için modül = sıra / 10. Sayıyı dersin
 * kendisine alan olarak yazmak, 500 derste tekrarlanan ama yalnızca iki
 * ekranda kullanılan bir alan yaratırdı.
 */
export function lessonIndexInLevel(lesson: Lesson): number {
  let i = 0;
  for (const l of LESSONS) {
    if (l.course !== lesson.course || l.level !== lesson.level) continue;
    if (l.id === lesson.id) return i;
    i++;
  }
  return 0;
}
