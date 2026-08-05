import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { findLesson } from "@/lib/lessons";
import { recordLesson } from "@/lib/lessons/progress";

export const dynamic = "force-dynamic";

/**
 * Ders sonucunun kaydı.
 *
 * Sonuç sunucuda tutuluyor: hangi dersi bitirdiğin ve kuralın ne zaman
 * tekrarlanacağı hesaba ait, cihaza değil — telefonda bitirilen ders
 * bilgisayarda da bitmiş sayılmalı.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const { lessonId, correct, roleplayDone } = body as Record<string, unknown>;

  const lesson = typeof lessonId === "string" ? findLesson(lessonId) : undefined;
  if (!lesson) return NextResponse.json({ error: "bad_lesson" }, { status: 400 });
  if (typeof correct !== "number" || correct < 0 || correct > lesson.checks.length) {
    return NextResponse.json({ error: "bad_score" }, { status: 400 });
  }

  try {
    const result = await recordLesson(userId, lesson, Math.floor(correct), roleplayDone === true);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[lesson]", err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}
