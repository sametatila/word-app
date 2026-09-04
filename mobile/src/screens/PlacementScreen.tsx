import React, { useEffect, useRef, useState } from "react";
import { t, currentLang, nativeLangName } from "../lib/i18n";
import { currentCourseId } from "../lib/courses";
import { View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon } from "../ui/icons";
import { ChoiceGame, type ChoiceRound } from "../game/ChoiceGame";
import { RoundSkeleton } from "../game/RoundSkeleton";
import { demoPlacementFor, estimateLevel } from "../data/demoPlacement";
import {
  startPlacement,
  finishPlacement,
  acceptPlacement,
  type PlacementVocab,
  type PlacementAnswer,
  type PlacementRecord,
} from "../game/placement";
import { useAuth } from "../lib/AuthContext";
import { updateProfile } from "../lib/updateProfile";
import { saveOnboardingPrefs } from "../lib/onboardingPrefs";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { sfx } from "../lib/sfx";

const withArtikel = (a: string | null, de: string) => (a ? `${a} ${de}` : de);

/** Ekranın oynadığı birleşik soru — hem gerçek (Neon) hem demo aynı biçime düşer. */
type PQ = { round: ChoiceRound; level: PlacementAnswer["level"]; itemId: string };

function realQuestions(items: PlacementVocab[]): PQ[] {
  return items.map((it, i) => ({
    round: { wordId: i, question: withArtikel(it.artikel, it.de), answer: it.options[it.answer], options: it.options, prompt: t("rounds.ask_native", { nativeLang: nativeLangName() }) },
    level: it.level,
    itemId: it.id,
  }));
}
function demoQuestions(): PQ[] {
  return demoPlacementFor(currentLang(), currentCourseId()).map((q, i) => ({
    round: { wordId: i, question: q.question, answer: q.answer, options: q.options, prompt: t(q.promptKey, { anadil: nativeLangName() }) },
    level: q.level,
    itemId: q.id,
  }));
}

