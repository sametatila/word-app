"use client";

import { useState } from "react";
import type { GrammarExercise } from "@/lib/skills/types";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { GlossPanel, QuestionList } from "./quiz";
import { useTargetLang } from "./player-context";
import { speakGerman } from "@/components/speak-button";
import { SpeakerIcon } from "@/components/icons";

/**
 * Dil bilgisi egzersizi: önce kural anlatımı (Türkçe, hedef dilde örnekler),
 * sonra aynı soru motoruyla sınama.
 *
 * Patika'nın gramer adımından farkı: orada sorular ünitenin derslerinden
 * TÜRETİLİYOR ve anlatım yok (ders zaten anlattı). Burada egzersiz kendi
 * başına duruyor — öğrenci Beceriler'den doğrudan bu kurala geliyor, o yüzden
 * anlatım şart. Sorular `QuestionList` ile oynanır; yeni bir soru motoru yok.
 *
 * Örnekler tıklanınca seslendirilir (`speakGerman` kursa göre ses seçer; adı
 * tarihsel). Anlatım katlanmıyor: kural okunmadan soruya geçmek bu egzersizin
 * amacını boşa çıkarır.
 */
export function GrammarPlayer({ exercise, backHref }: { exercise: GrammarExercise; backHref?: string }) {
  const lang = useTargetLang();
  const { finish, state, reset } = useSkillFinish(exercise, exercise.questions.length);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState(0);

  return (
    <PlayerShell exercise={exercise} backHref={backHref}>
      <p className="muted px-1 text-sm">{exercise.intro}</p>

      <section className="card mt-3 p-5">
        <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--color-flame-500)" }}>
          Kural
        </p>
        <h2 className="mt-1 text-base font-bold">{exercise.focus}</h2>

        {exercise.explanation.map((block, i) => (
          <div key={i} className={i > 0 ? "mt-4" : "mt-3"}>
            {block.heading ? <h3 className="text-sm font-bold">{block.heading}</h3> : null}
            <p className="mt-1 text-[15px] leading-relaxed">{block.tr}</p>
            {block.examples?.length ? (
              <ul className="mt-2 space-y-1.5">
                {block.examples.map((x, j) => (
                  <li key={j} className="rounded-xl px-3 py-2 surface-2">
                    <button
                      type="button"
                      onClick={() => speakGerman(x.de)}
                      className="flex w-full items-start gap-2 text-left"
                      title="Örneği dinle"
                    >
                      <SpeakerIcon size={16} className="mt-0.5 shrink-0" style={{ color: "var(--color-brand)" }} />
                      <span className="min-w-0">
                        <span className="block text-[15px] font-semibold" lang={lang}>
                          {x.de}
                        </span>
                        <span className="muted block text-sm">{x.tr}</span>
                        {x.note ? (
                          <span className="block text-xs font-semibold" style={{ color: "var(--color-flame-500)" }}>
                            {x.note}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </section>

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
