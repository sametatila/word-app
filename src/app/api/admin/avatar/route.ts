import { NextResponse } from "next/server";
import { adminWriteGate, logAdminAction } from "@/lib/admin";
import { saveActiveAvatarIds } from "@/lib/avatar-items";

export const dynamic = "force-dynamic";

/**
 * Avatar envanteri — panelin yazma ucu (/admin/avatar): kullanıcıya
 * gösterilen parçalar (yuva başına en fazla `AVATAR_ACTIVE_PER_SLOT`).
 * Kapalı parçalar silinmez, yalnız gösterilmez. Yazma iki adımlı doğrulama
 * ister (`adminWriteGate` "normal") ve işlem kaydına düşer.
 */
export async function POST(req: Request) {
  const g = await adminWriteGate(req, "normal");
  if (!g.ok) return g.response;
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (body.action !== "save_active") return NextResponse.json({ error: "bad_action" }, { status: 400 });
  try {
    const r = await saveActiveAvatarIds(body.ids, g.admin.email);
    if (!r.ok) return NextResponse.json({ error: r.error, slot: r.slot }, { status: 400 });
    void logAdminAction(g.admin, "avatar.save_active", null, { count: r.ids.length });
    return NextResponse.json({ ok: true, ids: r.ids });
  } catch (err) {
    console.error("[admin/avatar]", err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}
