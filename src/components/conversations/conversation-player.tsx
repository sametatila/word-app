"use client";

import { ReportFlag, ReportLink, snapshot } from "@/components/report-flag";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, CHAT_TIMEOUT_MS } from "@/lib/api-fetch";
import { isAiConsentDeclined } from "@/lib/ai-consent-client";
import { AiNotice } from "@/components/ai-notice";
import { track } from "@/lib/track";
import { AnimatePresence, motion } from "framer-motion";
import {
  prefetchGerman,
  prefetchSegments,
  speakGerman,
  speakSegments,
  stopSpeaking,
  useSpeechAvailable,
} from "@/components/speak-button";
import { recognitionCtor, requestMicrophone, type Recognition } from "@/components/microphone";
import { CheckIcon, CloseIcon, CorrectIcon, LockedIcon, SkillSpeakingIcon, SpeakerIcon, WarningIcon, WrongIcon } from "@/components/icons";
import { parseReply } from "@/lib/chat-format";
import { DetailCard, FlowActions, FlowColumn, FlowNote, ResultHero, StatRow, StateBody } from "@/components/flow";
import { reducedMotion, vibrate } from "@/lib/fx";
import { useStill } from "@/lib/use-still";
import { cueListen, startThinking } from "@/lib/conversations/cues";
import { judgeSpeech, type SpeechVerdict } from "@/lib/speech";
import { type Expectation, type Conversation, type Segment } from "@/lib/conversations/types";
import { useT, useLang } from "@/lib/i18n/client";
import { ReportDialog } from "@/components/report-dialog";
import { UnlockProgress } from "@/components/unlock-progress";
import type { SurfaceView } from "@/lib/premium/unlock-copy";
import { DAILY_QUOTAS } from "@/lib/quotas";
import { RoundExit } from "@/components/round-exit";
import { CONVERSATION_TRY_CEILING, conversationPassNeed } from "@/lib/conversations/chat-const";
import { produceFeedback, type DiffLine } from "@/lib/sentence-match";
import { DiffLineList } from "@/components/feedback/marked";
import { judgeTyped } from "@/lib/typed-answer";
import { produceSource } from "@/lib/conversations/produce-source";
import { segmentGap } from "@/lib/conversations/segment-text";
import { rescueSentence } from "@/lib/sentence-rescue";
import { formatPercent, translate, type NativeLang } from "@/lib/i18n/dict";
import { courseName, speechLocaleOf, targetLangOf } from "@/lib/courses";
import { parseJudgment } from "@/lib/voice-intent";
import { localDay } from "@/lib/day";
import { flushPendingConversations, newFinishId, queueConversationResult } from "@/lib/conversation-queue";
import { CONVERSATION_RESUME_DAYS, CONVERSATION_RESUME_KEY } from "@/lib/storage-hygiene";
import { IconLine } from "@/components/icon-line";

/**
 * Konuşma oynatıcısı — anlatım, sohbet, özet.
 *
 * Anlatım bir sohbet gibi akıyor ama senaryosu yazılı: öğretmen söylüyor,
 * öğrenci KONUŞARAK cevap veriyor, senaryo ilerliyor. Model beklenmediği için
 * akışta hiç "cevap geliyor…" yok; tek bekleme sesin kendisi ve o da önceden
 * indiriliyor.
 *
 * İki dilin sınırı her an kesin: anlatım parçaları Türkçe sesle, hedefler
 * Almanca sesle okunuyor; beklenen cevap Almancaysa tanıyıcı Almanca,
 * Türkçeyse (onay, doğru/yanlış) Türkçe dinliyor. Yanlış dilde dinlemek
 * tanıyıcıya en yakın kelimeyi uydurtmak demek — bu yüzden dil, adımın
 * beklentisinden türetiliyor ve asla tahmin edilmiyor.
 */

type Phase = "lecture" | "chat" | "summary";
/**
 * Yazılan cevabın hükmü (`submitTyped`): `rescued` yapay zekâ kabul etti,
 * `shown` öğrencinin baloncuğu beklerken zaten eklendi.
 */
type TypedVerdict = { ok: boolean; missing: string[]; rescued?: boolean; shown?: boolean };
type Turn = { role: "user" | "assistant"; content: string };

/**
 * Anlatım akışındaki bir baloncuk.
 *
 * `pending` baloncuğun "yazıyor" hâli: içerik hazır ama ses henüz
 * hazırlanıyor. Metin, ses başlamadan bir nefes önce açılıyor — indirme ve
 * çözme gecikmesi kullanıcıya boş bir bekleme olarak değil, karşı tarafın
 * yazması olarak görünüyor. `id` çizim anahtarı: dizin anahtarıyla liste
 * güncellemeleri giriş animasyonlarını şaşırtabiliyordu.
 */
type FeedItem =
  | {
      id: number;
      role: "assistant";
      segments: Segment[];
      tone?: "hint";
      /** Üretim adımının yanlışında hakemin farkı ("Tag → Tage"; QA F-0020). Okunmuyor, yalnız görünüyor. */
      diff?: DiffLine[];
      pending?: boolean;
      /** Yazılı ders adımının sırası (0'dan) — içerik bildiriminin hedefi. Ara baloncuklarda yok. */
      step?: number;
    }
  | { id: number; role: "user"; text: string };

const HANDSFREE_KEY = "lernomi-conversation-handsfree";

/** Sonuç kaydı ağ hatasında bu kadar sonra bir kez daha deneniyor — mobil `ConversationScreen` ile aynı ad, aynı sayı. */
const CONVERSATION_SAVE_RETRY_MS = 1200;

/**
 * Eller serbestken mikrofonun boşuna açık kalabileceği süre.
 *
 * Tanıyıcı hiç ses duymazsa kendiliğinden kapanmıyor; süre dolunca mikrofon
 * kapanıyor ve ne yapılacağı yazılıyor. On iki saniye gözlemle seçildi: bir
 * cümleyi düşünmek birkaç saniye, on saniyeyi geçen sessizlik takılma.
 */
const SILENCE_MS = 12000;

/**
 * Kendiliğinden açılan mikrofona bu kadar süre ses gelmezse yazma alanı da
 * açılır (WP-62). Mikrofon KAPANMAZ — konuşmaya başlayan konuşur; yazmak
 * isteyen "Yazarak cevapla"yı aramadan yazar. Dört saniye: cümleyi kurmak
 * için düşünme payı, ama "ne yapacağım?" takılmasından kısa.
 */
const TYPE_AFTER_MS = 4000;

