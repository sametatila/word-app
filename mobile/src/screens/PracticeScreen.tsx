import React from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ChevronLeftIcon, BoltIcon, QuizIcon, GrammarIcon, WriteIcon, ListenIcon, CheckIcon, SkillsIcon, LearnIcon, ReadIcon, ArrowRightIcon } from "../ui/icons";
import { PRACTICE_GAMES } from "../game/session";
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

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ChevronLeftIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="h2">Pratik</Text>
          <Text variant="caption" color={colors.textMuted}>Tek bir oyunu kendi kelimelerinle çalış</Text>
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
                <Text variant="h3" color="#fff">Karışık tur</Text>
                <Text variant="caption" color="#ffffffdd">Tüm oyun türleri bir arada</Text>
              </View>
              <ArrowRightIcon color="#fff" size={20} />
            </View>
          </View>
        </PressableScale>

        <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4, textTransform: "uppercase", letterSpacing: 1 }}>Tek oyun</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
          {PRACTICE_GAMES.map((g) => {
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
