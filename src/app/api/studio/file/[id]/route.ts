import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { Readable } from "node:stream";
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
 *
 * AKIŞ (2026-10-13, yatay uzun video ~200 MB): dosya belleğe okunmaz, akıtılır; `Range` isteği 206 ile o bayt aralığını
 * verir (oynatıcıda ileri sarma, Safari'nin video oynatması bunu ister). Baytlar yine dosyanın kendisi.
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
    const st = await stat(file);
    const name = kind.ext === "mp4" ? `${r.episodeId}.mp4` : `${r.episodeId}-${kind.file(r.episodeId)}`;
    const headers: Record<string, string> = {
      "content-type": kind.type,
      "accept-ranges": "bytes",
      "content-disposition": `${sp.get("inline") ? "inline" : "attachment"}; filename="${name}"`,
      "cache-control": "private, max-age=600",
    };
    const range = req.headers.get("range")?.match(/^bytes=(\d*)-(\d*)$/);
    let start = 0;
    let end = st.size - 1;
    if (range && (range[1] || range[2])) {
      if (range[1]) {
        start = Number(range[1]);
        if (range[2]) end = Math.min(end, Number(range[2]));
      } else start = Math.max(0, st.size - Number(range[2])); // son N bayt
      if (start > end || start >= st.size) return new NextResponse(null, { status: 416, headers: { "content-range": `bytes */${st.size}` } });
      headers["content-range"] = `bytes ${start}-${end}/${st.size}`;
    }
    headers["content-length"] = String(end - start + 1);
    const body = Readable.toWeb(createReadStream(file, { start, end })) as ReadableStream<Uint8Array>;
    return new NextResponse(body, { status: headers["content-range"] ? 206 : 200, headers });
  } catch {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
}
