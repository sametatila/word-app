"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { SpeakingMonologueExercise } from "@/lib/skills/types";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { localeOf, useTargetLang } from "./player-context";
import { askAssess, fallbackAssessment, type AssessFailure, type FallbackAssessment } from "@/lib/assess-client";
import type { Assessment, AssessLevel, AssessRequest } from "@/lib/assess-prompts";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import { AiNotice } from "@/components/ai-notice";
import { recognitionCtor, requestMicrophone, type Recognition } from "@/components/microphone";
import { CheckIcon, MicIcon } from "@/components/icons";
import { Mascot } from "@/components/mascot";
import { speakGerman } from "@/components/speak-button";
import { useT } from "@/lib/i18n/client";
import { RUBRIC_PASS_PCT } from "@/lib/score-bands";

type Phase = "prep" | "record" | "review" | "scoring" | "result";


/**
 * Monolog oynatıcısı: hazırlık → kayıt → transkript → rubrik.
 *
 * 2026-08'de WP-21 ile yazılmış, konuşma havuzuyla birlikte kaldırılmıştı;
 * Beceriler kütüphanesi B1–C1 konuşma egzersizini monolog olarak tanımlayınca
 * geri geldi. İki değişiklik: hedef dil çerçeveden geliyor (İngilizce kursta
 * en-US tanıyıcı ve rubrik) ve "geri" bağlantısı kütüphaneye dönüyor.
 *
 * Kayıt iki katmanlı: tanıyıcı (Chrome/Edge/Safari) konuşmayı metne döker ve
 * metin rubrikle puanlanır (`kind: "speaking"`); tanıyıcı yoksa ya da
 * sağlayıcı yoksa öğrenci kendi kaydını dinler ve kontrol listesiyle kendini
 * değerlendirir — yedek, ölçüm değil; kart bunu söyler.
 *
 * Transkript gönderilmeden önce düzenlenebilir: tanıyıcı Türkçe aksanlı
 * konuşmada kelime kaçırıyor ve öğrencinin "ben bunu demedim" demesine yer
 * olmalı. Düzenleme dilbilgisi puanını değiştirebilir; kabul edilen bedel —
 * sınav değil alıştırma.
 */
