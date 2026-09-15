import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t, formatDecimal } from "../lib/i18n";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { TrophyIcon, RepeatIcon, XIcon, ClockIcon, BoltIcon, CrownIcon, BookIcon, AlertIcon } from "../ui/icons";
import { FlowScreen, FlowActions, FlowNote, ResultHero, StatRow, CoverBody, StateBody } from "../ui/flow";
import { RoundView } from "../game/rounds";
import { submitAnswers, todayStr, type AnswerOut, type DoneExtra, type Round } from "../game/session";
import { api } from "../api/client";
import { track } from "../lib/track";
import { sfx } from "../lib/sfx";
import { bumpStats } from "../lib/statsSignal";
import { useTheme, spacing, radii } from "../theme";

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
      <FlowScreen
        center
        actions={
          <FlowActions
            /* "Tekrar dene" YALNIZ gerçek yükleme hatasında: "henüz hazır değil"
               dalında yeniden denemek aynı cevabı getirir (dersler bitmemiş);
               orada tek çıkış çerçeveli "Geri dön". */
            primary={data ? null : ({ label: t("common.try_again"), onPress: () => void load() })}
            secondary={data ? { label: t("common.go_back"), onPress: exit } : null}
            tertiary={data ? null : { label: t("common.go_back"), onPress: exit }}
          />
        }
      >
        {/* Hazır değil = bekleyiş (think), yüklenemedi = hata (sad). */}
        <StateBody alert mood={data ? "think" : "sad"} title={t(data ? "boss.not_ready" : "exam.could_not_load")} body={data ? t("boss.not_ready_sub") : null} />
      </FlowScreen>
    );
  }

  if (phase === "ready" && data) {
    const ready = data.meta.lessonsDone >= data.meta.lessonsTotal;
    /* KAPAK ŞABLONU (ui/flow). Kurallar eskiden "·" ile başlayan dört metin
       satırıydı; artık her biri ikonlu tek satır. "Henüz hazır değilsin"
       uyarısı kapağın içinde uyarı notu. Web `boss-player` aynı sırada. */
    return (
      <FlowScreen actions={<FlowActions primary={{ label: t(best !== null ? "boss.beat_record" : "boss.enter"), onPress: start }} tertiary={{ label: t("bossw.back_to_path"), onPress: exit }} />}>
        <CoverBody
          icon={TrophyIcon}
          tint={colors.primary}
          eyebrow={t("bossw.level_module", { level: data.meta.level, n: data.meta.moduleIndex + 1 })}
          title={t("bossw.title_exam", { title: data.meta.title })}
          rules={[
            { icon: ClockIcon, text: t("bossw.rule_start", { n: data.rounds.length, sec: data.seconds }) },
            { icon: BoltIcon, text: t("bossw.rule_time", { bonus: data.bonus, penalty: data.penalty }) },
            { icon: CrownIcon, text: t("bossw.rule_crown") },
            { icon: BookIcon, text: t("bossw.rule_pool", { n: data.pool }) },
          ]}
          note={best !== null ? t("bossw.best_left", { n: best }) : null}
        >
          {!ready ? <FlowNote tone="warn" icon={<AlertIcon color={colors.streakText} size={16} />} text={t("bossw.not_ready_yet", { done: data.meta.lessonsDone, total: data.meta.lessonsTotal })} /> : null}
        </CoverBody>
      </FlowScreen>
    );
  }

  if ((phase === "won" || phase === "lost") && data) {
    const won = phase === "won";
    const secondsLeft = Math.round(left);
    /*
      SONUÇ ŞABLONU (ui/flow). Kazanınca kupa ikonu yerine kutlayan maskot,
      ana sayı kalan süre; kaybedince band `quiet`, "Geçilmedi" etiketi ve
      üzgün maskot. Konfeti yalnız kazanınca.
    */
    return (
      <FlowScreen
        celebrate={won}
        actions={<FlowActions primary={{ label: t("bossw.play_again"), onPress: start }} tertiary={{ label: t("bossw.back_to_path"), onPress: exit }} />}
      >
        <ResultHero
          eyebrow={t("bossw.level_module", { level: data.meta.level, n: data.meta.moduleIndex + 1 })}
          title={t(won ? "boss.passed" : "boss.time_up")}
          figure={won ? t("challenge.seconds", { n: secondsLeft }) : null}
          sub={won
            ? t("bossw.won_sub", { sec: secondsLeft, correct: tally.correct, total: tally.total })
            : t("bossw.lost_sub", { correct: tally.correct, total: tally.total })}
          pill={won
            ? (isRecord ? { text: `${t("bossw.record_prefix")} ${secondsLeft} ${t("bossw.record_suffix")}` } : null)
            : { text: t("boss.not_passed"), tone: "bad" }}
          quiet={!won}
          mood={won ? "celebrate" : "sad"}
        />
        <StatRow items={[
          { value: `${tally.correct}/${tally.total}`, label: t("common.correct"), tone: "ok" },
          { value: String(Math.max(0, tally.total - tally.correct)), label: t("common.wrong"), tone: tally.total > tally.correct ? "bad" : null },
          { value: best !== null ? t("challenge.seconds", { n: best }) : "—", label: t("bossw.stat_best") },
        ]} />
        {!won ? <FlowNote icon={<RepeatIcon color={colors.textMuted} size={16} />} text={t("bossw.still_counted")} /> : null}
      </FlowScreen>
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
