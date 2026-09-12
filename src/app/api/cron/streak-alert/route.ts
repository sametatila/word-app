import { NextResponse } from "next/server";
import { cronGate } from "@/lib/cron-auth";
import { recordCronRun } from "@/lib/cron-runs";
import { runStreakAlerts } from "@/lib/push";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // web-push Node API'lerine dayanıyor
export const maxDuration = 60;

/**
 * Seri koruma turu — akşam. Mobilde bu bildirim cihazda kuruluyor
 * (`NotificationsScreen` › "Seri koruma"); web'de sunucudan gidiyor.
 *
 * Zamanlayıcı sunucuda: `lernomi-cron-streak` (bkz. AGENTS.md).
 * Uç herkese açık bir adreste olduğu için `CRON_SECRET` ile korunuyor.
 */
export async function GET(req: Request) {
  const basladi = Date.now();
  const denied = cronGate(req, "streak-alert");
  if (denied) { void recordCronRun("streak-alert", false, Date.now() - basladi, "denied"); return denied; }

  try {
    const result = await runStreakAlerts();
    const ozet = `hedef ${result.targets} · gönderilen ${result.sent}`;
    console.log(`[cron/streak-alert] ${ozet}`);
    void recordCronRun("streak-alert", true, Date.now() - basladi, ozet);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[cron/streak-alert]", err);
    void recordCronRun("streak-alert", false, Date.now() - basladi, String((err as Error).message ?? err));
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
