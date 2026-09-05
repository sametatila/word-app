"use client";

import { useRef, useState } from "react";
import type { SkillExercise, SpeakingTask } from "@/lib/skills/types";
import type { PronounceScore } from "@/lib/pronounce";
import { askPronounce, captureClip, type Capture } from "@/lib/pronounce-client";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { GlossPanel } from "./quiz";
import { CheckIcon, XIcon, SpeakerIcon } from "@/components/icons";
import { speakGerman } from "@/components/speak-button";

/** Tek kayıt için üst sınır; sınav oynatıcısıyla aynı. */
const MAX_MS = 8000;
/** Geçme eşiği — lib/pronounce'daki PASS_SCORE ile aynı olmalı. */
const PASS = 80;

type Durum = "idle" | "rec" | "scoring" | "done" | "failed";

/**
 * Ses çalışması oynatıcısı.
 *
 * NEDEN VAR: beceri bankasına A1 için 8 ses çalışması eklendi, ama oynatıcı
 * rotası "konuşma becerisi kaldırıldı, içerik yok" varsayımıyla bu dalda
 * notFound() veriyordu. İçerik vardı, kapı yoktu — egzersizler yalnız seviye
 * sınavının Sprechen bölümünden görülebiliyordu, alıştırma olarak hiç.
 *
 * Kayıt ve puanlama sınav oynatıcısındaki akışın aynısı (captureClip +
 * askPronounce): ikinci bir ses hattı yazmak yerine çalışan hat kullanıldı.
 * Fark, sınavın tek deneme hakkı vermesi; burada öğrenci istediği kadar
 * tekrar edebilir — burası ölçme değil ÇALIŞMA yüzeyi.
 *
 * `confusions` alanı bu içeriğin asıl değeri: Türkçe konuşanın o cümlede
 * yapması beklenen belirli hata ve düzeltmesi. Puan düşükse önce o gösterilir,
 * çünkü "%62 aldın" bir şey öğretmez, "z'yi ts diye söyle" öğretir.
 */
