"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { Answer, Round } from "@/lib/types";
import type { GameResult } from "@/components/games/types";
import { GameSwitch } from "@/components/game-switch";
import { AlertIcon, FlameIcon, TrophyIcon } from "@/components/icons";

const DURATION = 60;

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

type Status = "loading" | "ready" | "playing" | "done" | "empty" | "error";

/** Süreye karşı meydan okuma: öğrenilenlerden karışık oyunlarla kısa tur. */
export function ChallengePlayer({ onExit }: { onExit: () => void }) {
  const [status, setStatus] = useState<Status>("loading");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [left, setLeft] = useState(DURATION);
  const pending = useRef<Answer[]>([]);
  const best = useRef(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/challenge", { cache: "no-store" });
        if (!res.ok) {
          setStatus("error");
          return;
        }
        const data = (await res.json()) as { rounds: Round[] };
        setRounds(data.rounds);
        setStatus(data.rounds.length >= 3 ? "ready" : "empty");
      } catch {
        setStatus("error");
      }
    })();
    try {
      best.current = Number(localStorage.getItem("wortspiel:challenge-best") ?? 0);
    } catch {
      /* depolama kapalı olabilir */
    }
  }, []);

  const finish = useCallback(async () => {
    setStatus("done");
    const batch = pending.current;
    pending.current = [];
    if (batch.length) {
      try {
        await fetch("/api/answers", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ answers: batch, day: localDay(), seconds: DURATION }),
        });
      } catch {
        /* çevrimdışıysa sonuç yine gösterilir */
      }
    }
  }, []);

  // Geri sayım
  useEffect(() => {
    if (status !== "playing") return;
    if (left <= 0) {
      void finish();
      return;
    }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [status, left, finish]);

  function handleDone(round: Round, results: GameResult[]) {
    pending.current.push(...results.map((r) => ({ ...r, game: round.game })));
    setScore((s) => ({
      correct: s.correct + results.filter((r) => r.correct).length,
      total: s.total + results.length,
    }));
    if (index >= rounds.length - 1) void finish();
    else setIndex((i) => i + 1);
  }

  if (status === "loading")
    return <Frame><p className="muted text-center text-sm">Meydan okuma hazırlanıyor…</p></Frame>;

  if (status === "error")
    return (
      <Frame>
        <div className="text-center">
          <AlertIcon size={22} />
          <p className="mt-2 text-sm">Meydan okuma yüklenemedi.</p>
          <button onClick={onExit} className="btn btn-ghost mt-4 w-full px-5 py-3">
            Geri dön
          </button>
        </div>
      </Frame>
    );

  if (status === "empty")
    return (
      <Frame>
        <div className="text-center">
          <h2 className="text-lg font-bold">Henüz yeterli kelime yok</h2>
          <p className="muted mt-2 text-sm">
            Meydan okuma, daha önce çalıştığın kelimelerden kurulur. Birkaç tur oynadıktan sonra
            burası açılacak.
          </p>
          <button onClick={onExit} className="btn btn-primary mt-5 w-full px-5 py-3.5">
            Öğrenmeye dön
          </button>
        </div>
      </Frame>
    );

  if (status === "ready")
    return (
      <Frame>
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl brand-gradient text-white">
            <FlameIcon size={26} />
          </div>
          <h2 className="text-xl font-bold">60 saniye meydan okuma</h2>
          <p className="muted mt-2 text-sm">
            Öğrendiğin kelimelerden rastgele sorular, karışık oyun türleriyle. Süre dolmadan kaç
            doğru yapabilirsin?
          </p>
          {best.current > 0 ? (
            <p className="muted mt-3 text-sm">
              En iyi skorun: <strong>{best.current}</strong>
            </p>
          ) : null}
          <button
            onClick={() => {
              setLeft(DURATION);
              setStatus("playing");
            }}
            className="btn btn-primary mt-5 w-full px-5 py-3.5 text-base"
          >
            Başla
          </button>
          <button onClick={onExit} className="btn btn-ghost mt-2 w-full px-5 py-3">
            Vazgeç
          </button>
        </div>
      </Frame>
    );

  if (status === "done") {
    const isBest = score.correct > best.current;
    if (isBest) {
      try {
        localStorage.setItem("wortspiel:challenge-best", String(score.correct));
      } catch {
        /* yoksay */
      }
    }
    return (
      <Frame>
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl brand-gradient text-white">
            <TrophyIcon size={26} />
          </div>
          <h2 className="text-xl font-bold">{score.correct} doğru</h2>
          <p className="muted mt-1 text-sm">
            {score.total} soruda %{score.total ? Math.round((score.correct / score.total) * 100) : 0}{" "}
            doğruluk
          </p>
          {isBest && score.correct > 0 ? (
            <p className="mt-2 text-sm font-semibold text-[color:var(--color-mint-500)]">
              Yeni rekor!
            </p>
          ) : null}
          <button onClick={onExit} className="btn btn-primary mt-5 w-full px-5 py-3.5">
            Öğrenmeye dön
          </button>
        </div>
      </Frame>
    );
  }

  const round = rounds[index];
  const pct = (left / DURATION) * 100;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span className="muted">
            {score.correct} doğru · {index + 1}/{rounds.length}
          </span>
          <span
            className="font-bold"
            style={{ color: left <= 10 ? "var(--color-rose-500)" : "var(--color-flame-500)" }}
          >
            {left} sn
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full surface-2">
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: left <= 10 ? "var(--color-rose-500)" : "var(--color-flame-500)",
              transition: "width 1s linear",
            }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <div key={round.id} className="flex flex-1 flex-col justify-center pb-8">
          <GameSwitch round={round} onDone={(res) => handleDone(round, res)} />
        </div>
      </AnimatePresence>
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="card p-6">{children}</div>
      <p className="muted mt-4 text-center text-xs">
        <Link href="/learn" className="underline-offset-4 hover:underline">
          Normal tura dön
        </Link>
      </p>
    </motion.div>
  );
}
