import React, { useCallback, useEffect, useState } from "react";
import { View, BackHandler } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { track } from "../lib/track";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { BoltIcon, ExamIcon, CheckIcon, SkillsIcon, SpeakerIcon } from "../ui/icons";
import { ONBOARDED_KEY } from "../lib/onboarding";
import { saveOnboardingPrefs } from "../lib/onboardingPrefs";
import { coursesForNative, onboardingCoursesFor, DEFAULT_COURSE_ID, NATIVE_LANGS, type NativeLang } from "../lib/courses";
import { hasDemoPlacement } from "../data/demoPlacement";
import { hasFirstWords } from "../data/firstWords";
import { t, currentLang, setLang } from "../lib/i18n";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow } from "../theme";

/**
 * İlk açılış akışı (§4). Sıra: anadil → karşılama → kurs → seviye → hedef. Seçimler
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

/** Dil adları kendi dillerinde yazılır — arayüz hangi dilde olursa olsun okunur. */
const LANG_LABEL: Record<NativeLang, string> = { tr: "Türkçe", en: "English", de: "Deutsch" };

/**
 * Adımlar — sabit dizi DEĞİL fonksiyon. İki sebep: t() modül yüklenirken çağrılsaydı
 * dil tercihi (loadLang) henüz okunmamış olurdu; ve kurs adları arayüz diline bağlı,
 * eskiden DEFAULT_NATIVE ile sabit Türkçe basılıyordu.
 */
/** `course` seçilen kurs: seviye adımının seçenekleri o paritenin verisine bağlı. */
function steps(course: string): Step[] {
  const lang = currentLang();
  const canTest = hasDemoPlacement(lang, course);
  return [
    {
      key: "welcome", icon: BoltIcon,
      title: t("onboarding.welcome_to_lernomi"),
      subtitle: t("onboarding.kisa_turlarla_oyun_gibi_ogren_birk"),
    },
    {
      // ANADİL, kurstan ÖNCE: kurs listesi ve sonraki adımların metni buna
      // bağlı. Karşılamadan sonra duruyor çünkü karşılama ekranında seçim yok,
      // cihaz dilinde çizilmesi bir şeyi bozmuyor.
      key: "lang", icon: SpeakerIcon,
      title: t("onboarding.which_language_should_we_teach"),
      subtitle: t("onboarding.lessons_and_hints_will_be_in"),
      options: NATIVE_LANGS.map((l) => ({ key: l, label: LANG_LABEL[l] })),
    },
    {
      key: "course", icon: SkillsIcon,
      title: t("onboarding.which_course_shall_we_start_with"),
      subtitle: t("onboarding.more_languages_are_coming_soon"),
      // Kurs kayıt defterinden türüyor (lib/courses.ts). Anadil elenir (kimse
      // kendi dilini "öğrenilecek dil" olarak seçmez) ve duraklatılmış lehçe
      // kursu ilk açılışta sunulmaz — Ayarlar'dan hâlâ seçilebilir.
      options: onboardingCoursesFor(lang).map((c) => ({ key: c.id, label: c.label[lang] })),
    },
    {
      key: "level", icon: ExamIcon,
      title: t("onboarding.where_shall_we_start"),
      subtitle: t("onboarding.you_can_start_at_level_that"),
      // "Testle belirle" yalnız o paritenin hazır seti varsa; yoksa seçenek hiç
      // görünmez (seçilip boş bir teste düşmektense hiç sunulmamalı).
      options: [
        { key: "A1", label: t("onboarding.from_scratch"), sub: t("onboarding.i_m_just_starting_out") },
        { key: "pick", label: t("onboarding.pick_your_level"), sub: t("onboarding.pick_level_directly") },
        ...(canTest ? [{ key: "test", label: t("onboarding.find_out_with_test"), sub: t("onboarding.kisa_yerlestirme_sinavi") }] : []),
      ],
    },
    {
      key: "goal", icon: CheckIcon,
      title: t("onboarding.what_s_your_daily_goal"),
      subtitle: t("onboarding.istedigin_zaman_degistirebilirsin"),
      options: [
        { key: "5", label: t("onboarding.easy"), sub: t("onboarding.min_day", { n: 5 }) },
        { key: "10", label: t("onboarding.steady"), sub: t("onboarding.min_day", { n: 10 }) },
        { key: "20", label: t("onboarding.serious"), sub: t("onboarding.min_day", { n: 20 }) },
      ],
    },
  ];
}

