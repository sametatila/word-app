import { NextResponse } from "next/server";
import { adminWriteGate, logAdminAction } from "@/lib/admin";
import { setSocialPost, setSocialPostsBulk } from "@/lib/social-posts";

export const dynamic = "force-dynamic";

/**
 * Sosyal medya takvimi — panelin yazma ucu (/admin/social). Eylemler:
 *
 *   set    bir bölümün bir platformdaki durumu (planned · scheduled · published · skipped) + bağlantı + not
 *   bulk   birden çok bölümün durumu (ör. iki haftayı zamanlayıcıya koyduktan sonra "zamanlandı")
 *
 * Plan depodan gelir (`data/social/plan.json`), burada değişmez. Yazma iki adımlı doğrulama ister
 * (`adminWriteGate` "normal") ve işlem kaydına düşer.
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
      case "set": {
        const r = await setSocialPost({ episodeId: body.episodeId, platform: body.platform, status: body.status, url: body.url, note: body.note }, g.admin.email);
        if (!r.ok) return NextResponse.json({ error: r.error }, { status: r.error === "not_found" ? 404 : 400 });
        void logAdminAction(g.admin, "social.set", String(body.episodeId), { platform: body.platform, status: body.status });
        return NextResponse.json({ ok: true, post: r.post });
      }
      case "bulk": {
        const r = await setSocialPostsBulk({ episodeIds: body.episodeIds, platform: body.platform, status: body.status }, g.admin.email);
        if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
        void logAdminAction(g.admin, "social.bulk", null, { platform: body.platform, status: body.status, count: r.count });
        return NextResponse.json({ ok: true, count: r.count });
      }
      default:
        return NextResponse.json({ error: "bad_action" }, { status: 400 });
    }
  } catch (err) {
    console.error("[admin/social]", body.action, err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}
