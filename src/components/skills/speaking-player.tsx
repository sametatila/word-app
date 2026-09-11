"use client";

import { useRef, useState } from "react";
import type { SkillExercise, SpeakingTask } from "@/lib/skills/types";
import type { PronounceScore } from "@/lib/pronounce";
import { askPronounce, captureClip, type Capture } from "@/lib/pronounce-client";
/* Geçme eşiği kuralın kendisinden: kopyası burada `PASS = 80` diye duruyordu
   ve "aynı olmalı" diyen bir yorum vardı, ölçen bir şey yoktu. */
import { PASS_SCORE } from "@/lib/pronounce-const";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { GlossPanel } from "./quiz";
import { useTargetLang } from "./player-context";
import { CheckIcon, XIcon, SpeakerIcon } from "@/components/icons";
import { speakGerman } from "@/components/speak-button";
import { useT } from "@/lib/i18n/client";

/**
 * Tek kayıt için üst sınır.
 *
 * Yorum "sınav oynatıcısıyla aynı" diyordu ve YANLIŞTI: sınav 12 saniye
 * kaydediyor (`exam-player` `SPEAK_MAX_MS`). Fark bilinçli — burada
 * söylenecek şey tek bir cümle, sınavda ise serbest bir cevap — ama yanlış
 * bir yorum yoklukten kötü: sonraki okuyan yanlış tarafı "düzeltir".
 */
const MAX_MS = 8000;

type Durum = "idle" | "rec" | "scoring" | "done" | "failed";

/**
 * Söyleyiş drilli oynatıcısı (Beceriler kütüphanesi, 2026-09).
 *
 * 2026-08'de "ayrı konuşma havuzu" ile birlikte kaldırılmıştı; içerik geri
 * gelince oynatıcı da geri geldi. Kayıt ve puanlama sınav oynatıcısındaki
 * akışın aynısı (captureClip + askPronounce): ikinci bir ses hattı yazmak
 * yerine çalışan hat kullanılıyor. Fark, sınavın tek deneme hakkı vermesi;
 * burada öğrenci istediği kadar tekrar edebilir — burası ölçme değil ÇALIŞMA
 * yüzeyi.
 *
 * `confusions` alanı bu içeriğin asıl değeri: Türkçe konuşanın o cümlede
 * yapması beklenen belirli hata ve düzeltmesi. Puan düşükse önce o gösterilir,
 * çünkü "%62 aldın" bir şey öğretmez, "z'yi ts diye söyle" öğretir.
 *
 * Dil çerçeveden: İngilizce kursta tanıyıcı ve örnek ses İngilizce.
 */
