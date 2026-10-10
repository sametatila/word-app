"use client";

import { useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { motion } from "framer-motion";
import { GameShell } from "./game-shell";
import { grammarNote, typLabel, withArtikel, type GameProps , meaningOf, meaningSubOf } from "./types";
import type { Round } from "@/lib/types";
import { firstExample } from "@/lib/example";
import { exampleFor } from "@/lib/option-label";
import { SentenceTranslation } from "@/components/meaning-text";
import { SpeakButton, speakWord } from "@/components/speak-button";
import { useT, useLang } from "@/lib/i18n/client";
import { ReportFlag, useRoundReport } from "@/components/report-flag";

type IntroRound = Extract<Round, { game: "intro" }>;

const ARTIKEL_TONE: Record<string, string> = {
  der: "var(--color-sky-600)",
  die: "var(--color-rose-600)",
  das: "var(--color-mint-600)",
};

/** Yeni kelimeyi tanıtır — cevap beklenmez, kalite puanı "iyi" sayılır. */
export function IntroGame({ round, onDone }: GameProps<IntroRound>) {
  const tx = useT();
  const lang = useLang();
  const { word } = round;
  const [revealed, setRevealed] = useState(false);
  const [skipping, setSkipping] = useState(false);
  /* "BİLDİR" TANITIM KARTINDA DA (2026-10-06, Samet): sonuç katmanı olmadığı için öteki
     turların bağlantısı burada hiç çıkmıyordu. Sınavda kapsam yok, bayrak da yok. */
  const report = useRoundReport();
  const started = useRef(Date.now());
  /* Tur bir kez biter. "Bunu zaten biliyorum" isteği sürerken "Anladım"a
     basılırsa geç gelen `onDone([])` sıradaki turun üstüne düşüyor: sayaç ve
     seri geri sarılıyor, etap kartı ya da son tur kaydı yinelenebiliyordu.
     `live` ekrandaki turun kimliği; söküm ve tur değişimi onu boşaltıyor. */
  const done = useRef(false);
  const live = useRef<string | null>(null);
  const example = firstExample(word.beispiel);
  /* Örneğin çevirisi ANADİLDE (`exampleFor`): Türkçe ve İngilizce satır herkese birlikte basılıyordu. */
  const exampleNative = exampleFor(
    { sentenceTr: firstExample(word.beispielTr), sentenceEn: firstExample(word.beispielEn), sentenceDe: firstExample(word.beispielDe ?? null) },
    lang,
  );

  useEffect(() => {
    started.current = Date.now();
    done.current = false;
    live.current = round.id;
    setRevealed(false);
    setSkipping(false);
    const t = setTimeout(() => setRevealed(true), 900);
    // Yeni kelimeyi bir kez sesli oku: öğrencinin ilk sorusu "nasıl okunuyor?"
    const s = setTimeout(() => speakWord(withArtikel(round.word)), 350);
    return () => {
      live.current = null;
      clearTimeout(t);
      clearTimeout(s);
    };
  }, [round.id, round.word]);

  return (
    <GameShell
      label={tx("rounds.new_word")}
      /* Tanıtım kartında doğru/yanlış diye bir şey yok: sonuç katmanı hiç
         kurulmuyor ve yeri de ayrılmıyor. İki düğme kartın kendi akışında. */
      /* Okuma bölgesi bu turda BOŞ: tanıtım kartında sorulan bir soru yok.
         Bir süre Nomi oraya oturuyordu; maskot artık yalnız Öğren ekranının
         günlük tur kutusunda (2026-09-22), kart yine prompt'suz çiziliyor. */
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card relative mx-auto w-full max-w-md p-5 text-center"
      >
        {/* Seviye rozeti kartın içinde durur: kelimeyle birlikte okunur, başlığın
            altında ayrı bir satır tüketmez. */}
        <span
          className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-micro tracking-wide"
          style={{
            background: "var(--brand-tint)",
            color: "var(--color-brand)",
          }}
        >
          {word.niveau}
        </span>
        {word.artikel ? (
          <span
            className="mb-2 inline-block rounded-full px-3 py-1 text-strong text-white"
            style={{ background: ARTIKEL_TONE[word.artikel] ?? "var(--color-brand-700)" }}
          >
            {word.artikel}
          </span>
        ) : null}
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-display sm:text-display">{word.de}</h2>
          <SpeakButton word text={withArtikel(word)} />
        </div>
        <p className="muted mt-1 text-body">
          {typLabel(word.typ, meaningOf(word, lang), lang)}
          {grammarNote(word, lang) ? ` · ${grammarNote(word, lang)}` : ""}
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-h2 text-[color:var(--color-brand)]"
        >
          {meaningOf(word, lang)}
          {/* İngilizce Türkçenin altında, bir kademe küçük: kartın merkezinde
              hâlâ tek bir karşılık var, ikincisi onu doğrulayan satır. */}
          {meaningSubOf(word, lang) ? (
            <span className="mt-0.5 block text-body opacity-70" lang="en">
              {meaningSubOf(word, lang)}
            </span>
          ) : null}
        </motion.p>

        {example ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="muted mt-3 border-t pt-3 text-body italic"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="inline-flex items-center gap-1">
              {example}
              <SpeakButton word text={example} size="sm" />
            </span>
            <SentenceTranslation
              tr={exampleNative?.text ?? null}
              en={exampleNative?.sub ?? null}
              className="mt-1 not-italic opacity-80"
            />
          </motion.p>
        ) : null}
      </motion.div>
      {/* Kartın "Bildir"i kartın altında, sol başta (her yerdeki yer; eskiden
          düğmelerin altında ortadaydı). Mobil `IntroRound` aynı. */}
      {report && revealed ? (
        <ReportFlag className="mt-2" surface={report.surface} target={report.target} content={report.content} onOpenChange={report.onOpenChange} />
      ) : null}

      <div className="mx-auto mt-4 w-full max-w-md space-y-2">
        <button
          onClick={() => {
            if (done.current) return;
            done.current = true;
            onDone([
              {
                wordId: word.id,
                correct: true,
                latencyMs: Date.now() - started.current,
                hintUsed: true,
              },
            ]);
          }}
          className="btn btn-primary w-full px-6 py-3 text-h3"
        >
          {tx("rounds.understood", { word: withArtikel(word) })}
        </button>
        <button
          onClick={async () => {
            if (done.current) return;
            const id = round.id;
            setSkipping(true);
            try {
              await apiFetch("/api/words/known", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ wordId: word.id }),
              });
            } catch {
              /* çevrimdışıysa yine de devam et */
            }
            // Beklerken tur bittiyse ya da değiştiyse geç cevap yutuluyor.
            if (done.current || live.current !== id) return;
            done.current = true;
            onDone([]); // cevap kaydedilmez, kelime pekişmiş sayılır
          }}
          disabled={skipping}
          className="btn btn-ghost w-full px-6 py-2.5 text-body disabled:opacity-60"
        >
          {tx(skipping ? "rounds.saving" : "rounds.already_known")}
        </button>
      </div>
    </GameShell>
  );
}
