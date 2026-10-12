import { readFile, stat } from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { NextResponse } from "next/server";
import { studioGate } from "@/lib/studio-auth";
import { renderFiles } from "@/lib/studio";

export const dynamic = "force-dynamic";

/**
 * Üretilen dosyalar, KAYIPSIZ: sunucunun ürettiği dosyanın baytları aynen (yeniden kodlama yok).
 *   GET /api/studio/file/<üretim>?k=mp4|kapak|kapak34|aciklama
 *
 * İMZALI ADRES (Instagram, 2026-10-10): Instagram API'si (Instagram girişi) dosya yüklemeyi kabul etmiyor, videoyu ve
 * kapağı kendisi bir adresten çekiyor. Instagram işçisi (`scripts/social/instagram.mjs` mediaUrl) `exp` (en çok 6 sa
 * sonrası) ve `sig` = HMAC-SHA256(BETTER_AUTH_SECRET, "social-media:<üretim>.<k>.<exp>") ekler; geçerli imza oturum
 * yerine geçer. Yalnız mp4 ve kapak.
 */
const KINDS: Record<string, { file: (id: string) => string; type: string; ext: string }> = {
  mp4: { file: (id) => `${id}.mp4`, type: "video/mp4", ext: "mp4" },
  kapak: { file: () => "kapak.jpg", type: "image/jpeg", ext: "jpg" },
  kapak34: { file: () => "kapak-3x4.jpg", type: "image/jpeg", ext: "jpg" },
  aciklama: { file: () => "aciklama.txt", type: "text/plain; charset=utf-8", ext: "txt" },
};

function signedOk(id: string, k: string, sp: URLSearchParams): boolean {
  const exp = Number(sp.get("exp"));
  const sig = sp.get("sig") ?? "";
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret || (k !== "mp4" && k !== "kapak") || !Number.isFinite(exp) || exp < Date.now() / 1000 || exp > Date.now() / 1000 + 6 * 3600) return false;
  const want = crypto.createHmac("sha256", secret).update(`social-media:${id}.${k}.${exp}`).digest("hex");
  return sig.length === want.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(want));
}

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const sp = new URL(req.url).searchParams;
  const k = sp.get("k") ?? "";
  if (!(sp.has("sig") && signedOk(id, k, sp))) {
    const g = await studioGate();
    if (!g.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const kind = KINDS[k];
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
