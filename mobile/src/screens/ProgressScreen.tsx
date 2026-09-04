import React from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, ChevronRightIcon, FlameIcon, BoltIcon, LearnIcon, TrophyIcon, PodiumIcon } from "../ui/icons";
import { Mascot } from "../ui/Mascot";
import { SkeletonBar, SkeletonCard, SkeletonLine, SkeletonTile } from "../ui/Skeleton";
import { useMe, formatXp, formatDuration } from "../lib/useMe";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";
import { useLayout } from "../lib/useLayout";

function Stat({ icon: Icon, value, label, tint, colors }: { icon: (p: { color: string; size: number }) => React.ReactElement; value: string; label: string; tint: string; colors: Palette }) {
  const { gridItemWidth } = useLayout();
  return (
    <Card padded style={{ width: gridItemWidth, gap: 6 }}>
      <View style={{ width: 38, height: 38, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint + "22" }}>
        <Icon color={tint} size={20} />
      </View>
      <Text variant="h1" color={colors.text}>{value}</Text>
      <Text variant="caption" color={colors.textMuted}>{label}</Text>
    </Card>
  );
}

/**
 * Gelişim — header'daki seri rozetine dokununca açılır (profil yerine, daha
 * mantıklı). Seri, XP, öğrenilen kelime, süre, seviye ilerlemesi; başarımlara giriş.
 */
export function ProgressScreen() {
  const { colors } = useTheme();
  const { gridItemWidth } = useLayout();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { me } = useMe();
  const level = me?.level ?? "A1";
  const mastered = me?.mastered ?? 0;
  const totalWords = me?.totalWords ?? 0;
  const pct = totalWords ? Math.min(100, Math.round((mastered / totalWords) * 100)) : 0;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">{t("progress.progress")}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* seri kahramanı */}
        <View style={[{ borderRadius: radii.xl, backgroundColor: colors.streak, padding: spacing.xl, flexDirection: "row", alignItems: "center", gap: spacing.lg, marginTop: spacing.sm, marginBottom: spacing.lg }, softShadow(colors.streak, 12)]}>
          <View style={{ width: 64, height: 64, borderRadius: radii.lg, backgroundColor: "#ffffff2e", alignItems: "center", justifyContent: "center" }}>
            <FlameIcon color="#fff" size={34} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="display" color="#fff">{me?.streak ?? 0}</Text>
            <Text variant="bodyStrong" color="#ffffffdd">{t("progress.day_streak")}</Text>
          </View>
          <Mascot mood={(me?.streak ?? 0) > 0 ? "happy" : "idle"} size={58} />
        </View>

        {/* istatistik ızgarası */}
        {me ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.lg }}>
            <Stat icon={LearnIcon} value={String(mastered)} label={t("progress.words_learned")} tint={colors.primary} colors={colors} />
            <Stat icon={BoltIcon} value={formatXp(me.xp)} label={t("progress.total_xp")} tint={colors.success} colors={colors} />
            <Stat icon={PodiumIcon} value={formatDuration(me.seconds)} label={t("progress.time_this_week")} tint={colors.info} colors={colors} />
            <Stat icon={TrophyIcon} value={level} label={t("progress.level")} tint={colors.accent} colors={colors} />
          </View>
        ) : (
          // Izgaranın kendi iskeleti (tek satırlık "yükleniyor" kartı yerine):
          // dört karo gelince ekran iki satır boyu uzamasın.
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.lg }}>
            {[0, 1, 2, 3].map((i) => (
              <SkeletonCard key={i} style={{ width: gridItemWidth, gap: 6 }}>
                <SkeletonTile size={38} />
                <SkeletonLine variant="h1" width="55%" />
                <SkeletonLine variant="caption" width="85%" />
              </SkeletonCard>
            ))}
          </View>
        )}

        {/* seviye ilerlemesi */}
        {me ? (
          <Card style={{ marginBottom: spacing.lg }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
              <Text variant="bodyStrong">{t("progress.word_mastery")}</Text>
              <Text variant="caption" color={colors.textMuted}>{mastered}/{totalWords || "—"}</Text>
            </View>
            <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
              <View style={{ height: "100%", width: `${Math.max(3, pct)}%`, backgroundColor: colors.success, borderRadius: 4 }} />
            </View>
          </Card>
        ) : (
          <SkeletonCard style={{ marginBottom: spacing.lg }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
              <SkeletonLine variant="bodyStrong" width={130} />
              <SkeletonLine variant="caption" width={62} />
            </View>
            <SkeletonBar height={8} />
          </SkeletonCard>
        )}

        {/* başarımlar */}
        <PressableScale onPress={() => nav.navigate("Achievements")}>
          <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <View style={{ width: 38, height: 38, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.streak + "22" }}>
              <TrophyIcon color={colors.streak} size={20} />
            </View>
            <Text variant="bodyStrong" style={{ flex: 1 }}>{t("progress.achievements")}</Text>
            <ChevronRightIcon color={colors.textFaint} size={20} />
          </Card>
        </PressableScale>
      </ScrollView>
    </View>
  );
}
