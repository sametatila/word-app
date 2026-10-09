import React, { useEffect, useMemo, useRef, useState } from "react";
import { PreviousResult } from "../ui/PreviousResult";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t as tx, targetLangName, formatPercent } from "../lib/i18n";
import { AppState, View, TextInput } from "react-native";
import { KeyboardAwareScroll } from "../ui/KeyboardAwareScroll";
import { useKeyboardLift } from "../lib/useKeyboardHeight";
import { useLayout } from "../lib/useLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { ReportSheet } from "../ui/ReportSheet";
import { ReportButton } from "../ui/ReportLink";
import { ReportFlag } from "../ui/ReportFlag";
import { AiNotice } from "../ui/AiNotice";
import { Skeleton, SkeletonLine, SkeletonPill, skeletonFiller, textHeight } from "../ui/Skeleton";
import { PressableScale } from "../ui/PressableScale";
import { BackIcon, CheckIcon, CorrectIcon, SendIcon, SkillSpeakingIcon, SpeakerIcon, WarningIcon, WrongIcon } from "../ui/icons";
import { FlowScreen, FlowActions, FlowNote, ResultHero, StatRow, DetailCard, DetailRow, StateBody } from "../ui/flow";
import { GuestMilestoneCard } from "../ui/GuestMilestoneCard";
import { ensureConversations, findConversation, conversationLevelOf, scoredSteps, type Conversation, type Segment, type Expectation, type LectureStep } from "../data/conversations";
import { nativeContentReady, waitNativeContent } from "../lib/nativeContent";
import { foldContractions } from "../lib/contractions";
import { foldEnglishSpelling } from "../lib/en-spelling";
import { sendChat, chatAvailability, parseReply, patternUsed, type ChatMsg } from "../game/chat";
import { isAiConsentDeclined } from "../lib/aiConsent";
import { markItemDone, newFinishId, queueConversationResult, loadConversationResume, saveConversationResume, clearConversationResume, type ConversationResume } from "../game/pathProgress";
import { speakTarget, speakAndWaitVoiced, currentVoiceId, stopSpeaking } from "../lib/tts";
import { ensureMicPermission, listenOnce, sttAvailable, stopListening } from "../lib/stt";
import { spokenMatches } from "../lib/voiceMatch";
import { currentTargetLang, currentTargetLocale } from "../lib/courses";
import { haptic } from "../lib/haptics";
import { apiBase, fetchWithTimeout } from "../api/client";
import { bumpStats } from "../lib/statsSignal";
import { todayStr } from "../game/session";
import { candoIdsForConversation } from "../game/candoMap";
import { useCandoLabels } from "../game/cando";
import { useTheme, spacing, radii, softShadow, type Palette, ds } from "../theme";
import { sfx } from "../lib/sfx";
import { CONVERSATION_TRY_CEILING, conversationPassNeed } from "../lib/learningRules";
import { produceFeedback, type DiffLine } from "../lib/sentenceMatch";
import { DiffLineList } from "../ui/TokenDiff";
import { judgeTyped } from "../lib/typedAnswer";
import { produceSource } from "../lib/produceSource";
import { segmentGap } from "../lib/segmentText";
import { rescueSentence } from "../lib/sentenceRescue";
import { track } from "../lib/track";
import { reduceMotion } from "../lib/reduceMotion";
import { MicPulse, TypingDots } from "../ui/ConversationFx";
import { ApiError } from "../api/client";
import { isAccountRequired } from "../lib/guest";
import { useAuth } from "../lib/AuthContext";
import { notePremiumGate, refreshPremium, usePremiumStatus } from "../lib/premium";
import { useAiDeclined } from "../lib/useAiDeclined";
import { conversationLocked, tieredCopy } from "../lib/unlock";
import { UnlockProgress } from "../ui/UnlockProgress";
import { IconLine } from "../ui/IconLine";

/**
 * Konuşma oynatıcısı — anlatım → karşılıklı konuşma → özet. Web'in
 * conversation-player'ının mobil karşılığı ve artık onunla aynı yolu yürüyor:
 * öğrenci KONUŞUYOR (native STT), yazmak yalnızca yedek.
 *
 * Eskiden mobilde tek yol yazmaktı; gerekçe olarak "cihaz STT'si ekran kapanınca
 * susuyor" yazılıydı ama o kısıt yürüyüş moduna ait — burada ekran zaten açık ve
 * aynı tanıyıcı ekran açıkken üç ayrı yüzeyde (beceri, sınav, kelime turu)
 * sorunsuz çalışıyor. Sonuç şuydu: patikanın konuşma yüzeyi mobilde hiç
 * konuşturmuyor, "söyledim" düğmesi öğrencinin beyanına güveniyordu.
 *
 * İçerik pakette (findConversation); sonuç /api/conversation'a kaydediliyor.
 */

/** Eller serbest tercihi — web `conversation-player` ile aynı anahtar adı. */
const HANDSFREE_KEY = "lernomi-conversation-handsfree";

/** Sonuç kaydı ağ hatasında bu kadar sonra bir kez daha deneniyor — web `conversation-player` ile aynı ad, aynı sayı. */
const CONVERSATION_SAVE_RETRY_MS = 1200;

type Phase = "lecture" | "chat" | "summary";

/** Cevabın hangi yoldan geldiği — `conversation_step` kind'ının ikinci parçası. */
type Via = "mic" | "typed";

/** Anlatım/konuşma akışındaki baloncuk. */
/** Yapay zekâ yanıtı için bildirme bilgisi: ref = "<conversationId>:<tur>", text = gösterilen metin. */
type ReportRef = { ref: string; text: string };
/**
 * Konuşmanın YAZILI içeriği (anlatım adımı, senaryo repliği, açılış) için
 * içerik bildirimi: `sub` spec'teki gibi (anlatımda `step:<n>`, sohbette tur).
 */
type ContentRef = { sub: string; snapshot: Record<string, unknown> };
type BubbleData =
  | { role: "teacher"; segments: Segment[]; tone?: "hint" | "why"; fix?: string[]; report?: ReportRef; content?: ContentRef; diff?: DiffLine[] }
  | { role: "student"; text: string; ok?: boolean };
type Bubble = BubbleData & { id: number };

/** Segmentlerin HEDEF dil kısmı (anlatım "tr" dışındakiler) — okunacak/denetlenecek metin. */
const targetText = (segs: Segment[]): string => segs.filter((s) => s.lang !== "tr").map((s) => s.text).join(" ").trim();

/** Kısaltmaları açılmış liste — konuşma karşılaştırmasının iki tarafı da. */
const fc = (xs: string[]): string[] =>
  xs.map((x) => foldEnglishSpelling(foldContractions(x, currentTargetLang()), currentTargetLang()));

/** Adım türü → ilerleme rengi (web STEP_TONE ile aynı dil). */
function stepTone(step: LectureStep, colors: Palette): string {
  switch (step.expect?.kind) {
    case "repeat": return colors.info;
    case "produce": return colors.primary;
    case "truefalse": return colors.accent;
    case "confirm": return colors.textMuted;
    default: return colors.border;
  }
}

/**
 * Mikrofonun açık kalacağı en uzun süre (ms) — GÜVENLİK ÜST SINIRI.
 *
 * Sekiz saniyeydi ve gerekçesi yazılı değildi. Web aynı adımda on iki saniye
 * bekliyor (`conversations/conversation-player` `SILENCE_MS`) ve orada gerekçe yazılı:
 * "bir cümleyi düşünmek birkaç saniye, on saniyeyi geçen sessizlik takılma".
 * Aynı gerekçe Android için de geçerli; dört saniyelik fark öğrenciyi
 * cümlesini kurarken kesiyordu.
 *
 * İki tarafın SAYISI aynı, ROLÜ değil: webde sayaç yalnız kendiliğinden
 * açılan mikrofon için işliyor (kullanıcı kendi dokunduysa sınır yok), burada
 * ise her iki durumda da üst sınır. Bu yüzden ortak bir ada zorlanmadı ve
 * eşitliği `check:parity` §196 mutlak ölçütle koruyor.
 *
 * Gerçek bitiş kararı bu sayıya bakmıyor: `listenOnce` konuşma durduktan
 * ~800 ms sonra dönüyor, yani süreyi uzatmak kimseyi bekletmiyor.
 */
const LISTEN_CEILING_MS = 12000;


/**
 * GÖNDERİLEMEYEN CÜMLE (2026-10-05, Samet: çevrimdışı senaryo kalktı, kopmalar
 * doğru anlatılıp doğru yönetilsin; web `conversation-player` aynı). Cümle
 * sohbet akışına girmiyor (tur sayacını doldurmasın); panelde sebebiyle
 * bekliyor ve kendiliğinden yeniden deneniyor.
 *   unreachable  sunucuya ulaşılamadı (internet yok ya da ağ engeli)
 *   service      sunucu cevap verdi ama sohbet servisi yok (5xx) → sorun bizde
 *   slow         cevap tavanı aştı
 */
type SendFailure = { text: string; kind: "unreachable" | "service" | "slow"; attempt: number; retryIn: number | null };
/** Kendiliğinden yeniden deneme aralıkları (sn); bitince "Şimdi dene" kalır. */
const RETRY_DELAYS = [5, 15, 30];

