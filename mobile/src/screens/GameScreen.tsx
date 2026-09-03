import React, { useEffect, useRef, useState } from "react";
import { t } from "../lib/i18n";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, ShareIcon, BoltIcon } from "../ui/icons";
import { shareResult } from "../lib/share";
import { MascotPop } from "../ui/MascotPop";
import { AmbientPeek } from "../ui/AmbientMascot";
import { ProgressRing } from "../ui/ProgressRing";
import { Mascot } from "../ui/Mascot";
import { Celebrate } from "../ui/Celebrate";
import { RoundView } from "../game/rounds";
import { fetchSession, submitAnswers, todayStr, PRACTICE_GAMES, type Round, type AnswerOut, type SessionProgress } from "../game/session";
import { ApiError } from "../api/client";
import { track } from "../lib/track";
import { sfx } from "../lib/sfx";
import { RoundSkeleton } from "../game/RoundSkeleton";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { useBackConfirm } from "../lib/useBackConfirm";

type Phase = "loading" | "auth" | "error" | "play" | "done";

/**
 * GERÇEK kelime turu — Neon verisiyle. /api/session'dan gerçek turları çeker
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
  const [idx, setIdx] = useState(0);
  const [finalCorrect, setFinalCorrect] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
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
  // Gösterim TUR-bazlı: üstteki sayaç idx/rounds.length (tur) sayıyor; done da tur saysın.
  // (answers KELİME sayar — match turu 1 tur ama 4 kelime; SRS için doğru, ama done'da 20→24
  //  gösterirdi. roundsSeen/Right yalnız gösterim için; SRS/XP hâlâ answers'tan.)
  const roundsSeen = useRef(0);
  const roundsRight = useRef(0);
  // Yarım turdan çıkış onaylı (donanım geri + X): cevaplar unmount'ta zaten yazılıyor,
  // ama kullanıcı yanlışlıkla çıkıp turu bölmesin.
  const back = useBackConfirm(phase === "play");

  /** Şu ana kadarki ilerleme — cevaplarla gidip sunucu index'ini ilerletir. */
  function progressNow(): SessionProgress {
    return {
      index: idxRef.current,
      correct: resumeBase.current.correct + roundsRight.current,
      total: resumeBase.current.total + roundsSeen.current,
      xp: resumeBase.current.xp,
    };
  }

  async function load() {
    setPhase("loading");
    try {
      // Tek-oyun pratiği hep taze başlar; karışık Günlük tur normal yüklenir.
      let p = await fetchSession(day.current, onlyGame ? { game: onlyGame, fresh: true } : undefined);
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
      setRounds(list);
      idxRef.current = start;
      setIdx(start);
      startedAt.current = Date.now();
      roundStart.current = Date.now();
      track("session_start", 0, onlyGame ? "practice" : "session");
      if (list.length === 0) { setFinalCorrect(0); setFinalTotal(0); setPhase("done"); }
      else setPhase("play");
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
  useEffect(() => {
    // Ref NESNELERİ kopyalanır, .current değil: temizlik çıkış anındaki canlı
    // değerleri okur (mount'taki kopya boş cevap listesi olurdu).
    const submittedRef = submitted;
    const answersRef = answers;
    const startedRef = startedAt;
    const dayRef = day;
    return () => {
      if (submittedRef.current) return;
      const pending = answersRef.current;
      if (!pending.length) return;
      submittedRef.current = true;
      const secs = Math.round((Date.now() - startedRef.current) / 1000);
      void submitAnswers(pending, dayRef.current, secs, progressNow()).catch(() => { /* sessizce düşer */ });
    };
  }, []);

  function onDone(ok: boolean, batch?: { wordId: number; correct: boolean }[]) {
    if (idxRef.current !== idx) return; // çift "Devam" / geç tıklama koruması
    const r = rounds[idx];
    const lat = Math.max(0, Date.now() - roundStart.current);
    if (batch && batch.length && r) {
      // Çok kelimeli tur (match): her kelimenin SRS'i ayrı yazılır.
      for (const b of batch) if (b.wordId) answers.current.push({ wordId: b.wordId, game: r.game, correct: b.correct, latencyMs: lat });
    } else {
      const wordId = r?.word?.id ?? r?.words?.[0]?.id ?? 0;
      if (wordId && r) answers.current.push({ wordId, game: r.game, correct: ok, latencyMs: lat });
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
    if (total > 0) sfx("finish"); // tamamlanma sesi (Duolingo tarzı bitiş)
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    track("session_done", totalCorrect, "session");
    if (submitted.current) return;
    submitted.current = true;
    try { if (answers.current.length) await submitAnswers(answers.current, day.current, secs, progressNow()); } catch { /* ölçüm/yazma sessizce düşer */ }
  }

  const pad = { flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg } as const;

  if (phase === "loading") return <RoundSkeleton label={!!gameLabel} />;

  if (phase === "auth") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="display" style={{ textAlign: "center" }}>{t("game.ilerlemeni_kaydetmek_icin_giris_yap")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md, marginBottom: spacing.xxl }}>{t("game.giris_yapinca_kendi_kelimelerinle_calisirsin")}</Text>
        <PressableScale onPress={() => { nav.goBack(); nav.navigate("Auth"); }} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
          <Text variant="h3" color="#fff">{t("game.giris_yap_kayit_ol")}</Text>
        </PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.kapat")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "error") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="h2" style={{ textAlign: "center" }}>{t("game.tur_yuklenemedi")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm, marginBottom: spacing.xxl }}>{t("game.baglantini_kontrol_edip_tekrar_dene")}</Text>
        <PressableScale onPress={load} style={[{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, paddingHorizontal: spacing.xxl, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="h3" color="#fff">{t("game.tekrar_dene")}</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.kapat")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "done") {
    const total = finalTotal;
    const pct = total ? Math.round((finalCorrect / total) * 100) : 0;
    return (
      <View style={pad}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.geri")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Celebrate show={total > 0 && pct >= 60} />
          {total > 0 ? <Mascot mood={pct >= 60 ? "celebrate" : "happy"} size={104} /> : <Mascot mood="idle" size={104} />}
          <ProgressRing size={150} stroke={14} pct={pct} track={colors.surface2} from={colors.gradientA[0]} to={colors.gradientA[1]}>
            <Text variant="display" color={colors.primary}>{finalCorrect}/{total || 0}</Text>
            <Text variant="micro" color={colors.textMuted}>{t("game.dogru")}</Text>
          </ProgressRing>
          <Text variant="h1" style={{ marginTop: spacing.xl }}>{total ? "Tur bitti!" : "Bugünlük bu kadar"}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: spacing.xxl, textAlign: "center" }}>
            {total ? "İlerlemen kaydedildi." : "Şu an tekrar edilecek kelime yok — yarın yeniden gel."}
          </Text>
          <PressableScale onPress={load} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}><Text variant="bodyStrong" color="#fff">{t("game.devam_et")}</Text></PressableScale>
          {total > 0 && (
            <PressableScale onPress={() => shareResult(finalCorrect, total)} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8, marginTop: spacing.md, borderWidth: 1.5, borderColor: colors.border }}>
              <ShareIcon color={colors.text} size={19} /><Text variant="bodyStrong" color={colors.text}>{t("common.paylas")}</Text>
            </PressableScale>
          )}
          <PressableScale onPress={() => nav.goBack()} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.md }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.bitir")}</Text></PressableScale>
        </View>
      </View>
    );
  }

  // play
  return (
    <View style={pad}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <PressableScale hitSlop={4} onPress={back.ask} accessibilityLabel={t("game.turdan_cik")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${Math.round((idx / rounds.length) * 100)}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
        </View>
        {combo >= 3 && <View style={{ flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: colors.info + "22", borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 5 }}><BoltIcon color={colors.info} size={15} /><Text variant="bodyStrong" color={colors.info}>{combo}</Text></View>}
        <Text variant="bodyStrong" color={colors.textMuted}>{idx + 1}/{rounds.length}</Text>
      </View>
      {gameLabel && <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginBottom: spacing.md, textTransform: "uppercase", letterSpacing: 1 }}>{gameLabel} · pratik</Text>}
      <RoundView key={rounds[idx]?.id ?? idx} round={rounds[idx]} onDone={onDone} />
      <AmbientPeek />
      <MascotPop trigger={pop} />
      <ConfirmDialog
        visible={back.visible}
        title={t("game.turdan_cik_2")}
        message="Cevapladıkların kaydedilir; kalan turlara sonra devam edersin."
        confirmLabel="Çık"
        cancelLabel="Devam et"
        destructive
        onConfirm={() => { back.cancel(); nav.goBack(); }}
        onCancel={back.cancel}
      />
    </View>
  );
}
