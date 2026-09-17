import { NextResponse } from "next/server";
import { adminGate } from "@/lib/admin";
import { sameOrigin } from "@/lib/auth/origin";
import { closeReport, resetReportedName, type ModerationDecision, type ModerationTarget } from "@/lib/moderation-admin";

export const dynamic = "force-dynamic";

const TARGETS: ModerationTarget[] = ["content_report", "user_report"];
const DECISIONS: ModerationDecision[] = ["resolved", "dismissed"];

/**
 * Şikâyet kapatma — moderasyon sayfasının tek yazma ucu.
 *
 * Premium ucuyla aynı iki kapı, aynı sırada: önce aynı-köken, sonra yetki.
 * Karar `moderation_actions`'a admin e-postasıyla yazılıyor.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const gate = await adminGate();
  if (!gate.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 500) || null : null;

  // Ad sıfırlama: kullanıcı şikâyetinin hedefindeki görünen ad + kullanıcı adı.
  if (body.action === "reset_name") {
    const refId = Number(body.refId);
    if (!Number.isInteger(refId) || refId <= 0) return NextResponse.json({ error: "bad_input" }, { status: 400 });
    try {
      const r = await resetReportedName(refId, gate.email, note);
      if (r === "not_ready") return NextResponse.json({ error: "not_ready" }, { status: 409 });
      if (r === "not_found") return NextResponse.json({ error: "not_found" }, { status: 404 });
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[admin/moderation] reset_name", refId, err);
      return NextResponse.json({ error: "failed" }, { status: 500 });
    }
  }

  const target = String(body.target ?? "") as ModerationTarget;
  const action = String(body.action ?? "") as ModerationDecision;
  const refId = Number(body.refId);
  if (!TARGETS.includes(target) || !DECISIONS.includes(action) || !Number.isInteger(refId) || refId <= 0) {
    return NextResponse.json({ error: "bad_input" }, { status: 400 });
  }

  try {
    const r = await closeReport(target, refId, action, gate.email, note);
    if (r === "not_ready") return NextResponse.json({ error: "not_ready" }, { status: 409 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/moderation]", target, refId, err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
