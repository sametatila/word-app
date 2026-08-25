"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { SpeakingMonologueExercise } from "@/lib/skills/types";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { askAssess, fallbackAssessment, type AssessFailure, type FallbackAssessment } from "@/lib/assess-client";
import type { Assessment, AssessLevel, AssessRequest } from "@/lib/assess-prompts";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import { recognitionCtor, requestMicrophone, type Recognition } from "@/components/microphone";
import { CheckIcon, MicIcon } from "@/components/icons";
import { Mascot } from "@/components/mascot";

type Phase = "prep" | "record" | "review" | "scoring" | "result";

const PREP_SECONDS = 30;

/**
 * Monolog oynatıcısı (WP-21): hazırlık → kayıt → transkript → rubrik.
 *
 * Kayıt iki katmanlı: tanıyıcı (Chrome/Edge/Safari) konuşmayı metne döker ve
 * metin rubrikle puanlanır (`kind: "speaking"`); tanıyıcı yoksa ya da
 * sağlayıcı yoksa öğrenci kendi kaydını dinler ve kontrol listesiyle kendini
 * değerlendirir — yedek, ölçüm değil; kart bunu söyler.
 *
 * Transkript gönderilmeden önce düzenlenebilir: tanıyıcı Türkçe aksanlı
 * Almancada kelime kaçırıyor ve öğrencinin "ben bunu demedim" demesine
 * yer olmalı. Düzenleme dilbilgisi puanını değiştirebilir; kabul edilen
 * bedel — sınav değil alıştırma.
 */
