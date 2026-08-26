"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GameSwitch } from "@/components/game-switch";
import { NoHints } from "@/components/games/no-hints";
import { FitBox } from "@/components/fit-box";
import { speakGerman, stopSpeaking } from "@/components/speak-button";
import { SpeakerIcon, MicIcon, CheckIcon } from "@/components/icons";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import { TokenDiff } from "@/components/feedback/diff-text";
import { askAssess, fallbackAssessment, type FallbackAssessment } from "@/lib/assess-client";
import type { Assessment, AssessLevel, AssessRequest } from "@/lib/assess-prompts";
import type { GameResult } from "@/components/games/types";
import type { ExamPaper, ExamResult, ExamSectionId, ProduceExamItem, TextItem } from "@/lib/exam-types";
import { SECTION_ORDER, SECTION_TITLE, SECTION_TITLE_DE } from "@/lib/exam-types";
import { matchSentence } from "@/lib/sentence-match";
import type { Round } from "@/lib/types";
import type { CefrLevel } from "@/lib/skills/types";
import { CoachBubble } from "@/components/coach-bubble";
import { PronounceCard } from "@/components/feedback/pronounce-card";
import { askPronounce, captureClip, type Capture } from "@/lib/pronounce-client";
import type { PronounceScore } from "@/lib/pronounce";

/**
 * Sınav oynatıcısı (WP-41 v3).
 *
 * Üç şey bir sınavı sınav yapıyor ve üçü de burada: **kapak** (ne ölçülüyor,
 * kaç bölüm, kaç dakika, geçme kuralı), **bölüm arası** (Teil 3 · Satzbau —
 * kaç madde, ne isteniyor) ve **döküm** (hangi maddeyi kaçırdın, doğrusu
 * neydi). Ortadaki akışta geri dönüş, ipucu ve anında geri bildirim YOK:
 * cevabın doğru olup olmadığını sınav bitmeden öğrenmiyorsun. Alıştırma
 * turlarından ayrıldığı yer tam olarak burası.
 *
 * Süre dolunca kalan bölümler 0 sayılır ve kâğıt gönderilir — "süre bitti,
 * hiçbir şey kaydedilmedi" yaşanmasın.
 */

type Phase = "cover" | "loading" | "intro" | "run" | "finishing" | "result" | "error";

/** Konuşma maddesinde en uzun kayıt. */
const SPEAK_MAX_MS = 12_000;

/** Bölümün öğrenciye ne yaptıracağı — bölüm arası kartında okunur. */
const SECTION_BRIEF: Record<ExamSectionId, string> = {
  vocab: "Modülün kelimeleri. Türkçesi verilen cümleyi ya da kelimeyi Almanca yaz.",
  grammar: "Modülün dilbilgisi odakları. Doğru biçimi seç ya da cümle hakkında hüküm ver.",
  produce: "Sınavın omurgası. Türkçesi verilen cümleyi Almanca kur — yazarak ya da parçaları sıralayarak.",
  reading: "Kısa bir metin. Önce oku, sonra soruları cevapla. Metin sorular boyunca ekranda kalır.",
  listening: "Bir diyalog. İstediğin kadar dinleyebilirsin ama metni göremezsin.",
  speaking: "Cümleyi yüksek sesle, doğal hızda oku. Tek kayıt hakkı; puan kelime düzeyinde.",
  writing: "Tek görev, serbest metin. Kontrol listesindeki maddelerin hepsine değin.",
};

type Miss = {
  section: ExamSectionId;
  /** Soru — Türkçe ya da Almanca, maddeye göre. */
  prompt: string;
  /** Doğru cevap. */
  answer: string;
  /** Öğrencinin verdiği cevap (varsa). */
  given?: string;
  /** Gerekçe — hüküm maddelerinde dersin kendi açıklaması. */
  why?: string;
};

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function sectionCount(p: ExamPaper, id: ExamSectionId): number {
  const s = p.sections;
  if (id === "vocab") return s.vocab.length;
  if (id === "grammar") return s.grammar.length;
  if (id === "produce") return s.produce.length;
  if (id === "reading") return s.reading.reduce((a, t) => a + t.questions.length, 0);
  if (id === "listening") return s.listening.reduce((a, t) => a + t.questions.length, 0);
  if (id === "speaking") return s.speaking.length;
  return s.writing.length;
}

function present(p: ExamPaper): ExamSectionId[] {
  return SECTION_ORDER.filter((id) => sectionCount(p, id) > 0);
}

const empty = () => ({ correct: 0, total: 0 });

