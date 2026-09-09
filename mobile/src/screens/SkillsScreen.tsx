import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t } from "../lib/i18n";
import { Screen } from "../ui/Screen";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { CardGrid } from "../ui/CardGrid";
import { PressableScale } from "../ui/PressableScale";
import { AppHeader } from "../ui/AppHeader";
import { Skeleton, SkeletonCard, SkeletonLine, textHeight } from "../ui/Skeleton";
import { ReadIcon, ListenIcon, WriteIcon, MicIcon, GrammarIcon, ChevronRightIcon, CheckIcon } from "../ui/icons";
import { useMe } from "../lib/useMe";
import { listOwnSkillMeta, type SkillMeta, type SkillKey } from "../data/skills";
import { getDoneItems } from "../game/lessonProgress";
import { loadOnboardingPrefs } from "../lib/onboardingPrefs";
import { useTheme, spacing, radii, type Palette } from "../theme";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;

type Kind = "read" | "listen" | "write" | "speak" | "grammar";
/**
 * BEŞ beceri (2026-09): konuşma ve dil bilgisi Beceriler kütüphanesiyle geldi.
 * Konuşma oynatıcısı ItemScreen'de (söyleyiş drilli cihaz tanıyıcısıyla,
 * monolog metin üzerinden rubrikle), dil bilgisi anlatım + soru.
 */
const SKILLS: { key: SkillKey; kind: Kind; label: string; icon: (p: { color: string; size: number }) => React.ReactElement; tint: keyof Palette }[] = [
  { key: "reading", kind: "read", label: "skills.reading", icon: ReadIcon, tint: "info" },
  { key: "listening", kind: "listen", label: "skills.listening", icon: ListenIcon, tint: "accent" },
  { key: "writing", kind: "write", label: "skills.writing", icon: WriteIcon, tint: "success" },
  { key: "speaking", kind: "speak", label: "skills.speaking", icon: MicIcon, tint: "primary" },
  { key: "grammar", kind: "grammar", label: "skills.grammar", icon: GrammarIcon, tint: "streak" },
];

function ExerciseRow({ ex, tint, done, isNext, onPress, colors, last }: { ex: SkillMeta; tint: string; done: boolean; isNext: boolean; onPress: () => void; colors: Palette; last: boolean }) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={`${ex.title}, ${t("skills.dk", { n: ex.minutes })}`} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.hairline }}>
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: done ? colors.success : tint }} />
      <View style={{ flex: 1 }}>
        <Text variant="bodyStrong" numberOfLines={1}>{ex.title}</Text>
        <Text variant="caption" color={colors.textMuted}>
          {t(`genre.${ex.genre}`)} · {t("skills.dk", { n: ex.minutes })}
          {isNext ? <Text variant="caption" color={tint}> · {t("skills.next").toLowerCase()}</Text> : null}
        </Text>
      </View>
      {done ? <CheckIcon color={colors.success} size={18} /> : <ChevronRightIcon color={colors.textFaint} size={20} />}
    </PressableScale>
  );
}

/**
 * Beceriler sekmesi — Patika'nın YANINDAKİ serbest çalışma yüzeyi.
 *
 * Yalnız kütüphane egzersizlerini listeler (`listOwnSkillMeta`: `unit` alanı
 * boş olanlar); Patika'nın egzersizleri burada bir daha görünmez. Seviye
 * sekmeleri, beş beceri bölümü, "bitti" işaretleri (cihazdaki tamamlama
 * kümesi) ve tek bir "sıradaki" önerisi: tamamlanma oranı en düşük becerinin
 * ilk bitmemiş egzersizi. Seviyedeki her şey bittiyse öneri bir üst seviye.
 */
