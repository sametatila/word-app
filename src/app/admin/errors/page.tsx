import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { AdminDenied } from "../_ui/ui";
import { listErrorGroups } from "@/lib/client-errors";
import { ErrorsAdmin } from "./errors-admin";

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
  return <ErrorsAdmin groups={await listErrorGroups(all === "1")} showAll={all === "1"} />;
}