export function ExamPlayer({ level, module }: { level: CefrLevel; module: number | null }) {
  const [phase, setPhase] = useState<Phase>("cover");
  const [paper, setPaper] = useState<ExamPaper | null>(null);
  const [section, setSection] = useState<ExamSectionId>("vocab");
  const [left, setLeft] = useState(0);
  const [idx, setIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  // Cümle kurma bölümü
  const [typed, setTyped] = useState("");
  const [chunks, setChunks] = useState<number[]>([]);
  // Yazma bölümü
  const [writingText, setWritingText] = useState("");
  const [writingResult, setWritingResult] = useState<Assessment | FallbackAssessment | null>(null);
  // Konuşma bölümü (WP-20 + WP-41)
  const [spk, setSpk] = useState<"idle" | "rec" | "scoring" | "done" | "failed">("idle");
  const [spkResult, setSpkResult] = useState<PronounceScore | null>(null);
  const [spkTries, setSpkTries] = useState(0);
  const [showMisses, setShowMisses] = useState(false);
  const capture = useRef<Capture | null>(null);
  const speakingScores = useRef<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const score = useRef<Record<ExamSectionId, { correct: number; total: number }>>({
    vocab: empty(), grammar: empty(), produce: empty(), reading: empty(), listening: empty(), speaking: empty(), writing: empty(),
  });
  const vocabAnswers = useRef<Record<string, unknown>[]>([]);
  const writingScore = useRef<number | null>(null);
  const misses = useRef<Miss[]>([]);
  const startedAt = useRef(Date.now());
  const finished = useRef(false);

  useEffect(() => () => stopSpeaking(), []);

  async function start() {
    setPhase("loading");
    try {
      const res = await fetch("/api/exam", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "start", level, module, day: localDay() }) });
      if (!res.ok) throw new Error(String(res.status));
      const { paper: p } = (await res.json()) as { paper: ExamPaper };
      setPaper(p);
      setLeft(p.seconds);
      startedAt.current = Date.now();
      for (const id of SECTION_ORDER) score.current[id] = { correct: 0, total: sectionCount(p, id) };
      const first = present(p)[0];
      if (!first) return void finishNow();
      openSection(first);
    } catch {
      setPhase("error");
    }
  }

  function openSection(id: ExamSectionId) {
    stopSpeaking();
    setSection(id);
    setIdx(0);
    setQIdx(0);
    setPicked(null);
    setTyped("");
    setChunks([]);
    setPhase("intro");
  }

  function nextSection() {
    const list = present(paper!);
    const at = list.indexOf(section);
    if (at + 1 < list.length) openSection(list[at + 1]);
    else void finishNow();
  }

  // Zamanlayıcı
  useEffect(() => {
    if (!paper || phase === "cover" || phase === "loading" || phase === "result" || phase === "finishing" || phase === "error") return;
    const t = setInterval(() => {
      const remain = paper.seconds - Math.floor((Date.now() - startedAt.current) / 1000);
      setLeft(Math.max(0, remain));
      if (remain <= 0) {
        clearInterval(t);
        void finishNow();
      }
    }, 1000);
    return () => clearInterval(t);
  }, [paper, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  async function finishNow() {
    if (finished.current || !paper) return;
    finished.current = true;
    stopSpeaking();
    setPhase("finishing");
    const sections = SECTION_ORDER.map((id) => ({ id, ...score.current[id] })).filter((s) => s.total > 0);
    try {
      const res = await fetch("/api/exam", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "finish",
          level,
          module,
          trial: paper.trial,
          sections,
          vocabAnswers: vocabAnswers.current,
          writingScore: writingScore.current,
          speakingScore: speakingScores.current.length ? Math.round(speakingScores.current.reduce((a, b) => a + b, 0) / speakingScores.current.length) : null,
          seconds: Math.round((Date.now() - startedAt.current) / 1000),
          day: localDay(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setResult((await res.json()) as ExamResult);
      setPhase("result");
    } catch {
      setPhase("error");
    }
  }

  /* ---------------------------------------------------------------- bölümler */

  function onVocabDone(round: Round, results: GameResult[]) {
    for (const r of results) {
      if (r.correct) score.current.vocab.correct++;
      else misses.current.push({ section: "vocab", prompt: wordPrompt(round), answer: wordAnswer(round) });
      vocabAnswers.current.push({ ...r, game: round.game });
    }
    if (idx + 1 < paper!.sections.vocab.length) setIdx(idx + 1);
    else nextSection();
  }

  function pickGrammar(chosen: number) {
    const g = paper!.sections.grammar[idx];
    const correct = g.kind === "cell" ? chosen === g.answer : chosen === (g.answer ? 0 : 1);
    if (correct) score.current.grammar.correct++;
    else if (g.kind === "cell")
      misses.current.push({ section: "grammar", prompt: `${g.key} · ${g.label}`, answer: g.options[g.answer], given: g.options[chosen] });
    else
      misses.current.push({
        section: "grammar",
        prompt: g.statement,
        answer: g.answer ? "Doğru" : "Yanlış",
        given: chosen === 0 ? "Doğru" : "Yanlış",
        why: g.why.map((s) => s.text).join(" "),
      });
    setPicked(null);
    if (idx + 1 < paper!.sections.grammar.length) setIdx(idx + 1);
    else nextSection();
  }

  function submitProduce() {
    const item = paper!.sections.produce[idx];
    const answer = item.mode === "order" ? chunks.map((i) => item.chunks![i]).join(" ") : typed.trim();
    if (!answer) return;
    const m = matchSentence(answer, item.de, item.accept);
    // Sınavda sıra hatası doğru sayılmaz: ölçülen şey tam olarak sıra.
    const correct = m.verdict === "exact" || m.verdict === "spelling";
    if (correct) score.current.produce.correct++;
    else misses.current.push({ section: "produce", prompt: item.prompt, answer: item.de, given: answer });
    setTyped("");
    setChunks([]);
    if (idx + 1 < paper!.sections.produce.length) setIdx(idx + 1);
    else nextSection();
  }

  function pickText(kind: "reading" | "listening", chosen: number) {
    const list = kind === "reading" ? paper!.sections.reading : paper!.sections.listening;
    const item = list[idx];
    const q = item.questions[qIdx];
    if (chosen === q.answer) score.current[kind].correct++;
    else misses.current.push({ section: kind, prompt: q.textTr ?? q.text, answer: q.options[q.answer], given: q.options[chosen] });
    setPicked(null);
    if (qIdx + 1 < item.questions.length) setQIdx(qIdx + 1);
    else if (idx + 1 < list.length) {
      setIdx(idx + 1);
      setQIdx(0);
    } else nextSection();
  }

  async function evaluateWriting() {
    const item = paper!.sections.writing[0];
    const text = writingText.trim();
    if (!text || busy) return;
    setBusy(true);
    const req: AssessRequest = {
      kind: "writing",
      level: level as AssessLevel,
      task: { prompt: item.task.prompt, constraints: [...item.task.checklist, `en az ${item.task.minWords} kelime`] },
      answer: { text },
      locale: "tr",
    };
    const ai = await askAssess(req);
    const out = ai.ok ? ai.result : fallbackAssessment(req);
    setWritingResult(out);
    writingScore.current = out.score.overall;
    score.current.writing.correct = (writingScore.current ?? 0) >= 60 ? 1 : 0;
    setBusy(false);
  }

  /* ------------------------------------------------------------------ ekranlar */

  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");
  const cover = paper?.cover ?? null;
  const title = module === null ? `${level} Seviye Sınavı` : cover ? `${cover.code} · ${cover.titleTr}` : `${level} · Modül ${module + 1} Sınavı`;

  if (phase === "cover") return <Cover level={level} module={module} onStart={() => void start()} />;

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
      <Result
        result={result}
        level={level}
        moduleIndex={module}
        title={title}
        cando={cover?.canDo ?? []}
        focus={cover?.focus ?? []}
        misses={misses.current}
        showMisses={showMisses}
        onToggleMisses={() => setShowMisses((v) => !v)}
        writingSample={paper?.sections.writing[0]?.task.sample ?? null}
      />
    );
  }

  const list = present(paper!);
  const teil = list.indexOf(section) + 1;

  if (phase === "intro") {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        {/* uppercase YOK: Türkçe yerelde text-transform "Teil"i "TEİL" yapıyor. */}
        <p className="muted text-xs font-bold tracking-wide" lang="de">
          Teil {teil} / {list.length}
        </p>
        <h2 className="mt-1 text-2xl font-bold" lang="de">
          {SECTION_TITLE_DE[section]}
        </h2>
        <p className="text-base font-semibold" style={{ color: "var(--color-brand)" }}>
          {SECTION_TITLE[section]}
        </p>
        <p className="muted mt-3 text-sm leading-relaxed">{SECTION_BRIEF[section]}</p>
        <p className="muted mt-3 text-xs">
          {sectionCount(paper!, section)} madde · kalan süre {mm}:{ss}
        </p>
        <button type="button" onClick={() => setPhase("run")} className="btn btn-primary mt-4 w-full px-5 py-3.5 text-base">
          Bölüme başla
        </button>
      </section>
    );
  }

  const doneItems = section === "reading" || section === "listening" ? qIdx : idx;
  const header = (
    <div className="mb-3">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span>
          Teil {teil}/{list.length} · <span lang="de">{SECTION_TITLE_DE[section]}</span>
        </span>
        <span className="tabular-nums" style={{ color: left < 120 ? "var(--color-rose)" : undefined }}>
          {mm}:{ss}
        </span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full surface-2">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.round((100 * doneItems) / Math.max(1, sectionCount(paper!, section)))}%`, background: "var(--color-brand)" }}
        />
      </div>
    </div>
  );

  const options = (opts: string[], onPick: (i: number) => void) => (
    <div className="grid gap-2">
      {opts.map((o, i) => (
        <button
          key={`${o}-${i}`}
          type="button"
          disabled={picked !== null}
          onClick={() => {
            setPicked(i);
            setTimeout(() => onPick(i), 140);
          }}
          className={`option px-3.5 py-3 text-left text-sm font-semibold ${picked === i ? "option-correct" : ""}`}
        >
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
              {/* Kâğıdın kuralı: ipucu yok. */}
              <NoHints>
                <GameSwitch round={round} onDone={(res) => onVocabDone(round, res)} />
              </NoHints>
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
        {g.kind === "cell" ? (
          <>
            <p className="muted text-xs">
              {g.sheet} · {g.label}
            </p>
            <p className="mb-4 mt-1 text-xl font-bold" lang="de">
              {g.key} <span className="muted">→ ?</span>
            </p>
            {options(g.options, pickGrammar)}
          </>
        ) : (
          <>
            <p className="muted text-xs">Richtig oder falsch? · Bu cümle doğru mu?</p>
            <p className="mb-4 mt-1 text-xl font-bold leading-snug" lang="de">
              {g.statement}
            </p>
            {options(["Richtig · Doğru", "Falsch · Yanlış"], pickGrammar)}
          </>
        )}
        <p className="muted mt-3 text-center text-xs">
          {idx + 1} / {paper!.sections.grammar.length}
        </p>
      </section>
    );
  }

  if (section === "produce") {
    const item = paper!.sections.produce[idx];
    return (
      <ProduceCard
        header={header}
        item={item}
        index={idx}
        total={paper!.sections.produce.length}
        typed={typed}
        onTyped={setTyped}
        chunks={chunks}
        onChunks={setChunks}
        onSubmit={submitProduce}
      />
    );
  }

  if (section === "reading" || section === "listening") {
    const items: TextItem[] = section === "reading" ? paper!.sections.reading : paper!.sections.listening;
    const item = items[idx];
    const q = item.questions[qIdx];
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        {header}
        <p className="muted text-xs">
          {item.genre ?? item.situation ?? ""} {item.titleTr ? `· ${item.titleTr}` : ""}
        </p>
        <p className="mb-2 text-sm font-bold" lang="de">
          {item.title}
        </p>
        {item.text ? (
          <div lang="de" className="mb-3 max-h-56 overflow-y-auto whitespace-pre-line rounded-xl px-3.5 py-3 text-sm leading-relaxed surface-2">
            {item.text}
          </div>
        ) : null}
        {item.segments ? <DialogPlayer segments={item.segments} /> : null}
        <p className="mt-3 text-sm font-semibold" lang="de">
          {q.text}
        </p>
        {q.textTr ? <p className="muted mb-3 text-xs">{q.textTr}</p> : <div className="mb-3" />}
        {options(q.options, (i) => pickText(section, i))}
        <p className="muted mt-3 text-center text-xs">
          Soru {qIdx + 1} / {item.questions.length}
        </p>
      </section>
    );
  }

  if (section === "speaking") {
    const item = paper!.sections.speaking[idx];
    const last = idx + 1 >= paper!.sections.speaking.length;
    const startRec = async () => {
      if (spk !== "idle" && spk !== "failed") return;
      const cap = await captureClip(SPEAK_MAX_MS);
      if (!cap) return setSpk("failed");
      capture.current = cap;
      setSpk("rec");
      setTimeout(() => void stopRec(), SPEAK_MAX_MS + 50);
    };
    const stopRec = async () => {
      const cap = capture.current;
      if (!cap) return;
      capture.current = null;
      setSpk("scoring");
      const blob = await cap.stop();
      const res = blob ? await askPronounce(blob, item.de, { confusions: item.confusions, language: "de" }) : ({ ok: false, reason: "failed" } as const);
      if (res.ok) {
        speakingScores.current[idx] = res.score.overall;
        score.current.speaking.correct += res.score.passed ? 1 : 0;
        setSpkResult(res.score);
        setSpk("done");
      } else {
        setSpkTries((n) => n + 1);
        setSpk("failed");
      }
    };
    const advance = () => {
      if (spk !== "done" && spk !== "failed") return;
      // Teknik arıza iki denemede de sürdüyse madde 0 sayılır ama sınav durmaz.
      if (spk === "failed" && speakingScores.current[idx] === undefined) speakingScores.current[idx] = 0;
      if (!speakingScores.current[idx] || speakingScores.current[idx] < 60)
        misses.current.push({ section: "speaking", prompt: item.situation ?? "Söyleyiş", answer: item.de });
      setSpk("idle");
      setSpkResult(null);
      setSpkTries(0);
      if (!last) setIdx(idx + 1);
      else nextSection();
    };
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        {header}
        <p className="muted text-xs">
          {idx + 1}/{paper!.sections.speaking.length} · {item.situation ?? "Cümleyi yüksek sesle oku."}
        </p>
        <p className="mt-3 text-lg font-bold leading-snug" lang="de">
          {item.de}
        </p>
        <p className="muted text-sm">{item.tr}</p>
        {spk === "idle" || spk === "rec" ? (
          <div className="mt-5 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => (spk === "rec" ? void stopRec() : void startRec())}
              aria-label={spk === "rec" ? "Kaydı bitir" : "Kaydı başlat"}
              className="flex h-20 w-20 items-center justify-center rounded-full text-white"
              style={{ background: spk === "rec" ? "var(--color-rose)" : "var(--color-brand)" }}
            >
              <MicIcon size={30} />
            </button>
            <span className="muted text-xs">{spk === "rec" ? "Kaydediliyor… bitince dokun" : "Mikrofona dokun, oku, tekrar dokun"}</span>
          </div>
        ) : null}
        {spk === "scoring" ? <p className="muted mt-5 text-center text-sm">Puanlanıyor…</p> : null}
        {spk === "done" && spkResult ? (
          <div className="mt-4">
            <PronounceCard score={spkResult} compact />
          </div>
        ) : null}
        {spk === "failed" ? (
          <p className="mt-4 rounded-xl px-3 py-2 text-sm" style={{ background: "color-mix(in srgb, var(--color-rose) 10%, transparent)" }}>
            {spkTries < 2 ? "Ses alınamadı ya da puanlanamadı. Bir kez daha dene; olmazsa madde atlanır." : "Bu madde puanlanamadı; sınav devam ediyor."}
          </p>
        ) : null}
        {spk === "failed" && spkTries < 2 ? (
          <button type="button" onClick={() => void startRec()} className="btn btn-ghost mt-3 w-full px-5 py-3 text-sm">
            Tekrar dene
          </button>
        ) : null}
        {spk === "done" || spk === "failed" ? (
          <button type="button" onClick={advance} className="btn btn-primary mt-3 w-full px-5 py-3 text-sm">
            {last ? "Bölümü bitir" : "Sıradaki cümle"}
          </button>
        ) : null}
      </section>
    );
  }

  // writing
  const w = paper!.sections.writing[0];
  return (
    <section className="card mx-auto w-full max-w-md p-5">
      {header}
      <p className="text-sm font-semibold leading-relaxed">{w.task.prompt}</p>
      {w.task.stimulus ? (
        <div lang="de" className="mt-2 whitespace-pre-line rounded-xl px-3.5 py-3 text-sm leading-relaxed surface-2">
          {w.task.stimulus}
        </div>
      ) : null}
      <ul className="muted mt-2 list-disc pl-5 text-xs">
        {w.task.checklist.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
        <li>en az {w.task.minWords} kelime</li>
      </ul>
      {writingResult ? (
        <div className="mt-3 flex flex-col gap-3">
          <AssessmentCard answer={writingText.trim()} result={writingResult} />
          <button type="button" onClick={() => void finishNow()} className="btn btn-primary px-5 py-3 text-sm">
            Sınavı bitir
          </button>
        </div>
      ) : (
        <>
          <textarea
            value={writingText}
            onChange={(e) => setWritingText(e.target.value)}
            rows={7}
            lang="de"
            spellCheck={false}
            placeholder="Almanca yaz…"
            className="card mt-3 w-full resize-none px-4 py-3 text-base outline-none"
          />
          <p className="muted mt-1 text-right text-xs tabular-nums">
            {writingText.trim() ? writingText.trim().split(/\s+/).length : 0} / {w.task.minWords} kelime
          </p>
          <button
            type="button"
            disabled={busy || writingText.trim().split(/\s+/).length < 5}
            onClick={() => void evaluateWriting()}
            className="btn btn-primary mt-2 w-full px-5 py-3 text-sm disabled:opacity-50"
          >
            {busy ? "Değerlendiriliyor…" : "Gönder ve puanla"}
          </button>
        </>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ parçalar */

/** Kâğıdın kapağı: ne ölçülüyor, kaç bölüm, kural ne. */
function Cover({ level, module, onStart }: { level: CefrLevel; module: number | null; onStart: () => void }) {
  const [cover, setCover] = useState<{ code: string; titleDe: string; titleTr: string; focus: { de: string; tr: string }[] } | null>(null);
  useEffect(() => {
    if (module === null) return;
    let alive = true;
    void fetch(`/api/exam?level=${level}&module=${module}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { cover?: typeof cover } | null) => {
        if (alive && d?.cover) setCover(d.cover);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [level, module]);

  return (
    <section className="card mx-auto w-full max-w-md p-5">
      {/* Erdi koç (WP-66): sınav girişinde düşünceli, tek cümle. */}
      <CoachBubble moment="exam_intro" mood="think" size={48} className="mb-3" />
      <p className="muted text-xs font-semibold uppercase tracking-wide" lang="de">
        {module === null ? `${level} · Niveauprüfung` : `Modulprüfung ${cover?.code ?? `${level}.${module + 1}`}`}
      </p>
      <h1 className="mt-1 text-2xl font-bold leading-tight" lang="de">
        {cover?.titleDe ?? (module === null ? `Prüfung ${level}` : `Modul ${module + 1}`)}
      </h1>
      {cover?.titleTr ? <p className="text-base font-semibold" style={{ color: "var(--color-brand)" }}>{cover.titleTr}</p> : null}

      {cover?.focus.length ? (
        <div className="mt-4">
          <p className="muted text-xs font-semibold">Bu sınav şunları ölçüyor</p>
          <ul className="mt-1.5 space-y-1">
            {cover.focus.map((f, i) => (
              <li key={i} className="text-sm">
                <span className="font-semibold" lang="de">
                  {f.de}
                </span>
                <span className="muted"> — {f.tr}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-4 rounded-xl px-3.5 py-3 text-xs leading-relaxed surface-2">
        <p className="font-semibold">Kurallar</p>
        <p className="muted mt-1">
          {module === null ? "Yedi bölüm, 45 dakika" : "Yedi bölüme kadar, 25 dakika"}. Geri dönüş yok, ipucu yok, cevap sınav bitmeden gösterilmiyor. Geçme: toplam ≥ %70 ve her bölüm ≥ %50.
          Üretim bölümleri (cümle kurma, konuşma, yazma) puanın yarısını taşıyor.
        </p>
      </div>

      <button type="button" onClick={onStart} className="btn btn-primary mt-4 w-full px-5 py-3.5 text-base">
        Sınava başla
      </button>
      <Link href="/lessons" className="btn btn-ghost mt-2 w-full px-5 py-3 text-sm">
        Vazgeç
      </Link>
    </section>
  );
}

/** Dinleme diyaloğu: tek düğme bütün replikleri sırayla çalar. */
function DialogPlayer({ segments }: { segments: { speaker?: string; text: string }[] }) {
  const [at, setAt] = useState<number | null>(null);
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      stopSpeaking();
    };
  }, []);

  function playFrom(i: number) {
    if (i >= segments.length) return setAt(null);
    setAt(i);
    speakGerman(segments[i].text, () => {
      if (alive.current) playFrom(i + 1);
    });
  }

  return (
    <div className="mt-1 flex flex-col gap-2">
      <button
        type="button"
        onClick={() => (at === null ? playFrom(0) : (stopSpeaking(), setAt(null)))}
        className="btn btn-primary flex items-center justify-center gap-2 px-4 py-2.5 text-sm"
      >
        <SpeakerIcon size={16} />
        {at === null ? "Dialog abspielen · Diyaloğu dinle" : "Durdur"}
      </button>
      <div className="flex flex-wrap gap-1.5">
        {segments.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => playFrom(i)}
            className="chip px-2.5 py-1 text-xs"
            style={at === i ? { borderColor: "var(--color-brand)", color: "var(--color-brand)" } : undefined}
          >
            {s.speaker ?? `Teil ${i + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Cümle kurma maddesi: yazarak ya da parçaları sıralayarak. */
function ProduceCard({
  header,
  item,
  index,
  total,
  typed,
  onTyped,
  chunks,
  onChunks,
  onSubmit,
}: {
  header: React.ReactNode;
  item: ProduceExamItem;
  index: number;
  total: number;
  typed: string;
  onTyped: (v: string) => void;
  chunks: number[];
  onChunks: (v: number[]) => void;
  onSubmit: () => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [item.id]);

  const ready = item.mode === "order" ? chunks.length === (item.chunks?.length ?? 0) : typed.trim().split(/\s+/).filter(Boolean).length >= 2;

  return (
    <section className="card mx-auto w-full max-w-md p-5">
      {header}
      <p className="muted text-xs">
        {item.mode === "order" ? "Bringen Sie den Satz in die richtige Reihenfolge · Cümleyi doğru sıraya diz" : "Schreiben Sie den Satz auf Deutsch · Cümleyi Almanca yaz"}
      </p>
      <p className="mt-2 text-lg font-bold leading-snug">{item.prompt}</p>

      {item.mode === "order" ? (
        <>
          <div className="mt-4 min-h-[3.25rem] rounded-xl px-3 py-2.5 text-base font-semibold surface-2" lang="de">
            {chunks.length ? (
              <span className="flex flex-wrap gap-1.5">
                {chunks.map((c, i) => (
                  <button key={`${c}-${i}`} type="button" onClick={() => onChunks(chunks.filter((_, k) => k !== i))} className="chip px-2.5 py-1 text-sm">
                    {item.chunks![c]}
                  </button>
                ))}
              </span>
            ) : (
              <span className="muted text-sm font-normal">Parçalara dokunarak cümleyi kur.</span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.chunks!.map((c, i) =>
              chunks.includes(i) ? null : (
                <button key={`${c}-${i}`} type="button" onClick={() => onChunks([...chunks, i])} className="option px-3 py-2 text-sm font-semibold" lang="de">
                  {c}
                </button>
              ),
            )}
          </div>
        </>
      ) : (
        <textarea
          ref={ref}
          value={typed}
          onChange={(e) => onTyped(e.target.value)}
          rows={3}
          lang="de"
          spellCheck={false}
          placeholder="Auf Deutsch schreiben…"
          className="card mt-3 w-full resize-none px-4 py-3 text-base outline-none"
        />
      )}

      <button type="button" disabled={!ready} onClick={onSubmit} className="btn btn-primary mt-4 w-full px-5 py-3 text-sm disabled:opacity-50">
        {index + 1 === total ? "Bölümü bitir" : "Cevabı ver ve devam et"}
      </button>
      <p className="muted mt-2 text-center text-xs">
        {index + 1} / {total} · cevap sınav sonunda gösterilir
      </p>
    </section>
  );
}

/** Sonuç: puan, bölüm dökümü, yapabilirlik listesi, kaçırılan maddeler. */
function Result({
  result,
  level,
  moduleIndex,
  title,
  cando,
  focus,
  misses,
  showMisses,
  onToggleMisses,
  writingSample,
}: {
  result: ExamResult;
  level: CefrLevel;
  /** Modül sınavıysa modülün sırası; seviye sınavında null. */
  moduleIndex: number | null;
  title: string;
  cando: { de: string; tr: string; en: string }[];
  focus: { de: string; tr: string }[];
  misses: Miss[];
  showMisses: boolean;
  onToggleMisses: () => void;
  writingSample: string | null;
}) {
  return (
    <section className="card mx-auto w-full max-w-md p-5">
      <CoachBubble
        moment={result.passed ? "exam_pass" : "exam_fail"}
        mood={result.passed ? "cheer" : "sad"}
        vars={{ pct: result.total, level }}
        size={56}
        className="mb-3"
      />
      <p className="muted text-xs font-semibold uppercase tracking-wide">{title}</p>
      <h1 className="text-xl font-bold">{result.passed ? "Bestanden — geçtin!" : "Nicht bestanden — bu sefer olmadı"}</h1>
      <p className="muted mt-1 text-sm">
        Toplam <strong>%{result.total}</strong>
        {result.trial ? " · deneme (modül dersleri bitmeden sayılmaz)" : ""}
      </p>

      <ul className="mt-3 space-y-1.5">
        {result.sections.map((s) => (
          <li key={s.id}>
            <div className="flex items-center justify-between text-sm">
              <span>
                <span lang="de" className="font-semibold">
                  {SECTION_TITLE_DE[s.id]}
                </span>
                <span className="muted"> · {SECTION_TITLE[s.id]}</span>
                <span className="muted text-xs"> (ağırlık %{s.weight})</span>
              </span>
              <span className="tabular-nums" style={{ color: s.pct >= 50 ? "var(--text)" : "var(--color-rose)" }}>
                %{s.pct}
              </span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full surface-2">
              <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.pct >= 50 ? "var(--color-brand)" : "var(--color-rose)" }} />
            </div>
          </li>
        ))}
      </ul>

      {cando.length ? (
        <div className="mt-4 rounded-xl px-3.5 py-3 surface-2">
          <p className="text-sm font-bold">{result.passed ? "Artık şunları yapabiliyorsun" : "Bu sınav şunları ölçüyordu"}</p>
          <ul className="mt-2 space-y-2">
            {cando.map((c, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="mt-0.5 shrink-0" style={{ color: result.passed ? "var(--color-mint)" : "var(--text-muted)" }}>
                  <CheckIcon size={14} />
                </span>
                <span>
                  <span className="block font-semibold" lang="de">
                    {c.de}
                  </span>
                  <span className="muted block text-xs">{c.tr}</span>
                  <span className="muted block text-xs opacity-70" lang="en">
                    {c.en}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : focus.length ? (
        <p className="muted mt-3 text-xs">Ölçülen yapılar: {focus.map((f) => f.de).join(", ")}</p>
      ) : null}

      {misses.length ? (
        <div className="mt-3">
          <button type="button" onClick={onToggleMisses} className="btn btn-ghost w-full px-4 py-2.5 text-sm">
            {showMisses ? "Dökümü kapat" : `Kaçırdığın ${misses.length} madde`}
          </button>
          {showMisses ? (
            <ul className="mt-2 space-y-2.5">
              {misses.map((m, i) => (
                <li key={i} className="rounded-xl px-3 py-2.5 text-sm surface-2">
                  <p className="muted text-xs font-semibold">
                    <span lang="de">{SECTION_TITLE_DE[m.section]}</span> · {SECTION_TITLE[m.section]}
                  </p>
                  <p className="mt-0.5">{m.prompt}</p>
                  <p className="mt-1 font-semibold" lang="de" style={{ color: "var(--color-mint)" }}>
                    {m.answer}
                  </p>
                  {m.given ? (
                    <p className="muted text-xs">
                      Senin cevabın: <span lang="de">{m.given}</span>
                    </p>
                  ) : null}
                  {m.section === "produce" && m.given ? (
                    <p className="mt-1 text-xs">
                      <TokenDiff tokens={matchSentence(m.given, m.answer).target} />
                    </p>
                  ) : null}
                  {m.why ? <p className="muted mt-1 text-xs">{m.why}</p> : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {showMisses && writingSample ? (
        <div className="mt-2 rounded-xl px-3 py-2.5 text-sm surface-2">
          <p className="muted text-xs font-semibold">Yazma bölümü · örnek cevap</p>
          <p className="mt-1 whitespace-pre-line text-xs" lang="de">
            {writingSample}
          </p>
        </div>
      ) : null}

      {result.passed && !result.trial ? (
        <a href={`/api/certificate/${result.id}`} target="_blank" rel="noreferrer" className="btn btn-primary mt-4 w-full px-5 py-3 text-sm">
          Sertifikayı aç
        </a>
      ) : (
        <p className="muted mt-3 text-xs">Zayıf bölüm için profilde &quot;Zayıf noktaların&quot; ve &quot;Sıradaki en iyi adım&quot; var.</p>
      )}
      <Link href="/lessons" className="btn btn-ghost mt-2 w-full px-5 py-3 text-sm">
        Derslere dön
      </Link>
      {/*
        Hız turunun tek girişi burası. Eskiden yol haritasında, modül
        sınavının hemen altındaydı ve orada ikinci bir sınav gibi okunuyordu —
        oysa altmış saniyede on beş kelime bir şey KANITLAMIYOR; sınav
        revizyonunun kaldırdığı "sadece kelime" ölçümünü geri davet ediyordu.
        Sınavdan SONRA ise yeri doğru: ölçüm bitti, bu bir oyun.
      */}
      {moduleIndex !== null ? (
        <Link
          href={`/lessons/sinav/${level}/${moduleIndex}`}
          className="muted mt-2 block text-center text-xs font-semibold underline-offset-2 hover:underline"
        >
          Oyun: hız turu · modülün kelimeleri, 60 sn
        </Link>
      ) : null}
    </section>
  );
}

/* Kelime turunda kaçırılan maddenin dökümde görünecek hâli. */
function wordPrompt(round: Round): string {
  if ("word" in round && round.word) return round.game === "translate" && "sentence" in round ? round.sentence.tr : round.word.tr;
  return "Kelime";
}
function wordAnswer(round: Round): string {
  if (round.game === "translate" && "sentence" in round) return round.sentence.de;
  if ("word" in round && round.word) return round.word.artikel ? `${round.word.artikel} ${round.word.de}` : round.word.de;
  return "";
}
