import { NextResponse } from "next/server";
import { studioWriteGate, logStudioAction } from "@/lib/studio-auth";
import { setSocialPost, setSocialPostsBulk } from "@/lib/social-posts";

export const dynamic = "force-dynamic";

/**
 * Platform durumları (TikTok / Instagram) — stüdyonun yazma ucu (/studio). Eylemler:
 *
 *   set    bir bölümün bir platformdaki durumu (planned · scheduled · published · skipped) + bağlantı + not
 *   bulk   birden çok bölümün durumu (ör. iki haftayı zamanlayıcıya koyduktan sonra "zamanlandı")
 *
 * Yazma iki adımlı doğrulama ister (`studioWriteGate`: admin ya da sosyal medya editörü) ve işlem kaydına düşer.
 */
export async function POST(req: Request) {
  const g = await studioWriteGate(req);
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
        const r = await setSocialPost({ episodeId: body.episodeId, platform: body.platform, status: body.status, url: body.url, note: body.note }, g.writer.email);
        if (!r.ok) return NextResponse.json({ error: r.error }, { status: r.error === "not_found" ? 404 : 400 });
        void logStudioAction(g.writer, "post.set", String(body.episodeId), { platform: body.platform, status: body.status });
        return NextResponse.json({ ok: true, post: r.post });
      }
      case "bulk": {
        const r = await setSocialPostsBulk({ episodeIds: body.episodeIds, platform: body.platform, status: body.status }, g.writer.email);
        if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
        void logStudioAction(g.writer, "post.bulk", null, { platform: body.platform, status: body.status, count: r.count });
        return NextResponse.json({ ok: true, count: r.count });
      }
      default:
        return NextResponse.json({ error: "bad_action" }, { status: 400 });
    }
  } catch (err) {
    console.error("[studio/posts]", body.action, err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}
