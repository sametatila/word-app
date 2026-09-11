import React, { useEffect, useRef, useState } from "react";
import { t, dateLocale } from "../lib/i18n";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, ShareIcon, BoltIcon, FlameIcon, AlertIcon } from "../ui/icons";
import { shareResult } from "../lib/share";
import { MascotPop } from "../ui/MascotPop";
import { AmbientPeek } from "../ui/AmbientMascot";
import { ProgressRing } from "../ui/ProgressRing";
import { Mascot } from "../ui/Mascot";
import { CoachBubble } from "../ui/CoachBubble";
import { Celebrate } from "../ui/Celebrate";
import { RoundView } from "../game/rounds";
import { fetchSession, submitAnswers, isPermanentError, todayStr, PRACTICE_GAMES, type Round, type AnswerOut, type DoneExtra, type SessionMeta, type SessionProgress, type SubmitResult, type MissedWord } from "../game/session";
import { ApiError } from "../api/client";
import { bumpStats } from "../lib/statsSignal";
import { track } from "../lib/track";
import { sfx } from "../lib/sfx";
import { RoundSkeleton } from "../game/RoundSkeleton";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { onTint } from "../theme/colors";
import { LevelBadge } from "../ui/LevelBadge";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { useBackConfirm } from "../lib/useBackConfirm";

type Phase = "loading" | "auth" | "error" | "play" | "done" | "goal_done" | "no_words";

/**
 * GERÇEK kelime turu — sunucu verisiyle. /api/session'dan gerçek turları çeker
 * (kullanıcının kendi kelimeleri + SRS zamanlaması), oynatır, /api/answers'a
 * yazar (SRS/XP/seri güncellenir). Oturum yoksa girişe yönlendirir. Demo yok.
 */
