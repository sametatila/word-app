"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { NotificationsIcon } from "@/components/icons";
import { SettingRow, Switch } from "@/components/setting-row";
import { Btn, SettingRowSlot, SwitchSlot, Words } from "@/components/settings-skeleton";
import { PushSettings } from "@/components/push-settings";
import { useT } from "@/lib/i18n/client";
import { track } from "@/lib/track";
import { REMINDER_HOURS, STREAK_ALERT_TIME } from "@/lib/profile-limits";
import { formatClock, type NativeLang } from "@/lib/i18n/dict";
import { useLang } from "@/lib/i18n/client";

type Prefs = { daily: boolean; hour: number; streak: boolean; weekly: boolean };

/* Saatler tek kaynaktan: mobil `NotificationsScreen` ve bildirim izni ekranı
   da aynı listeyi okuyor (bkz. `lib/profile-limits` `REMINDER_HOURS`). */
const HOURS = REMINDER_HOURS;
/* Şemanın varsayılan saati (`profiles.reminder_hour`, mobil `PROFILE_DEFAULTS.reminderHour`); yalnız yer tutucu metni için. */
const DEFAULT_REMINDER_HOUR = 12;

/** Seri koruma saati ortak kaynaktan, arayüz dilinde (sözlükte sabit "20.30" vardı, QA F-0036). */
const streakTime = (lang: NativeLang) => {
  const [h, m] = STREAK_ALERT_TIME.split(":").map(Number);
  return formatClock(h, m, lang);
};

/**
 * Hatırlatma ayarları — mobil `NotificationsScreen`in web karşılığı.
 *
 * ÜST BLOK MOBİLDEKİYLE AYNI: zil karosu, "Hatırlatmalar" başlığı ve tek
 * cümlelik gerekçe. Ekranın tamamı bir izin isteği ve izni veren kişinin
 * sorusu "ne kadar sık" — o cümle onu cevaplıyor.
 *
 * ÜÇ ANAHTAR DA MOBİLDEKİLER: günlük hatırlatma (açıkken saat çipleri), seri
 * koruma, haftalık quiz. Mobilde bunlar cihazda kurulan yerel bildirimler;
 * web'de sunucudan gidiyor, o yüzden tercih `profiles`ta duruyor ve iki
 * tarayıcıda aynı görünüyor.
 *
 * AYARLARIN PANELİ (2026-09-29 Samet: web ayarlar masaüstü düzeni): sayfa
 * artık `/profile/settings/reminders`, başlığı panelin başlığı
 * ("Hatırlatmalar"). Üst bloktaki ikinci "Hatırlatmalar" başlığı kalktı —
 * telefonda geri okunun yanındaki başlığın hemen altında aynı kelimeyi
 * tekrarlıyordu; mobil `NotificationsScreen` de aynı. Ortalı karo ve cümle
 * yalnız telefonda: masaüstünde sol menü ve panel başlığının yanında izin
 * ekranı gibi duruyordu.
 *
 * YÜKLENİRKEN YER TUTUYOR. İzin durumu ve tercihler istemcide okunuyor;
 * eskiden okunana kadar kart boş kalıyor, sonra satırlar bir anda gelip
 * altını itiyordu. Şimdi izin satırının ve (izin açıksa) üç anahtarın yeri
 * gerçek metinle, görünmez çiziliyor (`settings-skeleton`); rota iskeleti
 * de aynı parçayı çiziyor.
 *
 * ÜÇÜ DE PUSH İZNİNE BAĞLI. İzin yoksa anahtarları göstermek, çevrildiğinde
 * hiçbir şey yapmayan bir düğme göstermek olurdu; o durumda ekran yalnız
 * izin satırını ve ne yapılması gerektiğini gösteriyor (bkz. `PushSettings`).
 */
