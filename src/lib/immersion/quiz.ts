import type { SkillQuestion } from "@/lib/skills/types";
import type { PatternItem, VocabItem } from "@/lib/lessons/types";
import type { UnitBrief } from "./brief";

/**
 * Ünite brief'inden hatırlama sorusu üretir — `quiz` ve `checkpoint` item'ları için.
 *
 * İÇERİK YAZIMI GEREKMEZ: sorular ünitenin KENDİ kelime/kalıplarından çıkar
 * (lessonların üzerine inşa), distraktörler diğer ünitelerin havuzundan. Böylece
 * hep tema-hizalı. Deterministik (RNG yok — aynı ünite hep aynı quiz'i verir, test
 * edilebilir ve resume güvenli). Mevcut `SkillQuestion` tipini üretir; `quiz.tsx`
 * QuestionList aynen render eder.
 *
 * KALİTE UYARISI: distraktörler havuzdan alınır; anlamca yakın (eşanlamlı) bir
 * distraktör ara sıra sızabilir (ör. "isim" doğruyken "ad" distraktör). Düşük
 * riskli PRATİK quiz için sorun değil — bu yüzden auto-quiz şimdilik gating
 * YAPMAZ (gating derslere bağlı). Checkpoint'i gerçekten kapı yapmadan önce
 * distraktör elemesi sıkılaştırılmalı.
 */

export type QuizPool = { vocab: VocabItem[]; patterns: PatternItem[] };

/** Doğru cevabı ve tekrarları eleyip havuzdan i'ye bağlı sabit ofsetle n distraktör al. */
function pickDistractors(correct: string, pool: string[], i: number, n = 3): string[] {
  const uniqPool = [...new Set(pool)].filter((x) => x && x !== correct);
  if (uniqPool.length <= n) return uniqPool;
  const out: string[] = [];
  const step = 1 + (i % 3);
  let idx = (i * 7) % uniqPool.length;
  let guard = 0;
  while (out.length < n && guard++ < uniqPool.length * 2) {
    const cand = uniqPool[idx % uniqPool.length];
    if (!out.includes(cand)) out.push(cand);
    idx += step;
  }
  return out;
}

/** Doğru cevabı distraktörlerin arasına deterministik bir konuma yerleştir. */
function placeAnswer(correct: string, distractors: string[], i: number): { options: string[]; answer: number } {
  const options = [...distractors];
  const answer = i % (distractors.length + 1);
  options.splice(answer, 0, correct);
  return { options, answer };
}

/**
 * @param count kaç soru (quiz ~6–8, checkpoint ~10–12).
 * Kelime hatırlama (de→tr) çoğunluk; kalıp varsa birkaç kalıp hatırlama (tr→de).
 */
export function deriveQuiz(brief: UnitBrief, pool: QuizPool, count = 8): SkillQuestion[] {
  const qs: SkillQuestion[] = [];
  const trPool = pool.vocab.map((v) => v.tr);
  const dePatternPool = pool.patterns.map((p) => p.de);

  // Kalıp varsa sona ~2 kalıp sorusu bırak, gerisi kelime.
  const patTarget = brief.patterns.length ? Math.min(2, brief.patterns.length) : 0;
  const vocabTarget = Math.min(brief.vocab.length, count - patTarget);

  for (let i = 0; i < vocabTarget; i++) {
    const v = brief.vocab[i];
    const { options, answer } = placeAnswer(v.tr, pickDistractors(v.tr, trPool, i), i);
    qs.push({ kind: "mcq", text: `«${v.de}» ne demek?`, options, answer, explain: `${v.de} = ${v.tr}.` });
  }
  for (let j = 0; j < patTarget && qs.length < count; j++) {
    const p = brief.patterns[j];
    const { options, answer } = placeAnswer(p.de, pickDistractors(p.de, dePatternPool, j), j);
    qs.push({ kind: "mcq", text: `«${p.tr}» Almanca nasıl denir?`, options, answer, explain: `${p.tr} → ${p.de}` });
  }
  return qs.slice(0, count);
}
