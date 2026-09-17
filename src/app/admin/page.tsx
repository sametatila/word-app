import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { loadAlerts, loadPanel, panelIssues } from "./_data";
import { StatusSection } from "./dashboard";
import { AdminDenied } from "./_ui/ui";
import { PanelPage } from "./_ui/panel-page";

export const metadata: Metadata = { title: "Yönetim" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin — GENEL DURUM: "her şey yolunda mı" sorusunun tek cevabı.
 *
 * En üstte Telegram'a giden uyarı motorunun listesi, altında haftalık
 * karşılaştırma, temel sayılar ve etkinlik. Ayrıntı menünün gruplarında
 * (Kullanıcılar, Gelir, İçerik, İşletim). Erişim ADMIN_EMAILS ile sınırlı.
 */
export default async function AdminHomePage({ searchParams }: { searchParams: Promise<{ taze?: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Yönetim paneli" email={gate.email} />;
  const fresh = (await searchParams).taze === "1";
  const [{ value, at }, alerts] = await Promise.all([loadPanel(fresh), loadAlerts(fresh)]);
  return (
    <PanelPage title="Genel durum" description="Uyarılar (Telegram'la aynı kaynak), son 7 gün, temel sayılar." href="/admin" at={at} issues={panelIssues(value)}>
      <StatusSection data={value.data} coverage={value.coverage} openReports={value.openReports} trends={value.trends.metrics} alerts={alerts.value} />
    </PanelPage>
  );
}
