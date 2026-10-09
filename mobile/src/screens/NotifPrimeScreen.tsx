import React, { useState } from "react";
import { t as tx, formatClock } from "../lib/i18n";
import { Platform, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RadioDot } from "../ui/RadioDot";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { FlowScreen, FlowActions } from "../ui/flow";
import { NotificationsIcon, StreakIcon } from "../ui/icons";
import { enableDailyReminder, markNotifPrimed } from "../lib/notifications";
import { track } from "../lib/track";
import { PRIME_HOURS } from "../lib/profileDefaults";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow, soft, ds } from "../theme";

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

/**
 * iOS'TA TEK DÜĞME (Apple HIG › Privacy). Sistem izninden hemen önceki özel ekran
 * yalnız bir düğme taşımalı, "Devam" gibi bir sözcükle sistem penceresine
 * götürmeli ve kişinin o pencereyi görmeden ekrandan çıkmasına izin vermemeli —
 * "Belki sonra" bu kalıbın somut ret sebebi. Reddetmek sistem penceresinin işi.
 * Android'de Play tersine "Şimdi değil" seçeneğini öneriyor; orada iki düğme kalıyor.
 */
const SINGLE_BUTTON = Platform.OS === "ios";

function times(): { label: string; value: string }[] {
  return [
    { label: tx("notifprime.morning"), value: hhmm(PRIME_HOURS.morning) },
    { label: tx("notifprime.midday"), value: hhmm(PRIME_HOURS.midday) },
    { label: tx("notifprime.evening"), value: hhmm(PRIME_HOURS.evening) },
  ];
}

export function NotifPrimeScreen() {
  const { colors } = useTheme();
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
    /* iOS'ta sistem penceresi bir kez gösteriliyor; reddedilen izin burada yeniden
       istenemez ve ekranda başka çıkış yok. Sonuç ne olursa olsun uygulamaya
       geçiliyor, işaret yazılıyor (izni sonra Ayarlar'dan açabilir). */
    if (!ok && !SINGLE_BUTTON) {
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

  /* KAYAN GÖVDE: büyük yazı boyunda ya da 320×533'te sabit ortalanmış kutu
     başlığı ve saat çiplerini kırpıyordu. Düğmeler `FlowScreen`in dibinde sabit. */
  return (
    <FlowScreen
      center
      actions={
        <View>
          {/* Reddedilen izin, düğmenin HEMEN ÜSTÜNDE: kullanıcı basınca ne olduğunu
              aynı yerde görüyor. Metin `NotificationsScreen`dekiyle aynı anahtar. */}
          {denied ? (
            <Text variant="caption" color={colors.dangerText} style={{ textAlign: "center", marginBottom: spacing.sm }}>
              {tx("notifications.permission_off")}
            </Text>
          ) : null}
          <FlowActions
            primary={{
              label: tx(SINGLE_BUTTON ? "common.continue" : "notifprime.remind_me_once_day"),
              onPress: () => void enable(),
              busy,
              a11yLabel: tx(SINGLE_BUTTON ? "common.continue" : "notifprime.turn_on_daily_reminder"),
              a11yHint: SINGLE_BUTTON ? tx("notifprime.turn_on_daily_reminder") : undefined,
            }}
            /* İzin ekranının ikinci eylemi öteki bilgi ekranlarındaki gibi
               "Kapat" (2026-09-30); "Belki sonra" / "Şimdilik geç" ayrı adlardı. */
            close={SINGLE_BUTTON ? null : () => void skip()}
          />
        </View>
      }
    >
      <View style={{ alignItems: "center", gap: spacing.lg, paddingVertical: spacing.lg }}>
        <View style={[{ width: ds(88), height: ds(88), borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
          <NotificationsIcon color={colors.onPrimary} size={44} />
        </View>
        <Text accessibilityRole="header" variant="display" style={{ textAlign: "center" }}>{tx("notifprime.keep_your_streak")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", paddingHorizontal: spacing.md }}>
          {tx("notifprime.one_gentle_reminder_day_is")}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: soft(colors.streak), borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: spacing.sm }}>
          <StreakIcon color={colors.streakText} size={16} /><Text variant="caption" color={colors.streakText}>{tx("notifprime.reminder_longer_streak")}</Text>
        </View>

        <View style={{ flexDirection: "row", gap: spacing.sm, alignSelf: "stretch", marginTop: spacing.md }}>
          {times().map((t) => {
            const on = time === t.value;
            return (
              <PressableScale key={t.value} onPress={() => setTime(t.value)} accessibilityRole="radio" accessibilityState={{ selected: on }} accessibilityLabel={`${t.label} ${formatClock(t.value)}`} style={{ flex: 1, paddingVertical: 14, borderRadius: radii.lg, alignItems: "center", borderWidth: 1, borderColor: on ? colors.primary : colors.border, backgroundColor: on ? colors.primary : colors.surface }}>
                {/* Tekli seçimin işareti uygulamanın her yerinde aynı nokta (`ui/RadioDot`).
                    Saat seçimi küçük seçim: seçiliyken DOLU turuncu + beyaz
                    (2026-09-29 Samet: seçim B, dolu turuncu çip). */}
                <View style={{ marginBottom: spacing.xs }}><RadioDot selected={on} onFill={on} /></View>
                <Text variant="bodyStrong" color={on ? colors.onPrimary : colors.text}>{t.label}</Text>
                <Text variant="caption" color={on ? colors.onPrimaryMuted : colors.textMuted}>{formatClock(t.value)}</Text>
              </PressableScale>
            );
          })}
        </View>
      </View>
    </FlowScreen>
  );
}
