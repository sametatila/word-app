import type { SkillQuestion } from "@/lib/skills/types";
import { seededShuffle } from "@/lib/shuffle";
import type { Authored, Localized } from "./types";
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
  unitQuiz?: SkillQuestion[];
};

type AuthoredUnit = { grammar?: Authored[]; quiz?: Authored[]; unitQuiz?: Authored[] };

const REGISTRY: Record<string, AuthoredUnit> = {
  "de-a1-u01": { grammar: deA1U01.grammar, quiz: deA1U01.quiz, unitQuiz: deA1U01.unitQuiz },
};

/**
 * Anadile çözülmüş, şıkları tohumla dizilmiş sorular. Anadil İngilizce değilse
 * Türkçe (bugün Almanca kursun anadilleri Türkçe ve İngilizce). Tohum
 * `ünite | tür | soru`: aynı ünite hep aynı diziliş, mobil
 * (`data/authoredUnits`) aynı tohumu aynı `seededShuffle` ile kuruyor.
 */
function resolve(list: Authored[] | undefined, seed: string, lang: string): SkillQuestion[] | undefined {
  if (!list?.length) return undefined;
  const pick = (x: string | Localized) => (typeof x === "string" ? x : lang === "en" ? x.en : x.tr);
  return list.map((q, i) => {
    const order = seededShuffle([...q.options.keys()], `${seed}|${i}`);
    return {
      kind: "mcq" as const,
      text: pick(q.text),
      options: order.map((k) => pick(q.options[k])),
      answer: order.indexOf(0),
      explain: pick(q.explain),
    };
  });
}

export function unitQuestions(unitId: string, lang: string): UnitQuestions | undefined {
  const u = REGISTRY[unitId];
  if (!u) return undefined;
  return {
    grammar: resolve(u.grammar, `${unitId}|grammar`, lang),
    quiz: resolve(u.quiz, `${unitId}|quiz`, lang),
    unitQuiz: resolve(u.unitQuiz, `${unitId}|unitQuiz`, lang),
  };
}

/** grammar item'ı yalnız elle yazılmış gramer varsa oynanabilir (build.ts kullanır). */
export function hasAuthoredGrammar(unitId: string): boolean {
  return Boolean(REGISTRY[unitId]?.grammar?.length);
}
