"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { useRoundExit } from "./use-round-exit";
import { withArtikel, type GameProps } from "./types";
import type { Round } from "@/lib/types";
import { MeaningText } from "@/components/meaning-text";
import { fx } from "@/lib/fx";
import { CheckIcon, XIcon } from "@/components/icons";
import { speakGerman, SpeakButton } from "@/components/speak-button";

type TrueFalseRound = Extract<Round, { game: "truefalse" }>;

/**
 * Doğru mu Yanlış mı.
 *
 * Diğer turlar "hangisi?" diye sorar ve öğrenci şıklar arasında gezinir. Bu tur
 * "öyle mi?" diye sorar: tek bir eşleşme gösterilir, karar ikilidir ve hızlıdır.
 * Ölçtüğü şey de farklı — aranan cevabı üretmek değil, önüne konan bir eşleşmeyi
 * yargılamak. Meydan okumanın hızlı dalgalarında tempoyu değiştiren tur budur.
 *
 * Yanlış iddialar, hedefin anlamlarından hiçbirini paylaşmayan kelimelerden
 * seçilir (bkz. pickFalseClaim): ikili kararda "aslında bu da doğru" diyecek
 * bir eşleşme göstermek öğrenciyi haksız yere yanıltır.
 */
export function TrueFalseGame({ round, onDone }: GameProps<TrueFalseRound>) {
  const { word, claim, isTrue } = round;
  const [answered, setAnswered] = useState<boolean | null>(null);
  const started = useRef(Date.now());
  const { exitAfter } = useRoundExit();

  useEffect(() => {
    started.current = Date.now();
    setAnswered(null);
    // Kelime kendiliğinden okunuyor: karar verirken telaffuzu duymak
    // eşleştirmeyi kolaylaştırıyor ve düğmeye basma adımını ortadan kaldırıyor.
    const s = setTimeout(() => speakGerman(withArtikel(round.word)), 350);
    return () => clearTimeout(s);
  }, [round.id]);

  function decide(said: boolean) {
    if (answered !== null) return;
    setAnswered(said);
    const isCorrect = said === isTrue;
    const latencyMs = Date.now() - started.current;
    // Yanlış eşleşmede gerçek karşılığı okumaya vakit gerekir.
    const wait = isCorrect ? 900 : 2400;
    fx(isCorrect ? "correct" : "wrong", wait);
    exitAfter(wait, () => onDone([{ wordId: word.id, correct: isCorrect, latencyMs }]));
  }

  const settled = answered !== null;
  const wasRight = settled && answered === isTrue;

  return (
    <GameShell
      label="Doğru mu Yanlış mı"
      prompt={<span className="muted text-base">Bu eşleşme doğru mu?</span>}
      verdict={!settled ? null : wasRight ? "correct" : "wrong"}
      feedback={
        <span>
          {withArtikel(word)} ={" "}
          <strong>{word.tr}</strong>
          {word.en ? (
            <span className="font-normal opacity-70" lang="en">
              {" "}
              · {word.en}
            </span>
          ) : null}
        </span>
      }
    >
      <motion.div
        key={round.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`card mx-auto w-full max-w-md p-6 text-center ${
          settled && !wasRight ? "animate-shake" : ""
        }`}
        style={{
          borderColor: settled
            ? wasRight
              ? "var(--color-mint)"
              : "var(--color-rose)"
            : undefined,
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="brand-text text-2xl font-bold sm:text-3xl">{withArtikel(word)}</span>
          <SpeakButton text={withArtikel(word)} size="sm" />
        </div>
        <div className="my-3 flex items-center justify-center gap-3">
          <span className="h-px w-10" style={{ background: "var(--border)" }} />
          <span className="muted text-xs uppercase tracking-wide">demek</span>
          <span className="h-px w-10" style={{ background: "var(--border)" }} />
        </div>
        <div className="flex justify-center font-semibold">
          <MeaningText tr={claim.text} en={claim.sub} size="lg" align="center" />
        </div>
      </motion.div>

      <div className="mx-auto mt-6 grid w-full max-w-md grid-cols-2 gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          disabled={settled}
          onClick={() => decide(true)}
          className={`option flex min-h-16 items-center justify-center gap-2 text-lg font-bold ${
            settled && isTrue ? "option-correct" : settled && answered === true ? "option-wrong" : ""
          }`}
        >
          <CheckIcon size={20} /> Doğru
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          disabled={settled}
          onClick={() => decide(false)}
          className={`option flex min-h-16 items-center justify-center gap-2 text-lg font-bold ${
            settled && !isTrue ? "option-correct" : settled && answered === false ? "option-wrong" : ""
          }`}
        >
          <XIcon size={20} /> Yanlış
        </motion.button>
      </div>

    </GameShell>
  );
}
