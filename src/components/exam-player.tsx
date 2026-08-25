"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GameSwitch } from "@/components/game-switch";
import { FitBox } from "@/components/fit-box";
import { speakGerman } from "@/components/speak-button";
import { SpeakerIcon } from "@/components/icons";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import { askAssess, fallbackAssessment, type FallbackAssessment } from "@/lib/assess-client";
import type { Assessment, AssessLevel, AssessRequest } from "@/lib/assess-prompts";
import type { GameResult } from "@/components/games/types";
import type { ExamPaper, ExamResult, ExamSectionId, TextItem } from "@/lib/exam";
import type { Round } from "@/lib/types";
import type { CefrLevel } from "@/lib/skills/types";

type Phase = "intro" | "loading" | "vocab" | "grammar" | "reading" | "listening" | "writing" | "finishing" | "result" | "error";

const SECTION_TITLE: Record<ExamSectionId, string> = { vocab: "Kelime", grammar: "Dilbilgisi", reading: "Okuma", listening: "Dinleme", writing: "Yazma" };
const ORDER: ExamSectionId[] = ["vocab", "grammar", "reading", "listening", "writing"];

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * Sınav oynatıcısı (WP-41): beş bölüm sırayla, tek zamanlayıcı, geri dönüş
 * yok. Nesnel bölümler istemcide sayılır; kelime cevapları SRS'e gider,
 * yazma bölümü AI rubriğiyle puanlanır (sağlayıcı yoksa bölüm kâğıtta hiç
 * yoktur). Süre dolunca kalan bölümler 0 sayılır ve sınav gönderilir —
 * "süre bitti, hiçbir şey kaydedilmedi" yaşanmasın.
 */
