"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { withArtikel, type GameProps } from "./types";
import type { Round } from "@/lib/types";
import { fx, vibrate } from "@/lib/fx";
import { prefetchGerman, speakGerman, speakThen, SpeakButton } from "@/components/speak-button";

type PluralRound = Extract<Round, { game: "plural" }>;

/**
 * Çoğul Bilmece.
 *
 * Almancada çoğul ekini kelimeyle birlikte öğrenmek gerekir: kuralı yoktur,
 * "der Arzt → die Ärzte" ama "der Arm → die Arme". Uygulama bu bilgiyi
 * (`formen`) baştan beri taşıyordu ama yalnızca bir not olarak gösteriyordu;
 * hiçbir oyun onu sormuyordu.
 *
 * Çeldiriciler aynı kelimenin diğer çoğul kurallarından üretilir — öğrencinin
 * gerçekte yaptığı hata budur. Artikel bilgisi de tura dahil: çoğulda artikel
 * her zaman "die"dir ve bu şıklarda tekrar tekrar görülür.
 */
export function PluralGame({ round, onDone }: GameProps<PluralRound>) {
  const { word, answer, options } = round;
  const [picked, setPicked] = useState<string | null>(null);
  const started = useRef(Date.now());

  useEffect(() => {
    started.current = Date.now();
    setPicked(null);
    // Kelime kendiliğinden okunuyor: soru "çoğulu ne?" ve öğrenci çoğulu
    // sesten hatırlıyor. Düğmeye basmayı beklemek o ipucunu geciktiriyordu.
    // Küçük gecikme kart yerine otururken sesin başlamaması için.
    const s = setTimeout(() => speakGerman(withArtikel(round.word)), 350);
    // Seçimden sonra okunacak doğru çoğul da önden iniyor.
    prefetchGerman(`die ${answer}`);
    return () => clearTimeout(s);
  }, [round.id, answer]);

  function choose(option: string) {
    if (picked) return;
    setPicked(option);
    const isCorrect = option === answer;
    const latencyMs = Date.now() - started.current;
    // Doğru çoğul her zaman okunuyor, seçilen değil: çoğul biçim sesle
    // ezberleniyor ve yanlış olanı sesli pekiştirmek öğrenmenin tersine
    // çalışırdı. Çoğul artikeli hep „die“.
    vibrate(isCorrect ? "correct" : "wrong");
    const tail = isCorrect ? 0 : 1200;
    speakThen(
      `die ${answer}`,
      () => setTimeout(() => onDone([{ wordId: word.id, correct: isCorrect, latencyMs }]), tail),
      { onDuration: (ms) => fx(isCorrect ? "correct" : "wrong", ms + tail) },
    );
  }

  return (
    <GameShell
      label="Çoğul Bilmece"
      prompt={
        <span className="inline-flex items-center gap-2">
          <span>
            <span className="muted">{word.artikel} </span>
            <span className="brand-text text-2xl font-bold sm:text-3xl">{word.de}</span>
          </span>
          <SpeakButton text={`${word.artikel ?? ""} ${word.de}`.trim()} size="sm" />
        </span>
      }
      hint={
        <span>
          {word.tr}
          {word.en ? (
            <span className="opacity-60" lang="en">
              {" "}
              · {word.en}
            </span>
          ) : null}{" "}
          — çoğulu hangisi?
        </span>
      }
    >
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, i) => {
          const isAnswer = option === answer;
          const state =
            picked == null ? "" : isAnswer ? "option-correct" : option === picked ? "option-wrong" : "";
          return (
            <motion.button
              key={`${option}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              disabled={picked != null}
              onClick={() => choose(option)}
              className={`option flex min-h-14 items-center justify-center px-3 py-3 text-center text-base font-medium ${state} ${
                picked === option && !isAnswer ? "animate-shake" : ""
              }`}
            >
              {/* Çoğulda artikel her zaman "die" — şıkta da öyle görünsün. */}
              <span className="muted mr-1.5 text-sm">die</span>
              {option}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 min-h-10 text-center text-sm">
        {picked ? (
          <p className="muted">
            <strong className="text-[color:var(--color-mint-500)]">die {answer}</strong>
            <SpeakButton text={`die ${answer}`} size="sm" className="ml-1 align-middle" />
          </p>
        ) : null}
      </div>
    </GameShell>
  );
}
