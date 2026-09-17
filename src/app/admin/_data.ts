import "server-only";
import { getAdminData } from "@/lib/admin";
import { getServerMetrics } from "@/lib/server-metrics";
import { getCoverage } from "@/lib/admin-coverage";
import { openReportCount } from "@/lib/moderation-admin";
import { cached } from "@/lib/admin-query";
import { revenueMetrics } from "@/lib/premium/revenue";
import { weeklyTrends } from "@/lib/admin-trends";
import { collectAlerts, type Alert } from "@/lib/alerts";

/**
 * Panelin ORTAK veri yükü — Durum, Gelir, Büyüme, Deneyim, Öğrenme ve Sunucu
 * sayfaları aynı hesaplamayı paylaşıyor.
 *
 * Bu altı sayfa eskiden tek panonun sekmeleriydi ve veri tek seferde
 * çekiliyordu. Sayfalara bölününce her sayfanın kendi ~70 sorgusunu ayrı
 * çalıştırması gezinmeyi yavaşlatırdı. 60 saniyelik önbellek (`cached`) tek
 * hesaplamayı paylaştırıyor; `?taze=1` atlıyor.
 */
export async function loadPanel(fresh = false) {
  return cached("admin:dashboard", 60_000, fresh, async () => {
    const [data, server, coverage, openReports, revenue, trends] = await Promise.all([getAdminData(), getServerMetrics(), getCoverage(), openReportCount(), revenueMetrics(), weeklyTrends()]);
    return { data, server, coverage, openReports, revenue, trends };
  });
}

export type PanelData = Awaited<ReturnType<typeof loadPanel>>["value"];

/** Sorgu hataları: bir bölüm "veri yok" değil BOZUK görünsün. */
export function panelIssues(v: PanelData) {
  return [...v.data.issues, ...v.coverage.issues, ...v.revenue.issues, ...v.trends.issues];
}

/**
 * Uyarılar — TELEGRAM'LA AYNI KAYNAK (`lib/alerts` `collectAlerts`).
 *
 * Pano eskiden kendi alarm listesini ayrı kurallarla hesaplıyordu: yeni hata
 * grubu, çökme eşiği, düşük puanlı yorum, kapalı yapay zekâ sağlayıcısı,
 * bekleyen şikâyet Telegram'a gidiyor ama panoda görünmüyordu. İki listenin
 * ayrışması, telefona "kritik" düşerken panelin "alarm yok" demesiydi.
 */
export async function loadAlerts(fresh = false): Promise<{ value: Alert[]; at: number }> {
  return cached("admin:alerts", 60_000, fresh, () => collectAlerts());
}
