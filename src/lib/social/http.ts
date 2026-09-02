import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
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

/** Oturum (ve yazan isteklerde origin) kontrolü. Başarısızsa hazır cevap döner. */
export async function requireUser(req: Request, mutating: boolean): Promise<string | NextResponse> {
  if (mutating && !sameOrigin(req)) return fail("forbidden", 403);
  const userId = await getUserId();
  if (!userId) return fail("unauthorized", 401);
  return userId;
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

export function dayParam(value: unknown): string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : new Date().toISOString().slice(0, 10);
}

export function intParam(value: unknown): number | null {
  const n = typeof value === "string" ? Number(value) : typeof value === "number" ? value : NaN;
  return Number.isInteger(n) && n > 0 ? n : null;
}

export function strParam(value: unknown, max = 200): string | null {
  return typeof value === "string" && value.length <= max ? value : null;
}
