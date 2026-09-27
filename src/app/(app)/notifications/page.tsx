import { PageBack } from "@/components/page-back";
import { titleMeta } from "@/lib/page-meta";
import { NotificationSettings } from "@/components/notification-settings";
import { getT } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";
export const generateMetadata = titleMeta("notifications.notifications");
/**
 * Bildirimler — HATIRLATMA AYARLARI, gelen kutusu değil.
 *
 * Bu adres `<Inbox />`i çiziyordu, yani `/inbox` ile birebir aynı şeyi. Profil
 * menüsündeki iki satır ("Gelen kutusu", "Bildirimler") aynı ekrana çıkıyordu.
 * Mobilde ayrım net: `InboxScreen` gelen sosyal olaylar, `NotificationsScreen`
 * ise hatırlatmaların anahtarları. Web de öyle.
 */
export default async function NotificationsPage() {
  const t = await getT();
  return (
    <div className="mx-auto w-full max-w-3xl">
      <PageBack fallback="/profile" title={t("notifications.notifications")} />
      <NotificationSettings />
    </div>
  );
}
