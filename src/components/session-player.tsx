"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GAME_LABEL_KEYS,
  PLAYABLE_GAMES,
  type Answer,
  type AnswerResult,
  type MissedWord,
  type PlayableGame,
  type Round,
  type SessionPayload,
  type SessionProgress,
  type Wager,
} from "@/lib/types";
import type { GameResult } from "@/components/games/types";
import { GameSwitch } from "@/components/game-switch";
import { EASE_AFTER_MISSES, easeRound, isProductionGame } from "@/lib/ladder";
import { LevelBadge } from "@/components/level-badge";
import { prefetchGerman } from "@/components/speak-button";
import { Confetti, CountUp } from "@/components/celebrate";
import { play, resetCombo } from "@/lib/sfx";
import { vibrate } from "@/lib/fx";
import { track } from "@/lib/track";
import { FitBox } from "@/components/fit-box";
import { PushOptIn } from "@/components/push-optin";
import { ShareResult } from "@/components/share-result";
import { Mascot } from "@/components/mascot";
import { MascotPop } from "@/components/mascot-pop";
import { MascotFx } from "@/components/mascot-fx";
import { Stagger } from "@/components/reveal";
import { CoachBubble } from "@/components/coach-bubble";
import { LearnHeader } from "@/components/app-header";
import { AlertIcon, FlameIcon, RefreshIcon, SparkIcon, XIcon } from "@/components/icons";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useLeaveGuard } from "@/lib/use-leave-guard";
import { readCache, writeCache } from "@/lib/use-cached";
import { useT } from "@/lib/i18n/client";
import { localDay } from "@/lib/day";
import { flushPendingAnswers, isPermanentStatus, queueAnswers } from "@/lib/answer-queue";

/**
 * Turun durumları.
 *
 * `challenge`/`daily`/`walk` BURADAN KALKTI: üçü de oturum oynatıcısının bir
 * durumuydu ve aynı adreste başka bir mod başlatıyordu — paylaşılamayan,
 * yer imine alınamayan, tarayıcı geri düğmesiyle çıkılamayan modlar. Artık
 * kendi adreslerindeler (`/learn/daily`, `/learn/walk`, `/learn/challenge`).
 */
type Status = "loading" | "ready" | "playing" | "stage" | "done" | "empty" | "error";

/**
 * Bir etaptaki tur sayısı.
 *
 * Oturum 20 turluk tek bir blok olarak sunuluyordu ve ölçüm bunun bir duvar
 * olduğunu gösterdi: yedi kullanıcının yedisinde son kayıtlı durum "tur
 * kuruldu, hiç oynanmadı" idi — uygulamayı açıp 20 turu görüp kapatmışlardı.
 * Beşerli etaplar aynı turu bitirilebilir parçalara bölüyor; her etap sonunda
 * durmak da devam etmek de meşru bir seçenek oluyor ve yarım kalan tur zaten
 * sunucuda saklandığı için ertesi gün kaldığı yerden sürüyor.
 */
const STAGE_SIZE = 5;

/**
 * Tek oyunlu tur YALNIZ adresten gelir: `?game=…`.
 *
 * Seçim bir süre cihazda saklanıyordu ("oyun modu bir tercih, kullanıcı
 * değiştirene kadar geçerli kalmalı") ve o karar Öğren merkezindeki günlük
 * tur kartını bozuyordu: bir kez Pratik'ten Artikel Yarışı açan kullanıcı,
 * sonra kartın kendisine bastığında yine artikel turuna düşüyor ve karışık
 * tura dönmenin bir yolu kalmıyordu. Pratik bağımsız bir ekran (`/learn/practice`)
 * olduğundan beri seçimi saklamanın bir karşılığı da yok — kullanıcı hangi
 * pratiği istiyorsa oradan seçiyor.
 *
 * Mobilde kural baştan böyle: `GameScreen` oyunu yalnız yönlendirme
 * parametresinden okuyor, hiçbir yere yazmıyor.
 */
function readGameParam(): PlayableGame | null {
  try {
    const raw = new URLSearchParams(window.location.search).get("game");
    return raw && (PLAYABLE_GAMES as readonly string[]).includes(raw) ? (raw as PlayableGame) : null;
  } catch {
    return null;
  }
}

type ErrorKind = "auth" | "db" | "network";

/**
 * Önbellek anahtarı: gün ve oyun kipi.
 *
 * Gün, çünkü tur günlük. Kip, çünkü "yalnızca Çevir" seçiliyken saklanan
 * kuyruk karışık turun kartını yanlış gösterirdi.
 */
function sessionKey(game: PlayableGame | null): string {
  return `session:${game ?? "mixed"}:${localDay()}`;
}

/**
 * Kelime turu. Başlangıç kartı YOK — açılır açılmaz oynanıyor.
 *
 * `leaderboard` propu kalktı: sıralama oyunun başlangıç kartında duruyordu,
 * artık Öğren merkezinde (`components/learn/learn-hub`).
 */
