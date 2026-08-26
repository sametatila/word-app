import { A1_EXAMS } from "./a1";
import { A2_EXAMS } from "./a2";
import { B1_EXAMS } from "./b1";
import { B2_EXAMS } from "./b2";
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
export const MODULE_EXAMS: ModuleExamPlan[] = [...A1_EXAMS, ...A2_EXAMS, ...B1_EXAMS, ...B2_EXAMS];

const BY_KEY = new Map(MODULE_EXAMS.map((p) => [`${p.level}:${p.index}`, p]));

export function moduleExamPlan(level: string, index: number): ModuleExamPlan | undefined {
  return BY_KEY.get(`${level}:${index}`);
}
