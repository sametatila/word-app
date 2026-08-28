import "server-only";
import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { exams, userLessons, userSkills, words } from "@/lib/db/schema";
import { chatConfigured, sttProviders } from "@/lib/chat-providers";
import { track } from "@/lib/events";
import { LESSONS, levelIndex } from "@/lib/lessons";
import { MODULE_SIZE } from "@/lib/lessons/modules";
import {
  moduleContent,
  moduleSheets,
  selfAnswering,
  type ProduceItem as LessonProduceItem,
} from "@/lib/lessons/module-content";
import { moduleExamPlan, type ExamCando, type ModuleExamPlan } from "@/lib/lessons/module-exam";
import { makeRound, toRoundWord, weekStart } from "@/lib/session";
import { seededShuffle } from "@/lib/shuffle";
import { BUNDLED_EXERCISES } from "@/lib/skills/bundled";
import {
  scoreSections,
  LEVEL_SECONDS,
  MODULE_PREREQ,
  MODULE_SECONDS,
  type ExamCover,
  type ExamKind,
  type ExamPaper,
  type ExamResult,
  type ExamSubmission,
  type GrammarItem,
  type ProduceExamItem,
  type SectionScore,
  type SpeakingItem,
  type TextItem,
  type WritingItem,
} from "@/lib/exam-types";
import type { CefrLevel, WritingTask, SpeechConfusion } from "@/lib/skills/types";
import type { Round } from "@/lib/types";

/**
 * Modül ve seviye sınavı (plan WP-41, v3).
 *
 * **Neyi ölçüyor.** Dersler konuşma üzerine kurulu: her ders bir kalıp
 * öğretiyor, Türkçe bir cümleyi Almanca kurduruyor, bozuk bir cümle hakkında
 * hüküm verdiriyor ve sonunda rol yaptırıyor. Sınav uzun süre bunun hiçbirini
 * ölçmüyordu — modülden yalnızca KELİME listesi alınıyor, geri kalan bölümler
 * (dilbilgisi, okuma, dinleme, yazma) SEVİYE havuzundan çekiliyordu. Sonuç:
 * "A1 Modül 3 · Yeme-içme" sınavında tren garı metni ve Perfekt sorusu.
 *
 * v3'te modül sınavının her bölümü modülün kendisinden geliyor:
 *
 *   Bölüm        madde  ağırlık  kaynak
 *   Wortschatz     6      %12    modülün kelimeleri → çeviri / yazma
 *   Grammatik      6      %18    modülün odak tabloları + derslerin hüküm cümleleri
 *   Satzbau        5      %25    derslerin ÜRETİM adımları (Türkçe → Almanca)
 *   Lesen          2      %8     modül temalı yazılı metin (elle yazılı)
 *   Hören          3      %12    modül sahnesinde geçen diyalog (elle yazılı)
 *   Sprechen       2      %15    modülün durumunda söylenecek cümleler
 *   Schreiben      1      %10    modül temalı görev → AI rubriği
 *
 * **Ağırlık neden var.** Eskiden puan madde sayısına göre hesaplanıyordu ve
 * yazma bölümü 24 maddenin 1'iydi: yani kâğıdın %4'ü. Konuşma tabanlı bir
 * kursta üretim bölümlerinin toplam ağırlığı %50 olmalı — `SECTION_WEIGHT`
 * bunu söylüyor, madde sayısı değil.
 *
 * **Geçme:** toplam ≥ %70 ve hiçbir bölüm < %50. Ön koşul: modül derslerinin
 * ≥ %80'i geçilmiş; değilse sınav "deneme" (sayılmaz, sertifika yok).
 *
 * Maddeler tohumlu: aynı kullanıcı, aynı sınav, aynı hafta → aynı kâğıt.
 */

export type {
  ExamKind,
  ExamSectionId,
  GrammarItem,
  ProduceExamItem,
  TextItem,
  WritingItem,
  SpeakingItem,
  ExamCover,
  ExamPaper,
  SectionScore,
  ExamSubmission,
  ExamResult,
} from "@/lib/exam-types";
export {
  SECTION_ORDER,
  SECTION_TITLE,
  SECTION_TITLE_DE,
  SECTION_WEIGHT,
  MODULE_SECONDS,
  LEVEL_SECONDS,
  PASS_TOTAL,
  PASS_SECTION,
  MODULE_PREREQ,
  scoreSections,
} from "@/lib/exam-types";


