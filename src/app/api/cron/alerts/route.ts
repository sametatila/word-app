import { NextResponse } from "next/server";
import { cronGate } from "@/lib/cron-auth";
import { recordCronRun } from "@/lib/cron-runs";
import { runAlerts } from "@/lib/alerts";
import { refreshRollups } from "@/lib/admin-query";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Uyarı motoru — systemd timer (`lernomi-cron-alerts`, 10 dakikada bir).
 * Gerekçe ve kurallar `lib/alerts.ts`te; uygulama tamamen düşerse devreye
 * giren ikinci katman sunucudaki `/opt/lernomi/watchdog.sh`.
 */
export async function GET(req: Request) {
  const basladi = Date.now();
  const denied = cronGate(req, "alerts");
  if (denied) { void recordCronRun("alerts", false, Date.now() - basladi, "denied"); return denied; }

  try {
    // Özet tablo tazeleme de bu koşuda: panelin okuduğu `reviews_daily` en çok 10 dk geride.
    await refreshRollups().catch((err) => console.error("[cron/alerts] özet tablo", err));
    const result = await runAlerts();
    const ozet = `aktif ${result.active} · gönderilen ${result.sent} · düzelen ${result.resolved}${result.configured ? "" : " · telegram kapalı"}`;
    void recordCronRun("alerts", true, Date.now() - basladi, ozet);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[cron/alerts]", err);
    void recordCronRun("alerts", false, Date.now() - basladi, String((err as Error).message ?? err));
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
