import React, { useEffect, useRef, useState } from "react";
import { kindIcon, kindTint } from "../ui/unitKind";
import { MascotFx } from "../ui/MascotFx";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { Mascot } from "../ui/Mascot";
import { Celebrate } from "../ui/Celebrate";
import { XIcon, SpeakerIcon } from "../ui/icons";
import { KIND_KEY, type ItemKind } from "../data/unit";
import { getExercise, type ListeningSegment } from "../data/skills";
import { QuestionList, GlossPanel, WritingList, type WritingTask } from "../game/skillQuiz";
import { GrammarBody, SpeakingDrill, MonologueBody, type SpeakingTask } from "../game/skillLibrary";
import { markItemDone, recordItemScore, queueItemRecord } from "../game/lessonProgress";
import { isSkillDone, scoreBand, scoreOf } from "../lib/learningRules";
import { speakTarget, speakAndWait, stopSpeaking } from "../lib/tts";
import { currentTargetLocale } from "../lib/courses";
import { API_BASE, fetchWithTimeout } from "../api/client";
import { bumpStats } from "../lib/statsSignal";
import { AiNotice } from "../ui/AiNotice";
import { todayStr } from "../game/session";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";
import { sfx } from "../lib/sfx";



/** Okuma metni — paragraflar \n\n ile ayrılır (web reading-player gibi). */
function ReadingText({ text, colors }: { text: string; colors: Palette }) {
  return (
    <Card style={{ marginTop: spacing.md }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: spacing.xs }}>
        <PressableScale onPress={() => speakTarget(text)} hitSlop={8} accessibilityLabel={t("item.read_text_aloud")}
          style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 6 }}>
          <SpeakerIcon color={colors.primaryText} size={18} />
          <Text variant="caption" color={colors.primaryText}>{t("item.read_aloud")}</Text>
        </PressableScale>
      </View>
      {text.split("\n\n").map((p, i) => (
        <Text key={i} variant="body" style={{ lineHeight: 25, marginTop: i > 0 ? spacing.md : 0 }}>{p}</Text>
      ))}
    </Card>
  );
}

/** Dinleme — cihaz TTS'i (audio dosyaları /public'te, çevrimdışı yok); metin gizli başlar. */
/**
 * DİNLEME OYNATICISI — web `skills/listening-player` karşılığı.
 *
 * Kart metnin TAMAMINI tek seferde okuyordu: hangi replikte olunduğu
 * görünmüyor, yavaşlatma yolu yok ve "önce yalnızca dinleyerek dene" uyarısı
 * hiç yazılmıyordu (metni açan düğme hemen yanındaydı). Web bölüm bölüm
 * çalıyor, çalan repliği işaretliyor, yavaş modu ayrı bir düğmede tutuyor.
 *
 * Gerçek lehçe kaydı yolu (`segment.audio`) iki tarafta da UYKUDA: bugün
 * içerikte tek bir `audio` alanı yok (ölçüldü: 2265 replik, sıfır kayıt).
 */
