import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { track } from "../lib/track";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { BoltIcon, ExamIcon, CheckIcon, SkillsIcon } from "../ui/icons";
import { ONBOARDED_KEY } from "../lib/onboarding";
import { saveOnboardingPrefs } from "../lib/onboardingPrefs";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow } from "../theme";

/**
 * İlk açılış akışı (§4). Sıra: karşılama → kurs → seviye → hedef. Seçimler
 * yerelde tutulur (onboardingPrefs) ve hesap açınca profile taşınır.
 *
 * Misafir modu YOK: akış sonunda hesap açmak/giriş yapmak ZORUNLU (bkz.
 * App.tsx kök yönlendirme, AuthScreen giriş duvarı). Seviye adımı üç yol:
 *  • "Sıfırdan" → A1 + ilk kelime çalışması (FirstPractice) → hesap
 *  • "Testle belirle" → yerleştirme sınavı (Placement) → hesap
 *  • "Seviyeni seç" → kullanıcı A1–C1 seçer → hesap
 */
type Option = { key: string; label: string; sub?: string };
type Step = {
  key: string;
  icon: (p: { color: string; size: number }) => React.ReactElement;
  title: string;
  subtitle: string;
  options?: Option[];
};

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

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
    key: "level", icon: ExamIcon,
    title: "Nereden başlayalım?",
    subtitle: "Sıfırdan başla, kısa bir testle seviyeni belirle ya da seviyeni kendin seç.",
    options: [
      { key: "A1", label: "Sıfırdan", sub: "Yeni başlıyorum — ilk kelimelerle ısınalım" },
      { key: "test", label: "Testle belirle", sub: "Kısa yerleştirme sınavı" },
      { key: "pick", label: "Seviyeni seç", sub: "Seviyeni biliyorsan doğrudan seç" },
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
];

export function OnboardingScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [i, setI] = useState(0);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [pickedLevel, setPickedLevel] = useState<string | null>(null);
  const step = STEPS[i];

  useEffect(() => { track("onboarding_step", i, step?.key); }, [i, step?.key]);
  const last = i === STEPS.length - 1;
  const needsChoice = !!step.options;
  const chosen = choices[step.key];
  // Seviye adımında "Seviyeni seç" işaretliyse ayrıca bir seviye seçilmeli.
  const levelPickPending = step.key === "level" && chosen === "pick" && !pickedLevel;
  const canNext = (!needsChoice || !!chosen) && !levelPickPending;

  async function finish() {
    const course = choices.course ?? "de";
    const goal = choices.goal ? parseInt(choices.goal, 10) : undefined;
    const levelChoice = choices.level;
    try { await AsyncStorage.setItem(ONBOARDED_KEY, "1"); } catch { /* geç */ }
    if (levelChoice === "test") {
      // Seviye testin sonunda belirlenir; kurs+hedef şimdiden saklanır → Placement → hesap.
      await saveOnboardingPrefs({ course, goal });
      nav.reset({ index: 0, routes: [{ name: "Placement", params: { onboarding: true } }] });
    } else if (levelChoice === "A1") {
      // Sıfırdan: A1 + ilk kelime çalışması → hesap.
      await saveOnboardingPrefs({ course, goal, level: "A1" });
      nav.reset({ index: 0, routes: [{ name: "FirstPractice" }] });
    } else {
      // Seviyeni seç: seçilen seviye → doğrudan giriş duvarı.
      await saveOnboardingPrefs({ course, goal, level: pickedLevel ?? "A1" });
      nav.reset({ index: 0, routes: [{ name: "Auth" }] });
    }
  }
  function next() { if (last) void finish(); else if (canNext) setI((n) => n + 1); }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: spacing.xxl }}>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {STEPS.map((_, n) => (
            <View key={n} style={{ height: 6, width: n === i ? 22 : 6, borderRadius: 3, backgroundColor: n === i ? colors.primary : colors.surface2 }} />
          ))}
        </View>
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
            {/* "Seviyeni seç" için satır içi seviye seçici (A1–C1) */}
            {step.key === "level" && chosen === "pick" && (
              <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: 2 }}>
                {LEVELS.map((lv) => {
                  const on = pickedLevel === lv;
                  return (
                    <PressableScale key={lv} onPress={() => setPickedLevel(lv)} style={{ flex: 1, paddingVertical: 12, borderRadius: radii.md, alignItems: "center", borderWidth: 2, borderColor: on ? colors.primary : colors.border, backgroundColor: on ? colors.primarySoft : colors.surface }}>
                      <Text variant="bodyStrong" color={on ? colors.primary : colors.text}>{lv}</Text>
                    </PressableScale>
                  );
                })}
              </View>
            )}
          </View>
        )}
      </View>

      <PressableScale onPress={next} style={[{ borderRadius: radii.lg, backgroundColor: canNext ? colors.primary : colors.surface2, paddingVertical: 17, alignItems: "center" }, canNext ? softShadow(colors.primary, 10) : {}]}>
        <Text variant="h3" color={canNext ? "#fff" : colors.textFaint}>{last ? (choices.level === "test" ? "Teste başla" : "Devam et") : "Devam et"}</Text>
      </PressableScale>
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md }}>
        Birazdan hesabını açacaksın — serin, XP'n ve ilerlemen kaydolur.
      </Text>
    </View>
  );
}
