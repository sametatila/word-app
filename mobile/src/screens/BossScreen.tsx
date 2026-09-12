import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t, formatDecimal } from "../lib/i18n";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { Card } from "../ui/Card";
import { TrophyIcon, RepeatIcon, XIcon } from "../ui/icons";
import { Celebrate } from "../ui/Celebrate";
import { RoundView } from "../game/rounds";
import { submitAnswers, todayStr, type AnswerOut, type DoneExtra, type Round } from "../game/session";
import { api } from "../api/client";
import { track } from "../lib/track";
import { sfx } from "../lib/sfx";
import { bumpStats } from "../lib/statsSignal";
import { useTheme, spacing, radii, softShadow, soft } from "../theme";

/**
 * MODÜL PATRONU — web `components/boss-player` karşılığı.
 *
 * Modülün derslerindeki kelimelerden kurulan SÜRELİ tur: her doğru cevap süre
 * ekliyor, her yanlış süre siliyor, süre bitmeden hepsini bitiren modül tacını
 * alıyor. Uç (`/api/boss`) ve mantık (`lib/lessons/boss`) baştan beri vardı;
 * mobilde EKRAN yoktu, yani Android kullanıcısı modül tacını hiç alamıyordu
 * (bkz. web-parity §11.25).
 *
 * SÜRE KURALLARI SUNUCUDAN. Saniye, bonus, ceza ve tavan yanıtla geliyor;
 * istemcide ikinci bir kopya tutmak dengeyi değiştirdiğimizde iki yerde
 * birden değiştirmeyi hatırlamak demekti (ucun kendi yorumu da bunu söylüyor).
 *
 * Son saniyelerin tık sesi web ile aynı (`danger`, aynı eşik, aynı ritim);
 * ses tablosuna o tür sonradan eklendi (bkz. `lib/sfxNotes`).
 */
type BossMeta = {
  level: string;
  moduleIndex: number;
  title: string;
  lessonsDone: number;
  lessonsTotal: number;
  bestLeft: number | null;
};
type BossPayload = {
  meta: BossMeta;
  rounds: Round[];
  pool: number;
  seconds: number;
  bonus: number;
  penalty: number;
  maxSeconds: number;
};

/** Son saniyeler — sayaç kırmızıya döner. Web `DANGER_SECONDS` ile aynı (kapı: `check:parity` "ortak sayisal sabitler"). */
const DANGER_SECONDS = 10;

type Phase = "loading" | "error" | "ready" | "playing" | "won" | "lost";

