"use client";

import Link from "next/link";
import { apiFetch, ROLEPLAY_TIMEOUT_MS } from "@/lib/api-fetch";
import { AiNotice } from "@/components/ai-notice";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Lesson } from "@/lib/lessons/types";
import { parseReply } from "@/lib/chat-format";
import { EXAM_PASS_SCORE, EXAM_SECONDS, EXAM_TURNS } from "@/lib/lessons/roleplay-const";
import { askAssess, fallbackAssessment, ASSESS_ROLEPLAY_TIMEOUT_MS, type AssessFailure, type FallbackAssessment } from "@/lib/assess-client";
import type { Assessment, AssessLevel, AssessRequest } from "@/lib/assess-prompts";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import { ERROR_LABEL_KEYS, type ErrorType } from "@/lib/errors";
import { useT, useLang } from "@/lib/i18n/client";
import { courseName, speechLocaleOf, targetLangOf } from "@/lib/courses";
import { recognitionCtor, requestMicrophone, type Recognition } from "@/components/microphone";
import { speakGerman, stopSpeaking } from "@/components/speak-button";
import { MicIcon } from "@/components/icons";
import { Mascot } from "@/components/mascot";
import { CoachBubble } from "@/components/coach-bubble";
import { track } from "@/lib/track";
import { formatPercent } from "@/lib/i18n/dict";
import { ScoreRing } from "@/components/score-ring";
import { reducedMotion } from "@/lib/fx";

type Turn = { role: "user" | "assistant"; content: string };
type Phase = "intro" | "talk" | "scoring" | "result" | "error";

/**
 * Rol yapma sınavı (WP-22): aynı sahne, yardım yok, 5 tur, 3 dakika.
 *
 * Alıştırmadan farkı ölçüm: muhatap düzeltmez, öneri vermez, Türkçe
 * konuşmaz (bkz. `examPrompt`); konuşma bitince öğrencinin bütün turları tek
 * seferde rubrikle puanlanır (`kind: "roleplay"`) ve `assessments`'a yazılır.
 * Sonuç: rubrik kartı, en iyi iki cümle (hatasız ve en uzun), en sık iki
 * hata tipi, dersin can-do etiketi.
 *
 * Mikrofon tek atış: dokun, konuş, sus — tanıyıcı kapanınca metin gönderilir.
 * Tanıyıcı yoksa ya da izin verilmezse yazarak; sınavda ikisi eşdeğer
 * sayılır (telaffuz puanı WP-20 ile gelecek).
 */
