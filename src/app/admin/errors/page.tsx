import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
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
  if (!gate.ok) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-h1">Hatalar</h1>
        <p className="mt-3 text-body" style={{ color: "var(--text-muted)" }}>Yönetim yetkisi gerekiyor.</p>
      </div>
    );
  }
  const { all } = await searchParams;
  return <ErrorsAdmin groups={await listErrorGroups(all === "1")} showAll={all === "1"} />;
}
