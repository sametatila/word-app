"use client";

import { useEffect, useRef, useState } from "react";
import { GameShell } from "./game-shell";
import { withArtikel, type GameProps } from "./types";
import type { Round } from "@/lib/types";
import { fx, vibrate } from "@/lib/fx";
import { askAssess, fallbackAssessment, type AssessFailure, type FallbackAssessment } from "@/lib/assess-client";
import type { Assessment, AssessLevel, AssessRequest } from "@/lib/assess-prompts";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import { firstExample } from "@/lib/example";
import { whyFor, type Why } from "@/lib/why";

type FreeRound = Extract<Round, { game: "free_sentence" }>;
type Status = "idle" | "checking" | "done";

const SPECIAL_CHARS = ["ä", "ö", "ü", "ß"] as const;

/**
 * "Cümle Kur" — verilen 2–3 kelimeyle özgün cümle (plan WP-12).
 *
 * Kelime turunun tek gerçek serbest üretimi: hedef yok, şık yok, yalnız
 * kelimeler. Hakem `/api/assess` rubriği (görev/dilbilgisi/kelime/yapı,
 * span vurgulu hatalar, düzeltilmiş hâl); sağlayıcı yoksa kural tabanlı
 * yedek (hedef kelimeler geçti mi, uzunluk) ve ekranda "AI kapalı" satırı —
 * yedek dilbilgisini ölçemediği için kaliteyi 3'ün üstüne çıkarmaz.
 *
 * SRS eşlemesi: overall ≥ 90 → 5, ≥ 70 → 4 (doğru), 40–69 → 3 (yanlış ama
 * lapse yok), < 40 → 2. Hata tipi rubriğin ilk hatasından.
 */
export function FreeSentenceGame({ round, onDone }: GameProps<FreeRound>) {
  const { word, partners, level } = round;
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Assessment | FallbackAssessment | null>(null);
  const [failure, setFailure] = useState<AssessFailure | null>(null);
  const [outcome, setOutcome] = useState<{ correct: boolean; quality: number } | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const started = useRef(Date.now());
  const abort = useRef<AbortController | null>(null);

  useEffect(() => {
    setValue("");
    setStatus("idle");
    setResult(null);
    setFailure(null);
    setOutcome(null);
    started.current = Date.now();
    inputRef.current?.focus();
    return () => abort.current?.abort();
  }, [round.id]);

  const targets = [word, ...partners];

  async function evaluate() {
    if (status !== "idle") return;
    const typed = value.trim();
    if (!typed) return;
    setStatus("checking");
    abort.current = new AbortController();
    const req: AssessRequest = {
      kind: "sentence",
      level: level as AssessLevel,
      task: {
        prompt: `Bu kelimelerle bir cümle kur: ${targets.map((t) => withArtikel(t)).join(", ")}`,
        targets: targets.map((t) => t.de),
      },
      answer: { text: typed },
      locale: "tr",
    };
    const ai = await askAssess(req, { signal: abort.current.signal });
    if (ai.ok) {
      setResult(ai.result);
      setFailure(null);
      const o = ai.result.score.overall;
      const quality = o >= 90 ? 5 : o >= 70 ? 4 : o >= 40 ? 3 : 2;
      setOutcome({ correct: o >= 70, quality });
      vibrate(o >= 70 ? "correct" : "wrong");
      fx(o >= 70 ? "correct" : "wrong", 600);
    } else {
      if (ai.reason === "aborted") return;
      const fb = fallbackAssessment(req);
      setResult(fb);
      setFailure(ai.reason);
      // Yedek dilbilgisini bilmiyor: kalite 3'ü aşmaz, "doğru" yalnız
      // kelimelerin hepsi geçip cümle uzunluğu tutuyorsa.
      const targetsOk = fb.checks.filter((c) => c.label.startsWith("Kalıp")).every((c) => c.ok);
      const correct = targetsOk && fb.words >= 3;
      setOutcome({ correct, quality: correct ? 3 : 2 });
      vibrate(correct ? "correct" : "wrong");
    }
    setStatus("done");
  }

  function finish() {
    if (!outcome || !result) return;
    const typed = value.trim();
    const firstError = "errors" in result && result.errors.length ? result.errors[0] : null;
    onDone([
      {
        wordId: word.id,
        correct: outcome.correct,
        latencyMs: Date.now() - started.current,
        quality: outcome.quality,
        ...(outcome.correct
          ? {}
          : { errorType: firstError?.type ?? "meaning", detail: (firstError?.wrong || typed).slice(0, 60) }),
      },
    ]);
  }

  function insertChar(char: string) {
    if (status !== "idle") return;
    const el = inputRef.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    setValue(value.slice(0, start) + char + value.slice(end));
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(start + char.length, start + char.length);
    });
  }

  const why: Why | null =
    outcome && !outcome.correct && result && "errors" in result && result.errors[0]
      ? // Rubriğin "wrong" parçası bir cümle parçası; artikel/çoğul gerekçesi
        // onu seçilen şık sanırdı. Yalnız yazım/anlam tiplerinde geçirilir.
        whyFor({
          type: result.errors[0].type,
          word,
          detail: ["spelling", "meaning"].includes(result.errors[0].type) ? result.errors[0].wrong : null,
        })
      : null;

  return (
    <GameShell
      label="Cümle Kur"
      verdict={outcome ? (outcome.correct ? "correct" : "wrong") : null}
      why={why}
      pull={false}
      feedback={
        result && outcome ? (
          <span>
            {outcome.correct ? "Güzel cümle" : "Bir daha bak"} — puan <strong>{result.score.overall}</strong>
            {"offline" in result && result.offline ? <span className="font-normal opacity-80"> · temel kontrol</span> : null}
          </span>
        ) : null
      }
      prompt={<span className="brand-text text-xl font-bold sm:text-2xl">Bu kelimelerle bir cümle kur</span>}
      hint={
        <div className="flex flex-wrap items-center justify-center gap-2">
          {targets.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => insertChar((value && !value.endsWith(" ") ? " " : "") + t.de + " ")}
              disabled={status !== "idle"}
              className="chip px-3 py-1.5 text-sm"
              title={t.tr}
            >
              <strong lang="de">{withArtikel(t)}</strong>
              <span className="muted ml-1.5 text-xs">{t.tr}</span>
            </button>
          ))}
        </div>
      }
    >
      {status === "done" && result ? (
        <div className="flex flex-col gap-3">
          <AssessmentCard answer={value.trim()} result={result} failure={failure} example={firstExample(word.beispiel)} />
          <button type="button" onClick={finish} className="btn btn-primary min-h-12 px-4 text-sm">
            Devam
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void evaluate();
          }}
          className="flex flex-col gap-3"
        >
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={status !== "idle"}
            rows={3}
            autoFocus
            autoCapitalize="sentences"
            autoCorrect="off"
            spellCheck={false}
            lang="de"
            placeholder="Almanca bir cümle yaz…"
            className="card min-h-20 w-full resize-none px-4 py-3 text-lg outline-none"
          />
          <div className="flex flex-wrap justify-center gap-2">
            {SPECIAL_CHARS.map((char) => (
              <button key={char} type="button" onClick={() => insertChar(char)} disabled={status !== "idle"} className="btn btn-ghost min-h-9 min-w-9 px-3 text-base">
                {char}
              </button>
            ))}
          </div>
          <button type="submit" disabled={status !== "idle" || value.trim().split(/\s+/).length < 2} className="btn btn-primary min-h-12 px-4 text-sm">
            {status === "checking" ? "Değerlendiriliyor…" : "Değerlendir"}
          </button>
        </form>
      )}
    </GameShell>
  );
}
