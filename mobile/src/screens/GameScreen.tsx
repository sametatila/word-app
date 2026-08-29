import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, CheckIcon } from "../ui/icons";
import { ProgressRing } from "../ui/ProgressRing";
import { ChoiceGame, type ChoiceRound } from "../game/ChoiceGame";
import { DEMO_WORDS, withArtikel, type Word } from "../data/demoWords";
import { useTheme, spacing, radii, softShadow } from "../theme";

const ROUND_COUNT = 7;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/** Bir kelimeyi çoktan seçmeli tura çevirir (yön karışık: de→tr / tr→de). */
function buildRound(word: Word, pool: Word[]): ChoiceRound {
  const deToTr = Math.random() < 0.5;
  const answer = deToTr ? word.tr : withArtikel(word);
  const distractors = shuffle(pool.filter((w) => w.id !== word.id)).slice(0, 3).map((w) => (deToTr ? w.tr : withArtikel(w)));
  return {
    wordId: word.id,
    question: deToTr ? withArtikel(word) : word.tr,
    answer,
    options: shuffle([answer, ...distractors]),
    prompt: deToTr ? "Türkçesi?" : "Almancası?",
  };
}

export function GameScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const [seed, setSeed] = useState(0);
  const rounds = useMemo(() => shuffle(DEMO_WORDS).slice(0, ROUND_COUNT).map((w) => buildRound(w, DEMO_WORDS)), [seed]);
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const done = idx >= rounds.length;

  function onDone(ok: boolean) {
    if (ok) setCorrect((c) => c + 1);
    setIdx((i) => i + 1);
  }
  function restart() { setSeed((s) => s + 1); setIdx(0); setCorrect(0); }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      {/* üst bar: kapat + ilerleme */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
        <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${Math.round((Math.min(idx, rounds.length) / rounds.length) * 100)}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
        </View>
        <Text variant="bodyStrong" color={colors.textMuted}>{Math.min(idx + (done ? 0 : 1), rounds.length)}/{rounds.length}</Text>
      </View>

      {done ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ProgressRing size={150} stroke={14} pct={Math.round((correct / rounds.length) * 100)} track={colors.surface2} from={colors.gradientA[0]} to={colors.gradientA[1]}>
            <Text variant="display" color={colors.primary}>{correct}/{rounds.length}</Text>
            <Text variant="micro" color={colors.textMuted}>doğru</Text>
          </ProgressRing>
          <Text variant="h1" style={{ marginTop: spacing.xl }}>Tur bitti! 🎉</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: spacing.xxl }}>+{correct * 10} XP kazandın</Text>
          <PressableScale onPress={restart} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }, softShadow(colors.primary, 10)]}>
            <Text variant="bodyStrong" color="#fff">Yeni tur</Text>
          </PressableScale>
          <PressableScale onPress={() => nav.goBack()} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.md }}>
            <Text variant="bodyStrong" color={colors.textMuted}>Bitir</Text>
          </PressableScale>
        </View>
      ) : (
        <ChoiceGame key={idx} round={rounds[idx]} onDone={onDone} />
      )}
    </View>
  );
}
