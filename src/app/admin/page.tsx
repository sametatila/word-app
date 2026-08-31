import type { Metadata } from "next";
import { adminGate, getAdminData } from "@/lib/admin";
import { getServerMetrics } from "@/lib/server-metrics";
import { AdminDashboard } from "./dashboard";

export const metadata: Metadata = { title: "Yönetim" };
export const dynamic = "force-dynamic";

/**
 * exfe.me/admin — sahibin yönetim panosu. Sekmeli: Genel Bakış, Sunucu & Ops,
 * Kullanıcı Deneyimi, Öğrenme & İçerik, Kullanıcılar, Loglar. Veri sunucuda tek
 * seferde çekilir; erişim ADMIN_EMAILS ile sınırlı (admin olmayana ret).
 */
export default async function AdminPage() {
  const gate = await adminGate();
  if (!gate.ok) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-2xl font-extrabold">Yönetim panosu</h1>
        {gate.email ? (
          <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
            Bu hesap (<b>{gate.email}</b>) yönetim yetkisine sahip değil. Admin e-postasıyla giriş yap.
          </p>
        ) : (
          <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
            Önce giriş yap, sonra admin e-postasıyla bu sayfaya dön.
          </p>
        )}
      </div>
    );
  }

  const [data, server] = await Promise.all([getAdminData(), getServerMetrics()]);
  return <AdminDashboard data={data} server={server} />;
}
