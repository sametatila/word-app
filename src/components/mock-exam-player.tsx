"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { speakGerman, speakSegments, stopSpeaking } from "@/components/speak-button";
import { SpeakerIcon, MicIcon, CheckIcon } from "@/components/icons";
import { captureClip } from "@/lib/pronounce-client";
import { taskSeconds, type MockItem, type MockPaper, type MockPart, type MockStimulus, type MockTask } from "@/lib/mock-exams";
import { MOCK_PASS_PCT } from "@/lib/mock-exams/types";
import { foldAnswer, isOpenTask } from "@/lib/mock-exams/scoring";

/**
 * Deneme sınavı oynatıcısı — web.
 *
 * Mobil oynatıcıyla AYNI oturum kuralları: saat görev başına işler, süre
 * dolunca bir sonraki göreve otomatik geçilir, bitmiş bir göreve geri
 * dönülmez. Yönergeler sesle okunur, cevaplar sunucuya anlık kaydedilir ve
 * puan sunucuda hesaplanır (`/api/mock-exam`).
 *
 * TEK FARK KONUŞMADA. Mobilde konuşma cihazın tanıyıcısıyla (STT) yazıya
 * çevriliyor; tarayıcıda konuşma tanıma platformdan platforma değiştiği için
 * burada karşı tarafın replikleri yine sesle okunuyor ama cevap YAZILIYOR.
 * Değerlendirmeye giden şey iki uçta da aynı: dökümün kendisi.
 */

type Answers = Record<string, string>;
type OpenScore = { score: number | null; tip?: string; praise?: string; errors?: { wrong?: string; right?: string; why_tr?: string }[] };
type Attempt = { id: number; answers: Answers; open: Record<string, string>; openScores: Record<string, OpenScore>; taskIx: number; secondsLeft: number };
type Todo = { title: string; why: string; how: string };
type Feedback = { summary: string; strengths: string[]; todo: Todo[]; source: "ai" | "rules" };
type ScoredItem = { id: string; no: number; goal: string; correct: boolean; given: string; expected: string };
type Score = {
  correct: number; total: number; pct: number; passed: boolean;
  byGoal: { goal: string; correct: number; total: number }[];
  items: ScoredItem[];
};

const GOAL_TR: Record<string, string> = {
  gist: "Ana fikri yakalama",
  detail: "Tek bir bilgiyi bulma",
  opinion: "Tutum ve görüş ayırt etme",
  orientation: "Hangi ilan kime uyar",
  instruction: "Kural ve yönerge okuma",
  structure: "Metnin bağdaşıklığı",
  production: "Kendi metnini kurma",
  interaction: "Karşılıklı iletişim",
};

