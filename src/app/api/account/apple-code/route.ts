import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { appleRevokeConfigured } from "@/lib/auth/apple";
import { storeAppleAuthorizationCode } from "@/lib/account/apple-revoke";

export const dynamic = "force-dynamic";

/**
 * Apple girişinin authorization code'unu alır (yalnız mobil, yalnız iOS).
 *
 * NEDEN: hesap silmede Apple'ın token'ını iptal etmek App Store 5.1.1(v)'nin açık
 * koşulu. Native giriş akışı id token ile çalışıyor ve id token iptal EDİLEMİYOR;
 * iptal edilebilen tek şey authorization code'dan üretilen refresh token. Kod tek
 * kullanımlık ve ~5 dakika yaşıyor, o yüzden giriş biter bitmez buraya gönderiliyor.
 *
 * Oturum zorunlu: kod, isteği yapan kullanıcının Apple hesap satırına yazılıyor.
 * Yapılandırma yoksa (APPLE_* boş) 204 dönüp hiçbir şey yapmıyor — istemci zaten
 * cevabı umursamıyor, giriş bundan etkilenmiyor.
 */
export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!appleRevokeConfigured()) return new NextResponse(null, { status: 204 });

  let code = "";
  try {
    code = String(((await req.json()) as { code?: unknown }).code ?? "").trim();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  // Apple'ın kodu kısa ve opak; üst sınır yalnız saçma girdiyi eler.
  if (!code || code.length > 512) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const stored = await storeAppleAuthorizationCode(userId, code);
  return NextResponse.json({ stored });
}
