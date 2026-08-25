import "server-only";
import { and, eq, gte, isNotNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { assessments, exams, userSkills } from "@/lib/db/schema";
import { listExerciseMeta } from "@/lib/skills";
import { nextLesson } from "@/lib/lessons/progress";
import type { CefrLevel, SkillId } from "@/lib/skills/types";
import { computeProficiency, DECAY_DAYS, PROFICIENCY_LABELS, weakestSkill, type Evidence, type Proficiency, type ProficiencySkill } from "@/lib/proficiency";
import type { Assessment } from "@/lib/assess-prompts";

/**
 * Yetkinlik kanıtlarını toplar (WP-50, adım 2) ve "sıradaki en iyi adım"ı
 * önerir (adım 4). Kaynaklar:
 *   exercise   — `user_skills.last_score` (beceri, seviye, son deneme)
 *   assessment — `assessments.result.score.overall` (writing → yazma,
 *                sentence → dilbilgisi, speaking/roleplay → konuşma)
 *   exam       — `exams` (weekly → kelime, seviye = sınav seviyesi)
 * Yerleştirme (placements) kanıta girmiyor: puanı beceri başına değil, seviye
 * tahmini; ayrı gösteriliyor (profil kartı).
 */

const LEVELS = new Set(["A1", "A2", "B1", "B2", "C1"]);

export async function gatherEvidence(userId: string, now = new Date()): Promise<Evidence[]> {
  const since = new Date(now.getTime() - DECAY_DAYS * 86400000);
  const out: Evidence[] = [];

  const skills = await db
    .select({ skill: userSkills.skill, level: userSkills.level, lastScore: userSkills.lastScore, lastAt: userSkills.lastAt })
    .from(userSkills)
    .where(and(eq(userSkills.userId, userId), gte(userSkills.lastAt, since), isNotNull(userSkills.lastScore)));
  for (const r of skills) {
    if (!r.skill || !r.level || !LEVELS.has(r.level) || r.lastScore === null) continue;
    out.push({ skill: r.skill as SkillId, level: r.level as CefrLevel, score: r.lastScore, source: "exercise", at: r.lastAt });
  }

  const ai = await db
    .select({ kind: assessments.kind, level: assessments.level, result: assessments.result, createdAt: assessments.createdAt })
    .from(assessments)
    .where(and(eq(assessments.userId, userId), gte(assessments.createdAt, since), isNotNull(assessments.result)));
  for (const r of ai) {
    const score = (r.result as Assessment | null)?.score?.overall;
    if (typeof score !== "number" || !LEVELS.has(r.level)) continue;
    const skill: ProficiencySkill = r.kind === "writing" ? "writing" : r.kind === "sentence" ? "grammar" : "speaking";
    out.push({ skill, level: r.level as CefrLevel, score, source: "assessment", at: r.createdAt });
  }

  const ex = await db
    .select({ kind: exams.kind, level: exams.level, score: exams.score, createdAt: exams.createdAt })
    .from(exams)
    .where(and(eq(exams.userId, userId), gte(exams.createdAt, since)));
  for (const r of ex) {
    if (!LEVELS.has(r.level)) continue;
    out.push({ skill: r.kind === "weekly" ? "vocab" : "grammar", level: r.level as CefrLevel, score: r.score, source: "exam", at: r.createdAt });
  }
  return out;
}

export type NextStep = {
  skill: ProficiencySkill;
  label: string;
  /** Neden bu: "kelime B1 ölçülmedi" / "dinleme A2 47 — gelişiyor". */
  reason: string;
  href: string;
  title: string;
  minutes: number;
};

/**
 * En düşük kanıtlı beceri × mevcut seviye → o beceriden yapılmamış bir
 * egzersiz; beceri egzersizi olmayan beceriler (kelime, dilbilgisi) için
 * kelime turu / dilbilgisi çalışması; hiçbiri yoksa sıradaki ders.
 */
export async function nextStep(userId: string, course: string, level: CefrLevel, prof: Proficiency): Promise<NextStep | null> {
  const metas = (await listExerciseMeta(course)).filter((m) => m.level === level);
  const done = new Set(
    (await db.select({ exerciseId: userSkills.exerciseId }).from(userSkills).where(eq(userSkills.userId, userId))).map((r) => r.exerciseId),
  );
  const order = [...PROFICIENCY_SKILLSORDERED].sort((a, b) => (prof[a]?.[level]?.score ?? -1) - (prof[b]?.[level]?.score ?? -1));
  for (const skill of order) {
    const cell = prof[skill]?.[level];
    const reason = cell ? `${PROFICIENCY_LABELS[skill]} ${level} ${cell.score} — ${cell.band}` : `${PROFICIENCY_LABELS[skill]} ${level} henüz ölçülmedi`;
    if (skill === "vocab") return { skill, label: PROFICIENCY_LABELS[skill], reason, href: "/learn", title: "Kelime turu", minutes: 6 };
    if (skill === "grammar") return { skill, label: PROFICIENCY_LABELS[skill], reason, href: "/cheatsheet", title: "Dilbilgisi çalışması", minutes: 5 };
    const open = metas.find((m) => m.skill === skill && !done.has(m.id));
    if (open) return { skill, label: PROFICIENCY_LABELS[skill], reason, href: `/skills/${open.id}`, title: open.title, minutes: open.minutes };
  }
  const lesson = await nextLesson(userId, course, level);
  if (lesson) return { skill: "speaking", label: "Ders", reason: "sıradaki ders", href: `/lessons/${lesson.lesson.id}`, title: lesson.lesson.title, minutes: lesson.lesson.minutes };
  return null;
}

/** Öneri sırası: dört beceri önce; kelime ve dilbilgisi zaten günlük turda çalışılıyor, en sona. */
const PROFICIENCY_SKILLSORDERED: ProficiencySkill[] = ["reading", "listening", "writing", "speaking", "grammar", "vocab"];

export async function proficiencyFor(userId: string, course: string, level: CefrLevel) {
  const evidence = await gatherEvidence(userId);
  const prof = computeProficiency(evidence);
  const next = await nextStep(userId, course, level, prof);
  return { proficiency: prof, next, evidenceCount: evidence.length, weakest: weakestSkill(prof, level) };
}
