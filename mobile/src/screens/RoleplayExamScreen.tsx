import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, TextInput, ActivityIndicator } from "react-native";
import { KeyboardAwareScroll } from "../ui/KeyboardAwareScroll";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { t as tx, targetLangName, formatPercent } from "../lib/i18n";
import { Text } from "../ui/Text";
import { AiNotice } from "../ui/AiNotice";
import { PressableScale } from "../ui/PressableScale";
import { MicIcon, ChatIcon, ClockIcon, LockIcon, TargetIcon, AlertIcon, CheckIcon } from "../ui/icons";
import { CoachLine } from "../ui/CoachLine";
import { FlowScreen, FlowActions, FlowTopBar, FlowNote, ContentLoadingBody, ResultHero, StatRow, DetailCard, DetailRow, CoverBody, StateBody } from "../ui/flow";
import { ensureLessons, findLesson, lessonLevelOf, type Lesson } from "../data/lessons";
import { sendRoleplay, parseReply, type ChatMsg } from "../game/roleplay";
import { candoIdsForLesson } from "../game/candoMap";
import { fetchCando } from "../game/cando";
import { speakTarget } from "../lib/tts";
import { ensureMicPermission, listenOnce, sttAvailable, stopListening } from "../lib/stt";
import { currentTargetLocale, currentTargetLang } from "../lib/courses";
import { api, ASSESS_ROLEPLAY_TIMEOUT_MS } from "../api/client";
import { assessFailKey, assessFailure } from "../lib/assessFail";
import { isAiConsentDeclined } from "../lib/aiConsent";
import { notePremiumGate } from "../lib/premium";

