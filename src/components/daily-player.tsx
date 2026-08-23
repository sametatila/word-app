"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Round } from "@/lib/types";
import type { GameResult } from "@/components/games/types";
import { GameSwitch } from "@/components/game-switch";
import { FitBox } from "@/components/fit-box";
import { Confetti, CountUp } from "@/components/celebrate";
import { scoreAnswer } from "@/lib/daily-score";
import { ShareResult } from "@/components/share-result";
import { AlertIcon, FlameIcon, TrophyIcon } from "@/components/icons";

/**
 * Günün turu.
 *
 * Diğer bütün turlardan bir farkı var: kişiye özel değil. Aynı kurs ve
 * seviyedeki herkes aynı kelimeleri aynı sırayla görüyor, bu yüzden skorlar
 * karşılaştırılabiliyor ve tablo bir anlam taşıyor.
 *
 * Geri sayım yok. Günde tek hakkı olan bir turda süre baskısı, öğrenciyi
 * ölçmek yerine telaşını ölçerdi; hız yine de puana yansıyor ama kaybettirmiyor.
 */

type Board = {
  rank: number;
  name: string | null;
  score: number;
  correct: number;
  total: number;
  isMe: boolean;
}[];

type Payload = {
  day: string;
  level: string;
  rounds: Round[];
  played: { score: number; correct: number; total: number; bestCombo: number } | null;
  board: Board;
};

