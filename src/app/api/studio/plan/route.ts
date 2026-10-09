import { NextResponse } from "next/server";
import { studioWriteGate, logStudioAction } from "@/lib/studio-auth";
import { moveEpisode } from "@/lib/studio";

export const dynamic = "force-dynamic";

/**
 * Takvim planı (sürükle-bırak): POST { action: "move", id, slot } — slot "YYYY-AA-GG SS:DD" (Berlin) ya da null
 * (takvim dışı). Dolu saatte iki bölüm yer değiştirir; kurallar `lib/studio` moveEpisode.
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
  if (body.action !== "move") return NextResponse.json({ error: "bad_action" }, { status: 400 });
  try {
    const id = String(body.id ?? "");
    const r = await moveEpisode(id, body.slot ?? null, g.writer.email);
    if (!r.ok) return NextResponse.json({ error: r.error, detail: r.detail }, { status: r.status });
    void logStudioAction(g.writer, "plan.move", id, { slot: body.slot ?? null, from: r.from, swapped: r.swapped });
    return NextResponse.json(r);
  } catch (err) {
    console.error("[studio/plan]", err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}
