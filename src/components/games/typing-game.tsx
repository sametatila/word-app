"use client";

import { useEffect, useRef, useState } from "react";
import { whyFor } from "@/lib/why";
import { classifyTyping, miss } from "@/lib/errors";
import { GameShell } from "./game-shell";
import { useNoHints } from "./no-hints";
import { useRoundExit } from "./use-round-exit";
import { targetName, matchesAnswer, withArtikel, type GameProps, typLabel, type GameResult , meaningOf } from "./types";
import type { Round } from "@/lib/types";
import { vibrate } from "@/lib/fx";
import { prefetchGerman } from "@/components/speak-button";
import { useT, useLang } from "@/lib/i18n/client";

type TypingRound = Extract<Round, { game: "typing" }>;

type Status = "idle" | "correct" | "wrong";

const SPECIAL_CHARS = ["ä", "ö", "ü", "ß"] as const;

/**
 * Yanlış cevapta okumanın üstüne eklenen okuma payı.
 *
 * Yanlışta ekranda yeni bir bilgi beliriyor ("Doğrusu: …"); ses biter bitmez
 * tur kapanırsa o satır okunamıyor. Doğruda böyle bir satır yok.
 */


/**
 * İpucu iskeleti: her kelime parçasının ilk harfi ve sonrasında her üçüncü harf
 * açık, gerisi çizgi. "İlk harf: E" üstteki bilgiyi tekrarlıyordu; iskelet ise
 * kelimenin omurgasını verir ve gerçekten hatırlamaya yardım eder.
 */
function skeleton(de: string): string {
  let li = 0;
  const out: string[] = [];
  for (const ch of de) {
    if (ch === " " || ch === "-") {
      out.push(ch);
      li = 0;
      continue;
    }
    out.push(li % 3 === 0 ? ch : "_");
    li++;
  }
  return out.join(" ");
}

