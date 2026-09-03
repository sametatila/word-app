import React, { useEffect, useState } from "react";
import { t, currentLang } from "../lib/i18n";
import { currentCourseId } from "../lib/courses";
import { firstWordsFor, type FirstWord } from "../data/firstWords";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { SpeakerIcon, CheckIcon } from "../ui/icons";
import { Mascot } from "../ui/Mascot";
import { speakTarget } from "../lib/tts";
import { haptic } from "../lib/haptics";
import { track } from "../lib/track";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow } from "../theme";

/**
 * Hesap açmadan önce kısa bir ISINMA — "Sıfırdan" ve "Seviyeni seç" yolları
 * buradan geçer (Testle belirle kendi sınavını gösterir). Böylece giriş duvarı
 * öncesi her yola bir ilk-değer tadı verilir. Kelimeler SEVİYEYE göre gelir
 * (A1–C1): birkaç kelime sesli + anlam + örnek; bitince giriş duvarına (Auth).
 */
const withArtikel = (w: FirstWord) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

export function FirstPracticeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { params } = useRoute<RouteProp<RootStackParams, "FirstPractice">>();
  const level = params?.level ?? "A1";
  // Kelimeler PARİTEDEN gelir (anadil + kurs); sabit Almanca liste değil.
  const words = firstWordsFor(currentLang(), currentCourseId(), level);
  const [idx, setIdx] = useState(0);
  const [seen, setSeen] = useState(false);
  // Bu paritenin ısınma seti yoksa adım atlanır — boş ekran göstermektense
  // doğrudan giriş duvarına. Onboarding bu yolu zaten seçtirmiyor; bu, ekranın
  // doğrudan açılmasına karşı savunma.
  const empty = words.length === 0;
  useEffect(() => {
    if (empty) nav.reset({ index: 0, routes: [{ name: "Auth" }] });
  }, [empty, nav]);
  const w = words[idx];
  const last = idx + 1 >= words.length;
  const kicker = level === "A1" ? t("firstpractice.first_words") : t("firstpractice.warmup", { seviye: level });

  // Kelime basina bir kez: level params'tan, w idx'ten turuyor; ikisini
  // bagimliliga eklemek ayni kelimeyi tekrar okutur.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { track("first_practice", idx, level); speakTarget(withArtikel(w)); setSeen(false); }, [idx]);

  function primary() {
    haptic("tap");
    if (!seen) { setSeen(true); return; }
    if (last) { nav.reset({ index: 0, routes: [{ name: "Auth" }] }); return; }
    setIdx((n) => n + 1);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <View style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${((idx + (seen ? 1 : 0)) / words.length) * 100}%`, borderRadius: 4, backgroundColor: colors.primary }} />
        </View>
        <Text variant="caption" color={colors.textMuted}>{idx + 1}/{words.length}</Text>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
        <Text variant="caption" color={colors.primary} style={{ letterSpacing: 1, textTransform: "uppercase" }}>{kicker}</Text>
        <Text variant="display" style={{ textAlign: "center" }}>{withArtikel(w)}</Text>

        <PressableScale onPress={() => speakTarget(withArtikel(w))} accessibilityRole="button" accessibilityLabel={t("firstpractice.listen_word", { kelime: w.de })} style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 16, paddingVertical: 9 }}>
          <SpeakerIcon color={colors.primary} size={18} /><Text variant="bodyStrong" color={colors.primary}>{t("firstpractice.dinle")}</Text>
        </PressableScale>

        {seen ? (
          <View style={{ alignItems: "center", gap: 6, marginTop: spacing.sm }}>
            <Text variant="h2" color={colors.text}>{w.tr}</Text>
            <View style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radii.lg, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, alignItems: "center", marginTop: 4 }}>
              <Text variant="bodyStrong">{w.ex}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>{w.exTr}</Text>
            </View>
          </View>
        ) : (
          <Mascot mood="idle" size={96} />
        )}
      </View>

      <PressableScale onPress={primary} accessibilityRole="button" accessibilityLabel={!seen ? "Anlamını gör" : last ? "Hesabımı aç ve kaydet" : "Sonraki kelime"} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 17, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }, softShadow(colors.primary, 10)]}>
        {seen && last && <CheckIcon color="#fff" size={20} />}
        <Text variant="h3" color="#fff">{!seen ? "Anlamını gör" : last ? "Hesabımı aç ve kaydet" : "Sonraki kelime"}</Text>
      </PressableScale>
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md }}>
        Öğrendiklerini kaydetmek için birazdan hesabını açacaksın.
      </Text>
    </View>
  );
}
