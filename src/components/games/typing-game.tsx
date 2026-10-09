"use client";

import { useEffect, useRef, useState } from "react";
import { currentTargetLang } from "@/components/games/types";
import { focusOnFine } from "@/lib/focus-fine";
import { whyFor } from "@/lib/why";
import { classifyTyping, miss, typoNear } from "@/lib/errors";
import { GameShell } from "./game-shell";
import { useBlindAnswers, useNoHints } from "./no-hints";
import { useRoundExit } from "./use-round-exit";
import { grammarLine } from "./grammar-line";
import { targetName, matchesAnswer, withArtikel, type GameProps, typLabel, type GameResult , meaningOf, meaningSubOf } from "./types";
import type { Round } from "@/lib/types";
import { vibrate } from "@/lib/fx";
import { prefetchWord } from "@/components/speak-button";
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
  /* Sınavda hüküm gösterilmiyor (bkz. no-hints.tsx `BlindAnswers`, QA F-0017). */
  const blind = useBlindAnswers();
  const { word } = round;

  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  /* Doğru sayılan tek harflik yazım hatası (`typoNear`): katman "Neredeyse · yazım". */
  const [typo, setTypo] = useState(false);
  /* Anadilde aynı anlamı taşıyan başka kelime yazıldı (`round.sameGloss`): ceza yok, ayrım söylenir. */
  const [same, setSame] = useState<{ de: string; sub: string | null } | null>(null);
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
    setTypo(false);
    setSame(null);
    setPending(null);
    setHintUsed(false);
    setHintShown(Boolean(round.assist));
    started.current = Date.now();
    focusOnFine(inputRef.current);
    // Cevaptan sonra okunacak metin baştan belli: kelimenin doğru yazımı.
    // Önden indirmek dokunuşla sesin başlaması arasındaki boşluğu kapatıyor.
    prefetchWord(withArtikel(word));
  }, [round.id, word, round.assist]);

  function submit() {
    if (status !== "idle") return;
    // Kabul edilen yazımlar: madde başlığının bütün makul biçimleri (artikelsiz,
    // sich'siz, eğik çizgiyle ayrılanların her biri) ve aynı Türkçe anlama sahip
    // diğer Almanca kelimeler.
    // Artikelli hâl de aday: kelime artikelsiz saklansa bile "die Tür" doğrudur.
    const exact = matchesAnswer(value, [
      withArtikel(word),
      word.de,
      ...(round.alternatives ?? []),
    ]);
    /* Tek harflik yazım hatası doğru sayılır, "Neredeyse · yazım" ve doğrusu gösterilir
       (`lib/errors` `typoNear`; mobil `game/rounds` `TypingRound` aynı). Kalite 4: tam
       doğrudan bir basamak aşağı (çeviri oyununun yazım sapmasıyla aynı). */
    /* "almak" sorusuna nehmen (bekommen istenirken): Türkçe soru iki anlamlı, ayrım yalnız ikinci
       satırda. Doğru sayılır, kalite 3, katman farkı söyler (Samet, 2026-10-07). */
    const sameHit = !exact ? (round.sameGloss ?? []).find((s) => matchesAnswer(value, [s.de])) ?? null : null;
    const near = !exact && !sameHit && typoNear(value, [word.de, ...(round.alternatives ?? [])]) !== null;
    const correct = exact || near || !!sameHit;
    if (blind) {
      /* Cevap alındı, hüküm yok: ses, titreşim, renk ve katman olmadan
         sıradaki madde. Yük katmanın "Devam"ının verdiğiyle aynı. */
      setStatus(correct ? "correct" : "wrong");
      onDone([{
        wordId: word.id,
        correct,
        latencyMs: Date.now() - started.current,
        hintUsed,
        ...(near ? { quality: hintUsed ? 3 : 4 } : sameHit ? { quality: 3 } : {}),
        ...miss(correct, classifyTyping(value, [word.de, ...(round.alternatives ?? [])]), value),
      }]);
      return;
    }
    setTypo(near);
    setSame(sameHit);
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
    vibrate(near || sameHit ? "near" : correct ? "correct" : "wrong");
    setPending({
      wordId: word.id,
      correct,
      latencyMs,
      hintUsed,
      /* Kalite verilince sunucu ipucu cezasını kendisi uygulamıyor: ipucuyla 3. */
      ...(near ? { quality: hintUsed ? 3 : 4 } : sameHit ? { quality: 3 } : {}),
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
      onContinue={pending ? () => onDone([pending]) : undefined}
      /* Dil bilgisi satırı (tür + çoğul/çekim) YALNIZ katmanda: soruda
         yalnız tür var, çoğul orada cevabı ele verirdi. */
      sheet={
        status === "idle" || blind
          ? null
          : {
              correct: status === "correct",
              ...(typo ? { tone: "near" as const, label: tx("sheet.near_spelling") } : {}),
              ...(same ? { tone: "near" as const, label: tx("sheet.near_same_gloss", { gloss: meaningOf(word, lang) }) } : {}),
              answer: withArtikel(word),
              meaning: meaningOf(word, lang),
              detail: grammarLine(word, lang),
              you: value.trim(),
              why: same
                ? whyFor({ type: "meaning", targetLang: currentTargetLang(), word, detail: value, sameGloss: { sub: same.sub, wordSub: meaningSubOf(word, lang) } }, lang)
                : status === "wrong"
                  ? whyFor({
                      type: classifyTyping(value, [word.de, ...(round.alternatives ?? [])]),
                      targetLang: currentTargetLang(),
                      word,
                      detail: value,
                    }, lang)
                  : null,
            }
      }
      prompt={
        /* KLAVYE AÇIKKEN (`kb`, bkz. globals.css) soru küçülüyor, tür çipi ve
           özel harf satırı kalkıyor. 320×568'de klavye düzen alanını ~310
           piksele indiriyor; soru kartı, alan, ä/ö/ü/ß satırı ve düğmeler
           ~390 piksel istiyordu ve öğrenci ya soruyu ya "Kontrol et"i
           kaydırarak arıyordu. Özel harfler klavyenin kendisinde uzun basışla
           var; klavye kapanınca satır geri geliyor. */
        <span className="text-h1 kb:text-h2 sm:text-display">
          {meaningOf(word, lang)}
          {/* İkinci satır anadile bağlı çözücüden (`meaningSubOf`): `word.en` anadili İngilizce olana
              ana satırın aynısını ikinci kez basıyordu. */}
          {/* Sınavda (`noHints`) İngilizce satır yok: Almanca yazdıran maddede İngilizce karşılık
              ipucu, kapak "ipucu yok" diyor (QA F-0064). Aynı anlamlı kelime (`sameGloss`) yine doğru. */}
          {!noHints && meaningSubOf(word, lang) ? (
            <span className="block text-body opacity-60" lang="en">
              {meaningSubOf(word, lang)}
            </span>
          ) : null}
        </span>
      }
      /* Yalnız tür/çoğul satırı - Android'deki hâliyle aynı. Burada ayrıca
         "{n} harf · {X} ile başlıyor" yazıyordu ve bu BEDAVA bir ipucuydu:
         aynı kelime webde harf sayısı ve baş harfi bilinerek yazılıyor,
         Androidde bilinmeden. İkisi de `hintUsed` göndermiyordu, yani SRS iki
         cevabı aynı kalitede sayıyordu. İpucu iskeleti iki tarafta da düğmenin
         arkasında ve orası ceza kaydediyor. */
      hint={
        <div className="flex items-center justify-center gap-2 kb:hidden">
          <span className="surface-2 rounded-full px-2.5 py-0.5 text-micro uppercase tracking-eyebrow">
            {typLabel(word.typ, meaningOf(word, lang), lang)}
          </span>
        </div>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex flex-col gap-3 kb:gap-2"
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status !== "idle"}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="done"
          placeholder={tx("rounds.type")}
          aria-label={tx("rounds.type")}
          className={`card min-h-14 w-full px-4 text-lg outline-none ${
            status === "wrong" && !blind ? "animate-shake border-[color:var(--color-rose)]" : ""
          } ${status === "correct" && !blind ? "border-[color:var(--color-mint)]" : ""}`}
        />

        <div className="flex flex-wrap justify-center gap-2 kb:hidden">
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
              onClick={showHint}
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
            {tx(blind ? "exam.answer_and_next" : "common.check")}
          </button>
        </div>
        {blind ? <p className="muted text-center text-caption">{tx("exam.answers_at_end")}</p> : null}
      </form>

      {hintShown ? (
        <p
          className="mt-3 text-center font-mono text-strong tracking-wide"
          style={{ color: "var(--text)" }}
        >
          {skeleton(word.de)}
        </p>
      ) : null}

    </GameShell>
  );
}
