import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { loadPanel, panelIssues, parseRange } from "../_data";
import { ExperienceSection } from "../dashboard";
import { AdminDenied } from "../_ui/ui";
import { PanelPage } from "../_ui/panel-page";

export const metadata: Metadata = { title: "Deneyim" };
export const dynamic = "force-dynamic";

/** lernomi.app/admin/experience — kullanıcı uygulamayı nasıl yaşıyor: ekranlar, akışlar, teslimler, ham telemetri. */
export default async function AdminExperiencePage({ searchParams }: { searchParams: Promise<{ taze?: string; aralik?: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Deneyim" email={gate.email} />;
  const sp = await searchParams;
  const days = parseRange(sp.aralik);
  const { value, at } = await loadPanel(sp.taze === "1", days);
  return (
    <PanelPage title="Deneyim" description="Platform, ekran ve tur kullanımı, onboarding, ses ve yürüyüş modu, bildirim ve e-posta teslimi, ham telemetri." href="/admin/experience" at={at} issues={panelIssues(value)} days={days}>
      <ExperienceSection days={days} data={value.data} coverage={value.coverage} />
    </PanelPage>
  );
}
