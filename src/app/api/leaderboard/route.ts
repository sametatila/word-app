import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { getLeaderboard } from "@/lib/session";

export const dynamic = "force-dynamic";

/**
 * Haftalık sıralama (mobil). Web'in learn sayfasında sunucu bileşeninin
 * çağırdığı getLeaderboard'ın REST karşılığı: bu haftanın XP tablosu (satırlar
 * rank/name/xp/streak/isMe) + haftanın başı + kalan gün. Yalnız okur, oturumsuz 401.
 */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const today = new Date().toISOString().slice(0, 10);
    const week = await getLeaderboard(userId, today);
    return NextResponse.json(week, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[leaderboard] okunamadı", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