import { todayStr } from "../game/session";
import { ERROR_LABEL_KEYS, type ErrorType } from "../lib/errors";
import { AssessmentCard } from "../ui/AssessmentCard";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { track } from "../lib/track";
import type { RootStackParams } from "../navigation/RootStack";
import { reduceMotion } from "../lib/reduceMotion";
import { useKeyboardLift } from "../lib/useKeyboardHeight";
import { useAuth } from "../lib/AuthContext";

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
  const guest = Boolean(useAuth().user?.guest);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  /* Konuşma ekranının kökü ölçülüyor: alt kenarı klavyeyle oynamıyor
     (bkz. `useKeyboardLift`). */
  const rootRef = useRef<React.ComponentRef<typeof View>>(null);
  const kbLift = useKeyboardLift(rootRef, spacing.sm);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { id } = useRoute<RouteProp<RootStackParams, "RoleplayExam">>().params;
  /* Dersin seviye paketi inmemişse burada iniyor (bkz. `data/lessons`). */
  const [lesson, setLesson] = useState<Lesson | undefined>(() => findLesson(id) as Lesson | undefined);
  /* Paket inmeden "bulunamadı" denmiyor (bkz. ui/flow `ContentLoadingBody`). */
  const [packReady, setPackReady] = useState(() => !!findLesson(id));
  /* Paket inemediyse "ders bulunamadı" değil "indirilemedi" deniyor. */
  const [packFailed, setPackFailed] = useState(false);
  useEffect(() => {
    const level = lessonLevelOf(id);
    if (!level) { setPackReady(true); return; }
    let dead = false;
    void ensureLessons(level).then((ok) => {
      if (dead) return;
      setLesson(findLesson(id) as Lesson | undefined);
      setPackFailed(!ok);
      setPackReady(true);
    });
    return () => { dead = true; };
  }, [id]);

  const [phase, setPhase] = useState<Phase>("intro");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [asr, setAsr] = useState(false);
  const [left, setLeft] = useState(EXAM_SECONDS);
  const [result, setResult] = useState<Result | null>(null);
  const [gateNote, setGateNote] = useState<string | null>(null);
  /**
   * Muhatap cevap vermedi çünkü yapay zekâya izin verilmedi — servis kapalı
   * DEĞİL. Sınav senaryoyla yürüyemiyor (sayılmazdı), ama sebep doğru
   * söylenmeli ve nereden açılacağı belli olmalı (web `roleplay-exam` ile aynı).
   */
  const [consentOff, setConsentOff] = useState(false);
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
    setConsentOff(false);
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

  if (!lesson && !packReady) {
    return <FlowScreen top={<FlowTopBar back onClose={() => nav.goBack()} />}><ContentLoadingBody /></FlowScreen>;
  }
  if (!lesson) {
    return (
      /* DURUM ŞABLONU. Burada yalnız ortada tek satır metin vardı: ne maskot
         ne bir çıkış yolu; geri dönmenin tek yolu donanım tuşuydu. */
      <FlowScreen
        center
        top={<FlowTopBar back onClose={() => nav.goBack()} />}
        actions={<FlowActions primary={{ label: tx("item.go_back"), onPress: () => nav.goBack() }} />}
      >
        <StateBody alert title={packFailed ? tx("content.couldn_t_load") : tx("lesson.this_lesson_wasn_t_found")} body={packFailed ? tx("social.err_offline") : null} />
      </FlowScreen>
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
    } catch (e) {
      if (!mounted.current) return;
      setBusy(false);
      /* İzin ekranında "hayır" dendiyse ya da daha önce denmişse cümle
         sağlayıcıya gitmedi. Akış öteki arızalarla aynı; değişen yalnız cümle. */
      if (isAiConsentDeclined(e)) setConsentOff(true);
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

  if (phase === "intro") {
    return (
      /* KAPAK ŞABLONU (ui/flow): ikon karosu · dersin adı · sınavın adı ·
         sahne · ikonlu kurallar · kalıplar kartı · altta Başla / Vazgeç.
         Kurallar "·" ile başlayan soluk satırlardı ve kalıplar da o listenin
         dördüncü "kuralı" gibi okunuyordu. */
      <FlowScreen
        top={<FlowTopBar back onClose={() => nav.goBack()} />}
        actions={guest
          /* MİSAFİR: sınavın muhatabı ve puanı yapay zekâ; ikisi de hesap istiyor
             (mağaza ön inceleme B24). Başla yerine hesap oluşturma. */
          ? <FlowActions primary={{ label: tx("guest.create_account"), onPress: () => nav.navigate("Auth") }} tertiary={{ label: tx("common.discard"), onPress: () => nav.goBack() }} />
          : <FlowActions primary={{ label: tx("exam.start"), onPress: start }} tertiary={{ label: tx("common.discard"), onPress: () => nav.goBack() }} />}
      >
        {/* 48 — web ile ayni boy (`lessons/roleplay-exam`) ve mobilin KENDI
            sinav girisiyle de ayni (`ExamScreen` 48). */}
        <CoachLine moment="exam_intro" />
        <CoverBody
          icon={ChatIcon}
          tint={colors.primary}
          /* Dersin adı hedef dilde; üst satır büyük harf ve Türkçe yerelde
             "i" → "İ" oluyordu. JS `toUpperCase` yerelden bağımsız. */
          eyebrow={`${lesson.title.toUpperCase()} · ${lesson.titleTr}`}
          title={tx("rpexam.title")}
          pitch={lesson.roleplay.scene}
          rules={[
            { icon: ClockIcon, text: tx("rpexam.rule_time", { turns: EXAM_TURNS, minutes: EXAM_SECONDS / 60 }) },
            { icon: LockIcon, text: tx("rpexam.rule_partner") },
            { icon: TargetIcon, text: tx("rpexam.rule_scoring") },
          ]}
        >
          {guest ? <FlowNote icon={<LockIcon color={colors.textMuted} size={16} />} text={tx("guest.ai_exam")} /> : null}
          {lesson.patterns.length ? (
            <DetailCard title={tx("rpexam.patterns_title")}>
              {lesson.patterns.map((p) => <DetailRow key={p.de} left={p.de} right={p.tr} />)}
            </DetailCard>
          ) : null}
        </CoverBody>
      </FlowScreen>
    );
  }

  if (phase === "scoring") {
    return (
      /* Puanlama beklemesi ekranin tamami ve sessizdi. DURUM ŞABLONU: DUSUNEN
         MIRKET — `idle` neseli bosta-bekleme ve puanlama anini anlatmiyordu;
         web ayni dalda `think` ciziyor. Ilerleme rolu ve mesgul durumu kapta. */
      <FlowScreen center>
        <View accessibilityRole="progressbar" accessibilityState={{ busy: true }}>
          <StateBody title={tx("item.mono_scoring")} body={tx("rpexam.scoring_note", { n: userTurns })}>
            <ActivityIndicator color={colors.primary} />
          </StateBody>
        </View>
      </FlowScreen>
    );
  }

  if (phase === "error") {
    return (
      /* YERİNDE TEKRAR DENEME. Bu dala yalnız muhatap servisi İLK iki turda
         düşünce giriliyor (`send`: `n >= 2` ise konuşma puanlanıyor), yani
         ölçülmüş hiçbir şey YOK — sınav baştan başlayabilir. Tek çıkış
         "konuşmaya dön"dü ve o, geçici bir ağ kesintisinde girişi
         kaybettiriyordu. İzin verilmediyse servis kapalı DEĞİL: sebep kendi
         cümlesiyle söyleniyor (bkz. `consentOff`). */
      <FlowScreen
        center
        actions={<FlowActions primary={{ label: tx("common.try_again"), onPress: restart }} tertiary={{ label: tx("lessonp.back_to_conversation"), onPress: () => nav.goBack() }} />}
      >
        <StateBody alert title={tx("rpexam.cant_run")} body={!consentOff ? tx("rpexam.service_down") : tx("assess.fail_consent")} />
      </FlowScreen>
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
    /* Eşiğin altındaysa birincil düğme "Tekrar dene". Puanlanamadıysa
       (servis/kota) tekrar denemek aynı kapıya çarpar; orada birincil çıkış
       konuşmaya dönmek. */
    const retryFirst = !!result && !passed;
    const retry = { label: tx("common.try_again"), onPress: restart };
    const leave = { label: tx("lessonp.back_to_conversation"), onPress: () => nav.goBack() };
    return (
      /*
        SONUÇ ŞABLONU (ui/flow): band → üç sayı → notlar → ayrıntı kartları →
        altta sabit düğmeler. Halka kalktı: bandın ana sayısı aynı bilgiyi
        veriyor. Konfeti yalnız geçince.
      */
      <FlowScreen
        celebrate={passed}
        top={<FlowTopBar back onClose={() => nav.goBack()} />}
        actions={<FlowActions primary={retryFirst ? retry : leave} tertiary={retryFirst ? leave : retry} />}
      >
        <ResultHero
          eyebrow={tx("rpexam.title")}
          title={result ? tx(passed ? "exam.passed" : "exam.not_passed") : tx("rpexam.not_scored")}
          figure={result ? formatPercent(overall) : null}
          sub={`${lesson.title} · ${tx("lessonp.n_turns", { n: userTurns })}`}
          /* Puanlandıysa Erdi bandın ALTINDA konuşuyor (koç balonu). */
          pill={result ? { text: tx("rpexam.below_threshold", { n: EXAM_PASS_SCORE }), tone: passed ? "ok" : "bad" } : null}
          quiet={!passed}
        />
        {result ? <CoachLine moment={passed ? "exam_pass" : "exam_fail"} vars={{ pct: overall, level: lesson.level }} /> : null}
        {result ? (
          <StatRow items={[
            { value: String(userTurns), label: tx("rpexam.stat_turns") },
            { value: `${result.score.task}/4`, label: tx("assess.task") },
            { value: String(result.errors.length), label: tx("rpexam.stat_errors"), tone: result.errors.length ? null : "ok" },
          ]} />
        ) : null}

        {/* Tek satırlık notlar: puanlanamama sebebi, en sık hata, yapabilirlik. */}
        {gateNote ? <FlowNote tone="bad" icon={<AlertIcon color={colors.dangerText} size={16} />} text={gateNote} /> : null}
        {result ? (
          topErrors.length ? (
            <FlowNote icon={<AlertIcon color={colors.textMuted} size={16} />} text={`${tx("rpexam.most_common")} ${topErrors.map(([type, n]) => `${tx(ERROR_LABEL_KEYS[type] ?? "err.meaning")} x${n}`).join(", ")}`} />
          ) : (
            <FlowNote tone="ok" icon={<CheckIcon color={colors.successText} size={16} />} text={tx("rpexam.no_errors")} />
          )
        ) : null}
        {cando.length ? (
          <FlowNote
            tone={passed ? "ok" : "neutral"}
            icon={passed ? <CheckIcon color={colors.successText} size={16} /> : <TargetIcon color={colors.textMuted} size={16} />}
            text={`${passed ? tx("lessonp.i_can") : tx("rpexam.goal")} ${cando.join(" · ")}`}
          />
        ) : null}

        {result ? (
          /* DEĞERLENDİRMENİN ÖĞRETEN KISMI DA GÖSTERİLİYOR. Burada yalnız dört
             rubrik çubuğu vardı: öğrenci "72" görüyor, neyi yanlış yaptığını
             öğrenmiyordu. Kart hataların gerekçesini, düzeltilmiş cümleyi,
             övgüyü ve sıradaki ipucunu da yazıyor. */
          <DetailCard title={tx("rpexam.assessment_title")}>
            <AssessmentCard answer={said.join("\n")} result={result} />
          </DetailCard>
        ) : null}

        {best.length ? (
          <DetailCard title={tx("rpexam.best_sentences")}>
            {best.map((s) => (
              <View key={s} style={{ backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 10 }}>
                <Text variant="body">{s}</Text>
              </View>
            ))}
          </DetailCard>
        ) : null}
      </FlowScreen>
    );
  }

  return (
    <View ref={rootRef} collapsable={false} style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.md, paddingHorizontal: spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text variant="caption" color={colors.textMuted}>{tx("rpexam.turn_of", { n: Math.min(userTurns + 1, EXAM_TURNS), total: EXAM_TURNS })}</Text>
        <Text variant="bodyStrong" color={left <= 30 ? colors.dangerText : colors.textMuted}>{mm}:{ss}</Text>
      </View>
      <AiNotice variant="character" />
      <KeyboardAwareScroll
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
            <Text variant="body" color={turn.role === "user" ? colors.onPrimary : colors.text}>{turn.content}</Text>
          </View>
        ))}
        {busy ? <ActivityIndicator color={colors.primary} style={{ alignSelf: "flex-start" }} /> : null}
      </KeyboardAwareScroll>
      {/* KLAVYE ALT ÇUBUĞU ÖRTÜYORDU. Yazma kutusu kaydırma alanının ALTINDA,
          sabit bir çubukta duruyor; edge-to-edge altında (Android 15+/targetSdk 35+)
          pencere `adjustResize` ile küçülmüyor ve iOS'ta zaten böyle bir şey yok,
          yani klavye kutunun üstüne biniyordu — kullanıcı ne yazdığını görmüyor.
          Pay kökün ölçülen alt kenarından geliyor (`useKeyboardLift`); kökün
          kendi alt dolgusu zaten klavyenin altında kaldığı için düşülüyor. */}
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: spacing.sm, marginBottom: Math.max(0, kbLift - insets.bottom - spacing.md) }}>
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
          /* Enter = Gönder (ders ekranıyla aynı; bkz. `LessonScreen` `TypedRow`). */
          submitBehavior="submit"
          returnKeyType="send"
          onSubmitEditing={() => void send(draft)}
          /* Hedef dilde CUMLE (bkz. `LessonScreen`). Bu alanda hicbiri
             yoktu ve web tarafinda da yoktu; ikisi birlikte duzeltildi. */
          autoCapitalize="sentences"
          autoCorrect={false}
          placeholder={listening ? tx("speak.listening") : asr ? tx("rpexam.speak_or_type") : tx("lesson.type_in", { lang: targetLangName() })}
          accessibilityLabel={listening ? tx("speak.listening") : asr ? tx("rpexam.speak_or_type") : tx("lesson.type_in", { lang: targetLangName() })}
          placeholderTextColor={colors.textFaint}
          style={{ flex: 1, maxHeight: 96, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.md, paddingVertical: spacing.md, color: colors.text, fontSize: 15 }}
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