export function PlacementScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { params } = useRoute<RouteProp<RootStackParams, "Placement">>();
  const onboarding = params?.onboarding === true;
  // Onboarding'de bu ekran yığının köküdür; çıkış = giriş duvarı (Auth). Uygulama
  // içinde tekrar testte ise geri döner.
  const leave = () => { if (onboarding) nav.reset({ index: 0, routes: [{ name: "Auth" }] }); else nav.goBack(); };
  const { user } = useAuth();

  // Gerçek test (oturum açıksa Neon'dan). Yüklenene dek loading; hata → demo.
  const [real, setReal] = useState<PlacementVocab[] | null>(null);
  const [loading, setLoading] = useState<boolean>(!!user);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [result, setResult] = useState<PlacementRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const answers = useRef<PlacementAnswer[]>([]);

  useEffect(() => {
    if (!user) { setReal(null); setLoading(false); return; }
    let alive = true;
    setLoading(true);
    setLoadError(false);
    // Oturumlu kullanıcıda gerçek test gelmezse "örnek" sorulara DÜŞÜLMEZ (uydurma sonuç
    // seviyeyi yanlış ayarlardı); hata gösterilir, tekrar denenir. Misafir (onboarding)
    // yerleşik soru setini kullanır — o akışın gerçek testi budur.
    startPlacement()
      .then((items) => { if (alive) { if (items.length) setReal(items); else setLoadError(true); setLoading(false); } })
      .catch(() => { if (alive) { setLoadError(true); setLoading(false); } });
    return () => { alive = false; };
  }, [user, attempt]);

  const usingReal = !!real;
  const questions = usingReal ? realQuestions(real) : user ? [] : demoQuestions();
  const total = questions.length;
  const done = idx >= total;
  // Önerilen seviye: gerçek modda sunucudan (result), yoksa yerel tahmin.
  const level = result?.suggested ?? estimateLevel(correct);

  function onDone(ok: boolean) {
    const q = questions[idx];
    if (q) answers.current.push({ stage: "vocab", level: q.level, itemId: q.itemId, correct: ok });
    if (ok) setCorrect((c) => c + 1);
    const next = idx + 1;
    setIdx(next);
    if (next >= total) sfx("finish"); // tamamlanma sesi (sonuç ekranı)
    // Son soru bittiğinde gerçek modda cevapları sunucuya ver.
    if (next >= total && usingReal && user) {
      setSubmitting(true);
      finishPlacement(answers.current)
        .then((r) => setResult(r))
        .catch(() => { /* sunucu hata → yerel tahmin gösterilir */ })
        .finally(() => setSubmitting(false));
    }
  }

  async function applyLevel() {
    // Onboarding'de misafir: seviye yerel prefs'e; hesap açınca profile taşınır.
    if (onboarding) await saveOnboardingPrefs({ level });
    if (user) {
      try {
        if (result) await acceptPlacement(result.id, result.suggested);
        else await updateProfile({ level });
      } catch { /* yut: yine de kapat */ }
    }
    setSaved(true);
    setTimeout(leave, 700);
  }

  // Misafir yolunda bu paritenin hazır seti yoksa soru üretilemez; sessiz boş
  // ekran yerine sebebi söylenir (onboarding bu seçeneği zaten göstermiyor).
  if (!user && !questions.length) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.md, padding: spacing.xl }}>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("placement.no_demo")}</Text>
        <PressableScale onPress={leave} style={[{ paddingHorizontal: 22, paddingVertical: 12, borderRadius: radii.lg, backgroundColor: colors.primary }, softShadow(colors.primary, 8)]}>
          <Text variant="bodyStrong" color="#fff">{t("common.close")}</Text>
        </PressableScale>
      </View>
    );
  }

  if (user && !loading && loadError) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.md, padding: spacing.xl }}>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("placement.couldn_t_load_test")}</Text>
        <PressableScale onPress={() => setAttempt((n) => n + 1)} style={[{ paddingHorizontal: 22, paddingVertical: 12, borderRadius: radii.lg, backgroundColor: colors.primary }, softShadow(colors.primary, 8)]}>
          <Text variant="bodyStrong" color="#fff">{t("common.try_again")}</Text>
        </PressableScale>
        <PressableScale onPress={leave} style={{ paddingVertical: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (loading) return <RoundSkeleton label />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <PressableScale hitSlop={4} onPress={leave} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
        <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${total ? Math.round((Math.min(idx, total) / total) * 100) : 0}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
        </View>
        <Text variant="bodyStrong" color={colors.textMuted}>{Math.min(idx + (done ? 0 : 1), total)}/{total}</Text>
      </View>

      {!done ? (
        <>
          <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginBottom: spacing.md, textTransform: "uppercase", letterSpacing: 1 }}>
            {t("placement.title")}{usingReal ? "" : t("placement.sample")}
          </Text>
          <ChoiceGame key={idx} round={questions[idx].round} onDone={onDone} />
        </>
      ) : submitting ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator color={colors.primary} />
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>{t("placement.calculating_your_level")}</Text>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={[{ width: 110, height: 110, borderRadius: 55, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 14)]}>
            <Text variant="display" color="#fff" style={{ fontSize: 40 }}>{level}</Text>
          </View>
          <Text variant="h1" style={{ marginTop: spacing.xl }}>{t("placement.your_level", { level: level })}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: spacing.xxl, textAlign: "center" }}>
            {t("placement.result", { total: total, correct: correct })}
          </Text>
          {saved && <Text variant="bodyStrong" color={colors.success} style={{ marginBottom: spacing.md }}>{t("placement.saved")}</Text>}
          <PressableScale onPress={applyLevel} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color="#fff">{t(user ? "placement.set_level" : "placement.understood")}</Text>
          </PressableScale>
          <PressableScale onPress={leave} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text>
          </PressableScale>
        </View>
      )}
    </View>
  );
}
