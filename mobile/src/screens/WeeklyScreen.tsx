import React, { useCallback, useEffect, useState } from "react";
import { t, formatPercent, dateLocale } from "../lib/i18n";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ExamIcon, LockIcon, CalendarIcon, AlertIcon, CheckIcon, SpeakerIcon } from "../ui/icons";
import { FlowScreen, FlowActions, FlowTopBar, FlowNote, ResultHero, StatRow, DetailCard, CoverBody, StateBody } from "../ui/flow";
import { fetchQuiz, submitQuiz, type Quiz, type QuizBlock, type QuizClientItem, type QuizScore, type QuizStimulus } from "../game/weekly";
import { ApiError } from "../api/client";
import { track } from "../lib/track";
import { speakTarget } from "../lib/tts";
import { useTheme, spacing, radii, type Palette } from "../theme";
import { sfx } from "../lib/sfx";
import { bumpStats } from "../lib/statsSignal";

/**
 * Haftalık quiz ekranı — web `weekly-player` ile aynı akış, aynı adlar.
 *
 * SINAV DEĞİL: on madde, beş yetkinlik, her yanlıştan sonra açıklama. Ekran
 * "kaç doğru" ile değil "hangi yetkinlikte neredesin" ile bitiyor.
 *
 * CEVAP ANAHTARI EKRANA BİTENE KADAR İNMİYOR (bkz. `game/weekly`). Bu ekran
 * hiçbir yerde doğruluk kararı vermiyor; yalnız seçilen şıkkın sırasını
 * topluyor ve sunucunun döndürdüğü dökümü çiziyor.
 */
type Phase = "loading" | "auth" | "error" | "ready" | "playing" | "submitting" | "done" | "empty";

const BLOCK_KEY: Record<QuizBlock, string> = {
  read: "wquiz.block_read",
  listen: "wquiz.block_listen",
  grammar: "wquiz.block_grammar",
  vocab: "wquiz.block_vocab",
  personal: "wquiz.block_personal",
};

