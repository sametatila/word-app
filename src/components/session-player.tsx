"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GAME_LABELS,
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
import { LevelBadge } from "@/components/level-badge";
import { prefetchGerman } from "@/components/speak-button";
import { ChallengePlayer } from "@/components/challenge-player";
import { Confetti, CountUp } from "@/components/celebrate";
import { play, resetCombo } from "@/lib/sfx";
import { fx } from "@/lib/fx";
import { track } from "@/lib/track";
import { FitBox } from "@/components/fit-box";
import { AnswerPulse } from "@/components/answer-pulse";
import { PushOptIn } from "@/components/push-optin";
import { ShareResult } from "@/components/share-result";
import { GamePicker } from "@/components/game-picker";
import { Mascot } from "@/components/mascot";
import { MascotPop } from "@/components/mascot-pop";
import { MascotFx } from "@/components/mascot-fx";
import { Stagger } from "@/components/reveal";
import { DailyPlayer } from "@/components/daily-player";
import { DailyCard } from "@/components/daily-card";
import { ChallengeCard } from "@/components/challenge-card";
import { CheatsheetCard } from "@/components/cheatsheet-card";
import { WalkCard } from "@/components/walk-card";
import { WalkPlayer } from "@/components/walk-player";
import { QuestCard } from "@/components/quest-card";
import { AlertIcon, FlameIcon, RefreshIcon } from "@/components/icons";

type Status =
  | "loading"
  | "ready"
  | "playing"
  | "stage"
  | "done"
  | "empty"
  | "error"
  | "challenge"
  | "daily"
  | "walk";

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
 * Seçilen oyun modunun cihazdaki yeri.
 *
 * Seçim önce yalnızca bileşenin belleğindeydi ve uygulamayı kapatmak (ya da
 * başka bir sekmeye geçip dönmek) onu siliyordu: kullanıcı "Artikel Yarışı"
 * seçiyor, ertesi açılışta kendini karışık turda buluyordu. Oyun modu bir
 * tercih — kullanıcı değiştirene kadar geçerli kalmalı.
 */
const GAME_MODE_KEY = "wortspiel-game-mode";

function readGameMode(): PlayableGame | null {
  try {
    const raw = localStorage.getItem(GAME_MODE_KEY);
    return raw && (PLAYABLE_GAMES as readonly string[]).includes(raw)
      ? (raw as PlayableGame)
      : null;
  } catch {
    return null;
  }
}

function writeGameMode(game: PlayableGame | null) {
  try {
    if (game) localStorage.setItem(GAME_MODE_KEY, game);
    else localStorage.removeItem(GAME_MODE_KEY);
  } catch {
    /* depolama kapalıysa seçim yalnızca bu oturum boyunca geçerli olur */
  }
}

