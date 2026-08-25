"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Lesson } from "@/lib/lessons/types";
import { parseReply } from "@/lib/chat-format";
import { EXAM_SECONDS, EXAM_TURNS } from "@/lib/lessons/roleplay-const";
import { askAssess, fallbackAssessment, type AssessFailure, type FallbackAssessment } from "@/lib/assess-client";
import type { Assessment, AssessLevel, AssessRequest } from "@/lib/assess-prompts";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import { ERROR_LABELS, type ErrorType } from "@/lib/errors";
import { recognitionCtor, requestMicrophone, type Recognition } from "@/components/microphone";
import { speakGerman, stopSpeaking } from "@/components/speak-button";
import { MicIcon } from "@/components/icons";
import { Mascot } from "@/components/mascot";
import { CoachBubble } from "@/components/coach-bubble";
import { track } from "@/lib/track";

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

  // Süre: konuşma fazında saniyede bir; sıfırda konuşma biter ve puanlanır.
  useEffect(() => {
    if (phase !== "talk") return;
    const t = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [phase]);
  useEffect(() => {
    if (phase === "talk" && left <= 0) void score(turns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, phase]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
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
      const res = await fetch("/api/roleplay", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id, messages: next, mode: "exam" }),
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
      locale: "tr",
    };
    const ai = await askAssess(req);
    if (ai.ok) setResult(ai.result);
    else {
      setResult(fallbackAssessment(req));
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
    r.lang = lesson.course === "gsw-zh" ? "de-CH" : "de-DE";
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
        <h1 className="text-xl font-bold">Konuşma sınavı</h1>
        <p className="muted mt-1 text-sm">
          {lesson.title} · {lesson.titleTr}
        </p>
        <p className="mt-3 text-sm leading-relaxed">{lesson.roleplay.scene}</p>
        <ul className="muted mt-3 space-y-1 text-xs">
          <li>· {EXAM_TURNS} tur, {EXAM_SECONDS / 60} dakika — süre bitince konuşma kapanır.</li>
          <li>· Muhatap yardım etmez, düzeltmez, Türkçe konuşmaz.</li>
          <li>· Bittiğinde bütün söylediklerin birlikte puanlanır: görev, dilbilgisi, kelime, uygunluk.</li>
          <li>· Kalıplar: {lesson.patterns.map((p) => p.de).join(" · ")}</li>
        </ul>
        <button type="button" onClick={start} className="btn btn-primary mt-4 w-full px-5 py-3.5 text-base">
          Sınava başla
        </button>
        <Link href={`/lessons/${lesson.id}`} className="btn btn-ghost mt-2 w-full px-5 py-3 text-center text-sm">
          Vazgeç
        </Link>
      </section>
    );
  }

  if (phase === "scoring") {
    return (
      <section className="card mx-auto w-full max-w-md p-5 text-center" aria-busy>
        <Mascot mood="think" size={80} className="mx-auto" />
        <p className="mt-2 text-sm font-semibold">Puanlanıyor…</p>
        <p className="muted text-xs">{userTurns} turun tamamı rubrikle değerlendiriliyor.</p>
      </section>
    );
  }

  if (phase === "error") {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <p className="text-sm">Konuşma servisi şu an ulaşılamıyor; sınav senaryolu konuşmayla yapılamaz (ölçüm sayılmaz).</p>
        <Link href={`/lessons/${lesson.id}`} className="btn btn-ghost mt-3 px-4 py-2 text-sm">
          Derse dön
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
    const passed = result.score.overall >= 60;
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <CoachBubble moment={passed ? "exam_pass" : "exam_fail"} mood={passed ? "cheer" : "sad"} vars={{ pct: result.score.overall, level: lesson.level }} size={56} className="mb-3" />
        <h1 className="text-xl font-bold">Konuşma sınavı · %{result.score.overall}</h1>
        <p className="muted mt-1 text-xs">
          {lesson.title} · {userTurns} tur · {passed ? "geçti" : "eşiğin altında (60)"}
        </p>
        <div className="mt-3">
          <AssessmentCard answer={said.join("\n")} result={result} failure={failure} example={null} />
        </div>
        {best.length ? (
          <div className="mt-3">
            <p className="muted text-[11px] font-bold uppercase tracking-wide">En iyi cümlelerin</p>
            <ul className="mt-1 space-y-1">
              {best.map((s) => (
                <li key={s} className="rounded-xl px-3 py-2 text-sm surface-2" lang="de">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {topErrors.length ? (
          <p className="muted mt-3 text-xs">
            En çok: {topErrors.map(([t, n]) => `${ERROR_LABELS[t]} ×${n}`).join(", ")}
          </p>
        ) : (
          <p className="mt-3 text-xs" style={{ color: "var(--color-mint)" }}>
            Rubrik hata bulmadı.
          </p>
        )}
        {cando.length ? (
          <p className="muted mt-3 text-xs">
            <span className="font-semibold">{passed ? "✓ Yapabildiklerim: " : "Hedef: "}</span>
            {cando.join(" · ")}
          </p>
        ) : null}
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => location.reload()} className="btn btn-ghost flex-1 py-3 text-sm">
            Tekrar
          </button>
          <Link href={`/lessons/${lesson.id}`} className="btn btn-primary flex-1 py-3 text-center text-sm">
            Derse dön
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="card mx-auto flex w-full max-w-md flex-col p-4">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="muted">
          Tur {Math.min(userTurns + 1, EXAM_TURNS)} / {EXAM_TURNS}
        </span>
        <span className="tabular-nums" style={{ color: left <= 30 ? "var(--color-rose)" : "var(--text-muted)" }}>
          {mm}:{ss}
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {turns.map((t, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${t.role === "user" ? "ml-auto brand-gradient text-white" : "surface-2"}`}
            lang="de"
          >
            {t.content}
          </motion.p>
        ))}
        {busy ? <p className="muted text-xs">…</p> : null}
        <div ref={endRef} />
      </div>
      <div className="mt-4 flex items-end gap-2">
        {asr ? (
          <button
            type="button"
            onClick={() => void listen()}
            disabled={busy || listening}
            aria-label="Konuş"
            className="brand-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow disabled:opacity-40"
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
          lang="de"
          placeholder={listening ? "Dinliyorum…" : asr ? "Konuş ya da yaz…" : "Almanca yaz…"}
          disabled={busy}
          className="input max-h-24 flex-1 resize-none py-2 text-sm"
        />
        <button type="button" onClick={() => void send(draft)} disabled={busy || !draft.trim()} className="btn btn-primary px-3.5 py-2.5 text-sm">
          Gönder
        </button>
      </div>
    </section>
  );
}
