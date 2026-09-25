"use client";

import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, CHAT_TIMEOUT_MS } from "@/lib/api-fetch";
import { isAiConsentDeclined } from "@/lib/ai-consent-client";
import { offlineReply, offlineStart, offlineSummary, type Hint, type OfflineState } from "@/lib/conversations/offline-chat";
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
import { AlertIcon, CheckIcon, MicIcon, SpeakerIcon, XIcon } from "@/components/icons";
import { parseReply } from "@/lib/chat-format";
import { DetailCard, FlowActions, FlowColumn, FlowNote, ResultHero, StatRow } from "@/components/flow";
import { reducedMotion, vibrate } from "@/lib/fx";
import { useStill } from "@/lib/use-still";
import { cueListen, startThinking } from "@/lib/conversations/cues";
import { judgeSpeech } from "@/lib/speech";
import { type Expectation, type Conversation, type Segment } from "@/lib/conversations/types";
import { useT, useLang } from "@/lib/i18n/client";
import { ReportDialog } from "@/components/report-dialog";
import { UnlockProgress } from "@/components/unlock-progress";
import type { SurfaceView } from "@/lib/premium/unlock-copy";
import { DAILY_QUOTAS } from "@/lib/quotas";
import { RoundExit } from "@/components/round-exit";
import { CONVERSATION_TRY_CEILING } from "@/lib/conversations/chat-const";
import { formatPercent, translate, type NativeLang } from "@/lib/i18n/dict";
import { courseName, speechLocaleOf, targetLangOf } from "@/lib/courses";
import { parseJudgment } from "@/lib/voice-intent";
import { localDay } from "@/lib/day";
import { flushPendingConversations, queueConversationResult } from "@/lib/conversation-queue";
import { CONVERSATION_RESUME_DAYS, CONVERSATION_RESUME_KEY } from "@/lib/storage-hygiene";

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
  | { id: number; role: "assistant"; segments: Segment[]; tone?: "hint"; pending?: boolean }
  | { id: number; role: "user"; text: string };