type ErrorKind = "auth" | "db" | "network";

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function SessionPlayer({ leaderboard }: { leaderboard?: ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [index, setIndex] = useState(0);
  const [tally, setTally] = useState({ correct: 0, total: 0, xp: 0 });
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [errorKind, setErrorKind] = useState<ErrorKind>("db");
  const [saveWarning, setSaveWarning] = useState(false);
  const startedAt = useRef(Date.now());
  const pending = useRef<Answer[]>([]);
  const sessionXp = useRef(0);
  const missed = useRef<MissedWord[]>([]);
  // Cevapların doğru/yanlış sırası — paylaşılan özetteki kareler bu.
  // `pending` gönderildikten sonra boşaldığı için ayrı tutuluyor.
  const marks = useRef<boolean[]>([]);
  // Yarım kalan tur artık sunucudan gelir; cihazda hiçbir şey saklanmaz.
  const [resumable, setResumable] = useState<SessionProgress | null>(null);
  /** Tek oyunlu tur seçiliyse o oyun; karışık turda null. */
  const [onlyGame, setOnlyGame] = useState<PlayableGame | null>(null);
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
   * `wortspiel:stats`. Sinyal olmasaydı tam ekran bir kutlama 7. turun
   * ortasında belirir, kutlama olmaktan çıkıp kesinti olurdu. Kabuk bu
   * bayrağı görünce kuyruğu tutuyor ve etap/özet ekranında salıyor.
   */
  useEffect(() => {
    const playing =
      status === "playing" || status === "challenge" || status === "daily" || status === "walk";
    window.dispatchEvent(new CustomEvent("wortspiel:busy", { detail: { busy: playing } }));
  }, [status]);

  const load = useCallback(
    async (opts: { extra?: boolean; fresh?: boolean; game?: PlayableGame | null } = {}) => {
    setStatus("loading");
    setIndex(0);
    setTally({ correct: 0, total: 0, xp: 0 });
    setResult(null);
    setResumable(null);
    pending.current = [];
    sessionXp.current = 0;
    missed.current = [];
    marks.current = [];
    setCombo(0);
    setCheer(0);
    resetCombo();
    play("start");
    track("session_start");
    wagerOn.current = false;
    setWagerResult(null);
    bestCombo.current = 0;
    stoppedEarly.current = false;
    stageStart.current = { index: 0, correct: 0, total: 0, xp: 0 };
    // Seçim `undefined` ise dokunulmuyor, `null` ise karışık tura dönülüyor.
    const game = opts.game === undefined ? onlyGameRef.current : opts.game;
    onlyGameRef.current = game;
    setOnlyGame(game);
    writeGameMode(game);
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
      startedAt.current = Date.now();
      setStatus(data.rounds.length ? "ready" : "empty");
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
    // Açılışta cihazdaki tercih geri yükleniyor: kullanıcı hangi modda
    // bıraktıysa orada devam ediyor.
    void load({ game: readGameMode() });
  }, [load]);

  /** Kaldığı yerden devam: sunucudaki ilerlemeyi yerine koyar. */
  function resume() {
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
    if (resumable) {
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
          pending.current = [...batch, ...pending.current]; // kaybetme, sonraki turda tekrar dene
          setSaveWarning(true);
          return null;
        }
        setSaveWarning(false);
        const data = (await res.json()) as AnswerResult;
        sessionXp.current += data.xpGained;
        if (wager) setWagerResult(data.wagerXp ?? 0);
        // üst bardaki seri/XP rozetlerini anında güncelle
        window.dispatchEvent(
          new CustomEvent("wortspiel:stats", {
            detail: { xp: data.totalXp, streak: data.currentStreak },
          }),
        );
        return data;
      } catch {
        pending.current = [...batch, ...pending.current];
        setSaveWarning(true);
        return null;
      }
    },
    [],
  );

  const handleDone = useCallback(
    async (round: Round, results: GameResult[]) => {
      const enriched: Answer[] = results.map((r) => ({ ...r, game: round.game }));
      pending.current.push(...enriched);
      marks.current.push(...results.map((r) => r.correct));

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
      const progress: SessionProgress = { ...next, index: nextIndex, missed: missed.current };

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
        track("session_done", next.correct);
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

  if (status === "daily")
    return (
      <Screen fills>
        <DailyPlayer
          onExit={() => {
            router.refresh();
            void load();
          }}
        />
      </Screen>
    );
  if (status === "walk")
    return (
      <Screen fills>
        <WalkPlayer
          onExit={() => {
            router.refresh();
            void load();
          }}
        />
      </Screen>
    );
  if (status === "challenge")
    return (
      <Screen fills>
        <ChallengePlayer
          onExit={() => {
            router.refresh();
            void load();
          }}
        />
      </Screen>
    );
  if (status === "loading")
    return (
      <Screen fills>
        <LoadingCard />
      </Screen>
    );
  if (status === "ready" && session)
    return (
      <Screen>
        <StartCard
          meta={session.meta}
          rounds={session.rounds}
          resumable={resumable}
          onlyGame={onlyGame}
          onStart={() => void startFresh()}
          onResume={resume}
          onPickGame={(game) => void load({ game, fresh: true })}
          onDaily={() => {
            track("daily_play");
            setStatus("daily");
          }}
          onChallenge={() => {
            track("challenge_play");
            setStatus("challenge");
          }}
          onWalk={() => setStatus("walk")}
          leaderboard={leaderboard}
        />
      </Screen>
    );
  if (status === "error")
    return (
      <Screen>
        <ErrorCard kind={errorKind} onRetry={() => void load()} />
      </Screen>
    );
  if (status === "empty")
    return (
      <Screen>
        <EmptyCard
          meta={session?.meta}
          onlyGame={onlyGame}
          onExtra={() => void load({ extra: true })}
          onMixed={() => void load({ game: null, fresh: true })}
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
          onContinue={() => {
            router.refresh();
            void load();
          }}
          onChallenge={() => {
            track("challenge_play");
            setStatus("challenge");
          }}
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
      <div className="mb-2 shrink-0">
        <LevelBadge
          level={session!.meta.level}
          mastered={session!.meta.coverage.mastered}
          total={session!.meta.coverage.total}
        />
      </div>
      <div className="mb-3 shrink-0">
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
          <span className="muted flex items-center gap-2">
            {index + 1} / {session!.rounds.length}
            {(() => {
              const ws = round.game === "match" ? round.words : [round.word];
              const isNew = ws.every((w) => w.isNew);
              return (
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide"
                  style={{
                    background: isNew
                      ? "color-mix(in srgb, var(--color-brand) 14%, transparent)"
                      : "color-mix(in srgb, var(--color-flame) 16%, transparent)",
                    color: isNew ? "var(--color-brand)" : "var(--color-flame)",
                  }}
                >
                  {isNew ? "yeni" : "tekrar"}
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
              className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-black"
              style={{
                background: "color-mix(in srgb, var(--color-flame) 16%, transparent)",
                color: "var(--color-flame)",
              }}
            >
              <FlameIcon size={12} /> {combo} üst üste
            </motion.span>
          ) : (
            <span className="muted">
              {tally.total > 0 ? `%${Math.round((tally.correct / tally.total) * 100)} doğru` : "Hadi başlayalım"}
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
        {/* Cevap verildiği an dolan çizgi: "seçimin alındı, geçiliyor" sinyali. */}
        <div className="mt-1">
          <AnswerPulse />
        </div>
      </div>

      {saveWarning ? (
        <div
          className="mb-3 flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm"
          style={{
            background: "color-mix(in srgb, var(--color-flame) 12%, transparent)",
            color: "var(--color-flame)",
          }}
        >
          <AlertIcon size={16} />
          Cevapların kaydedilemiyor — bağlantın döndüğünde otomatik gönderilecek.
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
            <GameSwitch round={round} onDone={(res) => void handleDone(round, res)} />
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
function Screen({ fills, children }: { fills?: boolean; children: ReactNode }) {
  return <div className={fills ? "flex min-h-0 flex-1 flex-col" : "flex flex-col"}>{children}</div>;
}

function StartCard({
  meta,
  rounds,
  resumable,
  onlyGame,
  onStart,
  onResume,
  onPickGame,
  onDaily,
  onChallenge,
  onWalk,
  leaderboard,
}: {
  meta: SessionPayload["meta"];
  rounds: Round[];
  /** Sunucudaki yarım kalan tur — varsa "kaldığın yerden devam" gösterilir. */
  resumable: SessionProgress | null;
  /** Tek oyunlu tur seçiliyse o oyun; karışık turda null. */
  onlyGame: PlayableGame | null;
  onStart: () => void;
  onResume: () => void;
  onPickGame: (game: PlayableGame | null) => void;
  onDaily: () => void;
  onChallenge: () => void;
  onWalk: () => void;
  /** Sunucuda hazırlanan sıralama tablosu — yalnızca bu kartta görünür. */
  leaderboard?: ReactNode;
}) {
  const words = rounds.flatMap((r) => (r.game === "match" ? r.words : [r.word]));
  const newCount = new Set(words.filter((w) => w.isNew).map((w) => w.id)).size;
  const reviewCount = new Set(words.filter((w) => !w.isNew).map((w) => w.id)).size;
  const goalPct = Math.min(100, Math.round((meta.reviewsToday / Math.max(1, meta.dailyGoal)) * 100));
  const name = meta.displayName?.split(" ")[0];

  // Kaç kişi bu kartı görüp hiç başlamadan çıkıyor — beşerli etaplar tam da
  // bu ölçüm yüzünden eklenmişti ama ölçüm elle yapılmıştı. Artık akıyor.
  useEffect(() => {
    track("start_card", rounds.length);
  }, [rounds.length]);

  return (
    /*
      Başlangıç ekranının bölümleri TEK zincirle açılıyor.

      Önce her kart kendi giriş animasyonunu yapıyordu: altı bölüm aynı anda
      ama farklı mesafelerle (kimi 8, kimi 14 piksel) beliriyordu — hepsi
      birden oynayan ama aynı ritmi tutmayan bir hareket. Şimdi sıra okunma
      sırasıyla aynı: karşılama, başka türlü oyna, görevler, oyun seçici,
      sıralama.
    */
    <Stagger className="mx-auto w-full max-w-md">
      <div className="card overflow-hidden">
        <div className="brand-gradient-deep px-6 py-5 text-white sm:py-7">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm opacity-90">
                {meta.currentStreak > 0
                  ? `${meta.currentStreak} günlük seridesin`
                  : "Bugün serini başlat"}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <h1 className="text-xl font-bold sm:text-2xl">
                  {name ? `Hoş geldin, ${name}` : "Hoş geldin"}
                </h1>
                <span className="rounded-lg bg-white/25 px-2 py-0.5 text-sm font-black">
                  {meta.level}
                </span>
              </div>
            </div>
            {/* Erdi karşılamayı üstleniyor. Seri varsa keyfi yerinde, yoksa
                bekliyor — "bugün serini başlat" cümlesinin altını çiziyor. */}
            <Mascot mood={meta.currentStreak > 0 ? "happy" : "idle"} size={62} className="-my-2 shrink-0" />
          </div>
          <div className="mt-3 sm:mt-4">
            <div className="mb-1.5 flex justify-between text-xs font-semibold opacity-90">
              <span>Günlük hedef</span>
              <span>
                {meta.reviewsToday} / {meta.dailyGoal}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/25">
              <motion.div
                className="h-full rounded-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${goalPct}%` }}
                transition={{ type: "spring", stiffness: 150, damping: 24 }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x" style={{ borderColor: "var(--border)" }}>
          <div className="px-4 py-3 text-center sm:py-4">
            <div className="text-xl font-bold text-[color:var(--color-flame)]">{reviewCount}</div>
            <div className="muted text-xs">tekrar sırası gelen</div>
          </div>
          <div className="px-4 py-3 text-center sm:py-4">
            <div className="text-xl font-bold text-[color:var(--color-brand)]">{newCount}</div>
            <div className="muted text-xs">yeni kelime</div>
          </div>
        </div>

        <div className="px-6 pb-5 pt-3 sm:pb-6 sm:pt-4">
          {/* Tempo bilgisi — bir başarı notu değil, bugün ne kadar yük alındığı.
              Eski "zorluk yükseltildi / hafifletildi" metni oturum doğruluğunu
              yetkinlik sanıyordu; o ölçü kuyruğun bileşimini ölçüyordu. */}
          {meta.pacing !== "normal" ? (
            <div
              className="mb-4 rounded-xl px-3 py-2.5 text-center text-sm"
              style={{ background: "var(--surface-2)" }}
            >
              <strong style={{ color: "var(--color-flame)" }}>
                {meta.pacing === "review" ? "Bugün tekrar günü" : "Bugün tempo biraz düşük"}
              </strong>
              <p className="muted mt-1 text-xs">
                {meta.pacing === "review"
                  ? `${meta.dueCount} tekrar birikmiş — bugün onları kapatıyoruz.`
                  : `${meta.leeches} kelimede takılıyorsun — yeni kelime yarıya indi.`}
              </p>
            </div>
          ) : null}

          {resumable ? (
            <div className="space-y-2">
              <button onClick={onResume} className="btn btn-primary w-full px-5 py-3.5">
                Kaldığın yerden devam et ({resumable.index + 1}. tur)
              </button>
              <button onClick={onStart} className="btn btn-ghost w-full px-5 py-3">
                Yeni tura başla
              </button>
            </div>
          ) : (
            <button onClick={onStart} className="btn btn-primary w-full px-5 py-3.5 text-base">
              {onlyGame
                ? `${GAME_LABELS[onlyGame]} · ${rounds.length} tur`
                : `${rounds.length} turluk oturuma başla`}
            </button>
          )}

          {/*
            Butonun altında eskiden iki açıklama bloğu vardı ve ikisi de
            sistemin NASIL çalıştığını anlatıyordu: tekrarların kendiliğinden
            geleceği, zorluğun kelimeye göre seçildiği, seviyeyi yalnızca
            kullanıcının değiştirdiği. Bunlar bir kez öğrenilen şeyler; her
            açılışta okunmuyor, sadece kartı uzatıp başlat düğmesini aşağı
            itiyordu. Geriye tek satır kaldı ve o da bir açıklama değil, bir
            SAYI — kullanıcının biriktirdiği şey.
          */}
          {meta.coverage.total > 0 ? (
            <p className="muted mt-4 text-center text-sm">
              {meta.level} havuzunda{" "}
              <strong style={{ color: "var(--color-mint)" }}>
                {meta.coverage.mastered.toLocaleString("tr-TR")}
              </strong>
              {" / "}
              {meta.coverage.total.toLocaleString("tr-TR")} kelime pekişti
            </p>
          ) : null}
        </div>
      </div>
      {/*
        BAŞKA TÜRLÜ OYNA — normal turdan farklı üç oynama şekli.

        Üçü de ayrı beyaz kutulardı ve sayfadaki diğer her kartla aynı ağırlığı
        taşıyorlardı: başlat düğmesinden sonra altı eşit kutu geliyor, hangisinin
        turun başka bir şekli, hangisinin bir ayar olduğu ayırt edilmiyordu.

        Başlık "Bugün" değil: günün turu ve hayatta kalma turu bugüne özel ama
        yürürken modu değil — o her zaman orada duran bir oynama biçimi.
        Üçünü birleştiren şey zamanları değil, normal turun yerine geçmeleri.
      */}
      <section className="card mx-auto mt-4 w-full max-w-md overflow-hidden">
        <SectionTitle>Başka türlü oyna</SectionTitle>
        {/* Renk `divide-[color:…]` ile veriliyor, sarmalayıcının `style`ı ile
            değil: `border-color` miras alınmıyor, çocuklar `currentColor`a
            düşüyor ve ayırıcılar metin rengiyle — yani neredeyse siyah —
            çiziliyordu. */}
        <div className="divide-y divide-[color:var(--border)]">
          <DailyCard onPlay={onDaily} bare />
          <ChallengeCard best={meta.challengeBest} onPlay={onChallenge} bare />
          <WalkCard onPlay={onWalk} bare />
          {/* Dilbilgisi en altta: diğer üçü bir TUR açıyor, bu bir EKRAN
              açıyor. Sıralamada da o fark korunuyor. */}
          <CheatsheetCard bare />
        </div>
      </section>

      {/* Görevler kendi kartında: bugüne özel değil, açık kaldığı sürece duran
          bir hedef listesi. */}
      <QuestCard />
      <GamePicker active={onlyGame} onPick={onPickGame} />
      {leaderboard}
    </Stagger>
  );
}

function LoadingCard() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className="brand-gradient h-12 w-12 rounded-2xl"
          animate={{ rotate: [0, 90, 180, 270, 360], borderRadius: ["30%", "50%", "30%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="muted text-sm">Bugünün kelimeleri hazırlanıyor…</p>
      </div>
    </div>
  );
}

function ErrorCard({ kind, onRetry }: { kind: ErrorKind; onRetry: () => void }) {
  const content = {
    auth: {
      title: "Oturumun sona ermiş",
      body: "İlerlemen kayıtlı — girince kaldığın yerden devam edersin.",
      action: (
        <Link href="/login" className="btn btn-primary mt-5 w-full px-5 py-3.5">
          Giriş yap
        </Link>
      ),
    },
    db: {
      title: "Kelimeler yüklenemedi",
      body: "Birkaç saniye sonra tekrar denemek genelde yetiyor.",
      action: (
        <button onClick={onRetry} className="btn btn-primary mt-5 flex w-full items-center justify-center gap-2 px-5 py-3.5">
          <RefreshIcon size={18} /> Tekrar dene
        </button>
      ),
    },
    network: {
      title: "İnternet bağlantısı yok",
      body: "Bağlantını kontrol et.",
      action: (
        <button onClick={onRetry} className="btn btn-primary mt-5 flex w-full items-center justify-center gap-2 px-5 py-3.5">
          <RefreshIcon size={18} /> Tekrar dene
        </button>
      ),
    },
  }[kind];

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="card p-6 text-center">
        <Mascot mood="sad" size={96} className="mx-auto" />
        <h2 className="mt-1 text-lg font-bold">{content.title}</h2>
        <p className="muted mt-2 text-sm">{content.body}</p>
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
          <h2 className="mt-1 text-xl font-bold">{GAME_LABELS[onlyGame]} için kelime yok</h2>
          {/* Tek cümle. Önce üç satırlık bir açıklama vardı ve modun nasıl
              çalıştığını baştan anlatıyordu; boş ekranda okunacak son şey bu. */}
          <p className="muted mt-2 text-sm">Bu mod yalnızca öğrendiğin kelimeleri tekrarlar.</p>
          <button onClick={onMixed} className="btn btn-primary mt-5 w-full px-5 py-3.5">
            Karışık tura dön
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
        <h2 className="mt-1 text-xl font-bold">Günlük hedefini tamamladın</h2>
        <p className="muted mt-2 text-sm">Planlanan tekrarların bitti.</p>
        {meta ? (
          <p className="muted mt-4 text-sm">
            Bugün <strong>{meta.reviewsToday}</strong> tekrar · <strong>{meta.newToday}</strong> yeni
            kelime · seri <strong>{meta.currentStreak} gün</strong>
          </p>
        ) : null}
        <button onClick={onExtra} className="btn btn-primary mt-5 w-full px-5 py-3.5">
          Yeni kelimelerle devam et
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

      <div className="card overflow-hidden">
        <div className="brand-gradient-deep px-6 py-5 text-center text-white">
          <motion.div
            initial={{ scale: 0.6, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 250, damping: 16 }}
            className="mx-auto w-fit"
          >
            <Mascot mood={perfect ? "cheer" : "happy"} size={72} />
          </motion.div>
          <p className="mt-1 text-sm opacity-90">
            Etap {stage} / {stages}
          </p>
          <h2 className="mt-0.5 text-xl font-bold">
            {perfect ? "Tertemiz" : "Etap tamam"}
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
          <Stat label="Bu etap" value={`${correct}/${total}`} />
          <Stat label="En uzun seri" value={bestCombo > 0 ? `${bestCombo}` : "—"} />
        </div>

        {/* Kapanan bahsin sonucu. Üç hâl var ve üçü de açıkça söyleniyor:
            kazanılan, boşa giden ve yanan. Sessizce eklenen/eksilen puan,
            bahsi bir mekanik olmaktan çıkarıp gürültüye çevirirdi. */}
        {wagerResult !== null ? (
          <div
            className="px-6 pt-4 text-center text-sm font-bold"
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
              ? `Bahis tuttu · +${wagerResult} XP`
              : wagerResult < 0
                ? `Bahis yandı · ${wagerResult} XP`
                : "Bahis başa baş — bir yanlış yeter de artmaz da"}
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
              fx("tap");
            }}
            aria-pressed={bet}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-colors"
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
              <span className="block text-sm font-bold">Sonraki etapta bahse gir</span>
              <span className="muted block text-xs">
                Beşi de doğruysa etabın puanı iki katı; iki yanlışta etap puan kazandırmaz.
                Önceki puanına dokunulmaz.
              </span>
            </span>
          </button>

          <button
            onClick={() => onContinue(bet)}
            className="btn btn-primary w-full px-5 py-3.5 text-base"
          >
            {bet ? `Bahisli devam · ${remaining} tur kaldı` : `Devam et · ${remaining} tur kaldı`}
          </button>
          <button onClick={onStop} className="btn btn-ghost w-full px-5 py-3">
            Şimdilik yeter
          </button>
          <p className="muted pt-1 text-center text-xs">
            Durursan ilerlemen kayıtlı kalır; bir sonraki gelişinde bu turdan devam edersin.
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
  onContinue,
  onChallenge,
}: {
  tally: { correct: number; total: number; xp: number };
  result: AnswerResult | null;
  missed: MissedWord[];
  /** Cevapların doğru/yanlış sırası — paylaşılan özetteki kareler. */
  marks: boolean[];
  level: string;
  /** Tur bitmeden bırakıldıysa özet "tamamlandı" demiyor. */
  partial?: boolean;
  onContinue: () => void;
  onChallenge: () => void;
}) {
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
      <Stagger className="card overflow-hidden">
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
            <Mascot mood={deserved ? "cheer" : accuracy >= 60 ? "happy" : "sad"} size={92} />
          </motion.div>
          <h2 className="mt-2 text-2xl font-bold">
            {partial ? "Buraya kadar" : "Tur tamamlandı"}
          </h2>
          <p className="mt-1 text-sm opacity-90">
            +<CountUp value={xp} /> XP
          </p>
        </div>

        <div className="grid grid-cols-3 divide-x" style={{ borderColor: "var(--border)" }}>
          <Stat label="Doğruluk" value={`%${accuracy}`} />
          <Stat label="Kelime" value={String(tally.total)} />
          <Stat label="Seri" value={`${result?.currentStreak ?? 0}g`} />
        </div>

        {/* Son etap bahisliyse sonucu burada kapanıyor: etap kartı
            gösterilmeden tur bittiği için başka söylenecek yer yok. */}
        {result?.wagerXp ? (
          <div
            className="border-b px-6 py-2.5 text-center text-sm font-bold"
            style={{
              borderColor: "var(--border)",
              color: result.wagerXp > 0 ? "var(--color-mint)" : "var(--color-flame)",
            }}
          >
            {result.wagerXp > 0
              ? `Son etapta bahis tuttu · +${result.wagerXp} XP`
              : `Son etapta bahis yandı · ${result.wagerXp} XP`}
          </div>
        ) : null}

        {result ? (
          <div className="px-6 pb-2">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold">
              <span className="muted">Günlük hedef</span>
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
              <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-sm font-semibold text-[color:var(--color-mint)]">
                <FlameIcon size={16} /> Günlük hedefi tamamladın
              </p>
            ) : null}
          </div>
        ) : null}

        {/* Seviye rozeti yerine gerçekten kazanılmış olan şey: pekişen kelime.
            Bu ölçü yalnızca ileri gider, kimseyi geri düşürmez. */}
        {mastered > 0 ? (
          <div
            className="mx-6 mt-4 rounded-2xl px-4 py-3 text-center"
            style={{ background: "color-mix(in srgb, var(--color-mint) 14%, transparent)" }}
          >
            <p className="text-sm font-bold" style={{ color: "var(--color-mint)" }}>
              {mastered} kelime pekişti
            </p>

          </div>
        ) : null}

        {/* Kaybedildiği sanılan seri geri alındıysa bunu söylemek şart:
            sessiz bir onarım, kullanıcının ekranda gördüğü sayıyı
            açıklanamaz hâle getirir. */}
        {result?.streakRepaired ? (
          <div
            className="mx-6 mt-4 rounded-2xl px-4 py-3 text-center"
            style={{ background: "color-mix(in srgb, var(--color-flame) 14%, transparent)" }}
          >
            <p
              className="flex items-center justify-center gap-1.5 text-sm font-bold"
              style={{ color: "var(--color-flame)" }}
            >
              <FlameIcon size={16} /> Serin kurtarıldı
            </p>
            <p className="muted mt-1 text-xs">
              Bir gün ara vermiştin — seri {result.currentStreak} günden devam ediyor. Bu hak
              ayda bir kez işler.
            </p>
          </div>
        ) : null}

        {/* Ertesi güne dair somut bir sayı. "Tekrar planına alındı" doğruydu
            ama tarihsizdi; kullanıcıya yarın uygulamayı açmak için bir sebep
            vermiyordu. */}
        {result && result.dueTomorrow > 0 ? (
          <p className="px-6 pt-2 text-center text-sm font-semibold">
            Yarın{" "}
            <span style={{ color: "var(--color-brand)" }}>
              {result.dueTomorrow} kelimenin
            </span>{" "}
            tekrarı var.
          </p>
        ) : null}

        {missed.length ? (
          <div className="px-6 pt-4">
            <p className="muted mb-2 text-xs font-semibold uppercase tracking-wide">
              Zorlandıkların ({missed.length})
            </p>
            <ul className="space-y-1.5">
              {missed.slice(0, 6).map((w) => (
                <li
                  key={w.id}
                  className="flex items-baseline justify-between gap-3 rounded-xl px-3 py-2 text-sm surface-2"
                >
                  <span className="font-semibold">{w.de}</span>
                  <span className="muted min-w-0 text-right">
                    <span className="block truncate">{w.tr}</span>
                    {w.en ? (
                      <span className="block truncate text-xs opacity-70" lang="en">
                        {w.en}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
            {missed.length > 6 ? (
              <p className="muted mt-2 text-center text-xs">+{missed.length - 6} kelime daha</p>
            ) : null}
            <p className="muted mt-2 text-center text-xs">
              Bunlar yakında tekrar karşına çıkacak — ayrıca bir şey yapmana gerek yok.
            </p>
          </div>
        ) : null}

        {/* Hatırlatma izni tam burada isteniyor: tur bitti, XP göründü, seri
            ekranda duruyor. Girişte sorulan izin reddedilir ve tarayıcıda
            kalıcı olarak kapanır — ikinci şans yok. */}
        <PushOptIn streak={result?.currentStreak ?? 0} />

        <div className="space-y-2 p-6 pt-4">
          <button onClick={onContinue} className="btn btn-primary w-full px-5 py-3.5">
            {partial ? "Tura geri dön" : "Devam et"}
          </button>
          <button onClick={onChallenge} className="btn btn-ghost w-full px-5 py-3">
            Hayatta kalma turu
          </button>
          <ShareResult
            marks={marks}
            total={tally.total}
            accuracy={accuracy}
            streak={result?.currentStreak ?? 0}
            level={level}
          />
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
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="border-b px-5 py-2.5" style={{ borderColor: "var(--border)" }}>
      <h2 className="muted text-xs font-bold uppercase tracking-wide">{children}</h2>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-2 py-4 text-center">
      <div className="text-xl font-bold">{value}</div>
      <div className="muted text-xs">{label}</div>
    </div>
  );
}
