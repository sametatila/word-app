"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { miss } from "@/lib/errors";
import { motion } from "framer-motion";
import { speakSegments, stopSpeaking, type SpeechSegment } from "@/components/speak-button";
import { useListen } from "@/components/use-listen";
import { spokenMatches } from "@/components/games/types";
import { parseConfirm } from "@/lib/voice-intent";
import { useWakeLock } from "@/components/use-wake-lock";
import { cueListen } from "@/lib/lessons/cues";
import { sharedAudioContext } from "@/lib/audio-context";
import {
  pocketCue,
  startPocketAudio,
  stopPocketAudio,
  updatePocketTitle,
} from "@/components/pocket-audio";
import {
  activateMic,
  closeMic,
  micSettings,
  micSupported,
  openMic,
  recordAnswerClip,
  sttAvailable,
  transcribe,
} from "@/components/pocket-mic";
import { afterMs, withDeadline } from "@/components/pocket-clock";
import { play, resetCombo } from "@/lib/sfx";
import { track } from "@/lib/track";
import { CheckIcon, MicIcon, XIcon } from "@/components/icons";
import type { Answer, Round, RoundWord, SessionPayload, SessionProgress } from "@/lib/types";

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
 * Bu yüzden iki kip var ve ikisi birbirine KARIŞMIYOR:
 *
 *   - **Ekranda** — dersle birebir aynı: tarayıcının kendi tanıyıcısı, başka
 *     hiçbir şey. Mikrofon akışı tutulmuyor, sessiz döngü çalmıyor, okuma
 *     oyunlardaki boşluksuz yoldan. Sebebi ölçüldü: mikrofon akışı oturum
 *     başında alınıp (parçaları kapalı) tutulduğunda, sahibin telefonunda
 *     altı dinlemenin altısı `browser:end` ile bitti — tanıyıcı açılıyor,
 *     hata vermeden ve hiçbir şey duymadan kapanıyor. Android eşzamanlı
 *     kayıtta sesi üstteki uygulamanın kendi akışına veriyor, tanıyıcı servisi
 *     sessizlik alıyor; aynı akış Bluetooth'ta çıkışı telefon yoluna (SCO)
 *     düşürüp okumayı da bozuyordu. Boş dinleme "duyamadım"dır, kip değişmez.
 *     Ekran kapanırsa bu kipte tur DURUR ve sebebi sesle söylenir: mikrofon
 *     kilitli ekranda istenemiyor, o an yapılacak dürüst şey yok.
 *   - **Cepte** — kullanıcı "Cebe koy"a basınca silahlanıyor: mikrofon o an
 *     (ekran açıkken, tek izinli an) alınıyor, sessiz döngü + MediaSession
 *     kuruluyor, "ekranı kapatabilirsin" deniyor. Ekran kapanınca kayıt +
 *     sunucu (Azure önde, klip konuşmaya kırpılmış). Ekran açıkken cepte
 *     kipinde DİNLENMİYOR — tutulan mikrofon tanıyıcıyı bozduğu için — yarım
 *     dakika içinde kapanmazsa kendiliğinden ekran kipine dönülüyor. Ekran
 *     geri açılınca da (süren kayıt bitince) ekran kipine dönülüyor.
 *
 * Ekranı KAPATMADAN cebe koyan kullanıcı için ekran kipi zaten yeter: ekran
 * kilidi ekranı açık tutuyor, tanıyıcı çalışmaya devam ediyor. Her dinleme ve
 * her geçiş kayda geçiyor (`walk_listen`, `walk_switch`): "Web Speech gerçekten
 * devrede mi" sorusu veriyle cevaplansın.
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
 * Duyulmayan cevabın karşılığı.
 *
 * Sessizlik YANLIŞ sayılmıyor. Sokakta, otobüste ya da cepteki telefonda
 * mikrofonun bir turu kaçırması olağan; onu hata yazmak tekrar planını
 * bozardı — kelime gerçekten unutulduğu için değil, gürültü yüzünden öne
 * çekilirdi. Duyulmayan tur cevapsız geçiliyor ve doğru karşılık okunuyor.
 */
const UNHEARD_IS_NOT_WRONG = true;

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
const ANSWER_WINDOW_MS = 6000;
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
const BROWSER_SILENCE_MS = 7000;
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
/**
 * "Cebe koy" denildikten sonra ekranın kapanması için beklenen en uzun süre.
 *
 * Bu sürede mikrofon tutuluyor ve tanıyıcı kullanılmıyor; kullanıcı ekranı
 * kapatmazsa cepte kipinin karşılığı yok — ekran kipine dönülüyor ve bu sesle
 * söyleniyor.
 */
const ARM_WAIT_MS = 30_000;
/** Ekran açık yolda turlar arası nefes — "aşırı hızlı" geçişleri biraz yavaşlatır. */
const GAP_MS = 550;

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

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function withArtikel(w: RoundWord): string {
  return w.artikel ? `${w.artikel} ${w.de}` : w.de;
}

/** Turdaki kelimeler — eşleştirme turu beş kelime taşıyor, gerisi bir. */
function wordsOf(round: Round): RoundWord[] {
  return round.game === "match" ? round.words : [round.word];
}