export function NotificationSettings() {
  const t = useT();
  const lang = useLang();
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  /* Okunamadıysa yer tutucu sonsuza dek beklemesin: anahtarlar çizilmiyor. */
  const [prefsFailed, setPrefsFailed] = useState(false);
  const [pushOn, setPushOn] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await apiFetch("/api/notifications/prefs", { cache: "no-store" });
        if (res.ok && alive) setPrefs((await res.json()) as Prefs);
        else if (alive) setPrefsFailed(true);
      } catch {
        /* okunamazsa anahtarlar çizilmiyor; ekran yine açılıyor */
        if (alive) setPrefsFailed(true);
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
      <div className="flex flex-col items-center px-2 text-center md:hidden">
        <span
          className="flex h-[72px] w-[72px] items-center justify-center rounded-card glow-tint"
          style={{ background: "var(--color-sky)", color: "var(--on-fill)", "--tint-fill": "var(--color-sky)" } as React.CSSProperties}
        >
          <NotificationsIcon size={36} />
        </span>
        <p className="muted mt-3">{t("notifications.gentle_nudges_to_keep_your")}</p>
      </div>
      {/* Masaüstünde karo yok; gerekçe cümlesi panel başlığının altında kalıyor. */}
      <p className="muted hidden md:block">{t("notifications.gentle_nudges_to_keep_your")}</p>

      <section className="card divide-y divide-[color:var(--hairline)] overflow-hidden">
        <PushSettings bare onState={setPushOn} />

        {pushOn && prefs ? (
          <>
            <div>
              <SettingRow
                title={t("notifications.daily_reminder")}
                sub={
                  prefs.daily
                    ? t("notifications.daily_on", { time: formatClock(prefs.hour, 0, lang) })
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
                        {formatClock(h, 0, lang)}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <SettingRow
              title={t("notifications.streak_saver")}
              sub={t("notifications.every_evening_at_8_30_pm_don_t", { time: streakTime(lang) })}
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
        ) : pushOn && !prefsFailed ? (
          <RemindersSlot />
        ) : null}
      </section>
    </div>
  );
}

/**
 * Üç anahtarın yeri, tercihler gelene kadar — gerçek başlık ve alt satır
 * görünmez. Rota iskeleti de bunu çiziyor (`profile/settings/skeleton.tsx`).
 *
 * GÜNLÜK SATIR AÇIK HÂLİYLE, SAAT ÇİPLERİYLE. Günlük hatırlatma varsayılan
 * olarak açık (`profiles.reminders_enabled`), yani çip satırı çoğu kullanıcıda
 * geliyor. Yer tutucu "kapalı" çiziliyordu; tercihler gelince çipler araya
 * girip seri koruma ve haftalık quiz satırlarını aşağı itiyordu (QA F-0070
 * sınıfı; mobil `NotificationsScreen` aynı iskeleti çiziyor). Saat şemanın
 * varsayılanı (12).
 */
export function RemindersSlot() {
  const t = useT();
  const lang = useLang();
  return (
    <>
      <div>
        <SettingRowSlot title={t("notifications.daily_reminder")} sub={t("notifications.daily_on", { time: formatClock(DEFAULT_REMINDER_HOUR, 0, lang) })}>
          <SwitchSlot />
        </SettingRowSlot>
        <div className="px-4 pb-3">
          <Words as="p" className="mb-2 text-caption tracking-wide" text={t("notifications.hour")} />
          <div className="flex flex-wrap gap-1.5">
            {HOURS.map((h) => (
              <Btn key={h} className="chip px-3 py-1.5 text-caption" text={formatClock(h, 0, lang)} />
            ))}
          </div>
        </div>
      </div>
      <SettingRowSlot title={t("notifications.streak_saver")} sub={t("notifications.every_evening_at_8_30_pm_don_t", { time: streakTime(lang) })}>
        <SwitchSlot />
      </SettingRowSlot>
      <SettingRowSlot title={t("notifications.weekly_test")} sub={t("notifications.every_sunday_measure_your")}>
        <SwitchSlot />
      </SettingRowSlot>
    </>
  );
}
