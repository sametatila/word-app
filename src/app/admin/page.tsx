import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { loadInbox } from "@/lib/admin-inbox";
import { AdminDenied } from "./_ui/ui";
import { Inbox } from "./inbox";

export const metadata: Metadata = { title: "Gelen işler" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin — GELEN İŞLER: panel her gün açılıyor çünkü birilerine
 * dönmek gerekiyor; açılış o işin kendisi. Şikâyetler, içerik bildirimleri,
 * cevapsız 1-2★ yorumlar ve sistem uyarıları tek kuyrukta, geri dönüş
 * süresine göre sıralı (`lib/admin-inbox`). Sayılar ve eğilimler Genel
 * durumda (`/admin/durum`). Erişim ADMIN_EMAILS ile sınırlı.
 */
export default async function AdminInboxPage() {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Yönetim paneli" email={gate.email} />;
  return <Inbox inbox={await loadInbox()} />;
}
