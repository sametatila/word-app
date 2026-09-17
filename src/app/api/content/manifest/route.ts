import { NextResponse } from "next/server";
import { manifest } from "@/lib/content/read";
import { jsonWithEtag } from "@/lib/content/http";
import { isPackId } from "@/lib/content/ids";

export const dynamic = "force-dynamic";

/**
 * PAKET MANİFESTİ — istemcinin ne indireceğini söyleyen delta.
 *
 *   /api/content/manifest?pack=lessons/de-a1&since=12
 *   { "r":14, "p":"lessons/de-a1",
 *     "f":{"h":"…","b":592431},                     paketin tamamının arşivi
 *     "i":[{"i":"de-a1-b03","h":"…","b":12043}],    değişen maddeler
 *     "x":["de-a1-b09"] }                           düşen maddeler
 *
 * Elinde hiçbir şey olmayan istemci `f`yi tek istekte indiriyor; elinde bir
 * sürüm olan yalnız `i`deki maddeleri. Bir kelime düzeltildiğinde bu liste
 * tek satır oluyor — teslim edilen bayt 27 MB değil, o maddenin kendisi.
 *
 * `since` GÜVENİLMEYEN bir sayı: istemci ne gönderirse göndersin cevap
 * doğrulanmış bir sürüme göre kuruluyor, bilinmeyen ya da ileri bir değer tam
 * listeye düşüyor (bkz. `manifest`). Yanlış `since` en fazla fazla indirme
 * yapar, asla eksik.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const pack = url.searchParams.get("pack");
  if (!isPackId(pack)) return NextResponse.json({ error: "pack" }, { status: 400 });
  const raw = Number(url.searchParams.get("since") ?? 0);
  const since = Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
  return jsonWithEtag(req, await manifest(pack, since), 30);
}
