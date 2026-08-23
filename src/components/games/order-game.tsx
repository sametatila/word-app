"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import type { GameProps } from "./types";
import type { Round } from "@/lib/types";
import { SentenceTranslation } from "@/components/meaning-text";
import { fx, vibrate } from "@/lib/fx";
import { prefetchGerman, speakGerman, speakThen, SpeakButton } from "@/components/speak-button";

type OrderRound = Extract<Round, { game: "order" }>;
type Status = "playing" | "correct" | "wrong";
/** Aynı kelime cümlede iki kez geçebildiği için kutular kimlikle taşınır. */
type Token = { id: number; text: string };

/**
 * Cümleyi Diz.
 *
 * Almancada anlamı taşıyan şey büyük ölçüde sıradır: fiil ikinci sırada durur,
 * ayrılabilir ön ek cümlenin sonuna düşer, yan cümlede fiil en sona gider.
 * Kelimeyi tek başına bilmek bu sırayı bilmek değildir — bu tur onu ayrıca
 * çalıştırır.
 *
 * Yerleşim Harf Bulmacası'yla aynı mantıkta: kutular yer değiştirmez, seçilen
 * kelime havuzdaki yerinde soluklaşır, cevap alanı baştan kelime sayısı kadar
 * yuvayla çizilir. Böylece dokunulacak hedef tur boyunca sabit kalır.
 */
