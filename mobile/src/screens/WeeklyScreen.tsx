import React, { useEffect, useRef, useState } from "react";
import { MIN_MASTERED } from "../lib/learningRules";
import { t, formatPercent } from "../lib/i18n";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon } from "../ui/icons";
import { ProgressRing } from "../ui/ProgressRing";
import { Mascot } from "../ui/Mascot";
import { RoundView } from "../game/rounds";
import { fetchWeekly, submitWeekly, type WeeklyStatus } from "../game/weekly";
import { todayStr, type DoneExtra } from "../game/session";
import type { Round, AnswerOut } from "../game/session";
import { ApiError } from "../api/client";
import { track } from "../lib/track";
import { RoundSkeleton } from "../game/RoundSkeleton";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { sfx } from "../lib/sfx";
import { bumpStats } from "../lib/statsSignal";

/* AYNI DURUMUN TEK ADI. Bu ekran "play" yazıyordu, web karşılığı ve mobilin
   kendi öteki oynatıcıları (`BossScreen`, `ChallengeScreen`) "playing" —
   aynı durumun iki adı, aynı uygulamanın içinde. Sürtünme görünmezdi ama
   maliyeti gerçek: platformlar arası ölçüler aşama adını okuyor ve bu turda
   biri tam bu yüzden kırıldı (§106). */
type Phase = "loading" | "auth" | "error" | "ready" | "playing" | "submitting" | "done";

