import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, TextInput, ActivityIndicator } from "react-native";
import { KeyboardAwareScroll } from "../ui/KeyboardAwareScroll";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { t as tx, targetLangName, formatPercent } from "../lib/i18n";
import { Text } from "../ui/Text";
import { AiNotice } from "../ui/AiNotice";
import { PressableScale } from "../ui/PressableScale";
import { ConversationIcon, CorrectIcon, DurationIcon, LockedIcon, NoGoingBackIcon, ScoreTargetIcon, SendIcon, SkillSpeakingIcon, WarningIcon } from "../ui/icons";
import { CoachLine } from "../ui/CoachLine";
import { FlowScreen, FlowActions, FlowNote, ResultHero, StatRow, DetailCard, DetailRow, CoverBody, StateBody } from "../ui/flow";
import { CoverSkeleton, coverCoach } from "../game/RoundSkeleton";
import { skeletonFiller } from "../ui/Skeleton";
import { ensureConversations, findConversation, conversationLevelOf, type Conversation } from "../data/conversations";
import { nativeContentReady, useNativeContentVersion, waitNativeContent } from "../lib/nativeContent";
import { sendChat, parseReply, type ChatMsg } from "../game/chat";
import { candoIdsForConversation } from "../game/candoMap";
import { useCandoLabels } from "../game/cando";
import { speakTarget } from "../lib/tts";
import { ensureMicPermission, listenOnce, sttAvailable, stopListening } from "../lib/stt";
import { currentTargetLocale, currentTargetLang } from "../lib/courses";
import { api, ApiError, ASSESS_CHAT_TIMEOUT_MS } from "../api/client";
import { assessFailKey, assessFailure } from "../lib/assessFail";
import { isAiConsentDeclined } from "../lib/aiConsent";
import { notePremiumGate, refreshPremium, usePremiumStatus } from "../lib/premium";
import { tieredCopy } from "../lib/unlock";
import { UnlockProgress } from "../ui/UnlockProgress";
import { MicPulse, TypingDots } from "../ui/ConversationFx";
import { sfx } from "../lib/sfx";

import { todayStr } from "../game/session";
import { ERROR_LABEL_KEYS, type ErrorType } from "../lib/errors";
import { AssessmentCard } from "../ui/AssessmentCard";
import { ReportLink, assessmentRef } from "../ui/ReportLink";
import { ReportFlag } from "../ui/ReportFlag";
import { useTheme, spacing, radii, softShadow, ds } from "../theme";
import { track } from "../lib/track";
import type { RootStackParams } from "../navigation/RootStack";
import { reduceMotion } from "../lib/reduceMotion";
import { useKeyboardLift } from "../lib/useKeyboardHeight";
import { useAuth } from "../lib/AuthContext";

/** Web `lib/conversations/chat-const` ile aynı üç sayı. */
export const SCORED_TURNS = 5;
export const SCORED_SECONDS = 180;
/** Geçme eşiği — bütünsel puan yüzdesi; eşiği SÖYLEYEN cümle de bundan besleniyor. */
export const SCORED_PASS_SCORE = 60;

type Turn = { role: "user" | "assistant"; content: string };
type Phase = "intro" | "talk" | "scoring" | "result" | "error" | "locked";

type Score = { task: number; grammar: number; vocab: number; structure: number; overall: number };
type AssessError = { type: ErrorType; wrong: string; fix: string; why_tr?: string; span?: [number, number] };
/* `praise_tr` ve `next_tip_tr` SUNUCUDAN GELİYORDU ve burada düşüyordu: web
   ikisini de gösteriyor (`conversation-scored` `AssessmentCard`). */
type Result = { score: Score; errors: AssessError[]; corrected?: string | null; praise_tr?: string | null; next_tip_tr?: string | null };

