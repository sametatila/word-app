import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { studioGate } from "@/lib/studio-auth";
import { renderFiles } from "@/lib/studio";

export const dynamic = "force-dynamic";

/**
 * Üretilen dosyalar, KAYIPSIZ: sunucunun ürettiği dosyanın baytları aynen (yeniden kodlama yok).
 *   GET /api/studio/file/<üretim>?k=mp4|kapak|kapak34|aciklama
 */
const KINDS: Record<string, { file: (id: string) => string; type: string; ext: string }> = {
  mp4: { file: (id) => `${id}.mp4`, type: "video/mp4", ext: "mp4" },
  kapak: { file: () => "kapak.jpg", type: "image/jpeg", ext: "jpg" },
  kapak34: { file: () => "kapak-3x4.jpg", type: "image/jpeg", ext: "jpg" },
  aciklama: { file: () => "aciklama.txt", type: "text/plain; charset=utf-8", ext: "txt" },
};

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await studioGate();
  if (!g.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const { id } = await ctx.params;
  const kind = KINDS[new URL(req.url).searchParams.get("k") ?? ""];
  const r = Number.isInteger(Number(id)) ? await renderFiles(Number(id)) : null;
  if (!kind || !r) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const file = path.join(r.dir, kind.file(r.episodeId));
  try {
    const [buf, st] = await Promise.all([readFile(file), stat(file)]);
    const name = kind.ext === "mp4" ? `${r.episodeId}.mp4` : `${r.episodeId}-${kind.file(r.episodeId)}`;
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "content-type": kind.type,
        "content-length": String(st.size),
        "content-disposition": `${new URL(req.url).searchParams.get("inline") ? "inline" : "attachment"}; filename="${name}"`,
        "cache-control": "private, max-age=600",
      },
    });
  } catch {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
}
