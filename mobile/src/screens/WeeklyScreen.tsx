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
import { XIcon, ExamIcon, KeyboardIcon, LockIcon, CalendarIcon, AlertIcon, CheckIcon } from "../ui/icons";
import { FlowScreen, FlowActions, FlowTopBar, FlowNote, ResultHero, StatRow, DetailCard, CoverBody, StateBody } from "../ui/flow";
import { RoundView } from "../game/rounds";
import { fetchWeekly, submitWeekly, type WeeklyStatus } from "../game/weekly";
import { todayStr, type DoneExtra } from "../game/session";
import type { Round, AnswerOut } from "../game/session";
import { ApiError } from "../api/client";
import { track } from "../lib/track";
import { RoundSkeleton } from "../game/RoundSkeleton";
import { useTheme, spacing, radii } from "../theme";
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
      <FlowScreen center actions={<FlowActions primary={{ label: t("weekly.sign_in_sign_up"), onPress: () => { nav.goBack(); nav.navigate("Auth"); } }} tertiary={{ label: t("common.close"), onPress: () => nav.goBack() }} />}>
        <StateBody mood="wave" title={t("weekly.sign_in_for_weekly_quiz")} body={t("weekly.test_what_you_ve_learned_once")} />
      </FlowScreen>
    );
  }

  if (phase === "ready") {
    /*
     * KAPAK ŞABLONU (ui/flow). Kurallar eskiden tek bir "·" dizisiydi
     * ("25 soru · yalnız yazarak · ipucu yok · tek hak"); artık her kural
     * kendi ikonlu satırında. Pekişmiş kelime cümlesi tek cümlelik tanıtım,
     * dürüst ölçüm notu kapağın notu - web `weekly-player` aynı sırada.
     */
    return (
      <FlowScreen
        actions={
          <FlowActions
            primary={{ label: t("common.start"), onPress: () => { startedAt.current = Date.now(); roundStart.current = Date.now(); track("session_start", 0, "weekly"); setPhase("playing"); } }}
            /* "Sonra", "Kapat" değil: düğme sınavı ERTELİYOR, hak duruyor. Web
               aynı yerde aynı sözü söylüyor (`weekly-player`). */
            tertiary={{ label: t("common.later"), onPress: () => nav.goBack() }}
          />
        }
      >
        <CoverBody
          icon={ExamIcon}
          tint={colors.primary}
          eyebrow={t("learn.weekly_quiz")}
          title={t(status?.short ? "plan.weekly_short" : "plan.weekly_exam")}
          pitch={t(status?.short ? "weekly.pitch_short" : "weekly.pitch_full", { n: status?.mastered ?? 0, min: MIN_MASTERED })}
          rules={[
            { icon: KeyboardIcon, text: t("weekly.rule_count", { n: rounds.length }) },
            { icon: LockIcon, text: t("weekly.rule_no_hints") },
            { icon: CalendarIcon, text: t("weekly.rule_once") },
          ]}
          note={t("weekly.honest_note")}
        />
      </FlowScreen>
    );
  }

  if (phase === "error") {
    return (
      <FlowScreen center actions={<FlowActions primary={{ label: t("weekly.try_again"), onPress: () => void load() }} tertiary={{ label: t("common.close"), onPress: () => nav.goBack() }} />}>
        <StateBody alert mood="sad" title={t("weekly.couldn_t_load_weekly_quiz")} body={t("game.check_your_connection_and_try")} />
      </FlowScreen>
    );
  }

  if (phase === "done") {
    const score = result?.score ?? 0;
    const correct = result?.correct ?? 0;
    const total = result?.total ?? 0;
    /* SINAV YOK: sınav kurulamadıysa sonuç değil durum ekranı. Eskiden burada
       da %0'lık bir halka çiziliyordu ve oynanmamış bir sınavdan kalınmış
       gibi okunuyordu. Web aynı dalı `empty` diye ayrı çiziyor. */
    if (total <= 0) {
      return (
        <FlowScreen center actions={<FlowActions primary={{ label: t("weekly.start_round"), onPress: () => { nav.goBack(); nav.navigate("Game"); } }} tertiary={{ label: t("common.close"), onPress: () => nav.goBack() }} />}>
          <StateBody mood="think" title={t("weekly.none_title")} body={t("weekly.none_sub")} />
        </FlowScreen>
      );
    }
    /*
     * KUYRUĞA GERİ DÖNENLER — web `weekly-player` aynı yerde gösteriyor.
     *
     * Sınav bitiyordu ve "{total} sorudan {correct} doğru" dışında hiçbir şey
     * yazmıyordu: HANGİ kelimede takıldığın hiçbir yerde görünmüyordu. Hesap
     * sunucudan gelmiyor, elde duran cevaplardan çıkıyor — webdeki hesabın
     * aynısı: bir kelime turlarının HEPSİNDE doğruysa doğru.
     */
    const wordOf = (r: Round) => (r.game === "match" ? r.words?.[0] : r.word);
    const byWord = new Map<number, boolean>();
    for (const a of answers.current) if (a.wordId) byWord.set(a.wordId, (byWord.get(a.wordId) ?? true) && a.correct);
    const wrong = rounds.map(wordOf).filter((w): w is NonNullable<typeof w> => !!w && byWord.get(w.id) === false);
    /* Konfeti yalnız olumlu sonuçta ve kayıt yazıldıysa: gönderilemeyen bir
       sınavı kutlamak "hakkın kullanıldı" izlenimini güçlendirirdi. */
    const good = score >= 80;
    /*
      SONUÇ ŞABLONU (ui/flow): band → üç sayı → notlar → ayrıntı kartı →
      altta sabit düğme. Halka kalktı: bandın ana sayısı aynı yüzdeyi veriyor.
      Maskot da eklendi - sonuçta maskotu olmayan tek ekranlardan biriydi.
    */
    return (
      <FlowScreen
        celebrate={good && !notSent}
        top={<FlowTopBar onClose={() => nav.goBack()} />}
        actions={<FlowActions primary={{ label: t("common.finish"), onPress: () => nav.goBack() }} />}
      >
        <ResultHero
          eyebrow={t("learn.weekly_quiz")}
          title={t("weekly.done_title")}
          figure={formatPercent(score)}
          sub={t("weekly.done_sub", { total, correct })}
          mood={good ? "celebrate" : score >= 50 ? "happy" : "sad"}
        />
        <StatRow items={[
          { value: `${correct}/${total}`, label: t("common.correct"), tone: "ok" },
          { value: String(Math.max(0, total - correct)), label: t("weekly.wrong_count"), tone: total > correct ? "bad" : null },
          { value: "1", label: t("weekly.per_week") },
        ]} />
        {/* Haftada tek hak var: kaydedilmemiş bir sınav "yapıldı" görünürse
            kullanıcı hakkını harcadığını sanır - bu yüzden kırmızı not. */}
        {notSent ? <FlowNote tone="bad" icon={<AlertIcon color={colors.dangerText} size={16} />} text={t("weekly.not_sent")} /> : null}
        {correct === total ? <FlowNote tone="ok" icon={<CheckIcon color={colors.successText} size={16} />} text={t("weekly.all_correct")} /> : null}
        {/* Sınavın haftada bir olduğu ve sonrakinin ne zaman geleceği. */}
        <FlowNote icon={<CalendarIcon color={colors.textMuted} size={16} />} text={t("weekly.once_a_week")} />
        {wrong.length ? (
          <DetailCard title={t("weekly.back_in_queue")}>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
              {wrong.map((w) => (
                <View key={w.id} style={{ flexDirection: "row", alignItems: "baseline", gap: 6, backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: 6 }}>
                  <Text variant="caption">{w.artikel ? `${w.artikel} ${w.de}` : w.de}</Text>
                  <Text variant="micro" color={colors.textMuted}>{w.tr}</Text>
                </View>
              ))}
            </View>
          </DetailCard>
        ) : null}
      </FlowScreen>
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
