/**
 * Ünite quiz/checkpoint sorularını CİHAZDA türetir — web'in brief.ts +
 * quiz.ts'inin mobil portu. İçerik yazımı gerekmez: sorular ünitenin kendi
 * kelime/kalıplarından (4 dersi), distraktörler seviyenin havuzundan. Tema
 * hizalı, deterministik (RNG yok → aynı ünite hep aynı quiz). SkillQuestion
 * üretir; QuestionList aynen render eder.
 */
import { lessonsForLevel } from "../data/lessons";
import { seededShuffle } from "../lib/shuffle";
import { moduleTheme } from "../data/moduleThemes";
import { t, targetLangName } from "../lib/i18n";
import { currentCourseId } from "../lib/courses";
import { MOCK_LABELS } from "../data/exams";
import type { SkillQuestion } from "../data/skills";

const UNIT_LESSONS = 4;
const MODULE_SIZE = 10;
type VocabItem = { de: string; tr: string };
type PatternItem = { de: string; tr: string };


function dedupeBy<T>(xs: T[], key: (x: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const x of xs) { const k = key(x); if (seen.has(k)) continue; seen.add(k); out.push(x); }
  return out;
}

/** Soru havuzu — web `lib/immersion/quiz` `QuizPool` ile aynı. */
export type QuizPool = { vocab: VocabItem[]; patterns: PatternItem[] };

export type UnitBrief = {
  /** Ünitenin sırası (1-tabanlı) — tekrar havuzunun başlangıcı buna bağlı. */
  index: number;
  vocab: VocabItem[];
  patterns: PatternItem[];
  theme: string;
  lessonTitles: string[];
};

export function buildUnitBrief(level: string, unitIndex: number): UnitBrief {
  const lessons = lessonsForLevel(level);
  const u = unitIndex - 1;
  const unitLessons = lessons.slice(u * UNIT_LESSONS, u * UNIT_LESSONS + UNIT_LESSONS);
  const theme = moduleTheme(currentCourseId(), level, Math.floor((u * UNIT_LESSONS) / MODULE_SIZE)) || t("path.unit_fallback", { level: level, n: unitIndex });
  return {
    index: unitIndex,
    vocab: dedupeBy(unitLessons.flatMap((l) => l.vocab), (v) => v.de),
    patterns: dedupeBy(unitLessons.flatMap((l) => l.patterns), (p) => p.de),
    theme,
    lessonTitles: unitLessons.map((l) => l.title),
  };
}

/**
 * BU üniteden ÖNCEKİ ünitelerin havuzu — quiz'in üçte biri buradan gelir.
 *
 * Web bunu çağrı yerinde kuruyor (`app/(app)/immersion/quiz/[unit]/page`);
 * mobilde ekran ders listesine erişmediği için burada kuruluyor. Ünite 1'de
 * boş döner ve `deriveQuiz` tekrar sorusu üretmez.
 */
export function earlierPool(level: string, unitIndex: number): QuizPool {
  const lessons = lessonsForLevel(level).slice(0, Math.max(0, unitIndex - 1) * UNIT_LESSONS);
  return { vocab: lessons.flatMap((l) => l.vocab), patterns: lessons.flatMap((l) => l.patterns) };
}

export function levelPool(level: string): QuizPool {
  const lessons = lessonsForLevel(level);
  return { vocab: lessons.flatMap((l) => l.vocab), patterns: lessons.flatMap((l) => l.patterns) };
}

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

function placeAnswer(correct: string, distractors: string[], i: number): { options: string[]; answer: number } {
  const options = [...distractors];
  const answer = i % (distractors.length + 1);
  options.splice(answer, 0, correct);
  return { options, answer };
}

