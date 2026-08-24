"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { WritingExercise, WritingTask } from "@/lib/skills/types";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { CheckIcon } from "@/components/icons";
import { seededShuffle } from "@/lib/shuffle";

type BuildTaskData = Extract<WritingTask, { kind: "build" }>;
type FreeTaskData = Extract<WritingTask, { kind: "free" }>;

/**
 * Yazma egzersizi: önce karışık parçalardan cümle kurma (otomatik kontrol),
 * sonra kontrol listesiyle serbest yazma. Görevler sırayla açılır.
 */
export function WritingPlayer({ exercise }: { exercise: WritingExercise }) {
  const total = exercise.tasks.length;
  const { finish, state, reset } = useSkillFinish(exercise, total);
  const [step, setStep] = useState(0);
  const [round, setRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const active = step < total ? exercise.tasks[step] : null;

  function completeTask(ok: boolean) {
    const c = correctCount + (ok ? 1 : 0);
    setCorrectCount(c);
    const next = step + 1;
    setStep(next);
    if (next >= total) void finish(c);
  }

  return (
    <PlayerShell exercise={exercise}>
      <p className="muted px-1 text-sm">{exercise.intro}</p>

      <div className="mt-3 px-1">
        <div className="mb-1.5 flex justify-between text-xs font-semibold">
          <span className="muted">Görev {Math.min(step + 1, total)} / {total}</span>
          <span className="text-[color:var(--color-brand)]">
            {correctCount} tamam
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
        ) : (
          <FreeTask
            key={`${round}-${step}`}
            task={active}
            draftKey={`wortspiel-draft-${exercise.id}-${step}`}
            onDone={completeTask}
          />
        )
      ) : null}

      <ResultCard
        correct={correctCount}
        total={total}
        noun="görev"
        state={state}
        onRetry={() => {
          reset();
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
      <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--color-brand)]">
        Cümleyi kur
      </p>
      <p className="mt-1.5 font-semibold">{task.tr}</p>
      {fails > 0 && task.hint && phase === "editing" ? (
        <p className="muted mt-1.5 text-xs">İpucu: {task.hint}</p>
      ) : null}

      <div
        className={`option mt-4 flex min-h-[3.25rem] flex-wrap items-center gap-2 px-3 py-2.5 ${
          shaking ? "animate-shake" : ""
        } ${phase === "correct" ? "option-correct" : ""} ${phase === "revealed" ? "option-wrong" : ""}`}
      >
        {chosen.length === 0 ? (
          <span className="muted text-sm">Parçalara dokunarak cümleyi kur…</span>
        ) : (
          chosen.map((ti, pos) => (
            <button
              key={`${ti}-${pos}`}
              type="button"
              disabled={locked}
              onClick={() => setChosen(chosen.filter((_, p) => p !== pos))}
              className="chip px-2.5 py-1 text-sm"
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
                className="option px-3 py-1.5 text-sm font-semibold"
              >
                {t}
              </button>
            ),
          )}
        </div>
      ) : null}

      {phase === "correct" ? (
        <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-[color:var(--color-mint)]">
          <CheckIcon size={17} className="mt-0.5 shrink-0" />
          <span lang="de">{task.answer}</span>
        </p>
      ) : null}
      {phase === "revealed" ? (
        <p className="mt-3 text-sm">
          <span className="muted">Doğrusu:</span>{" "}
          <strong lang="de">{task.answer}</strong>
        </p>
      ) : null}

      <div className="mt-4 flex items-center gap-3">
        {locked ? (
          <button
            type="button"
            onClick={() => onDone(phase === "correct")}
            className="btn btn-primary px-6 py-2.5"
          >
            Devam
          </button>
        ) : (
          <>
            <button
              type="button"
              disabled={chosen.length !== tokens.length}
              onClick={check}
              className="btn btn-primary px-6 py-2.5 disabled:opacity-50"
            >
              Kontrol et
            </button>
            {chosen.length > 0 ? (
              <button
                type="button"
                onClick={() => setChosen([])}
                className="btn btn-ghost px-4 py-2.5 text-sm"
              >
                Temizle
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
  onDone,
}: {
  task: FreeTaskData;
  draftKey: string;
  onDone: (ok: boolean) => void;
}) {
  // Taslak cihazda saklanır: sayfadan çıkıp dönen öğrenci yazdığını kaybetmez.
  // localStorage yalnızca istemcide var; hidrasyon uyuşmazlığı olmasın diye
  // taslak mount sonrasında yüklenir ve yüklenene kadar kayıt yapılmaz.
  const [text, setText] = useState("");
  const loaded = useRef(false);
  const [checks, setChecks] = useState<boolean[]>(() => task.checklist.map(() => false));
  const [showSample, setShowSample] = useState(false);
  const areaRef = useRef<HTMLTextAreaElement>(null);

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

  function done(ok: boolean) {
    try {
      localStorage.removeItem(draftKey);
    } catch {
      /* yok say */
    }
    onDone(ok);
  }

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const enough = words >= task.minWords;
  const ready = enough && checks.every(Boolean);

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
      <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--color-brand)]">
        Serbest yazma
      </p>
      <p className="mt-1.5 text-sm font-semibold leading-relaxed">{task.prompt}</p>

      {task.stimulus ? (
        <blockquote
          lang="de"
          className="mt-3 rounded-xl border-l-4 px-3.5 py-2.5 text-sm leading-relaxed surface-2"
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
          <p className="muted mb-1.5 text-xs font-semibold">
            İşine yarayacak kalıplar — dokununca metnine eklenir:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {task.phrases.map((p) => (
              <button
                key={p.de}
                type="button"
                onClick={() => insert(p.de + " ")}
                title={p.tr}
                className="chip px-2.5 py-1 text-xs"
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
        lang="de"
        placeholder="Hier schreiben…"
        className="option mt-3 w-full px-3.5 py-3 text-[15px] leading-relaxed outline-none focus:border-[color:var(--color-brand)]"
      />
      <div className="mt-1.5 flex items-center justify-between">
        <div className="flex gap-1">
          {UMLAUTS.map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => insert(ch)}
              className="chip h-7 w-7 px-0 text-sm"
            >
              {ch}
            </button>
          ))}
        </div>
        <span
          className="text-xs font-bold"
          style={{ color: enough ? "var(--color-mint)" : "var(--text-muted)" }}
        >
          {words} / {task.minWords} kelime
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
            className="flex w-full items-start gap-2.5 text-left text-sm"
          >
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-white"
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
          className="muted text-xs font-semibold underline-offset-2 hover:underline"
        >
          {showSample ? "Örnek cevabı gizle" : "Örnek cevabı göster"}
        </button>
        {showSample ? (
          <div lang="de" className="mt-2 rounded-xl px-3.5 py-3 text-sm leading-relaxed surface-2">
            {task.sample.split("\n\n").map((p, i) => (
              <p key={i} className={`whitespace-pre-line ${i > 0 ? "mt-2" : ""}`}>
                {p}
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          disabled={!ready}
          onClick={() => done(true)}
          className="btn btn-primary px-6 py-2.5 disabled:opacity-50"
        >
          Bitirdim
        </button>
        <button
          type="button"
          onClick={() => done(false)}
          className="btn btn-ghost px-4 py-2.5 text-sm"
        >
          Bu görevi atla
        </button>
      </div>
      {!ready ? (
        <p className="muted mt-2 text-xs">
          Bitirmek için en az {task.minWords} kelime yaz ve kontrol listesini işaretle.
        </p>
      ) : null}
    </section>
  );
}