export function WeeklyScreen() {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [phase, setPhase] = useState<Phase>("loading");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [score, setScore] = useState<QuizScore | null>(null);
  const [notSent, setNotSent] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setPhase("loading");
    (async () => {
      try {
        const p = await fetchQuiz();
        if (!alive) return;
        if (p.done && p.score) {
          setScore(p.score);
          setPhase("done");
        } else if (p.empty || !p.quiz?.items.length) {
          setPhase("empty");
        } else {
          setQuiz(p.quiz);
          setPhase("ready");
        }
      } catch (e) {
        if (!alive) return;
        setPhase(e instanceof ApiError && e.status === 401 ? "auth" : "error");
      }
    })();
    return () => {
      alive = false;
    };
  }, [attempt]);

  const send = useCallback(async (answers: Record<string, number>) => {
    setPhase("submitting");
    try {
      const out = await submitQuiz(answers);
      setScore(out.score);
      setNotSent(false);
      sfx("finish");
      bumpStats();
    } catch {
      setNotSent(true);
    } finally {
      setPhase("done");
      track("session_done", 0, "weekly");
    }
  }, []);

  function choose(item: QuizClientItem, option: number) {
    const next = { ...picked, [item.id]: option };
    setPicked(next);
    if (idx >= (quiz?.items.length ?? 0) - 1) void send(next);
    else setIdx((i) => i + 1);
  }

  const close = () => nav.goBack();

  /* ── Durumlar ───────────────────────────────────────────────────────── */

  if (phase === "loading" || phase === "submitting") {
    return (
      <FlowScreen top={<FlowTopBar onClose={close} />} center>
        <StateBody title={t(phase === "loading" ? "wquiz.preparing" : "wquiz.saving")} />
      </FlowScreen>
    );
  }

  if (phase === "auth") {
    return (
      <FlowScreen
        top={<FlowTopBar onClose={close} />}
        center
        actions={<FlowActions primary={{ label: t("weekly.sign_in_sign_up"), onPress: () => nav.navigate("Auth") }} secondary={{ label: t("common.close"), onPress: close }} />}
      >
        <StateBody mood="think" title={t("weekly.sign_in_for_weekly_quiz")} body={t("weekly.test_what_you_ve_learned_once")} icon={<LockIcon color={colors.textMuted} size={40} />} />
      </FlowScreen>
    );
  }

  if (phase === "error") {
    return (
      <FlowScreen
        top={<FlowTopBar onClose={close} />}
        center
        actions={<FlowActions primary={{ label: t("weekly.try_again"), onPress: () => setAttempt((a) => a + 1) }} secondary={{ label: t("common.close"), onPress: close }} />}
      >
        <StateBody alert mood="sad" title={t("weekly.couldn_t_load_weekly_quiz")} icon={<AlertIcon color={colors.dangerText} size={40} />} />
      </FlowScreen>
    );
  }

  if (phase === "empty") {
    return (
      <FlowScreen
        top={<FlowTopBar onClose={close} />}
        center
        actions={<FlowActions primary={{ label: t("common.close"), onPress: close }} />}
      >
        <StateBody mood="think" title={t("wquiz.none_title")} body={t("wquiz.none_sub")} icon={<CalendarIcon color={colors.textMuted} size={40} />} />
      </FlowScreen>
    );
  }

  /* ── Kapak ──────────────────────────────────────────────────────────── */

  if (phase === "ready" && quiz) {
    return (
      <FlowScreen
        top={<FlowTopBar onClose={close} />}
        actions={
          <FlowActions
            primary={{ label: t("wquiz.start"), onPress: () => { setPhase("playing"); track("session_start", 0, "weekly"); } }}
            secondary={{ label: t("common.close"), onPress: close }}
          />
        }
      >
        <CoverBody
          icon={ExamIcon}
          tint={colors.primary}
          eyebrow={t("learn.weekly_quiz")}
          title={quiz.themeTr || quiz.theme}
          pitch={t("wquiz.pitch")}
          rules={[
            { icon: CheckIcon, text: t("wquiz.rule_count", { n: quiz.items.length }) },
            { icon: CalendarIcon, text: t("wquiz.rule_once") },
            { icon: ExamIcon, text: t("wquiz.rule_explain") },
          ]}
          note={t("wquiz.no_pass_mark")}
        />
      </FlowScreen>
    );
  }

  /* ── Oynama ─────────────────────────────────────────────────────────── */

  if (phase === "playing" && quiz) {
    const item = quiz.items[idx];
    const stim = item.ref ? quiz.stimuli.find((s) => s.id === item.ref) : null;
    return (
      <FlowScreen
        top={
          <FlowTopBar
            onClose={close}
            title={t(BLOCK_KEY[item.block])}
            right={<Text variant="caption" color={colors.textMuted}>{`${idx + 1}/${quiz.items.length}`}</Text>}
          />
        }
      >
        <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden", marginBottom: spacing.md }}>
          <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.primary, width: `${((idx + 1) / quiz.items.length) * 100}%` }} />
        </View>

        <ScrollView contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.xl }} showsVerticalScrollIndicator={false}>
          {stim ? <Stim stim={stim} colors={colors} /> : null}

          <Text variant="h3">{item.stem}</Text>

          <View style={{ gap: spacing.sm }}>
            {item.options.map((o, i) => (
              <PressableScale
                key={i}
                onPress={() => choose(item, i)}
                accessibilityRole="button"
                accessibilityLabel={o}
                style={{
                  borderRadius: radii.lg,
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                }}
              >
                <Text variant="body">{o}</Text>
              </PressableScale>
            ))}
          </View>
        </ScrollView>
      </FlowScreen>
    );
  }

  /* ── Sonuç ──────────────────────────────────────────────────────────── */

  if (phase === "done" && score) {
    const wrong = score.items.filter((i) => !i.correct);
    return (
      <FlowScreen
        top={<FlowTopBar onClose={close} />}
        celebrate={score.pct >= 90}
        actions={<FlowActions primary={{ label: t("common.finish"), onPress: close }} />}
      >
        <ResultHero
          eyebrow={t("learn.weekly_quiz")}
          title={t(score.band)}
          figure={formatPercent(score.pct)}
          sub={t("wquiz.done_sub", { correct: score.correct, total: score.total })}
          mood={score.pct >= 60 ? "happy" : "think"}
        />
        <StatRow
          items={[
            { value: String(score.correct), label: t("wquiz.correct"), tone: "ok" },
            { value: String(score.total - score.correct), label: t("wquiz.wrong"), tone: score.correct === score.total ? null : "bad" },
          ]}
        />

        <DetailCard title={t("wquiz.by_block")}>
          <View style={{ gap: spacing.sm }}>
            {score.byBlock.map((b) => (
              <View key={b.block} style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                <Text variant="caption" color={colors.textMuted} style={{ width: 96 }}>{t(BLOCK_KEY[b.block])}</Text>
                <View style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
                  <View
                    style={{
                      height: 8,
                      borderRadius: 4,
                      width: `${b.total ? (b.correct / b.total) * 100 : 0}%`,
                      backgroundColor: b.correct === b.total ? colors.successText : colors.primary,
                    }}
                  />
                </View>
                <Text variant="caption" color={colors.textMuted} style={{ width: 36, textAlign: "right" }}>{`${b.correct}/${b.total}`}</Text>
              </View>
            ))}
          </View>
        </DetailCard>

        {wrong.length ? (
          <DetailCard title={t("wquiz.review_title")}>
            <View style={{ gap: spacing.md }}>
              {wrong.map((w) => (
                <View key={w.itemId} style={{ gap: spacing.xs }}>
                  <Text variant="micro" color={colors.textMuted}>{t(BLOCK_KEY[w.block]).toLocaleUpperCase(dateLocale())}</Text>
                  <Text variant="body">{w.why}</Text>
                </View>
              ))}
            </View>
          </DetailCard>
        ) : (
          <FlowNote tone="ok" icon={<CheckIcon color={colors.successText} size={16} />} text={t("wquiz.all_correct")} />
        )}

        {notSent ? <FlowNote tone="bad" icon={<AlertIcon color={colors.dangerText} size={16} />} text={t("wquiz.not_sent")} /> : null}
        <FlowNote icon={<CalendarIcon color={colors.textMuted} size={16} />} text={t("wquiz.once_a_week")} />
      </FlowScreen>
    );
  }

  return null;
}