function ListeningBody({ segments, colors }: { segments: ListeningSegment[]; colors: Palette }) {
  const [reveal, setReveal] = useState(false);
  const [slow, setSlow] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [segIdx, setSegIdx] = useState(-1);
  const [playCount, setPlayCount] = useState(0);
  const run = useRef(0);

  useEffect(() => () => { run.current += 1; stopSpeaking(); }, []);

  async function play() {
    const my = ++run.current;
    setPlaying(true);
    for (let i = 0; i < segments.length; i++) {
      if (my !== run.current) return;
      setSegIdx(i);
      await speakAndWait(segments[i].text, currentTargetLocale(), { slow });
    }
    if (my !== run.current) return;
    setPlaying(false);
    setSegIdx(-1);
    setPlayCount((c) => c + 1);
  }

  function stop() {
    run.current += 1;
    stopSpeaking();
    setPlaying(false);
    setSegIdx(-1);
  }

  /** Transkript satırına dokununca yalnızca o bölümü tekrar dinlet. */
  function playSegment(i: number) {
    run.current += 1;
    stopSpeaking();
    setSegIdx(-1);
    setPlaying(false);
    speakTarget(segments[i].text, { slow });
  }

  return (
    <>
      <Card style={{ alignItems: "center", marginTop: spacing.md, paddingVertical: spacing.xl }}>
        <PressableScale accessibilityLabel={t("item.listen")} onPress={() => (playing ? stop() : void play())} style={[{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.accent, alignItems: "center", justifyContent: "center" }, softShadow(colors.accent, 12)]}>
          <SpeakerIcon color={colors.onFill} size={34} />
        </PressableScale>
        <Text variant="bodyStrong" style={{ marginTop: spacing.md }}>
          {playing ? t("listenp.playing", { n: segIdx + 1, total: segments.length }) : t(playCount > 0 ? "listenp.done" : "listenp.start")}
        </Text>
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2, textAlign: "center" }}>{t("listenp.replay_note")}</Text>
        <PressableScale onPress={() => setSlow((v) => !v)} accessibilityState={{ selected: slow }}
          style={{ marginTop: spacing.md, borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 7, backgroundColor: slow ? colors.primarySoft : colors.surface2 }}>
          <Text variant="caption" color={slow ? colors.onPrimarySoft : colors.textMuted}>{t("listenp.slow")}</Text>
        </PressableScale>
      </Card>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.md, flexWrap: "wrap" }}>
        <PressableScale onPress={() => setReveal((v) => !v)}>
          <Text variant="bodyStrong" color={colors.primaryText}>{t(reveal ? "item.hide_text" : "item.show_text")}</Text>
        </PressableScale>
        {!reveal ? <Text variant="caption" color={colors.textMuted}>{t("listenp.hint_listen_first")}</Text> : null}
      </View>
      {reveal ? (
        <Card style={{ marginTop: spacing.sm }}>
          <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{t("listenp.tap_line")}</Text>
          {segments.map((s, i) => (
            <PressableScale key={i} onPress={() => playSegment(i)} accessibilityLabel={t("item.listen")}
              style={{ marginTop: i > 0 ? spacing.md : 0, flexDirection: "row", alignItems: "flex-start", gap: spacing.sm, borderRadius: radii.md, backgroundColor: segIdx === i ? colors.primarySoft : "transparent", padding: segIdx === i ? spacing.sm : 0 }}>
              <SpeakerIcon color={colors.textMuted} size={16} />
              <View style={{ flex: 1 }}>
                {s.speaker ? <Text variant="micro" color={colors.textMuted}>{s.speaker}</Text> : null}
                <Text variant="body" style={{ lineHeight: 24 }}>{s.text}</Text>
              </View>
            </PressableScale>
          ))}
        </Card>
      ) : null}
    </>
  );
}