export function SessionPlayer() {
  const t = useT();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [index, setIndex] = useState(0);
  const [tally, setTally] = useState({ correct: 0, total: 0, xp: 0 });
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [errorKind, setErrorKind] = useState<ErrorKind>("db");
  /**
   * Kaydetme uyarısı — iki ayrı durum, iki ayrı söz.
   *
   *   "retry"   — geçici: ağ yok ya da sunucu hata verdi. Cevaplar duruyor ve
   *               bağlantı dönünce gönderiliyor.
   *   "dropped" — kalıcı: sunucu isteği REDDETTİ (4xx). Yeniden denemek aynı
   *               cevabı verir; o turun cevapları düşürülüyor.
   *
   * Ayrım, bildirilen hatanın ta kendisi yüzünden var. Reddedilen bir istek
   * kuyruğa geri konuyordu ve sonraki her gönderim aynı zehirli cevabı yeniden
   * taşıyordu: bir kez reddedilen tur, oturumun geri kalanında HER kaydı
   * batırıyordu. Tek bir turun bedeli tek bir tur olmalı.
   */
  const [saveWarning, setSaveWarning] = useState<null | "queued" | "dropped">(null);
  const startedAt = useRef(Date.now());
  /** Ekrandaki tur sunucudan mı geldi (önbellekten değil). */
  const fresh = useRef(false);
  /** Süren istek — t("common.start") gerekirse bunu bekliyor. */
  const inflight = useRef<Promise<SessionPayload | null> | null>(null);
  const pending = useRef<Answer[]>([]);
  const sessionXp = useRef(0);
  const missed = useRef<MissedWord[]>([]);
  // Cevapların doğru/yanlış sırası — paylaşılan özetteki kareler bu.
  // `pending` gönderildikten sonra boşaldığı için ayrı tutuluyor.
  const marks = useRef<boolean[]>([]);
  // Yarım kalan tur artık sunucudan gelir; cihazda hiçbir şey saklanmaz.
  const [resumable, setResumable] = useState<SessionProgress | null>(null);
  /* Etkinin içindeki `resumable` kapanışı eskiyor (taze cevap beklenirken
     değişiyor), o yüzden kararı ref'ten okuyoruz. */
  const resumeRef = useRef<SessionProgress | null>(null);
  /** Tek oyunlu tur seçiliyse o oyun; karışık turda null. */
  const [onlyGame, setOnlyGame] = useState<PlayableGame | null>(null);
  /*
    Turdan çıkış onaya bağlı. Yarım bırakılan tur emek kaybı değil (cevaplar
    zaten yazıldı) ama yanlışlıkla basılan bir düğme turu bölerdi; mobilde de
    aynı kural, orada donanım geri tuşu da buraya bağlı (`useBackConfirm`).
  */
  const [confirmExit, setConfirmExit] = useState(false);
  /* Ayrilmanin OTEKI yollari da ayni onaya bagli: yenileme, sekmeyi kapatma
     ve uygulamanin kendi bagalantilari (kenar cubugu turun icinde de
     duruyor). Android'de o yuzeyler ekranda yok, donanim geri tusu da bu
     diyaloga bagli (`useBackConfirm`). */

  /**
   * Turdan çıkış — Öğren merkezine döner.
   *
   * `router.refresh()` şart: tur XP ve seri kazandırmış olabilir, merkez o
   * sayıları sunucudan okuyor. Yan modların çıkışı da aynı (`ModeScreen`).
   */
  const exit = useCallback(() => {
    router.push("/learn");
    router.refresh();
  }, [router]);
  const ayril = useLeaveGuard(status === "stage");
  /**
   * Seçimin `load` tarafından okunabilen kopyası.
   *
   * `load` bilerek kimliği sabit bir geri çağrı (bkz. aşağıdaki bağımlılık
   * notu) ve bu yüzden içinden okuduğu durum ilk render'daki değerde donuyordu:
   * seçim yapılsa bile `load()` her zaman `null` görüyor, yani tur bitip
   * "devam et" denildiğinde kullanıcı sessizce karışık tura düşüyordu. Ref
   * kimliği değiştirmeden güncel değeri taşıyor.
   */
  const onlyGameRef = useRef<PlayableGame | null>(null);
  /** Turun türü — `session_start` ve `session_done` aynı `kind`i taşısın diye. */
  const sessionKind = useRef<string>("mixed");
  /** Tur `/learn?game=` ile açıldı (zayıf nokta / plan öğesi) — özet koçu için. */
  const targeted = useRef(false);
  /**
   * Üst üste doğru sayısı ve turun en iyisi.
   *
   * Bilerek yalnızca görsel: XP'ye dokunmuyor. Combo çarpanı eklemek, yeni
   * hizalanan puan dengesini (dakikada ~100 XP, bkz. lib/xp.ts) bozar ve
   * kelime oyunlarını becerilerin önüne geçirirdi. Buradaki iş heyecan
   * yaratmak — hayatta kalma turunda combo'nun yaptığı şey, ki ölçümde onu
   * deneyen kullanıcı en sadık kullanıcı çıktı.
   */
  const [combo, setCombo] = useState(0);
  /** Erdi'nin kutlama çıkışını tetikleyen sayaç — değeri değil, değişmesi önemli. */
  const [cheer, setCheer] = useState(0);
  const bestCombo = useRef(0);
  /** Etap özetinde gösterilecek: bu etaba girerken neredeydik. */
  const stageStart = useRef({ index: 0, correct: 0, total: 0, xp: 0 });
  /** Tur bitmeden "şimdilik yeter" denildi mi — özetin başlığı buna bağlı. */
  const stoppedEarly = useRef(false);
  /**
   * Bahis.
   *
   * Etap sınırında isteğe bağlı olarak açılıyor: sonraki beş tur hatasız
   * geçerse o etabın puanı ikiye katlanıyor, iki yanlışta etap hiç puan
   * kazandırmamış oluyor. Ana turda kaybedilecek hiçbir şey olmadığı için
   * kazanılacak bir şey de yoktu; gerilim buradan geliyor.
   *
   * Bayrak `ref` çünkü `handleDone` içinden okunuyor ve o geri çağrı her
   * turda yeniden kurulmuyor — durum olarak tutulsaydı eski değeri görürdü.
   */
  const wagerOn = useRef(false);
  /** Kapanan bahsin sonucu — etap kartında bir kez gösterilir. */
  const [wagerResult, setWagerResult] = useState<number | null>(null);

  /**
   * "Oyun ortasındayım" sinyali.
   *
   * Rozet kutlaması kabukta duruyor ve tetikleyicisi her turdan sonra atılan
   * `lernomi:stats`. Sinyal olmasaydı tam ekran bir kutlama 7. turun
   * ortasında belirir, kutlama olmaktan çıkıp kesinti olurdu. Kabuk bu
   * bayrağı görünce kuyruğu tutuyor ve etap/özet ekranında salıyor.
   */
  useEffect(() => {
    // Yan modlar (günün turu, yürüyüş, hayatta kalma) artık ayrı adreslerde ve
    // aynı sinyali kendileri atıyor (bkz. components/learn/mode-screen).
    window.dispatchEvent(new CustomEvent("lernomi:busy", { detail: { busy: status === "playing" } }));
  }, [status]);

  /* ÖNCEKİ OTURUMDAN KALAN CEVAPLAR. Sekme çevrimdışı kapandıysa kuyrukta
     bekliyorlar; tur ekranı açılınca ilk iş onları göndermek. Android aynı
     şeyi her başarılı gönderimden sonra yapıyor (`flushPendingAnswers`) ve
     burada da her başarılı gönderimde çağrılıyor. */
  useEffect(() => {
    void flushPendingAnswers();
  }, []);

  const load = useCallback(
    async (opts: {
      extra?: boolean;
      fresh?: boolean;
      game?: PlayableGame | null;
      /** Ekranda zaten önbellekten gelen bir kart var — yükleme ekranına düşme. */
      quiet?: boolean;
    } = {}) => {
    if (!opts.quiet) setStatus("loading");
    fresh.current = false;
    // Kapı her yeni kuyrukta yeniden açılıyor: aksi hâlde özet kartındaki
    // "Devam" yeni turu yüklüyor ama kimse başlatmıyordu — ekran "hazır"
    // durumunda, yani yükleme kartında asılı kalıyordu.
    autoStarted.current = false;
    setIndex(0);
    setTally({ correct: 0, total: 0, xp: 0 });
    setResult(null);
    setResumable(null);
    resumeRef.current = null;
    pending.current = [];
    sessionXp.current = 0;
    missed.current = [];
    marks.current = [];
    setCombo(0);
    setCheer(0);
    // Basamak her turda sıfırdan: hafifletme o oturuma ait bir karar.
    setEased(false);
    missStreak.current = 0;
    resetCombo();
    play("start");
    // Tur türü: karışık, tek oyun (hangisi), ek tur — üretim oranı KPI'sını
    // tür bazında okumak için (WP-80).
    /* Tur türü BİR KEZ hesaplanıp saklanıyor: bitişte de aynı `kind` gidiyor
       (bkz. `sessionKind`). Eskiden `session_done` KİND'SIZ yazılıyordu, yani
       bir turun başlangıcı kovalanıyor ama bitişi kovalanmıyordu ve ikisi
       `kind` üzerinden eşleştirilemiyordu. Mobil `GameScreen` ikisine de aynı
       kind'i veriyor (bkz. web-parity §11.31). */
    sessionKind.current = opts.game ? `single:${opts.game}` : opts.extra ? "extra" : "mixed";
    track("session_start", 0, sessionKind.current);
    wagerOn.current = false;
    setWagerResult(null);
    bestCombo.current = 0;
    stoppedEarly.current = false;
    stageStart.current = { index: 0, correct: 0, total: 0, xp: 0 };
    // Seçim `undefined` ise dokunulmuyor, `null` ise karışık tura dönülüyor.
    const game = opts.game === undefined ? onlyGameRef.current : opts.game;
    onlyGameRef.current = game;
    setOnlyGame(game);
    try {
      // "Yeni tura başla" önce kayıtlı turu atar, sonra yenisini ister.
      if (opts.fresh) await fetch("/api/session", { method: "DELETE" });
      const res = await fetch(
        `/api/session?day=${localDay()}${opts.extra ? "&extra=1" : ""}${game ? `&game=${game}` : ""}`,
        {
        cache: "no-store",
      });
      if (res.status === 401) {
        setErrorKind("auth");
        setStatus("error");
        return null;
      }
      if (!res.ok) {
        setErrorKind("db");
        setStatus("error");
        return null;
      }
      const data = (await res.json()) as SessionPayload;
      setSession(data);
      setResumable(data.resume);
      resumeRef.current = data.resume;
      startedAt.current = Date.now();
      /*
        Başlamış tur geri çekilmiyor.

        Açılışta istek "sessiz" gidiyor (ekranda önbellekten çizilmiş bir kart
        var) ve cevabı, tur çoktan başladıktan SONRA dönebiliyor — geliştirme
        modunda React etkiyi iki kez çalıştırdığı için bu her açılışta oluyordu:
        ikinci cevap durumu "hazır"a çekiyor, oynanan tur yükleme kartının
        altında kayboluyordu. Gürültüsüz her yeniden yükleme zaten önce
        "yükleniyor"a düşüyor, yani bu koruma meşru bir tazelemeyi engellemez.
      */
      setStatus((cur) =>
        cur === "playing" || cur === "stage" || cur === "done"
          ? cur
          : data.rounds.length
            ? "ready"
            : "empty",
      );
      // Bir sonraki açılış bu kartı anında çizsin. Yalnızca AÇILIŞ turu
      // saklanıyor: ek tur ve "yeni tur" istekleri o anın sonucu, yarının
      // başlangıç kartı değil. Pratik de saklanmıyor — o her açılışta taze
      // kuruluyor, saklanan kuyruk bir daha hiç okunmazdı.
      if (!opts.extra && !opts.fresh && !game) writeCache(sessionKey(game), data);
      fresh.current = true;
      return data;
    } catch {
      setErrorKind("network");
      setStatus("error");
      return null;
    }
  },
    // Seçim bağımlılık DEĞİL: bağımlılık olsaydı her seçim `load`'u yeniden
    // kurar, açılıştaki etkiyi tetikler ve turu ikinci kez isterdi. Güncel
    // değer ref üzerinden okunuyor (bkz. `onlyGameRef`).
    [],
  );

  useEffect(() => {
    // Adresteki hedefli oyun turu tek oyuna kilitler; tur "zayıf nokta
    // çalışması" sayılır ve özet ekranında Erdi ona göre konuşur (WP-66).
    const game = readGameParam();
    if (game) targeted.current = true;

    /*
      ÖNCE ÖNBELLEK, SONRA TAZELEME (bkz. lib/use-cached).

      Ekran her açılışta t("session.preparing") gösteriyordu ve bu,
      uygulamayı açan herkesin gördüğü ilk şeydi. Oysa kartın söylediklerinin
      çoğu — kaç kelime, hangi seviye, seri, hedef — bir turdan diğerine
      değişmiyor.

      Ama tur verisi bir metin değil: t("common.start") o kuyruğu oynatıyor. Eski bir
      kuyruğu oynatmak, cevaplanmış kelimeleri tekrar sormak demek. Bu yüzden
      önbellek yalnızca KARTI çiziyor; `fresh` bayrağı sunucudan taze kuyruk
      gelene kadar kapalı duruyor ve t("common.start") o ana kadar bekliyor
      (bkz. startFresh). Pratikte fark edilmiyor — istek karta bakma süresinden
      kısa — ama yanlış kuyrukla tur başlaması imkânsız.
    */
    // Pratik her açılışta taze kuruluyor (sunucu da onu saklamıyor), yani
    // saklanacak bir başlangıç kartı yok: önbellek yalnız karışık turun.
    const cached = game ? null : readCache<SessionPayload>(sessionKey(game));
    if (cached?.rounds?.length) {
      setSession(cached);
      setResumable(cached.resume);
      setStatus("ready");
    }
    // İstek `inflight`e alınıyor: önbellekli açılışta t("common.start") bunu bekliyor.
    inflight.current = load({ game, quiet: Boolean(cached?.rounds?.length) });
    void inflight.current;
  }, [load]);

  /**
   * TUR KENDİLİĞİNDEN BAŞLIYOR.
   *
   * Başlangıç kartı kalktığı için "ready" bir ekran değil, kuyruk hazır
   * demenin adı. Yarım kalan tur varsa kaldığı yerden, yoksa baştan —
   * kullanıcıya sistemin kendi muhasebesi ("kaldığın yerden mi, yeni tur mu")
   * sorulmuyor. Mobilde de karar `GameScreen` içinde sessizce veriliyor.
   *
   * `ref` ile bir kez: `startFresh` beklerken durum "loading"e düşüp geri
   * "ready"ye gelirse (önbellekli açılışın taze cevabı) etki yeniden koşar ve
   * tur iki kez başlardı.
   */
  const autoStarted = useRef(false);
  useEffect(() => {
    if (status !== "ready" || autoStarted.current) return;
    autoStarted.current = true;
    void (async () => {
      /*
        Önbellekten çizilen kuyruk henüz DOĞRULANMADI: `resume()` onu olduğu
        gibi oynatırdı ve cevaplanmış kelimeler yeniden sorulurdu. Taze cevap
        bekleniyor — `startFresh` bunu zaten yapıyordu, eksik olan kaldığı
        yerden devam yoluydu. Ayrıca beklemeden başlamak, sunucu cevabının
        durumu "hazır"a geri çekmesiyle turu yükleme kartında dondurdu.
      */
      if (!fresh.current && inflight.current) {
        const data = await inflight.current;
        if (!data?.rounds.length) return; // hata/boş ekranını `load` gösterdi
      }
      if (resumeRef.current) resume();
      else void startFresh();
    })();
    // `resume`/`startFresh` her render'da yeniden kuruluyor; bağımlılığa
    // alınmaları etkiyi her render'da tetiklerdi. Kapı zaten `autoStarted`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, resumable]);

  /**
   * Kaldığı yerden devam: sunucudaki ilerlemeyi yerine koyar.
   *
   * İlerleme REF'ten okunuyor. Durum değişkeni kullanılıyordu ve otomatik
   * başlatma taze cevabı beklediği için o kapanış eskimiş oluyordu: önbellekli
   * açılışta (ikinci ziyaretten sonra her açılış) `resumable` hâlâ null'du,
   * fonksiyon ilk satırda dönüyor ve tur yükleme kartında donuyordu.
   */
  function resume() {
    const resumable = resumeRef.current;
    if (!resumable) return;
    setIndex(resumable.index);
    setTally({ correct: resumable.correct, total: resumable.total, xp: resumable.xp });
    sessionXp.current = resumable.xp;
    missed.current = resumable.missed;
    startedAt.current = Date.now();
    setCombo(0);
    resetCombo();
    play("start");
    track("session_resume", resumable.index);
    wagerOn.current = false;
    setWagerResult(null);
    stageStart.current = {
      index: resumable.index,
      correct: resumable.correct,
      total: resumable.total,
      xp: resumable.xp,
    };
    setStatus("playing");
  }

  /** Yeni tur: kayıtlı tur atılır ve sunucudan taze bir kuyruk istenir. */
  async function startFresh() {
    // Kart önbellekten çizildiyse kuyruk henüz doğrulanmamış olabilir. O
    // durumda yükleme ekranına dönülüp taze cevap bekleniyor: eski bir
    // kuyrukla tur başlatmak, cevaplanmış kelimeleri yeniden sormak demek.
    if (!fresh.current && inflight.current) {
      setStatus("loading");
      const data = await inflight.current;
      if (!data?.rounds.length) return;
    }
    // Aynı sebep (bkz. resume): karar ref'ten okunuyor.
    if (resumeRef.current) {
      const data = await load({ fresh: true });
      if (!data?.rounds.length) return; // load hata/boş durumunu zaten gösterdi
    }
    setIndex(0);
    setTally({ correct: 0, total: 0, xp: 0 });
    sessionXp.current = 0;
    missed.current = [];
    setCombo(0);
    bestCombo.current = 0;
    stoppedEarly.current = false;
    stageStart.current = { index: 0, correct: 0, total: 0, xp: 0 };
    startedAt.current = Date.now();
    setStatus("playing");
  }

  /**
   * Bekleyen cevapları ve turun nerede kalındığını gönderir.
   *
   * İlerleme cevaplarla aynı isteğe binerse tur başına tek ağ gidişi kalır.
   * Cevap üretmeyen adımlarda ("bunu zaten biliyorum") ilerleme tek başına
   * gider — yoksa diğer cihaz o turu bir kez daha sorar.
   */
  const flush = useCallback(
    async (final: boolean, progress: SessionProgress | null, wager: Wager | null = null) => {
      const batch = pending.current;
      if (!batch.length) {
        if (progress) {
          void fetch("/api/session", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ day: localDay(), progress }),
            keepalive: true,
          }).catch(() => {
            /* ilerleme bir sonraki turda yeniden gönderilir */
          });
        }
        return null;
      }
      pending.current = [];
      const seconds = Math.round((Date.now() - startedAt.current) / 1000);
      try {
        const res = await fetch("/api/answers", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            answers: batch,
            day: localDay(),
            seconds: final ? seconds : 0,
            progress,
            wager,
          }),
        });
        if (!res.ok) {
          if (isPermanentStatus(res.status)) {
            // Sunucunun ASLA kabul etmeyeceği bir istek. Kuyruğa koymak
            // oturumun kalanındaki bütün kayıtları da batırır.
            console.error("[answers] istek reddedildi", res.status, batch);
            setSaveWarning("dropped");
            return null;
          }
          /* KUYRUK DEPOLAMADA, yalnız bellekte değil. Önce `pending.current`e
             geri konuyordu ve sekme kapanınca o cevaplar yok oluyordu: SRS
             ilerlemiyor, XP verilmiyor, kullanıcı aynı kelimeleri yeniden
             görüyordu — hem de ekran "kaydı bekliyor" dediği için bunu
             bilmeden. Android baştan beri depolamaya yazıyor. */
          queueAnswers({ answers: batch, day: localDay(), seconds });
          setSaveWarning("queued");
          return null;
        }
        setSaveWarning(null);
        void flushPendingAnswers(); // bağlantı var: bekleyenler de gitsin
        const data = (await res.json()) as AnswerResult;
        sessionXp.current += data.xpGained;
        if (wager) setWagerResult(data.wagerXp ?? 0);
        // üst bardaki seri/XP rozetlerini anında güncelle
        window.dispatchEvent(
          new CustomEvent("lernomi:stats", {
            detail: { xp: data.totalXp, streak: data.currentStreak },
          }),
        );
        return data;
      } catch {
        queueAnswers({ answers: batch, day: localDay(), seconds });
        setSaveWarning("queued");
        return null;
      }
    },
    [],
  );

  /*
    Bağlantı dönünce bekleyenleri GERÇEKTEN gönder.

    Uyarı "bağlantın döndüğünde otomatik gönderilecek" diyordu ama bunu yapan
    bir şey yoktu: bekleyen cevaplar ancak bir sonraki etap sonunda, yani
    kullanıcı oynamaya devam ederse deneniyordu. Yarıda bırakılan bir turda
    verilen söz tutulmuyordu.
  */
  useEffect(() => {
    const onOnline = () => {
      if (pending.current.length) void flush(false, null);
    };
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [flush]);

  /**
   * Oturum içi basamak inişi (WP-14).
   *
   * Art arda üç üretim yanlışında kalan üretim turları hafifliyor: çeviri →
   * cümle diz, yazarak tamamla → şıklı, yazma → ipucu baştan açık.
   *
   * BAYRAK İNMEK ZORUNDA. Açıldıktan sonra hiçbir yerde kapanmıyordu: ne
   * kullanıcı toparlayınca, ne de yeni tur başlayınca. Bileşen turlar arasında
   * yeniden kurulmadığı için "kalıcı değil, sonraki oturum sunucuda yeniden
   * kurulur" sözü tutulmuyordu — bir kez üç üretim turu kaçıran kullanıcı,
   * sekmeyi kapatana kadar hep hafifletilmiş turlar görüyordu.
   *
   * Görünen belirti "Yazarak Hatırla'da ipucu tıklamadan açık geliyor"du ama
   * etkisi daha genişti: aynı bayrak Çevir'i Cümleyi Diz'e, yazarak
   * tamamlamayı şıklıya indiriyordu. Yani üretim çalışması sessizce duruyordu.
   *
   * İniş üç yanlışa, çıkış tek doğruya bağlı. Asimetri bilinçli: eğilim zor
   * olana doğru olmalı, kolayda takılı kalmaya değil.
   */
  const [eased, setEased] = useState(false);
  const missStreak = useRef(0);

  const handleDone = useCallback(
    async (round: Round, results: GameResult[]) => {
      const enriched: Answer[] = results.map((r) => ({ ...r, game: round.game }));
      pending.current.push(...enriched);
      marks.current.push(...results.map((r) => r.correct));
      if (isProductionGame(round.game)) {
        if (results.every((r) => r.correct)) {
          missStreak.current = 0;
          // Toparladı: basamak geri çıkıyor. Yoksa iniş tek yönlü bir mandal
          // olur ve oturumun kalanı hep hafifletilmiş geçer.
          setEased(false);
        } else {
          missStreak.current += 1;
          if (missStreak.current >= EASE_AFTER_MISSES) setEased(true);
        }
      }

      // Yanlış bilinen kelimeleri oturum özetinde göstermek için topla
      if (results.some((r) => !r.correct)) {
        const ws = round.game === "match" ? round.words : [round.word];
        for (const r of results.filter((x) => !x.correct)) {
          const w = ws.find((x) => x.id === r.wordId);
          if (w && !missed.current.some((m) => m.id === w.id)) {
            missed.current.push({
              id: w.id,
              de: w.artikel ? `${w.artikel} ${w.de}` : w.de,
              tr: w.tr,
              en: w.en,
            });
          }
        }
      }

      const next = {
        correct: tally.correct + results.filter((r) => r.correct).length,
        total: tally.total + results.length,
        xp: tally.xp + results.reduce((s, r) => s + (r.correct ? 10 : 3), 0),
      };
      setTally(next);

      // Combo: turdaki cevaplar sırayla işleniyor, bir yanlış seriyi kırıyor.
      // Eşleştirme turu tek seferde beş cevap üretir; hepsi doğruysa seri beşer
      // beşer büyür — oyunun kendisi de öyle çalışıyor.
      let running = combo;
      for (const r of results) {
        running = r.correct ? running + 1 : 0;
        if (running > bestCombo.current) bestCombo.current = running;
      }
      setCombo(running);
      // Erdi beşin katlarında kenardan uzanıp kutluyor. Eşik combo rozetinin
      // eşiğinden (üç) yüksek: rozet "seri sürüyor" diyor ve her doğruda
      // güncelleniyor, kutlama ise bir OLAY olmalı — her üç cevapta bir çıkan
      // karakter kutlama olmaktan çıkıp trafiğe dönüşürdü.
      if (running >= 5 && running % 5 === 0) setCheer(running);

      const rounds = session?.rounds.length ?? 0;
      const isLast = index >= rounds - 1;
      const nextIndex = isLast ? rounds : index + 1;
      // Bittiğinde `index` tur sayısına eşitlenir: sunucu bunu "bu tur kapandı"
      // diye okur ve bir sonraki istekte yeni kuyruk kurar.
      /*
        İlerleme yalnız karışık turda gönderiliyor. `session_state` satırı
        kullanıcı başına tek: pratikte gönderilen ilerleme, karışık turun
        nerede kaldığını eziyor ve günlük tur kaldığı yerden değil pratiğin
        bıraktığı yerden açılıyordu. Pratik zaten "kaldığın yerden" diye bir
        şey vaat etmiyor — cevaplar (SRS/XP) normal yolundan gidiyor.
      */
      const progress: SessionProgress | null = onlyGameRef.current
        ? null
        : { ...next, index: nextIndex, missed: missed.current };

      // Bahisli etap kapandı mı? Pay, o etapta kazanılan puanın istemci
      // tahmini (doğru 10, yanlış 3). Sunucu ayrıca tavanlıyor; buradaki
      // sayının işi bahsi ETABIN kendi büyüklüğüne bağlamak — sabit bir ödül,
      // kısa etapta abartılı uzun etapta anlamsız olurdu.
      const closing = isLast || nextIndex % STAGE_SIZE === 0;
      const wager: Wager | null =
        closing && wagerOn.current
          ? {
              correct: next.correct - stageStart.current.correct,
              total: next.total - stageStart.current.total,
              stake: next.xp - stageStart.current.xp,
            }
          : null;
      if (wager) wagerOn.current = false;

      if (isLast) {
        track("session_done", next.correct, sessionKind.current);
        const res = await flush(true, progress, wager);
        setResult(res ? { ...res, xpGained: sessionXp.current } : null);
        setStatus("done");
        return;
      }

      setIndex(nextIndex);
      // Sonuç ara turlarda da saklanıyor: kullanıcı etap sonunda durursa özet
      // ekranı güncel seriyi, günlük hedefi ve "yarın kaç kelime" bilgisini
      // gösterebilsin. Beklenmiyor — turlar arası gecikme yaratmamalı.
      void flush(false, progress, wager).then((res) => {
        if (res) setResult({ ...res, xpGained: sessionXp.current });
      });

      // Etap sınırı: burada durmak da devam etmek de meşru. İlerleme zaten
      // sunucuya yazıldı, çıkan kullanıcı hiçbir şey kaybetmiyor.
      if (nextIndex % STAGE_SIZE === 0) {
        track("stage_done", nextIndex / STAGE_SIZE);
        setStatus("stage");
      }
    },
    [combo, flush, index, session, tally],
  );

  // Sekme kapanırsa gönderilememiş cevapları kaydetmeyi dene. Her tur zaten
  // gönderiliyor; buraya yalnızca bir istek başarısız olduysa iş düşer.
  /**
   * Sıradaki turun sesini önceden indirir.
   *
   * Gecikmenin asıl kaynağı sentez değil, önbellek ıskalaması: daha önce hiç
   * duyulmamış bir kelime sunucuya gidip geliyor ve oyun sesi beklerken
   * duruyor. Öğrenci bu turu cevaplarken sıradakinin sesi indiriliyor, sıra
   * geldiğinde ağa hiç çıkılmıyor.
   *
   * Eşleştirme turunda birden çok kelime var; hepsi indiriliyor çünkü hangisine
   * dokunulacağı belli değil.
   */
  useEffect(() => {
    const next = session?.rounds[index + 1];
    if (!next) return;
    const words = next.game === "match" ? next.words : [next.word];
    for (const w of words) prefetchGerman(w.artikel ? `${w.artikel} ${w.de}` : w.de);
  }, [session, index]);

  useEffect(() => {
    const onHide = () => {
      if (!pending.current.length) return;
      const body = JSON.stringify({
        answers: pending.current,
        day: localDay(),
        seconds: Math.round((Date.now() - startedAt.current) / 1000),
      });
      navigator.sendBeacon?.("/api/answers", new Blob([body], { type: "application/json" }));
      pending.current = [];
    };
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, []);

  if (status === "loading")
    return (
      <Screen fills header>
        <LoadingCard />
      </Screen>
    );
  /*
    "ready" artık GEÇİŞ durumu, bir ekran değil.

    Başlangıç kartı buradaydı ve sekmenin ana ekranı gibi davranıyordu; o iş
    artık `/learn` merkezinde (bkz. components/learn/learn-hub). Tur açılır
    açılmaz başlıyor — yarım kalan varsa kaldığı yerden, yoksa taze. Mobilde
    de öyle: `GameScreen` bir başlangıç kartı göstermiyor, `p.resume`u sessizce
    yerine koyup oynatıyor.
  */
  if (status === "ready")
    return (
      <Screen fills>
        <LoadingCard />
      </Screen>
    );
  if (status === "error")
    return (
      <Screen header>
        <ErrorCard kind={errorKind} onRetry={() => void load()} />
      </Screen>
    );
  if (status === "empty")
    return (
      <Screen header>
        <EmptyCard
          meta={session?.meta}
          onlyGame={onlyGame}
          onExtra={() => void load({ extra: true })}
          onMixed={() => {
            // Adresteki `?game=` kalırsa sayfa tazelenince yine pratiğe düşer.
            router.replace("/learn/game");
            void load({ game: null, fresh: true });
          }}
        />
      </Screen>
    );
  if (status === "stage" && session)
    return (
      <Screen>
        <StageCard
          stage={Math.ceil(index / STAGE_SIZE)}
          stages={Math.ceil(session.rounds.length / STAGE_SIZE)}
          correct={tally.correct - stageStart.current.correct}
          total={tally.total - stageStart.current.total}
          bestCombo={bestCombo.current}
          remaining={session.rounds.length - index}
          wagerResult={wagerResult}
          onContinue={(bet) => {
            wagerOn.current = bet;
            setWagerResult(null);
            stageStart.current = { index, correct: tally.correct, total: tally.total, xp: tally.xp };
            setStatus("playing");
          }}
          onStop={() => {
            track("session_stop", index);
            stoppedEarly.current = true;
            setStatus("done");
          }}
        />
      </Screen>
    );
  if (status === "done")
    return (
      <Screen>
        <SummaryCard
          tally={tally}
          result={result}
          missed={missed.current}
          marks={marks.current}
          level={session?.meta.level ?? "A1"}
          partial={stoppedEarly.current}
          targeted={targeted.current}
          onContinue={() => {
            router.refresh();
            void load();
          }}
          onChallenge={() => {
            track("challenge_play");
            router.push("/learn/challenge");
          }}
          onFinish={exit}
        />
      </Screen>
    );

  const round = session!.rounds[index];
  const progress = ((index + 1) / session!.rounds.length) * 100;

  return (
    <Screen fills>
    <MascotPop trigger={cheer} />
    <MascotFx />
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
      {/* ÇIKIŞ — turun içindeyken sekme çubuğu yok (yığın sayfası) ve tarayıcı
          geri düğmesi ana ekrana eklenmiş uygulamada da yok: düğme olmadan
          turdan çıkmanın hiçbir yolu kalmıyordu. Mobilde aynı yerde, aynı
          ölçüde (`GameScreen`: 44x44, `surface-2`). */}
      <div className="mb-2 flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={() => setConfirmExit(true)}
          aria-label={t("game.quit_round")}
          className="pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-tile"
          style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
        >
          <XIcon size={22} />
        </button>
        <div className="min-w-0 flex-1">
          <LevelBadge
            level={session!.meta.level}
            mastered={session!.meta.coverage.mastered}
            total={session!.meta.coverage.total}
          />
        </div>
      </div>
      {/* Hangi pratikte olunduğu ekranda yazıyor: tur tek oyundan kuruluysa
          bunu söyleyen tek yer buydu, mobilde de öyle. */}
      {onlyGame ? (
        <p className="muted mb-2 shrink-0 text-center text-micro uppercase tracking-widest">
          {t("game.practice_suffix", { game: t(GAME_LABEL_KEYS[onlyGame]) })}
        </p>
      ) : null}
      <ConfirmDialog
        open={confirmExit || ayril.pending !== null}
        title={t("game.quit_round_2")}
        message={t(onlyGame ? "game.exit_message_practice" : "game.exit_message")}
        confirmLabel={t("common.exit")}
        cancelLabel={t("common.continue_2")}
        destructive
        onConfirm={() => {
          setConfirmExit(false);
          if (ayril.pending) ayril.leave();
          else exit();
        }}
        onCancel={() => { setConfirmExit(false); ayril.stay(); }}
      />
      <div className="mb-3 shrink-0">
        <div className="mb-1.5 flex items-center justify-between text-caption">
          <span className="muted flex items-center gap-2">
            {index + 1} / {session!.rounds.length}
            {(() => {
              const ws = round.game === "match" ? round.words : [round.word];
              const isNew = ws.every((w) => w.isNew);
              return (
                <span
                  className="rounded-full px-2 py-0.5 text-micro uppercase tracking-wide"
                  style={{
                    background: isNew
                      ? "color-mix(in srgb, var(--color-brand) 14%, transparent)"
                      : "color-mix(in srgb, var(--color-flame) 16%, transparent)",
                    color: isNew ? "var(--color-brand)" : "var(--color-flame)",
                  }}
                >
                  {t(isNew ? "session.chip_new" : "session.chip_review")}
                </span>
              );
            })()}
          </span>
          {/* Combo üç doğrudan önce görünmüyor: her doğru cevapta yanıp sönen
              bir rozet, ödül olmaktan çıkıp gürültü olurdu. */}
          {combo >= 3 ? (
            <motion.span
              key={combo}
              initial={{ scale: 1.35 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 16 }}
              className="flex items-center gap-1 rounded-full px-2 py-0.5 text-micro"
              /* Mobil seri hapı `info` (gök) tonunda; web mordaydı ve aynı rozet
                 iki uygulamada iki ayrı şey söylüyor gibi duruyordu. */
              style={{
                background: "color-mix(in srgb, var(--color-sky) 14%, transparent)",
                color: "var(--color-sky)",
              }}
            >
              <SparkIcon size={12} /> {t("sessionw.combo", { n: combo })}
            </motion.span>
          ) : (
            <span className="muted">
              {tally.total > 0
                ? t("session.accuracy", {
                    pct: t("common.pct", { n: Math.round((tally.correct / tally.total) * 100) }),
                  })
                : t("session.lets_go")}
            </span>
          )}
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full surface-2">
          <motion.div
            className="brand-gradient h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 180, damping: 26 }}
          />
        </div>
      </div>

      {saveWarning ? (
        <div
          className="mb-3 flex shrink-0 items-center gap-2 rounded-panel px-3 py-2 text-body"
          style={{
            background: "color-mix(in srgb, var(--color-flame) 12%, transparent)",
            color: "var(--color-flame)",
          }}
        >
          <AlertIcon size={16} />
          {saveWarning === "dropped"
            ? t("session.save_failed")
            : t("session.save_queued")}
        </div>
      ) : null}

      {/* Turlar arası kısa kayma + solma: kullanıcı "yeni soruya geçtim" der. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={round.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex min-h-0 flex-1 flex-col"
        >
          <FitBox>
            {/* Basamak inişinde oynanan tur hafifletilmiş olanıdır; cevap da
                onun oyun adıyla kaydedilir (çeviri yerine cümle diz). */}
            {(() => {
              const played = eased ? easeRound(round) : round;
              return <GameSwitch round={played} onDone={(res) => void handleDone(played, res)} />;
            })()}
          </FitBox>
        </motion.div>
      </AnimatePresence>
    </div>
    </Screen>
  );
}

/**
 * Ekran sarmalayıcısı — iki farklı davranış gerekiyor ve ikisi aynı anda olamaz.
 *
 * `fills`: oyun ekranı kalan alana ÇAKILIR. FitBox içeriği ancak sınırlı bir
 * yüksekliği ölçebildiğinde küçültebiliyor; sarmalayıcı içerikle büyürse ölçüm
 * her zaman "sığıyor" der ve içerik taşar.
 *
 * `fills` yok: başlangıç, özet ve hata ekranları birer belge. İçerikle birlikte
 * BÜYÜMELERİ gerekiyor. Önce bunlar da kalan alana çakılıyordu ve taşan kısım
 * — sıralama tablosunun altı — kaydırma sonuna gelindiğinde bile gezinmenin
 * altında kalıyordu.
 */
function Screen({ fills, header, children }: { fills?: boolean; header?: boolean; children: ReactNode }) {
  return (
    <div className={fills ? "flex min-h-0 flex-1 flex-col" : "flex flex-col"}>
      {/*
        `header`: sekmenin kendi başlığı. Kabuktaki ortak üst çubuk kalktı
        (bkz. components/app-shell) ve başlığı artık her sekme kendi çiziyor.
        OYUN ekranlarında çizilmiyor — mobilde de tur ayrı bir tam ekran ve
        orada seri/profil değil, ilerleme çubuğu ile çıkış var.
      */}
      {header ? <LearnHeader /> : null}
      {children}
    </div>
  );
}

/* Oturum hazirlanirken ekranin tamamini kaplayan bekleme: canli bolge
   degildi, yani ekran okuyucu kullanan biri "hazirlaniyor"i hic duymuyordu.
   Android karsiligi `accessibilityLiveRegion="polite"`. */
function LoadingCard() {
  const t = useT();
  return (
    <div role="status" aria-busy="true" className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className="brand-gradient h-12 w-12 rounded-tile"
          animate={{ rotate: [0, 90, 180, 270, 360], borderRadius: ["30%", "50%", "30%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="muted text-body">{t("session.preparing")}</p>
      </div>
    </div>
  );
}

function ErrorCard({ kind, onRetry }: { kind: ErrorKind; onRetry: () => void }) {
  const t = useT();
  const content = {
    auth: {
      title: t("session.expired"),
      body: t("session.expired_sub"),
      action: (
        <Link href="/login" className="btn btn-primary mt-5 w-full px-5 py-3.5">
          {t("auth.sign_in")}
        </Link>
      ),
    },
    db: {
      title: t("session.load_failed"),
      body: t("session.load_failed_sub"),
      action: (
        <button onClick={onRetry} className="btn btn-primary mt-5 flex w-full items-center justify-center gap-2 px-5 py-3.5">
          <RefreshIcon size={18} /> {t("common.try_again")}
        </button>
      ),
    },
    network: {
      title: t("session.offline"),
      body: t("session.offline_sub"),
      action: (
        <button onClick={onRetry} className="btn btn-primary mt-5 flex w-full items-center justify-center gap-2 px-5 py-3.5">
          <RefreshIcon size={18} /> {t("common.try_again")}
        </button>
      ),
    },
  }[kind];

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Hata DUYURULUYOR: ekrani kaplayan bir hata metni canli bolge
          degilse ekran okuyucu kullanan biri hicbir sey duymuyor. */}
      <div role="alert" className="card p-6 text-center">
        <Mascot mood="sad" size={96} className="mx-auto" />
        <h2 className="mt-1 text-h3">{content.title}</h2>
        <p className="muted mt-2 text-body">{content.body}</p>
        {content.action}
      </div>
    </div>
  );
}

function EmptyCard({
  meta,
  onlyGame,
  onExtra,
  onMixed,
}: {
  meta: SessionPayload["meta"] | undefined;
  onlyGame: PlayableGame | null;
  onExtra: () => void;
  onMixed: () => void;
}) {
  const t = useT();
  // Tek oyun seçiliyken boş dönmesinin sebebi hedefin tamamlanması değil.
  // İki sebepten biri: bu mod yalnızca daha önce görülmüş kelimeleri
  // tekrarlıyor ve tekrarlanacak kelime henüz yok, ya da o oyun kuyruktaki
  // kelimelerin hiçbirine kurulamıyor (Çoğul Bilmece çoğulu olan isim,
  // Cümleyi Tamamla örnek cümlesi olan kelime ister). İkisini de "hedefini
  // tamamladın" diye anlatmak kullanıcıyı yanıltırdı.
  if (onlyGame) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-md"
      >
        <div className="card p-8 text-center">
          <Mascot mood="think" size={104} className="mx-auto" />
          <h2 className="mt-1 text-h2">{t("session.no_words_for_game", { game: t(GAME_LABEL_KEYS[onlyGame]) })}</h2>
          {/* Tek cümle. Önce üç satırlık bir açıklama vardı ve modun nasıl
              çalıştığını baştan anlatıyordu; boş ekranda okunacak son şey bu. */}
          <p className="muted mt-2 text-body">{t("session.review_only_mode")}</p>
          <button onClick={onMixed} className="btn btn-primary mt-5 w-full px-5 py-3.5">
            {t("session.back_to_mixed")}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="card p-8 text-center">
        <Mascot mood="cheer" size={112} className="mx-auto" />
        <h2 className="mt-1 text-h2">{t("session.goal_done")}</h2>
        <p className="muted mt-2 text-body">{t("session.goal_done_sub")}</p>
        {meta ? (
          <p className="muted mt-4 text-body">
            {t("session.today_summary", {
              reviews: meta.reviewsToday,
              news: meta.newToday,
              streak: meta.currentStreak,
            })}
          </p>
        ) : null}
        <button onClick={onExtra} className="btn btn-primary mt-5 w-full px-5 py-3.5">
          {t("session.continue_with_new")}
        </button>
      </div>
    </motion.div>
  );
}

/**
 * Etap sonu ekranı.
 *
 * İki işi var. Birincisi turu bitirilebilir kılmak: 20 turluk bir blok
 * kullanıcıyı başlamadan kaçırıyordu, beş tur ise bir oturuşta bitiyor.
 * İkincisi durmayı meşrulaştırmak — "şimdilik yeter" bir vazgeçme değil,
 * sunulan bir seçenek. İlerleme zaten sunucuda; ertesi gün kaldığı yerden
 * devam ediyor.
 */
function StageCard({
  stage,
  stages,
  correct,
  total,
  bestCombo,
  remaining,
  wagerResult,
  onContinue,
  onStop,
}: {
  stage: number;
  stages: number;
  correct: number;
  total: number;
  bestCombo: number;
  remaining: number;
  /** Kapanan bahsin puan farkı; bahis oynanmadıysa null. */
  wagerResult: number | null;
  onContinue: (wager: boolean) => void;
  onStop: () => void;
}) {
  const t = useT();
  const [bet, setBet] = useState(false);
  const perfect = total > 0 && correct === total;

  // Etabın kendi sesi var: tertemiz geçen etap oktavla taçlanan bir ezgi,
  // normal etap kısa bir üçlü duyuruyor. Konfetiyle aynı eşiği kullanıyor ki
  // göz ve kulak aynı şeyi söylesin.
  useEffect(() => {
    play(perfect ? "perfect" : "stage");
  }, [perfect]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto w-full max-w-md"
    >
      {/* Kutlama yalnızca etap tertemiz geçtiyse: her etapta patlayan konfeti
          birkaç turda değersizleşir. */}
      <Confetti fire={perfect ? stage : 0} count={22} />

      <div role="status" className="card overflow-hidden">
        <div className="brand-gradient-deep px-6 py-5 text-center text-white">
          <motion.div
            initial={{ scale: 0.6, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 250, damping: 16 }}
            className="mx-auto w-fit"
          >
            <Mascot mood={perfect ? "cheer" : "happy"} size={72} />
          </motion.div>
          <p className="mt-1 text-body opacity-90">{t("stage.counter", { n: stage, total: stages })}</p>
          <h2 className="mt-0.5 text-h2">
            {perfect ? t("stage.clean") : t("stage.done")}
          </h2>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {Array.from({ length: stages }, (_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i < stage ? 22 : 10,
                  background: i < stage ? "#fff" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x" style={{ borderColor: "var(--border)" }}>
          <Stat label={t("stage.this_stage")} value={`${correct}/${total}`} />
          <Stat label={t("stage.best_streak")} value={bestCombo > 0 ? `${bestCombo}` : "—"} />
        </div>

        {/* Kapanan bahsin sonucu. Üç hâl var ve üçü de açıkça söyleniyor:
            kazanılan, boşa giden ve yanan. Sessizce eklenen/eksilen puan,
            bahsi bir mekanik olmaktan çıkarıp gürültüye çevirirdi. */}
        {wagerResult !== null ? (
          <div
            className="px-6 pt-4 text-center text-strong"
            style={{
              color:
                wagerResult > 0
                  ? "var(--color-mint)"
                  : wagerResult < 0
                    ? "var(--color-flame)"
                    : "var(--text-muted)",
            }}
          >
            {wagerResult > 0
              ? t("stage.wager_won", { xp: wagerResult })
              : wagerResult < 0
                ? t("stage.wager_lost", { xp: wagerResult })
                : t("wager.even")}
          </div>
        ) : null}

        <div className="space-y-2 p-6 pt-4">
          {/* Bahis anahtarı: kapalıysa oyun hiç değişmiyor. Açık olduğunda
              ne kazanılacağı ve ne kaybedileceği aynı cümlede yazıyor —
              gizli kuralı olan bir bahis, bahis değil tuzaktır. */}
          <button
            type="button"
            onClick={() => {
              setBet((b) => !b);
              vibrate("tap");
            }}
            aria-pressed={bet}
            className="flex w-full items-center gap-3 rounded-panel px-3.5 py-3 text-left transition-colors"
            style={{
              background: bet
                ? "color-mix(in srgb, var(--color-flame) 12%, transparent)"
                : "var(--surface-2)",
              boxShadow: bet ? "inset 0 0 0 1.5px var(--color-flame)" : undefined,
            }}
          >
            <span
              className="flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors"
              style={{ background: bet ? "var(--color-flame)" : "var(--border)" }}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="h-4 w-4 rounded-full bg-white"
                style={{ marginLeft: bet ? "auto" : 0 }}
              />
            </span>
            <span className="min-w-0">
              <span className="block text-strong">{t("wager.next_stage")}</span>
              <span className="muted block text-caption">{t("wager.rules")}</span>
            </span>
          </button>

          <button
            onClick={() => onContinue(bet)}
            className="btn btn-primary w-full px-5 py-3.5 text-h3"
          >
            {t(bet ? "stage.continue_bet" : "stage.continue", { n: remaining })}
          </button>
          <button onClick={onStop} className="btn btn-ghost w-full px-5 py-3">
            {t("stage.enough")}
          </button>
          <p className="muted pt-1 text-center text-caption">
            {t("stage.stop_note")}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SummaryCard({
  tally,
  result,
  missed,
  marks,
  level,
  partial,
  targeted,
  onContinue,
  onChallenge,
  onFinish,
}: {
  tally: { correct: number; total: number; xp: number };
  result: AnswerResult | null;
  missed: MissedWord[];
  /** Cevapların doğru/yanlış sırası — paylaşılan özetteki kareler. */
  marks: boolean[];
  level: string;
  /** Tur bitmeden bırakıldıysa özet "tamamlandı" demiyor. */
  partial?: boolean;
  /** Hedefli tur (zayıf nokta): Erdi baş parmak + koç cümlesi (WP-66). */
  targeted?: boolean;
  onContinue: () => void;
  onChallenge: () => void;
  /** Özet ekranından çıkış — turdan sonra Öğren merkezine dönüş. */
  onFinish: () => void;
}) {
  const t = useT();
  const accuracy = tally.total ? Math.round((tally.correct / tally.total) * 100) : 0;
  const xp = result?.xpGained ?? tally.xp;
  const mastered = result?.newlyMastered ?? 0;
  // Konfeti yalnızca gerçekten iyi bir tur sonunda: her seferinde patlarsa
  // değersizleşir. Kelime pekiştirmek de kutlanmayı hak eder — o, oturum
  // doğruluğunun aksine gerçekten kazanılmış bir şey.
  const deserved = mastered > 0 || (accuracy >= 80 && tally.total >= 4);

  // Oturumun kapanış sesi. Hak edilmiş turda yükselen ezgi, sıradan turda
  // yumuşak bir kadans — ikisi de "bitti" diyor ama aynı tonda değil.
  useEffect(() => {
    play(deserved ? "perfect" : "finish");
  }, [deserved]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto w-full max-w-md"
    >
      <Confetti fire={deserved ? 1 : 0} />

      {/*
        Kartın bölümleri ardı ardına açılıyor, hepsi bir anda değil. Yedi
        bölümün aynı anda belirmesi tek bir blok gibi okunuyordu; hangisinin
        ne olduğu ancak durup bakınca ayrılıyordu. Sıra okunma sırasıyla
        aynı: önce Erdi ve kazanılan XP, sonra sayılar, sonra ayrıntı.
      */}
      <Stagger role="status" className="card overflow-hidden">
        <div className="brand-gradient-deep p-8 text-center text-white">
          {/* Turun nasıl geçtiğini söyleyen şey artık bir simge değil, Erdi'nin
              hâli: hak edilmiş turda kutluyor, iyi turda gülümsüyor, kötü turda
              üzülüyor. Aynı bilgi bir cümleyle de yazılabilirdi ama okunması
              gereken bir cümle olurdu; ifade bir bakışta anlaşılıyor. */}
          <motion.div
            initial={{ scale: 0.6, y: 14, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 15 }}
            className="mx-auto w-fit"
          >
            {targeted ? (
              <CoachBubble
                moment="weak_done"
                mood={accuracy >= 60 ? "thumbsup" : "sad"}
                size={72}
                tone="dark"
                className="mx-auto w-fit text-left"
              />
            ) : (
              <Mascot mood={deserved ? "cheer" : accuracy >= 60 ? "happy" : "sad"} size={92} />
            )}
          </motion.div>
          {/*
            SONUÇ HALKASI. Android tur özetinin ortasında halkayı gösteriyor ve
            halkanın doluluğu turun kendisi: kaç soru, kaçı doğru. Webde bu
            yoktu - aynı bilgi yalnız aşağıdaki karoların içinde bir sayı
            olarak duruyordu ve tur "nasıl geçti" sorusu bir bakışta
            cevaplanmıyordu. İç daire başlığın zemininde, yani halka bir şerit
            gibi okunuyor.
          */}
          {tally.total > 0 ? (
            <div
              className="relative mx-auto mt-3 h-24 w-24 rounded-full"
              style={{ background: `conic-gradient(#fff ${accuracy}%, rgb(255 255 255 / 0.28) ${accuracy}% 100%)` }}
            >
              <div className="brand-gradient-deep absolute inset-[7px] flex flex-col items-center justify-center rounded-full">
                <span className="text-h2 tabular-nums">
                  {tally.correct}/{tally.total}
                </span>
                <span className="text-micro opacity-80">{t("game.correct")}</span>
              </div>
            </div>
          ) : null}
          {/* BASLIK ORTAK ANAHTARDAN. Web `summary.round_done` ("Tur
              tamamlandi"), Android `common.round_done` ("Tur bitti!") diyordu:
              ayni ekran iki farkli cumle yaziyordu ve anahtar webde yalniz
              webde duruyordu. Ortak olan kullaniliyor; "buraya kadar" dali da
              ortak kumeye tasindi, cunku Android'in de erken durdurma yolu
              var (`stage.enough`). */}
          <h2 className="mt-2 text-h1">
            {partial ? t("summary.stopped") : t("common.round_done")}
          </h2>
          <p className="mt-1 text-body opacity-90">
            +<CountUp value={xp} /> XP
          </p>
        </div>

        <div className="grid grid-cols-3 divide-x" style={{ borderColor: "var(--border)" }}>
          {/* İki değer de KODA GÖMÜLÜ Türkçe yazıyordu: yüzde "%85" biçiminde
              (Almanca "85 %", İngilizce "85%" ister) ve seri "5g" - "g" gün
              demek, yani Almanca ve İngilizce arayüzde anlamsız bir harf.
              İkisi de sözlükteki ortak biçimlere alındı; Android ikisini de
              baştan beri sözlükten alıyor (`formatPercent`, `profile.days`). */}
          <Stat label={t("summary.accuracy")} value={t("common.pct", { n: accuracy })} />
          <Stat label={t("summary.words")} value={String(tally.total)} />
          <Stat label={t("summary.streak")} value={t("profile.days", { n: result?.currentStreak ?? 0 })} />
        </div>

        {/* Son etap bahisliyse sonucu burada kapanıyor: etap kartı
            gösterilmeden tur bittiği için başka söylenecek yer yok. */}
        {result?.wagerXp ? (
          <div
            className="border-b px-6 py-2.5 text-center text-strong"
            style={{
              borderColor: "var(--border)",
              color: result.wagerXp > 0 ? "var(--color-mint)" : "var(--color-flame)",
            }}
          >
            {result.wagerXp > 0
              ? t("session.wager_won", { xp: result.wagerXp })
              : t("session.wager_lost", { xp: result.wagerXp })}
          </div>
        ) : null}

        {result ? (
          <div className="px-6 pb-2">
            <div className="mb-2 flex items-center justify-between text-caption">
              <span className="muted">{t("learn.daily_goal")}</span>
              <span className="muted">
                {result.reviewsToday} / {result.dailyGoal}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full surface-2">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--color-mint)" }}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (result.reviewsToday / result.dailyGoal) * 100)}%`,
                }}
                transition={{ delay: 0.2, type: "spring", stiffness: 160, damping: 24 }}
              />
            </div>
            {result.goalReached ? (
              <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-strong text-[color:var(--color-mint)]">
                <FlameIcon size={16} /> {t("session.goal_reached")}
              </p>
            ) : null}
          </div>
        ) : null}

        {/* Seviye rozeti yerine gerçekten kazanılmış olan şey: pekişen kelime.
            Bu ölçü yalnızca ileri gider, kimseyi geri düşürmez. */}
        {mastered > 0 ? (
          <div
            className="mx-6 mt-4 rounded-panel px-4 py-3 text-center"
            style={{ background: "color-mix(in srgb, var(--color-mint) 14%, transparent)" }}
          >
            <p className="text-strong" style={{ color: "var(--color-mint)" }}>
              {t("sessionw.n_mastered", { n: mastered })}
            </p>

          </div>
        ) : null}

        {/* Kaybedildiği sanılan seri geri alındıysa bunu söylemek şart:
            sessiz bir onarım, kullanıcının ekranda gördüğü sayıyı
            açıklanamaz hâle getirir. */}
        {result?.streakRepaired ? (
          <div
            className="mx-6 mt-4 rounded-panel px-4 py-3 text-center"
            style={{ background: "color-mix(in srgb, var(--color-flame) 14%, transparent)" }}
          >
            <p
              className="flex items-center justify-center gap-1.5 text-strong"
              style={{ color: "var(--color-flame)" }}
            >
              <FlameIcon size={16} /> {t("game.streak_saved")}
            </p>
            <p className="muted mt-1 text-caption">{t("game.streak_saved_sub", { n: result.currentStreak })}</p>
          </div>
        ) : null}

        {/* Ertesi güne dair somut bir sayı. t("summary.scheduled") doğruydu
            ama tarihsizdi; kullanıcıya yarın uygulamayı açmak için bir sebep
            vermiyordu. */}
        {result && result.dueTomorrow > 0 ? (
          <p className="px-6 pt-2 text-center text-strong">
            {t("sessionw.due_tomorrow", { n: result.dueTomorrow })}
          </p>
        ) : null}

        {missed.length ? (
          <div className="px-6 pt-4">
            {/* Başlık KODA GÖMÜLÜ Türkçeydi: Almanca ve İngilizce arayüzde de
                "Zorlandıkların" yazıyordu. Sözlüğe alındı ve Android de aynı
                anahtarı kullanıyor. */}
            <p className="muted mb-2 text-micro uppercase tracking-wide">
              {t("session.missed_title", { n: missed.length })}
            </p>
            <ul className="space-y-1.5">
              {missed.slice(0, 6).map((w) => (
                <li
                  key={w.id}
                  className="flex items-baseline justify-between gap-3 rounded-panel px-3 py-2 text-body surface-2"
                >
                  <span className="font-semibold">{w.de}</span>
                  <span className="muted min-w-0 text-right">
                    <span className="block truncate">{w.tr}</span>
                    {w.en ? (
                      <span className="block truncate text-caption opacity-70" lang="en">
                        {w.en}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
            {missed.length > 6 ? (
              <p className="muted mt-2 text-center text-caption">{t("session.n_more_words", { n: missed.length - 6 })}</p>
            ) : null}
            {/*
              Kelime listesinin GİRİŞİ burası.

              t("profile.my_words") alt sekmeden çıktı çünkü bir hedef değil bir sonuç:
              kimse "kelime listeme bakayım" diye uygulamayı açmıyor, tura girip
              zorlandığı kelimeyi merak ettiğinde bakıyor. Merakın doğduğu an tam
              olarak bu ekran — bağlantı da o yüzden burada.
            */}
            <p className="muted mt-2 text-center text-caption">
              {t("session.missed_note")}{" "}
              <Link href="/words?status=learning" className="font-semibold underline-offset-2 hover:underline">
                {t("words.my_words")}
              </Link>
            </p>
          </div>
        ) : null}

        {/* Hatırlatma izni tam burada isteniyor: tur bitti, XP göründü, seri
            ekranda duruyor. Girişte sorulan izin reddedilir ve tarayıcıda
            kalıcı olarak kapanır — ikinci şans yok. */}
        <PushOptIn streak={result?.currentStreak ?? 0} />

        <div className="space-y-2 p-6 pt-4">
          <button onClick={onContinue} className="btn btn-primary w-full px-5 py-3.5">
            {partial ? t("summary.back_to_round") : t("game.continue")}
          </button>
          <button onClick={onChallenge} className="btn btn-ghost w-full px-5 py-3">
            {t("challenge.title")}
          </button>
          <ShareResult
            marks={marks}
            total={tally.total}
            accuracy={accuracy}
            streak={result?.currentStreak ?? 0}
            level={level}
          />
          {/* KAPANIŞ — özetin üç düğmesi de yeni bir şey BAŞLATIYORDU (yeni
              tur, hayatta kalma, paylaş) ve tur ekranında sekme çubuğu yok:
              özetten Öğren'e dönmenin hiçbir yolu kalmıyordu. Mobilde bu
              düğme baştan beri var (`GameScreen`: t("common.finish")).
              EN ALTTA: paylaşmak da yeni bir şey başlatıyor ve çıkış
              düğmesinin ALTINDA duruyordu — çıkışı grubun sonuna aldım, iki
              platformda da sıra aynı (devam · hayatta kalma · paylaş · bitir). */}
          <button onClick={onFinish} className="btn btn-ghost w-full px-5 py-3">
            {t("common.finish")}
          </button>
        </div>
      </Stagger>
    </motion.div>
  );
}

/**
 * Bölüm başlığı — kartın neyi topladığını söyleyen tek satır.
 *
 * Başlangıç ekranında altı kart alt alta duruyordu ve hepsi aynı ağırlıktaydı;
 * hangisinin bugüne özel bir olay, hangisinin her zaman orada duran bir ayar
 * olduğu okunmuyordu. Başlık o ayrımı kuruyor.
 */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-2 py-4 text-center">
      <div className="text-h2">{value}</div>
      <div className="muted text-caption">{label}</div>
    </div>
  );
}