/** Kalıbın gövdesi ("Ich möchte …" → "ich möchte") konuşma turunda geçiyor mu. */
function patternUsed(pattern: string, turns: Turn[]): boolean {
  const stem = pattern.split(/…|\.\.\./)[0].replace(/[^\p{L}\p{N}' ]/gu, " ").trim().toLowerCase();
  if (stem.length < 3) return false;
  return turns.some((t) => t.role === "user" && t.content.toLowerCase().includes(stem));
}

/** Adım türü → ilerleme çubuğu rengi (WP-62): tekrar / üret / doğru-yanlış / onay. */
const STEP_TONE: Record<string, string> = {
  repeat: "var(--color-sky-600)",
  produce: "var(--color-brand)",
  truefalse: "var(--color-violet-600)",
  confirm: "var(--text-muted)",
  say: "var(--border)",
};
/** Adım rozeti — anahtar; metin gösterildiği yerde çevriliyor. */
const STEP_LABEL_KEYS: Record<string, string> = {
  repeat: "conversationp.step_repeat",
  produce: "conversationp.step_produce",
  truefalse: "conversationp.step_truefalse",
};

/** Özet köprüleri — sunucuda hesaplanıp sayfadan gelir. */
export type ConversationExtras = {
  /** Konuşmanın kanıt olduğu can-do ifadeleri, Türkçe. */
  cando: string[];
  next: { id: string; title: string; titleTr: string } | null;
};

/**
 * Cümle İÇİNDEKİ duraklamaya tanınan pay.
 *
 * Tanıyıcı tek atışlık kipte ilk duraklamada kapanıyordu ve düşünerek konuşan
 * öğrenci cümlesini yetiştiremiyordu — dil öğrenen herkes düşünerek konuşur.
 * Artık dinleme sürekli: her tanınan parçadan sonra bu kadar süre daha
 * bekleniyor; öğrenci es verip devam edebiliyor. Süre dolunca birikenler tek
 * cevap olarak gönderiliyor. Mikrofona dokunmak beklemeden gönderir.
 */
const PAUSE_MS = 2600;

/**
 * Yarım kalan konuşmanın cihazda saklanması.
 *
 * Anlatım uzun bir akış ve konuşma daha da uzun; ortasında çıkan öğrenci
 * döndüğünde baştan başlamamalı. Sunucuda değil cihazda: yarım bir akışın
 * adım sayacı kalıcı bir kayıt değil ve her adımda sunucuya yazmak akışa
 * bekleme eklerdi. Bedeli açık — başka cihazda devam edilemiyor.
 */
/** Mikrofon etiketine düşen yönlendirme: ANAHTAR + değişkenler (çeviri gösterildiği yerde). */
type Hint = { key: string; vars?: Record<string, string> };

/**
 * GÖNDERİLEMEYEN CÜMLE (2026-10-05, Samet: çevrimdışı senaryo kalktı, kopmalar
 * doğru anlatılıp doğru yönetilsin). Cümle turlara GİRMİYOR (tur sayacını
 * doldurmasın, modele giden geçmişte cevapsız kalmasın); kendi baloncuğunda
 * "gönderilemedi" diye bekliyor ve kendiliğinden yeniden deneniyor. Sebep ayrı
 * ayrı söyleniyor, çünkü öğrencinin yapacağı şey farklı:
 *   offline      cihaz çevrimdışı → bağlantı gelince (`online` olayı) gönderilir
 *   unreachable  çevrimiçi ama sunucuya ulaşılamıyor (ağ engeli, DNS) → ağını kontrol et
 *   service      sunucu cevap verdi ama sohbet servisi yok (5xx) → sorun bizde
 *   slow         cevap tavanı aştı → yeniden dene
 */
type SendFailure = { text: string; kind: "offline" | "unreachable" | "service" | "slow"; attempt: number; retryIn: number | null };
/** Kendiliğinden yeniden deneme aralıkları (sn); bitince "Şimdi dene" düğmesi kalır. */
const RETRY_DELAYS = [5, 15, 30];
/** Çevrimdışıyken `online` olayını kaçırma ihtimaline karşı yoklama aralığı (sn). */
const OFFLINE_POLL = 10;

const RESUME_KEY = CONVERSATION_RESUME_KEY;
const RESUME_DAYS = CONVERSATION_RESUME_DAYS;

type Saved = {
  phase: Phase;
  stepIndex: number;
  correctCount: number;
  turns: Turn[];
  at: number;
};

function readSaved(conversation: Conversation): Saved | null {
  try {
    const raw = localStorage.getItem(`${RESUME_KEY}:${conversation.id}`);
    if (!raw) return null;
    const v = JSON.parse(raw) as Saved;
    if (!v || typeof v.at !== "number") return null;
    if (Date.now() - v.at > RESUME_DAYS * 86400000) return null;
    if (v.phase !== "lecture" && v.phase !== "chat") return null;
    if (v.phase === "lecture" && (v.stepIndex <= 0 || v.stepIndex >= conversation.lecture.length))
      return null;
    return v;
  } catch {
    return null;
  }
}

/**
 * Övgüler dönüşümlü: her doğruda aynı kelimeyi duymak övgüyü görünmez yapıyor.
 * Sıra adım numarasından geliyor ki aynı adımın tekrarında bile değişsin.
 */
/**
 * ANLATIM parçası — metin sözlükten geliyor, yani parçanın dili gerçekten
 * arayüz dili. `narration` bayrağı sesi anlatım sesine bağlıyor (bkz.
 * speak-button `voiceForSegment`); konuşma İÇERİĞİ Türkçe kaldığı için o
 * parçalar bayraksız kalıyor ve bugünkü sesle okunuyor.
 */
function narFor(lang: NativeLang) {
  return (key: string, vars?: Record<string, string | number>): Segment => ({
    lang,
    text: translate(lang, key, vars),
    narration: true,
  });
}

/**
 * DERS PARÇASI — konuşma katmanı (`k=c`, 2026-10-08). Ders adımlarının ve ipucu/düzeltme baloncuklarının sesi
 * sunucuda önceden üretilmiş karakter dosyasından gelebiliyor (`TTS_OWN_LAYERS` `c:defne:tr`); anadil adreste,
 * çünkü katman anadil başına açılıyor. Üretim listesi `scripts/tts-conversation-jobs.ts`. Sohbet (yapay zekâ)
 * baloncukları işaretsiz: onların metni önceden üretilemez.
 */
function asLesson(segments: Segment[], native: NativeLang): (Segment & { layer: "c"; layerNative: NativeLang })[] {
  return segments.map((s) => ({ ...s, layer: "c" as const, layerNative: native }));
}

/** `doğru`/`yanlış` düğmeleri hükmü metin olarak veriyor — dilde karşılığı. */
/** Anlatım tarafının tanıyıcı etiketi — arayüz dili neyse o dinleniyor. */
const NATIVE_TAG: Record<NativeLang, string> = { tr: "tr-TR", en: "en-US", de: "de-DE" };

const TRUE_WORD: Record<NativeLang, string> = { tr: "doğru", en: "true", de: "richtig" };
const FALSE_WORD: Record<NativeLang, string> = { tr: "yanlış", en: "false", de: "falsch" };

const PRAISE_KEYS = [
  "conversation.praise_1",
  "conversation.praise_2",
  "conversation.praise_3",
  "conversation.praise_4",
  "conversation.praise_5",
];



/**
 * Konuşma adımı — anlatım + yapay zekâ sohbeti + özet.
 *
 * PATİKA KONUŞMA HAKKI (2026-09-25, `docs/premium/README.md` §2). Ücretsizde
 * seviye başına 2 + "bitir ve 7 günlük seri yap" dilimleri; hak ilk yapay zekâ
 * turunda düşüyor ve adım sahipleniliyor. Hakkı bitmiş ve bu adımı
 * sahiplenmemiş kullanıcı adıma GİRMEDEN kilit kartını görüyor: anlatımı
 * dinleyip sohbetin ortasında kilide çarpmak emek kaybı olurdu. Sunucu
 * sohbetin içinde de 403 premium_required ile kapatırsa aynı kart açılıyor —
 * "bağlantı sorunu" demek yanlış yere baktırırdı.
 *
 * Misafir ve yapay zekâ iznini reddetmiş kullanıcı için kilit YOK: onlar
 * senaryolu sohbete düşüyor (maliyetsiz, izin zorlanamaz). `quota` o
 * kullanıcılarda null geliyor (`lib/premium/unlock-view`).
 */
export function ConversationPlayer({
  quota = null,
  ...props
}: {
  conversation: Conversation;
  character: { name: string; note: string };
  extras?: ConversationExtras;
  quota?: { locked: boolean; view: SurfaceView } | null;
}) {
  const t = useT();
  const [locked, setLocked] = useState(Boolean(quota?.locked));
  /* Kilide takılan an huninin halkası (`premium_gate`, tür = "conversation");
     girişteki kilit de sohbet içindeki 403 de aynı olay. */
  useEffect(() => {
    if (locked) track("premium_gate", 0, "conversation");
  }, [locked]);
  if (locked) {
    return (
      /* KİLİT ŞABLONU beceri kilidiyle aynı (`immersion/skill/[id]`): durum
         kartı → nasıl açılır → düğmeler. Planlar düğmesi yalnız gösterge
         yokken; gösterge hak bitince kendi Premium düğmesini taşıyor. */
      <FlowColumn>
        <StateBody icon={<LockedIcon size={40} />} title={t("unlock.locked_conv")} />
        <UnlockProgress copy={quota?.view.copy ?? null} />
        <FlowActions
          primary={quota?.view.copy ? null : { label: t("gate.see_plans"), href: "/premium" }}
          /* Hak yoksa da çıkış yolu var: Patika'ya dönüp açık adımları bitirmek. */
          tertiary={{ label: t("nav.path"), href: "/immersion" }}
        />
      </FlowColumn>
    );
  }
  return <ConversationPlayerBody {...props} onLocked={() => setLocked(true)} />;
}

function ConversationPlayerBody({
  conversation,
  character,
  extras = { cando: [], next: null },
  onLocked,
}: {
  conversation: Conversation;
  /** Sohbet muhatabının adı — sunucuda türetiliyor (lib/conversations/characters). */
  character: { name: string; note: string };
  extras?: ConversationExtras;
  /** Sunucu Konuşma hakkı yok dedi (403 premium_required). */
  onLocked: () => void;
}) {
  const t = useT();
  const lang = useLang();
  const nar = useMemo(() => narFor(lang), [lang]);
  const [phase, setPhase] = useState<Phase>("lecture");

  // ── Anlatım durumu ──
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const feedSeq = useRef(0);
  /** Şu an sesli okunan baloncuk — yanında canlı ses çubukları görünüyor. */
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  /** Konuşma fazında okunan tur — aynı işaret orada da var. */
  const [speakingTurn, setSpeakingTurn] = useState<number | null>(null);
  /** "Bildir" açık olan yapay zekâ yanıtı (mobil `ConversationScreen` ile aynı). */
  const [reported, setReported] = useState<{ ref: string; text: string } | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  /** Geçerli adımda kaç deneme yapıldı — ipucu merdiveni buna bakıyor. */
  const attempts = useRef(0);
  /*
   * DENEME SAYACI EKRANDA. Android her yanlistan sonra "{n}. deneme" yaziyor
   * (`conversation.try_again`), webde hicbir yerde yazmiyordu: ogrenci kacinci
   * denemede oldugunu ve cevabin ne zaman acilacagini bilmiyordu. `attempts`
   * bir ref oldugu icin cizime giremiyor - yansi bir durumda tutuluyor ve
   * ref'in degistigi her yerde birlikte guncelleniyor.
   */
  const [tryCount, setTryCount] = useState(0);
  /** Bu adımda cevap bekleniyor mu (ses bitti, sıra öğrencide). */
  const [awaiting, setAwaiting] = useState(false);

  // ── Konuşma durumu ──
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  /** Yazılan cevap yapay zekâya soruluyor (`submitTyped`): gönder kapalı. */
  const [checking, setChecking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  /** Dinlerken o ana kadar tanınan metin — kullanıcı duyulduğunu görmeli. */
  const [partial, setPartial] = useState("");
  /* Yönlendirme ANAHTAR olarak tutuluyor, metin olarak değil: çeviri
     gösterildiği yerde yapılıyor (bkz. `Hint`). */
  const [hintKey, setHintKey] = useState<Hint | null>(null);
  const hint = hintKey ? (hintKey.key ? t(hintKey.key, hintKey.vars) : (hintKey.vars?.text ?? null)) : null;
  const [handsFree, setHandsFree] = useState(true);
  /** Yazarak cevaplama — varsayılan değil, takılınca açılan çıkış yolu. */
  const [typing, setTyping] = useState(false);
  /** Son cevabın yolu — adım ölçümü için (WP-80): mikrofon mu, yazı mı. */
  /*
   * Cevabın hangi yoldan geldiği. "tap" SONRADAN EKLENDİ: doğru/yanlış adımı
   * iki düğmeyle de cevaplanabiliyor ve o yol `inputMode`u hiç değiştirmiyordu,
   * yani düğmeye basılan her cevap ölçümde "mikrofonla söylendi" diye
   * sayılıyordu. Sesli cevap yolu (bkz. "veya sesli söyle") duruyor ve hâlâ
   * "mic"; Android'de bu adım yalnız düğmeyle cevaplanıyor, yani orada tek
   * değer "tap".
   */
  const inputMode = useRef<"mic" | "typed" | "tap">("mic");
  /**
   * SOHBET KAPISI (2026-10-05, Samet). Çevrimdışı senaryolu sohbet kalktı:
   * sohbet yalnız yapay zekâyla. Yapamayan iki grup için sohbet ATLANIYOR,
   * konuşma anlatım puanıyla geçiliyor; muafiyeti sunucu veriyor
   * (`api/conversation`), burası yalnız ekranı kuruyor.
   *   ai       sohbet yapay zekâyla
   *   consent  metin izni reddedilmiş
   *   account  misafir (yapay zekâ sohbeti hesap istiyor)
   * Servis kesintisi bir kapı DEĞİL: cümle bekler, yeniden denenir (`failed`).
   */
  const [chatGate, setChatGate] = useState<"ai" | "consent" | "account">("ai");
  const waived = chatGate !== "ai";
  const [failed, setFailed] = useState<SendFailure | null>(null);
  /* Günlük sohbet tavanı doldu (429): uyarı bir kez, gönderme yolu kapalı
     (QA F-0040; mobil `ConversationScreen` `quotaHit`). Her yeni deneme uyarıyı
     silip yeniden yazıyordu ve "Gönder" açık kalıyordu. */
  const [quotaHit, setQuotaHit] = useState(false);

  const [saved, setSaved] = useState<{ passed: boolean; nextDays: number } | null>(null);
  /* Konuşmanın süresi: `/api/conversation` `seconds` alanını istiyor ve web onu HİÇ
     göndermiyordu - her konuşma sunucuda sıfır saniye görünüyordu (mobil baştan
     beri gönderiyor). Aynı istekte `day` de eksikti: kullanıcının yerel günü
     yerine sunucunun günü işleniyordu, yani gece yarısından sonra bitirilen
     konuşma serinin yanlış gününe yazılıyordu. */
  const startedAt = useRef(Date.now());
  /* Önceki oturumda gönderilemeyen konuşma sonuçları: ekran açılır açılmaz
     denenmeleri yeter, kullanıcı bir şey yapmıyor. */
  useEffect(() => { void flushPendingConversations(); }, []);
  const [resumed, setResumed] = useState(false);

  const ttsAvailable = useSpeechAvailable();
  const [asrAvailable, setAsrAvailable] = useState(false);
  useEffect(() => setAsrAvailable(recognitionCtor() !== null), []);

  const recognition = useRef<Recognition | null>(null);
  /**
   * Dinleme oturumu. Her `capture` yeni numara alıyor; bilerek kesilen
   * dinleme (atla, düğmeyle cevap, yazılı cevap, adım değişimi, bitiş,
   * sökülme) numarayı ilerletiyor ve o dinlemenin sonradan gelen sözü ATILIYOR.
   * Eskiden `abort` tanıyıcının `onend`ini tetikliyor, o ana kadar duyulan da
   * teslim ediliyordu: düğmeye basmadan hemen önce söylenen söz bir sonraki
   * adıma karşı değerlendiriliyor, doğru/yanlış iki kez sayılıyor, bitişten
   * sonra sohbete bir tur daha gidiyordu.
   */
  const captureToken = useRef(0);
  /** Geçerli adım karara bağlandı (geçildi/atlandı): geç gelen ikinci cevap sayılmaz. */
  const settled = useRef(false);
  /** Bitiş bir kez: kapanış okuması ve "bitir" düğmesi sonucu iki kez göndermesin. */
  const finished = useRef(false);
  const silence = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Dört saniyelik "yazma alanını aç" sayacı ve bu dinlemede ses duyuldu mu. */
  const typeNudge = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heard = useRef(false);
  const scroller = useRef<HTMLDivElement>(null);
  const handsFreeRef = useRef(true);
  const draftRef = useRef("");
  /** Süren okumayı iptal eden işlev — adım değişince ya da sökülünce. */
  const cancelSpeech = useRef<(() => void) | null>(null);
  const speechToken = useRef(0);
  const sendRef = useRef<(text: string) => void>(() => {});

  const step = conversation.lecture[stepIndex];
  const expect = step?.expect;

  /**
   * Sohbet kapısını sor: izin reddedilmiş mi, misafir mi. Açılışta bir kez ve
   * kayıttan dönüşte; anlatımın sonundaki düğme buna göre "sohbete geç" ya da
   * "konuşmayı bitir" oluyor. Sağlayıcının yapılandırılmamış olması (`configured`
   * false) bir kapı değil, servis kesintisi: cümle gönderilince öyle anlatılıyor.
   */
  // `useCallback`: kayıttan dönüş effect'i buna bağımlı; düz fonksiyon her
  // render'da yeni kimlik alıp effect'i yeniden koştururdu.
  const probeChatService = useCallback(() => {
    void apiFetch("/api/chat", { cache: "no-store" })
      .then(async (r) => {
        if (r.status === 403 && (await r.clone().json().catch(() => null))?.error === "account_required") {
          setChatGate("account");
          return;
        }
        if (!r.ok) return;
        const s = (await r.json()) as { configured: boolean; consent?: string | null };
        setChatGate(s.consent === "declined" ? "consent" : "ai");
      })
      .catch(() => {});
  }, []);
  useEffect(() => probeChatService(), [probeChatService]);

  /**
   * İlk çizimde kayıt okunmuyor: sunucu ile tarayıcının farklı şey çizmesi
   * hidrasyonu bozar. Kayıt yüklenene kadar akış başlamıyor.
   */
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const v = readSaved(conversation);
    setReady(true);
    if (!v) return;
    setStepIndex(v.stepIndex);
    setCorrectCount(v.correctCount);
    setTurns(v.turns);
    setPhase(v.phase);
    setResumed(true);
    if (v.phase === "chat") probeChatService();
  }, [conversation, probeChatService]);

  useEffect(() => {
    if (!ready) return;
    try {
      if (phase === "summary" || (phase === "lecture" && stepIndex === 0)) {
        localStorage.removeItem(`${RESUME_KEY}:${conversation.id}`);
        return;
      }
      const v: Saved = { phase, stepIndex, correctCount, turns, at: Date.now() };
      localStorage.setItem(`${RESUME_KEY}:${conversation.id}`, JSON.stringify(v));
    } catch {
      /* depolama kapalıysa devam etme özelliği yok sayılıyor */
    }
  }, [ready, conversation.id, phase, stepIndex, correctCount, turns]);

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);
  useEffect(() => {
    handsFreeRef.current = handsFree;
  }, [handsFree]);
  useEffect(() => {
    try {
      setHandsFree(localStorage.getItem(HANDSFREE_KEY) !== "0");
    } catch {
      setHandsFree(true);
    }
  }, []);
  useEffect(
    () => () => {
      captureToken.current++;
      speechToken.current++;
      recognition.current?.abort();
      cancelSpeech.current?.();
      stopSpeaking();
      if (silence.current) clearTimeout(silence.current);
    },
    [],
  );
  /**
   * Yeni baloncukta liste en alta iner.
   *
   * `scrollIntoView` değil doğrudan `scrollTop`: kaydırma hedefi belli bir
   * öğe değil kabın dibi, ve scrollIntoView bunu en yakın kaydırılabilir
   * ataya bırakıyor — sayfa/kap yarışında ilk kullanıcı kaydırmasına kadar
   * hiçbir şey olmuyordu. Çizimden sonra (rAF) kabın dibine inmek koşulsuz
   * çalışıyor; akan cevapta her parça turns'ü yenilediği için liste yazarken
   * de dipte kalıyor.
   */
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      /* KAYARAK iniyor, zıplayarak değil: Android'in sohbeti
         `scrollToEnd({ animated })` ile kayıyor (`ConversationScreen`) ve web
         `scrollTop`u doğrudan yazıp anında atlıyordu — aynı sohbet iki
         uygulamada iki ayrı his veriyordu. Hedef hâlâ KABIN DİBİ (yukarıdaki
         not), yalnız atlama yerine `scrollTo`. "Hareketi azalt" açıkken
         atlama geri geliyor: kaydırmanın kendisi gerekli, animasyonu değil. */
      el.scrollTo({ top: el.scrollHeight, behavior: reducedMotion() ? "auto" : "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [feed, turns, phase, awaiting, error, typing]);

  /**
   * KLAVYE AÇILINCA DA DİBE. Yazarak cevaplarken klavye düzen alanını
   * kısaltıyor (`interactive-widget=resizes-content`) ve sohbet kabı küçülüyor;
   * kabın kaydırma konumu ise olduğu yerde kalıyordu, yani öğretmenin son
   * cümlesi — cevap verilen soru — görünür alanın ALTINDA kalıyordu. Kap
   * boyu değiştiğinde yeniden dibe iniliyor. Anında (smooth değil): klavye
   * animasyonuyla yarışan bir kaydırma yarı yolda kalıyor.
   */
  useEffect(() => {
    const el = scroller.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    let last = el.clientHeight;
    const ro = new ResizeObserver(() => {
      if (el.clientHeight === last) return;
      last = el.clientHeight;
      el.scrollTop = el.scrollHeight;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [phase]);

  /**
   * Sesler önceden iniyor: geçerli adım ve sonraki iki adım, her biri
   * OYNATILACAĞI biçimde. Bu ayrım önbelleğin kendisi: doğru cevaptan sonra
   * sıradaki cümle övgüyle birleşik okunuyor ("Çok iyi! İkinci kelimemiz…"),
   * yani indirilecek metin övgülü olan. Övgü adım numarasından türediği için
   * (rastgele değil) bu metin belirli — ilk indiren herkes için ısıtıyor.
   * Övgüsüz varyant da iniyor: atlanan ya da üç denemede geçilen adım övgüsüz
   * okunuyor. Üretim ipuçları ve doğru/yanlış gerekçeleri de aynı pencerede.
   */
  useEffect(() => {
    for (let i = stepIndex; i < Math.min(stepIndex + 3, conversation.lecture.length); i++) {
      const s = conversation.lecture[i];
      prefetchSegments(asLesson(s.say, lang));
      const prev = conversation.lecture[i - 1]?.expect?.kind;
      if (prev === "repeat" || prev === "produce") {
        prefetchSegments(asLesson([nar(PRAISE_KEYS[(i - 1) % PRAISE_KEYS.length]), ...s.say], lang));
      }
      const e = s.expect;
      if (e?.kind === "produce") prefetchSegments(asLesson(e.hint, lang));
      if (e?.kind === "truefalse") {
        prefetchSegments(asLesson([nar(PRAISE_KEYS[i % PRAISE_KEYS.length]), ...e.why], lang));
        prefetchSegments(asLesson([nar("conversationp.not_quite"), ...e.why], lang));
      }
    }
    prefetchGerman(conversation.chat.opening);
  }, [conversation, stepIndex, nar, lang]);

  // ─────────────────────────── anlatım motoru ───────────────────────────

  const clearSilence = useCallback(() => {
    if (silence.current) clearTimeout(silence.current);
    silence.current = null;
    if (typeNudge.current) clearTimeout(typeNudge.current);
    typeNudge.current = null;
  }, []);

  /** Süren dinlemeyi keser ve duyduğunu ATAR (bkz. `captureToken`). */
  const cancelCapture = useCallback(() => {
    captureToken.current++;
    const rec = recognition.current;
    recognition.current = null;
    rec?.abort();
    clearSilence();
    setListening(false);
    setPartial("");
  }, [clearSilence]);

  /**
   * Tanımayı başlatır — dil, adımın beklentisinden geliyor.
   *
   * Dinleme SÜREKLİ kipte: tanıyıcı ilk duraklamada kapanmıyor. Her tanınan
   * parçadan sonra `PAUSE_MS` bekleniyor; öğrenci es verip cümlesine devam
   * edebiliyor. Süre dolunca (ya da mikrofona dokununca) o ana kadar birikmiş
   * parçalar TEK cevap olarak teslim ediliyor.
   *
   * Cevap tek parçadan oluştuysa tanıyıcının n-best adayları korunuyor:
   * değerlendirme (judgeSpeech) ilk adaydan doğruluk, alt adaylardan teşhis
   * çıkarıyor. Çok parçalı cevapta adaylar birleştirilemeyeceği için yalnızca
   * en iyi okuma gönderiliyor.
   */
  const capture = useCallback(
    async (lang: string, onHeard: (alternatives: string[]) => void, auto: boolean) => {
      const Ctor = recognitionCtor();
      if (!Ctor) return;
      // Yeni dinleme eskisinin yerini alıyor: eskisinin geç gelen sözü atılır.
      const token = ++captureToken.current;
      const permission = await requestMicrophone();
      if (captureToken.current !== token) return; // izin beklenirken iptal edildi
      if (permission === "denied") {
        setError(t("conversationp.mic_denied"));
        return;
      }
      recognition.current?.abort();
      // Eskisinin sayaçları da gidiyor (kesilen dinleme artık kendininkini temizlemiyor).
      clearSilence();
      const rec = new Ctor();
      recognition.current = rec;
      rec.lang = lang;
      rec.interimResults = false;
      rec.continuous = true;
      rec.maxAlternatives = 3;

      let collected: string[] = [];
      let firstAlternatives: string[] | null = null;
      let delivered = false;
      let pauseTimer: ReturnType<typeof setTimeout> | null = null;
      const clearPause = () => {
        if (pauseTimer) clearTimeout(pauseTimer);
        pauseTimer = null;
      };
      /**
       * Birikeni bir kez teslim eder. Hem `onend` hem `onerror` buradan
       * geçiyor: tarayıcı sürekli kipte bile kendi kararıyla kapanabiliyor
       * ve o ana kadar duyulanı düşürmek kullanıcının sözünü silmek olurdu.
       */
      const deliver = () => {
        if (delivered) return;
        delivered = true;
        clearPause();
        // Kesilmiş dinleme: söz atılıyor, yenisinin sayaçlarına ve durumuna da dokunulmuyor.
        if (captureToken.current !== token) return;
        if (recognition.current === rec) recognition.current = null;
        setListening(false);
        clearSilence();
        setPartial("");
        const joined = collected.join(" ").trim();
        if (!joined) return;
        setHintKey(null);
        onHeard(collected.length === 1 && firstAlternatives?.length ? firstAlternatives : [joined]);
      };

      rec.onresult = (e) => {
        if (captureToken.current !== token) return;
        heard.current = true;
        collected = [];
        for (let i = 0; i < e.results.length; i++) {
          const t = e.results[i]?.[0]?.transcript?.trim();
          if (t) collected.push(t);
        }
        if (e.results.length === 1) {
          const r = e.results[0];
          firstAlternatives = [];
          for (let j = 0; j < (r?.length ?? 0); j++) {
            const t = r[j]?.transcript?.trim();
            if (t) firstAlternatives.push(t);
          }
        } else {
          firstAlternatives = null;
        }
        setPartial(collected.join(" "));
        // Konuşma başladı: genel sessizlik sayacı kalkıyor, duraklama payı kuruluyor.
        clearSilence();
        clearPause();
        pauseTimer = setTimeout(() => rec.stop(), PAUSE_MS);
      };
      rec.onerror = deliver;
      rec.onend = deliver;
      setListening(true);
      setHintKey(null);
      setPartial("");
      try {
        rec.start();
        // Mikrofonun açıldığı kulağa da söyleniyor: eller serbest akışta
        // kullanıcı ekrana bakmıyor ve işaretsiz açılan mikrofon ya boşluğa
        // konuşturuyor ya da sessiz bekletiyordu.
        cueListen();
        // Sessizlik sayacı yalnızca kendiliğinden açılan mikrofon için:
        // kullanıcı kendi dokunduysa ne yaptığını biliyor.
        if (auto) {
          clearSilence();
          silence.current = setTimeout(() => {
            if (captureToken.current !== token) return;
            rec.stop();
            setListening(false);
            setHintKey({ key: "conversationp.not_heard" });
          }, SILENCE_MS);
          heard.current = false;
          typeNudge.current = setTimeout(() => {
            if (!heard.current) setTyping(true);
          }, TYPE_AFTER_MS);
        }
      } catch {
        clearSilence();
        clearPause();
        setListening(false);
      }
    },
    [t, clearSilence],
  );

  /**
   * Beklentinin tanıma dili. Hedef dilli beklentiler kursun diliyle, ONAY ve
   * DOĞRU/YANLIŞ ise ARAYÜZ diliyle dinleniyor — soru o dilde soruluyor,
   * cevap da o dilde geliyor. Sabit "tr-TR" yazılıydı: İngilizce arayüzde
   * "true" diyen kullanıcı Türkçe tanıyıcıya konuşuyordu.
   */
  const langFor = useCallback(
    (e: Expectation): string =>
      e.kind === "confirm" || e.kind === "truefalse"
        ? NATIVE_TAG[lang]
        : conversation.course === "gsw-zh"
          ? "de-CH"
          : "de-DE",
    [conversation.course, lang],
  );

  /**
   * Bir anlatım adımını oynatır: baloncuğu ekler, sesleri okur; beklenti
   * varsa mikrofonu açar, yoksa sıradaki adıma geçer.
   *
   * `prefix` bir önceki cevabın övgüsü — ayrı bir baloncuk yerine sıradaki
   * cümlenin başına ekleniyor: "Çok iyi! İkinci kelimemiz…" Learna'nın da
   * yaptığı bu ve sebebi ekran düzeni değil ritim: övgü tek başına bir tur
   * değil, geçişin yakıtı.
   */
  const runStep = useCallback(
    (index: number, prefix?: Segment[]) => {
      const s = conversation.lecture[index];
      if (!s) {
        startChat();
        return;
      }
      // Önceki adımın dinlemesi bu adıma taşmasın: açık mikrofon okumayı
      // yankı olarak duyup yeni adıma karşı değerlendiriyordu.
      cancelCapture();
      settled.current = false;
      stepIndexRef.current = index;
      attempts.current = 0;
      setTryCount(0);
      setAwaiting(false);
      setStepIndex(index);
      setTyping(false);
      setSpeakingId(null);
      const segments = asLesson([...(prefix ?? []), ...s.say], lang);
      const id = ++feedSeq.current;
      // Baloncuk "yazıyor" olarak doğuyor; metin sesten bir nefes önce
      // açılıyor (speakSegments onStart). Öncekilerden askıda kalan varsa
      // (atlama, mikrofona dokunma) burada açığa çıkarılıyor — yazıyor
      // görünümünde donmuş baloncuk kalmamalı.
      setFeed((f) => [
        ...f.map((it) => ("pending" in it && it.pending ? { ...it, pending: false } : it)),
        { id, role: "assistant", segments, pending: ttsAvailable, step: index },
      ]);
      const token = ++speechToken.current;
      cancelSpeech.current?.();
      const reveal = () => {
        if (speechToken.current !== token) return;
        setFeed((f) => f.map((it) => (it.id === id ? { ...it, pending: false } : it)));
        setSpeakingId(id);
      };
      const after = () => {
        if (speechToken.current !== token) return;
        setSpeakingId(null);
        if (s.expect) {
          setAwaiting(true);
          if (handsFreeRef.current && asrAvailable) {
            void capture(langFor(s.expect), (alts) => evaluateRef.current(alts), true);
          }
        } else {
          runStepRef.current(index + 1);
        }
      };
      if (ttsAvailable) cancelSpeech.current = speakSegments(segments, after, reveal);
      else after();
    },
    // startChat aşağıda tanımlı; ref üzerinden çağrılıyor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [conversation, ttsAvailable, asrAvailable, capture, cancelCapture, langFor, lang],
  );
  const runStepRef = useRef(runStep);
  useEffect(() => {
    runStepRef.current = runStep;
  }, [runStep]);

  /** Yalnızca konuşan bir ara baloncuk: ipucu, düzeltme, teselli. */
  const interject = useCallback(
    (said: Segment[], then?: () => void, tone: "hint" | undefined = "hint", diff?: DiffLine[]) => {
      const segments = asLesson(said, lang);
      setAwaiting(false);
      setSpeakingId(null);
      const id = ++feedSeq.current;
      setFeed((f) => [
        ...f.map((it) => ("pending" in it && it.pending ? { ...it, pending: false } : it)),
        { id, role: "assistant", segments, tone, pending: ttsAvailable, ...(diff?.length ? { diff } : {}) },
      ]);
      const token = ++speechToken.current;
      cancelSpeech.current?.();
      const reveal = () => {
        if (speechToken.current !== token) return;
        setFeed((f) => f.map((it) => (it.id === id ? { ...it, pending: false } : it)));
        setSpeakingId(id);
      };
      const after = () => {
        if (speechToken.current !== token) return;
        setSpeakingId(null);
        then?.();
      };
      if (ttsAvailable) cancelSpeech.current = speakSegments(segments, after, reveal);
      else after();
    },
    [ttsAvailable, lang],
  );

  /** Aynı adım için mikrofonu yeniden açar (ipucundan sonra). */
  const reopen = useCallback(() => {
    setAwaiting(true);
    const e = conversation.lecture[stepIndexRef.current]?.expect;
    if (!e) return;
    if (handsFreeRef.current && asrAvailable) {
      void capture(langFor(e), (alts) => evaluateRef.current(alts), true);
    }
  }, [asrAvailable, capture, langFor, conversation]);
  const stepIndexRef = useRef(0);
  useEffect(() => {
    stepIndexRef.current = stepIndex;
  }, [stepIndex]);

  /**
   * Öğrencinin cevabını değerlendirir — anlatımın kalbi.
   *
   * İpucu merdiveni: ilk yanlışta hedefe özgü ipucu, ikincisinde doğrusu
   * söylenip bir kez daha isteniyor, üçüncüsünde konuşma takılmadan devam ediyor
   * — takılan adım sohbette zaten tekrar karşına çıkacak. Amaç
   * sınamak değil söyletmek; üç denemeden sonra dördüncüyü istemek öğretmeyi
   * bırakıp sınava dönüşmek olurdu.
   */
  const evaluate = useCallback(
    (alternatives: string[], typed?: TypedVerdict) => {
      const s = conversation.lecture[stepIndexRef.current];
      const e = s?.expect;
      if (!e || settled.current) return;
      const said = alternatives[0] ?? "";
      if (!said.trim()) return;
      if (!typed?.shown) setFeed((f) => [...f, { id: ++feedSeq.current, role: "user", text: said }]);
      const praise = nar(PRAISE_KEYS[stepIndexRef.current % PRAISE_KEYS.length]);
      const next = () => runStepRef.current(stepIndexRef.current + 1, [praise]);
      const isFirstTry = attempts.current === 0;
      const via = inputMode.current;
      inputMode.current = "mic";

      if (e.kind === "confirm") {
        settled.current = true;
        runStepRef.current(stepIndexRef.current + 1);
        return;
      }

      if (e.kind === "truefalse") {
        const judgment = parseJudgment(said, lang);
        if (judgment === null) {
          interject([nar("conversationp.say_true_or_false")], reopen);
          return;
        }
        const ok = judgment === e.answer;
        settled.current = true;
        track("conversation_step", ok ? (isFirstTry ? 2 : 1) : 0, `truefalse:${via}`);
        if (ok && isFirstTry) setCorrectCount((n) => n + 1);
        vibrate(ok ? "correct" : "wrong");
        interject(
          [nar(ok ? PRAISE_KEYS[stepIndexRef.current % PRAISE_KEYS.length] : "conversationp.not_quite"), ...e.why],
          () => runStepRef.current(stepIndexRef.current + 1),
          ok ? undefined : "hint",
        );
        return;
      }

      // repeat | produce — hedef dille karşılaştırma. Dil PARAMETRE olarak
      // gidiyor: `judgeSpeech` varsayılanı "de" ve İngilizce konuşma Almanca
      // kuralıyla yargılanıyordu (sayı katlaması ve kısaltma açma çalışmıyordu).
      /* YAZILAN cevabın hükmü çağırandan geliyor (`submitTyped`: cümle hakemi +
         yapay zekâ kontrolü, `lib/typed-answer`); SESLİ cevap tanıyıcı hakeminde
         kalıyor. Yazılan cevap da kelime torbasından geçiyordu ve sırası bozuk
         cümleyi ("Zum Frühstück ich trinke einen Tee") doğru sayıyordu (QA
         2026-10-09); mobil tam eşitlik istiyordu — iki platform iki kural. */
      const best: SpeechVerdict = typed
        ? typed.ok
          ? { kind: "correct", heard: said }
          : { kind: "different", heard: said, missing: typed.missing }
        : (() => {
            const targets = [e.target, ...(e.kind === "produce" ? (e.accept ?? []) : [])];
            const verdicts = targets.map((t) =>
              judgeSpeech(t, alternatives, [], [], targetLangOf(conversation.course)),
            );
            return verdicts.find((v) => v.kind === "correct") ?? verdicts[0];
          })();

      if (best.kind === "correct") {
        settled.current = true;
        track("conversation_step", isFirstTry ? 2 : 1, `${e.kind}:${via}`);
        if (e.kind === "produce" && isFirstTry) setCorrectCount((n) => n + 1);
        vibrate("correct");
        /* Yapay zekâ başka bir doğru kuruluşu kabul ettiyse övgü yerine dersin
           kalıbı gösteriliyor: cevap doğru, ama öğretilen biçim bu. */
        if (typed?.rescued)
          runStepRef.current(stepIndexRef.current + 1, [
            nar("rounds.rescue_taught"),
            { lang: targetLangOf(conversation.course), text: e.target },
          ]);
        else next();
        return;
      }

      if (best.kind === "uncertain") {
        interject(
          [nar("conversationp.didnt_catch"), { lang: "de", text: e.target }],
          reopen,
        );
        return;
      }

      attempts.current += 1;
      setTryCount(attempts.current);
      vibrate("wrong");

      /*
        DENEME HAKKI VE CEVABIN ACILDIGI AN ANDROID'DEKI GIBI.
        Web cevabi IKINCI yanlista aciyor ve ogrenciye bir daha deniyordu
        (`please_repeat` + `reopen`); UCUNCU yanlista ise cevabi hic
        soylemeden "olsun" deyip geciyordu. Android ucuncu yanlista CEVABI
        SOYLEYIP geciyor - yani ayni adim iki platformda iki ayri konuşma
        veriyordu: birinde cevap gorulup tekrar ediliyor, otekinde adim
        cevapla kapaniyor.

        Tavan artik sabitten (`CONVERSATION_TRY_CEILING`); daha once iki tarafta da
        elle `3` yaziliydi.
      */
      if (attempts.current >= CONVERSATION_TRY_CEILING) {
        settled.current = true;
        track("conversation_step", 0, `${e.kind}:${via}`);
        interject(
          [nar("common.answer_is"), { lang: "de", text: e.target }],
          () => runStepRef.current(stepIndexRef.current + 1),
        );
        return;
      }

      // İlk yanlış: üretimde içerikteki hedefe özgü ipucu; tekrarla eksik
      // kelimeler söyleniyor — "yanlış" demek öğretmez, neyin eksik olduğu öğretir.
      if (e.kind === "produce") {
        /* Cevap hedefin bozulmuş hâli değil de BAŞKA bir cümleyse adımın kural
           ipucu ("'weil'den sonra fiil en sona gider") yanlış teşhis olurdu —
           öğrenci kuralı uygulamış olabilir (denetim T16). O zaman istenen
           cümle söyleniyor.

           Bozulmuş hâliyse HATANIN KENDİSİ gösteriliyor (QA F-0020): "zwei Tag"
           yazana kelime sırası ipucu okunuyordu ("Önce teslimat, sonra fiil, en
           sonda süre"), hatası çoğul ekiydi. Baloncukta hakemin farkı ("Tag →
           Tage", `diffLines`); adımın ipucu yalnız hatanın türüne uyuyorsa
           (sıra ipucu sıra hatasında, biçim ipucu kelime/biçim hatasında),
           uymuyorsa "Doğrusu: … Tekrar dene." Hüküm `produceFeedback`; mobil
           `ConversationScreen` aynı dal. */
        const tl = targetLangOf(conversation.course);
        const hintText = e.hint.filter((x) => x.lang !== tl).map((x) => x.text).join(" ");
        const fb = produceFeedback(said, e.target, e.accept ?? [], hintText, tl);
        if (fb.kind === "other") interject([nar("conversationp.produce_other"), { lang: tl, text: e.target }], reopen);
        else
          interject(
            fb.hint ? e.hint : [nar("common.answer_is"), { lang: tl, text: fb.matched }, nar("conversationp.produce_retry")],
            reopen,
            "hint",
            fb.lines,
          );
      } else {
        const missing =
          best.kind === "partial" || best.kind === "different" ? best.missing : [];
        interject(
          missing.length
            ? [
                nar("conversationp.almost_missing"),
                { lang: "de", text: missing.join(", ") },
                nar("conversationp.once_more"),
                { lang: "de", text: e.target },
              ]
            : [nar("conversationp.lets_try_again"), { lang: "de", text: e.target }],
          reopen,
        );
      }
    },
    [interject, conversation, reopen, lang, nar],
  );
  const evaluateRef = useRef(evaluate);
  useEffect(() => {
    evaluateRef.current = evaluate;
  }, [evaluate]);

  /** Anlatımı başlat — ilk adım, kayıttan dönülüyorsa kaldığı adım. */
  useEffect(() => {
    if (!ready || started || phase !== "lecture") return;
    setStarted(true);
    track("conversation_start", resumed ? 1 : 0, conversation.id);
    runStepRef.current(stepIndexRef.current);
    // İlk adım yalnızca bir kez oynatılmalı.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, started, phase]);

  /** Adımı atla — takılan öğrencinin çıkışı; puan almadan ilerler. */
  function skipStep() {
    const k = conversation.lecture[stepIndex]?.expect?.kind;
    if (k && k !== "confirm") track("conversation_step", 0, `${k}:skip`);
    cancelCapture();
    attempts.current = 0;
    setTryCount(0);
    runStep(stepIndex + 1);
  }

  /**
   * Yazılan cevap: hüküm cümle hakeminden (tam ya da yalnız yazım geçer; sıra
   * ve yanlış "henüz değil"), üretim adımında üç kelimeden uzun cevap yerelde
   * düşerse yapay zekâya sorulur — anlamca doğru başka bir kuruluş ("Meine
   * Mutter und mein Vater kommen zum Fest") haksız yere yanlış sayılmasın.
   * Mobil `ConversationScreen` `submitProduce`/`submitRepeatTyped` aynı kural.
   */
  async function submitTyped() {
    const clean = draft.trim();
    if (!clean || checking) return;
    setDraft("");
    // Yazılan cevap dinlemeyi kapatıyor: açık kalan mikrofon sıradaki adımın
    // okumasını duyup cevap sayıyor, 12 sn'lik sayacı da yeni adımda "duyamadım" diyordu.
    cancelCapture();
    inputMode.current = "typed";
    const at = stepIndexRef.current;
    const step = conversation.lecture[at];
    const e = step?.expect;
    if (!e || (e.kind !== "repeat" && e.kind !== "produce")) {
      evaluate([clean]);
      return;
    }
    const tl = targetLangOf(conversation.course);
    const j = judgeTyped(clean, e.target, e.kind === "produce" ? (e.accept ?? []) : [], tl);
    const missing = j.match.target.filter((x) => x.mark === "missing" || x.mark === "typo").map((x) => x.text);
    if (j.pass || e.kind !== "produce" || !j.rescuable || settled.current) {
      evaluate([clean], { ok: j.pass, missing });
      return;
    }
    setFeed((f) => [...f, { id: ++feedSeq.current, role: "user", text: clean }]);
    setChecking(true);
    const ok = await rescueSentence(
      { source: produceSource(step.say, tl), target: e.target, typed: clean, level: conversation.level, lang: tl },
      t,
    );
    setChecking(false);
    // Beklerken adım atlandıysa karar yutuluyor.
    if (stepIndexRef.current !== at || settled.current) return;
    inputMode.current = "typed";
    evaluate([clean], { ok, rescued: ok, missing, shown: true });
  }

  // ─────────────────────────── sohbet ───────────────────────────

  function startChat() {
    cancelCapture();
    cancelSpeech.current?.();
    setAwaiting(false);
    setPhase("chat");
    if (turns.length) return; // kayıttan dönüldü, konuşma zaten kurulu
    setTurns([{ role: "assistant", content: conversation.chat.opening }]);
    probeChatService();
    const token = ++speechToken.current;
    if (ttsAvailable) {
      setSpeakingTurn(0);
      speakGerman(conversation.chat.opening, () => {
        if (speechToken.current !== token) return;
        setSpeakingTurn(null);
        if (!handsFreeRef.current) return;
        void listenChat();
      });
    } else if (handsFreeRef.current) void listenChat();
  }

  const send = useCallback(
    async (text: string, attempt = 0) => {
      const clean = text.trim();
      if (!clean || busy || quotaHit) return;
      setDraft("");
      setError(null);
      setFailed(null);
      const next: Turn[] = [...turns, { role: "user", content: clean }];
      setTurns([...next, { role: "assistant", content: "" }]);
      /* CEVAPSIZ TUR SAYILMIYOR: cevap gelmezse kullanıcının cümlesi turlardan
         (alt sınır sayacı ve modele giden geçmiş) çıkıyor ve kutuya dönüyor,
         yeniden gönderilebilsin. Mobil `ConversationScreen` aynı kural. */
      const undoTurn = () => {
        setTurns(turns);
        setDraft(clean);
      };
      setBusy(true);
      // Bekleme sessiz geçmiyor: yumuşak tık "çalışıyorum" diyor. İlk parça
      // ekrana düştüğünde susuyor — akan metin zaten kendi işareti.
      const stopThinking = startThinking();

      // Alt sınıra ulaşan cevaba sunucu kapanış talimatı veriyor (bkz.
      // lib/conversations/chat); okuma bitince konuşma kendiliğinden özete geçiyor.
      const closing = next.filter((m) => m.role === "user").length >= conversation.chat.minTurns;

      /* Gönderilemedi: cümle turlardan çıkıyor (yarım akan cevap da), kendi
         baloncuğunda bekliyor ve kendiliğinden yeniden deneniyor (bkz. `SendFailure`). */
      const fail = (kind: SendFailure["kind"]) => {
        stopThinking();
        setTurns(turns);
        const retryIn = kind === "offline" ? OFFLINE_POLL : (RETRY_DELAYS[attempt] ?? null);
        setFailed({ text: clean, kind, attempt, retryIn });
      };

      if (typeof navigator !== "undefined" && navigator.onLine === false) {
        fail("offline");
        setBusy(false);
        return;
      }

      try {
        const res = await apiFetch("/api/chat", {
          method: "POST",
          /* Tekrarı zararsız: sunucu cevabı kaydetmiyor, ikinci kopya yalnız
             günlük tur sayacından bir tur düşüyor (bkz. lib/api-fetch `send`). */
          replay: true,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ conversationId: conversation.id, messages: next }),
          /* Üretim uzun: genel tavan (25 sn) bu çağrıyı kesiyordu. Android
             kırk beş saniye bekliyor, aynı sabit adıyla. */
          timeoutMs: CHAT_TIMEOUT_MS,
        });
        if (res.status === 403 && (await res.clone().json().catch(() => null))?.error === "premium_required") {
          /* Konuşma hakkı yok (2026-09-25): kilit kartı — nasıl açılır ve
             Premium'la hemen aç. Bağlantı hatası DEĞİL. */
          onLocked();
          return;
        }
        if (res.status === 429) {
          /* Günlük sohbet mesajı tavanı (kötüye kullanım önlemi). Sebebi doğru
             söyle: "bağlantı yok" demek kullanıcıyı ağına baktırırdı. */
          undoTurn();
          setQuotaHit(true);
          setError(t("conversationp.chat_quota", { n: DAILY_QUOTAS.chatTurns }));
          return;
        }
        if (res.status >= 500) {
          /* Sunucu cevap verdi ama sohbet servisi yok (503: sağlayıcıların hepsi
             düştü; 502/504: geçiş anı). Sorun öğrencide değil, öyle söyleniyor. */
          fail("service");
          return;
        }
        if (res.status === 403 && (await res.clone().json().catch(() => null))?.error === "account_required") {
          /* Misafir: sohbet hesap istiyor. Cümle gönderilmedi; sohbet atlanıyor. */
          setTurns(turns);
          setChatGate("account");
          return;
        }
        if (await isAiConsentDeclined(res)) {
          /* İZİN VERİLMEDİ (diyalogda "yapay zekâ olmadan devam" dendi ya da
             kapatıldı). Cümle sağlayıcıya gitmedi; sohbet atlanıyor ve konuşma
             anlatım puanıyla bitiriliyor (muafiyeti sunucu veriyor). Mobil
             `ConversationScreen` aynı dal. */
          setTurns(turns);
          setChatGate("consent");
          return;
        }
        if (!res.ok || !res.body) {
          undoTurn();
          setError(t("conversationp.no_answer"));
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (!acc) stopThinking();
          acc += decoder.decode(value, { stream: true });
          setTurns([...next, { role: "assistant", content: acc }]);
        }
        const { body } = parseReply(acc);
        // Cevap gelirken konuşma bitirildiyse özette okunmuyor, mikrofon da açılmıyor.
        if (finished.current) return;
        if (ttsAvailable && body.trim()) {
          const token = ++speechToken.current;
          setSpeakingTurn(next.length);
          speakGerman(body, () => {
            if (speechToken.current !== token) return;
            setSpeakingTurn(null);
            if (closing) {
              void finishRef.current();
              return;
            }
            if (!handsFreeRef.current) return;
            if (draftRef.current.trim()) return;
            void listenChat();
          });
        } else if (closing) {
          // Ses yoksa kapanış cevabını okuyacak kadar bekle, sonra özete geç.
          setTimeout(() => void finishRef.current(), 2500);
        }
      } catch (err) {
        /* Ağ hatası (istek ya da yarıda kesilen akış). Tavanı aşan istek
           `TimeoutError`; geri kalanı cihaz çevrimdışıysa "internet yok",
           çevrimiçiyse "sunucuya ulaşılamıyor" (ağ engeli, DNS). */
        const name = (err as { name?: string } | null)?.name;
        if (name === "TimeoutError") fail("slow");
        else fail(typeof navigator !== "undefined" && navigator.onLine === false ? "offline" : "unreachable");
      } finally {
        stopThinking();
        setBusy(false);
      }
    },
    // `listenChat` aşağıda tanımlı; bağımlılığa alınırsa döngü oluşur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turns, busy, quotaHit, conversation.id, ttsAvailable],
  );
  useEffect(() => {
    sendRef.current = (t: string) => void send(t);
  }, [send]);

  /*
    GÖNDERİLEMEYEN CÜMLENİN YENİDEN DENENMESİ. Geri sayım bitince ya da cihaz
    yeniden çevrimiçi olunca (`online`) aynı cümle gönderiliyor. Çevrimdışıyken
    deneme sayısı artmıyor (bağlantı gelene kadar beklemek doğru), servis ve
    gecikmede `RETRY_DELAYS` bitince durup "Şimdi dene"ye bırakıyor.
  */
  const [countdown, setCountdown] = useState<number | null>(null);
  const retryRef = useRef<() => void>(() => {});
  useEffect(() => {
    retryRef.current = () => {
      if (failed) void send(failed.text, failed.kind === "offline" ? failed.attempt : failed.attempt + 1);
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
    const back = () => {
      clearInterval(tick);
      retryRef.current();
    };
    if (failed.kind === "offline") window.addEventListener("online", back);
    return () => {
      clearInterval(tick);
      window.removeEventListener("online", back);
    };
  }, [failed, phase]);

  const listenChat = useCallback(async () => {
    await capture(
      speechLocaleOf(conversation.course),
      (alts) => sendRef.current(alts[0] ?? ""),
      true,
    );
  }, [capture, conversation.course]);

  function stopListening() {
    recognition.current?.stop();
    setListening(false);
  }

  async function toggleHandsFree() {
    const next = !handsFree;
    setHandsFree(next);
    try {
      localStorage.setItem(HANDSFREE_KEY, next ? "1" : "0");
    } catch {
      /* depolama kapalı */
    }
    if (!next) {
      stopListening();
      return;
    }
    await requestMicrophone();
    if (busy || listening) return;
    // Açmak, mikrofona dokunmakla aynı şey — hangi fazdaysak orada dinle.
    if (phase === "chat") void listenChat();
    else if (awaiting && expect) void capture(langFor(expect), (a) => evaluate(a), true);
  }

  const userTurns = turns.filter((t) => t.role === "user").length;
  const chatDone = userTurns >= conversation.chat.minTurns;

  /**
   * `finish` her çizimde tazelenen bir ref üzerinden çağrılıyor: kapanış
   * cevabının okuması bittiğinde çalışacak kapanış, o anki skorları görmeli —
   * `send`in eski kapanışı eski `correctCount`u kaydederdi.
   */
  const finishRef = useRef<() => void>(() => {});
  useEffect(() => {
    finishRef.current = () => void finish();
  });
  // Özetten "konuşmaya dön"le çıkılınca yeniden bitirilebilir.
  useEffect(() => {
    if (phase !== "summary") finished.current = false;
  }, [phase]);

  // ─────────────────────────── bitiş ───────────────────────────

  async function finish() {
    if (finished.current) return;
    finished.current = true;
    cancelCapture();
    // Okumanın bitiş geri çağrısı özette mikrofonu yeniden açmasın.
    speechToken.current++;
    cancelSpeech.current?.();
    stopSpeaking();
    setSpeakingId(null);
    setSpeakingTurn(null);
    setPhase("summary");
    {
      // Konuşma sonucu olay olarak da düşüyor (WP-80): user_conversations en iyi denemeyi
      // tutar, buradaki satır BU denemeyi — trend ancak böyle çizilir.
      const scored = conversation.lecture.filter((s) => s.expect?.kind === "produce" || s.expect?.kind === "truefalse").length;
      track("conversation_finish", scored ? Math.round((100 * Math.min(correctCount, scored)) / scored) : 0, conversation.id);
    }
    /* Gövde try'ın DIŞINDA kuruluyor: ağ hatasında kuyruğa giden kayıt aynı
       `finishId`i taşımalı. Kimlik bu bitiriş için bir kez üretiliyor; anlık
       yeniden deneme de kuyruktan gönderim de onu kullanıyor ve sunucu ilk
       isteği işlemişse ikinciyi yazmıyor (`recordConversation`). */
    const payload = {
      conversationId: conversation.id,
      correct: correctCount,
      chatDone,
      day: localDay(),
      seconds: Math.round((Date.now() - startedAt.current) / 1000),
      finishId: newFinishId(),
    };
    try {
      const gonder = () =>
        apiFetch("/api/conversation", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
      /* Ağ hatasında BİR KEZ DAHA, sonra kuyruk. Boşta kapanmış bir bağlantıdan
         giden POST sunucuya varmadan düşebiliyor (iOS'ta görüldü, 2026-09-28);
         ikinci deneme yeni bağlantıyla gidiyor. İkisi aynı `finishId`i taşıyor ve
         sunucu aynı bitirişi ikinci kez yazmıyor (`recordConversation`), yani
         ilk istek varmışsa da zararsız. Mobil `ConversationScreen` aynı yolda. */
      let res: Response;
      try {
        res = await gonder();
      } catch {
        await new Promise((r) => setTimeout(r, CONVERSATION_SAVE_RETRY_MS));
        res = await gonder();
      }
      if (!res.ok && res.status >= 500) queueConversationResult(payload);
      if (res.ok) {
        const data = (await res.json()) as {
          passed: boolean;
          nextDays: number;
          xpGained: number;
          currentStreak: number;
          totalXp: number;
        };
        setSaved(data);
        // Üst bardaki XP/seri rozetleri ve rozet kontrolü bu olayı dinliyor.
        // Konuşma bölümü bunu dispatch etmiyordu: puan kazanılıyor ama ekranda
        // hiçbir şey değişmiyordu.
        window.dispatchEvent(
          new CustomEvent("lernomi:stats", {
            detail: { xp: data.totalXp, streak: data.currentStreak },
          }),
        );
      }
    } catch {
      /* ÇEVRİMDIŞI: özet yine gösteriliyor ama sonuç artık kaybolmuyor -
         kendi günüyle ve aynı bitiriş kimliğiyle kuyruğa alınıyor ve sonraki
         açılışta gidiyor. */
      queueConversationResult(payload);
    }
  }

  const corrections = turns
    .filter((t) => t.role === "assistant")
    .flatMap((t) => parseReply(t.content).corrections);

  const suggestions =
    !busy && turns.at(-1)?.role === "assistant"
      ? parseReply(turns.at(-1)!.content).suggestions
      : [];

  const scoredTotal = conversation.lecture.filter(
    (s) => s.expect?.kind === "produce" || s.expect?.kind === "truefalse",
  ).length;
  /* Alistirma isabeti - ozetin maskotu, konfetisi ve yuzde karosu ayni
     sayidan besleniyor (Android `Summary` `pct` ile ayni hesap). */
  const pct = scoredTotal ? Math.round((correctCount / scoredTotal) * 100) : 100;
  /* İKİ AYRI KOŞUL, İKİ AYRI SONUÇ (denetim T16). Sunucunun `passed: false`
     hükmü "asgari tur dolmadı" diye okunuyordu; oysa hüküm sohbetin bitmesi
     VE anlatımın puanlı adımlarında ilk denemede oranın eşiği
     (`CONVERSATION_PASS_RATIO`) geçmesi. Patika adımı ve "konuşma sayıldı"
     yalnız sohbetin bitmesine, günün görevi o günkü her kayda, tekrar
     merdiveni `passed`a bakıyor. Yani YARIM yalnız tur eksikse; isabet
     düşükse konuşma sayılmış, yalnız yakında yeniden gelecek. Tur tamamken
     `passed === false`ın sebebi tanımı gereği isabet; yanıt yoksa aynı eşik
     yerelde sayılıyor. Mobil `Summary` aynı iki koşul. */
  /* Muaf sohbet (izin yok ya da misafir) yarım sayılmıyor: konuşma anlatım
     puanıyla geçiliyor, muafiyeti sunucu veriyor. */
  const unfinished = !chatDone && !waived;
  const need = conversationPassNeed(scoredTotal);
  const scoreLow = (scoredTotal > 0 && correctCount < need) || (saved?.passed === false && chatDone);

  // ─────────────────────────── görünüm ───────────────────────────

  const micLabel = busy
    ? t("conversationp.answer_coming")
    : listening
      ? partial
        ? `“${partial}”`
        : t("conversationp.listening_take_time")
      : (hint ?? t("conversationp.tap_to_speak"));

  return (
    /* KISA EKRANDA SIKIŞAN DÜZEN. 320×568'de adım sekmeleri, ilerleme
       çizgisi, kart başlığı ve mikrofon paneli yüksekliğin üçte ikisini
       yiyor, sohbete ~150 piksel kalıyordu; klavye açıkken (`kb`) sohbet
       tamamen kayboluyor ve öğrenci neye cevap yazdığını göremiyordu. Artık
       aralıklar `short`ta daralıyor, sohbet dışındaki her şey `kb`de
       kalkıyor (bkz. globals.css yükseklik kırılımları). */
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col gap-4 short:gap-2">
      {/* ÇIKIŞ. Konuşma ekranında hiçbir çıkış düğmesi yoktu: alt sekmeler bu
          ekranda gizli, kenar çubuğu yalnız masaüstünde. Telefonda tek yol
          tarayıcının geri düğmesiydi — ana ekrana eklenmiş uygulamada o da
          yok. Yarıda çıkmak emek kaybı değil: konuşma kaldığı yeri yerel
          depoya yazıyor ve dönüşte "kaldığın yerden" notuyla açılıyor. */}
      <div className="flex shrink-0 items-center gap-3 kb:hidden">
        {/* Özette (sonuç) üstte X yok: çıkış dipteki "Kapat" (2026-09-30). */}
        {phase === "summary" ? null : <ConversationExit />}
        <div className="min-w-0 flex-1">
          <Steps phase={phase} />
        </div>
      </div>

      {phase === "lecture" ? (
        <div className="shrink-0 short:hidden">
          <LectureProgress at={stepIndex} steps={conversation.lecture} />
        </div>
      ) : null}

      {resumed && phase !== "summary" ? (
        /* KALDIĞIN YERDEN — tek satırlık not (FlowNote). Web kaydı kendiliğinden
           sürdürüyor; mobil tam ekran soruyor (`ConversationScreen` `resumeOffer`).
           Bilinçli fark: burada ekran sohbetin kendisi ve öğrenci kaldığı yeri
           zaten görüyor; "Baştan başla" ve kapatma notun içinde. */
        <FlowNote
          text={
            <span className="flex items-center gap-2">
              <span className="min-w-0 flex-1">{t("conversationp.resumed")}</span>
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem(`${RESUME_KEY}:${conversation.id}`);
                  } catch {
                    /* yoksay */
                  }
                  setResumed(false);
                  setTurns([]);
                  setFeed([]);
                  setCorrectCount(0);
                  attempts.current = 0;
                  setTryCount(0);
                  setPhase("lecture");
                  runStep(0);
                }}
                className="btn btn-ghost shrink-0 px-2 py-0.5 text-caption"
              >
                {t("conversation.start_over")}
              </button>
              <button
                type="button"
                onClick={() => setResumed(false)}
                aria-label={t("common.close")}
                /* 14px ikon, dolgusu yoktu: hedef 14x14 idi. `p-1` + `hit-8` ile
                   38 - kardesi olan dinle dugmesi de ayni kaliba baglaniyor. */
                className="muted hit-8 shrink-0 p-1"
              >
                <CloseIcon size={14} />
              </button>
            </span>
          }
        />
      ) : null}

      <AnimatePresence mode="wait">
        {phase === "lecture" ? (
          <motion.section
            key="lecture"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <div className="shrink-0 border-b px-4 py-3 short:py-2 kb:hidden" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-strong">{conversation.title}</p>
                  <p className="muted truncate text-caption">{conversation.titleTr}</p>
                </div>
                {ttsAvailable || asrAvailable ? (
                  <button
                    type="button"
                    onClick={() => void toggleHandsFree()}
                    aria-pressed={handsFree}
                    className="btn btn-ghost flex shrink-0 items-center gap-1.5 px-2 py-1 text-caption"
                    /* Açıkken dolu turuncu + beyaz (2026-09-29 Samet: seçim B; mobil `ConversationScreen` aynı). */
                    style={handsFree ? { background: "var(--brand-fill)", color: "var(--on-brand)" } : undefined}
                  >
                    <SkillSpeakingIcon size={13} />
                    {t(handsFree ? "conversationp.hands_free_on" : "conversationp.hands_free")}
                  </button>
                ) : null}
              </div>
            </div>

            <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto p-4">
              <AsrNote visible={!asrAvailable} />
              {feed.map((item) => (
                <LectureBubble
                  key={item.id}
                  item={item}
                  ttsAvailable={ttsAvailable}
                  speaking={speakingId === item.id}
                  conversationId={conversation.id}
                  stepData={item.role === "assistant" && item.step != null ? conversation.lecture[item.step] : undefined}
                />
              ))}
            </div>

            {error ? (
              <p className="shrink-0 px-4 pb-2 text-caption" style={{ color: "var(--color-flame)" }}>
                {error}
              </p>
            ) : null}

            {/* Cevap alanı beklentiye göre şekil değiştiriyor: onayda tek
                düğme, doğru/yanlışta iki düğme, Almanca hedefte mikrofon.
                Düğmeler mikrofona alternatif — konuşmak her zaman mümkün. */}
            <div className="shrink-0 border-t p-4 short:p-3" style={{ borderColor: "var(--border)" }}>
              {awaiting && expect?.kind === "confirm" ? (
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      cancelCapture();
                      // İzin en baştan, kullanıcı hareketiyle isteniyor: ilk
                      // eller serbest açılış izin istemine takılıp gecikmesin.
                      if (handsFree) void requestMicrophone();
                      runStep(stepIndex + 1);
                    }}
                    className="btn btn-primary w-full px-5 py-4"
                  >
                    {t("conversationp.ready_lets_start")}
                  </button>
                  {asrAvailable ? (
                    <p className="muted text-center text-caption">{t("conversationp.or_answer_aloud")}</p>
                  ) : null}
                </div>
              ) : null}

              {awaiting && expect?.kind === "truefalse" ? (
                <div className="mb-3 grid grid-cols-2 gap-2">
                  {/* Android'deki hâliyle aynı: iki düğme de DOLU ve anlamlarının
                      rengini taşıyor (yeşil/kırmızı + işaret). Burada ikisi de nötr
                      `option`du, yani "doğru mu yanlış mı" sorusu iki tıpatıp aynı
                      düğmeyle soruluyordu; konuşma akışında en hızlı okunması gereken
                      yer orası. */}
                  <button
                    type="button"
                    onClick={() => {
                      cancelCapture();
                      inputMode.current = "tap";
                      evaluate([TRUE_WORD[lang]]);
                    }}
                    className="flex items-center justify-center gap-2 rounded-panel px-4 py-3 text-center text-strong on-fill glow-tint-sm"
                    style={{ background: "var(--color-success)", "--tint-fill": "var(--color-success)" } as React.CSSProperties}
                  >
                    <CheckIcon size={18} />
                    {t("conversation.correct")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      cancelCapture();
                      inputMode.current = "tap";
                      evaluate([FALSE_WORD[lang]]);
                    }}
                    className="flex items-center justify-center gap-2 rounded-panel px-4 py-3 text-center text-strong on-fill glow-tint-sm"
                    style={{ background: "var(--color-danger)", "--tint-fill": "var(--color-danger)" } as React.CSSProperties}
                  >
                    <WrongIcon size={18} />
                    {t("conversation.wrong")}
                  </button>
                </div>
              ) : null}

              {/* YAZARKEN MİKROFON KALKIYOR. 64 piksellik düğme ve altındaki ipucu
                  yazma kipinde de duruyordu; kısa ekranda klavyeyle birlikte
                  sohbete hiç yer bırakmıyordu. Konuşmaya dönmek tek dokunuş:
                  "Yazmayı kapat" çipi yerinde kalıyor. */}
              {expect && expect.kind !== "confirm" && asrAvailable ? (
                <div className="flex flex-col items-center gap-2">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      if (listening) {
                        stopListening();
                        return;
                      }
                      // Dokunmak okumayı bekletmez: ses kesilir, dinleme başlar.
                      cancelSpeech.current?.();
                      stopSpeaking();
                      setSpeakingId(null);
                      setFeed((f) =>
                        f.map((it) => ("pending" in it && it.pending ? { ...it, pending: false } : it)),
                      );
                      setAwaiting(true);
                      void capture(langFor(expect), (a) => evaluate(a), false);
                    }}
                    aria-label={t(listening ? "exam.stop_recording" : "conversationp.start_speaking")}
                    className={`${typing ? "hidden" : "flex"} h-16 w-16 items-center justify-center rounded-full on-fill shadow-lg short:h-14 short:w-14`}
                    style={{
                      background: listening ? "var(--color-rose)" : "var(--color-brand)",
                    }}
                  >
                    <motion.span
                      animate={listening ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ repeat: listening ? Infinity : 0, duration: 1.1 }}
                    >
                      <SkillSpeakingIcon size={24} />
                    </motion.span>
                  </motion.button>
                  <p
                    className={`${typing ? "hidden" : ""} text-center text-caption`}
                    style={{
                      color:
                        hint && !listening ? "var(--color-flame)" : "var(--text-muted)",
                    }}
                  >
                    {listening
                      ? partial
                        ? `“${partial}”`
                        : expect.kind === "truefalse"
                          ? t("conversationp.listening_true_false")
                          : t("conversationp.listening_take_time")
                      : (hint ?? t("conversationp.tap_to_speak"))}
                  </p>
                  <div className="flex items-center gap-2">
                    {expect.kind !== "truefalse" ? (
                      <button
                        type="button"
                        onClick={() => setTyping((v) => !v)}
                        className="btn btn-ghost px-3 py-1 text-caption"
                      >
                        {t(typing ? "conversationp.close_typing" : "conversation.answer_by_typing")}
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={skipStep}
                      className="btn btn-ghost px-3 py-1 text-caption"
                    >
                      {t("conversationp.skip_step")}
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Kacinci deneme - Android ayni yeri ayni cumleyle yaziyor. */}
              {expect && tryCount > 0 ? (
                <p className="mb-2 text-center text-caption" style={{ color: "var(--color-danger)" }}>
                  {t("conversation.try_again", { n: tryCount })}
                </p>
              ) : null}

              {expect && expect.kind !== "confirm" && !asrAvailable ? (
                <p className="muted mb-2 text-center text-caption">
                  {t("conversation.no_asr")}
                </p>
              ) : null}

              {expect &&
              (expect.kind === "repeat" || expect.kind === "produce") &&
              (typing || !asrAvailable) ? (
                <div className="mt-3 flex items-end gap-2">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    enterKeyHint="send"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        void submitTyped();
                      }
                    }}
                    rows={1}
                    /* KLAVYE DAVRANIŞI ANDROID İLE AYNI: hedef dilde CÜMLE
                       yazılıyor, o yüzden cümle başı büyük ve otomatik
                       düzeltme kapalı (`ConversationScreen`: `sentences`). Alan
                       hiçbirini söylemiyordu; tarayıcı varsayılanı düzeltme
                       AÇIK ve İngilizce klavye Almanca sözcükleri
                       "düzeltiyor". */
                    autoCapitalize="sentences"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder={t("conversation.type_in", { lang: courseName(conversation.course, lang) })}
                    aria-label={t("conversation.type_in", { lang: courseName(conversation.course, lang) })}
                    className="input max-h-28 min-w-0 flex-1 resize-none py-2 text-body"
                  />
                  <button
                    type="button"
                    onClick={() => void submitTyped()}
                    disabled={!draft.trim() || checking}
                    className="btn btn-primary h-11 shrink-0 px-4 text-body disabled:opacity-60"
                  >
                    {t(checking ? "rounds.checking" : "common.send")}
                  </button>
                </div>
              ) : null}

              {!expect && stepIndex >= conversation.lecture.length - 1 && feed.length ? (
                waived ? (
                  <div className="flex flex-col gap-3">
                    <ChatWaivedNote gate={chatGate} />
                    <button type="button" onClick={() => void finish()} className="btn btn-primary w-full px-5 py-4">
                      {t("conversationp.end_conversation")}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={startChat}
                    className="btn btn-primary w-full px-5 py-4"
                  >
                    {t("conversationp.to_chat")}
                  </button>
                )
              ) : null}
            </div>
          </motion.section>
        ) : null}

        {phase === "chat" ? (
          <motion.section
            key="chat"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <div className="shrink-0 border-b px-4 py-3 short:py-2 kb:hidden" style={{ borderColor: "var(--border)" }}>
              <p className="text-strong">
                {character.name}
                <span className="muted ml-1.5 font-semibold">· {conversation.chat.partner}</span>
              </p>
              <p className="muted mt-0.5 text-caption leading-relaxed">{conversation.chat.scene}</p>
              {/* Sohbetin başlığında ve KALICI: akışta yukarı kayan bir
                  baloncuk, konuşmanın ortasına giren kullanıcı için yok
                  hükmünde olurdu (mobil `AiNotice` ile aynı gerekçe). */}
              <AiNotice variant="character" className="mt-2" />
              {waived ? <ChatWaivedNote gate={chatGate} className="mt-2" /> : null}
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="muted text-caption tabular-nums">
                  {t("conversationw.turns", { n: userTurns, total: conversation.chat.minTurns })}
                </span>
                {ttsAvailable || asrAvailable ? (
                  <button
                    type="button"
                    onClick={() => void toggleHandsFree()}
                    aria-pressed={handsFree}
                    className="btn btn-ghost flex items-center gap-1.5 px-2 py-1 text-caption"
                    /* Açıkken dolu turuncu + beyaz (2026-09-29 Samet: seçim B; mobil `ConversationScreen` aynı). */
                    style={handsFree ? { background: "var(--brand-fill)", color: "var(--on-brand)" } : undefined}
                  >
                    <SkillSpeakingIcon size={13} />
                    {t(handsFree ? "conversationp.hands_free_on" : "conversationp.hands_free")}
                  </button>
                ) : null}
              </div>
            </div>

            <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto p-4">
              <AsrNote visible={!asrAvailable} />
              {turns.map((turn, i) => (
                <Bubble
                  key={i}
                  turn={turn}
                  pending={busy && i === turns.length - 1}
                  speaking={speakingTurn === i && turn.role === "assistant"}
                  ttsAvailable={ttsAvailable}
                  onReport={(text) => setReported({ ref: `${conversation.id}:${i}`, text })}
                />
              ))}
              {/* Hata akışın İÇİNDE: kullanıcı cevabını yazdı, gözü konuşmada.
                  Alt köşedeki küçük bir satır fark edilmiyor ve konuşma
                  "takıldı" gibi görünüyordu — cevabın gelmeme SEBEBİ, cevabın
                  geleceği yerde durmalı. */}
              {failed ? (
                <FailedTurn failed={failed} countdown={countdown} busy={busy} onRetry={() => void send(failed.text, failed.attempt)} />
              ) : null}
              {error ? (
                <div
                  className="flex max-w-[85%] items-start gap-1.5 rounded-panel rounded-bl-chip px-3 py-2.5 text-body"
                  style={{
                    background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)",
                    color: "var(--color-flame)",
                  }}
                >
                  <IconLine>
                    <WarningIcon size={15} />
                  </IconLine>
                  <span>{error}</span>
                </div>
              ) : null}
            </div>

            {suggestions.length && !waived && !quotaHit ? (
              <div className="flex shrink-0 flex-wrap gap-2 px-4 pb-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="chip px-3 py-1.5 text-caption"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="shrink-0 border-t p-4 short:p-3" style={{ borderColor: "var(--border)" }}>
              {asrAvailable ? (
                <div className="flex flex-col items-center gap-2">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      if (listening) {
                        stopListening();
                        return;
                      }
                      stopSpeaking();
                      setSpeakingTurn(null);
                      void listenChat();
                    }}
                    disabled={busy || waived || quotaHit}
                    aria-label={t(listening ? "exam.stop_recording" : "conversationp.start_speaking")}
                    className={`${typing ? "hidden" : "flex"} h-16 w-16 items-center justify-center rounded-full on-fill shadow-lg disabled:opacity-60 short:h-14 short:w-14`}
                    style={{
                      background: listening ? "var(--color-rose)" : "var(--color-brand)",
                    }}
                  >
                    <motion.span
                      animate={listening ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ repeat: listening ? Infinity : 0, duration: 1.1 }}
                    >
                      <SkillSpeakingIcon size={24} />
                    </motion.span>
                  </motion.button>
                  <p
                    className={`${typing ? "hidden" : ""} text-center text-caption`}
                    style={{
                      color:
                        hint && !listening && !busy
                          ? "var(--color-flame)"
                          : "var(--text-muted)",
                    }}
                  >
                    {micLabel}
                  </p>
                  <button
                    type="button"
                    onClick={() => setTyping((v) => !v)}
                    className="btn btn-ghost px-3 py-1 text-caption"
                  >
                    {t(typing ? "conversationp.close_typing" : "conversation.answer_by_typing")}
                  </button>
                </div>
              ) : (
                <p className="muted mb-2 text-center text-caption">
                  {t("conversation.no_asr")}
                </p>
              )}

              {typing || !asrAvailable ? (
                <div className="mt-3 flex items-end gap-2">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    enterKeyHint="send"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        void send(draft);
                      }
                    }}
                    rows={1}
                    /* KLAVYE DAVRANIŞI ANDROID İLE AYNI: hedef dilde CÜMLE
                       yazılıyor, o yüzden cümle başı büyük ve otomatik
                       düzeltme kapalı (`ConversationScreen`: `sentences`). Alan
                       hiçbirini söylemiyordu; tarayıcı varsayılanı düzeltme
                       AÇIK ve İngilizce klavye Almanca sözcükleri
                       "düzeltiyor". */
                    autoCapitalize="sentences"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder={t("conversation.type_in", { lang: courseName(conversation.course, lang) })}
                    aria-label={t("conversation.type_in", { lang: courseName(conversation.course, lang) })}
                    className="input max-h-28 min-w-0 flex-1 resize-none py-2 text-body"
                  />
                  <button
                    type="button"
                    onClick={() => void send(draft)}
                    disabled={busy || waived || quotaHit || !draft.trim()}
                    className="btn btn-primary h-11 shrink-0 px-4 text-body disabled:opacity-60"
                  >
                    {t("common.send")}
                  </button>
                </div>
              ) : null}
            </div>

            <div className="shrink-0 border-t p-3" style={{ borderColor: "var(--border)" }}>
              <button
                type="button"
                onClick={() => void finish()}
                className="btn btn-ghost w-full py-2.5 text-body"
              >
                {t(chatDone || waived ? "conversationp.end_conversation" : "conversationp.leave_for_now")}
              </button>
            </div>
          </motion.section>
        ) : null}

        {phase === "summary" ? (
          <motion.section key="summary" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            {/*
              SONUÇ ŞABLONU (components/flow): band → üç sayı → notlar → ayrıntı
              kartları → en çok üç düğme. Mobil `ConversationScreen` `Summary` ile
              alanlar ve sıra birebir.

              MASKOTUN ÖLÇÜTÜ konuşmanın ALIŞTIRMA İSABETİ (`pct >= 80` kutla,
              `>= 50` sevin); hüküm (yarım kaldı mı) ayrı: yarım kalan konuşma
              band sessizleşiyor. Konfeti YOK: konuşma Patika'nın sıradan bir
              adımı, kutlama büyük anlara ayrıldı (mobil `ConversationScreen`
              `Summary` aynı; puanlı konuşmanın "geçti"si kalıyor).

              BAŞLIĞIN BİLİNMEYEN HÂLİ: kayıt isteği düşerse `saved` null kalır;
              yarım sayılması için ya sunucu açıkça "sayılmadı" demeli ya da
              asgari tur yerelde dolmamış olmalı — konuşma yerelde bittiyse bitti.
            */}
            <FlowColumn>
              <ResultHero
                eyebrow={`${t("unitkind.conversation")} · ${conversation.title}`}
                title={t(unfinished ? "conversationp.conversation_unfinished" : "conversation.conversation_complete")}
                figure={scoredTotal ? `${correctCount}/${scoredTotal}` : null}
                sub={waived && !chatDone ? t("conversationp.chat_skipped") : t("conversationp.n_turns", { n: userTurns })}
                quiet={unfinished}
                pill={
                  unfinished
                    ? { text: t("conversationp.pill_min_turns", { n: conversation.chat.minTurns }), tone: "bad" }
                    : scoreLow
                      ? { text: t("conversationp.pill_score_low", { need, total: scoredTotal }), tone: "brand" }
                      : null
                }
              />
              {/* Tur sayısı konuşmanın UZUNLUĞU, isabetten ayrı bir şey; eşikle
                  birlikte yazılıyor. Tekrar günü aralıklı tekrar merdiveninden. */}
              <StatRow
                items={[
                  { value: formatPercent(pct, lang), label: t("conversation.accuracy"), tone: scoreLow ? "bad" : null },
                  waived && !chatDone
                    ? { value: "—", label: t("conversationp.chat_skipped") }
                    : { value: `${userTurns}/${conversation.chat.minTurns}`, label: t("conversationp.stat_turns"), tone: unfinished ? "bad" : "ok" },
                  ...(!unfinished && saved ? [{ value: t("profile.days", { n: saved.nextDays }), label: t("conversationp.stat_review") }] : []),
                ]}
              />

              {unfinished ? (
                <FlowNote tone="warn" icon={<WarningIcon size={16} />} text={t("conversationp.min_turns_note", { n: conversation.chat.minTurns })} />
              ) : null}
              {/* İsabet eşiğin altında — tur notundan ayrı: konuşma sayıldıysa
                  bunu söylüyor, yalnız tekrar aralığının neden uzamadığını açıklıyor. */}
              {scoreLow ? (
                <FlowNote
                  tone="warn"
                  icon={<WarningIcon size={16} />}
                  text={t(unfinished ? "conversationp.score_low_note_unfinished" : "conversationp.score_low_note", { correct: correctCount, total: scoredTotal, need })}
                />
              ) : null}
              {extras.cando.length ? (
                <FlowNote tone="ok" icon={<CorrectIcon size={16} />} text={`${t("conversationp.i_can")} ${extras.cando.join(" · ")}`} />
              ) : null}
              {!corrections.length && turns.length > 1 ? (
                <FlowNote tone="ok" icon={<CorrectIcon size={16} />} text={t("conversationp.no_corrections")} />
              ) : null}

              {/* Düzeltmeler kalıplardan ÖNCE: öğrencinin kendi cümlelerine dair
                  tek kart (mobil `Summary` aynı sıra, QA F-0003). */}
              {corrections.length ? (
                <DetailCard title={t("conversationp.corrections")}>
                  <ul className="space-y-1">
                    {corrections.map((c, i) => (
                      <li key={i} className="text-caption leading-relaxed">
                        {c}
                      </li>
                    ))}
                  </ul>
                </DetailCard>
              ) : null}

              {/* Kullanılan kalıplar (WP-62): konuşmada geçen kalıp yeşil tik,
                  geçmeyen soluk — konuşmanın asıl amacı kalıbı kullanmak. Konuşma
                  hiç olmadıysa işaret yok (yanlış bir "yapmadın" damgası). */}
              {conversation.patterns.length ? (
                <DetailCard title={t("conversation.patterns_you_learned")}>
                  {conversation.patterns.map((pt) => {
                    const talked = turns.length > 1;
                    const used = talked && patternUsed(pt.de, turns);
                    return (
                      <div key={pt.de} className="flex items-start gap-2" style={{ opacity: talked && !used ? 0.6 : 1 }}>
                        {talked ? (
                          <IconLine className="w-4 text-strong" style={{ color: "var(--color-mint)" }}>
                            {used ? <CheckIcon size={14} /> : null}
                          </IconLine>
                        ) : null}
                        {/* Kalıp üstte, açıklama altında: yan yana dururken uzun
                            bir kalıp (İngilizce B1 cümleleri) açıklamanın payını
                            sıfıra indiriyor, açıklama harf harf kırılıyordu.
                            Mobil `ConversationScreen` özeti aynı düzende. */}
                        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className="text-strong" style={used ? { color: "var(--color-mint)" } : undefined}>
                            {pt.de}
                          </span>
                          {pt.tr ? <span className="muted text-caption">{pt.tr}</span> : null}
                        </span>
                      </div>
                    );
                  })}
                </DetailCard>
              ) : null}

              {/* Öğrenilen kelimeler özette bir kez daha: konuşmanın dili kapanışta toplu. */}
              {conversation.vocab.length ? (
                <DetailCard title={t("conversationp.words_of_conversation")}>
                  <div className="flex flex-wrap gap-1.5">
                    {conversation.vocab.map((v) => (
                      <span key={v.de} className="chip px-2 py-1 text-caption">
                        <b>{v.de}</b> · {v.tr}
                      </span>
                    ))}
                  </div>
                </DetailCard>
              ) : null}

              {unfinished ? (
                <FlowActions
                  primary={{ label: t("conversationp.back_to_conversation"), onClick: () => setPhase("chat") }}
                  close="/immersion"
                />
              ) : (
                <FlowActions
                  primary={
                    extras.next
                      ? { label: t("conversation.next_speaking", { title: extras.next.title }), href: `/conversations/${extras.next.id}` }
                      : { label: t("common.close"), href: "/immersion" }
                  }
                  /* İPUCU GÖRÜNÜR: düğmenin ikinci satırı (Android aynı). */
                  secondary={turns.length > 1 ? { label: t("conversationp.try_scored"), hint: t("conversationp.scored_hint"), href: `/conversations/${conversation.id}/scored` } : null}
                  close={extras.next ? "/immersion" : null}
                />
              )}
            </FlowColumn>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <ReportDialog
        open={reported !== null}
        kind="chat"
        refId={reported?.ref ?? ""}
        content={reported?.text ?? ""}
        onClose={() => setReported(null)}
      />
    </div>
  );
}