export function SpeakingPlayer({ exercise, backHref }: { exercise: SkillExercise; backHref?: string }) {
  const t = useT();
  const lang = useTargetLang();
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
      setReason(t("speakp.no_mic"));
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
      ? await askPronounce(blob, task.de, { exerciseId: exercise.id, confusions: task.confusions, language: lang })
      : ({ ok: false, reason: "failed" } as const);
    if (res.ok) {
      setScore(res.score);
      scores.current[idx] = res.score.overall;
      setPhase("done");
    } else {
      setReason(
        res.reason === "not_configured"
          ? t("speakp.scoring_off")
          : res.reason === "quota"
            /* Kota ve hız sınırı AYNI ŞEY DEĞİL: kota günlük hakkın dolması,
               hız sınırı ise "çok sık denedin". İkisine aynı cümleyi yazmak
               kullanıcıya yarın açılacak bir şeyi "biraz sonra dene" diye
               anlatıyordu. Kota cümlesi mobil ile ortak. */
            ? t("assessw.fail_quota")
            : res.reason === "rate_limited"
              ? t("speakp.rate_limited")
            : t("speakp.send_failed"),
      );
      setPhase("failed");
    }
  }

  const average = () => {
    const v = scores.current.filter((n) => typeof n === "number");
    return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0;
  };

  function advance() {
    const p = scores.current[idx] ?? 0;
    const passedNow = passedCount + (p >= PASS_SCORE ? 1 : 0);
    setPassedCount(passedNow);
    setScore(null);
    setReason(null);
    setPhase("idle");
    if (!isLast) setIdx(idx + 1);
    else void finish(passedNow, Math.round(average()));
  }

  /** Puanlayıcı kapalıysa öğrenci yine ilerleyebilsin: cümle "denendi" sayılır. */
  function skip() {
    setScore(null);
    setReason(null);
    setPhase("idle");
    if (!isLast) setIdx(idx + 1);
    else void finish(passedCount, scores.current.length ? Math.round(average()) : undefined);
  }

  if (!tasks.length)
    return (
      <PlayerShell exercise={exercise} backHref={backHref}>
        <p className="muted p-4">{t("speakp.no_sentences")}</p>
      </PlayerShell>
    );

  return (
    <PlayerShell exercise={exercise} backHref={backHref}>
      <p className="muted px-1 text-body">{exercise.intro}</p>
      <GlossPanel gloss={exercise.gloss} />

      <section className="card mt-3 p-5">
        <p className="muted text-caption">
          {idx + 1}/{tasks.length}
        </p>

        <div className="mt-2 flex items-start gap-2">
          <p className="flex-1 text-h3 leading-snug" lang={lang}>
            {task.de}
          </p>
          <button
            type="button"
            aria-label={t("skillquiz.listen_to_sentence")}
            className="btn btn-ghost h-9 w-9 shrink-0"
            onClick={() => void speakGerman(task.de)}
          >
            <SpeakerIcon size={18} />
          </button>
        </div>
        <p className="muted text-body">{task.tr}</p>

        {task.hint ? (
          <p className="mt-3 rounded-panel px-3 py-2 text-caption leading-relaxed surface-2">{task.hint}</p>
        ) : null}

        {phase === "idle" || phase === "failed" ? (
          <button type="button" className="btn btn-primary mt-4 w-full" onClick={() => void startRec()}>
            {t(phase === "failed" ? "common.try_again" : "speakp.record_and_read")}
          </button>
        ) : null}
        {phase === "rec" ? (
          <button type="button" className="btn btn-primary mt-4 w-full" onClick={() => void stopRec()}>
            {t("common.finish")}
          </button>
        ) : null}
        {phase === "scoring" ? <p className="muted mt-4 text-body">{t("exam.evaluating")}</p> : null}
        {reason ? (
          <>
            <p className="mt-3 text-body" style={{ color: "var(--color-rose)" }}>
              {reason}
            </p>
            <button type="button" className="btn btn-ghost mt-2 w-full" onClick={skip}>
              {t(isLast ? "item.skip_unscored_finish" : "item.skip_unscored")}
            </button>
          </>
        ) : null}

        {phase === "done" && score ? (
          /* Söyleyiş puanı da bir eylemin cevabı — bkz. `monologue-player`
             içindeki not. Yüzde, "duyulan" satırı ve karışma uyarıları yalnız
             GÖRSEL bir değişiklikti. */
          <div role="status" className="mt-4">
            <div className="flex items-center gap-2">
              {score.overall >= PASS_SCORE ? (
                <CheckIcon size={18} className="text-[color:var(--color-mint)]" />
              ) : (
                <XIcon size={18} className="text-[color:var(--color-rose)]" />
              )}
              <span className="font-bold">{t("common.pct", { n: score.overall })}</span>
              <span className="muted text-caption">{t("item.heard", { text: score.transcript || "—" })}</span>
            </div>

            {/* Puan düşükse önce KARIŞMA uyarısı: sayı değil, düzeltme öğretir. */}
            {score.overall < PASS_SCORE && task.confusions?.length ? (
              <ul className="mt-3 space-y-1.5">
                {task.confusions.map((c, i) => (
                  <li key={i} className="rounded-panel px-3 py-2 text-caption leading-relaxed surface-2">
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
                      lang={lang}
                      title={w.heard ? `duyulan: ${w.heard}` : undefined}
                      className="rounded px-1.5 py-0.5 text-caption"
                      style={{
                        background:
                          w.status === "ok"
                            ? "color-mix(in srgb, var(--color-mint) 22%, transparent)"
                            : w.status === "near"
                              ? "color-mix(in srgb, var(--color-flame-500) 22%, transparent)"
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
                        <li key={i} className="rounded-panel px-3 py-2 text-caption leading-relaxed surface-2">
                          <b lang={lang}>{w.word}</b> — {w.hint}
                        </li>
                      ))}
                  </ul>
                ) : null}
              </>
            ) : null}

            <div className="mt-4 flex gap-2">
              <button type="button" className="btn btn-ghost flex-1" onClick={() => void startRec()}>
                {t("speakp.read_again")}
              </button>
              <button type="button" className="btn btn-primary flex-1" onClick={advance}>
                {t(isLast ? "common.finish" : "common.next")}
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
