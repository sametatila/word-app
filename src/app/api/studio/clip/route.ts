import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import { studioGate } from "@/lib/studio-auth";
import { defneFile } from "@/lib/studio";

export const dynamic = "force-dynamic";

/**
 * Önizleme için Defne klibi: GET /api/studio/clip?t=<seslendirilen metin> → m4a. Kayıt yoksa 404 (stüdyo sessiz
 * yer tutucu çalar ve "Defne sesi bekleniyor" der). Yalnız stüdyo kullanıcılarına; sunucuda TTS_OWN_DIR.
 */
export async function GET(req: Request) {
  const g = await studioGate();
  if (!g.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const text = new URL(req.url).searchParams.get("t") ?? "";
  if (!text || text.length > 600) return NextResponse.json({ error: "bad_input" }, { status: 400 });
  const file = defneFile(text);
  if (!file) return NextResponse.json({ error: "not_found" }, { status: 404 });
  try {
    const buf = await readFile(file);
    return new NextResponse(new Uint8Array(buf), { headers: { "content-type": "audio/mp4", "cache-control": "private, max-age=3600" } });
  } catch {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
}
