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
  const [durum, setDurum] = useState<Durum>("idle");
  const [puan, setPuan] = useState<PronounceScore | null>(null);
  const [neden, setNeden] = useState<string | null>(null);
  const [gecen, setGecen] = useState(0);
  const [tur, setTur] = useState(0);
  const capture = useRef<Capture | null>(null);
  const puanlar = useRef<number[]>([]);

  const task = tasks[idx];
  const son = idx + 1 >= tasks.length;

  async function basla() {
    if (durum !== "idle" && durum !== "failed" && durum !== "done") return;
    setPuan(null);
    setNeden(null);
    const cap = await captureClip(MAX_MS);
    if (!cap) {
      setNeden("Mikrofona ulaşılamadı. Tarayıcı izni kapalı olabilir.");
      return setDurum("failed");
    }
    capture.current = cap;
    setDurum("rec");
    setTimeout(() => void bitir(), MAX_MS + 50);
  }

  async function bitir() {
    const cap = capture.current;
    if (!cap) return;
    capture.current = null;
    setDurum("scoring");
    const blob = await cap.stop();
    const res = blob
      ? await askPronounce(blob, task.de, { exerciseId: exercise.id, confusions: task.confusions, language: "de" })
      : ({ ok: false, reason: "failed" } as const);
    if (res.ok) {
      setPuan(res.score);
      puanlar.current[idx] = res.score.overall;
      setDurum("done");
    } else {
      setNeden(
        res.reason === "not_configured"
          ? "Telaffuz puanlaması bu kurulumda kapalı."
          : res.reason === "rate_limited" || res.reason === "quota"
            ? "Şimdilik sınıra ulaşıldı, biraz sonra dene."
            : "Kayıt gönderilemedi. Tekrar dener misin?",
      );
      setDurum("failed");
    }
  }

  function ilerle() {
    const p = puanlar.current[idx] ?? 0;
    if (p >= PASS) setGecen((n) => n + 1);
    setPuan(null);
    setNeden(null);
    setDurum("idle");
    if (!son) setIdx(idx + 1);
    else void finish(gecen + (p >= PASS ? 1 : 0), Math.round(ortalama()));
  }

  const ortalama = () => {
    const v = puanlar.current.filter((n) => typeof n === "number");
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

        {durum === "idle" || durum === "failed" ? (
          <button type="button" className="btn btn-primary mt-4 w-full" onClick={() => void basla()}>
            {durum === "failed" ? "Tekrar dene" : "Kaydet ve oku"}
          </button>
        ) : null}
        {durum === "rec" ? (
          <button type="button" className="btn btn-primary mt-4 w-full" onClick={() => void bitir()}>
            Bitir
          </button>
        ) : null}
        {durum === "scoring" ? <p className="muted mt-4 text-sm">Değerlendiriliyor…</p> : null}
        {neden ? <p className="mt-3 text-sm" style={{ color: "var(--color-rose)" }}>{neden}</p> : null}

        {durum === "done" && puan ? (
          <div className="mt-4">
            <div className="flex items-center gap-2">
              {puan.overall >= PASS ? (
                <CheckIcon size={18} className="text-[color:var(--color-mint)]" />
              ) : (
                <XIcon size={18} className="text-[color:var(--color-rose)]" />
              )}
              <span className="font-bold">%{puan.overall}</span>
              <span className="muted text-xs">duyulan: {puan.transcript || "—"}</span>
            </div>

            {/* Puan düşükse önce KARIŞMA uyarısı: sayı değil, düzeltme öğretir. */}
            {puan.overall < PASS && task.confusions?.length ? (
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
            {puan.words?.length ? (
              <>
                <p className="mt-3 flex flex-wrap gap-1.5">
                  {puan.words.map((w, i) => (
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
                {puan.words.filter((w) => w.hint).length ? (
                  <ul className="mt-2 space-y-1.5">
                    {puan.words
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
              <button type="button" className="btn btn-ghost flex-1" onClick={() => void basla()}>
                Tekrar oku
              </button>
              <button type="button" className="btn btn-primary flex-1" onClick={ilerle}>
                {son ? "Bitir" : "Sonraki"}
              </button>
            </div>
          </div>
        ) : null}
      </section>

      <ResultCard
        correct={gecen}
        total={tasks.length}
        state={state}
        onRetry={() => {
          reset();
          puanlar.current = [];
          setGecen(0);
          setIdx(0);
          setDurum("idle");
          setPuan(null);
          setTur((r) => r + 1);
        }}
      />
      <span hidden>{tur}</span>
    </PlayerShell>
  );
}
