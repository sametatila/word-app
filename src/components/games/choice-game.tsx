"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { useRoundExit } from "./use-round-exit";
import { withArtikel, type GameProps } from "./types";
import type { Option, Round } from "@/lib/types";
import { MeaningText } from "@/components/meaning-text";
import { fx, vibrate } from "@/lib/fx";
import { prefetchGerman, speakGerman } from "@/components/speak-button";
import { CheckIcon, XIcon } from "@/components/icons";

type ChoiceRound = Extract<Round, { game: "choice" }>;

export function ChoiceGame({ round, onDone }: GameProps<ChoiceRound>) {
  const { word, options, direction } = round;
  const deSide = direction === "de-tr";
  const question = deSide ? withArtikel(word) : word.tr;
  const answer = deSide ? word.tr : withArtikel(word);

  const [picked, setPicked] = useState<string | null>(null);
  const started = useRef(Date.now());
  const { speakAndExit, exitAfter } = useRoundExit();

  useEffect(() => {
    started.current = Date.now();
    setPicked(null);
    // Soru Almancaysa hemen okunuyor: öğrenci anlamı ararken kelimeyi de
    // duyuyor. Soru Türkçeyse okunacak bir şey yok — Almanca olan cevap
    // şıklarında ve o, seçim yapılınca okunuyor.
    if (!deSide) {
      // Bu yönde Almanca olan taraf cevap; seçimden sonra o okunacak.
      prefetchGerman(answer);
      return;
    }
    const s = setTimeout(() => speakGerman(question), 350);
    return () => clearTimeout(s);
  }, [round.id, deSide, question, answer]);

  function choose(opt: Option) {
    if (picked) return;
    setPicked(opt.text);
    const correct = opt.text === answer;
    const latencyMs = Date.now() - started.current;
    // Türkçeden Almancaya yönde Almanca olan taraf cevaptır; seçim yapılınca
    // her zaman DOĞRU karşılık okunuyor, seçilen değil — yanlış cevabı sesli
    // pekiştirmek öğrenmenin tersine çalışırdı.
    // Titreşim dokunuşun kaydedildiğini anında belli ediyor.
    vibrate(correct ? "correct" : "wrong");
    const finish = () => onDone([{ wordId: word.id, correct, latencyMs }]);

    if (deSide) {
      // Bu yönde soru zaten kart açılırken okundu; seçimde ses yok, dolayısıyla
      // çizginin süresi de sesle değil okuma-anlama payıyla belirleniyor.
      const wait = correct ? 620 : 1200;
      fx(correct ? "correct" : "wrong", wait);
      exitAfter(wait, finish);
      return;
    }

    // Almanca olan taraf cevap: geçiş çizgisi okumanın gerçek uzunluğunda.
    const tail = correct ? 0 : 900;
    speakAndExit(answer, finish, {
      tail,
      onDuration: (ms) => fx(correct ? "correct" : "wrong", ms + tail),
    });
  }

  return (
    // "Türkçe karşılığını seç" gibi bir alt bilgi yok: oyun başlığı + şıkların
    // dili zaten görevi anlatıyor, fazladan metin ekranı yorar.
    <GameShell
      label="Doğru Anlam"
      verdict={picked == null ? null : picked === answer ? "correct" : "wrong"}
      feedback={
        // Şerit doğruda da doluyor: cevabı görmek kadar onu bir kez daha
        // okumak da turun işi. Yanlışta düzeltme, doğruda pekiştirme.
        <span>
          {picked === answer ? "Doğru — " : "Doğrusu: "}
          <strong>{answer}</strong>
          {word.en ? (
            <span className="font-normal opacity-70" lang="en">
              {" "}
              · {word.en}
            </span>
          ) : null}
        </span>
      }
      prompt={
        <span className="brand-text text-2xl font-bold sm:text-3xl">
          {question}
          {/* Türkçeden Almancaya yönde soru bir anlamdır; İngilizcesi burada
              ayırt edici olarak duruyor ("o" tek başına üç kelimeye uyar). */}
          {!deSide && word.en ? (
            <span className="block text-base font-normal opacity-60" lang="en">
              {word.en}
            </span>
          ) : null}
        </span>
      }
    >
      <div className="grid gap-3">
        {options.map((opt, i) => {
          const isAnswer = opt.text === answer;
          const state =
            picked == null
              ? ""
              : isAnswer
                ? "option-correct"
                : opt.text === picked
                  ? "option-wrong"
                  : "";
          return (
            <motion.button
              key={`${opt.text}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              disabled={picked != null}
              onClick={() => choose(opt)}
              className={`option flex items-center justify-between gap-3 px-4 py-3 text-left font-medium ${state} ${
                picked === opt.text && !isAnswer ? "animate-shake" : ""
              } ${picked === opt.text && isAnswer ? "animate-glow" : ""}`}
            >
              <MeaningText tr={opt.text} en={opt.sub} />
              {/* Seçim sonucu simgeyle de anlatılır: renk körlüğünde de okunur. */}
              {picked != null && isAnswer ? (
                <CheckIcon size={18} className="shrink-0 text-[color:var(--color-mint)]" />
              ) : picked === opt.text ? (
                <XIcon size={18} className="shrink-0 text-[color:var(--color-rose)]" />
              ) : null}
            </motion.button>
          );
        })}
      </div>
    </GameShell>
  );
}