export function ConversationScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { compactWidth } = useLayout();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { params } = useRoute<RouteProp<RootStackParams, "Conversation">>();
  /* Konuşma A1 dışındaysa ikilide yok, seviye paketiyle iniyor. Normalde patika
     zaten indirmiş oluyor; bu yol bildirimle ya da derin bağlantıyla doğrudan
     buraya gelen kullanıcı için. */
  const [conversation, setConversation] = useState<Conversation | undefined>(() => findConversation(params.id));
  /*
    PATİKA KONUŞMA HAKKI (2026-09-25). Hakkı olmayan adım KİLİTLİ: konuşmaya
    girmeden kilit, nasıl açılacağı ve Premium yolu gösteriliyor (sunucu
    `/api/chat` aynı kararı veriyor; ilk yapay zekâ turunda 403 gelirse de
    aynı kilit). Misafir ve yapay zekâ iznini REDDEDEN kullanıcı kilit görmüyor —
    senaryolu konuşma onların yolu.
  */
  const { user: authUser } = useAuth();
  const isGuest = !authUser || Boolean(authUser.guest);
  const { status: premiumStatus } = usePremiumStatus();
  const aiDeclined = useAiDeclined(!isGuest);
  const [serverLocked, setServerLocked] = useState(false);
  const entryLocked = conversation ? conversationLocked(premiumStatus?.unlock, conversation.id, conversation.level, { guest: isGuest, aiDeclined }) : false;
  const convLocked = entryLocked || serverLocked;
  const convCopy = conversation ? tieredCopy(premiumStatus?.unlock?.levels[conversation.level]?.conversation, "conv") : null;
  useEffect(() => { if (convLocked) notePremiumGate("conversation"); }, [convLocked]);
  /* Paket inmeden "bulunamadı" denmiyor (bkz. ui/flow `ContentLoadingBody`). */
  /* ANADİL SÖZLÜĞÜ de beklenir (en çok birkaç saniye, `waitNativeContent`):
     inmeden açılan konuşma anadili İngilizce/Almanca olana Türkçe anlatım
     gösteriyordu. Oynatıcı başladıktan sonra içerik DEĞİŞTİRİLMİYOR —
     `conversation` değişince anlatım baştan kuruluyor. */
  const [packReady, setPackReady] = useState(() => !!findConversation(params.id) && nativeContentReady());
  /* Paket inemediyse "konuşma bulunamadı" değil "indirilemedi" deniyor. */
  const [packFailed, setPackFailed] = useState(false);
  useEffect(() => {
    const level = conversationLevelOf(params.id);
    let dead = false;
    if (!level) {
      void waitNativeContent().then(() => {
        if (dead) return;
        setConversation(findConversation(params.id));
        setPackReady(true);
      });
      return () => { dead = true; };
    }
    void Promise.all([ensureConversations(level), waitNativeContent()]).then(([ok]) => {
      if (dead) return;
      setConversation(findConversation(params.id));
      setPackFailed(!ok);
      setPackReady(true);
    });
    return () => { dead = true; };
  }, [params.id]);
  const scrollRef = useRef<any>(null);
  /* Alt eylem alanı dipte sabit; klavye açılınca dolgusu klavyenin üstüne
     çıkacak kadar büyüyor. Eskiden hiç büyümüyordu: yazma satırı ve
     "Gönder" klavyenin altında kalıyordu. */
  const dockRef = useRef<React.ComponentRef<typeof View>>(null);
  const dockLift = useKeyboardLift(dockRef, spacing.sm);
  const startedAt = useRef(Date.now());

  const [phase, setPhase] = useState<Phase>("lecture");
  const [feed, setFeed] = useState<Bubble[]>([]);
  const bubbleId = useRef(0);
  const [cursor, setCursor] = useState(0);        // anlatımda beklenen adım
  const [correct, setCorrect] = useState(0);
  const [triesShown, setTries] = useState(0);     // üretim adımında deneme sayısı (çizim için; hüküm `triesRef`ten)
  const [answered, setAnswered] = useState(false); // doğru/yanlış cevaplandı mı
  /*
   * ADIMIN ANLIK DURUMU REF'TE (2026-10-08). Mikrofon sonucu, dinleme BAŞLADIĞI
   * çizimin kapanışıyla geliyor; o arada yazılan cevap deneme sayısını artırmış ya da
   * adımı bitirmiş olabiliyor. State'ten okuyunca sayaç takılıyor, doğru sözlü
   * cevap ilk deneme sayılıyor, adım iki kez puanlanıp iki ilerleme zamanlayıcısı
   * kuruluyordu. `cursorRef` `presentFrom`da EŞZAMANLI yazılıyor; `settled` o
   * adımın sonuçlandığını (doğru, tavan ya da doğru/yanlış cevabı) tutuyor.
   */
  const cursorRef = useRef(0);
  const triesRef = useRef(0);
  const settled = useRef<number | null>(null);
  const [input, setInput] = useState("");
  /** Yazılan üretim cevabı yapay zekâya soruluyor (`submitProduce`). */
  const [checking, setChecking] = useState(false);
  const checkingRef = useRef(false);
  const [busy, setBusy] = useState(false);        // chat bekleme
  /*
   * ELLER SERBEST — mobilde HİÇ YOKTU.
   *
   * Web konuşmada kalıcı bir anahtar tutuyor (`conversationp.hands_free`): açıkken her
   * adımda mikrofona dokunmak gerekmiyor, öğretmen cümlesini bitirir bitirmez
   * dinleme kendiliğinden başlıyor. Telefonda bu farkın webdekinden BÜYÜK
   * olması gerekirdi - cihaz masaya dayalıyken her tur için ekrana uzanmak,
   * Konuşma adımının ritmini kesen tek şey.
   *
   * Sıralama yürüyüş modunun kanıtlanmış kalıbı: önce `speakAndWaitVoiced`,
   * SONRA dinle. `speakTarget` bitişi bildirmiyor ve onunla kurulsaydı
   * mikrofon öğretmenin sesinin üstüne açılırdı.
   */
  /** Konuşmanın bir sonraki tekrarı kaç gün sonra — kayıt yanıtından. */
  const [nextDays, setNextDays] = useState<number | null>(null);
  /** Sunucunun hükmü: sohbet bitti VE anlatım isabeti eşiği geçti mi — tekrar
   *  merdivenini yürüten hüküm; "konuşma sayıldı" değil (bkz. `Summary`). */
  const [passed, setPassed] = useState<boolean | null>(null);
  /* "Yapabildiklerim" etiketleri konuşma AÇILIRKEN çekiliyor, özette değil (QA F-0070). */
  const candoIds = useMemo(() => (conversation ? candoIdsForConversation(conversation) : null), [conversation]);
  const cando = useCandoLabels(candoIds);
  const [handsFree, setHandsFree] = useState(true);
  const handsFreeRef = useRef(true);
  const [roleTurns, setRoleTurns] = useState(0);
  const [roleMsgs, setRoleMsgs] = useState<ChatMsg[]>([]);
  /* Sohbet geçmişi ve tur sayısı ref'te de: mikrofon sonucu eski çizimin
     `sendRole`unu çağırıyor; dinlerken öneri çipiyle giden tur state'ten okunsa
     düşüyordu ve iki /api/chat isteği aynı anda gidiyordu (`sending`). */
  const roleMsgsRef = useRef<ChatMsg[]>([]);
  const roleTurnsRef = useRef(0);
  const sending = useRef(false);
  const putRoleMsgs = (m: ChatMsg[]) => { roleMsgsRef.current = m; setRoleMsgs(m); };
  const putRoleTurns = (n: number) => { roleTurnsRef.current = n; setRoleTurns(n); };
  /*
   * SOHBETİN DÜZELTMELERİ AYRI TUTULUYOR (denetim T16).
   *
   * Özet düzeltmeleri `roleMsgs`teki karşı taraf cevaplarından `parseReply`
   * ile yeniden çıkarıyordu; ama `roleMsgs` cevabın TEMİZLENMİŞ gövdesini
   * saklıyor (`[FIX]`/`[SAY]` satırları ayıklanmış) ve sayı hep sıfırdı —
   * konuşmada düzeltme balonu görülse de özet "hiç düzeltme gerekmedi"
   * diyordu. `roleMsgs` modele geri giden geçmiş olduğu için ona dokunulmadı
   * (modelin gördüğü şey değişmesin); düzeltmeler geldikleri anda buraya
   * yazılıyor ve yarım kayıtla birlikte saklanıyor.
   */
  const [corrections, setCorrections] = useState<string[]>([]);
  /*
   * SOHBET KAPISI (2026-10-05, Samet). Çevrimdışı senaryolu sohbet kalktı:
   * sohbet yalnız yapay zekâyla. Yapamayan iki grup için sohbet ATLANIYOR,
   * konuşma anlatım puanıyla geçiliyor; muafiyeti sunucu veriyor
   * (`api/conversation`). Servis kesintisi bir kapı değil: cümle bekler ve
   * yeniden denenir (`failed`). Web `conversation-player` aynı kural.
   *   ai       sohbet yapay zekâyla
   *   consent  metin izni reddedilmiş
   *   account  misafir
   */
  const [chatGate, setChatGate] = useState<"ai" | "consent" | "account">("ai");
  const waivedRef = useRef(false);
  const waived = chatGate !== "ai";
  useEffect(() => { waivedRef.current = waived; }, [waived]);
  /** Gönderilemeyen cümle (bkz. `SendFailure`): sohbet akışına girmiyor, panelde bekliyor. */
  const [failed, setFailed] = useState<SendFailure | null>(null);
  /*
    GÜNLÜK SOHBET TAVANI DOLDU (429). Uyarı balonu her denemede yeniden
    basılıyordu: kutuda kalan cümle tekrar gönderilince aynı balon ikinci kez
    geliyordu (QA F-0040). Tavan dolunca uyarı BİR KEZ yazılıyor ve gönderme
    yolu (kutu, mikrofon, öneriler) kapanıyor; çıkış ("Şimdilik bırak") kalıyor.
    Web `conversation-player` aynı (`quotaHit`).
  */
  const [quotaHit, setQuotaHit] = useState(false);
  const quotaRef = useRef(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const waivedNote = (gate: "consent" | "account"): BubbleData => ({
    role: "teacher",
    segments: [{ lang: "tr", text: tx(gate === "consent" ? "conversationp.chat_waived_consent" : "conversationp.chat_waived_account") }],
    tone: "hint",
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  /*
    Sunucuya YAZILAN son hüküm: null = yazılmadı, false = yarım (deneme),
    true = konuşma bitti. Tek bayraktı ve ilk yazımdan sonra her şeyi
    kilitliyordu: "Şimdilik bırak" deyip konuşmaya dönen ve bitiren öğrencinin
    tamamlanması HİÇ yazılmıyordu.
  */
  const kaydedilen = useRef<boolean | null>(null);
  const [resumeOffer, setResumeOffer] = useState<ConversationResume | null>(null);
  // Yarım kayıt okunana dek boş sohbet kabuğu çizilmez: ya "devam et" ekranı ya
  // da ilk baloncuklar geliyor, ikisi de boş kabuğun yerine geçip ekranı zıplatır.
  const [resumeChecked, setResumeChecked] = useState(false);
  /* ÖNCEKİ SONUÇ (2026-10-07): yarım kalmamış, daha önce yapılmış konuşma sıfırdan başlamıyor;
     önce "Önceki sonucun" (`ui/PreviousResult`), "Tekrar çöz" anlatımı baştan açar. Yarım
     kalan konuşmada "kaldığın yerden" teklifi öncelikli. */
  const [review, setReview] = useState(params.result ?? null);
  const reviewRef = useRef(review);
  reviewRef.current = review;
  const [report, setReport] = useState<ReportRef | null>(null); // "Bildir" açık olan yapay zekâ yanıtı
  // Konuşma tanıma durumu. `sttOk === false` tek yer: mikrofon yok ya da izin
  // verilmedi — o zaman yazma alanı açılır, yoksa konuşma tamamlanamaz hâle gelir.
  const [sttOk, setSttOk] = useState<boolean | null>(null);
  /*
   * MİKROFON YOLUNUN NEDEN KAPANDIĞI SÖYLENİYOR.
   *
   * `sttOk === false` olunca ekran kalıcı olarak yazma yoluna geçiyordu ve
   * HİÇBİR ŞEY söylemiyordu: kullanıcı konuş düğmesinin kaybolduğunu görüyor,
   * sebebini bilmiyor. İki sebep de var ve ayrı şeyler söylüyor — izin
   * reddedildiyse yapılacak bir şey var ("Ayarlardan açabilirsin"), tanıyıcı
   * yoksa yok. Web ikisini ayrı ayrı yazıyor (`conversationp.mic_denied` ve
   * `conversation.no_asr`); mobil ikisini tek duruma katlayıp susuyordu.
   */
  const [sttSebep, setSttSebep] = useState<"denied" | "unavailable" | null>(null);
  /* Eller serbest dinlemesi bir söz bitince tetikleniyor: o ana kadar izin
     düşmüş olabilir, o yüzden durum ref üzerinden okunuyor. */
  const sttOkRef = useRef<boolean | null>(null);
  /** Ekran hâlâ açık mı — eller serbest dinlemesi ayrıldıktan sonra açılmasın. */
  const ekranAcik = useRef(true);
  useEffect(() => { ekranAcik.current = true; return () => { ekranAcik.current = false; }; }, []);
  const [listening, setListening] = useState(false);
  /* Eşzamanlı bayrak: öğretmen okurken elle açılan mikrofonun üstüne eller
     serbest dinlemesi ikinci kez açılmasın (state bir çizim geriden geliyor). */
  const listeningRef = useRef(false);
  // "Yazarak cevapla" seçildi mi. Adım başına SIFIRLANMIYOR: bir kez yazmaya
  // geçen öğrenci her adımda o düğmeyi yeniden aramasın.
  const [typing, setTyping] = useState(false);

  const scoreTotal = conversation ? scoredSteps(conversation) : 0;
  /* Kaydirma ANIMASYONU "hareketi azalt"a bagli; kaydirmanin kendisi degil.
     Web ayni ayrimi yapiyor (`behavior: reducedMotion() ? "auto" : "smooth"`). */
  const scrollDown = () => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: !reduceMotion() }), 60);
  const push = (b: BubbleData) => setFeed((f) => [...f, { ...b, id: bubbleId.current++ }]);
  /* Görünür alan KÜÇÜLÜNCE sohbeti SONA indir. Kaydırma yalnız içerik
     büyüdüğünde tetikleniyordu; klavye içerik eklemiyor, alanı küçültüyor —
     360dp Android'de ve iPhone SE'de "Yazarak cevapla"dan sonra ekranda eski
     balonlar kalıyor, cevap beklenen soru görünmüyordu (2026-09-22). Klavye
     olayına bağlamak yetmedi: cevap alanı klavyeden SONRA büyüyor (bkz.
     `useKeyboardLift`), o anda kaydırılan liste ardından yine kısalıyordu.
     Ölçü alanın kendi yüksekliği. */
  const sohbetBoyu = useRef(0);
  const onSohbetLayout = (h: number) => {
    if (sohbetBoyu.current > 0 && h < sohbetBoyu.current) scrollDown();
    sohbetBoyu.current = h;
  };

  // Tanıyıcı bu cihazda/dilde var mı — bir kez sorulur, cevabı ekran boyunca geçerli.
  // Ekrandan çıkarken mikrofon bırakılır: açık kalan oturum sonraki ekranda
  // "mikrofon meşgul" hatası veriyor.
  useEffect(() => {
    let alive = true;
    sttAvailable().then((v) => { if (alive) { setSttOk(v); sttOkRef.current = v; if (!v) setSttSebep("unavailable"); } }).catch(() => { if (alive) { setSttOk(false); sttOkRef.current = false; setSttSebep("unavailable"); } });
    /*
     * SOHBET KAPISI BAŞTA SORULUYOR: misafir ve izni reddeden için sohbet
     * atlanıyor, anlatımın sonunda "konuşmayı bitir" çıkıyor. Sağlayıcının
     * yapılandırılmamış olması ("off") kapı değil; cümle gönderilince servis
     * kesintisi olarak anlatılıyor ve yeniden deneniyor.
     */
    chatAvailability()
      .then((route) => {
        if (!alive) return;
        if (route === "account") setChatGate("account");
        else if (route === "declined") setChatGate("consent");
      })
      .catch(() => {});
    return () => { alive = false; stopListening(); };
    /* Efekt yalnız MOUNT içindir (konuşma kimliği değişmiyor, ekran yeniden kuruluyor). */
  }, []);

  // Anlatımı başlat: yarım kalan kayıt varsa devam teklif et, yoksa baştan.
  useEffect(() => {
    if (!conversation) return;
    loadConversationResume(conversation.id).then((r) => {
      if (r && (r.phase === "chat" || r.cursor < conversation.lecture.length)) setResumeOffer(r);
      else if (!reviewRef.current) beginLecture(0, false);
      setResumeChecked(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation]);

  // Anlatım ilerledikçe cihazda sakla (yarım kalırsa "devam et").
  useEffect(() => {
    if (!conversation || phase !== "lecture") return;
    if (cursor > 0 && cursor < conversation.lecture.length) void saveConversationResume(conversation.id, cursor, correct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, phase]);

  // Konuşma ilerledikçe de sakla: sohbet, tur sayısı, senaryo yolunun durumu.
  useEffect(() => {
    if (!conversation || phase !== "chat" || kaydedilen.current === true || !roleMsgs.length) return;
    void saveConversationResume(conversation.id, conversation.lecture.length, correct, { phase: "chat", roleMsgs, roleTurns, corrections });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleMsgs, roleTurns, phase, corrections]);

  /**
   * Konuşma BAŞLADI - web `conversation-player` ile aynı olay, aynı değer (1 kaldığı
   * yerden, 0 baştan) ve aynı kind (konuşma kimliği).
   *
   * Üç giriş yolu var (ilk açılış, "kaldığın yerden", "baştan başla") ve üçü
   * de `presentFrom` çağırıyor; olay tek bir yerden ve bir kez yazılıyor,
   * yoksa "baştan başla"ya basan öğrenci iki konuşma başlangıcı üretirdi.
   */
  useEffect(() => { handsFreeRef.current = handsFree; }, [handsFree]);
  useEffect(() => {
    void AsyncStorage.getItem(HANDSFREE_KEY).then((v) => setHandsFree(v !== "0")).catch(() => setHandsFree(true));
  }, []);
  function toggleHandsFree() {
    const next = !handsFree;
    setHandsFree(next);
    void AsyncStorage.setItem(HANDSFREE_KEY, next ? "1" : "0").catch(() => {});
    if (!next) stopListening();
  }

  const lectureStarted = useRef(false);
  function beginLecture(from: number, resumed: boolean) {
    if (conversation && !lectureStarted.current) {
      lectureStarted.current = true;
      track("conversation_start", resumed ? 1 : 0, conversation.id);
    }
    presentFrom(from);
  }

  /** cursor'dan itibaren: anlatım baloncuklarını aç, ilk `expect`li adımda dur. */
  function presentFrom(from: number) {
    if (!conversation) return;
    let k = from;
    const add: Bubble[] = [];
    while (k < conversation.lecture.length) {
      const step = conversation.lecture[k];
      add.push({ id: bubbleId.current++, role: "teacher", segments: step.say, content: { sub: `step:${k + 1}`, snapshot: { phase: "lecture", step } } });
      if (step.expect) break; // her beklenti (confirm/repeat/produce/truefalse) burada bekletir
      k++;
    }
    if (add.length) setFeed((f) => [...f, ...add]);
    setCursor(k);
    cursorRef.current = k;
    setTries(0);
    triesRef.current = 0;
    settled.current = null;
    setAnswered(false);
    const spoken = add.map((b) => (b.role === "teacher" ? targetText(b.segments) : "")).filter(Boolean).join(". ");
    const bekleyen = conversation.lecture[k]?.expect;
    /* Eller serbestken cümle BİTİNCE dinleniyor; kapalıyken eski yol
       (fire-and-forget) korunuyor, yani hiçbir şey yavaşlamıyor. */
    if (spoken && handsFreeRef.current && (bekleyen?.kind === "repeat" || bekleyen?.kind === "produce")) {
      void (async () => {
        try { await speakAndWaitVoiced(spoken, currentVoiceId()); } catch { /* ses yoksa yazıdan okunur */ }
        if (!ekranAcik.current || sttOkRef.current === false) return;
        /* SON ÇİZİMİN İŞLEYİCİSİ (`live`): bu kapanış adım değişmeden ÖNCEKİ çizimin
           `expect`/`tries`ini tutuyor; doğrudan `speakRepeat()` söyleneni bir önceki
           adımın hedefiyle karşılaştırıyordu ("heißen" adımında "Heißen" → yanlış,
           sonraki adımda "Try again (2/3)"; App Review kaydı, 2026-10-08). Okuma
           sürerken adım değiştiyse (atla) dinleme açılmıyor. Ses hemen düşerse yeni
           çizim henüz işlenmemiş olabilir: kısa bir süre onu bekliyor. */
        for (let i = 0; i < 20 && live.current.cursor < k; i++) await new Promise((r) => setTimeout(r, 25));
        if (!ekranAcik.current || live.current.cursor !== k) return;
        /* Okuma sürerken eller serbest kapatıldıysa ya da yazmaya geçildiyse mikrofon açılmıyor. */
        if (!handsFreeRef.current || live.current.typing) return;
        if (bekleyen.kind === "repeat") void live.current.speakRepeat();
        else void live.current.speakProduce();
      })();
    } else if (spoken) {
      speakTarget(spoken);
    }
    if (k >= conversation.lecture.length) enterChat();
    scrollDown();
  }

  const current = conversation && cursor < conversation.lecture.length ? conversation.lecture[cursor] : null;
  const expect = current?.expect;

  /* Yalnız hâlâ bu adımdaysa: çift dokunuş ya da gecikmeli ilerlemeden önce
     basılan "atla" aynı sonraki adımı iki kez açmasın (çift baloncuk ve okuma). */
  function advance() {
    if (cursorRef.current !== cursor) return;
    presentFrom(cursor + 1);
  }

  /** Sonuçtan `ms` sonra ilerle — o arada adım değiştiyse ya da ekrandan çıkıldıysa hiçbir şey yapmaz. */
  function advanceLater(ms: number) {
    const at = cursor;
    setTimeout(() => {
      if (ekranAcik.current && cursorRef.current === at) presentFrom(at + 1);
    }, ms);
  }

  function onConfirm() { advance(); }

  /**
   * ADIMI ATLA. Tıkanan öğrencinin ilerleme yolu yalnız "yazarak cevapla"ydı
   * ve o da doğru cevabı BİLMEYİ gerektiriyor; web her beklentili adımda bir
   * atlama bağlantısı veriyor (`conversation-player` `skipStep`). Atlanan adım
   * ölçümde sıfır sayılıyor - aynı olay, aynı değer, aynı kind biçimi.
   */
  function skipStep() {
    const k = expect?.kind;
    /* Sonuçlanmış adım (ilerleme beklemesinde) atlanmış sayılmıyor; yalnız hemen geçiliyor. */
    if (k && k !== "confirm" && settled.current !== cursor) track("conversation_step", 0, `${k}:skip`);
    stopListening();
    setTries(0);
    triesRef.current = 0;
    advance();
  }

  /**
   * Mikrofonu bir kez açar. İzin yoksa `sttOk` düşer ve ekran kalıcı olarak
   * yazma yoluna geçer — reddedilen izin her adımda yeniden sorulmaz.
   */
  async function dinle(): Promise<string[] | null> {
    if (listeningRef.current) return null;
    listeningRef.current = true;
    const izin = await ensureMicPermission();
    if (!izin) { listeningRef.current = false; setSttOk(false); sttOkRef.current = false; setSttSebep("denied"); return null; }
    setListening(true);
    /* Mikrofon açıldığında kısa "seni dinliyorum" sesi — web `cueListen`
       (`lib/conversations/cues`, 660→880 Hz) karşılığı mobilin `micon`u.
       Yürüyüşle aynı zamanlama (`WalkModeScreen`): tanıyıcı açıldıktan
       180 ms sonra; o arada biterse çalmıyor. Ses anahtarı kapalıysa `sfx`
       zaten susuyor. */
    const miconTimer = setTimeout(() => sfx("micon"), 180);
    try {
      return await listenOnce(currentTargetLocale(), LISTEN_CEILING_MS);
    } finally {
      clearTimeout(miconTimer);
      listeningRef.current = false;
      setListening(false);
    }
  }

  /** Duyulmadı balonu — sessiz kalan mikrofon öğrenciyi karanlıkta bırakmasın. */
  function duyulmadi() {
    push({ role: "teacher", segments: [{ lang: "tr", text: tx("speak.not_heard") }], tone: "hint" });
    scrollDown();
  }

  /**
   * Tekrar adımının sonucu. PUANLANMIYOR (bkz. scoredSteps): tekrar bir ölçme
   * değil, kelimeyi ağza alma denemesi. Üçüncü denemeden sonra doğrusu
   * duyurulup geçiliyor ki konuşma takılmasın.
   */
  function gradeRepeat(shown: string, ok: boolean, via: Via) {
    /* Adım başına tek hüküm: dinlerken yazılan cevap adımı bitirdiyse geç gelen mikrofon sonucu yok sayılıyor. */
    if (expect?.kind !== "repeat" || settled.current === cursor) return;
    const tries = triesRef.current; // state değil: dinlerken yazılan deneme de sayılsın
    push({ role: "student", text: shown, ok });
    haptic(ok ? "correct" : "wrong");
    if (ok) {
      settled.current = cursor;
      track("conversation_step", tries === 0 ? 2 : 1, `repeat:${via}`);
      speakTarget(expect.target);
      advanceLater(500);
      scrollDown();
      return;
    }
    const t = tries + 1;
    triesRef.current = t;
    setTries(t);
    if (t >= CONVERSATION_TRY_CEILING) {
      settled.current = cursor;
      /* Adım geçilemedi. Web de sıfırı YALNIZ burada yazıyor: her yanlış
         denemeye ayrı bir sıfır yazmak, bir adımı üç başarısız adım gibi
         gösterirdi. */
      track("conversation_step", 0, `repeat:${via}`);
      push({ role: "teacher", segments: [{ lang: "tr", text: tx("common.answer_is") }, { lang: currentTargetLang() as Segment["lang"], text: expect.target }], tone: "hint" });
      speakTarget(expect.target);
      advanceLater(900);
    }
    scrollDown();
  }

  /* `manual`: düğmeyle açıldı. Öğretmen hâlâ okuyorsa susturuluyor: mikrofon
     onun sesini duymasın; eller serbest dinlemesi de mikrofon açık diye çekiliyor. */
  async function speakRepeat(manual = false) {
    if (expect?.kind !== "repeat" || settled.current === cursor || listeningRef.current) return;
    if (manual) stopSpeaking();
    const at = cursor;
    const duyulan = await dinle();
    /* Dinlerken adım değiştiyse (atla) ya da ekrandan çıkıldıysa sonuç yazılmıyor. */
    if (!ekranAcik.current || cursorRef.current !== at) return;
    /* İzin bu dinlemede reddedildiyse "duyamadım" denmiyor (yazma yolu ve notu açılıyor). */
    if (!duyulan?.length) { if (sttOkRef.current !== false) duyulmadi(); return; }
    gradeRepeat(duyulan[0], spokenMatches(fc(duyulan), fc([expect.target])), "mic");
  }

  /** Mikrofonsuz yedek: tekrar adımı yazarak da geçilebilir. */
  function submitRepeatTyped() {
    if (expect?.kind !== "repeat") return;
    const text = input.trim();
    if (!text) return;
    setInput("");
    /* Yazılan cevap cümle hakeminden (web `submitTyped` ile aynı kural, `lib/typedAnswer`). */
    gradeRepeat(text, judgeTyped(text, expect.target, [], currentTargetLang()).pass, "typed");
  }

  async function speakProduce(manual = false) {
    if (expect?.kind !== "produce" || settled.current === cursor || listeningRef.current) return;
    if (manual) stopSpeaking();
    const at = cursor;
    const duyulan = await dinle();
    if (!ekranAcik.current || cursorRef.current !== at) return;
    if (!duyulan?.length) { if (sttOkRef.current !== false) duyulmadi(); return; }
    // Söylenen cevap tanıyıcı çıktısıyla karşılaştırılıyor (sayı/noktalama
    // katlaması dahil); yazılan cevap düz karşılaştırmadan geçiyor.
    gradeProduce(duyulan[0], spokenMatches(fc(duyulan), fc([expect.target, ...(expect.accept ?? [])])), "mic");
  }

  /**
   * YAZILAN CEVAP: cümle hakemi (tam ya da yalnız yazım geçer; sıra ve yanlış
   * "henüz değil"), üç kelimeden uzun cevap yerelde düşerse yapay zekâya
   * sorulur. Burada katlanmış TAM EŞİTLİK vardı: "Meine Mutter und mein Vater
   * kommen zum Fest" gibi doğru bir başka kuruluş reddediliyordu; web ise
   * kelime torbası kullanıp sırası bozuk cümleyi geçiriyordu (QA 2026-10-09).
   * Kural artık iki platformda tek (web `conversation-player` `submitTyped`).
   */
  async function submitProduce() {
    if (expect?.kind !== "produce" || checkingRef.current || !conversation) return;
    const text = input.trim();
    if (!text) return;
    setInput("");
    const lang = currentTargetLang();
    const j = judgeTyped(text, expect.target, expect.accept ?? [], lang);
    if (j.pass || !j.rescuable || settled.current === cursor) {
      gradeProduce(text, j.pass, "typed");
      return;
    }
    const at = cursor;
    const target = expect.target;
    checkingRef.current = true;
    setChecking(true);
    const ok = await rescueSentence({
      source: produceSource(conversation.lecture[at]?.say ?? [], lang),
      target,
      typed: text,
      level: conversation.level,
      lang,
      guest: isGuest,
    });
    checkingRef.current = false;
    if (!ekranAcik.current) return;
    setChecking(false);
    // Beklerken adım atlandıysa karar yutuluyor.
    if (cursorRef.current !== at) return;
    gradeProduce(text, ok, "typed", ok);
  }

  /** Konuşma fazında mikrofon — duyulan replik doğrudan gönderilir. */
  async function speakRole() {
    if (listeningRef.current) return;
    stopSpeaking(); // karşı tarafın okuması mikrofona girmesin (bkz. `speakRepeat`)
    const duyulan = await dinle();
    /* Dinlerken ekrandan çıkıldıysa ya da konuşma bitirildiyse cümle gönderilmiyor. */
    if (!ekranAcik.current || live.current.phase !== "chat") return;
    if (!duyulan?.length) { if (sttOkRef.current !== false) duyulmadi(); return; }
    void sendRole(duyulan[0]);
  }

  /* Gecikmeli çağrılar (seslendirme bitince açılan eller serbest dinlemesi) için son
     çizimin adımı ve işleyicileri; bkz. `presentFrom`. */
  const live = useRef({ cursor, phase, typing, speakRepeat, speakProduce });
  useEffect(() => { live.current = { cursor, phase, typing, speakRepeat, speakProduce }; });

  /** `rescued`: yerel hakem düşürdü, yapay zekâ kabul etti (`submitProduce`). */
  function gradeProduce(text: string, ok: boolean, via: Via, rescued = false) {
    if (expect?.kind !== "produce" || settled.current === cursor) return;
    const tries = triesRef.current; // state değil: dinlerken yazılan deneme de sayılsın
    push({ role: "student", text, ok });
    if (ok) {
      settled.current = cursor;
      track("conversation_step", tries === 0 ? 2 : 1, `produce:${via}`);
      haptic("correct");
      /*
       * İSABET YALNIZ İLK DENEMEDE SAYILIYOR.
       *
       * Sayaç her doğruda artıyordu, kaçıncı denemede olduğuna bakmadan: aynı
       * adımı üçüncü denemede bilen öğrenci de ilk denemede bilenle aynı
       * yüzdeyi alıyordu. Ekranın kendi ölçümü zaten ayrımı biliyor
       * (`conversation_step` değeri 2 ilk denemede, 1 sonrakinde) - puan onu
       * görmezden geliyordu. Web `conversation-player` iki adım türünde de
       * `ok && isFirstTry` istiyor.
       *
       * Doğru/yanlış adımında fark yok: orada tek deneme var (`answered`
       * kilidi), yani doğru cevap zaten hep ilk denemede geliyor.
       */
      if (tries === 0) setCorrect((c) => c + 1);
      /* Yapay zekâ başka bir doğru kuruluşu kabul ettiyse övgü yerine dersin
         kalıbı: cevap doğru, öğretilen biçim bu (web aynı satır). */
      push({ role: "teacher", segments: rescued
        ? [{ lang: "tr", text: tx("rounds.rescue_taught") }, { lang: currentTargetLang() as Segment["lang"], text: expect.target }]
        : [{ lang: "tr", text: tx(PRAISE_KEYS[correct % PRAISE_KEYS.length]) }] });
      speakTarget(expect.target);
      advanceLater(500);
    } else {
      haptic("wrong");
      const t = tries + 1;
      triesRef.current = t;
      setTries(t);
      if (t >= CONVERSATION_TRY_CEILING) {
        settled.current = cursor;
        track("conversation_step", 0, `produce:${via}`);
        // Doğru cevap balonu: dil etiketi KURSTAN gelir. Sabit "de" yazıyordu;
        // çizim `lang !== "tr"` diye baktığı için görünürde bir şey bozulmuyordu
        // ama İngilizce hedefi "Almanca" diye etiketlemek, dile göre dallanan
        // bir okuyucu eklendiği anda sessizce yanlış sonuç verirdi.
        push({ role: "teacher", segments: [{ lang: "tr", text: tx("common.answer_is") }, { lang: currentTargetLang() as Segment["lang"], text: expect.target }], tone: "hint" });
        speakTarget(expect.target);
        advanceLater(900);
      } else {
        /* Cevap hedefin bozulmuş hâli değil, BAŞKA bir cümle: adımın kural
           ipucu ("'weil'den sonra fiil en sona gider") burada yanlış teşhis
           olurdu — öğrenci kuralı uygulamış olabilir (denetim T16). İstenen
           cümle söyleniyor.
           Bozulmuş hâliyse HATANIN KENDİSİ gösteriliyor (QA F-0020): "zwei Tag"
           yazana kelime sırası ipucu çıkıyordu, hatası çoğul ekiydi. Balonda
           hakemin farkı ("Tag → Tage"); ipucu yalnız hatanın türüne uyuyorsa,
           uymuyorsa "Doğrusu: … Tekrar dene." Web `conversation-player` aynı
           hakemle aynı dal (`produceFeedback`). */
        const tl = currentTargetLang();
        const hintText = (expect.hint ?? []).filter((x) => x.lang !== tl).map((x) => x.text).join(" ");
        const fb = produceFeedback(text, expect.target, expect.accept ?? [], hintText, tl);
        if (fb.kind === "other") {
          push({ role: "teacher", segments: [{ lang: "tr", text: tx("conversationp.produce_other") }, { lang: tl as Segment["lang"], text: expect.target }], tone: "hint" });
        } else {
          push({
            role: "teacher",
            segments: fb.hint && expect.hint?.length
              ? expect.hint
              : [{ lang: "tr", text: tx("common.answer_is") }, { lang: tl as Segment["lang"], text: fb.matched }, { lang: "tr", text: tx("conversationp.produce_retry") }],
            tone: "hint",
            ...(fb.lines.length ? { diff: fb.lines } : {}),
          });
        }
      }
    }
    scrollDown();
  }

  function answerTrueFalse(pick: boolean) {
    if (expect?.kind !== "truefalse" || answered || settled.current === cursor) return;
    settled.current = cursor;
    setAnswered(true);
    const ok = pick === expect.answer;
    /* Yol "tap": bu adım iki düğmeyle cevaplanıyor, tek deneme var (`answered`
       kilidi) ve o yüzden doğru cevap her zaman ilk denemede geliyor. */
    track("conversation_step", ok ? 2 : 0, "truefalse:tap");
    push({ role: "student", text: tx(pick ? "common.correct" : "common.wrong"), ok });
    haptic(ok ? "correct" : "wrong");
    if (ok) setCorrect((c) => c + 1);
    push({ role: "teacher", segments: expect.why, tone: "why" });
    advanceLater(1100);
    scrollDown();
  }

  // ---- Konuşma (chat) ----
  function enterChat() {
    if (!conversation) return;
    setPhase("chat");
    /* Kayıt SİLİNMİYOR: konuşma fazı da saklanıyor (bkz. `saveConversationResume`). */
    setFeed([]);
    push({ role: "teacher", segments: [{ lang: "tr", text: tx("conversation.scene", { scene: conversation.chat.scene }) }] });
    /* Sohbet atlandıysa (izin yok ya da misafir) açılış yok: not ve "konuşmayı bitir". */
    if (waivedRef.current) {
      push(waivedNote(chatGate === "account" ? "account" : "consent"));
      scrollDown();
      return;
    }
    const opening = conversation.chat.opening;
    if (opening) {
      push({ role: "teacher", segments: [{ lang: "de", text: opening }, ...(conversation.chat.openingTr ? [{ lang: "tr" as const, text: conversation.chat.openingTr }] : [])], content: { sub: "0", snapshot: { phase: "chat", opening } } });
      putRoleMsgs([{ role: "assistant", content: opening }]);
      speakTarget(opening);
    }
    scrollDown();
  }

  /** Yarım kalan konuşmayı geri kurar: sahne, sohbet, tur sayısı, senaryo yolu. */
  function resumeChat(r: ConversationResume) {
    if (!conversation) return;
    track("conversation_start", 1, conversation.id);
    setCorrect(r.correct);
    setCursor(conversation.lecture.length);
    cursorRef.current = conversation.lecture.length;
    setPhase("chat");
    setFeed([]);
    push({ role: "teacher", segments: [{ lang: "tr", text: tx("conversation.scene", { scene: conversation.chat.scene }) }] });
    const msgs = r.roleMsgs ?? [];
    /* Geri kurulan yapay zekâ yanıtları da bildirilebilir (denetim İ2): ref canlı
       akıştakiyle aynı "<konuşma>:<tur>", tur = yanıttan önceki kullanıcı mesajı
       sayısı. Açılış repliği (ilk kullanıcı mesajından önce) hazır metin, Bildir yok. */
    let userTurns = 0;
    for (const m of msgs) {
      if (m.role === "user") { userTurns++; push({ role: "student", text: m.content }); }
      else {
        /* Kayıtta gövdesiz (yalnız işaretli) cevap kalmış olabilir: ham metin çizilmez (QA F-0002). */
        const body = parseReply(m.content).body;
        if (body) push({ role: "teacher", segments: [{ lang: "de", text: body }], report: userTurns > 0 ? { ref: `${conversation.id}:${userTurns}`, text: m.content } : undefined });
      }
    }
    push({ role: "teacher", segments: [{ lang: "tr", text: tx("conversationp.resumed") }], tone: "hint" });
    putRoleMsgs(msgs);
    putRoleTurns(r.roleTurns ?? msgs.filter((m) => m.role === "user").length);
    /* Eski kayıtta alan yok: düzeltmeler o zaman kaybolmuştu, boş başlıyor. */
    setCorrections(Array.isArray(r.corrections) ? r.corrections : []);
    if (waivedRef.current) push(waivedNote(chatGate === "account" ? "account" : "consent"));
    scrollDown();
  }

  async function sendRole(textArg?: string, attempt = 0) {
    /* Tek istek uçuşta (`sending`); geçmiş ve sayaç ref'ten (bkz. `roleMsgsRef`). */
    if (!conversation || sending.current || waivedRef.current || quotaRef.current) return;
    const text = (textArg ?? input).trim();
    if (!text) return;
    sending.current = true;
    setFailed(null);
    push({ role: "student", text });
    setInput("");
    setSuggestions([]);
    setBusy(true);
    const prev = roleMsgsRef.current;
    const next: ChatMsg[] = [...prev, { role: "user", content: text }];
    putRoleMsgs(next);
    const turn = roleTurnsRef.current + 1;
    putRoleTurns(turn);
    scrollDown();
    /* Gönderilmeyen tur sayılmıyor ve akışta kalmıyor: sayaç, modele giden
       geçmiş ve öğrenci baloncuğu geri alınıyor (web `conversation-player` aynı). */
    const undoTurn = () => {
      putRoleTurns(turn - 1);
      putRoleMsgs(prev);
      setFeed((f) => {
        const i = f.map((b) => b.role).lastIndexOf("student");
        return i < 0 ? f : [...f.slice(0, i), ...f.slice(i + 1)];
      });
    };
    try {
      const reply = await sendChat(conversation.id, next);
      const parsed = parseReply(reply || "");
      const bodyText = parsed.body;
      /* GÖVDESİZ CEVAPTA HAM METİN YOK (QA F-0002). Model yalnız öneri satırı
         yazınca ("[SAY] Zwei Pfund Äpfel, sehr gerne.") gövde boş kalıyor ve
         balona HAM cevap düşüyordu, işaretleriyle birlikte. Sunucu bu durumların
         çoğunu onarıyor; istemci yine de işaretli metni hiç çizmiyor: gövde
         yoksa balon yok (düzeltme varsa yalnız o), öneriler düğmelerde. Modele
         giden geçmişte boş mesaj olmasın diye orada ham cevap kalıyor; geri
         kurulurken (`resumeChat`) aynı ayrıştırma. Web `Bubble` aynı kural. */
      putRoleMsgs([...next, { role: "assistant", content: bodyText || reply || "…" }]);
      if (bodyText || parsed.corrections.length) push({ role: "teacher", segments: bodyText ? [{ lang: "de", text: bodyText }] : [], fix: parsed.corrections.length ? parsed.corrections : undefined, report: { ref: `${conversation.id}:${turn}`, text: reply } });
      setSuggestions(parsed.suggestions);
      /* Düzeltme balonda gösterildiği anda özete de yazılıyor (bkz. `corrections`). */
      if (parsed.corrections.length) setCorrections((c) => [...c, ...parsed.corrections]);
      if (bodyText && ekranAcik.current) speakTarget(bodyText);
    } catch (e) {
      undoTurn();
      if (isAiConsentDeclined(e) || isAccountRequired(e)) {
        /* İZİN VERİLMEDİ ya da MİSAFİR: cümle sağlayıcıya gitmedi. Sohbet
           atlanıyor, konuşma anlatım puanıyla bitiriliyor (muafiyeti sunucu veriyor). */
        const gate = isAccountRequired(e) ? "account" : "consent";
        setChatGate(gate);
        waivedRef.current = true;
        push(waivedNote(gate));
      } else if (e instanceof ApiError && e.status === 403 && e.message === "premium_required") {
        /* HAK YOK — bağlantı hatası değil, kilit. */
        setServerLocked(true);
        void refreshPremium();
      } else if (e instanceof ApiError && e.status === 429) {
        /* Günlük sohbet mesajı tavanı (kötüye kullanım sınırı) — "bağlantı
           sorunu" DEĞİL, yarın sürüyor. */
        setInput(text);
        if (!quotaRef.current) {
          quotaRef.current = true;
          setQuotaHit(true);
          push({ role: "teacher", segments: [{ lang: "tr", text: tx("conversationp.chat_quota", { n: premiumStatus?.limits.fairUse.chatTurnsPerDay ?? 300 }) }], tone: "hint" });
        }
      } else {
        /* GÖNDERİLEMEDİ: sebebi doğru söyle, cümleyi tut, kendiliğinden yeniden dene.
           Sunucu cevap verdiyse (5xx) sorun bizde; zaman aşımı `ApiError(0)`;
           ikisi de değilse sunucuya ulaşılamadı (internet ya da ağ engeli: mobil
           ikisini ayıramıyor, cümle ikisini de söylüyor). */
        const kind: SendFailure["kind"] =
          e instanceof ApiError && e.status >= 500 ? "service" : e instanceof ApiError && e.status === 0 ? "slow" : e instanceof ApiError ? "service" : "unreachable";
        setFailed({ text, kind, attempt, retryIn: RETRY_DELAYS[attempt] ?? null });
      }
    } finally {
      sending.current = false;
      setBusy(false);
      scrollDown();
    }
  }

  /*
    GÖNDERİLEMEYEN CÜMLENİN YENİDEN DENENMESİ: geri sayım bitince ya da uygulama
    öne gelince. `RETRY_DELAYS` bitince durup "Şimdi dene"ye bırakıyor.
  */
  const retryRef = useRef<() => void>(() => {});
  useEffect(() => {
    retryRef.current = () => {
      if (failed) void sendRole(failed.text, failed.attempt + 1);
    };
  });
  useEffect(() => {
    if (!failed || failed.retryIn == null || phase !== "chat") {
      setCountdown(null);
      return;
    }
    let left = failed.retryIn;
    setCountdown(left);
    const tick = setInterval(() => {
      left -= 1;
      setCountdown(left);
      if (left <= 0) {
        clearInterval(tick);
        retryRef.current();
      }
    }, 1000);
    const sub = AppState.addEventListener("change", (st) => {
      if (st === "active") {
        clearInterval(tick);
        retryRef.current();
      }
    });
    return () => {
      clearInterval(tick);
      sub.remove();
    };
  }, [failed, phase]);

  /* `conversation` henüz yüklenmemişken de okunuyor, o yüzden `??` kalıyor - ama
     uydurulmuş bir eşik değil sıfır: konuşma gelmeden "yeter" demesin. Eşiğin
     kendisi içerikten, artık zorunlu alandan geliyor. */
  const minTurns = conversation?.chat.minTurns ?? 0;
  /* Muaf sohbette (izin yok ya da misafir) konuşma anlatımla bitiriliyor. */
  const chatReady = roleTurns >= minTurns || waived;

  // ---- Özet + kayıt ----
  async function finish(roleDone: boolean) {
    if (!conversation) return;
    setPhase("summary");
    /* Aynı hüküm iki kez yazılmıyor; ama yarım kaydın ardından gelen
       tamamlanma yazılıyor. */
    if (kaydedilen.current === true || (kaydedilen.current === false && !roleDone)) return;
    kaydedilen.current = roleDone;
    sfx("finish"); // tamamlanma sesi (özet; kayıt koruması sayesinde hüküm başına bir kez)
    /* Puan yüzdesi web ile aynı formül: puanlanan adımlar içinde doğru oranı
       (`correct` üstten kırpılıyor - konuşma fazı `correct`i artırmıyor ama
       formül yine de tavanı aşmasın). Geçme kaydı sunucuda. */
    track("conversation_finish", scoreTotal ? Math.round((100 * Math.min(correct, scoreTotal)) / scoreTotal) : 0, conversation.id);
    /* Senaryolu konuşmanın puanı: kalıpların kaçı kullanıldı. Web
       `conversation-player` aynı adı aynı değerle yazıyor; mobilde çevrimdışı yol
       yeni geldiği için ölçüm de şimdi geliyor. */
    /* "Şimdilik bırak" konuşmayı BİTMİŞ işaretlemiyor ve kaldığı yeri silmiyor:
       bir sonraki açılışta konuşmaya dönülüyor. Sunucuya yine yazılıyor ki
       Patika adımı "denendi" görünsün ve sıra ilerlesin. */
    if (roleDone) {
      void markItemDone(conversation.id);
      void clearConversationResume(conversation.id);
    }
    const seconds = Math.round((Date.now() - startedAt.current) / 1000);
    /* `finishId` bu bitiriş için bir kez: anlık yeniden deneme ve kuyruk aynısını
       gönderiyor, sunucu aynı bitirişi ikinci kez yazmıyor. */
    /* Muaf sohbet YAPILMIŞ sayılmıyor: `chatDone` false gidiyor, muafiyeti sunucu veriyor. */
    const payload = { conversationId: conversation.id, correct, chatDone: roleDone && !waivedRef.current, day: todayStr(), seconds, finishId: newFinishId() };
    const gonder = () => fetchWithTimeout(`${apiBase()}/api/conversation`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    try {
      /*
        AĞ HATASINDA BİR KEZ DAHA. iOS'ta boşta kalmış bir bağlantı sunucu
        tarafında kapanmışken (nginx keepalive, deploy'daki yeniden yükleme)
        POST aynı bağlantıdan gidip "bağlantı koptu" ile düşüyor ve işletim
        sistemi POST'u kendiliğinden yinelemiyor. Görüldü 2026-09-28: son
        istekten ~80 sn sonra (nginx keepalive 75 sn) basılan "bitir" sunucuya
        hiç varmadı (erişim günlüğünde yok), sonuç cihaz kuyruğunda kaldı;
        Patika adımı "0/13 · Şimdi" gösterirken Konuşma hakkı harcanmıştı.
        İkinci deneme yeni bağlantıyla gidiyor. İlk istek sunucuya varmışsa
        ikinci kopya zararsız: ikisi aynı `finishId`i taşıyor ve uç aynı
        bitirişi yeniden yazmıyor (`recordConversation`). Web
        `conversation-player` aynı yolda.
      */
      let res: Response;
      try {
        res = await gonder();
      } catch {
        await new Promise((r) => setTimeout(r, CONVERSATION_SAVE_RETRY_MS));
        res = await gonder();
      }
      /* Sunucu gövdeyi reddettiyse (4xx) kuyruğa almanın anlamı yok; ağ ya da
         sunucu kaynaklı bir düşüş ise sonuç bekletiliyor. */
      if (!res.ok && res.status >= 500) await queueConversationResult(payload);
      /* YANIT OKUNUYOR. Uç `passed`, `nextDays`, `xpGained`, `currentStreak`
         ve `totalXp` döndürüyor; mobil hiçbirini okumuyordu ve konuşmanın NE ZAMAN
         geri geleceği (aralıklı tekrar merdiveni) bu yüzden hiçbir yerde
         yazmıyordu. Web özetin altında söylüyor. */
      /* Konuşma bitti: Konuşma adımı "bitirildi" sayılıyor ve bir sonraki hak
         açılmış olabilir — kilit açma durumu tazeleniyor. */
      if (res.ok) void refreshPremium();
      if (res.ok) {
        const d = (await res.json()) as { nextDays?: number; passed?: boolean };
        if (typeof d?.nextDays === "number") setNextDays(d.nextDays);
        /* `passed` OKUNUYOR. Özet başlığı her hâlde "Konuşma bitti" diyordu;
           konuşma yarım bırakılmışsa bu yanlış bir tamamlandı damgası. Web
           iki başlığı ayırıyor. */
        if (typeof d?.passed === "boolean") setPassed(d.passed);
      }
    } catch {
      /* ÇEVRİMDIŞI: yerel işaret Patika'yı bitmiş gösteriyor ama sunucu konuşmayı
         hiç öğrenmiyordu - XP yok, tekrar merdiveni yok, cihaz değiştirince
         konuşma geri geliyordu. Sonuç kendi günüyle kuyruğa alınıyor. */
      await queueConversationResult(payload);
    }
    /* SAYILAR KAYITTAN SONRA TAZELENİYOR (denetim T16). Sinyal isteğin
       ÖNÜNDE çalıyordu: başlık, Patika ve günün görevleri sunucuya kayıt
       düşmeden yeniden çekiliyor ve "Bir konuşma tamamla" 0/1'de kalıyordu.
       Web `lernomi:stats`ı zaten yanıttan sonra yayınlıyor. */
    bumpStats(); // konuşma bitti: XP/seri/görev değişti
  }

  const nextConversation = useMemo(() => {
    if (!conversation) return null;
    const list = require("../data/conversations").conversationsForLevel(conversation.level) as Conversation[];
    const i = list.findIndex((l) => l.id === conversation.id);
    return i >= 0 && i + 1 < list.length ? list[i + 1] : null;
  }, [conversation]);

  if (!conversation && !packReady) {
    /* Paket inerken KONUŞMA EKRANININ iskeleti (başlık satırı, anlatım şeridi,
       baloncuklar, dipte "Hazırım"): paket gelince açılan ekran bu; genel
       içerik iskeleti (başlık + kart + iki düğme) onun yerini tutmuyordu. */
    return <ConversationSkeleton />;
  }
  if (!conversation) {
    return (
      <FlowScreen center actions={<FlowActions primary={{ label: tx("common.close"), onPress: () => nav.goBack() }} />}>
        {/* DURUM ŞABLONU: bulunamayan konuşma = üzgün maskot, tek çıkış birincil
            "Kapat", üstte geri oku yok (web `conversations/[id]/not-found` bir
            sayfa, orada bağlantı "Geri dön"). */}
        <StateBody alert title={packFailed ? tx("content.couldn_t_load") : tx("conversation.this_conversation_wasn_t_found")} body={packFailed ? tx("social.err_offline") : null} />
      </FlowScreen>
    );
  }

  if (review && resumeChecked && !resumeOffer && phase === "lecture") {
    return (
      <PreviousResult
        eyebrow={`${tx("unitkind.conversation")} · ${conversation.level}`}
        result={review}
        passed={params.done ?? false}
        onRetry={() => { setReview(null); beginLecture(0, false); }}
        onClose={() => nav.goBack()}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm }}>
      {/* Başlık + ilerleme */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        {/* GERİ OKU YALNIZ OTURUMDA (anlatım, sohbet). Özet (sonuç), kaldığın
            yerden sorusu (başlamadan önce) ve kilit (bilgi) ekranlarında üstte
            düğme yok: çıkış dipteki "Kapat" (2026-09-30, bilgi ve sonuç
            ekranlarının ortak kuralı; web `ConversationExit` aynı). */}
        {phase === "summary" || resumeOffer || convLocked ? null : (
          <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={tx("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
            <BackIcon color={colors.text} size={24} />
          </PressableScale>
        )}
        <View style={{ flex: 1 }}>
          <Text variant="h3" numberOfLines={1}>{conversation.title}</Text>
          <Text variant="caption" color={colors.textMuted} numberOfLines={1}>
            {tx(phase === "lecture" ? "conversation.phase_lecture" : phase === "chat" ? "conversation.phase_chat" : "conversation.phase_summary")} · {conversation.titleTr}
          </Text>
        </View>
        {/* ELLER SERBEST anahtarı — web başlık şeridinde tutuyor. Mikrofon
            hiç yoksa çizilmiyor: kapatılacak bir şey yok. */}
        {sttOk !== false && phase !== "summary" ? (
          <PressableScale
            hitSlop={4}
            onPress={toggleHandsFree}
            accessibilityRole="switch"
            accessibilityState={{ checked: handsFree }}
            accessibilityLabel={tx(handsFree ? "conversationp.hands_free_on" : "conversationp.hands_free")}
            style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs, paddingHorizontal: compactWidth ? spacing.md : 10, paddingVertical: spacing.sm, minHeight: 36, borderRadius: radii.pill, backgroundColor: handsFree ? colors.primary : colors.surface2 }}
          >
            {/* Açıkken dolu turuncu + beyaz (2026-09-29 Samet: seçim B, dolu turuncu çip). */}
            <SkillSpeakingIcon color={handsFree ? colors.onPrimary : colors.textMuted} size={compactWidth ? 18 : 14} />
            {/* Dar ekranda yalnız ikon: etiket başlığı "Irregular …"a kadar
                kesiyordu. Durum rengi ve erişilebilirlik adı yine taşıyor. */}
            {!compactWidth && (
              <Text variant="micro" color={handsFree ? colors.onPrimary : colors.textMuted}>
                {tx(handsFree ? "conversationp.hands_free_on" : "conversationp.hands_free")}
              </Text>
            )}
          </PressableScale>
        ) : null}
      </View>
      {/* Sohbet boyunca EKRANDA KALIR — akışta kaybolan tek seferlik bir
          baloncuk, konuşmanın ortasına dönen kullanıcıya hiçbir şey söylemez. */}
      {/* Senaryoda (misafir, izin yok, servis kapalı) karşıdaki yapay zekâ
          değil: "yapay zekâ ile konuşuyorsun" demek yanlış olurdu. */}
      {phase === "chat" && !waived && (
        <AiNotice variant="character" style={{ marginHorizontal: spacing.lg, marginBottom: spacing.xs }} />
      )}
      {phase === "lecture" && (
        <View style={{ flexDirection: "row", gap: 3, paddingHorizontal: spacing.lg, marginBottom: spacing.xs }}>
          {conversation.lecture.map((s, i) => (
            <View key={i} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: i < cursor ? colors.success : i === cursor ? stepTone(s, colors) : colors.surface2 }} />
          ))}
        </View>
      )}

      {convLocked && phase !== "summary" ? (
        /* KİLİTLİ KONUŞMA ADIMI: konuşmaya girilmiyor; neden, nasıl açılır ve
           Premium yolu tek ekranda. */
        <View style={{ flex: 1, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md }}>
          <View style={{ flex: 1, justifyContent: "center", gap: spacing.md }}>
            <StateBody title={tx("unlock.locked_conv")} />
            {convCopy ? <UnlockProgress copy={convCopy} /> : null}
          </View>
          <FlowActions
            primary={{ label: tx("unlock.premium_now"), onPress: () => nav.navigate("Paywall") }}
            close={() => nav.goBack()}
          />
        </View>
      ) : !resumeChecked ? (
        // Sohbet kabuğunun iskeleti: öğretmen baloncukları + alt eylem alanı.
        <>
          <LectureSkeleton />
          <View ref={dockRef} collapsable={false} style={{ paddingHorizontal: spacing.lg, paddingBottom: Math.max(dockLift, insets.bottom + spacing.md), paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.bg }}>
            <Skeleton height={BIG_BUTTON_H()} radius={radii.lg} />
          </View>
        </>
      ) : phase === "summary" ? (
        <Summary conversation={conversation} cando={cando} correct={correct} total={scoreTotal} next={nextConversation} roleMsgs={roleMsgs} corrections={corrections} nextDays={nextDays} colors={colors} insets={insets}
          onBack={() => nav.goBack()}
          onNext={nextConversation ? () => nav.replace("Conversation", { id: nextConversation.id }) : undefined}
          passed={passed}
          turnsDone={chatReady}
          skipped={waived && roleTurns === 0}
          onResume={() => setPhase("chat")}
          onExam={() => nav.navigate("ConversationScored", { id: conversation.id })} />
      ) : resumeOffer ? (
        /*
          KALDIĞIN YERDEN — durum şablonu (el sallayan maskot) + nerede
          kalındığını söyleyen kart. Eskiden yalnız "ara vermiştin" yazıyordu:
          öğrenci anlatımın sonunda mı, konuşmanın ortasında mı olduğunu
          bilmeden seçiyordu. Web kaydı kendiliğinden sürdürüp ince bir not
          gösteriyor (`conversation-player` `resumed`) — bilinçli fark: webde ekran
          sohbetin kendisi, burada tam ekran bir soru.
        */
        <View style={{ flex: 1, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md }}>
          <View style={{ flex: 1, justifyContent: "center", gap: spacing.md }}>
            <StateBody title={tx("conversation.pick_up_where_you_left_off")} body={tx("conversation.you_paused_this_conversation_pick_up")} />
            <DetailCard title={tx("conversationp.resume_where")}>
              <DetailRow
                left={tx("conversation.phase_lecture")}
                right={resumeOffer.phase === "chat" || resumeOffer.cursor >= conversation.lecture.length ? `${conversation.lecture.length}/${conversation.lecture.length} ✓` : `${resumeOffer.cursor}/${conversation.lecture.length}`}
                faded={resumeOffer.phase === "chat"}
              />
              {resumeOffer.phase === "chat" ? (
                <DetailRow left={tx("conversation.phase_chat")} right={tx("conversationp.resume_turns", { n: resumeOffer.roleTurns ?? (resumeOffer.roleMsgs ?? []).filter((m) => m.role === "user").length, min: conversation.chat.minTurns })} />
              ) : null}
            </DetailCard>
          </View>
          <FlowActions
            primary={{ label: tx("conversation.continue_where_you_left_off"), onPress: () => { const r = resumeOffer; setResumeOffer(null); if (r.phase === "chat") resumeChat(r); else { setCorrect(r.correct); beginLecture(r.cursor, true); } } }}
            tertiary={{ label: tx("conversation.start_over"), onPress: () => { setResumeOffer(null); void clearConversationResume(conversation.id); beginLecture(0, false); } }}
            close={() => nav.goBack()}
          />
        </View>
      ) : (
        <>
          <KeyboardAwareScroll ref={scrollRef} automaticallyAdjustKeyboardInsets contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.lg }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })} onLayout={(e) => onSohbetLayout(e.nativeEvent.layout.height)}>
            {feed.map((b) => <BubbleView key={b.id} b={b} colors={colors} onReport={setReport} conversationId={conversation.id} />)}
            {/* Karşı taraf yanıt hazırlarken baloncuk içinde "yazıyor" noktaları
                (web `conversation-player` `TypingDots`); dönen çark bekleme
                gibi görünüyordu, noktalar karşı tarafın yazması gibi. */}
            {(busy || checking) && (
              <View style={{ alignSelf: "flex-start", marginTop: spacing.xs, backgroundColor: colors.surface2, borderRadius: radii.lg, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
                <TypingDots />
              </View>
            )}
          </KeyboardAwareScroll>

          {/* Alt eylem alanı — tek el için ekranın altında. */}
          <View ref={dockRef} collapsable={false} style={{ paddingHorizontal: spacing.lg, paddingBottom: Math.max(dockLift, insets.bottom + spacing.md), paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.bg }}>
            {phase === "lecture" ? (
              <LectureControls expect={expect} tries={triesShown} input={input} setInput={setInput}
                onConfirm={onConfirm} onSpeakRepeat={() => void speakRepeat(true)} onTypedRepeat={submitRepeatTyped}
                onSpeakProduce={() => void speakProduce(true)} onProduce={() => void submitProduce()} onTrueFalse={answerTrueFalse}
                sttOk={sttOk} sttSebep={sttSebep} listening={listening} typing={typing} setTyping={setTyping}
                onSkip={skipStep} colors={colors} />
            ) : (
              <ChatControls input={input} setInput={setInput} busy={busy} onSend={() => sendRole()}
                onSpeak={() => void speakRole()}
                suggestions={suggestions} onSuggest={(s) => sendRole(s)}
                ready={chatReady} turns={roleTurns} minTurns={minTurns} onFinish={() => finish(true)} onLeave={() => void finish(false)}
                waived={waived} quotaHit={quotaHit} failed={failed} countdown={countdown} onRetry={() => { if (failed) void sendRole(failed.text, failed.attempt); }}
                sttOk={sttOk} sttSebep={sttSebep} listening={listening} typing={typing} setTyping={setTyping} colors={colors} />
            )}
          </View>
        </>
      )}
      <ReportSheet visible={!!report} kind="chat" refId={report?.ref ?? ""} content={report?.text ?? ""} onClose={() => setReport(null)} />
    </View>
  );
}

