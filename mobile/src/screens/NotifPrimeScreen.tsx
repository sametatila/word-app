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
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow } from "../theme";

/**
 * İlk giriş sonrası bir kez gösterilen bildirim izni ekranı (§4). İzni sistem
 * diyaloğundan ÖNCE nazikçe konumlar (priming) — elde tutmanın en güçlü kaldıracı.
 * Bir hatırlatma saati seçtirir; "Hatırlat" izin ister + günlük tetikleyici kurar.
 */
const TIMES = [
  { label: "Sabah", value: "09:00" },
  { label: "Öğle", value: "13:00" },
  { label: "Akşam", value: "20:00" },
];

export function NotifPrimeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [time, setTime] = useState("20:00");
  const [busy, setBusy] = useState(false);

  const toApp = () => nav.reset({ index: 0, routes: [{ name: "Tabs" }] });

  async function enable() {
    if (busy) return;
    setBusy(true);
    track("notif_prime", 1, time);
    try { await enableDailyReminder(time); } catch { /* izin reddi olsa da devam */ }
    await markNotifPrimed();
    toApp();
  }
  async function skip() {
    track("notif_prime", 0);
    await markNotifPrimed();
    toApp();
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
        <View style={[{ width: 88, height: 88, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
          <BellIcon color="#fff" size={44} />
        </View>
        <Text variant="display" style={{ textAlign: "center" }}>{tx("notifprime.serini_koru")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 23, paddingHorizontal: spacing.md }}>
          Günde bir nazik hatırlatma, çalışmayı sürdürmenin en kolay yolu. Düzenli çalışan öğrenciler serilerini çok daha uzun tutar.
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.streak + "1e", borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 8 }}>
          <FlameIcon color={colors.streak} size={16} /><Text variant="caption" color={colors.streak}>Hatırlatma = daha uzun seri</Text>
        </View>

        <View style={{ flexDirection: "row", gap: spacing.sm, alignSelf: "stretch", marginTop: spacing.md }}>
          {TIMES.map((t) => {
            const on = time === t.value;
            return (
              <PressableScale key={t.value} onPress={() => setTime(t.value)} accessibilityRole="radio" accessibilityState={{ selected: on }} accessibilityLabel={`${t.label} ${t.value}`} style={{ flex: 1, paddingVertical: 14, borderRadius: radii.lg, alignItems: "center", borderWidth: 2, borderColor: on ? colors.primary : colors.border, backgroundColor: on ? colors.primarySoft : colors.surface }}>
                <Text variant="bodyStrong" color={on ? colors.primary : colors.text}>{t.label}</Text>
                <Text variant="caption" color={colors.textMuted}>{t.value}</Text>
              </PressableScale>
            );
          })}
        </View>
      </View>

      <PressableScale onPress={enable} accessibilityRole="button" accessibilityLabel={tx("notifprime.gunluk_hatirlatmayi_ac")} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 17, alignItems: "center" }, softShadow(colors.primary, 10)]}>
        <Text variant="h3" color="#fff">{busy ? "..." : "Günde bir hatırlat"}</Text>
      </PressableScale>
      <PressableScale onPress={skip} accessibilityRole="button" accessibilityLabel={tx("notifprime.simdilik_gec")} style={{ alignItems: "center", paddingVertical: spacing.md, marginTop: 4 }}>
        <Text variant="bodyStrong" color={colors.textMuted}>{tx("notifprime.belki_sonra")}</Text>
      </PressableScale>
    </View>
  );
}
