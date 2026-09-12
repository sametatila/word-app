"use client";

import { useEffect, useRef, useState } from "react";
import { miss } from "@/lib/errors";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { withArtikel, shuffle, type GameProps, type GameResult , meaningOf, meaningSubOf } from "./types";
import type { Round } from "@/lib/types";
import { MeaningText } from "@/components/meaning-text";
import { vibrate } from "@/lib/fx";
import { speakGerman } from "@/components/speak-button";
import { useT, useLang } from "@/lib/i18n/client";
import { play } from "@/lib/sfx";

type MatchRound = Extract<Round, { game: "match" }>;

type RightItem = { wordId: number; tr: string; en: string | null };

export function MatchGame({ round, onDone }: GameProps<MatchRound>) {
  const tx = useT();
  const lang = useLang();
  const { words } = round;

  const [rightItems, setRightItems] = useState<RightItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRightIdx, setSelectedRightIdx] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  /* Eşleşmelerin sonucu "Devam"a kadar burada bekliyor (bkz. game-shell). */
  const [pending, setPending] = useState<GameResult[] | null>(null);
  const [wrongPair, setWrongPair] = useState<{ left: number; rightIdx: number } | null>(null);
  const [pulseId, setPulseId] = useState<number | null>(null);

  const startedRef = useRef(Date.now());
  const wrongBeforeRef = useRef<Set<number>>(new Set());
  const resultsRef = useRef<GameResult[]>([]);
  const doneRef = useRef(false);

  useEffect(() => {
    // Sağ sütun ANADİLDE: eşleştirme, kelimeyle anlamı arasında kuruluyor ve
    // anlam kullanıcının bildiği dilde olmalı.
    setRightItems(shuffle(words.map((w) => ({ wordId: w.id, tr: meaningOf(w, lang), en: meaningSubOf(w, lang) }))));
    setSelectedLeft(null);
    setSelectedRightIdx(null);
    setMatched(new Set());
    setPending(null);
    setWrongPair(null);
    setPulseId(null);
    startedRef.current = Date.now();
    wrongBeforeRef.current = new Set();
    resultsRef.current = [];
    doneRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id]);

  function tryMatch(leftId: number, rightIdx: number) {
    const rightItem = rightItems[rightIdx];
    if (!rightItem) return;

    if (rightItem.wordId === leftId) {
      const latencyMs = Date.now() - startedRef.current;
      const correct = !wrongBeforeRef.current.has(leftId);
      resultsRef.current.push({ wordId: leftId, correct, latencyMs, ...miss(correct, "meaning") });

      const next = new Set(matched);
      next.add(leftId);
      setMatched(next);
      setSelectedLeft(null);
      setSelectedRightIdx(null);
      setPulseId(leftId);
      setTimeout(() => setPulseId(null), 400);

      if (next.size === words.length && !doneRef.current) {
        doneRef.current = true;
        vibrate("correct");
        // Tur "Devam" ile kapanıyor (bkz. game-shell): mobilde de eşleştirme
        // bitince şerit ve düğme geliyor, ekran kendiliğinden kayıp gitmiyor.
        // Kopya: `resultsRef` bir sonraki turda sıfırlanıyor, duruma
        // referans vermek onu turdan sonra da canlı tutardı.
        setPending([...resultsRef.current]);
      } else {
        vibrate("correct");
      }
    } else {
      vibrate("wrong");
      wrongBeforeRef.current.add(leftId);
      wrongBeforeRef.current.add(rightItem.wordId);
      setWrongPair({ left: leftId, rightIdx });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedLeft(null);
        setSelectedRightIdx(null);
      }, 600);
    }
  }

  function chooseLeft(wordId: number) {
    if (matched.has(wordId) || wrongPair) return;
    /* Dokunus sesi — Android karti secerken caliyor (`game/rounds`
       `pickLeft`). */
    play("tap");
    // Almanca kelimeye dokununca telaffuzu da duyulur: eşleştirme aynı zamanda
    // kulak eğitimidir.
    const w = words.find((x) => x.id === wordId);
    if (w) speakGerman(withArtikel(w));
    setSelectedLeft(wordId);
    if (selectedRightIdx != null) {
      tryMatch(wordId, selectedRightIdx);
    }
  }

  function chooseRight(idx: number) {
    const item = rightItems[idx];
    if (!item || matched.has(item.wordId) || wrongPair) return;
    play("tap");
    setSelectedRightIdx(idx);
    if (selectedLeft != null) {
      tryMatch(selectedLeft, idx);
    }
  }

  return (
    <GameShell
      label={tx("rounds.match")}
      /* Eşleştirmede tek tek doğru/yanlış yok: tur bitince hepsi eşleşmiş
         olur, o yüzden şerit yalnız "tamam" diyor. */
      verdict={pending ? "correct" : null}
      onContinue={pending ? () => onDone(pending) : undefined}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          {words.map((w, i) => {
            const isMatched = matched.has(w.id);
            const isSelected = selectedLeft === w.id;
            const isWrong = wrongPair?.left === w.id;
            const state = isMatched
              ? "option-correct"
              : isWrong
                ? "option-wrong"
                : isSelected
                  ? "ring-2 ring-[color:var(--color-brand)]"
                  : "";
            return (
              <motion.button
                key={w.id}
                type="button"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0, scale: pulseId === w.id ? [1, 1.1, 1] : 1 }}
                /* ESLESTIRMEDE SECIM: once soldan birini seciyorsun, sonra
                   sagdan karsiligini. O ARADAKI secim yalnizca halka
                   (`ring-2`) ile anlatiliyordu - ekran okuyucu kullanan biri
                   hangisini bekletmekte oldugunu bilmiyordu. Android
                   karsiligi `MatchCard` `selected: state === "sel"`. */
                aria-pressed={isSelected}
                transition={{ delay: i * 0.05, duration: 0.28 }}
                disabled={isMatched}
                onClick={() => chooseLeft(w.id)}
                className={`option min-h-14 px-3 py-3 text-left text-strong sm:text-h3 disabled:opacity-60 ${state} ${
                  isWrong ? "animate-shake" : ""
                }`}
              >
                {withArtikel(w)}
              </motion.button>
            );
          })}
        </div>
        <div className="flex flex-col gap-3">
          {rightItems.map((item, i) => {
            const isMatched = matched.has(item.wordId);
            const isSelected = selectedRightIdx === i;
            const isWrong = wrongPair?.rightIdx === i;
            const state = isMatched
              ? "option-correct"
              : isWrong
                ? "option-wrong"
                : isSelected
                  ? "ring-2 ring-[color:var(--color-brand)]"
                  : "";
            return (
              <motion.button
                key={`${item.wordId}-${i}`}
                type="button"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0, scale: pulseId === item.wordId ? [1, 1.1, 1] : 1 }}
                aria-pressed={isSelected}
                transition={{ delay: i * 0.05, duration: 0.28 }}
                disabled={isMatched}
                onClick={() => chooseRight(i)}
                className={`option min-h-14 px-3 py-3 text-left font-semibold disabled:opacity-60 ${state} ${
                  isWrong ? "animate-shake" : ""
                }`}
              >
                <MeaningText tr={item.tr} en={item.en} size="sm" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </GameShell>
  );
}