export function OrderGame({ round, onDone }: GameProps<OrderRound>) {
  const { word, tokens, answer, tail, sentenceTr, sentenceEn } = round;

  const pool = useMemo<Token[]>(() => tokens.map((text, id) => ({ id, text })), [tokens]);
  const [placed, setPlaced] = useState<Token[]>([]);
  const [status, setStatus] = useState<Status>("playing");
  const [hintUsed, setHintUsed] = useState(false);

  const started = useRef(Date.now());
  const resolved = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cümle tamamlanınca doğru hâli okunuyor ve o metin baştan belli; en uzun
  // ses bu oyunda olduğu için önden indirmenin kazancı da en çok burada.
  useEffect(() => {
    prefetchGerman([...answer, tail].filter(Boolean).join(" "));
  }, [answer, tail]);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    setPlaced([]);
    setStatus("playing");
    setHintUsed(false);
    started.current = Date.now();
    resolved.current = false;
    if (timer.current) clearTimeout(timer.current);
  }, [round.id]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (status !== "playing" || resolved.current) return;
    if (placed.length !== answer.length) return;
    resolved.current = true;

    const isCorrect = placed.map((t) => t.text).join(" ") === answer.join(" ");
    const latencyMs = Date.now() - started.current;
    setStatus(isCorrect ? "correct" : "wrong");
    // Cümle tamamlanınca DOĞRU hâli bütün olarak okunuyor. Tek tek kelimeler
    // yerleştirilirken duyulmuştu ama cümlenin ritmi ancak bütün okunduğunda
    // çıkıyor — asıl öğrenilen şey o.
    const full = [...answer, tail].filter(Boolean).join(" ");
    // Cümle uzun ve uzunluğu turdan tura çok değişiyor; sabit süre burada
    // özellikle kırılgandı. Çizgi okumanın gerçek uzunluğunda dolduruluyor.
    vibrate(isCorrect ? "correct" : "wrong");
    const rest = isCorrect ? 0 : 1400;
    speakThen(
      full,
      () => {
        timer.current = setTimeout(
          () => onDoneRef.current([{ wordId: word.id, correct: isCorrect, latencyMs, hintUsed }]),
          rest,
        );
      },
      { maxWaitMs: 12000, onDuration: (ms) => fx(isCorrect ? "correct" : "wrong", ms + rest) },
    );
  }, [placed, status, answer, tail, word.id, hintUsed]);

  const usedIds = new Set(placed.map((t) => t.id));

  function add(token: Token) {
    if (status !== "playing" || usedIds.has(token.id)) return;
    // Her yerleştirilen kelime tek tek okunuyor: cümle kurulurken sırayı
    // sesle takip etmek, Almanca sözcük dizilişini kulakla öğrenmenin yolu.
    speakGerman(token.text);
    setPlaced((prev) => (prev.length >= answer.length ? prev : [...prev, token]));
  }

  function removeAt(index: number) {
    if (status !== "playing") return;
    setPlaced((prev) => prev.filter((_, i) => i !== index));
  }

  /** İpucu sıradaki doğru kelimeyi yerleştirir — cümleyi çözmez, tıkanmayı açar. */
  function useHint() {
    if (status !== "playing" || placed.length >= answer.length) return;
    const needed = answer[placed.length];
    const token = pool.find((t) => !usedIds.has(t.id) && t.text === needed);
    if (!token) return;
    setPlaced((prev) => [...prev, token]);
    setHintUsed(true);
  }

  const slotTone =
    status === "correct"
      ? "var(--color-mint-500)"
      : status === "wrong"
        ? "var(--color-rose-500)"
        : "var(--border)";

  return (
    <GameShell
      label="Cümleyi Diz"
      verdict={status === "playing" ? null : status}
      feedback={
        <span className="inline-flex flex-wrap items-center">
          {status === "correct" ? "Harika! " : "Doğrusu: "}
          <strong className="ml-1">
            {answer.join(" ")}
            {tail}
          </strong>
          <SpeakButton text={`${answer.join(" ")}${tail}`} size="sm" className="ml-1" />
        </span>
      }
      prompt={
        <span className="brand-text text-xl font-bold sm:text-2xl">
          {word.tr}
          {word.en ? (
            <span className="block text-sm font-normal opacity-60" lang="en">
              {word.en}
            </span>
          ) : null}
        </span>
      }
      hint={
        sentenceTr || sentenceEn ? (
          <SentenceTranslation tr={sentenceTr} en={sentenceEn} className="italic" />
        ) : undefined
      }
    >
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
        {/* Cevap alanı — yuva sayısı sabit, konumlar oynamaz */}
        <div
          className={`flex min-h-[3.5rem] flex-wrap items-center justify-center gap-1.5 rounded-2xl px-3 py-3 ${
            status === "wrong" ? "animate-shake" : ""
          }`}
          style={{ border: `2px dashed ${slotTone}`, background: "var(--surface-2)" }}
        >
          {answer.map((_, i) => {
            const token = placed[i];
            return (
              <button
                key={i}
                type="button"
                onClick={() => token && removeAt(i)}
                disabled={!token || status !== "playing"}
                aria-label={token ? `${token.text} kelimesini geri al` : "boş yer"}
                className={
                  token
                    ? "option px-2.5 py-1.5 text-base font-semibold"
                    : "rounded-lg px-2.5 py-1.5"
                }
                style={
                  token
                    ? undefined
                    : { minWidth: "2.5rem", background: "var(--surface)", opacity: 0.5 }
                }
              >
                {token?.text ?? " "}
              </button>
            );
          })}
          {placed.length === answer.length ? (
            <span className="px-0.5 text-base font-semibold">{tail}</span>
          ) : null}
        </div>

        {/* Kelime havuzu — kullanılan kelime yerinde soluklaşır */}
        <div className="flex flex-wrap justify-center gap-2">
          {pool.map((token) => {
            const used = usedIds.has(token.id);
            return (
              <motion.button
                key={token.id}
                type="button"
                onClick={() => add(token)}
                disabled={used || status !== "playing"}
                whileTap={{ scale: 0.94 }}
                animate={{ opacity: used ? 0.25 : 1 }}
                transition={{ duration: 0.15 }}
                className="option px-3 py-2 text-base font-semibold disabled:cursor-default"
              >
                {token.text}
              </motion.button>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setPlaced((prev) => prev.slice(0, -1))}
            disabled={status !== "playing" || placed.length === 0}
            className="btn btn-ghost px-5 py-2.5 text-sm disabled:opacity-40"
          >
            Sil
          </button>
          <button
            type="button"
            onClick={useHint}
            disabled={status !== "playing" || placed.length >= answer.length}
            className="btn btn-ghost px-5 py-2.5 text-sm disabled:opacity-40"
          >
            İpucu
          </button>
        </div>
      </div>
    </GameShell>
  );
}