const mmss = (s: number) => `${String(Math.floor(Math.max(0, s) / 60)).padStart(2, "0")}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const withBlanks = (b: string) => b.replace(/\{\{(\d+)\}\}/g, (_m, n) => ` (${n}) ______ `);

function boolLabels(task: MockTask): [string, string] {
  return task.format === "yesno" ? ["Ja", "Nein"] : ["Richtig", "Falsch"];
}

function isCorrect(item: MockItem, ans: string | undefined): boolean {
  if (!ans?.trim()) return false;
  if (item.kind === "mcq") return Number(ans) === item.answer;
  if (item.kind === "bool") return (ans === "true") === item.answer;
  if (item.kind === "match") return ans === item.answer;
  return item.accept.some((a) => foldAnswer(a) === foldAnswer(ans));
}

async function post<T>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/mock-exam", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(String(res.status));
  return (await res.json()) as T;
}

export function MockExamPlayer({ paper, part }: { paper: MockPaper; part: MockPart }) {
  const budgets = useMemo(() => taskSeconds(part), [part]);
  const [phase, setPhase] = useState<"cover" | "run" | "result">("cover");
  const [ix, setIx] = useState(0);
  const [left, setLeft] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [open, setOpen] = useState<Record<string, string>>({});
  const [openScores, setOpenScores] = useState<Record<string, OpenScore>>({});
  const [plays, setPlays] = useState<Record<string, number>>({});
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [resumed, setResumed] = useState(false);
  const [autoNext, setAutoNext] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ score: Score; ai: Feedback | null; offline: boolean } | null>(null);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const announced = useRef<Set<string>>(new Set());
  useEffect(() => () => stopSpeaking(), []);

  const announce = useCallback((key: string, text: string) => {
    if (announced.current.has(key)) return;
    announced.current.add(key);
    speakGerman(text);
  }, []);

  useEffect(() => {
    if (phase !== "run") return;
    const id = setInterval(() => setLeft((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const advance = useCallback((auto: boolean) => {
    stopSpeaking();
    setAutoNext(auto);
    if (ix >= part.tasks.length - 1) { setPhase("result"); return; }
    const next = ix + 1;
    setIx(next);
    setLeft(budgets[next] ?? 60);
    if (attempt) void post({ action: "save", id: attempt.id, answers, open, taskIx: next, secondsLeft: budgets[next] ?? 60 }).catch(() => {});
  }, [ix, part.tasks.length, budgets, attempt, answers, open]);

  useEffect(() => {
    if (phase === "run" && left === 0) advance(true);
  }, [left, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Anlık kayıt: her değişiklikten iki saniye sonra.
  useEffect(() => {
    if (!attempt || phase !== "run") return;
    const id = setTimeout(() => { void post({ action: "save", id: attempt.id, answers, open, taskIx: ix, secondsLeft: left }).catch(() => {}); }, 2000);
    return () => clearTimeout(id);
  }, [answers, open, attempt, phase, ix]); // eslint-disable-line react-hooks/exhaustive-deps

  async function begin() {
    setBusy(true);
    try {
      const d = await post<{ attempt: Attempt; resumed: boolean }>({ action: "start", paper: paper.id, skill: part.skill });
      setAttempt(d.attempt);
      setResumed(d.resumed);
      setAnswers(d.attempt.answers ?? {});
      setOpen(d.attempt.open ?? {});
      setOpenScores(d.attempt.openScores ?? {});
      const start = Math.min(d.attempt.taskIx ?? 0, part.tasks.length - 1);
      setIx(start);
      setLeft(d.resumed && d.attempt.secondsLeft > 0 ? d.attempt.secondsLeft : budgets[start] ?? 60);
    } catch {
      setAttempt(null);
      setIx(0);
      setLeft(budgets[0] ?? 60);
    }
    setBusy(false);
    setPhase("run");
  }

  useEffect(() => {
    if (phase !== "result" || result) return;
    let dead = false;
    void (async () => {
      setBusy(true);
      if (attempt) {
        try {
          const d = await post<{ score: Score; ai: Feedback }>({ action: "finish", id: attempt.id, answers });
          if (!dead) setResult({ score: d.score, ai: d.ai ?? null, offline: false });
        } catch {
          if (!dead) setResult({ score: localScore(part, answers), ai: null, offline: true });
        }
      } else {
        setResult({ score: localScore(part, answers), ai: null, offline: true });
      }
      if (!dead) setBusy(false);
    })();
    return () => { dead = true; };
  }, [phase, result, attempt, answers, part]);

  const task = part.tasks[ix];

  if (phase === "cover") {
    const points = part.tasks.reduce((a, x) => a + (isOpenTask(x) ? 0 : x.items.length), 0);
    return (
      <section className="card mx-auto w-full max-w-2xl p-5">
        <p className="muted text-xs font-bold tracking-wide">{paper.level} · Deneme {paper.no}</p>
        <h1 className="mt-1 text-2xl font-bold" lang="de">{SKILL_DE[part.skill]}</h1>
        <p className="muted mt-1 text-sm">{paper.theme} — {paper.themeTr}</p>

        <div className="mt-4 flex items-start gap-2">
          <SpeakerIcon className="mt-1 size-4 shrink-0" />
          <div>
            <p className="text-sm leading-relaxed" lang="de">{part.instruction}</p>
            <p className="muted mt-2 text-sm leading-relaxed">{part.instructionTr}</p>
          </div>
        </div>

        <p className="muted mt-4 text-xs">{part.minutes} dakika · {points ? `${points} madde` : "puanlanmaz"}</p>
        <p className="muted mt-3 text-xs leading-relaxed">
          Her görevin kendi süresi var. Süre dolunca bir sonraki göreve otomatik geçilir ve bitmiş bir göreve geri
          dönülemez. Cevapların her an kaydedilir; sınav yarıda kalırsa kaldığın yerden devam edersin.
        </p>

        <button
          type="button"
          className="btn btn-primary mt-5 w-full py-3 text-sm"
          disabled={busy}
          onClick={() => { announce(`part:${part.skill}`, part.instruction); void begin(); }}
        >
          {busy ? "Başlatılıyor…" : "Bölüme başla"}
        </button>
      </section>
    );
  }

  if (phase === "result") {
    if (busy || !result) {
      return (
        <section className="card mx-auto w-full max-w-2xl p-5" aria-busy>
          <p className="muted text-sm">Puanlanıyor…</p>
          <div className="mt-3 h-10 animate-pulse rounded-xl surface-2" />
        </section>
      );
    }
    return <Result paper={paper} part={part} answers={answers} open={open} openScores={openScores} result={result} reveal={reveal} onReveal={(id) => setReveal((r) => ({ ...r, [id]: true }))} />;
  }

  return (
    <section className="mx-auto w-full max-w-2xl">
      <header className="card flex items-center justify-between gap-3 p-4">
        <div>
          <p className="muted text-xs font-bold tracking-wide">{paper.level} · {SKILL_DE[part.skill]}</p>
          <p className="text-sm font-semibold">Görev {ix + 1}/{part.tasks.length}</p>
        </div>
        <p className="text-lg font-bold tabular-nums" style={{ color: left < 30 ? "var(--color-danger)" : undefined }}>{mmss(left)}</p>
      </header>

      <div className="mt-2 flex gap-1" aria-hidden>
        {part.tasks.map((tk, i) => (
          <span key={tk.id} className="h-1 flex-1 rounded-full" style={{ background: i < ix ? "var(--color-success)" : i === ix ? "var(--color-brand)" : "var(--surface-2)" }} />
        ))}
      </div>

      {autoNext ? <p className="mt-2 text-xs" style={{ color: "var(--color-danger)" }}>Süre doldu; bir sonraki göreve geçildi.</p> : null}
      {resumed && ix === (attempt?.taskIx ?? 0) ? <p className="muted mt-2 text-xs">Yarım kalan sınavın kaldığı yerden açıldı.</p> : null}

      <TaskView
        key={task.id}
        task={task}
        answers={answers}
        open={open}
        openScores={openScores}
        plays={plays}
        attemptId={attempt?.id ?? null}
        onAnnounce={() => announce(`task:${task.id}`, task.prompt)}
        onAnswer={(id, v) => setAnswers((a) => ({ ...a, [id]: v }))}
        onOpen={(id, v) => setOpen((o) => ({ ...o, [id]: v }))}
        onOpenScore={(id, v) => setOpenScores((s) => ({ ...s, [id]: v }))}
        onPlay={(st) => {
          const used = plays[st.id] ?? 0;
          if (used >= st.plays) return;
          setPlays((p) => ({ ...p, [st.id]: used + 1 }));
          speakSegments(st.segments.map((s) => ({ lang: "de" as const, text: s.text })));
        }}
      />

      <div className="card mt-3 p-4">
        <p className="muted text-xs">Gerçek sınavda olduğu gibi bitmiş bir göreve geri dönülemez.</p>
        <button type="button" className="btn btn-primary mt-2 w-full py-3 text-sm" onClick={() => advance(false)}>
          {ix < part.tasks.length - 1 ? "Sonraki görev" : "Bitir ve sonucu gör"}
        </button>
      </div>
    </section>
  );
}

const SKILL_DE: Record<string, string> = { reading: "Lesen", listening: "Hören", writing: "Schreiben", speaking: "Sprechen" };

function localScore(part: MockPart, answers: Answers): Score {
  const items: ScoredItem[] = [];
  const goals = new Map<string, { correct: number; total: number }>();
  for (const task of part.tasks) {
    if (isOpenTask(task)) continue;
    for (const it of task.items) {
      const ok = isCorrect(it, answers[it.id]);
      const g = goals.get(task.goal) ?? { correct: 0, total: 0 };
      g.total++;
      if (ok) g.correct++;
      goals.set(task.goal, g);
      items.push({ id: it.id, no: it.no, goal: task.goal, correct: ok, given: answers[it.id] ?? "", expected: expected(it, task) });
    }
  }
  const total = items.length;
  const correct = items.filter((i) => i.correct).length;
  const pct = total ? Math.round((100 * correct) / total) : 0;
  return { correct, total, pct, passed: total > 0 && pct >= MOCK_PASS_PCT, byGoal: [...goals.entries()].map(([goal, v]) => ({ goal, ...v })), items };
}

function expected(item: MockItem, task: MockTask): string {
  if (item.kind === "mcq") return item.options[item.answer] ?? "";
  if (item.kind === "bool") return item.answer ? "richtig" : "falsch";
  if (item.kind === "match") {
    const o = task.options?.find((x) => x.key === item.answer);
    return o ? `${o.key}) ${o.label}` : item.answer;
  }
  return item.accept[0];
}

/* ── görev ────────────────────────────────────────────────────────────────── */

function TaskView({
  task, answers, open, openScores, plays, attemptId, onAnnounce, onAnswer, onOpen, onOpenScore, onPlay,
}: {
  task: MockTask;
  answers: Answers;
  open: Record<string, string>;
  openScores: Record<string, OpenScore>;
  plays: Record<string, number>;
  attemptId: number | null;
  onAnnounce: () => void;
  onAnswer: (id: string, v: string) => void;
  onOpen: (id: string, v: string) => void;
  onOpenScore: (id: string, v: OpenScore) => void;
  onPlay: (st: Extract<MockStimulus, { kind: "audio" }>) => void;
}) {
  useEffect(() => { onAnnounce(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const grouped = (task.texts ?? []).length > 1 && task.items.some((i) => i.ref);
  const itemsOf = (ref?: string) => (grouped ? task.items.filter((i) => i.ref === ref) : task.items);

  return (
    <div className="mt-3 space-y-3">
      <div className="card p-4">
        <p className="text-sm leading-relaxed" lang="de">{task.prompt}</p>
        <p className="muted mt-2 text-sm leading-relaxed">{task.promptTr}</p>
      </div>

      {task.options?.length ? (
        <div className="card p-4">
          {task.options.map((o) => (
            <div key={o.key} className="mt-2 first:mt-0">
              <p className="text-sm font-semibold" lang="de">{o.key}) {o.label}</p>
              {o.body ? <p className="muted text-sm leading-relaxed" lang="de">{o.body}</p> : null}
            </div>
          ))}
        </div>
      ) : null}

      {(task.texts ?? []).map((st) => (
        <div key={st.id} className="space-y-3">
          <Stimulus st={st} plays={plays} onPlay={onPlay} />
          {grouped ? itemsOf(st.id).map((it) => <Item key={it.id} item={it} task={task} value={answers[it.id]} onAnswer={onAnswer} />) : null}
        </div>
      ))}

      {!grouped ? task.items.map((it) => <Item key={it.id} item={it} task={task} value={answers[it.id]} onAnswer={onAnswer} />) : null}

      {task.format === "writing" ? (
        <OpenTask task={task} value={open[task.id] ?? ""} score={openScores[task.id]} attemptId={attemptId} onOpen={onOpen} onOpenScore={onOpenScore} />
      ) : task.format === "speaking" ? (
        <SpeakingTask task={task} value={open[task.id] ?? ""} score={openScores[task.id]} attemptId={attemptId} onOpen={onOpen} onOpenScore={onOpenScore} />
      ) : null}
    </div>
  );
}

function Stimulus({ st, plays, onPlay }: { st: MockStimulus; plays: Record<string, number>; onPlay: (st: Extract<MockStimulus, { kind: "audio" }>) => void }) {
  if (st.kind === "text") {
    return (
      <div className="card p-4">
        <p className="muted text-xs font-bold tracking-wide">{st.genre} · {st.genreTr}</p>
        {st.title ? <p className="mt-1 text-sm font-semibold" lang="de">{st.title}</p> : null}
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed" lang="de">{withBlanks(st.body)}</p>
      </div>
    );
  }
  const rest = st.plays - (plays[st.id] ?? 0);
  return (
    <div className="card p-4">
      <p className="muted text-xs font-bold tracking-wide">{st.genre} · {st.genreTr}</p>
      {st.title ? <p className="mt-1 text-sm font-semibold" lang="de">{st.title}</p> : null}
      <p className="muted mt-1 text-sm leading-relaxed">{st.situation}</p>
      <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-sm" disabled={rest <= 0} onClick={() => onPlay(st)}>
        <SpeakerIcon className="size-4" /> {rest <= 0 ? "Dinleme hakkın bitti" : rest === st.plays ? "Dinle" : "Tekrar dinle"}
      </button>
      {rest > 0 ? <p className="muted mt-1 text-xs">{rest} dinleme hakkı kaldı</p> : null}
    </div>
  );
}

function Item({ item, task, value, onAnswer }: { item: MockItem; task: MockTask; value?: string; onAnswer: (id: string, v: string) => void }) {
  const [yes, no] = boolLabels(task);
  const chip = (label: string, active: boolean, onClick: () => void, key: string) => (
    <button
      key={key}
      type="button"
      onClick={onClick}
      className="rounded-xl px-3 py-2 text-left text-sm"
      style={{ background: active ? "var(--color-brand-soft)" : "var(--surface-2)", border: `1px solid ${active ? "var(--color-brand)" : "transparent"}` }}
    >
      {label}
    </button>
  );
  return (
    <div className="card p-4">
      <p className="text-sm font-semibold leading-relaxed" lang="de">{item.no}. {item.text}</p>
      <div className="mt-2 flex flex-col gap-2">
        {item.kind === "mcq"
          ? item.options.map((o, i) => chip(`${"abcd"[i] ?? i + 1}) ${o}`, value === String(i), () => onAnswer(item.id, String(i)), String(i)))
          : item.kind === "bool"
            ? <div className="flex gap-2">{chip(yes, value === "true", () => onAnswer(item.id, "true"), "t")}{chip(no, value === "false", () => onAnswer(item.id, "false"), "f")}</div>
            : item.kind === "match"
              ? <div className="flex flex-wrap gap-2">{(task.options ?? []).map((o) => chip(o.key, value === o.key, () => onAnswer(item.id, o.key), o.key))}</div>
              : (
                <input
                  value={value ?? ""}
                  onChange={(e) => onAnswer(item.id, e.target.value)}
                  className="input w-full"
                  placeholder="Buraya yaz"
                  lang="de"
                  autoComplete="off"
                />
              )}
      </div>
    </div>
  );
}

/** Yazma görevi: içerik noktaları, canlı kelime sayacı, rubrik değerlendirmesi. */
function OpenTask({
  task, value, score, attemptId, onOpen, onOpenScore,
}: {
  task: MockTask;
  value: string;
  score?: OpenScore;
  attemptId: number | null;
  onOpen: (id: string, v: string) => void;
  onOpenScore: (id: string, v: OpenScore) => void;
}) {
  const [busy, setBusy] = useState(false);
  const n = words(value);
  const need = task.rubric?.minWords ?? 0;

  async function evaluate() {
    if (busy || !attemptId || n < 5) return;
    setBusy(true);
    try {
      const d = await post<{ result: OpenScore }>({ action: "assess", id: attemptId, taskId: task.id, text: value.trim() });
      onOpenScore(task.id, d.result);
    } catch {
      onOpenScore(task.id, { score: null });
    }
    setBusy(false);
  }

  return (
    <div className="card p-4">
      <p className="muted text-xs font-bold tracking-wide">İÇERİK NOKTALARI</p>
      {(task.rubric?.points ?? []).map((p, i) => (
        <div key={i} className="mt-2">
          <p className="text-sm" lang="de">• {p.de}</p>
          <p className="muted text-sm">{p.tr}</p>
        </div>
      ))}

      <textarea
        value={value}
        onChange={(e) => onOpen(task.id, e.target.value)}
        rows={8}
        className="input mt-4 w-full"
        placeholder="Buraya yaz"
        lang="de"
      />
      <p className="muted mt-1 text-xs">{need ? `${n} / ${need} kelime` : `${n} kelime`}</p>

      {score ? (
        <OpenResult score={score} />
      ) : (
        <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-sm" disabled={busy || !attemptId || n < 5} onClick={() => void evaluate()}>
          {busy ? "Değerlendiriliyor…" : "Değerlendir"}
        </button>
      )}
      {!attemptId ? <p className="muted mt-2 text-xs">Değerlendirme için giriş ve bağlantı gerekiyor.</p> : null}
    </div>
  );
}

/**
 * Konuşma görevi — web, fazlı.
 *
 * Mobil oynatıcıyla aynı akış: hazırlık sayacı → karşı tarafın repliği sesle
 * okunur → sıra sana gelince mikrofon açılır → söylenen yazıya çevrilir.
 * Tarayıcı da mikrofonu kullanabiliyor (uygulama PWA olarak kuruluyor ve
 * lernomi.app HTTPS): ses `getUserMedia` ile kaydediliyor ve `/api/stt`
 * üzerinden yazıya çevriliyor — yürüyüş modunun kullandığı aynı zincir.
 *
 * DÖKÜM DÜZENLENEBİLİR. Tanıyıcı yanılabiliyor ve değerlendirilen şey döküm.
 * Bu yüzden metin bir alana yazılıyor ve öğrenci düzeltebiliyor; mikrofon hiç
 * çalışmazsa aynı alana doğrudan yazılabiliyor. Ses hiçbir yerde saklanmıyor.
 */
function SpeakingTask({
  task, value, score, attemptId, onOpen, onOpenScore,
}: {
  task: MockTask;
  value: string;
  score?: OpenScore;
  attemptId: number | null;
  onOpen: (id: string, v: string) => void;
  onOpenScore: (id: string, v: OpenScore) => void;
}) {
  const [step, setStep] = useState<"bekleme" | "hazirlik" | "konusma" | "bitti">("bekleme");
  const [turn, setTurn] = useState(0);
  const [count, setCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [micErr, setMicErr] = useState(false);
  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; }, []);

  const exchange = task.exchange ?? [];
  const prep = task.prepSeconds ?? 60;

  useEffect(() => {
    if (step !== "hazirlik" && step !== "konusma") return;
    if (count <= 0) return;
    const id = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [step, count]);

  /** Karşı tarafın repliğini okur ve bitince döner. */
  const say = (text: string) =>
    new Promise<void>((resolve) => {
      let done = false;
      const finish = () => { if (!done) { done = true; resolve(); } };
      // Ses hiç çalmazsa görev asılı kalmasın: üst sınır konuşma uzunluğuna göre.
      const guard = setTimeout(finish, Math.min(30_000, 2500 + text.length * 90));
      speakGerman(text, () => { clearTimeout(guard); finish(); });
    });

  /** Bir turluk kayıt → `/api/stt` → düz metin. */
  async function listen(seconds: number): Promise<string> {
    const cap = await captureClip(seconds * 1000 + 500);
    if (!cap) { setMicErr(true); return ""; }
    setCount(seconds);
    await new Promise<void>((r) => setTimeout(r, seconds * 1000));
    const blob = await cap.stop();
    if (!blob) return "";
    const form = new FormData();
    const ext = blob.type.includes("wav") ? "wav" : blob.type.includes("mp4") ? "mp4" : blob.type.includes("ogg") ? "ogg" : "webm";
    form.append("audio", blob, `clip.${ext}`);
    form.append("language", "de");
    try {
      const res = await fetch("/api/stt", { method: "POST", body: form });
      if (!res.ok) return "";
      // Güven eşiği UYGULANMIYOR: yürüyüş modunda düşük güvenli metin yanlış
      // bir cevabı doğru sayabilirdi, burada metin zaten düzenlenebilir ve
      // eksik bir döküm hiç dökümden iyidir.
      const d = (await res.json()) as { text?: string };
      return (d.text ?? "").trim();
    } catch {
      return "";
    }
  }

  async function run() {
    setStep("konusma");
    const said: string[] = [];
    if (!exchange.length) {
      const got = await listen(task.speakSeconds ?? 120);
      if (got) said.push(got);
    } else {
      for (const [i, tn] of exchange.entries()) {
        if (!alive.current) return;
        setTurn(i);
        if (tn.who === "partner") {
          setCount(0);
          await say(tn.de);
        } else {
          const got = await listen(tn.seconds);
          said.push(`(${tn.expect}) ${got}`.trim());
        }
      }
    }
    if (!alive.current) return;
    onOpen(task.id, said.join("\n"));
    setStep("bitti");
  }

  // Hazırlık bitince kendiliğinden konuşmaya geçer — dijital oturumda fazlar
  // otomatik akar.
  useEffect(() => {
    if (step === "hazirlik" && count === 0) void run();
  }, [step, count]); // eslint-disable-line react-hooks/exhaustive-deps

  async function evaluate() {
    const text = value.trim();
    if (busy || !attemptId || text.length < 5) return;
    setBusy(true);
    try {
      const d = await post<{ result: OpenScore }>({ action: "assess", id: attemptId, taskId: task.id, text });
      onOpenScore(task.id, d.result);
    } catch {
      onOpenScore(task.id, { score: null });
    }
    setBusy(false);
  }

  const current = exchange[turn];
  return (
    <div className="card p-4">
      <p className="muted text-xs font-bold tracking-wide">İÇERİK NOKTALARI</p>
      {(task.rubric?.points ?? []).map((p, i) => (
        <div key={i} className="mt-2">
          <p className="text-sm" lang="de">• {p.de}</p>
          <p className="muted text-sm">{p.tr}</p>
        </div>
      ))}

      {step === "bekleme" ? (
        <>
          <p className="muted mt-4 text-sm leading-relaxed">
            {exchange.length
              ? `Karşılıklı konuşma: ${exchange.filter((x) => x.who === "you").length} kez sıra sana gelecek. Önce ${prep} saniye hazırlık süren var.`
              : `Önce ${prep} saniye hazırlık, sonra ${task.speakSeconds ?? 120} saniye konuşma.`}
          </p>
          <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-sm" onClick={() => { setCount(prep); setStep("hazirlik"); }}>
            <MicIcon className="size-4" /> Konuşmaya başla
          </button>
          <button type="button" className="btn btn-ghost ml-2 mt-3 px-4 py-2 text-sm" onClick={() => setStep("bitti")}>
            Mikrofonsuz yaz
          </button>
        </>
      ) : step === "hazirlik" ? (
        <div className="mt-4 text-center">
          <p className="muted text-xs font-bold tracking-wide">HAZIRLIK</p>
          <p className="text-3xl font-bold tabular-nums" style={{ color: "var(--color-brand)" }}>{mmss(count)}</p>
          <p className="muted mt-1 text-sm">Ne söyleyeceğini planla. Süre bitince mikrofon kendiliğinden açılacak.</p>
        </div>
      ) : step === "konusma" ? (
        <div className="mt-4">
          {current?.who === "partner" ? (
            <>
              <p className="muted text-xs font-bold tracking-wide">KARŞI TARAF</p>
              <p className="mt-1 text-sm leading-relaxed" lang="de">{current.de}</p>
              <p className="muted mt-1 text-sm">{current.tr}</p>
            </>
          ) : (
            <div className="text-center">
              <MicIcon className="mx-auto size-6" style={{ color: "var(--color-danger)" }} />
              <p className="mt-1 text-sm font-bold" style={{ color: "var(--color-danger)" }}>Şimdi konuş · {mmss(count)}</p>
              <p className="muted mt-1 text-sm">{current?.who === "you" ? current.hint : "Görevi baştan sona anlat."}</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <p className="muted mt-4 text-xs font-bold tracking-wide">SÖYLEDİKLERİN</p>
          <textarea
            value={value}
            onChange={(e) => onOpen(task.id, e.target.value)}
            rows={8}
            className="input mt-1 w-full"
            placeholder="Söylediklerin buraya gelir; mikrofon çalışmadıysa doğrudan yazabilirsin."
            lang="de"
          />
          <p className="muted mt-1 text-xs leading-relaxed">
            {micErr
              ? "Mikrofon açılamadı. Cevabını yazarak verebilirsin."
              : "Metin konuşma tanıyıcısından geldi; yanlış yazılan yerleri düzeltebilirsin. Ses hiçbir yerde saklanmıyor."}
          </p>
          {score ? (
            <OpenResult score={score} />
          ) : (
            <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-sm" disabled={busy || !attemptId || value.trim().length < 5} onClick={() => void evaluate()}>
              {busy ? "Değerlendiriliyor…" : "Değerlendir"}
            </button>
          )}
          {!attemptId ? <p className="muted mt-2 text-xs">Değerlendirme için giriş ve bağlantı gerekiyor.</p> : null}
        </>
      )}
    </div>
  );
}

function OpenResult({ score }: { score: OpenScore }) {
  if (score.score == null) {
    return <p className="muted mt-3 text-sm leading-relaxed">Yapay zekâ değerlendirmesi şu an kullanılamıyor. Metnini ölçütlere ve örnek cevaba göre kendin oku.</p>;
  }
  return (
    <div className="mt-3">
      <p className="text-lg font-bold" style={{ color: score.score >= 60 ? "var(--color-success)" : "var(--color-danger)" }}>%{score.score}</p>
      {score.praise ? <p className="muted mt-1 text-sm leading-relaxed">{score.praise}</p> : null}
      {score.tip ? <p className="mt-1 text-sm leading-relaxed">{score.tip}</p> : null}
      {(score.errors ?? []).slice(0, 5).map((e, i) => (
        <p key={i} className="muted mt-1 text-sm">{e.wrong} → {e.right}{e.why_tr ? ` · ${e.why_tr}` : ""}</p>
      ))}
    </div>
  );
}

/* ── sonuç ────────────────────────────────────────────────────────────────── */

function Result({
  paper, part, answers, open, openScores, result, reveal, onReveal,
}: {
  paper: MockPaper;
  part: MockPart;
  answers: Answers;
  open: Record<string, string>;
  openScores: Record<string, OpenScore>;
  result: { score: Score; ai: Feedback | null; offline: boolean };
  reveal: Record<string, boolean>;
  onReveal: (id: string) => void;
}) {
  const { score, ai, offline } = result;
  return (
    <section className="mx-auto w-full max-w-2xl space-y-3">
      {offline ? (
        <p className="card p-4 text-sm" style={{ color: "var(--color-danger)" }}>
          Bağlantı ya da oturum yok: bu sonuç kaydedilmedi ve istatistiğe girmedi.
        </p>
      ) : null}

      {score.total > 0 ? (
        <div className="card p-5">
          <p className="muted text-xs font-bold tracking-wide">SONUÇ</p>
          <div className="mt-1 flex items-end justify-between">
            <p className="text-3xl font-bold" style={{ color: score.passed ? "var(--color-success)" : "var(--color-danger)" }}>%{score.pct}</p>
            <p className="text-sm font-semibold">{score.correct}/{score.total} doğru</p>
          </div>
          <p className="mt-2 text-sm font-semibold" style={{ color: score.passed ? "var(--color-success)" : "var(--color-danger)" }}>
            {score.passed ? "Geçtin" : "Geçemedin"}
          </p>
          <p className="muted text-xs">Geçme eşiği %{MOCK_PASS_PCT}.</p>
        </div>
      ) : (
        <p className="card p-4 text-sm leading-relaxed">
          Bu bölüm makinece puanlanmıyor. Metnini aşağıdaki ölçütlere ve örnek cevaba göre değerlendir.
        </p>
      )}

      {score.byGoal.length ? (
        <div className="card p-4">
          <p className="muted text-xs font-bold tracking-wide">ÖLÇÜM HEDEFLERİNE GÖRE</p>
          {score.byGoal.map((g) => {
            const pct = g.total ? Math.round((100 * g.correct) / g.total) : 0;
            return (
              <div key={g.goal} className="mt-3">
                <div className="flex justify-between text-sm">
                  <span>{GOAL_TR[g.goal] ?? g.goal}</span>
                  <span className="font-semibold">{g.correct}/{g.total}</span>
                </div>
                <div className="mt-1 h-1 rounded-full" style={{ background: "var(--surface-2)" }}>
                  <div className="h-1 rounded-full" style={{ width: `${pct}%`, background: pct >= 70 ? "var(--color-success)" : pct >= 50 ? "var(--color-brand)" : "var(--color-danger)" }} />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {ai ? (
        <div className="card p-4">
          <p className="muted text-xs font-bold tracking-wide">YAPILACAKLAR</p>
          <p className="mt-1 text-sm leading-relaxed">{ai.summary}</p>
          {ai.strengths.length ? <p className="mt-2 text-sm" style={{ color: "var(--color-success)" }}>İyi giden: {ai.strengths.join(" · ")}</p> : null}
          {ai.todo.map((td, i) => (
            <div key={i} className="mt-3 border-l-2 pl-3" style={{ borderColor: "var(--color-brand)" }}>
              <p className="text-sm font-semibold">{i + 1}. {td.title}</p>
              <p className="muted mt-0.5 text-sm">{td.why}</p>
              <p className="mt-1 text-sm leading-relaxed">{td.how}</p>
            </div>
          ))}
          {ai.source === "rules" ? <p className="muted mt-3 text-xs">Bu liste kural tabanlı üretildi.</p> : null}
        </div>
      ) : null}

      <h2 className="pt-2 text-lg font-bold">Çözümler</h2>

      {part.tasks.map((task) => (
        <div key={task.id} className="space-y-2">
          <p className="muted text-xs font-bold tracking-wide">Teil {task.no}</p>
          {isOpenTask(task) && task.rubric ? (
            <div className="card p-4">
              {(open[task.id] ?? "").trim() ? (
                <>
                  <p className="muted text-xs font-bold tracking-wide">SENİN CEVABIN</p>
                  <p className="mt-1 whitespace-pre-line text-sm leading-relaxed" lang="de">{open[task.id]}</p>
                </>
              ) : null}
              {openScores[task.id] ? <OpenResult score={openScores[task.id]} /> : null}
              <p className="muted mt-3 text-xs font-bold tracking-wide">NASIL DEĞERLENDİRİLİR</p>
              {task.rubric.criteria.map((c, i) => <p key={i} className="muted mt-1 text-sm leading-relaxed">• {c}</p>)}
              {reveal[task.id] ? (
                <>
                  <p className="muted mt-3 text-xs font-bold tracking-wide">ÖRNEK CEVAP</p>
                  <p className="mt-1 whitespace-pre-line text-sm leading-relaxed" lang="de">{task.rubric.sample}</p>
                </>
              ) : (
                <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-sm" onClick={() => onReveal(task.id)}>Örnek cevabı göster</button>
              )}
            </div>
          ) : (
            task.items.map((it) => {
              const s = score.items.find((x) => x.id === it.id);
              const ok = s ? s.correct : isCorrect(it, answers[it.id]);
              return (
                <div key={it.id} className="card flex gap-3 p-4">
                  <span
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: ok ? "var(--color-success-soft)" : "var(--color-danger-soft)", color: ok ? "var(--color-success)" : "var(--color-danger)" }}
                  >
                    {ok ? <CheckIcon className="size-3.5" /> : "×"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-relaxed" lang="de">{it.no}. {it.text}</p>
                    {!ok ? <p className="muted mt-1 text-sm">Senin cevabın: {s?.given || "boş"}</p> : null}
                    <p className="mt-1 text-sm" style={{ color: ok ? "var(--color-success)" : undefined }}>Doğru cevap: {s?.expected ?? expected(it, task)}</p>
                    <p className="muted mt-1 text-sm leading-relaxed">{it.explain}</p>
                  </div>
                </div>
              );
            })
          )}

          {(task.texts ?? []).map((st) =>
            st.kind === "audio" ? (
              <div key={st.id} className="card p-4">
                <p className="muted text-xs font-bold tracking-wide">KAYDIN METNİ · {st.genreTr}</p>
                {st.segments.map((sg, i) => (
                  <p key={i} className="mt-1 text-sm leading-relaxed" lang="de">{sg.speaker ? `${sg.speaker}: ` : ""}{sg.text}</p>
                ))}
              </div>
            ) : null,
          )}
        </div>
      ))}

      <Link href="/mock-exams" className="btn btn-primary mt-2 block w-full py-3 text-center text-sm">Listeye dön</Link>
    </section>
  );
}
