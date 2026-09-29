import { titleMeta } from "@/lib/page-meta";
import { getT } from "@/lib/i18n/server";
import { NotificationSettings } from "@/components/notification-settings";
import { SettingsPanelTitle } from "@/components/settings-section";

export const dynamic = "force-dynamic";
export const generateMetadata = titleMeta("notifications.reminders");

/**
 * Ayarlar › Hatırlatmalar (2026-09-29 Samet: web ayarlar masaüstü düzeni).
 *
 * `/notifications` ayarların dışında, kendi başına bir sayfaydı: masaüstünde
 * sol menü yoktu, kabuğun menüsünde "Ayarlar" seçili görünmüyordu ve ortalı
 * ikon kahramanı telefonun izin ekranı gibi duruyordu. Artık öteki gruplar
 * gibi çerçevenin içinde (`../layout.tsx`); eski adres buraya yönleniyor.
 * Ortalı karo yalnız telefonda. Mobilde karşılığı ayrı ekran
 * (`NotificationsScreen`), web'de ayarların paneli.
 */
export default async function RemindersSettingsPage() {
  const t = await getT();
  return (
    <div className="w-full space-y-4">
      <SettingsPanelTitle title={t("notifications.reminders")} />
      <div className="mx-auto w-full max-w-3xl">
        <NotificationSettings />
      </div>
    </div>
  );
}
