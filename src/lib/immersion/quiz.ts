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
 * @param review ÖNCEKİ ünitelerin kelimeleri — verilirse soruların üçte biri
 *   oradan gelir (aşağıdaki not).
 * Kelime hatırlama (de→tr) çoğunluk; kalıp varsa birkaç kalıp hatırlama (tr→de).
 *
 * NEDEN BİRİKİMLİ: item'ın adı "Tekrar / Karışık hatırlama" ama sorular yalnız
 * bitmekte olan ünitenin kelimelerinden geliyordu — yani karışık değildi ve
 * ünite 3'te öğrenilen kelime ünite 4'ten sonra bu yolla bir daha hiç sorulmuyordu.
 * Aralıklı tekrarın tamamı oyun tarafındaki SRS'e kalıyordu; patika katmanının
 * kendi hatırlatması yoktu. Artık soruların ~üçte biri geçmiş ünitelerden gelir
 * ve seçim tüm geçmişe yayılır (yalnız bir önceki üniteye değil), çünkü asıl
 * unutulan eski olandır.
 */
export function deriveQuiz(
  brief: UnitBrief,
  pool: QuizPool,
  count = 8,
  review?: QuizPool,
): SkillQuestion[] {
  const qs: SkillQuestion[] = [];
  const trPool = pool.vocab.map((v) => v.tr);
  const dePatternPool = pool.patterns.map((p) => p.de);

  // Kalıp varsa sona ~2 kalıp sorusu bırak, gerisi kelime.
  const patTarget = brief.patterns.length ? Math.min(2, brief.patterns.length) : 0;
  const reviewWords = pickReview(brief, review, Math.floor(count / 3));
  const vocabTarget = Math.min(brief.vocab.length, count - patTarget - reviewWords.length);

  const own: SkillQuestion[] = [];
  for (let i = 0; i < vocabTarget; i++) {
    const v = brief.vocab[i];
    const { options, answer } = placeAnswer(v.tr, pickDistractors(v.tr, trPool, i), i);
    own.push({ kind: "mcq", text: `«${v.de}» ne demek?`, options, answer, explain: `${v.de} = ${v.tr}.` });
  }
  const back: SkillQuestion[] = reviewWords.map((v, i) => {
    const { options, answer } = placeAnswer(v.tr, pickDistractors(v.tr, trPool, i + 101), i + 101);
    return {
      kind: "mcq" as const,
      text: `«${v.de}» ne demek?`,
      options,
      answer,
      // Soru metni ipucu vermez; açıklama nereden geldiğini söyler.
      explain: `${v.de} = ${v.tr}. (önceki ünitelerden tekrar)`,
    };
  });
  qs.push(...interleave(own, back));

  for (let j = 0; j < patTarget && qs.length < count; j++) {
    const p = brief.patterns[j];
    const { options, answer } = placeAnswer(p.de, pickDistractors(p.de, dePatternPool, j), j);
    qs.push({ kind: "mcq", text: `«${p.tr}» Almanca nasıl denir?`, options, answer, explain: `${p.tr} → ${p.de}` });
  }
  return qs.slice(0, count);
}

/**
 * Geçmiş ünitelerden `n` kelime seç — deterministik, tüm geçmişe yayılmış.
 *
 * Sabit adımla dolaşılır ve başlangıç noktası ünite sırasına bağlıdır: böylece
 * her ünitenin tekrar seti farklı kelimelere denk gelir ama aynı ünite hep aynı
 * seti verir (resume güvenli, test edilebilir). Bu ünitede zaten öğretilen
 * kelimeler elenir — aynı soru iki kez sorulmasın.
 */
function pickReview(brief: UnitBrief, review: QuizPool | undefined, n: number): VocabItem[] {
  if (!review || n <= 0) return [];
  const own = new Set(brief.vocab.map((v) => v.de));
  const seen = new Set<string>();
  const pool = review.vocab.filter((v) => {
    if (!v.de || !v.tr || own.has(v.de) || seen.has(v.de)) return false;
    seen.add(v.de);
    return true;
  });
  if (!pool.length) return [];
  const take = Math.min(n, pool.length);
  const step = Math.max(1, Math.floor(pool.length / take));
  const out: VocabItem[] = [];
  // Başlangıç ünite sırasından, ASAL bir çarpanla: düz `index % pool` her ünitede
  // yalnız bir kayma verir ve 25 ünite havuzun hep aynı dar bandına düşer. Çarpan
  // adıma eşit olmamalı (index*5 + adım 5, ünite 3 ile 7'yi aynı sete düşürüyordu).
  // `take` de başlangıca girer: aynı ünitenin quiz'i (2 tekrar) ile checkpoint'i
  // (4 tekrar) yoksa aynı yerden başlar ve büyük ölçüde aynı kelimeleri sorar.
  let idx = (brief.index * 37 + take * 13) % pool.length;
  for (let guard = 0; out.length < take && guard < pool.length * 2; guard++) {
    const cand = pool[idx % pool.length];
    if (!out.includes(cand)) out.push(cand);
    idx += step;
  }
  return out;
}

/** İki listeyi karıştırarak birleştir — tekrar soruları bloklanmasın, araya girsin. */
function interleave(own: SkillQuestion[], back: SkillQuestion[]): SkillQuestion[] {
  if (!back.length) return own;
  const out: SkillQuestion[] = [];
  const gap = Math.max(1, Math.ceil(own.length / (back.length + 1)));
  let b = 0;
  for (let i = 0; i < own.length; i++) {
    out.push(own[i]);
    if (b < back.length && (i + 1) % gap === 0) out.push(back[b++]);
  }
  while (b < back.length) out.push(back[b++]);
  return out;
}
