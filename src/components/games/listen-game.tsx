"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { withArtikel, type GameProps } from "./types";
import type { Option, Round } from "@/lib/types";
import { MeaningText, SentenceTranslation } from "@/components/meaning-text";
import { fx } from "@/lib/fx";
import { speakGerman, useSpeechAvailable } from "@/components/speak-button";
import { SpeakerIcon } from "@/components/icons";
import { firstExample } from "@/lib/example";

type ListenRound = Extract<Round, { game: "listen" }>;

/**
 * Kulaktan Tanı.
 *
 * Uygulamada telaffuz her ekranda vardı ama hiçbir oyun dinlemeyi **ölçmüyordu**:
 * bütün turlar kelimeyi yazılı gösteriyordu. Oysa Almanca konuşulurken
 * karşılaşılan sorun yazımı hatırlamak değil, duyduğunu tanımak.
 *
 * Kelime cevaptan önce yazılmaz — yazılsaydı tur sıradan bir çoktan seçmeliye
 * dönerdi. Cevap verilince yazılı biçim de gösterilir: ses ile yazım arasındaki
 * bağ asıl öğrenilecek şey.
 */
export function ListenGame({ round, onDone }: GameProps<ListenRound>) {
  const { word, options } = round;
  const spoken = withArtikel(word);
  const speechAvailable = useSpeechAvailable();

  const [picked, setPicked] = useState<string | null>(null);
  const [replays, setReplays] = useState(0);
  const started = useRef(Date.now());

  useEffect(() => {
    started.current = Date.now();
    setPicked(null);
    setReplays(0);
    // Tur açılır açılmaz bir kez okunur: öğrencinin ilk işi dinlemek.
    const t = setTimeout(() => speakGerman(spoken), 300);
    return () => clearTimeout(t);
  }, [round.id, spoken]);

  function choose(option: Option) {
    if (picked) return;
    setPicked(option.text);
    const isCorrect = option.text === word.tr;
    const latencyMs = Date.now() - started.current;
    const wait = isCorrect ? 1400 : 2600;
    fx(isCorrect ? "correct" : "wrong", wait);
    setTimeout(
      () =>
        onDone([
          {
            wordId: word.id,
            correct: isCorrect,
            latencyMs,
            // Tekrar tekrar dinlemek yardım almaktır: kalite puanı bunu bilsin.
            hintUsed: replays >= 2,
          },
        ]),
      wait,
    );
  }

  const example = firstExample(word.beispiel);
  const exampleTr = firstExample(word.beispielTr);
  const exampleEn = firstExample(word.beispielEn);

  return (
    <GameShell
      label="Kulaktan Tanı"
      verdict={picked == null ? null : picked === word.tr ? "correct" : "wrong"}
      feedback={
        // Bu oyunda öğrenilen şey sesin YAZIMI: şeritte duyulan kelime
        // yazıyla duruyor. Örnek cümle şeride girmiyor, kendi yerinde kalıyor
        // — şerit tek bakışta okunan bir cevap.
        <span>
          <strong>{spoken}</strong> — {word.tr}
        </span>
      }
      prompt={
        speechAvailable ? (
          <span className="muted text-base">Duyduğun kelime ne demek?</span>
        ) : (
          // Konuşma sentezi yoksa tur çıkmaza girmesin: kelime yazıyla gösterilir.
          <span className="brand-text text-2xl font-bold sm:text-3xl">{spoken}</span>
        )
      }
      hint={
        speechAvailable ? undefined : (
          <span>Cihazın sesli okumayı desteklemiyor — kelime yazıyla gösterildi.</span>
        )
      }
    >
      {speechAvailable ? (
        <div className="mb-6 flex flex-col items-center gap-2">
          <motion.button
            type="button"
            onClick={() => {
              setReplays((n) => n + 1);
              speakGerman(spoken);
            }}
            whileTap={{ scale: 0.93 }}
            aria-label="Tekrar dinle"
            className="brand-gradient flex h-20 w-20 items-center justify-center rounded-full shadow-lg"
          >
            <SpeakerIcon size={34} />
          </motion.button>
          <span className="muted text-xs">Tekrar dinlemek için dokun</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option, i) => {
          const isAnswer = option.text === word.tr;
          const state =
            picked == null
              ? ""
              : isAnswer
                ? "option-correct"
                : option.text === picked
                  ? "option-wrong"
                  : "";
          return (
            <motion.button
              key={`${option.text}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              disabled={picked != null}
              onClick={() => choose(option)}
              className={`option flex min-h-14 items-center justify-center px-4 py-3 text-center font-medium ${state} ${
                picked === option.text && !isAnswer ? "animate-shake" : ""
              }`}
            >
              <MeaningText tr={option.text} en={option.sub} align="center" />
            </motion.button>
          );
        })}
      </div>

      {/* Yazılı biçim yalnızca cevaptan sonra: sesle yazımı burada eşleştiriyoruz. */}
      <div className="mt-4 min-h-12 text-center text-sm">
        {picked ? (
          <>
            <p className="brand-text text-lg font-bold">{spoken}</p>
            {example ? <p className="muted mt-1 text-xs italic">{example}</p> : null}
            {/* Cümlenin çevirisi ancak cevaptan sonra: önce gösterilseydi
                sorunun cevabını ele verirdi. */}
            <SentenceTranslation
              tr={exampleTr}
              en={exampleEn}
              className="muted mt-0.5 text-xs"
            />
          </>
        ) : null}
      </div>
    </GameShell>
  );
}
