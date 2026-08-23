"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { useRoundExit } from "./use-round-exit";
import { withArtikel, shuffle, type GameProps, type GameResult } from "./types";
import type { Round } from "@/lib/types";
import { MeaningText } from "@/components/meaning-text";
import { fx } from "@/lib/fx";
import { speakGerman } from "@/components/speak-button";

type MatchRound = Extract<Round, { game: "match" }>;

type RightItem = { wordId: number; tr: string; en: string | null };

export function MatchGame({ round, onDone }: GameProps<MatchRound>) {
  const { words } = round;

  const [rightItems, setRightItems] = useState<RightItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRightIdx, setSelectedRightIdx] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ left: number; rightIdx: number } | null>(null);
  const [pulseId, setPulseId] = useState<number | null>(null);

  const startedRef = useRef(Date.now());
  const wrongBeforeRef = useRef<Set<number>>(new Set());
  const resultsRef = useRef<GameResult[]>([]);
  const doneRef = useRef(false);
  const { exitAfter } = useRoundExit();

  useEffect(() => {
    setRightItems(shuffle(words.map((w) => ({ wordId: w.id, tr: w.tr, en: w.en }))));
    setSelectedLeft(null);
    setSelectedRightIdx(null);
    setMatched(new Set());
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
      resultsRef.current.push({ wordId: leftId, correct, latencyMs });

      const next = new Set(matched);
      next.add(leftId);
      setMatched(next);
      setSelectedLeft(null);
      setSelectedRightIdx(null);
      setPulseId(leftId);
      setTimeout(() => setPulseId(null), 400);

      if (next.size === words.length && !doneRef.current) {
        doneRef.current = true;
        fx("correct", 500);
        exitAfter(500, () => onDone(resultsRef.current));
      } else {
        fx("correct");
      }
    } else {
      fx("wrong");
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
    setSelectedRightIdx(idx);
    if (selectedLeft != null) {
      tryMatch(selectedLeft, idx);
    }
  }

  return (
    <GameShell label="Eşleştirme">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          {words.map((w, i) => {
            const isMatched = matched.has(w.id);
            const isSelected = selectedLeft === w.id;
            const isWrong = wrongPair?.left === w.id;
            const state = isMatched
              ? "option-correct opacity-50"
              : isWrong
                ? "option-wrong"
                : isSelected
                  ? "ring-2 ring-[color:var(--color-brand-400)]"
                  : "";
            return (
              <motion.button
                key={w.id}
                type="button"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0, scale: pulseId === w.id ? [1, 1.1, 1] : 1 }}
                transition={{ delay: i * 0.05, duration: 0.28 }}
                disabled={isMatched}
                onClick={() => chooseLeft(w.id)}
                className={`option min-h-14 px-3 py-3 text-left text-sm font-semibold sm:text-base ${state} ${
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
              ? "option-correct opacity-50"
              : isWrong
                ? "option-wrong"
                : isSelected
                  ? "ring-2 ring-[color:var(--color-brand-400)]"
                  : "";
            return (
              <motion.button
                key={`${item.wordId}-${i}`}
                type="button"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0, scale: pulseId === item.wordId ? [1, 1.1, 1] : 1 }}
                transition={{ delay: i * 0.05, duration: 0.28 }}
                disabled={isMatched}
                onClick={() => chooseRight(i)}
                className={`option min-h-14 px-3 py-3 text-left font-semibold ${state} ${
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
