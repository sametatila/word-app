import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { queueAssessment } from "@/lib/assess";
import { ASSESS_KINDS, ASSESS_LEVELS, ASSESS_MAX_CHARS, type AssessKind, type AssessLevel } from "@/lib/assess-prompts";

export const dynamic = "force-dynamic";

/**
 * Değerlendirme kuyruğu (WP-30): sağlayıcı kapalıyken yazılan metin burada
 * saklanır, `/api/cron/assess` servis dönünce puanlar. Gövde `/api/assess`
 * ile aynı; cevap `{ queued, id }`.
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
  if (typeof body !== "object" || body === null) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const b = body as Record<string, unknown>;
  const answer = (b.answer ?? {}) as Record<string, unknown>;
  const text = typeof answer.text === "string" ? answer.text.trim().slice(0, ASSESS_MAX_CHARS) : "";
  if (!text || !ASSESS_KINDS.includes(b.kind as AssessKind) || !ASSESS_LEVELS.includes(b.level as AssessLevel)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const day = typeof b.day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(b.day) ? b.day : new Date().toISOString().slice(0, 10);
  try {
    const out = await queueAssessment(
      userId,
      {
        kind: b.kind as AssessKind,
        level: b.level as AssessLevel,
        task: { prompt: typeof (b.task as Record<string, unknown>)?.prompt === "string" ? String((b.task as Record<string, unknown>).prompt).slice(0, 600) : "" },
        answer: { text },
        exerciseId: typeof b.exerciseId === "string" ? b.exerciseId.slice(0, 40) : undefined,
        locale: "tr",
      },
      day,
    );
    return NextResponse.json(out);
  } catch (err) {
    console.error("[assess/queue]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
