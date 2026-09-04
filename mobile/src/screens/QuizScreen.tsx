import React, { useMemo, useRef, useState } from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { Mascot } from "../ui/Mascot";
import { Celebrate } from "../ui/Celebrate";
import { XIcon, QuizIcon, CheckIcon } from "../ui/icons";
import { buildUnitBrief, levelPool, deriveQuiz } from "../game/immersionQuiz";
import { QuestionList } from "../game/skillQuiz";
import { markItemDone } from "../game/lessonProgress";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { sfx } from "../lib/sfx";

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

  const questions = useMemo(
    () => deriveQuiz(buildUnitBrief(params.level, params.unitIndex), levelPool(params.level), isCheckpoint ? 12 : 8),
    [params.level, params.unitIndex, isCheckpoint],
  );

  function recordAndFinish(c: number) {
    setCorrect(c);
    setFinished(true);
    setTimeout(() => sfx("finish"), 600); // son cevabın sesinden sonra tamamlanma sesi
    if (saved.current) return;
    saved.current = true;
    void markItemDone(params.itemId);
  }
  function retry() { saved.current = false; setFinished(false); setCorrect(0); setRound((r) => r + 1); }

  const total = questions.length;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const passed = pct >= 60;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, flex: 1 }}>
          <View style={{ width: 34, height: 34, borderRadius: radii.sm, backgroundColor: isCheckpoint ? colors.danger : colors.primary, alignItems: "center", justifyContent: "center" }}>
            {isCheckpoint ? <CheckIcon color="#fff" size={18} /> : <QuizIcon color="#fff" size={18} />}
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="micro" color={colors.textMuted}>{t("quiz.header", { kind: t(isCheckpoint ? "quiz.checkpoint" : "quiz.review"), unit: t("common.unit"), n: params.unitIndex })}</Text>
            <Text variant="h3" numberOfLines={1}>{params.theme}</Text>
          </View>
        </View>
      </View>

      <ScrollView automaticallyAdjustKeyboardInsets contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text variant="body" color={colors.textMuted} style={{ lineHeight: 22 }}>
          {t(isCheckpoint ? "quiz.intro_checkpoint" : "quiz.intro_review")}
        </Text>

        {total === 0 ? (
          <Card padded style={{ marginTop: spacing.lg, alignItems: "center" }}>
            <Text variant="body" color={colors.textMuted}>{t("quiz.this_unit_has_no_questions_yet")}</Text>
          </Card>
        ) : (
          <QuestionList key={round} questions={questions} onAllAnswered={recordAndFinish} colors={colors} />
        )}

        {finished ? (
          <Card padded style={{ marginTop: spacing.lg, alignItems: "center", gap: spacing.sm }}>
            <Celebrate show={!!passed} />
            <Mascot mood={passed ? "celebrate" : "idle"} size={84} />
            <Text variant="h2">{t("common.n_correct", { correct: correct, total: total })}</Text>
            <Text variant="caption" color={passed ? colors.success : colors.textMuted}>{t(passed ? "quiz.passed" : "quiz.try_more", { pct })}</Text>
            <View style={{ flexDirection: "row", gap: spacing.sm, alignSelf: "stretch", marginTop: spacing.sm }}>
              <PressableScale onPress={retry} style={{ flex: 1, backgroundColor: colors.surface2, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
                <Text variant="bodyStrong" color={colors.text}>{t("quiz.try_again")}</Text>
              </PressableScale>
              <PressableScale onPress={() => nav.goBack()} style={[{ flex: 1, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }, softShadow(colors.primary, 10)]}>
                <Text variant="bodyStrong" color={colors.onPrimary}>{t("quiz.back_to_path")}</Text>
              </PressableScale>
            </View>
          </Card>
        ) : null}
      </ScrollView>
    </View>
  );
}
