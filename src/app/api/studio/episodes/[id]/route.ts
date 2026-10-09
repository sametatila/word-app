import { NextResponse } from "next/server";
import { studioGate, studioWriteGate, logStudioAction } from "@/lib/studio-auth";
import { approveEpisode, cancelRender, getEpisode, restoreEpisode, saveEpisode, setEpisodeSlot } from "@/lib/studio";

export const dynamic = "force-dynamic";

/**
 * Stüdyo bölüm ucu (/studio/<id>).
 *   GET                 bölüm: veri, sürümler, üretimler, eksik Defne sesleri
 *   POST save           metinler (baseRevision + data + spoken + not) → yeni sürüm
 *   POST slot           yayın saati (içerik ve onay etkilenmez)
 *   POST approve        o sürümü onayla → sunucuda video üretimi kuyruğa
 *   POST restore        eski sürüme ya da Claude'un sürümüne dön (yeni sürüm olarak)
 *   POST cancel_render  kuyruktaki üretimi iptal
 * Kurallar `lib/studio`; yazma iki adımlı doğrulama ister, işlem kaydına düşer.
 */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await studioGate();
  if (!g.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const { id } = await ctx.params;
  const e = await getEpisode(id);
  if (!e) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(e, { headers: { "cache-control": "no-store" } });
}

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await studioWriteGate(req);
  if (!g.ok) return g.response;
  const { id } = await ctx.params;
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  try {
    const actor = g.writer.email;
    let r;
    switch (body.action) {
      case "save":
        r = await saveEpisode(id, { baseRevision: body.baseRevision, data: body.data, spoken: body.spoken, note: body.note }, actor);
        if (r.ok) void logStudioAction(g.writer, "save", id, { revision: r.revision });
        break;
      case "slot":
        r = await setEpisodeSlot(id, body.slot ?? null, actor);
        if (r.ok) void logStudioAction(g.writer, "slot", id, { slot: body.slot ?? null });
        break;
      case "approve":
        r = await approveEpisode(id, body.revision, actor);
        if (r.ok) void logStudioAction(g.writer, "approve", id, { revision: body.revision, renderId: r.renderId });
        break;
      case "restore":
        r = await restoreEpisode(id, { baseRevision: body.baseRevision, to: body.to }, actor);
        if (r.ok) void logStudioAction(g.writer, "restore", id, { to: body.to, revision: r.revision });
        break;
      case "cancel_render":
        r = await cancelRender(body.renderId);
        if (r.ok) void logStudioAction(g.writer, "cancel_render", id, { renderId: body.renderId });
        break;
      default:
        return NextResponse.json({ error: "bad_action" }, { status: 400 });
    }
    if (!r.ok) return NextResponse.json({ error: r.error, detail: r.detail }, { status: r.status });
    return NextResponse.json(r);
  } catch (err) {
    console.error("[studio]", body.action, id, err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}
