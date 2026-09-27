import React, { useEffect, useState } from "react";
import { t, currentLang } from "../lib/i18n";
import { currentCourseId } from "../lib/courses";
import { firstWordsFor, type FirstWord } from "../data/firstWords";
import { View } from "react-native";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { SpeakerIcon, CheckIcon } from "../ui/icons";
import { speakTarget } from "../lib/tts";
import { haptic } from "../lib/haptics";
import { track } from "../lib/track";
import type { RootStackParams } from "../navigation/RootStack";
import { Card } from "../ui/Card";
import { FlowScreen, FlowActions, FlowProgress } from "../ui/flow";
import { useTheme, spacing, radii } from "../theme";

/**
 * Hesap açmadan önce kısa bir ISINMA — "Sıfırdan" ve "Seviyeni seç" yolları
 * buradan geçer (Testle belirle kendi sınavını gösterir). Böylece giriş duvarı
 * öncesi her yola bir ilk-değer tadı verilir. Kelimeler SEVİYEYE göre gelir
 * (A1–C1): birkaç kelime sesli + anlam + örnek; bitince giriş duvarına (Auth).
 */
const withArtikel = (w: FirstWord) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

export function FirstPracticeScreen() {
  const { colors } = useTheme();
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
  const kicker = level === "A1" ? t("firstpractice.first_words") : t("firstpractice.warmup", { level: level });

  // Kelime basina bir kez: level params'tan, w idx'ten turuyor; ikisini
  // bagimliliga eklemek ayni kelimeyi tekrar okutur.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { track("first_practice", idx, level); speakTarget(withArtikel(w), { word: true }); setSeen(false); }, [idx]);

  function primary() {
    haptic("tap");
    if (!seen) { setSeen(true); return; }
    if (last) {
      /* Huni adiminin KENDISI olculuyor: her kelimede `first_practice`
         yaziliyordu ama tamamlanma hic yazilmiyordu, yani "kac kisi ilk
         pratigi bitirdi" sorusu Androidde cevapsizdi. Web `first-practice`
         ayni adi ayni degerle yaziyor. */
      track("first_practice_done", words.length);
      nav.reset({ index: 0, routes: [{ name: "Auth" }] });
      return;
    }
    setIdx((n) => n + 1);
  }

  const label = t(!seen ? "firstpractice.see_meaning" : last ? "firstpractice.create_account" : "firstpractice.next_word");
  /* Çıkış yok (web `first-practice` gibi): ısınma giriş duvarına akan tek yol. */
  return (
    <FlowScreen
      center
      top={<FlowProgress value={(idx + (seen ? 1 : 0)) / words.length} count={`${idx + 1}/${words.length}`} />}
      actions={
        <View style={{ gap: spacing.md }}>
          <FlowActions primary={{ label, onPress: primary, icon: seen && last ? <CheckIcon color={colors.onPrimary} size={20} /> : undefined }} />
          <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>{t("firstpractice.save_note")}</Text>
        </View>
      }
    >
      <View style={{ alignItems: "center", gap: spacing.lg }}>
        <Text variant="caption" color={colors.primaryText} style={{ letterSpacing: 1, textTransform: "uppercase" }}>{kicker}</Text>
        <Text variant="display" style={{ textAlign: "center" }}>{withArtikel(w)}</Text>

        <PressableScale onPress={() => speakTarget(withArtikel(w), { word: true })} accessibilityRole="button" accessibilityLabel={t("firstpractice.listen_word", { word: w.de })} style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: spacing.lg, paddingVertical: 9 }}>
          <SpeakerIcon color={colors.primaryText} size={18} /><Text variant="bodyStrong" color={colors.primaryText}>{t("firstpractice.listen")}</Text>
        </PressableScale>

        {seen ? (
          <View style={{ alignItems: "center", gap: 6, marginTop: spacing.sm, alignSelf: "stretch" }}>
            <Text variant="h2" color={colors.text}>{w.tr}</Text>
            <Card padded style={{ alignItems: "center", marginTop: spacing.xs, alignSelf: "stretch" }}>
              <Text variant="bodyStrong" style={{ textAlign: "center" }}>{w.ex}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2, textAlign: "center" }}>{w.exTr}</Text>
            </Card>
          </View>
        ) : null}
      </View>
    </FlowScreen>
  );
}