/**
 * Okuma metni ya da dinleme diyaloğu.
 *
 * DİNLEMEDE METİN GÖRÜNMÜYOR: görünse madde dinleme değil okuma ölçerdi.
 * Her replik ayrı çalınıyor ki konuşmacı değişimi duyulabilsin ve tek bir
 * satır yeniden dinlenebilsin.
 */
function Stim({ stim, colors }: { stim: QuizStimulus; colors: Palette }) {
  const card = {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    padding: spacing.lg,
    gap: spacing.xs,
  } as const;

  if (stim.kind === "text") {
    return (
      <View style={card}>
        <Text variant="micro" color={colors.textMuted}>{(stim.genreTr || stim.genre).toLocaleUpperCase(dateLocale())}</Text>
        {stim.title ? <Text variant="bodyStrong">{stim.title}</Text> : null}
        <Text variant="body">{stim.body}</Text>
      </View>
    );
  }
  return (
    <View style={card}>
      <Text variant="micro" color={colors.textMuted}>{(stim.genreTr || stim.genre).toLocaleUpperCase(dateLocale())}</Text>
      <Text variant="micro" color={colors.textMuted}>{t("wquiz.listen_hint")}</Text>
      <View style={{ gap: spacing.xs, marginTop: spacing.xs }}>
        {stim.segments.map((seg, i) => (
          <PressableScale
            key={i}
            onPress={() => speakTarget(seg.text)}
            accessibilityRole="button"
            accessibilityLabel={t("speakbutton.read_aloud")}
            style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingVertical: 6 }}
          >
            <SpeakerIcon color={colors.primaryText} size={18} />
            <Text variant="caption" color={colors.textMuted}>{seg.speaker ?? String(i + 1)}</Text>
          </PressableScale>
        ))}
      </View>
    </View>
  );
}