export function MonologuePlayer({ exercise, backHref }: { exercise: SpeakingMonologueExercise; backHref?: string }) {
  const t = useT();
  const lang = useTargetLang();
  const mono = exercise.monologue;
  const { finish, state, reset } = useSkillFinish(exercise, 1);
  const [phase, setPhase] = useState<Phase>("prep");
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

  /*
   * HAZIRLIK GERİ SAYIMI KALKTI.
   *
   * Web hazırlık ekranında otuz saniye sayıyor ve sıfıra inince KAYDI
   * KENDİLİĞİNDEN başlatıyordu. İki sorun: Android'de böyle bir saat yok —
   * öğrenci hazır olduğunda "başla"ya basıyor — ve mikrofon kullanıcı
   * istemeden açılıyordu; hazırlık metnini okuyan biri kaydın başladığını
   * fark etmeyebilir. Başlat düğmesi zaten duruyordu, tek çıkış oydu.
   *
   * Sınavın konuşma bölümünde saat olması ayrı bir karar (orada ölçüm var);
   * beceri kütüphanesi bir alıştırma.
   */

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
      r.lang = exercise.course === "gsw-zh" ? "de-CH" : localeOf(lang);
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
      lang,
    };
    const ai = await askAssess(req);
    let score: number | undefined;
    let ok: boolean;
    if (ai.ok) {
      setResult(ai.result);
      score = ai.result.score.overall;
      ok = score >= RUBRIC_PASS_PCT;
    } else {
      const fb = fallbackAssessment(req, t);
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
    <PlayerShell exercise={exercise} backHref={backHref}>
      <p className="muted px-1 text-body">{exercise.intro}</p>
      {/* Monolog metni sunucuda rubrikle puanlanıyor (ses gitmiyor); puanı
          kimin verdiği konuşmadan önce söyleniyor — mobilde de öyle. */}
      <AiNotice variant="output" className="mt-3" />

      {phase === "prep" ? (
        <section className="card mt-3 p-5">
          <p className="text-micro uppercase tracking-wide text-[color:var(--color-brand)]">{t("item.mono_prep")}</p>
          <p className="mt-2 text-strong leading-relaxed">{mono.promptTr}</p>
          <ul className="mt-3 space-y-1.5">
            {mono.bulletsTr.map((b) => (
              <li key={b} className="flex items-start gap-2 text-body">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-brand)" }} />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {/* TÜRKÇE KARŞILIK GÖRÜNÜR VE ÇİP SESLİ. Karşılık `title=` ipucu
                balonundaydı: dokunmatikte hiç açılmıyor, yani telefondan
                bakan öğrenci kelimenin ne demek olduğunu göremiyordu. Android
                ikisini de yapıyor: "de · tr" yazıyor ve çipe dokununca
                okuyor (`skillLibrary` `MonologueBody`). */}
            {mono.targets.map((x) => (
              <button
                key={x.de}
                type="button"
                onClick={() => speakGerman(x.de)}
                className="chip px-2.5 py-1 text-caption"
                aria-label={t("item.listen")}
              >
                <span lang={lang}>{x.de}</span>
                <span className="muted"> · {x.tr}</span>
              </button>
            ))}
          </div>
          <p className="muted mt-3 text-caption">
            {t("item.mono_duration", { min: mono.minSeconds, max: mono.maxSeconds })}{" "}
            {asr === false
              ? t("item.mono_no_stt")
              : t("item.mono_will_score")}
          </p>
          <button
            type="button"
            onClick={() => void startRecording()}
            className="btn btn-primary mt-4 flex min-h-12 w-full items-center justify-center gap-2 px-4 text-body"
          >
            <MicIcon size={18} /> {t("item.mono_start")}
          </button>
        </section>
      ) : null}

      {phase === "record" ? (
        <section className="card mt-3 p-5">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-micro uppercase tracking-wide" style={{ color: "var(--color-rose)" }}>
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: "var(--color-rose)" }} /> {t("item.mono_recording")}
            </p>
            <span className="tabular-nums text-strong">
              {mm(seconds)} / {mm(mono.maxSeconds)}
            </span>
          </div>
          <ul className="muted mt-2 space-y-1 text-caption">
            {mono.bulletsTr.map((b) => (
              <li key={b}>· {b}</li>
            ))}
          </ul>
          <p className="mt-3 min-h-12 rounded-panel px-3 py-2 text-body surface-2" lang={lang} aria-live="polite">
            {transcript} <span className="muted">{interim}</span>
            {!transcript && !interim ? <span className="muted">{t(asr ? "item.mono_listening" : "item.mono_recording")}</span> : null}
          </p>
          <button
            type="button"
            onClick={stopRecording}
            disabled={seconds < mono.minSeconds}
            className="btn btn-primary mt-3 min-h-12 w-full px-4 text-body"
          >
            {seconds < mono.minSeconds ? t("item.mono_stop_in", { n: mono.minSeconds - seconds }) : t("item.mono_stop")}
          </button>
        </section>
      ) : null}

      {phase === "review" ? (
        <section className="card mt-3 p-5">
          <p className="text-micro uppercase tracking-wide text-[color:var(--color-brand)]">{t("item.mono_review")}</p>
          <p className="muted mt-1 text-caption">{t("item.mono_spoke", { time: mm(seconds) })}</p>
          {audioUrl ? (
            <audio controls src={audioUrl} className="mt-2 w-full">
              <track kind="captions" />
            </audio>
          ) : null}
          {asr ? (
            <>
              <p className="muted mt-3 text-caption">{t("item.mono_transcript_hint")}</p>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                /* Alanin ADI: yertutucu yok, ad hemen ustundeki ipucu
                   satirindan geliyor (Android `skillLibrary` de ayni
                   ipucunu yaziyor). */
                aria-label={t("item.mono_transcript_hint")}
                rows={4}
                lang={lang}
                spellCheck={false}
                className="card mt-1.5 w-full resize-none px-3 py-2 text-body outline-none"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {usedTargets.map((t) => (
                  <span
                    key={t.de}
                    className="chip px-2.5 py-1 text-caption"
                    style={t.used ? { borderColor: "var(--color-mint)", color: "var(--color-mint)" } : { opacity: 0.6 }}
                    lang={lang}
                  >
                    {t.used ? "✓ " : ""}
                    {t.de}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => void evaluate()}
                disabled={!transcript.trim()}
                className="btn btn-primary mt-3 min-h-12 w-full px-4 text-body"
              >
                {t("item.mono_score")}
              </button>
            </>
          ) : (
            <>
              <p className="muted mt-3 text-caption">{t("item.mono_self")}</p>
              <ul className="mt-2 space-y-1.5">
                {mono.bulletsTr.map((b, i) => (
                  <li key={b}>
                    <label className="flex items-center gap-2 text-body">
                      <input
                        type="checkbox"
                        checked={checks[i]}
                        onChange={(e) => setChecks(checks.map((c, j) => (j === i ? e.target.checked : c)))}
                      />
                      {b}
                    </label>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={selfFinish} className="btn btn-primary mt-3 min-h-12 w-full px-4 text-body">
                {t("item.mono_finish")}
              </button>
            </>
          )}
        </section>
      ) : null}

      {phase === "scoring" ? (
        <section className="card mt-3 p-5 text-center" aria-busy>
          <Mascot mood="think" size={72} className="mx-auto" />
          <p className="mt-2 text-strong">{t("item.mono_scoring")}</p>
        </section>
      ) : null}

      {phase === "result" ? (
        /* SONUÇ DUYURULUYOR. Kayıt bitince gelen puan ve rubrik bir eylemin
           cevabı; odak "Kaydı bitir" düğmesinde kalıyor ve ekran okuyucu
           hiçbir şey söylemiyordu. Yükleme hâli `aria-busy` ile zaten
           söyleniyor, sonucu söyleyen yoktu. */
        <motion.section role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card mt-3 p-5">
          {result ? (
            <AssessmentCard answer={transcript.trim()} result={result} failure={failure} example={null} />
          ) : (
            <p className="text-body">
              {t("item.mono_self_done", { n: checks.filter(Boolean).length, total: checks.length })}
            </p>
          )}
          {result ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {usedTargets.map((t) => (
                <span
                  key={t.de}
                  className="chip flex items-center gap-1 px-2.5 py-1 text-caption"
                  style={t.used ? { borderColor: "var(--color-mint)", color: "var(--color-mint)" } : { opacity: 0.6 }}
                  lang={lang}
                >
                  {t.used ? <CheckIcon size={12} /> : null}
                  {t.de}
                </span>
              ))}
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => setShowSample((v) => !v)}
            className="muted mt-3 text-caption underline-offset-2 hover:underline"
          >
            {showSample ? t("item.mono_hide_sample") : t("item.mono_sample")}
          </button>
          {showSample ? (
            <p className="mt-2 rounded-panel px-3 py-2 text-body leading-relaxed surface-2" lang={lang}>
              {mono.sampleDe}
            </p>
          ) : null}
        </motion.section>
      ) : null}

      <ResultCard
        correct={passed ? 1 : 0}
        total={1}
        noun="task"
        state={state}
        onRetry={() => {
          reset();
          setPhase("prep");
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
