"use client";

import { useEffect, useRef, useState } from "react";
import { whyFor } from "@/lib/why";
import { miss } from "@/lib/errors";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { OptionMark } from "./option-mark";
import { useRoundExit } from "./use-round-exit";
import { meaningOf, type GameProps, type GameResult } from "./types";
import type { Round } from "@/lib/types";
import { vibrate } from "@/lib/fx";
import { prefetchGerman } from "@/components/speak-button";
import { useT, useLang } from "@/lib/i18n/client";

type ArtikelRound = Extract<Round, { game: "artikel" }>;

/** Kurs setleri: Hochdeutsch der/die/das, Züritüütsch de/d/s. Cevaptan türetilir. */
const HD_OPTIONS = ["der", "die", "das"];
const GSW_OPTIONS = ["de", "d", "s"];
const OPTION_COLORS = ["var(--color-sky)", "var(--color-rose)", "var(--color-mint)"];

export function ArtikelGame({ round, onDone }: GameProps<ArtikelRound>) {
  const tx = useT();
  const lang = useLang();
  const { word } = round;
  const answer = word.artikel;
  const options = GSW_OPTIONS.includes(answer ?? "") ? GSW_OPTIONS : HD_OPTIONS;

  const [picked, setPicked] = useState<string | null>(null);
  const started = useRef(Date.now());
  const { speak } = useRoundExit();
  /* Cevabın sonucu "Devam"a kadar burada bekliyor (bkz. game-shell). */
  const [pending, setPending] = useState<GameResult | null>(null);

  useEffect(() => {
    started.current = Date.now();
    setPicked(null);
    setPending(null);
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
    setPending({ wordId: word.id, correct, latencyMs, ...miss(correct, "article", opt) });
    speak(`${answer} ${word.de}`);
  }

  return (
    <GameShell
      label={tx("rounds.which_article")}
      verdict={picked == null ? null : picked === answer ? "correct" : "wrong"}
      onContinue={pending ? () => onDone([pending]) : undefined}
      why={picked != null && picked !== answer ? whyFor({ type: "article", word, detail: picked }, lang) : null}
      feedback={
        <span>
          <strong>
            {answer} {word.de}
          </strong>{" "}
          — {meaningOf(word, lang)}
          {word.en ? (
            <span className="font-normal opacity-70" lang="en">
              {" "}
              · {word.en}
            </span>
          ) : null}
        </span>
      }
      prompt={<span className="text-display sm:text-display">{word.de}</span>}
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
              /* SECTIGIN SIK: `aria-pressed`. Cevaptan sonra dogru/yanlis
                 `OptionMark`in erisilebilir adiyla soyleniyor, ama HANGISINI
                 sectigin yalnizca zemin renginden okunuyordu. Android
                 karsiligi `OptionButton` `chosen` (bkz. game/rounds). */
              aria-pressed={picked === opt}
              transition={{ delay: i * 0.05 }}
              disabled={picked != null}
              onClick={() => choose(opt)}
              style={picked == null ? { borderColor: OPTION_COLORS[i] } : undefined}
              className={`option min-h-16 px-4 py-4 text-center text-h2 ${state} ${
                picked === opt && !isAnswer ? "animate-shake" : ""
              }`}
            >
              <span style={picked == null ? { color: OPTION_COLORS[i] } : undefined}>{opt}</span>
              <OptionMark state={picked == null ? null : isAnswer ? "correct" : opt === picked ? "wrong" : null} />
            </motion.button>
          );
        })}
      </div>
    </GameShell>
  );
}
