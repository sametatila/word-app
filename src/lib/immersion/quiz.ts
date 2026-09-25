import type { SkillQuestion } from "@/lib/skills/types";
import type { PatternItem, VocabItem } from "@/lib/conversations/types";
import type { UnitBrief } from "./brief";

/**
 * Ünite brief'inden hatırlama sorusu üretir — `quiz` ve `unitQuiz` item'ları için.
 *
 * İÇERİK YAZIMI GEREKMEZ: sorular ünitenin KENDİ kelime/kalıplarından çıkar
 * (conversationların üzerine inşa), distraktörler diğer ünitelerin havuzundan. Böylece
 * hep tema-hizalı. Deterministik (RNG yok — aynı ünite hep aynı quiz'i verir, test
 * edilebilir ve resume güvenli). Mevcut `SkillQuestion` tipini üretir; `quiz.tsx`
 * QuestionList aynen render eder.
 *
 * Distraktörler havuzdan alınır ve doğru cevapla başlık ya da anlam
 * paylaşanlar elenir (`quizClash`): "der Name" = "isim" sorusunda başka bir
 * Konuşma adımındaki "ad" karşılığı artık şık olmuyor. Metni farklı ama anlamı aynı iki
 * Türkçe sözcüğü (ad / isim) başlık ortak değilse makine ayıramaz; auto-quiz
 * bu yüzden hâlâ gating YAPMAZ (gating Konuşma adımlarına bağlı).
 */

export type QuizPool = { vocab: VocabItem[]; patterns: PatternItem[] };

/**
 * Çeldirici adayı: şıkta görünen metin, taşıdığı anlam ve kelimenin başlığı.
 *
 * TEK DOĞRU CEVAP. Çeldirici yalnız doğru cevapla birebir aynı metin değilse
 * alınıyordu; bu yüzden aynı Almanca başlığın başka bir konuşmadaki karşılığı
 * ("der Name" → "isim" doğruyken "ad") ve anlam paylaşan kelimeler ikinci bir
 * doğru şık olabiliyordu, iki çeldirici de birbirinin aynısı olabiliyordu.
 * Aday şu durumlarda elenir: metni aynı, başlığı aynı ya da anlam parçaları
 * (virgül, noktalı virgül, eğik çizgiyle ayrılmış) kesişiyor. Seçilen
 * çeldiriciler birbirine karşı da aynı kuraldan geçer. Seçim yine
 * deterministik (aynı ünite hep aynı quiz'i verir).
 */
type QuizCand = { text: string; mean: string; head: string };

