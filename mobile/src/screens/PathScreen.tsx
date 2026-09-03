import React from "react";
import { t } from "../lib/i18n";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Screen } from "../ui/Screen";
import { Skeleton, SkeletonBar, SkeletonCard, SkeletonLine, SkeletonTile, textHeight } from "../ui/Skeleton";
import { Card } from "../ui/Card";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { LearnIcon, ReadIcon, ListenIcon, WriteIcon, GrammarIcon, QuizIcon, CheckIcon, LockIcon } from "../ui/icons";
import { useLearningPath, type LearningPathUnit } from "../lib/useLearningPath";
import { KIND_KEY } from "../data/unit";
import { AppHeader } from "../ui/AppHeader";
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
          <Text variant="micro" color={colors.primary}>{t(isCurrent ? "path.now" : "common.unit")} · {t("common.unit")} {unit.index}</Text>
          <Text variant="h2">{unit.theme}</Text>
          <Text variant="caption" color={colors.textMuted}>{unit.complete ? t("common.completed") : t("path.lessons_done", { n: unit.lessonsDone, toplam: unit.lessonsTotal })}</Text>
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
          <View style={{ width: 44, height: 44, borderRadius: radii.md, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
            {NextIcon({ color: "#fff", size: 20 })}
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="micro" color={colors.textMuted}>{t("path.next", { tur: t(KIND_KEY[next.kind as keyof typeof KIND_KEY] ?? "").toUpperCase() || next.kind.toUpperCase() })}</Text>
            <Text variant="bodyStrong" numberOfLines={1}>{next.title}</Text>
          </View>
        </View>
      )}
      <PressableScale style={{ marginTop: spacing.md }} onPress={onContinue}>
        <View style={[{ borderRadius: radii.lg, backgroundColor: unit.locked ? colors.surface2 : colors.primary, paddingVertical: 15, alignItems: "center" }, unit.locked ? {} : softShadow(colors.primary, 10)]}>
          <Text variant="h3" color={unit.locked ? colors.textFaint : colors.onPrimary}>{t(unit.locked ? "path.finish_previous" : unit.complete ? "path.repeat" : "path.continue")}</Text>
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
        <AppHeader title={t("path.patika")} />
        {/* Gerçek düzenin ölçüleriyle: üst çubuk, alt yazı, öne çıkan ünite
            kartı, ünite ızgarası. Veri gelince hiçbiri yerinden oynamıyor. */}
        <SkeletonBar height={10} style={{ marginBottom: 6 }} />
        <SkeletonLine variant="caption" width="55%" style={{ marginBottom: spacing.lg }} />
        <SkeletonCard style={{ marginBottom: spacing.lg, borderWidth: 2, borderColor: colors.hairline }}>
          <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "center" }}>
            <SkeletonTile size={54} />
            <View style={{ flex: 1 }}>
              <SkeletonLine variant="micro" width={128} />
              <SkeletonLine variant="h2" width="70%" />
              <SkeletonLine variant="caption" width={92} />
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 4, marginTop: spacing.md }}>
            {[0, 1, 2, 3, 4, 5].map((i) => <Skeleton key={i} height={10} radius={5} style={{ flex: 1 }} />)}
          </View>
          <Skeleton height={68} radius={radii.lg} style={{ marginTop: spacing.md }} />
          <Skeleton height={textHeight("h3") + 30} radius={radii.lg} style={{ marginTop: spacing.md }} />
        </SkeletonCard>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
          {[0, 1, 2, 3].map((i) => <Skeleton key={i} height={116} width="47.5%" radius={radii.lg} />)}
        </View>
      </Screen>
    );
  }

  // Ders paketi olmayan kursta ünite üretilemez (bkz. data/lessons). Sessizce boş
  // bir Patika göstermek yerine sebebi ve çalışan yolları söylüyoruz.
  if (!path.units.length) {
    return (
      <Screen>
        <AppHeader title={t("path.patika")} />
        <Card padded style={{ marginTop: spacing.lg }}>
          <Text variant="body" color={colors.textMuted} style={{ lineHeight: 22 }}>{t("path.no_units")}</Text>
        </Card>
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
      <AppHeader title={t("path.patika")} />
      <View style={{ height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden", marginBottom: 6 }}>
        <View style={{ height: "100%", width: `${Math.max(2, pctAll)}%`, borderRadius: 5, backgroundColor: colors.success }} />
      </View>
      <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>
        {t("path.units_done", { seviye: path.level, n: path.doneUnits, toplam: path.totalUnits })}{source === "local" ? t("path.progress_local") : ""}
      </Text>

      {featured && <Featured unit={featured} isCurrent={featured.index === path.currentIndex} colors={colors} onContinue={() => openUnit(featured)} />}

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
        {path.units.map((u) => (
          <PressableScale key={u.id} style={{ width: "47.5%" }} onPress={() => openUnit(u)}>
            <Card padded style={{ minHeight: 116, opacity: u.locked ? 0.6 : 1, borderColor: u.index === path.currentIndex ? colors.primary : colors.border, borderWidth: u.index === path.currentIndex ? 2 : 1 }}>
              <View style={{ width: 44, height: 44, borderRadius: 20, borderWidth: 3, borderColor: u.complete ? colors.success : u.index === path.currentIndex ? colors.primary : colors.border, alignItems: "center", justifyContent: "center" }}>
                {u.complete ? <CheckIcon color={colors.success} size={18} /> : u.locked ? <LockIcon color={colors.textMuted} size={18} /> : <Text variant="bodyStrong" color={u.index === path.currentIndex ? colors.primary : colors.textMuted}>{u.index}</Text>}
              </View>
              <Text variant="bodyStrong" style={{ marginTop: 8 }} numberOfLines={2}>{u.theme}</Text>
              <Text variant="micro" color={u.complete ? colors.success : colors.textMuted} style={{ marginTop: 2 }}>{u.complete ? t("common.completed") : u.locked ? t("common.locked") : t("path.lessons_done", { n: u.lessonsDone, toplam: u.lessonsTotal })}</Text>
            </Card>
          </PressableScale>
        ))}
      </View>
    </Screen>
  );
}