/** `BigButton` yüksekliği: h3 + dikey `lg` dolgu (iskeletler için). */
const BIG_BUTTON_H = () => textHeight("h3") + spacing.lg * 2;

/**
 * Anlatım akışının iskeleti — öğretmen baloncukları (`BubbleView`: iki satır
 * gövde, dikey 10 dolgu, 1 kenarlık) ve altlarındaki "Dinle" satırı.
 */
function LectureSkeleton() {
  /* Baloncuk içeriğe göre daralıyor (en çok %88) ve cümlelerin değeri paketle
     geliyor: ~100 harflik dolgu gerçek baloncuğun kabında görünmez çiziliyor,
     baloncuk onun ölçülen sarılmasıyla büyüyor (telefonda üç satır, tablette
     tek satır). Sabit yüzde + iki satır tablette hem uzun hem yüksek kalıyordu. */
  return (
    <View style={{ flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.sm }}>
      {[96, 70, 110].map((chars, i) => (
        <View key={i} style={{ alignSelf: "flex-start", maxWidth: "88%", marginBottom: spacing.md }}>
          {/* Kenarlık (1) dolguya katıldı: blok kutuyu kenarından kenarına dolduruyor. */}
          <View style={{ paddingHorizontal: spacing.md + 1, paddingVertical: 11 }} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
              <Skeleton height="100%" radius={radii.lg} />
            </View>
            <Text variant="body" accessible={false} style={{ opacity: 0 }}>{skeletonFiller(chars)}</Text>
          </View>
          <SkeletonLine variant="micro" width={54} style={{ marginTop: spacing.xs, marginLeft: spacing.xs }} />
        </View>
      ))}
    </View>
  );
}

