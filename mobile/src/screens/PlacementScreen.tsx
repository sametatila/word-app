import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon } from "../ui/icons";
import { ChoiceGame, type ChoiceRound } from "../game/ChoiceGame";
import { DEMO_PLACEMENT, estimateLevel } from "../data/demoPlacement";
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
import { useTheme, spacing, radii, softShadow } from "../theme";

const withArtikel = (a: string | null, de: string) => (a ? `${a} ${de}` : de);

/** Ekranın oynadığı birleşik soru — hem gerçek (Neon) hem demo aynı biçime düşer. */
type PQ = { round: ChoiceRound; level: PlacementAnswer["level"]; itemId: string };

function realQuestions(items: PlacementVocab[]): PQ[] {
  return items.map((it, i) => ({
    round: { wordId: i, question: withArtikel(it.artikel, it.de), answer: it.options[it.answer], options: it.options, prompt: "Türkçesi?" },
    level: it.level,
    itemId: it.id,
  }));
}
function demoQuestions(): PQ[] {
  return DEMO_PLACEMENT.map((q, i) => ({
    round: { wordId: i, question: q.question, answer: q.answer, options: q.options, prompt: q.prompt },
    level: q.level,
    itemId: q.id,
  }));
}

export function PlacementScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();

  // Gerçek test (oturum açıksa Neon'dan). Yüklenene dek loading; hata → demo.
  const [real, setReal] = useState<PlacementVocab[] | null>(null);
  const [loading, setLoading] = useState<boolean>(!!user);
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
    startPlacement()
      .then((items) => { if (alive) { setReal(items.length ? items : null); setLoading(false); } })
      .catch(() => { if (alive) { setReal(null); setLoading(false); } });
    return () => { alive = false; };
  }, [user]);

  const usingReal = !!real;
  const questions = usingReal ? realQuestions(real) : demoQuestions();
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
    if (!user) { nav.goBack(); return; }
    try {
      if (result) await acceptPlacement(result.id, result.suggested);
      else await updateProfile({ level });
      setSaved(true);
    } catch { /* yut: yine de kapat */ }
    setTimeout(() => nav.goBack(), 700);
  }

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.primary} />
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>Seviye testin hazırlanıyor…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
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
            Seviye testi{usingReal ? "" : " · örnek"}
          </Text>
          <ChoiceGame key={idx} round={questions[idx].round} onDone={onDone} />
        </>
      ) : submitting ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator color={colors.primary} />
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>Seviyen hesaplanıyor…</Text>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={[{ width: 110, height: 110, borderRadius: 55, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 14)]}>
            <Text variant="display" color="#fff" style={{ fontSize: 40 }}>{level}</Text>
          </View>
          <Text variant="h1" style={{ marginTop: spacing.xl }}>Seviyen: {level}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: spacing.xxl, textAlign: "center" }}>
            {total} sorudan {correct} doğru. Bu seviyeden başlayabilirsin.
          </Text>
          {saved && <Text variant="bodyStrong" color={colors.success} style={{ marginBottom: spacing.md }}>Kaydedildi ✓</Text>}
          <PressableScale onPress={applyLevel} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color="#fff">{user ? "Seviyemi ayarla" : "Anladım"}</Text>
          </PressableScale>
          <PressableScale onPress={() => nav.goBack()} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.textMuted}>Kapat</Text>
          </PressableScale>
        </View>
      )}
    </View>
  );
}
