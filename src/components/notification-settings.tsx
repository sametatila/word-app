"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { BellIcon } from "@/components/icons";
import { SettingRow, Switch } from "@/components/setting-row";
import { PushSettings } from "@/components/push-settings";
import { useT } from "@/lib/i18n/client";
import { track } from "@/lib/track";

type Prefs = { daily: boolean; hour: number; streak: boolean; weekly: boolean };

/** Mobildeki saat çipleriyle aynı beş seçenek (`NotificationsScreen` TIMES). */
const HOURS = [9, 12, 15, 19, 21];

/**
 * Hatırlatma ayarları — mobil `NotificationsScreen`in web karşılığı.
 *
 * ÜST BLOK MOBİLDEKİYLE AYNI: zil karosu, "Hatırlatmalar" başlığı ve tek
 * cümlelik gerekçe. Ekranın tamamı bir izin isteği ve izni veren kişinin
 * sorusu "ne kadar sık" — o cümle onu cevaplıyor.
 *
 * ÜÇ ANAHTAR DA MOBİLDEKİLER: günlük hatırlatma (açıkken saat çipleri), seri
 * koruma, haftalık sınav. Mobilde bunlar cihazda kurulan yerel bildirimler;
 * web'de sunucudan gidiyor, o yüzden tercih `profiles`ta duruyor ve iki
 * tarayıcıda aynı görünüyor.
 *
 * ÜÇÜ DE PUSH İZNİNE BAĞLI. İzin yoksa anahtarları göstermek, çevrildiğinde
 * hiçbir şey yapmayan bir düğme göstermek olurdu; o durumda ekran yalnız
 * izin satırını ve ne yapılması gerektiğini gösteriyor (bkz. `PushSettings`).
 */
export function NotificationSettings() {
  const t = useT();
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [pushOn, setPushOn] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await apiFetch("/api/notifications/prefs", { cache: "no-store" });
        if (res.ok && alive) setPrefs((await res.json()) as Prefs);
      } catch {
        /* okunamazsa anahtarlar çizilmiyor; ekran yine açılıyor */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  async function patch(next: Partial<Prefs>) {
    // İyimser yazma: anahtar hemen dönüyor. Sunucu reddederse bir sonraki
    // açılışta gerçek değer geliyor — bekleyen bir anahtar, dokunulduğunu
    // hissettirmeyen bir anahtardır.
    setPrefs((cur) => (cur ? { ...cur, ...next } : cur));
    try {
      const res = await apiFetch("/api/notifications/prefs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(next),
      });
      if (res.ok) setPrefs((await res.json()) as Prefs);
    } catch {
      /* ağ yoksa yerel durum kalıyor */
    }
  }

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
        <PushSettings bare onState={setPushOn} />

        {pushOn && prefs ? (
          <>
            <div>
              <SettingRow
                title={t("notifications.daily_reminder")}
                sub={
                  prefs.daily
                    ? t("notifications.daily_on", { time: `${String(prefs.hour).padStart(2, "0")}:00` })
                    : t("notifications.daily_off")
                }
              >
                <Switch
                  on={prefs.daily}
                  onChange={(on) => {
                    track("setting_change", on ? 1 : 0, "remind_daily");
                    void patch({ daily: on });
                  }}
                  label={t("notifications.daily_reminder")}
                />
              </SettingRow>
              {/* Saat çipleri yalnız anahtar AÇIKKEN: kapalı bir hatırlatmanın
                  saatini sormak, cevabı hiçbir şeyi değiştirmeyen bir soru. */}
              {prefs.daily ? (
                <div className="px-4 pb-3">
                  <p className="muted mb-2 text-caption tracking-wide">{t("notifications.hour")}</p>
                  {/* TEK SEÇİMLİK SAAT ŞERİDİ RADYO GRUBUDUR — Android aynı
                      üçlüyü `accessibilityRole="radio"` ile veriyor
                      (`NotifPrimeScreen`). */}
                  <div role="radiogroup" aria-label={t("notifications.hour")} className="flex flex-wrap gap-1.5">
                    {HOURS.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => void patch({ hour: h })}
                        role="radio"
                        aria-checked={prefs.hour === h}
                        className={`chip px-3 py-1.5 text-caption ${prefs.hour === h ? "chip-active" : ""}`}
                      >
                        {String(h).padStart(2, "0")}:00
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <SettingRow
              title={t("notifications.streak_saver")}
              sub={t("notifications.every_evening_at_8_30_pm_don_t")}
            >
              <Switch
                on={prefs.streak}
                onChange={(on) => {
                  track("setting_change", on ? 1 : 0, "remind_streak");
                  void patch({ streak: on });
                }}
                label={t("notifications.streak_saver")}
              />
            </SettingRow>

            <SettingRow
              title={t("notifications.weekly_test")}
              sub={t("notifications.every_sunday_measure_your")}
            >
              <Switch
                on={prefs.weekly}
                onChange={(on) => {
                  track("setting_change", on ? 1 : 0, "remind_weekly");
                  void patch({ weekly: on });
                }}
                label={t("notifications.weekly_test")}
              />
            </SettingRow>
          </>
        ) : null}

      </section>
    </div>
  );
}
