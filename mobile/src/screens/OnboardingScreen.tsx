import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { LearnIcon, BoltIcon, ExamIcon, CheckIcon } from "../ui/icons";
import { ONBOARDED_KEY } from "../lib/onboarding";
import { useTheme, spacing, radii, softShadow } from "../theme";

/**
 * Kayıt-duvarsız onboarding (§4). Kullanıcı hesap açmadan önce ne olduğunu
 * görür, hedef/başlangıç seçer ve "Hemen başla" ile doğrudan uygulamaya girer —
 * kayıt en sona, denedikten sonra. Seçimler yerelde tutulur (auth gelince
 * profile'a taşınır). Görüldüğü AsyncStorage'a yazılır, bir daha çıkmaz.
 */
type Step = {
  key: string;
  icon: (p: { color: string; size: number }) => React.ReactElement;
  title: string;
  subtitle: string;
  options?: { key: string; label: string; sub?: string }[];
};

const STEPS: Step[] = [
  { key: "welcome", icon: BoltIcon, title: "Wortspiel'e hoş geldin", subtitle: "Almancayı oyun gibi öğren — günde birkaç dakika, kalıcı ilerleme." },
  { key: "how", icon: LearnIcon, title: "Kısa turlar, gerçek ilerleme", subtitle: "Kelime turları, patika üniteleri ve sınav hazırlığı; hepsi seni akışta tutar." },
  { key: "goal", icon: CheckIcon, title: "Günlük hedefin ne olsun?", subtitle: "İstediğin zaman değiştirebilirsin.", options: [
    { key: "5", label: "Rahat", sub: "5 dk / gün" },
    { key: "10", label: "Kararlı", sub: "10 dk / gün" },
    { key: "20", label: "Ciddi", sub: "20 dk / gün" },
  ] },
  { key: "level", icon: ExamIcon, title: "Nereden başlayalım?", subtitle: "Seviyeni sonra testle tam belirleyebilirsin.", options: [
    { key: "zero", label: "Sıfırdan", sub: "Almancaya yeniyim" },
    { key: "some", label: "Biraz biliyorum", sub: "Temeli var" },
    { key: "test", label: "Testle belirle", sub: "Yerleştirme sınavı" },
  ] },
];

export function OnboardingScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ reset: (s: { index: number; routes: { name: string }[] }) => void }>();
  const [i, setI] = useState(0);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const step = STEPS[i];
  const last = i === STEPS.length - 1;
  const needsChoice = !!step.options;
  const chosen = choices[step.key];
  const canNext = !needsChoice || !!chosen;

  async function finish() {
    try { await AsyncStorage.setItem(ONBOARDED_KEY, "1"); } catch { /* depolama kapalıysa yine geç */ }
    nav.reset({ index: 0, routes: [{ name: "Tabs" }] });
  }
  function next() { if (last) finish(); else if (canNext) setI((n) => n + 1); }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      {/* ilerleme noktaları + atla */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.xxl }}>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {STEPS.map((_, n) => (
            <View key={n} style={{ height: 6, width: n === i ? 22 : 6, borderRadius: 3, backgroundColor: n === i ? colors.primary : colors.surface2 }} />
          ))}
        </View>
        <PressableScale onPress={finish}>
          <Text variant="bodyStrong" color={colors.textMuted}>Atla</Text>
        </PressableScale>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={[{ width: 88, height: 88, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary, marginBottom: spacing.xl }, softShadow(colors.primary, 12)]}>
          <step.icon color="#fff" size={44} />
        </View>
        <Text variant="display">{step.title}</Text>
        <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.sm, marginBottom: spacing.xl }}>{step.subtitle}</Text>

        {step.options && (
          <View style={{ gap: spacing.md }}>
            {step.options.map((o) => {
              const active = chosen === o.key;
              return (
                <PressableScale key={o.key} onPress={() => setChoices((c) => ({ ...c, [step.key]: o.key }))} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, borderWidth: 2, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface, padding: spacing.lg }}>
                  <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: active ? colors.primary : colors.border, alignItems: "center", justifyContent: "center" }}>
                    {active && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary }} />}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="bodyStrong" color={active ? colors.primary : colors.text}>{o.label}</Text>
                    {o.sub && <Text variant="caption" color={colors.textMuted}>{o.sub}</Text>}
                  </View>
                </PressableScale>
              );
            })}
          </View>
        )}
      </View>

      <PressableScale onPress={next} style={[{ borderRadius: radii.lg, backgroundColor: canNext ? colors.primary : colors.surface2, paddingVertical: 17, alignItems: "center" }, canNext ? softShadow(colors.primary, 10) : {}]}>
        <Text variant="h3" color={canNext ? "#fff" : colors.textFaint}>{last ? "Hemen başla" : "Devam et"}</Text>
      </PressableScale>
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md }}>
        Kayıt gerekmez — istersen sonra hesap açarsın.
      </Text>
    </View>
  );
}
