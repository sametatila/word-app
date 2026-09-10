import { auth, authEnabled } from "@/lib/auth/server";
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";

/**
 * Better Auth uçları (/api/auth/*). Catch-all rota; Better Auth handler'ı tam
 * URL'e bakarak sign-in/email, sign-up/email, get-session, sign-out,
 * sign-in/social, request-password-reset vb. hepsini karşılar.
 */
export const dynamic = "force-dynamic";

/**
 * DATABASE_URL ya da BETTER_AUTH_SECRET tanımsızsa `auth` nesnesi derleme
 * geçsin diye herkesin bildiği bir yer tutucu sırla kurulur. O sırla oturum
 * imzalamak, oturumu hiç imzalamamak demek; bu yüzden uçlar kapalı kalır.
 */
const handler = toNextJsHandler(auth);
const disabled = () => NextResponse.json({ error: "auth_not_configured" }, { status: 503 });

/**
 * 429'a STANDART `Retry-After` başlığı eklenir.
 *
 * Better Auth hız sınırına takılan yanıtta yalnız `X-Retry-After` yazıyor
 * (api/rate-limiter). Bu standart dışı bir ad: ne tarayıcılar, ne HTTP
 * istemcileri, ne de araya giren vekiller onu tanıyor — bizim istemcilerimiz
 * de okumuyordu, ekranda hep sabit "birkaç dakika sonra dene" yazıyordu.
 * RFC 9110'un adı `Retry-After` ve saniye cinsinden bir sayı kabul ediyor;
 * değeri aynen kopyalıyoruz, kütüphanenin başlığı da yerinde kalıyor.
 */
function withRetryAfter(res: Response): Response {
  if (res.status !== 429) return res;
  const seconds = res.headers.get("x-retry-after");
  if (!seconds || res.headers.has("retry-after")) return res;
  const headers = new Headers(res.headers);
  headers.set("retry-after", seconds);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

export const GET = authEnabled
  ? async (req: Request) => withRetryAfter(await handler.GET(req))
  : disabled;
export const POST = authEnabled
  ? async (req: Request) => withRetryAfter(await handler.POST(req))
  : disabled;
