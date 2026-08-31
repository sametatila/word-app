import { NextResponse } from "next/server";
import { cronGate } from "@/lib/cron-auth";
import { runAssessQueue } from "@/lib/assess";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Kuyruktaki değerlendirmeleri işler (WP-30). Hatırlatma cron'uyla aynı
 * yetki kuralı: `CRON_SECRET` Bearer; üretimde sırsız çalışmaz.
 */
export async function GET(req: Request) {
  const denied = cronGate(req, "assess");
  if (denied) return denied;
  try {
    const result = await runAssessQueue(20);
    console.log(`[cron/assess] bekleyen ${result.pending} · puanlanan ${result.done} · başarısız ${result.failed}`);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[cron/assess]", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
