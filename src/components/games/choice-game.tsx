"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { withArtikel, type GameProps } from "./types";
import type { Round } from "@/lib/types";

type ChoiceRound = Extract<Round, { game: "choice" }>;

export function ChoiceGame({ round, onDone }: GameProps<ChoiceRound>) {
  const { word, options, direction } = round;
  const deSide = direction === "de-tr";
  const question = deSide ? withArtikel(word) : word.tr;
  const answer = deSide ? word.tr : withArtikel(word);

  const [picked, setPicked] = useState<string | null>(null);
  const started = useRef(Date.now());

  useEffect(() => {
    started.current = Date.now();
    setPicked(null);
  }, [round.id]);

  function choose(opt: string) {
    if (picked) return;
    setPicked(opt);
    const correct = opt === answer;
    const latencyMs = Date.now() - started.current;
    setTimeout(() => onDone([{ wordId: word.id, correct, latencyMs }]), correct ? 550 : 1150);
  }

  return (
    <GameShell
      label="Doğru Anlam"
      prompt={<span className="brand-text text-2xl font-bold sm:text-3xl">{question}</span>}
      hint={deSide ? "Türkçe karşılığını seç" : "Almanca karşılığını seç"}
    >
      <div className="grid gap-3">
        {options.map((opt, i) => {
          const isAnswer = opt === answer;
          const state =
            picked == null ? "" : isAnswer ? "option-correct" : opt === picked ? "option-wrong" : "";
          return (
            <motion.button
              key={`${opt}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              disabled={picked != null}
              onClick={() => choose(opt)}
              className={`option px-4 py-4 text-left text-base font-medium ${state} ${
                picked === opt && !isAnswer ? "animate-shake" : ""
              }`}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>
      {picked && picked !== answer ? (
        <p className="muted mt-4 text-center text-sm">
          Doğrusu: <strong className="text-[color:var(--color-mint-500)]">{answer}</strong>
        </p>
      ) : null}
    </GameShell>
  );
}
