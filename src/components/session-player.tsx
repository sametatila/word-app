"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type {
  Answer,
  AnswerResult,
  MissedWord,
  Round,
  SessionPayload,
  SessionProgress,
} from "@/lib/types";
import type { GameResult } from "@/components/games/types";
import { GameSwitch } from "@/components/game-switch";
import { LevelBadge } from "@/components/level-badge";
import { prefetchGerman } from "@/components/speak-button";
import { ChallengePlayer } from "@/components/challenge-player";
import { Confetti, CountUp } from "@/components/celebrate";
import { FitBox } from "@/components/fit-box";
import { AnswerPulse } from "@/components/answer-pulse";
import { AlertIcon, CheckIcon, ConfettiIcon, FlameIcon, RefreshIcon } from "@/components/icons";

type Status = "loading" | "ready" | "playing" | "done" | "empty" | "error" | "challenge";

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
  // Yarım kalan tur artık sunucudan gelir; cihazda hiçbir şey saklanmaz.
  const [resumable, setResumable] = useState<SessionProgress | null>(null);

  const load = useCallback(async (opts: { extra?: boolean; fresh?: boolean } = {}) => {
    setStatus("loading");
    setIndex(0);
    setTally({ correct: 0, total: 0, xp: 0 });
    setResult(null);
    setResumable(null);
    pending.current = [];
    sessionXp.current = 0;
    missed.current = [];
    try {
      // "Yeni tura başla" önce kayıtlı turu atar, sonra yenisini ister.
      if (opts.fresh) await fetch("/api/session", { method: "DELETE" });
      const res = await fetch(`/api/session?day=${localDay()}${opts.extra ? "&extra=1" : ""}`, {
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
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  /** Kaldığı yerden devam: sunucudaki ilerlemeyi yerine koyar. */
  function resume() {
    if (!resumable) return;
    setIndex(resumable.index);
    setTally({ correct: resumable.correct, total: resumable.total, xp: resumable.xp });
    sessionXp.current = resumable.xp;
    missed.current = resumable.missed;
    startedAt.current = Date.now();
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
  const flush = useCallback(async (final: boolean, progress: SessionProgress | null) => {
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
  }, []);

  const handleDone = useCallback(
    async (round: Round, results: GameResult[]) => {
      const enriched: Answer[] = results.map((r) => ({ ...r, game: round.game }));
      pending.current.push(...enriched);

      // Yanlış bilinen kelimeleri oturum özetinde göstermek için topla
      if (results.some((r) => !r.correct)) {
        const ws = round.game === "match" ? round.words : [round.word];
        for (const r of results.filter((x) => !x.correct)) {
          const w = ws.find((x) => x.id === r.wordId);
          if (w && !missed.current.some((m) => m.id === w.id)) {
            missed.current.push({ id: w.id, de: w.artikel ? `${w.artikel} ${w.de}` : w.de, tr: w.tr });
          }
        }
      }

      const next = {
        correct: tally.correct + results.filter((r) => r.correct).length,
        total: tally.total + results.length,
        xp: tally.xp + results.reduce((s, r) => s + (r.correct ? 10 : 3), 0),
      };
      setTally(next);

      const rounds = session?.rounds.length ?? 0;
      const isLast = index >= rounds - 1;
      const nextIndex = isLast ? rounds : index + 1;
      // Bittiğinde `index` tur sayısına eşitlenir: sunucu bunu "bu tur kapandı"
      // diye okur ve bir sonraki istekte yeni kuyruk kurar.
      const progress: SessionProgress = { ...next, index: nextIndex, missed: missed.current };

      if (isLast) {
        const res = await flush(true, progress);
        setResult(res ? { ...res, xpGained: sessionXp.current } : null);
        setStatus("done");
      } else {
        setIndex(nextIndex);
        void flush(false, progress);
      }
    },
    [flush, index, session, tally],
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
          onStart={() => void startFresh()}
          onResume={resume}
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
        <EmptyCard meta={session?.meta} onExtra={() => void load({ extra: true })} />
      </Screen>
    );
  if (status === "done")
    return (
      <Screen>
        <SummaryCard
          tally={tally}
          result={result}
          missed={missed.current}
          onContinue={() => {
            router.refresh();
            void load();
          }}
          onChallenge={() => setStatus("challenge")}
        />
      </Screen>
    );

  const round = session!.rounds[index];
  const progress = ((index + 1) / session!.rounds.length) * 100;

  return (
    <Screen fills>
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
                      ? "color-mix(in srgb, var(--color-brand-500) 14%, transparent)"
                      : "color-mix(in srgb, var(--color-flame-500) 16%, transparent)",
                    color: isNew ? "var(--color-brand-500)" : "var(--color-flame-500)",
                  }}
                >
                  {isNew ? "yeni" : "tekrar"}
                </span>
              );
            })()}
          </span>
          <span className="muted">
            {tally.total > 0 ? `%${Math.round((tally.correct / tally.total) * 100)} doğru` : "Hadi başlayalım"}
          </span>
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
            background: "color-mix(in srgb, var(--color-flame-500) 12%, transparent)",
            color: "var(--color-flame-500)",
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
  onStart,
  onResume,
  leaderboard,
}: {
  meta: SessionPayload["meta"];
  rounds: Round[];
  /** Sunucudaki yarım kalan tur — varsa "kaldığın yerden devam" gösterilir. */
  resumable: SessionProgress | null;
  onStart: () => void;
  onResume: () => void;
  /** Sunucuda hazırlanan sıralama tablosu — yalnızca bu kartta görünür. */
  leaderboard?: ReactNode;
}) {
  const words = rounds.flatMap((r) => (r.game === "match" ? r.words : [r.word]));
  const newCount = new Set(words.filter((w) => w.isNew).map((w) => w.id)).size;
  const reviewCount = new Set(words.filter((w) => !w.isNew).map((w) => w.id)).size;
  const goalPct = Math.min(100, Math.round((meta.reviewsToday / Math.max(1, meta.dailyGoal)) * 100));
  const name = meta.displayName?.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="card overflow-hidden">
        <div className="brand-gradient px-6 py-5 text-white sm:py-7">
          <p className="text-sm opacity-90">
            {meta.currentStreak > 0
              ? `${meta.currentStreak} günlük seridesin`
              : "Bugün serini başlat"}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <h1 className="text-xl font-bold sm:text-2xl">{name ? `Hoş geldin, ${name}` : "Hoş geldin"}</h1>
            <span className="rounded-lg bg-white/25 px-2 py-0.5 text-sm font-black">
              {meta.level}
            </span>
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
            <div className="text-xl font-bold text-[color:var(--color-flame-500)]">{reviewCount}</div>
            <div className="muted text-xs">tekrar sırası gelen</div>
          </div>
          <div className="px-4 py-3 text-center sm:py-4">
            <div className="text-xl font-bold text-[color:var(--color-brand-500)]">{newCount}</div>
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
              <strong style={{ color: "var(--color-flame-500)" }}>
                {meta.pacing === "review" ? "Bugün tekrar günü" : "Bugün tempo biraz düşük"}
              </strong>
              <p className="muted mt-1 text-xs">
                {meta.pacing === "review"
                  ? `${meta.dueCount} kelimenin tekrarı birikmiş. Yeni kelime almak yalnızca borcu büyütürdü; bugün onları kapatıyoruz.`
                  : `${meta.leeches} kelimede takılıyorsun. Yeni kelime sayısı yarıya indirildi ki bunlara yer kalsın.`}
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
              {rounds.length} turluk oturuma başla
            </button>
          )}

          {/* Açıklayıcı metinler eylemin ALTINA alındı.
              Küçük telefonlarda bu iki paragraf başlat düğmesini katlanın
              altına itiyordu: kullanıcı başlamak için önce kaydırmak zorunda
              kalıyordu. Bilgi değerli ama eylemi engellememeli. */}
          <div className="mt-4 space-y-3">
          <p className="muted text-center text-sm">
            {reviewCount > 0
              ? "Tekrar zamanı gelen kelimeler bu turda kendiliğinden karşına çıkacak — ayrıca bir şey yapman gerekmiyor."
              : "Bu tur yeni kelimelerle başlıyor. Öğrendiklerin, unutmaya başladığın anda kendiliğinden geri gelecek."}
          </p>
          {meta.coverage.total > 0 ? (
            <div
              className="mb-4 rounded-xl px-3 py-2.5 text-center text-sm"
              style={{ background: "var(--surface-2)" }}
            >
              <span className="muted">{meta.level} havuzunda </span>
              <strong style={{ color: "var(--color-mint-500)" }}>
                {meta.coverage.mastered.toLocaleString("tr-TR")}
              </strong>
              <span className="muted">
                {" / "}
                {meta.coverage.total.toLocaleString("tr-TR")} kelime pekişti
              </span>
              <p className="muted mt-1 text-xs">
                Her sorunun zorluğu o kelimeyi ne kadar bildiğine göre seçilir: yeni kelimede
                şıklı tanıma, oturmuş kelimede yazma. Seviyeni yalnızca sen değiştirirsin.
              </p>
            </div>
          ) : null}
          </div>
        </div>
      </div>
      {leaderboard}
    </motion.div>
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
      body: "Güvenlik için oturumun kapandı. İlerlemen kayıtlı — tekrar giriş yaptığında kaldığın yerden devam edersin.",
      action: (
        <Link href="/login" className="btn btn-primary mt-5 w-full px-5 py-3.5">
          Giriş yap
        </Link>
      ),
    },
    db: {
      title: "Kelimeler yüklenemedi",
      body: "Sunucuya ulaşıldı ama veriler alınamadı. Birkaç saniye sonra tekrar denemen genelde yeterli olur.",
      action: (
        <button onClick={onRetry} className="btn btn-primary mt-5 flex w-full items-center justify-center gap-2 px-5 py-3.5">
          <RefreshIcon size={18} /> Tekrar dene
        </button>
      ),
    },
    network: {
      title: "İnternet bağlantısı yok",
      body: "Cihazının bağlantısı kesilmiş görünüyor. Bağlantını kontrol edip tekrar dene.",
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
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{
            background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)",
            color: "var(--color-flame-500)",
          }}
        >
          <AlertIcon size={22} />
        </div>
        <h2 className="text-lg font-bold">{content.title}</h2>
        <p className="muted mt-2 text-sm">{content.body}</p>
        {content.action}
      </div>
    </div>
  );
}

