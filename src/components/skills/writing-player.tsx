"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTargetLang } from "./player-context";
import { motion } from "framer-motion";
import { glossTitle } from "./gloss-entry";
import type { WritingExercise, WritingTask } from "@/lib/skills/types";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { AiNotice } from "@/components/ai-notice";
import { askAssess, fallbackAssessment, type AssessFailure, type FallbackAssessment } from "@/lib/assess-client";
import type { Assessment, AssessLevel, AssessRequest } from "@/lib/assess-prompts";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import { CheckIcon } from "@/components/icons";
import { seededShuffle } from "@/lib/shuffle";
import { matchSentence, type SentenceMatch } from "@/lib/sentence-match";
import { TokenDiff, TypedTokens } from "@/components/feedback/diff-text";
import { levenshtein } from "@/lib/errors";
import { useT, useLang } from "@/lib/i18n/client";
import { courseName } from "@/lib/courses";
import { RUBRIC_PASS_PCT, SCORE_MID_PCT, SKILL_DONE_PCT } from "@/lib/score-bands";

type BuildTaskData = Extract<WritingTask, { kind: "build" }>;
type FreeTaskData = Extract<WritingTask, { kind: "free" }>;
type ReplyTaskData = Extract<WritingTask, { kind: "reply" }>;
type FormTaskData = Extract<WritingTask, { kind: "form" }>;
type RewriteTaskData = Extract<WritingTask, { kind: "rewrite" }>;
type SummaryTaskData = Extract<WritingTask, { kind: "summary" }>;

/**
 * Serbest yazma oynatıcısının beklediği biçim. `reply` ve `summary` (WP-31)
 * aynı oynatıcıyla oynanır — ikisi de "metin yaz, rubrik puanlasın": cevap
 * görevinde uyaran gelen mesaj, özet görevinde kaynak metin. Ayrı oynatıcı
 * yazmak aynı ekranı üç kez yazmak olurdu.
 */
function asFree(
  task: FreeTaskData | ReplyTaskData | SummaryTaskData,
  t: (key: string, vars?: Record<string, string | number>) => string,
): FreeTaskData & { title: string } {
  if (task.kind === "summary") {
    return {
      kind: "free",
      title: t("writp.summarise"),
      prompt: task.prompt,
      stimulus: task.source,
      checklist: [
        t("writp.at_most_n_sentences", { n: task.maxSentences }),
        t("writp.main_idea_only"),
        t("writp.own_words"),
      ],
      minWords: 10,
      phrases: [],
      sample: task.sample,
    };
  }
  if (task.kind === "reply") return { ...task, kind: "free", title: t("writp.write_reply") };
  return { ...task, title: t("writp.free_writing") };
}
type SentenceTaskData = Extract<WritingTask, { kind: "sentence" }>;

/**
 * Yazma egzersizi: önce karışık parçalardan cümle kurma (otomatik kontrol),
 * sonra kontrol listesiyle serbest yazma. Görevler sırayla açılır.
 */
