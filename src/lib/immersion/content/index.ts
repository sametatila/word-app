import type { SkillQuestion } from "@/lib/skills/types";
import * as deA1U01 from "./de-a1-u01";

/**
 * Ünite-bazlı ELLE YAZILMIŞ soru içeriği (gramer / quiz / bitiş sınavı).
 *
 * Auto-türetme (deriveQuiz) her ünitede yedek olarak var; burada bir ünite için
 * elle yazılmış içerik varsa oynatıcı ONU tercih eder (daha temiz distraktör,
 * gramer + okuma-kavrama gibi türetilemeyen soru tipleri). Registry büyüdükçe
 * yeni üniteler eklenir; grammar item'ı yalnız buraya yazılmış üniteler için
 * oynanabilir olur (yoksa "yakında").
 */
export type UnitQuestions = {
  grammar?: SkillQuestion[];
  quiz?: SkillQuestion[];
  checkpoint?: SkillQuestion[];
};

const REGISTRY: Record<string, UnitQuestions> = {
  "de-a1-u01": { grammar: deA1U01.grammar, quiz: deA1U01.quiz, checkpoint: deA1U01.checkpoint },
};

export function unitQuestions(unitId: string): UnitQuestions | undefined {
  return REGISTRY[unitId];
}

/** grammar item'ı yalnız elle yazılmış gramer varsa oynanabilir (build.ts kullanır). */
export function hasAuthoredGrammar(unitId: string): boolean {
  return Boolean(REGISTRY[unitId]?.grammar?.length);
}
