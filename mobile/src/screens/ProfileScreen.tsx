import React from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ChevronLeftIcon, ChevronRightIcon, FlameIcon, BoltIcon, LearnIcon, TrophyIcon, ExamIcon, BellIcon, LogoutIcon, CrownIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { useTheme, spacing, radii, softShadow, type ThemeMode, type Palette } from "../theme";

const THEME_OPTIONS: { key: ThemeMode; label: string }[] = [
  { key: "system", label: "Sistem" },
  { key: "light", label: "Açık" },
  { key: "dark", label: "Koyu" },
];

function StatTile({ value, label, color, colors }: { value: string; label: string; color: string; colors: Palette }) {
  return (
    <Card padded style={{ width: "47.5%", gap: 2 }}>
      <Text variant="h1" color={color}>{value}</Text>
      <Text variant="caption" color={colors.textMuted}>{label}</Text>
    </Card>
  );
}

function Row({ icon: Icon, label, tint, colors, last }: { icon: (p: { color: string; size: number }) => React.ReactElement; label: string; tint: string; colors: Palette; last?: boolean }) {
  return (
    <PressableScale style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.hairline }}>
      <View style={{ width: 38, height: 38, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint + "22" }}>
        <Icon color={tint} size={20} />
      </View>
      <Text variant="bodyStrong" style={{ flex: 1 }}>{label}</Text>
      <ChevronRightIcon color={colors.textFaint} size={20} />
    </PressableScale>
  );
}

export function ProfileScreen() {
  const { colors, mode, setMode } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user, signOut } = useAuth();
  const displayName = user?.name ?? "Misafir";
  const initial = (displayName.trim()[0] ?? "M").toUpperCase();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* başlık */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ChevronLeftIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">Profil</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* kimlik kartı */}
        <Card style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <View style={[{ width: 76, height: 76, borderRadius: 38, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 10)]}>
            <Text variant="display" color="#fff">{initial}</Text>
          </View>
          <Text variant="h2" style={{ marginTop: spacing.md }}>{displayName}</Text>
          <Text variant="caption" color={colors.textMuted}>{user?.email ?? "A1 · Başlangıç (giriş yapılmadı)"}</Text>
          <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.md }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: colors.streak + "22", borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 6 }}>
              <FlameIcon color={colors.streak} size={16} /><Text variant="bodyStrong" color={colors.streak}>7 gün</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 6 }}>
              <BoltIcon color={colors.primary} size={16} /><Text variant="bodyStrong" color={colors.primary}>1.2k XP</Text>
            </View>
          </View>
        </Card>

        {/* istatistik ızgarası */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.lg }}>
          <StatTile value="248" label="Öğrenilen kelime" color={colors.primary} colors={colors} />
          <StatTile value="7" label="Gün serisi" color={colors.streak} colors={colors} />
          <StatTile value="1.240" label="Toplam XP" color={colors.success} colors={colors} />
          <StatTile value="3s 20dk" label="Bu hafta süre" color={colors.info} colors={colors} />
        </View>

        {/* premium yükseltme bandı (§4) */}
        <PressableScale onPress={() => nav.navigate("Paywall")} style={[{ borderRadius: radii.xl, backgroundColor: colors.primary, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }, softShadow(colors.primary, 10)]}>
          <View style={{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff2e" }}>
            <CrownIcon color="#fff" size={26} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="h3" color="#fff">Premium'a geç</Text>
            <Text variant="caption" color="#ffffffcc">Sınırsız konuşma + tam sınav hazırlığı</Text>
          </View>
          <ChevronRightIcon color="#fff" size={22} />
        </PressableScale>

        {/* görünüm — tema geçişi */}
        <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4 }}>GÖRÜNÜM</Text>
        <View style={{ flexDirection: "row", backgroundColor: colors.surface2, borderRadius: radii.lg, padding: 4, marginBottom: spacing.lg }}>
          {THEME_OPTIONS.map((o) => {
            const active = mode === o.key;
            return (
              <PressableScale key={o.key} onPress={() => setMode(o.key)} style={{ flex: 1, paddingVertical: 10, borderRadius: radii.md, alignItems: "center", backgroundColor: active ? colors.surface : "transparent", ...(active ? softShadow("#5a3418", 4) : {}) }}>
                <Text variant="bodyStrong" color={active ? colors.primary : colors.textMuted}>{o.label}</Text>
              </PressableScale>
            );
          })}
        </View>

        {/* ayar satırları */}
        <Card padded style={{ paddingVertical: 0 }}>
          <Row icon={LearnIcon} label="Kelimelerim" tint={colors.primary} colors={colors} />
          <Row icon={TrophyIcon} label="Başarımlar" tint={colors.streak} colors={colors} />
          <Row icon={ExamIcon} label="Sınav hazırlık" tint={colors.accent} colors={colors} />
          <Row icon={BellIcon} label="Bildirimler" tint={colors.info} colors={colors} last />
        </Card>

        {user ? (
          <PressableScale onPress={() => signOut()} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: spacing.lg, paddingVertical: spacing.md }}>
            <LogoutIcon color={colors.danger} size={20} />
            <Text variant="bodyStrong" color={colors.danger}>Çıkış yap</Text>
          </PressableScale>
        ) : (
          <PressableScale onPress={() => nav.navigate("Auth")} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.lg }, softShadow(colors.primary, 8)]}>
            <Text variant="h3" color="#fff">Giriş yap / Kayıt ol</Text>
          </PressableScale>
        )}
      </ScrollView>
    </View>
  );
}
