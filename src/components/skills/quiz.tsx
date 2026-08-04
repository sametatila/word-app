"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Gloss, SkillQuestion } from "@/lib/skills/types";
import { speakGerman } from "@/components/speak-button";
import { CheckIcon, InfoIcon, XIcon } from "@/components/icons";

/**
 * Anlama soruları — Goethe kâğıdı gibi hepsi alt alta. Şık seçilince kilitlenir,
 * doğru/yanlış anında boyanır ve Türkçe açıklama açılır. Tüm sorular
 * cevaplanınca üst bileşene toplam doğru sayısı bildirilir.
 */
export function QuestionList({
  questions,
  onAllAnswered,
}: {
  questions: SkillQuestion[];
  onAllAnswered: (correct: number) => void;
}) {
  const [picks, setPicks] = useState<(number | null)[]>(() => questions.map(() => null));

  function pick(qi: number, oi: number) {
    if (picks[qi] !== null) return;
    const next = [...picks];
    next[qi] = oi;
    setPicks(next);
    if (next.every((p) => p !== null)) {
      const correct = next.filter((p, i) => p === questions[i].answer).length;
      onAllAnswered(correct);
    }
  }

  return (
    <div className="mt-5 space-y-4">
      <h2 className="px-1 font-bold">Sorular</h2>
      {questions.map((q, qi) => {
        const done = picks[qi] !== null;
        const wasCorrect = done && picks[qi] === q.answer;
        return (
          <section key={qi} className="card p-4">
            <p className="text-sm font-semibold leading-relaxed">
              <span className="muted mr-1.5">{qi + 1}.</span>
              {q.text}
            </p>
            <div className="mt-3 grid gap-2">
              {q.options.map((opt, oi) => {
                const cls = !done
                  ? ""
                  : oi === q.answer
                    ? "option-correct"
                    : picks[qi] === oi
                      ? "option-wrong animate-shake"
                      : "opacity-55";
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={done}
                    onClick={() => pick(qi, oi)}
                    className={`option flex items-center justify-between gap-2 px-3.5 py-2.5 text-left text-sm font-semibold ${cls}`}
                  >
                    <span>{opt}</span>
                    {done && oi === q.answer ? (
                      <CheckIcon size={16} className="shrink-0 text-[color:var(--color-mint-500)]" />
                    ) : done && picks[qi] === oi ? (
                      <XIcon size={16} className="shrink-0 text-[color:var(--color-rose-500)]" />
                    ) : null}
                  </button>
                );
              })}
            </div>
            {done ? (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 rounded-xl px-3 py-2 text-xs leading-relaxed"
                style={{
                  background: wasCorrect
                    ? "color-mix(in srgb, var(--color-mint-500) 10%, transparent)"
                    : "color-mix(in srgb, var(--color-rose-500) 9%, transparent)",
                  color: "var(--text)",
                }}
              >
                {q.explain}
              </motion.p>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

/** Egzersize özel mini sözlükçe — kapalı başlar, tek dokunuşla açılır. */
export function GlossPanel({ gloss }: { gloss: Gloss[] }) {
  const [open, setOpen] = useState(false);
  if (!gloss.length) return null;
  return (
    <section className="card mt-4 p-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-2 text-sm font-bold">
          <InfoIcon size={16} className="text-[color:var(--color-brand-500)]" />
          Sözlükçe
          <span className="muted font-semibold">({gloss.length} kelime)</span>
        </span>
        <span className="muted text-xs font-semibold">{open ? "Gizle" : "Göster"}</span>
      </button>
      {open ? (
        <>
          <div className="mt-3 flex flex-wrap gap-2">
            {gloss.map((g) => (
              <button
                key={g.de}
                type="button"
                onClick={() => speakGerman(g.de)}
                title="Telaffuzu dinle"
                className="chip px-3 py-1.5 text-xs"
              >
                <strong className="text-[color:var(--text)]">{g.de}</strong>
                <span className="mx-1 opacity-50">·</span>
                {g.tr}
              </button>
            ))}
          </div>
          <p className="muted mt-2 text-[11px]">Kelimeye dokununca telaffuzunu duyarsın.</p>
        </>
      ) : null}
    </section>
  );
}