export function WeeklyScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [phase, setPhase] = useState<Phase>("loading");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [idx, setIdx] = useState(0);
  const [notSent, setNotSent] = useState(false);
  const [result, setResult] = useState<{ score: number; correct: number; total: number } | null>(null);
  const [status, setStatus] = useState<WeeklyStatus | null>(null);

  const answers = useRef<AnswerOut[]>([]);
  const day = useRef("");
  const roundStart = useRef(0);
  const startedAt = useRef(0);
  const submitted = useRef(false);

  async function load() {
    setPhase("loading");
    try {
      const p = await fetchWeekly();
      const st: WeeklyStatus = p.status;
      setStatus(st);
      day.current = todayStr();
      if (st.done) {
        setResult({ score: st.score ?? 0, correct: st.correct ?? 0, total: st.total ?? 0 });
        setPhase("done");
        return;
      }
      const list = p.rounds ?? [];
      if (!list.length) { setResult({ score: 0, correct: 0, total: 0 }); setPhase("done"); return; }
      answers.current = [];
      setRounds(list);
      setIdx(0);
      startedAt.current = Date.now();
      roundStart.current = Date.now();
      /*
       * KURALLAR SORULMADAN SINAV BAŞLAMIYOR. Mobil doğrudan ilk soruya
       * giriyordu: "yalnız yazarak, ipucu yok, tek hak" ve yanlış bilinen
       * kelimenin tekrar kuyruğuna döneceği hiçbir yerde söylenmiyordu.
       * Web bir tanıtım adımı gösteriyor (`weekly-player` ready) - sınav
       * ölçüm, ve ölçümün kuralı önceden bilinmeli (bkz. 11.124).
       */
      setPhase("ready");
    } catch (e) {
      setPhase(e instanceof ApiError && e.status === 401 ? "auth" : "error");
    }
  }
  useEffect(() => { load(); }, []);

  function onDone(ok: boolean, extra?: DoneExtra) {
    const batch = extra?.batch;
    /* `skip`: cevap kaydedilmeyen tur ("zaten biliyorum"). */
    const skip = extra?.skip === true;
    const r = rounds[idx];
    const lat = Math.max(0, Date.now() - roundStart.current);
    if (skip) {
      /* hiçbir cevap yazılmıyor; tur yalnız ilerliyor */
    } else if (batch && batch.length && r) {
      /* Yığın turunda hata tipi kelime başına: doğru eşleşenin hatası yok. */
      for (const b of batch) if (b.wordId) answers.current.push({ wordId: b.wordId, game: r.game, correct: b.correct, latencyMs: lat, ...(b.correct ? {} : { errorType: "meaning" as const }) });
    } else {
      const wordId = r?.word?.id ?? r?.words?.[0]?.id ?? 0;
      if (wordId && r) {
        answers.current.push({
          wordId, game: r.game, correct: ok, latencyMs: lat,
          ...(extra?.errorType ? { errorType: extra.errorType } : {}),
          ...(extra?.detail ? { detail: extra.detail } : {}),
          ...(extra?.quality != null ? { quality: extra.quality } : {}),
          ...(extra?.hintUsed ? { hintUsed: true } : {}),
        });
      }
    }
    roundStart.current = Date.now();
    const next = idx + 1;
    if (next >= rounds.length) void finish();
    else setIdx(next);
  }

  async function finish() {
    if (submitted.current) return;
    submitted.current = true;
    setPhase("submitting");
    track("session_done", answers.current.filter((a) => a.correct).length, "weekly");
    if (answers.current.length > 0) sfx("finish"); // tamamlanma sesi
    bumpStats(); // haftalık sınav bitti
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    try {
      const res = await submitWeekly(answers.current, day.current, secs);
      setResult({ score: res.score, correct: res.correct, total: res.total });
    } catch {
      /* Sunucuya yazılamadıysa yerel doğrulukla gösteriliyor - AMA bunun
         söylenmesi şart: haftada tek hak var ve kaydedilmemiş bir sınav
         "yapıldı" görünürse kullanıcı hakkını harcadığını sanır. */
      const total = answers.current.length;
      const correct = answers.current.filter((a) => a.correct).length;
      setResult({ score: total ? Math.round((100 * correct) / total) : 0, correct, total });
      setNotSent(true);
    }
    setPhase("done");
  }

  const pad = { flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg } as const;

  if (phase === "loading" || phase === "submitting") return <RoundSkeleton />;

  if (phase === "auth") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="display" style={{ textAlign: "center" }}>{t("weekly.sign_in_for_weekly_quiz")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md, marginBottom: spacing.xxl }}>{t("weekly.test_what_you_ve_learned_once")}</Text>
        <PressableScale onPress={() => { nav.goBack(); nav.navigate("Auth"); }} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}><Text variant="h3" color={colors.onPrimary}>{t("weekly.sign_in_sign_up")}</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "ready") {
    return (
      <View style={[pad, { justifyContent: "center" }]}>
        {/* DUSUNEN MIRKET — web ayni kapakta ayni kipi ve ayni boyu ciziyor
            (`weekly-player`, `mood="think" size={64}`); mobilde hic maskot
            yoktu. Web satiri sola yatirip maskotu basligin soluna koyuyor,
            mobil kapak ortali oldugu icin maskot basligin USTUNDE - ayni
            secim `GameScreen`in "kelime yok" dalinda da yapili. */}
        <View style={{ alignItems: "center", marginBottom: spacing.md }}><Mascot mood="think" size={64} /></View>
        <Text accessibilityRole="header" variant="h1" style={{ textAlign: "center" }}>{t(status?.short ? "plan.weekly_short" : "plan.weekly_exam")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md }}>
          {t("weekly.pitch", { n: rounds.length })}{" "}
          {t(status?.short ? "weekly.pitch_short" : "weekly.pitch_full", { n: status?.mastered ?? 0, min: MIN_MASTERED })}
        </Text>
        <Text variant="caption" color={colors.textFaint} style={{ textAlign: "center", marginTop: spacing.sm }}>{t("weekly.honest_note")}</Text>
        <PressableScale
          onPress={() => { startedAt.current = Date.now(); roundStart.current = Date.now(); track("session_start", 0, "weekly"); setPhase("playing"); }}
          style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center", marginTop: spacing.xxl }, softShadow(colors.primary, 10)]}
        >
          <Text variant="h3" color={colors.onPrimary}>{t("common.start")}</Text>
        </PressableScale>
        {/* "Sonra", "Kapat" değil: düğme sınavı ERTELİYOR, hak duruyor. Web
            aynı yerde aynı sözü söylüyor (`weekly-player`). */}
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.later")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "error") {
    return (
      <View accessibilityLiveRegion="assertive" style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="h2" style={{ textAlign: "center" }}>{t("weekly.couldn_t_load_weekly_quiz")}</Text>
        <PressableScale onPress={load} style={[{ marginTop: spacing.xl, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, paddingHorizontal: spacing.xxl, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="h3" color={colors.onPrimary}>{t("weekly.try_again")}</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "done") {
    const score = result?.score ?? 0;
    const done = (result?.total ?? 0) > 0;
    /*
     * KUYRUĞA GERİ DÖNENLER — web `weekly-player` aynı yerde gösteriyor.
     *
     * Sınav bitiyordu ve "{total} sorudan {correct} doğru" dışında hiçbir şey
     * yazmıyordu: HANGİ kelimede takıldığın hiçbir yerde görünmüyordu. Turun
     * özetinde bu liste vardı (§11.x "zorlandıkların"), haftalık sınavda
     * yoktu. Hesap sunucudan gelmiyor, elde duran cevaplardan çıkıyor —
     * webdeki hesabın aynısı: bir kelime turlarının HEPSİNDE doğruysa doğru.
     */
    const wordOf = (r: Round) => (r.game === "match" ? r.words?.[0] : r.word);
    const byWord = new Map<number, boolean>();
    for (const a of answers.current) if (a.wordId) byWord.set(a.wordId, (byWord.get(a.wordId) ?? true) && a.correct);
    const wrong = rounds.map(wordOf).filter((w): w is NonNullable<typeof w> => !!w && byWord.get(w.id) === false);
    return (
      <View style={pad}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          {/* HALKA YALNIZ OYNANMIŞSA. Sınav kurulamadığında da %0'lık bir halka
              çiziliyordu: "şu an sınav yok" başlığının üstünde sıfır puan,
              oynanmamış bir sınavdan kalınmış gibi okunuyordu. */}
          {done ? (
            <ProgressRing size={160} stroke={15} pct={score} track={colors.surface2} from={colors.gradientA[0]} to={colors.gradientA[1]}>
              <Text variant="display" color={colors.primaryText}>{formatPercent(score)}</Text>
              <Text variant="micro" color={colors.textMuted}>{t("weekly.score")}</Text>
            </ProgressRing>
          ) : null}
          <Text accessibilityRole="header" accessibilityLiveRegion="polite" variant="h1" style={{ marginTop: spacing.xl }}>{t(done ? "weekly.done_title" : "weekly.none_title")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: spacing.xxl, textAlign: "center" }}>
            {done ? t("weekly.done_sub", { total: result?.total ?? 0, correct: result?.correct ?? 0 }) : t("weekly.none_sub")}
          </Text>
          {/* Sınavın haftada bir olduğu ve sonrakinin ne zaman geleceği: web
              aynı yerde söylüyor, mobilde hiç yazmıyordu. */}
          {notSent ? <Text variant="caption" color={colors.dangerText} style={{ textAlign: "center", marginBottom: spacing.md }}>{t("weekly.not_sent")}</Text> : null}
          {done ? (
            wrong.length ? (
              <View style={{ width: "100%", marginBottom: spacing.lg }}>
                <Text variant="bodyStrong" style={{ marginBottom: spacing.sm }}>{t("weekly.back_in_queue")}</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
                  {wrong.map((w) => (
                    <View key={w.id} style={{ flexDirection: "row", alignItems: "baseline", gap: 6, backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 6 }}>
                      <Text variant="caption">{w.artikel ? `${w.artikel} ${w.de}` : w.de}</Text>
                      <Text variant="micro" color={colors.textMuted}>{w.tr}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <Text variant="caption" color={colors.successText} style={{ textAlign: "center", marginBottom: spacing.lg }}>{t("weekly.all_correct")}</Text>
            )
          ) : null}
          {done ? <Text variant="micro" color={colors.textFaint} style={{ textAlign: "center", marginBottom: spacing.lg }}>{t("weekly.once_a_week")}</Text> : null}
          <PressableScale onPress={() => nav.goBack()} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="bodyStrong" color={colors.onPrimary}>{t("common.finish")}</Text></PressableScale>
        </View>
      </View>
    );
  }

  // play
  return (
    <View style={pad}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${Math.round((idx / rounds.length) * 100)}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text variant="bodyStrong" color={colors.textMuted}>{idx + 1}/{rounds.length}</Text>
          {/* "İpucu yok" oynarken de görünüyor: web şeridin üstünde yazıyor. */}
          <Text variant="micro" color={colors.textFaint}>{t("weekly.no_hints")}</Text>
        </View>
      </View>
      <RoundView key={rounds[idx]?.id ?? idx} round={rounds[idx]} onDone={onDone} />
    </View>
  );
}