export function ExamPlayer({ level, module }: { level: CefrLevel; module: number | null }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [paper, setPaper] = useState<ExamPaper | null>(null);
  const [left, setLeft] = useState(0);
  const [idx, setIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [writingText, setWritingText] = useState("");
  const [writingResult, setWritingResult] = useState<Assessment | FallbackAssessment | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const score = useRef<Record<ExamSectionId, { correct: number; total: number }>>({ vocab: { correct: 0, total: 0 }, grammar: { correct: 0, total: 0 }, reading: { correct: 0, total: 0 }, listening: { correct: 0, total: 0 }, writing: { correct: 0, total: 0 } });
  const vocabAnswers = useRef<Record<string, unknown>[]>([]);
  const writingScore = useRef<number | null>(null);
  const startedAt = useRef(Date.now());
  const finished = useRef(false);

  async function start() {
    setPhase("loading");
    try {
      const res = await fetch("/api/exam", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "start", level, module, day: localDay() }) });
      if (!res.ok) throw new Error(String(res.status));
      const { paper: p } = (await res.json()) as { paper: ExamPaper };
      setPaper(p);
      setLeft(p.seconds);
      startedAt.current = Date.now();
      score.current = { vocab: { correct: 0, total: p.sections.vocab.length }, grammar: { correct: 0, total: p.sections.grammar.length }, reading: { correct: 0, total: p.sections.reading.reduce((a, t) => a + t.questions.length, 0) }, listening: { correct: 0, total: p.sections.listening.reduce((a, t) => a + t.questions.length, 0) }, writing: { correct: 0, total: p.sections.writing.length } };
      goTo("vocab", p);
    } catch {
      setPhase("error");
    }
  }

  function goTo(section: ExamSectionId, p: ExamPaper) {
    setIdx(0);
    setQIdx(0);
    setPicked(null);
    const has = section === "vocab" ? p.sections.vocab.length : section === "grammar" ? p.sections.grammar.length : section === "reading" ? p.sections.reading.length : section === "listening" ? p.sections.listening.length : p.sections.writing.length;
    if (!has) return next(section, p);
    setPhase(section);
  }
  function next(section: ExamSectionId, p: ExamPaper) {
    const i = ORDER.indexOf(section);
    if (i + 1 < ORDER.length) goTo(ORDER[i + 1], p);
    else void finish();
  }

  // Zamanlayıcı
  useEffect(() => {
    if (!paper || phase === "intro" || phase === "loading" || phase === "result" || phase === "finishing" || phase === "error") return;
    const t = setInterval(() => {
      const remain = paper.seconds - Math.floor((Date.now() - startedAt.current) / 1000);
      setLeft(Math.max(0, remain));
      if (remain <= 0) {
        clearInterval(t);
        void finish();
      }
    }, 1000);
    return () => clearInterval(t);
  }, [paper, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  async function finish() {
    if (finished.current || !paper) return;
    finished.current = true;
    setPhase("finishing");
    const sections = ORDER.map((id) => ({ id, ...score.current[id] })).filter((s) => s.total > 0);
    try {
      const res = await fetch("/api/exam", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "finish", level, module, trial: paper.trial, sections, vocabAnswers: vocabAnswers.current, writingScore: writingScore.current, seconds: Math.round((Date.now() - startedAt.current) / 1000), day: localDay() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setResult((await res.json()) as ExamResult);
      setPhase("result");
    } catch {
      setPhase("error");
    }
  }

  function onVocabDone(round: Round, results: GameResult[]) {
    for (const r of results) {
      if (r.correct) score.current.vocab.correct++;
      vocabAnswers.current.push({ ...r, game: round.game });
    }
    if (idx + 1 < paper!.sections.vocab.length) setIdx(idx + 1);
    else next("vocab", paper!);
  }

  function pickOption(section: "grammar" | "reading" | "listening", correct: boolean) {
    score.current[section].correct += correct ? 1 : 0;
    setPicked(null);
    const p = paper!;
    if (section === "grammar") {
      if (idx + 1 < p.sections.grammar.length) setIdx(idx + 1);
      else next("grammar", p);
      return;
    }
    const list = section === "reading" ? p.sections.reading : p.sections.listening;
    const item = list[idx];
    if (qIdx + 1 < item.questions.length) setQIdx(qIdx + 1);
    else if (idx + 1 < list.length) {
      setIdx(idx + 1);
      setQIdx(0);
    } else next(section, p);
  }

  async function evaluateWriting() {
    const item = paper!.sections.writing[0];
    const text = writingText.trim();
    if (!text || busy) return;
    setBusy(true);
    const req: AssessRequest = { kind: "writing", level: level as AssessLevel, task: { prompt: item.task.prompt, constraints: [...item.task.checklist, `en az ${item.task.minWords} kelime`] }, answer: { text }, locale: "tr" };
    const ai = await askAssess(req);
    if (ai.ok) {
      setWritingResult(ai.result);
      writingScore.current = ai.result.score.overall;
    } else {
      const fb = fallbackAssessment(req);
      setWritingResult(fb);
      writingScore.current = fb.score.overall;
    }
    score.current.writing.correct = (writingScore.current ?? 0) >= 60 ? 1 : 0;
    setBusy(false);
  }

  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");
  const title = module === null ? `${level} Seviye Sınavı` : `${level} · Modül ${module + 1} Sınavı`;

  if (phase === "intro") {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="muted mt-2 text-sm leading-relaxed">
          Beş bölüm: kelime (yazarak), dilbilgisi, okuma, dinleme, yazma. Süre {module === null ? 45 : 20} dakika, geri dönüş ve ipucu yok. Geçme: toplam ≥ %70 ve her bölüm ≥ %50. Geçince sertifika.
        </p>
        <button type="button" onClick={() => void start()} className="btn btn-primary mt-4 w-full px-5 py-3.5 text-base">
          Sınava başla
        </button>
        <Link href="/lessons" className="btn btn-ghost mt-2 w-full px-5 py-3 text-sm">
          Vazgeç
        </Link>
      </section>
    );
  }
  if (phase === "loading" || phase === "finishing") {
    return (
      <section className="card mx-auto w-full max-w-md p-5" aria-busy>
        <p className="muted text-sm">{phase === "loading" ? "Kâğıt hazırlanıyor…" : "Puanlanıyor…"}</p>
        <div className="mt-3 h-10 animate-pulse rounded-xl surface-2" />
      </section>
    );
  }
  if (phase === "error") {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <p className="text-sm">Sınav şu an yüklenemedi ya da kaydedilemedi.</p>
        <Link href="/lessons" className="btn btn-ghost mt-3 px-4 py-2 text-sm">
          Derslere dön
        </Link>
      </section>
    );
  }
  if (phase === "result" && result) {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <h1 className="text-xl font-bold">{result.passed ? "Geçtin!" : "Bu sefer olmadı"}</h1>
        <p className="muted mt-1 text-sm">
          Toplam <strong>%{result.total}</strong>
          {result.trial ? " · deneme (modül dersleri bitmeden sayılmaz)" : ""}
        </p>
        <ul className="mt-3 space-y-1.5">
          {result.sections.map((s) => (
            <li key={s.id}>
              <div className="flex items-center justify-between text-sm">
                <span>{SECTION_TITLE[s.id]}</span>
                <span className="tabular-nums" style={{ color: s.pct >= 50 ? "var(--text)" : "var(--color-rose)" }}>
                  %{s.pct}
                  {s.pct < 50 ? " · bölüm eşiği altı" : ""}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full surface-2">
                <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.pct >= 50 ? "var(--color-brand)" : "var(--color-rose)" }} />
              </div>
            </li>
          ))}
        </ul>
        {result.passed && !result.trial ? (
          <a href={`/api/certificate/${result.id}`} target="_blank" rel="noreferrer" className="btn btn-primary mt-4 w-full px-5 py-3 text-sm">
            Sertifikayı aç
          </a>
        ) : (
          <p className="muted mt-3 text-xs">Zayıf bölüm için profilde "Zayıf noktaların" ve "Sıradaki en iyi adım" var.</p>
        )}
        <Link href="/profile" className="btn btn-ghost mt-2 w-full px-5 py-3 text-sm">
          Profile dön
        </Link>
      </section>
    );
  }

  const section = phase as ExamSectionId;
  const header = (
    <div className="mb-3 flex items-center justify-between text-xs font-semibold">
      <span>
        {SECTION_TITLE[section]} · {ORDER.indexOf(section) + 1}/{ORDER.filter((s) => (paper!.sections[s] as unknown[]).length > 0).length}
      </span>
      <span className="tabular-nums" style={{ color: left < 120 ? "var(--color-rose)" : undefined }}>
        {mm}:{ss}
      </span>
    </div>
  );
  const options = (opts: string[], answer: number, onPick: (correct: boolean) => void) => (
    <div className="grid gap-2">
      {opts.map((o, i) => (
        <button key={`${o}-${i}`} type="button" disabled={picked !== null} onClick={() => { setPicked(i); setTimeout(() => onPick(i === answer), 150); }} className={`option px-3.5 py-3 text-left text-sm font-semibold ${picked === i ? "option-correct" : ""}`}>
          {o}
        </button>
      ))}
    </div>
  );

  if (section === "vocab") {
    const round = paper!.sections.vocab[idx];
    return (
      <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
        {header}
        <AnimatePresence mode="wait">
          <motion.div key={round.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="flex min-h-0 flex-1 flex-col">
            <FitBox>
              <GameSwitch round={round} onDone={(res) => onVocabDone(round, res)} />
            </FitBox>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
  if (section === "grammar") {
    const g = paper!.sections.grammar[idx];
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        {header}
        <p className="mb-4 text-base" lang="de">
          <span className="muted text-xs">{g.sheet} · {g.label}</span>
          <br />
          <strong>{g.key}</strong> → ?
        </p>
        {options(g.options, g.answer, (c) => pickOption("grammar", c))}
        <p className="muted mt-3 text-center text-xs">{idx + 1} / {paper!.sections.grammar.length}</p>
      </section>
    );
  }
  if (section === "reading" || section === "listening") {
    const list: TextItem[] = section === "reading" ? paper!.sections.reading : paper!.sections.listening;
    const item = list[idx];
    const q = item.questions[qIdx];
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        {header}
        {item.text ? (
          <div lang="de" className="mb-3 max-h-56 overflow-y-auto rounded-xl px-3.5 py-3 text-sm leading-relaxed surface-2">
            {item.text.split("\n\n").map((p, i) => (
              <p key={i} className={i > 0 ? "mt-2" : ""}>{p}</p>
            ))}
          </div>
        ) : null}
        {item.segments ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {item.segments.map((s, i) => (
              <button key={i} type="button" onClick={() => speakGerman(s.text)} className="chip flex items-center gap-1.5 px-3 py-1.5 text-xs">
                <SpeakerIcon size={13} />
                {s.speaker ? `${s.speaker} · ` : ""}Bölüm {i + 1}
              </button>
            ))}
          </div>
        ) : null}
        <p className="mb-3 text-sm font-semibold" lang="de">{q.text}</p>
        {options(q.options, q.answer, (c) => pickOption(section, c))}
        <p className="muted mt-3 text-center text-xs">Metin {idx + 1} / {list.length} · Soru {qIdx + 1} / {item.questions.length}</p>
      </section>
    );
  }
  // writing
  const w = paper!.sections.writing[0];
  return (
    <section className="card mx-auto w-full max-w-md p-5">
      {header}
      <p className="text-sm font-semibold leading-relaxed">{w.task.prompt}</p>
      <ul className="muted mt-2 list-disc pl-5 text-xs">
        {w.task.checklist.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
        <li>en az {w.task.minWords} kelime</li>
      </ul>
      {writingResult ? (
        <div className="mt-3 flex flex-col gap-3">
          <AssessmentCard answer={writingText.trim()} result={writingResult} />
          <button type="button" onClick={() => void finish()} className="btn btn-primary px-5 py-3 text-sm">
            Sınavı bitir
          </button>
        </div>
      ) : (
        <>
          <textarea value={writingText} onChange={(e) => setWritingText(e.target.value)} rows={6} lang="de" spellCheck={false} placeholder="Almanca yaz…" className="card mt-3 w-full resize-none px-4 py-3 text-base outline-none" />
          <button type="button" disabled={busy || writingText.trim().split(/\s+/).length < 5} onClick={() => void evaluateWriting()} className="btn btn-primary mt-3 w-full px-5 py-3 text-sm disabled:opacity-50">
            {busy ? "Değerlendiriliyor…" : "Gönder ve puanla"}
          </button>
        </>
      )}
    </section>
  );
}
