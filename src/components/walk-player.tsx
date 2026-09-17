"use client";

import { glossFor, type GlossWord } from "@/lib/option-label";
import { apiFetch } from "@/lib/api-fetch";
import { useCallback, useEffect, useRef, useState } from "react";
import { miss } from "@/lib/errors";
import { motion } from "framer-motion";
import { COURSE_KEY, readLocal, speakSegments, stopSpeaking, type SpeechSegment } from "@/components/speak-button";
import { useT, useLang } from "@/lib/i18n/client";
import { MicDisclosure } from "@/components/mic-disclosure";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { RoundExit } from "@/components/round-exit";
import { useLeaveGuard } from "@/lib/use-leave-guard";
import { hasMicConsent, setMicConsent } from "@/lib/mic-consent";
import { decideAiConsent, fetchAiConsent, type AiConsentProcessor } from "@/lib/ai-consent-client";
import { formatPercent, nativeLangName, type NativeLang } from "@/lib/i18n/dict";
import { courseName } from "@/lib/courses";
import { useListen } from "@/components/use-listen";
import { spokenMatches } from "@/components/games/types";
import { parseConfirm, parseSkip, skipWord } from "@/lib/voice-intent";
import { useWakeLock } from "@/components/use-wake-lock";
import { FlowColumn, FlowActions, FlowNote, ResultHero, StatRow, CoverBody, StateBody } from "@/components/flow";
import { resultText, shareText } from "@/lib/share";
import { ShareIcon } from "@/components/icons";
import { sharedAudioContext } from "@/lib/audio-context";
import { pocketCue, pocketWalkCue } from "@/components/pocket-audio";
import { closeMic, micSupported, recordAnswerClip, sttAvailable, transcribe } from "@/components/pocket-mic";
import { afterMs, withDeadline } from "@/components/pocket-clock";
import { play, resetCombo, walkCueMs, type WalkCue } from "@/lib/sfx";
import { track } from "@/lib/track";
import { CheckIcon, InboxIcon, MicIcon, RefreshIcon, SparkIcon, SpeakerIcon, WalkIcon, XIcon } from "@/components/icons";
import type { Answer, Round, RoundWord, SessionPayload, SessionProgress } from "@/lib/types";
import { localDay } from "@/lib/day";
import { vibrate } from "@/lib/fx";

/**
 * Yürürken modu — ekransız kelime turu.
 *
 * Uygulamanın tamamı bir ekrana bakmayı gerektiriyordu. Oysa eller serbest
 * konuşma döngüsü derslerde zaten çalışıyordu: cevap sesli okunuyor, okuma
 * biter bitmez mikrofon kendiliğinden açılıyor, söylenen doğrudan gidiyor.
 * Aynı döngü kelime turuna taşındığında ortaya bambaşka bir kullanım anı
 * çıkıyor — yürürken, bulaşık yıkarken, otobüste.
 *
 * Yön bilerek ÜRETİM: Türkçe duyuluyor, Almanca söyleniyor. Ekranda şık
 * işaretlemek tanımadır; ağızdan çıkarmak ise dilin asıl kullanıldığı iş ve
 * ekrana bakmadan yapılabilecek tek alıştırma türü.
 *
 * Tur, ekrandaki turun TA KENDİSİ: aynı `/api/session` kuyruğu okunuyor ve
 * cevaplar aynı uca gidiyor. Yani ekranda başlayıp kulakla devam etmek (ya da
 * tersi) mümkün; SRS, günlük hedef, seri ve rozetler hiçbir şeyin farkında
 * olmuyor. Ayrı bir "sesli mod ilerlemesi" kurmak, aynı emeği ikinci bir
 * yerde saymak olurdu.
 *
 * Cevaplar `speak` adıyla kaydediliyor. Yazma oyununun hanesine yazmak
 * kolaydı ama profil ekranındaki oyun başarısı tablosunu bozardı: ikisi
 * farklı beceri.
 *
 * Telefon cepteyken üç şey ayrıca çözülmek zorunda kaldı:
 *
 *   - **Ekran kapanınca tanıyıcı susuyor.** Tarayıcıda arka planda konuşma
 *     tanıma yok; kilitli telefonda dinleyen bir sekme, mikrofonu görünmez
 *     biçimde açık tutmak olurdu. Tek dürüst çözüm ekranın kapanmasını
 *     engellemek (`useWakeLock`).
 *   - **Sayfa görünmez olursa tur yanmamalı.** Başka bir uygulamaya geçilince
 *     tanıyıcı anında boş dönüyordu ve yirmi tur saniyeler içinde "duyamadım"
 *     diye tükeniyordu. Görünürlük gidince tur DURUYOR.
 *   - **Tur bitince telefonu çıkarmak gerekmemeli.** Oturum sonunda soru sesli
 *     soruluyor ve cevap sesli alınıyor: "devam edelim mi?" → "evet".
 *
 * Ekran KAPANDIĞINDA ne olacağı ayrı bir sorun. Ekran kilidi yalnızca boşta
 * kalmayı engelliyor; kullanıcı güç tuşuna basıp telefonu cebine attığında
 * ekran yine kapanıyor ve konuşma tanıyıcı susuyor. Bu bir eksik değil,
 * Chromium'un Android'e özel kararı: sayfa gizlenince tanıma iptal ediliyor
 * (Blink `SpeechRecognition::PageVisibilityChanged`), kendi ses kanalını
 * verme (`start(track)`) ve cihaz-üstü API de Android Chrome'da yok.
 *
 * Bu yüzden ekran HİÇ kapanmıyor, iki kipin ikisinde de:
 *
 *   - **Ekranda** — dersle birebir aynı: tarayıcının kendi tanıyıcısı, başka
 *     hiçbir şey. Mikrofon akışı tutulmuyor, okuma oyunlardaki boşluksuz
 *     yoldan. Sebebi ölçüldü: mikrofon akışı oturum başında alınıp (parçaları
 *     kapalı) tutulduğunda, sahibin telefonunda altı dinlemenin altısı
 *     `browser:end` ile bitti — tanıyıcı açılıyor, hata vermeden ve hiçbir şey
 *     duymadan kapanıyor. Android eşzamanlı kayıtta sesi üstteki uygulamanın
 *     kendi akışına veriyor, tanıyıcı servisi sessizlik alıyor; aynı akış
 *     Bluetooth'ta çıkışı telefon yoluna (SCO) düşürüp okumayı da bozuyordu.
 *     Boş dinleme "duyamadım"dır, kip değişmez.
 *   - **Cepte** — "Cebe koy" ekranı KARARTIYOR ama kapatmıyor (`darken`):
 *     siyah katman + tam ekran + ekran kilidi. Ekran teknik olarak açık
 *     kaldığı için tanıyıcı cepte de aynen çalışıyor.
 *
 * Ekran yine de kapanırsa (güç tuşu) tur DURUR ve sebebi sesle söylenir:
 * mikrofon kilitli ekranda istenemiyor, o an yapılacak dürüst şey yok.
 *
 * Eskiden ekran GERÇEKTEN kapalıyken de çalışan bir cep yolu vardı (mikrofon
 * + sürekli kayıt + sessiz döngü, cevaplar sunucuda yazıya). Cihaz testi
 * (HyperOS, 2026-08-28) ekran kapanınca sistemin mikrofonu susturduğunu
 * gösterdi; yol kaldırıldı (2026-09-17). Kayıt + sunucu yolundan kalan tek
 * parça tanıyıcısı OLMAYAN tarayıcılar içindir (bkz. `hearOnce`).
 *
 * Her dinleme ve her geçiş kayda geçiyor (`walk_listen`, `walk_switch`):
 * "Web Speech gerçekten devrede mi" sorusu veriyle cevaplansın.
 */

type Status =
  | "loading"
  | "ready"
  | "playing"
  | "paused"
  | "done"
  | "empty"
  | "error"
  | "unsupported"
  | "denied";

/** Ekranda ne olduğunu söyleyen tek satır — bakan biri için. */
type Phase = "speaking" | "listening" | "judging";

/**
 * "Bilmiyorum" cevabına kısa motive — yanlış saymadan, uzun konuşmadan.
 *
 * Öğrenci cevabı bilmiyorsa "bilmiyorum/pas/fikrim yok" diyor; buna 15-20
 * ifadeyle değil, ceza da vermeden, kısa bir cesaretle karşılık veriyoruz ve
 * doğrusunu okuyoruz. Rastgele biri seçiliyor ki hep aynı cümle olmasın.
 */
type T = (key: string, vars?: Record<string, string | number>) => string;

function encourage(t: T): string {
  // Mobil seçenekleri TEK anahtarda boru işaretiyle taşıyor (`walk.encourage`);
  // web aynı sözlüğü okuduğu için aynı biçimi ayrıştırıyor.
  const list = t("walk.encourage").split("|").filter(Boolean);
  return list[Math.floor(Math.random() * list.length)] ?? "";
}

/**
 * Anlamın SESLİ hâli — metin ve ses BİRLİKTE seçiliyor.
 *
 * Karşılık hangi dildeyse ses de o dilde: Türkçe bir metni Almanca anlatım
 * sesiyle okutmak, kulakta anlamsız bir şey üretir.
 *
 * Metin `glossFor`dan geliyor, yani tur havuzuyla AYNI kuraldan: anadilde
 * karşılığı olmayan kelime zaten tura girmiyor (sunucu süzüyor), dolayısıyla
 * buraya karşılıksız bir kelime gelmemeli. Geldiğinde Türkçeye düşmek yerine
 * boş segment dönüyor — yanlış dilde okumaktansa okumamak.
 */
function glossSegment(word: GlossWord, lang: NativeLang): SpeechSegment {
  const g = glossFor(word, lang);
  if (!g) return { lang: "tr", text: "", narration: false };
  return { lang, text: g.text, narration: true };
}

/**
 * Duyulmayan cevabın karşılığı.
 *
 * Sessizlik YANLIŞ sayılmıyor. Sokakta, otobüste ya da cepteki telefonda
 * mikrofonun bir turu kaçırması olağan; onu hata yazmak tekrar planını
 * bozardı — kelime gerçekten unutulduğu için değil, gürültü yüzünden öne
 * çekilirdi. Duyulmayan tur cevapsız geçiliyor ve doğru karşılık okunuyor.
 */
const UNHEARD_IS_NOT_WRONG = true;

/** Anlatım tarafının tanıyıcı etiketi — arayüz dili neyse o dinleniyor. */
const NATIVE_TAG: Record<NativeLang, string> = { tr: "tr-TR", en: "en-US", de: "de-DE" };

/**
 * Mikrofonun çalışmadığına ne zaman karar verilir.
 *
 * Mikrofon gerçekten çalışmıyorsa (izin geri alınmış, başka uygulama
 * kullanıyor, sayfa arka planda) her tur anında boş dönüyor ve yirmi turluk
 * oturum saniyeler içinde tükeniyor — kullanıcı cebinden çıkardığında tur
 * bitmiş oluyor.
 *
 * Ölçüt bilerek "üst üste" DEĞİL, "son N turun M'si". Tarayıcı tanıyıcısı
 * bozuk durumdayken bile arada bir çöp metin döndürebiliyor; ardışıklık
 * arayan bir sayaç o tek metinle sıfırlanıyor ve koruma hiç devreye
 * girmiyordu. Ölçümde tam olarak bu oldu: kırk beş saniyede altı tur yandı,
 * sayaç hiç üçe ulaşmadı.
 *
 * Pencere dar tutuldu: gerçekten konuşan biri gürültülü bir sokakta iki tur
 * kaçırabilir, dört turun üçünü kaçırmaz.
 */
