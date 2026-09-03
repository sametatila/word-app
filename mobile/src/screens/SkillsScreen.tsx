import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t } from "../lib/i18n";
import { Screen } from "../ui/Screen";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { AppHeader } from "../ui/AppHeader";
import { Skeleton, SkeletonCard, SkeletonLine, textHeight } from "../ui/Skeleton";
import { ReadIcon, ListenIcon, WriteIcon, WalkIcon, ChevronRightIcon, CheckIcon, PathIcon } from "../ui/icons";
import { useMe } from "../lib/useMe";
import { useMicrophone } from "../lib/useMicrophone";
import { listSkillMeta, type SkillMeta } from "../data/skills";
import { loadOnboardingPrefs } from "../lib/onboardingPrefs";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;

type SkillKey = "reading" | "listening" | "writing";
const SKILLS: { key: SkillKey; kind: "read" | "listen" | "write"; label: string; icon: (p: { color: string; size: number }) => React.ReactElement; tint: keyof Palette }[] = [
  { key: "reading", kind: "read", label: "skills.okuma", icon: ReadIcon, tint: "info" },
  { key: "listening", kind: "listen", label: "skills.dinleme", icon: ListenIcon, tint: "accent" },
  { key: "writing", kind: "write", label: "skills.yazma", icon: WriteIcon, tint: "success" },
];

function ExerciseRow({ ex, tint, done, onPress, colors, last }: { ex: SkillMeta; tint: string; done: boolean; onPress: () => void; colors: Palette; last: boolean }) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={`${ex.title}, ${t("skills.dk", { n: ex.minutes })}`} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.hairline }}>
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: done ? colors.success : tint }} />
      <View style={{ flex: 1 }}>
        <Text variant="bodyStrong" numberOfLines={1}>{ex.title}</Text>
        <Text variant="caption" color={colors.textMuted}>{ex.genre} · {t("skills.dk", { n: ex.minutes })}</Text>
      </View>
      {done ? <CheckIcon color={colors.success} size={18} /> : <ChevronRightIcon color={colors.textFaint} size={20} />}
    </PressableScale>
  );
}

function SpeakingRow({ title, subtitle, icon: Icon, tint, onPress, colors }: { title: string; subtitle: string; icon: (p: { color: string; size: number }) => React.ReactElement; tint: string; onPress: () => void; colors: Palette }) {
  return (
    <PressableScale onPress={onPress} style={{ marginBottom: spacing.md }}>
      <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={[{ width: 48, height: 48, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint }, softShadow(tint, 6)]}>
          <Icon color="#fff" size={24} />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="h3">{title}</Text>
          <Text variant="caption" color={colors.textMuted}>{subtitle}</Text>
        </View>
        <ChevronRightIcon color={colors.textFaint} size={20} />
      </Card>
    </PressableScale>
  );
}

/**
 * Beceriler sekmesi: dört becerinin merkezi. Okuma, dinleme ve yazma için seviyeye
 * göre gerçek alıştırma listesi (data/skills, kursa bağlı); konuşma için yürüyüş modu
 * ve ders diyalogları. Kursun alıştırma paketi yoksa yalnız konuşma bölümü görünür;
 * yer tutucu, "yakında" ya da uydurma sayaç yok.
 */
export function SkillsScreen() {
  const mic = useMicrophone();
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { me, loading: meLoading } = useMe();
  const [guestLevel, setGuestLevel] = useState<string | null>(null);
  const [prefsRead, setPrefsRead] = useState(false);
  const [level, setLevel] = useState<string | null>(null);
  useEffect(() => {
    if (meLoading || me) return;
    void loadOnboardingPrefs().then((p) => { setGuestLevel(p.level ?? null); setPrefsRead(true); });
  }, [me, meLoading]);
  const activeLevel = level ?? me?.level ?? guestLevel ?? "A1";
  // Seviye bilinmeden liste çizilmez: A1 listesini gösterip A2'ye atlamak
  // ekranı boyundan boyuna değiştiriyordu (kayan konteynerlerin kaynağı).
  const levelReady = !!level || (!meLoading && (!!me || prefsRead));

  const lists = useMemo(
    () => SKILLS.map((s) => ({ ...s, items: listSkillMeta(activeLevel, s.key) })),
    [activeLevel],
  );
  const hasExercises = lists.some((l) => l.items.length > 0);

  return (
    <Screen>
      <AppHeader title={t("skills.beceriler")} subtitle={t("skills.aciklama")} />

      {/* Konuşma bölümü mikrofonsuz cihazda hiç çizilmez: iki satır da mikrofon ister. */}
      {mic ? (
        <>
          <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4, letterSpacing: 0.5 }}>{t("skills.konusma").toUpperCase()}</Text>
          <SpeakingRow title={t("skills.yuruyus_modu")} subtitle={t("skills.yuruyus_alt")} icon={WalkIcon} tint={colors.accent} onPress={() => nav.navigate("Walk")} colors={colors} />
          <SpeakingRow title={t("skills.ders_konusmasi")} subtitle={t("skills.ders_konusmasi_alt")} icon={PathIcon} tint={colors.primary} onPress={() => nav.navigate("Tabs")} colors={colors} />
        </>
      ) : null}

      {!levelReady ? (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.lg, marginBottom: spacing.sm, marginLeft: 4 }}>
            <SkeletonLine variant="caption" width={54} />
          </View>
          <View style={{ flexDirection: "row", gap: spacing.sm, marginBottom: spacing.lg }}>
            {LEVELS.map((l) => <Skeleton key={l} height={20 + textHeight("bodyStrong")} radius={radii.md} style={{ flex: 1 }} />)}
          </View>
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
        </>
      ) : hasExercises ? (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.lg, marginBottom: spacing.sm, marginLeft: 4 }}>
            <Text variant="caption" color={colors.textMuted} style={{ letterSpacing: 0.5 }}>{t("skills.seviye")}</Text>
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

          {lists.map((s) => {
            if (!s.items.length) return null;
            const tint = colors[s.tint] as string;
            return (
              <View key={s.key} style={{ marginBottom: spacing.xl }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm, marginLeft: 4 }}>
                  <s.icon color={tint} size={18} />
                  <Text variant="h3">{t(s.label)}</Text>
                  <Text variant="caption" color={colors.textMuted}>{t("skills.alistirma", { n: s.items.length })}</Text>
                </View>
                <Card padded style={{ paddingVertical: 4 }}>
                  {s.items.map((ex, i) => (
                    <ExerciseRow key={ex.id} ex={ex} tint={tint} done={false} last={i === s.items.length - 1} colors={colors} onPress={() => nav.navigate("Item", { id: ex.id, kind: s.kind, title: ex.title })} />
                  ))}
                </Card>
              </View>
            );
          })}
        </>
      ) : (
        <Card padded style={{ marginTop: spacing.lg }}>
          <Text variant="body" color={colors.textMuted} style={{ lineHeight: 22 }}>{t("skills.kurs_alistirma_yok")}</Text>
        </Card>
      )}
    </Screen>
  );
}
