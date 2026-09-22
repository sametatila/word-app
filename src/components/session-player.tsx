"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { apiFetch } from "@/lib/api-fetch";
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
import { prefetchGerman } from "@/components/speak-button";
import { play, resetCombo } from "@/lib/sfx";
import { vibrate } from "@/lib/fx";
import { track } from "@/lib/track";
import { FitBox } from "@/components/fit-box";
import { PushOptIn } from "@/components/push-optin";
import { ShareResult } from "@/components/share-result";
import { CoachLine } from "@/components/coach-line";
import { LearnHeader } from "@/components/app-header";
import { AlertIcon, BoltIcon, CheckIcon, FlameIcon, RefreshIcon, SparkIcon, XIcon } from "@/components/icons";
import { DetailCard, DetailRow, FlowActions, FlowColumn, FlowNote, ResultHero, StateBody, StatRow } from "@/components/flow";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useLeaveGuard } from "@/lib/use-leave-guard";
import { RoundExit } from "@/components/round-exit";
import { readCache, writeCache } from "@/lib/use-cached";
import { useLang, useT } from "@/lib/i18n/client";
import { localDay } from "@/lib/day";
import { flushPendingAnswers, isPermanentStatus, queueAnswers } from "@/lib/answer-queue";
import { formatPercent } from "@/lib/i18n/dict";

/**
 * Turun durumları.
 *
 * `challenge`/`daily`/`walk` BURADAN KALKTI: üçü de oturum oynatıcısının bir
 * durumuydu ve aynı adreste başka bir mod başlatıyordu — paylaşılamayan,
 * yer imine alınamayan, tarayıcı geri düğmesiyle çıkılamayan modlar. Artık
 * kendi adreslerindeler (`/learn/walk`, `/learn/challenge`; Günün turu
 * 2026-09-15'te kaldırıldı).
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
/**
 * Kelime turu — MASKOTSUZ (2026-09-22, Samet'in kararı).
 *
 * 18 Eylül'de Erdi ürünün geri kalanından çekilip yalnız bu tura bırakılmıştı;
 * karar bir adım daha gitti: animasyon turun İÇİNDE de yok, yalnız Öğren
 * ekranının günlük tur KUTUSUNDA duruyor (`components/learn/learn-hub`).
 * Bu yüzden `DailyRound` sağlayıcısı, kutlama pop'u, ortam yürüyüşü ve koç
 * balonu buradan kalktı; koçun CÜMLESİ kaldı (o animasyon değil içerik,
 * `components/coach-line`).
 */
export function SessionPlayer() {
  return <SessionRound />;
}