export function GameScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootStackParams, "Game">>();
  const onlyGame = route.params?.game ?? null;
  const gameKey = onlyGame ? PRACTICE_GAMES.find((g) => g.game === onlyGame)?.label ?? null : null;
  const gameLabel = gameKey ? t(gameKey) : null;
  const [phase, setPhase] = useState<Phase>("loading");
  const [rounds, setRounds] = useState<Round[]>([]);
  /* Oturum meta bilgisi: başlıktaki seviye rozeti bundan besleniyor. */
  const [meta, setMeta] = useState<SessionMeta | null>(null);
  const [idx, setIdx] = useState(0);
  const [finalCorrect, setFinalCorrect] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  // Seri onarıldıysa kalınan gün sayısı; onarım yoksa null (bkz. finish).
  const [repaired, setRepaired] = useState<number | null>(null);
  // Bu turda pekişen kelime sayısı; kutlama eşiği buna da bakıyor.
  const [mastered, setMastered] = useState(0);
  /* Sunucu yanıtının tamamı: özet XP, günlük hedef ve yarına kalan tekrarı
     buradan okuyor (web `session-player` de aynısını yapıyor). */
  const [result, setResult] = useState<SubmitResult | null>(null);
  /*
   * KAYIT UYARISI. Tur biterken yazma düşerse eskiden hiçbir şey söylenmiyordu
   * ("sessizce düşer"): ekranda puan artıyor, sunucuda hiçbir şey değişmiyordu.
   * Artık iki durum ayrı söyleniyor — kuyruğa alındı ("queued", bağlantı
   * dönünce gidecek) ve sunucu reddetti ("dropped", gitmeyecek). Web aynı iki
   * metni gösteriyor (`session-player` `saveWarning`).
   */
  const [saveWarning, setSaveWarning] = useState<null | "queued" | "dropped">(null);
  const [combo, setCombo] = useState(0);
  const [pop, setPop] = useState(0);
  const answers = useRef<AnswerOut[]>([]);
  const startedAt = useRef(0);
  const roundStart = useRef(0);
  const day = useRef(todayStr());
  // Bu oturumun cevapları sunucuya yazıldı mı? (finish ya da çıkış-flush)
  // İkisi birden yazıp XP/SRS'i çift saymasın diye tek kapı.
  const submitted = useRef(false);
  // Turun sunucudaki konumu (kaç tur bitti). unmount-flush ref'ten okur.
  const idxRef = useRef(0);
  // Yarım kalan turdan devam ederken önceki (sunucudaki) sayaç tabanı.
  const resumeBase = useRef({ correct: 0, total: 0, xp: 0 });
  /* O turda yanlış bilinen kelimeler — özetin altındaki liste ve sunucuya
     giden ilerleme bunu taşıyor (web `session-player` `missed`). */
  const missed = useRef<MissedWord[]>([]);
  // Gösterim TUR-bazlı: üstteki sayaç idx/rounds.length (tur) sayıyor; done da tur saysın.
  // (answers KELİME sayar — match turu 1 tur ama 4 kelime; SRS için doğru, ama done'da 20→24
  //  gösterirdi. roundsSeen/Right yalnız gösterim için; SRS/XP hâlâ answers'tan.)
  const roundsSeen = useRef(0);
  const roundsRight = useRef(0);
  // Yarım turdan çıkış onaylı (donanım geri + X): cevaplar unmount'ta zaten yazılıyor,
  // ama kullanıcı yanlışlıkla çıkıp turu bölmesin.
  const back = useBackConfirm(phase === "play");

  /**
   * Şu ana kadarki ilerleme — cevaplarla gidip sunucu index'ini ilerletir.
   *
   * PRATİKTE GÖNDERİLMİYOR. `session_state` satırı kullanıcı başına tek:
   * pratikte gönderilen ilerleme karışık turun nerede kaldığını eziyor ve
   * Günlük tur kaldığı yerden değil pratiğin bıraktığı yerden açılıyordu.
   * Pratik zaten "kaldığın yerden" diye bir şey vaat etmiyor — cevaplar
   * (SRS/XP) normal yolundan gidiyor.
   */
  function progressNow(): SessionProgress | undefined {
    if (onlyGame) return undefined;
    return {
      index: idxRef.current,
      correct: resumeBase.current.correct + roundsRight.current,
      total: resumeBase.current.total + roundsSeen.current,
      xp: resumeBase.current.xp,
      missed: missed.current,
    };
  }

  async function load(opts?: { extra?: boolean }) {
    setPhase("loading");
    try {
      /*
        Tek-oyun pratiği hep taze başlar; karışık Günlük tur normal yüklenir.

        `fresh` KALDIRILDI: o bayrak isteğin önüne `DELETE /api/session`
        koyuyordu, yani bir pratik açmak kullanıcının yarım kalan Günlük
        turunu siliyordu. Pratik zaten sunucuda durum tutmuyor (bkz.
        lib/session `loadSession`) — `game` verildiğinde her istek taze bir
        kuyruk kuruyor ve kayıtlı satıra hiç dokunmuyor.
      */
      let p = await fetchSession(day.current, onlyGame ? { game: onlyGame } : opts?.extra ? { extra: true } : undefined);
      let list = p.rounds ?? [];
      // Karışık tur açılırken slotta tek-oyun pratiği kalıntısı varsa (tüm turlar
      // tek tür — paylaşılan session_state) onu atla, taze karışık tur getir.
      // Yoksa Günlük tur yanlışlıkla pratiği "kaldığın yerden" gösterirdi.
      if (!onlyGame && list.length > 0 && new Set(list.map((x) => x.game)).size === 1) {
        p = await fetchSession(day.current, { fresh: true });
        list = p.rounds ?? [];
      }
      answers.current = [];
      roundsSeen.current = 0; roundsRight.current = 0;
      submitted.current = false;
      setCombo(0);
      // Yarım kalan turdan devam yalnız karışık turda (pratik taze başlar).
      const r = onlyGame ? null : p.resume;
      const start = r && r.index > 0 && r.index < list.length ? r.index : 0;
      resumeBase.current = { correct: r?.correct ?? 0, total: r?.total ?? 0, xp: r?.xp ?? 0 };
      /* Yarım kalan tur başka bir cihazda sürdürülüyor olabilir: zorlanılan
         kelimeler sunucudan geri geliyor, sıfırdan başlamıyor. */
      missed.current = r?.missed ?? [];
      setRounds(list);
      setMeta(p.meta ?? null);
      idxRef.current = start;
      setIdx(start);
      startedAt.current = Date.now();
      roundStart.current = Date.now();
      track("session_start", 0, onlyGame ? "practice" : "session");
      /* Yarim kalan turdan devam edildiyse ayrica yaziliyor: web
         `session-player` da oyle. Yoksa "bastan mi basladi, devam mi etti"
         sorusu Androidde hic cevaplanmiyor. */
      if (start > 0) track("session_resume", start);
      /*
        BOŞ TUR BİTMİŞ TUR DEĞİL. Liste boş dönünce ekran "Tur bitti · 0/0"
        gösteriyordu ve iki ayrı durum aynı yanlış cümleye düşüyordu: günlük
        hedefini bitiren kullanıcı kutlama yerine sıfırlı bir skor kartı
        görüyor, Pratik'ten o oyunu seçip de kelimesi olmayan kullanıcı ise
        neden boş olduğunu hiç öğrenemiyordu. Web ikisini ayrı ekranla
        karşılıyor (`session-player`: hedef kartı + "yeni kelimelerle devam",
        pratik kartı + "karışık tura dön").
      */
      if (list.length === 0) {
        setFinalCorrect(0); setFinalTotal(0); setRepaired(null); setMastered(0); setResult(null);
        setPhase(onlyGame ? "no_words" : "goal_done");
      }
      else { sfx("start"); setPhase("play"); } // turun açılışı — web `session-player` aynı yerde çalıyor
    } catch (e) {
      setPhase(e instanceof ApiError && e.status === 401 ? "auth" : "error");
    }
  }
  // Yalnız açılışta bir kez; load ayrıca "tekrar dene" düğmesinden çağrılıyor.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, []);

  // Yarım kalan turu terk edince (X / donanım geri / kaydırma) toplanan
  // cevapları yaz — web'deki çıkışta-flush (sendBeacon) gibi. Yoksa 15/20'de
  // çıkan kullanıcının emeği ve SRS/XP güncellemesi tümden yok olurdu.
  /*
    `progressNow` her çizimde yeniden doğuyor; aşağıdaki etkinin bağımlılığına
    yazılsa etki her çizimde sökülüp kurulurdu ve "yalnız çıkışta yaz" anlamı
    kaybolurdu. Onun yerine EN SON kopyası bir ref'te tutuluyor: etki bir kez
    kuruluyor, temizlik çıkış anındaki güncel işlevi çağırıyor.
  */
  const progressNowRef = useRef(progressNow);
  useEffect(() => { progressNowRef.current = progressNow; });

  useEffect(() => {
    // Ref NESNELERİ kopyalanır, .current değil: temizlik çıkış anındaki canlı
    // değerleri okur (mount'taki kopya boş cevap listesi olurdu).
    const submittedRef = submitted;
    const answersRef = answers;
    const startedRef = startedAt;
    const dayRef = day;
    const progressRef = progressNowRef;
    return () => {
      if (submittedRef.current) return;
      const pending = answersRef.current;
      if (!pending.length) return;
      submittedRef.current = true;
      const secs = Math.round((Date.now() - startedRef.current) / 1000);
      void submitAnswers(pending, dayRef.current, secs, progressRef.current()).catch(() => { /* sessizce düşer */ });
    };
  }, []);

  /* Web ile aynı kural: artikel varsa kelimenin önüne yazılıyor (özette
     "der Tisch" okunuyor) ve aynı kelime iki kez listelenmiyor. */
  function noteMissed(w?: { id: number; de: string; artikel: string | null; tr: string; en: string | null }) {
    if (!w || missed.current.some((m) => m.id === w.id)) return;
    missed.current.push({ id: w.id, de: w.artikel ? `${w.artikel} ${w.de}` : w.de, tr: w.tr, en: w.en });
  }

  function onDone(ok: boolean, extra?: DoneExtra) {
    const batch = extra?.batch;
    /* `skip`: cevap kaydedilmeyen tur ("zaten biliyorum"). */
    const skip = extra?.skip === true;
    if (idxRef.current !== idx) return; // çift "Devam" / geç tıklama koruması
    const r = rounds[idx];
    const lat = Math.max(0, Date.now() - roundStart.current);
    if (skip) {
      /* hiçbir cevap yazılmıyor; tur yalnız ilerliyor */
    } else if (batch && batch.length && r) {
      // Çok kelimeli tur (match): her kelimenin SRS'i ayrı yazılır.
      /* Yığın turunda hata tipi kelime başına: doğru eşleşenin hatası yok. */
      for (const b of batch) if (b.wordId) answers.current.push({ wordId: b.wordId, game: r.game, correct: b.correct, latencyMs: lat, ...(b.correct ? {} : { errorType: "meaning" as const }) });
      for (const b of batch) if (!b.correct) noteMissed(r.words?.find((w) => w.id === b.wordId));
    } else {
      const wordId = r?.word?.id ?? r?.words?.[0]?.id ?? 0;
      if (!ok && r) noteMissed(r.word ?? r.words?.[0]);
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
    roundsSeen.current += 1;
    if (ok) roundsRight.current += 1;
    if (ok && (combo + 1) % 5 === 0) setPop((x) => x + 1);
    setCombo((c) => (ok ? c + 1 : 0));
    roundStart.current = Date.now();
    const next = idx + 1;
    idxRef.current = next;
    if (next >= rounds.length) void finish();
    else setIdx(next);
  }

  async function finish() {
    const totalCorrect = resumeBase.current.correct + roundsRight.current;
    const total = resumeBase.current.total + roundsSeen.current;
    setFinalCorrect(totalCorrect);
    setFinalTotal(total);
    setPhase("done");
    /* Kapanış sesi BURADA çalmıyor: hangi ses olacağı pekişen kelime sayısına
       bakıyor ve o sayı sunucu yanıtıyla geliyor. Karar özet açılınca veriliyor
       (aşağıdaki etki), web de öyle yapıyor (`session-player` özet kartı). */
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    track("session_done", totalCorrect, "session");
    if (submitted.current) return;
    submitted.current = true;
    setSaveWarning(null);
    try {
      if (answers.current.length) {
        const r = await submitAnswers(answers.current, day.current, secs, progressNow());
        bumpStats(); // sayılar değişti: başlık ve özet tazelensin
        if (r?.streakRepaired) setRepaired(r.currentStreak);
        if (r?.newlyMastered) setMastered(r.newlyMastered);
        if (r) setResult(r);
      }
    } catch (e) {
      setSaveWarning(isPermanentError(e) ? "dropped" : "queued");
    }
  }

  /*
   * TURUN KAPANIŞ SESİ — hak edilmişse ayrı.
   *
   * Web özet kartı açılırken `perfect`/`finish` ayrımını yapıyor: ikisi de
   * "bitti" diyor ama aynı tonda değil. Mobil tek ses çalıyordu, yani pekişen
   * kelimeyle biten tur sıradan turla aynı sesi veriyordu. Ölçüt kutlamayla
   * aynı, yani ses ile konfeti tek karardan çıkıyor.
   */
  const doneDeserved = mastered > 0 || (finalTotal > 0 && Math.round((finalCorrect / finalTotal) * 100) >= 80 && finalTotal >= 4);
  useEffect(() => {
    if (phase !== "done" || finalTotal === 0) return;
    sfx(doneDeserved ? "perfect" : "finish");
  }, [phase, finalTotal, doneDeserved]);

  const pad = { flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg } as const;

  if (phase === "loading") return <RoundSkeleton label={!!gameLabel} />;

  if (phase === "auth") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="display" style={{ textAlign: "center" }}>{t("game.sign_in_to_save_your_progress")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md, marginBottom: spacing.xxl }}>{t("game.sign_in_to_study_your_own_words")}</Text>
        <PressableScale onPress={() => { nav.goBack(); nav.navigate("Auth"); }} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
          <Text variant="h3" color={colors.onPrimary}>{t("game.sign_in_sign_up")}</Text>
        </PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "error") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="h2" style={{ textAlign: "center" }}>{t("game.couldn_t_load_round")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm, marginBottom: spacing.xxl }}>{t("game.check_your_connection_and_try")}</Text>
        <PressableScale onPress={() => void load()} style={[{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, paddingHorizontal: spacing.xxl, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="h3" color={colors.onPrimary}>{t("game.try_again")}</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "goal_done") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Mascot mood="celebrate" size={112} />
        <Text variant="h2" style={{ textAlign: "center", marginTop: spacing.md }}>{t("session.goal_done")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm }}>{t("session.goal_done_sub")}</Text>
        {meta ? (
          <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.lg, lineHeight: 20 }}>
            {t("session.today_summary", { reviews: meta.reviewsToday, news: meta.newToday, streak: meta.currentStreak })}
          </Text>
        ) : null}
        <PressableScale onPress={() => void load({ extra: true })} style={[{ width: "100%", marginTop: spacing.xl, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
          <Text variant="h3" color={colors.onPrimary}>{t("session.continue_with_new")}</Text>
        </PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "no_words") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Mascot mood="idle" size={104} />
        <Text variant="h2" style={{ textAlign: "center", marginTop: spacing.md }}>{t("session.no_words_for_game", { game: gameLabel ?? "" })}</Text>
        {/* Tek cümle: boş ekranda okunacak son şey modun nasıl çalıştığı. */}
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm }}>{t("session.review_only_mode")}</Text>
        <PressableScale onPress={() => { nav.goBack(); nav.navigate("Game"); }} style={[{ width: "100%", marginTop: spacing.xl, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
          <Text variant="h3" color={colors.onPrimary}>{t("session.back_to_mixed")}</Text>
        </PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "done") {
    const total = finalTotal;
    const pct = total ? Math.round((finalCorrect / total) * 100) : 0;
    /* Web'le aynı ölçüt (`session-player` `deserved`): pekişen kelime tek
       başına yeter, yoksa dört turdan uzun ve %80 üstü bir tur gerekiyor.
       Kapanış SESİ de bu ölçütten çıkıyor (yukarıdaki etki). */
    const deserved = doneDeserved;
    return (
      <View style={pad}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          {/*
            KUTLAMA EŞİĞİ WEB'İN KURALI. Burada `pct >= 60` yazıyordu, yani
            neredeyse her tur konfeti patlıyordu; web aynı ekranda daha yüksek
            ve GEREKÇELİ bir eşik kullanıyor (`session-player` `deserved`):
            "her seferinde patlarsa değersizleşir" ve "kelime pekiştirmek,
            oturum doğruluğunun aksine gerçekten kazanılmış bir şey". İki
            platformun aynı anı farklı sıklıkta kutlaması bir tasarım
            ayrışmasıydı; ölçüt tek oldu.
          */}
          <Celebrate show={deserved} />
          {/* Üç hâl, webdeki gibi (`session-player` özet kartı): hak edilmiş
              turda kutlama, geçer turda mutlu, altında ÜZGÜN. Burada ikinci
              hâl yoktu - %59 alan öğrenci de mutlu maskot görüyordu, yani
              maskot hiçbir şey söylemiyordu. */}
          {/* ZAYIF NOKTA TURUNDA ERDİ KONUŞUYOR. Pratik'ten tek oyuna
              kilitlenen tur "zayıf nokta çalışması" sayılıyor ve web özetinde
              Erdi ona göre bir cümle söylüyor (`session-player`, `weak_done`);
              Androidde maskot sessizdi. */}
          {onlyGame && total > 0 ? (
            <CoachBubble moment="weak_done" mood={pct >= 60 ? "thumbsup" : "sad"} size={72} />
          ) : total > 0 ? <Mascot mood={deserved ? "celebrate" : pct >= 60 ? "happy" : "sad"} size={104} /> : <Mascot mood="idle" size={104} />}
          <ProgressRing size={150} stroke={14} pct={pct} track={colors.surface2} from={colors.gradientA[0]} to={colors.gradientA[1]}>
            <Text variant="display" color={colors.primaryText}>{finalCorrect}/{total || 0}</Text>
            <Text variant="micro" color={colors.textMuted}>{t("game.correct")}</Text>
          </ProgressRing>
          <Text variant="h1" style={{ marginTop: spacing.xl }}>{t(total ? "common.round_done" : "game.done_no_more")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: repaired === null ? spacing.xxl : spacing.lg, textAlign: "center" }}>
            {t(total ? "game.saved" : "game.nothing_to_review")}
          </Text>
          {/* Kazanılan XP: webde özetin en üstündeki sayı (`session-player`
              `+{xp} XP`). Mobilde HİÇ gösterilmiyordu - alan `SubmitResult`
              tipinde yoktu ve sessizce düşüyordu (bkz. web-parity §11.23). */}
          {result && result.xpGained > 0 ? (
            <Text variant="h2" color={colors.primaryText} style={{ marginBottom: spacing.md }}>{`+${result.xpGained} XP`}</Text>
          ) : null}

          {/* Günlük hedef çubuğu + ulaşıldıysa satırı. Web aynı kutuyu çiziyor. */}
          {result && result.dailyGoal > 0 ? (
            <View style={{ width: "100%", marginBottom: spacing.lg }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text variant="caption" color={colors.textMuted}>{t("learn.daily_goal")}</Text>
                <Text variant="caption" color={colors.textMuted}>{`${result.reviewsToday} / ${result.dailyGoal}`}</Text>
              </View>
              <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
                <View style={{ height: "100%", width: `${Math.min(100, Math.round((result.reviewsToday / result.dailyGoal) * 100))}%`, backgroundColor: colors.success, borderRadius: 4 }} />
              </View>
              {result.goalReached ? (
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginTop: spacing.sm }}>
                  <FlameIcon color={colors.successText} size={16} />
                  <Text variant="bodyStrong" color={colors.successText}>{t("session.goal_reached")}</Text>
                </View>
              ) : null}
            </View>
          ) : null}

          {/* Pekişen kelime: seviye rozeti yerine gerçekten kazanılmış olan şey.
              Mobil bu sayıyı yalnız kutlama eşiği için kullanıyor, göstermiyordu. */}
          {mastered > 0 ? (
            <View style={{ width: "100%", borderRadius: radii.lg, backgroundColor: colors.success + "24", paddingHorizontal: spacing.md, paddingVertical: 12, marginBottom: spacing.lg }}>
              <Text variant="bodyStrong" color={colors.successText} style={{ textAlign: "center" }}>{t("sessionw.n_mastered", { n: mastered })}</Text>
            </View>
          ) : null}

          {/* Kaybedildiği sanılan seri geri alındıysa bunu söylemek şart:
              sessiz bir onarım, kullanıcının ekranda gördüğü sayıyı
              açıklanamaz hâle getirir. Web aynı kutuyu çiziyor. */}
          {repaired !== null ? (
            <View style={{ width: "100%", borderRadius: radii.lg, backgroundColor: colors.streak + "24", paddingHorizontal: spacing.md, paddingVertical: 12, marginBottom: spacing.xxl }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <FlameIcon color={colors.streakText} size={16} />
                <Text variant="bodyStrong" color={colors.streakText}>{t("game.streak_saved")}</Text>
              </View>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>{t("game.streak_saved_sub", { n: repaired })}</Text>
            </View>
          ) : null}
          {/* Kutunun rengi ve simgesi webdekiyle aynı: bu bir UYARI, hata
              değil - tur oynandı, yalnız kaydı bekliyor. Kırmızı çizmek
              kullanıcıya turu kaybettiğini söylerdi. */}
          {saveWarning ? (
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.sm, borderRadius: radii.lg, backgroundColor: colors.streak + "1f", paddingHorizontal: spacing.md, paddingVertical: 12, marginBottom: spacing.lg }}>
              <AlertIcon color={colors.streakText} size={16} />
              <Text variant="bodyStrong" color={colors.streakText} style={{ flex: 1 }}>{saveWarning === "dropped" ? t("session.save_failed") : t("session.save_queued")}</Text>
            </View>
          ) : null}
          <PressableScale onPress={() => void load()} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}><Text variant="bodyStrong" color={colors.onPrimary}>{t("game.continue")}</Text></PressableScale>
          {/*
            ZORLANDIKLARIN. Web özetin altında o turda yanlış bilinen kelimeleri
            listeliyor ve kelime listesine kapı açıyor; mobilde bu liste HİÇ
            yoktu - tur bitiyor, hangi kelimede takıldığın hiçbir yerde
            yazmıyordu. Altı satırla sınırlı: sonuç ekranı bir kelime listesine
            dönüşmemeli, gerisi "Kelimelerim"de.
          */}
          {missed.current.length ? (
            <View style={{ width: "100%", marginTop: spacing.lg }}>
              <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{t("session.missed_title", { n: missed.current.length })}</Text>
              {missed.current.slice(0, 6).map((w) => (
                <View key={w.id} style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: spacing.md, backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 8, marginBottom: 6 }}>
                  <Text variant="bodyStrong" style={{ flexShrink: 1 }}>{w.de}</Text>
                  <View style={{ flexShrink: 1, alignItems: "flex-end" }}>
                    <Text variant="caption" color={colors.textMuted} numberOfLines={1}>{w.tr}</Text>
                    {w.en ? <Text variant="micro" color={colors.textFaint} numberOfLines={1}>{w.en}</Text> : null}
                  </View>
                </View>
              ))}
              {missed.current.length > 6 ? (
                <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginTop: 2 }}>{t("session.n_more_words", { n: missed.current.length - 6 })}</Text>
              ) : null}
              <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm, lineHeight: 18 }}>{t("session.missed_note")}</Text>
              <PressableScale onPress={() => nav.navigate("Words")} style={{ alignSelf: "center", marginTop: spacing.xs, paddingVertical: 6 }}>
                <Text variant="bodyStrong" color={colors.primaryText}>{t("words.my_words")}</Text>
              </PressableScale>
            </View>
          ) : null}
          {/* Ertesi güne dair somut bir sayı — yarın uygulamayı açmak için bir
              sebep. Web özetin altında aynı satırı gösteriyor. */}
          {result && result.dueTomorrow > 0 ? (
            <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md, textAlign: "center" }}>{t("sessionw.due_tomorrow", { n: result.dueTomorrow })}</Text>
          ) : null}
          {total > 0 && (
            <PressableScale onPress={() => shareResult(finalCorrect, total)} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8, marginTop: spacing.md, borderWidth: 1.5, borderColor: colors.border }}>
              <ShareIcon color={colors.text} size={19} /><Text variant="bodyStrong" color={colors.text}>{t("common.share")}</Text>
            </PressableScale>
          )}
          <PressableScale onPress={() => nav.goBack()} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.md }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.finish")}</Text></PressableScale>
        </View>
      </View>
    );
  }

  // play
  return (
    <View style={pad}>
      {/* Üst satır: çıkış + seviye rozeti. Rozet webde (`session-player`)
          baştan beri var, mobilde hiç yoktu - sayı `meta.coverage` ile
          geliyor ve tip onu tanımıyordu (bkz. web-parity §11.22). */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md }}>
        <PressableScale hitSlop={4} onPress={back.ask} accessibilityLabel={t("game.quit_round")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        <View style={{ flex: 1 }}>
          <LevelBadge level={meta?.level ?? ""} mastered={meta?.coverage?.mastered ?? 0} total={meta?.coverage?.total ?? 0} />
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${Math.round((idx / rounds.length) * 100)}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
        </View>
        {combo >= 3 && <View style={{ flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: colors.info + "22", borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 5 }}><BoltIcon color={colors.info} size={15} /><Text variant="bodyStrong" color={colors.infoText}>{combo}</Text></View>}
        {/* Bu turdaki kelime yeni mi tekrar mı: webde sayacın yanında bir çip
            var, mobilde hiç yoktu. Öğrenci "bunu ilk kez mi görüyorum" diye
            sormuyor artık. */}
        {(() => {
          const r = rounds[idx];
          const ws = r?.words?.length ? r.words : r?.word ? [r.word] : [];
          if (!ws.length) return null;
          const isNew = ws.every((w) => w.isNew);
          const tone = isNew ? colors.primary : colors.streak;
          return (
            <View style={{ backgroundColor: tone + "22", borderRadius: radii.pill, paddingHorizontal: 8, paddingVertical: 3 }}>
              <Text variant="micro" color={onTint(tone, colors)}>{t(isNew ? "session.chip_new" : "session.chip_review").toLocaleUpperCase(dateLocale())}</Text>
            </View>
          );
        })()}
        <Text variant="bodyStrong" color={colors.textMuted}>{idx + 1}/{rounds.length}</Text>
      </View>
      {gameLabel && <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginBottom: spacing.md, textTransform: "uppercase", letterSpacing: 1 }}>{t("game.practice_suffix", { game: gameLabel })}</Text>}
      <RoundView key={rounds[idx]?.id ?? idx} round={rounds[idx]} onDone={onDone} />
      <AmbientPeek />
      <MascotPop trigger={pop} />
      <ConfirmDialog
        visible={back.visible}
        title={t("game.quit_round_2")}
        message={t("game.exit_message")}
        confirmLabel={t("common.exit")}
        cancelLabel={t("common.continue_2")}
        destructive
        onConfirm={() => {
          /* Yarida birakma OLCULUYOR: `session_done` yalnizca bitirenleri
             sayiyor, yani "kac kisi cikiyor ve nerede cikiyor" Androidde
             cevapsizdi. Web `session-player` ayni adi ayni degerle yaziyor. */
          track("session_stop", idxRef.current);
          back.cancel();
          nav.goBack();
        }}
        onCancel={back.cancel}
      />
    </View>
  );
}
