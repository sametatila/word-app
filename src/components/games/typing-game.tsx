"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { useRoundExit } from "./use-round-exit";
import { matchesAnswer, withArtikel, type GameProps, typLabel } from "./types";
import type { Round } from "@/lib/types";
import { fx, vibrate } from "@/lib/fx";
import { prefetchGerman } from "@/components/speak-button";

type TypingRound = Extract<Round, { game: "typing" }>;

type Status = "idle" | "correct" | "wrong";

const SPECIAL_CHARS = ["ä", "ö", "ü", "ß"] as const;

/**
 * Yanlış cevapta okumanın üstüne eklenen okuma payı.
 *
 * Yanlışta ekranda yeni bir bilgi beliriyor ("Doğrusu: …"); ses biter bitmez
 * tur kapanırsa o satır okunamıyor. Doğruda böyle bir satır yok.
 */
const WRONG_TAIL_MS = 900;


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
  const { word } = round;

  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [hintUsed, setHintUsed] = useState(false);
  const [hintShown, setHintShown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const started = useRef(Date.now());
  const { speakAndExit } = useRoundExit();

  useEffect(() => {
    setValue("");
    setStatus("idle");
    setHintUsed(false);
    setHintShown(false);
    started.current = Date.now();
    inputRef.current?.focus();
    // Cevaptan sonra okunacak metin baştan belli: kelimenin doğru yazımı.
    // Önden indirmek dokunuşla sesin başlaması arasındaki boşluğu kapatıyor.
    prefetchGerman(withArtikel(word));
  }, [round.id, word]);

  const letterCount = word.de.replace(/\s+/g, "").length;
  const firstLetter = word.de.trim().charAt(0).toUpperCase();

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
    const tail = correct ? 0 : WRONG_TAIL_MS;
    const finish = () => onDone([{ wordId: word.id, correct, latencyMs, hintUsed }]);
    speakAndExit(withArtikel(word), finish, {
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

  function showHint() {
    if (status !== "idle") return;
    setHintUsed(true);
    setHintShown(true);
  }

  return (
    <GameShell
      label="Yazarak Hatırla"
      verdict={status === "idle" ? null : status}
      feedback={
        <span>
          {status === "correct" ? "Harika! " : "Doğrusu: "}
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
        <span className="brand-text text-2xl font-bold sm:text-3xl">
          {word.tr}
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
            {typLabel(word.typ, word.tr)}
          </span>
          <span>
            {letterCount} harf · <strong>{firstLetter}</strong> ile başlıyor
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
          placeholder="Almanca yaz..."
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
          <button
            type="button"
            onClick={showHint}
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
            Kontrol Et
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
