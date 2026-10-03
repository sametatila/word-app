import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { buildChallenge, recordChallengeScore } from "@/lib/session";
import { consume } from "@/lib/social/ratelimit";

export const dynamic = "force-dynamic";

/** Süreye karşı meydan okuma: öğrenilenlerden rastgele, karışık oyun türleriyle. */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    return NextResponse.json(await buildChallenge(userId));
  } catch (err) {
    console.error("[challenge]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

/**
 * Günde en çok kaç skor bildirimi (güvenlik denetimi 2026-10-03, D1): puan
 * istemcide hesaplanıyor ve her yeni rekor en az 25 XP veriyor; skoru 1, 2,
 * 3… diye göndermek sınırsız XP demekti. Bir tur dakikalar sürüyor; günde 40
 * bildirim gerçek oyuncuya bol, uydurma rekor merdivenini ise günde
 * ~16.000 XP'de durduruyor.
 */
const DAILY_REPORTS = 40;

/**
 * Tur bittiğinde skoru bildirir; rekor buradan güncellenir.
 * Rekor cihazda tutulmaz — hesaba aittir, her cihazda aynı görünmelidir.
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

  const raw = (body as { score?: unknown } | null)?.score;
  if (typeof raw !== "number" || !Number.isFinite(raw)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  // Puan istemcide hesaplanıyor; tavan koymak uydurma bir rekorun sıralamayı
  // ya da kullanıcının kendi ölçüsünü bozmasını engeller.
  const score = Math.min(100000, Math.max(0, Math.round(raw)));

  try {
    const rate = await consume(`challenge:${userId}`, DAILY_REPORTS, 86400);
    if (!rate.ok) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "retry-after": String(rate.retryAfterSec) } });
    }
    return NextResponse.json(await recordChallengeScore(userId, score));
  } catch (err) {
    console.error("[challenge:score]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
