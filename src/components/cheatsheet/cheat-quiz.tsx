"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "@/components/games/game-shell";
import { CheckIcon, RefreshIcon, XIcon } from "@/components/icons";
import { fx, vibrate } from "@/lib/fx";
import { accepts, buildRound, CHEAT_GAME_LABELS, type CheatRound } from "@/lib/cheatsheet/quiz";
import type { CheatItem } from "@/lib/cheatsheet/items";

/**
 * Cheatsheet çalışma turu.
 *
 * Sütun gizleme modu bir SINAMA değil bir hatırlatmaydı: kutuya dokunulunca
 * cevap açılıyor, öğrenci kendi kendine "biliyordum" diyor ve hiçbir yere
 * yazılmıyordu. Bilgi dağarcığına girmesi için cevabın ölçülmesi gerekiyor.
 *
 * Sorular kelime oyunlarının aynısı ve bu bilinçli: öğrenci "Doğru Anlam"ı,
 * "Harf Bulmacası"nı, "Yazarak Hatırla"yı zaten biliyor. Dilbilgisi tarafında
 * yeni bir arayüz öğretmek, öğrenilecek şeyin üstüne bir katman daha koymak
 * olurdu.
 *
 * Ses YOK. Kaynak basılı bir tablo ve sorulan şey BİÇİM: sütunların yarısı
 * Türkçe (anlam, kullanım, kural) ve hangi hücrenin Almanca okunacağı sütun
 * başlığından güvenilir biçimde çıkarılamıyor. Almanca bir sütunu Türkçe
 * sesle ya da tersini okumak, dersin öğrettiği telaffuzu bozar.
 */

const ROUND_CAP = 14;

export type QuizResult = {
  itemId: string;
  correct: boolean;
  latencyMs: number;
  kind: CheatRound["kind"];
};

type Phase = { round: CheatRound; index: number };