export function MonologuePlayer({ exercise }: { exercise: SpeakingMonologueExercise }) {
  const mono = exercise.monologue;
  const { finish, state, reset } = useSkillFinish(exercise, 1);
  const [phase, setPhase] = useState<Phase>("prep");
  const [prepLeft, setPrepLeft] = useState(PREP_SECONDS);
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [asr, setAsr] = useState<boolean | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [checks, setChecks] = useState<boolean[]>(() => mono.bulletsTr.map(() => false));
  const [result, setResult] = useState<Assessment | FallbackAssessment | null>(null);
  const [failure, setFailure] = useState<AssessFailure | null>(null);
  const [showSample, setShowSample] = useState(false);
  const [passed, setPassed] = useState(false);
  const rec = useRef<Recognition | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const stopping = useRef(false);
  const finalRef = useRef("");

  useEffect(() => {
    setAsr(Boolean(recognitionCtor()));
  }, []);

  // Hazırlık geri sayımı; sıfırda kayıt kendiliğinden başlar.
  useEffect(() => {
    if (phase !== "prep") return;
    const t = setInterval(() => setPrepLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [phase]);
  useEffect(() => {
    if (phase === "prep" && prepLeft <= 0) void startRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prepLeft, phase]);

  // Kayıt sayacı; üst sınırda kayıt kendiliğinden biter.
  useEffect(() => {
    if (phase !== "record") return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);
  useEffect(() => {
    if (phase === "record" && seconds >= mono.maxSeconds) stopRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, phase]);

  async function startRecording() {
    if (phase === "record") return;
    setPhase("record");
    setSeconds(0);
    stopping.current = false;
    // Ses kaydı: yedek katman (kendi kaydını dinle). Tanıyıcıdan bağımsız.
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunks.current = [];
      mr.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        if (chunks.current.length) setAudioUrl(URL.createObjectURL(new Blob(chunks.current, { type: mr.mimeType })));
      };
      mr.start();
      recorder.current = mr;
    } catch {
      recorder.current = null;
    }
    // Tanıyıcı: sürekli kip; Chrome sessizlikte kapatırsa yeniden açılır.
    const Ctor = recognitionCtor();
    if (!Ctor || (await requestMicrophone()) !== "granted") {
      setAsr(false);
      return;
    }
    const start = () => {
      const r = new Ctor();
      r.lang = exercise.course === "gsw-zh" ? "de-CH" : "de-DE";
      r.continuous = true;
      r.interimResults = true;
      r.maxAlternatives = 1;
      r.onresult = (e) => {
        let fin = "";
        let tmp = "";
        for (let i = 0; i < e.results.length; i++) {
          const res = e.results[i] as unknown as { isFinal?: boolean; 0: { transcript: string } };
          if (res.isFinal) fin += res[0].transcript + " ";
          else tmp += res[0].transcript + " ";
        }
        if (fin.trim()) {
          finalRef.current = `${finalRef.current} ${fin}`.replace(/\s+/g, " ").trim();
          setTranscript(finalRef.current);
        }
        setInterim(tmp.trim());
      };
      r.onerror = () => {
        /* onend yeniden başlatır */
      };
      r.onend = () => {
        // `phase` burada bayat (kapanış); durdurma bayrağı yeter.
        if (!stopping.current) {
          try {
            start();
          } catch {
            /* tanıyıcı yeniden açılamadı: kayıt yine devam eder */
          }
        }
      };
      rec.current = r;
      r.start();
    };
    start();
  }

  function stopRecording() {
    stopping.current = true;
    try {
      rec.current?.stop();
    } catch {
      /* zaten kapalı */
    }
    rec.current = null;
    try {
      recorder.current?.stop();
    } catch {
      /* kayıt yoktu */
    }
    setInterim("");
    setPhase("review");
  }

  async function evaluate() {
    const text = transcript.trim();
    if (!text) return;
    setPhase("scoring");
    const req: AssessRequest = {
      kind: "speaking",
      level: exercise.level as AssessLevel,
      task: {
        prompt: mono.promptTr,
        targets: mono.targets.map((t) => t.de),
        constraints: [`${mono.minSeconds}–${mono.maxSeconds} saniye`, ...(mono.rubricHint ? [mono.rubricHint] : [])],
      },
      answer: { text, transcript: [text] },
      exerciseId: exercise.id,
      locale: "tr",
    };
    const ai = await askAssess(req);
    let score: number | undefined;
    let ok: boolean;
    if (ai.ok) {
      setResult(ai.result);
      score = ai.result.score.overall;
      ok = score >= 60;
    } else {
      const fb = fallbackAssessment(req);
      setResult(fb);
      setFailure(ai.reason);
      ok = fb.checks.filter((c) => c.ok).length >= Math.ceil(fb.checks.length / 2);
    }
    setPassed(ok);
    setPhase("result");
    void finish(ok ? 1 : 0, score);
  }

  /** Tanıyıcısız/transkriptsiz yedek: öz değerlendirme; puan kaydı yok, tamamlanma var. */
  function selfFinish() {
    const ok = checks.filter(Boolean).length >= Math.ceil(checks.length * 0.6);
    setPassed(ok);
    setPhase("result");
    void finish(ok ? 1 : 0);
  }

  const usedTargets = mono.targets.map((t) => {
    const stem = t.de.split(/…|\.\.\./)[0].replace(/[^\p{L}\p{N}' ]/gu, " ").trim().toLowerCase();
    return { ...t, used: stem.length >= 3 && transcript.toLowerCase().includes(stem) };
  });
  const mm = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <PlayerShell exercise={exercise}>
      <p className="muted px-1 text-sm">{exercise.intro}</p>

      {phase === "prep" ? (
        <section className="card mt-3 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--color-brand)]">Hazırlık</p>
            <span className="tabular-nums text-sm font-bold">{mm(Math.max(0, prepLeft))}</span>
          </div>
          <p className="mt-2 text-sm font-semibold leading-relaxed">{mono.promptTr}</p>
          <ul className="mt-3 space-y-1.5">
            {mono.bulletsTr.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-brand)" }} />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {mono.targets.map((t) => (
              <span key={t.de} className="chip px-2.5 py-1 text-xs" title={t.tr} lang="de">
                {t.de}
              </span>
            ))}
          </div>
          <p className="muted mt-3 text-xs">
            {mono.minSeconds}–{mono.maxSeconds} saniye konuş. {asr === false ? "Bu tarayıcıda konuşma tanıma yok: kaydını dinleyip kendin değerlendireceksin." : "Söylediklerin metne dökülüp puanlanacak."}
          </p>
          <button type="button" onClick={() => void startRecording()} className="btn btn-primary mt-4 flex min-h-12 w-full items-center justify-center gap-2 px-4 text-sm">
            <MicIcon size={18} /> Kayda başla
          </button>
        </section>
      ) : null}

      {phase === "record" ? (
        <section className="card mt-3 p-5">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-rose)" }}>
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: "var(--color-rose)" }} /> Kayıt
            </p>
            <span className="tabular-nums text-sm font-bold">
              {mm(seconds)} / {mm(mono.maxSeconds)}
            </span>
          </div>
          <ul className="muted mt-2 space-y-1 text-xs">
            {mono.bulletsTr.map((b) => (
              <li key={b}>· {b}</li>
            ))}
          </ul>
          <p className="mt-3 min-h-12 rounded-xl px-3 py-2 text-sm surface-2" lang="de" aria-live="polite">
            {transcript} <span className="muted">{interim}</span>
            {!transcript && !interim ? <span className="muted">{asr ? "Dinliyorum…" : "Kayıt sürüyor…"}</span> : null}
          </p>
          <button
            type="button"
            onClick={stopRecording}
            disabled={seconds < mono.minSeconds}
            className="btn btn-primary mt-3 min-h-12 w-full px-4 text-sm"
          >
            {seconds < mono.minSeconds ? `Bitir (${mono.minSeconds - seconds} sn sonra)` : "Bitir"}
          </button>
        </section>
      ) : null}

      {phase === "review" ? (
        <section className="card mt-3 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--color-brand)]">Kontrol</p>
          <p className="muted mt-1 text-xs">{mm(seconds)} konuştun.</p>
          {audioUrl ? (
            <audio controls src={audioUrl} className="mt-2 w-full">
              <track kind="captions" />
            </audio>
          ) : null}
          {asr ? (
            <>
              <p className="muted mt-3 text-xs">Transkript — tanıyıcının kaçırdığını düzelt, sonra puanlat.</p>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                rows={4}
                lang="de"
                spellCheck={false}
                className="card mt-1.5 w-full resize-none px-3 py-2 text-sm outline-none"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {usedTargets.map((t) => (
                  <span key={t.de} className="chip px-2.5 py-1 text-xs" style={t.used ? { borderColor: "var(--color-mint)", color: "var(--color-mint)" } : { opacity: 0.6 }} lang="de">
                    {t.used ? "✓ " : ""}
                    {t.de}
                  </span>
                ))}
              </div>
              <button type="button" onClick={() => void evaluate()} disabled={!transcript.trim()} className="btn btn-primary mt-3 min-h-12 w-full px-4 text-sm">
                Puanlat
              </button>
            </>
          ) : (
            <>
              <p className="muted mt-3 text-xs">Kaydını dinle ve işaretle — yedek değerlendirme, puan kaydedilmez.</p>
              <ul className="mt-2 space-y-1.5">
                {mono.bulletsTr.map((b, i) => (
                  <li key={b}>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={checks[i]} onChange={(e) => setChecks(checks.map((c, j) => (j === i ? e.target.checked : c)))} />
                      {b}
                    </label>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={selfFinish} className="btn btn-primary mt-3 min-h-12 w-full px-4 text-sm">
                Bitir
              </button>
            </>
          )}
        </section>
      ) : null}

      {phase === "scoring" ? (
        <section className="card mt-3 p-5 text-center" aria-busy>
          <Mascot mood="think" size={72} className="mx-auto" />
          <p className="mt-2 text-sm font-semibold">Puanlanıyor…</p>
        </section>
      ) : null}

      {phase === "result" ? (
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card mt-3 p-5">
          {result ? (
            <AssessmentCard answer={transcript.trim()} result={result} failure={failure} example={null} />
          ) : (
            <p className="text-sm">
              {checks.filter(Boolean).length} / {checks.length} madde işaretlendi.
            </p>
          )}
          {result ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {usedTargets.map((t) => (
                <span key={t.de} className="chip flex items-center gap-1 px-2.5 py-1 text-xs" style={t.used ? { borderColor: "var(--color-mint)", color: "var(--color-mint)" } : { opacity: 0.6 }} lang="de">
                  {t.used ? <CheckIcon size={12} /> : null}
                  {t.de}
                </span>
              ))}
            </div>
          ) : null}
          <button type="button" onClick={() => setShowSample((v) => !v)} className="muted mt-3 text-xs font-semibold underline-offset-2 hover:underline">
            {showSample ? "Örneği gizle" : "Örnek monoloğu göster"}
          </button>
          {showSample ? (
            <p className="mt-2 rounded-xl px-3 py-2 text-sm leading-relaxed surface-2" lang="de">
              {mono.sampleDe}
            </p>
          ) : null}
        </motion.section>
      ) : null}

      <ResultCard
        correct={passed ? 1 : 0}
        total={1}
        noun="görev"
        state={state}
        onRetry={() => {
          reset();
          setPhase("prep");
          setPrepLeft(PREP_SECONDS);
          setSeconds(0);
          setTranscript("");
          finalRef.current = "";
          setAudioUrl(null);
          setResult(null);
          setFailure(null);
          setPassed(false);
          setChecks(mono.bulletsTr.map(() => false));
        }}
      />
    </PlayerShell>
  );
}