const COUNTS: Record<ExamKind, { vocab: number; grammar: number; produce: number; text: number; speaking: number; writing: number }> = {
  module: { vocab: 6, grammar: 6, produce: 5, text: 1, speaking: 2, writing: 1 },
  level: { vocab: 12, grammar: 12, produce: 6, text: 2, speaking: 3, writing: 1 },
};

/** Dilbilgisi hücresinin cevabı bu uzunluğu aşarsa madde değil örnektir. */

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

/**
 * Çeldirici havuzu: cevaptan farklı, birbirinden de farklı kardeşler.
 *
 * Tablonun aynı sütununda aynı biçim birden çok satırda geçiyor (çekim
 * tablosunda "ich soll" ile "er soll" aynı hücreyi taşır). Kardeş listesi
 * ham hâliyle kullanılınca aynı şık iki kez basılıyor ve soru kendini ele
 * veriyordu — iki özdeş şıkkın ikisi de doğru olamaz.
 */

/** Üretim adımlarından sınav maddesi: bir kısmı yazma, bir kısmı dizme. */
function produceItems(source: LessonProduceItem[], seed: string, count: number): ProduceExamItem[] {
  const usable = source.filter((p) => !selfAnswering(p) && p.de.trim().split(/\s+/).length >= 2);
  const picked = seededShuffle(usable, `${seed}|produce`).slice(0, count);
  return picked.map((p, i) => {
    const words = p.de.trim().split(/\s+/);
    // Maddelerin yarısı dizme: yazma cümlenin tamamını (kelime + biçim +
    // sıra), dizme yalnız SIRAYI sınar. İkisi bir arada olunca kelimeyi
    // bilip sırayı bilmeyen öğrenci ile ikisini de bilmeyen öğrenci
    // ayrışıyor; ayrıca beş maddenin beşi de boş satır olsaydı bölüm A1'de
    // ölçmekten çok yıldırırdı.
    const order = i % 2 === 1 && words.length >= 4 && words.length <= 10;
    return {
      id: `p:${p.id}`,
      prompt: p.prompt,
      de: p.de,
      accept: p.accept,
      mode: order ? "order" : "type",
      ...(order ? { chunks: seededShuffle(words, `${seed}|chunks|${p.id}`) } : {}),
    };
  });
}

/**
 * Şıkları karıştırır ve doğru dizini yeniden hesaplar.
 *
 * Elle yazılan sorularda doğru şık farkında olmadan hep aynı sıraya
 * düşebiliyor (yazarken "doğru cevabı ikinci sıraya koyma" alışkanlığı).
 * Sınavda bu, soruyu okumadan cevaplanabilir hâle getirir. Karıştırma
 * tohumlu: aynı kâğıt aynı hafta aynı sırayı gösteriyor, ama iki kullanıcının
 * kâğıdı aynı değil.
 */
function shuffleQuestion(q: { text: string; textTr?: string; options: string[]; answer: number }, seed: string) {
  const right = q.options[q.answer];
  const options = seededShuffle(q.options, seed);
  return { ...q, options, answer: options.indexOf(right) };
}

/** Elle yazılmış modül diyaloğundan dinleme maddesi. */
function planListening(plan: ModuleExamPlan, count: number, seed: string): TextItem[] {
  return [
    {
      id: `l:${plan.code}`,
      title: plan.listening.title,
      titleTr: plan.listening.titleTr,
      situation: plan.listening.situation,
      segments: plan.listening.turns.map((t) => ({ speaker: t.speaker, text: t.de, tr: t.tr })),
      questions: plan.listening.questions.slice(0, count).map((q, i) => shuffleQuestion({ text: q.de, textTr: q.tr, options: q.options, answer: q.answer }, `${seed}|hoeren|${i}`)),
    },
  ];
}

