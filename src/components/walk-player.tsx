"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { miss } from "@/lib/errors";
import { motion } from "framer-motion";
import { speakSegments, stopSpeaking, type SpeechSegment } from "@/components/speak-button";
import { useListen } from "@/components/use-listen";
import { spokenMatches } from "@/components/games/types";
import { parseConfirm } from "@/lib/voice-intent";
import { useWakeLock } from "@/components/use-wake-lock";
import {
  pocketCue,
  startPocketAudio,
  stopPocketAudio,
  updatePocketTitle,
} from "@/components/pocket-audio";
import {
  activateMic,
  closeMic,
  deactivateMic,
  micHeld,
  micSettings,
  micSupported,
  openMic,
  recordClip,
  sttAvailable,
  transcribe,
} from "@/components/pocket-mic";
import { withDeadline } from "@/components/pocket-clock";
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
 * Ekran KAPANDIĞINDA ne olacağı ayrı bir sorun ve iki kipi zorunlu kıldı.
 * Ekran kilidi yalnızca boşta kalmayı engelliyor; kullanıcı güç tuşuna basıp
 * telefonu cebine attığında ekran yine kapanıyor ve konuşma tanıyıcı susuyor.
 * Web'de arka planda konuşma tanıma yok — bu bir eksik değil, mikrofonun
 * görünmez biçimde açık kalmasını engelleyen bilinçli bir platform kararı.
 *
 *   - **Sesli cevap** kipi ölçüyor ama ekranın açık kalmasını istiyor.
 *   - **Cepte** kipi ölçmüyor: Türkçesini okuyor, tekrar etmen için susuyor,
 *     sonra Almancasını okuyor. Ekran kapalıyken çalışıyor.
 *
 * Ekran kapanırsa ölçen kip DURMUYOR, cepte kipine düşüyor ve bunu sesle
 * söylüyor. Durmak, kullanıcının cebinden çıkardığında hiçbir şey olmamış
 * bulmasıydı — asıl şikâyet buydu.
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
/** Tarayıcı tanıyıcısı için sessizlik tavanı — ardından kayıt yolu deneniyor. */
const BROWSER_SILENCE_MS = 4000;
/** Kaç boş denemeden sonra tarayıcı tanıyıcısı bu oturumda bırakılır. */
const BROWSER_GIVE_UP = 2;
/** Kaç ardışık başarısız kayıttan sonra tur durur. */
const CAPTURE_FAIL_LIMIT = 2;

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
  /**
   * Tarayıcı tanıyıcısı üst üste kaç kez boş döndü.
   *
   * Tanıyıcı "var" görünüp hiç sonuç vermeyebiliyor (ağ yok, motor kapalı,
   * bazı tarayıcılarda sessizce düşüyor). O durumda her cevap önce onu bekler,
   * sonra kayıt yolunu — yani süre ikiye katlanırdı. İki boş denemeden sonra
   * oturum boyunca bırakılıyor.
   */
  const browserMisses = useRef(0);
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
      // Cepte kipinde ses ÖĞESİ yolu zorlanıyor: telefon kilitlendiğinde
      // `AudioContext` askıya alınıyor ve WebAudio ile çalan her şey susuyor.
      speakSegments(
        segments,
        () => {
          speakDone.current = null;
          resolve();
        },
        undefined,
        // Ses ÖĞESİ yolu her zaman: telefon kilitlendiğinde `AudioContext`
        // askıya alınıyor ve WebAudio ile çalan her şey susuyor. Ses öğeleri
        // çalmaya devam ediyor — podcast uygulamalarının çalışma biçimi bu.
        { background: true },
      );
    });
    // Son kapı: okuma çözülmezse tur burada kalırdı (bkz. SPEAK_CAP_MS).
    return withDeadline(spoken, SPEAK_CAP_MS, undefined);
  }, []);

  /**
   * Bir cevabı dinler ve duyduğu adayları döndürür.
   *
   * İki yol da aynı sözleşmeyi veriyor, böylece tur döngüsü hangisinin
   * kullanıldığını bilmek zorunda kalmıyor.
   *
   * `stt` yolunda kayıt penceresi SABİT. Sessizlik algılamak için WebAudio
   * çözümleyicisi kullanılabilirdi ama ekran kapandığında `AudioContext`
   * askıya alınıyor ve çözümleyici tam ihtiyaç duyulan yerde duruyor.
   */
  const hearOnce = useCallback(
    async (
      lang: "de" | "tr",
      windowMs: number,
      expected = "",
      /** Ara sonuç bunu geçerse dinleme HEMEN kapanır (bkz. use-listen). */
      accept?: (alternatives: string[]) => boolean,
    ): Promise<string[]> => {
      /*
        Sıra: sayfa GÖRÜNÜRKEN önce tarayıcının kendi tanıyıcısı.

        Ölçülebilir bir tercih değil, kullanılabilir bir gerçek: o tanıyıcı
        kısa cevaplarda belirgin biçimde daha iyi anlıyor, anında cevap
        veriyor ve hiçbir şeye mal olmuyor. Kayıt + sunucuda yazıya çevirme
        yolu ise ekran kapandığında çalışabilen TEK yol — `SpeechRecognition`
        sayfa görünmezken susuyor.

        Yani ikisi rakip değil: biri kaliteyi, diğeri kapsamı veriyor. Boş
        dönen tanıyıcının ardından kayıt yolu yine deneniyor, çünkü tek bir
        turu kaybetmek gereksiz.
      */
      const visible = typeof document === "undefined" || document.visibilityState === "visible";

      if (browserRef.current && visible) {
        // Sessizlik tavanı burada daha dar: tanıyıcının kendi bitiş algısı var,
        // tavan yalnızca hiç ses gelmediğinde devreye giriyor ve arkasından
        // kayıt yolu deneneceği için uzun tutmanın bedeli iki kat bekleme.
        const heard = await listen({
          lang: lang === "tr" ? "tr-TR" : "de-DE",
          silenceMs: Math.min(windowMs, BROWSER_SILENCE_MS),
          maxMs: Math.min(windowMs, BROWSER_SILENCE_MS),
          accept,
          // İşaret tanıyıcı BAŞLADIKTAN sonra çalıyor: kullanıcı bipi duyduğu
          // anda mikrofon zaten dinliyor, yani bipi beklemesi gerekmiyor.
          // Ses öğesiyle veriliyor çünkü WebAudio yolu ekran kapalıyken askıda.
          onOpen: pocketCue,
        });
        if (heard.alternatives.length) {
          browserMisses.current = 0;
          return heard.alternatives;
        }
        browserMisses.current += 1;
        if (browserMisses.current >= BROWSER_GIVE_UP) browserRef.current = false;
      }

      /*
        Görünürlük YENİDEN okunuyor.

        Ekran, tanıyıcı dinlerken kapanabiliyor — kullanıcı soruyu duyup
        telefonu cebine koyduğunda tam olarak bu oluyor. Tanıyıcı o anda
        susuyor ve elinde bir şey olmadan dönüyor. Girişteki "görünürdü"
        bilgisiyle karar verilince kayıt yolu denenmiyor ve ekranın
        kapanmasına denk gelen soru daima "duyamadım" oluyordu.
      */
      const stillVisible =
        typeof document === "undefined" || document.visibilityState === "visible";

      // Kayıt yolu yalnızca ekran kapalıyken (ya da tanıyıcı hiç yokken).
      if (sttReady.current && (!stillVisible || !browserRef.current)) {
        /*
          İşaret kaydın İÇİNDEN veriliyor.

          Kaydedici zaten dönüyor ve klip halka tampondan geriye doğru
          kesiliyor, yani bipten önce söylenen de klibe giriyor. Kullanıcının
          bipi bekleyip sonra konuşması gerekmiyor — "kesinti olmadan
          yapabileyim" istenen şey bu.
        */
        pocketCue();
        // Kayıt konuşma bitince kendiliğinden kapanıyor; `windowMs` sabit
        // pencere değil ÜST SINIR.
        const clip = await recordClip(windowMs);
        if (clip) {
          captureFails.current = 0;
          return transcribe(clip.blob, lang, expected);
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
        if (captureFails.current >= CAPTURE_FAIL_LIMIT) {
          captureFails.current = 0;
          track("walk_end", 4);
          await say([
            { lang: "tr", text: "Mikrofona ulaşamıyorum. Turu durdurdum, telefonu açınca devam edelim." },
          ]);
          pauseRef.current();
        }
      }

      return [];
    },
    [listen, say],
  );

  /**
   * Dinlemenin süreye bağlanmış hâli — döngünün kullandığı budur.
   *
   * İçerideki her yolun kendi sınırı var ama hiçbiri kesin değil: tanıyıcı
   * `onend` vermeyebiliyor, kaydedici parça üretmeyi bırakabiliyor, ağ
   * kopabiliyor. Bunların hepsi aynı sonucu veriyordu — tur o satırda donuyor
   * ve kullanıcı cepteki telefondan bir daha hiçbir şey duymuyor.
   *
   * Süre dolarsa "duyulmadı" dönüyor. Bu bir kayıp ama turu öldürmüyor:
   * duyulmayan cevap zaten yanlış sayılmıyor (bkz. UNHEARD_IS_NOT_WRONG).
   */
  const hear = useCallback(
    (
      lang: "de" | "tr",
      windowMs: number,
      expected = "",
      accept?: (alternatives: string[]) => boolean,
    ): Promise<string[]> =>
      withDeadline(
        hearOnce(lang, windowMs, expected, accept),
        windowMs + HEAR_SLACK_MS,
        [] as string[],
      ),
    [hearOnce],
  );

  const stopAll = useCallback(() => {
    run.current++;
    stopSpeaking();
    cancel();
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
      stopAll();
      stopPocketAudio();
      closeMic();
    },
    [stopAll],
  );

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
          const heard = await hear("de", ANSWER_WINDOW_MS, target, (alts) =>
            spokenMatches(alts, [target, word.de]),
          );
          if (!alive()) return;

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
              await say([
                {
                  lang: "tr",
                  text:
                    captureRef.current === "browser"
                      ? "Sesini duyamıyorum. Bu tarayıcıda ekranın açık kalması gerekiyor."
                      : "Sesini duyamıyorum. Turu durdurdum, hazır olunca devam et.",
                },
              ]);
              if (!alive()) return;
              track("walk_end", 3);
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
      Mikrofon GÖRÜNÜRKEN AÇILMIYOR ve sebebi ölçülmüş bir kusur.

      Önceki sürüm oturum başında `getUserMedia` ile mikrofonu açıp kaydediciyi
      sürekli çalıştırıyordu. Aynı anda tarayıcının konuşma tanıyıcısı da
      mikrofonu istiyor ve iki tüketici birbirini bozuyor: kullanıcı ekran
      açıkken bile tanımanın belirgin biçimde kötüleştiğini bildirdi.

      Artık sıra net: sayfa görünürken mikrofon tamamen tanıyıcının, kayıt yolu
      hiç kurulmuyor. Ekran kapandığında (tanıyıcı zaten susuyor) mikrofon
      açılıp kayıt devreye giriyor, ekran geri açılınca kapatılıyor.
    */
    /*
      Mikrofon akışı oturum başında, EKRAN AÇIKKEN alınıyor.

      Gerçek telefonda ekran kilitlendikten sonra `getUserMedia` reddediliyor:
      kullanıcı ekranı kapattığında mikrofonu açmaya çalışan akış isteği anında
      düşürüyor ve cevap, mikrofon açılma sesiyle AYNI ANDA "duyamadım"
      oluyordu. Bildirilen davranış buydu.

      Akış alınıyor ama parçaları KAPALI: tarayıcının konuşma tanıyıcısıyla
      çekişmesin diye. Ekran kapandığında yalnızca açılması yetiyor.
    */
    sttReady.current = micSupported() && (await sttAvailable()) && (await openMic());
    const startWithBrowser = browserRef.current;
    if (!startWithBrowser && sttReady.current) activateMic();
    captureRef.current = startWithBrowser ? "browser" : "stt";
    setCapture(startWithBrowser ? "browser" : "stt");

    if (!browserRef.current && !sttReady.current) return setStatus("unsupported");

    // Ekran kilidi ve sessiz döngü DOKUNUŞUN İÇİNDE kuruluyor: kullanıcı
    // hareketi olmadan çalmaya başlayan ses reddediliyor.
    void acquire();
    startPocketAudio("Wortspiel · Yürürken", {});
    resetCombo();
    heardLog.current = [];
    askedIds.current = new Set();
    startedAt.current = Date.now();
    setStatus("playing");
    track("walk_start", from);
    // Kısıtın gerçekten uygulanıp uygulanmadığı kayda geçiyor: bozuk ses
    // şikâyetini tahmin ederek değil, veriye bakarak ayırt edebilelim.
    if (sttReady.current) track("walk_capture", micSettings()?.echoCancellation ? 1 : 0);
    void loop(rounds, from);
  }

  function pause() {
    track("walk_end", 6);
    stopAll();
    void release();
    stopPocketAudio();
    // Mikrofon KAPATILIYOR: açık bir yakalama, cihazda kayıt göstergesini
    // yanık bırakıyor ve duraklatılmış bir turda bunun karşılığı yok.
    closeMic();
    setStatus("paused");
  }

  useEffect(() => {
    pauseRef.current = pause;
  });

  function leave() {
    stopAll();
    void release();
    stopPocketAudio();
    closeMic();
    onExit();
  }

  /**
   * Ekran kapanınca tur DURMUYOR, cepte kipine düşüyor.
   *
   * Ekran kilidi yalnızca boşta kalmayı engelliyor; kullanıcı güç tuşuna basıp
   * telefonu cebine attığında ekran yine kapanıyor ve konuşma tanıyıcı
   * susuyor. Önceki sürüm burada turu durduruyordu ve şikâyet tam olarak
   * buydu: cepten çıkarınca hiçbir şey olmamış oluyordu.
   *
   * Artık ölçüm bırakılıyor, okuma sürüyor. Ekran geri açıldığında ölçen kipe
   * dönülüyor — ikisi de sesle duyuruluyor, çünkü kullanıcı ekrana bakmıyor.
   */
  /**
   * Ekran kapanınca ne olacağı yakalama yöntemine bağlı.
   *
   * Kayıt yolunda HİÇBİR ŞEY: mikrofon akışı arka planda yaşamaya devam
   * ediyor, sesler ses öğesiyle çalıyor ve tur olduğu gibi sürüyor. Modun
   * asıl vaadi bu.
   *
   * Tarayıcı tanıyıcısı yolunda tur duruyor, çünkü orada yapılabilecek bir
   * şey yok: `SpeechRecognition` yalnızca sayfa görünürken çalışıyor ve bu
   * bir eksik değil, mikrofonun görünmez biçimde açık kalmasını engelleyen
   * bilinçli bir platform kararı.
   */
  useEffect(() => {
    if (status !== "playing") return;
    const onChange = () => {
      const hidden = document.visibilityState === "hidden";
      if (hidden) {
        // Tanıyıcı burada zaten susuyor; mikrofon artık kayıt yolunun.
        // Akış zaten elimizde — yalnızca açılıyor, yeniden istenmiyor.
        if (sttReady.current && micHeld()) {
          captureRef.current = "stt";
          setCapture("stt");
          activateMic();
          return;
        }
        /*
          Kayıt yolu yoksa tur duruyor — ama SESSİZCE değil.

          Önceki hâli tam da kullanıcının anlattığı şeydi: ekran kapanıyor ve
          o andan sonra hiçbir şey olmuyor. Kelime okunmuyor, "duyamadım"
          denmiyor, sıradakine geçilmiyor. Cepteki kullanıcı için bu, sebebi
          olmayan bir ölüm: telefonu çıkarıp ekrana bakana kadar turun durduğunu
          bile bilmiyor.

          Sıra önemli: önce döngü durduruluyor (yoksa yarıda kalan bir okuma
          duyuruyla çakışır), sonra sebep söyleniyor. Duyuru döngünün `say`ini
          kullanmıyor çünkü o artık geçersiz bir jetona bağlı.
        */
        track("walk_end", 5);
        stopAll();
        void release();
        setStatus("paused");
        speakSegments(
          [
            {
              lang: "tr",
              text: "Ekran kapandığında sesini duyamıyorum. Turu durdurdum, telefonu açınca devam edelim.",
            },
          ],
          undefined,
          undefined,
          { background: true },
        );
        return;
      }
      // Ekran geri açıldı: kayıt durup parçalar susturuluyor, ama akış
      // BIRAKILMIYOR — ekran yeniden kapanabilir ve o an yeniden istemek
      // reddedilirdi.
      if (browserRef.current) {
        deactivateMic();
        captureRef.current = "browser";
        setCapture("browser");
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, [status, stopAll, release]);

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
          Türkçesini duyacaksın, Almancasını söyleyeceksin. Kulaklığını tak, telefonu cebine
          koy. Yanlışta doğrusu okunur, duyulmayan tur yanlış sayılmaz. Yirmi tur bitince
          <strong> “devam edelim mi?”</strong> diye sorulur; “evet” demen yeter.
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
            (<code>DEEPGRAM_API_KEY</code>) tanımlı olmalı.
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

      {/* Düğmeler bilerek büyük: yürürken ve bakmadan basılıyor. */}
      <button onClick={pause} className="btn btn-ghost mt-6 w-full px-5 py-4 text-base">
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
