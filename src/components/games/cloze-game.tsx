"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GameShell } from "./game-shell";
import type { GameProps } from "./types";
import type { Round } from "@/lib/types";
import { fx } from "@/lib/fx";

type ClozeRound = Extract<Round, { game: "cloze" }>;

export function ClozeGame({ round, onDone }: GameProps<ClozeRound>) {
  const { word, sentence, answer, options } = round;
  const [before, after] = sentence.split("_____");

  const [picked, setPicked] = useState<string | null>(null);
  const started = useRef(Date.now());

  useEffect(() => {
    started.current = Date.now();
    setPicked(null);
  }, [round.id]);

  const correct = picked === answer;

  function choose(opt: string) {
    if (picked) return;
    setPicked(opt);
    const isCorrect = opt === answer;
    const latencyMs = Date.now() - started.current;
    const wait = isCorrect ? 750 : 1400;
    fx(isCorrect ? "correct" : "wrong", wait);
    setTimeout(() => onDone([{ wordId: word.id, correct: isCorrect, latencyMs }]), wait);
  }

  return (
    <GameShell
      label="Cümleyi Tamamla"
      prompt={
        <span>
          {before}
          <AnimatePresence mode="wait" initial={false}>
            {picked ? (
              <motion.span
                key="filled"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`option mx-1 inline-block rounded-lg px-3 py-0.5 align-middle font-bold ${
                  correct ? "option-correct" : "option-wrong animate-shake"
                }`}
              >
                {picked}
              </motion.span>
            ) : (
              <motion.span
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="surface-2 mx-1 inline-block min-w-[5rem] rounded-lg border border-dashed px-3 py-0.5 align-middle"
                style={{ borderColor: "var(--border)" }}
              >
                &nbsp;
              </motion.span>
            )}
          </AnimatePresence>
          {after}
        </span>
      }
      hint="Boşluğu doğru kelimeyle tamamla"
    >
      <div className="grid grid-cols-2 gap-3">
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
              className={`option flex min-h-14 items-center justify-center px-4 py-3 text-center text-base font-medium ${state} ${
                picked === opt && !isAnswer ? "animate-shake" : ""
              }`}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>
      {/* Anlam doğru cevapta da gösterilir: cümleyi anlamadan doldurmak öğretmez. */}
      <div className="mt-4 min-h-10 text-center text-sm">
        {picked ? (
          <p className="muted">
            <strong className="text-[color:var(--color-mint-500)]">{answer}</strong> — {word.tr}
          </p>
        ) : null}
      </div>
    </GameShell>
  );
}
