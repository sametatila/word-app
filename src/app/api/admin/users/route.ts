import { NextResponse } from "next/server";
import { adminGate, adminWriteGate, logAdminAction, type AdminWriter } from "@/lib/admin";
import { sameOrigin } from "@/lib/auth/origin";
import { adminDeleteUser } from "@/lib/account/admin-delete";
import { liftSuspension, suspendUser } from "@/lib/account/suspension";

export const dynamic = "force-dynamic";

/** Silme gerekçesi kategorileri — kayıtta serbest metin değil, sınıf tutuluyor. */
const DELETE_REASONS = ["user_request", "spam", "abuse", "duplicate", "test", "other"];

/**
 * Hesap işlemleri — kullanıcı detay sayfasının yazma ucu: askıya al, askıyı
 * kaldır, hesabı sil. Aynı iki kapı (köken + yetki). Silme için istemci
 * kimliği İKİ KEZ gönderiyor (`userId` ve `confirm`): yanlış satırda basılan
 * düğmeye karşı ikinci anahtar.
 */
/**
 * YAZMA KAPISI VE İŞLEM KAYDI (lib/admin `adminWriteGate`, `logAdminAction`).
 * Eylemin seviyesi gövdeden okunuyor: "read" yalnız admin olmayı, "normal"
 * ayrıca hesapta iki adımlı doğrulamayı, "sensitive" bunlara ek olarak son
 * 12 saatte açılmış oturumu istiyor. Başarılı her yazma kayda düşüyor.
 */
const levelOf: (action: string, body: Record<string, unknown>) => "read" | "normal" | "sensitive" = () => "sensitive";

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
    const target = [peek.userId, peek.refId, peek.doc, peek.id, peek.code].find((v) => typeof v === "string" || typeof v === "number");
    void logAdminAction(writer, `users.${action || "save"}`, target == null ? null : String(target), {
      ...(peek.locale ? { locale: peek.locale } : {}),
      ...(peek.days ? { days: peek.days } : {}),
      ...(peek.reason ? { reason: String(peek.reason).slice(0, 120) } : {}),
      ...(peek.note ? { note: String(peek.note).slice(0, 120) } : {}),
      ...(peek.audience ? { audience: peek.audience } : {}),
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
  const userId = typeof body.userId === "string" ? body.userId.slice(0, 64) : "";
  if (!userId) return NextResponse.json({ error: "bad_input" }, { status: 400 });

  try {
    switch (String(body.action ?? "")) {
      case "suspend": {
        const reason = typeof body.reason === "string" ? body.reason.trim() : "";
        const days = body.days == null || body.days === "" ? null : Number(body.days);
        if (!reason || (days !== null && (!Number.isInteger(days) || days <= 0 || days > 3650))) {
          return NextResponse.json({ error: "bad_input" }, { status: 400 });
        }
        await suspendUser(userId, reason, days, gate.email);
        return NextResponse.json({ ok: true });
      }
      case "lift":
        await liftSuspension(userId, gate.email);
        return NextResponse.json({ ok: true });
      case "delete": {
        const reason = String(body.reason ?? "");
        if (body.confirm !== userId || !DELETE_REASONS.includes(reason)) {
          return NextResponse.json({ error: "bad_input" }, { status: 400 });
        }
        const r = await adminDeleteUser(userId, gate.email, reason);
        if (r === "not_found") return NextResponse.json({ error: "not_found" }, { status: 404 });
        return NextResponse.json({ ok: true });
      }
      default:
        return NextResponse.json({ error: "unknown_action" }, { status: 400 });
    }
  } catch (err) {
    console.error("[admin/users]", body.action, userId, err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
