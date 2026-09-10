import React from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { MenuRow } from "../ui/MenuRow";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, BoltIcon, CheckIcon, ChevronRightIcon, FlameIcon, LearnIcon, PodiumIcon, TrophyIcon, WriteIcon } from "../ui/icons";
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
        {/* ZEMİN `streakDeep`. Ölçüm: beyaz yazı `streak` üstünde açık temada 2.88,
            koyu temada 1.94 - AA'nın büyük yazı eşiği 3.0'ı bile tutmuyor. Koyu
            kehribarda 5.20. Web'in aynı kartı da 500'den 600'e indi. */}
        <View style={[{ borderRadius: radii.xl, backgroundColor: colors.streakDeep, padding: spacing.xl, flexDirection: "row", alignItems: "center", gap: spacing.lg, marginTop: spacing.sm, marginBottom: spacing.lg }, softShadow(colors.streakDeep, 12)]}>
          <View style={{ width: 64, height: 64, borderRadius: radii.lg, backgroundColor: "#ffffff2e", alignItems: "center", justifyContent: "center" }}>
            <FlameIcon color="#fff" size={34} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="display" color="#fff">{me?.streak ?? 0}</Text>
            <Text variant="bodyStrong" color="#fff">{t("progress.day_streak")}</Text>
            {/*
              EN UZUN SERİ. Sunucu bunu zaten gönderiyor (`/api/me`) ve BAŞKASININ
              profilinde görünüyordu (herkese açık profil satırı), ama kendi
              ekranında hiç yoktu. Bugünkü sayı ancak kendi rekoruyla kıyaslanınca
              bir şey söylüyor.
            */}
            {me?.longestStreak ? (
              <Text variant="caption" color="#ffffffe6">{t("progress.longest_streak", { n: me.longestStreak })}</Text>
            ) : null}
          </View>
          <Mascot mood={(me?.streak ?? 0) > 0 ? "happy" : "idle"} size={58} />
        </View>

        {/* istatistik ızgarası */}
        {me ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.lg }}>
            <Stat icon={LearnIcon} value={String(mastered)} label={t("progress.words_learned")} tint={colors.primary} colors={colors} />
            <Stat icon={BoltIcon} value={formatXp(me.xp)} label={t("progress.total_xp")} tint={colors.success} colors={colors} />
            <Stat icon={PodiumIcon} value={formatDuration(me.seconds)} label={t("progress.time_total")} tint={colors.info} colors={colors} />
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

        {/*
          Seviye ilerlemesi. Kart artık DOKUNULABİLİR: "Kelimelerim" profilin
          menüsünde ayrı bir satırdı, oysa bu kartın detayından başka bir şey
          değil. Kart hedefsiz duruyordu, satır da bağlamsızdı; ikisi birleşti.
        */}
        {me ? (
          <PressableScale onPress={() => nav.navigate("Words")} accessibilityLabel={t("profile.my_words")}>
            <Card style={{ marginBottom: spacing.lg }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
                <Text variant="bodyStrong">{t("progress.word_mastery")}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Text variant="caption" color={colors.textMuted}>{mastered}/{totalWords || "—"}</Text>
                  <ChevronRightIcon color={colors.textFaint} size={18} />
                </View>
              </View>
              <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
                <View style={{ height: "100%", width: `${Math.max(3, pct)}%`, backgroundColor: colors.success, borderRadius: 4 }} />
              </View>
            </Card>
          </PressableScale>
        ) : (
          <SkeletonCard style={{ marginBottom: spacing.lg }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
              <SkeletonLine variant="bodyStrong" width={130} />
              <SkeletonLine variant="caption" width={62} />
            </View>
            <SkeletonBar height={8} />
          </SkeletonCard>
        )}

        {/*
          KENDİ ÖLÇÜN BURADA. Profilden taşınan iki satır: yeterlik
          (Yapabildiklerim) ve değerlendirilmiş üretimin arşivi (Yazılarım).
          İkisi de yalnız sana ait ölçüler, yani kimlik değil ilerleme.

          Başarımlar buradan KALDIRILDI: rozet sayısı herkese açık profilde
          görünüyor, yani statü işareti — yeri profil. Aynı ekrana iki giriş
          olmasın diye kart değil satır kaldı.
        */}
        <Card padded style={{ paddingVertical: 0 }}>
          <MenuRow icon={CheckIcon} label={t("profile.what_can_i_do")} tint={colors.success} colors={colors} onPress={() => nav.navigate("Cando")} />
          <MenuRow icon={WriteIcon} label={t("profile.my_posts")} tint={colors.info} colors={colors} onPress={() => nav.navigate("Writings")} last />
        </Card>
      </ScrollView>
    </View>
  );
}
