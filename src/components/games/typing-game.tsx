"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { normalize, withArtikel, type GameProps, typLabel } from "./types";
import type { Round } from "@/lib/types";
import { fx } from "@/lib/fx";

type TypingRound = Extract<Round, { game: "typing" }>;

type Status = "idle" | "correct" | "wrong";

const SPECIAL_CHARS = ["ä", "ö", "ü", "ß"] as const;

/** Karşılaştırmadan önce baştaki artikel (der/die/das) ya da "sich" kaldırılır. */
function compareKey(raw: string): string {
  return normalize(raw).replace(/^(der|die|das|sich)\s+/, "");
}

/**
 * İpucu iskeleti: her kelime parçasının ilk harfi ve sonrasında her üçüncü harf
 * açık, gerisi çizgi. "İlk harf: E" üstteki bilgiyi tekrarlıyordu; iskelet ise
 * kelimenin omurgasını verir ve gerçekten hatırlamaya yardım eder.
 */
function skeleton(de: string): string {
  let li = 0;
  const out: string[] = [];
  for (const ch of de) {
    if (ch === " " || ch === "-") {
      out.push(ch);
      li = 0;
      continue;
    }
    out.push(li % 3 === 0 ? ch : "_");
    li++;
  }
  return out.join(" ");
}

export function TypingGame({ round, onDone }: GameProps<TypingRound>) {
  const { word } = round;

  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [hintUsed, setHintUsed] = useState(false);
  const [hintShown, setHintShown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const started = useRef(Date.now());

  useEffect(() => {
    setValue("");
    setStatus("idle");
    setHintUsed(false);
    setHintShown(false);
    started.current = Date.now();
    inputRef.current?.focus();
  }, [round.id]);

  const letterCount = word.de.replace(/\s+/g, "").length;
  const firstLetter = word.de.trim().charAt(0).toUpperCase();

  function submit() {
    if (status !== "idle") return;
    // Aynı Türkçe anlama sahip başka bir Almanca kelime yazıldıysa da doğru sayılır.
    const typed = compareKey(value);
    const accepted = [word.de, ...(round.alternatives ?? [])].map(compareKey);
    const correct = accepted.includes(typed);
    setStatus(correct ? "correct" : "wrong");
    const latencyMs = Date.now() - started.current;
    const wait = correct ? 750 : 1500;
    fx(correct ? "correct" : "wrong", wait);
    setTimeout(() => onDone([{ wordId: word.id, correct, latencyMs, hintUsed }]), wait);
  }

  function insertChar(char: string) {
    if (status !== "idle") return;
    const el = inputRef.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const next = value.slice(0, start) + char + value.slice(end);
    setValue(next);
    requestAnimationFrame(() => {
      el?.focus();
      const pos = start + char.length;
      el?.setSelectionRange(pos, pos);
    });
  }

  function showHint() {
    if (status !== "idle") return;
    setHintUsed(true);
    setHintShown(true);
  }

  return (
    <GameShell
      label="Yazarak Hatırla"
      prompt={<span className="brand-text text-2xl font-bold sm:text-3xl">{word.tr}</span>}
      hint={
        <div className="flex items-center justify-center gap-2">
          <span className="surface-2 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide">
            {typLabel(word.typ, word.tr)}
          </span>
          <span>
            {letterCount} harf · <strong>{firstLetter}</strong> ile başlıyor
          </span>
        </div>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex flex-col gap-3"
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status !== "idle"}
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Almanca yaz..."
          className={`card min-h-14 w-full px-4 text-lg outline-none ${
            status === "wrong" ? "animate-shake border-[color:var(--color-rose-500)]" : ""
          } ${status === "correct" ? "border-[color:var(--color-mint-500)]" : ""}`}
        />

        <div className="flex flex-wrap justify-center gap-2">
          {SPECIAL_CHARS.map((char) => (
            <button
              key={char}
              type="button"
              onClick={() => insertChar(char)}
              disabled={status !== "idle"}
              className="btn btn-ghost min-h-9 min-w-9 px-3 text-base"
            >
              {char}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={showHint}
            disabled={status !== "idle" || hintShown}
            className="btn btn-ghost min-h-12 flex-1 px-4 text-sm"
          >
            İpucu
          </button>
          <button
            type="submit"
            disabled={status !== "idle" || value.trim() === ""}
            className="btn btn-primary min-h-12 flex-[2] px-4 text-sm"
          >
            Kontrol Et
          </button>
        </div>
      </form>

      {hintShown ? (
        <p
          className="mt-3 text-center font-mono text-base font-semibold tracking-wide"
          style={{ color: "var(--text)" }}
        >
          {skeleton(word.de)}
        </p>
      ) : null}

      {status === "correct" ? (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="animate-pop mt-4 text-center text-lg font-semibold text-[color:var(--color-mint-500)]"
        >
          Harika! Doğru cevap
        </motion.p>
      ) : null}

      {status === "wrong" ? (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-sm"
        >
          <span className="muted">Doğrusu: </span>
          <strong className="text-[color:var(--color-rose-500)]">{withArtikel(word)}</strong>
        </motion.p>
      ) : null}
    </GameShell>
  );
}