const UNHEARD_WINDOW = 4;
const UNHEARD_LIMIT = 3;

/** Onay sorusunda cevabı beklerken tanınan sessizlik tavanı. */
const CONFIRM_SILENCE_MS = 7000;

/**
 * Cevap için beklenen en uzun süre.
 *
 * Artık sabit bir pencere DEĞİL, üst sınır: kayıt konuşma bitince kendiliğinden
 * kapanıyor (bkz. pocket-mic). Bu yüzden cömert olabiliyor — düşünmesi gereken
 * kullanıcı beklenirken, hızlı cevap veren beklemiyor.
 *
 * Önceki 3,5 saniyelik sabit pencere sorunun ta kendisiydi: kullanıcı Türkçeyi
 * duyar duymaz konuşmaya başlıyor, kaydedici henüz ayağa kalkmamış oluyor ve
 * kelimenin BAŞI kayda girmiyordu. Whisper baştan okuduğu için sonuç doğrudan
 * uydurma oluyordu.
 */
const ANSWER_WINDOW_MS = 8000;
/**
 * Tarayıcı tanıyıcısında hiç konuşma gelmezse kaç ms beklenir.
 *
 * Eskiden 4 saniyeydi ve arkasında bir gerekçe vardı: boş dinlemenin ardından
 * kayıt yolu da deneniyordu, tavan uzun tutulunca bekleme ikiye katlanıyordu.
 * O ikinci deneme artık yok — görünürken tek yol tanıyıcı — yani tavan
 * düşünme süresine göre kurulabiliyor. Dört saniyeyi aşan iki cevap eskiden
 * tanıyıcıyı oturum boyunca kapatıyordu; kullanıcının "ekran açıkken
 * Deepgram'a gidiyor" diye gördüğü şey buydu.
 */
const BROWSER_SILENCE_MS = 9000;
/**
 * Tanıyıcının bu oturumda kullanılamaz olduğunu söyleyen hata kodları.
 *
 * Bunlar "kullanıcı sustu" değil "mikrofon yok" demek: izin geri alınmış,
 * cihaz başka uygulamada, servis kapalı. Boş dinleme ("no-speech") ve
 * gizlenince iptal ("aborted") bu listede DEĞİL — onlar geçici.
 */
const BROWSER_DEAD = new Set(["not-allowed", "service-not-allowed", "audio-capture", "language-not-supported", "start-failed"]);
/** Kaç ardışık başarısız kayıttan sonra tur durur. */
const CAPTURE_FAIL_LIMIT = 2;
/** Turlar arası nefes — "aşırı hızlı" geçişleri yavaşlatır (cepte de geçerli). */
const GAP_MS = 850;

/**
 * Ağ isteklerinin üst sınırı.
 *
 * Cepteki telefon uyku kipine yaklaştıkça ağ yavaşlıyor; zaman aşımı olmayan
 * bir istek turu dakikalarca dondurabiliyor. Cevap gönderimi kaybolursa SRS
 * bozulmuyor (sunucu son duruma göre çalışıyor), yani beklemek pahalı, vazgeçmek
 * ucuz.
 */
const NET_TIMEOUT_MS = 10_000;

/**
 * Bir okumanın en fazla süresi.
 *
 * Zincirin kendi parça korumaları var (bkz. speak-button) ama bu ONLARIN da
 * çuvallamasına karşı son kapı: `say` çözülmezse tur o satırda kalıyor ve
 * kullanıcı hiçbir şey duymuyor. Dört parçalık en uzun tanıtım bile on
 * saniyeyi geçmiyor, otuz saniye rahat bir tavan.
 */
const SPEAK_CAP_MS = 30_000;

/**
 * Bir dinlemenin en fazla süresi.
 *
 * Pencerenin kendisi zaten sınırlı; buradaki pay kaydediciye, ağa ve yazıya
 * çevirmeye. Süre dolarsa "duyulmadı" sayılıyor — turun donması değil.
 */
const HEAR_SLACK_MS = 15_000;

function withArtikel(w: RoundWord): string {
  return w.artikel ? `${w.artikel} ${w.de}` : w.de;
}

/** Turdaki kelimeler — eşleştirme turu beş kelime taşıyor, gerisi bir. */
function wordsOf(round: Round): RoundWord[] {
  return round.game === "match" ? round.words : [round.word];
}