/**
 * Tekrar kelimeleri — ÖNCEKİ ünitelerden seçim.
 *
 * Web `lib/immersion/quiz` `pickReview` ile aynı mantık; mobilde hiç yoktu,
 * yani Android öğrencisi ünite quizinde yalnız o ünitenin kelimelerini
 * görüyordu. Seçim başlangıcı ASAL bir çarpanla kayıyor: düz `index % pool`
 * her ünitede yalnız bir kayma verir ve yirmi beş ünite havuzun hep aynı dar
 * bandına düşer. `take` de başlangıca giriyor, yoksa aynı ünitenin quiz'i (2
 * tekrar) ile checkpoint'i (4 tekrar) aynı yerden başlar ve büyük ölçüde aynı
 * kelimeleri sorardı.
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
  let idx = (brief.index * 37 + take * 13) % pool.length;
  for (let guard = 0; out.length < take && guard < pool.length * 2; guard++) {
    const cand = pool[idx % pool.length];
    if (!out.includes(cand)) out.push(cand);
    idx += step;
  }
  return out;
}

/** Tekrar soruları kendi sorularının ARASINA serpilir — sona yığılmaz. */
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

/** count: quiz ~8, checkpoint ~12. Kelime hatırlama çoğunluk + birkaç kalıp. */
export function deriveQuiz(
  brief: UnitBrief,
  pool: QuizPool,
  count = 8,
  review?: QuizPool,
): SkillQuestion[] {
  const qs: SkillQuestion[] = [];
  const trPool = pool.vocab.map((v) => v.tr);
  const dePatternPool = pool.patterns.map((p) => p.de);
  const patTarget = brief.patterns.length ? Math.min(2, brief.patterns.length) : 0;
  const reviewWords = pickReview(brief, review, Math.floor(count / 3));
  const vocabTarget = Math.min(brief.vocab.length, count - patTarget - reviewWords.length);

  const own: SkillQuestion[] = [];
  for (let i = 0; i < vocabTarget; i++) {
    const v = brief.vocab[i];
    const { options, answer } = placeAnswer(v.tr, pickDistractors(v.tr, trPool, i), i);
    own.push({ kind: "mcq", text: t("quiz.what_means", { word: v.de }), options, answer, explain: `${v.de} = ${v.tr}.` });
  }
  const back: SkillQuestion[] = reviewWords.map((v, i) => {
    const { options, answer } = placeAnswer(v.tr, pickDistractors(v.tr, trPool, i + 101), i + 101);
    /* Soru metni ipucu vermez; açıklama nereden geldiğini söyler. */
    return {
      kind: "mcq" as const,
      text: t("quiz.what_means", { word: v.de }),
      options,
      answer,
      explain: `${v.de} = ${v.tr}. ${t("quiz.from_earlier")}`.trim(),
    };
  });
  qs.push(...interleave(own, back));
  /* KALIP SORUSUNUN YÖNÜ KURSA BAĞLI. Almanca kursta kalıbın `tr` alanı
     çeviri ("Ich heiße …" → "adım …"), yani "nasıl denir?" doğru bir üretim
     sorusu. İngilizce kursta `tr` bir KULLANIM NOTU ("adını söylerken
     kullanılır") ve aynı soru "«adını söylerken kullanılır» İngilizce nasıl
     denir?" diye okunuyordu. Orada soru tersine dönüyor; web tarafı da öyle
     (bkz. `src/lib/immersion/quiz.ts` `PatternAsk`). */
  const meaning = currentCourseId() === "en";
  const trPatternPool = pool.patterns.map((p) => p.tr);
  for (let j = 0; j < patTarget && qs.length < count; j++) {
    const p = brief.patterns[j];
    if (meaning) {
      const { options, answer } = placeAnswer(p.tr, pickDistractors(p.tr, trPatternPool, j), j);
      qs.push({ kind: "mcq", text: t("quiz.what_means", { word: p.de }), options, answer, explain: `${p.de} = ${p.tr}` });
      continue;
    }
    const { options, answer } = placeAnswer(p.de, pickDistractors(p.de, dePatternPool, j), j);
    qs.push({ kind: "mcq", text: t("quiz.how_to_say", { pattern: p.tr, target: targetLangName() }), options, answer, explain: `${p.tr} → ${p.de}` });
  }
  return qs.slice(0, count);
}

/* ─────────────────────────── GRAMER ─────────────────────────── */

