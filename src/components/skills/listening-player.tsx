"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { CefrLevel, ListeningExercise } from "@/lib/skills/types";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { GlossPanel, QuestionList } from "./quiz";
import { SpeakerIcon, XIcon } from "@/components/icons";

/** Seviye yükseldikçe konuşma doğal hıza yaklaşır. */
const BASE_RATE: Record<CefrLevel, number> = {
  A1: 0.85,
  A2: 0.88,
  B1: 0.92,
  B2: 0.96,
  C1: 1,
};

/** Konuşmacıları ton farkıyla ayırt etmek için perde değerleri. */
const PITCHES = [1, 1.16, 0.88, 1.3];

/**
 * Dinleme egzersizi: metin cihazın Almanca konuşma sentezi ile seslendirilir —
 * çevrimdışı da çalışır, ek ses dosyası gerekmez. Konuşmacılar farklı perdeyle
 * ayrışır; istenirse yavaş mod ve (önce dinlemeyi teşvik eden) metin açma vardır.
 */
export function ListeningPlayer({ exercise }: { exercise: ListeningExercise }) {
  const { finish, state, reset } = useSkillFinish(exercise, exercise.questions.length);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState(0);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const [segIdx, setSegIdx] = useState(-1);
  const [playCount, setPlayCount] = useState(0);
  const [slow, setSlow] = useState(false);
  const [showText, setShowText] = useState(false);

  const speakers = [...new Set(exercise.segments.map((s) => s.speaker ?? ""))];

  useEffect(() => {
    const ok = typeof window !== "undefined" && "speechSynthesis" in window;
    setAvailable(ok);
    if (!ok) {
      setShowText(true); // ses yoksa egzersiz okumaya dönüşür, duvara toslamaz
      return;
    }
    // Ses listesi tembel yüklenir; şimdiden iste ki ilk çalmada Almanca ses hazır olsun.
    const synth = window.speechSynthesis;
    synth.getVoices();
    const warm = () => synth.getVoices();
    synth.addEventListener?.("voiceschanged", warm);
    return () => {
      synth.removeEventListener?.("voiceschanged", warm);
      synth.cancel();
    };
  }, []);

  function makeUtterance(text: string, speaker: string | undefined, slowNow: boolean) {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    const voice = synth.getVoices().find((v) => v.lang.startsWith("de")) ?? null;
    if (voice) u.voice = voice;
    u.rate = BASE_RATE[exercise.level] * (slowNow ? 0.78 : 1);
    u.pitch = PITCHES[speakers.indexOf(speaker ?? "") % PITCHES.length];
    return u;
  }

  function stop() {
    window.speechSynthesis.cancel();
    setPlaying(false);
    setSegIdx(-1);
  }

  function play(slowNow: boolean = slow) {
    const synth = window.speechSynthesis;
    synth.cancel();
    setPlaying(true);
    exercise.segments.forEach((seg, i) => {
      const u = makeUtterance(seg.text, seg.speaker, slowNow);
      u.onstart = () => setSegIdx(i);
      if (i === exercise.segments.length - 1) {
        u.onend = () => {
          setPlaying(false);
          setSegIdx(-1);
          setPlayCount((c) => c + 1);
        };
      }
      u.onerror = () => {
        setPlaying(false);
        setSegIdx(-1);
      };
      synth.speak(u);
    });
  }

  /** Transkript satırına dokununca yalnızca o bölümü tekrar dinlet. */
  function playSegment(i: number) {
    if (available === false) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    setPlaying(true);
    setSegIdx(i);
    const seg = exercise.segments[i];
    const u = makeUtterance(seg.text, seg.speaker, slow);
    u.onend = () => {
      setPlaying(false);
      setSegIdx(-1);
    };
    u.onerror = () => {
      setPlaying(false);
      setSegIdx(-1);
    };
    synth.speak(u);
  }

  function toggleSlow() {
    const next = !slow;
    setSlow(next);
    // Çalma sırasında değiştirilirse baştan yeni hızla başlat — düğme "ölü" hissettirmesin.
    if (playing) play(next);
  }

  return (
    <PlayerShell exercise={exercise}>
      <p className="muted px-1 text-sm">{exercise.intro}</p>

      <section className="card mt-3 p-5">
        <div className="flex items-center gap-4">
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => (playing ? stop() : play())}
            disabled={available === false}
            aria-label={playing ? "Durdur" : "Dinle"}
            className="brand-gradient flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white shadow-lg disabled:opacity-40"
          >
            {playing ? <XIcon size={26} /> : <SpeakerIcon size={28} />}
          </motion.button>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">
              {playing
                ? `Bölüm ${segIdx + 1} / ${exercise.segments.length} çalıyor…`
                : playCount > 0
                  ? "Bitti — istersen tekrar dinle."
                  : "Dinlemeye başla"}
            </p>
            <p className="muted mt-0.5 text-xs">
              İstediğin kadar tekrar dinleyebilirsin. Goethe sınavında iki kez dinlersin.
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              {exercise.segments.map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 flex-1 rounded-full transition-colors"
                  style={{
                    background:
                      playing && i <= segIdx ? "var(--color-brand-500)" : "var(--surface-2)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleSlow}
            className={`chip px-3 py-1.5 text-xs ${slow ? "chip-active" : ""}`}
          >
            Yavaş mod
          </button>
          <button
            type="button"
            onClick={() => setShowText((v) => !v)}
            className={`chip px-3 py-1.5 text-xs ${showText ? "chip-active" : ""}`}
          >
            {showText ? "Metni gizle" : "Metni göster"}
          </button>
          {!showText ? (
            <span className="muted text-xs">İpucu: önce yalnızca dinleyerek dene.</span>
          ) : null}
        </div>

        {available === false ? (
          <p
            className="mt-3 rounded-xl px-3 py-2 text-xs"
            style={{
              background: "color-mix(in srgb, var(--color-flame-500) 12%, transparent)",
              color: "var(--color-flame-500)",
            }}
          >
            Bu tarayıcıda konuşma sentezi yok; egzersizi metni okuyarak çözebilirsin.
          </p>
        ) : null}
      </section>

      {showText ? (
        <section className="card mt-4 select-text p-5">
          {available ? (
            <p className="muted mb-2 text-[11px]">Bir satıra dokununca yalnızca o bölüm çalar.</p>
          ) : null}
          <div className="space-y-2.5">
            {exercise.segments.map((seg, i) => (
              <p
                key={i}
                lang="de"
                onClick={() => playSegment(i)}
                role={available ? "button" : undefined}
                className={`rounded-lg px-2 py-1 text-[15px] leading-relaxed transition-colors ${
                  playing && i === segIdx ? "surface-2" : ""
                } ${available ? "cursor-pointer hover:bg-[color:var(--surface-2)]" : ""}`}
              >
                {seg.speaker ? (
                  <strong className="mr-1.5 text-[color:var(--color-brand-500)]">
                    {seg.speaker}:
                  </strong>
                ) : null}
                {seg.text}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      <GlossPanel gloss={exercise.gloss} />

      <QuestionList
        key={round}
        questions={exercise.questions}
        onAllAnswered={(c) => {
          setCorrect(c);
          window.speechSynthesis?.cancel();
          void finish(c);
        }}
      />

      <ResultCard
        correct={correct}
        total={exercise.questions.length}
        state={state}
        onRetry={() => {
          stop();
          reset();
          setCorrect(0);
          setRound((r) => r + 1);
        }}
      />
    </PlayerShell>
  );
}