export function WalkPlayer({ onExit }: { onExit: () => void }) {
  const t = useT();
  const lang = useLang();
  // Hedef dilin adı ekranda geçiyor; kurs cihazdaki aynadan okunuyor (mobil
  // `currentCourseId()` ile aynı kaynak).
  const course = readLocal(COURSE_KEY) ?? "de";
  const [status, setStatus] = useState<Status>("loading");
  // Açıklama ekranı: null = kapalı; açıksa hangi başlatma yolunun beklediği.
  const [disclosure, setDisclosure] = useState<"pocket" | "screen" | null>(null);
  /*
    SUNUCUDAKİ SES RIZASI (`ai_voice`) ve açıklamada adları sayılan sağlayıcılar.

    ÖNCEDEN okunuyor, başlangıç dokunuşunda değil: `begin` dokunuşun içinde
    EŞZAMANLI kalmak zorunda (cep yolunun tam ekranı yalnız kullanıcı
    hareketinin içinden alınabiliyor), araya bir istek giremez. `null` =
    okunamadı / henüz bilinmiyor.
  */
  const voiceGranted = useRef<boolean | null>(null);
  const [voiceProcessors, setVoiceProcessors] = useState<AiConsentProcessor[] | null>(null);
  const [voiceFailed, setVoiceFailed] = useState(false);
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("speaking");
  const [prompt, setPrompt] = useState<{ tr: string; de: string } | null>(null);
  const [verdict, setVerdict] = useState<"correct" | "wrong" | "unheard" | "skip" | null>(null);
  /** Şu an sorulan şey bir kelime değil, "devam edelim mi?" onayı. */
  const [asking, setAsking] = useState(false);
  /**
   * Tanıyıcının duyduğu metin.
   *
   * Ekranda gösteriliyor ve sebebi bir hata ayıklama kolaylığı değil, güven:
   * "doğru söyledim ama yanlış saydı" şikâyetinin tek cevabı, ne duyduğunu
   * göstermek. Kullanıcı kendi kulağıyla karşılaştırabildiğinde sorunun
   * telaffuzunda mı yoksa tanıyıcıda mı olduğunu anında görüyor.
   */
  const [heardText, setHeardText] = useState("");
  /**
   * Sesin nasıl yakalandığı. İkisi de ÖLÇÜYOR — fark yalnızca yöntem.
   *
   *   `browser` — tarayıcının kendi tanıyıcısı. Anahtar gerektirmiyor ama
   *               yalnızca sayfa görünürken çalışıyor. Varsayılan yol.
   *   `stt`     — tanıyıcısı olmayan (ya da oturum içinde ölen) tarayıcıda:
   *               mikrofon `getUserMedia` ile açılıyor, her cevap kısa bir
   *               klip olarak kaydedilip sunucuda yazıya çevriliyor.
   *
   * Hem durum hem ref: ekranda gösterilmesi gerekiyor ve döngünün içinden
   * okunuyor (döngü her turda yeniden kurulmadığı için durum olarak okunsa
   * eski değeri görürdü).
   */
  const [capture, setCapture] = useState<"stt" | "browser">("browser");
  const captureRef = useRef<"stt" | "browser">("browser");
  /** Tarayıcının kendi tanıyıcısı kullanılabiliyor mu — görünürken tercih edilen yol. */
  const browserRef = useRef(false);
  /** Sunucuda yazıya çevirme açık mı — tanıyıcı yoksa ya da ölürse devreye giren yol. */
  const sttReady = useRef(false);
  /** Süren dinlemenin iptal düğmesi — süre dolunca ya da tur durunca basılıyor. */
  const hearCtl = useRef<AbortController | null>(null);
  /**
   * Ekran KARANLIK ama açık — "cep kilidi".
   *
   * Cihaz testinde (Xiaomi HyperOS, 2026-08-28) ekran KAPANINCA HyperOS'un güç
   * yöneticisi (`whetstone`/`AwareResourceControl`) Chrome'un mikrofonunu
   * susturuyor: cep yolu (kayıt + sunucu) o cihazlarda kodla çalıştırılamıyor.
   * Ama susturma yalnız ekran kapalıyken; ekran AÇIK kalırsa tarayıcının kendi
   * tanıyıcısı (ekranda kusursuz çalışan yol) cepte de çalışır. Bu yüzden ekranı
   * kapatmak yerine simsiyah bir katmanla örtüyoruz: ekran teknik olarak açık,
   * mikrofon çalışıyor, ama kullanıcı cebe koyunca ne ışık ne kazara dokunma.
   */
  const [screenDark, setScreenDark] = useState(false);
  const darkOverlay = useRef<HTMLDivElement | null>(null);
  /** Tur ortasında "Bitir" onayı açık mı. */
  const [quit, setQuit] = useState(false);
  /* Ayrilmanin oteki yollari da ayni onaya bagli (yenileme, sekme, kenar
     cubugu bagalantilari). Android'de kosul `inSession`; burada karsiligi
     "oynuyor ya da duraklatildi". */
  const ayril = useLeaveGuard(status === "playing" || status === "paused");
  /** Karanlık katmandan çıkış: kısa sürede üç dokunuş (cepte kazara açılmasın). */
  const darkTaps = useRef<number[]>([]);
  /**
   * "Cebe koy" bir dinlemenin ORTASINDA basıldı: o dinleme iptal edildi ve
   * kelime bir kez daha sorulacak — kullanıcı düğmeye basarken kelimeyi
   * kaçırmış olabilir, o kelimeyi "duyulmadı" saymak haksızlık olurdu.
   */
  const reask = useRef(false);
  /**
   * Döngünün bir sonraki dinlemeden önce okuyacağı duyuru.
   *
   * Düğmeden doğrudan `say` çağırmak ölçülmüş bir hataydı: döngünün süren
   * okumasını iptal ediyor, döngü o okumanın bitişini otuz saniyelik tavana
   * kadar bekliyordu. Okuyan tek yer döngü; düğme yalnız not bırakıyor.
   */
  const announce = useRef<string | null>(null);
  /**
   * Oturum başında cebe kondu: cep anonsu SIRADAKİ kelimeden ÖNCE okunmalı.
   * `announce` bir sonraki `hearOnce`'ta (kelimeden SONRA) okunuyor; başlangıçta
   * bu "önce kelime, sonra cebe konuldu" sırasını veriyordu (bkz. darken/loop).
   */
  const pocketPreroll = useRef(false);
  /** Teslim işaretinin ("weiter") ne olduğu yürüyüşe girişte bir kez okunur. */
  const hintDone = useRef(false);
  /** Tur bir sebeple bitti mi — sökülürken ikinci bir `walk_end` yazılmasın. */
  const ended = useRef(false);
  /** `?diag=1`: son dinlemelerin yolu ve sonucu ekranda — telefonda bir bakışta. */
  const [diag, setDiag] = useState<string[] | null>(null);
  /** Üst üste kaç turda klip üretilemedi — kayıt arızasını sessizce sürüklememek için. */
  const captureFails = useRef(0);
  /** Premium kapısı bir kez söylendi mi — her kelimede tekrarlanmasın. */
  const premiumTold = useRef(false);
  /** Ses rızası olmadığı bir kez söylendi mi — aynı sebeple. */
  const consentTold = useRef(false);
  /** Bu yürüyüşte sorulan kelimeler — devam turunda tekrar sorulmasın diye. */
  const askedIds = useRef<Set<number>>(new Set());
  /**
   * Turu durduran işlev, ref üzerinden.
   *
   * `hear` bu dosyada `stopAll`tan ÖNCE tanımlanıyor ve doğrudan çağırmak
   * bildirimden önce kullanmak olurdu. Ref sırayı bozmadan bağlıyor.
   */
  const pauseRef = useRef<() => void>(() => {});
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  /* Bitis ekraninin kutlama esigi - Android ile ayni hesap
     (`WalkModeScreen` `donePct`). */
  const donePct = tally.total ? Math.round((tally.correct / tally.total) * 100) : 0;

  const { listen, cancel } = useListen();
  /** Çalışan döngünün jetonu — duraklat/çık geç gelen adımları geçersiz kılar. */
  const run = useRef(0);
  const startedAt = useRef(Date.now());
  const pending = useRef<Answer[]>([]);
  const missed = useRef<SessionProgress["missed"]>([]);
  /** Sunucudaki oturuma ait sayaç — kaydedilen ilerleme bundan yazılıyor. */
  const tallyRef = useRef({ correct: 0, total: 0 });
  /**
   * Yürüyüşün tamamına ait sayaç.
   *
   * Ayrı tutuluyor çünkü ikisi farklı şeyi ölçüyor: sunucuya yazılan ilerleme
   * O oturumun ilerlemesi olmak zorunda (yoksa ikinci oturum 20/20 dolu
   * başlar), ekranda görülmesi gereken ise kullanıcının bu yürüyüşte toplam
   * ne yaptığı.
   */
  const walkRef = useRef({ correct: 0, total: 0, sessions: 1 });
  /* Bitiş ekranının "yeni kelime" ve "süre" sayıları — `walkRef` gibi
     YÜRÜYÜŞÜN tamamına ait (mobil tur başına sıfırlıyor, çünkü orada sayaç
     da tur başına). Süre ilk başlangıçtan bitişe; bitiş anı bir kez
     yazılıyor ki ekran yeniden çizildikçe kaymasın. */
  const taught = useRef(0);
  const walkBegan = useRef<number | null>(null);
  const endedAt = useRef<number | null>(null);
  /** Devam turu boş geldi: bitiş ekranında "devam" yok, not var (mobil `noMore`). */
  const [noMore, setNoMore] = useState(false);
  /** Son turların duyuldu/duyulmadı geçmişi — pencere bunun üstünde. */
  const heardLog = useRef<boolean[]>([]);
  const { acquire, release } = useWakeLock();
  /** Okumanın bitişini bekleyen söz — iptal edilirse elle çözülür. */
  const speakDone = useRef<(() => void) | null>(null);

  // ── Sunucu konuşması ────────────────────────────────────────────────

  const load = useCallback(async () => {
    try {
      // walk=1: sunucu yürüyüşe özel TEMİZ kuyruğu kuruyor (tam 20 tur, kelime
      // başına tek "speak", araya birkaç yeni; bkz. buildWalk) ve session_state'e
      // dokunmuyor. Client tarafı benzersizleştirme (eski walkQueue) artık gereksiz.
      /*
        GÜN İSTEMCİNİN YEREL GÜNÜ. Adres `day` taşımıyordu ve uç, gün gelmezse
        SUNUCUNUN UTC gününe düşüyor (`clampDay`). Gece yarısına yakın yürüyen
        kullanıcının cevapları yanlış güne yazılıyordu: günlük istatistik ve
        seri o günden hesaplanıyor. Aynı sayfanın oturum oynatıcısı ve mobilin
        yürüyüşü baştan beri yerel günü gönderiyor.
      */
      const res = await apiFetch(`/api/session?day=${localDay()}&walk=1`, {
        cache: "no-store",
        signal: AbortSignal.timeout(NET_TIMEOUT_MS),
      });
      if (!res.ok) return setStatus("error");
      const data = (await res.json()) as SessionPayload & { resume?: SessionProgress | null };
      if (!data.rounds.length) return setStatus("empty");
      setSession(data);
      const at = data.resume?.index ?? 0;
      setIndex(Math.min(at, data.rounds.length - 1));
      if (data.resume) {
        tallyRef.current = { correct: data.resume.correct, total: data.resume.total };
        setTally(tallyRef.current);
        missed.current = data.resume.missed;
      }
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  /**
   * Cevapları SRS'e gönderir (`/api/answers`).
   *
   * Yürüyüş DURUM TUTMUYOR (bkz. buildWalk): `session_state`'e hiç dokunmuyor,
   * çünkü o satır normal oturumla paylaşılıyor ve ilerleme yazmak normal turu
   * ezerdi. Bu yüzden `progress` GÖNDERİLMİYOR (yollanırsa `/api/answers`
   * `saveSessionProgress`'i çağırıp o satırı yazardı). Cevabı olmayan adım
   * (tanıtım) hiçbir şey göndermiyor. Cevaplanan kelime SRS'te ileri gittiği
   * için sonraki yürüyüşte kendiliğinden geri gelmiyor; aynı yürüyüş içinde de
   * `?skip=` onu dışarıda tutuyor.
   */
  const flush = useCallback(async (final: boolean) => {
    const batch = pending.current;
    pending.current = [];
    if (!batch.length) return;
    try {
      const res = await apiFetch("/api/answers", {
        signal: AbortSignal.timeout(NET_TIMEOUT_MS),
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          answers: batch,
          day: localDay(),
          seconds: final ? Math.round((Date.now() - startedAt.current) / 1000) : 0,
        }),
        keepalive: true,
      });
      if (!res.ok) return;
      const data = (await res.json()) as { totalXp: number; currentStreak: number };
      window.dispatchEvent(
        new CustomEvent("lernomi:stats", {
          detail: { xp: data.totalXp, streak: data.currentStreak },
        }),
      );
    } catch {
      /* çevrimdışıysa cevaplar bu tur için kaybolur; SRS bozulmaz */
    }
  }, []);

  // ── Ses ve mikrofon ────────────────────────────────────────────────

  /** Okur ve bitmesini bekler. İptal edilirse söz elle çözülür, döngü kilitlenmez. */
  const say = useCallback((segments: SpeechSegment[]): Promise<void> => {
    // Tur bittiyse (Bitir/Duraklat/ekran kapandı) hiçbir okuma başlamıyor.
    // Bug: "devam edelim mi?" okuması ağa çıkmıştı, kullanıcı Bitir'e basıp
    // ana ekrana döndü ve gecikmeli ses ORADA çaldı. Bekleyen okumayı da
    // burada kesiyoruz; çalan okumayı stopSpeaking (stopAll) durduruyor.
    if (ended.current) {
      stopSpeaking();
      return Promise.resolve();
    }
    const spoken = new Promise<void>((resolve) => {
      speakDone.current = resolve;
      /*
        Yol GÖRÜNÜRLÜĞE göre, kipe değil. Sayfa görünürken oyunlarla aynı
        boşluksuz WebAudio yolu — "okuma oyunlardaki gibi olmalı" şikâyetinin
        bir yarısı buydu, ses öğesi zinciri ayrı bir kulak veriyordu. Yalnızca
        sayfa gizliyken ses ÖĞESİ yolu zorlanıyor: telefon kilitlendiğinde
        `AudioContext` askıya alınıyor ve WebAudio ile çalan her şey susuyor;
        ses öğeleri çalmaya devam ediyor. Karartılmış cepte ekran açık kalıyor
        ve WebAudio çalışıyor — background'a erken geçmenin sebebi yok.
      */
      const background = typeof document !== "undefined" && document.visibilityState === "hidden";
      speakSegments(
        segments,
        () => {
          speakDone.current = null;
          resolve();
        },
        undefined,
        { background },
      );
    });
    // Son kapı: okuma çözülmezse tur burada kalırdı (bkz. SPEAK_CAP_MS).
    return withDeadline(spoken, SPEAK_CAP_MS, undefined);
  }, []);

  /** Diag paneline bir satır — yalnız `?diag=1` ile açıkken tutuluyor. */
  const note = useCallback((line: string) => {
    setDiag((d) => (d ? [...d.slice(-5), line] : d));
  }, []);

  /**
   * Mikrofon açıldı / kapandı işaretleri — MOBİLLE AYNI SES.
   *
   * Yürüyüş modunun tamamı ekrana bakmadan kullanılıyor; mikrofonun ne zaman
   * dinlediğini söyleyen tek şey bu iki ton. Eskiden yalnız AÇILIŞ vardı
   * (`cueListen`, derslerin işareti) ve kapanış hiç duyulmuyordu: kullanıcı
   * konuşmayı ne zaman bitireceğini bilemiyordu. Mobilde ikisi de var ve
   * ayrı seslerdi; artık üçü de tek nota tablosundan geliyor (`WALK_NOTES`).
   *
   * İki çalma yolu: `AudioContext` çalışıyorsa WebAudio, çalışmıyorsa (henüz
   * uyandırılmadı ya da askıya alındı) `<audio>` öğesi (bkz. pocket-audio).
   */
  const walkCue = useCallback((kind: WalkCue) => {
    const ctx = sharedAudioContext();
    if (ctx && ctx.state === "running") play(kind);
    else pocketWalkCue(kind);
  }, []);
  const cue = useCallback(() => walkCue("micon"), [walkCue]);

  /**
   * Bir cevabı dinler ve duyduğu adayları döndürür.
   *
   * İki yol da aynı sözleşmeyi veriyor, böylece tur döngüsü hangisinin
   * kullanıldığını bilmek zorunda kalmıyor. Seçim tanıyıcıya bağlı: varsa
   * tanıyıcı, yoksa (ya da oturum içinde öldüyse) kayıt + sunucu.
   */
  const hearOnce = useCallback(
    async (
      /** Hangi taraf dinleniyor: anlatım dili ("native") ya da hedef dil ("target"). */
      side: "target" | "native",
      windowMs: number,
      expected = "",
      /** Ara sonuç bunu geçerse dinleme HEMEN kapanır (bkz. use-listen). */
      accept?: (alternatives: string[]) => boolean,
      /** Kip değişince kelimenin yeniden okunması için. */
      reprompt?: SpeechSegment[],
      signal?: AbortSignal,
    ): Promise<string[]> => {
      const visible = () => typeof document === "undefined" || document.visibilityState === "visible";

      // Düğmeden bırakılan not burada okunuyor — döngünün kendi sırasında.
      if (announce.current) {
        const text = announce.current;
        announce.current = null;
        await say([{ lang: "tr", text, narration: true }]);
        if (signal?.aborted) return [];
      }

      /*
        Ekranda: tarayıcının kendi tanıyıcısı — başka hiçbir şey.

        Eskiden iki boş dinlemeden sonra tanıyıcı oturum boyunca bırakılıp
        sunucuya geçiliyordu; düşünme süresi dört saniyeyi aşan iki cevap
        yetiyordu ve kullanıcı ekran açıkken uydurma kelimeler duyuyordu.
        Boş dinleme artık "duyamadım"dır, kip değişmez. Yalnız tanıyıcının
        gerçekten öldüğünü söyleyen kodlarda (BROWSER_DEAD) oturum boyunca
        bırakılıyor ve bu sesle söyleniyor; o durumda sunucu yolu görünür
        sayfadan `default` kipiyle çağrılıyor, yani Azure'a yine gidilmiyor
        (bkz. pocket-mic `transcribe`).
      */
      if (browserRef.current && visible()) {
        const startedAt = Date.now();
        const heard = await listen({
          lang: side === "native" ? NATIVE_TAG[lang] : "de-DE",
          silenceMs: BROWSER_SILENCE_MS,
          maxMs: windowMs,
          accept,
          // İşaret tanıyıcı BAŞLADIKTAN sonra çalıyor: kullanıcı bipi duyduğu
          // anda mikrofon zaten dinliyor, yani bipi beklemesi gerekmiyor.
          onOpen: cue,
        });
        const outcome = heard.alternatives.length ? "ok" : heard.error ?? (heard.silent ? "silence" : "end");
        track("walk_listen", 0, `browser:${outcome}`);
        note(`tarayıcı ${outcome} ${Date.now() - startedAt} ms${heard.alternatives[0] ? ` "${heard.alternatives[0]}"` : ""}`);
        if (heard.alternatives.length) return heard.alternatives;
        if (signal?.aborted) return [];

        if (heard.error && BROWSER_DEAD.has(heard.error)) {
          browserRef.current = false;
          captureRef.current = "stt";
          setCapture("stt");
          track("walk_switch", 1, "handoff");
          await say([
            {
              lang,
              narration: true,
              text: t(sttReady.current ? "walk.browser_stt_dead_server" : "walk.browser_stt_dead_stop"),
            },
          ]);
          if (!sttReady.current) {
            pauseRef.current();
            return [];
          }
          if (reprompt) await say(reprompt);
          if (signal?.aborted) return [];
          // Tanıyıcısız ekran yolu: kayıt, `default` zincir (görünür sayfa).
        } else {
          // Boş dinleme ya da ekran kapandı: duyulmadı. Ekran kapandıysa
          // görünürlük dinleyicisi turu durduruyor.
          return [];
        }
      }

      /*
        Kayıt + sunucu: YALNIZ tanıyıcısı olmayan (ya da yukarıda ölen)
        tarayıcıda. Tanıyıcı varken buraya düşülmüyor — sayfa gizliyse bile:
        gizlenen sayfada tur zaten duruyor.
      */
      if (!browserRef.current && sttReady.current) {
        /*
          İşaret kaydın başında veriliyor.

          Kaydedici açıksa dönmeye devam ediyor; işaret körlüğü (bkz.
          pocket-mic `CUE_BLIND_MS`) bipin "konuşma başladı" sanılmasını
          engelliyor.
        */
        pocketCue();
        // Kayıt konuşma bitince kendiliğinden kapanıyor; `windowMs` sabit
        // pencere değil ÜST SINIR. Sürekli kaydediciden kesilen geçerli webm.
        const clip = await recordAnswerClip(windowMs, signal);
        if (signal?.aborted) return [];
        if (clip) {
          captureFails.current = 0;
          const startedAt = Date.now();
          const heard = await transcribe(clip.blob, lang, expected, { signal });
          /*
            PREMIUM KAPISI — "duyamadım" değil.

            `/api/stt` deneme sınavı bağlamı taşımayan HER isteği premium
            kapısına sokuyor (bağlam istemcinin `mode` beyanından değil,
            çalışan sınav kâğıdından; bkz. api/stt). Tanıyıcısız tarayıcının
            bu kayıt yolu da o kapıdan geçiyor ve ücretsiz katmanda günlük hak
            sıfır: ücretsiz bir hesapta HER ZAMAN 403 döner. Eskiden bu genel
            hataya düşüyor, tur da onu "duyamadım" diye okuyordu — kullanıcı
            mikrofonunun bozuk olduğunu sanıyordu.
            Bir kez söyleniyor: her kelimede tekrarlamak turu anlatıma çevirirdi.
          */
          if (heard.reason === "premium" && !premiumTold.current) {
            premiumTold.current = true;
            track("walk_listen", 0, "stt:premium");
            track("premium_gate", 0, "pocket_walk");
            walkCue("premium");
            await new Promise((r) => setTimeout(r, walkCueMs("premium")));
            await say([{ lang, narration: true, text: t("walkmode.screen_off_premium") }]);
          }
          /*
            SES RIZASI YOK — o da "duyamadım" değil.

            Sunucu sesi sağlayıcıya iletmedi; bu yolda izin diyaloğu da
            açılmıyor (tur sesli sürüyor, bkz. pocket-mic `transcribe`). Sebep bir
            kez SESLE söyleniyor ve tur duruyor (bu yolda dönülecek bir
            tanıyıcı yok): her cevabı "duyulmadı" diye saymak yirmi kelimeyi
            boşa harcardı. Durunca `begin` açıklamayı sağlayıcı listesiyle yeniden
            gösteriyor.
          */
          if (heard.reason === "consent") {
            voiceGranted.current = false;
            if (!consentTold.current) {
              consentTold.current = true;
              track("walk_listen", 0, "stt:consent");
              await say([{ lang, narration: true, text: t("aiconsent.voice_without") }]);
            }
            pauseRef.current();
            return [];
          }
          const outcome = heard.reason ?? "ok";
          track("walk_listen", Math.round(heard.sentSeconds * 10), `${heard.provider ?? "stt"}:${outcome}`);
          note(`${heard.provider ?? "sunucu"} ${outcome} ${heard.sentSeconds.toFixed(1)} sn ${Date.now() - startedAt} ms${heard.alternatives[0] ? ` "${heard.alternatives[0]}"` : ""}${typeof heard.confidence === "number" ? ` ${heard.confidence.toFixed(2)}` : ""}`);
          return heard.alternatives;
        }
        /*
          Klip üretilemedi.

          Bu "kullanıcı susuyor" değil, "kayıt çalışmıyor" demek ve ikisi çok
          farklı: susan kullanıcı için turu sürdürmek doğru, çalışmayan kayıtla
          sürdürmek yirmi turu saniyeler içinde tüketiyor. İki ardışık
          başarısızlıkta tur duruyor ve sebebi SESLE söyleniyor — kullanıcı
          ekrana bakmıyor.
        */
        captureFails.current += 1;
        track("walk_listen", 0, "record:failed");
        if (captureFails.current >= CAPTURE_FAIL_LIMIT) {
          captureFails.current = 0;
          track("walk_end", 4);
          ended.current = true;
          await say([
            { lang, narration: true, text: t("walk.mic_unreachable") },
          ]);
          pauseRef.current();
        }
      }

      return [];
    },
    [cue, walkCue, listen, note, say, lang, t],
  );

  /**
   * Dinlemenin süreye bağlanmış hâli — döngünün kullandığı budur.
   *
   * İçerideki her yolun kendi sınırı var ama hiçbiri kesin değil: tanıyıcı
   * `onend` vermeyebiliyor, kaydedici parça üretmeyi bırakabiliyor, ağ
   * kopabiliyor. Bunların hepsi aynı sonucu veriyordu — tur o satırda donuyor
   * ve kullanıcı cepteki telefondan bir daha hiçbir şey duymuyor.
   *
   * Süre dolarsa "duyulmadı" dönüyor VE içerideki iş iptal ediliyor: eskiden
   * süresi dolan dinleme arkada kaydı bitirip sunucuya da gönderiyordu
   * (üretimde aynı saniyede iki çağrı), sonraki sorunun sesine karışıyordu.
   */
  const hear = useCallback(
    async (
      /** Hangi taraf dinleniyor: anlatım dili ("native") ya da hedef dil ("target"). */
      side: "target" | "native",
      windowMs: number,
      expected = "",
      accept?: (alternatives: string[]) => boolean,
      reprompt?: SpeechSegment[],
    ): Promise<string[]> => {
      hearCtl.current?.abort();
      const ctl = new AbortController();
      hearCtl.current = ctl;
      const heard = await withDeadline(
        hearOnce(side, windowMs, expected, accept, reprompt, ctl.signal),
        windowMs + HEAR_SLACK_MS,
        null as string[] | null,
      );
      // Mikrofon kapandı — hangi yoldan dönülürse dönülsün burada duyuluyor.
      // `hear` bütün dinlemelerin tek hunisi, o yüzden işaret tek yerde.
      walkCue("micoff");
      if (heard === null) {
        ctl.abort();
        /* Kind'ın biçimi ötekilerle aynı olmalı: `walk_listen` panosu adı
           iki parçaya ayırıyor (`kaynak:sonuç`) ve tek parçalı bir ad orada
           kaynaksız kalıyordu. Bekçi hangi kaynağın takıldığını bilmiyor,
           aşama adı veriliyor — `record:failed` ile aynı kural. */
        track("walk_listen", 0, "hear:deadline");
        return [];
      }
      return heard;
    },
    [hearOnce, walkCue],
  );

  const stopAll = useCallback(() => {
    run.current++;
    stopSpeaking();
    cancel();
    hearCtl.current?.abort();
    speakDone.current?.();
    speakDone.current = null;
  }, [cancel]);

  /*
    Sökülürken mikrofon ve tam ekran da bırakılıyor.

    `stopAll` yalnızca döngüyü ve okumayı durduruyor; kayıt yolunun açtığı
    mikrofon açık kalıyordu. Kullanıcı "geri dön" düğmesine basmadan çıkarsa
    (sekme değişimi, geri gitme, uygulamanın başka bir yerine geçme) kayıt
    göstergesi OTURUM BOYUNCA yanık kalırdı.
  */
  useEffect(
    () => () => {
      // Geri hareketi ya da sekme değişimiyle çıkış da bir bitiş: kayda geçsin,
      // yoksa dışarıdan "takıldı"dan ayırt edilemiyor (60 günde hiç walk_end yoktu).
      if (!ended.current && run.current > 0) track("walk_end", 6);
      stopAll();
      closeMic();
      try {
        if (document.fullscreenElement) void document.exitFullscreen?.().catch(() => {});
      } catch {
        /* önemsiz */
      }
    },
    [stopAll],
  );

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("diag")) setDiag([]);
  }, []);

  /** Tam ekrandan çık — sistem çubuklarını geri getirir. */
  const exitFullscreen = useCallback(() => {
    try {
      if (document.fullscreenElement) void document.exitFullscreen?.().catch(() => {});
    } catch {
      /* önemsiz */
    }
  }, []);

  /** Karanlık kilidi kapat: katman kalkar, tam ekrandan çıkılır. */
  const exitDark = useCallback(() => {
    darkTaps.current = [];
    setScreenDark(false);
    exitFullscreen();
    track("walk_switch", 0, "dark-exit");
  }, [exitFullscreen]);

  /**
   * KARANLIK ORTU: ODAK VE ESCAPE.
   *
   * Dugumdeki `onKeyDown` ise yaramazdi - ortuya odak verilmedigi surece hic
   * atesleme almaz. `achievement-unlock`un kalibi izleniyor: ortu gelince
   * odagi aliyor, pencere dinleyicisi Escape'i yakaliyor, ortu kalkinca odak
   * geldigi yere donuyor.
   */
  useEffect(() => {
    if (!screenDark) return;
    const geri = document.activeElement as HTMLElement | null;
    darkOverlay.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      exitDark();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      geri?.focus?.();
    };
  }, [screenDark, exitDark]);


  // Tur oynamıyorsa karanlık katman ve tam ekran kalkar (duraklat/çık/bitti sonrası).
  useEffect(() => {
    if (status !== "playing") {
      setScreenDark(false);
      exitFullscreen();
    }
  }, [status, exitFullscreen]);

  // Kullanıcı sistem hareketiyle tam ekrandan çıkarsa (yukarı kaydırma, geri)
  // katman da kalksın — yoksa çubuklar geri gelir ama siyah katman kalır ve
  // kullanıcı ne olduğunu anlamaz.
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) setScreenDark(false);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  /**
   * Sunucudan taze bir tur — oturum bitince devam etmek için.
   *
   * Bu yürüyüşte SORULAN kelimeler dışarıda bırakılıyor. Yanlış bilinen
   * kelime tekrar borcuna düştüğü için hemen geri geliyordu ve kullanıcı aynı
   * kelimeleri arka arkaya duyuyordu. Aralıklı tekrar açısından doğru, yürüyüş
   * açısından yanlış: kelime yarın yine karşına çıkacak, on dakika sonra
   * çıkmasının öğretici bir karşılığı yok.
   */
  const fetchSession = useCallback(async (): Promise<SessionPayload | null> => {
    try {
      const skip = [...askedIds.current].join(",");
      const res = await apiFetch(`/api/session?day=${localDay()}&walk=1${skip ? `&skip=${skip}` : ""}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(NET_TIMEOUT_MS),
      });
      if (!res.ok) return null;
      return (await res.json()) as SessionPayload;
    } catch {
      return null;
    }
  }, []);

  /**
   * "Devam edelim mi?" — sesli sorulur, sesli cevaplanır.
   *
   * Anlaşılmayan cevap EVET ya da HAYIR sayılmıyor, soru bir kez
   * tekrarlanıyor. Emin olunamayan bir cevabı evet saymak kullanıcıyı
   * istemediği bir tura sokar, hayır saymak turu sessizce bitirir; ikisi de
   * tekrar sormaktan kötü.
   */
  const askContinue = useCallback(
    async (correct: number, total: number): Promise<"yes" | "no"> => {
      const summary =
        total > 0
          ? t("walk.tour_done_continue", { total, correct })
          : `${t("common.round_done")} ${t("walk.continue_q")}`;
      setAsking(true);
      setVerdict(null);
      try {
      for (let attempt = 0; attempt < 2; attempt++) {
        // Kullanıcı bu soru okunurken/dinlenirken Bitir'e bastıysa (ended)
        // ikinci denemeye HİÇ geçilmiyor: yoksa taze bir `say` jetonu alıp
        // "Devam edelim mi?" ana ekrana dönüldükten sonra çalıyordu.
        if (ended.current) return "no";
        setPhase("speaking");
        setPrompt(null);
        await say([
          {
            lang,
            narration: true,
            text: attempt === 0 ? summary : t("walk.continue_yes_no"),
          },
        ]);
        if (ended.current) return "no";
        setPhase("listening");
        const heard = await hear(
          "native",
          CONFIRM_SILENCE_MS,
          "",
          (alts) => parseConfirm(alts[0] ?? "", lang) !== null,
          [{ lang, narration: true, text: t("walk.continue_q") }],
        );
        const intent = parseConfirm(heard[0] ?? "", lang);
        if (intent === "yes") return "yes";
        if (intent === "no") return "no";
      }
      // İki kez sorulup anlaşılmadıysa durmak doğru: cevap veremeyen kişi
      // büyük olasılıkla artık orada değil.
      return "no";
      } finally {
        setAsking(false);
      }
    },
    [hear, say, lang, t],
  );

  // ── Turun kendisi ──────────────────────────────────────────────────

  const loop = useCallback(
    async (rounds: Round[], from: number) => {
      const token = ++run.current;
      const alive = () => token === run.current;

      // Dış döngü OTURUMLAR üzerinde: yirmi tur bitince sesli onay alınıp
      // taze bir tur çekiliyor. Böylece telefonu cepten çıkarmadan devam
      // edilebiliyor — modun bütün anlamı zaten bu.
      let current = rounds;
      let start = from;

      // Oturum başı, bir kez okunuyor (devam turları while'ın içinde):
      //   • Cebe kondu ise ("Cebe koy, başla") çıkış anonsu — SIRADAKİ kelimeden
      //     ÖNCE, "önce kelime sonra cebe konuldu" sırası olmasın diye.
      //   • Teslim işaretinin ne olduğu ("weiter") — girişte bir kez (hintDone).
      const preroll: SpeechSegment[] = [];
      if (pocketPreroll.current) {
        pocketPreroll.current = false;
        preroll.push({ lang, narration: true, text: t("walk.pocket_announce") });
      }
      if (!hintDone.current) {
        hintDone.current = true;
        preroll.push(
          { lang, narration: true, text: t("walk.skip_hint_before") },
          /* Teslim sözcüğü HEDEF DİLDE: sabit "weiter" yazılıydı ve İngilizce
             kursta öğrenciye almanca bir sözcük okunuyordu. */
          { lang: course as "de" | "en", text: skipWord(course) },
          { lang, narration: true, text: t("walk.skip_hint_after") },
        );
      }
      if (preroll.length) {
        setPhase("speaking");
        await say(preroll);
        if (!alive()) return;
      }

      while (true) {
      for (let i = start; i < current.length; i++) {
        if (!alive()) return;
        setIndex(i);
        const round = current[i];
        const results: Answer[] = [];

        for (const word of wordsOf(round)) {
          if (!alive()) return;
          const target = withArtikel(word);

          // Yeni kelime: sorulmuyor, tanıtılıyor. Ekranda da öyle çalışıyor.
          if (round.game === "intro") {
            setPrompt({ tr: glossFor(word, lang)?.text ?? "", de: target });
            setVerdict(null);
            setPhase("speaking");
            await say([
              { lang, narration: true, text: t("walk.new_word") },
              { lang: "de", text: target },
              glossSegment(word, lang),
              { lang: "de", text: target },
            ]);
            if (!alive()) return;
            results.push({
              wordId: word.id,
              game: "intro",
              correct: true,
              latencyMs: 0,
              hintUsed: true,
            });
            taught.current += 1;
            continue;
          }

          // Kuyruk zaten sunucuda benzersiz (bkz. buildWalk); bu işaret yalnızca
          // DEVAM turunun `?skip=` listesini besliyor — aynı yürüyüşte aynı
          // kelime ikinci kez gelmesin.
          askedIds.current.add(word.id);

          setPrompt({ tr: glossFor(word, lang)?.text ?? "", de: target });
          setVerdict(null);

          // Soru: Türkçe karşılık okunuyor, ardından mikrofon açılıyor.
          setPhase("speaking");
          await say([glossSegment(word, lang)]);
          if (!alive()) return;

          setPhase("listening");
          const askedAt = Date.now();
          // Doğru cevap duyulur duyulmaz dinleme kapanıyor: beklenen cevap
          // belliyken duraklama payının dolmasını beklemenin karşılığı yok.
          const ask = () =>
            hear(
              "target",
              ANSWER_WINDOW_MS,
              target,
              // Doğru cevap DA teslim işareti ("weiter") de dinlemeyi erken
              // kapatır: cevap veren de teslim eden de pencerenin dolmasını beklemesin.
              (alts) => spokenMatches(alts, [target, word.de]) || alts.some((h) => parseSkip(h, course)),
              [glossSegment(word, lang)],
            );
          let heard = await ask();
          if (!alive()) return;
          // "Cebe koy" dinlemenin ortasına denk geldi: önce kısa duyuru, sonra
          // KELİME yeniden okunuyor (kullanıcı basarken kaçırmasın), sonra dinleme.
          if (reask.current) {
            reask.current = false;
            setPhase("speaking");
            const pre = announce.current;
            announce.current = null;
            await say([...(pre ? [{ lang, narration: true, text: pre }] : []), glossSegment(word, lang)]);
            if (!alive()) return;
            setPhase("listening");
            heard = await ask();
            if (!alive()) return;
          }

          setPhase("judging");
          // Kabul mantığı yazma oyunuyla AYNI (bkz. games/types, spokenMatches):
          // artikel aranmıyor, umlaut katlanıyor, fazladan kelime bağışlanıyor.
          // Önceki hâli `judgeSpeech`ti ve tek kelimelik cevapta çok katıydı:
          // tanıyıcı artikeli düşürünce ("die Katze" → "Katze") doğru cevap
          // yanlış sayılıyordu.
          const said = heard.find((h) => h.trim()) ?? "";
          const unheard = !said;
          // Doğruluk ÖNCE. Teslim ("weiter", "weiß nicht") yalnız cevap hedefe
          // UYMADIĞINDA aranıyor — böylece hedefin kendisi bu kelimelerden biri
          // olsa bile doğru cevap yanlışlıkla teslim sayılmıyor.
          const ok = !unheard && spokenMatches(heard, [target, word.de]);
          // Teslim YANLIŞ değil: ceza yok, kısa motive + doğrusu. İşaret ALMANCA
          // veriliyor çünkü de-DE tanıyıcı Türkçe "bilmiyorum"u yakalayamıyor.
          const skipped = !unheard && !ok && heard.some((h) => parseSkip(h, course));
          setHeardText(said);

          // Pencere her turda güncelleniyor: duyulan da duyulmayan da giriyor.
          // "Bilmiyorum" DUYULDU sayılıyor (mikrofon çalışıyor), sadece cevap değil.
          heardLog.current.push(!unheard);
          if (heardLog.current.length > UNHEARD_WINDOW) heardLog.current.shift();
          const misses = heardLog.current.filter((h) => !h).length;

          // "Bilmiyorum": tekrar planına DOKUNMA (yanlış değil), doğrusunu oku.
          if (skipped) {
            setVerdict("skip");
            await say([
              { lang, narration: true, text: `${encourage(t)} ${t("walk.correct_is")}` },
              { lang: "de", text: target },
            ]);
            if (!alive()) return;
            if (document.visibilityState === "visible") {
              await new Promise<void>((r) => afterMs(GAP_MS, r));
              if (!alive()) return;
            }
            continue;
          }

          if (unheard && UNHEARD_IS_NOT_WRONG) {
            setVerdict("unheard");

            // Dar bir pencerede biriken sessizlik bir gürültü değil, bir arıza
            // işareti: mikrofon başka bir uygulamada, izin geri alınmış ya da
            // sayfa arka planda.
            if (misses >= UNHEARD_LIMIT) {
              // Bu noktada mikrofon gerçekten çalışmıyor: izin geri alınmış,
              // başka bir uygulama kullanıyor ya da tarayıcı tanıyıcısıyla
              // çalışılıyor ve sayfa arka planda. Devam etmek yirmi turu
              // saniyeler içinde tüketirdi.
              // Eski hâli tarayıcı yolunda "ekranın açık kalması gerekiyor" diyordu;
              // ekran zaten açıkken bu, kullanıcıya yanlış bir sebep söylemekti.
              await say([
                { lang, narration: true, text: t("walk.mic_silent") },
              ]);
              if (!alive()) return;
              track("walk_end", 3);
              ended.current = true;
              heardLog.current = [];
              setStatus("paused");
              void release();
              return;
            }

            await say([
              { lang, narration: true, text: t("walk.not_heard") },
              { lang: "de", text: target },
            ]);
            continue;
          }

          /* Titresim de var: ekran kapaliyken ya da cepteyken KARARI
              bildiren tek kanal ses ve titresim. Android bunu baştan beri
              veriyor (`WalkModeScreen`), web vermiyordu. */
          setVerdict(ok ? "correct" : "wrong");
          /* SESI `vibrate` CALIYOR (`lib/fx`: once `play`, sonra titresim).
             Buraya `vibrate` eklenirken var olan `play` cagrisi kalmis ve ses
             iki kez isteniyordu; tek duyulmasi `sfx`in yineleme penceresine
             kalmisti. Mobilde ayni artik `game/rounds`ta duruyordu. */
          vibrate(ok ? "correct" : "wrong");
          results.push({
            wordId: word.id,
            game: "speak",
            correct: ok,
            latencyMs: Date.now() - askedAt,
            hintUsed: false,
            ...miss(ok, "pronunciation"),
          });
          tallyRef.current = {
            correct: tallyRef.current.correct + (ok ? 1 : 0),
            total: tallyRef.current.total + 1,
          };
          walkRef.current.correct += ok ? 1 : 0;
          walkRef.current.total += 1;
          // Ekranda yürüyüşün toplamı görünüyor: kullanıcı için anlamlı olan
          // "bu yürüyüşte ne yaptım", sunucudaki oturumun sayacı değil.
          setTally({ correct: walkRef.current.correct, total: walkRef.current.total });

          if (!ok) {
            if (!missed.current.some((m) => m.id === word.id)) {
              missed.current.push({ id: word.id, de: target, tr: word.tr, en: word.en });
            }
            // Yanlışta doğrusu okunuyor: ekransız akışta düzeltmeyi görmenin
            // başka yolu yok.
            await say([
              { lang, narration: true, text: t("walk.correct_is") },
              { lang: "de", text: target },
            ]);
          } else {
            await say([{ lang: "de", text: target }]);
          }
          if (!alive()) return;
          /*
            Turlar arasında kısa bir nefes.

            Ekran açık yolda tanıyıcı doğru cevabı duyar duymaz kapanıyor ve
            sonraki soru hemen okunuyordu — "aşırı hızlı" bunun içindi. Küçük
            bir es kulağa daha rahat geliyor.
          */
          if (document.visibilityState === "visible") {
            await new Promise<void>((r) => afterMs(GAP_MS, r));
            if (!alive()) return;
          }
        }

        pending.current.push(...results);
        const last = i >= current.length - 1;
        await flush(last);
        if (!alive()) return;
      }

      if (!alive()) return;
      play("finish");
      /* Yürüyüş turunun bitişi de KİND taşıyor: kind'sız yazıldığında rapor
         onu karışık turlarla aynı kovaya koyuyordu. Mobil `WalkModeScreen`
         bu olayı HİÇ yazmıyor - orası ayrı bir eksik (bkz. §11.31). */
      track("session_done", tallyRef.current.correct, "walk");

      const again = await askContinue(tallyRef.current.correct, tallyRef.current.total);
      if (!alive()) return;
      if (again === "no") {
        track("walk_end", 1);
        ended.current = true;
        setPhase("speaking");
        await say([{ lang, narration: true, text: t("walk.goodbye") }]);
        closeMic();
        void release();
        endedAt.current = Date.now();
        setStatus("done");
        return;
      }

      setPhase("speaking");
      await say([{ lang, narration: true, text: t("walk.continuing") }]);
      const next = await fetchSession();
      if (!alive()) return;
      if (!next?.rounds.length) {
        track("walk_end", 2);
        ended.current = true;
        await say([{ lang, narration: true, text: t("walk.no_more") }]);
        endedAt.current = Date.now();
        setNoMore(true);
        setStatus("done");
        return;
      }

      // Sunucudaki oturum sayacı sıfırlanıyor, yürüyüşün toplamı devam ediyor.
      current = next.rounds;
      start = 0;
      setSession(next);
      setIndex(0);
      tallyRef.current = { correct: 0, total: 0 };
      missed.current = [];
      walkRef.current.sessions += 1;
      startedAt.current = Date.now();
      resetCombo();
      play("start");
      }
    },
    [askContinue, course, fetchSession, flush, hear, release, say, lang, t],
  );

  /*
    Ses rızası tur BAŞLAMADAN ve her duruşta yeniden okunuyor: başka bir
    cihazda ya da Ayarlar'da geri alınmış olabilir. Açıklama açıldığında liste
    hâlâ yoksa (ilk okuma düştüyse) bir kez daha deneniyor.
  */
  const loadVoiceConsent = useCallback(() => {
    fetchAiConsent(lang)
      .then((info) => {
        voiceGranted.current = info.statuses.ai_voice.state === "granted";
        setVoiceProcessors(info.processors.ai_voice);
        setVoiceFailed(false);
      })
      .catch(() => setVoiceFailed(true));
  }, [lang]);
  useEffect(() => {
    if (status !== "ready" && status !== "paused") return;
    loadVoiceConsent();
  }, [status, loadVoiceConsent]);
  useEffect(() => {
    if (disclosure && voiceFailed) loadVoiceConsent();
  }, [disclosure, voiceFailed, loadVoiceConsent]);

  /**
   * Başla: mikrofon açılmadan ÖNCE uygulama içi açıklama ve onay.
   *
   * ONAYIN İKİ YARISI VAR (mobil `beginWalk` ile aynı karar). Tarayıcıdaki
   * bayrak "bu cihazda açıklama okundu" diyor; sunucudaki ses rızası ise sesin
   * sağlayıcıya gidebilmesinin şartı — uç izin yoksa sesi iletmiyor. Sunucu
   * "izin yok" diyorsa açıklama yeniden gösteriliyor; okunamadıysa tarayıcıdaki
   * bayrakla başlanıyor, çünkü ekran açık yol sunucuya gitmiyor ve sunucu yolu
   * izin yoksa klibi göndermiyor.
   */
  function begin(mode: "pocket" | "screen") {
    if (!hasMicConsent() || voiceGranted.current === false) {
      setDisclosure(mode);
      return;
    }
    if (mode === "pocket") darken();
    void start(index);
  }

  async function start(from: number) {
    const rounds = session?.rounds;
    if (!rounds?.length) return;

    /*
      Yakalama yöntemi burada seçiliyor.

      Tarayıcının kendi tanıyıcısı varsa o kullanılıyor: anahtar gerektirmiyor,
      sunucuya hiçbir şey gitmiyor. Yoksa (ör. Firefox) ve sunucuda yazıya
      çevirme açıksa kayıt yolu: her cevap kısa bir klip olarak kaydedilip
      sunucuya gönderiliyor. İkisi de yoksa tur başlayamıyor.
    */
    const { requestMicrophone, recognitionCtor } = await import("@/components/microphone");
    const permission = await requestMicrophone();
    if (permission === "denied") return setStatus("denied");

    browserRef.current = Boolean(recognitionCtor());

    /*
      Mikrofon akışı BURADA ALINMIYOR.

      Eskiden oturum başında alınıp tutuluyordu. Ölçüm bunun bedelini
      gösterdi: tutulan akış (parçaları kapalı bile olsa) tarayıcı tanıyıcısını
      sağırlaştırıyor — sahibin telefonunda altı dinlemenin altısı boş — ve
      Bluetooth'ta okumayı telefon yoluna düşürüyordu. Kayıt yolu mikrofonu
      ilk cevapta kendisi açıyor (`recordAnswerClip`).

      Sunucu STT'nin hazır olup olmadığı yine şimdi soruluyor: tanıyıcı ölürse
      devralınıp devralınamayacağı buna bağlı.
    */
    sttReady.current = micSupported() && (await sttAvailable());
    captureRef.current = browserRef.current ? "browser" : "stt";
    setCapture(browserRef.current ? "browser" : "stt");

    if (!browserRef.current && !sttReady.current) return setStatus("unsupported");

    // Ekran kilidi DOKUNUŞUN İÇİNDE; WebAudio bağlamı da burada uyandırılıyor
    // (dersin işareti ve boşluksuz okuma ona bağlı).
    void acquire();
    sharedAudioContext();
    resetCombo();
    heardLog.current = [];
    askedIds.current = new Set();
    consentTold.current = false;
    startedAt.current = Date.now();
    if (walkBegan.current === null) walkBegan.current = Date.now();
    endedAt.current = null;
    setNoMore(false);
    ended.current = false;
    reask.current = false;
    setStatus("playing");
    track("walk_start", from);
    void loop(rounds, from);
  }

  /**
   * "Cebe koy" — ekranı KARARTIR ama kapatmaz (bkz. `screenDark`).
   *
   * Ekran açık kaldığı için tarayıcının tanıyıcısı (ekrandaki kusursuz yol)
   * cepte de çalışıyor; HyperOS'un ekran-kapanınca-sustur davranışına hiç
   * girilmiyor. Wake lock tur başında zaten alındı; burada teyit ediliyor.
   *
   * TAM EKRAN şart: siyah katman yalnız web sayfasını örter, Android'in üst
   * durum çubuğu (saat/pil) ve alt gezinme düğmeleri sayfanın ÜSTÜNDE kalır ve
   * cepte kazara basılabilir (geri, ana ekran, hatta arama). `requestFullscreen`
   * ikisini de gizliyor — kullanıcı dokunuşunun içinden çağrıldığı için izinli.
   */
  function darken() {
    if (screenDark) return;
    void acquire();
    darkTaps.current = [];
    setScreenDark(true);
    try {
      void document.documentElement.requestFullscreen?.({ navigationUI: "hide" }).catch(() => {});
    } catch {
      /* fullscreen reddedilirse katman yine örter, yalnız sistem çubukları kalır */
    }
    track("walk_switch", 1, "dark");
    // Anons kısa: uzun açıklama akışı boğuyordu.
    if (hearCtl.current && !hearCtl.current.signal.aborted) {
      // Kelime DİNLENİRKEN cebe kondu: süren dinleme iptal edilip önce anons,
      // sonra kelime tekrar okunup yeniden dinleniyor (reask) — kullanıcı
      // darken'a basarken kelimeyi kaçırmasın.
      announce.current = t("walk.pocket_announce");
      reask.current = true;
      hearCtl.current.abort();
    } else {
      // Başlangıçta ("Cebe koy, başla") cebe kondu: anons SIRADAKİ kelimeden
      // ÖNCE okunmalı, döngü başında (bkz. loop) — yoksa "önce kelime, sonra
      // cebe konuldu" sırası oluyordu.
      pocketPreroll.current = true;
    }
  }

  /** Karanlık katmana dokunuş — 1,2 sn içinde üç kez olursa çıkılır. */
  function onDarkTap() {
    const now = Date.now();
    darkTaps.current = [...darkTaps.current.filter((t) => now - t < 1200), now];
    if (darkTaps.current.length >= 3) exitDark();
  }

  function pause() {
    if (!ended.current) track("walk_end", 6);
    ended.current = true;
    stopAll();
    void release();
    // Mikrofon KAPATILIYOR: açık bir yakalama, cihazda kayıt göstergesini
    // yanık bırakıyor ve duraklatılmış bir turda bunun karşılığı yok.
    closeMic();
    setStatus("paused");
  }

  useEffect(() => {
    pauseRef.current = pause;
  });

  /* Turu KAPATMAK ile ekrandan CIKMAK ayri: kenar cubugundan bir bagantiya
     gidildiginde turun sesi, mikrofonu ve tam ekrani kapanmali ama gidilecek
     yer `onExit`in yeri degil, tiklanan bagantidir. */
  function teardown() {
    if (!ended.current && status === "playing") track("walk_end", 6);
    ended.current = true;
    stopAll();
    void release();
    closeMic();
    exitFullscreen();
  }

  function leave() {
    teardown();
    onExit();
  }

  /**
   * Ekran kapanınca (ya da sayfa gizlenince) tur DURUYOR — ama SESSİZCE değil.
   *
   * Mikrofon kilitli ekranda istenemiyor, tanıyıcı da gizli sayfada susuyor;
   * yapılabilecek dürüst tek şey sebebi ve çaresini söylemek. Ekranı
   * kapatmadan cebe koymak zaten mümkün: "Cebe koy" ekranı karartıyor ama
   * açık tutuyor (bkz. `darken`).
   */
  useEffect(() => {
    if (status !== "playing") return;
    const onChange = () => {
      if (document.visibilityState === "hidden") {
        /*
          Sıra önemli: önce döngü durduruluyor (yoksa yarıda kalan bir okuma
          duyuruyla çakışır), sonra sebep söyleniyor. Duyuru döngünün `say`ini
          kullanmıyor çünkü o artık geçersiz bir jetona bağlı.
        */
        track("walk_end", 5);
        ended.current = true;
        stopAll();
        void release();
        setStatus("paused");
        speakSegments(
          [
            {
              lang,
              narration: true,
              text: t("walk.screen_off_warning"),
            },
          ],
          undefined,
          undefined,
          { background: true },
        );
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, [status, stopAll, release, lang, t]);

  // ── Görünüm ────────────────────────────────────────────────────────

  /**
   * Sayaç SORU turlarını sayar, öğretme (intro) turlarını DEĞİL.
   *
   * Eskiden `rounds.length` idi ve öğretme turları da paydaya giriyordu: üstte
   * "7 / 20" yazarken bitiş ekranı "4 doğru / 12" diyordu — aynı turun iki ayrı
   * paydası. Öğretme turu bir soru değil, cevabı da yok; bitişteki toplam zaten
   * yalnız soruları sayıyor. Mobil bunu böyle yapıyor, ikisi artık aynı.
   */
  const rounds = session?.rounds ?? [];
  const total = rounds.filter((r) => r.game !== "intro").length || rounds.length;
  const step = Math.min(
    total,
    rounds.slice(0, index).filter((r) => r.game !== "intro").length +
      (rounds[index] && rounds[index].game !== "intro" ? 1 : 0),
  );

  /* BEKLEME KENDINI DUYURUYOR. Bu dal ekranin TAMAMINI kaplayip "hazirlaniyor"
     yaziyor ama canli bolge degildi: ekran okuyucu kullanan biri dugmeye
     basip hicbir sey duymuyor, ekranin dondugunu mu yoksa hazirlandigini mi
     bilemiyordu. `aria-busy` tek basina yetmez - o "bu bolge guncelleniyor"
     der, MONTE EDILDIGINDE hicbir sey okutmaz; okutan `role="status"`.
     Android karsiligi `accessibilityLiveRegion="polite"`. */
  if (status === "loading") return <Frame role="status" busy><p className="muted">{t("walk.preparing")}</p></Frame>;

  if (status === "error")
    return (
      <FlowColumn>
        <StateBody alert mood="sad" title={t("walk.error_title")} body={t("walk.error_sub")} />
        {/* YERİNDE TEKRAR DENEME. Tek çıkış "Geri dön"dü: geçici bir ağ
            hatası kullanıcıyı yürüyüş modundan tamamen atıyordu -- oysa
            metnin kendisi "bağlantını kontrol edip tekrar dene" diyor.
            Android'deki sıra: birincil "tekrar dene", ikincil çıkış. */}
        <FlowActions
          primary={{ label: t("common.try_again"), onClick: () => { setStatus("loading"); void load(); } }}
          tertiary={{ label: t("common.go_back"), onClick: leave }}
        />
      </FlowColumn>
    );

  /* BUGÜNLÜK KELİME YOK — mobille aynı metin (`walkmode.done_no_more*`);
     iki platform aynı boş kuyruğu iki ayrı cümleyle anlatıyordu. */
  if (status === "empty")
    return (
      <FlowColumn>
        <StateBody mood="think" title={t("walkmode.done_no_more")} body={t("walkmode.done_no_more_sub")} />
        <FlowActions primary={{ label: t("common.go_back"), onClick: leave }} />
      </FlowColumn>
    );

  if (status === "unsupported")
    return (
      <FlowColumn>
        <StateBody mood="sad" title={t("walk.unsupported_title")} body={t("walk.unsupported_sub")} />
        <FlowActions primary={{ label: t("common.go_back"), onClick: leave }} />
      </FlowColumn>
    );

  /* İZİN YOK: metin "izin verip tekrar dene" diyordu ama deneyecek düğme
     yoktu; mobil aynı yerde birincil düğmeyle yeniden istiyor. Tarayıcıda
     ayarları açmanın yolu yok — "tekrar dene" izni yeniden soruyor. */
  if (status === "denied")
    return (
      <FlowColumn>
        <StateBody mood="think" title={t("walk.denied_title")} body={t("walk.denied_sub")} />
        <FlowActions
          primary={{ label: t("common.try_again"), onClick: () => void start(index) }}
          tertiary={{ label: t("common.go_back"), onClick: leave }}
        />
      </FlowColumn>
    );

  if (status === "ready" || status === "paused") {
    /* Kaldığın yer: kapakta da duraklamada da aynı satır. */
    const where = (
      <FlowNote
        text={
          <>
            <span className="muted">{t("walk.where_you_left")} </span>
            <strong>{Math.max(1, step)}</strong>
            <span className="muted"> / {t("walk.n_rounds", { n: total })}</span>
          </>
        }
      />
    );
    /*
      İki başlatma: "Cebe koy" ekranı karartarak başlatır (fullscreen düğme
      dokunuşunun içinde alınıyor, sonra tur); "Ekran açık" normal. Ekran
      açık başlayan da tur içinde "Cebe koy"a basabilir.
    */
    const actions = (
      <FlowActions
        primary={{ label: t(status === "paused" ? "walk.pocket_continue" : "walk.pocket_start"), onClick: () => begin("pocket") }}
        secondary={{ label: t(status === "paused" ? "walk.screen_continue" : "walk.screen_start"), onClick: () => begin("screen") }}
        tertiary={{ label: t("common.go_back"), onClick: leave }}
      />
    );
    return (
      <FlowColumn>
        {status === "paused" ? (
          /* DURAKLAMA — durum şablonu (bekleniyor = düşünen maskot). */
          <StateBody mood="think" title={t("walk.paused")} body={t("walk.paused_note")} />
        ) : (
          /* KAPAK ŞABLONU — mobil `WalkModeScreen` kapağıyla aynı kural
             satırları (eski iki paragraflık tanıtım bunlara bölündü).
             Cebe koyma talimatı (`walk.intro_2`) WEB'E ÖZEL: mobilde ekran
             gerçekten kapanıyor, karartma düğmesi yok. */
          <CoverBody
            icon={<WalkIcon size={28} />}
            tint="var(--color-violet-500)"
            eyebrow={t("learn.walk_mode")}
            title={t("walkmode.listen_and_say_it")}
            pitch={t("walkmode.cover_pitch")}
            rules={[
              { icon: <SpeakerIcon size={16} />, text: t("walkmode.rule_hint", { nativeLang: nativeLangName(lang) }) },
              { icon: <MicIcon size={16} />, text: t("walkmode.rule_say", { target: courseName(course, lang) }) },
              { icon: <SparkIcon size={16} />, text: t("walkmode.rule_teach") },
              { icon: <CheckIcon size={16} />, text: t("walkmode.rule_verdict") },
              { icon: <RefreshIcon size={16} />, text: t("walkmode.rule_continue") },
            ]}
            note={t("walk.intro_2")}
          />
        )}
        {where}
        {actions}
        {/* Açıklama İKİ düğmenin de önünde: hangisine basılmışsa onay
            verildikten sonra o yol sürüyor. Onay diyaloğunun düğmesi de bir
            kullanıcı hareketi olduğu için tam ekrana geçiş orada da alınıyor;
            "Cebe koy" yolunun karartması bu yüzden kaybolmuyor. */}
        <MicDisclosure
          open={disclosure !== null}
          processors={voiceProcessors}
          processorsFailed={voiceFailed}
          onAccept={() => {
            const mode = disclosure;
            /* Sunucu rızası YALNIZ sağlayıcı listesi GÖSTERİLDİYSE yazılıyor:
               adları görülmemiş sağlayıcılara izin alınmış sayılmaz. Liste
               yüklenemediyse yalnız tarayıcıdaki bayrak yazılıyor; sunucu
               okunabildiği ilk duruşta "izin yok" görülür ve açıklama bir
               sonraki başlangıçta listeyle yeniden gelir. O arada sunucu yolu
               klibi göndermiyor (`transcribe` → `consent`). */
            const listShown = voiceProcessors !== null && !voiceFailed;
            setMicConsent(true);
            setDisclosure(null);
            if (mode === "pocket") darken();
            void (async () => {
              if (listShown) {
                try {
                  await decideAiConsent("ai_voice", true);
                  voiceGranted.current = true;
                } catch {
                  /* ağ yok: ekran açık yol yine çalışır */
                }
              }
              await start(index);
            })();
          }}
          onCancel={() => setDisclosure(null)}
        />
      </FlowColumn>
    );
  }

  if (status === "done") {
    const doneMin = Math.max(1, Math.round(((endedAt.current ?? Date.now()) - (walkBegan.current ?? startedAt.current)) / 60000));
    return (
      /* SONUÇ ŞABLONU — mobil `WalkModeScreen` bitişiyle aynı alanlar: band →
         üç sayı → notlar → Devam / Paylaş / Bitir. Halka kalktı (bandın ana
         sayısı aynı bilgi); kutlama eşiği eskisi gibi %60. Sonucu duyuran
         bandın kendi `role="status"`u (bkz. 11.337). */
      <FlowColumn celebrate={tally.total > 0 && donePct >= 60}>
        <ResultHero
          eyebrow={t("learn.walk_mode")}
          title={t("walkmode.done_title")}
          figure={`${tally.correct}/${tally.total || 0}`}
          sub={t("walkmode.done_saved")}
          mood={tally.total > 0 ? (donePct >= 60 ? "celebrate" : "happy") : "idle"}
        />
        {tally.total > 0 ? (
          <StatRow
            items={[
              { value: formatPercent(donePct, lang), label: t("summary.accuracy") },
              ...(taught.current > 0 ? [{ value: String(taught.current), label: t("walkmode.stat_new") }] : []),
              { value: t("time.minutes_short", { m: doneMin }), label: t("walkmode.stat_time") },
            ]}
          />
        ) : null}
        {/* Birden fazla tur yapıldığında sayılar yürüyüşün TOPLAMI; bunu söyleyen
            satır web'e özel, çünkü mobil sayacı tur başına sıfırlıyor. */}
        {walkRef.current.sessions > 1 ? <FlowNote text={t("walk.n_rounds", { n: walkRef.current.sessions })} /> : null}
        {noMore ? <FlowNote icon={<InboxIcon size={16} />} text={t("walkmode.done_no_more_sub")} /> : null}
        <FlowActions
          primary={noMore ? { label: t("common.finish"), onClick: leave } : { label: t("walkmode.continue"), onClick: () => { setStatus("loading"); void load(); } }}
          secondary={tally.total > 0 ? { label: t("common.share"), icon: <ShareIcon size={19} />, onClick: () => void shareText(resultText(lang, tally.correct, tally.total), "result") } : null}
          tertiary={noMore ? null : { label: t("common.finish"), onClick: leave }}
        />
      </FlowColumn>
    );
  }

  // playing
  return (
    <Frame>
      {/*
        Karanlık kilit — ekranı örter ama kapatmaz. Tüm dokunmaları yutar
        (cepte kazara basılmasın); çıkış için üç dokunuş. Ekran açık kaldığı
        için tanıyıcı çalışmaya devam ediyor, akış kulakta sürüyor.
      */}
      {screenDark ? (
        <div
          onClick={onDarkTap}
          /* ORTU KENDINI DUYURUYOR VE KLAVYEYE BIR CIKIS BIRAKIYOR.
             Iki ayri kusur vardi:

             1. Ortu ekranin tamamini kapatiyor ve etkilesim kipini
                degistiriyor ("ekran karanlik ama acik - seni dinliyorum"),
                ama hicbir sey bunu duyurmuyordu: sesli okuyucu kullanan biri
                ortunun geldigini ogrenmiyordu.
             2. Cikis yalnizca UC DOKUNUSTU. Dokunmalarin yutulmasi bilincli
                (cepte kazara basilmasin) ama klavye kullanan biri icin bu bir
                KLAVYE TUZAGI: ortu her seyi kapatiyor, tiklamalar yutuluyor ve
                disari cikan hicbir tus yok (WCAG 2.1.2). Escape eklendi -
                kazara basilan bir tus degil, bilincli bir cikis; uc dokunus
                kurali dokunmatikte oldugu gibi kaliyor.

             Bu ortu WEB'E OZEL (anahtarlari `i18n/web`de): mobilde ekran
             gercekten kapaniyor, taklit bir karartmaya gerek yok. Yani burada
             Android'e bakilacak bir karsilik yok, olcut mutlak. */
          role="status"
          ref={darkOverlay}
          tabIndex={-1}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-end outline-none"
          style={{ background: "#000", touchAction: "none" }}
        >
          <p className="mb-24 px-8 text-center text-caption leading-relaxed" style={{ color: "rgba(255,255,255,0.22)" }}>
            {t("walk.dark_listening")}
            <br />
            {t("walk.dark_exit")}
          </p>
        </div>
      ) : null}

      {/* ÇIKIŞ BAŞLIKTA DA: tur sürerken tek çıkış sayfanın en altındaki
          "Bitir" düğmesiydi ve ekran kaydırılmadan görünmüyordu. Android'in
          kip başlığında 44 px'lik bir kapat karosu var (`WalkModeScreen`
          `topBar`) ve o da bu onayı açıyor. */}
      <div className="mb-4 flex items-baseline justify-between gap-3 text-caption">
        <RoundExit onExit={() => setQuit(true)} labelKey="walkmode.exit_walk_mode" />
        <span className="muted flex-1">{Math.max(1, step)} / {total}</span>
        <span className="flex items-center gap-2">
          {/* Yakalama yöntemi ekranda: tarayıcı tanıyıcısı mı, kayıt + sunucu
              mu (tanıyıcısı olmayan tarayıcı) bir bakışta görülsün. */}
          <span
            className="rounded-full px-2 py-0.5 text-micro uppercase tracking-eyebrow"
            style={{
              background:
                capture === "stt"
                  ? "color-mix(in srgb, var(--color-mint-500) 14%, transparent)"
                  : "color-mix(in srgb, var(--color-flame-500) 14%, transparent)",
              color: capture === "stt" ? "var(--color-mint)" : "var(--color-flame)",
            }}
          >
            {t(capture === "stt" ? "walk.chip_pocket" : "walk.chip_screen")}
          </span>
          <span className="muted tabular-nums">
            {t("common.n_correct", { correct: tally.correct, total: tally.total })}
          </span>
        </span>
      </div>

      {/* Ekran ikincil: asıl akış kulakta. Yine de bakan biri ne olduğunu
          bir bakışta görmeli — bu yüzden tek büyük satır. */}
      <motion.div
        key={`${index}-${phase}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[9rem] flex-col items-center justify-center text-center"
      >
        {asking ? (
          <>
            <motion.span
              animate={phase === "listening" ? { scale: [1, 1.15, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "color-mix(in srgb, var(--color-mint-500) 14%, transparent)", color: "var(--color-mint)" }}
            >
              <MicIcon size={28} />
            </motion.span>
            <p className="mt-3 text-h3">{t("walk.continue_q")}</p>
            <p className="muted mt-1 text-body">
              {phase === "listening" ? t("walk.say_yes_no") : "…"}
            </p>
          </>
        ) : phase === "listening" ? (
          <>
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background: "color-mix(in srgb, var(--color-brand-500) 14%, transparent)",
                color: "var(--color-brand)",
              }}
            >
              <MicIcon size={28} />
            </motion.span>
            <p className="mt-3 text-h3">{prompt?.tr}</p>
            <p className="muted mt-1 text-body">{t("walk.say_target", { target: courseName(course, lang) })}</p>
          </>
        ) : verdict ? (
          <>
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background:
                  verdict === "correct"
                    ? "color-mix(in srgb, var(--color-mint-500) 14%, transparent)"
                    : verdict === "wrong"
                      ? "color-mix(in srgb, var(--color-flame-500) 14%, transparent)"
                      : "var(--surface-2)",
                color: verdict === "correct" ? "var(--color-mint)" : verdict === "wrong" ? "var(--color-flame)" : "var(--color-brand)",
              }}
            >
              {verdict === "correct" ? <CheckIcon size={28} /> : verdict === "wrong" ? <XIcon size={28} /> : <MicIcon size={28} />}
            </span>
            <p className="mt-3 text-h3">{prompt?.de}</p>
            <p className="muted mt-1 text-body">
              {verdict === "correct"
                ? t("common.correct")
                : verdict === "unheard"
                  ? t("walk.not_heard")
                  : verdict === "skip"
                    ? t("walk.skip_ok")
                    : prompt?.tr}
            </p>
            {verdict === "wrong" && heardText ? (
              <p className="muted mt-2 text-caption">
                {t("walk.i_heard")} <span className="font-semibold">“{heardText}”</span>
              </p>
            ) : null}
          </>
        ) : (
          <>
            <p className="text-h3">{prompt?.tr ?? "…"}</p>
            <p className="muted mt-1 text-body">{t("walk.speaking")}</p>
          </>
        )}
      </motion.div>

      {diag ? (
        <div
          className="mt-4 rounded-panel px-3 py-2 font-mono text-micro leading-snug"
          style={{ background: "rgba(20,16,14,0.92)", color: "#f4eee4" }}
        >
          <div style={{ opacity: 0.6 }}>dinlemeler · yol: {capture === "stt" ? "cep" : "tarayıcı"}</div>
          {diag.length ? diag.map((l, i) => <div key={i}>{l}</div>) : <div>—</div>}
        </div>
      ) : null}

      {/* Düğmeler bilerek büyük: yürürken ve bakmadan basılıyor. */}
      {/*
        "Cebe koy" ekranı KARARTIR ama kapatmaz: cihaz testinde (HyperOS) ekran
        kapanınca sistem mikrofonu susturuyor, ekran açık kalınca tanıyıcı
        çalışıyor. Tanıyıcı olan her tarayıcıda gösteriliyor; sunucu STT
        gerekmiyor çünkü ekran açık kipin kendi tanıyıcısı kullanılıyor.
      */}
      {browserRef.current ? (
        <button onClick={darken} className="btn btn-primary mt-6 w-full px-5 py-4 text-h3">
          {t("walk.pocket_darken")}
        </button>
      ) : null}
      <button onClick={pause} className={`btn btn-ghost ${browserRef.current ? "mt-2" : "mt-6"} w-full px-5 py-4 text-h3`}>
        {t("walk.pause")}
      </button>
      {/* TUR ORTASINDA SORULUYOR. "Bitir" tek dokunuşta turu kapatıyordu;
          Android aynı yerde soruyor ("Bu tur yarım kalır; öğrendiklerin
          kaydedilir") çünkü yürüyüşte düğmeye kazara basmak kolay ve tur
          sesli sürdüğü için ekrana bakılmıyor. Bitmiş turun "Bitir"i
          sorulmuyor: orada bitirecek bir şey kalmadı -- Android'de de
          koşul `inSession`. */}
      <ConfirmDialog
        open={quit || ayril.pending !== null}
        title={t("walkmode.end_walk")}
        message={t("walkmode.back_message")}
        confirmLabel={t("common.finish")}
        destructive
        onConfirm={() => { setQuit(false); if (ayril.pending) { teardown(); ayril.leave(); } else leave(); }}
        onCancel={() => { setQuit(false); ayril.stay(); }}
      />
      <button onClick={() => setQuit(true)} className="btn btn-ghost mt-2 w-full px-5 py-3">
        {t("common.finish")}
      </button>
    </Frame>
  );
}

/**
 * `role` DISARIDAN: Frame yuruyusun butun durumlarini sariyor (izin, hata,
 * oynama, bitis) ve `role="status"`u burada sabitlemek tur yururken de canli
 * bolge acmak olurdu. Sonucu duyuran yalniz bitis dali. Ayni kalip
 * `boss-player`da da var.
 */
function Frame({ children, role, busy }: { children: React.ReactNode; role?: "status" | "alert"; busy?: boolean }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div role={role} aria-busy={busy ? "true" : undefined} className="card p-6">{children}</div>
    </div>
  );
}