/**
 * Konuşma ekranının tamamının iskeleti — içerik paketi inerken. Sıra
 * gerçeğindeki gibi: geri karosu + başlık/alt satır + eller serbest hapı,
 * anlatım şeridi, baloncuklar, alt eylem alanı.
 */
function ConversationSkeleton() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { compactWidth } = useLayout();
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityState={{ busy: true }}
      accessibilityLabel={tx("common.loading")}
      style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <Skeleton height={44} width={44} radius={radii.md} />
        <View style={{ flex: 1 }}>
          {/* Tek satırlık ad + karşılık (~22 harf): yüzde değil, harf boyu — tablette başlık çubuğu kolonun yarısına uzuyordu. */}
          <SkeletonLine variant="h3" width={176} />
          <SkeletonLine variant="caption" width={132} />
        </View>
        <SkeletonPill width={compactWidth ? 44 : 108} height={36} />
      </View>
      <View style={{ flexDirection: "row", gap: 3, paddingHorizontal: spacing.lg, marginBottom: spacing.xs }}>
        {Array.from({ length: 8 }, (_, i) => <Skeleton key={i} height={5} radius={3} style={{ flex: 1 }} />)}
      </View>
      <LectureSkeleton />
      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.hairline }}>
        <Skeleton height={BIG_BUTTON_H()} radius={radii.lg} />
      </View>
    </View>
  );
}

