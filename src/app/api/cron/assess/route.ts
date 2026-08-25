import { NextResponse } from "next/server";
import { runAssessQueue } from "@/lib/assess";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Kuyruktaki değerlendirmeleri işler (WP-30). Hatırlatma cron'uyla aynı
 * yetki kuralı: `CRON_SECRET` Bearer; üretimde sırsız çalışmaz.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    if (req.headers.get("authorization") !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    console.error("[cron/assess] CRON_SECRET tanımsız — tur çalıştırılmadı.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  try {
    const result = await runAssessQueue(20);
    console.log(`[cron/assess] bekleyen ${result.pending} · puanlanan ${result.done} · başarısız ${result.failed}`);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[cron/assess]", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
