import React from "react";
import { View } from "react-native";
import { Text } from "./Text";
import { t } from "../lib/i18n";
import { ERROR_LABEL_KEYS, type ErrorType } from "../lib/errors";
import { useTheme, spacing, radii, type Palette } from "../theme";

/**
 * DEĞERLENDİRME KARTI — web `components/feedback/assessment-card` karşılığı.
 *
 * Android rubrik çubuklarını gösteriyordu ama değerlendirmenin ÖĞRETEN kısmını
 * hiç göstermiyordu: her hatanın gerekçesi (`why_tr`), düzeltilmiş cümle,
 * övgü ve sıradaki ipucu. Yani öğrenci "72" görüyor, neyi yanlış yaptığını
 * öğrenmiyordu — oysa sınavın varlık sebebi tam olarak o. Web aynı sonucu
 * baştan beri açık açık yazıyor (`roleplay-exam`, `exam-player`).
 *
 * Kart bilgiyi taşıyor, işaretlemeyi değil: web'in kart düzeni tarayıcıya,
 * buradaki düzen uygulamanın kendi diline ait. Ölçülen şey aynı olmalı —
 * çizim aynı olmak zorunda değil.
 */
export type AssessError = { type: ErrorType; wrong: string; fix: string; why_tr?: string; span?: [number, number] };
export type AssessScore = { task: number; grammar: number; vocab: number; structure: number; overall: number };
export type AssessmentResult = {
  score: AssessScore;
  errors: AssessError[];
  corrected?: string | null;
  praise_tr?: string | null;
  next_tip_tr?: string | null;
};

export function AssessmentCard({
  answer,
  result,
  failNote,
  example,
}: {
  /** Öğrencinin metni — hatalı parçalar bunun üstünde vurgulanıyor. */
  answer: string;
  result: AssessmentResult;
  /** Yedek/kapı durumunda gösterilecek tek satır (web `failure` karşılığı). */
  failNote?: string | null;
  /** Kelimenin gerçek örnek cümlesi — "böyle de kurulabilirdi". */
  example?: string | null;
}) {
  const { colors } = useTheme();
  const s = result.score;

  return (
    <View style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg, gap: spacing.sm }}>
      {failNote ? (
        <Text variant="caption" color={colors.textMuted}>{failNote}</Text>
      ) : null}

      <Bar colors={colors} label={t("assess.task")} value={s.task} />
      <Bar colors={colors} label={t("assess.structure")} value={s.structure} />
      <Bar colors={colors} label={t("assess.grammar")} value={s.grammar} />
      <Bar colors={colors} label={t("assess.vocab")} value={s.vocab} />

      {answer.trim() ? (
        <Text variant="body" style={{ marginTop: spacing.sm }}>
          <Highlighted answer={answer} errors={result.errors} colors={colors} />
        </Text>
      ) : null}

      {result.errors.length ? (
        <View style={{ gap: 6, marginTop: 2 }}>
          {result.errors.map((e, i) => (
            <Text key={i} variant="caption" color={colors.textMuted}>
              <Text variant="caption" color={colors.dangerText}>{t(ERROR_LABEL_KEYS[e.type] ?? "err.meaning")}</Text>
              {" · "}
              {e.wrong ? `„${e.wrong}" → „${e.fix}"` : e.fix}
              {e.why_tr ? ` — ${e.why_tr}` : ""}
            </Text>
          ))}
        </View>
      ) : null}

      {result.corrected && result.corrected.trim() !== answer.trim() ? (
        <View style={{ backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 10, marginTop: 2 }}>
          <Text variant="micro" color={colors.textMuted}>{t("assess.corrected")}</Text>
          <Text variant="bodyStrong" style={{ marginTop: 2 }}>{result.corrected}</Text>
        </View>
      ) : null}

      {result.praise_tr ? <Text variant="body" color={colors.successText} style={{ marginTop: 2 }}>{result.praise_tr}</Text> : null}
      {result.next_tip_tr ? <Text variant="caption" color={colors.textMuted}>{result.next_tip_tr}</Text> : null}
      {example ? (
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>
          <Text variant="caption" color={colors.textFaint}>{t("assess.example")} </Text>
          {example}
        </Text>
      ) : null}
    </View>
  );
}

/** Rubrik basamağı: 0-4. Web `assessment-card` `Bar` ile aynı ölçek. */
function Bar({ colors, label, value }: { colors: Palette; label: string; value: number }) {
  const pct = Math.max(0, Math.min(4, value)) / 4;
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.xs }}>
        <Text variant="caption" color={colors.textMuted}>{label}</Text>
        <Text variant="caption" color={colors.textMuted}>{value}/4</Text>
      </View>
      <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden" }}>
        <View style={{ width: `${pct * 100}%`, height: "100%", borderRadius: 3, backgroundColor: colors.primary }} />
      </View>
    </View>
  );
}

/**
 * Hatalı aralıkları metnin ÜSTÜNDE gösterir.
 *
 * Çakışan ve boş aralıklar atlanıyor — web `Highlighted` ile aynı kural.
 * Aralık bulunamamışsa ([0,0]) metin olduğu gibi kalıyor: yanlış yeri
 * boyamak, doğru yeri boyamamaktan kötü.
 */
function Highlighted({ answer, errors, colors }: { answer: string; errors: AssessError[]; colors: Palette }) {
  const spans = errors
    .map((e) => e.span)
    .filter((sp): sp is [number, number] => Array.isArray(sp) && sp[1] > sp[0] && sp[0] >= 0 && sp[1] <= answer.length)
    .sort((a, b) => a[0] - b[0]);

  const parts: React.ReactNode[] = [];
  let i = 0;
  for (const [start, end] of spans) {
    if (start < i) continue; // çakışan
    if (start > i) parts.push(<Text key={`plain${i}`} variant="body">{answer.slice(i, start)}</Text>);
    parts.push(
      <Text key={`bad${start}`} variant="body" color={colors.dangerText} style={{ textDecorationLine: "underline" }}>
        {answer.slice(start, end)}
      </Text>,
    );
    i = end;
  }
  if (i < answer.length) parts.push(<Text key="tail" variant="body">{answer.slice(i)}</Text>);
  return <>{parts}</>;
}
