/**
 * Ünite quiz/checkpoint sorularını CİHAZDA türetir — web'in brief.ts +
 * quiz.ts'inin mobil portu. İçerik yazımı gerekmez: sorular ünitenin kendi
 * kelime/kalıplarından (4 dersi), distraktörler seviyenin havuzundan. Tema
 * hizalı, deterministik (RNG yok → aynı ünite hep aynı quiz). SkillQuestion
 * üretir; QuestionList aynen render eder.
 */
import { lessonsForLevel } from "../data/lessons";
import type { SkillQuestion } from "../data/skills";

const UNIT_LESSONS = 4;
const MODULE_SIZE = 10;
type VocabItem = { de: string; tr: string };
type PatternItem = { de: string; tr: string };

const MODULE_THEMES: Record<string, string[]> = {
  A1: ["Tanışma ve ben", "Aile ve insanlar", "Yeme-içme", "Günlük düzen", "Alışveriş", "Şehirde", "Ev ve yaşam", "Boş zaman", "Sağlık ve vücut", "İletişim ve geçmişe ilk adım"],
  A2: ["Geçmişi anlatmak", "Benim hikâyem", "Sağlık", "Ev ve mahalle", "İş hayatı", "Alışveriş ve hizmetler", "Seyahat", "Kutlamalar ve ilişkiler", "Medya ve teknoloji", "Şehir ve resmî işler"],
  B1: ["İş dünyası", "Ev ve kira dünyası", "Bağlaç ustalığı", "İlgi cümleleri", "Bürokrasi", "Eğitim ve gelişim", "Fikir ve tartışma", "Sağlık sistemi", "Çevre ve şehir yaşamı", "Duygular ve hayaller"],
  B2: ["Profesyonel iletişim", "Müzakere ve şikâyet", "Edilgenin bütün hâlleri", "Medya ve aktarılan söz", "Bilim ve teknoloji", "Toplum ve ekonomi", "Kültür ve sanat", "Para ve kariyer stratejisi", "İnsan ilişkileri ve psikoloji", "Resmî yazışma ve kapanış"],
  C1: ["Zarif iş iletişimi", "Kip parçacıkları", "Retorik ve sunum sanatı", "Deyimler ve mecazlar", "Basın ve akademik aktarım", "Hukuk ve sözleşme dili", "Karmaşık yapılar", "Toplumsal tartışma", "Mizah, ironi ve incelik", "Ustalık sahneleri"],
};

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
  const theme = MODULE_THEMES[level]?.[Math.floor((u * UNIT_LESSONS) / MODULE_SIZE)] || `${level} · Ünite ${unitIndex}`;
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
    qs.push({ kind: "mcq", text: `«${v.de}» ne demek?`, options, answer, explain: `${v.de} = ${v.tr}.` });
  }
  for (let j = 0; j < patTarget && qs.length < count; j++) {
    const p = brief.patterns[j];
    const { options, answer } = placeAnswer(p.de, pickDistractors(p.de, dePatternPool, j), j);
    qs.push({ kind: "mcq", text: `«${p.tr}» Almanca nasıl denir?`, options, answer, explain: `${p.tr} → ${p.de}` });
  }
  return qs.slice(0, count);
}
