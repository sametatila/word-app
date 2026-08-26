import { NextResponse } from "next/server";
import { and, gte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats } from "@/lib/db/schema";
import { sendToUser } from "@/lib/push";
import { weeklySummary } from "@/lib/growth";
import { track } from "@/lib/events";
import { shiftDay } from "@/lib/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Haftalık özet bildirimi (WP-52): Pazartesi sabahı, geçen hafta en az bir
 * gün çalışmış herkese tek satır ("Geçen hafta: 120 cevap, yazma 62→71, en
 * çok hata: artikel") — /profile#growth'a götürür. Hatırlatma cron'uyla aynı
 * yetki kuralı.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    if (req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  } else if (process.env.NODE_ENV === "production") {
    console.error("[cron/summary] CRON_SECRET tanımsız — tur çalıştırılmadı.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  const today = new Date().toISOString().slice(0, 10);
  try {
    const rows = await db
      .selectDistinct({ userId: dailyStats.userId })
      .from(dailyStats)
      .where(and(gte(dailyStats.day, shiftDay(today, -7)), sql`${dailyStats.reviews} > 0 or ${dailyStats.xp} > 0`))
      .limit(500);
    let sent = 0;
    for (const r of rows) {
      try {
        const s = await weeklySummary(r.userId, today);
        if (!s.answers && !s.exercises && !s.lessonsPassed) continue;
        // Gelişim kartı Beceriler panosuna taşındı; eski #growth çıpası profilde yok.
        await sendToUser(r.userId, { title: "Haftalık özetin", body: s.text, url: "/skills", tag: "weekly-summary" });
        sent++;
        await track(r.userId, "push_sent", today, 0, "summary");
      } catch (err) {
        console.error("[cron/summary]", r.userId, err);
      }
    }
    console.log(`[cron/summary] hedef ${rows.length} · gönderilen ${sent}`);
    return NextResponse.json({ targets: rows.length, sent });
  } catch (err) {
    console.error("[cron/summary]", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
