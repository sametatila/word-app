import "server-only";
import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { exams, userLessons, userSkills, words } from "@/lib/db/schema";
import { CHEAT_ITEMS } from "@/lib/cheatsheet/items";
import { chatConfigured } from "@/lib/chat-providers";
import { track } from "@/lib/events";
import { LESSONS } from "@/lib/lessons";
import { MODULE_SIZE } from "@/lib/lessons/modules";
import { moduleVocab } from "@/lib/lessons/boss";
import { makeRound, toRoundWord, weekStart } from "@/lib/session";
import { seededShuffle } from "@/lib/shuffle";
import { BUNDLED_EXERCISES } from "@/lib/skills/bundled";
import type { CefrLevel, WritingTask } from "@/lib/skills/types";
import type { Round } from "@/lib/types";

/**
 * Seviye ve modül sınavı v2 (plan WP-41).
 *
 * Modül patron turu bir HIZ turudur (15 tanıma sorusu, 60 sn); burası
 * gerçek sınav: bölümler, zaman sınırı, geri dönüş yok, ipucu yok, bölüm
 * başına puan, geçme eşiği ve sertifika.
 *
 *   Bölüm       modül  seviye  kaynak
 *   kelime        6      12    modül/seviye kelimeleri → çeviri / yazma (üretim)
 *   dilbilgisi    6      12    dilbilgisi tablosu hücreleri → şıklı (WP-11 gelince drill)
 *   okuma         3       6    beceri bankası, kullanılmamış egzersiz
 *   dinleme       3       6    beceri bankası, kullanılmamış egzersiz
 *   yazma         1       1    serbest görev → AI rubriği (WP-30)
 *   (konuşma WP-20/22 ile)
 *
 * Geçme: toplam ≥ %70 ve hiçbir bölüm < %50. Modül sınavında ön koşul:
 * modül derslerinin ≥ %80'i geçilmiş; değilse sınav "deneme" olarak
 * kaydedilir (sayılmaz, sertifika yok) — kullanıcı yine deneyebilir, ama
 * sonuç yetkinlik kanıtına girmez.
 *
 * Maddeler tohumlu: aynı kullanıcı, aynı sınav, aynı hafta → aynı kâğıt
 * (yarıda bırakıp dönünce farklı sorularla karşılaşmasın); haftaya yeni kâğıt.
 */

export type ExamKind = "module" | "level";
export type ExamSectionId = "vocab" | "grammar" | "reading" | "listening" | "writing";

export type GrammarItem = { id: string; sheet: string; key: string; label: string; options: string[]; answer: number };
export type TextItem = {
  id: string;
  title: string;
  text?: string;
  segments?: { speaker?: string; text: string }[];
  questions: { text: string; options: string[]; answer: number }[];
};
export type WritingItem = { id: string; task: Extract<WritingTask, { kind: "free" }> };

export type ExamPaper = {
  kind: ExamKind;
  level: CefrLevel;
  module: number | null;
  /** Ön koşul sağlanmadıysa true: sonuç sayılmaz. */
  trial: boolean;
  /** Toplam süre (saniye). */
  seconds: number;
  sections: {
    vocab: Round[];
    grammar: GrammarItem[];
    reading: TextItem[];
    listening: TextItem[];
    writing: WritingItem[];
  };
  seed: string;
};

export const MODULE_SECONDS = 20 * 60;
export const LEVEL_SECONDS = 45 * 60;
export const PASS_TOTAL = 70;
export const PASS_SECTION = 50;
export const MODULE_PREREQ = 0.8;

const COUNTS: Record<ExamKind, { vocab: number; grammar: number; text: number; writing: number }> = {
  module: { vocab: 6, grammar: 6, text: 1, writing: 1 },
  level: { vocab: 12, grammar: 12, text: 2, writing: 1 },
};

export function examKindKey(kind: ExamKind, level: CefrLevel, module: number | null): string {
  return kind === "module" ? `module:${level}:${module ?? 0}` : `level:${level}`;
}

async function modulePrereq(userId: string, course: string, level: CefrLevel, module: number): Promise<boolean> {
  const chunk = LESSONS.filter((l) => l.course === course && l.level === level).slice(module * MODULE_SIZE, (module + 1) * MODULE_SIZE);
  if (!chunk.length) return false;
  const rows = await db
    .select({ lessonId: userLessons.lessonId, correct: userLessons.correct, total: userLessons.total, roleplayDone: userLessons.roleplayDone })
    .from(userLessons)
    .where(and(eq(userLessons.userId, userId), inArray(userLessons.lessonId, chunk.map((l) => l.id))));
  const passed = rows.filter((r) => r.roleplayDone && r.total > 0 && r.correct / r.total >= 0.7).length;
  return passed / chunk.length >= MODULE_PREREQ;
}

