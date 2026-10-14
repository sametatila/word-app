import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import { studioGate } from "@/lib/studio-auth";
import { clipFile, defneFile } from "@/lib/studio";

export const dynamic = "force-dynamic";

/**
 * Önizleme için klip: GET /api/studio/clip?t=<seslendirilen metin> → Defne'nin Almanca kaydı (dikey);
 * ?k=<ses|dil|metin[#tür]> → o anahtarın kaydı (yatay, dört karakter). Kayıt yoksa 404 (stüdyo sessiz yer tutucu
 * çalar ve "ses bekleniyor" der). Yalnız stüdyo kullanıcılarına; sunucuda TTS_OWN_DIR.
 */
export async function GET(req: Request) {
  const g = await studioGate();
  if (!g.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const q = new URL(req.url).searchParams;
  const key = q.get("k");
  const text = q.get("t") ?? "";
  if (key != null ? !/^(ahu|defne|aras|can|mira)\|(de|tr|en)\|.{1,900}$/s.test(key) : !text || text.length > 600) return NextResponse.json({ error: "bad_input" }, { status: 400 });
  const file = key != null ? clipFile(key) : defneFile(text);
  if (!file) return NextResponse.json({ error: "not_found" }, { status: 404 });
  try {
    const buf = await readFile(file);
    return new NextResponse(new Uint8Array(buf), { headers: { "content-type": "audio/mp4", "cache-control": "private, max-age=3600" } });
  } catch {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
}
