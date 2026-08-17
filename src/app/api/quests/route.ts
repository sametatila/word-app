import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { awardActivity } from "@/lib/award";
import { claimQuest, questBoard } from "@/lib/quests";

export const dynamic = "force-dynamic";

/** Günün görevleri ve ilerlemeleri. */
export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const day = normalizeDay(new URL(req.url).searchParams.get("day"));
  try {
    return NextResponse.json(await questBoard(userId, day));
  } catch (err) {
    console.error("[quests]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

/**
 * Ödül talebi.
 *
 * Tamamlanma sunucuda yeniden doğrulanıyor (bkz. lib/quests.ts) — istemcinin
 * iddiası tek başına XP kazandırmıyor.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const questId = typeof body.questId === "string" ? body.questId : "";
  if (!questId || questId.length > 20) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const day = normalizeDay(body.day);

  try {
    const { xp } = await claimQuest(userId, day, questId);
    // Görev ödülü de ortak geçitten geçiyor: XP, günlük istatistik ve seri
    // tek yerden işleniyor (bkz. lib/award.ts). Süre eklenmiyor — görevin
    // kendisi zaten yapılan işin süresini saymıştı.
    const award = xp > 0 ? await awardActivity(userId, day, xp, 0) : null;
    const board = await questBoard(userId, day);
    return NextResponse.json({
      xp,
      totalXp: award?.totalXp ?? null,
      currentStreak: award?.currentStreak ?? null,
      ...board,
    });
  } catch (err) {
    console.error("[quests:claim]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

function normalizeDay(value: unknown) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? value
    : new Date().toISOString().slice(0, 10);
}
