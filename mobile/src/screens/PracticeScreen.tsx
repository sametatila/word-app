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
import { ArrowBackIcon, BoltIcon, QuizIcon, GrammarIcon, WriteIcon, ListenIcon, CheckIcon, SkillsIcon, LearnIcon, ReadIcon, ArrowRightIcon } from "../ui/icons";
import { Skeleton } from "../ui/Skeleton";
import { practiceGamesFor } from "../game/session";
import { useMe } from "../lib/useMe";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

/** Oyun → ikon + renk (görsel çeşitlilik). */
const META: Record<string, { icon: (p: { color: string; size: number }) => React.ReactElement; tint: keyof Palette }> = {
  choice: { icon: (p) => <QuizIcon {...p} />, tint: "primary" },
  artikel: { icon: (p) => <GrammarIcon {...p} />, tint: "streak" },
  cloze: { icon: (p) => <WriteIcon {...p} />, tint: "info" },
  typing: { icon: (p) => <LearnIcon {...p} />, tint: "success" },
  listen: { icon: (p) => <ListenIcon {...p} />, tint: "accent" },
  truefalse: { icon: (p) => <CheckIcon {...p} />, tint: "primary" },
  match: { icon: (p) => <SkillsIcon {...p} />, tint: "info" },
  scramble: { icon: (p) => <LearnIcon {...p} />, tint: "streak" },
  order: { icon: (p) => <GrammarIcon {...p} />, tint: "accent" },
  plural: { icon: (p) => <QuizIcon {...p} />, tint: "success" },
  translate: { icon: (p) => <ReadIcon {...p} />, tint: "primary" },
};

export function PracticeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  // Tek-oyun listesi kursa göre eleniyor: artikel/çoğul yalnız artikelli
  // dillerde anlamlı (bkz. game/session.ts practiceGamesFor).
  const { me, loading: meLoading } = useMe();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.geri")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="h2">{t("practice.pratik")}</Text>
          <Text variant="caption" color={colors.textMuted}>{t("practice.tek_bir_oyunu_kendi_kelimelerinle_calis")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* Karışık taze tur */}
        <PressableScale onPress={() => nav.navigate("Game", {})} style={{ marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <View style={[{ borderRadius: radii.xl, overflow: "hidden", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
            <View style={{ padding: spacing.xl, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
              <View style={{ width: 46, height: 46, borderRadius: radii.md, backgroundColor: "#ffffff2e", alignItems: "center", justifyContent: "center" }}>
                <BoltIcon color="#fff" size={24} />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="h3" color="#fff">{t("practice.karisik_tur")}</Text>
                <Text variant="caption" color="#ffffffdd">{t("practice.tum_oyun_turleri_bir_arada")}</Text>
              </View>
              <ArrowRightIcon color="#fff" size={20} />
            </View>
          </View>
        </PressableScale>

        <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4, textTransform: "uppercase", letterSpacing: 1 }}>{t("practice.tek_oyun")}</Text>
        {/* Oyun listesi kursa bağlı: kurs bilinmeden çizilirse karo sayısı
            sonradan değişip ızgara boyunu oynatıyor. Önce aynı boyda iskelet. */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
          {meLoading ? [0, 1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} height={116} width="47.5%" radius={radii.xl} />
          )) : practiceGamesFor(me?.course).map((g) => {
            const m = META[g.game] ?? { icon: (p: { color: string; size: number }) => <QuizIcon {...p} />, tint: "primary" as keyof Palette };
            const tint = colors[m.tint] as string;
            return (
              <PressableScale key={g.game} onPress={() => nav.navigate("Game", { game: g.game })} style={{ width: "47.5%" }}>
                <Card padded style={{ minHeight: 116, justifyContent: "space-between" }}>
                  <View style={[{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint }, softShadow(tint, 6)]}>
                    {m.icon({ color: "#fff", size: 22 })}
                  </View>
                  <Text variant="bodyStrong" style={{ marginTop: spacing.md }}>{g.label}</Text>
                </Card>
              </PressableScale>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
