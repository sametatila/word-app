import { NextResponse } from "next/server";
import { adminGate } from "@/lib/admin";
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
