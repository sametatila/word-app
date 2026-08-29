import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ChevronLeftIcon, ChevronRightIcon, ReadIcon, ListenIcon, WriteIcon, BoltIcon, CheckIcon } from "../ui/icons";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

/**
 * Sınav hazırlık (§4 — sınav-hazırlığı ürünleştirme). Goethe/telc modülleri:
 * Lesen/Hören/Schreiben/Sprechen. Konuşma modülü premium (ileride paywall'a
 * bağlanacak). Şimdilik demo; ilerleme ve kilit gerçek veriyle gelecek.
 */
const EXAMS = ["Goethe-Zertifikat", "telc Deutsch"];

const MODULES = [
  { key: "lesen", label: "Lesen", sub: "Okuma · 4 bölüm", icon: ReadIcon, tint: "info", done: 2, total: 4, premium: false },
  { key: "hoeren", label: "Hören", sub: "Dinleme · 4 bölüm", icon: ListenIcon, tint: "accent", done: 1, total: 4, premium: false },
  { key: "schreiben", label: "Schreiben", sub: "Yazma · 2 görev", icon: WriteIcon, tint: "success", done: 0, total: 2, premium: true },
  { key: "sprechen", label: "Sprechen", sub: "Konuşma · 3 bölüm", icon: BoltIcon, tint: "primary", done: 0, total: 3, premium: true },
] as const;

export function ExamPrepScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [exam, setExam] = useState(0);
  const tintOf = (k: keyof Palette) => colors[k] as string;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ChevronLeftIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">Sınav hazırlık</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* seviye + sınav seçimi */}
        <Card style={{ marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text variant="micro" color={colors.textMuted}>SEVİYE</Text>
              <Text variant="h1" color={colors.primary}>A1</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text variant="micro" color={colors.textMuted}>GENEL İLERLEME</Text>
              <Text variant="h1">%38</Text>
            </View>
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
            const tint = tintOf(m.tint as keyof Palette);
            const pct = m.total ? Math.round((m.done / m.total) * 100) : 0;
            return (
              <PressableScale key={m.key} onPress={() => m.premium && nav.navigate("Paywall")}>
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
                    <Text variant="caption" color={colors.textMuted}>{m.sub}</Text>
                    <View style={{ height: 5, borderRadius: 3, backgroundColor: colors.surface2, marginTop: 8, overflow: "hidden" }}>
                      <View style={{ height: "100%", width: `${pct}%`, backgroundColor: tint, borderRadius: 3 }} />
                    </View>
                  </View>
                  <ChevronRightIcon color={colors.textFaint} size={20} />
                </Card>
              </PressableScale>
            );
          })}
        </View>

        {/* deneme sınavı */}
        <PressableScale style={{ marginTop: spacing.lg }}>
          <View style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }, softShadow(colors.primary, 10)]}>
            <CheckIcon color="#fff" size={22} />
            <Text variant="h3" color="#fff">Deneme sınavına gir</Text>
          </View>
        </PressableScale>
      </ScrollView>
    </View>
  );
}
