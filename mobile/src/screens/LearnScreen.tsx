import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Screen } from "../ui/Screen";
import { Card } from "../ui/Card";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ProgressRing } from "../ui/ProgressRing";
import { FlameIcon, BoltIcon, WalkIcon, CheckIcon, ArrowRightIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { useMe, formatDuration, formatXp } from "../lib/useMe";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

const Stat = ({ label, value, unit, color, colors }: { label: string; value: string; unit: string; color: string; colors: Palette }) => (
  <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
    <View style={{ width: 4, height: 30, borderRadius: 2, backgroundColor: color }} />
    <View>
      <Text variant="caption" color={colors.textMuted}>{label}</Text>
      <Text variant="h2">{value} <Text variant="caption" color={colors.textMuted}>{unit}</Text></Text>
    </View>
  </View>
);
const Meter = ({ label, value, color, colors }: { label: string; value: string; color: string; colors: Palette }) => (
  <View style={{ flex: 1 }}>
    <Text variant="micro" color={colors.textMuted}>{label}</Text>
    <View style={{ height: 5, borderRadius: 3, backgroundColor: colors.surface2, marginTop: 6, marginBottom: 5, overflow: "hidden" }}>
      <View style={{ height: "100%", width: "70%", borderRadius: 3, backgroundColor: color }} />
    </View>
    <Text variant="bodyStrong">{value}</Text>
  </View>
);
function QuickCard({ title, subtitle, tint, icon: Icon, onPress }: { title: string; subtitle: string; tint: string; icon: (p: { color: string; size: number }) => React.ReactElement; onPress?: () => void }) {
  const { colors } = useTheme();
  return (
    <PressableScale onPress={onPress} style={{ marginBottom: spacing.md }}>
      <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={[{ width: 52, height: 52, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint }, softShadow(tint, 8)]}>
          <Icon color="#fff" size={26} />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="h3">{title}</Text>
          <Text variant="caption" color={colors.textMuted}>{subtitle}</Text>
        </View>
        <ArrowRightIcon color={colors.textFaint} size={20} />
      </Card>
    </PressableScale>
  );
}

export function LearnScreen() {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user } = useAuth();
  const { me } = useMe();
  const initial = ((user?.name ?? "Misafir").trim()[0] ?? "M").toUpperCase();
  const greeting = user?.name ? `Merhaba ${user.name.split(" ")[0]} 👋` : "Merhaba 👋";
  // me varsa gerçek sayılar, yoksa demo (misafir / çevrimdışı).
  const streak = me ? me.streak : 7;
  const learned = me ? String(me.mastered) : "12";
  const xp = me ? formatXp(me.xp) : "1.2k";
  const dur = me ? formatDuration(me.seconds) : "14 dk";
  return (
    <Screen>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg }}>
        <View>
          <Text variant="caption" color={colors.textMuted}>{greeting}</Text>
          <Text variant="display">Bugün</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
          <View style={[{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.surface, borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 9, borderWidth: 1, borderColor: colors.hairline }, softShadow("#5a3418", 6)]}>
            <FlameIcon color={colors.streak} size={18} /><Text variant="bodyStrong" color={colors.streak}>{streak}</Text>
          </View>
          <PressableScale onPress={() => nav.navigate("Profile")} style={[{ width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 6)]}>
            <Text variant="h3" color="#fff">{initial}</Text>
          </PressableScale>
        </View>
      </View>

      <Card style={{ marginBottom: spacing.xl }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ gap: spacing.md }}>
            <Stat label="Öğrenilen" value={learned} unit="kelime" color={colors.primary} colors={colors} />
            <Stat label="Tekrar" value="34" unit="kart" color={colors.info} colors={colors} />
          </View>
          <ProgressRing size={130} stroke={13} pct={62} track={colors.surface2} from={colors.gradientA[0]} to={colors.gradientA[1]}>
            <Text variant="display" color={colors.primary}>8</Text>
            <Text variant="micro" color={colors.textMuted}>hedefe kaldı</Text>
          </ProgressRing>
        </View>
        <View style={{ flexDirection: "row", marginTop: spacing.lg, gap: spacing.lg }}>
          <Meter label="XP" value={xp} color={colors.primary} colors={colors} />
          <Meter label="Seri" value={`${streak} gün`} color={colors.streak} colors={colors} />
          <Meter label="Süre" value={dur} color={colors.info} colors={colors} />
        </View>
      </Card>

      <View style={{ marginBottom: spacing.md }}>
        <Text variant="h2">Bugün</Text>
      </View>
      <QuickCard title="Tur başlat" subtitle="Kelime turu · 5 dk" tint={colors.primary} icon={BoltIcon} onPress={() => nav.navigate("Game")} />
      <QuickCard title="Yürüyüş modu" subtitle="Kulakla öğren, ellerin serbest" tint={colors.info} icon={WalkIcon} onPress={() => nav.navigate("Walk")} />
      <QuickCard title="Sınav hazırlık" subtitle="Goethe A1 · Modül 1" tint={colors.accent} icon={CheckIcon} onPress={() => nav.navigate("ExamPrep")} />
    </Screen>
  );
}
