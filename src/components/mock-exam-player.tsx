"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { speakSegments, stopSpeaking } from "@/components/speak-button";
import { SpeakerIcon, MicIcon, CheckIcon, XIcon } from "@/components/icons";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { captureClip } from "@/lib/pronounce-client";
import { taskSeconds, type MockItem, type MockPaper, type MockPart, type MockStimulus, type MockTask } from "@/lib/mock-exams";
import { MOCK_PASS_PCT, mockBoolLabels, mockSkillLabel, type MockCourse } from "@/lib/mock-exams/types";
import { foldAnswer, isOpenTask } from "@/lib/mock-exams/scoring";
import { useT } from "@/lib/i18n/client";
import { track } from "@/lib/track";

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

/** Ölçüm hedefleri — mobilin `mockexam.goal_*` anahtarlarıyla aynı küme. */
const GOAL_KEYS: Record<string, string> = {
  gist: "mockexam.goal_gist",
  detail: "mockexam.goal_detail",
  opinion: "mockexam.goal_opinion",
  orientation: "mockexam.goal_orientation",
  instruction: "mockexam.goal_instruction",
  structure: "mockexam.goal_structure",
  production: "mockexam.goal_production",
  interaction: "mockexam.goal_interaction",
};

const mmss = (s: number) => `${String(Math.floor(Math.max(0, s) / 60)).padStart(2, "0")}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const withBlanks = (b: string) => b.replace(/\{\{(\d+)\}\}/g, (_m, n) => ` (${n}) ______ `);

/**
 * Kâğıdın dilinde tek bir replik okur.
 *
 * Eskiden `speakGerman` çağrılıyordu ve o, sesi KULLANICININ seçtiği kursa
 * göre seçiyor. Kâğıt ile profil ayrıldığı anda (Almanca kursundaki biri
 * İngilizce kâğıt açtığında) yönerge yanlış dilde okunurdu. Ses artık kâğıda
 * bağlı: sınavda ne yazıyorsa o okunuyor.
 */
function sayIn(course: MockCourse, text: string, onEnd?: () => void): void {
  speakSegments([{ lang: course, text }], onEnd);
}

function isCorrect(item: MockItem, ans: string | undefined): boolean {
  if (!ans?.trim()) return false;
  if (item.kind === "mcq") return Number(ans) === item.answer;
  if (item.kind === "bool") return (ans === "true") === item.answer;
  if (item.kind === "match") return ans === item.answer;
  return item.accept.some((a) => foldAnswer(a) === foldAnswer(ans));
}

/*
  Yerel kayıt — mobildeki `mockExamLocal` ile aynı düşünce.

  Sınav yalnız sunucuya yazılıyordu ve sunucuya ulaşılamadığı an çözülmüş bir
  bölümün tamamı kayboluyordu. Artık her cevap ÖNCE tarayıcıya, sonra sunucuya
  yazılıyor. Sunucu yetkili olmayı sürdürüyor; yerel kayıt bir yedek.
*/
type LocalRun = { answers: Answers; open: Record<string, string>; taskIx: number; secondsLeft: number };
const runKey = (paperId: string, skill: string) => `lernomi:mock-run:${paperId}:${skill}`;

function readLocalRun(paperId: string, skill: string): LocalRun | null {
  try {
    const raw = localStorage.getItem(runKey(paperId, skill));
    return raw ? (JSON.parse(raw) as LocalRun) : null;
  } catch {
    return null;
  }
}
function writeLocalRun(paperId: string, skill: string, run: LocalRun): void {
  try { localStorage.setItem(runKey(paperId, skill), JSON.stringify(run)); } catch { /* depolama kapalı */ }
}
function dropLocalRun(paperId: string, skill: string): void {
  try { localStorage.removeItem(runKey(paperId, skill)); } catch { /* yut */ }
}

/**
 * Sunucuya neden ulaşılamadı — üçü üç ayrı şey ve üçü ayrı söylenmeli.
 * Hepsine "bağlantı yok" demek yanlış teşhis koyuyordu.
 */
type Fail = "not_deployed" | "unauthorized" | "locked" | "unreachable";
const FAIL_KEYS: Record<Fail, string> = {
  not_deployed: "mockexam.fail_not_deployed",
  unauthorized: "mockexam.fail_unauthorized",
  locked: "mockexam.fail_locked",
  unreachable: "mockexam.fail_unreachable",
};

class HttpError extends Error {
  constructor(readonly status: number, readonly code: string | null = null) { super(String(status)); }
}
function failOf(err: unknown): Fail {
  const st = err instanceof HttpError ? err.status : 0;
  if (st === 404 || st === 501) return "not_deployed";
  /*
   * 403 İKİ AYRI ŞEY. Uç hem köken denetimi için ("forbidden") hem de kâğıt
   * kilitliyken ("premium_required") 403 dönüyor. İkisini birden "oturumun
   * düşmüş" diye okumak, kilitli kâğıda dokunan kullanıcıyı boş yere giriş
   * ekranına gönderiyordu - hesabında bir sorun yok, kâğıt açık değil.
   */
  if (st === 403 && err instanceof HttpError && err.code === "premium_required") return "locked";
  if (st === 401 || st === 403) return "unauthorized";
  return "unreachable";
}

async function post<T>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/mock-exam", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new HttpError(res.status, body?.error ?? null);
  }
  return (await res.json()) as T;
}

export function MockExamPlayer({ paper, part }: { paper: MockPaper; part: MockPart }) {
  const t = useT();
  const budgets = useMemo(() => taskSeconds(part), [part]);
  const router = useRouter();
  const [phase, setPhase] = useState<"cover" | "run" | "result">("cover");
  /** Sınavı bırakma onayı — mobil `MockExamScreen`deki ConfirmDialog ile aynı. */
  const [quit, setQuit] = useState(false);
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
  const [result, setResult] = useState<{ score: Score; ai: Feedback | null; offline: Fail | null } | null>(null);
  const [fail, setFail] = useState<Fail | null>(null);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const announced = useRef<Set<string>>(new Set());
  useEffect(() => () => stopSpeaking(), []);

  const announce = useCallback((key: string, text: string) => {
    if (announced.current.has(key)) return;
    announced.current.add(key);
    sayIn(paper.course, text);
  }, [paper.course]);

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
    writeLocalRun(paper.id, part.skill, { answers, open, taskIx: next, secondsLeft: budgets[next] ?? 60 });
    if (attempt) void post({ action: "save", id: attempt.id, answers, open, taskIx: next, secondsLeft: budgets[next] ?? 60 }).catch(() => {});
  }, [ix, part.tasks.length, part.skill, paper.id, budgets, attempt, answers, open]);

  useEffect(() => {
    if (phase === "run" && left === 0) advance(true);
  }, [left, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Anlık kayıt: her değişiklikten iki saniye sonra.
  useEffect(() => {
    if (phase !== "run") return;
    const id = setTimeout(() => {
      writeLocalRun(paper.id, part.skill, { answers, open, taskIx: ix, secondsLeft: left });
      if (attempt) void post({ action: "save", id: attempt.id, answers, open, taskIx: ix, secondsLeft: left }).catch(() => {});
    }, 2000);
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
    } catch (e) {
      setAttempt(null);
      const why = failOf(e);
      setFail(why);
      /* Kilide takilan an olculuyor: kagit acilmadi cunku paket kapali.
         Bitis yolundaki `failOf` cagrisinda OLCULMUYOR - orada kullanici zaten
         sinavi cozmus oluyor, kilit degil ag sorunu konusulur. */
      if (why === "locked") track("premium_gate", 0, "mock_exam");
      const local = readLocalRun(paper.id, part.skill);
      if (local) {
        setResumed(true);
        setAnswers(local.answers ?? {});
        setOpen(local.open ?? {});
        const start = Math.min(local.taskIx ?? 0, part.tasks.length - 1);
        setIx(start);
        setLeft(local.secondsLeft > 0 ? local.secondsLeft : budgets[start] ?? 60);
      } else {
        setIx(0);
        setLeft(budgets[0] ?? 60);
      }
    }
    setBusy(false);
    setPhase("run");
  }

  useEffect(() => {
    if (phase !== "result" || result) return;
    let dead = false;
    void (async () => {
      setBusy(true);
      let final: { score: Score; ai: Feedback | null; offline: Fail | null };
      if (attempt) {
        try {
          const d = await post<{ score: Score; ai: Feedback }>({ action: "finish", id: attempt.id, answers });
          final = { score: d.score, ai: d.ai ?? null, offline: null };
        } catch (e) {
          final = { score: localScore(part, answers), ai: null, offline: failOf(e) };
        }
      } else {
        final = { score: localScore(part, answers), ai: null, offline: fail ?? "unreachable" };
      }
      dropLocalRun(paper.id, part.skill);
      if (!dead) { setResult(final); setBusy(false); }
    })();
    return () => { dead = true; };
  }, [phase, result, attempt, answers, part, paper.id, fail]);

  const task = part.tasks[ix];

  if (phase === "cover") {
    const points = part.tasks.reduce((a, x) => a + (isOpenTask(x) ? 0 : x.items.length), 0);
    return (
      <section className="card mx-auto w-full max-w-2xl p-5">
        <p className="muted text-xs font-bold tracking-wide">{paper.level} · {t("mockexams.paper", { n: paper.no })}</p>
        <h1 className="mt-1 text-2xl font-bold" lang={paper.course}>{mockSkillLabel(paper.course, part.skill)}</h1>
        <p className="muted mt-1 text-sm">{paper.theme} — {paper.themeTr}</p>

        {/* İki başlık Android'in kapağında var: yönergenin nerede bittiği ve
            kuralların nerede başladığı yalnız aralıktan okunuyordu. */}
        <div className="mt-4 flex items-start gap-2">
          <SpeakerIcon className="mt-1 size-4 shrink-0" />
          <div>
            <p className="muted text-xs font-bold tracking-wide">{t("mockexam.instructions")}</p>
            <p className="mt-1 text-sm leading-relaxed" lang={paper.course}>{part.instruction}</p>
            <p className="muted mt-2 text-sm leading-relaxed">{part.instructionTr}</p>
          </div>
        </div>

        {/* Aynı olgu iki ekranda tek cümle: bölüm listesi ve kapak aynı
            anahtarları kullanıyor (Android `Cover` ve `MockExamsScreen` de
            öyle). Üç ayrı web anahtarı aynı şeyi ikinci kez yazıyordu. */}
        <p className="muted mt-4 text-xs">
          {points
            ? t("mockexams.part_summary", { minutes: part.minutes, n: points })
            : t("mockexams.part_open", { minutes: part.minutes })}
        </p>
        <p className="muted mt-4 text-xs font-bold tracking-wide">{t("mockexam.rules_title")}</p>
        <p className="muted mt-1 text-xs leading-relaxed">{t("mockexam.rules_body")}</p>

        <button
          type="button"
          className="btn btn-primary mt-5 w-full py-3 text-sm"
          disabled={busy}
          onClick={() => { announce(`part:${part.skill}`, part.instruction); void begin(); }}
        >
          {t(busy ? "mockexam.starting" : "mockexam.start")}
        </button>
      </section>
    );
  }

  if (phase === "result") {
    if (busy || !result) {
      return (
        <section className="card mx-auto w-full max-w-2xl p-5" aria-busy>
          <p className="muted text-sm">{t("mockexam.scoring")}</p>
          <div className="mt-3 h-10 animate-pulse rounded-xl surface-2" />
        </section>
      );
    }
    return <Result paper={paper} part={part} answers={answers} open={open} openScores={openScores} result={result} reveal={reveal} onReveal={(id) => setReveal((r) => ({ ...r, [id]: true }))} />;
  }

  /** Cevaplanmamış kapalı uçlu madde sayısı — bırakma uyarısında geçiyor. */
  const blanks = part.tasks.reduce(
    (n, tk) => (isOpenTask(tk) ? n : n + tk.items.filter((it) => !(answers[it.id] ?? "").trim()).length),
    0,
  );

  return (
    <section className="mx-auto w-full max-w-2xl">
      <header className="card flex items-center justify-between gap-3 p-4">
        <div>
          <p className="muted text-xs font-bold tracking-wide">{paper.level} · {mockSkillLabel(paper.course, part.skill)}</p>
          <p className="text-sm font-semibold">{t("mockexam.task_of", { n: ix + 1, total: part.tasks.length })}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Sayaç GÖREV başına; etiketsiz bir geri sayım "sınavın tamamı bu
              kadar" diye okunabiliyordu. Android etiketi yazıyor. */}
          <div className="text-right">
            <p className="muted text-[10px] font-bold tracking-wide">{t("mockexam.task_time")}</p>
            <p className="text-lg font-bold tabular-nums" style={{ color: left < 30 ? "var(--color-danger)" : undefined }}>{mmss(left)}</p>
          </div>
          {/* ÇIKIŞ YOLU YOKTU: sınav başlayınca kullanıcı bitirene kadar
              kapana kısılıyordu, tek çıkış tarayıcının geri düğmesiydi.
              Android'de başlıkta bir kapat düğmesi var ve cevapların
              kaydedildiğini söyleyip çıkıyor - web zaten iki saniyede bir
              kaydediyor, yani söz tutuluyor. */}
          <button
            type="button"
            onClick={() => setQuit(true)}
            aria-label={t("mockexam.quit_title")}
            className="pressable flex h-9 w-9 shrink-0 items-center justify-center rounded-tile"
            style={{ background: "var(--surface-2)" }}
          >
            <XIcon size={18} />
          </button>
        </div>
      </header>

      <ConfirmDialog
        open={quit}
        title={t("mockexam.quit_title")}
        message={`${t("mockexam.quit_body_saved")} ${blanks ? t("mockexam.unanswered", { n: blanks }) : ""}`.trim()}
        confirmLabel={t("mockexam.quit_ok")}
        destructive
        onConfirm={() => {
          setQuit(false);
          writeLocalRun(paper.id, part.skill, { answers, open, taskIx: ix, secondsLeft: left });
          if (attempt) void post({ action: "save", id: attempt.id, answers, open, taskIx: ix, secondsLeft: left }).catch(() => {});
          router.push("/mock-exams");
        }}
        onCancel={() => setQuit(false)}
      />

      <div className="mt-2 flex gap-1" aria-hidden>
        {part.tasks.map((tk, i) => (
          <span key={tk.id} className="h-1 flex-1 rounded-full" style={{ background: i < ix ? "var(--color-success)" : i === ix ? "var(--color-brand)" : "var(--surface-2)" }} />
        ))}
      </div>

      {autoNext ? <p className="mt-2 text-xs" style={{ color: "var(--color-danger)" }}>{t("mockexam.auto_next")}</p> : null}
      {resumed && ix === (attempt?.taskIx ?? 0) ? <p className="muted mt-2 text-xs">{t("mockexam.resumed")}</p> : null}

      <TaskView
        key={task.id}
        course={paper.course}
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
          speakSegments(st.segments.map((s) => ({ lang: paper.course, text: s.text })));
        }}
      />

      <div className="card mt-3 p-4">
        <p className="muted text-xs">{t("mockexam.no_back")}</p>
        <button type="button" className="btn btn-primary mt-2 w-full py-3 text-sm" onClick={() => advance(false)}>
          {t(ix < part.tasks.length - 1 ? "mockexam.next_task" : "mockexam.submit")}
        </button>
      </div>
    </section>
  );
}

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
  course, task, answers, open, openScores, plays, attemptId, onAnnounce, onAnswer, onOpen, onOpenScore, onPlay,
}: {
  course: MockCourse;
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
        <p className="text-sm leading-relaxed" lang={course}>{task.prompt}</p>
        <p className="muted mt-2 text-sm leading-relaxed">{task.promptTr}</p>
      </div>

      {task.options?.length ? (
        <div className="card p-4">
          {task.options.map((o) => (
            <div key={o.key} className="mt-2 first:mt-0">
              <p className="text-sm font-semibold" lang={course}>{o.key}) {o.label}</p>
              {o.body ? <p className="muted text-sm leading-relaxed" lang={course}>{o.body}</p> : null}
            </div>
          ))}
        </div>
      ) : null}

      {(task.texts ?? []).map((st) => (
        <div key={st.id} className="space-y-3">
          <Stimulus course={course} st={st} plays={plays} onPlay={onPlay} />
          {grouped ? itemsOf(st.id).map((it) => <Item key={it.id} course={course} item={it} task={task} value={answers[it.id]} answers={answers} onAnswer={onAnswer} />) : null}
        </div>
      ))}

      {!grouped ? task.items.map((it) => <Item key={it.id} course={course} item={it} task={task} value={answers[it.id]} answers={answers} onAnswer={onAnswer} />) : null}

      {task.format === "writing" ? (
        <OpenTask course={course} task={task} value={open[task.id] ?? ""} score={openScores[task.id]} attemptId={attemptId} onOpen={onOpen} onOpenScore={onOpenScore} />
      ) : task.format === "speaking" ? (
        <SpeakingTask course={course} task={task} value={open[task.id] ?? ""} score={openScores[task.id]} attemptId={attemptId} onOpen={onOpen} onOpenScore={onOpenScore} />
      ) : null}
    </div>
  );
}

function Stimulus({ course, st, plays, onPlay }: { course: MockCourse; st: MockStimulus; plays: Record<string, number>; onPlay: (st: Extract<MockStimulus, { kind: "audio" }>) => void }) {
  const t = useT();
  if (st.kind === "text") {
    return (
      <div className="card p-4">
        <p className="muted text-xs font-bold tracking-wide">{st.genre} · {st.genreTr}</p>
        {st.title ? <p className="mt-1 text-sm font-semibold" lang={course}>{st.title}</p> : null}
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed" lang={course}>{withBlanks(st.body)}</p>
      </div>
    );
  }
  const rest = st.plays - (plays[st.id] ?? 0);
  return (
    <div className="card p-4">
      <p className="muted text-xs font-bold tracking-wide">{st.genre} · {st.genreTr}</p>
      {st.title ? <p className="mt-1 text-sm font-semibold" lang={course}>{st.title}</p> : null}
      <p className="muted mt-1 text-sm leading-relaxed">{st.situation}</p>
      <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-sm" disabled={rest <= 0} onClick={() => onPlay(st)}>
        <SpeakerIcon className="size-4" />{" "}
        {t(rest <= 0 ? "mockexam.plays_done" : rest === st.plays ? "mockexam.listen" : "mockexam.listen_again")}
      </button>
      {rest > 0 ? <p className="muted mt-1 text-xs">{t("mockexam.plays_left", { n: rest })}</p> : null}
    </div>
  );
}

function Item({ course, item, task, value, answers, onAnswer }: { course: MockCourse; item: MockItem; task: MockTask; value?: string; answers: Answers; onAnswer: (id: string, v: string) => void }) {
  const t = useT();
  const [yes, no] = mockBoolLabels(course, task.format);
  /*
   * KULLANILMIŞ ŞIKLAR SOLUK. Eşleştirmede varsayılan kural "her şık en fazla
   * bir kez" ve `reuseOptions` o kuralı kaldırıyor (bkz. lib/mock-exams/types).
   * Bayrak içerikte yüzlerce görevde YAZILI ama iki oynatıcı da onu hiç
   * okumuyordu: bir şıkkı ikinci kez seçen öğrenci hatasını ancak sonuçta
   * görüyordu. Kâğıt sınavda bu bilgi zaten var - öğrenci kendi yazdıklarını
   * aynı sayfada görüyor; ekranda her madde ayrı satır olduğu için kayboluyor.
   *
   * Soluk şık YİNE BASILABİLİR: cevabı taşımak isteyen öğrenci engellenmemeli.
   */
  const usedKeys =
    item.kind === "match" && !task.reuseOptions
      ? new Set(task.items.filter((i) => i.id !== item.id).map((i) => answers[i.id]).filter(Boolean))
      : null;
  const chip = (label: string, active: boolean, onClick: () => void, key: string) => (
    <button
      key={key}
      type="button"
      onClick={onClick}
      /* SEÇİLİ DURUMU DUYURULUYOR. Şık seçilince yalnız zemin ve kenarlık
         değişiyordu: ekran okuyucu kullanan öğrenci hangi şıkkı işaretlediğini
         hiçbir şekilde duymuyordu — sınavda cevabını doğrulayamamak demek.
         Aynı eksik iki platformda da vardı, ikisi birlikte kapatıldı. */
      aria-pressed={active}
      className="rounded-xl px-3 py-2 text-left text-sm"
      style={{ background: active ? "var(--brand-soft)" : "var(--surface-2)", border: `1px solid ${active ? "var(--color-brand)" : "transparent"}` }}
    >
      {label}
    </button>
  );
  // Satır sonu korunuyor: dönüştürme maddesinde kaynak cümle ile hedef cümle
  // ayrı satırlarda durmalı, tek paragrafa akarsa hangi cümlenin doldurulacağı
  // okunmuyor. Öteki biçimlerde metin tek satır olduğu için etkisi yok.
  return (
    <div className="card p-4">
      <p className="whitespace-pre-line text-sm font-semibold leading-relaxed" lang={course}>{item.no}. {item.text}</p>
      {item.kind === "gap" && item.cue ? (
        <p className="mt-2 text-sm font-bold tracking-wide" lang={course} style={{ color: "var(--color-brand)" }}>{item.cue}</p>
      ) : null}
      <div className="mt-2 flex flex-col gap-2">
        {item.kind === "mcq"
          ? item.options.map((o, i) => chip(`${"abcd"[i] ?? i + 1}) ${o}`, value === String(i), () => onAnswer(item.id, String(i)), String(i)))
          : item.kind === "bool"
            ? <div className="flex gap-2">{chip(yes, value === "true", () => onAnswer(item.id, "true"), "t")}{chip(no, value === "false", () => onAnswer(item.id, "false"), "f")}</div>
            : item.kind === "match"
              ? (
                <div className="flex flex-wrap gap-2">
                  {/* SOLUK OLMAK BİR BİLGİ: bu şık başka bir maddede
                      kullanılmış. Opaklık bunu yalnız göze söylüyordu; ekran
                      okuyucu kullanan öğrenci aynı şıkkı ikinci kez seçtiğini
                      ancak sonuçta görüyordu. Şık yine basılabilir. Android
                      aynı satırı taşıyor. */}
                  {(task.options ?? []).map((o) => (
                    <span
                      key={o.key}
                      title={usedKeys?.has(o.key) && value !== o.key ? t("mockexam.option_used") : undefined}
                      style={{ opacity: usedKeys?.has(o.key) && value !== o.key ? 0.45 : 1 }}
                    >
                      {chip(o.key, value === o.key, () => onAnswer(item.id, o.key), o.key)}
                    </span>
                  ))}
                </div>
              )
              : (
                <input
                  value={value ?? ""}
                  onChange={(e) => onAnswer(item.id, e.target.value)}
                  className="input w-full"
                  placeholder={t(task.format === "transform" ? "mockexam.write_transform" : "mockexam.write_here")}
                  lang={course}
                  autoComplete="off"
                />
              )}
      </div>
    </div>
  );
}

/** Yazma görevi: içerik noktaları, canlı kelime sayacı, rubrik değerlendirmesi. */
function OpenTask({
  course, task, value, score, attemptId, onOpen, onOpenScore,
}: {
  course: MockCourse;
  task: MockTask;
  value: string;
  score?: OpenScore;
  attemptId: number | null;
  onOpen: (id: string, v: string) => void;
  onOpenScore: (id: string, v: OpenScore) => void;
}) {
  const t = useT();
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
      <p className="muted text-xs font-bold tracking-wide">{t("mockexam.content_points")}</p>
      {(task.rubric?.points ?? []).map((p, i) => (
        <div key={i} className="mt-2">
          <p className="text-sm" lang={course}>• {p.de}</p>
          <p className="muted text-sm">{p.tr}</p>
        </div>
      ))}

      <textarea
        value={value}
        onChange={(e) => onOpen(task.id, e.target.value)}
        rows={8}
        className="input mt-4 w-full"
        placeholder={t("mockexam.write_here")}
        lang={course}
      />
      <p className="muted mt-1 text-xs">
        {need
          ? `${n} / ${need} ${t("mockexam.words_unit")}`
          : `${n} ${t("mockexam.words_unit")}`}
      </p>

      {score ? (
        <OpenResult score={score} />
      ) : (
        <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-sm" disabled={busy || !attemptId || n < 5} onClick={() => void evaluate()}>
          {t(busy ? "mockexam.evaluating" : "mockexam.evaluate")}
        </button>
      )}
      {!attemptId ? <p className="muted mt-2 text-xs">{t("mockexam.ai_needs_server")}</p> : null}
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
  course, task, value, score, attemptId, onOpen, onOpenScore,
}: {
  course: MockCourse;
  task: MockTask;
  value: string;
  score?: OpenScore;
  attemptId: number | null;
  onOpen: (id: string, v: string) => void;
  onOpenScore: (id: string, v: OpenScore) => void;
}) {
  const t = useT();
  const [step, setStep] = useState<"waiting" | "prep" | "speaking" | "done">("waiting");
  const [turn, setTurn] = useState(0);
  const [count, setCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [micErr, setMicErr] = useState(false);
  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; }, []);

  const exchange = task.exchange ?? [];
  const prep = task.prepSeconds ?? 60;

  useEffect(() => {
    if (step !== "prep" && step !== "speaking") return;
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
      sayIn(course, text, () => { clearTimeout(guard); finish(); });
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
    form.append("language", course);
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
    setStep("speaking");
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
    setStep("done");
  }

  // Hazırlık bitince kendiliğinden konuşmaya geçer — dijital oturumda fazlar
  // otomatik akar.
  useEffect(() => {
    if (step === "prep" && count === 0) void run();
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
      <p className="muted text-xs font-bold tracking-wide">{t("mockexam.content_points")}</p>
      {(task.rubric?.points ?? []).map((p, i) => (
        <div key={i} className="mt-2">
          <p className="text-sm" lang={course}>• {p.de}</p>
          <p className="muted text-sm">{p.tr}</p>
        </div>
      ))}

      {step === "waiting" ? (
        <>
          <p className="muted mt-4 text-sm leading-relaxed">
            {exchange.length
              ? t("mockexam.exchange_intro", { n: exchange.filter((x) => x.who === "you").length, prep })
              : t("mockexam.solo_intro", { prep, speak: task.speakSeconds ?? 120 })}
          </p>
          <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-sm" onClick={() => { setCount(prep); setStep("prep"); }}>
            <MicIcon className="size-4" /> {t("mockexam.speak_start")}
          </button>
          <button type="button" className="btn btn-ghost ml-2 mt-3 px-4 py-2 text-sm" onClick={() => setStep("done")}>
            {t("mockexam.write_without_mic")}
          </button>
        </>
      ) : step === "prep" ? (
        <div className="mt-4 text-center">
          <p className="muted text-xs font-bold tracking-wide">{t("mockexam.prep")}</p>
          <p className="text-3xl font-bold tabular-nums" style={{ color: "var(--color-brand)" }}>{mmss(count)}</p>
          <p className="muted mt-1 text-sm">{t("mockexam.prep_hint")}</p>
        </div>
      ) : step === "speaking" ? (
        <div className="mt-4">
          {current?.who === "partner" ? (
            <>
              <p className="muted text-xs font-bold tracking-wide">{t("mockexam.partner")}</p>
              <p className="mt-1 text-sm leading-relaxed" lang={course}>{current.de}</p>
              <p className="muted mt-1 text-sm">{current.tr}</p>
            </>
          ) : (
            <div className="text-center">
              <MicIcon className="mx-auto size-6" style={{ color: "var(--color-danger)" }} />
              <p className="mt-1 text-sm font-bold" style={{ color: "var(--color-danger)" }}>{t("mockexam.speak_now")} · {mmss(count)}</p>
              <p className="muted mt-1 text-sm">{current?.who === "you" ? current.hint : t("mockexam.solo_hint")}</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <p className="muted mt-4 text-xs font-bold tracking-wide">{t("mockexam.transcript_you")}</p>
          <textarea
            value={value}
            onChange={(e) => onOpen(task.id, e.target.value)}
            rows={8}
            className="input mt-1 w-full"
            placeholder={t("mockexam.transcript_placeholder")}
            lang={course}
          />
          <p className="muted mt-1 text-xs leading-relaxed">
            {t(micErr ? "mockexam.mic_failed" : "mockexam.transcript_note")}
          </p>
          {score ? (
            <OpenResult score={score} />
          ) : (
            <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-sm" disabled={busy || !attemptId || value.trim().length < 5} onClick={() => void evaluate()}>
              {t(busy ? "mockexam.evaluating" : "mockexam.evaluate")}
            </button>
          )}
          {!attemptId ? <p className="muted mt-2 text-xs">{t("mockexam.ai_needs_server")}</p> : null}
        </>
      )}
    </div>
  );
}

function OpenResult({ score }: { score: OpenScore }) {
  const t = useT();
  if (score.score == null) {
    return <p className="muted mt-3 text-sm leading-relaxed">{t("mockexam.ai_off")}</p>;
  }
  return (
    <div className="mt-3">
      <p className="text-lg font-bold" style={{ color: score.score >= MOCK_PASS_PCT ? "var(--color-success)" : "var(--color-danger)" }}>{t("common.pct", { n: score.score })}</p>
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
  result: { score: Score; ai: Feedback | null; offline: Fail | null };
  reveal: Record<string, boolean>;
  onReveal: (id: string) => void;
}) {
  const t = useT();
  const { score, ai, offline } = result;
  return (
    <section className="mx-auto w-full max-w-2xl space-y-3">
      {offline ? (
        <div className="card p-4">
          <p className="text-sm" style={{ color: "var(--color-danger)" }}>{t(FAIL_KEYS[offline])}</p>
          <p className="muted mt-1 text-xs">{t("mockexam.saved_locally")}</p>
        </div>
      ) : null}

      {score.total > 0 ? (
        <div className="card p-5">
          <p className="muted text-xs font-bold tracking-wide">{t("mockexam.result")}</p>
          <div className="mt-1 flex items-end justify-between">
            <p className="text-3xl font-bold" style={{ color: score.passed ? "var(--color-success)" : "var(--color-danger)" }}>{t("common.pct", { n: score.pct })}</p>
            <p className="text-sm font-semibold">{t("mockexam.score", { correct: score.correct, total: score.total })}</p>
          </div>
          <p className="mt-2 text-sm font-semibold" style={{ color: score.passed ? "var(--color-success)" : "var(--color-danger)" }}>
            {t(score.passed ? "mockexam.passed" : "mockexam.failed")}
          </p>
          <p className="muted text-xs">{t("mockexam.pass_note", { pct: MOCK_PASS_PCT })}</p>
        </div>
      ) : (
        <p className="card p-4 text-sm leading-relaxed">{t("mockexam.not_scored")}</p>
      )}

      {score.byGoal.length ? (
        <div className="card p-4">
          <p className="muted text-xs font-bold tracking-wide">{t("mockexam.by_goal")}</p>
          {score.byGoal.map((g) => {
            const pct = g.total ? Math.round((100 * g.correct) / g.total) : 0;
            return (
              <div key={g.goal} className="mt-3">
                <div className="flex justify-between text-sm">
                  <span>{GOAL_KEYS[g.goal] ? t(GOAL_KEYS[g.goal]) : g.goal}</span>
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
          <p className="muted text-xs font-bold tracking-wide">{t("mockexam.todo")}</p>
          <p className="mt-1 text-sm leading-relaxed">{ai.summary}</p>
          {ai.strengths.length ? (
            <p className="mt-2 text-sm" style={{ color: "var(--color-success)" }}>
              {t("mockexam.strengths")}: {ai.strengths.join(" · ")}
            </p>
          ) : null}
          {ai.todo.map((td, i) => (
            <div key={i} className="mt-3 border-l-2 pl-3" style={{ borderColor: "var(--color-brand)" }}>
              <p className="text-sm font-semibold">{i + 1}. {td.title}</p>
              <p className="muted mt-0.5 text-sm">{td.why}</p>
              <p className="mt-1 text-sm leading-relaxed">{td.how}</p>
            </div>
          ))}
          {ai.source === "rules" ? <p className="muted mt-3 text-xs">{t("mockexam.source_rules")}</p> : null}
        </div>
      ) : null}

      <h2 className="pt-2 text-lg font-bold">{t("mockexam.review")}</h2>

      {part.tasks.map((task) => (
        <div key={task.id} className="space-y-2">
          <p className="muted text-xs font-bold tracking-wide">Teil {task.no}</p>
          {isOpenTask(task) && task.rubric ? (
            <div className="card p-4">
              {(open[task.id] ?? "").trim() ? (
                <>
                  <p className="muted text-xs font-bold tracking-wide">{t("mockexam.your_answer")}</p>
                  <p className="mt-1 whitespace-pre-line text-sm leading-relaxed" lang={paper.course}>{open[task.id]}</p>
                </>
              ) : null}
              {openScores[task.id] ? <OpenResult score={openScores[task.id]} /> : null}
              <p className="muted mt-3 text-xs font-bold tracking-wide">{t("mockexam.criteria")}</p>
              {task.rubric.criteria.map((c, i) => <p key={i} className="muted mt-1 text-sm leading-relaxed">• {c}</p>)}
              {reveal[task.id] ? (
                <>
                  <p className="muted mt-3 text-xs font-bold tracking-wide">{t("mockexam.model_answer")}</p>
                  <p className="mt-1 whitespace-pre-line text-sm leading-relaxed" lang={paper.course}>{task.rubric.sample}</p>
                </>
              ) : (
                <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-sm" onClick={() => onReveal(task.id)}>{t("mockexam.show_model")}</button>
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
                    <p className="whitespace-pre-line text-sm font-semibold leading-relaxed" lang={paper.course}>{it.no}. {it.text}</p>
                    {/* Anahtar sözcük dökümde de görünmeli: açıklama ona gönderme yapıyor. */}
                    {it.kind === "gap" && it.cue ? (
                      <p className="mt-1 text-sm font-bold tracking-wide" lang={paper.course} style={{ color: "var(--color-brand)" }}>{it.cue}</p>
                    ) : null}
                    {!ok ? (
                      <p className="muted mt-1 text-sm">
                        {t("mockexam.your_answer")}: {s?.given || t("mockexam.blank")}
                      </p>
                    ) : null}
                    <p className="mt-1 text-sm" style={{ color: ok ? "var(--color-success)" : undefined }}>
                      {t("mockexam.correct_answer")}: {s?.expected ?? expected(it, task)}
                    </p>
                    <p className="muted mt-1 text-sm leading-relaxed">{it.explain}</p>
                  </div>
                </div>
              );
            })
          )}

          {/* SÖZLÜKÇE SINAVDAN SONRA. Metinlerin kilit kelimeleri içerikte
              duruyordu (`gloss`) ve tip de bunu "sınavdan sonra, dökümde
              gösterilir" diye yazıyordu ama web hiçbir yerde çizmiyordu:
              yazılmış içerik sessizce düşüyordu. Android ikisini de gösteriyor
              - dinleme dökümünün altında ve okuma metni için ayrı kartta. */}
          {(task.texts ?? []).map((st) =>
            st.kind === "audio" ? (
              <div key={st.id} className="card p-4">
                <p className="muted text-xs font-bold tracking-wide">{t("mockexam.transcript")} · {st.genreTr}</p>
                {st.segments.map((sg, i) => (
                  <p key={i} className="mt-1 text-sm leading-relaxed" lang={paper.course}>{sg.speaker ? `${sg.speaker}: ` : ""}{sg.text}</p>
                ))}
                <Glossary gloss={st.gloss} course={paper.course} t={t} />
              </div>
            ) : st.gloss?.length ? (
              <div key={st.id} className="card p-4">
                <Glossary gloss={st.gloss} course={paper.course} t={t} />
              </div>
            ) : null,
          )}
        </div>
      ))}

      <Link href="/mock-exams" className="btn btn-primary mt-2 block w-full py-3 text-center text-sm">{t("mockexam.back_to_list")}</Link>
    </section>
  );
}

/**
 * Metnin kilit kelimeleri — yalnız sınav bittikten sonra, dökümün yanında.
 * Sınav sırasında gösterilseydi okuma görevinin yarısını hediye ederdi;
 * Android'de de kapanış ekranında duruyor.
 */
function Glossary({
  gloss,
  course,
  t,
}: {
  gloss?: { de: string; tr: string }[];
  course: string;
  t: ReturnType<typeof useT>;
}) {
  if (!gloss?.length) return null;
  return (
    <>
      <p className="muted mt-3 text-xs font-bold tracking-wide">{t("mockexam.glossary")}</p>
      <dl className="mt-1">
        {gloss.map((g) => (
          <div key={g.de} className="muted flex gap-1.5 text-xs leading-relaxed">
            <dt lang={course}>{g.de}</dt>
            <dd>— {g.tr}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
