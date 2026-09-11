/**
 * Beceri egzersizi kataloğu — mobil paket (`scripts/dump-skills-mobile`,
 * web'deki tek kaynaktan: `src/lib/skills/content/`). İçerik statik ve
 * derlemeye gömülü (web'de de öyle: "veritabanı gerektirmez, PWA'da
 * çevrimdışı çalışır").
 *
 * İki kurs, iki dosya ve İKİSİ AYNI ŞEY DEĞİL (ölçüm, 2026-09-11):
 * Almanca paket 995 egzersiz taşıyor, 870'i bir Patika ünitesine bağlı ve
 * 125'i kütüphanenin; İngilizce paket 189 egzersizin TAMAMI kütüphane,
 * ünitesi olan tek egzersiz yok. Yani İngilizce kursta Patika'nın
 * okuma/dinleme/yazma yuvaları boş kalıyor (`ref: null`) ve listede hiç
 * görünmüyor - eksik olan kod değil içerik, üç beceri × beş seviye ×
 * 50 yuva. Web'de de aynısı; iki platform ayrışmıyor.
 *
 * Beş beceri var: okuma, dinleme, yazma (Patika + kütüphane), konuşma ve
 * dil bilgisi (yalnız kütüphane).
 */
import { courseOrDefault, currentCourseId } from "../../lib/courses";
import { nativeExercise } from "../../lib/nativeContent";
import all from "./exercises.json";
import allEn from "./exercises-en.json";

export type Gloss = { de: string; tr: string; en?: string; hd?: string; note?: string };
export type SkillQuestion = {
  kind?: "mcq" | "truefalse" | "gapfill" | "produce" | "short_answer" | "order" | "dictation";
  text: string; options: string[]; answer: number; accept?: string[]; items?: string[]; explain: string;
};
export type ListeningSegment = { speaker?: string; text: string; audio?: string };
export type SkillKey = "reading" | "listening" | "writing" | "speaking" | "grammar";
/**
 * Web'deki `SkillExercise` birleşiminin düz (gevşek) mobil karşılığı: paket
 * JSON ve alanlar beceriye göre dolu/boş. Beceriler kütüphanesiyle (2026-09)
 * gelen alanlar: `course`, `focus` + `explanation` (dil bilgisi), `monologue`
 * (konuşma, B1+), `tasks` (yazma görevleri ya da söyleyiş cümleleri).
 */
export type SkillExercise = {
  id: string; level: string; skill: SkillKey; course?: string;
  title: string; genre: string; intro: string; gloss: Gloss[]; minutes: number; unit?: number;
  text?: string; segments?: ListeningSegment[]; questions?: SkillQuestion[]; tasks?: unknown[];
  focus?: string;
  explanation?: { heading?: string; tr: string; examples?: { de: string; tr: string; note?: string }[] }[];
  monologue?: { promptTr: string; bulletsTr: string[]; targets: Gloss[]; minSeconds: number; maxSeconds: number; sampleDe: string; rubricHint?: string };
  /** Konuşma alıştırmasının tur listesi (A1-A2); madde sayısı buradan. */
  dialogue?: unknown[];
};

const ALL = all as SkillExercise[];
const ALL_EN = allEn as SkillExercise[];

/**
 * Havuzlar kursa göre. Almanca paketin id'leri kurs öneksiz ("a1-r1", üretici
 * `course` alanını düşürüyor); İngilizce paket bu yüzden kurs önekli
 * ("en-a1-r1") — aynı id iki kursta birden var olsaydı tek bir dizin ikisini
 * birbirine karıştırırdı. Dersler zaten kurs önekli, beceriler de öyle kalmalı.
 *
 * İngilizce paketi 2026-09'dan beri web'den dökülüyor (tek kaynak
 * `src/lib/skills/content/library/`): A1/A2'nin 94 egzersizi ve her seviyenin
 * kütüphane egzersizleri orada.
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

/*
  ANA DİL BURADA. Egzersizin içeriğini okuyan TEK yol bu; oynatıcılar,
  puanlama ve kayıt hepsi `getExercise`ten geçiyor. `listMeta` çevirmiyor
  ve çevirmemeli: liste satırı yalnız `title`/`genre` taşıyor, ikisi de
  öğrenilen dilde.
*/
export function getExercise(id: string, course: string = currentCourseId()): SkillExercise | undefined {
  const e = poolFor(course).find((x) => x.id === id);
  return e ? nativeExercise(e) : undefined;
}

export type SkillMeta = { id: string; level: string; skill: string; title: string; genre: string; minutes: number; items: number };

/**
 * Egzersizin MADDE sayısı — web `lib/skills/meta` `itemCount` ile aynı kural.
 *
 * Liste satırı bunu yazıyor ("3 madde"): öğrenci açmadan önce ne kadar iş
 * olduğunu görüyor. Mobil listede hiç yoktu, oysa veri elde ve kural üç
 * satır. Konuşma üç biçimde gelir - söyleyiş görevleri, diyalog turları ya
 * da tek monolog - ve üçü ayrı sayılır.
 */
export function itemCount(ex: SkillExercise): number {
  if (ex.skill === "writing") return ex.tasks?.length ?? 0;
  if (ex.skill === "speaking") return ex.dialogue ? ex.dialogue.length : ex.monologue ? 1 : (ex.tasks?.length ?? 0);
  return ex.questions?.length ?? 0;
}

/**
 * Havuz İKİYE AYRILDI ve iki taraf birbirinin egzersizini görmüyor.
 *
 * Ayrımı veri zaten taşıyordu: `unit` alanı dolu olan egzersiz bir Patika
 * ünitesine aittir (Almanca havuzda 870 tane), boş olan yalnız Beceriler
 * sekmesinindir (Almanca 125: beş becerinin her biri için 25; İngilizce 189).
 * Bu alan bir süre mobilde hiç okunmuyordu: Beceriler havuzun TAMAMINI
 * listeliyordu, yani Patika'daki her egzersiz orada bir kez daha
 * görünüyordu.
 *
 * Patika tarafı sırayla tüketiyor (ünite başına 2). Bugün fark yaratmıyor —
 * havuz zaten ünite sırasına dizili ve bağsızlar sonda — ama süzgeç yine de
 * konuldu: bir seviyede ünite sayısı bağlı egzersizden fazla olursa üretici
 * Beceriler'in içeriğine taşardı ve ayrım sessizce bozulurdu.
 */
function metaOf(e: SkillExercise): SkillMeta {
  return { id: e.id, level: e.level, skill: e.skill, title: e.title, genre: e.genre, minutes: e.minutes, items: itemCount(e) };
}

function listMeta(
  level: string,
  skill: SkillKey,
  course: string,
  keep: (e: SkillExercise) => boolean,
): SkillMeta[] {
  return poolFor(course).filter((e) => e.level === level && e.skill === skill && keep(e)).map(metaOf);
}

/** Patika üretici havuzu — yalnız bir üniteye bağlı egzersizler. */
export function listPathSkillMeta(
  level: string,
  skill: SkillKey,
  course: string = currentCourseId(),
): SkillMeta[] {
  return listMeta(level, skill, course, (e) => e.unit != null);
}

/** Beceriler sekmesi — yalnız Patika'da yeri olmayan, sekmenin kendi egzersizleri. */
export function listOwnSkillMeta(
  level: string,
  skill: SkillKey,
  course: string = currentCourseId(),
): SkillMeta[] {
  return listMeta(level, skill, course, (e) => e.unit == null);
}