export function TypingGame({ round, onDone }: GameProps<TypingRound>) {
  const tx = useT();
  const lang = useLang();
  // Sınav kâğıdında ipucu düğmesi yok (bkz. no-hints.tsx).
  const noHints = useNoHints();
  const { word } = round;

  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [hintUsed, setHintUsed] = useState(false);
  // İpuçlu tur (yeni kelime / basamak inişi): iskelet baştan açık, ceza yok.
  const [hintShown, setHintShown] = useState(Boolean(round.assist));

  const inputRef = useRef<HTMLInputElement>(null);
  const started = useRef(Date.now());
  const { speak } = useRoundExit();
  /* Cevabın sonucu "Devam"a kadar burada bekliyor (bkz. game-shell). */
  const [pending, setPending] = useState<GameResult | null>(null);

  useEffect(() => {
    setValue("");
    setStatus("idle");
    setPending(null);
    setHintUsed(false);
    setHintShown(Boolean(round.assist));
    started.current = Date.now();
    inputRef.current?.focus();
    // Cevaptan sonra okunacak metin baştan belli: kelimenin doğru yazımı.
    // Önden indirmek dokunuşla sesin başlaması arasındaki boşluğu kapatıyor.
    prefetchGerman(withArtikel(word));
  }, [round.id, word, round.assist]);

  const letterCount = word.de.replace(/\s+/g, "").length;
  const firstLetter = word.de.trim().charAt(0).toUpperCase();
  // Ayraç: çeviri metnindeki harfin yerini bulmak için. Metinde geçmeyecek bir
  // karakter seçildi ki bölme her dilde tam iki parça versin.
  const [hintBefore, hintAfter] = tx("rounds.letter_hint", { n: letterCount, letter: "\u0000" }).split("\u0000");

  function submit() {
    if (status !== "idle") return;
    // Kabul edilen yazımlar: madde başlığının bütün makul biçimleri (artikelsiz,
    // sich'siz, eğik çizgiyle ayrılanların her biri) ve aynı Türkçe anlama sahip
    // diğer Almanca kelimeler.
    // Artikelli hâl de aday: kelime artikelsiz saklansa bile "die Tür" doğrudur.
    const correct = matchesAnswer(value, [
      withArtikel(word),
      word.de,
      ...(round.alternatives ?? []),
    ]);
    setStatus(correct ? "correct" : "wrong");
    const latencyMs = Date.now() - started.current;

    // Kelime cevaptan sonra HER ZAMAN sesli okunuyor — ve her zaman doğru
    // yazımıyla, kullanıcının yazdığıyla değil. Bu oyun sıfırdan hatırlamayı
    // çalıştırıyor; kelimeyi yazıp telaffuzunu hiç duymamak, diğer oyunların
    // hepsinde kurulan yazım–ses bağını tam da en çok gerektiği yerde
    // kopartıyordu. Yanlışta ses tek başına düzeltmenin kendisi oluyor.
    //
    // Süre de artık sabit değil: geçiş çizgisi okumanın gerçek uzunluğunda
    // dolduruluyor, yoksa kısa kelimede boşuna bekleniyor, uzun kelimede ses
    // yarıda kesiliyordu.
    vibrate(correct ? "correct" : "wrong");
    setPending({
      wordId: word.id,
      correct,
      latencyMs,
      hintUsed,
      ...miss(correct, classifyTyping(value, [word.de, ...(round.alternatives ?? [])]), value),
    });
    speak(withArtikel(word));
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

  function showHint() {
    if (status !== "idle") return;
    setHintUsed(true);
    setHintShown(true);
  }

  return (
    <GameShell
      label={tx("rounds.write_equivalent", { lang: targetName(lang) })}
      verdict={status === "idle" ? null : status}
      onContinue={pending ? () => onDone([pending]) : undefined}
      why={
        status === "wrong"
          ? whyFor({
              type: classifyTyping(value, [word.de, ...(round.alternatives ?? [])]),
              word,
              detail: value,
            }, lang)
          : null
      }
      feedback={
        <span>
          {tx(status === "correct" ? "rounds.great" : "rounds.answer_is")}
          <strong>{withArtikel(word)}</strong>
          {word.en ? (
            <span className="font-normal opacity-70" lang="en">
              {" "}
              · {word.en}
            </span>
          ) : null}
        </span>
      }
      prompt={
        <span className="text-2xl font-bold sm:text-3xl">
          {meaningOf(word, lang)}
          {word.en ? (
            <span className="block text-base font-normal opacity-60" lang="en">
              {word.en}
            </span>
          ) : null}
        </span>
      }
      hint={
        <div className="flex items-center justify-center gap-2">
          <span className="surface-2 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide">
            {typLabel(word.typ, meaningOf(word, lang), lang)}
          </span>
          <span>
            {/* Baş harf kalın kalmalı ama cümledeki YERİ dile göre değişiyor:
                metin bir ayraçla üretilip ikiye bölünüyor, kalın harf araya
                giriyor. Kalıbı Türkçenin söz dizimine sabitlemenin tek yolu
                buydu. */}
            {hintBefore}
            <strong>{firstLetter}</strong>
            {hintAfter}
            {round.assist ? tx("rounds.with_hints") : ""}
          </span>
        </div>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex flex-col gap-3"
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status !== "idle"}
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder={tx("rounds.type")}
          className={`card min-h-14 w-full px-4 text-lg outline-none ${
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
          {noHints ? null : (
            <button
              type="button"
              onClick={showHint}
              disabled={status !== "idle" || hintShown}
              className="btn btn-ghost min-h-12 flex-1 px-4 text-sm"
            >
              {tx("rounds.hint")}
            </button>
          )}
          <button
            type="submit"
            disabled={status !== "idle" || value.trim() === ""}
            className="btn btn-primary min-h-12 flex-[2] px-4 text-sm"
          >
            {tx("common.check")}
          </button>
        </div>
      </form>

      {hintShown ? (
        <p
          className="mt-3 text-center font-mono text-base font-semibold tracking-wide"
          style={{ color: "var(--text)" }}
        >
          {skeleton(word.de)}
        </p>
      ) : null}

    </GameShell>
  );
}