/** Övgü satırları — t() çağrı anında (dil modül yüklenirken hazır değil). */
const PRAISE_KEYS = ["conversation.praise_1", "conversation.praise_2", "conversation.praise_3", "conversation.praise_4", "conversation.praise_5"];

function BubbleView({ b, colors, onReport, conversationId }: { b: Bubble; colors: Palette; onReport?: (r: ReportRef) => void; conversationId: string }) {
  if (b.role === "student") {
    return (
      <View style={{ alignSelf: "flex-end", maxWidth: "84%", marginBottom: spacing.md, flexDirection: "row", alignItems: "center", gap: 6 }}>
        {/* KUYRUK KÖŞESİ: konuşan tarafa bakan alt köşe küçülüyor (radii.sm).
            Koç balonu bunu baştan beri yapıyor (`ui/CoachBubble`), konuşma ve rol
            yapma balonları ise dört köşesi eşit duruyordu; web de öyleydi ama
            orada kuyruk 4 px'lik ölçek dışı bir değerdi. Üç balon artık aynı
            biçimde. */}
        <View style={[{ borderRadius: radii.lg, borderBottomRightRadius: radii.sm, paddingVertical: 10, paddingHorizontal: spacing.md, backgroundColor: b.ok === false ? colors.danger : colors.primary }, softShadow(colors.primary, 6)]}>
          <Text variant="body" color={colors.onPrimary}>{b.text}</Text>
        </View>
      </View>
    );
  }
  const bg = b.tone === "hint" ? colors.surface2 : b.tone === "why" ? colors.primarySoft : colors.surface;
  return (
    <View style={{ alignSelf: "flex-start", maxWidth: "88%", marginBottom: spacing.md }}>
      <View style={{ borderRadius: radii.lg, borderBottomLeftRadius: radii.sm, paddingVertical: 10, paddingHorizontal: spacing.md, backgroundColor: bg, borderWidth: 1, borderColor: colors.hairline }}>
        {/* Üretim adımının yanlışı: önce hatanın kendisi (QA F-0020). */}
        {b.diff?.length ? <View style={{ marginBottom: 6 }}><DiffLineList lines={b.diff} /></View> : null}
        {b.segments.length ? (
          <Text variant="body">
            {b.segments.map((s, i) => (
              <Text key={i} variant="body" color={s.lang !== "tr" ? colors.text : colors.textMuted} style={s.lang !== "tr" ? { fontWeight: "700" } : undefined}>
                {/* Parçalar arasına boşluk konur — sonraki parça noktalama ile
                    başlıyorsa konmaz ("then . Sonra" olmasın); hedef dildeki
                    parçadan sonra yeni cümle başlıyorsa nokta konur ("Jott. Bir
                    de …", QA F-0009). Kural web ile tek: `lib/segmentText`. */}
                {s.text}{segmentGap(b.segments, i)}
              </Text>
            ))}
          </Text>
        ) : null}
        {b.fix?.length ? (
          <View style={b.segments.length ? { marginTop: spacing.sm, gap: 2, borderTopWidth: 1, borderTopColor: colors.hairline, paddingTop: 6 } : { gap: 2 }}>
            {b.fix.map((f, i) => <Text key={i} variant="micro" color={colors.textMuted}>{tx("conversation.fix", { text: f })}</Text>)}
          </View>
        ) : null}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.xs, marginLeft: spacing.xs }}>
        {targetText(b.segments) ? (
          <PressableScale onPress={() => speakTarget(targetText(b.segments))} hitSlop={8} style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs }}>
            <SpeakerIcon color={colors.textMuted} size={15} /><Text variant="micro" color={colors.textMuted}>{tx("conversation.listen")}</Text>
          </PressableScale>
        ) : null}
        {/* Yapay zekâ yanıtının "Bildir"i ve yazılı içeriğin (anlatım adımı,
            senaryo repliği) "Bildir"i aynı görünüm, aynı yer: baloncuğun altı. */}
        {b.report && onReport ? (
          <ReportButton onPress={() => onReport(b.report!)} label={tx("conversation.report_this_answer")} />
        ) : b.content ? (
          <ReportFlag report={() => ({ surface: "conversation", target: { type: "conversation", id: conversationId, sub: b.content!.sub }, snapshot: b.content!.snapshot })} />
        ) : null}
      </View>
    </View>
  );
}

