import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { AdminDenied } from "../_ui/ui";
import { listErrorGroups } from "@/lib/client-errors";
import { ErrorsAdmin } from "./errors-admin";
import { loadPanel } from "../_data";
import { ClientErrorsByScreen } from "../dashboard";

export const metadata: Metadata = { title: "Hatalar" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/errors — istemci hata grupları (web + mobil JS).
 *
 * Native çökmeler burada değil: Firebase Crashlytics konsolunda (Android ve
 * iOS). Burada mesaj, yığın, ekran ve sürümle gruplanmış JS hataları; yeni
 * grup ayrıca Telegram uyarısına düşüyor (lib/alerts).
 */
export default async function AdminErrorsPage({ searchParams }: { searchParams: Promise<{ all?: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Hatalar" email={gate.email} />;
  const { all } = await searchParams;
  const [groups, panel] = await Promise.all([listErrorGroups(all === "1"), loadPanel()]);
  /* Ekrana göre dağılım panonun "Olaylar" sekmesindeydi, grupların kendisi
     burada: aynı sorunun iki yüzü iki ayrı yerde okunuyordu. */
  return <ErrorsAdmin groups={groups} showAll={all === "1"} top={<ClientErrorsByScreen data={panel.value.data} days={30} />} />;
}