/* KARIŞTIRMA `lib/shuffle`DEN. Burada `seededOrder` diye AYRI bir uygulama
   duruyordu ve yorumu "web'deki seededShuffle ile aynı amaç" diyordu — amaç
   aynıydı, ALGORİTMA değil: tohumlama ikisinde de FNV-1a ama bu kopya
   xorshift + `Math.abs(h) % (i+1)` kullanıyordu, web (ve mobilin kendi
   `lib/shuffle`ı) mulberry32 + `Math.floor(rand() * (i+1))`. Sıra farkı
   masum değildi: hüküm sayısı yarıdan çoksa dilimleme SEÇİMİ de değiştiriyor,
   yani aynı ünitede iki platform farklı gramer sorusu soruyordu. */

/**
 * Ünitenin gramer adımı — ünitenin KENDİ derslerinden türetilir.
 *
 * Web'deki `lib/immersion/grammar.ts` ile aynı kural, aynı iki kaynak:
 * dersin hüküm adımları (gerekçesiyle birlikte) ve üretim hedefleri (dizme
 * sorusu olarak). Mobilde ayrı bir uygulama olmasının sebebi quiz ile aynı:
 * cihaz kendi patikasını kurabiliyor ve ağ beklemiyor.
 *
 * İki uygulama ayrışırsa aynı ünite iki platformda başka soru verir; o yüzden
 * kural burada da BİREBİR aynı tutuluyor — dört hüküm, dört dizme, 4-8 sözcük
 * sınırı, tohumlu sıra.
 */
export function deriveGrammar(level: string, unitIndex: number, count = 8): SkillQuestion[] {
  const lessons = lessonsForLevel(level).slice((unitIndex - 1) * 4, (unitIndex - 1) * 4 + 4);
  /* Tohum web ile AYNI biçimde kurulmalı: `${kurs}-${seviye}-uNN`
     (bkz. `lib/immersion/brief` `unitId`). "de-" SABİT yazılıydı, yani
     İngilizce kursta mobilin tohumu webinkinden farklıydı ve aynı ünitede
     iki platform farklı soru seçiyordu. */
  const unitId = `${currentCourseId()}-${String(level).toLowerCase()}-u${String(unitIndex).padStart(2, "0")}`;
  const judges: SkillQuestion[] = [];
  const orders: SkillQuestion[] = [];

  for (const lesson of lessons as { title: string; lecture?: { expect?: Record<string, unknown> }[] }[]) {
    for (const step of lesson.lecture ?? []) {
      const e = step.expect as { kind?: string; statement?: string; answer?: boolean; why?: { text: string }[]; target?: string } | undefined;
      if (e?.kind === "truefalse" && e.statement) {
        judges.push({
          kind: "truefalse",
          text: e.statement,
          /* Hüküm şıkları KURSUN dilinde: sabit "Richtig/Falsch" İngilizce
             kursta da Almanca çıkıyordu ve İngilizce derslerde yüz tane hüküm
             adımı var. Deneme sınavı aynı çifti kursa göre veriyor
             (`MOCK_LABELS[course].bool`), buraya da oradan geliyor. */
          options: [...MOCK_LABELS[currentCourseId() === "en" ? "en" : "de"].bool],
          answer: e.answer ? 0 : 1,
          explain: (e.why ?? []).map((w) => w.text).join(" ").replace(/\s+([.,!?;:])/g, "$1").trim(),
        });
      } else if (e?.kind === "produce" && e.target) {
        const parts = e.target.trim().replace(/\s+/g, " ").split(" ");
        if (parts.length < 4 || parts.length > 8) continue;
        orders.push({
          kind: "order",
          text: e.target.endsWith("?") ? t("quiz.order_question") : t("quiz.order_sentence"),
          options: [],
          answer: 0,
          items: parts,
          explain: `„${e.target}“ — ${lesson.title}`,
        });
      }
    }
  }

  const half = Math.ceil(count / 2);
  const picked = seededShuffle(judges, `${unitId}|judge`).slice(0, Math.min(judges.length, half));
  const rest = seededShuffle(orders, `${unitId}|order`).slice(0, Math.max(0, count - picked.length));
  return [...picked, ...rest];
}