function BigButton({ label, onPress, tint, colors, disabled }: { label: string; onPress: () => void; tint?: string; colors: Palette; disabled?: boolean }) {
  const bg = tint ?? colors.primary;
  /* KAPALI DÜĞME KAPALI OLDUĞUNU SÖYLÜYOR. `onPress`i boş bir işlevle
     değiştirmek düğmeyi ölü yapıyordu ama ekran okuyucuya hiçbir şey
     söylemiyordu: `disabled` verilmediği için `accessibilityState` de
     boştu, yani basılamayan bir düğme "basılabilir" diye okunuyordu.
     Sönüklüğü de `PressableScale` veriyor (bkz. oradaki not); renk takası
     kalktı, web de takas yapmıyor. */
  return (
    <PressableScale onPress={onPress} disabled={disabled}>
      <View style={[{ borderRadius: radii.lg, backgroundColor: bg, paddingVertical: spacing.lg, alignItems: "center" }, disabled ? {} : softShadow(bg, 10)]}>
        <Text variant="h3" color={colors.onPrimary}>{label}</Text>
      </View>
    </PressableScale>
  );
}

/**
 * Mikrofon düğmesi — konuşma yolunun tek girişi. Dinlerken kendini kilitler ki
 * ikinci dokunuş açık oturumu bölmesin.
 */
