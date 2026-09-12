import React, { useState } from "react";
import { t as tx } from "../lib/i18n";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { BellIcon, FlameIcon } from "../ui/icons";
import { enableDailyReminder, markNotifPrimed } from "../lib/notifications";
import { track } from "../lib/track";
import { PRIME_HOURS } from "../lib/profileDefaults";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow, soft } from "../theme";

/**
 * İlk giriş sonrası bir kez gösterilen bildirim izni ekranı (§4). İzni sistem
 * diyaloğundan ÖNCE nazikçe konumlar (priming) — elde tutmanın en güçlü kaldıracı.
 * Bir hatırlatma saati seçtirir; "Hatırlat" izin ister + günlük tetikleyici kurar.
 */
/**
 * Hatırlatma saatleri — etiket t() ile, çağrı anında (dil modül yüklenirken
 * hazır değil).
 *
 * SAATLER AYARLAR EKRANININ LİSTESİNDEN. Burada 13:00 ve 20:00 yazılıydı ve
 * ikisi de `NotificationsScreen`in çiplerinde YOKTU: "Öğle" ya da "Akşam"
 * seçen kullanıcı ayarları açtığında günlük hatırlatmayı AÇIK, çiplerin
 * hiçbirini seçili görmüyordu — kendi seçtiği saat orada teklif bile
 * edilmiyordu (webde de aynı liste, aynı sonuç). Üç seçenek artık listenin
 * kendi elemanları (bkz. `lib/profileDefaults` `PRIME_HOURS`).
 */
const hhmm = (h: number) => `${String(h).padStart(2, "0")}:00`;

function times(): { label: string; value: string }[] {
  return [
    { label: tx("notifprime.morning"), value: hhmm(PRIME_HOURS.morning) },
    { label: tx("notifprime.midday"), value: hhmm(PRIME_HOURS.midday) },
    { label: tx("notifprime.evening"), value: hhmm(PRIME_HOURS.evening) },
  ];
}

export function NotifPrimeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [time, setTime] = useState(hhmm(PRIME_HOURS.evening));
  const [busy, setBusy] = useState(false);
  /* İzin REDDEDİLDİYSE söylenmesi gerekiyor; bkz. `enable`. */
  const [denied, setDenied] = useState(false);

  const toApp = () => nav.reset({ index: 0, routes: [{ name: "Tabs" }] });

  async function enable() {
    if (busy) return;
    setBusy(true);
    track("notif_prime", 1, time);
    /*
     * İZİN REDDİ SESSİZCE YUTULUYORDU.
     *
     * `enableDailyReminder` izin alınamazsa `false` dönüyor (`NotificationsScreen`
     * dönüşü kullanıyor) ama burada hem dönüş atılıyor hem de hata yutuluyordu:
     * kullanıcı "Hatırlat"a basıyor, sistem reddediyor, ekran yine de
     * `markNotifPrimed()` yazıp uygulamaya geçiyordu. Sonuç iki kat kötü -
     * kullanıcı hatırlatmanın AÇIK olduğunu sanıyor ve ekran bir daha hiç
     * gelmiyor (işaret kalıcı), yani yanlış inanç kalıcı hâle geliyor.
     *
     * Artık reddedilen izin söyleniyor ve işaret YAZILMIYOR: ekran bir sonraki
     * açılışta yeniden gelebilir. Web aynı durumu ayrı ayrı gösteriyor
     * (`PushSettings` reddedilen izni açılışta söylüyor).
     */
    let ok = false;
    try { ok = await enableDailyReminder(time); } catch { ok = false; }
    /*
     * İZNİN SONUCU DA YAZILIYOR — web ile AYNI ad ve AYNI değerlerle.
     *
     * `notif_prime` yukarıda düğmeye BASILDIĞI anda yazılıyor, yani "sordu"
     * demek; izin verilip verilmediğini söylemiyordu ve reddedilen yol hiçbir
     * şey yazmıyordu. Panelde bildirim izni hunisi (`push_optin`: 1 verildi /
     * 0 reddedildi / 2 sonra) yalnız `push_optin` okuyor — yani Android
     * kullanıcılarının izin verip vermediği panelde HİÇ görünmüyordu.
     * `notif_prime` kalıyor: seçilen saat Android'e özel bir ayrıntı ve
     * web'de karşılığı yok.
     */
    track("push_optin", ok ? 1 : 0);
    if (!ok) {
      setDenied(true);
      setBusy(false);
      return;
    }
    await markNotifPrimed();
    toApp();
  }
  async function skip() {
    track("notif_prime", 0);
    /* "Sonra" da web ile aynı değerle (2). */
    track("push_optin", 2);
    await markNotifPrimed();
    toApp();
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
        <View style={[{ width: 88, height: 88, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
          <BellIcon color={colors.onPrimary} size={44} />
        </View>
        <Text accessibilityRole="header" variant="display" style={{ textAlign: "center" }}>{tx("notifprime.keep_your_streak")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 23, paddingHorizontal: spacing.md }}>
          {tx("notifprime.one_gentle_reminder_day_is")}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: soft(colors.streak), borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 8 }}>
          <FlameIcon color={colors.streakText} size={16} /><Text variant="caption" color={colors.streakText}>{tx("notifprime.reminder_longer_streak")}</Text>
        </View>

        <View style={{ flexDirection: "row", gap: spacing.sm, alignSelf: "stretch", marginTop: spacing.md }}>
          {times().map((t) => {
            const on = time === t.value;
            return (
              <PressableScale key={t.value} onPress={() => setTime(t.value)} accessibilityRole="radio" accessibilityState={{ selected: on }} accessibilityLabel={`${t.label} ${t.value}`} style={{ flex: 1, paddingVertical: 14, borderRadius: radii.lg, alignItems: "center", borderWidth: 2, borderColor: on ? colors.primary : colors.border, backgroundColor: on ? colors.primarySoft : colors.surface }}>
                <Text variant="bodyStrong" color={on ? colors.primaryText : colors.text}>{t.label}</Text>
                <Text variant="caption" color={colors.textMuted}>{t.value}</Text>
              </PressableScale>
            );
          })}
        </View>
      </View>

      {/* Reddedilen izin, düğmenin HEMEN ÜSTÜNDE: kullanıcı basınca ne olduğunu
          aynı yerde görüyor. Metin `NotificationsScreen`dekiyle aynı anahtar. */}
      {denied ? (
        <Text variant="caption" color={colors.dangerText} style={{ textAlign: "center", marginBottom: spacing.sm, lineHeight: 18 }}>
          {tx("notifications.permission_off")}
        </Text>
      ) : null}
      <PressableScale onPress={enable} accessibilityRole="button" accessibilityLabel={tx("notifprime.turn_on_daily_reminder")} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 17, alignItems: "center" }, softShadow(colors.primary, 10)]}>
        <Text variant="h3" color={colors.onPrimary}>{busy ? "..." : tx("notifprime.remind_me_once_day")}</Text>
      </PressableScale>
      <PressableScale onPress={skip} accessibilityRole="button" accessibilityLabel={tx("notifprime.not_now")} style={{ alignItems: "center", paddingVertical: spacing.md, marginTop: 4 }}>
        <Text variant="bodyStrong" color={colors.textMuted}>{tx("notifprime.maybe_later")}</Text>
      </PressableScale>
    </View>
  );
}
