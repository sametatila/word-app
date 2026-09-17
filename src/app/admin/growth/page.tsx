import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { appAdminData } from "@/lib/admin-app";
import { loadPanel, panelIssues } from "../_data";
import { GrowthSection } from "../dashboard";
import { AdminDenied } from "../_ui/ui";
import { PanelPage } from "../_ui/panel-page";

export const metadata: Metadata = { title: "Büyüme ve sosyal" };
export const dynamic = "force-dynamic";

/** lernomi.app/admin/growth — kim geliyor, kim kalıyor, kim gidiyor; sosyal katman ve rıza. */
export default async function AdminGrowthPage({ searchParams }: { searchParams: Promise<{ taze?: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Büyüme ve sosyal" email={gate.email} />;
  const [{ value, at }, app] = await Promise.all([loadPanel((await searchParams).taze === "1"), appAdminData()]);
  return (
    <PanelPage title="Büyüme ve sosyal" description="Seviye ve dil çifti dağılımı, misafir modu, sosyal özellikler, bildirim erişimi, giriş güvenliği, rıza ve hesap kaybı." href="/admin/growth" at={at} issues={[...panelIssues(value), ...app.issues]}>
      <GrowthSection data={value.data} coverage={value.coverage} deletions={app.deletions} />
    </PanelPage>
  );
}
