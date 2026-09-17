import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { AdminDenied } from "../_ui/ui";
import { appControl } from "@/lib/app-control";
import { appAdminData } from "@/lib/admin-app";
import { listBroadcasts, lastBroadcastAt, BROADCAST_COOLDOWN_H } from "@/lib/push-broadcast";
import { AppAdmin } from "./app-admin";

export const metadata: Metadata = { title: "Uygulama işletimi" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/app — uygulamanın işletimi.
 *
 * Kod değiştirmeden, mağaza sürümü beklemeden verilmesi gereken kararlar:
 * zorunlu/önerilen güncelleme, bakım modu, mağaza bağlantıları, toplu
 * bildirim. Yanında bu kararların dayanağı: kim hangi sürümde, kaç hesap
 * silindi, kim askıda.
 */
export default async function AdminAppPage() {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Uygulama işletimi" email={gate.email} />;
  const [control, data, broadcasts, last] = await Promise.all([appControl(), appAdminData(), listBroadcasts(), lastBroadcastAt().catch(() => null)]);
  return (
    <AppAdmin
      control={control}
      data={data}
      broadcasts={broadcasts}
      nextBroadcastAt={last ? new Date(last.getTime() + BROADCAST_COOLDOWN_H * 3_600_000).toISOString() : null}
    />
  );
}
