import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Screen } from "../ui/Screen";
import { Card } from "../ui/Card";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { LearnIcon, ReadIcon, ListenIcon, WriteIcon, GrammarIcon, QuizIcon, CheckIcon } from "../ui/icons";
import { usePatika, type Patika, type PatikaUnit } from "../lib/usePatika";
import { KIND_LABEL } from "../data/demoUnit";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

const KIND_ICON: Record<string, (p: { color: string; size: number }) => React.ReactElement> = {
  lesson: (p) => <LearnIcon {...p} />, read: (p) => <ReadIcon {...p} />, listen: (p) => <ListenIcon {...p} />,
  write: (p) => <WriteIcon {...p} />, grammar: (p) => <GrammarIcon {...p} />, quiz: (p) => <QuizIcon {...p} />, checkpoint: (p) => <CheckIcon {...p} />,
};

/** Misafir/çevrimdışı için demo Patika — gerçek veri gelince yerini alır. */
const DEMO_PATIKA: Patika = {
  level: "A1", currentIndex: 2, doneUnits: 1, totalUnits: 4,
  units: [
    { id: "d1", index: 1, group: 1, theme: "Selamlaşma & sen", locked: false, complete: true, done: 8, total: 8, lessonsDone: 3, lessonsTotal: 3, items: [] },
    { id: "d2", index: 2, group: 1, theme: "Tanışma ve ben", locked: false, complete: false, done: 3, total: 13, lessonsDone: 1, lessonsTotal: 4, items: [
      { id: "d2-1", kind: "lesson", title: "Merhaba, ben Emma", titleTr: null, playable: true, done: true },
      { id: "d2-2", kind: "read", title: "Ich heiße Emma", titleTr: null, playable: true, done: true },
      { id: "d2-3", kind: "grammar", title: "sein fiili", titleTr: null, playable: true, done: true },
      { id: "d2-4", kind: "listen", title: "Ich heiße Emma", titleTr: null, playable: true, done: false },
      ...Array.from({ length: 9 }, (_, i) => ({ id: `d2-${i + 5}`, kind: "lesson", title: "…", titleTr: null, playable: false, done: false })),
    ] },
    { id: "d3", index: 3, group: 1, theme: "Şehirde", locked: true, complete: false, done: 0, total: 12, lessonsDone: 0, lessonsTotal: 4, items: [] },
    { id: "d4", index: 4, group: 1, theme: "Yeme-içme", locked: true, complete: false, done: 0, total: 12, lessonsDone: 0, lessonsTotal: 4, items: [] },
  ],
};

