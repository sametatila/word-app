import { NextResponse } from "next/server";
import { cronGate } from "@/lib/cron-auth";
import { recordCronRun } from "@/lib/cron-runs";
import { and, gte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats } from "@/lib/db/schema";
import { sendToUser } from "@/lib/push";
import { translate } from "@/lib/i18n/dict";
import { weeklySummary } from "@/lib/growth";
import { track } from "@/lib/events";
import { shiftDay } from "@/lib/session";
import { purgeExpiredRoleplayLogs } from "@/lib/lessons/log";
import { langOf } from "@/lib/social/notify";

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
  const basladi = Date.now();
  const denied = cronGate(req, "summary");
  /* KAPIDA DÜŞEN ÇAĞRI DA YAZILIYOR (bkz. lib/cron-runs). */
  if (denied) { void recordCronRun("summary", false, Date.now() - basladi, "denied"); return denied; }
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
        // Haftalık özet bildirimi ALICININ dilinde.
        const lang = await langOf(r.userId);
        const s = await weeklySummary(r.userId, today, undefined, lang);
        if (!s.answers && !s.exercises && !s.lessonsPassed) continue;
        // Gelişim/yetkinlik panosu profildedir (ProgressPanel) — özet oraya götürür.
        // Başlık da gövde gibi alıcının dilinde: gövde çevriliydi, başlık değil.
        /* Deneme ve teslimat ayrı: `sendToUser` kaç kanala ulaştığını
           döndürüyor (bkz. lib/events `push_deliver`). */
        const ulasan = await sendToUser(r.userId, { title: translate(lang, "push.weekly_summary_title"), body: s.text, url: "/profile", tag: "weekly-summary" });
        sent++;
        await track(r.userId, "push_sent", today, 0, "summary");
        if (ulasan > 0) await track(r.userId, "push_deliver", today, ulasan, "summary");
      } catch (err) {
        console.error("[cron/summary]", r.userId, err);
      }
    }
    // Saklama süresi dolan konuşma kayıtları (gizlilik politikası: 30 gün).
    // Özet turuna asılı çünkü zaten günlük çalışıyor; ayrı bir zamanlayıcı
    // kurmak yerine tek yerden yürütülüyor. Hatası özeti düşürmez.
    const purged = await purgeExpiredRoleplayLogs();
    const ozet = `hedef ${rows.length} · gönderilen ${sent} · silinen kayıt ${purged}`;
    console.log(`[cron/summary] ${ozet}`);
    void recordCronRun("summary", true, Date.now() - basladi, ozet);
    return NextResponse.json({ targets: rows.length, sent, purged });
  } catch (err) {
    console.error("[cron/summary]", err);
    void recordCronRun("summary", false, Date.now() - basladi, String((err as Error).message ?? err));
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
