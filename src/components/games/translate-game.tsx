"use client";

import { useEffect, useRef, useState } from "react";
import { focusOnFine } from "@/lib/focus-fine";
import { GameShell } from "./game-shell";
import { useBlindAnswers, useNoHints } from "./no-hints";
import { useRoundExit } from "./use-round-exit";
import { targetName, type GameProps, type GameResult } from "./types";
import type { Round } from "@/lib/types";
import { vibrate } from "@/lib/fx";
import { prefetchWord } from "@/components/speak-button";
import { matchSentence, type SentenceMatch } from "@/lib/sentence-match";
import { askAssess } from "@/lib/assess-client";
import { whyFor, type Why } from "@/lib/why";
import { useT, useLang } from "@/lib/i18n/client";
import { useCourse } from "@/components/app-shell";
import { targetLangOf } from "@/lib/courses";
import { translateSourceFor } from "@/lib/option-label";

type TranslateRound = Extract<Round, { game: "translate" }>;
type Status = "idle" | "checking" | "correct" | "wrong";

const SPECIAL_CHARS = ["ä", "ö", "ü", "ß"] as const;
/** Yanlışta düzeltme satırını okumak için ek pay. */
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
  const course = useCourse();
  const tx = useT();
  const lang = useLang();
  // Sınav kâğıdında ipucu düğmesi yok (bkz. no-hints.tsx).
  const noHints = useNoHints();
  /* Sınavda hüküm gösterilmiyor (bkz. no-hints.tsx `BlindAnswers`, QA F-0017). */
  const blind = useBlindAnswers();
  const { word, sentence, alternatives } = round;
  /* Çevrilecek cümle ANADİLDE (`translateSourceFor`). Sunucu `native`i koyuyor; eski kayıtlı turda
     yalnız Türkçe anadilde `tr`ye düşülüyor. */
  const { text: source, sub: sourceSub } = translateSourceFor(sentence, lang);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [hintShown, setHintShown] = useState(false);
  const [result, setResult] = useState<SentenceMatch | null>(null);
  /** AI "anlamca doğru" dedi: yerel karar yanlışken kabul edildi. */
  const [aiAccepted, setAiAccepted] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const started = useRef(Date.now());
  /* Ekrandaki turun kimliği; söküm ve tur değişimi boşaltıyor. Model
     sorulurken süre biterse ya da kullanıcı çıkarsa geç gelen karar eski
     cümleyi sonraki ekranın üstünde titreşimle okutuyordu. */
  const live = useRef<string | null>(null);
  const { speak } = useRoundExit();
  /* Cevabın sonucu "Devam"a kadar burada bekliyor (bkz. game-shell). */
  const [pending, setPending] = useState<GameResult | null>(null);

  useEffect(() => {
    setValue("");
    setStatus("idle");
    setPending(null);
    setHintShown(false);
    setResult(null);
    setAiAccepted(false);
    started.current = Date.now();
    focusOnFine(inputRef.current);
    prefetchWord(sentence.de);
    live.current = round.id;
    return () => {
      live.current = null;
    };
  }, [round.id, sentence.de]);

  const targetWords = sentence.de.replace(/[.!?…]+$/, "").split(/\s+/).filter(Boolean);

  async function submit() {
    if (status !== "idle") return;
    const typed = value.trim();
    if (!typed) return;
    const latencyMs = Date.now() - started.current;
    let m = matchSentence(typed, sentence.de, alternatives, targetLangOf(course));
    let accepted = m.quality >= 3 && m.verdict !== "order";
    let quality: number = m.quality;

    /* SIRA HÜKMÜ DE SORULUYOR (QA 2026-10-09): "Wir sind zusammen sehr
       glücklich." hedef "Wir sind sehr glücklich zusammen." için "sıra hatası"
       sayıldı; oysa geçerli bir başka diziliş. Yerel hakem sırayı yalnız hedefle
       karşılaştırabiliyor, geçerli mi diye model karar veriyor. */
    if ((m.verdict === "wrong" || m.verdict === "order") && typed.split(/\s+/).length >= 3) {
      // Yerel hakem "yanlış"/"sıra": bir de modele sor, ama tur akışını tutmayacak kadar.
      const id = round.id;
      setStatus("checking");
      const ai = await askAssess(
        {
          kind: "sentence",
          level: (word.niveau as "A1" | "A2" | "B1" | "B2" | "C1") || "A1",
          task: { prompt: tx("assess.ai_translate", { source }), target: sentence.de },
          answer: { text: typed },
          /* Hedef dil: verilmezse uç Almancaya düşüyor ve seviye beklentileri
             Almanca rubriğinden geliyor (`assess-prompts` LEVEL_EXPECTATIONS).
             İngilizce kursta öğrencinin cümlesi yanlış ölçütle puanlanırdı. */
          lang: targetLangOf(course),
        },
        { timeoutMs: ASSESS_WAIT_MS },
      );
      // Beklerken tur değiştiyse ya da ekran kapandıysa karar yutuluyor.
      if (live.current !== id) return;
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
    if (blind) {
      /* Cevap alındı, hüküm yok: ses, titreşim, renk ve katman olmadan
         sıradaki madde. Yük katmanın "Devam"ının verdiğiyle aynı. */
      onDone([{
        wordId: word.id,
        correct,
        latencyMs,
        hintUsed: hintShown,
        quality: hintShown ? Math.min(quality, 3) : quality,
        ...(correct ? {} : { errorType: m.errorType ?? "meaning", detail: typed.slice(0, 60) }),
      }]);
      return;
    }
    // Yazım sapmasıyla kabul: katman "neredeyse" tonunda (aşağıda `tone`), ses de
    // öyle — doğru sesi "kusursuz" derdi. Mobil `TranslateRound` aynı `near`.
    vibrate(!correct ? "wrong" : m.verdict === "spelling" ? "near" : "correct");
    if (hintShown) quality = Math.min(quality, 3);
    setPending({
      wordId: word.id,
      correct,
      latencyMs,
      hintUsed: hintShown,
      quality,
      ...(correct ? {} : { errorType: m.errorType ?? "meaning", detail: typed.slice(0, 60) }),
    });
    speak(sentence.de);
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
        }, lang)
      : null;

  return (
    <GameShell
      label={tx("rounds.translate_into", { lang: targetName(lang) })}
      onContinue={pending ? () => onDone([pending]) : undefined}
      /* HÜKÜM TEK İFADE, cevap kendi satırında: "Doğrusu:" iki kez
         yazılıyordu (etiket + hüküm cümlesi). Yazım sapmasında katman
         "neredeyse" tonunda; sıra hatası yanlış sayılıyor ama adını söylüyor.
         Model kabul ettiyse cevap düz (kuruluş hedefle aynı değildi, işaret
         yanıltırdı). Mobil `TranslateRound` ile aynı alanlar. */
      sheet={
        result && !blind && (status === "correct" || status === "wrong")
          ? {
              correct: status === "correct",
              tone: status === "correct" ? (result.verdict === "spelling" ? "near" : "ok") : "bad",
              label: tx(
                aiAccepted
                  ? "sheet.ai_accepted"
                  : result.verdict === "exact"
                    ? "sheet.correct"
                    : result.verdict === "spelling"
                      ? "sheet.near_spelling"
                      : result.verdict === "order"
                        ? "sheet.order"
                        : "sheet.wrong",
              ),
              answerTokens: aiAccepted ? null : result.target,
              answer: aiAccepted ? sentence.de : null,
              answerTail: result.matched.match(/[.!?…]+$/)?.[0] ?? "",
              speak: sentence.de,
              meaning: source,
              youTokens: status === "wrong" ? result.typed : null,
              diffs: aiAccepted ? null : { target: result.target, typed: result.typed },
              why,
            }
          : null
      }
      prompt={
        <span className="text-h2 sm:text-h1">
          {source}
          {/* Sınavda (`noHints`) İngilizce cümle yok: çevrilecek cümlenin İngilizcesi Almancaya
              ipucu, kapak "ipucu yok" diyor (QA F-0064). */}
          {!noHints && sourceSub ? (
            <span className="block text-body opacity-60" lang="en">
              {sourceSub}
            </span>
          ) : null}
        </span>
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
          enterKeyHint="done"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              void submit();
            }
          }}
          disabled={status !== "idle"}
          rows={2}
          autoCapitalize="sentences"
          autoCorrect="off"
          spellCheck={false}
          lang={course}
          placeholder={tx("rounds.write_sentence_ph")}
          aria-label={tx("rounds.write_sentence_ph")}
          className={`card min-h-16 w-full resize-none px-4 py-3 text-lg outline-none ${
            status === "wrong" && !blind ? "animate-shake border-[color:var(--color-rose)]" : ""
          } ${status === "correct" && !blind ? "border-[color:var(--color-mint)]" : ""}`}
        />

        <div className="flex flex-wrap justify-center gap-2">
          {SPECIAL_CHARS.map((char) => (
            <button
              key={char}
              type="button"
              onClick={() => insertChar(char)}
              disabled={status !== "idle"}
              className="btn btn-ghost min-h-9 min-w-9 px-3 text-h3"
            >
              {char}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {noHints ? null : (
            <button
              type="button"
              onClick={() => status === "idle" && setHintShown(true)}
              disabled={status !== "idle" || hintShown}
              className="btn btn-ghost min-h-12 flex-1 px-4 text-body"
            >
              {tx("rounds.hint")}
            </button>
          )}
          <button
            type="submit"
            disabled={status !== "idle" || value.trim() === ""}
            className="btn btn-primary min-h-12 flex-[2] px-4 text-body"
          >
            {tx(status === "checking" ? "rounds.checking" : blind ? "exam.answer_and_next" : "common.check")}
          </button>
        </div>
        {blind ? <p className="muted text-center text-caption">{tx("exam.answers_at_end")}</p> : null}
      </form>

      {hintShown ? (
        /*
          KULLANILACAK KELİMELER — alfabetik, cümledeki sırayla değil.

          Burada harf iskeleti vardı ("I__ g___ n___ H____") ve o, cümle
          çevirisi için öğretici bir yardım değil: öğrenciye Almancayı değil
          bulmacayı çözdürüyor, harf sayısını sayıp boşluk dolduruyor.

          Malzeme ortada ama iş duruyor: hangi kelimenin nereye gideceği,
          fiilin ikinci konumu, çekim ve büyük harf hâlâ öğrencinin. Kalite
          yine 3'e düşüyor (hintUsed).
        */
        <div className="mt-3">
          <p className="muted mb-1.5 text-center text-micro uppercase tracking-eyebrow">{tx("rounds.hint_words")}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[...new Set(targetWords.map((w) => w.replace(/[.,!?;:]+$/g, "")).filter(Boolean))]
              .sort((a, b) => a.localeCompare(b, "de"))
              .map((w) => (
                <span key={w} className="surface-2 rounded-chip px-3 py-1 text-strong">
                  {w}
                </span>
              ))}
          </div>
        </div>
      ) : null}
    </GameShell>
  );
}
