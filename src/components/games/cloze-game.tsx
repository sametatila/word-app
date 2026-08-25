"use client";

import { useEffect, useRef, useState } from "react";
import { whyFor } from "@/lib/why";
import { classifyTyping, miss } from "@/lib/errors";
import { AnimatePresence, motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { useRoundExit } from "./use-round-exit";
import { matchesAnswer, type GameProps } from "./types";
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
  const typeMode = round.mode === "type";

  const [picked, setPicked] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const started = useRef(Date.now());
  const { speakAndExit } = useRoundExit();

  useEffect(() => {
    started.current = Date.now();
    setPicked(null);
    setDraft("");
    // Doğru cümlenin sesi tur açılırken iniyor. Hangi şıkkın seçileceği belli
    // değil ama doğru cümle her hâlükârda okunuyor; önden indirmek dokunuşla
    // sesin başlaması arasındaki boşluğu kapatıyor.
    prefetchGerman(`${before}${answer}${after}`.trim());
  }, [round.id, before, after, answer]);

  // Yazarak tamamlamada büyük/küçük harf ve umlaut yazımı hoş görülür
  // (kelime oyunlarındaki kural); şıkta metin birebir.
  const correct = picked !== null && (typeMode ? matchesAnswer(picked, [answer]) : picked === answer);

  function choose(opt: string) {
    if (picked) return;
    setPicked(opt);
    const isCorrect = typeMode ? matchesAnswer(opt, [answer]) : opt === answer;
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
    const advance = () =>
      onDone([
        {
          wordId: word.id,
          correct: isCorrect,
          latencyMs,
          ...miss(isCorrect, typeMode ? classifyTyping(opt, [answer]) : "meaning", opt),
        },
      ]);

    vibrate(isCorrect ? "correct" : "wrong");
    const tail = isCorrect ? 0 : WRONG_TAIL_MS;
    speakAndExit(truth, advance, {
      tail,
      onDuration: (ms) => fx(isCorrect ? "correct" : "wrong", ms + tail),
    });
  }

  return (
    <GameShell
      label={typeMode ? "Yazarak Tamamla" : "Cümleyi Tamamla"}
      verdict={picked == null ? null : correct ? "correct" : "wrong"}
      why={
        picked != null && !correct
          ? whyFor({ type: typeMode ? classifyTyping(picked, [answer]) : "meaning", word: { ...word, de: answer }, detail: picked })
          : null
      }
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
      {typeMode ? (
        /* Yazarak tamamlama (WP-14): şık yok, boşluğa yazılır. Umlaut tuşları
           yazma oyunundaki gibi; ipucu olarak kelimenin Türkçesi yer tutucuda. */
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (draft.trim()) choose(draft.trim());
          }}
          className="flex flex-col gap-3"
        >
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={picked != null}
            autoFocus
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            lang="de"
            placeholder={`Boşluğa yaz… (${word.tr})`}
            className={`card min-h-14 w-full px-4 text-lg outline-none ${
              picked != null && !correct ? "animate-shake border-[color:var(--color-rose)]" : ""
            } ${picked != null && correct ? "border-[color:var(--color-mint)]" : ""}`}
          />
          <div className="flex flex-wrap justify-center gap-2">
            {(["ä", "ö", "ü", "ß"] as const).map((ch) => (
              <button
                key={ch}
                type="button"
                disabled={picked != null}
                onClick={() => {
                  setDraft((v) => v + ch);
                  inputRef.current?.focus();
                }}
                className="btn btn-ghost min-h-9 min-w-9 px-3 text-base"
              >
                {ch}
              </button>
            ))}
          </div>
          <button type="submit" disabled={picked != null || !draft.trim()} className="btn btn-primary min-h-12 px-4 text-sm">
            Kontrol Et
          </button>
        </form>
      ) : (
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
      )}
    </GameShell>
  );
}
