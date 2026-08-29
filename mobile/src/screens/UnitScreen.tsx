import React from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ChevronLeftIcon, CheckIcon, LearnIcon, ReadIcon, ListenIcon, WriteIcon, GrammarIcon, QuizIcon } from "../ui/icons";
import { DEMO_UNIT_ITEMS, KIND_LABEL, type ItemKind } from "../data/demoUnit";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

const KIND_ICON: Record<ItemKind, (p: { color: string; size: number }) => React.ReactElement> = {
  lesson: (p) => <LearnIcon {...p} />, read: (p) => <ReadIcon {...p} />, listen: (p) => <ListenIcon {...p} />,
  write: (p) => <WriteIcon {...p} />, grammar: (p) => <GrammarIcon {...p} />, quiz: (p) => <QuizIcon {...p} />,
  checkpoint: (p) => <CheckIcon {...p} />,
};
const KIND_TINT: Record<ItemKind, keyof Palette> = {
  lesson: "primary", read: "info", listen: "accent", write: "success", grammar: "streak", quiz: "primary", checkpoint: "danger",
};

export function UnitScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { params } = useRoute<RouteProp<RootStackParams, "Unit">>();
  const items = DEMO_UNIT_ITEMS;
  const done = items.filter((i) => i.status === "done").length;
  const pct = Math.round((done / items.length) * 100);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ChevronLeftIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="micro" color={colors.textMuted}>A1 · ÜNİTE {params.index}</Text>
          <Text variant="h2">{params.theme}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        <View style={{ height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden", marginTop: spacing.sm, marginBottom: 6 }}>
          <View style={{ height: "100%", width: `${pct}%`, backgroundColor: colors.success, borderRadius: 5 }} />
        </View>
        <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>{done}/{items.length} adım tamam</Text>

        <View style={{ gap: spacing.md }}>
          {items.map((it) => {
            const locked = it.status === "locked";
            const current = it.status === "current";
            const tint = colors[KIND_TINT[it.kind]] as string;
            const Icon = KIND_ICON[it.kind];
            return (
              <PressableScale key={it.id} onPress={() => !locked && nav.navigate("Game")} style={{ opacity: locked ? 0.55 : 1 }}>
                <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderWidth: current ? 2 : 1, borderColor: current ? colors.primary : colors.hairline }}>
                  <View style={[{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: locked ? colors.surface2 : tint }, !locked ? softShadow(tint, 6) : {}]}>
                    <Icon color={locked ? colors.textFaint : "#fff"} size={22} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="micro" color={colors.textMuted}>{KIND_LABEL[it.kind]}</Text>
                    <Text variant="bodyStrong">{it.title}</Text>
                  </View>
                  {it.status === "done" ? (
                    <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center" }}>
                      <CheckIcon color={colors.success} size={16} />
                    </View>
                  ) : current ? (
                    <View style={{ backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 4 }}>
                      <Text variant="micro" color={colors.primary}>Şimdi</Text>
                    </View>
                  ) : (
                    <Text variant="caption" color={colors.textFaint}>🔒</Text>
                  )}
                </Card>
              </PressableScale>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
