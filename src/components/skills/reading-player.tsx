"use client";

import { useState } from "react";
import type { ReadingExercise } from "@/lib/skills/types";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { GlossPanel, QuestionList } from "./quiz";

/** Okuma egzersizi: metin + sözlükçe + anlama soruları. */
export function ReadingPlayer({ exercise, backHref }: { exercise: ReadingExercise; backHref?: string }) {
  const { finish, state, reset } = useSkillFinish(exercise, exercise.questions.length);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState(0);

  return (
    <PlayerShell exercise={exercise} backHref={backHref}>
      <p className="muted px-1 text-sm">{exercise.intro}</p>

      {/* select-text: öğrenci kelime kopyalayıp sözlüğe bakabilsin. */}
      <article className="card mt-3 select-text p-5">
        {exercise.text.split("\n\n").map((para, i) => (
          <p
            key={i}
            className={`whitespace-pre-line text-[15px] leading-relaxed ${i > 0 ? "mt-3.5" : ""}`}
            lang="de"
          >
            {para}
          </p>
        ))}
      </article>

      <GlossPanel gloss={exercise.gloss} />

      <QuestionList
        key={round}
        questions={exercise.questions}
        onAllAnswered={(c) => {
          setCorrect(c);
          void finish(c);
        }}
      />

      <ResultCard
        correct={correct}
        total={exercise.questions.length}
        state={state}
        onRetry={() => {
          reset();
          setCorrect(0);
          setRound((r) => r + 1);
        }}
      />
    </PlayerShell>
  );
}
