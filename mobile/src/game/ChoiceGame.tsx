import React, { useEffect, useRef, useState } from "react";
import { View, Animated } from "react-native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { CheckIcon, XIcon } from "../ui/icons";
import { reduceMotion } from "../lib/reduceMotion";
import { SpeakButton } from "../ui/SpeakButton";
import { useTheme, spacing, radii, cardShadow } from "../theme";
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
 *
 * `reveal={false}` ÖLÇÜM KİPİ: yalnız seçim işaretlenir, doğruluk hiç
 * söylenmez. Gerçek yerleştirme sınavı böyle çalışıyor — web de öyle
 * (`placement/placement-test` yalnız seçimi boyuyor; `demo-placement` ise
 * misafir akışında cevabı açıyor ve mobil demo da onunla aynı kalıyor).
 * Cevabı açmak ölçümü bozuyor: aynı yapı sonraki maddelerde tekrar geçtiği
 * için öğrenilen şey sonraki cevapları değiştiriyor. Haptik ve ses de
 * NÖTR — titreşimin tonu da cevabı söylüyordu.
 */
export function ChoiceGame({ round, onDone, reveal = true }: { round: ChoiceRound; onDone: (correct: boolean) => void; reveal?: boolean }) {
  const { colors } = useTheme();
  const [picked, setPicked] = useState<string | null>(null);
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    setPicked(null);
    fade.setValue(0);
    slide.setValue(12);
    /* "Hareketi azalt": tur kayarak/solarak girmiyor, yerinde beliriyor. */
    if (reduceMotion()) { fade.setValue(1); slide.setValue(0); return; }
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 260, useNativeDriver: true }),
      Animated.spring(slide, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 6 }),
    ]).start();
  }, [round.wordId, fade, slide]);

  function choose(opt: string) {
    if (picked) return;
    setPicked(opt);
    const correct = opt === round.answer;
    haptic(reveal ? (correct ? "correct" : "wrong") : "tap"); // haptik + SFX (tüm oyunlarla aynı geri bildirim)
    /* Ölçüm kipinde gecikme de SABİT: doğruda 700, yanlışta 1150 ms beklemek
       cevabı süreyle söylüyordu. */
    setTimeout(() => onDone(correct), reveal ? (correct ? 700 : 1150) : 500);
  }

  return (
    <Animated.View style={{ flex: 1, opacity: fade, transform: [{ translateY: slide }] }}>
      {/* soru kartı */}
      <View
        style={[
          { backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: spacing.xxxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.xl },
          cardShadow(colors, 10),
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
          const acildi = picked !== null && reveal;
          let bg = colors.surface;
          let border = colors.border;
          let fg = colors.text;
          if (acildi && isAnswer) { bg = colors.successSoft; border = colors.success; fg = colors.success; }
          else if (acildi && isPicked && !isAnswer) { bg = colors.dangerSoft; border = colors.danger; fg = colors.danger; }
          else if (isPicked) { bg = colors.primarySoft; border = colors.primary; fg = colors.onPrimarySoft; }
          return (
            <PressableScale
              key={opt}
              /* Secim ve kapali olma hali yalnizca RENKTEN okunuyordu; webde
                 ayni dugme `aria-pressed` + dogal `disabled` tasiyor. */
              accessibilityRole="radio"
              accessibilityState={{ selected: isPicked, disabled: picked !== null }}
              onPress={() => choose(opt)}
              style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: bg, borderColor: border, borderWidth: 1.5, borderRadius: radii.lg, paddingVertical: spacing.lg, paddingHorizontal: spacing.lg }}
            >
              <Text variant="bodyStrong" color={fg}>{opt}</Text>
              {acildi && isAnswer && <CheckIcon color={colors.successText} size={22} />}
              {acildi && isPicked && !isAnswer && <XIcon color={colors.dangerText} size={22} />}
            </PressableScale>
          );
        })}
      </View>
    </Animated.View>
  );
}
