"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SpeakingDrillExercise, SpeakingTask } from "@/lib/skills/types";
import { judgeSpeech, isSpeechCorrect, type SpeechVerdict } from "@/lib/speech";
import { speakGerman, useSpeechAvailable, SpeakButton } from "@/components/speak-button";
import { AlertIcon, CheckIcon, SpeakerIcon, XIcon } from "@/components/icons";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { recognitionCtor, requestMicrophone, type Recognition } from "@/components/microphone";

/**
 * Konuşma oynatıcısı — iki katmanlı ve bozulmadan düşen bir tasarım.
 *
 *   Katman 1 (her cihazda): dinle → tekrarla → kendin değerlendir. Model ses
 *     zaten var (konuşma sentezi); bu katman ağ ya da tanıyıcı istemez.
 *   Katman 2 (Chrome/Edge/Safari): söylediğin metne çevrilir ve hedefle
 *     karşılaştırılır. Firefox'ta bu katman yok — o zaman tur Katman 1 ile
 *     tamamlanır, çıkmaza girmez.
 *
 * Değerlendirmenin sınırı kullanıcıya açıkça söylenir: burada ölçülen şey
 * "anlaşıldın mı", telaffuz notu değil (bkz. lib/speech.ts).
 */



type Phase = "idle" | "asking" | "listening" | "judging" | "done";

