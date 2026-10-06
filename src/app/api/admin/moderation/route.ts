import { NextResponse } from "next/server";
import { adminGate, adminWriteGate, logAdminAction, type AdminWriter } from "@/lib/admin";
import { sameOrigin } from "@/lib/auth/origin";
import {
  closeContentGroup,
  closeReport,
  disableContentGroup,
  isGroupKey,
  resetReportedName,
  type ModerationDecision,
  type ModerationTarget,
} from "@/lib/moderation-admin";
import { assignToClaude, cancelClaudeTask, isClaudeQueue } from "@/lib/claude-tasks";
import { cancelReleaseHold, holdForRelease, isHoldQueue } from "@/lib/release-holds";

export const dynamic = "force-dynamic";

const TARGETS: ModerationTarget[] = ["content_report", "user_report"];
const DECISIONS: ModerationDecision[] = ["resolved", "dismissed"];

/**
 * Şikâyet kapatma — moderasyon sayfasının tek yazma ucu.
 *
 * Premium ucuyla aynı iki kapı, aynı sırada: önce aynı-köken, sonra yetki.
 * Karar `moderation_actions`'a admin e-postasıyla yazılıyor.
 */
/**
 * YAZMA KAPISI VE İŞLEM KAYDI (lib/admin `adminWriteGate`, `logAdminAction`).
 * Eylemin seviyesi gövdeden okunuyor: "read" yalnız admin olmayı, "normal"
 * ayrıca hesapta iki adımlı doğrulamayı, "sensitive" bunlara ek olarak son
 * 12 saatte açılmış oturumu istiyor. Başarılı her yazma kayda düşüyor.
 */
const levelOf: (action: string, body: Record<string, unknown>) => "read" | "normal" | "sensitive" = (a) => (a === "reset_name" ? "sensitive" : "normal");

export async function POST(req: Request) {
  const peek = ((await req.clone().json().catch(() => ({}))) ?? {}) as Record<string, unknown>;
  const action = String(peek.action ?? "");
  const level = levelOf(action, peek);
  let email: string;
  let writer: AdminWriter | null = null;
  if (level === "read") {
    if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
    const g = await adminGate();
    if (!g.ok || !g.email) return NextResponse.json({ error: "forbidden" }, { status: 403 });
    email = g.email;
  } else {
    const g = await adminWriteGate(req, level);
    if (!g.ok) return g.response;
    writer = g.admin;
    email = g.admin.email;
  }
  const res = await handle(req, { ok: true, email });
  if (writer && res.status < 400) {
    const target = [peek.userId, peek.refId, peek.group, peek.ref, peek.doc, peek.id, peek.code].find((v) => typeof v === "string" || typeof v === "number");
    void logAdminAction(writer, `moderation.${action || "save"}`, target == null ? null : String(target), {
      ...(peek.locale ? { locale: peek.locale } : {}),
      ...(peek.days ? { days: peek.days } : {}),
      ...(peek.reason ? { reason: String(peek.reason).slice(0, 120) } : {}),
      ...(peek.note ? { note: String(peek.note).slice(0, 120) } : {}),
      ...(peek.audience ? { audience: peek.audience } : {}),
      ...(peek.decision ? { decision: String(peek.decision).slice(0, 20) } : {}),
    });
  }
  return res;
}

async function handle(req: Request, gate: { ok: true; email: string }): Promise<NextResponse> {

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

  /* CLAUDE'A BIRAK / GERİ AL (2026-10-06): bildirim kapanmıyor, beklemeye alınıyor
     (`lib/claude-tasks`). `ref`: içerikte grup anahtarı, şikâyetlerde bildirim kimliği. */
  if (body.action === "claude_assign" || body.action === "claude_cancel") {
    const queue = body.queue;
    const ref = typeof body.ref === "string" || typeof body.ref === "number" ? String(body.ref) : "";
    if (!isClaudeQueue(queue) || !ref || ref.length > 300 || (queue === "content_feedback" ? !isGroupKey(ref) : !/^\d+$/.test(ref))) {
      return NextResponse.json({ error: "bad_input" }, { status: 400 });
    }
    try {
      if (body.action === "claude_cancel") return NextResponse.json({ ok: await cancelClaudeTask(queue, ref) });
      const task = await assignToClaude(queue, ref, note, gate.email);
      return NextResponse.json({ ok: true, task });
    } catch (err) {
      console.error("[admin/moderation]", body.action, queue, ref, err);
      return NextResponse.json({ error: "failed" }, { status: 500 });
    }
  }

  /* SONRAKİ SÜRÜMDE DÜZELECEK / GERİ AL (2026-10-06, `lib/release-holds`): her
     bildiren uygulaması `build`e geçince ayrı kapanır ve sonucu alır. */
  if (body.action === "release_hold" || body.action === "release_cancel") {
    const queue = body.queue;
    const ref = typeof body.ref === "string" || typeof body.ref === "number" ? String(body.ref) : "";
    if (!isHoldQueue(queue) || !ref || ref.length > 300 || (queue === "content_feedback" ? !isGroupKey(ref) : !/^\d+$/.test(ref))) {
      return NextResponse.json({ error: "bad_input" }, { status: 400 });
    }
    try {
      if (body.action === "release_cancel") return NextResponse.json({ ok: await cancelReleaseHold(queue, ref) });
      const build = Number(body.build);
      if (!Number.isInteger(build) || build < 1 || build > 1_000_000) return NextResponse.json({ error: "bad_input" }, { status: 400 });
      const r = await holdForRelease(queue, ref, build, note, gate.email);
      return NextResponse.json({ ok: true, ...r });
    } catch (err) {
      console.error("[admin/moderation]", body.action, queue, ref, err);
      return NextResponse.json({ error: "failed" }, { status: 500 });
    }
  }

  /* İÇERİK GERİ BİLDİRİMİ GRUBU (/admin/moderation/content): grubun bütün açık
     bildirimleri tek kararla kapanıyor; "İçeriği kapat" maddeyi de yayından
     kaldırıyor (`content_flags`, sebep `reported`). */
  if (body.action === "close_group" || body.action === "disable_content") {
    const group = body.group;
    if (!isGroupKey(group)) return NextResponse.json({ error: "bad_input" }, { status: 400 });
    try {
      if (body.action === "disable_content") {
        const r = await disableContentGroup(group, gate.email, note);
        if (r === "not_found") return NextResponse.json({ error: "not_found" }, { status: 404 });
        if (r === "no_target") return NextResponse.json({ error: "no_target" }, { status: 409 });
        return NextResponse.json({ ok: true });
      }
      const decision = String(body.decision ?? "") as ModerationDecision;
      if (!DECISIONS.includes(decision)) return NextResponse.json({ error: "bad_input" }, { status: 400 });
      const r = await closeContentGroup(group, decision, gate.email, note);
      return NextResponse.json({ ok: true, ...r });
    } catch (err) {
      console.error("[admin/moderation]", body.action, group, err);
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
