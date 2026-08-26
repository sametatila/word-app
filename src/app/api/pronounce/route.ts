import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { sttProviders } from "@/lib/chat-providers";
import { SttError, transcribe } from "@/lib/stt";
import { scorePronunciation } from "@/lib/pronounce";
import { track } from "@/lib/events";
import type { SpeechConfusion } from "@/lib/skills/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

/** ≤ 15 sn: opus ~240 kB, WAV 16 kHz ~480 kB; pay bırakıldı. */
const MAX_BYTES = 1_500_000;
const MAX_TARGET = 200;

/**
 * Telaffuz puanı (WP-20 faz 1): ses + hedef cümle → transkript (zincir:
 * Groq → Cloudflare → Speechmatics → …) → kelime hizalaması ve akıcılık
 * (`lib/pronounce.ts`). Ses saklanmaz; sonuç `pronounce` olayı olarak
 * düşer (kind = egzersiz kimliği, value = puan) — profil ve KPI oradan okur.
 *
 * Kota koruması: klip boyutu sınırı burada, günlük istek sınırı `ai_usage`
 * sayacıyla (kullanıcı başına 120/gün; assess ile aynı düşünce).
 */
const DAILY_LIMIT = 120;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!sttProviders().length) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  let file: File | null = null;
  let target = "";
  let exerciseId = "";
  let language = "de";
  let confusions: SpeechConfusion[] = [];
  try {
    const form = await req.formData();
    const f = form.get("audio");
    if (f instanceof File) file = f;
    const t = form.get("target");
    if (typeof t === "string") target = t.trim().slice(0, MAX_TARGET);
    const ex = form.get("exerciseId");
    if (typeof ex === "string" && /^[a-z0-9_:-]{1,32}$/.test(ex)) exerciseId = ex;
    const lang = form.get("language");
    if (typeof lang === "string" && /^[a-z]{2}$/.test(lang)) language = lang;
    const c = form.get("confusions");
    if (typeof c === "string") {
      const parsed = JSON.parse(c) as unknown;
      if (Array.isArray(parsed)) confusions = parsed.filter((x): x is SpeechConfusion => typeof x === "object" && x !== null && Array.isArray((x as SpeechConfusion).heard) && typeof (x as SpeechConfusion).fix === "string").slice(0, 8);
    }
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!file || file.size === 0) return NextResponse.json({ error: "no_audio" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "too_large" }, { status: 413 });
  if (!target) return NextResponse.json({ error: "no_target" }, { status: 400 });

  if (!(await underDailyLimit(userId))) return NextResponse.json({ error: "quota" }, { status: 429 });

  try {
    const stt = await transcribe(file, { language, words: true, userId, expected: target });
    const score = scorePronunciation(target, stt.text, { words: stt.words, duration: stt.duration, confusions });
    if (exerciseId) void track(userId, "pronounce", new Date().toISOString().slice(0, 10), score.overall, exerciseId);
    return NextResponse.json({ ...score, provider: stt.provider, hasWordTiming: Boolean(stt.words?.length) });
  } catch (err) {
    if (err instanceof SttError) {
      console.error("[api/pronounce] zincir düştü", err.failures.join(" · "));
      const rate = err.failures.every((f) => /\b429\b/.test(f));
      return NextResponse.json({ error: rate ? "rate_limited" : "failed" }, { status: rate ? 429 : 502 });
    }
    console.error("[api/pronounce]", err);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}

async function underDailyLimit(userId: string): Promise<boolean> {
  try {
    const { db } = await import("@/lib/db");
    const { aiUsage } = await import("@/lib/db/schema");
    const { and, eq, gte, sql } = await import("drizzle-orm");
    const [row] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(aiUsage)
      .where(and(eq(aiUsage.userId, userId), eq(aiUsage.kind, "stt"), gte(aiUsage.createdAt, sql`now() - interval '1 day'`)));
    return (row?.n ?? 0) < DAILY_LIMIT;
  } catch {
    return true;
  }
}

export async function GET() {
  return NextResponse.json({ configured: sttProviders().length > 0 }, { headers: { "cache-control": "no-store" } });
}