/**
 * Puanlı kısım (WP-22) — aynı sahne, yardım yok, 5 tur, 3 dakika.
 *
 * WEBDE VARDI, ANDROİD'DE YOKTU. Konuşma oynatıcısının özetinde web "Sınav olarak
 * dene" düğmesini gösteriyor ve `/conversations/[id]/scored` sayfasına gidiyordu;
 * mobilde o yüzey hiç yoktu, yani aynı konuşmayı bitiren iki kullanıcıdan yalnız
 * biri ölçülebiliyordu.
 *
 * Alıştırmadan farkı ölçüm: muhatap düzeltmez, öneri vermez, anadile geçmez
 * (`mode: "scored"` istemi); konuşma bitince öğrencinin BÜTÜN turları tek seferde
 * rubrikle puanlanıyor (`kind: "chat"`) ve `assessments`'a yazılıyor.
 *
 * Webden tek yapısal fark: sağlayıcı kapalıyken web kural tabanlı bir yedek
 * puan gösteriyor (`fallbackAssessment`), mobil hiç puan vermiyor - bu ayrım
 * mobilde zaten yerleşik (bkz. `ExamScreen` yazma adımı, `assess.fail_*`) ve
 * ölçülmemiş bir sınavı ölçülmüş gibi göstermemek daha doğru.
 */
