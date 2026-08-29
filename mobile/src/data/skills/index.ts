/**
 * Beceri egzersizi kataloğu — mobil paket (scripts/dump-skills-mobile ile
 * data/skills/.exercises.json'dan; de kursu, okuma/dinleme/yazma). İçerik
 * statik ve derlemeye gömülü (web'de de öyle: "veritabanı gerektirmez, PWA'da
 * çevrimdışı çalışır"). Egzersiz sayısı slot sayısından az; erken üniteler
 * dolu, sonrakiler "Yakında" (web gerçekliğiyle aynı).
 */
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
const INDEX: Record<string, SkillExercise> = {};
for (const e of ALL) INDEX[e.id] = e;

export function getExercise(id: string): SkillExercise | undefined { return INDEX[id]; }

export type SkillMeta = { id: string; level: string; skill: string; title: string; genre: string; minutes: number };
export function listSkillMeta(level: string, skill: "reading" | "listening" | "writing"): SkillMeta[] {
  return ALL.filter((e) => e.level === level && e.skill === skill)
    .map((e) => ({ id: e.id, level: e.level, skill: e.skill, title: e.title, genre: e.genre, minutes: e.minutes }));
}
