import { NextResponse } from "next/server";
import { studioGate, studioWriteGate, logStudioAction } from "@/lib/studio-auth";
import { createAudioRequest, listRequests, updateRequest } from "@/lib/studio-requests";

export const dynamic = "force-dynamic";

/**
 * Stüdyo talepleri (süreç: `lib/studio-requests`).
 *   GET                          admin: hepsi · editör: kendi talepleri
 *   POST create  { episodeId, note }          editör: Defne sesi olmayan metinler için Samet'e talep (Telegram)
 *   POST take | reject | cancel | seen  { id, reply }   take/reject yalnız admin, reject gerekçe ister
 */
export async function GET() {
  const g = await studioGate();
  if (!g.ok || !g.role) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  return NextResponse.json({ requests: await listRequests(g.email ?? "", g.role) }, { headers: { "cache-control": "no-store" } });
}

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
    const w = g.writer;
    if (body.action === "create") {
      const r = await createAudioRequest(String(body.episodeId ?? ""), body.note, w.email);
      if (!r.ok) return NextResponse.json({ error: r.error, detail: r.detail }, { status: r.status });
      void logStudioAction(w, "request.create", String(body.episodeId), { id: r.id });
      return NextResponse.json(r);
    }
    const r = await updateRequest(Number(body.id), body.action, body.reply, w.email, w.role);
    if (!r.ok) return NextResponse.json({ error: r.error }, { status: r.status });
    if (body.action !== "seen") void logStudioAction(w, `request.${String(body.action)}`, String(body.id));
    return NextResponse.json(r);
  } catch (err) {
    console.error("[studio/requests]", body.action, err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}