export function WritingPlayer({ exercise, backHref }: { exercise: WritingExercise; backHref?: string }) {
  const t = useT();
  const total = exercise.tasks.length;
  const { finish, state, reset } = useSkillFinish(exercise, total);
  const [step, setStep] = useState(0);
  const [round, setRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  /** AI rubrik puanları (yalnız değerlendirilen görevler) — ortalaması beceri kaydına `score` olarak gider. */
  const scores = useRef<number[]>([]);
  const active = step < total ? exercise.tasks[step] : null;

  function completeTask(ok: boolean, score?: number) {
    const c = correctCount + (ok ? 1 : 0);
    setCorrectCount(c);
    if (typeof score === "number") scores.current.push(score);
    const next = step + 1;
    setStep(next);
    if (next >= total) {
      const avg = scores.current.length ? Math.round(scores.current.reduce((a, b) => a + b, 0) / scores.current.length) : undefined;
      void finish(c, avg);
    }
  }

  return (
    <PlayerShell exercise={exercise} backHref={backHref}>
      <p className="muted px-1 text-body">{exercise.intro}</p>
      {/* Yazma görevleri sunucuda dil modeliyle puanlanıyor; kimin
          değerlendirdiği yazmaya başlamadan önce söyleniyor (mobilde de öyle). */}
      <AiNotice variant="output" className="mt-3" />

      <div className="mt-3 px-1">
        <div className="mb-1.5 flex justify-between text-caption">
          <span className="muted">{t("writew.task_n", { n: Math.min(step + 1, total), total })}</span>
          <span className="text-[color:var(--color-brand)]">
            {t("common.n_correct", { correct: correctCount, total })}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full surface-2">
          <motion.div
            className="brand-gradient h-full rounded-full"
            animate={{ width: `${(step / total) * 100}%` }}
            transition={{ type: "spring", stiffness: 160, damping: 24 }}
          />
        </div>
      </div>

      {active ? (
        active.kind === "build" ? (
          <BuildTask
            key={`${round}-${step}`}
            task={active}
            seed={`${round}-${step}`}
            onDone={completeTask}
          />
        ) : active.kind === "sentence" ? (
          <SentenceTask key={`${round}-${step}`} task={active} level={exercise.level} onDone={completeTask} />
        ) : active.kind === "form" ? (
          <FormTask key={`${round}-${step}`} task={active} onDone={completeTask} />
        ) : active.kind === "rewrite" ? (
          <RewriteTask key={`${round}-${step}`} task={active} onDone={completeTask} />
        ) : (
          <FreeTask
            key={`${round}-${step}`}
            task={asFree(active, t)}
            level={exercise.level}
            exerciseId={exercise.id}
            draftKey={`lernomi-draft-${exercise.id}-${step}`}
            onDone={completeTask}
          />
        )
      ) : null}

      <ResultCard
        correct={correctCount}
        total={total}
        noun="task"
        state={state}
        onRetry={() => {
          reset();
          scores.current = [];
          setCorrectCount(0);
          setStep(0);
          setRound((r) => r + 1);
        }}
      />
    </PlayerShell>
  );
}

/** Noktalama ve büyük/küçük harf farkı cümle kurmayı geçersiz kılmasın. */
function normalize(s: string) {
  return s
    .toLocaleLowerCase("de-DE")
    .replace(/[.!?,]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Karışık parçalardan cümle kurma — iki yanlıştan sonra doğru cevap açıklanır. */
function BuildTask({
  task,
  seed,
  onDone,
}: {
  task: BuildTaskData;
  /** Parçaların dizilişini belirleyen tohum — bkz. aşağıdaki not. */
  seed: string;
  onDone: (ok: boolean) => void;
}) {
  const t = useT();
  const lang = useTargetLang();
  /**
   * Diziliş tohumlu, çünkü bu hesap render sırasında yapılıyor:
   * `Math.random()` ile sunucu bir sıra, tarayıcı başka bir sıra üretiyor ve
   * hydration'da ağaç yeniden kuruluyordu. Karıştırmayı bağlanma sonrasına
   * ertelemek de olmazdı — o zaman parçalar bir kare boyunca DOĞRU sırayla,
   * yani cevabın kendisi olarak görünürdü.
   *
   * Tohum görevin sırası ve deneme sayacından geliyor: aynı görev tekrar
   * denendiğinde diziliş yenileniyor, aynı denemede ise sabit kalıyor.
   */
  const tokens = useMemo(
    () => seededShuffle(task.answer.replace(/[.!?]$/, "").split(" "), `${seed}|${task.answer}`),
    [task, seed],
  );
  const [chosen, setChosen] = useState<number[]>([]);
  const [phase, setPhase] = useState<"editing" | "correct" | "revealed">("editing");
  const [fails, setFails] = useState(0);
  const [shaking, setShaking] = useState(false);

  const accepted = useMemo(
    () => [task.answer, ...(task.alternatives ?? [])].map(normalize),
    [task],
  );

  function check() {
    const assembled = chosen.map((i) => tokens[i]).join(" ");
    if (accepted.includes(normalize(assembled))) {
      setPhase("correct");
      return;
    }
    const n = fails + 1;
    setFails(n);
    setShaking(true);
    setTimeout(() => setShaking(false), 400);
    if (n >= 2) setPhase("revealed");
  }

  const locked = phase !== "editing";

  return (
    <section className="card mt-4 p-5">
      <p className="text-micro uppercase tracking-wide text-[color:var(--color-brand)]">
        {t("writp.build_sentence")}
      </p>
      <p className="mt-1.5 font-semibold">{task.tr}</p>
      {fails > 0 && task.hint && phase === "editing" ? (
        <p className="muted mt-1.5 text-caption">{t("rounds.hint")}: {task.hint}</p>
      ) : null}

      <div
        className={`option mt-4 flex min-h-[3.25rem] flex-wrap items-center gap-2 px-3 py-2.5 ${
          shaking ? "animate-shake" : ""
        } ${phase === "correct" ? "option-correct" : ""} ${phase === "revealed" ? "option-wrong" : ""}`}
      >
        {chosen.length === 0 ? (
          <span className="muted text-body">{t("exam.tap_chunks")}</span>
        ) : (
          chosen.map((ti, pos) => (
            <button
              key={`${ti}-${pos}`}
              type="button"
              disabled={locked}
              onClick={() => setChosen(chosen.filter((_, p) => p !== pos))}
              className="chip px-2.5 py-1 text-body"
              style={{ color: "var(--text)" }}
            >
              {tokens[ti]}
            </button>
          ))
        )}
      </div>

      {!locked ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {tokens.map((t, i) =>
            chosen.includes(i) ? null : (
              <button
                key={i}
                type="button"
                onClick={() => setChosen([...chosen, i])}
                className="option px-3 py-1.5 text-strong"
              >
                {t}
              </button>
            ),
          )}
        </div>
      ) : null}

      {phase === "correct" ? (
        <p className="mt-3 flex items-start gap-2 text-strong text-[color:var(--color-mint)]">
          <CheckIcon size={17} className="mt-0.5 shrink-0" />
          <span lang={lang}>{task.answer}</span>
        </p>
      ) : null}
      {phase === "revealed" ? (
        <p className="mt-3 text-body">
          <span className="muted">{t("rounds.answer_is")}</span>{" "}
          <strong lang={lang}>{task.answer}</strong>
        </p>
      ) : null}

      <div className="mt-4 flex items-center gap-3">
        {locked ? (
          <button
            type="button"
            onClick={() => onDone(phase === "correct")}
            className="btn btn-primary px-6 py-2.5"
          >
            {t("common.continue")}
          </button>
        ) : (
          <>
            <button
              type="button"
              disabled={chosen.length !== tokens.length}
              onClick={check}
              className="btn btn-primary px-6 py-2.5 disabled:opacity-50"
            >
              {t("skillquiz.check")}
            </button>
            {chosen.length > 0 ? (
              <button
                type="button"
                onClick={() => setChosen([])}
                className="btn btn-ghost px-4 py-2.5 text-body"
              >
                {t("find.clear")}
              </button>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}

const UMLAUTS = ["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"];

/** Serbest yazma — kelime sayısı ve öz denetim listesi tamamlanınca biter. */
function FreeTask({
  task,
  draftKey,
  level,
  exerciseId,
  onDone,
}: {
  task: FreeTaskData & { title?: string };
  draftKey: string;
  level: string;
  exerciseId: string;
  onDone: (ok: boolean, score?: number) => void;
}) {
  const t = useT();
  const uiLang = useLang();
  const lang = useTargetLang();
  // Taslak cihazda saklanır: sayfadan çıkıp dönen öğrenci yazdığını kaybetmez.
  // localStorage yalnızca istemcide var; hidrasyon uyuşmazlığı olmasın diye
  // taslak mount sonrasında yüklenir ve yüklenene kadar kayıt yapılmaz.
  const [text, setText] = useState("");
  const loaded = useRef(false);
  const [checks, setChecks] = useState<boolean[]>(() => task.checklist.map(() => false));
  const [showSample, setShowSample] = useState(false);
  const areaRef = useRef<HTMLTextAreaElement>(null);
  // AI değerlendirmesi (WP-30): kontrol listesi bilgi amaçlı kaldı, kilit
  // değil; görevi tamamlayan şey rubrik puanı. Sağlayıcı yoksa eski kural
  // (liste + kelime sayısı) ve metin kuyruğa yazılır.
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Assessment | FallbackAssessment | null>(null);
  const [failure, setFailure] = useState<AssessFailure | null>(null);
  const [queued, setQueued] = useState(false);

  useEffect(() => {
    try {
      const draft = localStorage.getItem(draftKey);
      if (draft) setText(draft);
    } catch {
      /* depolama kapalıysa taslak yok */
    }
    loaded.current = true;
  }, [draftKey]);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      if (text) localStorage.setItem(draftKey, text);
      else localStorage.removeItem(draftKey);
    } catch {
      /* depolama kapalıysa taslak tutulmaz */
    }
  }, [draftKey, text]);

  function done(ok: boolean, score?: number) {
    try {
      localStorage.removeItem(draftKey);
    } catch {
      /* yok say */
    }
    onDone(ok, score);
  }

  function request(): AssessRequest {
    return {
      kind: "writing",
      level: level as AssessLevel,
      task: {
        prompt: task.prompt,
        targets: task.phrases.map((p) => p.de),
        constraints: [...task.checklist, `en az ${task.minWords} kelime`],
      },
      answer: { text: text.trim() },
      exerciseId,
      lang,
    };
  }

  async function evaluate() {
    if (busy || result) return;
    setBusy(true);
    const req = request();
    const ai = await askAssess(req);
    if (ai.ok) {
      setResult(ai.result);
      setFailure(null);
    } else {
      setResult(fallbackAssessment(req, t));
      setFailure(ai.reason);
      if (ai.reason === "not_configured" || ai.reason === "upstream" || ai.reason === "timeout") {
        // Metin kaybolmasın: sunucu kuyruğa alır, servis dönünce puanlar.
        try {
          const res = await fetch("/api/assess/queue", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(req) });
          setQueued(res.ok);
        } catch {
          setQueued(false);
        }
      }
    }
    setBusy(false);
  }


  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const enough = words >= task.minWords;
  const ready = enough && checks.every(Boolean);
  /** Görev tamamlandı mı: AI → genel puan RUBRIC_PASS_PCT'i geçmeli ve kelime sınırı; yedekte eski kural. */
  const aiScore = result && !("offline" in result && result.offline) ? result.score.overall : null;
  const ok = aiScore !== null ? aiScore >= RUBRIC_PASS_PCT && enough : ready;

  /** Türkçe klavyede olmayan Almanca harfleri imlecin olduğu yere ekler. */
  function insert(ch: string) {
    const el = areaRef.current;
    if (!el) return setText(text + ch);
    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;
    const next = text.slice(0, start) + ch + text.slice(end);
    setText(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + ch.length, start + ch.length);
    });
  }

  return (
    <section className="card mt-4 p-5">
      <p className="text-micro uppercase tracking-wide text-[color:var(--color-brand)]">
        {task.title ?? t("writp.free_writing")}
      </p>
      <p className="mt-1.5 text-strong leading-relaxed">{task.prompt}</p>

      {task.stimulus ? (
        <blockquote
          lang={lang}
          className="mt-3 rounded-panel border-l-4 px-3.5 py-2.5 text-body leading-relaxed surface-2"
          style={{ borderColor: "var(--color-brand)" }}
        >
          {task.stimulus.split("\n\n").map((p, i) => (
            <p key={i} className={`whitespace-pre-line ${i > 0 ? "mt-2" : ""}`}>
              {p}
            </p>
          ))}
        </blockquote>
      ) : null}

      {task.phrases.length ? (
        <div className="mt-3">
          <p className="muted mb-1.5 text-caption">
            {t("writp.useful_phrases")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {task.phrases.map((p) => (
              <button
                key={p.de}
                type="button"
                onClick={() => insert(p.de + " ")}
                title={glossTitle(p)}
                className="chip px-2.5 py-1 text-caption"
              >
                {p.de}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <textarea
        ref={areaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={7}
        lang={lang}
        /* Sabit Almanca yazıyordu. Android hedef dili SÖYLÜYOR
           (`skillquiz.write_your_answer_in`, {lang} = kursun adı); web de öyle. */
        placeholder={t("skillquiz.write_your_answer_in", { lang: courseName(lang, uiLang) })}
        className="option mt-3 w-full px-3.5 py-3 text-body leading-relaxed outline-none focus:border-[color:var(--color-brand)]"
      />
      <div className="mt-1.5 flex items-center justify-between">
        <div className="flex gap-1">
          {UMLAUTS.map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => insert(ch)}
              className="chip h-7 w-7 px-0 text-body"
            >
              {ch}
            </button>
          ))}
        </div>
        <span
          className="text-caption"
          style={{ color: enough ? "var(--color-mint)" : "var(--text-muted)" }}
        >
          {t("skillquiz.n_words", { n: words, min: task.minWords })}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {task.checklist.map((item, i) => (
          <button
            key={i}
            type="button"
            role="checkbox"
            aria-checked={checks[i]}
            onClick={() => setChecks(checks.map((c, ci) => (ci === i ? !c : c)))}
            className="flex w-full items-start gap-2.5 text-left text-body"
          >
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border on-fill"
              style={{
                borderColor: checks[i] ? "var(--color-mint)" : "var(--border)",
                background: checks[i] ? "var(--color-mint)" : "transparent",
              }}
            >
              {checks[i] ? <CheckIcon size={13} /> : null}
            </span>
            <span className={checks[i] ? "" : "muted"}>{item}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowSample((v) => !v)}
          className="muted text-caption underline-offset-2 hover:underline"
        >
          {t(showSample ? "writp.hide_sample" : "mockexam.show_model")}
        </button>
        {showSample ? (
          <div lang={lang} className="mt-2 rounded-panel px-3.5 py-3 text-body leading-relaxed surface-2">
            {task.sample.split("\n\n").map((p, i) => (
              <p key={i} className={`whitespace-pre-line ${i > 0 ? "mt-2" : ""}`}>
                {p}
              </p>
            ))}
          </div>
        ) : null}
      </div>

      {result ? (
        <div className="mt-4 flex flex-col gap-3">
          <AssessmentCard answer={text.trim()} result={result} failure={failure} example={task.sample} />
          {queued ? (
            <p className="muted text-caption">{t("writp.queued")}</p>
          ) : null}
          {aiScore !== null && aiScore < RUBRIC_PASS_PCT ? (
            <p className="text-caption" style={{ color: "var(--color-flame)" }}>
              {/* Orta bant SABITTEN. Sayi iki platformda da elle `40`
                  yaziliydi, oysa ikisinde de ayni adla duruyor
                  (`SCORE_MID_PCT`) - ikisi de yanlis oldugu icin
                  karsilastirmali bir kapi bunu goremezdi. */}
              {t(aiScore >= SCORE_MID_PCT ? "writp.improve" : "writp.retry_suggest")}
            </p>
          ) : null}
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => done(ok, aiScore ?? undefined)} className="btn btn-primary px-6 py-2.5">
              {t("common.continue")}
            </button>
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setFailure(null);
                setQueued(false);
              }}
              className="btn btn-ghost px-4 py-2.5 text-body"
            >
              {t("writp.try_once_more")}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-4 flex items-center gap-3">
            <button type="button" disabled={busy || words < 5} onClick={() => void evaluate()} className="btn btn-primary px-6 py-2.5 disabled:opacity-50">
              {t(busy ? "exam.evaluating" : "mockexam.evaluate")}
            </button>
            <button type="button" onClick={() => done(false)} className="btn btn-ghost px-4 py-2.5 text-body">
              {t("writp.skip_task")}
            </button>
          </div>
          {!enough ? (
            <p className="muted mt-2 text-caption">
              {t("writp.min_words_note", { min: task.minWords, n: words })}
            </p>
          ) : null}
        </>
      )}
    </section>
  );
}

/**
 * Serbest cümle görevi (WP-12): 2–3 kelimeyle özgün cümle, AI rubriğiyle
 * puan. Kelime turundaki "Cümle Kur" ile aynı hakem ve aynı kart; burada
 * görev "tamam" sayılması için genel puan ≥ 70 (yedekte: kelimeler geçti).
 */
function SentenceTask({ task, level, onDone }: { task: SentenceTaskData; level: string; onDone: (ok: boolean) => void }) {
  const t = useT();
  const lang = useTargetLang();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Assessment | FallbackAssessment | null>(null);
  const [failure, setFailure] = useState<AssessFailure | null>(null);
  const [ok, setOk] = useState(false);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  async function evaluate() {
    const typed = text.trim();
    if (!typed || busy || result) return;
    setBusy(true);
    const req: AssessRequest = {
      kind: "sentence",
      level: level as AssessLevel,
      task: { prompt: task.prompt ?? `Bu kelimelerle bir cümle kur: ${task.words.map((w) => w.de).join(", ")}`, targets: task.words.map((w) => w.de) },
      answer: { text: typed },
      lang,
    };
    const ai = await askAssess(req);
    if (ai.ok) {
      setResult(ai.result);
      /* Cumle gorevinin gecme notu da sabitten (`SKILL_DONE_PCT`); dosyanin
         kendi yorumu "genel puan >= 70" diyordu ama sayi kodda elle
         yaziliydi. */
      setOk(ai.result.score.overall >= SKILL_DONE_PCT);
    } else {
      const fb = fallbackAssessment(req, t);
      setResult(fb);
      setFailure(ai.reason);
      setOk(fb.checks.filter((c) => c.kind === "target").every((c) => c.ok) && fb.words >= 3);
    }
    setBusy(false);
  }

  function insert(ch: string) {
    const el = areaRef.current;
    if (!el) return setText(text + ch);
    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;
    setText(text.slice(0, start) + ch + text.slice(end));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + ch.length, start + ch.length);
    });
  }

  return (
    <section className="card mt-4 p-5">
      <p className="text-micro uppercase tracking-wide text-[color:var(--color-brand)]">{t("games.free_sentence")}</p>
      <p className="mt-1.5 text-strong leading-relaxed">{task.prompt ?? t("rounds.build_sentence")}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {task.words.map((w) => (
          <button key={w.de} type="button" onClick={() => insert((text && !text.endsWith(" ") ? " " : "") + w.de + " ")} disabled={Boolean(result)} className="chip px-3 py-1.5 text-body" title={w.tr}>
            <strong lang={lang}>{w.de}</strong>
            <span className="muted ml-1.5 text-caption">{w.tr}</span>
          </button>
        ))}
      </div>
      {result ? (
        <div className="mt-3 flex flex-col gap-3">
          <AssessmentCard answer={text.trim()} result={result} failure={failure} example={task.sample ?? null} />
          <button type="button" onClick={() => onDone(ok)} className="btn btn-primary min-h-12 px-4 text-body">
            {t("common.continue")}
          </button>
        </div>
      ) : (
        <>
          <textarea
            ref={areaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            lang={lang}
            spellCheck={false}
            placeholder={t("rounds.write_a_sentence_ph")}
            className="card mt-3 min-h-20 w-full resize-none px-4 py-3 text-body outline-none"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {(["ä", "ö", "ü", "ß"] as const).map((ch) => (
              <button key={ch} type="button" onClick={() => insert(ch)} className="btn btn-ghost min-h-9 min-w-9 px-3 text-body">
                {ch}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => void evaluate()} disabled={busy || text.trim().split(/\s+/).length < 2} className="btn btn-primary mt-3 min-h-12 w-full px-4 text-body">
            {t(busy ? "exam.evaluating" : "mockexam.evaluate")}
          </button>
        </>
      )}
    </section>
  );
}


/* ───────────── form (WP-31) ───────────── */

function foldShort(s: string): string {
  return s.toLocaleLowerCase("de-DE").replace(/[.,!?;:]/g, "").replace(/\s+/g, " ").trim().replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue");
}
function fieldOk(typed: string, answer: string, accept: string[] = []): boolean {
  const t = foldShort(typed);
  if (!t) return false;
  return [answer, ...accept].some((a) => {
    const f = foldShort(a);
    return f === t || (f.length >= 5 && levenshtein(f, t) <= 1);
  });
}

/**
 * Form doldurma: Türkçe verilen bilgileri Almanca alanlara yaz. A1
 * "Schreiben Teil 1"in karşılığı — alan adını anlayıp doğru bilgiyi doğru
 * yere koymak. Alanların ≥ %70'i doğruysa görev tamam.
 */
function FormTask({ task, onDone }: { task: FormTaskData; onDone: (ok: boolean) => void }) {
  const t = useT();
  const lang = useTargetLang();
  const [values, setValues] = useState<string[]>(() => task.fields.map(() => ""));
  const [checked, setChecked] = useState(false);
  const results = task.fields.map((f, i) => fieldOk(values[i], f.answer, f.accept));
  const okCount = results.filter(Boolean).length;
  const ok = okCount >= Math.ceil(task.fields.length * 0.7);
  return (
    <section className="card mt-4 p-5">
      <p className="text-micro uppercase tracking-wide text-[color:var(--color-brand)]">Formu doldur</p>
      <p className="mt-1.5 text-strong leading-relaxed">{task.prompt}</p>
      <p className="muted mt-1 rounded-panel px-3 py-2 text-caption leading-relaxed surface-2">{task.facts}</p>
      <div className="mt-3 space-y-2">
        {task.fields.map((f, i) => (
          <label key={f.label} className="block">
            <span className="muted text-caption" lang={lang}>{f.label}</span>
            <div className="mt-0.5 flex items-center gap-2">
              <input
                type="text"
                value={values[i]}
                onChange={(e) => setValues(values.map((v, j) => (j === i ? e.target.value : v)))}
                disabled={checked}
                lang={lang}
                spellCheck={false}
                className="input flex-1 py-2 text-body"
                style={checked ? { borderColor: results[i] ? "var(--color-mint)" : "var(--color-rose)" } : undefined}
              />
              {checked ? (
                results[i] ? (
                  <CheckIcon size={16} className="shrink-0 text-[color:var(--color-mint)]" />
                ) : (
                  <span className="shrink-0 text-caption" lang={lang}>
                    <span className="muted">{t("rounds.answer_is")}</span>
                    <strong>{f.answer}</strong>
                  </span>
                )
              ) : null}
            </div>
          </label>
        ))}
      </div>
      {checked ? (
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-strong" style={{ color: ok ? "var(--color-mint)" : "var(--color-rose)" }}>
            {t("writew.fields_ok", { n: okCount, total: task.fields.length })}
          </p>
          <button type="button" onClick={() => onDone(ok)} className="btn btn-primary min-h-11 px-4 text-body">
            {t("common.continue")}
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => setChecked(true)} disabled={values.every((v) => !v.trim())} className="btn btn-primary mt-3 min-h-12 w-full px-4 text-body">
          {t("skillquiz.check")}
        </button>
      )}
    </section>
  );
}

/* ───────────── yeniden yaz (WP-31) ───────────── */

/**
 * Verilen cümleyi başka biçimde yaz (resmî/samimi, olumsuz, geçmiş).
 * Eşleştirme WP-10 cümle kütüphanesi: yazım sapması geçer, sıra hatası ve
 * yanlış biçim geçmez; fark vurgusu + gerekçe drill'le aynı dilde.
 */
function RewriteTask({ task, onDone }: { task: RewriteTaskData; onDone: (ok: boolean) => void }) {
  const t = useT();
  const lang = useTargetLang();
  const [text, setText] = useState("");
  const [match, setMatch] = useState<SentenceMatch | null>(null);
  const ok = match ? match.verdict === "exact" || match.verdict === "spelling" : false;
  return (
    <section className="card mt-4 p-5">
      <p className="text-micro uppercase tracking-wide text-[color:var(--color-brand)]">{t("writp.rewrite")}</p>
      <p className="mt-1.5 text-strong leading-relaxed">{task.prompt}</p>
      <p className="mt-2 rounded-panel px-3 py-2 text-strong surface-2" lang={lang}>
        {task.source}
      </p>
      {match ? (
        <div className="mt-3 space-y-2">
          <p className="text-strong" style={{ color: ok ? "var(--color-mint)" : "var(--color-rose)" }}>
            {t(match.verdict === "exact" ? "writp.exact" : match.verdict === "spelling" ? "writp.spelling_only" : match.verdict === "order" ? "writp.order_only" : "lessonp.not_quite")}
          </p>
          {match.verdict !== "exact" ? (
            <div className="rounded-panel px-3 py-2 text-body surface-2">
              <p className="muted text-micro">{t("mockexam.your_answer")}</p>
              <TypedTokens tokens={match.typed} />
              <p className="muted mt-1.5 text-micro">{t("mockexam.correct_answer")}</p>
              <TokenDiff tokens={match.target} />
            </div>
          ) : null}
          {task.why ? <p className="muted text-caption leading-relaxed">{task.why}</p> : null}
          <button type="button" onClick={() => onDone(ok)} className="btn btn-primary min-h-12 w-full px-4 text-body">
            {t("common.continue")}
          </button>
        </div>
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (text.trim()) setMatch(matchSentence(text, task.answer, task.alternatives ?? []));
              }
            }}
            rows={2}
            lang={lang}
            spellCheck={false}
            placeholder={t("writp.rewrite_ph")}
            className="card mt-3 min-h-16 w-full resize-none px-4 py-3 text-body outline-none"
          />
          <button
            type="button"
            onClick={() => text.trim() && setMatch(matchSentence(text, task.answer, task.alternatives ?? []))}
            disabled={!text.trim()}
            className="btn btn-primary mt-3 min-h-12 w-full px-4 text-body"
          >
            {t("skillquiz.check")}
          </button>
        </>
      )}
    </section>
  );
}