export function RoleplayExam({ lesson, cando }: { lesson: Lesson; cando: string[] }) {
  const t = useT();
  const lang = useLang();
  const targetName = courseName(lesson.course, lang);
  const [phase, setPhase] = useState<Phase>("intro");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [asr, setAsr] = useState<boolean>(false);
  const [left, setLeft] = useState(EXAM_SECONDS);
  const [result, setResult] = useState<Assessment | FallbackAssessment | null>(null);
  const [failure, setFailure] = useState<AssessFailure | null>(null);
  const rec = useRef<Recognition | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const userTurns = turns.filter((t) => t.role === "user").length;

  useEffect(() => {
    setAsr(Boolean(recognitionCtor()));
  }, []);

  /*
   * Süre: konuşma fazında saniyede bir; sıfırda konuşma biter ve puanlanır.
   *
   * DUVAR SAATİNDEN, SAYICIDAN DEĞİL. Sekme gizlendiğinde tarayıcı
   * `setInterval`i kısıyor (mobilde uygulama arka plana alınınca tamamen
   * duruyor), yani üç dakikalık ölçüm istenildiği kadar uzatılabiliyordu.
   * Aynı hata iki platformda da vardı; hayatta kalma turu bunu baştan beri
   * doğru yapıyor (`challenge-player` `deadline`).
   */
  const deadline = useRef(0);
  useEffect(() => {
    if (phase !== "talk") return;
    if (!deadline.current) deadline.current = Date.now() + EXAM_SECONDS * 1000;
    const tick = () => setLeft(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [phase]);
  useEffect(() => {
    if (phase === "talk" && left <= 0) void score(turns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, phase]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "end" });
  }, [turns]);

  function start() {
    track("nav", 0, "roleplay_exam:start");
    const opening: Turn = { role: "assistant", content: lesson.roleplay.opening };
    setTurns([opening]);
    setPhase("talk");
    speakGerman(lesson.roleplay.opening);
  }

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy || phase !== "talk") return;
    setDraft("");
    setBusy(true);
    const next: Turn[] = [...turns, { role: "user", content: clean }];
    setTurns(next);
    const n = next.filter((t) => t.role === "user").length;
    try {
      const res = await apiFetch("/api/roleplay", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id, messages: next, mode: "exam" }),
        /* Üretim uzun: genel tavan (25 sn) bu çağrıyı kesiyordu. Android
           kırk beş saniye bekliyor, aynı sabit adıyla. */
        signal: AbortSignal.timeout(ROLEPLAY_TIMEOUT_MS),
      });
      if (!res.ok || !res.body) throw new Error(`roleplay ${res.status}`);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
      }
      // Sınav isteminde işaret satırı olmamalı; olursa yine de ayıklanır.
      const body = parseReply(acc).body.trim() || acc.trim();
      const all: Turn[] = [...next, { role: "assistant", content: body }];
      setTurns(all);
      setBusy(false);
      if (n >= EXAM_TURNS) {
        speakGerman(body, () => void score(all));
        setTimeout(() => void score(all), 6000);
      } else speakGerman(body);
    } catch (err) {
      console.error("[roleplay-exam]", err);
      setBusy(false);
      if (n >= 2) void score(next);
      else setPhase("error");
    }
  }

  const scored = useRef(false);

  /*
   * SINAVI BASTAN KURAN TEK YER.
   *
   * `deadline` REF'I DE SIFIRLANMALI. Sayac `left`ten degil `deadline.current`
   * tan okuyor (`if (!deadline.current)` bir kez kuruyor); yalnizca
   * `setLeft(EXAM_SECONDS)` yazmak ilk tik'te ezilir ve sinav ANINDA biter.
   * Android sonuc ekranindaki "Tekrar dene" tam bu yuzden bozuktu: dokunan
   * kullanici sifir turluk, aninda bitmis bir sinav aliyordu. Web ayni yerde
   * `location.reload()` cagiriyordu - bozuk degil ama sayfanin tamamini
   * yeniden yukleyen bir cekic. Iki yuzey de artik ayni sifirlamayi kullaniyor
   * (hata dali ve sonuc ekrani).
   */
  const restart = useCallback(() => {
    scored.current = false;
    deadline.current = 0;
    setResult(null);
    setFailure(null);
    setTurns([]);
    setDraft("");
    setLeft(EXAM_SECONDS);
    setPhase("intro");
  }, []);

  async function score(all: Turn[]) {
    if (scored.current) return;
    scored.current = true;
    stopSpeaking();
    setPhase("scoring");
    const said = all.filter((t) => t.role === "user").map((t) => t.content);
    const req: AssessRequest = {
      kind: "roleplay",
      level: lesson.level as AssessLevel,
      task: {
        prompt: `${lesson.roleplay.scene} (Sınav: ${lesson.roleplay.partner} ile konuşma)`,
        targets: lesson.patterns.map((p) => p.de),
        constraints: [`${EXAM_TURNS} tur`, "yardım yok"],
      },
      answer: { text: said.join("\n"), transcript: said },
      exerciseId: `${lesson.id}:exam`,
      /* Hedef dil: verilmezse uç Almancaya düşüyor ve seviye beklentileri
         Almanca rubriğinden geliyor — İngilizce dersin rol yapma sınavı
         yanlış ölçütle puanlanırdı (bkz. `api/assess`). */
      lang: targetLangOf(lesson.course),
    };
    /* Konuşmanın tamamı gönderiliyor: tavan tek cümlelik değerlendirmeden
       uzun (bkz. `lib/assess-client`). */
    const ai = await askAssess(req, { timeoutMs: ASSESS_ROLEPLAY_TIMEOUT_MS });
    if (ai.ok) setResult(ai.result);
    else {
      setResult(fallbackAssessment(req, t));
      setFailure(ai.reason);
    }
    track("nav", said.length, "roleplay_exam:done");
    setPhase("result");
  }

  async function listen() {
    if (listening || busy) return;
    const Ctor = recognitionCtor();
    if (!Ctor) return;
    if ((await requestMicrophone()) !== "granted") {
      setAsr(false);
      return;
    }
    const r = new Ctor();
    // Yerel kod kurs kayıt defterinden: elle yazılan ternary İngilizce kursta
    // tanıyıcıyı Almancaya kuruyordu (bkz. `lib/courses` `speechLocale`).
    r.lang = speechLocaleOf(lesson.course);
    r.interimResults = true;
    r.maxAlternatives = 1;
    r.continuous = false;
    let finalText = "";
    r.onresult = (e) => {
      let s = "";
      for (let i = 0; i < e.results.length; i++) s += e.results[i][0].transcript + " ";
      finalText = s.trim();
      setDraft(finalText);
    };
    r.onerror = () => setListening(false);
    r.onend = () => {
      setListening(false);
      rec.current = null;
      if (finalText) void send(finalText);
    };
    rec.current = r;
    stopSpeaking();
    setListening(true);
    r.start();
  }

  const mm = Math.floor(Math.max(0, left) / 60);
  const ss = String(Math.max(0, left) % 60).padStart(2, "0");

  if (phase === "intro") {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <CoachBubble moment="exam_intro" mood="think" size={48} className="mb-3" />
        <h1 className="text-h2">{t("rpexam.title")}</h1>
        <p className="muted mt-1 text-body">
          {lesson.title} · {lesson.titleTr}
        </p>
        <p className="mt-3 text-body leading-relaxed">{lesson.roleplay.scene}</p>
        <ul className="muted mt-3 space-y-1 text-caption">
          <li>· {t("rpexam.rule_time", { turns: EXAM_TURNS, minutes: EXAM_SECONDS / 60 })}</li>
          <li>· {t("rpexam.rule_partner")}</li>
          <li>· {t("rpexam.rule_scoring")}</li>
          <li>· {t("rpexam.patterns", { list: lesson.patterns.map((p) => p.de).join(" · ") })}</li>
        </ul>
        <button type="button" onClick={start} className="btn btn-primary mt-4 w-full px-5 py-3.5 text-h3">
          {t("exam.start")}
        </button>
        <Link href={`/lessons/${lesson.id}`} className="btn btn-ghost mt-2 w-full px-5 py-3 text-center text-body">
          {t("common.discard")}
        </Link>
      </section>
    );
  }

  if (phase === "scoring") {
    return (
      <section className="card mx-auto w-full max-w-md p-5 text-center" aria-busy>
        <Mascot mood="think" size={80} className="mx-auto" />
        <p className="mt-2 text-strong">{t("item.mono_scoring")}</p>
        <p className="muted text-caption">{t("rpexam.scoring_note", { n: userTurns })}</p>
      </section>
    );
  }

  if (phase === "error") {
    return (
      <section role="alert" className="card mx-auto w-full max-w-md p-5 text-center">
        {/* Android ayni dalda `sad` maskotu ciziyor; webde yalniz puanlama
            dalinda maskot vardi (`think`). */}
        <Mascot mood="sad" size={80} className="mx-auto" />
        <p className="mt-1 text-body">{t("rpexam.service_down")}</p>
        {/* YERINDE TEKRAR DENEME. Bu dala yalniz muhatap servisi ILK iki turda
            dusunce giriliyor (`send`: `n >= 2` ise konusma puanlaniyor), yani
            olculmus hicbir sey YOK - sinav bastan baslayabilir. Tek cikis
            "konusmaya don"du ve o, gecici bir ag kesintisinde girisi
            kaybettiriyordu. Ayni gerekce sinav oynaticisinda yazili
            ("haftanin kagidi gecici bir ag kesintisiyle harcanabiliyordu") ve
            ayni duzeltme Androidde de yapildi - iki taraf ayni kusuru
            tasidigi icin karsilastirma geciyordu. */}
        <button type="button" onClick={restart} className="btn btn-primary mt-3 w-full px-4 py-2 text-body">
          {t("common.try_again")}
        </button>
        <Link href={`/lessons/${lesson.id}`} className="btn btn-ghost mt-3 px-4 py-2 text-body">
          {t("lessonp.back_to_conversation")}
        </Link>
      </section>
    );
  }

  if (phase === "result" && result) {
    const said = turns.filter((t) => t.role === "user").map((t) => t.content);
    const errorTexts = new Set(result.errors.map((e) => e.wrong.trim().toLowerCase()).filter(Boolean));
    const best = said
      .filter((s) => ![...errorTexts].some((w) => s.toLowerCase().includes(w)))
      .sort((a, b) => b.length - a.length)
      .slice(0, 2);
    const byType = new Map<ErrorType, number>();
    for (const e of result.errors) byType.set(e.type, (byType.get(e.type) ?? 0) + 1);
    const topErrors = [...byType].sort((a, b) => b[1] - a[1]).slice(0, 2);
    const passed = result.score.overall >= EXAM_PASS_SCORE;
    return (
      <section role="status" className="card mx-auto w-full max-w-md p-5">
        <CoachBubble moment={passed ? "exam_pass" : "exam_fail"} mood={passed ? "celebrate" : "sad"} vars={{ pct: result.score.overall, level: lesson.level }} size={56} className="mb-3" />
        {/*
          PUAN HALKASI. Puan başlığın içinde bir ek cümleydi ("Rol yapma
          sınavı · %85"); Android aynı yerde halkayı çiziyor ve başlıkta
          yalnız sınavın adı duruyor (`RoleplayExamScreen`). Sonuç ekranının
          en önemli sayısı bir bakışta okunmuyordu.
        */}
        <ScoreRing id="rpexam-overall" size={140} stroke={13} pct={result.score.overall} className="mx-auto mb-3">
          <span className="text-display tabular-nums" style={{ color: "var(--color-brand)" }}>
            {formatPercent(result.score.overall, lang)}
          </span>
          <span className="muted text-micro">{t("assess.overall_score", { n: result.score.overall })}</span>
        </ScoreRing>
        <h1 className="text-h2">{t("rpexam.title")}</h1>
        <p className="muted mt-1 text-caption">
          {lesson.title} · {t("lessonp.n_turns", { n: userTurns })} ·{" "}
          {passed ? t("rpexam.passed") : t("rpexam.below_threshold", { n: EXAM_PASS_SCORE })}
        </p>
        <div className="mt-3">
          <AssessmentCard answer={said.join("\n")} result={result} failure={failure} example={null} />
        </div>
        {best.length ? (
          <div className="mt-3">
            <p className="muted text-micro uppercase tracking-eyebrow">{t("rpexam.best_sentences")}</p>
            <ul className="mt-1 space-y-1">
              {best.map((s) => (
                <li key={s} className="rounded-panel px-3 py-2 text-body surface-2" lang={lesson.course}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {topErrors.length ? (
          <p className="muted mt-3 text-caption">
            {t("rpexam.most_common")}{" "}
            {topErrors.map(([type, n]) => `${t(ERROR_LABEL_KEYS[type])} ×${n}`).join(", ")}
          </p>
        ) : (
          <p className="mt-3 text-caption" style={{ color: "var(--color-mint)" }}>
            {t("rpexam.no_errors")}
          </p>
        )}
        {cando.length ? (
          <p className="muted mt-3 text-caption">
            <span className="font-semibold">{passed ? `✓ ${t("lessonp.i_can")} ` : `${t("rpexam.goal")} `}</span>
            {cando.join(" · ")}
          </p>
        ) : null}
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={restart} className="btn btn-ghost flex-1 py-3 text-body">
            {t("common.try_again")}
          </button>
          <Link href={`/lessons/${lesson.id}`} className="btn btn-primary flex-1 py-3 text-center text-body">
            {t("lessonp.back_to_conversation")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="card mx-auto flex w-full max-w-md flex-col p-4">
      <div className="flex items-center justify-between text-caption">
        <span className="muted">
          {t("rpexam.turn_of", { n: Math.min(userTurns + 1, EXAM_TURNS), total: EXAM_TURNS })}
        </span>
        <span className="tabular-nums" style={{ color: left <= 30 ? "var(--color-rose)" : "var(--text-muted)" }}>
          {mm}:{ss}
        </span>
      </div>
      <AiNotice variant="character" className="mt-3" />
      <div className="mt-3 space-y-2">
        {turns.map((t, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[88%] rounded-panel px-3 py-2.5 text-body leading-relaxed ${t.role === "user" ? "ml-auto rounded-br-chip brand-gradient text-white" : "rounded-bl-chip surface-2"}`}
            lang={lesson.course}
          >
            {t.content}
          </motion.p>
        ))}
        {busy ? <p className="muted text-caption">…</p> : null}
        <div ref={endRef} />
      </div>
      <div className="mt-4 flex items-end gap-2">
        {asr ? (
          <button
            type="button"
            onClick={() => void listen()}
            disabled={busy || listening}
            aria-label={t("lesson.mic_talk")}
            className="brand-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow disabled:opacity-60"
          >
            <MicIcon size={20} />
          </button>
        ) : null}
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send(draft);
            }
          }}
          rows={1}
          lang={lesson.course}
          /* Cümle başı büyük, düzeltme kapalı (bkz. `lesson-player`).
             Android tarafında bu alanda da hiçbiri yoktu; iki taraf
             birlikte düzeltildi. */
          autoCapitalize="sentences"
          autoCorrect="off"
          spellCheck={false}
          placeholder={
            listening
              ? t("speak.listening")
              : asr
                ? t("rpexam.speak_or_type")
                : t("lesson.type_in", { lang: targetName })
          }
          aria-label={
            listening
              ? t("speak.listening")
              : asr
                ? t("rpexam.speak_or_type")
                : t("lesson.type_in", { lang: targetName })
          }
          disabled={busy}
          className="input max-h-24 flex-1 resize-none py-2 text-body"
        />
        <button type="button" onClick={() => void send(draft)} disabled={busy || !draft.trim()} className="btn btn-primary px-3.5 py-2.5 text-body">
          {t("common.send")}
        </button>
      </div>
    </section>
  );
}