export function SpeakingPlayer({ exercise }: { exercise: SpeakingDrillExercise }) {
  const tasks = exercise.tasks;
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [verdict, setVerdict] = useState<SpeechVerdict | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [attempts, setAttempts] = useState(0);

  const ttsAvailable = useSpeechAvailable();
  const [asrAvailable, setAsrAvailable] = useState(false);
  useEffect(() => setAsrAvailable(recognitionCtor() !== null), []);

  const recognition = useRef<Recognition | null>(null);
  const task: SpeakingTask | undefined = tasks[index];
  const { finish, state, reset } = useSkillFinish(exercise, tasks.length);

  // Ekrandan çıkılırsa mikrofon açık kalmasın.
  useEffect(() => {
    return () => recognition.current?.abort();
  }, []);

  const listen = useCallback(async () => {
    const Ctor = recognitionCtor();
    if (!Ctor || !task) return;
    setError(null);
    setVerdict(null);

    // İzin önce ve açıkça istenir; yüklü PWA'da tanıyıcı bunu kendisi yapmıyor.
    setPhase("asking");
    const permission = await requestMicrophone();
    if (permission === "denied") {
      setPhase("idle");
      setError(
        "Mikrofon izni verilmedi. Uygulama ayarlarından mikrofona izin verip tekrar dene — " +
          "izin vermeden de „Doğru söyledim / Zorlandım“ ile devam edebilirsin.",
      );
      return;
    }

    const rec = new Ctor();
    recognition.current = rec;
    rec.lang = "de-DE";
    rec.interimResults = false;
    rec.continuous = false;
    // Birden fazla aday iste: tanıyıcı ilk sırada dil modeliyle "düzeltilmiş"
    // hâli verirken, ikinci sırada gerçekte duyduğu biçimi taşıyabiliyor —
    // karışma kümesini yakalayan çoğu zaman o oluyor.
    rec.maxAlternatives = 5;

    rec.onresult = (event) => {
      const heard: string[] = [];
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        for (let j = 0; j < result.length; j++) heard.push(result[j].transcript);
      }
      setPhase("judging");
      const outcome = judgeSpeech(task.de, heard, task.confusions ?? []);
      setVerdict(outcome);
      setPhase("done");
    };
    rec.onerror = (e) => {
      setPhase("idle");
      setError(
        e.error === "not-allowed" || e.error === "service-not-allowed"
          ? "Tanıma servisi mikrofona erişemedi. Uygulama ayarlarından mikrofon iznini kontrol et."
          : e.error === "no-speech"
            ? "Ses duyulmadı. Mikrofona biraz daha yakın ve yüksek sesle söyle."
            : e.error === "network"
              ? "Tanıma için internet gerekiyor; bağlantın kesik görünüyor."
              : "Tanıma başlatılamadı. Tekrar dene.",
      );
    };
    rec.onend = () => {
      setPhase((p) => (p === "listening" ? "idle" : p));
    };

    setPhase("listening");
    try {
      rec.start();
    } catch {
      setPhase("idle");
      setError("Mikrofon başlatılamadı.");
    }
  }, [task]);

  function stopListening() {
    recognition.current?.stop();
  }

  /** Sonucu kaydeder ve sıradaki göreve geçer. */
  function commit(correct: boolean) {
    const next = [...results, correct];
    setResults(next);
    setVerdict(null);
    setError(null);
    setAttempts(0);
    setPhase("idle");
    if (index + 1 < tasks.length) setIndex(index + 1);
    else void finish(next.filter(Boolean).length);
  }

  function retry() {
    setVerdict(null);
    setError(null);
    setAttempts((n) => n + 1);
    setPhase("idle");
  }

  function restart() {
    setResults([]);
    setIndex(0);
    setVerdict(null);
    setError(null);
    setAttempts(0);
    setPhase("idle");
    reset();
  }

  const finished = results.length === tasks.length;

  return (
    <PlayerShell exercise={exercise}>
      <p className="muted mb-4 text-sm">{exercise.intro}</p>

      {!asrAvailable ? (
        <div
          className="mb-4 flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm"
          style={{
            background: "color-mix(in srgb, var(--color-flame-500) 12%, transparent)",
            color: "var(--color-flame-500)",
          }}
        >
          <AlertIcon size={16} className="mt-0.5 shrink-0" />
          <span>
            Bu tarayıcı konuşma tanımayı desteklemiyor (Firefox'ta yok). Alıştırma yine
            yapılabilir: modeli dinle, yüksek sesle tekrarla ve kendin değerlendir. Chrome, Edge
            ya da Safari'de otomatik değerlendirme açılır.
          </span>
        </div>
      ) : null}

      {!finished && task ? (
        <section className="card p-5">
          <div className="mb-3 flex items-center justify-between text-xs font-semibold">
            <span className="muted">
              {index + 1} / {tasks.length}
            </span>
            <span className="muted">{exercise.genre}</span>
          </div>

          {/* Uyaran Türkçe: önce ne söyleyeceğini bil, sonra nasıl söyleneceğini duy. */}
          <p className="text-center text-base font-semibold">{task.tr}</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <p className="brand-text text-center text-xl font-bold sm:text-2xl">{task.de}</p>
            <SpeakButton text={task.de} />
          </div>
          {task.hint ? <p className="muted mt-2 text-center text-xs">{task.hint}</p> : null}

          <div className="mt-5 flex flex-col items-center gap-2">
            {asrAvailable ? (
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => (phase === "listening" ? stopListening() : void listen())}
                disabled={phase === "judging" || phase === "asking"}
                aria-label={phase === "listening" ? "Kaydı bitir" : "Konuşmaya başla"}
                className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg disabled:opacity-60"
                style={{
                  background:
                    phase === "listening" ? "var(--color-rose-500)" : "var(--color-brand-500)",
                }}
              >
                <motion.span
                  animate={phase === "listening" ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                  transition={{ repeat: phase === "listening" ? Infinity : 0, duration: 1.1 }}
                >
                  <SpeakerIcon size={32} />
                </motion.span>
              </motion.button>
            ) : null}
            <span className="muted text-xs">
              {phase === "asking"
                ? "Mikrofon izni bekleniyor…"
                : phase === "listening"
                  ? "Dinliyorum… söyleyince dokun"
                  : phase === "judging"
                    ? "Değerlendiriliyor…"
                    : asrAvailable
                      ? "Mikrofona dokun ve yüksek sesle söyle"
                      : "Modeli dinle, yüksek sesle tekrarla"}
            </span>
          </div>

          {error ? (
            <p className="muted mt-4 text-center text-sm" style={{ color: "var(--color-flame-500)" }}>
              {error}
            </p>
          ) : null}

          <AnimatePresence mode="wait">
            {verdict ? (
              <Feedback
                key={`${index}-${attempts}`}
                verdict={verdict}
                task={task}
                ttsAvailable={ttsAvailable}
              />
            ) : null}
          </AnimatePresence>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {verdict && !isSpeechCorrect(verdict) ? (
              <button type="button" onClick={retry} className="btn btn-ghost px-5 py-2.5 text-sm">
                Tekrar dene
              </button>
            ) : null}
            {verdict ? (
              <button
                type="button"
                onClick={() => commit(isSpeechCorrect(verdict))}
                className="btn btn-primary px-5 py-2.5 text-sm"
              >
                {index + 1 < tasks.length ? "Sıradaki" : "Bitir"}
              </button>
            ) : null}
            {/* Tanıyıcı yoksa (ya da hiç duyulmadıysa) öğrenci kendi kararını verir.
                Bu bir kaçış kapısı değil: shadowing'de öz değerlendirme yöntemin
                kendisidir ve tur asla çıkmaza girmez. */}
            {!verdict && (!asrAvailable || phase === "idle") ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => commit(true)}
                  className="btn btn-ghost px-4 py-2.5 text-sm"
                >
                  Doğru söyledim
                </button>
                <button
                  type="button"
                  onClick={() => commit(false)}
                  className="btn btn-ghost px-4 py-2.5 text-sm"
                >
                  Zorlandım
                </button>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {exercise.gloss.length ? (
        <section className="card mt-4 p-4">
          <h2 className="muted mb-2 text-xs font-bold uppercase tracking-wide">Sözlükçe</h2>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {exercise.gloss.map((g) => (
              <li key={g.de} className="flex items-baseline justify-between gap-2 text-sm">
                <span className="font-semibold">{g.de}</span>
                <span className="muted truncate text-right">{g.tr}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ResultCard
        correct={results.filter(Boolean).length}
        total={tasks.length}
        state={state}
        noun="görev"
        onRetry={restart}
      />
    </PlayerShell>
  );
}

/** Değerlendirme kartı — sonucun türüne göre ne söylenebileceği değişir. */
function Feedback({
  verdict,
  task,
  ttsAvailable,
}: {
  verdict: SpeechVerdict;
  task: SpeakingTask;
  ttsAvailable: boolean;
}) {
  const tone =
    verdict.kind === "correct"
      ? "var(--color-mint-500)"
      : verdict.kind === "partial"
        ? "var(--color-flame-500)"
        : "var(--color-rose-500)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mt-5 rounded-2xl px-4 py-3.5"
      style={{ background: "var(--surface-2)", border: `1px solid ${tone}` }}
    >
      {verdict.kind === "correct" ? (
        <p className="flex items-center justify-center gap-2 text-sm font-bold" style={{ color: tone }}>
          <CheckIcon size={16} /> Anlaşıldı
        </p>
      ) : verdict.kind === "unheard" ? (
        <p className="muted text-center text-sm">
          Hiçbir şey duyulmadı. Mikrofona yaklaş ve biraz daha yüksek sesle söyle.
        </p>
      ) : (
        <>
          <p className="flex items-center gap-2 text-sm font-bold" style={{ color: tone }}>
            <XIcon size={15} />
            {verdict.kind === "confusion"
              ? "Bu değil, şu"
              : verdict.kind === "partial"
                ? "Az kaldı"
                : "Farklı bir şey duyuldu"}
          </p>

          {/* Ne duyulduğunu göstermek en somut geri bildirim: öğrenci
              söylediğiyle hedefi yan yana görür. */}
          <p className="muted mt-2 text-sm">
            Duyulan: <span className="font-semibold">“{verdict.heard}”</span>
          </p>

          {verdict.kind === "confusion" ? (
            <p className="mt-2 text-sm">{verdict.fix}</p>
          ) : verdict.missing.length ? (
            <p className="muted mt-2 text-sm">
              Tanınmayan: <span className="font-semibold">{verdict.missing.join(", ")}</span>
            </p>
          ) : null}

          <div className="mt-3 flex items-center gap-2">
            <span className="muted text-xs">Doğrusu:</span>
            <span className="brand-text text-sm font-bold">
              {verdict.kind === "confusion" && verdict.expected ? verdict.expected : task.de}
            </span>
            {ttsAvailable ? (
              <button
                type="button"
                onClick={() =>
                  speakGerman(
                    verdict.kind === "confusion" && verdict.expected ? verdict.expected : task.de,
                  )
                }
                className="btn btn-ghost h-7 px-2 text-xs"
              >
                Dinle
              </button>
            ) : null}
          </div>
        </>
      )}
    </motion.div>
  );
}
