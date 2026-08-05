import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { buildChallenge, recordChallengeScore } from "@/lib/session";

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
    return NextResponse.json(await recordChallengeScore(userId, score));
  } catch (err) {
    console.error("[challenge:score]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
