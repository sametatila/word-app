import React, { useEffect, useMemo, useRef, useState } from "react";
import { kindIcon, kindFill } from "../ui/unitKind";
import { t, formatPercent } from "../lib/i18n";
import { View } from "react-native";
import { KeyboardAwareScroll } from "../ui/KeyboardAwareScroll";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { Celebrate } from "../ui/Celebrate";
import { XIcon, SpeakerIcon, AlertIcon, LockIcon } from "../ui/icons";
import { ListenButton } from "../ui/ListenButton";
import { useAuth } from "../lib/AuthContext";
import { usePremiumStatus } from "../lib/premium";
import { FlowScreen, FlowActions, FlowNote, ContentLoadingBody, ResultHero, StatRow, StateBody } from "../ui/flow";
import { KIND_KEY, type ItemKind } from "../data/unit";
import { ensureSkills, getExercise, skillLevelOf, type ListeningSegment } from "../data/skills";
import { QuestionList, GlossPanel, WritingList, type WritingTask } from "../game/skillQuiz";
import { GrammarBody, SpeakingDrill, MonologueBody, type SpeakingTask } from "../game/skillLibrary";
import { markItemDone, recordItemScore, queueItemRecord } from "../game/lessonProgress";
import { isSkillDone, scoreBand, scoreOf, RUBRIC_PASS_PCT, SKILL_DONE_PCT } from "../lib/learningRules";
import { speakTarget, speakAndWaitVoiced, prefetchDialogue, speakPassage, stopSpeaking } from "../lib/tts";
import { dialogueCast } from "../lib/speakers";
import { currentCourseId } from "../lib/courses";
import { API_BASE, fetchWithTimeout } from "../api/client";
import { bumpStats } from "../lib/statsSignal";
import { AiNotice } from "../ui/AiNotice";
import { todayStr } from "../game/session";
import type { RootStackParams } from "../navigation/RootStack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { pathWritingSpent, tieredCopy } from "../lib/unlock";
import { UnlockProgress } from "../ui/UnlockProgress";
import { useTheme, spacing, radii, type Palette } from "../theme";
import { sfx } from "../lib/sfx";

/** Sonuç bandının başlığındaki beceri adı — Beceriler sekmesiyle aynı anahtarlar. */
const SKILL_KEY: Record<string, string> = { reading: "skills.reading", listening: "skills.listening", writing: "skills.writing", speaking: "skills.speaking", grammar: "skills.grammar" };

/** Okuma metni — paragraflar \n\n ile ayrılır (web reading-player gibi). */
function ReadingText({ text, course, colors }: { text: string; course: string; colors: Palette }) {
  /*
    "SESLİ OKU" UZUN PARÇALARDA HİÇ ÇALIŞMIYORDU.

    Bütün parça tek istekte gidiyordu ve uç 600 karakterin üstünü 400
    `bad_text` ile reddediyor: 120 okuma alıştırmasının 85'i (en uzunu 2245
    karakter) sessizdi. Zararı da bununla kalmıyordu — köprü iki hatadan sonra
    "sağlıksız" sayılıp OTURUMUN GERİ KALANINI cihaz sesine düşürüyordu, yani
    bir uzun metin bütün uygulamanın sesini bozuyordu.

    Bölme artık ortak yolda. `speakPassage` ayrıca paragrafı parça sınırı
    sayıyor, dinleme hızını kullanıyor ve sesi metnin dilinden sabit seçiyor —
    üçü de web `reading-player` ile birebir, yoksa aynı parça iki platformda
    hiç kesişmeyen iki önbellek kümesi üretirdi.
  */
  return (
    <Card style={{ marginTop: spacing.md }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: spacing.xs }}>
        <PressableScale onPress={() => void speakPassage(text, course)} hitSlop={8} accessibilityLabel={t("item.read_text_aloud")}
          style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: 6 }}>
          <SpeakerIcon color={colors.primaryText} size={18} />
          <Text variant="caption" color={colors.primaryText}>{t("item.read_aloud")}</Text>
        </PressableScale>
      </View>
      {text.split("\n\n").map((p, i) => (
        <Text key={i} variant="body" style={{ marginTop: i > 0 ? spacing.md : 0 }}>{p}</Text>
      ))}
    </Card>
  );
}

/**
 * Aç/kapa çipi — dinleme kartındaki "Yavaş" ve "Metni göster".
 *
 * `ui/Chip` DEĞİL: o tek seçimlik grubun radyosu (bkz. `Chip` `role`). Bu iki
 * çip birbirinden bağımsız anahtarlar; web karşılığı `aria-pressed`.
 */