export function CheatQuiz({
  title,
  items,
  states,
  onClose,
}: {
  title: string;
  items: CheatItem[];
  /** Sunucudaki ilerleme — soru biçimini bu belirliyor. */
  states: Record<string, { reps: number; lapses: number }>;
  onClose: (answered: number) => void;
}) {
  /**
   * Tur kurulumu bir kez yapılıyor ve bileşen içinde saklanıyor.
   *
   * Her çizimde yeniden kurulsaydı cevap verildiği anda soru değişirdi:
   * `states` turun ortasında güncellenmiyor ama `items` referansı değişebilir
   * ve karıştırma da rastgele.
   */
  const rounds = useMemo(() => {
    const pool = [...items];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool
      .slice(0, ROUND_CAP)
      .map((item) => buildRound(item, states[item.id] ?? { reps: 0, lapses: 0 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const startedAt = useRef(Date.now());

  function record(result: QuizResult) {
    setResults((prev) => [...prev, result]);
    setIndex((i) => i + 1);
  }

  if (!rounds.length) {
    return (
      <div className="mx-auto w-full max-w-md py-10 text-center">
        <p className="muted text-sm">Bu sayfada sorulabilir bir madde yok.</p>
        <button onClick={() => onClose(0)} className="btn btn-ghost mt-4 px-5 py-2.5">
          Geri dön
        </button>
      </div>
    );
  }

  if (index >= rounds.length) {
    return (
      <Summary
        title={title}
        results={results}
        seconds={(Date.now() - startedAt.current) / 1000}
        onClose={() => onClose(results.length)}
      />
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="mx-auto mb-4 flex w-full max-w-md items-center gap-3">
        <button onClick={() => onClose(results.length)} className="chip px-3 py-1.5 text-xs">
          Bitir
        </button>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full surface-2">
          <motion.div
            className="brand-gradient h-full rounded-full"
            animate={{ width: `${(index / rounds.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 180, damping: 26 }}
          />
        </div>
        <span className="muted shrink-0 text-xs font-semibold tabular-nums">
          {index + 1} / {rounds.length}
        </span>
      </div>
      <RoundView key={`${rounds[index].item.id}:${index}`} phase={{ round: rounds[index], index }} onDone={record} />
    </div>
  );
}

/** Soru başlığı: "nehmen · Perfekt" — konu ve istenen biçim. */
function Prompt({ round }: { round: CheatRound }) {
  return (
    <>
      <div className="text-xl font-bold sm:text-2xl">{round.item.key}</div>
      <div className="muted mt-1 text-sm font-semibold">{round.item.label}</div>
    </>
  );
}

function Feedback({ round, correct }: { round: CheatRound; correct: boolean }) {
  const { item } = round;
  return (
    <span>
      {correct ? "Doğru — " : "Doğrusu: "}
      <strong>{item.answer}</strong>
      {item.context.length ? (
        <span className="font-normal opacity-70">
          {" · "}
          {item.context[0].value}
        </span>
      ) : null}
    </span>
  );
}

function RoundView({ phase, onDone }: { phase: Phase; onDone: (r: QuizResult) => void }) {
  const { round } = phase;
  const [verdict, setVerdict] = useState<"correct" | "wrong" | null>(null);
  const started = useRef(Date.now());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    started.current = Date.now();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function settle(correct: boolean) {
    if (verdict) return;
    setVerdict(correct ? "correct" : "wrong");
    vibrate(correct ? "correct" : "wrong");
    // Yanlışta pay uzun: şeritteki doğru cevabın okunacak vakti olmalı.
    const wait = correct ? 700 : 1600;
    fx(correct ? "correct" : "wrong", wait);
    timer.current = setTimeout(
      () =>
        onDone({
          itemId: round.item.id,
          correct,
          latencyMs: Date.now() - started.current,
          kind: round.kind,
        }),
      wait,
    );
  }

  const shell = (children: React.ReactNode, hint?: React.ReactNode) => (
    <GameShell
      label={CHEAT_GAME_LABELS[round.kind]}
      prompt={<Prompt round={round} />}
      hint={hint}
      verdict={verdict}
      feedback={verdict ? <Feedback round={round} correct={verdict === "correct"} /> : null}
    >
      {children}
    </GameShell>
  );

  if (round.kind === "choice") {
    return shell(
      <div className="grid gap-2.5">
        {round.options.map((opt) => {
          const isAnswer = opt === round.item.answer;
          const state =
            !verdict ? "" : isAnswer ? "option-correct" : "option-wrong opacity-60";
          return (
            <button
              key={opt}
              disabled={Boolean(verdict)}
              onClick={() => settle(isAnswer)}
              className={`option px-4 py-3.5 text-left text-base ${state}`}
            >
              {opt}
            </button>
          );
        })}
      </div>,
    );
  }

  if (round.kind === "truefalse") {
    return shell(
      <>
        <div
          className="mb-4 rounded-2xl px-4 py-5 text-center text-xl font-bold"
          style={{ background: "var(--surface-2)" }}
        >
          {round.shown}
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            disabled={Boolean(verdict)}
            onClick={() => settle(round.expected)}
            className="option flex items-center justify-center gap-2 px-4 py-3.5 font-bold"
          >
            <CheckIcon size={18} /> Doğru
          </button>
          <button
            disabled={Boolean(verdict)}
            onClick={() => settle(!round.expected)}
            className="option flex items-center justify-center gap-2 px-4 py-3.5 font-bold"
          >
            <XIcon size={18} /> Yanlış
          </button>
        </div>
      </>,
      "Bu biçim doğru mu?",
    );
  }

  if (round.kind === "scramble") return shell(<Scramble round={round} onSettle={settle} locked={Boolean(verdict)} />);
  return shell(<Typing round={round} onSettle={settle} locked={Boolean(verdict)} />);
}

function Scramble({
  round,
  onSettle,
  locked,
}: {
  round: Extract<CheatRound, { kind: "scramble" }>;
  onSettle: (correct: boolean) => void;
  locked: boolean;
}) {
  const [used, setUsed] = useState<number[]>([]);
  const typed = used.map((i) => round.letters[i]).join("");

  useEffect(() => {
    if (locked) return;
    if (used.length !== round.letters.length) return;
    onSettle(accepts(round.item.answer, typed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [used.length, locked]);

  return (
    <div className="space-y-4">
      <div
        className="flex min-h-14 items-center justify-center rounded-2xl px-4 text-2xl font-bold tracking-wide"
        style={{ background: "var(--surface-2)" }}
      >
        {typed || <span className="muted text-base font-normal">harfleri sırala</span>}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {round.letters.map((letter, i) => (
          <button
            key={i}
            disabled={locked || used.includes(i)}
            onClick={() => setUsed((u) => [...u, i])}
            className="option h-12 w-11 text-lg font-bold disabled:opacity-25"
          >
            {letter}
          </button>
        ))}
      </div>
      <button
        onClick={() => setUsed([])}
        disabled={locked || !used.length}
        className="btn btn-ghost mx-auto flex items-center gap-2 px-4 py-2 text-sm disabled:opacity-40"
      >
        <RefreshIcon size={15} /> Baştan
      </button>
    </div>
  );
}

function Typing({
  round,
  onSettle,
  locked,
}: {
  round: Extract<CheatRound, { kind: "typing" }>;
  onSettle: (correct: boolean) => void;
  locked: boolean;
}) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (locked || !value.trim()) return;
        onSettle(accepts(round.item.answer, value));
      }}
      className="space-y-3"
    >
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={locked}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        lang="de"
        placeholder="cevabı yaz…"
        className="option w-full px-4 py-3.5 text-center text-lg outline-none focus:border-[color:var(--color-brand)]"
      />
      <button
        type="submit"
        disabled={locked || !value.trim()}
        className="btn btn-primary w-full px-5 py-3 disabled:opacity-40"
      >
        Kontrol et
      </button>
    </form>
  );
}

function Summary({
  title,
  results,
  seconds,
  onClose,
}: {
  title: string;
  results: QuizResult[];
  seconds: number;
  onClose: () => void;
}) {
  const [xp, setXp] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const sent = useRef(false);
  const correct = results.filter((r) => r.correct).length;

  useEffect(() => {
    if (sent.current || !results.length) return;
    sent.current = true;
    (async () => {
      try {
        const res = await fetch("/api/cheat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ day: localDay(), seconds, results }),
        });
        if (!res.ok) return setFailed(true);
        const data = (await res.json()) as { xpGained: number; currentStreak: number; totalXp: number };
        setXp(data.xpGained);
        // Kabuktaki rozetler anında güncellensin — kelime turlarıyla aynı olay.
        window.dispatchEvent(
          new CustomEvent("wortspiel:stats", {
            detail: { xp: data.totalXp, streak: data.currentStreak },
          }),
        );
      } catch {
        setFailed(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wrong = results.filter((r) => !r.correct);

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="card overflow-hidden">
        <div className="brand-gradient-deep px-6 py-6 text-center">
          <p className="text-sm opacity-90">{title}</p>
          <p className="mt-1 text-3xl font-black">
            {correct} / {results.length}
          </p>
          {xp !== null ? (
            <p className="mt-1 text-sm opacity-90">+{xp} XP</p>
          ) : failed ? (
            <p className="mt-1 text-sm opacity-90">Sonuç kaydedilemedi</p>
          ) : null}
        </div>
        <div className="px-5 py-4">
          <p className="muted text-xs">
            Yanlış bilinenler birkaç dakika içinde, doğru bilinenler aralık uzayarak geri
            geliyor — kelime tekrarıyla aynı plan.
          </p>
        </div>
      </div>

      {wrong.length ? (
        <div className="card px-5 py-4">
          <p className="text-sm font-bold">Zorlandıkların</p>
          <ul className="mt-2 space-y-1 text-sm">
            {wrong.map((r) => (
              <li key={r.itemId} className="muted">
                {r.itemId.split("|").slice(1).join(" · ")}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <button onClick={onClose} className="btn btn-primary w-full px-5 py-3.5">
        Sayfaya dön
      </button>
    </div>
  );
}

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}