export async function buildExam(userId: string, course: string, level: CefrLevel, module: number | null, today: string): Promise<ExamPaper> {
  const kind: ExamKind = module === null ? "level" : "module";
  const seed = `${userId}|${examKindKey(kind, level, module)}|${weekStart(today)}`;
  const c = COUNTS[kind];
  const trial = kind === "module" ? !(await modulePrereq(userId, course, level, module!)) : false;

  // Kelime: modül kelimeleri (başlık) ya da seviyenin sık kelimeleri; üretim turu.
  const pool = await db
    .select()
    .from(words)
    .where(and(eq(words.course, course), eq(words.niveau, level)))
    .orderBy(asc(sql`coalesce(${words.rank}, 999999)`), asc(words.id))
    .limit(400);
  let candidates = pool;
  if (kind === "module") {
    const heads = new Set(moduleVocab(course, level, module!).map((h) => h.toLocaleLowerCase("de-DE")));
    const inModule = pool.filter((w) => heads.has(w.de.toLocaleLowerCase("de-DE")));
    if (inModule.length >= c.vocab) candidates = inModule;
  }
  const vocab: Round[] = [];
  let seq = 0;
  const nextId = () => `x${++seq}`;
  for (const w of seededShuffle(candidates, `${seed}|vocab`)) {
    if (vocab.length >= c.vocab) break;
    const word = toRoundWord(w, false);
    const r = makeRound(vocab.length % 2 === 0 ? "translate" : "typing", word, pool, nextId, "strong") ?? makeRound("typing", word, pool, nextId, "strong");
    if (r) vocab.push(r);
  }

  // Dilbilgisi: seviyenin tablo hücreleri, kardeşleri çeldirici.
  const grammar: GrammarItem[] = seededShuffle(
    CHEAT_ITEMS.filter((it) => it.level === level && it.siblings.length >= 3 && !it.speak),
    `${seed}|grammar`,
  )
    .slice(0, c.grammar)
    .map((it) => {
      const options = seededShuffle([it.answer, ...seededShuffle(it.siblings.filter((s) => s !== it.answer), `${seed}|${it.id}`).slice(0, 3)], `${seed}|opt|${it.id}`);
      return { id: `g:${it.id}`, sheet: it.sheetTitle, key: it.key, label: it.label, options, answer: options.indexOf(it.answer) };
    });

  // Okuma / dinleme: seviyede kullanılmamış egzersizler önce.
  const done = new Set((await db.select({ id: userSkills.exerciseId }).from(userSkills).where(eq(userSkills.userId, userId))).map((r) => r.id));
  const bank = BUNDLED_EXERCISES.filter((e) => (e.course ?? "de") === (course === "gsw-zh" ? "gsw-zh" : "de") && e.level === level);
  const pickTexts = (skill: "reading" | "listening"): TextItem[] => {
    const list = bank.filter((e) => e.skill === skill);
    const ordered = [...seededShuffle(list.filter((e) => !done.has(e.id)), `${seed}|${skill}`), ...seededShuffle(list.filter((e) => done.has(e.id)), `${seed}|${skill}|used`)];
    return ordered.slice(0, c.text).map((ex) => ({
      id: `${skill[0]}:${ex.id}`,
      title: ex.title,
      text: ex.skill === "reading" ? ex.text : undefined,
      segments: ex.skill === "listening" ? ex.segments.slice(0, 3).map((s) => ({ speaker: s.speaker, text: s.text })) : undefined,
      questions: ("questions" in ex ? ex.questions : []).slice(0, 3).map((q) => ({ text: q.text, options: q.options, answer: q.answer })),
    }));
  };
  const reading = pickTexts("reading");
  const listening = pickTexts("listening");

  // Yazma: seviyeden bir serbest görev (AI değerlendirmesi; sağlayıcı yoksa bölüm yok).
  const writing: WritingItem[] = [];
  if (chatConfigured()) {
    const tasks = bank
      .filter((e) => e.skill === "writing")
      .flatMap((e) => (e.skill === "writing" ? e.tasks.filter((t): t is Extract<WritingTask, { kind: "free" }> => t.kind === "free").map((t, i) => ({ id: `w:${e.id}:${i}`, task: t })) : []));
    writing.push(...seededShuffle(tasks, `${seed}|writing`).slice(0, c.writing));
  }

  return { kind, level, module, trial, seconds: kind === "module" ? MODULE_SECONDS : LEVEL_SECONDS, sections: { vocab, grammar, reading, listening, writing }, seed };
}

