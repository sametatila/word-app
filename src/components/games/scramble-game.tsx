"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { currentTargetLang } from "@/components/games/types";
import { whyFor } from "@/lib/why";
import { miss } from "@/lib/errors";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { useNoHints } from "./no-hints";
import { useRoundExit } from "./use-round-exit";
import { foldTight, withArtikel, type GameProps, type GameResult , meaningOf } from "./types";
import { seededShuffle } from "@/lib/shuffle";
import type { Round } from "@/lib/types";
import { vibrate } from "@/lib/fx";
import { prefetchGerman, SpeakButton } from "@/components/speak-button";
import { useT, useLang } from "@/lib/i18n/client";
import { play } from "@/lib/sfx";

type ScrambleRound = Extract<Round, { game: "scramble" }>;
type Status = "playing" | "correct" | "wrong";
type Tile = { id: number; char: string };

/**
 * Harf havuzu.
 *
 * Diziliş tohumlu, çünkü bu işlev render sırasında (ilk `useState`) çalışıyor:
 * `Math.random()` ile sunucu bir sıra, tarayıcı başka bir sıra üretiyordu ve
 * React ağacı hydration'da yeniden kuruluyordu. Karıştırmayı `useEffect`e
 * almak sorunu çözerdi ama bir kare boyunca harfleri DOĞRU sırayla gösterirdi
 * — yani bulmacanın cevabını.
 *
 * Tohum tura özel: aynı kelime başka bir turda başka türlü diziliyor, aynı
 * turda ise bileşen yeniden çizilse bile diziliş sabit kalıyor.
 */
function makePool(word: string, seed: string): Tile[] {
  const letters = Array.from(word).filter((c) => c !== " ");
  return seededShuffle(letters.map((char, id) => ({ id, char })), seed);
}

/**
 * Harf Bulmacası — sabit yerleşim.
 * Harf kutuları asla yer değiştirmez: seçilen harf havuzdaki yerinde soluklaşır,
 * cevap alanı da baştan harf sayısı kadar sabit yuvayla çizilir. Böylece
 * dokunulacak hedef oyun boyunca aynı yerde kalır.
 */
