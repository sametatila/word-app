"use client";

import { useEffect, useState } from "react";
import { useTargetLang } from "./player-context";
import type { ReadingExercise } from "@/lib/skills/types";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { GlossPanel, QuestionList } from "./quiz";
import { speakSegments, stopSpeaking, useSpeechAvailable } from "@/components/speak-button";
import { SpeakerIcon, StopIcon } from "@/components/icons";
import { useT } from "@/lib/i18n/client";

/** Okuma egzersizi: metin + sözlükçe + anlama soruları. */
export function ReadingPlayer({ exercise, backHref }: { exercise: ReadingExercise; backHref?: string }) {
  const lang = useTargetLang();
  const t = useT();
  const { finish, state, reset } = useSkillFinish(exercise, exercise.questions.length);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState(0);

  /*
    SESLİ OKU — webde hiç yoktu, mobilde vardı ve orada ÇALIŞMIYORDU.

    Mobildeki düğme bütün parçayı tek istekte gönderiyor, uç 600 karakterin
    üstünü 400 `bad_text` ile reddediyordu: 120 okuma alıştırmasının 85'i
    (en uzunu 2245 karakter) sessizdi. Artık `speakSegments` metni cümle
    sınırından bölüp zincirliyor, yani uzunluk sınırı diye bir şey kalmıyor;
    aynı düğme webe de geldi.

    Ses METNİN dilinden ve kullanıcı tercihinden bağımsız (`voiceForSegment`
    → `lessonVoice`): okuma parçası uzun, yani pahalı bir sentez. Sabit ses
    bir parçayı bütün kullanıcılar için TEK önbellek girdisi yapıyor —
    parçayı ilk açan kişi onu herkes için ısıtıyor.
  */
  const canSpeak = useSpeechAvailable();
  const [reading, setReading] = useState(false);
  useEffect(() => () => stopSpeaking(), []);

  return (
    <PlayerShell exercise={exercise} backHref={backHref}>
      <p className="muted px-1 text-body">{exercise.intro}</p>

      {canSpeak ? (
        <button
          type="button"
          className="btn btn-ghost mt-3 flex items-center gap-2 px-4 py-2 text-body"
          onClick={() => {
            if (reading) {
              stopSpeaking();
              setReading(false);
              return;
            }
            setReading(true);
            // Paragraf sınırı korunuyor: her paragraf ayrı parça, aralarında
            // nefes payı. Tek dizgeye eklenseydi paragraf geçişi duyulmazdı.
            speakSegments(
              exercise.text.split("\n\n").map((para, i) => ({ lang, text: para, pace: "listen" as const, gapBefore: i ? 0.5 : undefined })),
              () => setReading(false),
            );
          }}
        >
          {reading ? <StopIcon size={16} /> : <SpeakerIcon size={16} />}
          {t(reading ? "item.stop" : "item.read_aloud")}
        </button>
      ) : null}

      {/* select-text: öğrenci kelime kopyalayıp sözlüğe bakabilsin. */}
      <article className="card mt-3 select-text p-5">
        {exercise.text.split("\n\n").map((para, i) => (
          <p
            key={i}
            className={`whitespace-pre-line text-body leading-relaxed ${i > 0 ? "mt-3.5" : ""}`}
            lang={lang}
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