function EmptyCard({
  meta,
  onExtra,
}: {
  meta: SessionPayload["meta"] | undefined;
  onExtra: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl brand-gradient text-white">
          <CheckIcon size={30} />
        </div>
        <h2 className="text-xl font-bold">Günlük hedefini tamamladın</h2>
        <p className="muted mt-2 text-sm">
          Planlanan tekrarların bitti. İstersen burada durabilirsin — ya da yeni kelimelerle
          devam edebilirsin, tekrar planın buna göre kendini ayarlar.
        </p>
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

function SummaryCard({
  tally,
  result,
  missed,
  onContinue,
  onChallenge,
}: {
  tally: { correct: number; total: number; xp: number };
  result: AnswerResult | null;
  missed: MissedWord[];
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto w-full max-w-md"
    >
      <Confetti fire={deserved ? 1 : 0} />

      <div className="card overflow-hidden">
        <div className="brand-gradient p-8 text-center text-white">
          <motion.div
            initial={{ scale: 0.5, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20"
          >
            <ConfettiIcon size={30} />
          </motion.div>
          <h2 className="mt-3 text-2xl font-bold">Tur tamamlandı</h2>
          <p className="mt-1 text-sm opacity-90">
            +<CountUp value={xp} /> XP kazandın
          </p>
        </div>

        <div className="grid grid-cols-3 divide-x" style={{ borderColor: "var(--border)" }}>
          <Stat label="Doğruluk" value={`%${accuracy}`} />
          <Stat label="Kelime" value={String(tally.total)} />
          <Stat label="Seri" value={`${result?.currentStreak ?? 0}g`} />
        </div>

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
                style={{ background: "var(--color-mint-500)" }}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (result.reviewsToday / result.dailyGoal) * 100)}%`,
                }}
                transition={{ delay: 0.2, type: "spring", stiffness: 160, damping: 24 }}
              />
            </div>
            {result.goalReached ? (
              <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-sm font-semibold text-[color:var(--color-mint-500)]">
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
            style={{ background: "color-mix(in srgb, var(--color-mint-500) 14%, transparent)" }}
          >
            <p className="text-sm font-bold" style={{ color: "var(--color-mint-500)" }}>
              {mastered} kelime pekişti
            </p>
            <p className="muted mt-1 text-xs">
              Bu kelimeler artık üç haftadan seyrek soruluyor — yer yeni kelimelere kalıyor.
            </p>
          </div>
        ) : null}

        <p className="muted px-6 pt-4 text-center text-xs">
          Bu turdaki kelimeler tekrar planına alındı; unutmaya başlayacağın gün
          kendiliğinden karşına çıkacaklar.
        </p>

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
                  <span className="muted truncate text-right">{w.tr}</span>
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

        <div className="space-y-2 p-6 pt-4">
          <button onClick={onContinue} className="btn btn-primary w-full px-5 py-3.5">
            Devam et
          </button>
          <button onClick={onChallenge} className="btn btn-ghost w-full px-5 py-3">
            Hayatta kalma turu
          </button>
        </div>
      </div>
    </motion.div>
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
