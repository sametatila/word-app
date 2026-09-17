import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { moderationData } from "@/lib/moderation-admin";
import { ModerationAdmin } from "./moderation-admin";

export const metadata: Metadata = { title: "Moderasyon" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/moderation — şikâyet kuyruğu.
 *
 * Panonun "Loglar" sekmesinde yalnız içerik bildirimleri okunabiliyordu;
 * kullanıcı şikâyetleri hiçbir yerde görünmüyordu ve hiçbiri kapatılamıyordu.
 * Kapatma bir YAZMA olduğu için premium ve hukuki metinler gibi ayrı sayfada.
 */
export default async function AdminModerationPage() {
  const gate = await adminGate();
  if (!gate.ok) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-h1">Moderasyon</h1>
        <p className="mt-3 text-body" style={{ color: "var(--text-muted)" }}>
          {gate.email ? `Bu hesap (${gate.email}) yönetim yetkisine sahip değil.` : "Önce admin e-postasıyla giriş yap."}
        </p>
      </div>
    );
  }

  return <ModerationAdmin data={await moderationData()} />;
}
