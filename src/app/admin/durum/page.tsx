import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { QUEUE_ALERT_FAMILIES } from "@/lib/admin-inbox-shared";
import { loadAlerts, loadOverview, loadPanel, loadResponses, panelIssues, parseRange } from "../_data";
import { AdminDenied } from "../_ui/ui";
import { PanelPage } from "../_ui/panel-page";
import { OverviewSection } from "./overview";

export const metadata: Metadata = { title: "Genel durum" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/durum — GENEL DURUM: işler nasıl gidiyor. Seçili aralık
 * ve önceki dönemle: göstergeler, büyüme ve tutma, öğrenme, gelir, kırılım
 * (`./overview`). Panelin açılışı Gelen işler (`/admin`). Erişim ADMIN_EMAILS ile sınırlı.
 */
export default async function AdminStatusPage({ searchParams }: { searchParams: Promise<{ taze?: string; aralik?: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Genel durum" email={gate.email} />;
  const sp = await searchParams;
  const fresh = sp.taze === "1";
  const days = parseRange(sp.aralik);
  const [{ value, at }, alerts, responses, ov] = await Promise.all([loadPanel(fresh, days), loadAlerts(fresh), loadResponses(fresh), loadOverview(fresh, days)]);
  const openInbox = responses.value.reduce((a, q) => a + q.open, 0) + alerts.value.filter((a) => !QUEUE_ALERT_FAMILIES.has(a.key.split(":")[0])).length;
  return (
    <PanelPage title="Genel durum" description="Seçili aralıkta büyüme, tutma, öğrenme ve gelir; her sayı önceki dönemle." href="/admin/durum" at={at} issues={[...panelIssues(value), ...ov.value.issues]} days={days}>
      <OverviewSection o={ov.value} alerts={alerts.value} server={value.server} revenue={value.revenue} data={value.data} openInbox={openInbox} />
    </PanelPage>
  );
}
