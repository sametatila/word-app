import React, { useEffect, useState } from "react";
import { View, ScrollView, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ChevronLeftIcon, BellIcon } from "../ui/icons";
import { getReminder, enableDailyReminder, disableReminder, showTestNotification } from "../lib/notifications";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

const TIMES = ["12:00", "19:00", "21:00"];

function Chip({ label, active, onPress, colors }: { label: string; active: boolean; onPress: () => void; colors: Palette }) {
  return (
    <PressableScale onPress={onPress} style={{ paddingHorizontal: 18, paddingVertical: 10, borderRadius: radii.md, borderWidth: 1.5, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface }}>
      <Text variant="bodyStrong" color={active ? colors.primary : colors.textMuted}>{label}</Text>
    </PressableScale>
  );
}

export function NotificationsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState("19:00");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    getReminder().then((r) => { if (r) { setEnabled(true); setTime(r); } });
  }, []);

  async function toggle(on: boolean) {
    setMsg(null);
    if (on) {
      const ok = await enableDailyReminder(time);
      if (ok) { setEnabled(true); setMsg(`Her gün ${time}'de hatırlatacağız.`); }
      else setMsg("Bildirim izni verilmedi. Ayarlardan açabilirsin.");
    } else {
      await disableReminder();
      setEnabled(false);
      setMsg("Hatırlatma kapatıldı.");
    }
  }

  async function pickTime(t: string) {
    setTime(t);
    if (enabled) { await enableDailyReminder(t); setMsg(`Her gün ${t}'de hatırlatacağız.`); }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={() => nav.goBack()} accessibilityLabel="Geri" style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ChevronLeftIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">Bildirimler</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: spacing.md, marginBottom: spacing.lg }}>
          <View style={[{ width: 72, height: 72, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.info }, softShadow(colors.info, 10)]}>
            <BellIcon color="#fff" size={36} />
          </View>
          <Text variant="h2" style={{ marginTop: spacing.md }}>Günlük hatırlatma</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>Serini korumak için her gün nazik bir dürtme.</Text>
        </View>

        <Card padded style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.lg }}>
          <View style={{ flex: 1 }}>
            <Text variant="h3">Günlük hatırlatma</Text>
            <Text variant="caption" color={colors.textMuted}>{enabled ? `Açık · her gün ${time}` : "Kapalı"}</Text>
          </View>
          <Switch value={enabled} onValueChange={toggle} trackColor={{ true: colors.primary, false: colors.surface2 }} thumbColor="#fff" />
        </Card>

        <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4 }}>HATIRLATMA SAATİ</Text>
        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          {TIMES.map((t) => <Chip key={t} label={t} active={time === t} onPress={() => pickTime(t)} colors={colors} />)}
        </View>

        {msg && <Text variant="bodyStrong" color={colors.primary} style={{ marginTop: spacing.lg }}>{msg}</Text>}

        <PressableScale onPress={async () => { const ok = await showTestNotification(); if (!ok) setMsg("Bildirim izni verilmedi."); }} style={{ marginTop: spacing.xl, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, paddingVertical: 14, alignItems: "center" }}>
          <Text variant="bodyStrong" color={colors.text}>Test bildirimi gönder</Text>
        </PressableScale>

        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.lg, textAlign: "center" }}>
          Serin tehlikeye girdiğinde de nazikçe hatırlatırız.
        </Text>
      </ScrollView>
    </View>
  );
}
