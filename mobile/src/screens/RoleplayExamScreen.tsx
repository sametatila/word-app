import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { t as tx, targetLangName, formatPercent } from "../lib/i18n";
import { Text } from "../ui/Text";
import { AiNotice } from "../ui/AiNotice";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, MicIcon } from "../ui/icons";
import { Mascot } from "../ui/Mascot";
import { CoachBubble } from "../ui/CoachBubble";
import { ProgressRing } from "../ui/ProgressRing";
import { findLesson, type Lesson } from "../data/lessons";
import { sendRoleplay, parseReply, type ChatMsg } from "../game/roleplay";
import { candoIdsForLesson } from "../game/candoMap";
import { fetchCando } from "../game/cando";
import { speakTarget } from "../lib/tts";
import { ensureMicPermission, listenOnce, sttAvailable, stopListening } from "../lib/stt";
import { currentTargetLocale, currentTargetLang } from "../lib/courses";
import { api, ASSESS_ROLEPLAY_TIMEOUT_MS } from "../api/client";
import { assessFailKey, assessFailure } from "../lib/assessFail";
import { notePremiumGate } from "../lib/premium";

import { todayStr } from "../game/session";
import { ERROR_LABEL_KEYS, type ErrorType } from "../lib/errors";
import { AssessmentCard } from "../ui/AssessmentCard";
import { useTheme, spacing, radii, softShadow, cardShadow, type Palette } from "../theme";
import { track } from "../lib/track";
import type { RootStackParams } from "../navigation/RootStack";
import { reduceMotion } from "../lib/reduceMotion";
import { useKeyboardHeight } from "../lib/useKeyboardHeight";

/** Web `lib/lessons/roleplay-const` ile aynı üç sayı. */
export const EXAM_TURNS = 5;
export const EXAM_SECONDS = 180;
/** Geçme eşiği — bütünsel puan yüzdesi; eşiği SÖYLEYEN cümle de bundan besleniyor. */
export const EXAM_PASS_SCORE = 60;

type Turn = { role: "user" | "assistant"; content: string };
type Phase = "intro" | "talk" | "scoring" | "result" | "error";

type Score = { task: number; grammar: number; vocab: number; structure: number; overall: number };
type AssessError = { type: ErrorType; wrong: string; fix: string; why_tr?: string; span?: [number, number] };
/* `praise_tr` ve `next_tip_tr` SUNUCUDAN GELİYORDU ve burada düşüyordu: web
   ikisini de gösteriyor (`roleplay-exam` `AssessmentCard`). */
type Result = { score: Score; errors: AssessError[]; corrected?: string | null; praise_tr?: string | null; next_tip_tr?: string | null };

/**
 * Rol yapma sınavı (WP-22) — aynı sahne, yardım yok, 5 tur, 3 dakika.
 *
 * WEBDE VARDI, ANDROİD'DE YOKTU. Ders oynatıcısının özetinde web "Sınav olarak
 * dene" düğmesini gösteriyor ve `/lessons/[id]/exam` sayfasına gidiyordu;
 * mobilde o yüzey hiç yoktu, yani aynı dersi bitiren iki kullanıcıdan yalnız
 * biri ölçülebiliyordu.
 *
 * Alıştırmadan farkı ölçüm: muhatap düzeltmez, öneri vermez, anadile geçmez
 * (`mode: "exam"` istemi); konuşma bitince öğrencinin BÜTÜN turları tek seferde
 * rubrikle puanlanıyor (`kind: "roleplay"`) ve `assessments`'a yazılıyor.
 *
 * Webden tek yapısal fark: sağlayıcı kapalıyken web kural tabanlı bir yedek
 * puan gösteriyor (`fallbackAssessment`), mobil hiç puan vermiyor - bu ayrım
 * mobilde zaten yerleşik (bkz. `ExamScreen` yazma adımı, `assess.fail_*`) ve
 * ölçülmemiş bir sınavı ölçülmüş gibi göstermemek daha doğru.
 */
