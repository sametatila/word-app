import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { loadPanel, panelIssues, parseRange } from "../_data";
import { RevenueSection } from "../dashboard";
import { AdminDenied } from "../_ui/ui";
import { PanelPage } from "../_ui/panel-page";

export const metadata: Metadata = { title: "Gelir ve huniler" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/revenue — para tek ekranda.
 *
 * Gelir panoda, satın alma hunileri Deneyim sekmesinde, premium sayıları
 * Büyüme sekmesinde duruyordu: "premium işe yarıyor mu" sorusu dört ekran
 * istiyordu. Ayarlar (limitler, kodlar) Premium ayarları sayfasında.
 */
export default async function AdminRevenuePage({ searchParams }: { searchParams: Promise<{ taze?: string; aralik?: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Gelir ve huniler" email={gate.email} />;
  const sp = await searchParams;
  const days = parseRange(sp.aralik);
  const { value, at } = await loadPanel(sp.taze === "1", days);
  return (
    <PanelPage title="Gelir ve huniler" description="Gelir, abonelik, deneme dönüşümü, tutma ve satın alma hunileri (uygulama içi ve web'den uygulamaya)." href="/admin/revenue" at={at} issues={panelIssues(value)} days={days}>
      <RevenueSection days={days} data={value.data} coverage={value.coverage} revenue={value.revenue} />
    </PanelPage>
  );
}