function ToggleChip({ label, on, onPress, colors }: { label: string; on: boolean; onPress: () => void; colors: Palette }) {
  return (
    <PressableScale onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: on }}
      style={{ borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: on ? colors.primarySoft : colors.surface2 }}>
      <Text variant="caption" color={on ? colors.onPrimarySoft : colors.textMuted}>{label}</Text>
    </PressableScale>
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
  /** Bu koşuda ses gerçekten başladı mı — başlamadıysa düğme "yükleniyor". */
  const [started, setStarted] = useState(false);
  const [segIdx, setSegIdx] = useState(-1);
  const [playCount, setPlayCount] = useState(0);
  const run = useRef(0);

  useEffect(() => () => { run.current += 1; stopSpeaking(); }, []);

  /*
    KONUŞMACI BAŞINA AYRI SES + ÖN İNDİRME.

    Bütün replikler kullanıcının TEK sesiyle okunuyordu; konuşmacı etiketi
    transkriptte yazıyor ama kulakla ayrım yoktu — oysa dinleme alıştırmasının
    ölçtüğü asıl iş bu. Kadro `dialogueCast`ten geliyor.

    Ön indirme ekran açılır açılmaz: replikler tek tek çalınıyor (hangi
    satırın okunduğu vurgulanıyor) ve her sınırda tam bir gidiş-dönüş vardı.
  */
  const cast = useMemo(() => dialogueCast(currentCourseId(), segments), [segments]);
  useEffect(() => { prefetchDialogue(currentCourseId(), segments, slow); }, [segments, slow]);

  async function play() {
    const my = ++run.current;
    setStarted(false);
    setPlaying(true);
    for (let i = 0; i < segments.length; i++) {
      if (my !== run.current) return;
      setSegIdx(i);
      /* Kadro sesi, dinlemeye ayrılmış hızla. Eskiden `speakAndWait` idi:
         köprüyü hiç denemiyor, doğrudan cihazın kendi sesine gidiyordu
         (iOS'ta seçilen sesi de boş kimlikle eziyordu) ve Android'de hız
         parametresi okunmadığı için "Yavaş" hiçbir şey değiştirmiyordu. */
      await speakAndWaitVoiced(segments[i].text, cast[i].voice, { slow: slow ? "listenSlow" : "listen", pitch: cast[i].pitch, onStart: () => { if (my === run.current) setStarted(true); } });
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
    speakTarget(segments[i].text, { slow: slow ? "listenSlow" : "listen", voice: cast[i].voice, pitch: cast[i].pitch });
  }

  return (
    <>
      {/* KART DÜZENİ — web `skills/listening-player` ile aynı: solda durumlu
          düğme, sağda durum + not + bölüm çubukları, altta iki çip (yavaş,
          metni göster). Önceden düğme kartın ortasında tek başına duruyor,
          yavaş çipi altında asılı kalıyor ve "metni göster" kartın DIŞINDA
          bir bağlantıydı; hangi replikte olunduğu da yalnız sayıyla
          söyleniyordu. */}
      <Card style={{ marginTop: spacing.md }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.lg }}>
          <ListenButton
            state={playing ? (started ? "playing" : "loading") : playCount > 0 ? "done" : "idle"}
            onPress={() => (playing ? stop() : void play())}
            label={t(playing ? "item.stop" : "item.listen")}
          />
          <View style={{ flex: 1 }}>
            <Text variant="bodyStrong">
              {playing ? t("listenp.playing", { n: segIdx + 1, total: segments.length }) : t(playCount > 0 ? "listenp.done" : "listenp.start")}
            </Text>
            <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>{t("listenp.replay_note")}</Text>
            <View style={{ flexDirection: "row", gap: 6, marginTop: spacing.sm }}>
              {segments.map((_, i) => (
                <View key={i} style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: playing && i <= segIdx ? colors.primary : colors.surface2 }} />
              ))}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: spacing.sm, marginTop: spacing.lg }}>
          <ToggleChip label={t("listenp.slow")} on={slow} onPress={() => setSlow((v) => !v)} colors={colors} />
          <ToggleChip label={t(reveal ? "item.hide_text" : "item.show_text")} on={reveal} onPress={() => setReveal((v) => !v)} colors={colors} />
          {!reveal ? <Text variant="caption" color={colors.textMuted} style={{ flexShrink: 1 }}>{t("listenp.hint_listen_first")}</Text> : null}
        </View>
      </Card>
      {reveal ? (
        <Card style={{ marginTop: spacing.sm }}>
          <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{t("listenp.tap_line")}</Text>
          {segments.map((s, i) => (
            <PressableScale key={i} onPress={() => playSegment(i)} accessibilityLabel={t("item.listen")}
              style={{ marginTop: i > 0 ? spacing.md : 0, flexDirection: "row", alignItems: "flex-start", gap: spacing.sm, borderRadius: radii.md, backgroundColor: segIdx === i ? colors.primarySoft : "transparent", padding: segIdx === i ? spacing.sm : 0 }}>
              <SpeakerIcon color={colors.textMuted} size={16} />
              <View style={{ flex: 1 }}>
                {s.speaker ? <Text variant="micro" color={colors.textMuted}>{s.speaker}</Text> : null}
                <Text variant="body">{s.text}</Text>
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
  /* Yazma ve monolog görevlerini yapay zekâ puanlıyor. Misafirde bu hesap
     istiyor: "bu değerlendirmeyi yapay zekâ üretti" yerine, yazmaya ya da
     konuşmaya BAŞLAMADAN puanlanmayacağı söyleniyor (görev yine sayılıyor). */
  const guest = Boolean(useAuth().user?.guest);
  const { status: premiumStatus } = usePremiumStatus();
  const guestTrial = (premiumStatus?.guestAiLeft ?? 0) > 0;
  /*
    YAPAY ZEKÂ HAKKI BİTTİYSE BAŞTA SÖYLE (2026-09-25). Patika Yazma ve
    Beceriler (yazma, B1+ monolog) seviye başına ayrı sayaç. Hak yoksa ve bu
    alıştırmaya daha önce hak düşmediyse değerlendirme gelmeyecek: görev yine
    yapılır (puansız tamamlanır), ama bir sonraki hakkın nasıl açılacağı ve
    Premium yolu yazmaya BAŞLAMADAN görünüyor.
  */
  const nav2 = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const aiCopy = (ex: { id: string; level: string; skill: string; unit?: number | null; monologue?: unknown } | undefined) => {
    const u = premiumStatus?.unlock;
    if (!ex || guest || !u) return null;
    const lv = u.levels[ex.level];
    if (!lv) return null;
    if (ex.unit != null) {
      if (ex.skill !== "writing" || !pathWritingSpent(u, ex.id, ex.level, guest)) return null;
      return tieredCopy(lv.pathWriting, "write");
    }
    const kind = ex.skill === "writing" ? "writing" : ex.skill === "speaking" && ex.monologue ? "speaking" : null;
    if (!kind || u.owned.skills.includes(ex.id)) return null;
    const c = tieredCopy(kind === "writing" ? lv.skillWriting : lv.skillSpeaking, kind === "writing" ? "skill_write" : "skill_speak");
    return c && c.spent ? c : null;
  };
  const guestAiNote = <View style={{ marginBottom: spacing.md }}><FlowNote icon={<LockIcon color={colors.textMuted} size={16} />} text={t(guestTrial ? "guest.skill_ai_trial" : "guest.skill_ai")} /></View>;
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { params } = useRoute<RouteProp<RootStackParams, "Item">>();
  /*
    Egzersizin seviye paketi inmemişse burada iniyor. Normalde liste ekranı
    zaten indirmiş oluyor; bu yol derin bağlantıyla ya da bildirimle doğrudan
    buraya gelen kullanıcı için. `tick` inince yeniden çiziyor.
  */
  const [exercise, setExercise] = useState(() => getExercise(params.id));
  /* Paket inmeden "bulunamadı" denmiyor (bkz. ui/flow `ContentLoadingBody`):
     elde egzersiz varsa hazır, yoksa indirme bitene kadar bekliyoruz. */
  const [packReady, setPackReady] = useState(() => !!getExercise(params.id));
  /* Paket inemediyse "açılamıyor" değil "indirilemedi" deniyor. */
  const [packFailed, setPackFailed] = useState(false);
  useEffect(() => {
    const level = skillLevelOf(params.id);
    if (!level) { setPackReady(true); return; }
    let dead = false;
    void ensureSkills(level).then((ok) => {
      if (dead) return;
      setExercise(getExercise(params.id));
      setPackFailed(!ok);
      setPackReady(true);
    });
    return () => { dead = true; };
  }, [params.id]);
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
  /** Rubrik puanı (yazma, monolog): bandın ana sayısı doğru/toplam değil bu. */
  const [lastScore, setLastScore] = useState<number | undefined>(undefined);
  const [round, setRound] = useState(0);

  const kind = params.kind as ItemKind;
  const tint = kindFill(kind);
  const Icon = kindIcon(kind);

  /** `score`: monologda rubrik puanı (0–100); verilmezse sunucu doğru/toplam oranını yazar. */
  async function recordAndFinish(c: number, score?: number) {
    setCorrect(c);
    setLastScore(score);
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
    setLastScore(undefined);
    saved.current = false;
    setFinished(false);
    setCorrect(0);
    setRound((r) => r + 1);
  }

  if (!exercise && !packReady) {
    return <FlowScreen><ContentLoadingBody /></FlowScreen>;
  }
  if (!exercise) {
    return (
      <FlowScreen center actions={<FlowActions primary={{ label: t("item.go_back"), onPress: () => nav.goBack() }} />}>
        {/* DURUM ŞABLONU: açılamayan egzersiz = üzgün maskot, tek çıkış. */}
        <StateBody alert title={packFailed ? t("content.couldn_t_load") : t("item.this_exercise_can_t_be_opened")} body={packFailed ? t("social.err_offline") : null} />
      </FlowScreen>
    );
  }

  const aiSpent = aiCopy(exercise as { id: string; level: string; skill: string; unit?: number | null; monologue?: unknown });

  // Konuşma iki biçim: söyleyiş drilli (`tasks`, her biri bir cümle) ya da
  // monolog (`monologue`, tek görev). Dil bilgisi okuma gibi soru sayar.
  const drillTasks = exercise.skill === "speaking" && !exercise.monologue ? ((exercise.tasks ?? []) as SpeakingTask[]) : null;
  const total =
    exercise.skill === "writing"
      ? (exercise.tasks?.length ?? 0)
      : exercise.skill === "speaking"
        ? (drillTasks ? drillTasks.length : 1)
        : (exercise.questions?.length ?? 0);
  const isMono = exercise.skill === "speaking" && !!exercise.monologue;
  const isTasks = exercise.skill === "writing" || isMono;
  /* Rubrikle puanlananlarda (yazma, monolog) yüzde rubrik puanından: monolog
     tek görev ve doğru/toplam ya %0 ya %100 olurdu. */
  const pct = scoreOf(correct, total, lastScore);
  /* Maskotun ruh hâli ve konfeti PUAN BANDINDAN: eşikler (70 / 40) burada
     elle yazılıydı, oysa aynı iki sayı uygulamanın her yerinde aynı ayrımı
     yapıyor (web `lib/score-bands.ts`). */
  const band = scoreBand(pct);
  const fromSkills = params.from === "skills";
  const perfect = total > 0 && correct === total;
  /* Olumsuz sonuç = adım "bitti" sayılmadı. Monologda hüküm rubrik eşiği
     (`RUBRIC_PASS_PCT`, tek görevin geçip geçmediği); ötekilerde beceri eşiği. */
  const passed = isMono ? perfect : isSkillDone(pct);
  const backLabel = t(fromSkills ? "item.back_to_skills" : "item.back_to_path");
  const skillKey = SKILL_KEY[exercise.skill];

  /*
    SONUÇ ŞABLONU (ui/flow): band → sayılar → notlar → [monolog geri bildirimi]
    → düğmeler. Eskiden tek kart: maskot, "x/y doğru", XP, seri, iki not ve
    yüzde satırı alt alta aynı ağırlıkta. Band sonucun kendisini söylüyor;
    eşiğin altında sessizleşiyor ve birincil düğme "Tekrar dene" oluyor.
    Web karşılığı `skills/player-shell` `ResultCard`.
  */
  const resultHead = (
    <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
      <Celebrate show={band === "good" && passed} />
      <ResultHero
        eyebrow={`${skillKey ? t(skillKey) : t("item.content")} · ${exercise.level}`}
        title={t(isTasks ? (passed ? "item.tasks_done" : "skillp.result_retry") : perfect ? "skillp.result_perfect" : passed ? "skillp.result_done" : "skillp.result_retry")}
        figure={isMono && lastScore === undefined ? null : formatPercent(pct)}
        sub={[!isMono ? t("common.n_correct", { correct, total }) : null, earnedXp > 0 ? `+${earnedXp} XP` : null].filter(Boolean).join(" · ") || null}
        quiet={!passed}
        pill={passed ? null : { text: t("skillp.pill_need", { pct: isMono ? RUBRIC_PASS_PCT : SKILL_DONE_PCT }), tone: "bad" }}
      />
      {(() => {
        const items = [
          !isMono ? { value: `${correct}/${total}`, label: t("common.correct") } : null,
          !isMono || lastScore !== undefined ? { value: formatPercent(pct), label: t("skillp.stat_score") } : null,
          /* Kazanılmayan sayı yazılmıyor: seri yoksa kutu da yok. */
          streak > 0 ? { value: t("profile.days", { n: streak }), label: t("summary.streak"), tone: "streak" as const } : null,
        ].filter((x): x is NonNullable<typeof x> => x !== null);
        return items.length ? <StatRow items={items} /> : null;
      })()}
      {/* Bu bir UYARI, hata değil — sonuç cihazda, bağlantıyı bekliyor. */}
      {queued ? <FlowNote tone="warn" icon={<AlertIcon color={colors.streakText} size={16} />} text={t("skillp.saved_offline")} /> : null}
      {repeatNoXp ? <FlowNote text={t("item.repeat_note")} /> : null}
    </View>
  );
  const resultActions = passed ? (
    <FlowActions primary={{ label: backLabel, onPress: () => nav.goBack() }} secondary={{ label: t("item.try_again"), onPress: retry }} />
  ) : (
    <FlowActions primary={{ label: t("item.try_again"), onPress: retry }} secondary={{ label: backLabel, onPress: () => nav.goBack() }} />
  );

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

      <KeyboardAwareScroll contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text variant="body" color={colors.textMuted}>{exercise.intro}</Text>

        {exercise.skill === "reading" && exercise.text ? <ReadingText text={exercise.text} course={exercise.id.startsWith("en-") ? "en" : currentCourseId()} colors={colors} /> : null}
        {exercise.skill === "listening" && exercise.segments ? <ListeningBody segments={exercise.segments} colors={colors} /> : null}
        {exercise.skill === "grammar" && exercise.explanation ? (
          <GrammarBody focus={exercise.focus ?? ""} blocks={exercise.explanation} colors={colors} />
        ) : null}

        <GlossPanel gloss={exercise.gloss} colors={colors} />

        {exercise.skill === "writing" ? (
          // Yazma görevleri sunucuda dil modeliyle puanlanıyor; kimin
          // değerlendirdiği yazmaya başlamadan önce söyleniyor.
          <>
            {guest ? guestAiNote : <AiNotice variant="output" style={{ marginBottom: spacing.md }} />}
            {aiSpent ? <View style={{ marginBottom: spacing.md }}><UnlockProgress copy={aiSpent} onPremium={() => nav2.navigate("Paywall")} /></View> : null}
            <WritingList key={round} tasks={(exercise.tasks ?? []) as WritingTask[]} level={exercise.level} exerciseId={exercise.id} onAllDone={recordAndFinish} colors={colors} />
          </>
        ) : exercise.skill === "speaking" && exercise.monologue ? (
          // Monolog: metin sunucuda rubrikle puanlanıyor (ses gitmiyor).
          <>
            {guest ? guestAiNote : <AiNotice variant="output" style={{ marginBottom: spacing.md }} />}
            {aiSpent ? <View style={{ marginBottom: spacing.md }}><UnlockProgress copy={aiSpent} onPremium={() => nav2.navigate("Paywall")} /></View> : null}
            {/* Monologda band geri bildirimin ÜSTÜNDE (web `ResultCard` onu
                ayrıntı olarak içine alıyor); gövde yerinde kalıyor ki durumu
                (puan, transkript) sökülmesin. */}
            {finished ? resultHead : null}
            <MonologueBody key={round} mono={exercise.monologue} level={exercise.level} exerciseId={exercise.id}
              onDone={(ok, score) => recordAndFinish(ok ? 1 : 0, score)} colors={colors} />
          </>
        ) : drillTasks ? (
          <SpeakingDrill key={round} tasks={drillTasks} onAllDone={recordAndFinish} colors={colors} />
        ) : (
          <QuestionList key={round} questions={exercise.questions ?? []} onAllAnswered={recordAndFinish} colors={colors} />
        )}

        {finished && !isMono ? resultHead : null}
        {finished ? <View style={{ marginTop: spacing.md }}>{resultActions}</View> : null}
      </KeyboardAwareScroll>
    </View>
  );
}
