"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import type { GameProps } from "./types";
import type { Round } from "@/lib/types";
import { fx } from "@/lib/fx";

type ArtikelRound = Extract<Round, { game: "artikel" }>;

const ARTIKEL_OPTIONS = ["der", "die", "das"] as const;
type Artikel = (typeof ARTIKEL_OPTIONS)[number];

const ARTIKEL_COLORS: Record<Artikel, string> = {
  der: "var(--color-sky-400)",
  die: "var(--color-rose-400)",
  das: "var(--color-mint-400)",
};

export function ArtikelGame({ round, onDone }: GameProps<ArtikelRound>) {
  const { word } = round;
  const answer = word.artikel;

  const [picked, setPicked] = useState<Artikel | null>(null);
  const started = useRef(Date.now());

  useEffect(() => {
    started.current = Date.now();
    setPicked(null);
  }, [round.id]);

  function choose(opt: Artikel) {
    if (picked) return;
    setPicked(opt);
    const correct = opt === answer;
    const latencyMs = Date.now() - started.current;
    const wait = correct ? 620 : 1200;
    fx(correct ? "correct" : "wrong", wait);
    setTimeout(() => onDone([{ wordId: word.id, correct, latencyMs }]), wait);
  }

  return (
    <GameShell
      label="Artikel Yarışı"
      prompt={<span className="brand-text text-3xl font-bold sm:text-4xl">{word.de}</span>}
      hint="Doğru artikeli seç"
    >
      <div className="grid grid-cols-3 gap-3">
        {ARTIKEL_OPTIONS.map((opt, i) => {
          const isAnswer = opt === answer;
          const state =
            picked == null ? "" : isAnswer ? "option-correct" : opt === picked ? "option-wrong" : "";
          return (
            <motion.button
              key={opt}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              disabled={picked != null}
              onClick={() => choose(opt)}
              style={picked == null ? { borderColor: ARTIKEL_COLORS[opt] } : undefined}
              className={`option min-h-16 px-4 py-4 text-center text-xl font-bold ${state} ${
                picked === opt && !isAnswer ? "animate-shake" : ""
              }`}
            >
              <span style={picked == null ? { color: ARTIKEL_COLORS[opt] } : undefined}>{opt}</span>
            </motion.button>
          );
        })}
      </div>
      {/* Anlam her zaman cevaptan sonra görünür: cinsi anlamdan kopuk ezberlememek için */}
      <div className="mt-4 min-h-10 text-center text-sm">
        {picked ? (
          <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="muted">
            <strong className="text-[color:var(--color-mint-500)]">
              {answer} {word.de}
            </strong>{" "}
            — {word.tr}
          </motion.p>
        ) : null}
      </div>
    </GameShell>
  );
}
