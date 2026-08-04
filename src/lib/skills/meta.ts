import type { CefrLevel, SkillExercise, SkillId } from "./types";

/**
 * İçerik dosyalarını İÇE AKTARMAYAN sabitler ve saf yardımcılar.
 * İstemci bileşenleri buradan beslenir; böylece binlerce satırlık egzersiz
 * metni istemci paketine sızmaz. Tam içerik yalnızca sunucuda (index.ts) açılır.
 */

export const SKILL_LABELS: Record<SkillId, string> = {
  reading: "Okuma",
  listening: "Dinleme",
  writing: "Yazma",
};

export const SKILL_ORDER: SkillId[] = ["reading", "listening", "writing"];
export const LEVEL_ORDER: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];

/** Puanlanabilir madde sayısı: soru ya da yazma görevi. */
export function itemCount(ex: SkillExercise): number {
  return ex.skill === "writing" ? ex.tasks.length : ex.questions.length;
}

/**
 * XP hesabı — istemci ve sunucu aynı formülü kullanır; sunucu istemciden
 * gelen doğru sayısını madde sayısıyla sınırlar, XP asla istemciden gelmez.
 */
export function xpFor(ex: SkillExercise, correct: number): number {
  const items = itemCount(ex);
  const capped = Math.max(0, Math.min(items, Math.round(correct)));
  const perItem = ex.skill === "writing" ? 10 : 6;
  const bonus = capped === items ? 10 : 0;
  return capped * perItem + bonus;
}
