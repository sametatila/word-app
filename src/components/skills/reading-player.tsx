"use client";

import { useState } from "react";
import type { ReadingExercise } from "@/lib/skills/types";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { GlossPanel, QuestionList } from "./quiz";

/** Okuma egzersizi: metin + sözlükçe + anlama soruları. */
export function ReadingPlayer({ exercise }: { exercise: ReadingExercise }) {
  const { finish, state } = useSkillFinish(exercise, exercise.questions.length);
  const [correct, setCorrect] = useState(0);

  return (
    <PlayerShell exercise={exercise}>
      <p className="muted px-1 text-sm">{exercise.intro}</p>

      <article className="card mt-3 p-5">
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
        questions={exercise.questions}
        onAllAnswered={(c) => {
          setCorrect(c);
          void finish(c);
        }}
      />

      <ResultCard correct={correct} total={exercise.questions.length} state={state} />
    </PlayerShell>
  );
}
