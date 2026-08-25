"use client";

import { useEffect, useRef, useState } from "react";
import { whyFor } from "@/lib/why";
import { miss } from "@/lib/errors";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { useRoundExit } from "./use-round-exit";
import type { GameProps } from "./types";
import type { Round } from "@/lib/types";
import { fx, vibrate } from "@/lib/fx";
import { prefetchGerman } from "@/components/speak-button";

type ArtikelRound = Extract<Round, { game: "artikel" }>;

/** Kurs setleri: Hochdeutsch der/die/das, Züritüütsch de/d/s. Cevaptan türetilir. */
const HD_OPTIONS = ["der", "die", "das"];
const GSW_OPTIONS = ["de", "d", "s"];
const OPTION_COLORS = ["var(--color-sky)", "var(--color-rose)", "var(--color-mint)"];

export function ArtikelGame({ round, onDone }: GameProps<ArtikelRound>) {
  const { word } = round;
  const answer = word.artikel;
  const options = GSW_OPTIONS.includes(answer ?? "") ? GSW_OPTIONS : HD_OPTIONS;

  const [picked, setPicked] = useState<string | null>(null);
  const started = useRef(Date.now());
  const { speakAndExit } = useRoundExit();

  useEffect(() => {
    started.current = Date.now();
    setPicked(null);
    // Seçimden sonra okunacak metin belli: doğru artikelli kelime.
    prefetchGerman(`${answer} ${word.de}`);
  }, [round.id, answer, word.de]);

  function choose(opt: string) {
    if (picked) return;
    setPicked(opt);
    const correct = opt === answer;
    const latencyMs = Date.now() - started.current;
    // Kelime her zaman DOĞRU artikeliyle okunuyor, seçilenle değil: artikel
    // kelimeyle birlikte ezberleniyor ve yanlış seçimi sesli pekiştirmek
    // öğrenmenin tersine çalışırdı.
    // Geçiş çizgisi sesin gerçek uzunluğunda dolduruluyor; sabit süre ya erken
    // dolup kullanıcıyı dolu bir çizgiye baktırıyor ya da ses bitince boşuna
    // bekletiyordu. Yanlışta doğruyu görmek için kısa bir ek süre kalıyor.
    vibrate(correct ? "correct" : "wrong");
    const tail = correct ? 0 : 900;
    speakAndExit(`${answer} ${word.de}`, () => onDone([{ wordId: word.id, correct, latencyMs, ...miss(correct, "article", opt) }]), {
      tail,
      onDuration: (ms) => fx(correct ? "correct" : "wrong", ms + tail),
    });
  }

  return (
    <GameShell
      label="Artikel Yarışı"
      verdict={picked == null ? null : picked === answer ? "correct" : "wrong"}
      why={picked != null && picked !== answer ? whyFor({ type: "article", word, detail: picked }) : null}
      feedback={
        <span>
          <strong>
            {answer} {word.de}
          </strong>{" "}
          — {word.tr}
          {word.en ? (
            <span className="font-normal opacity-70" lang="en">
              {" "}
              · {word.en}
            </span>
          ) : null}
        </span>
      }
      prompt={<span className="brand-text text-3xl font-bold sm:text-4xl">{word.de}</span>}
    >
      <div className="grid grid-cols-3 gap-3">
        {options.map((opt, i) => {
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
              style={picked == null ? { borderColor: OPTION_COLORS[i] } : undefined}
              className={`option min-h-16 px-4 py-4 text-center text-xl font-bold ${state} ${
                picked === opt && !isAnswer ? "animate-shake" : ""
              }`}
            >
              <span style={picked == null ? { color: OPTION_COLORS[i] } : undefined}>{opt}</span>
            </motion.button>
          );
        })}
      </div>
    </GameShell>
  );
}