export function ScrambleGame({ round, onDone }: GameProps<ScrambleRound>) {
  const tx = useT();
  const lang = useLang();
  // Sınav kâğıdında ipucu düğmesi yok (bkz. no-hints.tsx).
  const noHints = useNoHints();
  const { word } = round;

  const targetLetters = useMemo(() => Array.from(word.de).filter((c) => c !== " "), [word.de]);
  // Harf döşemeleri boşluksuz diziliyor; karşılaştırma da boşluksuz biçimde.
  // `normalize` artık tireyi de boşluğa çeviriyor (bkz. `games/types` PUNCT) ve
  // düz karşılaştırma iki tarafa aynı boşluğu koyduğu için tesadüfen çalışıyordu;
  // sıkıştırılmış biçim bunu kurala bağlıyor. Mobil `game/rounds` da böyle.
  const compareTarget = useMemo(() => foldTight(word.de), [word.de]);

  const [pool, setPool] = useState<Tile[]>(() => makePool(word.de, round.id));
  const [placed, setPlaced] = useState<Tile[]>([]);
  const [status, setStatus] = useState<Status>("playing");
  const [hintUsed, setHintUsed] = useState(false);

  const started = useRef(Date.now());
  const resolvedRef = useRef(false);
  const { speak, abortExit } = useRoundExit();
  /* Cevabın sonucu "Devam"a kadar burada bekliyor (bkz. game-shell). */
  const [pending, setPending] = useState<GameResult | null>(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    setPool(makePool(round.word.de, round.id));
    // Tamamlanınca okunacak metin belli; önden indirilirse dokunuşla ses
    // arasında boşluk kalmıyor.
    prefetchGerman(withArtikel(round.word));
    setPlaced([]);
    setStatus("playing");
    setPending(null);
    setHintUsed(false);
    started.current = Date.now();
    resolvedRef.current = false;
    // Yeni tur açılırken önceki turun bekleyen okuması/sayacı iptal ediliyor.
    abortExit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id]);

  useEffect(() => {
    if (status !== "playing") return;
    if (placed.length === 0 || placed.length !== targetLetters.length) return;
    if (resolvedRef.current) return;
    resolvedRef.current = true;

    const isCorrect = foldTight(placed.map((t) => t.char).join("")) === compareTarget;
    const latencyMs = Date.now() - started.current;
    setStatus(isCorrect ? "correct" : "wrong");
    // Harfler tamamlanınca kelime okunuyor: bulmaca yazımı çalıştırıyor ama
    // yazımı bilip nasıl okunduğunu bilmemek sık rastlanan bir boşluk.
    // Her zaman doğru biçim okunuyor, dizilen değil.
    vibrate(isCorrect ? "correct" : "wrong");
    setPending({
      wordId: word.id,
      correct: isCorrect,
      latencyMs,
      hintUsed,
      ...miss(isCorrect, "spelling", placed.map((t) => t.char).join("")),
    });
    speak(withArtikel(word));
  }, [placed, status, targetLetters.length, compareTarget, word, hintUsed, speak]);

  const usedIds = new Set(placed.map((t) => t.id));

  function addLetter(tile: Tile) {
    if (status !== "playing" || usedIds.has(tile.id)) return;
    /* DOKUNUS SESI. `tap.mp3` webde de yuklu ama yalnizca ses anahtarinin
       onizlemesinde caliniyordu; Android her harf/kelime yerlestirmede ve
       geri almada caliyor (`game/rounds`). Karo hareketi sessizdi. */
    play("tap");
    setPlaced((prev) => (prev.length >= targetLetters.length ? prev : [...prev, tile]));
  }

  function removeAt(index: number) {
    if (status !== "playing") return;
    play("tap");
    setPlaced((prev) => prev.filter((_, i) => i !== index));
  }

  function backspace() {
    if (status !== "playing" || placed.length === 0) return;
    play("tap");
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
  const slotSize = compact ? "h-11 w-9 text-h3" : "h-12 w-10 text-h2 sm:h-14 sm:w-11";
  const tileSize = compact ? "h-11 w-10 text-h3" : "h-12 w-11 text-h2 sm:h-13 sm:w-12";

  const slotTone =
    status === "correct"
      ? "var(--color-mint)"
      : status === "wrong"
        ? "var(--color-rose)"
        : "var(--border)";

  return (
    <GameShell
      label={tx("rounds.order_letters")}
      verdict={status === "playing" ? null : status}
      onContinue={pending ? () => onDoneRef.current([pending]) : undefined}
      why={status === "wrong" ? whyFor({ type: "spelling", word, detail: placed.map((t) => t.char).join(""), targetLang: currentTargetLang() }, lang) : null}
      feedback={
        <span className="inline-flex items-center">
          {tx(status === "correct" ? "rounds.great" : "rounds.answer_is")}
          <strong className="ml-1">{word.de}</strong>
          <SpeakButton text={withArtikel(word)} size="sm" className="ml-1" />
        </span>
      }
      prompt={
        <span className="brand-text text-h1 sm:text-display">
          {meaningOf(word, lang)}
          {/* Karıştırılmış harflerden kelimeyi kuran şey anlam; anlam Türkçede
              başka bir kelimeyle çakışıyorsa İngilizce satır ayırıyor. */}
          {word.en ? (
            <span className="block text-body opacity-60" lang="en">
              {word.en}
            </span>
          ) : null}
        </span>
      }
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
                aria-label={tile ? tx("rounds.undo_letter", { char: tile.char }) : tx("rounds.empty_letter_slot")}
                className={`flex items-center justify-center rounded-tile font-bold transition-colors ${slotSize}`}
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
                whileTap={{ scale: 0.96 }}
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
            className="btn btn-ghost px-5 py-2.5 text-body disabled:opacity-60"
          >
            {tx("common.delete")}
          </button>
          {noHints ? null : (
            <button
              type="button"
              onClick={useHint}
              disabled={status !== "playing" || placed.length >= targetLetters.length}
              className="btn btn-ghost px-5 py-2.5 text-body disabled:opacity-60"
            >
              {tx("rounds.hint")}
            </button>
          )}
        </div>
      </div>
    </GameShell>
  );
}
