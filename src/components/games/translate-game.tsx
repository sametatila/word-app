"use client";

import { useEffect, useRef, useState } from "react";
import { GameShell } from "./game-shell";
import { useRoundExit } from "./use-round-exit";
import { withArtikel, type GameProps } from "./types";
import type { Round } from "@/lib/types";
import { fx, vibrate } from "@/lib/fx";
import { prefetchGerman } from "@/components/speak-button";
import { matchSentence, VERDICT_TEXT, type SentenceMatch } from "@/lib/sentence-match";
import { askAssess } from "@/lib/assess-client";
import { whyFor, type Why } from "@/lib/why";
import { TokenDiff, TypedTokens } from "@/components/feedback/diff-text";

type TranslateRound = Extract<Round, { game: "translate" }>;
type Status = "idle" | "checking" | "correct" | "wrong";

const SPECIAL_CHARS = ["ä", "ö", "ü", "ß"] as const;
/** Yanlışta düzeltme satırını okumak için ek pay. */
const WRONG_TAIL_MS = 1600;
/**
 * AI onayı için bekleme tavanı. Yerel hakem "yanlış" dediğinde ve cümle en
 * az üç kelimeyse model bir kez sorulur: anlamca doğru ama başka kuruluşsa
 * (\"Ich trinke gern Kaffee\" ↔ \"Ich mag Kaffee\") öğrenci haksız yere
 * yanlış sayılmasın. Altı saniyeden uzun beklemek tur akışını bozar; süre
 * dolarsa yerel karar geçerli. Sağlayıcı yoksa hiç sorulmaz.
 */
const ASSESS_WAIT_MS = 6000;
const ASSESS_ACCEPT = 75;

/**
 * "Çevir" — Türkçe cümle verilir, Almancası yazılır (plan WP-10).
 *
 * Kelime turunun ilk gerçek cümle üretimi: şık yok, parça yok, boş satır.
 * Kaynak kelimenin kendi örnek cümlesi (havuzdaki `beispiel` + Türkçesi),
 * yani öğrenci daha önce Cümleyi Tamamla / Cümleyi Diz'de gördüğü cümleyi
 * bu kez sıfırdan kuruyor — merdivenin son basamağı.
 *
 * Hakem `lib/sentence-match`: tam / yazım / sıra / yanlış; şeritte doğru
 * cümle fark vurgusuyla (eksik altı çizili, yer değiştirmiş oklu, yazım
 * kalın) ve altında "neden" satırı. İpucu ilk harfleri açar ve kaliteyi
 * düşürür (hintUsed).
 */