export type SectionScore = { id: ExamSectionId; correct: number; total: number; pct: number };

export type ExamSubmission = {
  /** Bölüm başına doğru/toplam — nesnel bölümler istemcide sayılır, sunucu sınırlar. */
  sections: { id: ExamSectionId; correct: number; total: number }[];
  /** Kelime bölümünün cevapları — SRS'e ve hata tipine yazılır. */
  vocabAnswers?: { wordId: number; game: string; correct: boolean; quality?: number; errorType?: string; detail?: string }[];
  /** Yazma bölümü rubrik puanı (0–100) — `/api/assess` sonucundan. */
  writingScore?: number | null;
  seconds: number;
};

export type ExamResult = {
  id: number;
  kind: ExamKind;
  level: CefrLevel;
  module: number | null;
  trial: boolean;
  sections: SectionScore[];
  total: number;
  passed: boolean;
  at: string;
};

export function scoreSections(sub: ExamSubmission): { sections: SectionScore[]; total: number; passed: boolean } {
  const sections: SectionScore[] = sub.sections
    .filter((s) => s.total > 0)
    .map((s) => {
      const correct = s.id === "writing" && typeof sub.writingScore === "number" ? Math.round((sub.writingScore / 100) * s.total * 100) / 100 : Math.max(0, Math.min(s.total, s.correct));
      return { id: s.id, correct, total: s.total, pct: Math.round((100 * correct) / s.total) };
    });
  const totalItems = sections.reduce((a, s) => a + s.total, 0);
  const totalCorrect = sections.reduce((a, s) => a + s.correct, 0);
  const total = totalItems ? Math.round((100 * totalCorrect) / totalItems) : 0;
  const passed = total >= PASS_TOTAL && sections.every((s) => s.pct >= PASS_SECTION);
  return { sections, total, passed };
}

export async function finishExam(userId: string, paper: Pick<ExamPaper, "kind" | "level" | "module" | "trial">, sub: ExamSubmission, day: string): Promise<ExamResult> {
  const { sections, total, passed } = scoreSections(sub);
  const key = examKindKey(paper.kind, paper.level, paper.module);
  const [row] = await db
    .insert(exams)
    .values({
      userId,
      kind: key,
      week: day,
      level: paper.level,
      score: total,
      correct: Math.round(sections.reduce((a, s) => a + s.correct, 0)),
      total: sections.reduce((a, s) => a + s.total, 0),
      answers: { sections, passed, trial: paper.trial, seconds: sub.seconds, vocab: sub.vocabAnswers ?? [] },
    })
    .onConflictDoUpdate({
      target: [exams.userId, exams.kind, exams.week],
      set: { score: total, correct: Math.round(sections.reduce((a, s) => a + s.correct, 0)), total: sections.reduce((a, s) => a + s.total, 0), answers: { sections, passed, trial: paper.trial, seconds: sub.seconds, vocab: sub.vocabAnswers ?? [] } },
    })
    .returning({ id: exams.id, at: exams.createdAt });
  await track(userId, "exam_finish", day, total, `${paper.kind}:${paper.level}`);
  return { id: row.id, kind: paper.kind, level: paper.level, module: paper.module, trial: paper.trial, sections, total, passed, at: row.at.toISOString() };
}

export async function examHistory(userId: string, limit = 10): Promise<ExamResult[]> {
  const rows = await db
    .select()
    .from(exams)
    .where(and(eq(exams.userId, userId), sql`${exams.kind} like 'module:%' or ${exams.kind} like 'level:%'`))
    .orderBy(desc(exams.createdAt))
    .limit(limit);
  return rows.map((r) => {
    const [kind, level, mod] = r.kind.split(":");
    const a = r.answers as { sections: SectionScore[]; passed: boolean; trial: boolean };
    return { id: r.id, kind: kind as ExamKind, level: level as CefrLevel, module: mod ? Number(mod) : null, trial: Boolean(a?.trial), sections: a?.sections ?? [], total: r.score, passed: Boolean(a?.passed), at: r.createdAt.toISOString() };
  });
}

export async function examById(userId: string, id: number): Promise<ExamResult | null> {
  const list = await examHistory(userId, 200);
  return list.find((e) => e.id === id) ?? null;
}