export function ItemScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { params } = useRoute<RouteProp<RootStackParams, "Item">>();
  const exercise = getExercise(params.id);
  const startedAt = useRef(Date.now());
  const saved = useRef(false);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  /*
   * SUNUCU YANITI OKUNMUYORDU.
   *
   * `/api/skills` POST dokuz alan döndürüyor (`xpGained`, `totalXp`,
   * `currentStreak`, `longestStreak`, `streakRepaired`, `bestCorrect`,
   * `total`, `lastScore`, `repeat`) ve mobil yanıtı TAMAMEN atıyordu: istek
   * gönderiliyor, gövde hiç okunmuyordu. Yani alıştırmayı bitiren kullanıcı
   * kazandığı XP'yi görmüyordu - oysa tur sonunda (`GameScreen`) aynı bilgi
   * gösteriliyor ve web burada da gösteriyor (`player-shell` beş alan okuyor).
   */
  const [earnedXp, setEarnedXp] = useState(0);
  /*
   * SIFIR XP'NİN SEBEBİ SÖYLENİYOR. Aynı egzersizi tekrar bitiren kullanıcı
   * yalnız "0 XP" (yani hiçbir şey) görüyordu; sebep sunucunun yanıtında
   * yazılıydı (`repeat`) ve okunmuyordu. Web `player-shell` bunu bir satırla
   * söylüyor. Sessiz sıfır, kapalı düğmenin sebepsizliğiyle aynı sınıf.
   */
  const [repeatNoXp, setRepeatNoXp] = useState(false);
  /* SONUÇ KUYRUĞA ALINDIYSA SÖYLENİYOR. Kuyruk baştan beri vardı ama ekran
     bunu hiç yazmıyordu: kullanıcı XP satırı olmayan bir kart görüyor ve
     sonucunun kaydedilip kaydedilmediğini bilemiyordu. Web aynı yerde tek
     satır gösteriyor (`skills/player-shell` `offline` fazı). */
  const [queued, setQueued] = useState(false);
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(0);

  const kind = params.kind as ItemKind;
  const tint = colors[kindTint(kind)] as string;
  const Icon = kindIcon(kind);

  /** `score`: monologda rubrik puanı (0–100); verilmezse sunucu doğru/toplam oranını yazar. */
  async function recordAndFinish(c: number, score?: number) {
    setCorrect(c);
    setFinished(true);
    setTimeout(() => sfx("finish"), 600); // son cevabın sesinden sonra tamamlanma sesi
    if (!exercise || saved.current) return;
    saved.current = true;
    /* "BITTI" PUANA BAGLI. Once egzersiz biter bitmez isaretleniyordu: sifir
       dogru yapan da yesil onay aliyordu. Esigin sahibi sunucu
       (`SKILL_DONE_PCT`, web `lib/score-bands.ts`); burada ayni formulle
       yerelden hesaplaniyor ki liste aninda dogru cizilsin, sunucu yaniti
       gelince `lastScore` ile bir daha uzlastiriliyor. */
    if (isSkillDone(scoreOf(c, total, score))) void markItemDone(exercise.id);
    try {
      const res = await fetchWithTimeout(`${API_BASE}/api/skills`, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: exercise.id, correct: c, score, day: todayStr(), seconds: Math.round((Date.now() - startedAt.current) / 1000) }),
      });
      if (res.ok) {
        const d = (await res.json()) as { xpGained?: number; repeat?: boolean; currentStreak?: number; lastScore?: number };
        if (typeof d.xpGained === "number") setEarnedXp(d.xpGained);
        setRepeatNoXp(d.repeat === true && d.xpGained === 0);
        if (typeof d.currentStreak === "number") setStreak(d.currentStreak);
        /* Puan yerele de yazılıyor: Beceriler listesi rozeti bundan çiziyor
           ve sunucu durumu bir sonraki açılışta zaten üzerine gelecek. */
        if (typeof d.lastScore === "number") {
          void recordItemScore(exercise.id, d.lastScore);
          /* Sunucunun puani yerel hesaptan farkli olabiliyor (rubrik yeniden
             puanliyor): kararin son sozu onda. */
          if (isSkillDone(d.lastScore)) void markItemDone(exercise.id);
        }
        bumpStats(); // XP/seri değişti
      }
    } catch {
      /* ÇEVRİMDIŞI: sonuç kuyruğa alınıyor ve bir sonraki bağlantıda
         taşınıyor. Eskiden yalnız yerel işaret kalıyordu ve sunucu bu
         egzersizi HİÇ öğrenmiyordu - cihaz değişince gidiyordu. */
      void queueItemRecord(exercise.id, c, total);
      setQueued(true);
    }
  }

  function retry() {
    /* Yeniden denemede eski XP satırı kalmasın: yeni sonuç yeni cevabı bekler. */
    setEarnedXp(0);
    setRepeatNoXp(false);
    setQueued(false);
    saved.current = false;
    setFinished(false);
    setCorrect(0);
    setRound((r) => r + 1);
  }

  if (!exercise) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.lg, padding: spacing.xl }}>
        <Mascot mood="sad" size={90} />
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("item.this_exercise_can_t_be_opened")}</Text>
        <PressableScale onPress={() => nav.goBack()}><Text variant="bodyStrong" color={colors.primaryText}>{t("item.go_back")}</Text></PressableScale>
      </View>
    );
  }

  // Konuşma iki biçim: söyleyiş drilli (`tasks`, her biri bir cümle) ya da
  // monolog (`monologue`, tek görev). Dil bilgisi okuma gibi soru sayar.
  const drillTasks = exercise.skill === "speaking" && !exercise.monologue ? ((exercise.tasks ?? []) as SpeakingTask[]) : null;
  const total =
    exercise.skill === "writing"
      ? (exercise.tasks?.length ?? 0)
      : exercise.skill === "speaking"
        ? (drillTasks ? drillTasks.length : 1)
        : (exercise.questions?.length ?? 0);
  const pct = scoreOf(correct, total);
  /* Maskotun ruh hâli ve konfeti PUAN BANDINDAN: eşikler (70 / 40) burada
     elle yazılıydı, oysa aynı iki sayı uygulamanın her yerinde aynı ayrımı
     yapıyor (web `lib/score-bands.ts`). */
  const band = scoreBand(pct);
  const fromSkills = params.from === "skills";

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, flex: 1 }}>
          {Icon && <View style={{ width: 34, height: 34, borderRadius: radii.sm, backgroundColor: tint, alignItems: "center", justifyContent: "center" }}>{Icon({ color: "#fff", size: 18 })}</View>}
          <View style={{ flex: 1 }}>
            <Text variant="micro" color={colors.textMuted}>{t(KIND_KEY[kind as keyof typeof KIND_KEY] ?? "") || t("item.content")} · {t(`genre.${exercise.genre}`)}</Text>
            <Text accessibilityRole="header" variant="h3" numberOfLines={1}>{exercise.title}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text variant="body" color={colors.textMuted} style={{ lineHeight: 22 }}>{exercise.intro}</Text>

        {exercise.skill === "reading" && exercise.text ? <ReadingText text={exercise.text} colors={colors} /> : null}
        {exercise.skill === "listening" && exercise.segments ? <ListeningBody segments={exercise.segments} colors={colors} /> : null}
        {exercise.skill === "grammar" && exercise.explanation ? (
          <GrammarBody focus={exercise.focus ?? ""} blocks={exercise.explanation} colors={colors} />
        ) : null}

        <GlossPanel gloss={exercise.gloss} colors={colors} />

        {exercise.skill === "writing" ? (
          // Yazma görevleri sunucuda dil modeliyle puanlanıyor; kimin
          // değerlendirdiği yazmaya başlamadan önce söyleniyor.
          <>
            <AiNotice variant="output" style={{ marginBottom: spacing.md }} />
            <WritingList key={round} tasks={(exercise.tasks ?? []) as WritingTask[]} level={exercise.level} exerciseId={exercise.id} onAllDone={recordAndFinish} colors={colors} />
          </>
        ) : exercise.skill === "speaking" && exercise.monologue ? (
          // Monolog: metin sunucuda rubrikle puanlanıyor (ses gitmiyor).
          <>
            <AiNotice variant="output" style={{ marginBottom: spacing.md }} />
            <MonologueBody key={round} mono={exercise.monologue} level={exercise.level} exerciseId={exercise.id}
              onDone={(ok, score) => recordAndFinish(ok ? 1 : 0, score)} colors={colors} />
          </>
        ) : drillTasks ? (
          <SpeakingDrill key={round} tasks={drillTasks} onAllDone={recordAndFinish} colors={colors} />
        ) : (
          <QuestionList key={round} questions={exercise.questions ?? []} onAllAnswered={recordAndFinish} colors={colors} />
        )}

        {finished ? (
          <Card padded style={{ marginTop: spacing.lg, alignItems: "center", gap: spacing.sm }}>
            <Celebrate show={band === "good"} />
            <Mascot mood={band === "good" ? "celebrate" : band === "mid" ? "happy" : "idle"} size={84} />
            {/* TURUN SONUCU DUYURULUYOR - web `skills/player-shell` ile ayni
                yer. Canli bolge metinde, uygulamanin kendi kalibi. */}
            <Text accessibilityRole="header" accessibilityLiveRegion="polite" variant="h2">
              {exercise.skill === "writing" || exercise.monologue
                ? t("item.tasks_done")
                /* Hepsi doğruysa sayı yerine tek cümle - web de öyle söylüyor. */
                : total > 0 && correct === total
                  ? t("skillp.perfect")
                  : t("common.n_correct", { correct: correct, total: total })}
            </Text>
            {/* Kazanılan XP — `GameScreen` ile aynı biçim (`+N XP`). */}
            {earnedXp > 0 ? (
              <View style={{ alignItems: "center", gap: 2 }}>
                <Text variant="h2" color={colors.primaryText}>{`+${earnedXp} XP`}</Text>
                {streak > 0 ? <Text variant="caption" color={colors.streakText}>{t("social.days_streak", { n: streak })}</Text> : null}
              </View>
            ) : null}
            {queued ? (
              <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 20 }}>{t("skillp.saved_offline")}</Text>
            ) : null}
            {repeatNoXp ? (
              <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>{t("item.repeat_note")}</Text>
            ) : null}
            {exercise.skill !== "writing" && !exercise.monologue ? <Text variant="caption" color={colors.textMuted}>{t("item.score_pct", { pct })}</Text> : null}
            <View style={{ flexDirection: "row", gap: spacing.sm, alignSelf: "stretch", marginTop: spacing.sm }}>
              <PressableScale onPress={retry} style={{ flex: 1, backgroundColor: colors.surface2, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
                <Text variant="bodyStrong" color={colors.text}>{t("item.try_again")}</Text>
              </PressableScale>
              <PressableScale onPress={() => nav.goBack()} style={[{ flex: 1, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }, softShadow(colors.primary, 10)]}>
                <Text variant="bodyStrong" color={colors.onPrimary}>{t(fromSkills ? "item.back_to_skills" : "item.back_to_path")}</Text>
              </PressableScale>
            </View>
          </Card>
        ) : null}
      </ScrollView>
      {/* Ortam sürprizleri: web beceri oynatıcısında da çiziyor
          (`skills/player-shell` `<MascotFx />`), mobilde yalnız kelime
          turlarında vardı — aynı sürpriz iki yüzeyden birinde yoktu. */}
      <MascotFx />
    </View>
  );
}
