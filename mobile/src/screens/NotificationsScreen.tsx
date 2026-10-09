import React, { useEffect, useState } from "react";
import { t as tx, formatClock } from "../lib/i18n";
import { View, ScrollView, Switch, Pressable } from "react-native";
import { MIN_TOUCH } from "../ui/touch";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../ui/Text";
import { Chip } from "../ui/Chip";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { NotificationsIcon, RemindersIcon } from "../ui/icons";
import { PrimaryButton } from "../ui/PrimaryButton";
import { ScreenHeader } from "../social/common";
import {
  loadPrefs, enableDailyReminder, disableReminder,
  setStreakAlert, setWeeklyReminder,
  showTestNotification, openNotificationSettings, STREAK_ALERT_TIME,
} from "../lib/notifications";
import { pushPermissionDenied } from "../lib/pushDevice";
import { track } from "../lib/track";
import { PROFILE_DEFAULTS, REMINDER_HOURS } from "../lib/profileDefaults";
import { useTheme, spacing, radii, softShadow, type Palette, ds } from "../theme";
import { useAuth } from "../lib/AuthContext";
import { FlowNote } from "../ui/flow";
import { SkeletonPill, SkeletonText } from "../ui/Skeleton";

/* Değer "HH:00" (yerel bildirimin ve sunucunun anahtarı); EKRANA yazılan
   `formatClock` ile arayüz dilinde (QA F-0036: "19:00" ile "20.30" yan yana). */
const hhmmOf = (h: number) => `${String(h).padStart(2, "0")}:00`;

/* Saatler tek kaynaktan: izin ekranı da aynı listeyi okuyor (bkz.
   `lib/profileDefaults` `REMINDER_HOURS`, web `lib/profile-limits`). */
const TIMES = REMINDER_HOURS.map(hhmmOf);


/**
 * Üç kategori TEK KARTTA, aralarında ince çizgi (Ayarlar'daki `Group` ile
 * aynı kalıp). Her satır kendi kartındaydı: aynı ayar listesi Ayarlar'da tek
 * kart, burada üç ayrı kart gibi duruyordu.
 */
function ToggleGroup({ colors, children }: { colors: Palette; children: React.ReactNode }) {
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <Card padded>
      {items.map((item, i) => (
        <View key={i} style={i ? { marginTop: spacing.lg, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.hairline } : undefined}>
          {item}
        </View>
      ))}
    </Card>
  );
}

/**
 * Tek bir bildirim kategorisi — başlık + açıklama + aç/kapa; açıkken ek içerik.
 *
 * `pending`: tercihler henüz okunmadı (`loadPrefs` sunucuya da soruyor).
 * Eskiden anahtarlar okunana kadar KAPALI çiziliyor, sonra açılıp günlük
 * hatırlatmanın saat çiplerini aşağı itiyordu: kullanıcı bir an yanlış durumu
 * görüyor, dokunursa yanlış yöne çeviriyordu. Artık anahtarın yeri ve
 * (duruma bağlı) alt satır iskelet; başlık gerçek (2026-09-29, web
 * `notification-settings` `RemindersSlot` ile aynı).
 */
function ToggleRow({ title, subtitle, value, onValueChange, colors, pending = false, children }: { title: string; subtitle: string; value: boolean; onValueChange: (v: boolean) => void; colors: Palette; pending?: boolean; children?: React.ReactNode }) {
  return (
    <View>
      {/* SATIRIN TAMAMI ANAHTAR (QA F-0051): RN `Switch`in `hitSlop`u yok ve
          dokunma yalnız 51×31'lik anahtarda çalışıyordu. `ui/SwitchRow` ile
          aynı kalıp (satır tek "switch", anahtar okuyucudan gizli); burada
          başlık `h3` ve iskelet alt satır olduğu için satır yerinde kuruluyor. */}
      <Pressable
        onPress={() => { if (!pending) onValueChange(!value); }}
        disabled={pending}
        accessibilityRole="switch"
        accessibilityLabel={title}
        accessibilityHint={subtitle}
        accessibilityState={{ checked: value, disabled: pending }}
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", minHeight: MIN_TOUCH }}
      >
        <View style={{ flex: 1, paddingRight: spacing.md }}>
          <Text variant="h3">{title}</Text>
          {pending ? <SkeletonText variant="caption" text={subtitle} /> : <Text variant="caption" color={colors.textMuted}>{subtitle}</Text>}
        </View>
        {pending ? <SkeletonPill width={51} height={31} /> : (
          <Switch value={value} onValueChange={onValueChange} accessibilityLabel={title} trackColor={{ true: colors.primary, false: colors.surface2 }} thumbColor="#fff" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" />
        )}
      </Pressable>
      {children}
    </View>
  );
}