export function BossScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootStackParams, "Boss">>();
  const { level, moduleIndex } = route.params;

  const [phase, setPhase] = useState<Phase>("loading");
  const [data, setData] = useState<BossPayload | null>(null);
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(0);
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  const [best, setBest] = useState<number | null>(null);
  const [isRecord, setIsRecord] = useState(false);

  const deadline = useRef(0);
  const finished = useRef(false);
  const pending = useRef<AnswerOut[]>([]);
  const startedAt = useRef(Date.now());
  /* CEVAP SÜRESİ TUR BAŞINA. `startedAt` bütün patron turunun başlangıcı ve
     gecikme ondan hesaplanıyordu: onuncu kelimenin gecikmesi "oyuna
     başlayalı kaç saniye oldu" diye gidiyordu. Gecikme SRS'te ve hata
     çözümlemesinde okunuyor; `GameScreen` baştan beri tur başına ölçüyor. */
  const roundStart = useRef(0);

  /*
   * YÜKLEME AYRI BİR İŞLEV: hata dalından YENİDEN çağrılabilsin.
   *
   * Önce yalnız etkinin içindeydi ve hata ekranında tek düğme "Geri dön"dü.
   * Modül sınavı kazanılmış bir yüzey (dersler bitmeden açılmıyor); geçici bir
   * ağ kesintisinde kullanıcıyı listeye geri gönderip yeniden girmeye zorlamak
   * o girişi kaybettirir. Uygulamadaki her veri ekranı "Tekrar dene" sunuyor,
   * yalnız burası sunmuyordu — webde de sunmuyordu, yani iki taraf aynı kusuru
   * taşıdığı için karşılaştırma geçiyordu.
   */
  const load = useCallback(async () => {
    setPhase("loading");
    try {
      const p = await api<BossPayload>(`/api/boss?level=${level}&module=${moduleIndex}`);
      setData(p);
      setBest(p.meta.bestLeft);
      setPhase(p.rounds.length ? "ready" : "error");
    } catch {
      setPhase("error");
    }
  }, [level, moduleIndex]);

  useEffect(() => {
    void load();
  }, [load]);

  /** Biriken cevaplar SRS'e — tur bitince bir kez. */
  const flush = useCallback(async () => {
    const batch = pending.current;
    pending.current = [];
    if (!batch.length) return;
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    try {
      await submitAnswers(batch, todayStr(), secs);
    } catch {
      /* Çevrimdışıysa batch cihazdaki kuyruğa alındı (`submitAnswers`);
         bağlantı dönünce kendisi gidiyor. Web burada turu kaybediyor. */
    }
  }, []);

  const finish = useCallback(
    async (won: boolean, secondsLeft: number) => {
      if (finished.current) return;
      finished.current = true;
      setPhase(won ? "won" : "lost");
      /* Web kazanmayı REKOR sesiyle kutluyor (`boss-player` `record`); mobil
         sıradan bitiş sesini çalıyordu, yani patronu geçmek günlük turu
         bitirmekle aynı sesi veriyordu. */
      sfx(won ? "record" : "wrong");
      bumpStats(); // patron turu bitti
      await flush();
      if (!won) return;
      track("boss_clear", Math.round(secondsLeft));
      try {
        const out = await api<{ bestLeft: number; isRecord: boolean }>("/api/boss", {
          method: "POST",
          body: JSON.stringify({ level, module: moduleIndex, secondsLeft: Math.round(secondsLeft) }),
        });
        setBest(out.bestLeft);
        setIsRecord(out.isRecord);
      } catch {
        /* kayıt başarısızsa sonuç ekranı yine doğru, taç bir sonraki geçişte gelir */
      }
    },
    [flush, level, moduleIndex],
  );

  // Geri sayım: 100 ms'de bir, süre bitince tur kapanıyor.
  useEffect(() => {
    if (phase !== "playing") return;
    /* SON SANİYELERİN TIKI. Sayaç kırmızıya dönüyordu ama SES yoktu: telefona
       bakmayan kullanıcı süresinin bittiğini hiç duymuyordu. Web saniyede bir
       kısa uyarı çalıyor (`boss-player` `danger`); aynı eşik, aynı ritim -
       saniye TAM değişince, yani on tık. */
    let sonTik = Infinity;
    const timer = setInterval(() => {
      const remaining = (deadline.current - Date.now()) / 1000;
      setLeft(Math.max(0, remaining));
      const tamSaniye = Math.ceil(remaining);
      if (remaining > 0 && remaining <= DANGER_SECONDS && tamSaniye !== sonTik) {
        sonTik = tamSaniye;
        sfx("danger");
      }
      if (remaining > DANGER_SECONDS) sonTik = Infinity;
      if (remaining <= 0) void finish(false, 0);
    }, 100);
    return () => clearInterval(timer);
  }, [phase, finish]);

  function start() {
    if (!data) return;
    finished.current = false;
    deadline.current = Date.now() + data.seconds * 1000;
    setLeft(data.seconds);
    setIndex(0);
    setTally({ correct: 0, total: 0 });
    setIsRecord(false);
    pending.current = [];
    startedAt.current = Date.now();
    roundStart.current = Date.now();
    sfx("start"); // turun açılışı — web `boss-player` aynı yerde çalıyor
    track("boss_play", moduleIndex);
    setPhase("playing");
  }

  function onDone(ok: boolean, extra?: DoneExtra) {
    if (finished.current || !data) return;
    const r = data.rounds[index];
    const results = extra?.batch?.length
      ? extra.batch.map((b) => ({ wordId: b.wordId, correct: b.correct }))
      : [{ wordId: r?.word?.id ?? r?.words?.[0]?.id ?? 0, correct: ok }];
    const lat = Math.max(0, Date.now() - roundStart.current);
    for (const x of results) {
      if (!x.wordId || !r) continue;
      pending.current.push({
        wordId: x.wordId,
        game: r.game,
        correct: x.correct,
        latencyMs: lat,
        ...(x.correct ? {} : extra?.errorType ? { errorType: extra.errorType } : {}),
      });
    }

    // Süre: doğru başına bonus, yanlış başına ceza; tavan sunucudan.
    let delta = 0;
    for (const x of results) delta += x.correct ? data.bonus : -data.penalty;
    deadline.current = Math.min(Date.now() + data.maxSeconds * 1000, deadline.current + delta * 1000);

    setTally((v) => ({
      correct: v.correct + results.filter((x) => x.correct).length,
      total: v.total + results.length,
    }));

    if (index >= data.rounds.length - 1) void finish(true, Math.max(0, (deadline.current - Date.now()) / 1000));
    else { roundStart.current = Date.now(); setIndex((i) => i + 1); }
  }

  const pad = { flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg } as const;
  const exit = () => nav.goBack();

  if (phase === "loading") {
    /* BEKLEME KENDINI DUYURUYOR. Bu dal ekranin TAMAMINI kaplayip
       "hazirlaniyor" yaziyor ama canli bolge degildi: TalkBack kullanan biri
       dugmeye basip hicbir sey duymuyordu. Webde karsiligi
       `role="status" aria-busy`. */
    return <View accessibilityLiveRegion="polite" accessibilityRole="progressbar" accessibilityState={{ busy: true }} style={[pad, { alignItems: "center", justifyContent: "center" }]}><Text variant="body" color={colors.textMuted}>{t("exam.preparing")}</Text></View>;
  }

  if (phase === "error") {
    return (
      <View accessibilityLiveRegion="assertive" style={[pad, { alignItems: "center", justifyContent: "center", gap: spacing.md }]}>
        <Text accessibilityRole="header" variant="h2" style={{ textAlign: "center" }}>{t(data ? "boss.not_ready" : "exam.could_not_load")}</Text>
        {data ? <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("boss.not_ready_sub")}</Text> : null}
        {/* "Tekrar dene" YALNIZ gerçek yükleme hatasında: "henüz hazır değil"
            dalında yeniden denemek aynı cevabı getirir (dersler bitmemiş). */}
        {data ? null : (
          <PressableScale onPress={() => void load()} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color={colors.onPrimary}>{t("common.try_again")}</Text>
          </PressableScale>
        )}
        <PressableScale onPress={exit} style={{ paddingHorizontal: 18, paddingVertical: spacing.md, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border }}>
          <Text variant="bodyStrong" color={colors.text}>{t("common.go_back")}</Text>
        </PressableScale>
      </View>
    );
  }

  if (phase === "ready" && data) {
    const ready = data.meta.lessonsDone >= data.meta.lessonsTotal;
    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.lg, paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xxl }}>
        <Card padded>
          <View style={[{ width: 56, height: 56, borderRadius: radii.lg, alignSelf: "center", alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 10)]}>
            <TrophyIcon color={colors.onFill} size={26} />
          </View>
          <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md, textTransform: "uppercase", letterSpacing: 1 }}>
            {t("bossw.level_module", { level: data.meta.level, n: data.meta.moduleIndex + 1 })}
          </Text>
          <Text accessibilityRole="header" variant="h2" style={{ textAlign: "center", marginTop: spacing.xs }}>{t("bossw.title_exam", { title: data.meta.title })}</Text>
          <View style={{ marginTop: spacing.lg, gap: 6 }}>
            <Text variant="body">{`· ${t("bossw.rule_start", { n: data.rounds.length, sec: data.seconds })}`}</Text>
            <Text variant="body">{`· ${t("bossw.rule_time", { bonus: data.bonus, penalty: data.penalty })}`}</Text>
            <Text variant="body">{`· ${t("bossw.rule_crown")}`}</Text>
            <Text variant="body" color={colors.textMuted}>{`· ${t("bossw.rule_pool", { n: data.pool })}`}</Text>
          </View>
          {!ready ? (
            <View style={{ marginTop: spacing.lg, borderRadius: radii.lg, backgroundColor: soft(colors.streak), paddingHorizontal: spacing.md, paddingVertical: 10 }}>
              <Text variant="caption" color={colors.streakText}>{t("bossw.not_ready_yet", { done: data.meta.lessonsDone, total: data.meta.lessonsTotal })}</Text>
            </View>
          ) : null}
          {best !== null ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md, textAlign: "center" }}>{t("bossw.best_left", { n: best })}</Text> : null}
          <PressableScale onPress={start} style={[{ marginTop: spacing.lg, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 8)]}>
            <Text variant="h3" color={colors.onPrimary}>{t(best !== null ? "boss.beat_record" : "boss.enter")}</Text>
          </PressableScale>
          <PressableScale onPress={exit} style={{ marginTop: spacing.sm, paddingVertical: spacing.md, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{t("bossw.back_to_path")}</Text>
          </PressableScale>
        </Card>
      </ScrollView>
    );
  }

  if ((phase === "won" || phase === "lost") && data) {
    const won = phase === "won";
    const secondsLeft = Math.round(left);
    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.lg, paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xxl }}>
        <Celebrate show={won} />
        <Card padded>
          {/* Kaybedince saat ikonu gösterilir; mobil ikon kümesinde saat yok,
              web `ClockIcon` yerine tekrar ikonu: "süre bitti, yeniden dene"
              aynı şeyi söylüyor. */}
          <View style={{ width: 56, height: 56, borderRadius: radii.lg, alignSelf: "center", alignItems: "center", justifyContent: "center", backgroundColor: won ? colors.success : colors.surface2 }}>
            {won ? <TrophyIcon color={colors.onFill} size={26} /> : <RepeatIcon color={colors.textMuted} size={26} />}
          </View>
          {/* TURUN SONUCU DUYURULUYOR - web `boss-player` ile ayni yer. */}
          <Text accessibilityRole="header" accessibilityLiveRegion="polite" variant="h1" style={{ textAlign: "center", marginTop: spacing.md }}>{t(won ? "boss.passed" : "boss.time_up")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.xs }}>
            {won
              ? t("bossw.won_sub", { sec: secondsLeft, correct: tally.correct, total: tally.total })
              : t("bossw.lost_sub", { correct: tally.correct, total: tally.total })}
          </Text>
          {won && isRecord ? (
            <Text variant="bodyStrong" color={colors.successText} style={{ textAlign: "center", marginTop: spacing.xs }}>
              {`${t("bossw.record_prefix")} ${secondsLeft} ${t("bossw.record_suffix")}`}
            </Text>
          ) : null}
          {!won ? <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md }}>{t("bossw.still_counted")}</Text> : null}
          <PressableScale onPress={start} style={[{ marginTop: spacing.lg, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 8)]}>
            <Text variant="h3" color={colors.onPrimary}>{t(won ? "bossw.play_again" : "common.try_again")}</Text>
          </PressableScale>
          <PressableScale onPress={exit} style={{ marginTop: spacing.sm, paddingVertical: spacing.md, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{t("bossw.back_to_path")}</Text>
          </PressableScale>
        </Card>
      </ScrollView>
    );
  }

  // playing
  const round = data!.rounds[index];
  const urgent = left <= DANGER_SECONDS;
  const pct = Math.min(100, (left / data!.maxSeconds) * 100);
  return (
    <View style={pad}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={exit} accessibilityLabel={t("common.go_back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
        <Text variant="bodyStrong" color={colors.textMuted}>{`${index + 1} / ${data!.rounds.length}`}</Text>
        <View style={{ flex: 1 }} />
        <Text variant="bodyStrong" color={urgent ? colors.dangerText : colors.text}>{t("challenge.seconds", { n: formatDecimal(left) })}</Text>
      </View>
      <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden", marginBottom: spacing.lg }}>
        <View style={{ height: "100%", width: `${pct}%`, backgroundColor: urgent ? colors.danger : colors.primary, borderRadius: 3 }} />
      </View>
      <RoundView key={round?.id ?? index} round={round} onDone={onDone} />
    </View>
  );
}
