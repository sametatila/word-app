import { NextResponse } from "next/server";
import { body } from "@/lib/content/read";
import { pickEncoding } from "@/lib/content/http";
import { isContentHash } from "@/lib/content/ids";

export const dynamic = "force-dynamic";

/**
 * GÖVDE — hattın taşıdığı baytların tamamı buradan geçiyor.
 *
 * Adres içeriğin kendi hash'i, dolayısıyla bu cevap TANIM GEREĞİ değişmez:
 * bir yıl `immutable` verilebiliyor, geçersizleştirme diye bir iş kalmıyor ve
 * nginx aynı gövdeyi Node'a bir daha hiç sormuyor (TTS önbelleğiyle aynı
 * kalıp). Bir kelime düzeltildiğinde eski gövde silinmiyor; yeni içeriğin
 * yeni bir adresi oluyor, o kadar.
 *
 * SIKIŞTIRMA İSTEK ANINDA YAPILMIYOR: iki biçim de veritabanında hazır
 * duruyor, burada yalnız hangisinin gönderileceği seçiliyor. `Vary` şart —
 * yoksa nginx brotli isteyen bir istemcinin cevabını gzip isteyene servis
 * eder.
 *
 * OTURUM İSTEMİYOR ve bu bilinçli: buradan yalnız ücretsiz çekirdek içerik
 * geçiyor. Premium kâğıtlar bu uca HİÇ KONMUYOR; onlar `/api/mock-exam`
 * üzerinden, yetki kontrolüyle ve `no-store` ile iniyor. Kapılı bir gövdeyi
 * önbelleklenebilir bir adrese koymak, kapıyı bir kez açıp sonsuza kadar açık
 * bırakmak olurdu.
 */
export async function GET(req: Request, ctx: { params: Promise<{ hash: string }> }) {
  const { hash } = await ctx.params;
  if (!isContentHash(hash)) return NextResponse.json({ error: "hash" }, { status: 400 });

  const found = await body(hash);
  if (!found) return NextResponse.json({ error: "not_found" }, { status: 404 });
  /* Kapılı gövde burada YOK sayılıyor — 403 değil 404, çünkü "var ama veremem"
     cevabı da bilgi: kâğıdın varlığını ve boyunu doğrular. */
  if (found.gated) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const etag = `"${hash}"`;
  const encoding = pickEncoding(req);
  const headers: Record<string, string> = {
    etag,
    "content-type": "application/json; charset=utf-8",
    "content-encoding": encoding,
    "cache-control": "public, max-age=31536000, immutable",
    vary: "Accept-Encoding",
    /* Sıkıştırılmamış boy: istemci indirmeden önce yer ayırabilsin. */
    "x-content-bytes": String(found.bytes),
  };
  if (req.headers.get("if-none-match") === etag) return new Response(null, { status: 304, headers });

  const payload = encoding === "br" ? found.br : found.gz;
  return new Response(new Uint8Array(payload), { status: 200, headers });
}
