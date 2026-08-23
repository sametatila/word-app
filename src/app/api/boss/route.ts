import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import {
  BOSS_BONUS,
  BOSS_MAX_SECONDS,
  BOSS_PENALTY,
  BOSS_SECONDS,
  buildModuleBoss,
  recordBossClear,
} from "@/lib/lessons/boss";

export const dynamic = "force-dynamic";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

function parseTarget(level: unknown, mod: unknown) {
  if (typeof level !== "string" || !LEVELS.includes(level)) return null;
  const index = Number(mod);
  if (!Number.isInteger(index) || index < 0 || index > 20) return null;
  return { level, index };
}

export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const target = parseTarget(url.searchParams.get("level"), url.searchParams.get("module"));
  if (!target) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  try {
    const payload = await buildModuleBoss(userId, target.level, target.index);
    // Süre kuralları sunucudan gidiyor: istemcide ikinci bir kopya tutmak,
    // dengeyi değiştirdiğimizde iki yerde birden değiştirmeyi hatırlamak
    // demekti.
    return NextResponse.json({
      ...payload,
      seconds: BOSS_SECONDS,
      bonus: BOSS_BONUS,
      penalty: BOSS_PENALTY,
      maxSeconds: BOSS_MAX_SECONDS,
    });
  } catch (err) {
    console.error("[api/boss]", err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}

/**
 * Geçme kaydı.
 *
 * Kalan süre istemciden geliyor ve sunucuda tavanlanıyor. Bu bir skor tablosu
 * değil, kişinin kendi yol haritasındaki taç — abartılı bir sayı kimsenin
 * önüne geçmiyor, yine de sınırsız bırakmanın anlamı yok.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const b = body as Record<string, unknown>;
  const target = parseTarget(b.level, b.module);
  if (!target) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const left = typeof b.secondsLeft === "number" ? b.secondsLeft : 0;

  try {
    const result = await recordBossClear(userId, target.level, target.index, left);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[api/boss POST]", err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}
