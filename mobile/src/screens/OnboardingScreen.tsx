import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { track } from "../lib/track";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { LearnIcon, BoltIcon, ExamIcon, CheckIcon, SkillsIcon } from "../ui/icons";
import { ONBOARDED_KEY } from "../lib/onboarding";
import { saveOnboardingPrefs } from "../lib/onboardingPrefs";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow } from "../theme";

/**
 * Kayıt-duvarsız onboarding (§4). Kullanıcı hesap açmadan kurs + hedef + seviye
 * seçer; seçimler yerelde tutulur (onboardingPrefs) ve hesap açınca profile
 * taşınır. "Testle belirle" gerçek yerleştirme sınavını açar. Görüldüğü
 * AsyncStorage'a yazılır, bir daha çıkmaz.
 */
type Option = { key: string; label: string; sub?: string };
type Step = {
  key: string;
  icon: (p: { color: string; size: number }) => React.ReactElement;
  title: string;
  subtitle: string;
  options?: Option[];
};

const STEPS: Step[] = [
  {
    key: "welcome", icon: BoltIcon,
    title: "Wortspiel'e hoş geldin",
    subtitle: "Kısa turlarla, oyun gibi öğren. Birkaç dakikada başlarsın; düzenli çalışınca ilerleme kalıcı olur.",
  },
  {
    key: "course", icon: SkillsIcon,
    title: "Hangi kursla başlayalım?",
    subtitle: "Şimdilik Almanca ve Zürih Almancası var; yeni diller yakında eklenecek. Sonradan değiştirebilirsin.",
    options: [
      { key: "de", label: "Almanca", sub: "Hochdeutsch · Goethe A1–C1" },
      { key: "gsw-zh", label: "Zürih Almancası", sub: "Züritüütsch · İsviçre lehçesi" },
    ],
  },
  {
    key: "goal", icon: CheckIcon,
    title: "Günlük hedefin ne olsun?",
    subtitle: "İstediğin zaman değiştirebilirsin.",
    options: [
      { key: "5", label: "Rahat", sub: "5 dk / gün" },
      { key: "10", label: "Kararlı", sub: "10 dk / gün" },
      { key: "20", label: "Ciddi", sub: "20 dk / gün" },
    ],
  },
  {
    key: "level", icon: ExamIcon,
    title: "Nereden başlayalım?",
    subtitle: "Emin değilsen kısa bir testle seviyeni belirleyelim.",
    options: [
      { key: "A1", label: "Sıfırdan", sub: "Yeni başlıyorum" },
      { key: "A2", label: "Biraz biliyorum", sub: "Temel günlük dili biliyorum" },
      { key: "test", label: "Testle belirle", sub: "Kısa yerleştirme sınavı" },
    ],
  },
];

export function OnboardingScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [i, setI] = useState(0);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const step = STEPS[i];

  useEffect(() => { track("onboarding_step", i, step?.key); }, [i, step?.key]);
  const last = i === STEPS.length - 1;
  const needsChoice = !!step.options;
  const chosen = choices[step.key];
  const canNext = !needsChoice || !!chosen;

  async function finish() {
    const course = choices.course ?? "de";
    const goal = choices.goal ? parseInt(choices.goal, 10) : undefined;
    const levelChoice = choices.level;
    try { await AsyncStorage.setItem(ONBOARDED_KEY, "1"); } catch { /* geç */ }
    if (levelChoice === "test") {
      // Seviye testin sonunda belirlenir; kurs+hedef şimdiden saklanır.
      await saveOnboardingPrefs({ course, goal });
      nav.reset({ index: 1, routes: [{ name: "Tabs" }, { name: "Placement", params: { onboarding: true } }] });
    } else {
      await saveOnboardingPrefs({ course, goal, level: levelChoice });
      nav.reset({ index: 0, routes: [{ name: "Tabs" }] });
    }
  }
  function skip() {
    AsyncStorage.setItem(ONBOARDED_KEY, "1").catch(() => {});
    nav.reset({ index: 0, routes: [{ name: "Tabs" }] });
  }
  function next() { if (last) void finish(); else if (canNext) setI((n) => n + 1); }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.xxl }}>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {STEPS.map((_, n) => (
            <View key={n} style={{ height: 6, width: n === i ? 22 : 6, borderRadius: 3, backgroundColor: n === i ? colors.primary : colors.surface2 }} />
          ))}
        </View>
        <PressableScale onPress={skip}>
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
        <Text variant="h3" color={canNext ? "#fff" : colors.textFaint}>{last ? (chosen === "test" ? "Teste başla" : "Hemen başla") : "Devam et"}</Text>
      </PressableScale>
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md }}>
        Kayıt gerekmez — ilerlemeni saklamak için sonra hesap açarsın.
      </Text>
    </View>
  );
}
