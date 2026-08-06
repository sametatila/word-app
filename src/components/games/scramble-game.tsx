"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { shuffle, normalize, withArtikel, type GameProps } from "./types";
import type { Round } from "@/lib/types";
import { fx, vibrate } from "@/lib/fx";
import { prefetchGerman, speakThen } from "@/components/speak-button";

type ScrambleRound = Extract<Round, { game: "scramble" }>;
type Status = "playing" | "correct" | "wrong";
type Tile = { id: number; char: string };

function makePool(word: string): Tile[] {
  const letters = Array.from(word).filter((c) => c !== " ");
  return shuffle(letters.map((char, id) => ({ id, char })));
}

/**
 * Harf Bulmacası — sabit yerleşim.
 * Harf kutuları asla yer değiştirmez: seçilen harf havuzdaki yerinde soluklaşır,
 * cevap alanı da baştan harf sayısı kadar sabit yuvayla çizilir. Böylece
 * dokunulacak hedef oyun boyunca aynı yerde kalır.
 */
export function ScrambleGame({ round, onDone }: GameProps<ScrambleRound>) {
  const { word } = round;

  const targetLetters = useMemo(() => Array.from(word.de).filter((c) => c !== " "), [word.de]);
  const compareTarget = useMemo(() => normalize(word.de.replace(/\s+/g, "")), [word.de]);

  const [pool, setPool] = useState<Tile[]>(() => makePool(word.de));
  const [placed, setPlaced] = useState<Tile[]>([]);
  const [status, setStatus] = useState<Status>("playing");
  const [hintUsed, setHintUsed] = useState(false);

  const started = useRef(Date.now());
  const resolvedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    setPool(makePool(round.word.de));
    // Tamamlanınca okunacak metin belli; önden indirilirse dokunuşla ses
    // arasında boşluk kalmıyor.
    prefetchGerman(withArtikel(round.word));
    setPlaced([]);
    setStatus("playing");
    setHintUsed(false);
    started.current = Date.now();
    resolvedRef.current = false;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (status !== "playing") return;
    if (placed.length === 0 || placed.length !== targetLetters.length) return;
    if (resolvedRef.current) return;
    resolvedRef.current = true;

    const isCorrect = normalize(placed.map((t) => t.char).join("")) === compareTarget;
    const latencyMs = Date.now() - started.current;
    setStatus(isCorrect ? "correct" : "wrong");
    // Harfler tamamlanınca kelime okunuyor: bulmaca yazımı çalıştırıyor ama
    // yazımı bilip nasıl okunduğunu bilmemek sık rastlanan bir boşluk.
    // Her zaman doğru biçim okunuyor, dizilen değil.
    vibrate(isCorrect ? "correct" : "wrong");
    const tail = isCorrect ? 0 : 1100;
    speakThen(
      withArtikel(word),
      () => {
        timeoutRef.current = setTimeout(
          () => onDoneRef.current([{ wordId: word.id, correct: isCorrect, latencyMs, hintUsed }]),
          tail,
        );
      },
      { onDuration: (ms) => fx(isCorrect ? "correct" : "wrong", ms + tail) },
    );
  }, [placed, status, targetLetters.length, compareTarget, word, hintUsed]);

  const usedIds = new Set(placed.map((t) => t.id));

  function addLetter(tile: Tile) {
    if (status !== "playing" || usedIds.has(tile.id)) return;
    setPlaced((prev) => (prev.length >= targetLetters.length ? prev : [...prev, tile]));
  }

  function removeAt(index: number) {
    if (status !== "playing") return;
    setPlaced((prev) => prev.filter((_, i) => i !== index));
  }

  function backspace() {
    if (status !== "playing" || placed.length === 0) return;
    setPlaced((prev) => prev.slice(0, -1));
  }

  function useHint() {
    if (status !== "playing" || placed.length >= targetLetters.length) return;
    const needed = targetLetters[placed.length];
    const tile =
      pool.find((t) => !usedIds.has(t.id) && t.char === needed) ??
      pool.find(
        (t) =>
          !usedIds.has(t.id) &&
          t.char.toLocaleLowerCase("de-DE") === needed.toLocaleLowerCase("de-DE"),
      );
    if (!tile) return;
    setPlaced((prev) => [...prev, tile]);
    setHintUsed(true);
  }

  // Uzun kelimelerde kutular küçülür ki tek satıra sığsın (7+1 kırılması olmasın).
  const compact = targetLetters.length > 7;
  const slotSize = compact ? "h-11 w-9 text-lg" : "h-12 w-10 text-xl sm:h-14 sm:w-11";
  const tileSize = compact ? "h-11 w-10 text-lg" : "h-12 w-11 text-xl sm:h-13 sm:w-12";

  const slotTone =
    status === "correct"
      ? "var(--color-mint-500)"
      : status === "wrong"
        ? "var(--color-rose-500)"
        : "var(--border)";

  return (
    <GameShell
      label="Harf Bulmacası"
      prompt={<span className="brand-text text-2xl font-bold sm:text-3xl">{word.tr}</span>}
    >
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-7">
        {/* Cevap yuvaları — sayısı ve konumu sabit */}
        <div
          className={`flex flex-wrap justify-center ${compact ? "gap-1" : "gap-1.5"} ${status === "wrong" ? "animate-shake" : ""}`}
        >
          {targetLetters.map((_, i) => {
            const tile = placed[i];
            return (
              <button
                key={i}
                type="button"
                onClick={() => tile && removeAt(i)}
                disabled={!tile || status !== "playing"}
                aria-label={tile ? `${tile.char} harfini geri al` : "boş yuva"}
                className={`flex items-center justify-center rounded-xl font-bold transition-colors ${slotSize}`}
                style={{
                  border: `2px ${tile ? "solid" : "dashed"} ${slotTone}`,
                  background: tile ? "var(--surface)" : "transparent",
                  color: "var(--text)",
                }}
              >
                {tile?.char ?? ""}
              </button>
            );
          })}
        </div>

        {status === "wrong" ? (
          <p className="muted -mt-3 text-center text-sm">
            Doğrusu: <strong className="brand-text">{word.de}</strong>
          </p>
        ) : null}

        {/* Harf havuzu — kutular yerinden oynamaz, kullanılan harf yerinde soluklaşır */}
        <div className={`flex flex-wrap justify-center ${compact ? "gap-1.5" : "gap-2"}`}>
          {pool.map((tile) => {
            const used = usedIds.has(tile.id);
            return (
              <motion.button
                key={tile.id}
                type="button"
                onClick={() => addLetter(tile)}
                disabled={used || status !== "playing"}
                whileTap={{ scale: 0.92 }}
                animate={{ opacity: used ? 0.25 : 1 }}
                transition={{ duration: 0.15 }}
                className={`option flex items-center justify-center font-bold disabled:cursor-default ${tileSize}`}
              >
                {tile.char}
              </motion.button>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={backspace}
            disabled={status !== "playing" || placed.length === 0}
            className="btn btn-ghost px-5 py-2.5 text-sm disabled:opacity-40"
          >
            Sil
          </button>
          <button
            type="button"
            onClick={useHint}
            disabled={status !== "playing" || placed.length >= targetLetters.length}
            className="btn btn-ghost px-5 py-2.5 text-sm disabled:opacity-40"
          >
            İpucu
          </button>
        </div>
      </div>
    </GameShell>
  );
}
