/**
 * Ünite quiz/checkpoint sorularını CİHAZDA türetir — web'in brief.ts +
 * quiz.ts'inin mobil portu. İçerik yazımı gerekmez: sorular ünitenin kendi
 * kelime/kalıplarından (4 dersi), distraktörler seviyenin havuzundan. Tema
 * hizalı, deterministik (RNG yok → aynı ünite hep aynı quiz). SkillQuestion
 * üretir; QuestionList aynen render eder.
 */
import { lessonsForLevel } from "../data/lessons";
import { moduleTheme } from "../data/moduleThemes";
import { t, targetLangName } from "../lib/i18n";
import { currentCourseId } from "../lib/courses";
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

export type UnitBrief = { vocab: VocabItem[]; patterns: PatternItem[]; theme: string; lessonTitles: string[] };

export function buildUnitBrief(level: string, unitIndex: number): UnitBrief {
  const lessons = lessonsForLevel(level);
  const u = unitIndex - 1;
  const unitLessons = lessons.slice(u * UNIT_LESSONS, u * UNIT_LESSONS + UNIT_LESSONS);
  const theme = moduleTheme(currentCourseId(), level, Math.floor((u * UNIT_LESSONS) / MODULE_SIZE)) || t("path.unit_fallback", { level: level, n: unitIndex });
  return {
    vocab: dedupeBy(unitLessons.flatMap((l) => l.vocab), (v) => v.de),
    patterns: dedupeBy(unitLessons.flatMap((l) => l.patterns), (p) => p.de),
    theme,
    lessonTitles: unitLessons.map((l) => l.title),
  };
}

export function levelPool(level: string): { vocab: VocabItem[]; patterns: PatternItem[] } {
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

/** count: quiz ~8, checkpoint ~12. Kelime hatırlama çoğunluk + birkaç kalıp. */
export function deriveQuiz(brief: UnitBrief, pool: { vocab: VocabItem[]; patterns: PatternItem[] }, count = 8): SkillQuestion[] {
  const qs: SkillQuestion[] = [];
  const trPool = pool.vocab.map((v) => v.tr);
  const dePatternPool = pool.patterns.map((p) => p.de);
  const patTarget = brief.patterns.length ? Math.min(2, brief.patterns.length) : 0;
  const vocabTarget = Math.min(brief.vocab.length, count - patTarget);

  for (let i = 0; i < vocabTarget; i++) {
    const v = brief.vocab[i];
    const { options, answer } = placeAnswer(v.tr, pickDistractors(v.tr, trPool, i), i);
    qs.push({ kind: "mcq", text: t("quiz.what_means", { word: v.de }), options, answer, explain: `${v.de} = ${v.tr}.` });
  }
  for (let j = 0; j < patTarget && qs.length < count; j++) {
    const p = brief.patterns[j];
    const { options, answer } = placeAnswer(p.de, pickDistractors(p.de, dePatternPool, j), j);
    qs.push({ kind: "mcq", text: t("quiz.how_to_say", { pattern: p.tr, target: targetLangName() }), options, answer, explain: `${p.tr} → ${p.de}` });
  }
  return qs.slice(0, count);
}

/* ─────────────────────────── GRAMER ─────────────────────────── */

/** Tohumlu karıştırma — web'deki seededShuffle ile aynı amaç: sıra sabit kalsın. */
function seededOrder<T>(arr: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
    const j = Math.abs(h) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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
  const unitId = `de-${String(level).toLowerCase()}-u${String(unitIndex).padStart(2, "0")}`;
  const judges: SkillQuestion[] = [];
  const orders: SkillQuestion[] = [];

  for (const lesson of lessons as { title: string; lecture?: { expect?: Record<string, unknown> }[] }[]) {
    for (const step of lesson.lecture ?? []) {
      const e = step.expect as { kind?: string; statement?: string; answer?: boolean; why?: { text: string }[]; target?: string } | undefined;
      if (e?.kind === "truefalse" && e.statement) {
        judges.push({
          kind: "truefalse",
          text: e.statement,
          options: ["Richtig", "Falsch"],
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
  const picked = seededOrder(judges, `${unitId}|judge`).slice(0, Math.min(judges.length, half));
  const rest = seededOrder(orders, `${unitId}|order`).slice(0, Math.max(0, count - picked.length));
  return [...picked, ...rest];
}
