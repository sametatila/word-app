"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { grammarNote, typLabel, withArtikel, type GameProps } from "./types";
import type { Round } from "@/lib/types";

type IntroRound = Extract<Round, { game: "intro" }>;

const ARTIKEL_TONE: Record<string, string> = {
  der: "var(--color-sky-400)",
  die: "var(--color-rose-400)",
  das: "var(--color-mint-400)",
};

/** Yeni kelimeyi tanıtır — cevap beklenmez, kalite puanı "iyi" sayılır. */
export function IntroGame({ round, onDone }: GameProps<IntroRound>) {
  const { word } = round;
  const [revealed, setRevealed] = useState(false);
  const started = useRef(Date.now());

  useEffect(() => {
    started.current = Date.now();
    setRevealed(false);
    const t = setTimeout(() => setRevealed(true), 900);
    return () => clearTimeout(t);
  }, [round.id]);

  return (
    <GameShell label="Yeni Kelime" prompt="Bunu bugün öğreniyorsun" hint={word.niveau}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card mx-auto w-full max-w-md p-6 text-center"
      >
        {word.artikel ? (
          <span
            className="mb-2 inline-block rounded-full px-3 py-1 text-sm font-bold text-white"
            style={{ background: ARTIKEL_TONE[word.artikel] ?? "var(--color-brand-500)" }}
          >
            {word.artikel}
          </span>
        ) : null}
        <h2 className="text-3xl font-bold sm:text-4xl">{word.de}</h2>
        <p className="muted mt-1 text-sm">
          {typLabel(word.typ, word.tr)}
          {grammarNote(word) ? ` · ${grammarNote(word)}` : ""}
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-5 text-xl font-semibold text-[color:var(--color-brand-500)]"
        >
          {word.tr}
        </motion.p>

        {word.beispiel ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="muted mt-4 border-t pt-4 text-sm italic"
            style={{ borderColor: "var(--border)" }}
          >
            {word.beispiel.split(/(?<=[.!?])\s+/)[0]}
          </motion.p>
        ) : null}
      </motion.div>

      <button
        onClick={() =>
          onDone([
            { wordId: word.id, correct: true, latencyMs: Date.now() - started.current, hintUsed: true },
          ])
        }
        className="btn btn-primary mx-auto mt-6 w-full max-w-md px-6 py-3.5 text-base"
      >
        {withArtikel(word)} — anladım
      </button>
    </GameShell>
  );
}
