/**
 * Beceri egzersizi kataloğu — mobil paket (scripts/dump-skills-mobile ile
 * data/skills/.exercises.json'dan; de kursu, okuma/dinleme/yazma). İçerik
 * statik ve derlemeye gömülü (web'de de öyle: "veritabanı gerektirmez, PWA'da
 * çevrimdışı çalışır"). Egzersiz sayısı slot sayısından az; erken üniteler
 * dolu, sonrakiler "Yakında" (web gerçekliğiyle aynı).
 */
import { courseOrDefault, currentCourseId } from "../../lib/courses";
import all from "./exercises.json";

export type Gloss = { de: string; tr: string; en?: string; hd?: string; note?: string };
export type SkillQuestion = {
  kind?: "mcq" | "truefalse" | "gapfill" | "produce" | "short_answer" | "order" | "dictation";
  text: string; options: string[]; answer: number; accept?: string[]; items?: string[]; explain: string;
};
export type ListeningSegment = { speaker?: string; text: string; audio?: string };
export type SkillExercise = {
  id: string; level: string; skill: "reading" | "listening" | "writing";
  title: string; genre: string; intro: string; gloss: Gloss[]; minutes: number; unit?: number;
  text?: string; segments?: ListeningSegment[]; questions?: SkillQuestion[]; tasks?: unknown[];
};

const ALL = all as SkillExercise[];

/**
 * Havuzlar kursa göre. Bugün yalnız Almanca paketi var (üretici `course`
 * alanını düşürüyor ve id'ler kurs öneksiz: "a1-r1").
 *
 * DİKKAT: yeni bir dilin egzersizleri eklenirken id'ler kurs önekli üretilmeli
 * (örn. "en-a1-r1"). Aksi hâlde "a1-r1" iki kursta birden var olur ve tek bir
 * dizin ikisini birbirine karıştırır — dersler zaten kurs önekli ("de-a1-…"),
 * beceriler bu yüzden ayrık kalmalı.
 */
const BY_COURSE: Record<string, SkillExercise[]> = { de: ALL };

/**
 * Kursun egzersiz havuzu. Ders yükleyicisiyle aynı kural: aynı hedef dili
 * paylaşan kursa düşmek meşru (gsw-zh → de), farklı dile ASLA düşülmez.
 */
function poolFor(course: string): SkillExercise[] {
  const own = BY_COURSE[course];
  if (own) return own;
  const target = courseOrDefault(course).targetLang;
  for (const id of Object.keys(BY_COURSE)) {
    if (courseOrDefault(id).targetLang === target) return BY_COURSE[id];
  }
  return [];
}

export function getExercise(id: string, course: string = currentCourseId()): SkillExercise | undefined {
  return poolFor(course).find((e) => e.id === id);
}

export type SkillMeta = { id: string; level: string; skill: string; title: string; genre: string; minutes: number };
export function listSkillMeta(
  level: string,
  skill: "reading" | "listening" | "writing",
  course: string = currentCourseId(),
): SkillMeta[] {
  return poolFor(course).filter((e) => e.level === level && e.skill === skill)
    .map((e) => ({ id: e.id, level: e.level, skill: e.skill, title: e.title, genre: e.genre, minutes: e.minutes }));
}
