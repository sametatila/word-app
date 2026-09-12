"use client";

import { useEffect, useRef, useState } from "react";
import { whyFor } from "@/lib/why";
import { miss } from "@/lib/errors";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { OptionMark } from "./option-mark";
import { useRoundExit } from "./use-round-exit";
import { withArtikel, type GameProps, type GameResult , meaningOf } from "./types";
import type { Round } from "@/lib/types";
import { vibrate } from "@/lib/fx";
import { prefetchGerman, speakGerman, SpeakButton } from "@/components/speak-button";
import { useT, useLang } from "@/lib/i18n/client";

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
  const tx = useT();
  const lang = useLang();
  const { word, answer, options } = round;
  const [picked, setPicked] = useState<string | null>(null);
  const started = useRef(Date.now());
  const { speak } = useRoundExit();
  /* Cevabın sonucu "Devam"a kadar burada bekliyor (bkz. game-shell). */
  const [pending, setPending] = useState<GameResult | null>(null);

  useEffect(() => {
    started.current = Date.now();
    setPicked(null);
    setPending(null);
    // Kelime kendiliğinden okunuyor: soru "çoğulu ne?" ve öğrenci çoğulu
    // sesten hatırlıyor. Düğmeye basmayı beklemek o ipucunu geciktiriyordu.
    // Küçük gecikme kart yerine otururken sesin başlamaması için.
    const s = setTimeout(() => speakGerman(withArtikel(round.word)), 350);
    // Seçimden sonra okunacak doğru çoğul da önden iniyor.
    prefetchGerman(`die ${answer}`);
    return () => clearTimeout(s);
  }, [round.id, answer, round.word]);

  function choose(option: string) {
    if (picked) return;
    setPicked(option);
    const isCorrect = option === answer;
    const latencyMs = Date.now() - started.current;
    // Doğru çoğul her zaman okunuyor, seçilen değil: çoğul biçim sesle
    // ezberleniyor ve yanlış olanı sesli pekiştirmek öğrenmenin tersine
    // çalışırdı. Çoğul artikeli hep „die“.
    vibrate(isCorrect ? "correct" : "wrong");
    setPending({ wordId: word.id, correct: isCorrect, latencyMs, ...miss(isCorrect, "plural", option) });
    speak(`die ${answer}`);
  }

  return (
    <GameShell
      label={tx("rounds.plural")}
      verdict={picked == null ? null : picked === answer ? "correct" : "wrong"}
      onContinue={pending ? () => onDone([pending]) : undefined}
      why={picked != null && picked !== answer ? whyFor({ type: "plural", word, detail: picked, correct: answer }, lang) : null}
      feedback={
        <span className="inline-flex items-center">
          <strong>die {answer}</strong>
          <SpeakButton text={`die ${answer}`} size="sm" className="ml-1" />
        </span>
      }
      prompt={
        <span className="inline-flex items-center gap-2">
          <span>
            <span className="muted">{word.artikel} </span>
            <span className="brand-text text-h1 sm:text-display">{word.de}</span>
          </span>
          <SpeakButton text={`${word.artikel ?? ""} ${word.de}`.trim()} size="sm" />
        </span>
      }
      hint={
        <span>
          {meaningOf(word, lang)}
          {word.en ? (
            <span className="opacity-60" lang="en">
              {" "}
              · {word.en}
            </span>
          ) : null}
        </span>
      }
    >
      <div role="radiogroup" aria-label={tx("rounds.plural")} className="grid grid-cols-2 gap-3">
        {options.map((option, i) => {
          const isAnswer = option === answer;
          const state =
            picked == null ? "" : isAnswer ? "option-correct" : option === picked ? "option-wrong" : "";
          return (
            <motion.button
              key={`${option}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              /* SECTIGIN SIK: `role="radio"` + `aria-checked`. Cevaptan sonra
                 dogru/yanlis `OptionMark`in erisilebilir adiyla soyleniyor;
                 HANGISINI sectigin once yalniz zemin renginden okunuyordu,
                 sonra `aria-pressed` ile soylendi - ama o bir AC/KAPA dugmesi
                 anlatiyor. Tek secimlik sik listesi radyo grubudur (bkz.
                 parity 257); Android karsiligi `OptionButton`
                 `accessibilityRole="radio"` (bkz. game/rounds). */
              role="radio"
              aria-checked={picked === option}
              transition={{ delay: i * 0.05 }}
              disabled={picked != null}
              onClick={() => choose(option)}
              className={`option flex min-h-14 items-center justify-center px-3 py-3 text-center text-body ${state} ${
                picked === option && !isAnswer ? "animate-shake" : ""
              }`}
            >
              {/* Çoğulda artikel her zaman "die" — şıkta da öyle görünsün. */}
              <span className="muted mr-1.5 text-body">die</span>
              {option}
              <OptionMark state={picked == null ? null : isAnswer ? "correct" : option === picked ? "wrong" : null} />
            </motion.button>
          );
        })}
      </div>

    </GameShell>
  );
}