const quizNorm = (x: string) =>
  x.toLowerCase().replace(/i̇/g, "i").replace(/[…«»"“”„]/g, "").replace(/\s+/g, " ").trim();
const quizHead = (x: string) => quizNorm(x).replace(/^(der|die|das|the|to)\s+/, "");
const quizParts = (x: string) => new Set(x.split(/[,;/]/).map(quizNorm).filter(Boolean));

function quizClash(a: QuizCand, b: QuizCand): boolean {
  if (quizNorm(a.text) === quizNorm(b.text) || quizHead(a.head) === quizHead(b.head)) return true;
  const own = quizParts(a.mean);
  for (const m of quizParts(b.mean)) if (own.has(m)) return true;
  return false;
}

function pickDistractors(correct: QuizCand, pool: QuizCand[], i: number, n = 3): string[] {
  const uniqPool: QuizCand[] = [];
  for (const c of pool) {
    if (!c.text || quizClash(correct, c)) continue;
    if (!uniqPool.some((u) => quizNorm(u.text) === quizNorm(c.text))) uniqPool.push(c);
  }
  const out: QuizCand[] = [];
  const step = 1 + (i % 3);
  let idx = (i * 7) % Math.max(1, uniqPool.length);
  for (let guard = 0; out.length < n && guard < uniqPool.length * 2; guard++) {
    const cand = uniqPool[idx % uniqPool.length];
    if (!out.some((o) => quizClash(o, cand))) out.push(cand);
    idx += step;
  }
  return out.map((c) => c.text);
}

/** Doğru cevabı distraktörlerin arasına deterministik bir konuma yerleştir. */
function placeAnswer(correct: string, distractors: string[], i: number): { options: string[]; answer: number } {
  const options = [...distractors];
  const answer = i % (distractors.length + 1);
  options.splice(answer, 0, correct);
  return { options, answer };
}

/**
 * @param count kaç soru (quiz ~6–8, unitQuiz ~10–12).
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
/**
 * Soru metinleri DIŞARIDAN geliyor: bu modül saf ve dil bilmiyor, çağıran
 * sayfa ise `getT()` ile kullanıcının dilini biliyor. Metinler burada sabit
 * yazılıydı ve İngilizce/Almanca arayüzde soru Türkçe çıkıyordu.
 */
export type QuizText = {
  whatMeans: (word: string) => string;
  howToSay: (pattern: string) => string;
  fromEarlier: string;
};

/**
 * Kalıp sorusunun YÖNÜ kursa bağlı.
 *
 * Almanca kursta kalıbın `tr` alanı ÇEVİRİ ("Ich heiße …" → "adım …"), yani
 * "«adım …» Almanca nasıl denir?" doğru bir üretim sorusu. İngilizce kursta
 * ise `tr` bir KULLANIM NOTU ("adını söylerken kullanılır") ve aynı soru
 * "«adını söylerken kullanılır» İngilizce nasıl denir?" diye okunuyordu —
 * not çevrilecek bir ifade değil.
 *
 * `"meaning"` yönünde soru tersine dönüyor: hedef dildeki cümle soruluyor,
 * şıklar notlar oluyor ("«My name is …» ne demek?"). İki yön de aynı iki
 * arayüz metnini kullanıyor, yeni sözlük anahtarı gerekmiyor.
 */
export type PatternAsk = "production" | "meaning";

export function deriveQuiz(
  brief: UnitBrief,
  pool: QuizPool,
  count = 8,
  review?: QuizPool,
  text?: QuizText,
  patternAsk: PatternAsk = "production",
): SkillQuestion[] {
  const say: QuizText = text ?? {
    whatMeans: (w) => `«${w}»?`,
    howToSay: (p) => `«${p}»?`,
    fromEarlier: "",
  };
  const qs: SkillQuestion[] = [];
  const vocabCands = pool.vocab.map((v) => ({ text: v.tr, mean: v.tr, head: v.de }));
  const dePatternCands = pool.patterns.map((p) => ({ text: p.de, mean: p.tr, head: p.de }));

  // Kalıp varsa sona ~2 kalıp sorusu bırak, gerisi kelime.
  const patTarget = brief.patterns.length ? Math.min(2, brief.patterns.length) : 0;
  const reviewWords = pickReview(brief, review, Math.floor(count / 3));
  const vocabTarget = Math.min(brief.vocab.length, count - patTarget - reviewWords.length);

  const own: SkillQuestion[] = [];
  for (let i = 0; i < vocabTarget; i++) {
    const v = brief.vocab[i];
    const { options, answer } = placeAnswer(v.tr, pickDistractors({ text: v.tr, mean: v.tr, head: v.de }, vocabCands, i), i);
    own.push({ kind: "mcq", text: say.whatMeans(v.de), options, answer, explain: `${v.de} = ${v.tr}.` });
  }
  const back: SkillQuestion[] = reviewWords.map((v, i) => {
    const { options, answer } = placeAnswer(v.tr, pickDistractors({ text: v.tr, mean: v.tr, head: v.de }, vocabCands, i + 101), i + 101);
    return {
      kind: "mcq" as const,
      text: say.whatMeans(v.de),
      options,
      answer,
      // Soru metni ipucu vermez; açıklama nereden geldiğini söyler.
      explain: `${v.de} = ${v.tr}. ${say.fromEarlier}`.trim(),
    };
  });
  qs.push(...interleave(own, back));

  const trPatternCands = pool.patterns.map((p) => ({ text: p.tr, mean: p.tr, head: p.de }));
  for (let j = 0; j < patTarget && qs.length < count; j++) {
    const p = brief.patterns[j];
    if (patternAsk === "meaning") {
      const { options, answer } = placeAnswer(p.tr, pickDistractors({ text: p.tr, mean: p.tr, head: p.de }, trPatternCands, j), j);
      qs.push({ kind: "mcq", text: say.whatMeans(p.de), options, answer, explain: `${p.de} = ${p.tr}` });
      continue;
    }
    const { options, answer } = placeAnswer(p.de, pickDistractors({ text: p.de, mean: p.tr, head: p.de }, dePatternCands, j), j);
    qs.push({ kind: "mcq", text: say.howToSay(p.tr), options, answer, explain: `${p.tr} → ${p.de}` });
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
  // `take` de başlangıca girer: aynı ünitenin quiz'i (2 tekrar) ile unitQuiz'i
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
