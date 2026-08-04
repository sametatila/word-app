"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { grammarNote, typLabel, withArtikel, type GameProps } from "./types";
import type { Round } from "@/lib/types";
import { SpeakButton, speakGerman } from "@/components/speak-button";

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
  const [skipping, setSkipping] = useState(false);
  const started = useRef(Date.now());

  useEffect(() => {
    started.current = Date.now();
    setRevealed(false);
    setSkipping(false);
    const t = setTimeout(() => setRevealed(true), 900);
    // Yeni kelimeyi bir kez sesli oku: öğrencinin ilk sorusu "nasıl okunuyor?"
    const s = setTimeout(() => speakGerman(withArtikel(round.word)), 350);
    return () => {
      clearTimeout(t);
      clearTimeout(s);
    };
  }, [round.id]);

  return (
    <GameShell label="Yeni Kelime" prompt="Bunu bugün öğreniyorsun" hint={word.niveau}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card mx-auto w-full max-w-md p-5 text-center"
      >
        {word.artikel ? (
          <span
            className="mb-2 inline-block rounded-full px-3 py-1 text-sm font-bold text-white"
            style={{ background: ARTIKEL_TONE[word.artikel] ?? "var(--color-brand-500)" }}
          >
            {word.artikel}
          </span>
        ) : null}
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-3xl font-bold sm:text-4xl">{word.de}</h2>
          <SpeakButton text={withArtikel(word)} />
        </div>
        <p className="muted mt-1 text-sm">
          {typLabel(word.typ, word.tr)}
          {grammarNote(word) ? ` · ${grammarNote(word)}` : ""}
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-xl font-semibold text-[color:var(--color-brand-500)]"
        >
          {word.tr}
        </motion.p>

        {word.beispiel ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="muted mt-3 border-t pt-3 text-sm italic"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="inline-flex items-center gap-1">
              {word.beispiel.split(/(?<=[.!?])\s+/)[0]}
              <SpeakButton text={word.beispiel.split(/(?<=[.!?])\s+/)[0]} size="sm" />
            </span>
          </motion.p>
        ) : null}
      </motion.div>

      <div className="mx-auto mt-4 w-full max-w-md space-y-2">
        <button
          onClick={() =>
            onDone([
              {
                wordId: word.id,
                correct: true,
                latencyMs: Date.now() - started.current,
                hintUsed: true,
              },
            ])
          }
          className="btn btn-primary w-full px-6 py-3 text-base"
        >
          {withArtikel(word)} — anladım
        </button>
        <button
          onClick={async () => {
            setSkipping(true);
            try {
              await fetch("/api/words/known", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ wordId: word.id }),
              });
            } catch {
              /* çevrimdışıysa yine de devam et */
            }
            onDone([]); // cevap kaydedilmez, kelime pekişmiş sayılır
          }}
          disabled={skipping}
          className="btn btn-ghost w-full px-6 py-2.5 text-sm disabled:opacity-50"
        >
          {skipping ? "Kaydediliyor…" : "Bunu zaten biliyorum"}
        </button>
      </div>
    </GameShell>
  );
}