function SessionRound() {
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
      if (opts.fresh) await apiFetch("/api/session", { method: "DELETE" });
      const res = await apiFetch(
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
          void apiFetch("/api/session", {
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
        const res = await apiFetch("/api/answers", {
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
        <ErrorCard kind={errorKind} onRetry={() => void load()} onClose={exit} />
      </Screen>
    );
  if (status === "empty")
    return (
      <Screen header>
        <EmptyCard
          meta={session?.meta}
          onlyGame={onlyGame}
          onExtra={() => void load({ extra: true })}
          onClose={exit}
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
          xp={Math.max(0, tally.xp - stageStart.current.xp)}
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
          onlyGame={onlyGame}
          wagerResult={wagerResult}
          saveWarning={saveWarning}
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
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
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
      {/* ÇIKIŞ + İLERLEME AYNI SATIRDA.

          Turun içindeyken sekme çubuğu yok (yığın sayfası) ve tarayıcı geri
          düğmesi ana ekrana eklenmiş uygulamada da yok: düğme olmadan turdan
          çıkmanın hiçbir yolu kalmıyordu. Mobilde aynı yerde, aynı ölçüde
          (`GameScreen`: 44x44, `surface-2`).

          Düğme kendi satırındaydı çünkü yanında CEFR rozeti duruyordu; rozet
          kalkınca o satırda tek başına kaldı. Şimdi sıra Android'inkiyle
          birebir: çıkış, çubuk, seri hapı, yeni/tekrar çipi, sayaç.

          DOĞRULUK ORANI BU SATIRDA YOK. Tur boyunca "%80 doğru" yazan bir
          alan vardı ve ilk soruda söyleyecek bir şeyi olmadığı için
          "hadi başlayalım" diyordu — ölçü değil dolgu. Oran turun sonunda
          zaten veriliyor; Android bu satırda hiç göstermiyordu. */}
      <div className="mb-3 flex shrink-0 items-center gap-3 text-caption">
        {/* Ölçüler ORTAK BİLEŞENDE: bu düğme Android'in ölçüsünü elle
            kopyalıyordu ve aynı kopya beş yerde vardı. `RoundExit` tek
            kaynak. */}
        <RoundExit onExit={() => setConfirmExit(true)} labelKey="game.quit_round" />
        <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full surface-2">
          <motion.div
            className="brand-gradient h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 180, damping: 26 }}
          />
        </div>
        {/* Combo üç doğrudan önce görünmüyor: her doğru cevapta yanıp sönen
            bir rozet, ödül olmaktan çıkıp gürültü olurdu. */}
        {combo >= 3 ? (
          <motion.span
            key={combo}
            initial={{ scale: 1.35 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 16 }}
            className="flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-micro"
            /* Mobil seri hapı `info` (gök) tonunda; web mordaydı ve aynı rozet
               iki uygulamada iki ayrı şey söylüyor gibi duruyordu. */
            style={{
              background: "color-mix(in srgb, var(--color-sky-500) 14%, transparent)",
              color: "var(--color-sky)",
            }}
          >
            <SparkIcon size={12} /> {t("sessionw.combo", { n: combo })}
          </motion.span>
        ) : null}
        {(() => {
          const ws = round.game === "match" ? round.words : [round.word];
          const isNew = ws.every((w) => w.isNew);
          return (
            <span
              /* Ortak yumuşak tint (`tint-soft`): iki çipin oranı ayrıydı
                 (%14 / %16) ve washleri takma addan kuruluyordu. */
              className="tint-soft shrink-0 rounded-full px-2 py-0.5 text-micro uppercase tracking-eyebrow"
              style={{
                "--tint-fill": isNew ? "var(--color-brand-500)" : "var(--color-flame-500)",
                "--tint-ink": isNew ? "var(--color-brand)" : "var(--color-flame)",
              } as React.CSSProperties}
            >
              {t(isNew ? "session.chip_new" : "session.chip_review")}
            </span>
          );
        })()}
        <span className="muted shrink-0 tabular-nums">
          {index + 1} / {session!.rounds.length}
        </span>
      </div>
      {/* Hangi pratikte olunduğu ekranda yazıyor: tur tek oyundan kuruluysa
          bunu söyleyen tek yer buydu, mobilde de öyle. */}
      {onlyGame ? (
        <p className="muted mb-2 shrink-0 text-center text-micro uppercase tracking-eyebrow">
          {t("game.practice_suffix", { game: t(GAME_LABEL_KEYS[onlyGame]) })}
        </p>
      ) : null}

      {saveWarning ? (
        <div
          className="mb-3 flex shrink-0 items-center gap-2 rounded-panel px-3 py-2 text-body"
          style={{
            background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)",
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

/*
  DURUM ŞABLONU (`components/flow` `StateBody`): maskot durumu söylüyor
  (giriş = el sallayan, hata = üzgün), tek cümle, tek birincil çıkış + metin
  bağlantısı. Mobil `GameScreen` `auth`/`error` dallarıyla aynı yerleşim;
  metinler webin üç ayrı sebebini (oturum, sunucu, bağlantı) koruyor.
*/
function ErrorCard({ kind, onRetry, onClose }: { kind: ErrorKind; onRetry: () => void; onClose: () => void }) {
  const t = useT();
  const content = {
    auth: { title: t("session.expired"), body: t("session.expired_sub") },
    db: { title: t("session.load_failed"), body: t("session.load_failed_sub") },
    network: { title: t("session.offline"), body: t("session.offline_sub") },
  }[kind];

  return (
    <FlowColumn>
      {/* Hata DUYURULUYOR (`alert`): ekranı kaplayan bir hata metni canlı
          bölge değilse ekran okuyucu kullanan biri hiçbir şey duymuyor. */}
      <StateBody alert title={content.title} body={content.body}>
        <FlowActions
          primary={kind === "auth" ? { label: t("auth.sign_in"), href: "/login" } : { label: t("common.try_again"), onClick: onRetry }}
          tertiary={{ label: t("common.close"), onClick: onClose }}
        />
      </StateBody>
    </FlowColumn>
  );
}

function EmptyCard({
  meta,
  onlyGame,
  onExtra,
  onMixed,
  onClose,
}: {
  meta: SessionPayload["meta"] | undefined;
  onlyGame: PlayableGame | null;
  onExtra: () => void;
  onMixed: () => void;
  onClose: () => void;
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
      <FlowColumn>
        <StateBody title={t("session.no_words_for_game", { game: t(GAME_LABEL_KEYS[onlyGame]) })} body={t("session.review_only_mode")}>
          <FlowActions primary={{ label: t("session.back_to_mixed"), onClick: onMixed }} tertiary={{ label: t("common.close"), onClick: onClose }} />
        </StateBody>
      </FlowColumn>
    );
  }

  /* Hedef tamam bir durum, sonuç değil ama olumlu: kutlayan maskot. Günün
     özeti gövdenin ikinci cümlesi — mobil `goal_done` aynı birleşimi yazıyor. */
  return (
    <FlowColumn>
      <StateBody
        title={t("session.goal_done")}
        body={
          meta
            ? `${t("session.goal_done_sub")} ${t("session.today_summary", { reviews: meta.reviewsToday, news: meta.newToday, streak: meta.currentStreak })}`
            : t("session.goal_done_sub")
        }
      >
        <FlowActions primary={{ label: t("session.continue_with_new"), onClick: onExtra }} tertiary={{ label: t("common.close"), onClick: onClose }} />
      </StateBody>
    </FlowColumn>
  );
}

/**
 * ETAP KARTI — sonuç şablonunun küçük hâli (mobil `GameScreen` `StageCard`).
 *
 * İki işi var. Birincisi turu bitirilebilir kılmak: 20 turluk bir blok
 * kullanıcıyı başlamadan kaçırıyordu, beş tur ise bir oturuşta bitiyor.
 * İkincisi durmayı meşrulaştırmak — "şimdilik yeter" bir vazgeçme değil,
 * sunulan bir seçenek. İlerleme zaten sunucuda; ertesi gün kaldığı yerden
 * devam ediyor.
 *
 * BAHİS KURALI ÜÇ SONUÇ SATIRI: anahtar kapalıyken tek satır özet, açılınca
 * üç olası sonuç ve "önceki XP'lerin güvende". Eski tek cümle bir yanlışta
 * ne olduğunu hiç söylemiyordu — gizli kuralı olan bir bahis, bahis değil
 * tuzaktır.
 */
function StageCard({
  stage,
  stages,
  correct,
  total,
  bestCombo,
  xp,
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
  /** Bu etabın istemci tahmini XP'si (doğru 10, yanlış 3) — mobille aynı sayı. */
  xp: number;
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
    /* Kutlama yalnızca etap tertemiz geçtiyse: her etapta patlayan konfeti
       birkaç turda değersizleşir. */
    <FlowColumn celebrate={perfect}>
      <ResultHero
        eyebrow={t("stage.counter", { n: stage, total: stages })}
        title={t(perfect ? "stage.clean" : "stage.done")}
        sub={`${correct}/${total}`}
        segments={{ done: stage, total: stages }}
      />
      <StatRow
        items={[
          { value: `${correct}/${total}`, label: t("stage.this_stage") },
          { value: bestCombo > 0 ? String(bestCombo) : "—", label: t("stage.best_streak") },
          { value: `+${xp}`, label: "XP" },
        ]}
      />
      {/* Kapanan bahsin sonucu: kazanılan, berabere ve yanan üç hâl de açık.
          Sessizce eklenen/eksilen puan bahsi gürültüye çevirirdi. */}
      {wagerResult !== null ? <WagerNote delta={wagerResult} /> : null}

      <button
        type="button"
        role="switch"
        aria-checked={bet}
        onClick={() => {
          setBet((b) => !b);
          vibrate("tap");
        }}
        className="flex w-full flex-col gap-2 rounded-card p-3 text-left transition-colors"
        style={{
          background: bet ? "color-mix(in srgb, var(--color-flame-500) 14%, transparent)" : "var(--surface)",
          boxShadow: `inset 0 0 0 1.5px ${bet ? "var(--color-flame)" : "var(--hairline)"}`,
        }}
      >
        <span className="flex w-full items-center gap-3">
          <span className="min-w-0 flex-1">
            <span className="block text-strong">{t("wager.next_stage")}</span>
            <span className="muted block text-caption">{t("wager.rules")}</span>
          </span>
          <span
            className="flex h-[22px] w-10 shrink-0 items-center rounded-full p-0.5 transition-colors"
            style={{ background: bet ? "var(--color-flame)" : "var(--border)" }}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className="h-[18px] w-[18px] rounded-full bg-white"
              style={{ marginLeft: bet ? "auto" : 0 }}
            />
          </span>
        </span>
        {bet ? (
          <span className="flex w-full flex-col gap-1.5 border-t pt-2" style={{ borderColor: "var(--hairline)" }}>
            <WagerLine icon={<CheckIcon size={14} style={{ color: "var(--color-mint)" }} />} text={t("wager.outcome_all", { n: STAGE_SIZE })} />
            <WagerLine icon={<BoltIcon size={14} className="muted" />} text={t("wager.outcome_one")} />
            <WagerLine icon={<XIcon size={14} style={{ color: "var(--color-rose)" }} />} text={t("wager.outcome_two")} />
            <span className="muted block text-caption">{t("wager.safe")}</span>
          </span>
        ) : null}
      </button>

      <div className="flex flex-col gap-1">
        <FlowActions
          primary={{ label: t(bet ? "stage.continue_bet" : "stage.continue", { n: remaining }), onClick: () => onContinue(bet) }}
          tertiary={{ label: t("stage.enough"), onClick: onStop }}
        />
        <p className="muted text-center text-micro">{t("stage.stop_note")}</p>
      </div>
    </FlowColumn>
  );
}

function WagerLine({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-2 text-caption">
      {icon}
      <span>{text}</span>
    </span>
  );
}

/** Bahsin sonucu tek satır — etap kartında ve özette aynı biçim. */
function WagerNote({ delta }: { delta: number }) {
  const t = useT();
  return (
    <FlowNote
      tone={delta > 0 ? "ok" : delta < 0 ? "warn" : "neutral"}
      icon={<BoltIcon size={16} />}
      text={delta > 0 ? t("stage.wager_won", { xp: delta }) : delta < 0 ? t("stage.wager_lost", { xp: delta }) : t("wager.even")}
    />
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
  onlyGame,
  wagerResult,
  saveWarning,
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
  /** Hedefli tur (zayıf nokta): Erdi bandda değil, altında konuşuyor (WP-66). */
  targeted?: boolean;
  /** Tek oyunlu tur: bandın üst satırı pratiğin adı. */
  onlyGame: PlayableGame | null;
  /** Kapanan son bahsin farkı (etap kartıyla aynı değişken). */
  wagerResult: number | null;
  saveWarning: null | "queued" | "dropped";
  onContinue: () => void;
  onChallenge: () => void;
  /** Özet ekranından çıkış — turdan sonra Öğren merkezine dönüş. */
  onFinish: () => void;
}) {
  const t = useT();
  const lang = useLang();
  const total = tally.total;
  const accuracy = total ? Math.round((tally.correct / total) * 100) : 0;
  const xp = result?.xpGained ?? tally.xp;
  const mastered = result?.newlyMastered ?? 0;
  // Konfeti yalnızca gerçekten iyi bir tur sonunda: her seferinde patlarsa
  // değersizleşir. Kelime pekiştirmek de kutlanmayı hak eder — o, oturum
  // doğruluğunun aksine gerçekten kazanılmış bir şey.
  const deserved = mastered > 0 || (accuracy >= 80 && total >= 4);

  // Oturumun kapanış sesi. Hak edilmiş turda yükselen ezgi, sıradan turda
  // yumuşak bir kadans — ikisi de "bitti" diyor ama aynı tonda değil.
  useEffect(() => {
    play(deserved ? "perfect" : "finish");
  }, [deserved]);

  /*
    SONUÇ ŞABLONU (`components/flow`): band → üç sayı → notlar → ayrıntı
    kartları → düğmeler; mobil `GameScreen` `done` ile aynı alanlar, aynı
    sıra. Eskiden maskot, halka, başlık, XP, sayılar ve beş ayrı renkli kutu
    aynı ağırlıkta alt alta diziliyordu. Halka kalktı: bandın ana sayısı
    (doğru/toplam) aynı bilgiyi veriyor.
  */
  return (
    <FlowColumn celebrate={deserved}>
      {/* PAYLAŞ İKİNCİL: mobilde üst çubuğun sağında. Düğme grubunun içinde
          dururken "bitir"i aşağı itiyor ve ekranın asıl kararı (devam mı,
          bitir mi) dört düğmeye bölünüyordu. */}
      {total > 0 ? (
        <div className="flex justify-end">
          <div className="w-fit">
            <ShareResult marks={marks} total={total} accuracy={accuracy} streak={result?.currentStreak ?? 0} level={level} />
          </div>
        </div>
      ) : null}
      <ResultHero
        eyebrow={onlyGame ? t("game.practice_suffix", { game: t(GAME_LABEL_KEYS[onlyGame]) }) : t("flow.round")}
        title={t(total ? (partial ? "summary.stopped" : "common.round_done") : "game.done_no_more")}
        figure={total ? `${tally.correct}/${total}` : null}
        sub={total ? (xp > 0 ? `+${xp} XP · ${t("game.saved")}` : t("game.saved")) : t("game.nothing_to_review")}
      />
      {targeted && total > 0 ? <CoachLine moment="weak_done" /> : null}
      {total > 0 ? (
        <StatRow
          items={[
            { value: formatPercent(accuracy, lang), label: t("summary.accuracy") },
            { value: String(total), label: t("summary.words") },
            { value: t("profile.days", { n: result?.currentStreak ?? 0 }), label: t("summary.streak") },
          ]}
        />
      ) : null}

      {/* Tek satırlık notlar: kazanılan, uyarılan, kurtarılan — hepsi aynı biçimde. */}
      {mastered > 0 ? <FlowNote tone="ok" icon={<CheckIcon size={16} />} text={t("sessionw.n_mastered", { n: mastered })} /> : null}
      {/* Son etap bahisliyse sonucu burada kapanıyor: etap kartı gösterilmeden
          tur bittiği için başka söylenecek yer yok. */}
      {wagerResult !== null ? <WagerNote delta={wagerResult} /> : null}
      {/* Kaybedildiği sanılan seri geri alındıysa bunu söylemek şart: sessiz
          bir onarım ekrandaki sayıyı açıklanamaz hâle getirir. */}
      {result?.streakRepaired ? (
        <FlowNote tone="warn" icon={<FlameIcon size={16} />} text={`${t("game.streak_saved")} · ${t("game.streak_saved_sub", { n: result.currentStreak })}`} />
      ) : null}
      {/* Bu bir UYARI, hata değil — tur oynandı, yalnız kaydı bekliyor. */}
      {saveWarning ? <FlowNote tone="warn" icon={<AlertIcon size={16} />} text={saveWarning === "dropped" ? t("session.save_failed") : t("session.save_queued")} /> : null}

      {/* ZORLANDIKLARIN — en çok altı satır; gerisi "Kelimelerim"de. Kelime
          listesinin girişi burası: merakın doğduğu an tam bu ekran. */}
      {missed.length ? (
        <DetailCard
          title={t("session.missed_title", { n: missed.length })}
          right={
            <Link href="/words?status=learning" prefetch={false} className="text-caption font-extrabold underline-offset-2 hover:underline" style={{ color: "var(--color-brand)" }}>
              {t("words.my_words")}
            </Link>
          }
        >
          {missed.slice(0, 6).map((w) => (
            <DetailRow key={w.id} left={w.de} right={w.tr} lang="de" />
          ))}
          {missed.length > 6 ? <p className="muted text-caption">{t("session.n_more_words", { n: missed.length - 6 })}</p> : null}
          <p className="muted text-caption">
            {result && result.dueTomorrow > 0 ? t("sessionw.due_tomorrow", { n: result.dueTomorrow }) : t("session.missed_note")}
          </p>
        </DetailCard>
      ) : result && result.dueTomorrow > 0 ? (
        /* Ertesi güne dair somut bir sayı: yarın uygulamayı açmak için sebep. */
        <FlowNote icon={<RefreshIcon size={16} className="muted" />} text={t("sessionw.due_tomorrow", { n: result.dueTomorrow })} />
      ) : null}

      {result && result.dailyGoal > 0 ? (
        <DetailCard
          title={t("learn.daily_goal")}
          right={result.goalReached ? <span className="text-caption font-extrabold" style={{ color: "var(--color-mint)" }}>{t("session.goal_reached")}</span> : null}
        >
          <div className="h-2 w-full overflow-hidden rounded-full surface-2">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--color-mint)" }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.round((result.reviewsToday / result.dailyGoal) * 100))}%` }}
              transition={{ delay: 0.2, type: "spring", stiffness: 160, damping: 24 }}
            />
          </div>
          <p className="muted text-caption tabular-nums">
            {result.reviewsToday} / {result.dailyGoal}
          </p>
        </DetailCard>
      ) : null}

      {/* Hatırlatma izni tam burada isteniyor: tur bitti, XP göründü, seri
          ekranda duruyor. Girişte sorulan izin reddedilir ve tarayıcıda
          kalıcı olarak kapanır — ikinci şans yok. Mobilde izin ayrı bir
          hazırlık ekranından isteniyor (`NotifPrimeScreen`). */}
      <PushOptIn streak={result?.currentStreak ?? 0} />

      <FlowActions
        primary={{ label: t(partial ? "summary.back_to_round" : "game.continue"), onClick: onContinue }}
        /* HAYATTA KALMA: kullanıcının en ısındığı an (tur az önce bitti). */
        secondary={{ label: t("challenge.title"), icon: <FlameIcon size={18} style={{ color: "var(--color-rose)" }} />, onClick: onChallenge }}
        /* KAPANIŞ — turda sekme çubuğu yok; özetten Öğren'e dönmenin yolu bu. */
        tertiary={{ label: t("common.finish"), onClick: onFinish }}
      />
    </FlowColumn>
  );
}