export function RoleplayExamScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const kb = useKeyboardHeight();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { id } = useRoute<RouteProp<RootStackParams, "RoleplayExam">>().params;
  const lesson = findLesson(id) as Lesson | undefined;

  const [phase, setPhase] = useState<Phase>("intro");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [asr, setAsr] = useState(false);
  const [left, setLeft] = useState(EXAM_SECONDS);
  const [result, setResult] = useState<Result | null>(null);
  const [gateNote, setGateNote] = useState<string | null>(null);
  const [cando, setCando] = useState<string[]>([]);
  const scored = useRef(false);
  const mounted = useRef(true);
  const scrollRef = useRef<any>(null);
  const userTurns = turns.filter((x) => x.role === "user").length;

  useEffect(() => {
    mounted.current = true;
    sttAvailable().then((ok) => { if (mounted.current) setAsr(ok); });
    return () => { mounted.current = false; stopListening(); };
  }, []);

  /* Yapabilirlik etiketi: kimlikler dersten (`candoMap`), METNİ `/api/cando`dan.
     Web 213 satırlık veri dosyasından okuyor; mobil o listeyi zaten çekiyor. */
  useEffect(() => {
    if (!lesson) return;
    const want = candoIdsForLesson(lesson);
    if (!want.length) return;
    fetchCando()
      .then((d) => {
        if (!mounted.current) return;
        const byId = new Map(d.items.map((it) => [it.cando.id, it.cando.tr]));
        setCando(want.map((c) => byId.get(c)).filter((x): x is string => Boolean(x)));
      })
      .catch(() => { /* etiket bir süs; alınamazsa satır çizilmez */ });
  }, [lesson]);

  const score = useCallback(async (all: Turn[]) => {
    if (scored.current || !lesson) return;
    scored.current = true;
    setPhase("scoring");
    const said = all.filter((x) => x.role === "user").map((x) => x.content);
    try {
      const d = await api<{ result: Result }>("/api/assess", {
        method: "POST",
        timeoutMs: ASSESS_ROLEPLAY_TIMEOUT_MS,
        body: JSON.stringify({
          kind: "roleplay",
          level: lesson.level,
          /* ÜRETİMİN DİLİ — zorunlu. İstemci vermezse sunucu "de"ye düşüyor
             (`api/assess` `parseBody`), yani İngilizce kursta yapılan rol
             yapma sınavı ALMANCA rubriğiyle puanlanıyordu. Web aynı çağrıda
             `targetLangOf(lesson.course)` gönderiyor; burada kursun hedef
             dili süreç genelinde kurulu (`lib/courses`). */
          lang: currentTargetLang(),
          task: {
            prompt: `${lesson.roleplay.scene} (Sınav: ${lesson.roleplay.partner} ile konuşma)`,
            targets: lesson.patterns.map((p) => p.de),
            constraints: [`${EXAM_TURNS} tur`, "yardım yok"],
          },
          answer: { text: said.join("\n"), transcript: said },
          exerciseId: `${lesson.id}:exam`,
          /* `day` bir YAZMA anahtarı: değerlendirme satırı o güne yazılıyor ve
             günlük kota o günün satırları sayılarak bulunuyor. */
          day: todayStr(),
        }),
      });
      if (!mounted.current) return;
      setResult(d.result ?? null);
    } catch (e) {
      if (!mounted.current) return;
      setGateNote(tx(assessFailKey(e)));
      // Kilide takılan an ölçülüyor (bkz. lib/premium `notePremiumGate`).
      if (assessFailure(e) === "premium") notePremiumGate("speaking");
      
    }
    track("nav", said.length, "roleplay_exam:done");
    if (mounted.current) setPhase("result");
  }, [lesson]);

  /*
   * Süre: konuşma fazında saniyede bir; sıfırda konuşma biter ve puanlanır.
   *
   * DUVAR SAATİNDEN, SAYICIDAN DEĞİL. Her saniye bir sayıcıyı azaltmak,
   * uygulama arka plana alındığında (webde sekme gizlendiğinde) süreyi
   * durduruyordu: üç dakikalık ölçüm istenildiği kadar uzatılabiliyordu. İki
   * platformda da aynı hata vardı, ikisi birlikte düzeltildi — hayatta kalma
   * turu bunu baştan beri doğru yapıyor (`ChallengeScreen` `deadline`).
   */
  const deadline = useRef(0);

  /*
   * SINAVI BAŞTAN KURAN TEK YER.
   *
   * `deadline` REF'İ DE SIFIRLANMALI. Sayaç `left`ten değil
   * `deadline.current`tan okuyor (`if (!deadline.current)` bir kez kuruyor);
   * yalnızca `setLeft(EXAM_SECONDS)` yazmak ilk tik'te eziliyor ve sınav
   * ANINDA bitiyordu — sonuç ekranındaki "Tekrar dene" tam bu yüzden
   * bozuktu: dokunan kullanıcı sıfır turluk, anında bitmiş bir sınav
   * alıyordu. Hata dalı ve sonuç ekranı artık aynı sıfırlamayı kullanıyor
   * (web `roleplay-exam` `restart` ile birebir).
   */
  const restart = useCallback(() => {
    scored.current = false;
    deadline.current = 0;
    setResult(null);
    setGateNote(null);
    setTurns([]);
    setDraft("");
    setLeft(EXAM_SECONDS);
    setPhase("intro");
  }, []);
  useEffect(() => {
    if (phase !== "talk") return;
    if (!deadline.current) deadline.current = Date.now() + EXAM_SECONDS * 1000;
    const tick = () => setLeft(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [phase]);
  useEffect(() => {
    if (phase === "talk" && left <= 0) void score(turns);
  }, [left, phase, score, turns]);

  if (!lesson) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", padding: spacing.xl }}>
        <Text variant="body" color={colors.textMuted}>{tx("lesson.this_lesson_wasn_t_found")}</Text>
      </View>
    );
  }

  function start() {
    track("nav", 0, "roleplay_exam:start");
    const opening: Turn = { role: "assistant", content: lesson!.roleplay.opening };
    setTurns([opening]);
    setPhase("talk");
    speakTarget(lesson!.roleplay.opening);
  }

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy || phase !== "talk") return;
    setDraft("");
    setBusy(true);
    const next: Turn[] = [...turns, { role: "user", content: clean }];
    setTurns(next);
    const n = next.filter((x) => x.role === "user").length;
    try {
      const raw = await sendRoleplay(lesson!.id, next as ChatMsg[], "exam");
      // Sınav isteminde işaret satırı olmamalı; olursa yine de ayıklanır.
      const body = parseReply(raw).body.trim() || raw.trim();
      const all: Turn[] = [...next, { role: "assistant", content: body }];
      if (!mounted.current) return;
      setTurns(all);
      setBusy(false);
      speakTarget(body);
      if (n >= EXAM_TURNS) setTimeout(() => void score(all), 6000);
    } catch {
      if (!mounted.current) return;
      setBusy(false);
      // İki turdan sonra kopan bağlantı sınavı çöpe atmaz: eldekini puanla.
      if (n >= 2) void score(next);
      else setPhase("error");
    }
  }

  async function listen() {
    if (listening || busy) return;
    if (!(await ensureMicPermission())) { setAsr(false); return; }
    setListening(true);
    try {
      /* Tanıyıcı birkaç aday döndürüyor; sınavda ilki alınıyor - konuşma
         turlarının kendi eşleştiricisi yok, cevap düz metin gidiyor. */
      const heard = (await listenOnce(currentTargetLocale(), 8000))?.[0]?.trim();
      if (!mounted.current) return;
      if (heard) { setDraft(heard); void send(heard); }
    } finally {
      if (mounted.current) setListening(false);
    }
  }

  const mm = Math.floor(Math.max(0, left) / 60);
  const ss = String(Math.max(0, left) % 60).padStart(2, "0");
  const pad = { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.lg, paddingHorizontal: spacing.lg };

  if (phase === "intro") {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={pad}>
        <Back nav={nav} colors={colors} />
        <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, borderWidth: 1, borderColor: colors.hairline, padding: spacing.xl, marginTop: spacing.md }, cardShadow(colors, 10)]}>
          {/* 48 — web ile ayni boy (`lessons/roleplay-exam`) ve mobilin KENDI
              sinav girisiyle de ayni (`ExamScreen` 48). Burada 56 yaziliydi,
              yani hem karsi platformdan hem kardes ekrandan ayrisiyordu. */}
          <CoachBubble moment="exam_intro" mood="think" size={48} />
          <Text accessibilityRole="header" variant="h1" style={{ marginTop: spacing.md }}>{tx("rpexam.title")}</Text>
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>{lesson.title} · {lesson.titleTr}</Text>
          <Text variant="body" style={{ marginTop: spacing.md, lineHeight: 22 }}>{lesson.roleplay.scene}</Text>
          <View style={{ marginTop: spacing.md, gap: 4 }}>
            <Rule colors={colors} text={tx("rpexam.rule_time", { turns: EXAM_TURNS, minutes: EXAM_SECONDS / 60 })} />
            <Rule colors={colors} text={tx("rpexam.rule_partner")} />
            <Rule colors={colors} text={tx("rpexam.rule_scoring")} />
            <Rule colors={colors} text={tx("rpexam.patterns", { list: lesson.patterns.map((p) => p.de).join(" · ") })} />
          </View>
          <PressableScale onPress={start} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", marginTop: spacing.lg }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color={colors.onPrimary}>{tx("exam.start")}</Text>
          </PressableScale>
          <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.md, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{tx("common.discard")}</Text>
          </PressableScale>
        </View>
      </ScrollView>
    );
  }

  if (phase === "scoring") {
    return (
      /* Puanlama beklemesi ekranin tamami ve sessizdi. */
      <View accessibilityLiveRegion="polite" accessibilityRole="progressbar" accessibilityState={{ busy: true }} style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.md, padding: spacing.xl }}>
        {/* DUSUNEN MIRKET, 80 — web ile ayni kip ve ayni boy.
            `idle` neseli bosta-bekleme ve puanlama anini anlatmiyordu; web
            ayni dalda `think` ciziyor (`lessons/roleplay-exam`) ve eslesen
            her maskot yuzeyinde kip de boy da ayni (bkz. check:parity). */}
        <Mascot mood="think" size={80} />
        <ActivityIndicator color={colors.primary} />
        <Text variant="h3">{tx("item.mono_scoring")}</Text>
        <Text variant="caption" color={colors.textMuted}>{tx("rpexam.scoring_note", { n: userTurns })}</Text>
      </View>
    );
  }

  if (phase === "error") {
    return (
      <View accessibilityLiveRegion="assertive" style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.lg, padding: spacing.xl }}>
        <Mascot mood="sad" size={80} />
        <Text variant="body" style={{ textAlign: "center", lineHeight: 22 }}>{tx("rpexam.service_down")}</Text>
        {/* YERİNDE TEKRAR DENEME. Bu dala yalnız muhatap servisi İLK iki turda
            düşünce giriliyor (`send`: `n >= 2` ise konuşma puanlanıyor), yani
            ölçülmüş hiçbir şey YOK — sınav baştan başlayabilir. Tek çıkış
            "konuşmaya dön"dü ve o, geçici bir ağ kesintisinde girişi
            kaybettiriyordu. Aynı gerekçe sınav ekranında yazılı ve webde de
            aynı düzeltme yapıldı. */}
        <PressableScale onPress={restart} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 10)]}>
          <Text variant="h3" color={colors.onPrimary}>{tx("common.try_again")}</Text>
        </PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ borderRadius: radii.lg, backgroundColor: colors.surface2, paddingVertical: 15, paddingHorizontal: spacing.xl }}>
          <Text variant="h3" color={colors.text}>{tx("lessonp.back_to_conversation")}</Text>
        </PressableScale>
      </View>
    );
  }

  if (phase === "result") {
    const said = turns.filter((x) => x.role === "user").map((x) => x.content);
    const errorTexts = (result?.errors ?? []).map((e) => e.wrong.trim().toLowerCase()).filter(Boolean);
    const best = said
      .filter((s) => !errorTexts.some((w) => s.toLowerCase().includes(w)))
      .sort((a, b) => b.length - a.length)
      .slice(0, 2);
    const byType = new Map<ErrorType, number>();
    for (const e of result?.errors ?? []) byType.set(e.type, (byType.get(e.type) ?? 0) + 1);
    const topErrors = [...byType].sort((a, b) => b[1] - a[1]).slice(0, 2);
    const overall = result?.score.overall ?? 0;
    const passed = overall >= EXAM_PASS_SCORE;
    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={pad}>
        <Back nav={nav} colors={colors} />
        <View style={{ alignItems: "center", marginTop: spacing.md }}>
          <CoachBubble moment={passed ? "exam_pass" : "exam_fail"} mood={passed ? "celebrate" : "sad"} vars={{ pct: overall, level: lesson.level }} size={56} />
          {result ? (
            <ProgressRing size={140} stroke={13} pct={overall} track={colors.surface2} from={colors.gradientA[0]} to={colors.gradientA[1]}>
              <Text variant="display" color={colors.primaryText}>{formatPercent(overall)}</Text>
              <Text variant="micro" color={colors.textMuted}>{tx("assess.overall_score", { n: overall })}</Text>
            </ProgressRing>
          ) : null}
          <Text accessibilityLiveRegion="polite" accessibilityRole="header" variant="h1" style={{ marginTop: spacing.md }}>{tx("rpexam.title")}</Text>
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2, textAlign: "center" }}>
            {lesson.title} · {tx("lessonp.n_turns", { n: userTurns })}{result ? ` · ${tx(passed ? "rpexam.passed" : "rpexam.below_threshold", { n: EXAM_PASS_SCORE })}` : ""}
          </Text>
        </View>

        {gateNote ? (
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.lg, lineHeight: 20 }}>{gateNote}</Text>
        ) : null}

        {result ? (
          /* DEĞERLENDİRMENİN ÖĞRETEN KISMI DA GÖSTERİLİYOR. Burada yalnız dört
             rubrik çubuğu vardı: öğrenci "72" görüyor, neyi yanlış yaptığını
             öğrenmiyordu. Kart hataların gerekçesini, düzeltilmiş cümleyi,
             övgüyü ve sıradaki ipucunu da yazıyor — web aynı ekranda baştan
             beri yazıyor. */
          <View style={{ marginTop: spacing.lg }}>
            <AssessmentCard answer={said.join("\n")} result={result} />
          </View>
        ) : null}

        {best.length ? (
          <View style={{ marginTop: spacing.lg }}>
            <Text variant="micro" color={colors.textMuted}>{tx("rpexam.best_sentences")}</Text>
            {best.map((s) => (
              <View key={s} style={{ backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 10, marginTop: 6 }}>
                <Text variant="body">{s}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {result ? (
          topErrors.length ? (
            <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.lg }}>
              {tx("rpexam.most_common")} {topErrors.map(([type, n]) => `${tx(ERROR_LABEL_KEYS[type] ?? "err.meaning")} x${n}`).join(", ")}
            </Text>
          ) : (
            <Text variant="caption" color={colors.successText} style={{ marginTop: spacing.lg }}>{tx("rpexam.no_errors")}</Text>
          )
        ) : null}

        {cando.length ? (
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.lg, lineHeight: 20 }}>
            <Text variant="caption" color={colors.text} style={{ fontWeight: "700" }}>{passed ? tx("lessonp.i_can") : tx("rpexam.goal")} </Text>
            {cando.join(" · ")}
          </Text>
        ) : null}

        <View style={{ marginTop: spacing.xl, gap: spacing.sm }}>
          <PressableScale
            onPress={restart}
            style={{ borderRadius: radii.lg, backgroundColor: colors.surface2, paddingVertical: 15, alignItems: "center" }}
          >
            <Text variant="h3" color={colors.text}>{tx("common.try_again")}</Text>
          </PressableScale>
          <PressableScale onPress={() => nav.goBack()} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color={colors.onPrimary}>{tx("lessonp.back_to_conversation")}</Text>
          </PressableScale>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.md, paddingHorizontal: spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text variant="caption" color={colors.textMuted}>{tx("rpexam.turn_of", { n: Math.min(userTurns + 1, EXAM_TURNS), total: EXAM_TURNS })}</Text>
        <Text variant="bodyStrong" color={left <= 30 ? colors.dangerText : colors.textMuted}>{mm}:{ss}</Text>
      </View>
      <AiNotice variant="character" />
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1, marginTop: spacing.sm }}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: !reduceMotion() })}
        showsVerticalScrollIndicator={false}
      >
        {turns.map((turn, i) => (
          <View
            key={i}
            style={{
              alignSelf: turn.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "88%",
              backgroundColor: turn.role === "user" ? colors.primary : colors.surface2,
              borderRadius: radii.lg,
              /* Kuyruk köşesi konuşan tarafa bakıyor - `CoachBubble` ve ders
                 balonlarıyla aynı biçim. */
              ...(turn.role === "user" ? { borderBottomRightRadius: radii.sm } : { borderBottomLeftRadius: radii.sm }),
              paddingHorizontal: spacing.md,
              paddingVertical: 10,
              marginBottom: spacing.sm,
            }}
          >
            <Text variant="body" color={turn.role === "user" ? colors.onPrimary : colors.text} style={{ lineHeight: 22 }}>{turn.content}</Text>
          </View>
        ))}
        {busy ? <ActivityIndicator color={colors.primary} style={{ alignSelf: "flex-start" }} /> : null}
      </ScrollView>
      {/* KLAVYE ALT ÇUBUĞU ÖRTÜYORDU. Yazma kutusu kaydırma alanının ALTINDA,
          sabit bir çubukta duruyor; edge-to-edge altında (Android 15+/targetSdk 35+)
          pencere `adjustResize` ile küçülmüyor ve iOS'ta zaten böyle bir şey yok,
          yani klavye kutunun üstüne biniyordu — kullanıcı ne yazdığını görmüyor.
          Kalıp turlardan geliyor (`game/rounds` `RoundShell`): çubuğu klavye
          yüksekliği kadar kaldır, güvenli alanı düş, bir de pay ekle (öneri şeridi
          çoğu Android klavyesinde `keyboardDidShow` yüksekliğine dâhil değil). */}
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: spacing.sm, marginBottom: kb > 0 ? Math.max(0, kb - insets.bottom) + spacing.xxl : 0 }}>
        {asr ? (
          <PressableScale
            onPress={() => void listen()}
            disabled={busy || listening}
            accessibilityLabel={tx("lesson.mic_talk")}
            style={[{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }, softShadow(colors.primary, 8)]}
          >
            <MicIcon color={colors.onPrimary} size={20} />
          </PressableScale>
        ) : null}
        <TextInput
          value={draft}
          onChangeText={setDraft}
          editable={!busy}
          multiline
          /* Hedef dilde CUMLE (bkz. `LessonScreen`). Bu alanda hicbiri
             yoktu ve web tarafinda da yoktu; ikisi birlikte duzeltildi. */
          autoCapitalize="sentences"
          autoCorrect={false}
          placeholder={listening ? tx("speak.listening") : asr ? tx("rpexam.speak_or_type") : tx("lesson.type_in", { lang: targetLangName() })}
          accessibilityLabel={listening ? tx("speak.listening") : asr ? tx("rpexam.speak_or_type") : tx("lesson.type_in", { lang: targetLangName() })}
          placeholderTextColor={colors.textFaint}
          style={{ flex: 1, maxHeight: 96, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.md, paddingVertical: 12, color: colors.text, fontSize: 15 }}
        />
        <PressableScale
          onPress={() => void send(draft)}
          disabled={busy || !draft.trim()}
          style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: 13 }, softShadow(colors.primary, 8)]}
        >
          <Text variant="bodyStrong" color={colors.onPrimary}>{tx("common.send")}</Text>
        </PressableScale>
      </View>
    </View>
  );
}

function Back({ nav, colors }: { nav: NativeStackNavigationProp<RootStackParams>; colors: Palette }) {
  return (
    <PressableScale onPress={() => nav.goBack()} hitSlop={6} accessibilityLabel={tx("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
      {/* GERI OKU 24, capraz 22 — uygulamanin kurali bu ve otuz alti karonun
          hepsi ona uyuyor; yalniz burada 22 yaziliydi. */}
      <ArrowBackIcon color={colors.text} size={24} />
    </PressableScale>
  );
}

function Rule({ colors, text }: { colors: Palette; text: string }) {
  return (
    <View style={{ flexDirection: "row", gap: 6 }}>
      <Text variant="caption" color={colors.textFaint}>·</Text>
      <Text variant="caption" color={colors.textMuted} style={{ flex: 1, lineHeight: 19 }}>{text}</Text>
    </View>
  );
}

