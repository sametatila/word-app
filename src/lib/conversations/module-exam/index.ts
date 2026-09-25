import { A1_EXAMS } from "./a1";
import { A2_EXAMS } from "./a2";
import { B1_EXAMS } from "./b1";
import { B2_EXAMS } from "./b2";
import { C1_EXAMS } from "./c1";
import { EN_A1_EXAMS } from "./en/a1";
import { EN_A2_EXAMS } from "./en/a2";
import { EN_B1_EXAMS } from "./en/b1";
import { EN_B2_EXAMS } from "./en/b2";
import { EN_C1_EXAMS } from "./en/c1";
import type { ModuleExamPlan } from "./types";

export type { ModuleExamPlan, ExamCando, ExamQuestion, ExamTurn } from "./types";

/**
 * Modül sınavı planları — kurstaki her modül için bir kâğıt.
 *
 * Katalog gibi bu da tamamen kod: içerik kullanıcıya göre değişmiyor ve
 * dersler nasıl kodda duruyorsa sınav kâğıdının elle yazılan yarısı da orada
 * duruyor. Modül eklendiğinde buraya bir plan eklemek zorunlu —
 * `scripts/check-exams.ts` plansız modülü hata sayıyor.
 */
/**
 * Kâğıtlar KURSA göre duruyor.
 *
 * Anahtar eskiden `level:index` idi, yani kurs boyutu yoktu: planların
 * başlıkları, soruları ve `canDo` maddeleri Almanca yazılmış olduğu hâlde
 * her kurs aynı kâğıda düşüyordu. İngilizce kursta bu, Patika'da Almanca
 * başlıklı sınavlar demekti ve tek çare kursu adıyla dışarıda bırakmaktı
 * (`hasModuleExams` içinde `course !== "en"`). Artık ayrım VERİDE: bir kursun
 * kâğıdı yoksa o kursta modül sınavı da yok, kod kurs adı saymıyor.
 */
const COURSE_PLANS: Record<string, ModuleExamPlan[]> = {
  de: [...A1_EXAMS, ...A2_EXAMS, ...B1_EXAMS, ...B2_EXAMS, ...C1_EXAMS],
  en: [...EN_A1_EXAMS, ...EN_A2_EXAMS, ...EN_B1_EXAMS, ...EN_B2_EXAMS, ...EN_C1_EXAMS],
};

/**
 * Bütün kâğıtlar, kursları KARIŞMIŞ hâlde.
 *
 * Kursu önemsemeyen işler için: uzunluk ölçen, sayan, tarayan betikler.
 * Kursu önemseyen her yer `MODULE_EXAM_ENTRIES` okumalı — kâğıdın kendisi
 * kursunu SÖYLEMİYOR ve bu bilerek böyle: kurs, planın bir alanı olsaydı
 * anahtarla ayrışabilirdi ve hangisinin doğru olduğu bilinemezdi.
 */
export const MODULE_EXAMS: ModuleExamPlan[] = Object.values(COURSE_PLANS).flat();

/**
 * Kâğıtlar KURSUYLA birlikte — tek doğruluk kaynağı `COURSE_PLANS` anahtarı.
 *
 * İkinci bir kurs (İngilizce, 2026-09-21) eklenene kadar bu ihtiyaç
 * görünmüyordu: kâğıt taşıyan tek kurs Almanca olduğu için kursu soran
 * betikler sabit yazmıştı (`const COURSE = "de"`, `course: "de"`). Sabit
 * kalanları İngilizce kâğıtlar sessizce Almanca sayardı — İngilizce diyaloğu
 * Almanca kadroyla seslendirmek ya da Almanca sözlükte aramak gibi.
 */
export const MODULE_EXAM_ENTRIES: { course: string; plan: ModuleExamPlan }[] = Object.entries(
  COURSE_PLANS,
).flatMap(([course, plans]) => plans.map((plan) => ({ course, plan })));

/** Kâğıdı olan kurslar — denetim betikleri bu listeyi dolaşıyor. */
export const EXAM_COURSES: string[] = Object.keys(COURSE_PLANS);

/** Bir kursun bütün kâğıtları (kurs bilmiyorsa boş). */
export function courseExams(course: string): ModuleExamPlan[] {
  return COURSE_PLANS[course] ?? [];
}

const BY_KEY = new Map<string, ModuleExamPlan>(
  Object.entries(COURSE_PLANS).flatMap(([course, plans]) =>
    plans.map((p) => [`${course}:${p.level}:${p.index}`, p] as [string, ModuleExamPlan]),
  ),
);

export function moduleExamPlan(course: string, level: string, index: number): ModuleExamPlan | undefined {
  return BY_KEY.get(`${course}:${level}:${index}`);
}

/**
 * Bu kursta modül sınavı var mı.
 *
 * Planlar `level:index` ile anahtarlanıyor, KURS boyutu yok: başlıkları
 * (`titleDe`), soruları ve `canDo` maddeleri Almanca yazılmış. Bu, iki kurs
 * varken görünmez bir varsayımdı — ikisi de Almanca öğretiyor. İngilizce kurs
 * eklenince görünür oldu: İngilizce öğrenen birinin Patika'sında Almanca
 * başlıklı modül sınavları çıkıyor ve açtığında Almanca kâğıt geliyordu.
 *
 * Kontrol artık PLAN VERİSİNE bakıyor (2026-09-12): kurs adı saymıyor, o
 * kursun kâğıdı var mı diye soruyor. İngilizce kâğıtlar yazıldığı gün bu
 * işlev kendiliğinden doğruyu söyleyecek.
 */
export function hasModuleExams(course: string): boolean {
  return (COURSE_PLANS[course]?.length ?? 0) > 0;
}
