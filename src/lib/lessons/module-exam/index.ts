import { A1_EXAMS } from "./a1";
import { A2_EXAMS } from "./a2";
import { B1_EXAMS } from "./b1";
import { B2_EXAMS } from "./b2";
import { C1_EXAMS } from "./c1";
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
 *
 * İngilizce kâğıtlar yazıldığında buraya `en:` anahtarı eklenecek; Patika
 * zaten planı olmayan modülü elemeye hazır (`immersion/page.tsx`).
 */
const COURSE_PLANS: Record<string, ModuleExamPlan[]> = {
  de: [...A1_EXAMS, ...A2_EXAMS, ...B1_EXAMS, ...B2_EXAMS, ...C1_EXAMS],
};

export const MODULE_EXAMS: ModuleExamPlan[] = Object.values(COURSE_PLANS).flat();

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
