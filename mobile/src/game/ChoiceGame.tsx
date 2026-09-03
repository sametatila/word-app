import React, { useEffect, useRef, useState } from "react";
import { View, Animated } from "react-native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { CheckIcon, XIcon } from "../ui/icons";
import { SpeakButton } from "../ui/SpeakButton";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { haptic } from "../lib/haptics";

export type ChoiceRound = {
  wordId: number;
  /** Soru metni (yönüne göre Almanca ya da Türkçe). */
  question: string;
  /** Doğru cevap metni. */
  answer: string;
  /** Dört şık (doğru dahil, karışık). */
  options: string[];
  /** Üst etiket: "Türkçesi?" ya da "Almancası?" */
  prompt: string;
};

/**
 * Tek turlu çoktan seçmeli oyun — web'deki choice-game'in mobil karşılığı.
 * Şık seçilince doğru yeşil / yanlış kırmızı boyanır, doğru cevap her zaman
 * belirginleşir (yanlışı pekiştirmemek için), kısa gecikmeyle onDone çağrılır.
 */
export function ChoiceGame({ round, onDone }: { round: ChoiceRound; onDone: (correct: boolean) => void }) {
  const { colors } = useTheme();
  const [picked, setPicked] = useState<string | null>(null);
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    setPicked(null);
    fade.setValue(0);
    slide.setValue(12);
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 260, useNativeDriver: true }),
      Animated.spring(slide, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 6 }),
    ]).start();
  }, [round.wordId, fade, slide]);

  function choose(opt: string) {
    if (picked) return;
    setPicked(opt);
    const correct = opt === round.answer;
    haptic(correct ? "correct" : "wrong"); // haptik + SFX (tüm oyunlarla aynı geri bildirim)
    setTimeout(() => onDone(correct), correct ? 700 : 1150);
  }

  return (
    <Animated.View style={{ flex: 1, opacity: fade, transform: [{ translateY: slide }] }}>
      {/* soru kartı */}
      <View
        style={[
          { backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: spacing.xxxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.xl },
          softShadow("#5a3418", 10),
        ]}
      >
        <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{round.prompt}</Text>
        <Text variant="display" style={{ marginTop: spacing.sm, textAlign: "center" }}>{round.question}</Text>
        <View style={{ marginTop: spacing.sm }}><SpeakButton text={round.question} size={22} /></View>
      </View>

      {/* şıklar */}
      <View style={{ gap: spacing.md }}>
        {round.options.map((opt) => {
          const isPicked = picked === opt;
          const isAnswer = opt === round.answer;
          const reveal = picked !== null;
          let bg = colors.surface;
          let border = colors.border;
          let fg = colors.text;
          if (reveal && isAnswer) { bg = colors.successSoft; border = colors.success; fg = colors.success; }
          else if (reveal && isPicked && !isAnswer) { bg = colors.dangerSoft; border = colors.danger; fg = colors.danger; }
          return (
            <PressableScale
              key={opt}
              onPress={() => choose(opt)}
              style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: bg, borderColor: border, borderWidth: 1.5, borderRadius: radii.lg, paddingVertical: spacing.lg, paddingHorizontal: spacing.lg }}
            >
              <Text variant="bodyStrong" color={fg}>{opt}</Text>
              {reveal && isAnswer && <CheckIcon color={colors.success} size={22} />}
              {reveal && isPicked && !isAnswer && <XIcon color={colors.danger} size={22} />}
            </PressableScale>
          );
        })}
      </View>
    </Animated.View>
  );
}