const HANDSFREE_KEY = "lernomi-conversation-handsfree";

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
      <div className="mx-auto w-full max-w-2xl space-y-3">
        <div className="flex items-center gap-3">
          <ConversationExit />
        </div>
        <UnlockProgress copy={quota?.view.copy ?? null} title={{ key: "unlock.locked_conv" }} />
        {/* Hak yoksa da çıkış yolu var: Patika'ya dönüp açık adımları bitirmek. */}
        <Link href="/immersion" prefetch={false} className="btn btn-ghost w-full px-4 py-2.5 text-body">
          {t("nav.path")}
        </Link>
      </div>
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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  /** Dinlerken o ana kadar tanınan metin — kullanıcı duyulduğunu görmeli. */
  const [partial, setPartial] = useState("");
  /* Yönlendirme ANAHTAR olarak tutuluyor, metin olarak değil: çeviri
     gösterildiği yerde yapılıyor (bkz. `offline-chat` `Hint`). */
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
   * Senaryolu (çevrimdışı) konuşma durumu — sohbet sağlayıcısı yokken
   * (WP-04, lib/conversations/offline-chat). null = model konuşuyor. Ref de
   * var çünkü `send` kapanışta eski durumu görmemeli.
   */
  const [offline, setOffline] = useState<OfflineState | null>(null);
  const offlineRef = useRef<OfflineState | null>(null);
  useEffect(() => {
    offlineRef.current = offline;
  }, [offline]);
  /**
   * Senaryoya NEDEN düşüldü. İkisi farklı cümle istiyor: servis kapalıyken
   * "servis kapalı", yapay zekâya izin verilmediyse "izin vermediğin için" —
   * ikincisine "servis kapalı" demek yanlış teşhis olurdu (servis çalışıyor,
   * metin bilerek gönderilmiyor) ve nereden açılacağını da söylemezdi.
   */
  const [offlineWhy, setOfflineWhy] = useState<"service" | "consent">("service");

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
   * Sağlayıcı var mı? Yoksa daha ilk cümlede 503 yemek yerine baştan
   * senaryolu konuşmaya geç. Açılış iki yolda da aynı metin (senaryonun ilk
   * turu açılışla birebir), o yüzden cevap beklenmeden gösteriliyor. Kayıttan
   * dönüşte de soruluyor: yarım kalmış konuşma, servis o arada kapandıysa
   * senaryoyla sürer.
   */
  // `useCallback`: kayıttan dönüş effect'i buna bağımlı ve DÜZ bir fonksiyon her
  // render'da yeni kimlik alırdı — bağımlılığa eklenince effect her render'da
  // yeniden koşardı. Kimlik artık yalnız konuşma değişince değişiyor.
  const probeChatService = useCallback(() => {
    void apiFetch("/api/chat", { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<{ configured: boolean; consent?: string | null }>) : null))
      .then((s) => {
        if (!s || offlineRef.current) return;
        /* Yapay zekâya "hayır" demiş kullanıcı da baştan senaryoya geçiyor:
           ilk cümlesi 403'e yenmesin. Hiç karar vermemiş olan ise modelle
           başlıyor; izin ilk turda, metin gitmeden önce soruluyor
           (`lib/api-fetch` yakalayıcısı). Mobil `chatAvailability`. */
        const declined = s.configured && s.consent === "declined";
        if (!s.configured || declined) {
          const start = offlineStart(conversation);
          setOffline(start.state);
          setHintKey(start.hint);
          setOfflineWhy(declined ? "consent" : "service");
        }
      })
      .catch(() => {});
  }, [conversation]);

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
      prefetchSegments(s.say);
      const prev = conversation.lecture[i - 1]?.expect?.kind;
      if (prev === "repeat" || prev === "produce") {
        prefetchSegments([nar(PRAISE_KEYS[(i - 1) % PRAISE_KEYS.length]), ...s.say]);
      }
      const e = s.expect;
      if (e?.kind === "produce") prefetchSegments(e.hint);
      if (e?.kind === "truefalse") {
        prefetchSegments([nar(PRAISE_KEYS[i % PRAISE_KEYS.length]), ...e.why]);
        prefetchSegments([nar("conversationp.not_quite"), ...e.why]);
      }
    }
    prefetchGerman(conversation.chat.opening);
  }, [conversation, stepIndex, nar]);

  // ─────────────────────────── anlatım motoru ───────────────────────────

  const clearSilence = () => {
    if (silence.current) clearTimeout(silence.current);
    silence.current = null;
    if (typeNudge.current) clearTimeout(typeNudge.current);
    typeNudge.current = null;
  };

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
      const permission = await requestMicrophone();
      if (permission === "denied") {
        setError(t("conversationp.mic_denied"));
        return;
      }
      recognition.current?.abort();
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
        clearSilence();
        clearPause();
        setPartial("");
        const joined = collected.join(" ").trim();
        if (!joined) return;
        setHintKey(null);
        onHeard(collected.length === 1 && firstAlternatives?.length ? firstAlternatives : [joined]);
      };

      rec.onresult = (e) => {
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
      rec.onerror = () => {
        setListening(false);
        deliver();
      };
      rec.onend = () => {
        setListening(false);
        deliver();
      };
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
    [t],
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
      attempts.current = 0;
      setTryCount(0);
      setAwaiting(false);
      setStepIndex(index);
      setTyping(false);
      setSpeakingId(null);
      const segments = [...(prefix ?? []), ...s.say];
      const id = ++feedSeq.current;
      // Baloncuk "yazıyor" olarak doğuyor; metin sesten bir nefes önce
      // açılıyor (speakSegments onStart). Öncekilerden askıda kalan varsa
      // (atlama, mikrofona dokunma) burada açığa çıkarılıyor — yazıyor
      // görünümünde donmuş baloncuk kalmamalı.
      setFeed((f) => [
        ...f.map((it) => ("pending" in it && it.pending ? { ...it, pending: false } : it)),
        { id, role: "assistant", segments, pending: ttsAvailable },
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
    [conversation, ttsAvailable, asrAvailable, capture, langFor],
  );
  const runStepRef = useRef(runStep);
  useEffect(() => {
    runStepRef.current = runStep;
  }, [runStep]);

  /** Yalnızca konuşan bir ara baloncuk: ipucu, düzeltme, teselli. */
  const interject = useCallback(
    (segments: Segment[], then?: () => void, tone: "hint" | undefined = "hint") => {
      setAwaiting(false);
      setSpeakingId(null);
      const id = ++feedSeq.current;
      setFeed((f) => [
        ...f.map((it) => ("pending" in it && it.pending ? { ...it, pending: false } : it)),
        { id, role: "assistant", segments, tone, pending: ttsAvailable },
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
    [ttsAvailable],
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
    (alternatives: string[]) => {
      const s = conversation.lecture[stepIndexRef.current];
      const e = s?.expect;
      if (!e) return;
      const said = alternatives[0] ?? "";
      if (!said.trim()) return;
      setFeed((f) => [...f, { id: ++feedSeq.current, role: "user", text: said }]);
      const praise = nar(PRAISE_KEYS[stepIndexRef.current % PRAISE_KEYS.length]);
      const next = () => runStepRef.current(stepIndexRef.current + 1, [praise]);
      const isFirstTry = attempts.current === 0;
      const via = inputMode.current;
      inputMode.current = "mic";

      if (e.kind === "confirm") {
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
      const targets = [e.target, ...(e.kind === "produce" ? (e.accept ?? []) : [])];
      const verdicts = targets.map((t) =>
        judgeSpeech(t, alternatives, [], [], targetLangOf(conversation.course)),
      );
      const best = verdicts.find((v) => v.kind === "correct") ?? verdicts[0];

      if (best.kind === "correct") {
        track("conversation_step", isFirstTry ? 2 : 1, `${e.kind}:${via}`);
        if (e.kind === "produce" && isFirstTry) setCorrectCount((n) => n + 1);
        vibrate("correct");
        next();
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
        interject(e.hint, reopen);
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
    recognition.current?.abort();
    attempts.current = 0;
    setTryCount(0);
    runStep(stepIndex + 1);
  }

  /** Yazılan cevap da sesli cevapla aynı kapıdan geçiyor. */
  function submitTyped() {
    const clean = draft.trim();
    if (!clean) return;
    setDraft("");
    inputMode.current = "typed";
    evaluate([clean]);
  }

  // ─────────────────────────── sohbet ───────────────────────────

  function startChat() {
    recognition.current?.abort();
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
    async (text: string) => {
      const clean = text.trim();
      if (!clean || busy) return;
      setDraft("");
      setError(null);
      const next: Turn[] = [...turns, { role: "user", content: clean }];
      setTurns([...next, { role: "assistant", content: "" }]);
      setBusy(true);
      // Bekleme sessiz geçmiyor: yumuşak tık "çalışıyorum" diyor. İlk parça
      // ekrana düştüğünde susuyor — akan metin zaten kendi işareti.
      const stopThinking = startThinking();

      // Alt sınıra ulaşan cevaba sunucu kapanış talimatı veriyor (bkz.
      // lib/conversations/chat); okuma bitince konuşma kendiliğinden özete geçiyor.
      const closing = next.filter((m) => m.role === "user").length >= conversation.chat.minTurns;

      /**
       * Senaryolu cevap: model yerine niyet eşleştirme. Kapanış kuralı
       * modelle aynı (alt sınır kadar tur) — ama senaryo daha erken biterse
       * o da kapanıştır; konuşma yine sayılır.
       */
      const local = (state: OfflineState) => {
        stopThinking();
        const r = offlineReply(conversation, state, clean);
        setOffline(r.state);
        setHintKey(r.hint);
        setTurns([...next, { role: "assistant", content: r.content }]);
        const done = closing || r.ended;
        if (ttsAvailable && r.speak.trim()) {
          const token = ++speechToken.current;
          setSpeakingTurn(next.length);
          speakGerman(r.speak, () => {
            if (speechToken.current !== token) return;
            setSpeakingTurn(null);
            if (done) {
              void finishRef.current();
              return;
            }
            if (!handsFreeRef.current || draftRef.current.trim()) return;
            void listenChat();
          });
        } else if (done) {
          setTimeout(() => void finishRef.current(), 2500);
        }
      };

      if (offlineRef.current) {
        try {
          local(offlineRef.current);
        } finally {
          setBusy(false);
        }
        return;
      }

      try {
        const res = await apiFetch("/api/chat", {
          method: "POST",
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
          setTurns(next);
          setError(t("conversationp.chat_quota", { n: DAILY_QUOTAS.chatTurns }));
          return;
        }
        if (res.status === 503) {
          // Sağlayıcı konuşmanın ortasında düştü: aynı cümleyi senaryoya ver.
          // Senaryo baştan başlar (önceki turlar modelindi); hedef kalıplar
          // yine de ölçülür ve konuşma geçilebilir.
          setOfflineWhy("service");
          local(offlineRef.current ?? offlineStart(conversation).state);
          return;
        }
        if (await isAiConsentDeclined(res)) {
          /* İZİN VERİLMEDİ (diyalogda "yapay zekâ olmadan devam" dendi ya da
             kapatıldı). Cümle sağlayıcıya gitmedi; konuşma durmuyor, senaryoya
             geçip bu turu da senaryodan cevaplıyor. Yoksa kullanıcı "cevap
             alınamadı" görürdü — oysa bağlantı yerinde, yalnız yapay zekâ
             kapalı. Mobil `ConversationScreen` aynı dal. */
          setOfflineWhy("consent");
          local(offlineRef.current ?? offlineStart(conversation).state);
          return;
        }
        if (!res.ok || !res.body) {
          setTurns(next);
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
      } catch {
        setTurns(next);
        setError(t("conversationp.no_connection"));
      } finally {
        stopThinking();
        setBusy(false);
      }
    },
    // `listenChat` aşağıda tanımlı; bağımlılığa alınırsa döngü oluşur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turns, busy, conversation.id, ttsAvailable],
  );
  useEffect(() => {
    sendRef.current = (t: string) => void send(t);
  }, [send]);

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

  // ─────────────────────────── bitiş ───────────────────────────

  async function finish() {
    recognition.current?.abort();
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
    // Senaryolu konuşmanın puanı: kalıpların kaçı kullanıldı (KPI 2/6).
    // Modelli konuşmanın puanı WP-22 ile gelir.
    if (offlineRef.current) {
      track("production_attempt", offlineSummary(conversation, offlineRef.current).score, "chat");
    }
    try {
      const payload = {
        conversationId: conversation.id,
        correct: correctCount,
        chatDone,
        day: localDay(),
        seconds: Math.round((Date.now() - startedAt.current) / 1000),
      };
      const res = await apiFetch("/api/conversation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
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
         kendi günüyle kuyruğa alınıyor ve sonraki açılışta gidiyor. */
      queueConversationResult({
        conversationId: conversation.id,
        correct: correctCount,
        chatDone,
        day: localDay(),
        seconds: Math.round((Date.now() - startedAt.current) / 1000),
      });
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
  /* Konuşma YARIM: sunucu açıkça "sayılmadı" dediyse ya da asgari tur dolmadıysa
     (mobil `Summary` `unfinished` ile aynı iki koşul). */
  const unfinished = saved?.passed === false || !chatDone;

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
        <ConversationExit />
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
                <XIcon size={14} />
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
                    style={{ color: handsFree ? "var(--color-brand)" : undefined }}
                  >
                    <MicIcon size={13} />
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
                      recognition.current?.abort();
                      // İzin en baştan, kullanıcı hareketiyle isteniyor: ilk
                      // eller serbest açılış izin istemine takılıp gecikmesin.
                      if (handsFree) void requestMicrophone();
                      runStep(stepIndex + 1);
                    }}
                    className="btn btn-primary w-full py-3 text-body"
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
                      recognition.current?.abort();
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
                      recognition.current?.abort();
                      inputMode.current = "tap";
                      evaluate([FALSE_WORD[lang]]);
                    }}
                    className="flex items-center justify-center gap-2 rounded-panel px-4 py-3 text-center text-strong on-fill glow-tint-sm"
                    style={{ background: "var(--color-danger)", "--tint-fill": "var(--color-danger)" } as React.CSSProperties}
                  >
                    <XIcon size={18} />
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
                      <MicIcon size={24} />
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
                        submitTyped();
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
                    onClick={submitTyped}
                    disabled={!draft.trim()}
                    className="btn btn-primary h-11 shrink-0 px-4 text-body disabled:opacity-60"
                  >
                    {t("common.send")}
                  </button>
                </div>
              ) : null}

              {!expect && stepIndex >= conversation.lecture.length - 1 && feed.length ? (
                <button
                  type="button"
                  onClick={startChat}
                  className="btn btn-primary w-full py-3 text-body"
                >
                  {t("conversationp.to_chat")}
                </button>
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
              {offline && offlineWhy === "consent" ? (
                /* İzin dalı: "servis kapalı" çipi ve güvencesi YOK (ikisi de
                   servisin kapalı olduğunu söylüyor). Tek cümle hem sebebi hem
                   konuşmanın sayıldığını hem de nereden açılacağını söylüyor. */
                <p
                  className="mt-2 flex items-start gap-1.5 rounded-panel px-2.5 py-1.5 text-caption leading-relaxed"
                  style={{
                    background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)",
                    color: "var(--color-flame)",
                  }}
                >
                  <AlertIcon size={12} className="mt-1 shrink-0" />
                  {t("conversationp.chat_off_consent")}
                </p>
              ) : offline ? (
                <>
                  <p
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-micro"
                    style={{
                      background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)",
                      color: "var(--color-flame)",
                    }}
                  >
                    <AlertIcon size={12} />
                    {t(conversation.chat.script?.length ? "conversationp.chat_off_scripted" : "conversationp.chat_off_patterns")}
                  </p>
                  {/* "KONUŞMA YİNE SAYILIR" GÖRÜNÜR OLDU. Cümle `title=` ile
                      bir ipucu balonunda duruyordu: dokunmatikte hiç
                      açılmıyor, klavyeyle de erişilmiyor - yani en çok
                      güven veren kısım (servis kapalı ama konuşman sayılıyor)
                      kullanıcıların bir bölümüne hiç ulaşmıyordu. Android'de
                      bu cümle hiç yoktu; aynı turda ortak anahtara alınıp iki
                      tarafta da yazılır oldu. */}
                  <p className="muted mt-1 text-caption leading-relaxed">{t("conversation.chat_offline_note")}</p>
                </>
              ) : null}
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
                    style={{ color: handsFree ? "var(--color-brand)" : undefined }}
                  >
                    <MicIcon size={13} />
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
              {error ? (
                <div
                  className="flex max-w-[85%] items-start gap-1.5 rounded-panel rounded-bl-chip px-3 py-2.5 text-body"
                  style={{
                    background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)",
                    color: "var(--color-flame)",
                  }}
                >
                  <AlertIcon size={15} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              ) : null}
            </div>

            {suggestions.length ? (
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
                    disabled={busy}
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
                      <MicIcon size={24} />
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
                    disabled={busy || !draft.trim()}
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
                {t(chatDone ? "conversationp.end_conversation" : "conversationp.leave_for_now")}
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

              KUTLAMANIN VE MASKOTUN ÖLÇÜTÜ konuşmanın ALIŞTIRMA İSABETİ (`pct >= 80`
              kutla, `>= 50` sevin); hüküm (yarım kaldı mı) ayrı: yarım kalan
              konuşma band sessizleşiyor ve konfeti hiç atılmıyor.

              BAŞLIĞIN BİLİNMEYEN HÂLİ: kayıt isteği düşerse `saved` null kalır;
              yarım sayılması için ya sunucu açıkça "sayılmadı" demeli ya da
              asgari tur yerelde dolmamış olmalı — konuşma yerelde bittiyse bitti.
            */}
            <FlowColumn celebrate={!unfinished && pct >= 80}>
              <ResultHero
                eyebrow={`${t("unitkind.conversation")} · ${conversation.title}`}
                title={t(unfinished ? "conversationp.conversation_unfinished" : "conversation.conversation_complete")}
                figure={scoredTotal ? `${correctCount}/${scoredTotal}` : null}
                sub={t("conversationp.n_turns", { n: userTurns })}
                quiet={unfinished}
                pill={unfinished ? { text: t("conversationp.pill_min_turns", { n: conversation.chat.minTurns }), tone: "bad" } : null}
              />
              {/* Tur sayısı konuşmanın UZUNLUĞU, isabetten ayrı bir şey; eşikle
                  birlikte yazılıyor. Tekrar günü aralıklı tekrar merdiveninden. */}
              <StatRow
                items={[
                  { value: formatPercent(pct, lang), label: t("conversation.accuracy") },
                  { value: `${userTurns}/${conversation.chat.minTurns}`, label: t("conversationp.stat_turns"), tone: unfinished ? "bad" : "ok" },
                  ...(!unfinished && saved ? [{ value: t("profile.days", { n: saved.nextDays }), label: t("conversationp.stat_review") }] : []),
                ]}
              />

              {unfinished ? (
                <FlowNote tone="warn" icon={<AlertIcon size={16} />} text={t("conversationp.min_turns_note", { n: conversation.chat.minTurns })} />
              ) : null}
              {extras.cando.length ? (
                <FlowNote tone="ok" icon={<CheckIcon size={16} />} text={`${t("conversationp.i_can")} ${extras.cando.join(" · ")}`} />
              ) : null}
              {!corrections.length && turns.length > 1 ? (
                <FlowNote tone="ok" icon={<CheckIcon size={16} />} text={t("conversationp.no_corrections")} />
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
                      <div key={pt.de} className="flex items-baseline gap-2" style={{ opacity: talked && !used ? 0.6 : 1 }}>
                        {talked ? (
                          <span className="w-4 shrink-0" style={{ color: "var(--color-mint)" }}>
                            {used ? <CheckIcon size={14} /> : null}
                          </span>
                        ) : null}
                        <span className="text-strong" style={used ? { color: "var(--color-mint)" } : undefined}>
                          {pt.de}
                        </span>
                        <span className="muted min-w-0 flex-1 text-right text-caption">{pt.tr}</span>
                      </div>
                    );
                  })}
                </DetailCard>
              ) : null}

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
                  tertiary={{ label: t("conversation.back_to_path"), href: "/immersion" }}
                />
              ) : (
                <FlowActions
                  primary={
                    extras.next
                      ? { label: t("conversation.next_speaking", { title: extras.next.title }), href: `/conversations/${extras.next.id}` }
                      : { label: t("conversation.back_to_path"), href: "/immersion" }
                  }
                  /* İPUCU GÖRÜNÜR: düğmenin ikinci satırı (Android aynı). */
                  secondary={turns.length > 1 ? { label: t("conversationp.try_scored"), hint: t("conversationp.scored_hint"), href: `/conversations/${conversation.id}/scored` } : null}
                  tertiary={extras.next ? { label: t("conversation.back_to_path"), href: "/immersion" } : null}
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
}: {
  item: FeedItem;
  ttsAvailable: boolean;
  speaking: boolean;
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
    <motion.div {...bubbleEntrance(still)} className="flex items-end gap-1.5">
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
                {i < item.segments.length - 1 ? " " : null}
              </span>
            ))}
          </motion.span>
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
          <XIcon size={13} className="mt-0.5 shrink-0" />
          <span>{c}</span>
        </p>
      ))}
      {/* Bildir — mobilde de her yapay zekâ yanıtının altında (Play'in
          "yapay zekâ ile üretilen içerik" politikası: rahatsız edici bir
          yanıt uygulamadan çıkmadan bildirilebilmeli). */}
      {onReport && body.trim() && !pending ? (
        <button
          type="button"
          onClick={() => onReport(turn.content)}
          /* Yalniz 11px yazi: hedefin yuksekligi yazinin kendisi kadardi,
             yani WCAG 2.2'nin 24px asgarisinin ALTINDA. `hit-8` ile ~29.
             Mobil karsiligi da `hitSlop={8}` tasiyor. */
          className="muted text-micro underline underline-offset-2 hit-8"
        >
          {t("conversation.report_this_answer")}
        </button>
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
      <AlertIcon size={14} className="mt-0.5 shrink-0" />
      <span>{t("conversationp.no_asr_long")}</span>
    </div>
  );
}