function Featured({ unit, isCurrent, colors, onContinue }: { unit: PatikaUnit; isCurrent: boolean; colors: Palette; onContinue: () => void }) {
  const next = unit.items.find((i) => i.playable && !i.done) ?? null;
  const NextIcon = next ? KIND_ICON[next.kind] : null;
  return (
    <Card style={{ marginBottom: spacing.lg, borderColor: colors.primary, borderWidth: 2 }}>
      <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "center" }}>
        <View style={[{ width: 54, height: 54, borderRadius: radii.md, backgroundColor: unit.complete ? colors.success : colors.primary, alignItems: "center", justifyContent: "center" }, softShadow(colors.primary, 8)]}>
          {unit.complete ? <CheckIcon color="#fff" size={26} /> : <Text variant="h1" color="#fff">{unit.index}</Text>}
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="micro" color={colors.primary}>{isCurrent ? "ŞU AN" : "ÜNİTE"} · ÜNİTE {unit.index}</Text>
          <Text variant="h2">{unit.theme}</Text>
          <Text variant="caption" color={colors.textMuted}>{unit.complete ? "Tamamlandı" : `${unit.done}/${unit.total} adım`}</Text>
        </View>
      </View>
      {unit.items.length > 0 && (
        <View style={{ flexDirection: "row", gap: 4, marginTop: spacing.md }}>
          {unit.items.map((it) => (
            <View key={it.id} style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: it.done ? colors.success : it === next ? colors.primary : colors.surface2 }} />
          ))}
        </View>
      )}
      {next && NextIcon && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.md, padding: spacing.md, borderRadius: radii.lg, backgroundColor: colors.surface2 }}>
          <View style={{ width: 40, height: 40, borderRadius: radii.md, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
            {NextIcon({ color: "#fff", size: 20 })}
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="micro" color={colors.textMuted}>SIRADAKİ · {(KIND_LABEL[next.kind as keyof typeof KIND_LABEL] ?? next.kind).toUpperCase()}</Text>
            <Text variant="bodyStrong">{next.title}</Text>
          </View>
        </View>
      )}
      <PressableScale style={{ marginTop: spacing.md }} onPress={onContinue}>
        <View style={[{ borderRadius: radii.lg, backgroundColor: unit.locked ? colors.surface2 : colors.primary, paddingVertical: 15, alignItems: "center" }, unit.locked ? {} : softShadow(colors.primary, 10)]}>
          <Text variant="h3" color={unit.locked ? colors.textFaint : colors.onPrimary}>{unit.locked ? "🔒 Önce önceki üniteyi bitir" : unit.complete ? "Tekrar et →" : "Devam et →"}</Text>
        </View>
      </PressableScale>
    </Card>
  );
}

export function PathScreen() {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { data } = usePatika();
  const patika = data ?? DEMO_PATIKA;
  const featured = patika.units.find((u) => u.index === patika.currentIndex) ?? patika.units[0];
  const pctAll = patika.totalUnits ? Math.round((patika.doneUnits / patika.totalUnits) * 100) : 0;

  function openUnit(u: PatikaUnit) {
    if (u.locked) return;
    nav.navigate("Unit", { index: u.index, theme: u.theme, items: u.items });
  }

  return (
    <Screen>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md }}>
        <Text variant="display">Patika</Text>
        <View style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 7 }}>
          <Text variant="caption" color={colors.textMuted}>{patika.level}</Text>
        </View>
      </View>
      <View style={{ height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden", marginBottom: 6 }}>
        <View style={{ height: "100%", width: `${Math.max(2, pctAll)}%`, borderRadius: 5, backgroundColor: colors.success }} />
      </View>
      <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>{patika.level} · {patika.doneUnits}/{patika.totalUnits} ünite tamam</Text>

      {featured && <Featured unit={featured} isCurrent={featured.index === patika.currentIndex} colors={colors} onContinue={() => openUnit(featured)} />}

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
        {patika.units.map((u) => (
          <PressableScale key={u.id} style={{ width: "47.5%" }} onPress={() => openUnit(u)}>
            <Card padded style={{ minHeight: 116, opacity: u.locked ? 0.6 : 1, borderColor: u.index === patika.currentIndex ? colors.primary : colors.border, borderWidth: u.index === patika.currentIndex ? 2 : 1 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 3, borderColor: u.complete ? colors.success : u.index === patika.currentIndex ? colors.primary : colors.border, alignItems: "center", justifyContent: "center" }}>
                {u.complete ? <CheckIcon color={colors.success} size={18} /> : u.locked ? <Text variant="bodyStrong" color={colors.textMuted}>🔒</Text> : <Text variant="bodyStrong" color={u.index === patika.currentIndex ? colors.primary : colors.textMuted}>{u.index}</Text>}
              </View>
              <Text variant="bodyStrong" style={{ marginTop: 8 }} numberOfLines={2}>{u.theme}</Text>
              <Text variant="micro" color={u.complete ? colors.success : colors.textMuted} style={{ marginTop: 2 }}>{u.complete ? "Tamamlandı" : u.locked ? "Kilitli" : `${u.done}/${u.total}`}</Text>
            </Card>
          </PressableScale>
        ))}
      </View>
    </Screen>
  );
}