export function WalkPlayer({ onExit }: { onExit: () => void }) {
  const [status, setStatus] = useState<Status>("loading");
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("speaking");
  const [prompt, setPrompt] = useState<{ tr: string; de: string } | null>(null);
  const [verdict, setVerdict] = useState<"correct" | "wrong" | "unheard" | null>(null);
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
   *   `stt`     — mikrofon `getUserMedia` ile açılıp açık tutuluyor, her cevap
   *               kısa bir klip olarak kaydedilip sunucuda yazıya çevriliyor.
   *               Ekran kapalıyken de çalışıyor.
   *   `browser` — tarayıcının kendi tanıyıcısı. Anahtar gerektirmiyor ama
   *               yalnızca sayfa görünürken çalışıyor.
   *
   * Hem durum hem ref: ekranda gösterilmesi gerekiyor ve döngünün içinden
   * okunuyor (döngü her turda yeniden kurulmadığı için durum olarak okunsa
   * eski değeri görürdü).
   */
  const [capture, setCapture] = useState<"stt" | "browser">("browser");
  /**
   * Cepte kipi bu kurulumda GERÇEKTEN çalışıyor mu — daha tur başlamadan.
   *
   * `capture` ancak tur başlayınca belli oluyor, yani başlangıç ekranı bunu
   * söyleyemiyordu ve kullanıcı ekranı kapattıktan sonra öğreniyordu. Oysa
   * ekran kapalıyken çalışan tek yol sunucudaki yazıya çevirme; anahtarı
   * yoksa "kulaklığı tak, cebe koy" daveti karşılanamayan bir söz oluyor.
   */
  const [pocketReady, setPocketReady] = useState<boolean | null>(null);
  const captureRef = useRef<"stt" | "browser">("browser");
  /** Tarayıcının kendi tanıyıcısı kullanılabiliyor mu — görünürken tercih edilen yol. */
  const browserRef = useRef(false);
  /** Sunucuda yazıya çevirme açık mı — ekran kapanınca devreye girecek yol. */
  const sttReady = useRef(false);
  /** Süren dinlemenin iptal düğmesi — süre dolunca ya da tur durunca basılıyor. */
  const hearCtl = useRef<AbortController | null>(null);
  /** Kayıt yolu şu an bir cevap kaydediyor mu — ekran açılınca beklemek için. */
  const recording = useRef(false);
  /**
   * Cepte kipi silahlı mı: mikrofon tutuluyor, sessiz döngü çalıyor.
   *
   * Hem ref hem durum: döngü içinden okunuyor, ekranda gösteriliyor.
   */
  const armed = useRef(false);
  const [pocket, setPocket] = useState<"off" | "armed">("off");
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
  /** Karanlık katmandan çıkış: kısa sürede üç dokunuş (cepte kazara açılmasın). */
  const darkTaps = useRef<number[]>([]);
  /**
   * "Cebe koy" bir dinlemenin ORTASINDA basıldı: o dinleme iptal edildi ve
   * kelime bir kez daha sorulacak — mikrofon alınırken tanıyıcı ölüyor, o
   * kelimeyi "duyulmadı" saymak haksızlık olurdu.
   */
  const reask = useRef(false);
  /**
   * Ekran, kayıt sürerken açıldı: kayıt bitince cepte kipinden çıkılacak.
   *
   * Hemen çıkmak tamponu siliyor ve o cevabı yakıyordu; kullanıcı cebinden
   * çıkardığı telefona cevabını çoktan söylemiş oluyordu.
   */
  const disarmWhenIdle = useRef(false);
  /**
   * Döngünün bir sonraki dinlemeden önce okuyacağı duyuru.
   *
   * Düğmeden doğrudan `say` çağırmak ölçülmüş bir hataydı: döngünün süren
   * okumasını iptal ediyor, döngü o okumanın bitişini otuz saniyelik tavana
   * kadar bekliyordu. Okuyan tek yer döngü; düğme yalnız not bırakıyor.
   */
  const announce = useRef<string | null>(null);
  /** Tur bir sebeple bitti mi — sökülürken ikinci bir `walk_end` yazılmasın. */
  const ended = useRef(false);
  /** `?diag=1`: son dinlemelerin yolu ve sonucu ekranda — telefonda bir bakışta. */
  const [diag, setDiag] = useState<string[] | null>(null);
  /** Üst üste kaç turda klip üretilemedi — kayıt arızasını sessizce sürüklememek için. */
  const captureFails = useRef(0);
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
  /** Son turların duyuldu/duyulmadı geçmişi — pencere bunun üstünde. */
  const heardLog = useRef<boolean[]>([]);
  const { acquire, release } = useWakeLock();
  /** Okumanın bitişini bekleyen söz — iptal edilirse elle çözülür. */
  const speakDone = useRef<(() => void) | null>(null);

  // ── Sunucu konuşması ────────────────────────────────────────────────

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/session", {
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

  /** Cevapları ve turun nerede kalındığını gönderir — ekrandaki turla aynı uç. */
  const flush = useCallback(async (final: boolean, progress: SessionProgress) => {
    const batch = pending.current;
    pending.current = [];
    /*
      Cevap yoksa da NEREDE KALINDIĞI yazılmalı.

      Eskiden burada dönülüyordu ve sonucu ağırdı: duyulmayan tur cevap
      üretmiyor (bilerek — yanlış sayılmıyor), yani bir turun bütün cevapları
      duyulmadığında ilerleme hiç kaydedilmiyordu. Sunucudaki tur yarım kalmış
      görünüyor ve `loadSession` yarım turu olduğu gibi geri veriyor. Yani hem
      "devam edelim mi?" sonrası hem de uygulamaya yeniden girişte AYNI yirmi
      tur geliyordu — "yapamadıklarımı tekrar tekrar veriyor" ve "her girip
      bitirdiğimde aynı kelimeler geliyor" şikâyetlerinin ikisi de buydu.

      İlerleme için ayrı bir uç zaten var; cevap üretmeyen adımlar için
      yazılmıştı (bkz. api/session POST).
    */
    if (!batch.length) {
      try {
        await fetch("/api/session", {
          signal: AbortSignal.timeout(NET_TIMEOUT_MS),
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ day: localDay(), progress }),
          keepalive: true,
        });
      } catch {
        /* çevrimdışıysa ilerleme bu tur için kaybolur */
      }
      return;
    }
    try {
      const res = await fetch("/api/answers", {
        signal: AbortSignal.timeout(NET_TIMEOUT_MS),
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          answers: batch,
          day: localDay(),
          seconds: final ? Math.round((Date.now() - startedAt.current) / 1000) : 0,
          progress,
        }),
        keepalive: true,
      });
      if (!res.ok) return;
      const data = (await res.json()) as { totalXp: number; currentStreak: number };
      window.dispatchEvent(
        new CustomEvent("wortspiel:stats", {
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
    const spoken = new Promise<void>((resolve) => {
      speakDone.current = resolve;
      /*
        Yol GÖRÜNÜRLÜĞE göre, kipe değil. Sayfa görünürken oyunlarla aynı
        boşluksuz WebAudio yolu — "okuma oyunlardaki gibi olmalı" şikâyetinin
        bir yarısı buydu, ses öğesi zinciri ayrı bir kulak veriyordu. Yalnızca
        sayfa gizliyken ses ÖĞESİ yolu zorlanıyor: telefon kilitlendiğinde
        `AudioContext` askıya alınıyor ve WebAudio ile çalan her şey susuyor;
        ses öğeleri çalmaya devam ediyor. Cepte kipinde ekran açık kalabiliyor
        (kullanıcı henüz kapatmadı) ve o an WebAudio çalışıyor — background'a
        erken geçmenin sebebi yok.
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

  /** Mikrofon açıldı işareti: ekranda dersin işareti, cepte ses öğesi. */
  const cue = useCallback(() => {
    const ctx = sharedAudioContext();
    if (!armed.current && ctx && ctx.state === "running") cueListen();
    else pocketCue();
  }, []);

  /**
   * Cepte kipini kurar — "Cebe koy" dokunuşunun içinden.
   *
   * Mikrofon burada, ekran AÇIKKEN alınıyor: kilitli ekranda `getUserMedia`
   * reddediliyor, yani cebe geçmenin tek izinli anı bu. Sessiz döngü de
   * dokunuşun içinde başlıyor (ilk çalma kullanıcı hareketi istiyor).
   * Süren bir tanıyıcı dinlemesi varsa iptal ediliyor ve kelime yeniden
   * sorulacak: mikrofon alınırken tanıyıcı zaten ölüyor.
   */
  const arm = useCallback(async (): Promise<boolean> => {
    if (armed.current) return true;
    if (!sttReady.current) return false;
    startPocketAudio("Wortspiel · Yürürken", {});
    if (!(await openMic())) {
      stopPocketAudio();
      track("walk_switch", 1, "arm-failed");
      return false;
    }
    // Kaydedici BURADA, ekran AÇIKKEN başlatılıp açık tutuluyor. Ekran
    // kapandıktan sonra yeni kayıt başlatmak Android'de sessiz geçiyordu
    // (Deepgram boş dönüyordu); süregelen bir kayıt ise arka planda ses
    // vermeye devam ediyor. Cevaplar bundan kesiliyor (recordAnswerClip).
    activateMic();
    armed.current = true;
    disarmWhenIdle.current = false;
    setPocket("armed");
    captureRef.current = "stt";
    setCapture("stt");
    track("walk_switch", 1, "armed");
    track("walk_capture", micSettings()?.echoCancellation ? 1 : 0);
    note("cebe alındı");
    if (hearCtl.current && !hearCtl.current.signal.aborted) {
      reask.current = true;
      hearCtl.current.abort();
    }
    return true;
  }, [note]);

  /** Cepte kipinden çıkar: mikrofon bırakılır, döngü susar, tanıyıcıya dönülür. */
  const disarm = useCallback(
    (reason: "visible" | "timeout" | "manual") => {
      if (!armed.current) return;
      armed.current = false;
      disarmWhenIdle.current = false;
      closeMic();
      stopPocketAudio();
      setPocket("off");
      captureRef.current = browserRef.current ? "browser" : "stt";
      setCapture(browserRef.current ? "browser" : "stt");
      track("walk_switch", 0, reason);
      note(`ekrana dönüldü (${reason})`);
    },
    [note],
  );

  /**
   * Ekranın kapanmasını bekler: kapanırsa `true`, süre dolar ya da iptal
   * edilirse `false`. Zamanlayıcı sayfa saatinden (pocket-clock) — sayfa
   * görünürken kısılmıyor ama alışkanlık olarak tek saat kullanılıyor.
   */
  const waitForHidden = useCallback(
    (ms: number, signal?: AbortSignal): Promise<boolean> =>
      new Promise<boolean>((resolve) => {
        if (document.visibilityState === "hidden") return resolve(true);
        const off = () => document.removeEventListener("visibilitychange", onVis);
        const cancel = afterMs(ms, () => {
          off();
          resolve(false);
        });
        const onVis = () => {
          if (document.visibilityState !== "hidden") return;
          cancel();
          off();
          resolve(true);
        };
        document.addEventListener("visibilitychange", onVis);
        signal?.addEventListener(
          "abort",
          () => {
            cancel();
            off();
            resolve(false);
          },
          { once: true },
        );
      }),
    [],
  );

  /**
   * Bir cevabı dinler ve duyduğu adayları döndürür.
   *
   * İki yol da aynı sözleşmeyi veriyor, böylece tur döngüsü hangisinin
   * kullanıldığını bilmek zorunda kalmıyor. Seçim kipe bağlı: ekranda
   * tanıyıcı, cepte kayıt.
   */
  const hearOnce = useCallback(
    async (
      lang: "de" | "tr",
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
        await say([{ lang: "tr", text }]);
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
      if (!armed.current && browserRef.current && visible()) {
        const startedAt = Date.now();
        const heard = await listen({
          lang: lang === "tr" ? "tr-TR" : "de-DE",
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
              lang: "tr",
              text: sttReady.current
                ? "Tarayıcının tanıyıcısı çalışmıyor; cevapları sunucuya soracağım."
                : "Tarayıcının tanıyıcısı çalışmıyor. Turu durdurdum.",
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
          // Boş dinleme ya da ekran kapandı: duyulmadı. Ekran kapandıysa kipin
          // ne yapacağına görünürlük dinleyicisi karar veriyor (tur durur).
          return [];
        }
      }

      /*
        Cepte, ama ekran hâlâ açık: DİNLENMİYOR, ekranın kapanması bekleniyor.

        Tutulan mikrofon tanıyıcıyı bozduğu için bu arada tanıyıcı da
        kullanılamaz; kayıt yolunu görünür sayfada kullanmak ise sahibin
        "ekran açıkken Azure yok" şartını çiğnerdi. Yarım dakikada kapanmazsa
        cepte kipinin karşılığı yok: ekran kipine dönülüp bu sesle söyleniyor.
      */
      if (armed.current && visible()) {
        const went = await waitForHidden(ARM_WAIT_MS, signal);
        if (signal?.aborted) return [];
        if (!went) {
          disarm("timeout");
          await say([{ lang: "tr", text: "Ekranda devam ediyoruz." }]);
          if (reprompt) await say(reprompt);
          if (signal?.aborted) return [];
          return hearOnceRef.current(lang, windowMs, expected, accept, reprompt, signal);
        }
        track("walk_switch", 1, "hidden");
        note("ekran kapandı → cep yolu");
      }

      // Cep yolu: kayıt + sunucu.
      if (sttReady.current) {
        /*
          İşaret kaydın İÇİNDEN veriliyor.

          Kaydedici zaten dönüyor ve klip halka tampondan geriye doğru
          kesiliyor, yani bipten önce söylenen de klibe giriyor. Kullanıcının
          bipi bekleyip sonra konuşması gerekmiyor — "kesinti olmadan
          yapabileyim" istenen şey bu.
        */
        pocketCue();
        recording.current = true;
        try {
          // Kayıt konuşma bitince kendiliğinden kapanıyor; `windowMs` sabit
          // pencere değil ÜST SINIR. Sürekli kaydediciden kesilen geçerli webm.
          const clip = await recordAnswerClip(windowMs, signal);
          if (signal?.aborted) return [];
          if (clip) {
            captureFails.current = 0;
            const startedAt = Date.now();
            const heard = await transcribe(clip.blob, lang, expected, { signal });
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
              { lang: "tr", text: "Mikrofona ulaşamıyorum. Turu durdurdum, telefonu açınca devam edelim." },
            ]);
            pauseRef.current();
          }
        } finally {
          recording.current = false;
          // Ekran kayıt sürerken açıldıysa cepte kipinden şimdi çıkılıyor.
          if (disarmWhenIdle.current && visible()) disarm("visible");
        }
      }

      return [];
    },
    [cue, disarm, listen, note, say, waitForHidden],
  );
  /** Kendine dönmesi gereken tek yer (silahsızlanınca ekran yolu) — ref üzerinden. */
  const hearOnceRef = useRef(hearOnce);
  useEffect(() => {
    hearOnceRef.current = hearOnce;
  }, [hearOnce]);

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
      lang: "de" | "tr",
      windowMs: number,
      expected = "",
      accept?: (alternatives: string[]) => boolean,
      reprompt?: SpeechSegment[],
    ): Promise<string[]> => {
      hearCtl.current?.abort();
      const ctl = new AbortController();
      hearCtl.current = ctl;
      const heard = await withDeadline(
        hearOnce(lang, windowMs, expected, accept, reprompt, ctl.signal),
        windowMs + HEAR_SLACK_MS,
        null as string[] | null,
      );
      if (heard === null) {
        ctl.abort();
        track("walk_listen", 0, "deadline");
        return [];
      }
      return heard;
    },
    [hearOnce],
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
    Sökülürken arka plan katmanı da bırakılıyor.

    `stopAll` yalnızca döngüyü ve okumayı durduruyordu; sessiz döngü sesi ile
    mikrofon açık kalıyordu. Kullanıcı "geri dön" düğmesine basmadan çıkarsa
    (sekme değişimi, geri gitme, uygulamanın başka bir yerine geçme) o ses
    OTURUM BOYUNCA çalmaya devam ediyor — üstelik kendini yeniden başlatan bir
    gözcüsü var, yani duraklatılamıyor bile. Uygulamanın geri kalanının sesi
    onun üstüne biniyor.
  */
  useEffect(
    () => () => {
      // Geri hareketi ya da sekme değişimiyle çıkış da bir bitiş: kayda geçsin,
      // yoksa dışarıdan "takıldı"dan ayırt edilemiyor (60 günde hiç walk_end yoktu).
      if (!ended.current && run.current > 0) track("walk_end", 6);
      stopAll();
      stopPocketAudio();
      closeMic();
    },
    [stopAll],
  );

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("diag")) setDiag([]);
  }, []);

  // Tur oynamıyorsa karanlık katman kalkar (duraklat/çık/bitti sonrası açık kalmasın).
  useEffect(() => {
    if (status !== "playing") setScreenDark(false);
  }, [status]);

  // Kurulum yoklaması: cevabı beklerken hiçbir şey engellenmiyor, yalnızca
  // başlangıç ekranındaki söz doğru olsun diye.
  useEffect(() => {
    let alive = true;
    void (async () => {
      const ok = micSupported() && (await sttAvailable());
      if (alive) setPocketReady(ok);
    })();
    return () => {
      alive = false;
    };
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
      const res = await fetch(`/api/session${skip ? `?skip=${skip}` : ""}`, {
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
        total > 0 ? `Tur bitti. ${total} sorudan ${correct} doğru.` : "Tur bitti.";
      setAsking(true);
      setVerdict(null);
      try {
      for (let attempt = 0; attempt < 2; attempt++) {
        setPhase("speaking");
        setPrompt(null);
        await say([
          {
            lang: "tr",
            text: attempt === 0 ? `${summary} Devam edelim mi?` : "Devam edelim mi? Evet ya da hayır de.",
          },
        ]);
        setPhase("listening");
        const heard = await hear(
          "tr",
          CONFIRM_SILENCE_MS,
          "",
          (alts) => parseConfirm(alts[0] ?? "") !== null,
          [{ lang: "tr", text: "Devam edelim mi?" }],
        );
        const intent = parseConfirm(heard[0] ?? "");
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
    [hear, say],
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

      // eslint-disable-next-line no-constant-condition
      while (true) {
      for (let i = start; i < current.length; i++) {
        if (!alive()) return;
        setIndex(i);
        const round = current[i];
        const results: Answer[] = [];

        for (const word of wordsOf(round)) {
          if (!alive()) return;
          const target = withArtikel(word);
          askedIds.current.add(word.id);
          setPrompt({ tr: word.tr, de: target });
          setVerdict(null);

          // Yeni kelime: sorulmuyor, tanıtılıyor. Ekranda da öyle çalışıyor.
          if (round.game === "intro") {
            setPhase("speaking");
            await say([
              { lang: "tr", text: "Yeni kelime." },
              { lang: "de", text: target },
              { lang: "tr", text: word.tr },
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
            continue;
          }

          // Soru: Türkçe karşılık okunuyor, ardından mikrofon açılıyor.
          setPhase("speaking");
          updatePocketTitle(word.tr);
          await say([{ lang: "tr", text: word.tr }]);
          if (!alive()) return;

          setPhase("listening");
          const askedAt = Date.now();
          // Doğru cevap duyulur duyulmaz dinleme kapanıyor: beklenen cevap
          // belliyken duraklama payının dolmasını beklemenin karşılığı yok.
          const ask = () =>
            hear(
              "de",
              ANSWER_WINDOW_MS,
              target,
              (alts) => spokenMatches(alts, [target, word.de]),
              [{ lang: "tr", text: word.tr }],
            );
          let heard = await ask();
          if (!alive()) return;
          // "Cebe koy" dinlemenin ortasına denk geldi: kelime yeniden soruluyor
          // (duyuruyu `hearOnce` kendi sırasında okuyor).
          if (reask.current) {
            reask.current = false;
            setPhase("speaking");
            await say([{ lang: "tr", text: word.tr }]);
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
          const ok = !unheard && spokenMatches(heard, [target, word.de]);
          setHeardText(said);

          // Pencere her turda güncelleniyor: duyulan da duyulmayan da giriyor.
          heardLog.current.push(!unheard);
          if (heardLog.current.length > UNHEARD_WINDOW) heardLog.current.shift();
          const misses = heardLog.current.filter((h) => !h).length;

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
                { lang: "tr", text: "Sesini duyamıyorum. Turu durdurdum; mikrofonu kontrol edip hazır olunca devam et." },
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
              { lang: "tr", text: "Duyamadım." },
              { lang: "de", text: target },
            ]);
            continue;
          }

          setVerdict(ok ? "correct" : "wrong");
          play(ok ? "correct" : "wrong");
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
              { lang: "tr", text: "Doğrusu:" },
              { lang: "de", text: target },
            ]);
          } else {
            await say([{ lang: "de", text: target }]);
          }
          if (!alive()) return;
          /*
            Turlar arasında kısa bir nefes.

            Ekran açık yolda tanıyıcı doğru cevabı duyar duymaz kapanıyor ve
            sonraki soru hemen okunuyordu — "aşırı hızlı" bunun içindi. Ekranda
            (armed değil) küçük bir es kulağa daha rahat geliyor; cepte ekran
            kapalıyken zaten yavaş, orada es eklemenin karşılığı yok.
          */
          if (!armed.current && document.visibilityState === "visible") {
            await new Promise<void>((r) => afterMs(GAP_MS, r));
            if (!alive()) return;
          }
        }

        pending.current.push(...results);
        const last = i >= current.length - 1;
        await flush(last, {
          correct: tallyRef.current.correct,
          total: tallyRef.current.total,
          xp: tallyRef.current.correct * 10,
          index: last ? current.length : i + 1,
          missed: missed.current,
        });
        if (!alive()) return;
      }

      if (!alive()) return;
      play("finish");
      track("session_done", tallyRef.current.correct);

      const again = await askContinue(tallyRef.current.correct, tallyRef.current.total);
      if (!alive()) return;
      if (again === "no") {
        track("walk_end", 1);
        ended.current = true;
        setPhase("speaking");
        await say([{ lang: "tr", text: "Tamam, iyi günler." }]);
        stopPocketAudio();
        closeMic();
        void release();
        setStatus("done");
        return;
      }

      setPhase("speaking");
      await say([{ lang: "tr", text: "Devam ediyoruz." }]);
      const next = await fetchSession();
      if (!alive()) return;
      if (!next?.rounds.length) {
        track("walk_end", 2);
        ended.current = true;
        await say([{ lang: "tr", text: "Bugünlük tekrar kalmadı." }]);
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
    [askContinue, fetchSession, flush, hear, release, say],
  );

  async function start(from: number) {
    const rounds = session?.rounds;
    if (!rounds?.length) return;

    /*
      Yakalama yöntemi burada seçiliyor ve sırası önemli.

      Sunucuda yazıya çevirme açıksa kayıt yolu kullanılıyor: mikrofon
      `getUserMedia` ile açılıp oturum boyunca AÇIK tutuluyor ve bu, sekmenin
      arka planda canlı kalmasının en güçlü güvencesi — ekran kapansa bile
      cevap alınabiliyor.

      Açık değilse tarayıcının kendi tanıyıcısına düşülüyor. O yalnızca sayfa
      görünürken çalışıyor; anahtar gerektirmemesi karşılığında ekranın açık
      kalmasını istiyor.
    */
    const { requestMicrophone, recognitionCtor } = await import("@/components/microphone");
    const permission = await requestMicrophone();
    if (permission === "denied") return setStatus("denied");

    browserRef.current = Boolean(recognitionCtor());

    /*
      Mikrofon akışı BURADA ALINMIYOR ve sessiz döngü BAŞLAMIYOR.

      İkisi de eskiden oturum başında kuruluyordu, cep yolu ekran kapanınca
      hazır olsun diye. Ölçüm bunun bedelini gösterdi: tutulan akış (parçaları
      kapalı bile olsa) tarayıcı tanıyıcısını sağırlaştırıyor — sahibin
      telefonunda altı dinlemenin altısı boş — ve Bluetooth'ta okumayı telefon
      yoluna düşürüyordu. Ekranda kip artık dersle aynı: yalnız tanıyıcı.
      Cep yolu "Cebe koy" ile, o an kuruluyor (bkz. `arm`).

      Sunucu STT'nin hazır olup olmadığı yine şimdi soruluyor: düğme ona göre
      gösteriliyor.
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
    startedAt.current = Date.now();
    ended.current = false;
    armed.current = false;
    reask.current = false;
    disarmWhenIdle.current = false;
    setPocket("off");
    setStatus("playing");
    track("walk_start", from);
    void loop(rounds, from);
  }

  /** "Cebe koy" dokunuşu — okumaz, döngüye not bırakır (bkz. `announce`). */
  async function toPocket() {
    const ok = await arm();
    announce.current = ok ? "Cebe alındı. Ekranı kapatabilirsin." : "Mikrofon açılamadı; ekranda devam ediyoruz.";
  }

  /**
   * "Cebe koy" — ekranı KARARTIR ama kapatmaz (bkz. `screenDark`).
   *
   * Ekran açık kaldığı için tarayıcının tanıyıcısı (ekrandaki kusursuz yol)
   * cepte de çalışıyor; HyperOS'un ekran-kapanınca-sustur davranışına hiç
   * girilmiyor. Wake lock tur başında zaten alındı; burada teyit ediliyor.
   */
  function darken() {
    void acquire();
    darkTaps.current = [];
    setScreenDark(true);
    track("walk_switch", 1, "dark");
    announce.current = "Ekranı karartıyorum, açık kalacak. Telefonu cebine koyabilirsin. Çıkmak için ekrana üç kez dokun.";
  }

  /** Karanlık katmana dokunuş — 1,2 sn içinde üç kez olursa çıkılır. */
  function onDarkTap() {
    const now = Date.now();
    darkTaps.current = [...darkTaps.current.filter((t) => now - t < 1200), now];
    if (darkTaps.current.length >= 3) {
      darkTaps.current = [];
      setScreenDark(false);
      track("walk_switch", 0, "dark-exit");
    }
  }

  function pause() {
    if (!ended.current) track("walk_end", 6);
    ended.current = true;
    stopAll();
    void release();
    stopPocketAudio();
    // Mikrofon KAPATILIYOR: açık bir yakalama, cihazda kayıt göstergesini
    // yanık bırakıyor ve duraklatılmış bir turda bunun karşılığı yok.
    closeMic();
    armed.current = false;
    setPocket("off");
    setStatus("paused");
  }

  useEffect(() => {
    pauseRef.current = pause;
  });

  function leave() {
    if (!ended.current && status === "playing") track("walk_end", 6);
    ended.current = true;
    stopAll();
    void release();
    stopPocketAudio();
    closeMic();
    onExit();
  }

  /**
   * Ekran kapanınca ne olacağı kipe bağlı.
   *
   * Cepte kipinde HİÇBİR ŞEY: mikrofon akışı arka planda yaşamaya devam
   * ediyor, sesler ses öğesiyle çalıyor ve tur olduğu gibi sürüyor. Modun
   * asıl vaadi bu; döngü zaten ekranın kapanmasını bekliyordu.
   *
   * Ekran kipinde tur duruyor — ama SESSİZCE değil. Mikrofon kilitli ekranda
   * istenemiyor, tanıyıcı da gizli sayfada susuyor; yapılabilecek dürüst tek
   * şey sebebi ve çaresini söylemek. Ekran kipinde ekranı kapatmadan cebe
   * koymak zaten mümkün (ekran kilidi ekranı açık tutuyor).
   */
  useEffect(() => {
    if (status !== "playing") return;
    const onChange = () => {
      const hidden = document.visibilityState === "hidden";
      if (hidden) {
        if (armed.current) {
          disarmWhenIdle.current = false;
          return;
        }
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
              lang: "tr",
              text: "Ekran kapanınca sesini duyamıyorum. Turu durdurdum. Cepte devam etmek için ekranı kapatma; Cebe koy'a basınca ekran kararır ama açık kalır.",
            },
          ],
          undefined,
          undefined,
          { background: true },
        );
        return;
      }
      // Ekran geri açıldı: cepte kipinden çıkılıyor — tutulan mikrofon
      // tanıyıcıyı bozuyor, ekranda kipin tek yolu tanıyıcı. Süren bir kayıt
      // varsa bitmesi bekleniyor: tamponu şimdi silmek, cebe söylenmiş cevabı
      // yakmak olurdu.
      if (armed.current) {
        if (recording.current) disarmWhenIdle.current = true;
        else disarm("visible");
        note("ekran açıldı → tarayıcı");
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, [status, stopAll, release, note, disarm]);

  // ── Görünüm ────────────────────────────────────────────────────────

  const total = session?.rounds.length ?? 0;

  if (status === "loading") return <Frame><p className="muted">Tur hazırlanıyor…</p></Frame>;

  if (status === "error")
    return (
      <Frame>
        <h2 className="text-lg font-bold">Tur açılamadı</h2>
        <p className="muted mt-2 text-sm">Bağlantını kontrol edip tekrar dene.</p>
        <button onClick={leave} className="btn btn-ghost mt-5 w-full px-5 py-3">Geri dön</button>
      </Frame>
    );

  if (status === "empty")
    return (
      <Frame>
        <h2 className="text-lg font-bold">Bugünlük tur yok</h2>
        <p className="muted mt-2 text-sm">Tekrar zamanı gelen kelime kalmamış.</p>
        <button onClick={leave} className="btn btn-ghost mt-5 w-full px-5 py-3">Geri dön</button>
      </Frame>
    );

  if (status === "unsupported")
    return (
      <Frame>
        <h2 className="text-lg font-bold">Bu tarayıcı sesli cevabı desteklemiyor</h2>
        <p className="muted mt-2 text-sm">
          Yürürken modu tarayıcının konuşma tanıyıcısına dayanıyor. Chrome ya da Safari&apos;de
          çalışıyor; Firefox&apos;ta henüz yok.
        </p>
        <button onClick={leave} className="btn btn-ghost mt-5 w-full px-5 py-3">Geri dön</button>
      </Frame>
    );

  if (status === "denied")
    return (
      <Frame>
        <h2 className="text-lg font-bold">Mikrofon izni yok</h2>
        <p className="muted mt-2 text-sm">
          Ekransız tur için mikrofon gerekiyor. Tarayıcının site ayarlarından izin verip
          tekrar dene.
        </p>
        <button onClick={leave} className="btn btn-ghost mt-5 w-full px-5 py-3">Geri dön</button>
      </Frame>
    );

  if (status === "ready" || status === "paused")
    return (
      <Frame>
        <h2 className="text-xl font-bold">
          {status === "paused" ? "Duraklatıldı" : "Yürürken"}
        </h2>
        <p className="muted mt-2 text-sm leading-relaxed">
          Türkçesini duyacaksın, Almancasını söyleyeceksin. Yanlışta doğrusu okunur, duyulmayan
          tur yanlış sayılmaz. Yirmi tur bitince <strong>“devam edelim mi?”</strong> diye
          sorulur; “evet” demen yeter.
        </p>
        <p className="muted mt-2 text-sm leading-relaxed">
          Telefonu cebine koyacaksan <strong>Cebe koy</strong>&apos;a bas: ekran kararır ama
          açık kalır, tanıyıcı dinlemeyi sürdürür. Güç tuşuyla kapatma — ekran kapanınca
          telefon mikrofonu susturur.
        </p>
        {pocketReady === false ? (
          <p
            className="mt-3 rounded-xl px-3 py-2.5 text-sm leading-relaxed"
            style={{
              background: "color-mix(in srgb, var(--color-flame) 10%, transparent)",
              color: "var(--color-flame)",
            }}
          >
            Bu kurulumda ekran kapalıyken ses yakalanamıyor: tur sürer ama cevapların
            duyulmaz. Cepte çalışması için sunucuda bir konuşma tanıma anahtarı
            (<code>AZURE_SPEECH_KEY</code> ya da <code>DEEPGRAM_API_KEY</code>) tanımlı olmalı.
          </p>
        ) : null}
        {status === "paused" ? (
          <p
            className="mt-3 rounded-xl px-3 py-2.5 text-sm"
            style={{
              background: "color-mix(in srgb, var(--color-flame) 10%, transparent)",
              color: "var(--color-flame)",
            }}
          >
            Ses gelmediği ya da uygulamadan çıkıldığı için durduruldu. Cevapların kaydedildi.
          </p>
        ) : null}
        <div className="mt-4 rounded-xl px-3 py-2.5 text-center text-sm" style={{ background: "var(--surface-2)" }}>
          <span className="muted">Kaldığın yer: </span>
          <strong>{Math.min(index + 1, total)}</strong>
          <span className="muted"> / {total} tur</span>
        </div>
        <button
          onClick={() => void start(index)}
          className="btn btn-primary mt-5 w-full px-5 py-4 text-base"
        >
          {status === "paused" ? "Devam et" : "Kulaklığı tak, başla"}
        </button>
        <button onClick={leave} className="btn btn-ghost mt-2 w-full px-5 py-3">Geri dön</button>
      </Frame>
    );

  if (status === "done")
    return (
      <Frame>
        <h2 className="text-2xl font-bold">Yürüyüş bitti</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-mint)" }}>
          {tally.correct}/{tally.total} doğru
          {walkRef.current.sessions > 1 ? ` · ${walkRef.current.sessions} tur` : ""}
        </p>
        <p className="muted mt-2 text-sm">
          Cevapların kaydedildi: tekrar planın, günlük hedefin ve serin güncellendi.
        </p>
        <button onClick={leave} className="btn btn-primary mt-5 w-full px-5 py-3.5">Bitir</button>
      </Frame>
    );

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
          className="fixed inset-0 z-[120] flex flex-col items-center justify-end"
          style={{ background: "#000", touchAction: "none" }}
        >
          <p className="mb-24 px-8 text-center text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.22)" }}>
            Ekran karanlık ama açık — dinliyorum, akış kulakta.
            <br />
            Çıkmak için üç kez dokun.
          </p>
        </div>
      ) : null}

      <div className="mb-4 flex items-baseline justify-between text-xs font-semibold">
        <span className="muted">{index + 1} / {total}</span>
        <span className="flex items-center gap-2">
          {/* Kip ekranda yazıyor: cepte kipinde cevaplar ölçülmüyor ve bunu
              bilmeyen kullanıcı "neden sayı artmıyor" diye sorardı. */}
          {/* Yakalama yöntemi ekranda: tarayıcı tanıyıcısıyla çalışılıyorsa
              ekranın açık kalması gerektiğini bilmek gerekiyor. */}
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            style={{
              background:
                capture === "stt"
                  ? "color-mix(in srgb, var(--color-mint) 16%, transparent)"
                  : "color-mix(in srgb, var(--color-flame) 14%, transparent)",
              color: capture === "stt" ? "var(--color-mint)" : "var(--color-flame)",
            }}
          >
            {capture === "stt" ? "cepte" : "ekran açık"}
          </span>
          <span className="muted tabular-nums">{tally.correct}/{tally.total} doğru</span>
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
              style={{ background: "color-mix(in srgb, var(--color-mint) 16%, transparent)", color: "var(--color-mint)" }}
            >
              <MicIcon size={28} />
            </motion.span>
            <p className="mt-3 text-lg font-bold">Devam edelim mi?</p>
            <p className="muted mt-1 text-sm">
              {phase === "listening" ? "“evet” ya da “hayır” de" : "…"}
            </p>
          </>
        ) : phase === "listening" ? (
          <>
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background: "color-mix(in srgb, var(--color-brand) 16%, transparent)",
                color: "var(--color-brand)",
              }}
            >
              <MicIcon size={28} />
            </motion.span>
            <p className="mt-3 text-lg font-bold">{prompt?.tr}</p>
            <p className="muted mt-1 text-sm">Almancasını söyle</p>
          </>
        ) : verdict ? (
          <>
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background:
                  verdict === "correct"
                    ? "color-mix(in srgb, var(--color-mint) 18%, transparent)"
                    : "color-mix(in srgb, var(--color-flame) 18%, transparent)",
                color: verdict === "correct" ? "var(--color-mint)" : "var(--color-flame)",
              }}
            >
              {verdict === "correct" ? <CheckIcon size={28} /> : <XIcon size={28} />}
            </span>
            <p className="mt-3 text-lg font-bold">{prompt?.de}</p>
            <p className="muted mt-1 text-sm">
              {verdict === "correct" ? "Doğru" : verdict === "unheard" ? "Duyamadım" : prompt?.tr}
            </p>
            {verdict === "wrong" && heardText ? (
              <p className="muted mt-2 text-xs">
                duyduğum: <span className="font-semibold">“{heardText}”</span>
              </p>
            ) : null}
          </>
        ) : (
          <>
            <p className="text-lg font-bold">{prompt?.tr ?? "…"}</p>
            <p className="muted mt-1 text-sm">Okunuyor…</p>
          </>
        )}
      </motion.div>

      {diag ? (
        <div
          className="mt-4 rounded-xl px-3 py-2 font-mono text-[11px] leading-snug"
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
        <button onClick={darken} className="btn btn-primary mt-6 w-full px-5 py-4 text-base">
          Cebe koy · ekranı karart
        </button>
      ) : null}
      <button onClick={pause} className={`btn btn-ghost ${browserRef.current ? "mt-2" : "mt-6"} w-full px-5 py-4 text-base`}>
        Duraklat
      </button>
      <button onClick={leave} className="btn btn-ghost mt-2 w-full px-5 py-3">
        Bitir
      </button>
    </Frame>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="card p-6">{children}</div>
    </div>
  );
}