/**
 * Konuşmadan çıkış — geldiği yere döner (birim sayfası, patika, bildirim).
 *
 * "Geri" yalnız bir önceki kayıt BU SİTEDEYSE: `history.length` başka
 * sitelerin kayıtlarını da sayıyor ve konuşmayı bir aramadan ya da paylaşılan bir
 * bağlantıdan açan kullanıcıyı uygulamanın dışına atardı. Navigation API
 * (`navigation.canGoBack`) yalnız aynı kökenin kayıtlarına bakıyor; olmayan
 * tarayıcıda aynı kökenli `referrer` yedek ölçü. İkisi de yoksa patikaya:
 * konuşmanın evi orası.
 */
function ConversationExit() {
  const router = useRouter();
  return (
    <RoundExit
      labelKey="common.close"
      onExit={() => {
        const nav = (window as Window & { navigation?: { canGoBack?: boolean } }).navigation;
        const canBack =
          typeof nav?.canGoBack === "boolean"
            ? nav.canGoBack
            : document.referrer.startsWith(window.location.origin);
        if (canBack) router.back();
        else router.push("/immersion");
      }}
    />
  );
}

function Steps({ phase }: { phase: Phase }) {
  const t = useT();
  const steps: { id: Phase; label: string }[] = [
    { id: "lecture", label: t("conversation.phase_lecture") },
    { id: "chat", label: t("conversation.phase_chat") },
    { id: "summary", label: t("conversation.phase_summary") },
  ];
  const at = steps.findIndex((s) => s.id === phase);
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      {steps.map((s, i) => (
        <div key={s.id} className="flex flex-1 flex-col gap-1">
          <span
            className="h-1 rounded-full"
            style={{ background: i <= at ? "var(--color-brand)" : "var(--border)" }}
          />
          <span
            className="text-micro"
            style={{ color: i <= at ? "var(--color-brand)" : "var(--text-muted)" }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Anlatımın ilerleme çizgisi — adım başına bir parça, rengi adım türü
 * (WP-62): tekrar mavi, üret turuncu, doğru/yanlış mor, yalnız anlatım gri.
 * Geçilen parçalar dolu, gelecekler soluk; öğrenci konuşmanın kaçta kaçının
 * "söyle" kaçının "kendin kur" olduğunu baştan görüyor. Lejant yalnız
 * konuşmada olan türleri sayar.
 */
function LectureProgress({ at, steps }: { at: number; steps: { expect?: Expectation }[] }) {
  const t = useT();
  const kinds = Array.from(new Set(steps.map((s) => s.expect?.kind ?? "say"))).filter(
    (k) => k in STEP_LABEL_KEYS,
  );
  return (
    <div>
      <div className="flex h-1.5 w-full gap-[2px] overflow-hidden rounded-full" aria-hidden>
        {steps.map((s, i) => (
          <span
            key={i}
            className="h-full flex-1 rounded-sm transition-opacity"
            style={{ background: STEP_TONE[s.expect?.kind ?? "say"], opacity: i <= at ? 1 : 0.28 }}
          />
        ))}
      </div>
      {kinds.length ? (
        <p className="muted mt-1 flex flex-wrap gap-x-3 text-micro">
          {kinds.map((k) => (
            <span key={k} className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: STEP_TONE[k] }} />
              {t(STEP_LABEL_KEYS[k])} {steps.filter((s) => (s.expect?.kind ?? "say") === k).length}
            </span>
          ))}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Baloncukların ortak giriş animasyonu — hareket azaltma tercihine saygılı.
 *
 * Tercihi kendisi okumuyor, parametre olarak alıyor: bu düz bir fonksiyon ve
 * render sırasında çağrılıyor. `reducedMotion()` sunucuda her zaman `false`
 * döndüğü için burada okumak, sunucunun ürettiği HTML ile tarayıcının ilk
 * render'ını ayırıyordu (bkz. lib/use-still).
 */
function bubbleEntrance(still: boolean) {
  return still
    ? {}
    : {
        initial: { opacity: 0, y: 10, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { type: "spring" as const, stiffness: 360, damping: 26 },
      };
}

/**
 * "Yazıyor" animasyonu — ses hazırlanırken baloncuğu dolduran üç nokta.
 *
 * Amacı estetik değil algı: indirme/çözme gecikmesi boş bir bekleme olarak
 * değil, karşı tarafın yazması olarak görünüyor. Metin, ses başlamadan bir
 * nefes önce bu noktaların yerine geçiyor.
 */
function TypingDots() {
  const t = useT();
  const still = useStill();
  return (
    <span className="flex items-center gap-1 px-0.5 py-1.5" aria-label={t("conversation.typing")}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--text-muted)", opacity: 0.6 }}
          animate={still ? undefined : { y: [0, -3, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.14, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

/** Okunmakta olan baloncuğun canlı ses çubukları — hoparlör simgesinin yerine. */
function SpeakingBars({ inline = false }: { inline?: boolean }) {
  const t = useT();
  const still = useStill();
  return (
    <span
      className={`${inline ? "ml-1 inline-flex align-middle" : "flex"} h-7 w-7 shrink-0 items-center justify-center gap-0.5`}
      aria-label={t("walk.speaking")}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-0.5 rounded-full"
          style={{ background: "var(--color-brand)", height: 11, originY: 0.5 }}
          animate={still ? undefined : { scaleY: [0.35, 1, 0.5, 0.85, 0.35] }}
          transition={{ repeat: Infinity, duration: 1, delay: i * 0.16, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

/**
 * Anlatım baloncuğu.
 *
 * Almanca parçalar görsel olarak da ayrı: öğrenci hedefi cümlenin içinde
 * aramamalı. Okunurken hoparlör düğmesinin yerinde canlı ses çubukları
 * duruyor; okuma bitince düğme geri geliyor ve baloncuğu yeniden okutuyor.
 */
function LectureBubble({
  item,
  ttsAvailable,
  speaking,
  conversationId,
  stepData,
}: {
  item: FeedItem;
  ttsAvailable: boolean;
  speaking: boolean;
  conversationId: string;
  /** Baloncuk yazılı bir ders adımıysa o adımın verisi (bildirimin anlık görüntüsü). */
  stepData?: unknown;
}) {
  const t = useT();
  const still = useStill();
  if (item.role === "user") {
    return (
      <motion.div {...bubbleEntrance(still)} className="flex justify-end">
        <p
          className="max-w-[85%] rounded-panel rounded-br-chip px-3 py-2.5 text-body"
          style={{ background: "var(--brand-fill)", color: "var(--on-brand)" }}
        >
          {item.text}
        </p>
      </motion.div>
    );
  }
  const hint = item.tone === "hint";
  return (
    <motion.div {...bubbleEntrance(still)} className="flex flex-col items-start gap-1">
      <div className="flex w-full items-end gap-1.5">
        <div
          className="max-w-[85%] rounded-panel rounded-bl-chip px-3 py-2.5 text-body leading-relaxed"
          style={{
            background: hint
              ? "color-mix(in srgb, var(--color-flame) 10%, transparent)"
              : "var(--surface-2)",
          }}
        >
          {item.pending ? (
            <TypingDots />
          ) : (
            <>
              {/* Üretim adımının yanlışı: önce hatanın kendisi (QA F-0020). */}
              {item.diff ? (
                <div className="mb-1.5">
                  <DiffLineList lines={item.diff} />
                </div>
              ) : null}
              <motion.span
                className="inline"
                {...(still
                  ? {}
                  : {
                      initial: { opacity: 0, y: 4 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.22, ease: "easeOut" as const },
                    })}
              >
                {item.segments.map((seg, i) => (
                  <span key={i}>
                    {seg.lang !== "tr" ? (
                      <span className="brand-text font-bold">{seg.text}</span>
                    ) : (
                      seg.text
                    )}
                    {/* Ara: boşluk, ya da hedef dildeki parçadan sonra yeni cümle
                        başlıyorsa nokta (QA F-0009; mobil `BubbleView` aynı yardımcı). */}
                    {segmentGap(item.segments, i) || null}
                  </span>
                ))}
              </motion.span>
            </>
          )}
        </div>
        {item.pending ? null : speaking ? (
          <SpeakingBars />
        ) : ttsAvailable ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => speakSegments(item.segments)}
            aria-label={t("conversationp.listen_again")}
            /* 28px gorunen daire, `hit-8` ile 44 hedef: mobil karsiligi da
               `hitSlop={8}` tasiyor (`ConversationScreen`). */
            className="btn btn-ghost hit-8 h-7 w-7 shrink-0"
          >
            <SpeakerIcon size={13} />
          </motion.button>
        ) : null}
      </div>
      {/* İÇERİK BİLDİRİMİ yazılı ders adımının altında — sohbetteki yapay
          zekâ yanıtlarının "Bildir"iyle aynı yer ve biçim. Başlıktaki karo
          kalktı. Hedef konuşma + adım sırası (1'den). Ara baloncuklar
          (ipucu, övgü) ayrı bir adım değil; bağlantı taşımıyor. */}
      {item.step != null && !item.pending ? (
        <ReportFlag
          surface="conversation"
          target={{ type: "conversation", id: conversationId, sub: String(item.step + 1) }}
          content={() => snapshot({ step: stepData })}
        />
      ) : null}
    </motion.div>
  );
}

/** Konuşma baloncuğu — düzeltme satırı gövdeden ayrı gösteriliyor. */
function Bubble({
  turn,
  pending,
  speaking,
  ttsAvailable,
  onReport,
}: {
  turn: Turn;
  pending: boolean;
  speaking: boolean;
  ttsAvailable: boolean;
  /** Yapay zekâ yanıtını bildir — yalnız asistan baloncuklarında. */
  onReport?: (text: string) => void;
}) {
  const t = useT();
  const still = useStill();
  if (turn.role === "user") {
    return (
      <motion.div {...bubbleEntrance(still)} className="flex justify-end">
        <p
          className="max-w-[85%] rounded-panel rounded-br-chip px-3 py-2.5 text-body"
          style={{ background: "var(--brand-fill)", color: "var(--on-brand)" }}
        >
          {turn.content}
        </p>
      </motion.div>
    );
  }

  const { body, corrections } = parseReply(turn.content);
  return (
    <motion.div {...bubbleEntrance(still)} className="flex flex-col items-start gap-1.5">
      <div
        className="max-w-[85%] rounded-panel rounded-bl-chip px-3 py-2.5 text-body"
        style={{ background: "var(--surface-2)" }}
      >
        {body.trim() ? body : pending ? <TypingDots /> : ""}
        {ttsAvailable && body.trim() ? (
          speaking ? (
            <SpeakingBars inline />
          ) : (
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => speakGerman(body)}
              aria-label={t("conversationp.listen_again")}
              className="btn btn-ghost hit-8 ml-1 h-7 w-7 shrink-0 align-middle"
            >
              <SpeakerIcon size={13} />
            </motion.button>
          )
        ) : null}
      </div>
      {corrections.map((c, i) => (
        <p
          key={i}
          className="flex max-w-[85%] items-start gap-1.5 rounded-panel px-3 py-1.5 text-caption"
          style={{
            background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)",
            color: "var(--color-flame)",
          }}
        >
          <IconLine>
            <WrongIcon size={13} />
          </IconLine>
          <span>{c}</span>
        </p>
      ))}
      {/* Bildir — mobilde de her yapay zekâ yanıtının altında (Play'in
          "yapay zekâ ile üretilen içerik" politikası: rahatsız edici bir
          yanıt uygulamadan çıkmadan bildirilebilmeli). */}
      {onReport && body.trim() && !pending ? (
        /* Uygulamanın tek bildirim biçimi (`ReportLink`): ders adımlarının
           içerik bildirimiyle aynı görünüş. Hedef ölçüsü orada. */
        <ReportLink onClick={() => onReport(turn.content)} label={t("conversation.report_this_answer")} />
      ) : null}
    </motion.div>
  );
}

/** Tanıyıcı yoksa kullanıcıya sebebini söylemek gerekiyor. */
function AsrNote({ visible }: { visible: boolean }) {
  const t = useT();
  if (!visible) return null;
  return (
    <div
      className="flex items-start gap-2 rounded-panel px-3 py-2.5 text-caption"
      style={{
        background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)",
        color: "var(--color-flame)",
      }}
    >
      <IconLine>
        <WarningIcon size={14} />
      </IconLine>
      <span>{t("conversationp.no_asr_long")}</span>
    </div>
  );
}

/**
 * Sohbet atlandı notu — izin reddedilmiş ya da misafir. Sebep, konuşmanın
 * nasıl sayıldığı ve nereden açılacağı tek yerde; bağlantı oraya götürüyor.
 */
function ChatWaivedNote({ gate, className = "" }: { gate: "ai" | "consent" | "account"; className?: string }) {
  const t = useT();
  if (gate === "ai") return null;
  return (
    <div
      className={`flex items-start gap-1.5 rounded-panel px-2.5 py-1.5 text-caption leading-relaxed ${className}`}
      style={{ background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)", color: "var(--color-flame)" }}
    >
      <IconLine>
        <WarningIcon size={12} />
      </IconLine>
      <span className="flex-1">
        {t(gate === "consent" ? "conversationp.chat_waived_consent" : "conversationp.chat_waived_account")}{" "}
        <Link href={gate === "consent" ? "/profile/settings/privacy" : "/login"} className="font-semibold underline underline-offset-2">
          {t(gate === "consent" ? "settings.group_privacy" : "auth.create_account")}
        </Link>
      </span>
    </div>
  );
}

/** Gönderilemeyen cümle: soluk öğrenci baloncuğu + sebep + "Şimdi dene" (bkz. `SendFailure`). */
function FailedTurn({ failed, countdown, busy, onRetry }: { failed: SendFailure; countdown: number | null; busy: boolean; onRetry: () => void }) {
  const t = useT();
  const n = Math.max(0, countdown ?? 0);
  const message = busy
    ? t("conversationp.send_retrying")
    : failed.kind === "offline"
      ? t("conversationp.send_offline")
      : failed.retryIn == null
        ? t("conversationp.send_gave_up")
        : t(failed.kind === "service" ? "conversationp.send_service" : failed.kind === "slow" ? "conversationp.send_slow" : "conversationp.send_unreachable", { n });
  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="max-w-[85%] rounded-panel rounded-br-chip px-3 py-2.5 text-body opacity-70" style={{ background: "var(--brand-fill)", color: "var(--on-brand)" }}>
        {failed.text}
      </div>
      <div
        role="status"
        aria-live="polite"
        className="flex max-w-[85%] items-start gap-1.5 rounded-panel px-3 py-2 text-caption leading-relaxed"
        style={{ background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)", color: "var(--color-flame)" }}
      >
        <IconLine>
          <WarningIcon size={14} />
        </IconLine>
        <span className="flex-1">{message}</span>
        {busy ? null : (
          <button type="button" onClick={onRetry} className="btn btn-ghost shrink-0 px-2 py-0.5 text-caption">
            {t("conversationp.retry_now")}
          </button>
        )}
      </div>
    </div>
  );
}