type Status = "loading" | "ready" | "playing" | "done" | "error" | "empty";

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function DailyPlayer({ onExit }: { onExit: () => void }) {
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<Payload | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  const [board, setBoard] = useState<Board>([]);
  const [xpGained, setXpGained] = useState(0);

  const bestCombo = useRef(0);
  const marks = useRef<boolean[]>([]);
  const startedAt = useRef(Date.now());
  const sent = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/daily?day=${localDay()}`, { cache: "no-store" });
        if (!res.ok) return setStatus("error");
        const payload = (await res.json()) as Payload;
        setData(payload);
        setBoard(payload.board);
        if (payload.played) setStatus("done");
        else setStatus(payload.rounds.length ? "ready" : "empty");
      } catch {
        setStatus("error");
      }
    })();
  }, []);

  const finish = useCallback(
    async (finalScore: number, finalTally: { correct: number; total: number }) => {
      // Tek hak sunucuda korunuyor ama iki kez göndermek de gereksiz: ağ
      // yavaşsa kullanıcı düğmeye iki kez basabiliyor.
      if (sent.current) return;
      sent.current = true;
      const seconds = Math.round((Date.now() - startedAt.current) / 1000);
      try {
        const res = await fetch("/api/daily", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            day: localDay(),
            score: finalScore,
            correct: finalTally.correct,
            total: finalTally.total,
            bestCombo: bestCombo.current,
            seconds,
          }),
        });
        if (res.ok) {
          const out = (await res.json()) as { board: Board; xpGained: number };
          setBoard(out.board);
          setXpGained(out.xpGained);
        }
      } catch {
        /* skor gönderilemediyse tur yine de bitmiş sayılır */
      }
      setStatus("done");
    },
    [],
  );

  function handleDone(round: Round, results: GameResult[]) {
    let running = combo;
    let gained = 0;
    let right = 0;
    for (const r of results) {
      running = r.correct ? running + 1 : 0;
      if (running > bestCombo.current) bestCombo.current = running;
      gained += scoreAnswer(r.correct, r.latencyMs, running);
      if (r.correct) right++;
      marks.current.push(r.correct);
    }
    setCombo(running);

    const nextScore = score + gained;
    const nextTally = { correct: tally.correct + right, total: tally.total + results.length };
    setScore(nextScore);
    setTally(nextTally);

    const last = index >= (data?.rounds.length ?? 0) - 1;
    if (last) void finish(nextScore, nextTally);
    else setIndex(index + 1);
  }

  if (status === "loading") {
    return (
      <Card>
        <p className="muted py-8 text-center text-sm">Günün turu hazırlanıyor…</p>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card>
        <div className="p-6 text-center">
          <AlertIcon size={22} />
          <p className="mt-2 text-sm font-bold">Günün turu yüklenemedi</p>
          <button onClick={onExit} className="btn btn-ghost mt-4 px-5 py-2.5 text-sm">
            Geri dön
          </button>
        </div>
      </Card>
    );
  }

  if (status === "empty") {
    return (
      <Card>
        <div className="p-6 text-center">
          <p className="text-sm font-bold">Bugün bu seviyede tur yok</p>
          <p className="muted mt-1 text-xs">
            Seviyendeki kelime havuzu günün turunu kurmaya yetmiyor.
          </p>
          <button onClick={onExit} className="btn btn-ghost mt-4 px-5 py-2.5 text-sm">
            Geri dön
          </button>
        </div>
      </Card>
    );
  }

  if (status === "ready" && data) {
    return (
      <Card>
        <div className="brand-gradient px-6 py-6 text-center text-white">
          <p className="text-sm opacity-90">Bugünün turu · {data.level}</p>
          <h2 className="mt-1 text-2xl font-bold">Herkes aynı kelimeler</h2>
          <p className="mx-auto mt-2 max-w-xs text-sm opacity-90">
            {data.rounds.length} soru · tek hak · süre baskısı yok. Seviyendeki herkesle aynı
            turu oynuyorsun.
          </p>
        </div>
        <div className="space-y-2 p-6">
          <button
            onClick={() => {
              startedAt.current = Date.now();
              setStatus("playing");
            }}
            className="btn btn-primary w-full px-5 py-3.5 text-base"
          >
            Başla
          </button>
          <button onClick={onExit} className="btn btn-ghost w-full px-5 py-3">
            Sonra
          </button>
        </div>
        {board.length > 1 ? <BoardList rows={board} title="Bugünün tablosu" /> : null}
      </Card>
    );
  }

  if (status === "playing" && data) {
    const round = data.rounds[index];
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mb-3 shrink-0">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
            <span className="muted">
              {index + 1} / {data.rounds.length}
            </span>
            <span className="flex items-center gap-2">
              {combo >= 3 ? (
                <motion.span
                  key={combo}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-black"
                  style={{
                    background: "color-mix(in srgb, var(--color-flame-500) 16%, transparent)",
                    color: "var(--color-flame-500)",
                  }}
                >
                  <FlameIcon size={12} /> {combo}
                </motion.span>
              ) : null}
              <span className="font-black" style={{ color: "var(--color-brand-500)" }}>
                {score.toLocaleString("tr-TR")}
              </span>
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full surface-2">
            <motion.div
              className="brand-gradient h-full rounded-full"
              animate={{ width: `${(index / data.rounds.length) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={round.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.16 }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <FitBox>
              <GameSwitch round={round} onDone={(res) => handleDone(round, res)} />
            </FitBox>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // done
  const played = data?.played;
  const finalScore = played?.score ?? score;
  const finalCorrect = played?.correct ?? tally.correct;
  const finalTotal = played?.total ?? tally.total;
  const me = board.find((r) => r.isMe);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <Confetti fire={1} />
      <div className="card overflow-hidden">
        <div className="brand-gradient p-8 text-center text-white">
          <TrophyIcon size={30} />
          <h2 className="mt-2 text-2xl font-bold">
            <CountUp value={finalScore} /> puan
          </h2>
          <p className="mt-1 text-sm opacity-90">
            {finalCorrect}/{finalTotal} doğru
            {me ? ` · bugün ${me.rank}. sıradasın` : ""}
          </p>
          {xpGained > 0 ? <p className="mt-1 text-sm opacity-90">+{xpGained} XP</p> : null}
        </div>

        {board.length > 1 ? <BoardList rows={board} title="Bugünün tablosu" /> : null}

        <div className="space-y-2 p-6">
          {/* Paylaşılan sonuç burada gerçekten bir şey ifade ediyor: karşı taraf
              aynı turu oynadıysa skorları doğrudan karşılaştırabiliyor. */}
          <ShareResult
            kind="daily"
            score={finalScore}
            marks={marks.current}
            total={finalTotal}
            accuracy={finalTotal ? Math.round((finalCorrect / finalTotal) * 100) : 0}
            streak={bestCombo.current}
            level={data?.level ?? "A1"}
          />
          <button onClick={onExit} className="btn btn-primary w-full px-5 py-3.5">
            Öğrenmeye dön
          </button>
          <p className="muted pt-1 text-center text-xs">
            Günün turu günde bir kez oynanır. Yarın yeni kelimelerle döner.
          </p>
        </div>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="card mx-auto w-full max-w-md overflow-hidden">{children}</div>;
}

function BoardList({ rows, title }: { rows: Board; title: string }) {
  return (
    <div className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="muted px-5 py-2.5 text-xs font-semibold uppercase tracking-wide">{title}</div>
      <ol>
        {rows.map((r) => (
          <li
            key={`${r.rank}-${r.name ?? "x"}`}
            className="flex items-center gap-3 border-t px-5 py-2.5 text-sm"
            style={{
              borderColor: "var(--border)",
              background: r.isMe
                ? "color-mix(in srgb, var(--color-brand-500) 8%, transparent)"
                : undefined,
            }}
          >
            <span className="w-5 shrink-0 text-center font-black tabular-nums">{r.rank}</span>
            <span className="min-w-0 flex-1 truncate font-semibold">
              {r.name ?? "İsimsiz öğrenci"}
              {r.isMe ? <span className="muted ml-1.5 text-[10px] uppercase">sen</span> : null}
            </span>
            <span className="muted shrink-0 text-xs tabular-nums">
              {r.correct}/{r.total}
            </span>
            <span
              className="w-16 shrink-0 text-right font-bold tabular-nums"
              style={{ color: "var(--color-brand-500)" }}
            >
              {r.score.toLocaleString("tr-TR")}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
