import React, { useEffect, useRef, useState } from "react";
import { t, currentLang, nativeLangName } from "../lib/i18n";
import { track } from "../lib/track";
import { currentCourseId } from "../lib/courses";
import { View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon } from "../ui/icons";
import { Chip } from "../ui/Chip";
import { ChoiceGame, type ChoiceRound } from "../game/ChoiceGame";
import { RoundSkeleton } from "../game/RoundSkeleton";
import { demoPlacementFor, estimateLevel } from "../data/demoPlacement";
import {
  startPlacement,
  fetchPlacementStatus,
  finishPlacement,
  acceptPlacement,
  type PlacementVocab,
  type PlacementAnswer,
  type PlacementRecord,
  type PlacementStatus,
} from "../game/placement";
import { useAuth } from "../lib/AuthContext";
import { updateProfile } from "../lib/updateProfile";
import { saveOnboardingPrefs } from "../lib/onboardingPrefs";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { sfx } from "../lib/sfx";

/** Kullanıcının seçebileceği seviyeler — web `PLACEMENT_LEVELS` ile aynı. */
const CHOOSABLE = ["A1", "A2", "B1", "B2", "C1"] as const;

const withArtikel = (a: string | null, de: string) => (a ? `${a} ${de}` : de);

/** Ekranın oynadığı birleşik soru — hem sunucudan geleni hem demo aynı biçime düşer. */
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

  // Gerçek test (oturum açıksa sunucudan). Yüklenene dek loading; hata → demo.
  const [real, setReal] = useState<PlacementVocab[] | null>(null);
  const [loading, setLoading] = useState<boolean>(!!user);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [result, setResult] = useState<PlacementRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  /* Bekleme süresi: sunucu bunu bildiriyor ama ZORLAMIYOR (bkz.
     `fetchPlacementStatus`). Onboarding'de sorulmuyor - orada zaten ilk kez
     alınıyor ve hesap bile yeni. */
  const [status, setStatus] = useState<PlacementStatus | null>(null);
  /*
   * SEVİYEYİ KULLANICI SEÇEBİLİYOR.
   *
   * Sunucu öneriyi veriyor ama `accept` HANGİ seviyeyi kabul ettiğini ayrıca
   * alıyor (`acceptPlacement(id, level)`) - yani "önerine katılmıyorum, ben
   * B1'den başlayacağım" baştan beri mümkündü. Mobil her zaman öneriyi
   * uyguluyordu; kendi seviyesini bilen kullanıcının burada söyleyecek sözü
   * yoktu. Web beş seviyeyi çip olarak gösteriyor (`placement-test`).
   */
  const [chosen, setChosen] = useState<string | null>(null);
  const answers = useRef<PlacementAnswer[]>([]);

  useEffect(() => {
    if (!user) { setReal(null); setLoading(false); return; }
    let alive = true;
    setLoading(true);
    setLoadError(false);
    // Oturumlu kullanıcıda gerçek test gelmezse "örnek" sorulara DÜŞÜLMEZ (uydurma sonuç
    // seviyeyi yanlış ayarlardı); hata gösterilir, tekrar denenir. Misafir (onboarding)
    // yerleşik soru setini kullanır — o akışın gerçek testi budur.
    /* Test BASLADI — web `placement-test` ile aynı ad ve aynı kind biçimi.
       Mobil yalnız bitişi yazıyordu, yani "kaç kişi başlayıp bıraktı"
       hesaplanamıyordu: huninin payı eksikti. */
    track("exam_start", 0, "placement:A1");
    if (!onboarding) {
      /* Durum test İSTEĞİNDEN önce gelmiyor: iki istek paralel gidiyor ve
         bekleme süresi doluysa ekran soruları hiç göstermeden kapanıyor.
         Sıralı yapmak açılışı iki gecikme kadar yavaşlatırdı. */
      fetchPlacementStatus().then((st) => { if (alive) setStatus(st); }).catch(() => { /* durum yoksa test yine açılır */ });
    }
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
  const level = chosen ?? result?.suggested ?? estimateLevel(correct);

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
    /* Yerleştirme SONUCU uygulandı — web `demo-placement` ile aynı ad, aynı
       değer (yüzde) ve aynı kind biçimi. Mobil hiç yazmıyordu: kaç kişinin
       seviyesini yerleştirmeye göre ayarladığı ölçülmüyordu. */
    track("placement_finish", total ? Math.round((correct / total) * 100) : 0, `${usingReal ? "real" : "demo"}:${String(level).toLowerCase()}`);
    // Onboarding'de misafir: seviye yerel prefs'e; hesap açınca profile taşınır.
    if (onboarding) await saveOnboardingPrefs({ level });
    if (user) {
      try {
        if (result) await acceptPlacement(result.id, level);
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
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.close")}</Text>
        </PressableScale>
      </View>
    );
  }

  if (user && !loading && loadError) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.md, padding: spacing.xl }}>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("placement.couldn_t_load_test")}</Text>
        <PressableScale onPress={() => setAttempt((n) => n + 1)} style={[{ paddingHorizontal: 22, paddingVertical: 12, borderRadius: radii.lg, backgroundColor: colors.primary }, softShadow(colors.primary, 8)]}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.try_again")}</Text>
        </PressableScale>
        <PressableScale onPress={leave} style={{ paddingVertical: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (loading) return <RoundSkeleton label />;

  /*
   * BEKLEME SÜRESİ DOLMADIYSA TEST AÇILMIYOR.
   *
   * Test 30 günde bir alınabiliyor; sunucu bunu yalnız BİLDİRİYOR, kapıyı
   * istemci tutuyor. Mobil hiç sormadığı için Android'de test istenildiği
   * kadar tekrarlanabiliyor ve her bitiş seviyeyi yeniden yazabiliyordu.
   * Web aynı yerde son almayı ve kalan süreyi söylüyor (`placement-test`).
   */
  if (user && status && !status.canRetake) {
    const last = status.last;
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.md, padding: spacing.xl }}>
        <Text variant="h2" style={{ textAlign: "center" }}>{t("placement.title")}</Text>
        {last ? (
          <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 20 }}>
            {t("placement.last_taken", { date: last.at.slice(0, 10) })} {last.suggested}
            {last.accepted ? ` ${t("placement.you_chose", { level: last.accepted })}` : ""}
          </Text>
        ) : null}
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 22 }}>{t("placement.retake_in", { n: status.retakeDays })}</Text>
        <PressableScale onPress={leave} style={[{ paddingHorizontal: 22, paddingVertical: 12, borderRadius: radii.lg, backgroundColor: colors.primary }, softShadow(colors.primary, 8)]}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.close")}</Text>
        </PressableScale>
      </View>
    );
  }

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
          <ActivityIndicator color={colors.primaryText} />
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>{t("placement.calculating_your_level")}</Text>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={[{ width: 110, height: 110, borderRadius: 55, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 14)]}>
            <Text variant="display" color={colors.onPrimary} style={{ fontSize: 40 }}>{level}</Text>
          </View>
          <Text variant="h1" style={{ marginTop: spacing.xl }}>{t("placement.your_level", { level: level })}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: spacing.xxl, textAlign: "center" }}>
            {t("placement.result", { total: total, correct: correct })}
          </Text>
          {/* Beş seviye: öneri işaretli, seçim kullanıcının. Yalnız oturumlu
              kullanıcıda - misafir akışında kabul edilecek bir kayıt yok. */}
          {user && result ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: spacing.sm, marginBottom: spacing.lg }}>
              {CHOOSABLE.map((l) => (
                <Chip key={l} label={l === result.suggested ? `${l} · ${t("placement.suggested")}` : l} active={level === l} onPress={() => setChosen(l)} />
              ))}
            </View>
          ) : null}
          {saved && <Text variant="bodyStrong" color={colors.successText} style={{ marginBottom: spacing.md }}>{t("placement.saved")}</Text>}
          <PressableScale onPress={applyLevel} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color={colors.onPrimary}>
              {user && result
                ? t(level === result.suggested ? "placement.continue_with" : "placement.pick_and_continue", { level: String(level) })
                : t(user ? "placement.set_level" : "placement.understood")}
            </Text>
          </PressableScale>
          <PressableScale onPress={leave} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text>
          </PressableScale>
        </View>
      )}
    </View>
  );
}
