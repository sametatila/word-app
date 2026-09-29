import { NextResponse } from "next/server";
import { adminWriteGate, logAdminAction } from "@/lib/admin";
import { saveActiveAvatarIds, saveAvatarRules } from "@/lib/avatar-items";
import { adminGrantItem, adminRevokeItem } from "@/lib/avatar-admin";

export const dynamic = "force-dynamic";

/**
 * Avatar envanteri — panelin yazma ucu (/admin/avatar). Eylemler:
 *
 *   save_active   kullanıcıya gösterilen parçalar (yuva başına en fazla `perSlot`)
 *   save_rules    yuva sınırı ve açılış koşulu değişiklikleri (`avatar-items` `avatarRules`)
 *   grant_item    bir hesaba parça ver (kimlik, e-posta ya da kullanıcı adı)
 *   revoke_item   verilen parçayı geri al (`avatar_items` satırı)
 *
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
  try {
    switch (body.action) {
      case "save_active": {
        const r = await saveActiveAvatarIds(body.ids, g.admin.email);
        if (!r.ok) return NextResponse.json({ error: r.error, slot: r.slot }, { status: 400 });
        void logAdminAction(g.admin, "avatar.save_active", null, { count: r.ids.length });
        return NextResponse.json({ ok: true, ids: r.ids });
      }
      case "save_rules": {
        const r = await saveAvatarRules({ perSlot: body.perSlot, unlocks: body.unlocks }, g.admin.email);
        if (!r.ok) return NextResponse.json({ error: r.error, slot: r.slot }, { status: 400 });
        void logAdminAction(g.admin, "avatar.save_rules", null, { perSlot: r.rules.perSlot, changed: Object.keys(r.rules.unlocks).length });
        return NextResponse.json({ ok: true, rules: r.rules });
      }
      case "grant_item": {
        const itemId = String(body.itemId ?? "");
        const r = await adminGrantItem(String(body.user ?? ""), itemId);
        if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
        void logAdminAction(g.admin, "avatar.grant_item", r.userId, { itemId });
        return NextResponse.json({ ok: true, userId: r.userId, label: r.label });
      }
      case "revoke_item": {
        const userId = String(body.userId ?? "").slice(0, 64);
        const itemId = String(body.itemId ?? "").slice(0, 40);
        if (!userId || !itemId) return NextResponse.json({ error: "bad_input" }, { status: 400 });
        const gone = await adminRevokeItem(userId, itemId);
        if (!gone) return NextResponse.json({ error: "not_found" }, { status: 404 });
        void logAdminAction(g.admin, "avatar.revoke_item", userId, { itemId });
        return NextResponse.json({ ok: true });
      }
      default:
        return NextResponse.json({ error: "bad_action" }, { status: 400 });
    }
  } catch (err) {
    console.error("[admin/avatar]", body.action, err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}