export function NotificationsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [dailyOn, setDailyOn] = useState(false);
  /* Başlangıç değeri yalnız ilk çizim için; gerçek saat `loadPrefs`ten
     geliyor (sunucunun kayıtlı saati — bkz. `ReminderPrefs.hour`). Sayı
     şemanın varsayılanından (`PROFILE_DEFAULTS.reminderHour`), elle
     yazılmıyor: "12:00" burada sabitti ve şema değişse sessizce eskirdi. */
  const [dailyTime, setDailyTime] = useState(hhmmOf(PROFILE_DEFAULTS.reminderHour));
  const [streakOn, setStreakOn] = useState(false);
  const [weeklyOn, setWeeklyOn] = useState(false);
  /* Tercihler okundu mu — okunana kadar anahtarlar iskelet (bkz. `ToggleRow`). */
  const [ready, setReady] = useState(false);
  const [denied, setDenied] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  /* MİSAFİRE DE AÇIK. Hatırlatma telefona kuruluyor ve sunucu istemiyor;
     ilk günlerde uygulamaya geri getiren şey tam olarak bu. Misafirde yalnız
     sunucu tercihi yazılmıyor (bkz. lib/notifications `setReminderServerSync`)
     ve hatırlatmanın bu telefona bağlı olduğu söyleniyor. */
  const guest = Boolean(useAuth().user?.guest);

  useEffect(() => {
    /* Karar verilmemiş kategori sunucudaki değerle çiziliyor; bkz. `loadPrefs`. */
    loadPrefs().then((p) => {
      setDailyTime(p.hour);
      if (p.daily) setDailyOn(true);
      setStreakOn(p.streak);
      setWeeklyOn(p.weekly);
    }).catch(() => { /* okunamazsa kapalı çiziliyor; kullanıcı yine çevirebilir */ }).finally(() => setReady(true));
    /*
     * REDDEDİLMİŞ İZİN AÇILIŞTA SÖYLENİYOR.
     *
     * `denied` yalnız bir anahtar çevrilip BAŞARISIZ olduktan sonra doğru
     * oluyordu: izni daha önce reddetmiş ya da sistem ayarlarından kapatmış
     * kullanıcı ekranı açtığında anahtarları çalışır görüyor, deneyip
     * başarısız olmadan sebebi öğrenemiyordu. Web bu durumu açılışta
     * gösteriyor (`PushSettings`), mobil de artık gösteriyor.
     */
    pushPermissionDenied().then((d) => { if (d) fail(); });
  }, []);

  function fail() { setDenied(true); setMsg(tx("notifications.permission_off")); }

  /*
   * HATIRLATMA ANAHTARLARI ÖLÇÜLÜYOR — web `notification-settings` ile aynı
   * üç kind. Olay yalnız anahtar GERÇEKTEN döndüğünde yazılıyor: mobilde
   * izin reddedilmişse çevirme başarısız olup eski durumda kalıyor ve o anı
   * "kullanıcı hatırlatmayı açtı" diye saymak, açılmamış bir hatırlatmayı
   * açılmış göstermek olurdu. Webde anahtarlar izin olmadan hiç çizilmiyor,
   * yani orada da sayı aynı şeyi ifade ediyor.
   *
   * Saat seçimi bilerek ölçülmüyor: web de ölçmüyor ve iki tarafta farklı
   * davranmak "kaç kişi saatini değiştirdi" sorusunu yarım cevaplardı.
   */
  async function toggleDaily(on: boolean) {
    setMsg(null);
    if (on) { const ok = await enableDailyReminder(dailyTime); if (ok) { setDailyOn(true); setDenied(false); track("setting_change", 1, "remind_daily"); } else fail(); }
    else { await disableReminder(); setDailyOn(false); track("setting_change", 0, "remind_daily"); }
  }
  async function pickTime(t: string) {
    setDailyTime(t);
    if (dailyOn) { const ok = await enableDailyReminder(t); if (!ok) fail(); }
  }
  async function toggleStreak(on: boolean) {
    setMsg(null);
    const ok = await setStreakAlert(on);
    if (ok) { setStreakOn(on); setDenied(false); track("setting_change", on ? 1 : 0, "remind_streak"); } else fail();
  }
  async function toggleWeekly(on: boolean) {
    setMsg(null);
    const ok = await setWeeklyReminder(on);
    if (ok) { setWeeklyOn(on); setDenied(false); track("setting_change", on ? 1 : 0, "remind_weekly"); } else fail();
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Başlık "Hatırlatmalar" (Ayarlar satırının adı). Karonun altında aynı
          kelime ikinci kez `h2` olarak duruyordu: başlığın hemen altında aynı
          başlık. Kalktı (2026-09-29; web `notification-settings` aynı). */}
      <ScreenHeader title={tx("notifications.notifications")} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: spacing.md, marginBottom: spacing.lg }}>
          <View style={[{ width: ds(72), height: ds(72), borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.info }, softShadow(colors.info, 10)]}>
            <NotificationsIcon color={colors.onFill} size={36} />
          </View>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.md, textAlign: "center" }}>{tx("notifications.gentle_nudges_to_keep_your")}</Text>
        </View>
        {guest ? <View style={{ marginBottom: spacing.lg }}><FlowNote icon={<RemindersIcon color={colors.textMuted} size={16} />} text={tx("guest.reminders_local")} /></View> : null}

        <ToggleGroup colors={colors}>
          <ToggleRow title={tx("notifications.daily_reminder")} subtitle={dailyOn ? tx("notifications.daily_on", { time: formatClock(dailyTime) }) : tx("notifications.daily_off")} value={dailyOn} onValueChange={toggleDaily} colors={colors} pending={!ready}>
            {dailyOn && (
              <View style={{ marginTop: spacing.md }}>
                <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{tx("notifications.hour")}</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
                  {TIMES.map((t) => <Chip key={t} role="radio" label={formatClock(t)} active={dailyTime === t} onPress={() => pickTime(t)} />)}
                </View>
              </View>
            )}
          </ToggleRow>

          <ToggleRow title={tx("notifications.streak_saver")} subtitle={tx("notifications.every_evening_at_8_30_pm_don_t", { time: formatClock(STREAK_ALERT_TIME) })} value={streakOn} onValueChange={toggleStreak} colors={colors} pending={!ready} />

          <ToggleRow title={tx("notifications.weekly_test")} subtitle={tx("notifications.every_sunday_measure_your")} value={weeklyOn} onValueChange={toggleWeekly} colors={colors} pending={!ready} />
        </ToggleGroup>

        {msg && <Text accessibilityLiveRegion="polite" variant="bodyStrong" color={denied ? colors.dangerText : colors.primaryText} style={{ marginTop: spacing.md }}>{msg}</Text>}

        {denied && (
          <PrimaryButton size="md" label={tx("notifications.open_notification_settings")} onPress={() => void openNotificationSettings()} style={{ marginTop: spacing.md }} />
        )}

        {/* Geliştirici aracı: üretim derlemesinde yok (Play "test" kalıntısı saymasın). */}
        {__DEV__ ? (
          <PressableScale onPress={async () => { const ok = await showTestNotification(); if (!ok) fail(); else setMsg(tx("notifications.test_sent")); }} style={{ marginTop: spacing.xl, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingVertical: 14, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.text}>{tx("notifications.send_test_notification")}</Text>
          </PressableScale>
        ) : null}
      </ScrollView>
    </View>
  );
}