export function TranslateGame({ round, onDone }: GameProps<TranslateRound>) {
  const { word, sentence, alternatives } = round;
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [hintShown, setHintShown] = useState(false);
  const [result, setResult] = useState<SentenceMatch | null>(null);
  /** AI "anlamca doğru" dedi: yerel karar yanlışken kabul edildi. */
  const [aiAccepted, setAiAccepted] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const started = useRef(Date.now());
  const { speakAndExit } = useRoundExit();

  useEffect(() => {
    setValue("");
    setStatus("idle");
    setHintShown(false);
    setResult(null);
    setAiAccepted(false);
    started.current = Date.now();
    inputRef.current?.focus();
    prefetchGerman(sentence.de);
  }, [round.id, sentence.de]);

  const targetWords = sentence.de.replace(/[.!?…]+$/, "").split(/\s+/).filter(Boolean);

  async function submit() {
    if (status !== "idle") return;
    const typed = value.trim();
    if (!typed) return;
    const latencyMs = Date.now() - started.current;
    let m = matchSentence(typed, sentence.de, alternatives);
    let accepted = m.quality >= 3 && m.verdict !== "order";
    let quality: number = m.quality;

    if (m.verdict === "wrong" && typed.split(/\s+/).length >= 3) {
      // Yerel hakem "yanlış": bir de modele sor, ama tur akışını tutmayacak kadar.
      setStatus("checking");
      const ai = await askAssess(
        {
          kind: "sentence",
          level: (word.niveau as "A1" | "A2" | "B1" | "B2" | "C1") || "A1",
          task: { prompt: `Çevir: ${sentence.tr}`, target: sentence.de },
          answer: { text: typed },
          locale: "tr",
        },
        { timeoutMs: ASSESS_WAIT_MS },
      );
      if (ai.ok && ai.result.score.overall >= ASSESS_ACCEPT && ai.result.score.task >= 3) {
        accepted = true;
        quality = 4;
        m = { ...m, verdict: "exact", quality: 4, errorType: undefined };
        setAiAccepted(true);
      }
    }

    setResult(m);
    const correct = accepted;
    setStatus(correct ? "correct" : "wrong");
    vibrate(correct ? "correct" : "wrong");
    if (hintShown) quality = Math.min(quality, 3);
    const tail = correct ? 400 : WRONG_TAIL_MS;
    const finish = () =>
      onDone([
        {
          wordId: word.id,
          correct,
          latencyMs,
          hintUsed: hintShown,
          quality,
          ...(correct ? {} : { errorType: m.errorType ?? "meaning", detail: typed.slice(0, 60) }),
        },
      ]);
    speakAndExit(sentence.de, finish, {
      tail,
      onDuration: (ms) => fx(correct ? "correct" : "wrong", ms + tail),
    });
  }

  function insertChar(char: string) {
    if (status !== "idle") return;
    const el = inputRef.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const next = value.slice(0, start) + char + value.slice(end);
    setValue(next);
    requestAnimationFrame(() => {
      el?.focus();
      const pos = start + char.length;
      el?.setSelectionRange(pos, pos);
    });
  }

  // "Anlam" gerekçesi kelime oyunları için yazıldı ("„x“ başka bir kelimenin
  // karşılığı"); cümlede yazılanın tamamını oraya koymak anlamsız. Cümlede
  // yalnız hedef kelimenin anlamı hatırlatılır; sıra/yazım gerekçeleri
  // hedef cümlenin kendisinden çıkar.
  const why: Why | null =
    result && status === "wrong" && result.errorType
      ? whyFor({
          type: result.errorType,
          word,
          detail: result.errorType === "meaning" ? null : value.trim().slice(0, 60),
          answer: targetWords,
          tail: sentence.de.match(/[.!?…]+$/)?.[0] ?? ".",
        })
      : null;

  return (
    <GameShell
      label="Çevir"
      verdict={status === "idle" || status === "checking" ? null : status}
      why={why}
      feedback={
        result ? (
          <span>
            <span className="block">
              {aiAccepted ? "Anlamca doğru — başka bir kuruluş. " : `${VERDICT_TEXT[result.verdict]} `}
              <TokenDiff tokens={result.target} />
            </span>
            {status === "wrong" && result.typed.some((t) => t.mark !== "same") ? (
              <span className="block text-xs font-normal opacity-80">
                Yazdığın: <TypedTokens tokens={result.typed} />
              </span>
            ) : null}
          </span>
        ) : null
      }
      prompt={
        <span className="brand-text text-xl font-bold sm:text-2xl">
          {sentence.tr}
          {sentence.en ? (
            <span className="block text-sm font-normal opacity-60" lang="en">
              {sentence.en}
            </span>
          ) : null}
        </span>
      }
      hint={
        <div className="flex items-center justify-center gap-2 text-xs">
          <span className="surface-2 rounded-full px-2.5 py-0.5 font-semibold uppercase tracking-wide">
            {withArtikel(word)}
          </span>
          <span>{targetWords.length} kelime</span>
        </div>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
        className="flex flex-col gap-3"
      >
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void submit();
            }
          }}
          disabled={status !== "idle"}
          rows={2}
          autoFocus
          autoCapitalize="sentences"
          autoCorrect="off"
          spellCheck={false}
          lang="de"
          placeholder="Almanca cümleyi yaz…"
          className={`card min-h-16 w-full resize-none px-4 py-3 text-lg outline-none ${
            status === "wrong" ? "animate-shake border-[color:var(--color-rose)]" : ""
          } ${status === "correct" ? "border-[color:var(--color-mint)]" : ""}`}
        />

        <div className="flex flex-wrap justify-center gap-2">
          {SPECIAL_CHARS.map((char) => (
            <button
              key={char}
              type="button"
              onClick={() => insertChar(char)}
              disabled={status !== "idle"}
              className="btn btn-ghost min-h-9 min-w-9 px-3 text-base"
            >
              {char}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => status === "idle" && setHintShown(true)}
            disabled={status !== "idle" || hintShown}
            className="btn btn-ghost min-h-12 flex-1 px-4 text-sm"
          >
            İpucu
          </button>
          <button
            type="submit"
            disabled={status !== "idle" || value.trim() === ""}
            className="btn btn-primary min-h-12 flex-[2] px-4 text-sm"
          >
            {status === "checking" ? "Kontrol ediliyor…" : "Kontrol Et"}
          </button>
        </div>
      </form>

      {hintShown ? (
        /* İskelet: her kelimenin ilk harfi. Cümleyi vermez, omurgasını verir;
           kelime sayısı zaten üstte. Kalite 3'e düşer (hintUsed). */
        <p className="mt-3 text-center font-mono text-base font-semibold tracking-wide" style={{ color: "var(--text)" }}>
          {targetWords.map((w) => `${w[0]}${"_".repeat(Math.max(1, Math.min(6, w.length - 1)))}`).join("  ")}
        </p>
      ) : null}
    </GameShell>
  );
}