export function OnboardingScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [i, setI] = useState(0);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [pickedLevel, setPickedLevel] = useState<string | null>(null);
  const allSteps = steps(choices.course ?? DEFAULT_COURSE_ID);
  const step = allSteps[i];

  useEffect(() => { track("onboarding_step", i, step?.key); }, [i, step?.key]);
  const last = i === allSteps.length - 1;
  const needsChoice = !!step.options;
  const chosen = choices[step.key];

  /**
   * Seçim yaz. Anadil seçimi hemen uygulanır: sonraki adımların metni ve kurs
   * listesi ona bağlı, sona bırakılsaydı kullanıcı akışın geri kalanını eski
   * dilde görürdü. Dil değişince seçili kurs geçersiz kalabilir (anadili
   * Almanca seçen kullanıcıda Almanca kurs listeden düşer) — o seçim silinir,
   * yoksa görünmeyen bir kursla devam edilirdi.
   */
  function pick(key: string, value: string) {
    setChoices((c) => {
      const next = { ...c, [key]: value };
      if (key === "lang") {
        void setLang(value as NativeLang);
        // Hesaba devredilmeyi beklesin (kurs/seviye ile aynı yol): kullanıcı
        // henüz giriş yapmadı, seçim ancak girişte profile yazılabiliyor.
        void saveOnboardingPrefs({ nativeLang: value });
        const ok = coursesForNative(value as NativeLang).some((x) => x.id === next.course);
        if (!ok) delete next.course;
      }
      return next;
    });
  }
  // Seviye adımında "Seviyeni seç" işaretliyse ayrıca bir seviye seçilmeli.
  const levelPickPending = step.key === "level" && chosen === "pick" && !pickedLevel;
  const canNext = (!needsChoice || !!chosen) && !levelPickPending;

  async function finish() {
    // Yedek artık sabit "de" değil: anadili Almanca olan kullanıcıda o kurs
    // hiç listelenmiyor, sabit yedek onu görünmeyen bir kursa düşürürdü.
    const available = coursesForNative(currentLang());
    const course = choices.course ?? available[0]?.id ?? DEFAULT_COURSE_ID;
    const goal = choices.goal ? parseInt(choices.goal, 10) : undefined;
    const levelChoice = choices.level;
    try { await AsyncStorage.setItem(ONBOARDED_KEY, "1"); } catch { /* geç */ }
    if (levelChoice === "test") {
      // Seviye testin sonunda belirlenir; kurs+hedef şimdiden saklanır → Placement → hesap.
      await saveOnboardingPrefs({ course, goal });
      nav.reset({ index: 0, routes: [{ name: "Placement", params: { onboarding: true } }] });
    } else {
      // Sıfırdan (A1) ya da Seviyeni seç (pickedLevel): her ikisi de giriş öncesi
      // kısa bir ısınmadan (FirstPractice) geçer — her yola ilk-değer tadı.
      const lvl = levelChoice === "A1" ? "A1" : (pickedLevel ?? "A1");
      await saveOnboardingPrefs({ course, goal, level: lvl });
      // Isınma yalnız o paritenin kelimeleri varsa; yoksa doğrudan giriş duvarı.
      const next = hasFirstWords(currentLang(), course) ? "FirstPractice" : "Auth";
      nav.reset({ index: 0, routes: [next === "FirstPractice" ? { name: next, params: { level: lvl } } : { name: "Auth" }] });
    }
  }
  function next() { if (last) void finish(); else if (canNext) setI((n) => n + 1); }
  // Android geri tuşu: adım geri (ilk adımda sistem davranışı — uygulamadan çıkar).
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => { if (i > 0) { setI((n) => n - 1); return true; } return false; });
      return () => sub.remove();
    }, [i]),
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: spacing.xxl }}>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {allSteps.map((_, n) => (
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
                <PressableScale key={o.key} onPress={() => pick(step.key, o.key)} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, borderWidth: 2, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface, padding: spacing.lg }}>
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
        <Text variant="h3" color={canNext ? "#fff" : colors.textFaint}>{t("common.continue_2")}</Text>
      </PressableScale>
    </View>
  );
}
