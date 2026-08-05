"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { grammarNote, typLabel, withArtikel, type GameProps } from "./types";
import type { Round } from "@/lib/types";
import { firstExample } from "@/lib/example";
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
  const example = firstExample(word.beispiel);
  const exampleTr = firstExample(word.beispielTr);

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
    <GameShell label="Yeni Kelime">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card relative mx-auto w-full max-w-md p-5 text-center"
      >
        {/* Seviye rozeti kartın içinde durur: kelimeyle birlikte okunur, başlığın
            altında ayrı bir satır tüketmez. */}
        <span
          className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wide"
          style={{
            background: "color-mix(in srgb, var(--color-brand-500) 14%, transparent)",
            color: "var(--color-brand-500)",
          }}
        >
          {word.niveau}
        </span>
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

        {example ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="muted mt-3 border-t pt-3 text-sm italic"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="inline-flex items-center gap-1">
              {example}
              <SpeakButton text={example} size="sm" />
            </span>
            {exampleTr ? (
              <span className="mt-1 block not-italic opacity-80">{exampleTr}</span>
            ) : null}
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
