"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { withArtikel, type GameProps } from "./types";
import type { Round } from "@/lib/types";
import { fx } from "@/lib/fx";
import { CheckIcon, XIcon } from "@/components/icons";

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
    const wait = correct ? 620 : 1200;
    // Titreşim + geçiş çizgisi: dokunuşun kaydedildiği anında belli olur.
    fx(correct ? "correct" : "wrong", wait);
    setTimeout(() => onDone([{ wordId: word.id, correct, latencyMs }]), wait);
  }

  return (
    // "Türkçe karşılığını seç" gibi bir alt bilgi yok: oyun başlığı + şıkların
    // dili zaten görevi anlatıyor, fazladan metin ekranı yorar.
    <GameShell
      label="Doğru Anlam"
      prompt={<span className="brand-text text-2xl font-bold sm:text-3xl">{question}</span>}
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
              className={`option flex items-center justify-between gap-3 px-4 py-3.5 text-left text-base font-medium ${state} ${
                picked === opt && !isAnswer ? "animate-shake" : ""
              } ${picked === opt && isAnswer ? "animate-glow" : ""}`}
            >
              <span>{opt}</span>
              {/* Seçim sonucu simgeyle de anlatılır: renk körlüğünde de okunur. */}
              {picked != null && isAnswer ? (
                <CheckIcon size={18} className="shrink-0 text-[color:var(--color-mint-500)]" />
              ) : picked === opt ? (
                <XIcon size={18} className="shrink-0 text-[color:var(--color-rose-500)]" />
              ) : null}
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
