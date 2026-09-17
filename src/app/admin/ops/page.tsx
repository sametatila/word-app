import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { loadPanel, panelIssues } from "../_data";
import { OpsSection } from "../dashboard";
import { AdminDenied } from "../_ui/ui";
import { PanelPage } from "../_ui/panel-page";

export const metadata: Metadata = { title: "Sunucu" };
export const dynamic = "force-dynamic";

/** lernomi.app/admin/ops — sunucu, yedek, zamanlanmış işler, veritabanı, istek sağlığı, yapay zekâ sağlayıcıları. */
export default async function AdminOpsPage({ searchParams }: { searchParams: Promise<{ taze?: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Sunucu" email={gate.email} />;
  const { value, at } = await loadPanel((await searchParams).taze === "1");
  return (
    <PanelPage title="Sunucu" description="Yedek, kaynaklar, deploy, zamanlanmış işler, veritabanı, istek sağlığı ve yapay zekâ sağlayıcıları." href="/admin/ops" at={at} issues={panelIssues(value)}>
      <OpsSection data={value.data} coverage={value.coverage} server={value.server} />
    </PanelPage>
  );
}
