import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Screen } from "../ui/Screen";
import { Skeleton } from "../ui/Skeleton";
import { Card } from "../ui/Card";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { LearnIcon, ReadIcon, ListenIcon, WriteIcon, GrammarIcon, QuizIcon, CheckIcon, LockIcon } from "../ui/icons";
import { useLearningPath, type LearningPathUnit } from "../lib/useLearningPath";
import { KIND_LABEL } from "../data/demoUnit";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

const KIND_ICON: Record<string, (p: { color: string; size: number }) => React.ReactElement> = {
  lesson: (p) => <LearnIcon {...p} />, read: (p) => <ReadIcon {...p} />, listen: (p) => <ListenIcon {...p} />,
  write: (p) => <WriteIcon {...p} />, grammar: (p) => <GrammarIcon {...p} />, quiz: (p) => <QuizIcon {...p} />, checkpoint: (p) => <CheckIcon {...p} />,
};

function Featured({ unit, isCurrent, colors, onContinue }: { unit: LearningPathUnit; isCurrent: boolean; colors: Palette; onContinue: () => void }) {
  const next = unit.items.find((i) => i.kind === "lesson" && i.playable && !i.done) ?? unit.items.find((i) => i.playable && !i.done) ?? null;
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
          <Text variant="caption" color={colors.textMuted}>{unit.complete ? "Tamamlandı" : `${unit.lessonsDone}/${unit.lessonsTotal} ders`}</Text>
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
            <Text variant="bodyStrong" numberOfLines={1}>{next.title}</Text>
          </View>
        </View>
      )}
      <PressableScale style={{ marginTop: spacing.md }} onPress={onContinue}>
        <View style={[{ borderRadius: radii.lg, backgroundColor: unit.locked ? colors.surface2 : colors.primary, paddingVertical: 15, alignItems: "center" }, unit.locked ? {} : softShadow(colors.primary, 10)]}>
          <Text variant="h3" color={unit.locked ? colors.textFaint : colors.onPrimary}>{unit.locked ? "Önce önceki üniteyi bitir" : unit.complete ? "Tekrar et →" : "Devam et →"}</Text>
        </View>
      </PressableScale>
    </Card>
  );
}

export function PathScreen() {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { data: path, source } = useLearningPath();

  if (!path) {
    // Düz spinner yerine patika şeklinde iskelet (algılanan hız).
    return (
      <Screen>
        <Text variant="display" style={{ marginBottom: spacing.lg }}>Patika</Text>
        <Skeleton height={10} radius={5} style={{ marginBottom: 8 }} />
        <Skeleton height={14} width="55%" radius={7} style={{ marginBottom: spacing.lg }} />
        <Skeleton height={196} radius={radii.xl} style={{ marginBottom: spacing.lg }} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
          {[0, 1, 2, 3].map((i) => <Skeleton key={i} height={116} width="47.5%" radius={radii.lg} />)}
        </View>
      </Screen>
    );
  }

  const featured = path.units.find((u) => u.index === path.currentIndex) ?? path.units[0];
  const pctAll = path.totalUnits ? Math.round((path.doneUnits / path.totalUnits) * 100) : 0;

  function openUnit(u: LearningPathUnit) {
    if (u.locked) return;
    nav.navigate("Unit", { index: u.index, level: path!.level, theme: u.theme, items: u.items });
  }

  return (
    <Screen>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md }}>
        <Text variant="display">Patika</Text>
        <View style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 7 }}>
          <Text variant="caption" color={colors.textMuted}>{path.level}</Text>
        </View>
      </View>
      <View style={{ height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden", marginBottom: 6 }}>
        <View style={{ height: "100%", width: `${Math.max(2, pctAll)}%`, borderRadius: 5, backgroundColor: colors.success }} />
      </View>
      <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>
        {path.level} · {path.doneUnits}/{path.totalUnits} ünite tamam{source === "local" ? " · ilerleme cihazda" : ""}
      </Text>

      {featured && <Featured unit={featured} isCurrent={featured.index === path.currentIndex} colors={colors} onContinue={() => openUnit(featured)} />}

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
        {path.units.map((u) => (
          <PressableScale key={u.id} style={{ width: "47.5%" }} onPress={() => openUnit(u)}>
            <Card padded style={{ minHeight: 116, opacity: u.locked ? 0.6 : 1, borderColor: u.index === path.currentIndex ? colors.primary : colors.border, borderWidth: u.index === path.currentIndex ? 2 : 1 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 3, borderColor: u.complete ? colors.success : u.index === path.currentIndex ? colors.primary : colors.border, alignItems: "center", justifyContent: "center" }}>
                {u.complete ? <CheckIcon color={colors.success} size={18} /> : u.locked ? <LockIcon color={colors.textMuted} size={18} /> : <Text variant="bodyStrong" color={u.index === path.currentIndex ? colors.primary : colors.textMuted}>{u.index}</Text>}
              </View>
              <Text variant="bodyStrong" style={{ marginTop: 8 }} numberOfLines={2}>{u.theme}</Text>
              <Text variant="micro" color={u.complete ? colors.success : colors.textMuted} style={{ marginTop: 2 }}>{u.complete ? "Tamamlandı" : u.locked ? "Kilitli" : `${u.lessonsDone}/${u.lessonsTotal} ders`}</Text>
            </Card>
          </PressableScale>
        ))}
      </View>
    </Screen>
  );
}