function MicButton({ listening, onPress, label, colors }: { listening: boolean; onPress: () => void; label: string; colors: Palette }) {
  return (
    <PressableScale onPress={listening ? () => {} : onPress}>
      <View style={[{ borderRadius: radii.lg, backgroundColor: listening ? colors.surface2 : colors.primary, paddingVertical: spacing.lg, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: spacing.sm }, listening ? {} : softShadow(colors.primary, 10)]}>
        <MicPulse active={listening}><SkillSpeakingIcon color={listening ? colors.primaryText : colors.onPrimary} size={22} /></MicPulse>
        <Text variant="h3" color={listening ? colors.primaryText : colors.onPrimary}>
          {listening ? tx("speak.listening") : label}
        </Text>
      </View>
    </PressableScale>
  );
}

/** Yazma satırı — mikrofonun yedeği; üç yerde aynı biçim. */
function TypedRow({ value, onChange, onSubmit, placeholder, colors, disabled }: {
  value: string; onChange: (s: string) => void; onSubmit: () => void; placeholder: string; colors: Palette; disabled?: boolean;
}) {
  const dolu = !!value.trim() && !disabled;
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end", gap: spacing.sm }}>
      <TextInput autoCorrect={false} spellCheck={false} value={value} onChangeText={onChange} placeholder={placeholder}
      accessibilityLabel={placeholder} placeholderTextColor={colors.textFaint}
        editable={!disabled} multiline autoCapitalize="sentences" onSubmitEditing={onSubmit}
        /* Enter = Gönder. `multiline` tek başına Enter'ı alt satıra
           çeviriyor ve `onSubmitEditing` hiç çağrılmıyordu. */
        submitBehavior="submit" returnKeyType="send"
        style={{ flex: 1, maxHeight: ds(120), backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, color: colors.text, fontSize: 16 }} />
      <PressableScale accessibilityLabel={tx("common.send")} onPress={onSubmit} disabled={!dolu} style={[{ width: 48, height: 48, borderRadius: radii.pill, alignItems: "center", justifyContent: "center", backgroundColor: dolu ? colors.primary : colors.surface2 }, dolu ? softShadow(colors.primary, 8) : {}]}>
        <SendIcon color={dolu ? colors.onPrimary : colors.textFaint} size={22} />
      </PressableScale>
    </View>
  );
}

/** "Yazarak cevapla" — mikrofon çalışıyorken bile açık kalan kaçış yolu. */
function TypeToggle({ onPress, colors }: { onPress: () => void; colors: Palette }) {
  return (
    <PressableScale onPress={onPress} style={{ alignItems: "center", paddingVertical: spacing.xs }}>
      <Text variant="caption" color={colors.textMuted}>{tx("conversation.answer_by_typing")}</Text>
    </PressableScale>
  );
}

function LectureControls({ expect, tries, input, setInput, onConfirm, onSpeakRepeat, onTypedRepeat, onSpeakProduce, onProduce, onTrueFalse, sttOk, sttSebep, listening, typing, setTyping, onSkip, colors }: {
  expect: Expectation | undefined; tries: number; input: string; setInput: (s: string) => void;
  onConfirm: () => void; onSpeakRepeat: () => void; onTypedRepeat: () => void; onSpeakProduce: () => void;
  onProduce: () => void; onTrueFalse: (b: boolean) => void;
  sttOk: boolean | null; sttSebep: "denied" | "unavailable" | null; listening: boolean; typing: boolean; setTyping: (v: boolean) => void;
  onSkip: () => void; colors: Palette;
}) {
  // Mikrofon yoksa/izin verilmediyse yazma tek yol — konuşma tamamlanabilir kalmalı.
  const yaziYolu = sttOk === false || typing;
  /* Yazma yoluna GEÇİLDİYSE sebebi yazılıyor (bkz. `sttSebep`). Yalnız
     mikrofon düştüğünde: kullanıcı kendi isteğiyle yazmaya geçtiyse
     (`typing`) açıklamaya gerek yok. */
  const sttNotu =
    sttOk === false ? (
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>
        {tx(sttSebep === "denied" ? "speak.mic_needed" : "conversation.no_asr")}
      </Text>
    ) : null;
  /* Beklentili her adımda atlama yolu: tıkanan öğrenci konuşmayı bırakmak zorunda
     kalmasın (web `conversation-player` aynı bağlantıyı veriyor). "Devam" ve
     "hazırım" adımlarında anlamsız - orada beklenti yok. */
  const atla = (
    <PressableScale onPress={onSkip} style={{ alignItems: "center", paddingVertical: spacing.xs }}>
      <Text variant="caption" color={colors.textMuted}>{tx("conversationp.skip_step")}</Text>
    </PressableScale>
  );
  if (!expect) return <BigButton label={tx("conversation.continue")} onPress={onConfirm} colors={colors} />;
  if (expect.kind === "confirm") return <BigButton label={tx("conversation.i_m_ready")} onPress={onConfirm} colors={colors} />;
  if (expect.kind === "repeat") {
    return (
      <View style={{ gap: spacing.sm }}>
        {sttNotu}
        {tries > 0 && <Text variant="caption" color={colors.dangerText}>{tx("conversation.try_again", { n: tries })}</Text>}
        <PressableScale onPress={() => speakTarget(expect.target)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.sm, paddingVertical: 10, borderRadius: radii.lg, backgroundColor: colors.surface2 }}>
          <SpeakerIcon color={colors.primaryText} size={20} /><Text variant="bodyStrong" color={colors.primaryText}>{expect.target}</Text>
        </PressableScale>
        {yaziYolu ? (
          <TypedRow value={input} onChange={setInput} onSubmit={onTypedRepeat} placeholder={tx("conversation.type_in", { lang: targetLangName() })} colors={colors} />
        ) : (
          <>
            <MicButton listening={listening} onPress={onSpeakRepeat} label={tx("conversation.mic_repeat")} colors={colors} />
            <TypeToggle onPress={() => setTyping(true)} colors={colors} />
          </>
        )}
        {atla}
      </View>
    );
  }
  if (expect.kind === "truefalse") {
    return (
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <View style={{ flex: 1 }}>
          <PressableScale onPress={() => onTrueFalse(true)}>
            <View style={[{ borderRadius: radii.lg, backgroundColor: colors.success, paddingVertical: spacing.lg, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: spacing.sm }, softShadow(colors.success, 8)]}>
              <CheckIcon color={colors.onFill} size={22} /><Text variant="h3" color={colors.onFill}>{tx("conversation.correct")}</Text>
            </View>
          </PressableScale>
        </View>
        <View style={{ flex: 1 }}>
          <PressableScale onPress={() => onTrueFalse(false)}>
            <View style={[{ borderRadius: radii.lg, backgroundColor: colors.danger, paddingVertical: spacing.lg, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: spacing.sm }, softShadow(colors.danger, 8)]}>
              <WrongIcon color={colors.onFill} size={22} /><Text variant="h3" color={colors.onFill}>{tx("conversation.wrong")}</Text>
            </View>
          </PressableScale>
        </View>
        {atla}
      </View>
    );
  }
  // produce — cümleyi kurup SÖYLEMESİ bekleniyor; yazmak yedek yol.
  return (
    <View style={{ gap: spacing.sm }}>
      {sttNotu}
      {tries > 0 && <Text variant="caption" color={colors.dangerText}>{tx("conversation.try_again", { n: tries })}</Text>}
      {yaziYolu ? (
        <TypedRow value={input} onChange={setInput} onSubmit={onProduce} placeholder={tx("conversation.type_your_answer", { lang: targetLangName() })} colors={colors} />
      ) : (
        <>
          <MicButton listening={listening} onPress={onSpeakProduce} label={tx("conversation.mic_produce")} colors={colors} />
          <TypeToggle onPress={() => setTyping(true)} colors={colors} />
        </>
      )}
      {atla}
    </View>
  );
}

function ChatControls({ input, setInput, busy, onSend, onSpeak, suggestions, onSuggest, ready, turns, minTurns, onFinish, onLeave, waived, quotaHit, failed, countdown, onRetry, sttOk, sttSebep, listening, typing, setTyping, colors }: {
  input: string; setInput: (s: string) => void; busy: boolean; onSend: () => void; onSpeak: () => void;
  suggestions: string[]; onSuggest: (s: string) => void;
  ready: boolean; turns: number; minTurns: number; onFinish: () => void; onLeave: () => void;
  /** Sohbet atlandı (izin yok ya da misafir): yalnız "konuşmayı bitir". */
  waived: boolean;
  /** Günlük sohbet tavanı doldu: gönderme yolu kapalı, uyarı akışta bir kez yazılı. */
  quotaHit: boolean;
  failed: SendFailure | null; countdown: number | null; onRetry: () => void;
  sttOk: boolean | null; sttSebep: "denied" | "unavailable" | null; listening: boolean; typing: boolean; setTyping: (v: boolean) => void; colors: Palette;
}) {
  const yaziYolu = sttOk === false || typing;
  /* Yazma yoluna GEÇİLDİYSE sebebi yazılıyor (bkz. `sttSebep`). Yalnız
     mikrofon düştüğünde: kullanıcı kendi isteğiyle yazmaya geçtiyse
     (`typing`) açıklamaya gerek yok. */
  const sttNotu =
    sttOk === false ? (
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>
        {tx(sttSebep === "denied" ? "speak.mic_needed" : "conversation.no_asr")}
      </Text>
    ) : null;
  if (waived) {
    return <BigButton label={tx("conversation.end_conversation_summary")} onPress={onFinish} tint={colors.success} colors={colors} />;
  }
  const n = Math.max(0, countdown ?? 0);
  const failText = !failed
    ? null
    : busy
      ? tx("conversationp.send_retrying")
      : failed.retryIn == null
        ? tx("conversationp.send_gave_up")
        : tx(failed.kind === "service" ? "conversationp.send_service" : failed.kind === "slow" ? "conversationp.send_slow" : "conversationp.send_unreachable", { n });
  return (
    <View style={{ gap: spacing.sm }}>
      {failed ? (
        /* Gönderilemeyen cümle: soluk metin, sebep, "Şimdi dene" (bkz. `SendFailure`). */
        <View accessibilityLiveRegion="polite" style={{ gap: spacing.xs, padding: spacing.sm, borderRadius: radii.md, backgroundColor: colors.surface2 }}>
          <Text variant="body" color={colors.textMuted} numberOfLines={3}>“{failed.text}”</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            <Text variant="caption" color={colors.streakText} style={{ flex: 1 }}>{failText}</Text>
            {busy ? null : (
              <PressableScale onPress={onRetry} hitSlop={6} style={{ paddingHorizontal: spacing.sm, paddingVertical: spacing.xs }}>
                <Text variant="caption" color={colors.primaryText}>{tx("conversationp.retry_now")}</Text>
              </PressableScale>
            )}
          </View>
        </View>
      ) : null}
      {sttNotu}
      {!busy && !quotaHit && suggestions.length > 0 && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.xs }}>
          {suggestions.map((s, i) => (
            <PressableScale key={i} onPress={() => onSuggest(s)} style={{ backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderWidth: 1, borderColor: colors.primary }}>
              <Text variant="caption" color={colors.primaryText}>{s}</Text>
            </PressableScale>
          ))}
        </View>
      )}
      {ready ? (
        <BigButton label={tx("conversation.end_conversation_summary")} onPress={onFinish} tint={colors.success} colors={colors} />
      ) : (
        /* "ŞİMDİLİK BIRAK" — web `conversation-player` ile aynı çıkış. Yoktu: tur
           sayısı dolmadan konuşmadan çıkmanın tek yolu geri tuşuydu ve deneme
           hiçbir yere yazılmıyordu. Kaldığı yer saklı kalıyor. */
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm }}>
          <Text variant="caption" color={colors.textMuted} style={{ flex: 1 }}>{tx("conversation.keep_talking", { n: turns, target: minTurns })}</Text>
          {turns > 0 ? (
            <PressableScale onPress={onLeave} hitSlop={6} style={{ paddingHorizontal: spacing.sm, paddingVertical: spacing.xs }}>
              <Text variant="caption" color={colors.primaryText}>{tx("conversationp.leave_for_now")}</Text>
            </PressableScale>
          ) : null}
        </View>
      )}
      {quotaHit ? null : yaziYolu ? (
        <TypedRow value={input} onChange={setInput} onSubmit={onSend} placeholder={tx("conversation.type_in", { lang: targetLangName() })} colors={colors} disabled={busy} />
      ) : (
        <>
          <MicButton listening={listening} onPress={busy ? () => {} : onSpeak} label={tx("conversation.mic_talk")} colors={colors} />
          <TypeToggle onPress={() => setTyping(true)} colors={colors} />
        </>
      )}
    </View>
  );
}

