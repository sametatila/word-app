/**
 * Beceri egzersizi kataloğu — mobil paket (scripts/dump-skills-mobile ile
 * data/skills/.exercises.json'dan; de kursu, okuma/dinleme/yazma). İçerik
 * statik ve derlemeye gömülü (web'de de öyle: "veritabanı gerektirmez, PWA'da
 * çevrimdışı çalışır"). Egzersiz sayısı slot sayısından az; erken üniteler
 * dolu, sonrakiler "Yakında" (web gerçekliğiyle aynı).
 */
import { courseOrDefault, currentCourseId } from "../../lib/courses";
import all from "./exercises.json";
import allEn from "./exercises-en.json";

export type Gloss = { de: string; tr: string; en?: string; hd?: string; note?: string };
export type SkillQuestion = {
  kind?: "mcq" | "truefalse" | "gapfill" | "produce" | "short_answer" | "order" | "dictation";
  text: string; options: string[]; answer: number; accept?: string[]; items?: string[]; explain: string;
};
export type ListeningSegment = { speaker?: string; text: string; audio?: string };
export type SkillExercise = {
  id: string; level: string; skill: "reading" | "listening" | "writing" | "speaking";
  title: string; genre: string; intro: string; gloss: Gloss[]; minutes: number; unit?: number;
  text?: string; segments?: ListeningSegment[]; questions?: SkillQuestion[]; tasks?: unknown[];
};

const ALL = all as SkillExercise[];
const ALL_EN = allEn as SkillExercise[];

/**
 * Havuzlar kursa göre. Almanca paketin id'leri kurs öneksiz ("a1-r1", üretici
 * `course` alanını düşürüyor); İngilizce paket bu yüzden kurs önekli
 * ("en-a1-r1") — aynı id iki kursta birden var olsaydı tek bir dizin ikisini
 * birbirine karıştırırdı. Dersler zaten kurs önekli, beceriler de öyle kalmalı.
 *
 * İngilizce bugün yalnız A1 okuma; dinleme ve yazma slotları havuz boş olduğu
 * için "Yakında" gösterir (Almancada da geç ünitelerde öyle).
 */
const BY_COURSE: Record<string, SkillExercise[]> = { de: ALL, en: ALL_EN };

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

/**
 * Havuz İKİYE AYRILDI ve iki taraf birbirinin egzersizini görmüyor.
 *
 * Ayrımı veri zaten taşıyordu: `unit` alanı dolu olan egzersiz bir Patika
 * ünitesine aittir (Almanca havuzda 870 tane), boş olan yalnız Beceriler
 * sekmesinindir (160 tane: 60 okuma, 60 dinleme, 40 yazma). Bu alan bugüne
 * kadar mobilde hiç okunmuyordu: Beceriler havuzun TAMAMINI listeliyordu, yani
 * Patika'daki her egzersiz orada bir kez daha görünüyordu.
 *
 * Patika tarafı sırayla tüketiyor (ünite başına 2). Bugün fark yaratmıyor —
 * havuz zaten ünite sırasına dizili ve bağsızlar sonda — ama süzgeç yine de
 * konuldu: bir seviyede ünite sayısı bağlı egzersizden fazla olursa üretici
 * Beceriler'in içeriğine taşardı ve ayrım sessizce bozulurdu.
 */
function metaOf(e: SkillExercise): SkillMeta {
  return { id: e.id, level: e.level, skill: e.skill, title: e.title, genre: e.genre, minutes: e.minutes };
}

function listMeta(
  level: string,
  skill: "reading" | "listening" | "writing" | "speaking",
  course: string,
  keep: (e: SkillExercise) => boolean,
): SkillMeta[] {
  return poolFor(course).filter((e) => e.level === level && e.skill === skill && keep(e)).map(metaOf);
}

/** Patika üretici havuzu — yalnız bir üniteye bağlı egzersizler. */
export function listPathSkillMeta(
  level: string,
  skill: "reading" | "listening" | "writing" | "speaking",
  course: string = currentCourseId(),
): SkillMeta[] {
  return listMeta(level, skill, course, (e) => e.unit != null);
}

/** Beceriler sekmesi — yalnız Patika'da yeri olmayan, sekmenin kendi egzersizleri. */
export function listOwnSkillMeta(
  level: string,
  skill: "reading" | "listening" | "writing" | "speaking",
  course: string = currentCourseId(),
): SkillMeta[] {
  return listMeta(level, skill, course, (e) => e.unit == null);
}
