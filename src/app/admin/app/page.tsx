import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
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
  if (!gate.ok) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-h1">Uygulama işletimi</h1>
        <p className="mt-3 text-body" style={{ color: "var(--text-muted)" }}>
          {gate.email ? `Bu hesap (${gate.email}) yönetim yetkisine sahip değil.` : "Önce admin e-postasıyla giriş yap."}
        </p>
      </div>
    );
  }
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
