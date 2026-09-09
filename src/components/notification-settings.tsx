"use client";

import { BellIcon } from "@/components/icons";
import { PushSettings } from "@/components/push-settings";
import { SoundSettings } from "@/components/sound-settings";
import { useT } from "@/lib/i18n/client";

/**
 * Hatırlatma ayarları — mobil `NotificationsScreen`in web karşılığı.
 *
 * ÜST BLOK MOBİLDEKİYLE AYNI: zil karosu, "Hatırlatmalar" başlığı ve tek
 * cümlelik gerekçe. Ekranın tamamı bir izin isteği ve izni veren kişinin
 * sorusu "ne kadar sık" — o cümle onu cevaplıyor.
 *
 * ANAHTAR SAYISI FARKLI ve bu bir yerleşim tercihi değil: mobildeki üç
 * kategori (günlük hatırlatma + saati, seri koruma, haftalık sınav) CİHAZDA
 * kurulan yerel bildirimler. Web'de bildirim sunucudan gidiyor
 * (`lib/push` · `runReminders`) ve orada şimdilik tek bir günlük kanal var;
 * kategoriler kullanıcı başına tercih ve iki yeni zamanlanmış iş demek.
 * Açık kalem olarak `docs/plan/web-parity.md` §7'de yazılı.
 */
export function NotificationSettings() {
  const t = useT();
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center px-2 text-center">
        <span
          className="flex h-[72px] w-[72px] items-center justify-center rounded-card text-white shadow-soft"
          style={{ background: "var(--color-sky-500)" }}
        >
          <BellIcon size={36} />
        </span>
        <h2 className="mt-3 text-h2">{t("notifications.reminders")}</h2>
        <p className="muted mt-1">{t("notifications.gentle_nudges_to_keep_your")}</p>
      </div>

      <section className="card divide-y divide-[color:var(--hairline)] overflow-hidden">
        <PushSettings bare />
        {/* Oyun sesleri de bir "ne zaman rahatsız edilirim" ayarı; uygulama
            ayarlarında bildirim anahtarının hemen altındaydı, birlikte
            geliyorlar. */}
        <SoundSettings bare />
      </section>
    </div>
  );
}
