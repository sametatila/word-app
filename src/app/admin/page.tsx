import type { Metadata } from "next";
import { adminGate, getAdminData } from "@/lib/admin";
import { getServerMetrics } from "@/lib/server-metrics";
import { getCoverage } from "@/lib/admin-coverage";
import { openReportCount } from "@/lib/moderation-admin";
import { cached } from "@/lib/admin-query";
import { AdminDashboard } from "./dashboard";

export const metadata: Metadata = { title: "Yönetim" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin — sahibin yönetim panosu. Sekmeli: Genel Bakış, Sunucu & Ops,
 * Kullanıcı Deneyimi, Öğrenme & İçerik, Büyüme & Sosyal, Kullanıcılar, Loglar. Veri sunucuda tek
 * seferde çekilir; erişim ADMIN_EMAILS ile sınırlı (admin olmayana ret).
 */
export default async function AdminPage({ searchParams }: { searchParams: Promise<{ taze?: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-h1">Yönetim panosu</h1>
        {gate.email ? (
          <p className="mt-3 text-body" style={{ color: "var(--text-muted)" }}>
            Bu hesap (<b>{gate.email}</b>) yönetim yetkisine sahip değil. Admin e-postasıyla giriş yap.
          </p>
        ) : (
          <p className="mt-3 text-body" style={{ color: "var(--text-muted)" }}>
            Önce giriş yap, sonra admin e-postasıyla bu sayfaya dön.
          </p>
        )}
      </div>
    );
  }

  /*
    60 SANİYELİK ÖNBELLEK (lib/admin-query `cached`). Pano her açılışta ~70
    sorgu çalıştırıyordu; aynı dakikada açılan sekmeler ve yenilemeler artık
    tek hesaplamayı paylaşıyor. `?taze=1` önbelleği atlıyor.
  */
  const fresh = (await searchParams).taze === "1";
  const { value, at } = await cached("admin:dashboard", 60_000, fresh, async () => {
    const [data, server, coverage, openReports] = await Promise.all([getAdminData(), getServerMetrics(), getCoverage(), openReportCount()]);
    return { data, server, coverage, openReports };
  });
  const ageSec = Math.round((Date.now() - at) / 1000);
  const issues = value.data.issues;
  return (
    <>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 px-4 pt-3 text-caption" style={{ color: "var(--text-muted)" }}>
        <span>{ageSec < 2 ? "Veri şimdi hesaplandı" : `Veri ${ageSec} sn önce hesaplandı`}</span>
        <a href="/admin?taze=1" className="chip h-7 px-2">Tazele</a>
      </div>
      {/* SESSİZ KIRILMA GÖRÜNÜR: başarısız sorgu varsa o bölümler "veri yok"
          değil, bozuk. */}
      {issues.length ? (
        <div role="alert" className="mx-auto mt-2 w-full max-w-6xl rounded-card border px-4 py-2 text-caption" style={{ borderColor: "#dc2626", color: "#dc2626" }}>
          <b>{issues.length} sorgu başarısız</b> — ilgili bölümler eksik görünür:
          <ul className="mt-1 list-disc pl-5">{issues.slice(0, 6).map((i, n) => <li key={n}>{i.source}: {i.message}</li>)}</ul>
        </div>
      ) : null}
      <AdminDashboard data={value.data} server={value.server} coverage={value.coverage} openReports={value.openReports} />
    </>
  );
}
