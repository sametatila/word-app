import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, ChevronRightIcon, ReadIcon, ListenIcon, WriteIcon, BoltIcon, LockIcon } from "../ui/icons";
import { useMe } from "../lib/useMe";
import { usePremium } from "../lib/usePremium";
import { listSkillMeta } from "../data/skills";
import { loadOnboardingPrefs } from "../lib/onboardingPrefs";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

/**
 * Sınav hazırlık (§4 — sınav-hazırlığı ürünleştirme). Goethe/telc modülleri:
 * Lesen/Hören (ücretsiz, gerçek okuma/dinleme alıştırmaları) + Schreiben/Sprechen
 * (premium). Uydurma ilerleme yok; modüller gerçek içeriğe bağlı.
 */
const EXAMS = ["Goethe-Zertifikat", "telc Deutsch"];

const MODULES = [
  { key: "lesen", label: "Lesen", tr: "Okuma", icon: ReadIcon, tint: "info", skill: "reading", kind: "read", premium: false },
  { key: "hoeren", label: "Hören", tr: "Dinleme", icon: ListenIcon, tint: "accent", skill: "listening", kind: "listen", premium: false },
  { key: "schreiben", label: "Schreiben", tr: "Yazma", icon: WriteIcon, tint: "success", skill: "writing", kind: "write", premium: true },
  { key: "sprechen", label: "Sprechen", tr: "Konuşma", icon: BoltIcon, tint: "primary", skill: "speaking", kind: "speak", premium: true },
] as const;

export function ExamPrepScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [exam, setExam] = useState(0);
  const { me } = useMe();
  const premium = usePremium();
  // Misafirde yerleştirme sınavının belirlediği seviye (prefs); yoksa A1.
  const [guestLevel, setGuestLevel] = useState<string | null>(null);
  useEffect(() => { if (!me) void loadOnboardingPrefs().then((p) => setGuestLevel(p.level ?? null)); }, [me]);
  const level = me?.level ?? guestLevel ?? "A1";
  const overallPct = me && me.totalWords ? Math.min(100, Math.round((me.mastered / me.totalWords) * 100)) : null;

  function openModule(m: (typeof MODULES)[number]) {
    if (m.premium && !premium) { nav.navigate("Paywall"); return; }
    const ex = listSkillMeta(level, m.skill as "reading" | "listening" | "writing")[0];
    if (ex) nav.navigate("Item", { id: ex.id, kind: m.kind, title: ex.title ?? m.label });
  }

  function countFor(m: (typeof MODULES)[number]): number {
    if (m.skill === "speaking") return 0;
    return listSkillMeta(level, m.skill as "reading" | "listening" | "writing").length;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel="Geri" style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">Sınav hazırlık</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* seviye + sınav seçimi */}
        <Card style={{ marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text variant="micro" color={colors.textMuted}>SEVİYE</Text>
              <Text variant="h1" color={colors.primary}>{level}</Text>
            </View>
            {overallPct !== null && (
              <View style={{ alignItems: "flex-end" }}>
                <Text variant="micro" color={colors.textMuted}>KELİME KAPSAMASI</Text>
                <Text variant="h1">%{overallPct}</Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
            {EXAMS.map((e, i) => {
              const active = exam === i;
              return (
                <PressableScale key={e} onPress={() => setExam(i)} style={{ flex: 1, paddingVertical: 10, borderRadius: radii.md, alignItems: "center", borderWidth: 1.5, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : "transparent" }}>
                  <Text variant="caption" color={active ? colors.primary : colors.textMuted}>{e}</Text>
                </PressableScale>
              );
            })}
          </View>
        </Card>

        <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4 }}>MODÜLLER</Text>
        <View style={{ gap: spacing.md }}>
          {MODULES.map((m) => {
            const tint = colors[m.tint as keyof Palette] as string;
            const n = countFor(m);
            const soon = !m.premium && n === 0; // ücretsiz ama içerik yok
            const sub = m.premium ? `${m.tr} · Premium` : n > 0 ? `${m.tr} · ${n} alıştırma` : `${m.tr} · yakında`;
            return (
              <PressableScale key={m.key} onPress={() => (soon ? undefined : openModule(m))} style={{ opacity: soon ? 0.6 : 1 }}>
                <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                  <View style={[{ width: 48, height: 48, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint }, softShadow(tint, 6)]}>
                    <m.icon color="#fff" size={24} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Text variant="h3">{m.label}</Text>
                      {m.premium && (
                        <View style={{ backgroundColor: colors.streak + "26", borderRadius: radii.pill, paddingHorizontal: 8, paddingVertical: 2 }}>
                          <Text variant="micro" color={colors.streak}>Premium</Text>
                        </View>
                      )}
                    </View>
                    <Text variant="caption" color={colors.textMuted}>{sub}</Text>
                  </View>
                  {m.premium && !premium ? <LockIcon color={colors.streak} size={20} /> : <ChevronRightIcon color={colors.textFaint} size={20} />}
                </Card>
              </PressableScale>
            );
          })}
        </View>

        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.lg, textAlign: "center", lineHeight: 18 }}>
          Lesen ve Hören ücretsiz; Schreiben ve Sprechen Premium'da. Tam Goethe/telc deneme sınavı yakında.
        </Text>
      </ScrollView>
    </View>
  );
}
