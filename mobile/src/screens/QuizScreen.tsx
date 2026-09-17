import React, { useEffect, useRef, useState } from "react";
import { t, formatPercent } from "../lib/i18n";
import { View } from "react-native";
import { KeyboardAwareScroll } from "../ui/KeyboardAwareScroll";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { Celebrate } from "../ui/Celebrate";
import { XIcon, QuizIcon, CheckIcon } from "../ui/icons";
import { buildUnitBrief, earlierPool, levelPool, deriveQuiz, deriveGrammar } from "../game/immersionQuiz";
import { ensureLessons } from "../data/lessons";
import { QuestionList } from "../game/skillQuiz";
import { markItemDone, recordPathItem } from "../game/lessonProgress";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii } from "../theme";
import { FlowActions, ResultHero, StatRow, StateBody } from "../ui/flow";
import { sfx } from "../lib/sfx";

/** Geçme eşiği — web `PRACTICE_PASS_PCT` (`lib/score-bands.ts`) ile aynı sayı. */
const PASS_PCT = 60;

/**
 * Ünite quiz (Tekrar) / checkpoint (Kontrol Noktası) oynatıcısı — sorular
 * ünitenin kelime/kalıplarından CİHAZDA türetilir (immersionQuiz). QuestionList
 * aynen render eder; ilerleme cihaza yazılır (türetilen quiz için sunucu ucu yok).
 */
export function QuizScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { params } = useRoute<RouteProp<RootStackParams, "Quiz">>();
  const isCheckpoint = params.kind === "checkpoint";
  const saved = useRef(false);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const [round, setRound] = useState(0);

  const isGrammar = params.kind === "grammar";
  /* Sorular derslerden türüyor ve dersler A1 dışında ikilide değil: seviye
     paketi inmeden soru üretilemez. İndikten sonra `ready` listeyi yeniden
     kuruyor; inene kadar ekran kendi yükleniyor durumunu gösteriyor. */
  const [questions, setQuestions] = useState<ReturnType<typeof deriveGrammar>>([]);
  useEffect(() => {
    let dead = false;
    void ensureLessons(params.level).then(() => {
      if (dead) return;
      setQuestions(
        isGrammar
          ? deriveGrammar(params.level, params.unitIndex)
          : /* Tekrar havuzu = BU üniteden ÖNCEKİ üniteler; soruların üçte biri
               oradan gelir (web `immersion/quiz/[unit]` ile aynı). */
            deriveQuiz(
              buildUnitBrief(params.level, params.unitIndex),
              levelPool(params.level),
              isCheckpoint ? 12 : 8,
              earlierPool(params.level, params.unitIndex),
            ),
      );
    });
    return () => { dead = true; };
  }, [params.level, params.unitIndex, isCheckpoint, isGrammar]);

  function recordAndFinish(c: number) {
    setCorrect(c);
    setFinished(true);
    setTimeout(() => sfx("finish"), 600); // son cevabın sesinden sonra tamamlanma sesi
    if (saved.current) return;
    saved.current = true;
    /* "Bitti" = GEÇTİ (web `PRACTICE_PASS_PCT` ile aynı eşik). Cihazdaki işaret
       her denemede konuyordu, yani geçemeyen öğrenci de adımı bitmiş görüyordu. */
    if (total && Math.round((c / total) * 100) >= PASS_PCT) void markItemDone(params.itemId);
    if (total) void recordPathItem({ itemId: params.itemId, correct: c, total });
  }
  function retry() { saved.current = false; setFinished(false); setCorrect(0); setRound((r) => r + 1); }

  const total = questions.length;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const passed = pct >= PASS_PCT;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, flex: 1 }}>
          <View style={{ width: 34, height: 34, borderRadius: radii.sm, backgroundColor: isCheckpoint ? colors.danger : colors.primary, alignItems: "center", justifyContent: "center" }}>
            {isCheckpoint ? <CheckIcon color={colors.onPrimary} size={18} /> : <QuizIcon color={colors.onPrimary} size={18} />}
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="micro" color={colors.textMuted}>{t("quiz.header", { kind: t(isGrammar ? "quiz.grammar" : isCheckpoint ? "quiz.checkpoint" : "quiz.review"), unit: t("common.unit"), n: params.unitIndex })}</Text>
            <Text accessibilityRole="header" variant="h3" numberOfLines={1}>{params.theme}</Text>
          </View>
        </View>
      </View>

      <KeyboardAwareScroll automaticallyAdjustKeyboardInsets contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text variant="body" color={colors.textMuted}>
          {t(isGrammar ? "quiz.intro_grammar" : isCheckpoint ? "quiz.intro_checkpoint" : "quiz.intro_review")}
        </Text>

        {total === 0 ? (
          /* DURUM ŞABLONU: soru yoksa boş durum (düşünen maskot) ve tek çıkış.
             Web aynı dalı `ImmersionQuizPlayer`da çiziyor. */
          <View style={{ marginTop: spacing.md, gap: spacing.md }}>
            <StateBody mood="think" title={t("quiz.this_unit_has_no_questions_yet")} />
            <FlowActions primary={{ label: t("quiz.back_to_path"), onPress: () => nav.goBack() }} />
          </View>
        ) : (
          <QuestionList key={round} questions={questions} onAllAnswered={recordAndFinish} colors={colors} />
        )}

        {finished && total > 0 ? (
          /*
            SONUÇ ŞABLONU (ui/flow): band → üç sayı → düğmeler. Eskiden tek kart:
            maskot, "x/y doğru" ve "%pct — geçtin" satırı. Geçemeyen öğrenci
            adımın AÇIK kaldığını ve eşiği hiçbir yerde görmüyordu; şimdi band
            sessizleşiyor, etiket "Adım açık kaldı" diyor ve birincil düğme
            "Tekrar dene". Sonucu duyuran canlı bölge bandın kendisinde.
          */
          <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
            <Celebrate show={passed} />
            <ResultHero
              eyebrow={`${t("common.unit")} ${params.unitIndex} · ${t(isGrammar ? "unitkind.grammar" : isCheckpoint ? "unitkind.checkpoint" : "unitkind.quiz")}`}
              title={t(passed ? "quiz.result_passed" : "quiz.result_failed")}
              figure={`${correct}/${total}`}
              sub={passed ? t("quiz.result_sub_passed", { pct }) : t("quiz.result_sub_failed", { pct, need: PASS_PCT })}
              mood={passed ? "celebrate" : "sad"}
              quiet={!passed}
              pill={passed ? { text: t("quiz.pill_marked"), tone: "ok" } : { text: t("quiz.pill_open"), tone: "bad" }}
            />
            <StatRow items={[
              { value: `${correct}/${total}`, label: t("common.correct") },
              { value: formatPercent(pct), label: t("quiz.stat_score"), tone: passed ? "ok" : "bad" },
              { value: formatPercent(PASS_PCT), label: t("quiz.stat_pass") },
            ]} />
            {passed ? (
              <FlowActions primary={{ label: t("quiz.back_to_path"), onPress: () => nav.goBack() }} secondary={{ label: t("quiz.try_again"), onPress: retry }} />
            ) : (
              <FlowActions primary={{ label: t("quiz.try_again"), onPress: retry }} secondary={{ label: t("quiz.back_to_path"), onPress: () => nav.goBack() }} />
            )}
          </View>
        ) : null}
      </KeyboardAwareScroll>
    </View>
  );
}
