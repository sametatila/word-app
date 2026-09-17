import type { Metadata } from "next";
import { adminGate, getAdminData } from "@/lib/admin";
import { getServerMetrics } from "@/lib/server-metrics";
import { getCoverage } from "@/lib/admin-coverage";
import { openReportCount } from "@/lib/moderation-admin";
import { cached } from "@/lib/admin-query";
import { revenueMetrics } from "@/lib/premium/revenue";
import { weeklyTrends } from "@/lib/admin-trends";
import { AdminDashboard } from "./dashboard";
import { AdminDenied, AdminPage, BTN, Notice, PageHeader } from "./_ui/ui";

export const metadata: Metadata = { title: "Yönetim" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin — sahibin yönetim panosu. Sekmeli: Genel bakış, Sunucu,
 * Deneyim, Öğrenme, Büyüme, Olaylar. Veri sunucuda tek seferde çekilir; erişim
 * ADMIN_EMAILS ile sınırlı (admin olmayana ret). Kullanıcı listesi kendi
 * sayfasında (/admin/users).
 */
export default async function AdminHomePage({ searchParams }: { searchParams: Promise<{ taze?: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Yönetim panosu" email={gate.email} />;

  /*
    60 SANİYELİK ÖNBELLEK (lib/admin-query `cached`). Pano her açılışta ~70
    sorgu çalıştırıyordu; aynı dakikada açılan sekmeler ve yenilemeler artık
    tek hesaplamayı paylaşıyor. `?taze=1` önbelleği atlıyor.
  */
  const fresh = (await searchParams).taze === "1";
  const { value, at } = await cached("admin:dashboard", 60_000, fresh, async () => {
    const [data, server, coverage, openReports, revenue, trends] = await Promise.all([getAdminData(), getServerMetrics(), getCoverage(), openReportCount(), revenueMetrics(), weeklyTrends()]);
    return { data, server, coverage, openReports, revenue, trends };
  });
  const ageSec = Math.round((Date.now() - at) / 1000);
  const issues = [...value.data.issues, ...value.coverage.issues, ...value.revenue.issues, ...value.trends.issues];
  return (
    <AdminPage>
      <PageHeader
        title="Pano"
        description="Canlı veriler: web ve mobil kullanım, gelir, sunucu, telemetri."
        meta={ageSec < 2 ? "Veri şimdi hesaplandı" : `Veri ${ageSec} sn önce hesaplandı (60 sn önbellek)`}
        actions={<a href="/admin?taze=1" className={BTN.secondary}>Tazele</a>}
      />
      {/* SESSİZ KIRILMA GÖRÜNÜR: başarısız sorgu varsa o bölümler "veri yok"
          değil, bozuk. */}
      {issues.length ? (
        <Notice tone="bad" title={`${issues.length} sorgu başarısız — ilgili bölümler eksik görünür`}>
          <ul className="list-disc pl-5 text-caption">{issues.slice(0, 6).map((i, n) => <li key={n}>{i.source}: {i.message}</li>)}</ul>
        </Notice>
      ) : null}
      <AdminDashboard data={value.data} server={value.server} coverage={value.coverage} openReports={value.openReports} revenue={value.revenue} trends={value.trends.metrics} />
    </AdminPage>
  );
}
