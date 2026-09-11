"use client";

import { useEffect, useRef, useState } from "react";
import { whyFor } from "@/lib/why";
import { miss } from "@/lib/errors";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { OptionMark } from "./option-mark";
import { useRoundExit } from "./use-round-exit";
import { withArtikel, targetName, type GameProps, type GameResult , meaningOf } from "./types";
import { nativeLangName } from "@/lib/i18n/dict";
import type { Option, Round } from "@/lib/types";
import { MeaningText } from "@/components/meaning-text";
import { vibrate } from "@/lib/fx";
import { prefetchGerman, speakGerman } from "@/components/speak-button";
import { useT, useLang } from "@/lib/i18n/client";

type ChoiceRound = Extract<Round, { game: "choice" }>;

export function ChoiceGame({ round, onDone }: GameProps<ChoiceRound>) {
  const tx = useT();
  const lang = useLang();
  const { word, options, direction } = round;
  const deSide = direction === "de-tr";
  // Soru ve cevap anadilde: İngilizce oynayan kullanıcıya Türkçe sorulmaz.
  const meaning = meaningOf(word, lang);
  const question = deSide ? withArtikel(word) : meaning;
  const answer = deSide ? meaning : withArtikel(word);

  const [picked, setPicked] = useState<string | null>(null);
  const started = useRef(Date.now());
  const { speak } = useRoundExit();
  /*
    Cevabın SONUCU burada bekliyor. Tur artık kendiliğinden kapanmıyor;
    "Devam"a basıldığında bu kayıt gönderiliyor (bkz. game-shell
    `onContinue`). Gecikmeyi cevap ANINDA ölçmek şart — "Devam"a ne zaman
    basıldığı öğrencinin okuma hızı, cevap hızı değil.
  */
  const [pending, setPending] = useState<GameResult | null>(null);

  useEffect(() => {
    started.current = Date.now();
    setPicked(null);
    setPending(null);
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
    setPending({ wordId: word.id, correct, latencyMs, ...miss(correct, "meaning", opt.text) });

    // Bu yönde soru zaten kart açılırken okundu; seçimde ses yok.
    if (deSide) return;
    // Almanca olan taraf cevap: seçimden sonra okunuyor.
    speak(answer);
  }

  return (
    // "Türkçe karşılığını seç" gibi bir alt bilgi yok: oyun başlığı + şıkların
    // dili zaten görevi anlatıyor, fazladan metin ekranı yorar.
    <GameShell
      label={deSide ? tx("rounds.ask_native", { nativeLang: nativeLangName(lang) }) : tx("rounds.ask_target", { target: targetName(lang) })}
      /* Bu oyunda çekme koreografisi hiç yok — karışık turda da tek oyun modunda da. */
      pull={false}
      verdict={picked == null ? null : picked === answer ? "correct" : "wrong"}
      onContinue={pending ? () => onDone([pending]) : undefined}
      why={picked != null && picked !== answer ? whyFor({ type: "meaning", word, detail: picked }, lang) : null}
      feedback={
        // Şerit doğruda da doluyor: cevabı görmek kadar onu bir kez daha
        // okumak da turun işi. Yanlışta düzeltme, doğruda pekiştirme.
        <span>
          {tx(picked === answer ? "rounds.correct_excl" : "rounds.answer_is")}
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
        <span className="text-h1 sm:text-display">
          {question}
          {/* Türkçeden Almancaya yönde soru bir anlamdır; İngilizcesi burada
              ayırt edici olarak duruyor ("o" tek başına üç kelimeye uyar). */}
          {!deSide && word.en ? (
            <span className="block text-body opacity-60" lang="en">
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
              /* SECTIGIN SIK: `aria-pressed`. Cevaptan sonra dogru/yanlis
                 `OptionMark`in erisilebilir adiyla soyleniyor, ama HANGISINI
                 sectigin yalnizca zemin renginden okunuyordu. Android
                 karsiligi `OptionButton` `chosen` (bkz. game/rounds). */
              aria-pressed={picked === opt.text}
              transition={{ delay: i * 0.05 }}
              disabled={picked != null}
              onClick={() => choose(opt)}
              className={`option flex items-center justify-between gap-3 px-4 py-3 text-left font-medium ${state} ${
                picked === opt.text && !isAnswer ? "animate-shake" : ""
              } ${picked === opt.text && isAnswer ? "animate-glow" : ""}`}
            >
              <MeaningText tr={opt.text} en={opt.sub} />
              {/* Seçim sonucu simgeyle de anlatılır: renk körlüğünde de okunur.
                  Simgenin erişilebilir adı da var (bkz. option-mark). */}
              <OptionMark state={picked == null ? null : isAnswer ? "correct" : picked === opt.text ? "wrong" : null} />
            </motion.button>
          );
        })}
      </div>
    </GameShell>
  );
}