export function ConversationScoredScreen() {
  const guest = Boolean(useAuth().user?.guest);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  /* Konuşma ekranının kökü ölçülüyor: alt kenarı klavyeyle oynamıyor
     (bkz. `useKeyboardLift`). */
  const rootRef = useRef<React.ComponentRef<typeof View>>(null);
  const kbLift = useKeyboardLift(rootRef, spacing.sm);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { id } = useRoute<RouteProp<RootStackParams, "ConversationScored">>().params;
  const { status: premiumStatus } = usePremiumStatus();
  /* Konuşmanın seviye paketi inmemişse burada iniyor (bkz. `data/conversations`). */
  const [conversation, setConversation] = useState<Conversation | undefined>(() => findConversation(id) as Conversation | undefined);
  /* Paket inmeden "bulunamadı" denmiyor (bkz. ui/flow `ContentLoadingBody`; burada yerine kapağın iskeleti). */
  /* Anadil sözlüğü de kısa süre bekleniyor (bkz. ConversationScreen). */
  const [packReady, setPackReady] = useState(() => !!findConversation(id) && nativeContentReady());
  /* Paket inemediyse "konuşma bulunamadı" değil "indirilemedi" deniyor. */
  const [packFailed, setPackFailed] = useState(false);
  useEffect(() => {
    const level = conversationLevelOf(id);
    if (!level) { setPackReady(true); return; }
    let dead = false;
    void Promise.all([ensureConversations(level), waitNativeContent()]).then(([ok]) => {
      if (dead) return;
      setConversation(findConversation(id) as Conversation | undefined);
      setPackFailed(!ok);
      setPackReady(true);
    });
    return () => { dead = true; };
  }, [id]);

  const [phase, setPhase] = useState<Phase>("intro");
  /* Sözlük bekleme süresinden SONRA inerse giriş ekranı hâlâ açıkken çevrili
     konuşmaya geçiliyor; konuşma başladıktan sonra içerik değişmiyor. */
  const nativeVer = useNativeContentVersion();
  useEffect(() => {
    if (nativeVer && phase === "intro") setConversation(findConversation(id) as Conversation | undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nativeVer]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [asr, setAsr] = useState(false);
  const [left, setLeft] = useState(SCORED_SECONDS);
  const [result, setResult] = useState<Result | null>(null);
  /** Sunucudaki değerlendirme kaydının kimliği — "Bildir" ref'i. */
  const [resultId, setResultId] = useState<number | null>(null);
  const [gateNote, setGateNote] = useState<string | null>(null);
  /**
   * Muhatap cevap vermedi çünkü yapay zekâya izin verilmedi — servis kapalı
   * DEĞİL. Sınav senaryoyla yürüyemiyor (sayılmazdı), ama sebep doğru
   * söylenmeli ve nereden açılacağı belli olmalı (web `conversation-scored` ile aynı).
   */
  const [consentOff, setConsentOff] = useState(false);
  /* Yapabilirlik etiketi: kimlikler konuşmadan (`candoMap`), METNİ `/api/cando`dan.
     Web 213 satırlık veri dosyasından okuyor; mobil o listeyi zaten çekiyor.
     Sınav açılırken çekiliyor, sonuç ekranına gelindiğinde hazır (konuşma özeti
     ile aynı kanca, `game/cando` `useCandoLabels`). */
  const candoIds = useMemo(() => (conversation ? candoIdsForConversation(conversation) : null), [conversation]);
  const cando = useCandoLabels(candoIds) ?? [];
  const scored = useRef(false);
  const mounted = useRef(true);
  /*
   * ANLIK DURUM REF'TE (2026-10-08). Mikrofon sonucu dinlemenin BAŞLADIĞI
   * çizimin `send`ini çağırıyor: o arada yazılıp gönderilen tur `busy`/`turns`
   * state'inde görünmüyordu (iki /api/chat isteği aynı anda, biri geçmişten
   * düşüyordu), süre bitip puanlama başlamışsa da tur yine gidiyordu. `run`
   * sınavın kaçıncı kez kurulduğu: "Tekrar dene"den önceki isteğin cevabı ve
   * 6 sn'lik puanlama zamanlayıcısı yeni sınava karışmasın.
   */
  const busyRef = useRef(false);
  const turnsRef = useRef<Turn[]>([]);
  const phaseRef = useRef<Phase>(phase);
  phaseRef.current = phase;
  const run = useRef(0);
  const putTurns = (t: Turn[]) => { turnsRef.current = t; setTurns(t); };
  const scrollRef = useRef<any>(null);
  const userTurns = turns.filter((x) => x.role === "user").length;

  useEffect(() => {
    mounted.current = true;
    sttAvailable().then((ok) => { if (mounted.current) setAsr(ok); });
    return () => { mounted.current = false; stopListening(); };
  }, []);


  const score = useCallback(async (all: Turn[]) => {
    /* Ekrandan çıkıldıysa puanlanmıyor (6 sn'lik zamanlayıcı ayrıldıktan sonra da düşebiliyor). */
    if (scored.current || !conversation || !mounted.current) return;
    scored.current = true;
    setPhase("scoring");
    const said = all.filter((x) => x.role === "user").map((x) => x.content);
    try {
      const d = await api<{ result: Result; id?: number | null }>("/api/assess", {
        method: "POST",
        replay: true, // aynı metnin tekrarı önbellekten döner (lib/assess hash), yeni kayıt açmaz
        timeoutMs: ASSESS_CHAT_TIMEOUT_MS,
        body: JSON.stringify({
          kind: "chat",
          level: conversation.level,
          /* ÜRETİMİN DİLİ — zorunlu. İstemci vermezse sunucu "de"ye düşüyor
             (`api/assess` `parseBody`), yani İngilizce kursta yapılan rol
             yapma sınavı ALMANCA rubriğiyle puanlanıyordu. Web aynı çağrıda
             `targetLangOf(conversation.course)` gönderiyor; burada kursun hedef
             dili süreç genelinde kurulu (`lib/courses`). */
          lang: currentTargetLang(),
          task: {
            /* Görev metni kullanıcının ANADİLİNDE (sahne de anadilde); sabit
               Türkçe ek, anadili İngilizce/Almanca olana Türkçe geri bildirim
               çağırıyordu. */
            prompt: tx("assess.ai_scored_chat", { scene: conversation.chat.scene, partner: conversation.chat.partner }),
            targets: conversation.patterns.map((p) => p.de),
            constraints: [tx("assess.ai_turns", { n: SCORED_TURNS }), tx("assess.ai_no_help")],
          },
          answer: { text: said.join("\n"), transcript: said },
          exerciseId: `${conversation.id}:scored`,
          /* `day` bir YAZMA anahtarı: değerlendirme satırı o güne yazılıyor ve
             günlük kota o günün satırları sayılarak bulunuyor. */
          day: todayStr(),
        }),
      });
      if (!mounted.current) return;
      setResult(d.result ?? null);
      setResultId(d.id ?? null);
    } catch (e) {
      if (!mounted.current) return;
      /* PUANLI KISIM Konuşma adımının KENDİ hakkını kullanıyor (2026-09-25);
         hak yoksa (sohbet atlanıp doğrudan buraya gelindiyse) kilit ekranı. */
      if (assessFailure(e) === "premium") {
        notePremiumGate("conversation");
        void refreshPremium();
        setPhase("locked");
        return;
      }
      setGateNote(tx(assessFailKey(e)));
    }
    track("nav", said.length, "conversation_scored:done");
    if (mounted.current) setPhase("result");
  }, [conversation]);

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
   * yalnızca `setLeft(SCORED_SECONDS)` yazmak ilk tik'te eziliyor ve sınav
   * ANINDA bitiyordu — sonuç ekranındaki "Tekrar dene" tam bu yüzden
   * bozuktu: dokunan kullanıcı sıfır turluk, anında bitmiş bir sınav
   * alıyordu. Hata dalı ve sonuç ekranı artık aynı sıfırlamayı kullanıyor
   * (web `conversation-scored` `restart` ile birebir).
   */
  const restart = useCallback(() => {
    scored.current = false;
    deadline.current = 0;
    run.current++;
    busyRef.current = false;
    setBusy(false);
    setResult(null);
    setResultId(null);
    setGateNote(null);
    setConsentOff(false);
    turnsRef.current = [];
    setTurns([]);
    setDraft("");
    setLeft(SCORED_SECONDS);
    setPhase("intro");
  }, []);
  useEffect(() => {
    if (phase !== "talk") return;
    if (!deadline.current) deadline.current = Date.now() + SCORED_SECONDS * 1000;
    const tick = () => setLeft(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [phase]);
  useEffect(() => {
    if (phase === "talk" && left <= 0) void score(turns);
  }, [left, phase, score, turns]);

  if (!conversation && !packReady) {
    /* Paket inerken KAPAĞIN iskeleti (koç cümlesi, üç kural,
       kalıplar kartı, Başla / Kapat): paket gelince açılan ekran kapak. */
    /* Kuralların metni kapağın kendisinden; üst satır (konuşmanın adı) ve
       sahne pakette, tahmini uzunlukta. */
    return (
      <CoverSkeleton
        label={tx("common.loading")}
        coach={coverCoach("scored_intro")}
        eyebrow={skeletonFiller(40)}
        title={tx("scored.title")}
        pitch={skeletonFiller(162)}
        rules={[
          tx("scored.rule_time", { turns: SCORED_TURNS, minutes: SCORED_SECONDS / 60 }),
          tx("scored.rule_partner"),
          tx("scored.rule_scoring"),
        ]}
        detail={{ title: tx("scored.patterns_title"), rows: 3 }}
      />
    );
  }
  if (!conversation) {
    return (
      /* DURUM ŞABLONU. Burada yalnız ortada tek satır metin vardı: ne maskot
         ne bir çıkış yolu; geri dönmenin tek yolu donanım tuşuydu. Tek
         eylem çıkış: birincil "Kapat", üstte ikinci bir geri oku yok. */
      <FlowScreen center actions={<FlowActions primary={{ label: tx("common.close"), onPress: () => nav.goBack() }} />}>
        <StateBody alert title={packFailed ? tx("content.couldn_t_load") : tx("conversation.this_conversation_wasn_t_found")} body={packFailed ? tx("social.err_offline") : null} />
      </FlowScreen>
    );
  }

  function start() {
    track("nav", 0, "conversation_scored:start");
    const opening: Turn = { role: "assistant", content: conversation!.chat.opening };
    putTurns([opening]);
    setPhase("talk");
    speakTarget(conversation!.chat.opening);
  }

  async function send(text: string) {
    const clean = text.trim();
    /* State değil ref: mikrofon sonucu eski çizimden geliyor (bkz. `busyRef`). */
    if (!clean || busyRef.current || scored.current || phaseRef.current !== "talk") return;
    const my = run.current;
    setDraft("");
    busyRef.current = true;
    setBusy(true);
    const next: Turn[] = [...turnsRef.current, { role: "user", content: clean }];
    putTurns(next);
    const n = next.filter((x) => x.role === "user").length;
    try {
      const raw = await sendChat(conversation!.id, next as ChatMsg[], "scored");
      /* Sınav isteminde işaret satırı olmamalı; olursa yine de ayıklanır. Gövde
         boşsa ham metne DÜŞÜLMÜYOR (QA F-0002: balonda "[SAY] …" görünüyordu):
         işaretsiz istemde işaretli satır rolün kendi cümlesi, işaretsiz alınıyor.
         Web `conversation-scored` aynı kural. */
      const parsedRaw = parseReply(raw);
      const body = parsedRaw.body.trim() || parsedRaw.suggestions.join(" ").trim();
      const all: Turn[] = [...next, { role: "assistant", content: body }];
      if (!mounted.current || my !== run.current) return;
      putTurns(all);
      busyRef.current = false;
      setBusy(false);
      // Süre bu cevabı beklerken bittiyse puanlama ekranında okunmuyor.
      if (!scored.current) speakTarget(body);
      if (n >= SCORED_TURNS) setTimeout(() => { if (my === run.current) void score(all); }, 6000);
    } catch (e) {
      if (!mounted.current || my !== run.current) return;
      busyRef.current = false;
      setBusy(false);
      /* İzin ekranında "hayır" dendiyse ya da daha önce denmişse cümle
         sağlayıcıya gitmedi. Akış öteki arızalarla aynı; değişen yalnız cümle. */
      if (isAiConsentDeclined(e)) setConsentOff(true);
      /* Konuşma hakkı yok: kapı, arıza değil — kilit ve nasıl açılacağı. */
      if (e instanceof ApiError && e.status === 403 && e.message === "premium_required") {
        notePremiumGate("conversation");
        void refreshPremium();
        setPhase("locked");
        return;
      }
      // İki turdan sonra kopan bağlantı sınavı çöpe atmaz: eldekini puanla.
      if (n >= 2) void score(next);
      else setPhase("error");
    }
  }

  async function listen() {
    if (listening || busy) return;
    if (!(await ensureMicPermission())) { setAsr(false); return; }
    setListening(true);
    /* Mikrofon açılış sesi — `ConversationScreen` `dinle` ile aynı (web
       `cueListen`; yürüyüşün 180 ms zamanlaması). */
    const miconTimer = setTimeout(() => sfx("micon"), 180);
    try {
      /* Tanıyıcı birkaç aday döndürüyor; sınavda ilki alınıyor - konuşma
         turlarının kendi eşleştiricisi yok, cevap düz metin gidiyor. */
      const heard = (await listenOnce(currentTargetLocale(), 8000))?.[0]?.trim();
      if (!mounted.current) return;
      if (heard) { setDraft(heard); void send(heard); }
    } finally {
      clearTimeout(miconTimer);
      if (mounted.current) setListening(false);
    }
  }

  const mm = Math.floor(Math.max(0, left) / 60);
  const ss = String(Math.max(0, left) % 60).padStart(2, "0");

  if (phase === "intro") {
    return (
      /* KAPAK ŞABLONU (ui/flow): ikon karosu · konuşmanın adı · sınavın adı ·
         sahne · ikonlu kurallar · kalıplar kartı · altta Başla / Kapat (üstte X yok).
         Kurallar "·" ile başlayan soluk satırlardı ve kalıplar da o listenin
         dördüncü "kuralı" gibi okunuyordu. */
      <FlowScreen
        actions={guest
          /* MİSAFİR: sınavın muhatabı ve puanı yapay zekâ; ikisi de hesap istiyor
             (mağaza ön inceleme B24). Başla yerine hesap oluşturma. */
          ? <FlowActions primary={{ label: tx("guest.create_account"), onPress: () => nav.navigate("Auth") }} close={() => nav.goBack()} />
          : <FlowActions primary={{ label: tx("scored.start"), onPress: start }} close={() => nav.goBack()} />}
      >
        {/* 48 — web ile ayni boy (`conversations/conversation-scored`) ve mobilin KENDI
            sinav girisiyle de ayni (`ExamScreen` 48). */}
        <CoachLine moment="scored_intro" />
        <CoverBody
          icon={ConversationIcon}
          tint={colors.primary}
          /* Konuşmanın adı hedef dilde; üst satır büyük harf ve Türkçe yerelde
             "i" → "İ" oluyordu. JS `toUpperCase` yerelden bağımsız. */
          eyebrow={`${conversation.title.toUpperCase()} · ${conversation.titleTr}`}
          title={tx("scored.title")}
          pitch={conversation.chat.scene}
          rules={[
            { icon: DurationIcon, text: tx("scored.rule_time", { turns: SCORED_TURNS, minutes: SCORED_SECONDS / 60 }) },
            { icon: NoGoingBackIcon, text: tx("scored.rule_partner") },
            { icon: ScoreTargetIcon, text: tx("scored.rule_scoring") },
          ]}
        >
          {guest ? <FlowNote icon={<LockedIcon color={colors.textMuted} size={16} />} text={tx("guest.ai_scored")} /> : null}
          {conversation.patterns.length ? (
            <DetailCard title={tx("scored.patterns_title")}>
              {conversation.patterns.map((p) => <DetailRow key={p.de} left={p.de} right={p.tr} />)}
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
          <StateBody title={tx("item.mono_scoring")} body={tx("scored.scoring_note", { n: userTurns })}>
            <ActivityIndicator color={colors.primary} />
          </StateBody>
        </View>
      </FlowScreen>
    );
  }

  if (phase === "locked") {
    const copy = conversation ? tieredCopy(premiumStatus?.unlock?.levels[conversation.level]?.conversation, "conv") : null;
    return (
      <FlowScreen
        center
        actions={<FlowActions primary={{ label: tx("unlock.premium_now"), onPress: () => nav.navigate("Paywall") }} close={() => nav.goBack()} />}
      >
        <StateBody title={tx("unlock.locked_conv")}>
          {copy ? <View style={{ alignSelf: "stretch", marginTop: spacing.md }}><UnlockProgress copy={copy} /></View> : null}
        </StateBody>
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
        actions={<FlowActions primary={{ label: tx("common.try_again"), onPress: restart }} close={() => nav.goBack()} />}
      >
        <StateBody alert title={tx("scored.cant_run")} body={!consentOff ? tx("scored.service_down") : tx("assess.fail_consent")} />
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
    const passed = overall >= SCORED_PASS_SCORE;
    /* Eşiğin altındaysa birincil düğme "Tekrar dene". Puanlanamadıysa
       (servis/kota) tekrar denemek aynı kapıya çarpar; orada birincil çıkış
       konuşmaya dönmek. */
    const retryFirst = !!result && !passed;
    const retry = { label: tx("common.try_again"), onPress: restart };
    const leave = { label: tx("common.close"), onPress: () => nav.goBack() };
    return (
      /*
        SONUÇ ŞABLONU (ui/flow): band → üç sayı → notlar → ayrıntı kartları →
        altta sabit düğmeler. Halka kalktı: bandın ana sayısı aynı bilgiyi
        veriyor. Konfeti yalnız geçince.
      */
      <FlowScreen
        celebrate={passed}
        /* Üstte X yok (2026-09-30): çıkış dipteki "Kapat". Çıkış birincilse
           tekrar metin bağlantısı; tekrar birincilse çıkış "Kapat". */
        actions={<FlowActions primary={retryFirst ? retry : leave} tertiary={retryFirst ? null : retry} close={retryFirst ? leave.onPress : null} />}
      >
        <ResultHero
          eyebrow={tx("scored.title")}
          title={result ? tx(passed ? "exam.passed" : "exam.not_passed") : tx("scored.not_scored")}
          figure={result ? formatPercent(overall) : null}
          sub={`${conversation.title} · ${tx("conversationp.n_turns", { n: userTurns })}`}
          /* Puanlandıysa Nomi bandın ALTINDA konuşuyor (koç balonu). */
          pill={result ? { text: tx("scored.below_threshold", { n: SCORED_PASS_SCORE }), tone: passed ? "ok" : "bad" } : null}
          quiet={!passed}
        />
        {result ? <CoachLine moment={passed ? "scored_pass" : "scored_fail"} vars={{ pct: overall, level: conversation.level }} /> : null}
        {result ? (
          <StatRow items={[
            { value: String(userTurns), label: tx("scored.stat_turns") },
            { value: `${result.score.task}/4`, label: tx("assess.task") },
            { value: String(result.errors.length), label: tx("scored.stat_errors"), tone: result.errors.length ? null : "ok" },
          ]} />
        ) : null}

        {/* Tek satırlık notlar: puanlanamama sebebi, en sık hata, yapabilirlik. */}
        {gateNote ? <FlowNote tone="bad" icon={<WarningIcon color={colors.dangerText} size={16} />} text={gateNote} /> : null}
        {result ? (
          topErrors.length ? (
            <FlowNote icon={<WarningIcon color={colors.textMuted} size={16} />} text={`${tx("scored.most_common")} ${topErrors.map(([type, n]) => `${tx(ERROR_LABEL_KEYS[type] ?? "err.meaning")} x${n}`).join(", ")}`} />
          ) : (
            <FlowNote tone="ok" icon={<CorrectIcon color={colors.successText} size={16} />} text={tx("scored.no_errors")} />
          )
        ) : null}
        {cando.length ? (
          <FlowNote
            tone={passed ? "ok" : "neutral"}
            icon={passed ? <CorrectIcon color={colors.successText} size={16} /> : <ScoreTargetIcon color={colors.textMuted} size={16} />}
            text={`${passed ? tx("conversationp.i_can") : tx("scored.goal")} ${cando.join(" · ")}`}
          />
        ) : null}

        {result ? (
          /* DEĞERLENDİRMENİN ÖĞRETEN KISMI DA GÖSTERİLİYOR. Burada yalnız dört
             rubrik çubuğu vardı: öğrenci "72" görüyor, neyi yanlış yaptığını
             öğrenmiyordu. Kart hataların gerekçesini, düzeltilmiş cümleyi,
             övgüyü ve sıradaki ipucunu da yazıyor. */
          <DetailCard title={tx("scored.assessment_title")}>
            <AssessmentCard answer={said.join("\n")} result={result} reportRef={assessmentRef(resultId, `${conversation.id}:scored`)} />
          </DetailCard>
        ) : null}

        {best.length ? (
          <DetailCard title={tx("scored.best_sentences")}>
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
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
        <Text variant="caption" color={colors.textMuted} style={{ flex: 1 }}>{tx("scored.turn_of", { n: Math.min(userTurns + 1, SCORED_TURNS), total: SCORED_TURNS })}</Text>
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
          /* Balon + altındaki "Bildir" bir arada: bağlantı balonun İÇİNDE değil,
             altında, sol başta (sohbet `ConversationScreen` ve web aynı yer). */
          <View key={i} style={{ alignSelf: turn.role === "user" ? "flex-end" : "flex-start", maxWidth: "88%", marginBottom: spacing.sm }}>
            <View
              style={{
                backgroundColor: turn.role === "user" ? colors.primary : colors.surface2,
                borderRadius: radii.lg,
                /* Kuyruk köşesi konuşan tarafa bakıyor - `CoachBubble` ve konuşma
                   balonlarıyla aynı biçim. */
                ...(turn.role === "user" ? { borderBottomRightRadius: radii.sm } : { borderBottomLeftRadius: radii.sm }),
                paddingHorizontal: spacing.md,
                paddingVertical: 10,
              }}
            >
              <Text variant="body" color={turn.role === "user" ? colors.onPrimary : colors.text}>{turn.content}</Text>
            </View>
            {/* Yapay zekâ yanıtının altında "Bildir" (denetim CNT-6; konuşma
                sohbetindekiyle aynı bağlantı ve ref biçimi, sınav eki ile).
                İlk balon (i = 0) konuşmanın yazılı açılış cümlesi, model çıktısı
                değil: onun "Bildir"i İÇERİK bildirimi (senaryo), aynı görünüm ve yer.
                Süre satırında bayrak yok. */}
            {turn.role === "assistant" && i > 0 ? (
              <ReportLink kind="chat" refId={`${conversation.id}:scored:${i}`} content={turn.content} style={{ marginTop: spacing.xs }} />
            ) : turn.role === "assistant" ? (
              <ReportFlag
                style={{ marginTop: spacing.xs }}
                report={() => ({ surface: "scored", target: { type: "conversation", id: conversation.id, sub: "0" }, snapshot: { title: conversation.title, opener: turn.content } })}
              />
            ) : null}
          </View>
        ))}
        {/* "Yazıyor" noktaları — `ConversationScreen` ile aynı baloncuk (web
            `conversation-player` `TypingDots`). */}
        {busy ? (
          <View style={{ alignSelf: "flex-start", backgroundColor: colors.surface2, borderRadius: radii.lg, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
            <TypingDots />
          </View>
        ) : null}
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
            accessibilityLabel={tx("conversation.mic_talk")}
            style={[{ width: 48, height: 48, borderRadius: radii.pill, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }, softShadow(colors.primary, 8)]}
          >
            <MicPulse active={listening}><SkillSpeakingIcon color={colors.onPrimary} size={20} /></MicPulse>
          </PressableScale>
        ) : null}
        <TextInput
          value={draft}
          onChangeText={setDraft}
          editable={!busy}
          multiline
          /* Enter = Gönder (konuşma ekranıyla aynı; bkz. `ConversationScreen` `TypedRow`). */
          submitBehavior="submit"
          returnKeyType="send"
          onSubmitEditing={() => void send(draft)}
          /* Hedef dilde CUMLE (bkz. `ConversationScreen`). Bu alanda hicbiri
             yoktu ve web tarafinda da yoktu; ikisi birlikte duzeltildi. */
          autoCapitalize="sentences"
          autoCorrect={false}
          placeholder={listening ? tx("speak.listening") : asr ? tx("scored.speak_or_type") : tx("conversation.type_in", { lang: targetLangName() })}
          accessibilityLabel={listening ? tx("speak.listening") : asr ? tx("scored.speak_or_type") : tx("conversation.type_in", { lang: targetLangName() })}
          placeholderTextColor={colors.textFaint}
          /* Kutu ve gönder düğmesi konuşma ekranının `TypedRow`uyla aynı biçim. */
          style={{ flex: 1, maxHeight: ds(120), backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, color: colors.text, fontSize: 16 }}
        />
        {(() => {
          const dolu = !busy && !!draft.trim();
          return (
            <PressableScale
              accessibilityLabel={tx("common.send")}
              onPress={() => void send(draft)}
              disabled={!dolu}
              style={[{ width: 48, height: 48, borderRadius: radii.pill, alignItems: "center", justifyContent: "center", backgroundColor: dolu ? colors.primary : colors.surface2 }, dolu ? softShadow(colors.primary, 8) : {}]}
            >
              <SendIcon color={dolu ? colors.onPrimary : colors.textFaint} size={22} />
            </PressableScale>
          );
        })()}
      </View>
    </View>
  );
}
