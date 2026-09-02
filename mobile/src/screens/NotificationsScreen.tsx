import React, { useEffect, useState } from "react";
import { View, ScrollView, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, BellIcon } from "../ui/icons";
import {
  getReminder, enableDailyReminder, disableReminder,
  getStreakAlert, setStreakAlert,
  getWeeklyReminder, setWeeklyReminder,
  showTestNotification, openNotificationSettings,
} from "../lib/notifications";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

const TIMES = ["09:00", "12:00", "15:00", "19:00", "21:00"];

function Chip({ label, active, onPress, colors }: { label: string; active: boolean; onPress: () => void; colors: Palette }) {
  return (
    <PressableScale onPress={onPress} style={{ paddingHorizontal: 16, paddingVertical: 9, borderRadius: radii.md, borderWidth: 1.5, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface }}>
      <Text variant="bodyStrong" color={active ? colors.primary : colors.textMuted}>{label}</Text>
    </PressableScale>
  );
}

/** Tek bir bildirim kategorisi — başlık + açıklama + aç/kapa; açıkken ek içerik. */
function ToggleRow({ title, subtitle, value, onValueChange, colors, children }: { title: string; subtitle: string; value: boolean; onValueChange: (v: boolean) => void; colors: Palette; children?: React.ReactNode }) {
  return (
    <Card padded style={{ marginBottom: spacing.md }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flex: 1, paddingRight: spacing.md }}>
          <Text variant="h3">{title}</Text>
          <Text variant="caption" color={colors.textMuted}>{subtitle}</Text>
        </View>
        <Switch value={value} onValueChange={onValueChange} trackColor={{ true: colors.primary, false: colors.surface2 }} thumbColor="#fff" />
      </View>
      {children}
    </Card>
  );
}

export function NotificationsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const [dailyOn, setDailyOn] = useState(false);
  const [dailyTime, setDailyTime] = useState("19:00");
  const [streakOn, setStreakOn] = useState(false);
  const [weeklyOn, setWeeklyOn] = useState(false);
  const [denied, setDenied] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    getReminder().then((r) => { if (r) { setDailyOn(true); setDailyTime(r); } });
    getStreakAlert().then(setStreakOn);
    getWeeklyReminder().then(setWeeklyOn);
  }, []);

  function fail() { setDenied(true); setMsg("Bildirim izni kapalı. Aşağıdan sistem ayarlarını açabilirsin."); }

  async function toggleDaily(on: boolean) {
    setMsg(null);
    if (on) { const ok = await enableDailyReminder(dailyTime); if (ok) { setDailyOn(true); setDenied(false); } else fail(); }
    else { await disableReminder(); setDailyOn(false); }
  }
  async function pickTime(t: string) {
    setDailyTime(t);
    if (dailyOn) { const ok = await enableDailyReminder(t); if (!ok) fail(); }
  }
  async function toggleStreak(on: boolean) {
    setMsg(null);
    const ok = await setStreakAlert(on);
    if (ok) { setStreakOn(on); setDenied(false); } else fail();
  }
  async function toggleWeekly(on: boolean) {
    setMsg(null);
    const ok = await setWeeklyReminder(on);
    if (ok) { setWeeklyOn(on); setDenied(false); } else fail();
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel="Geri" style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">Bildirimler</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: spacing.md, marginBottom: spacing.lg }}>
          <View style={[{ width: 72, height: 72, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.info }, softShadow(colors.info, 10)]}>
            <BellIcon color="#fff" size={36} />
          </View>
          <Text variant="h2" style={{ marginTop: spacing.md }}>Hatırlatmalar</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>Serini korumak için nazik dürtmeler — istediğini aç.</Text>
        </View>

        <ToggleRow title="Günlük hatırlatma" subtitle={dailyOn ? `Açık · her gün ${dailyTime}` : "Her gün çalışmayı hatırlat"} value={dailyOn} onValueChange={toggleDaily} colors={colors}>
          {dailyOn && (
            <View style={{ marginTop: spacing.md }}>
              <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>SAAT</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
                {TIMES.map((t) => <Chip key={t} label={t} active={dailyTime === t} onPress={() => pickTime(t)} colors={colors} />)}
              </View>
            </View>
          )}
        </ToggleRow>

        <ToggleRow title="Seri koruma" subtitle="Her akşam 20:30 · günü kaçırma" value={streakOn} onValueChange={toggleStreak} colors={colors} />

        <ToggleRow title="Haftalık sınav" subtitle="Her Pazar · ilerlemeni ölç" value={weeklyOn} onValueChange={toggleWeekly} colors={colors} />

        {msg && <Text variant="bodyStrong" color={denied ? colors.danger : colors.primary} style={{ marginTop: spacing.sm }}>{msg}</Text>}

        {denied && (
          <PressableScale onPress={openNotificationSettings} style={[{ marginTop: spacing.md, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 14, alignItems: "center" }, softShadow(colors.primary, 8)]}>
            <Text variant="bodyStrong" color="#fff">Bildirim ayarlarını aç</Text>
          </PressableScale>
        )}

        <PressableScale onPress={async () => { const ok = await showTestNotification(); if (!ok) fail(); else setMsg("Test bildirimi gönderildi."); }} style={{ marginTop: spacing.xl, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, paddingVertical: 14, alignItems: "center" }}>
          <Text variant="bodyStrong" color={colors.text}>Test bildirimi gönder</Text>
        </PressableScale>
      </ScrollView>
    </View>
  );
}