function Summary({ conversation, cando, correct, total, next, roleMsgs, corrections, nextDays, passed, turnsDone, skipped, colors, insets, onBack, onNext, onExam, onResume }: {
  conversation: Conversation;
  /** "Yapabildiklerim" etiketleri; `null` hâlâ yükleniyor (satırın yeri iskeletle tutuluyor). */
  cando: string[] | null;
  correct: number; total: number; next: Conversation | null; roleMsgs: ChatMsg[]; corrections: string[]; nextDays: number | null; colors: Palette;
  passed: boolean | null;
  /** Yerel hüküm: asgari tur doldu mu. Sunucu yanıtı gelmezse (çevrimdışı) başlık buna bakıyor. */
  turnsDone: boolean;
  /** Sohbet atlandı (izin yok ya da misafir): tur yerine "Sohbet atlandı". */
  skipped: boolean;
  insets: { bottom: number }; onBack: () => void; onNext?: () => void; onExam?: () => void; onResume?: () => void;
}) {
  const pct = total ? Math.round((correct / total) * 100) : 100;
  /*
   * "ARTIK ŞUNU YAPABİLİRİM" — konuşmanın ödeme satırı ve mobilde hiç yoktu.
   *
   * Web özetin altında bunu yazıyor (`conversationp.i_can`): kullanıcı turu
   * bitiriyor, kaç doğru yaptığını görüyor ama NE KAZANDIĞINI görmüyordu.
   * Kimlikler konuşmadan (`candoMap`), metni `/api/cando`dan — sohbet
   * sınavındaki yolun aynısı (`ConversationScoredScreen`). Alınamazsa satır
   * çizilmiyor: etiket bir süs, konuşma özeti ona bağlı değil.
   *
   * ÖZET AÇILDIKTAN SONRA ARAYA GİRMİYOR (QA F-0070): etiketler özet açılınca
   * çekiliyordu ve satır sonradan gelip altındaki her şeyi aşağı itiyordu.
   * Artık ekran açılırken çekiliyor; hâlâ yolda ise yeri iskeletle tutuluyor.
   */
  /* Düzeltmeler sohbet sırasında toplanıyor (bkz. ekranın `corrections`
     durumu): `roleMsgs` temizlenmiş gövdeyi tuttuğu için buradan yeniden
     çıkarmak her zaman sıfır veriyordu. Web aynı listeyi ham cevaplardan,
     aynı ayrıştırıcıyla (`parseReply`) çıkarıyor. */
  const userTurns = roleMsgs.filter((m) => m.role === "user").length;
  const talked = roleMsgs.length > 1;
  /*
    İKİ AYRI KOŞUL, İKİ AYRI SONUÇ (denetim T16).

    Özet sunucunun `passed: false` hükmünü "asgari tur dolmadı" diye
    okuyordu; oysa hüküm iki koşulun VE'si: sohbet bitti mi (`chatDone`) ve
    anlatımın puanlı adımlarında ilk denemede oran eşiği geçti mi
    (`CONVERSATION_PASS_RATIO`). 10/9 turla biten, alıştırmada 2/3 yapan
    konuşma "yarım kaldı · en az 9 tur gerekiyor" dedi — Patika ise adımı
    doğru olarak bitmiş saymıştı.

    Neyin neye bağlı olduğu (sunucu `recordConversation`, `immersion/progress`,
    `lib/quests`):
      - Patika adımı ve "konuşma sayıldı": yalnız sohbetin bitmesi.
      - Günün görevi "Bir konuşma tamamla": o gün yazılan her kayıt.
      - XP: isabete ve sohbete göre; eşik yok.
      - Tekrar merdiveni: `passed` — eşiğin altında aralık başa (1 gün) döner.
    Yani YARIM yalnız tur eksikse; isabet düşükse konuşma tamamlanmış ve
    sayılmıştır, yalnız yakında yeniden gelir. İkisi ayrı söyleniyor.

    `passed === false` ve tur tamamsa sebep tanımı gereği isabettir; sunucu
    yanıtı yoksa (çevrimdışı) aynı eşik yerelde sayılıyor.
  */
  const unfinished = !turnsDone;
  const need = conversationPassNeed(total);
  const scoreLow = (total > 0 && correct < need) || (passed === false && turnsDone);
  /*
    SONUÇ ŞABLONU (ui/flow): band → üç sayı → notlar → ayrıntı kartları →
    altta sabit düğmeler (en çok üç). Eskiden 110'luk maskot, dev başlık, üç
    ayrı kutu, dört kart, iki not ve beş düğmeye kadar alt alta diziliyordu;
    "Patika'ya dön" hep en altta kayboluyordu. Konfeti YOK: konuşma
    Patika'nın sıradan bir adımı, kutlama büyük anlara ayrıldı (`ui/Celebrate`).
  */
  return (
    <View style={{ flex: 1 }}>
      {/* Kaydırma alanı düğmelerin ÜSTÜNDE kalan yüksekliği alıyor (`flex: 1`,
          `FlowScreen` ile aynı) ve içerik orada kayıyor: uzun özette son kart
          (düzeltmeler, kelimeler) sabit düğmelerin arkasında kalmıyor (QA F-0003). */}
      <KeyboardAwareScroll style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.lg, gap: spacing.md }} showsVerticalScrollIndicator={false}>
        <ResultHero
          eyebrow={`${tx("unitkind.conversation")} · ${conversation.title}`}
          title={tx(unfinished ? "conversationp.conversation_unfinished" : "conversation.conversation_complete")}
          figure={total ? `${correct}/${total}` : null}
          sub={skipped ? tx("conversationp.chat_skipped") : tx("conversationp.n_turns", { n: userTurns })}
          quiet={unfinished}
          pill={unfinished ? { text: tx("conversationp.pill_min_turns", { n: conversation.chat.minTurns }), tone: "bad" } : scoreLow ? { text: tx("conversationp.pill_score_low", { need, total }), tone: "brand" } : null}
        />
        {/* Tur sayısı KONUŞMANIN UZUNLUĞU, isabetten ayrı bir şey söylüyor;
            eşikle birlikte yazılıyor ki eksik kalanı görünsün. Tekrar günü
            aralıklı tekrar merdiveninden (kayıt yanıtı). */}
        <StatRow items={[
          { value: formatPercent(pct), label: tx("conversation.accuracy"), tone: scoreLow ? "bad" : null },
          skipped
            ? { value: "—", label: tx("conversationp.chat_skipped") }
            : { value: `${userTurns}/${conversation.chat.minTurns}`, label: tx("conversationp.stat_turns"), tone: unfinished ? "bad" : "ok" },
          ...(!unfinished && nextDays !== null ? [{ value: tx("profile.days", { n: nextDays }), label: tx("conversationp.stat_review") }] : []),
        ]} />

        {/* KONUŞMA NEDEN TAMAMLANMADI ve NE YAPILACAK — not + "Konuşmaya dön". */}
        {unfinished ? <FlowNote tone="warn" icon={<WarningIcon color={colors.streakText} size={16} />} text={tx("conversationp.min_turns_note", { n: conversation.chat.minTurns })} /> : null}
        {/* İSABET EŞİĞİN ALTINDA — tur notundan AYRI: konuşma sayıldıysa bunu
            söylüyor, yalnız tekrar aralığının neden uzamadığını açıklıyor. */}
        {scoreLow ? <FlowNote tone="warn" icon={<WarningIcon color={colors.streakText} size={16} />} text={tx(unfinished ? "conversationp.score_low_note_unfinished" : "conversationp.score_low_note", { correct, total, need })} /> : null}
        {cando === null ? (
          <Skeleton height={textHeight("caption") + spacing.sm * 2} radius={radii.md} />
        ) : cando.length ? <FlowNote tone="ok" icon={<CorrectIcon color={colors.successText} size={16} />} text={`${tx("conversationp.i_can")} ${cando.join(" · ")}`} /> : null}
        {/* Misafirin ilk tamamlanan konuşması: kaybedecek bir şeyi olduğu ilk an. */}
        <GuestMilestoneCard milestone="first_conversation" when={!unfinished} />
        {!corrections.length && talked ? <FlowNote tone="ok" icon={<CorrectIcon color={colors.successText} size={16} />} text={tx("conversationp.no_corrections")} /> : null}

        {/* DÜZELTMELER TOPLU — konuşmada balon balon geçiyor, kapanışta bir
            arada. Kalıplardan ÖNCE: öğrencinin kendi cümlelerine dair tek kart,
            uzun özette ekranın dibine itilmesin (QA F-0003; web aynı sıra). */}
        {corrections.length ? (
          <DetailCard title={tx("conversationp.corrections")}>
            {corrections.map((c, i) => (
              <Text key={i} variant="caption" color={colors.text}>{c}</Text>
            ))}
          </DetailCard>
        ) : null}

        {conversation.patterns?.length ? (
          <DetailCard title={tx("conversation.patterns_you_learned")}>
            {/*
              KULLANILAN KALIP İŞARETLİ — konuşmanın asıl amacı kalıbı KULLANMAK.
              Web aynı `patternUsed` kuralıyla işaretliyor. Konuşma hiç
              olmadıysa işaret de yok: yanlış bir "yapmadın" damgası vurmasın.
            */}
            {conversation.patterns.map((p, i) => {
              const used = talked && patternUsed(p.de, roleMsgs);
              return (
                <View key={i} style={{ flexDirection: "row", gap: spacing.sm, alignItems: "flex-start", opacity: talked && !used ? 0.6 : 1 }}>
                  {talked ? (
                    <IconLine variant="bodyStrong" style={{ width: 16 }}>
                      {used ? <CheckIcon color={colors.successText} size={14} /> : null}
                    </IconLine>
                  ) : null}
                  {/*
                    KALIP ÜSTTE, AÇIKLAMA ALTINDA. İkisi yan yanaydı: kalıp
                    doğal genişliğini alıyor, açıklama `flex: 1` ile ARTANI
                    alıyordu. Uzun bir İngilizce kalıpta ("I have worked in this
                    industry for six years.") artan kalmıyor ve açıklama tek harf
                    genişliğinde harf harf kırılıyordu (iOS, 2026-09-28). Alt
                    alta her iki metin de satırın tamamını kullanıyor. Web
                    `conversation-player` aynı düzende.
                  */}
                  <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
                    <Text variant="bodyStrong" color={used ? colors.successText : colors.text}>{p.de}</Text>
                    {p.tr ? <Text variant="caption" color={colors.textMuted}>{p.tr}</Text> : null}
                  </View>
                </View>
              );
            })}
          </DetailCard>
        ) : null}

        {/* KONUŞMANIN KELİMELERİ kapanışta bir kez daha — konuşmanın dili toplu. */}
        {conversation.vocab?.length ? (
          <DetailCard title={tx("conversationp.words_of_conversation")}>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
              {conversation.vocab.map((v) => (
                <View key={v.de} style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: radii.pill, backgroundColor: colors.surface2 }}>
                  <Text variant="micro" color={colors.text}><Text variant="micro" color={colors.text} style={{ fontWeight: "700" }}>{v.de}</Text> · {v.tr}</Text>
                </View>
              ))}
            </View>
          </DetailCard>
        ) : null}
      </KeyboardAwareScroll>

      {/* Düğmeler kaydırılan özetin DIŞINDA: "Patika'ya dön" kaybolmuyor. */}
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.md }}>
        {unfinished ? (
          <FlowActions
            primary={onResume ? { label: tx("conversationp.back_to_conversation"), onPress: onResume } : { label: tx("common.close"), onPress: onBack }}
            close={onResume ? onBack : null}
          />
        ) : (
          <FlowActions
            primary={onNext && next ? { label: tx("conversation.next_speaking", { title: next.title }), onPress: onNext } : { label: tx("common.close"), onPress: onBack }}
            /* SINAV OLARAK DENE — konuşma yapıldıysa aynı sahne bir de ölçüm
               olarak oynanabiliyor (WP-22): yardım yok, 5 tur, rubrik puanı. */
            secondary={onExam && talked ? { label: tx("conversationp.try_scored"), hint: tx("conversationp.scored_hint"), onPress: onExam } : null}
            close={onNext && next ? onBack : null}
          />
        )}
      </View>
    </View>
  );
}
