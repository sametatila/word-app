import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { achievementBoard, markAchievementsSeen } from "@/lib/achievements";

export const dynamic = "force-dynamic";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "auth" }, { status: 401 });
  try {
    const board = await achievementBoard(userId);
    return NextResponse.json(board);
  } catch (err) {
    console.error("[api/achievements]", err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}

/** Kutlaması gösterilen rozetleri işaretler — aynı rozet iki kez patlamasın. */
export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "auth" }, { status: 401 });
  try {
    const body = (await req.json()) as { seen?: unknown };
    const ids = Array.isArray(body.seen) ? body.seen.filter((x): x is string => typeof x === "string") : [];
    await markAchievementsSeen(userId, ids);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/achievements POST]", err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}
