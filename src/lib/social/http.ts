import { NextResponse } from "next/server";
import { getUserInfo } from "@/lib/auth/server";
import { ACCOUNT_REQUIRED } from "@/lib/auth/guest";
import { sameOrigin } from "@/lib/auth/origin";
import { clampDay } from "@/lib/award";
import { SocialError } from "./errors";

/**
 * Sosyal rotaların ortak iskeleti — api/quests ile aynı kurallar (oturum,
 * origin, `{ error: kod }`, no-store), yalnız tek yerde. Kütüphane hataları
 * (SocialError) HTTP'ye burada çevrilir; geri kalan her şey 500 "database".
 */
export const NO_STORE = { headers: { "cache-control": "no-store" } } as const;

export function fail(code: string, status: number, retryAfterSec?: number): NextResponse {
  const headers: Record<string, string> = {};
  if (retryAfterSec) headers["retry-after"] = String(retryAfterSec);
  return NextResponse.json({ error: code }, { status, headers });
}

/**
 * Oturum (ve yazan isteklerde origin) kontrolü. Başarısızsa hazır cevap döner.
 *
 * SOSYAL KATMAN HESAP İSTER. Misafir kimliğinin görünen adı ve ulaşılabilir
 * bir sahibi yok: arkadaş listesinde, ligde ya da sıralamada adsız bir oyuncu
 * olarak görünmemeli, kimseye istek ya da dürtme gönderememeli. Misafire
 * 403 `account_required` (bkz. lib/auth/guest); istemci "hesap oluştur"
 * kartını gösteriyor.
 */
export async function requireUser(req: Request, mutating: boolean): Promise<string | NextResponse> {
  if (mutating && !sameOrigin(req)) return fail("forbidden", 403);
  const who = await getUserInfo();
  if (!who) return fail("unauthorized", 401);
  if (who.guest) return fail(ACCOUNT_REQUIRED, 403);
  return who.id;
}

export async function readJson(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = (await req.json()) as unknown;
    return body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export function handleError(scope: string, err: unknown): NextResponse {
  if (err instanceof SocialError) return fail(err.code, err.status, err.retryAfterSec);
  console.error(`[${scope}]`, err);
  return fail("database", 500);
}

export function ok(data: unknown, status = 200): NextResponse {
  return NextResponse.json(data, { status, ...NO_STORE });
}

/**
 * İstemci günü — sunucu-bugününün ±1'ine sıkıştırılır (clampDay).
 *
 * Güvenlik denetimi F6: yalnız biçim doğrulansaydı `GET /api/social/league?
 * day=<bugün+7>` `closeWeekIfNeeded`'i CANLI haftayı erken kapatmaya
 * zorlayabilir, kısmi sıralamalar üzerinden terfileri kilitler ve meşru pazar
 * kapanışını no-op'a çevirirdi. Clamp bu pencereyi kapatır.
 */
export function dayParam(value: unknown): string {
  return clampDay(value);
}

export function intParam(value: unknown): number | null {
  const n = typeof value === "string" ? Number(value) : typeof value === "number" ? value : NaN;
  return Number.isInteger(n) && n > 0 ? n : null;
}

export function strParam(value: unknown, max = 200): string | null {
  return typeof value === "string" && value.length <= max ? value : null;
}
