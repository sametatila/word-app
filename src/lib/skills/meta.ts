import type { CefrLevel, SkillExercise, SkillId } from "./types";
import { xpForSkill } from "@/lib/xp";

/**
 * İçerik dosyalarını İÇE AKTARMAYAN sabitler ve saf yardımcılar.
 * İstemci bileşenleri buradan beslenir; böylece binlerce satırlık egzersiz
 * metni istemci paketine sızmaz. Tam içerik yalnızca sunucuda (index.ts) açılır.
 */

export const SKILL_LABELS: Record<SkillId, string> = {
  reading: "Okuma",
  listening: "Dinleme",
  writing: "Yazma",
  speaking: "Konuşma",
};

export const SKILL_ORDER: SkillId[] = ["reading", "listening", "writing", "speaking"];
export const LEVEL_ORDER: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];

/** Puanlanabilir madde sayısı: soru ya da yazma görevi. */
export function itemCount(ex: SkillExercise): number {
  if (ex.skill === "writing") return ex.tasks.length;
  // Konuşma iki biçimde gelir: tek tek söyleyiş görevleri ya da diyalog turları.
  if (ex.skill === "speaking") return "dialogue" in ex ? ex.dialogue.length : ex.tasks.length;
  return ex.questions.length;
}

/**
 * XP hesabı — istemci ve sunucu aynı formülü kullanır; sunucu istemciden
 * gelen doğru sayısını madde sayısıyla sınırlar, XP asla istemciden gelmez.
 *
 * Puan madde başına değil **süre başına** hesaplanıyor (bkz. lib/xp.ts).
 * Önceki hâli madde başına 6–10 XP veriyordu: beş dakikalık, altı soruluk bir
 * okuma alıştırması 46 XP kazandırıyor, aynı beş dakikada kelime oyunu ~500 XP
 * veriyordu. Bu, becerileri puan cinsinden değersiz kılıyordu ve ölçümde de
 * öyle görünüyordu — yedi kullanıcıdan yalnızca biri bu bölümü açmıştı.
 *
 * Beceriler arasındaki eski ağırlık farkı (yazma > konuşma > okuma) kaldırıldı
 * çünkü yanlış eksende ölçüyordu: bir alıştırmanın zorluğu türünde değil
 * uzunluğunda ve soru sayısında. `minutes` alanı bunu zaten taşıyor.
 */
export function xpFor(ex: SkillExercise, correct: number): number {
  const items = itemCount(ex);
  const capped = Math.max(0, Math.min(items, Math.round(correct)));
  return xpForSkill(ex.minutes, capped, items);
}