export function SkillsScreen() {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { me, loading: meLoading } = useMe();
  const [guestLevel, setGuestLevel] = useState<string | null>(null);
  const [prefsRead, setPrefsRead] = useState(false);
  const [level, setLevel] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(() => new Set());
  useEffect(() => {
    if (meLoading || me) return;
    void loadOnboardingPrefs().then((p) => { setGuestLevel(p.level ?? null); setPrefsRead(true); });
  }, [me, meLoading]);
  // Tamamlanma kümesi her odaklanmada tazelenir: egzersizden dönünce nokta yeşile dönsün.
  useFocusEffect(useCallback(() => {
    let alive = true;
    void getDoneItems().then((s) => { if (alive) setDone(new Set(s)); });
    return () => { alive = false; };
  }, []));
  const activeLevel = level ?? me?.level ?? guestLevel ?? "A1";
  // Seviye bilinmeden liste çizilmez: A1 listesini gösterip A2'ye atlamak
  // ekranı boyundan boyuna değiştiriyordu (kayan konteynerlerin kaynağı).
  const levelReady = !!level || (!meLoading && (!!me || prefsRead));

  const lists = useMemo(
    () => SKILLS.map((s) => {
      const items = listOwnSkillMeta(activeLevel, s.key);
      const next = items.find((e) => !done.has(e.id)) ?? null;
      const finished = items.filter((e) => done.has(e.id)).length;
      return { ...s, items, next, finished, ratio: items.length ? finished / items.length : 1 };
    }),
    [activeLevel, done],
  );
  const hasExercises = lists.some((l) => l.items.length > 0);
  const totalCount = lists.reduce((n, l) => n + l.items.length, 0);
  const doneCount = lists.reduce((n, l) => n + l.finished, 0);
  const suggestion = lists.filter((l) => l.next).sort((a, b) => a.ratio - b.ratio)[0] ?? null;
  const nextLevel = LEVELS[LEVELS.indexOf(activeLevel as (typeof LEVELS)[number]) + 1] ?? null;

  function open(ex: SkillMeta, kind: Kind) {
    nav.navigate("Item", { id: ex.id, kind, title: ex.title, from: "skills" });
  }

  return (
    <Screen>
      <AppHeader title={t("skills.skills")} subtitle={t("skills.aciklama")} />

      {!levelReady ? (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.lg, marginBottom: spacing.sm, marginLeft: 4 }}>
            <SkeletonLine variant="caption" width={54} />
          </View>
          <View style={{ flexDirection: "row", gap: spacing.sm, marginBottom: spacing.lg }}>
            {LEVELS.map((l) => <Skeleton key={l} height={20 + textHeight("bodyStrong")} radius={radii.md} style={{ flex: 1 }} />)}
          </View>
          <CardGrid minItemWidth={440}>
          {SKILLS.map((s) => (
            <View key={s.key} style={{ marginBottom: spacing.xl }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm, marginLeft: 4 }}>
                <Skeleton height={18} width={18} radius={9} />
                <SkeletonLine variant="h3" width={92} />
                <SkeletonLine variant="caption" width={74} />
              </View>
              <SkeletonCard padded style={{ paddingVertical: 4 }}>
                {[0, 1, 2].map((i) => (
                  <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderBottomWidth: i === 2 ? 0 : 1, borderBottomColor: colors.hairline }}>
                    <Skeleton height={8} width={8} radius={4} />
                    <View style={{ flex: 1 }}>
                      <SkeletonLine variant="bodyStrong" width="70%" />
                      <SkeletonLine variant="caption" width="40%" />
                    </View>
                    <Skeleton height={20} width={20} radius={10} />
                  </View>
                ))}
              </SkeletonCard>
            </View>
          ))}
          </CardGrid>
        </>
      ) : (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.lg, marginBottom: spacing.sm, marginLeft: 4 }}>
            <Text variant="caption" color={colors.textMuted} style={{ letterSpacing: 0.5 }}>{t("skills.level")}</Text>
            {hasExercises ? <Text variant="caption" color={colors.textMuted}>{t("skills.done_of", { done: doneCount, total: totalCount })}</Text> : null}
          </View>
          <View style={{ flexDirection: "row", gap: spacing.sm, marginBottom: spacing.lg }} accessibilityRole="tablist">
            {LEVELS.map((l) => {
              const active = activeLevel === l;
              return (
                <PressableScale key={l} onPress={() => setLevel(l)} accessibilityRole="tab" accessibilityState={{ selected: active }} style={{ flex: 1, paddingVertical: 10, borderRadius: radii.md, alignItems: "center", borderWidth: 1.5, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface }}>
                  <Text variant="bodyStrong" color={active ? colors.primary : colors.textMuted}>{l}</Text>
                </PressableScale>
              );
            })}
          </View>

          {!hasExercises ? (
            <Card padded>
              <Text variant="body" color={colors.textMuted} style={{ lineHeight: 22 }}>{t("skills.this_course_has_no_reading")}</Text>
            </Card>
          ) : null}

          {/* Tek öneri: en geride kalan becerinin sıradaki egzersizi; hepsi
              bittiyse bir üst seviye. Öğrenci "ne çalışsam" diye listeyi taramasın. */}
          {suggestion?.next ? (
            <PressableScale onPress={() => open(suggestion.next!, suggestion.kind)} style={{ marginBottom: spacing.lg }}>
              <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <View style={{ width: 40, height: 40, borderRadius: radii.md, backgroundColor: colors.surface2, alignItems: "center", justifyContent: "center" }}>
                  <suggestion.icon color={colors[suggestion.tint] as string} size={20} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text variant="micro" color={colors[suggestion.tint] as string}>{t("skills.next").toUpperCase()} · {t(suggestion.label).toUpperCase()}</Text>
                  <Text variant="bodyStrong" numberOfLines={1}>{suggestion.next.title}</Text>
                  <Text variant="caption" color={colors.textMuted} numberOfLines={2}>
                    {suggestion.ratio === 0
                      ? t("skills.next_start", { skill: t(suggestion.label) })
                      : t("skills.next_behind", { skill: t(suggestion.label), pct: Math.round(suggestion.ratio * 100) })}
                  </Text>
                </View>
                <ChevronRightIcon color={colors.textFaint} size={20} />
              </Card>
            </PressableScale>
          ) : hasExercises && nextLevel ? (
            <PressableScale onPress={() => setLevel(nextLevel)} style={{ marginBottom: spacing.lg }}>
              <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <View style={{ flex: 1 }}>
                  <Text variant="micro" color={colors.success}>{t("skills.level_done").toUpperCase()}</Text>
                  <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>{t("skills.level_done_body", { level: activeLevel, next: nextLevel })}</Text>
                </View>
                <ChevronRightIcon color={colors.textFaint} size={20} />
              </Card>
            </PressableScale>
          ) : null}

          {/* Geniş ekranda beceri bölümleri yan yana: tek sütunda okuma bitmeden
              dinlemeyi görmek için kaydırmak gerekiyordu. Telefonda ve dar
              kapta CardGrid hiç sarmalamıyor, düzen birebir eskisi. */}
          <CardGrid minItemWidth={440}>
          {lists.map((s) => {
            if (!s.items.length) return null;
            const tint = colors[s.tint] as string;
            return (
              <View key={s.key} style={{ marginBottom: spacing.xl }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm, marginLeft: 4 }}>
                  <s.icon color={tint} size={18} />
                  <Text variant="h3">{t(s.label)}</Text>
                  <Text variant="caption" color={colors.textMuted}>{s.finished}/{s.items.length}</Text>
                </View>
                <Card padded style={{ paddingVertical: 4 }}>
                  {s.items.map((ex, i) => (
                    <ExerciseRow key={ex.id} ex={ex} tint={tint} done={done.has(ex.id)} isNext={s.next?.id === ex.id} last={i === s.items.length - 1} colors={colors} onPress={() => open(ex, s.kind)} />
                  ))}
                </Card>
              </View>
            );
          })}
          </CardGrid>
        </>
      )}
    </Screen>
  );
}
