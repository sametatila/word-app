import type { Lesson } from "./types";
import { deA1 } from "./content/de-a1";
import { deA2 } from "./content/de-a2";
import { deB1 } from "./content/de-b1";
import { zhLessons } from "./content/zh";

/**
 * Ders kataloğu.
 *
 * Beceri içeriğinden farklı olarak veritabanına yüklenmiyor: dersler bütünüyle
 * kod, çünkü rol yapma istemi ders metninden üretiliyor ve ikisinin ayrı
 * yerlerde durması istemin içeriğe göre değişmesini zorlaştırırdı. İlerleme
 * (hangi ders bitti, hangi kural zayıf) veritabanında.
 */
export const LESSONS: Lesson[] = [...deA1, ...deA2, ...deB1, ...zhLessons];

const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"] as const;

export function lessonsFor(course: string): Lesson[] {
  const key = course === "gsw-zh" ? "gsw-zh" : "de";
  return LESSONS.filter((l) => l.course === key).sort(
    (a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level),
  );
}

export function findLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
