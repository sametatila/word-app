import { NextResponse } from "next/server";
import { cronGate } from "@/lib/cron-auth";
import { recordCronRun } from "@/lib/cron-runs";
import { runAssessQueue } from "@/lib/assess";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Kuyruktaki değerlendirmeleri işler (WP-30). Hatırlatma cron'uyla aynı
 * yetki kuralı: `CRON_SECRET` Bearer; üretimde sırsız çalışmaz.
 */
export async function GET(req: Request) {
  const basladi = Date.now();
  const denied = cronGate(req, "assess");
  if (denied) { void recordCronRun("assess", false, Date.now() - basladi, "denied"); return denied; }
  try {
    const result = await runAssessQueue(20);
    /* Cümle tek yerde (bkz. cron/reminders). */
    const ozet = `bekleyen ${result.pending} · puanlanan ${result.done} · başarısız ${result.failed}`;
    console.log(`[cron/assess] ${ozet}`);
    void recordCronRun("assess", true, Date.now() - basladi, ozet);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[cron/assess]", err);
    void recordCronRun("assess", false, Date.now() - basladi, String((err as Error).message ?? err));
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
