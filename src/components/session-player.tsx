"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Answer, AnswerResult, Round, SessionPayload } from "@/lib/types";
import type { GameResult } from "@/components/games/types";
import { IntroGame } from "@/components/games/intro-game";
import { ChoiceGame } from "@/components/games/choice-game";
import { MatchGame } from "@/components/games/match-game";
import { ArtikelGame } from "@/components/games/artikel-game";
import { ScrambleGame } from "@/components/games/scramble-game";
import { TypingGame } from "@/components/games/typing-game";
import { ClozeGame } from "@/components/games/cloze-game";
import { AlertIcon, CheckIcon, ConfettiIcon, FlameIcon, RefreshIcon } from "@/components/icons";

type Status = "loading" | "playing" | "done" | "empty" | "error";
type ErrorKind = "auth" | "db" | "network";

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function SessionPlayer() {
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
  const missed = useRef<{ id: number; de: string; tr: string }[]>([]);

  const load = useCallback(async (extra = false) => {
    setStatus("loading");
    setIndex(0);
    setTally({ correct: 0, total: 0, xp: 0 });
    setResult(null);
    pending.current = [];
    sessionXp.current = 0;
    missed.current = [];
    try {
      const res = await fetch(`/api/session?day=${localDay()}${extra ? "&extra=1" : ""}`, {
        cache: "no-store",
      });
      if (res.status === 401) {
        setErrorKind("auth");
        setStatus("error");
        return;
      }
      if (!res.ok) {
        setErrorKind("db");
        setStatus("error");
        return;
      }
      const data = (await res.json()) as SessionPayload;
      setSession(data);
      startedAt.current = Date.now();
      setStatus(data.rounds.length ? "playing" : "empty");
    } catch {
      setErrorKind("network");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const flush = useCallback(async (final: boolean) => {
    const batch = pending.current;
    if (!batch.length) return null;
    pending.current = [];
    const seconds = Math.round((Date.now() - startedAt.current) / 1000);
    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers: batch, day: localDay(), seconds: final ? seconds : 0 }),
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

      setTally((t) => ({
        correct: t.correct + results.filter((r) => r.correct).length,
        total: t.total + results.length,
        xp: t.xp + results.reduce((s, r) => s + (r.correct ? 10 : 3), 0),
      }));

      const isLast = index >= (session?.rounds.length ?? 0) - 1;
      if (isLast) {
        const res = await flush(true);
        setResult(res ? { ...res, xpGained: sessionXp.current } : null);
        setStatus("done");
      } else {
        setIndex((i) => i + 1);
        if (pending.current.length >= 3) void flush(false);
      }
    },
    [flush, index, session],
  );

  // Sekme kapanırsa bekleyen cevapları kaydetmeyi dene.
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

  if (status === "loading") return <LoadingCard />;
  if (status === "error") return <ErrorCard kind={errorKind} onRetry={() => void load()} />;
  if (status === "empty")
    return <EmptyCard meta={session?.meta} onExtra={() => void load(true)} />;
  if (status === "done")
    return (
      <SummaryCard
        tally={tally}
        result={result}
        missed={missed.current}
        onContinue={() => {
          router.refresh();
          void load();
        }}
      />
    );

  const round = session!.rounds[index];
  const progress = ((index + 1) / session!.rounds.length) * 100;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span className="muted">
            {index + 1} / {session!.rounds.length}
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
      </div>

      {saveWarning ? (
        <div
          className="mb-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
          style={{
            background: "color-mix(in srgb, var(--color-flame-500) 12%, transparent)",
            color: "var(--color-flame-500)",
          }}
        >
          <AlertIcon size={16} />
          Cevapların kaydedilemiyor — bağlantın döndüğünde otomatik gönderilecek.
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        <div key={round.id} className="flex flex-1 flex-col justify-center pb-8">
          <GameSwitch round={round} onDone={(res) => void handleDone(round, res)} />
        </div>
      </AnimatePresence>
    </div>
  );
}

function GameSwitch({ round, onDone }: { round: Round; onDone: (r: GameResult[]) => void }) {
  switch (round.game) {
    case "intro":
      return <IntroGame round={round} onDone={onDone} />;
    case "choice":
      return <ChoiceGame round={round} onDone={onDone} />;
    case "match":
      return <MatchGame round={round} onDone={onDone} />;
    case "artikel":
      return <ArtikelGame round={round} onDone={onDone} />;
    case "scramble":
      return <ScrambleGame round={round} onDone={onDone} />;
    case "typing":
      return <TypingGame round={round} onDone={onDone} />;
    case "cloze":
      return <ClozeGame round={round} onDone={onDone} />;
  }
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
        <Link href="/giris" className="btn btn-primary mt-5 w-full px-5 py-3.5">
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
}: {
  tally: { correct: number; total: number; xp: number };
  result: AnswerResult | null;
  missed: { id: number; de: string; tr: string }[];
  onContinue: () => void;
}) {
  const accuracy = tally.total ? Math.round((tally.correct / tally.total) * 100) : 0;
  const xp = result?.xpGained ?? tally.xp;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto w-full max-w-md"
    >
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
          <p className="mt-1 text-sm opacity-90">+{xp} XP kazandın</p>
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

        <div className="p-6 pt-4">
          <button onClick={onContinue} className="btn btn-primary w-full px-5 py-3.5">
            Devam et
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
