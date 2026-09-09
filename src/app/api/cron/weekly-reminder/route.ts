import { NextResponse } from "next/server";
import { cronGate } from "@/lib/cron-auth";
import { runWeeklyReminders } from "@/lib/push";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // web-push Node API'lerine dayanıyor
export const maxDuration = 60;

/**
 * Haftalık sınav çağrısı — pazar akşamı. Mobilde cihazda kurulan üçüncü
 * hatırlatma (`NotificationsScreen` › "Haftalık sınav").
 *
 * Zamanlayıcı sunucuda: `lernomi-cron-weekly` (bkz. AGENTS.md). Pazartesi
 * sabahki `lernomi-cron-summary` ile karıştırılmamalı — o haftalık ÖZETİ
 * yazıyor, bu sınava çağırıyor.
 */
export async function GET(req: Request) {
  const denied = cronGate(req, "weekly-reminder");
  if (denied) return denied;

  try {
    const result = await runWeeklyReminders();
    console.log(`[cron/weekly-reminder] hedef ${result.targets} · gönderilen ${result.sent}`);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[cron/weekly-reminder]", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