export function SpeakingPlayer({ exercise, backHref }: { exercise: SkillExercise; backHref?: string }) {
  const tasks: SpeakingTask[] = "tasks" in exercise ? (exercise.tasks as SpeakingTask[]) : [];
  const { finish, state, reset } = useSkillFinish(exercise, tasks.length);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Durum>("idle");
  const [score, setScore] = useState<PronounceScore | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [passedCount, setPassedCount] = useState(0);
  const capture = useRef<Capture | null>(null);
  const scores = useRef<number[]>([]);

  const task = tasks[idx];
  const isLast = idx + 1 >= tasks.length;

  async function startRec() {
    if (phase !== "idle" && phase !== "failed" && phase !== "done") return;
    setScore(null);
    setReason(null);
    const cap = await captureClip(MAX_MS);
    if (!cap) {
      setReason("Mikrofona ulaşılamadı. Tarayıcı izni kapalı olabilir.");
      return setPhase("failed");
    }
    capture.current = cap;
    setPhase("rec");
    setTimeout(() => void stopRec(), MAX_MS + 50);
  }

  async function stopRec() {
    const cap = capture.current;
    if (!cap) return;
    capture.current = null;
    setPhase("scoring");
    const blob = await cap.stop();
    const res = blob
      ? await askPronounce(blob, task.de, { exerciseId: exercise.id, confusions: task.confusions, language: "de" })
      : ({ ok: false, reason: "failed" } as const);
    if (res.ok) {
      setScore(res.score);
      scores.current[idx] = res.score.overall;
      setPhase("done");
    } else {
      setReason(
        res.reason === "not_configured"
          ? "Telaffuz puanlaması bu kurulumda kapalı."
          : res.reason === "rate_limited" || res.reason === "quota"
            ? "Şimdilik sınıra ulaşıldı, biraz sonra dene."
            : "Kayıt gönderilemedi. Tekrar dener misin?",
      );
      setPhase("failed");
    }
  }

  function advance() {
    const p = scores.current[idx] ?? 0;
    if (p >= PASS) setPassedCount((n) => n + 1);
    setScore(null);
    setReason(null);
    setPhase("idle");
    if (!isLast) setIdx(idx + 1);
    else void finish(passedCount + (p >= PASS ? 1 : 0), Math.round(average()));
  }

  const average = () => {
    const v = scores.current.filter((n) => typeof n === "number");
    return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0;
  };

  if (!tasks.length) return <PlayerShell exercise={exercise} backHref={backHref}><p className="muted p-4">Bu çalışmada cümle yok.</p></PlayerShell>;

  return (
    <PlayerShell exercise={exercise} backHref={backHref}>
      <p className="muted px-1 text-sm">{exercise.intro}</p>
      <GlossPanel gloss={exercise.gloss} />

      <section className="card mt-3 p-5">
        <p className="muted text-xs font-semibold">
          {idx + 1}/{tasks.length}
        </p>

        <div className="mt-2 flex items-start gap-2">
          <p className="flex-1 text-lg font-bold leading-snug" lang="de">
            {task.de}
          </p>
          <button
            type="button"
            aria-label="Cümleyi dinle"
            className="btn btn-ghost h-9 w-9 shrink-0"
            onClick={() => void speakGerman(task.de)}
          >
            <SpeakerIcon size={18} />
          </button>
        </div>
        <p className="muted text-sm">{task.tr}</p>

        {task.hint ? (
          <p className="mt-3 rounded-lg px-3 py-2 text-[13px] leading-relaxed" style={{ background: "var(--surface-2)" }}>
            {task.hint}
          </p>
        ) : null}

        {phase === "idle" || phase === "failed" ? (
          <button type="button" className="btn btn-primary mt-4 w-full" onClick={() => void startRec()}>
            {phase === "failed" ? "Tekrar dene" : "Kaydet ve oku"}
          </button>
        ) : null}
        {phase === "rec" ? (
          <button type="button" className="btn btn-primary mt-4 w-full" onClick={() => void stopRec()}>
            Bitir
          </button>
        ) : null}
        {phase === "scoring" ? <p className="muted mt-4 text-sm">Değerlendiriliyor…</p> : null}
        {reason ? <p className="mt-3 text-sm" style={{ color: "var(--color-rose)" }}>{reason}</p> : null}

        {phase === "done" && score ? (
          <div className="mt-4">
            <div className="flex items-center gap-2">
              {score.overall >= PASS ? (
                <CheckIcon size={18} className="text-[color:var(--color-mint)]" />
              ) : (
                <XIcon size={18} className="text-[color:var(--color-rose)]" />
              )}
              <span className="font-bold">%{score.overall}</span>
              <span className="muted text-xs">duyulan: {score.transcript || "—"}</span>
            </div>

            {/* Puan düşükse önce KARIŞMA uyarısı: sayı değil, düzeltme öğretir. */}
            {score.overall < PASS && task.confusions?.length ? (
              <ul className="mt-3 space-y-1.5">
                {task.confusions.map((c, i) => (
                  <li key={i} className="rounded-lg px-3 py-2 text-[13px] leading-relaxed" style={{ background: "var(--surface-2)" }}>
                    {c.fix}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Kelime kelime ısı: hangi sözcüğün tökezlediğini göstermek,
                toplam puandan daha çok işe yarıyor. */}
            {score.words?.length ? (
              <>
                <p className="mt-3 flex flex-wrap gap-1.5">
                  {score.words.map((w, i) => (
                    <span
                      key={i}
                      lang="de"
                      title={w.heard ? `duyulan: ${w.heard}` : undefined}
                      className="rounded px-1.5 py-0.5 text-[13px] font-semibold"
                      style={{
                        background:
                          w.status === "ok"
                            ? "color-mix(in srgb, var(--color-mint) 22%, transparent)"
                            : w.status === "near"
                              ? "color-mix(in srgb, var(--color-amber, #f59e0b) 22%, transparent)"
                              : "color-mix(in srgb, var(--color-rose) 22%, transparent)",
                      }}
                    >
                      {w.word}
                    </span>
                  ))}
                </p>
                {score.words.filter((w) => w.hint).length ? (
                  <ul className="mt-2 space-y-1.5">
                    {score.words
                      .filter((w) => w.hint)
                      .map((w, i) => (
                        <li key={i} className="rounded-lg px-3 py-2 text-[13px] leading-relaxed" style={{ background: "var(--surface-2)" }}>
                          <b lang="de">{w.word}</b> — {w.hint}
                        </li>
                      ))}
                  </ul>
                ) : null}
              </>
            ) : null}

            <div className="mt-4 flex gap-2">
              <button type="button" className="btn btn-ghost flex-1" onClick={() => void startRec()}>
                Tekrar oku
              </button>
              <button type="button" className="btn btn-primary flex-1" onClick={advance}>
                {isLast ? "Bitir" : "Sonraki"}
              </button>
            </div>
          </div>
        ) : null}
      </section>

      <ResultCard
        correct={passedCount}
        total={tasks.length}
        state={state}
        onRetry={() => {
          reset();
          scores.current = [];
          setPassedCount(0);
          setIdx(0);
          setPhase("idle");
          setScore(null);
        }}
      />
    </PlayerShell>
  );
}
