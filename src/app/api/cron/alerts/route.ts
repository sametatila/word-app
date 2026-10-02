import { NextResponse } from "next/server";
import { cronGate } from "@/lib/cron-auth";
import { recordCronRun } from "@/lib/cron-runs";
import { runAlerts, type Alert } from "@/lib/alerts";
import { refreshRollups } from "@/lib/admin-query";
import { promoteDueDrafts } from "@/lib/content/publish";

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
    /* Yan işlerin hataları da Telegram'a: eskiden yalnız sunucu günlüğüne
       düşüyordu ve zamanlı içerik sürümü canlıya çıkmadığında kimse görmüyordu. */
    const extra: Alert[] = [];
    // Özet tablo tazeleme de bu koşuda: panelin okuduğu `reviews_daily` en çok 10 dk geride.
    await refreshRollups().catch((err) => {
      console.error("[cron/alerts] özet tablo", err);
      extra.push({ key: "rollup", level: "uyari", text: `Panelin özet tablosu (reviews_daily) tazelenemedi: ${String((err as Error).message ?? err).slice(0, 160)}` });
    });
    /* ZAMANLI İÇERİK YAYINI da bu koşuda: `content_releases.goLiveAt` alanı
       panelde görünüyordu ama onu canlıya alan hiçbir şey yoktu. Ayrı bir
       timer hak edecek kadar sık değil — gecikme en fazla on dakika. */
    const due = await promoteDueDrafts().catch((err) => {
      console.error("[cron/alerts] zamanlı içerik yayını", err);
      extra.push({ key: "content:promote", level: "kritik", text: `Zamanlı içerik sürümü canlıya alınamadı: ${String((err as Error).message ?? err).slice(0, 160)}` });
      return { promoted: null as number | null };
    });
    const result = await runAlerts(extra);
    const ozet =
      `aktif ${result.active} · gönderilen ${result.sent} · düzelen ${result.resolved}` +
      `${result.configured ? "" : " · telegram kapalı"}${result.failed ? ` · TELEGRAM'A GİDEMEYEN ${result.failed} satır (sonraki koşuda yeniden)` : ""}` +
      `${due.promoted ? ` · içerik sürüm ${due.promoted} canlıya alındı` : ""}`;
    /* Telegram'a gidemeyen satır varsa koşu başarısız sayılıyor: panelde kırmızı görünsün. */
    void recordCronRun("alerts", result.failed === 0, Date.now() - basladi, ozet);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[cron/alerts]", err);
    void recordCronRun("alerts", false, Date.now() - basladi, String((err as Error).message ?? err));
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
