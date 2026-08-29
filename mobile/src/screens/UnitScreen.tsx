import React from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, LearnIcon, ReadIcon, ListenIcon, WriteIcon, GrammarIcon, QuizIcon, LockIcon } from "../ui/icons";
import { KIND_LABEL, type ItemKind } from "../data/demoUnit";
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
  const raw = (params.items ?? []).map((i) => ({
    id: i.id, kind: i.kind as ItemKind, title: i.title, done: i.done, playable: i.playable, ref: i.ref ?? null,
  }));
  // "Şimdi" = ilk oynanabilir + bitmemiş adım (dersler her zaman oynanabilir).
  const currentId = raw.find((i) => i.playable && !i.done)?.id;
  const items = raw.map((i) => ({ ...i, current: i.id === currentId }));
  const done = items.filter((i) => i.done).length;
  const pct = items.length ? Math.round((done / items.length) * 100) : 0;

  function openItem(it: (typeof items)[number]) {
    if (it.kind === "lesson") { if (it.ref) nav.navigate("Lesson", { id: it.ref }); return; }
    if (!it.playable) return; // beceri/quiz/kontrol içeriği yayına alınınca açılır
    nav.navigate("Item", { id: it.id, kind: it.kind, title: it.title });
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ChevronLeftIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="micro" color={colors.textMuted}>{params.level} · ÜNİTE {params.index}</Text>
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
            const soon = !it.playable && it.kind !== "lesson"; // içerik henüz canlı değil
            const tint = colors[(KIND_TINT[it.kind] ?? "primary")] as string;
            const Icon = KIND_ICON[it.kind] ?? KIND_ICON.lesson;
            return (
              <PressableScale key={it.id} onPress={() => openItem(it)} style={{ opacity: soon ? 0.6 : 1 }}>
                <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderWidth: it.current ? 2 : 1, borderColor: it.current ? colors.primary : colors.hairline }}>
                  <View style={[{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: soon ? colors.surface2 : tint }, !soon ? softShadow(tint, 6) : {}]}>
                    <Icon color={soon ? colors.textFaint : "#fff"} size={22} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="micro" color={colors.textMuted}>{KIND_LABEL[it.kind] ?? it.kind}</Text>
                    <Text variant="bodyStrong" numberOfLines={1}>{it.title}</Text>
                  </View>
                  {it.done ? (
                    <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center" }}>
                      <CheckIcon color={colors.success} size={16} />
                    </View>
                  ) : soon ? (
                    <View style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 4 }}>
                      <Text variant="micro" color={colors.textMuted}>Yakında</Text>
                    </View>
                  ) : it.current ? (
                    <View style={{ backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 4 }}>
                      <Text variant="micro" color={colors.primary}>Şimdi</Text>
                    </View>
                  ) : it.playable ? (
                    <ChevronRightIcon color={colors.textFaint} size={20} />
                  ) : (
                    <LockIcon color={colors.textFaint} size={18} />
                  )}
                </Card>
              </PressableScale>
            );
          })}
        </View>

        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xl, textAlign: "center" }}>
          Okuma · dinleme · yazma · quiz içeriği yayına alınınca burada açılır.
        </Text>
      </ScrollView>
    </View>
  );
}
