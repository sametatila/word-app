"use client";

import { useEffect, useRef, useState } from "react";
import { miss } from "@/lib/errors";
import { AnimatePresence, motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { useRoundExit } from "./use-round-exit";
import type { GameProps } from "./types";
import type { Round } from "@/lib/types";
import { SentenceTranslation } from "@/components/meaning-text";
import { fx, vibrate } from "@/lib/fx";
import { prefetchGerman } from "@/components/speak-button";

/**
 * Yanlış cevaptan sonra doğruyu okumaya geçmeden önceki okuma payı.
 *
 * Ses biter bitmez tur kapanırsa ekranda beliren doğru cevap okunamıyor.
 * Doğru cevapta bu paya gerek yok — okunacak yeni bir bilgi yok.
 */
const WRONG_TAIL_MS = 900;

type ClozeRound = Extract<Round, { game: "cloze" }>;

export function ClozeGame({ round, onDone }: GameProps<ClozeRound>) {
  const { word, sentence, sentenceTr, sentenceEn, answer, options } = round;
  const [before, after] = sentence.split("_____");

  const [picked, setPicked] = useState<string | null>(null);
  const started = useRef(Date.now());
  const { speakAndExit } = useRoundExit();

  useEffect(() => {
    started.current = Date.now();
    setPicked(null);
    // Doğru cümlenin sesi tur açılırken iniyor. Hangi şıkkın seçileceği belli
    // değil ama doğru cümle her hâlükârda okunuyor; önden indirmek dokunuşla
    // sesin başlaması arasındaki boşluğu kapatıyor.
    prefetchGerman(`${before}${answer}${after}`.trim());
  }, [round.id, before, after, answer]);

  const correct = picked === answer;

  function choose(opt: string) {
    if (picked) return;
    setPicked(opt);
    const isCorrect = opt === answer;
    const latencyMs = Date.now() - started.current;

    // Okunan şey KELİME değil, tamamlanmış CÜMLE. Boşluk doldurma oyununda
    // öğrenilen şey kelimenin cümledeki hâli — tek başına kelimeyi duymak
    // oyunun öğrettiği şeyi duyurmuyor.
    //
    // Seçilen şık DEĞİL, her zaman doğru cümle okunuyor. Önce yanlış cümleyi
    // okuyup ardından doğrusunu okumak üç ayrı sorun üretiyordu: kulakta
    // kalan ilk şey yanlış kullanımın kendisiydi, tur iki okuma boyu
    // uzuyordu ve ikinci ses önbellekte olmadığında araya sessiz bir bekleme
    // giriyordu. Artık okunan tek metin tur açılırken zaten indirilmiş olan
    // doğru cümle (bkz. yukarıdaki prefetch): yanlışta da ses anında başlıyor.
    const truth = `${before}${answer}${after}`.trim();

    // Geçiş çizgisi sesin GERÇEK uzunluğunda dolduruluyor ve tur tam o bitince
    // kapanıyor. Sabit süre iki yönde de yanlıştı: kısa tahminde çizgi dolup
    // kullanıcı bekliyor, uzun tahminde ses bittikten sonra boşuna bekleniyordu.
    const advance = () => onDone([{ wordId: word.id, correct: isCorrect, latencyMs, ...miss(isCorrect, "meaning", opt) }]);

    vibrate(isCorrect ? "correct" : "wrong");
    const tail = isCorrect ? 0 : WRONG_TAIL_MS;
    speakAndExit(truth, advance, {
      tail,
      onDuration: (ms) => fx(isCorrect ? "correct" : "wrong", ms + tail),
    });
  }

  return (
    <GameShell
      label="Cümleyi Tamamla"
      verdict={picked == null ? null : picked === answer ? "correct" : "wrong"}
      feedback={
        <span>
          <strong>{answer}</strong> — {word.tr}
          {word.en ? (
            <span className="font-normal opacity-70" lang="en">
              {" "}
              · {word.en}
            </span>
          ) : null}
        </span>
      }
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
      /* Cümlenin çevirisi baştan gösterilir: bağlamı anlamak seçimi kolaylaştırır. */
      hint={
        sentenceTr || sentenceEn ? (
          <SentenceTranslation tr={sentenceTr} en={sentenceEn} className="italic" />
        ) : undefined
      }
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
    </GameShell>
  );
}
