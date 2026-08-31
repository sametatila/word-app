import { NextResponse } from "next/server";
import { clampDay } from "@/lib/award";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { ensureProfile, submitAnswers } from "@/lib/session";
import { buildExam, examHistory, finishExam, type ExamSubmission, type ExamSectionId } from "@/lib/exam";
import { moduleExamPlan } from "@/lib/lessons/module-exam";
import { track } from "@/lib/events";
import { cleanDetail, isErrorType } from "@/lib/errors";
import { GAME_LABELS, type Answer, type GameId } from "@/lib/types";
import type { CefrLevel } from "@/lib/skills/types";

export const dynamic = "force-dynamic";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
const SECTIONS = new Set<ExamSectionId>(["vocab", "grammar", "produce", "reading", "listening", "speaking", "writing"]);

/**
 * Sınav (WP-41 v3).
 *   GET                                  → geçmiş sınavlar
 *   GET ?level=A1&module=2               → kâğıdın KAPAĞI (kâğıdın kendisi değil)
 *   POST {action:"start", level, module?} → kâğıt
 *   POST {action:"finish", level, module?, trial, sections, vocabAnswers?, writingScore?, speakingScore?, seconds, day}
 *
 * Kapak ayrı bir uç, çünkü sınav başlamadan önce gösterilen şey (hangi
 * modül, ne ölçüyor, kaç dakika) kâğıdın kendisini üretmeyi gerektirmemeli:
 * kapağı görmek için soruları hazırlamak, vazgeçen kullanıcıya o haftanın
 * kâğıdını harcatırdı.
 */
export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const level = url.searchParams.get("level");
  const mod = url.searchParams.get("module");
  if (level && mod !== null) {
    const plan = moduleExamPlan(level, Number(mod));
    return NextResponse.json(
      { cover: plan ? { code: plan.code, titleDe: plan.titleDe, titleTr: plan.titleTr, focus: plan.focus } : null },
      { headers: { "cache-control": "private, max-age=3600" } },
    );
  }
  try {
    return NextResponse.json({ exams: await examHistory(userId) }, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[exam]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const level = body.level as CefrLevel;
  if (!LEVELS.includes(level)) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const module = typeof body.module === "number" && Number.isInteger(body.module) && body.module >= 0 && body.module <= 20 ? body.module : null;
  const day = clampDay(body.day);
  try {
    const profile = await ensureProfile(userId);
    if (body.action === "start") {
      const paper = await buildExam(userId, profile.course, level, module, day);
      await track(userId, "exam_start", day, 0, `${paper.kind}:${level}`);
      return NextResponse.json({ paper });
    }
    if (body.action === "finish") {
      const raw = Array.isArray(body.sections) ? (body.sections as Record<string, unknown>[]) : [];
      const sections = raw
        .filter((s) => SECTIONS.has(s.id as ExamSectionId) && typeof s.total === "number" && typeof s.correct === "number")
        .map((s) => ({ id: s.id as ExamSectionId, correct: Math.max(0, Math.round(s.correct as number)), total: Math.max(0, Math.min(60, Math.round(s.total as number))) }));
      if (!sections.length) return NextResponse.json({ error: "bad_request" }, { status: 400 });
      const vocabAnswers: Answer[] = [];
      for (const a of (Array.isArray(body.vocabAnswers) ? body.vocabAnswers : []) as Record<string, unknown>[]) {
        if (typeof a.wordId !== "number" || typeof a.game !== "string" || !(a.game in GAME_LABELS) || typeof a.correct !== "boolean") continue;
        vocabAnswers.push({
          wordId: a.wordId,
          game: a.game as GameId,
          correct: a.correct,
          latencyMs: typeof a.latencyMs === "number" ? Math.max(0, Math.round(a.latencyMs)) : 0,
          quality: typeof a.quality === "number" ? a.quality : undefined,
          errorType: a.correct === false && isErrorType(a.errorType) ? a.errorType : undefined,
          detail: a.correct === false ? (cleanDetail(a.detail) ?? undefined) : undefined,
        });
      }
      const sub: ExamSubmission = {
        sections,
        vocabAnswers,
        writingScore: typeof body.writingScore === "number" ? Math.max(0, Math.min(100, body.writingScore)) : null,
speakingScore: typeof body.speakingScore === "number" ? Math.max(0, Math.min(100, body.speakingScore)) : null,
        seconds: typeof body.seconds === "number" ? Math.max(0, Math.min(3 * 3600, Math.round(body.seconds))) : 0,
      };
      // Kelime cevapları SRS'e: sınav da bir tekrar (hatalar tipleriyle).
      if (vocabAnswers.length) await submitAnswers(userId, vocabAnswers, day, Math.min(sub.seconds, 3600));
      const result = await finishExam(userId, { kind: module === null ? "level" : "module", level, module, trial: body.trial === true }, sub, day);
      return NextResponse.json(result);
    }
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  } catch (err) {
    console.error("[exam]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