function planReading(plan: ModuleExamPlan, count: number, seed: string): TextItem[] {
  return [
    {
      id: `r:${plan.code}`,
      title: plan.reading.title,
      titleTr: plan.reading.titleTr,
      genre: plan.reading.genre,
      text: plan.reading.text,
      questions: plan.reading.questions.slice(0, count).map((q, i) => shuffleQuestion({ text: q.de, textTr: q.tr, options: q.options, answer: q.answer }, `${seed}|lesen|${i}`)),
    },
  ];
}

export async function buildExam(userId: string, course: string, level: CefrLevel, module: number | null, today: string): Promise<ExamPaper> {
  const kind: ExamKind = module === null ? "level" : "module";
  const seed = `${userId}|${examKindKey(kind, level, module)}|${weekStart(today)}`;
  const c = COUNTS[kind];
  const trial = kind === "module" ? !(await modulePrereq(userId, course, level, module!)) : false;
  const plan = kind === "module" ? moduleExamPlan(level, module!) : undefined;
  const content = kind === "module" ? moduleContent(course, level, module!) : null;

  // Kelime: modül kelimeleri (ders başlıkları) ya da seviyenin sık kelimeleri.
  const pool = await db
    .select()
    .from(words)
    .where(and(eq(words.course, course), eq(words.niveau, level)))
    .orderBy(asc(sql`coalesce(${words.rank}, 999999)`), asc(words.id))
    .limit(400);
  let candidates = pool;
  if (content) {
    const heads = new Set(content.words.map((w) => w.head));
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

  // Dilbilgisi kaldırıldı (2026-08): cheatsheet gitti, immersion'da yeniden.
  const grammar: GrammarItem[] = [];

  // Cümle kurma: derslerin üretim adımları. Seviye sınavında seviyenin bütün
  // modülleri havuz.
  const produceSource: LessonProduceItem[] = content
    ? content.produce
    : LESSONS.filter((l) => l.course === course && l.level === level).length
      ? Array.from({ length: Math.ceil(LESSONS.filter((l) => l.course === course && l.level === level).length / MODULE_SIZE) }).flatMap((_, i) => moduleContent(course, level, i).produce)
      : [];
  const produce = produceItems(produceSource, seed, c.produce);

  // Okuma / dinleme: modülde elle yazılmış metin, seviyede beceri bankası.
  const done = new Set((await db.select({ id: userSkills.exerciseId }).from(userSkills).where(eq(userSkills.userId, userId))).map((r) => r.id));
  const bank = BUNDLED_EXERCISES.filter((e) => (e.course ?? "de") === (course === "gsw-zh" ? "gsw-zh" : "de") && e.level === level);
  const pickTexts = (skill: "reading" | "listening"): TextItem[] => {
    const list = bank.filter((e) => e.skill === skill);
    const ordered = [...seededShuffle(list.filter((e) => !done.has(e.id)), `${seed}|${skill}`), ...seededShuffle(list.filter((e) => done.has(e.id)), `${seed}|${skill}|used`)];
    return ordered.slice(0, c.text).map((ex) => ({
      id: `${skill[0]}:${ex.id}`,
      title: ex.title,
      genre: ex.genre,
      text: ex.skill === "reading" ? ex.text : undefined,
      segments: ex.skill === "listening" ? ex.segments.slice(0, 3).map((s) => ({ speaker: s.speaker, text: s.text })) : undefined,
      questions: ("questions" in ex ? ex.questions : []).slice(0, 3).map((q, i) => shuffleQuestion({ text: q.text, options: q.options, answer: q.answer }, `${seed}|${skill}|${ex.id}|${i}`)),
    }));
  };
  const reading = plan ? planReading(plan, 2, seed) : pickTexts("reading");
  const listening = plan ? planListening(plan, 3, seed) : pickTexts("listening");

  // Yazma: modülün kendi görevi; seviyede bankadan serbest görev. Sağlayıcı
  // yoksa bölüm kâğıtta hiç yok.
  const writing: WritingItem[] = [];
  if (chatConfigured()) {
    if (plan) {
      writing.push({ id: `w:${plan.code}`, task: { kind: "free", ...plan.writing } });
    } else {
      const tasks = bank
        .filter((e) => e.skill === "writing")
        .flatMap((e) => (e.skill === "writing" ? e.tasks.filter((t): t is Extract<WritingTask, { kind: "free" }> => t.kind === "free").map((t, i) => ({ id: `w:${e.id}:${i}`, task: t })) : []));
      writing.push(...seededShuffle(tasks, `${seed}|writing`).slice(0, c.writing));
    }
  }

  // Konuşma: modülün durumunda söylenecek cümleler; seviyede ses çalışması
  // cümleleri. STT yoksa bölüm kâğıda konmaz — ölçülemeyen bölüm sorulmaz.
  const speaking: SpeakingItem[] = [];
  if (sttProviders().length) {
    if (plan) {
      speaking.push(...plan.speaking.slice(0, c.speaking).map((s, i) => ({ id: `s:${plan.code}:${i}`, de: s.de, tr: s.tr, situation: s.situation })));
    } else {
      const drills = bank.filter((e) => e.skill === "speaking" && "tasks" in e && e.genre === "Ses çalışması");
      for (const ex of seededShuffle(drills, `${seed}|speaking`)) {
        if (speaking.length >= c.speaking) break;
        const tasks = (ex as { tasks: { de: string; tr: string; hint?: string; confusions?: SpeechConfusion[] }[] }).tasks.filter((t) => t.de && t.de.split(/\s+/).length >= 3);
        const t = seededShuffle(tasks, `${seed}|${ex.id}`)[0];
        if (t) speaking.push({ id: `s:${ex.id}`, de: t.de, tr: t.tr, hint: t.hint, confusions: t.confusions?.slice(0, 4) });
      }
    }
  }

  const cover: ExamCover | null = plan
    ? { code: plan.code, titleDe: plan.titleDe, titleTr: plan.titleTr, focus: plan.focus, canDo: plan.canDo }
    : null;

  return {
    kind,
    level,
    module,
    trial,
    seconds: kind === "module" ? MODULE_SECONDS : LEVEL_SECONDS,
    cover,
    sections: { vocab, grammar, produce, reading, listening, speaking, writing },
    seed,
  };
}

export async function finishExam(userId: string, paper: Pick<ExamPaper, "kind" | "level" | "module" | "trial">, sub: ExamSubmission, day: string): Promise<ExamResult> {
  const { sections, total, passed } = scoreSections(sub, paper.kind);
  const key = examKindKey(paper.kind, paper.level, paper.module);
  const answers = { sections, passed, trial: paper.trial, seconds: sub.seconds, vocab: sub.vocabAnswers ?? [] };
  const correct = Math.round(sections.reduce((a, s) => a + s.correct, 0));
  const items = sections.reduce((a, s) => a + s.total, 0);
  const [row] = await db
    .insert(exams)
    .values({ userId, kind: key, week: day, level: paper.level, score: total, correct, total: items, answers })
    .onConflictDoUpdate({
      target: [exams.userId, exams.kind, exams.week],
      set: { score: total, correct, total: items, answers },
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

/**
 * Geçilmiş modül sınavları: "A1:2" → en iyi toplam puan.
 *
 * Yol haritasındaki taç buradan okuyor. Deneme kayıtları sayılmıyor: modül
 * dersleri bitmeden girilen sınav bir kanıt değil, bir ön izleme.
 */
export async function passedModuleExams(userId: string): Promise<Map<string, number>> {
  const rows = await db
    .select({ kind: exams.kind, score: exams.score, answers: exams.answers })
    .from(exams)
    .where(and(eq(exams.userId, userId), sql`${exams.kind} like 'module:%'`));
  const out = new Map<string, number>();
  for (const r of rows) {
    const a = r.answers as { passed?: boolean; trial?: boolean } | null;
    if (!a?.passed || a.trial) continue;
    const [, level, mod] = r.kind.split(":");
    const key = `${level}:${Number(mod)}`;
    out.set(key, Math.max(out.get(key) ?? 0, r.score));
  }
  return out;
}

/** Sınavı geçilmiş modülün yapabilirlik satırları — sertifika ve profil için. */
export function examCando(level: string, module: number | null): ExamCando[] {
  if (module === null) return [];
  return moduleExamPlan(level, module)?.canDo ?? [];
}
