import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, ShareIcon } from "../ui/icons";
import { shareResult } from "../lib/share";
import { ProgressRing } from "../ui/ProgressRing";
import { Mascot } from "../ui/Mascot";
import { RoundView } from "../game/rounds";
import { fetchSession, submitAnswers, todayStr, PRACTICE_GAMES, type Round, type SessionMeta, type AnswerOut, type SessionProgress } from "../game/session";
import { ApiError } from "../api/client";
import { track } from "../lib/track";
import { useTheme, spacing, radii, softShadow } from "../theme";

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
  const gameLabel = onlyGame ? PRACTICE_GAMES.find((g) => g.game === onlyGame)?.label ?? null : null;
  const [phase, setPhase] = useState<Phase>("loading");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [meta, setMeta] = useState<SessionMeta | null>(null);
  const [idx, setIdx] = useState(0);
  const [finalCorrect, setFinalCorrect] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
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

  /** Şu ana kadarki ilerleme — cevaplarla gidip sunucu index'ini ilerletir. */
  function progressNow(): SessionProgress {
    return {
      index: idxRef.current,
      correct: resumeBase.current.correct + answers.current.filter((a) => a.correct).length,
      total: resumeBase.current.total + answers.current.length,
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
      submitted.current = false;
      // Yarım kalan turdan devam yalnız karışık turda (pratik taze başlar).
      const r = onlyGame ? null : p.resume;
      const start = r && r.index > 0 && r.index < list.length ? r.index : 0;
      resumeBase.current = { correct: r?.correct ?? 0, total: r?.total ?? 0, xp: r?.xp ?? 0 };
      setRounds(list);
      setMeta(p.meta ?? null);
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
  useEffect(() => { load(); }, []);

  // Yarım kalan turu terk edince (X / donanım geri / kaydırma) toplanan
  // cevapları yaz — web'deki çıkışta-flush (sendBeacon) gibi. Yoksa 15/20'de
  // çıkan kullanıcının emeği ve SRS/XP güncellemesi tümden yok olurdu.
  useEffect(() => {
    return () => {
      if (submitted.current) return;
      const pending = answers.current;
      if (!pending.length) return;
      submitted.current = true;
      const secs = Math.round((Date.now() - startedAt.current) / 1000);
      void submitAnswers(pending, day.current, secs, progressNow()).catch(() => { /* sessizce düşer */ });
    };
  }, []);

  function onDone(ok: boolean, batch?: { wordId: number; correct: boolean }[]) {
    const r = rounds[idx];
    const lat = Math.max(0, Date.now() - roundStart.current);
    if (batch && batch.length && r) {
      // Çok kelimeli tur (match): her kelimenin SRS'i ayrı yazılır.
      for (const b of batch) if (b.wordId) answers.current.push({ wordId: b.wordId, game: r.game, correct: b.correct, latencyMs: lat });
    } else {
      const wordId = r?.word?.id ?? r?.words?.[0]?.id ?? 0;
      if (wordId && r) answers.current.push({ wordId, game: r.game, correct: ok, latencyMs: lat });
    }
    roundStart.current = Date.now();
    const next = idx + 1;
    idxRef.current = next;
    if (next >= rounds.length) void finish();
    else setIdx(next);
  }

  async function finish() {
    const totalCorrect = resumeBase.current.correct + answers.current.filter((a) => a.correct).length;
    setFinalCorrect(totalCorrect);
    setFinalTotal(resumeBase.current.total + answers.current.length);
    setPhase("done");
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    track("session_done", totalCorrect, "session");
    if (submitted.current) return;
    submitted.current = true;
    try { if (answers.current.length) await submitAnswers(answers.current, day.current, secs, progressNow()); } catch { /* ölçüm/yazma sessizce düşer */ }
  }

  const pad = { flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg } as const;

  if (phase === "loading") {
    return <View style={[pad, { alignItems: "center", justifyContent: "center" }]}><ActivityIndicator size="large" color={colors.primary} /><Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.lg }}>Turun hazırlanıyor...</Text></View>;
  }

  if (phase === "auth") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="display" style={{ textAlign: "center" }}>Gerçek turun için giriş yap</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md, marginBottom: spacing.xxl }}>Kendi kelimelerin ve ilerlemenle oyna — her şey hesabında kaydolur.</Text>
        <PressableScale onPress={() => { nav.goBack(); nav.navigate("Auth"); }} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
          <Text variant="h3" color="#fff">Giriş yap / Kayıt ol</Text>
        </PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>Kapat</Text></PressableScale>
      </View>
    );
  }

  if (phase === "error") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="h2" style={{ textAlign: "center" }}>Tur yüklenemedi</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm, marginBottom: spacing.xxl }}>Bağlantını kontrol edip tekrar dene.</Text>
        <PressableScale onPress={load} style={[{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, paddingHorizontal: spacing.xxl, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="h3" color="#fff">Tekrar dene</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>Kapat</Text></PressableScale>
      </View>
    );
  }

  if (phase === "done") {
    const total = finalTotal;
    const pct = total ? Math.round((finalCorrect / total) * 100) : 0;
    return (
      <View style={pad}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          {total > 0 ? <Mascot mood={pct >= 60 ? "celebrate" : "happy"} size={104} /> : <Mascot mood="idle" size={104} />}
          <ProgressRing size={150} stroke={14} pct={pct} track={colors.surface2} from={colors.gradientA[0]} to={colors.gradientA[1]}>
            <Text variant="display" color={colors.primary}>{finalCorrect}/{total || 0}</Text>
            <Text variant="micro" color={colors.textMuted}>doğru</Text>
          </ProgressRing>
          <Text variant="h1" style={{ marginTop: spacing.xl }}>{total ? "Tur bitti!" : "Bugünlük bu kadar"}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: spacing.xxl, textAlign: "center" }}>
            {total ? "İlerlemen kaydedildi." : "Şu an tekrar edilecek kelime yok — yarın yeniden gel."}
          </Text>
          <PressableScale onPress={load} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}><Text variant="bodyStrong" color="#fff">Devam et</Text></PressableScale>
          {total > 0 && (
            <PressableScale onPress={() => shareResult(finalCorrect, total)} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8, marginTop: spacing.md, borderWidth: 1.5, borderColor: colors.border }}>
              <ShareIcon color={colors.text} size={19} /><Text variant="bodyStrong" color={colors.text}>Paylaş</Text>
            </PressableScale>
          )}
          <PressableScale onPress={() => nav.goBack()} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.md }}><Text variant="bodyStrong" color={colors.textMuted}>Bitir</Text></PressableScale>
        </View>
      </View>
    );
  }

  // play
  return (
    <View style={pad}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${Math.round((idx / rounds.length) * 100)}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
        </View>
        <Text variant="bodyStrong" color={colors.textMuted}>{idx + 1}/{rounds.length}</Text>
      </View>
      {gameLabel && <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginBottom: spacing.md, textTransform: "uppercase", letterSpacing: 1 }}>{gameLabel} · pratik</Text>}
      <RoundView key={rounds[idx]?.id ?? idx} round={rounds[idx]} onDone={onDone} />
    </View>
  );
}
