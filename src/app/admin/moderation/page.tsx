import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { AdminDenied } from "../_ui/ui";
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
  if (!gate.ok) return <AdminDenied title="Moderasyon" email={gate.email} />;

  return <ModerationAdmin data={await moderationData()} />;
}
