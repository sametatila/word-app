"use client";

import { askAssess } from "@/lib/assess-client";
import { ASSESS_LEVELS, type AssessLevel } from "@/lib/assess-prompts";
import type { TargetLang } from "@/lib/courses";

/**
 * Yapay zekâ kontrolü — yerel hakem cevabı geçirmediğinde tek soru: bu cümle
 * kaynağın doğru bir karşılığı mı (anlam aynı, dilbilgisi doğru)?
 *
 * Çeviri turunun ikinci şansıyla (`games/translate-game`) AYNI istek: görev
 * metni `assess.ai_translate` ("Çevir: …"), tek `target`, kısıt ve alıştırma
 * kimliği yok. Sunucu bu biçimi tanıyıp ayrı, iki soruluk istemi kullanıyor
 * (`lib/translate-check` `isTranslateCheck`) ve kararı kendisi veriyor; eşik
 * ve bekleme süresi çeviri turununkiyle aynı sayılar (parity "YAZILAN CEVAP
 * HAKEMI"). Kullananlar: konuşma anlatımında yazılan üretim, cümle kurma
 * (parçalar) ve cümle dizme. Mobil `lib/sentenceRescue` karşılığı.
 *
 * Sağlayıcı yoksa, süre dolarsa ya da istek reddedilirse cevap `false`: yerel
 * hüküm geçerli kalır, öğrenci hiçbir şey kaybetmez.
 */
export const RESCUE_WAIT_MS = 6000;
export const RESCUE_ACCEPT = 75;

export async function rescueSentence(
  o: { source: string; target: string; typed: string; level?: string | null; lang: TargetLang },
  t: (key: string, vars?: Record<string, string | number>) => string,
): Promise<boolean> {
  const level = (ASSESS_LEVELS.find((l) => l === String(o.level ?? "").toUpperCase()) ?? "A1") as AssessLevel;
  const ai = await askAssess(
    {
      kind: "sentence",
      level,
      task: { prompt: t("assess.ai_translate", { source: o.source }), target: o.target },
      answer: { text: o.typed },
      lang: o.lang,
    },
    { timeoutMs: RESCUE_WAIT_MS },
  );
  return ai.ok && ai.result.score.overall >= RESCUE_ACCEPT && ai.result.score.task >= 3;
}
