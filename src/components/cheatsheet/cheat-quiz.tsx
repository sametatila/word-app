"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GameShell } from "@/components/games/game-shell";
import { useRoundExit } from "@/components/games/use-round-exit";
import { FitBox } from "@/components/fit-box";
import { AnswerPulse } from "@/components/answer-pulse";
import { Mascot } from "@/components/mascot";
import { MascotPop } from "@/components/mascot-pop";
import { MascotFx } from "@/components/mascot-fx";
import { Confetti } from "@/components/celebrate";
import { CheckIcon, FlameIcon, RefreshIcon, XIcon } from "@/components/icons";
import { SpeakButton, prefetchGerman } from "@/components/speak-button";
import { LEVEL_TONE } from "@/components/skills/theme";
import { fx, vibrate } from "@/lib/fx";
import { accepts, buildRound, CHEAT_GAME_LABELS, type CheatRound } from "@/lib/cheatsheet/quiz";
import type { CheatItem } from "@/lib/cheatsheet/items";

/**
 * Cheatsheet çalışma turu.
 *
 * Kelime turundan AYRILAN hiçbir şeyi yok ve bu bir tercih: aynı ilerleme
 * çubuğu, aynı combo rozeti, aynı tur geçişi, aynı sonuç şeridi, aynı Erdi.
 * Sorunun kaynağı değişiyor (kelime yerine tablo hücresi), oynanışı değil —
 * öğrenciye burada ikinci bir arayüz öğretmek, öğrenilecek şeyin üstüne bir
 * katman daha koymak olurdu.
 *
 * Bu yüzden oyunların kendi parçaları burada da kullanılıyor: `GameShell`
 * (okuma/dokunma/sonuç bölgeleri), `useRoundExit` (Erdi şeridi çekerken turun
 * beklemesi), `FitBox` (küçük ekranda kaydırma yerine küçültme).
 *
 * Ses de aynı: cevap verildiğinde DOĞRU biçim okunuyor ve tur okumanın
 * gerçek uzunluğu kadar bekliyor — kelime oyunlarındaki `speakAndExit`
 * davranışının aynısı. Yanlış seçilen biçim asla okunmuyor; yanlışı sesli
 * pekiştirmek öğrenmenin tersine çalışır.
 *
 * Okunmayan tek şey Türkçe sütunlar (anlam, kural, kullanım). Hangi sütunun
 * Almanca olduğu maddenin kendisinde işaretli (bkz. items.ts `speak`), çünkü
 * bunu sütun BAŞLIĞI biliyor; hücrenin içine bakarak "almak" ile "nahm"ı
 * ayırmak mümkün değil. Türkçe bir hücreyi Almanca sesle okutmak dersin
 * öğrettiği telaffuzu bozardı.
 */

const ROUND_CAP = 14;

/** Cevaptan sonra turun ekranda kalma payı (ms) — düzeltmenin okunma süresi. */
const HOLD_CORRECT = 900;
const HOLD_WRONG = 2200;

export type QuizResult = {
  itemId: string;
  correct: boolean;
  latencyMs: number;
  kind: CheatRound["kind"];
};

/**
 * Tur kurulurken gösterilen ekran.
 *
 * Kelime turunda da aynısı var: ilerleme sunucudan okunuyor ve o bekleme
 * boş bir ekran olarak geçmiyor. Erdi düşünüyor, çünkü o sırada gerçekten
 * hangi maddelerin sorulacağına karar veriliyor.
 */
export function CheatQuizLoading({ title }: { title: string }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <Mascot mood="think" size={104} />
        <p className="text-sm font-bold">{title}</p>
        <p className="muted text-sm">Sorular hazırlanıyor…</p>
      </motion.div>
    </div>
  );
}

export function CheatQuiz({
  title,
  items,
  states,
  onClose,
}: {
  title: string;
  items: CheatItem[];
  /** Sunucudaki ilerleme — soru biçimini bu belirliyor. */
  states: Record<string, { reps: number; lapses: number }>;
  onClose: (answered: number) => void;
}) {
  /**
   * Tur kurulumu bir kez yapılıyor ve bileşen içinde saklanıyor: her çizimde
   * yeniden kurulsaydı cevap verildiği anda soru değişirdi.
   */
  const rounds = useMemo(() => {
    const pool = [...items];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool
      .slice(0, ROUND_CAP)
      .map((item) => buildRound(item, states[item.id] ?? { reps: 0, lapses: 0 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [combo, setCombo] = useState(0);
  const [cheer, setCheer] = useState(0);
  const startedAt = useRef(Date.now());

  function record(result: QuizResult) {
    setResults((prev) => [...prev, result]);
    setCombo((prev) => {
      const next = result.correct ? prev + 1 : 0;
      // Kutlama eşiği kelime turuyla aynı: beşte bir. Her doğruda çıkan bir
      // kutlama, kutlama olmaktan çıkıp gürültü olur.
      if (next >= 5 && next % 5 === 0) setCheer(next);
      return next;
    });
    setIndex((i) => i + 1);
  }

  if (!rounds.length) {
    return (
      <div className="mx-auto w-full max-w-md py-10 text-center">
        <Mascot mood="think" size={96} className="mx-auto" />
        <p className="muted mt-2 text-sm">Bu sayfada sorulabilir bir madde yok.</p>
        <button onClick={() => onClose(0)} className="btn btn-ghost mt-4 px-5 py-2.5">
          Geri dön
        </button>
      </div>
    );
  }

  if (index >= rounds.length) {
    return (
      <Summary
        title={title}
        results={results}
        seconds={(Date.now() - startedAt.current) / 1000}
        onClose={() => onClose(results.length)}
      />
    );
  }

  const round = rounds[index];
  const answered = results.length;
  const correct = results.filter((r) => r.correct).length;
  const progress = ((index + 1) / rounds.length) * 100;

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <MascotPop trigger={cheer} />
      <MascotFx />
      <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
        <div className="mb-3 shrink-0">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
            <span className="muted flex items-center gap-2">
              <button
                onClick={() => onClose(results.length)}
                aria-label="Turu bitir"
                className="flex h-6 w-6 items-center justify-center rounded-full"
                style={{ background: "var(--surface-2)" }}
              >
                <XIcon size={13} />
              </button>
              {index + 1} / {rounds.length}
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white"
                style={{ background: LEVEL_TONE[round.item.level] ?? "var(--color-brand)" }}
              >
                {round.item.level}
              </span>
            </span>
            {combo >= 3 ? (
              <motion.span
                key={combo}
                initial={{ scale: 1.35 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 16 }}
                className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-black"
                style={{
                  background: "color-mix(in srgb, var(--color-flame) 16%, transparent)",
                  color: "var(--color-flame)",
                }}
              >
                <FlameIcon size={12} /> {combo} üst üste
              </motion.span>
            ) : (
              <span className="muted">
                {answered > 0 ? `%${Math.round((correct / answered) * 100)} doğru` : "Hadi başlayalım"}
              </span>
            )}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full surface-2">
            <motion.div
              className="brand-gradient h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 180, damping: 26 }}
            />
          </div>
          <div className="mt-1">
            <AnswerPulse />
          </div>
        </div>

        {/* Turlar arası kısa kayma + solma — kelime turunun aynısı. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${round.item.id}:${index}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <FitBox>
              <RoundView round={round} onDone={record} />
            </FitBox>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Soru başlığı: "nehmen · Perfekt" — konu ve istenen biçim. */
function Prompt({ round }: { round: CheatRound }) {
  return (
    <>
      <span className="brand-text text-2xl font-bold sm:text-3xl">{round.item.key}</span>
      <span className="muted mt-0.5 block text-sm font-semibold">{round.item.label}</span>
    </>
  );
}

function RoundView({ round, onDone }: { round: CheatRound; onDone: (r: QuizResult) => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<"correct" | "wrong" | null>(null);
  const started = useRef(Date.now());
  /**
   * Kapanış oyunlarınkiyle aynı yerden yönetiliyor: Erdi sonuç şeridini
   * çekerek getiriyorsa tur onun koreografisini beklemek zorunda, yoksa
   * animasyon yarıda kesiliyor.
   */
  const { exitAfter, speakAndExit } = useRoundExit();

  useEffect(() => {
    started.current = Date.now();
    // Ses cevaptan hemen sonra çalacak: sentezi şimdiden ısıt, yoksa doğru
    // biçim yarım saniye gecikmeyle duyuluyor.
    if (round.item.speak) prefetchGerman(round.item.answer);
  }, [round.item.speak, round.item.answer]);

  function settle(correct: boolean, choice?: string) {
    if (verdict) return;
    if (choice !== undefined) setPicked(choice);
    setVerdict(correct ? "correct" : "wrong");
    vibrate(correct ? "correct" : "wrong");

    const finish = () =>
      onDone({
        itemId: round.item.id,
        correct,
        latencyMs: Date.now() - started.current,
        kind: round.kind,
      });

    if (!round.item.speak) {
      // Sessiz sütun: bekleme sesin değil, ekrandaki düzeltmenin okunma payı.
      const wait = correct ? HOLD_CORRECT : HOLD_WRONG;
      fx(correct ? "correct" : "wrong", wait);
      exitAfter(wait, finish);
      return;
    }

    // Okunan sütun: geçiş çizgisi okumanın GERÇEK uzunluğunda. Yanlışta
    // üstüne bir pay ekleniyor — düzeltmeyi görmek için.
    const tail = correct ? 0 : 900;
    speakAndExit(round.item.answer, finish, {
      tail,
      onDuration: (ms) => fx(correct ? "correct" : "wrong", ms + tail),
    });
  }

  const settled = verdict !== null;

  /*
    Oyun etiketi sorulan şeye göre: Almanca bir sütun sorulduğunda "Doğru
    Biçim", Türkçe bir sütun sorulduğunda "Doğru Anlam" — ikincisi kelime
    oyunlarındaki adın birebir aynısı ve soru da aynı soru.
  */
  const label =
    round.kind === "choice" && !round.item.speak ? "Doğru Anlam" : CHEAT_GAME_LABELS[round.kind];

  const shell = (children: React.ReactNode, hint?: React.ReactNode) => (
    <GameShell
      label={label}
      prompt={<Prompt round={round} />}
      hint={hint}
      verdict={verdict}
      feedback={
        // Şerit doğruda da doluyor: cevabı görmek kadar onu bir kez daha
        // okumak da turun işi — yanlışta düzeltme, doğruda pekiştirme.
        settled ? (
          <span>
            {verdict === "correct" ? "Doğru — " : "Doğrusu: "}
            <strong>{round.item.answer}</strong>
            {round.item.speak ? (
              <SpeakButton text={round.item.answer} size="sm" className="ml-1" />
            ) : null}
            {round.item.context.length ? (
              <span className="font-normal opacity-70"> · {round.item.context[0].value}</span>
            ) : null}
          </span>
        ) : null
      }
    >
      {children}
    </GameShell>
  );

  if (round.kind === "choice") {
    return shell(
      <div className="grid gap-3">
        {round.options.map((opt, i) => {
          const isAnswer = opt === round.item.answer;
          const state = !settled ? "" : isAnswer ? "option-correct" : opt === picked ? "option-wrong" : "";
          return (
            <motion.button
              key={`${opt}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              disabled={settled}
              onClick={() => settle(isAnswer, opt)}
              className={`option flex items-center justify-between gap-3 px-4 py-3 text-left font-medium ${state} ${
                picked === opt && !isAnswer ? "animate-shake" : ""
              } ${picked === opt && isAnswer ? "animate-glow" : ""}`}
            >
              <span>{opt}</span>
              {/* Sonuç simgeyle de anlatılıyor: renk körlüğünde de okunur. */}
              {settled && isAnswer ? (
                <CheckIcon size={18} className="shrink-0 text-[color:var(--color-mint)]" />
              ) : picked === opt ? (
                <XIcon size={18} className="shrink-0 text-[color:var(--color-rose)]" />
              ) : null}
            </motion.button>
          );
        })}
      </div>,
    );
  }

  if (round.kind === "truefalse") {
    const isTrue = round.expected;
    return shell(
      <>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl px-4 py-5 text-center text-xl font-bold"
          style={{ background: "var(--surface-2)" }}
        >
          {round.shown}
        </motion.div>
        <div className="mx-auto mt-6 grid w-full max-w-md grid-cols-2 gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            disabled={settled}
            onClick={() => settle(isTrue, "true")}
            className={`option flex min-h-16 items-center justify-center gap-2 text-lg font-bold ${
              settled && isTrue ? "option-correct" : settled && picked === "true" ? "option-wrong" : ""
            }`}
          >
            <CheckIcon size={20} /> Doğru
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            disabled={settled}
            onClick={() => settle(!isTrue, "false")}
            className={`option flex min-h-16 items-center justify-center gap-2 text-lg font-bold ${
              settled && !isTrue ? "option-correct" : settled && picked === "false" ? "option-wrong" : ""
            }`}
          >
            <XIcon size={20} /> Yanlış
          </motion.button>
        </div>
      </>,
      "Bu biçim doğru mu?",
    );
  }

  if (round.kind === "scramble") {
    return shell(<Scramble round={round} onSettle={settle} settled={settled} />);
  }
  return shell(<Typing round={round} onSettle={settle} settled={settled} />);
}

function Scramble({
  round,
  onSettle,
  settled,
}: {
  round: Extract<CheatRound, { kind: "scramble" }>;
  onSettle: (correct: boolean) => void;
  settled: boolean;
}) {
  const [used, setUsed] = useState<number[]>([]);
  const typed = used.map((i) => round.letters[i]).join("");
  const full = used.length === round.letters.length;
  const wrong = settled && !accepts(round.item.answer, typed);

  useEffect(() => {
    if (settled || !full) return;
    onSettle(accepts(round.item.answer, typed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full, settled]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-7">
      {/* Yuvalar: harf bulmacasındaki gibi cevabın uzunluğu baştan görünüyor. */}
      <div className={`flex flex-wrap justify-center gap-1.5 ${wrong ? "animate-shake" : ""}`}>
        {round.letters.map((_, i) => (
          <span
            key={i}
            className="flex h-11 w-9 items-center justify-center rounded-xl text-lg font-bold"
            style={{
              background: used[i] === undefined ? "var(--surface-2)" : "var(--surface)",
              border: `1.5px solid ${used[i] === undefined ? "var(--border)" : "var(--color-brand)"}`,
            }}
          >
            {used[i] === undefined ? "" : round.letters[used[i]]}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {round.letters.map((letter, i) => (
          <button
            key={i}
            disabled={settled || used.includes(i)}
            onClick={() => setUsed((u) => [...u, i])}
            className="option flex h-12 w-11 items-center justify-center text-lg font-bold disabled:cursor-default disabled:opacity-25"
          >
            {letter}
          </button>
        ))}
      </div>

      <button
        onClick={() => setUsed([])}
        disabled={settled || !used.length}
        className="btn btn-ghost flex items-center gap-2 px-5 py-2.5 text-sm disabled:opacity-40"
      >
        <RefreshIcon size={15} /> Baştan
      </button>
    </div>
  );
}

function Typing({
  round,
  onSettle,
  settled,
}: {
  round: Extract<CheatRound, { kind: "typing" }>;
  onSettle: (correct: boolean) => void;
  settled: boolean;
}) {
  const [value, setValue] = useState("");
  const wrong = settled && !accepts(round.item.answer, value);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (settled || !value.trim()) return;
        onSettle(accepts(round.item.answer, value));
      }}
      className="mx-auto flex w-full max-w-md flex-col gap-3"
    >
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={settled}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        lang="de"
        placeholder="cevabı yaz…"
        className={`option w-full px-4 py-3.5 text-center text-lg outline-none focus:border-[color:var(--color-brand)] ${
          settled ? (wrong ? "option-wrong animate-shake" : "option-correct") : ""
        }`}
      />
      <button
        type="submit"
        disabled={settled || !value.trim()}
        className="btn btn-primary w-full px-5 py-3 disabled:opacity-40"
      >
        Kontrol et
      </button>
    </form>
  );
}

function Summary({
  title,
  results,
  seconds,
  onClose,
}: {
  title: string;
  results: QuizResult[];
  seconds: number;
  onClose: () => void;
}) {
  const [xp, setXp] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const sent = useRef(false);
  const correct = results.filter((r) => r.correct).length;
  const accuracy = results.length ? Math.round((correct / results.length) * 100) : 0;
  const perfect = results.length > 0 && correct === results.length;

  useEffect(() => {
    if (sent.current || !results.length) return;
    sent.current = true;
    (async () => {
      try {
        const res = await fetch("/api/cheat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ day: localDay(), seconds, results }),
        });
        if (!res.ok) return setFailed(true);
        const data = (await res.json()) as { xpGained: number; currentStreak: number; totalXp: number };
        setXp(data.xpGained);
        // Kabuktaki rozetler anında güncellensin — kelime turlarıyla aynı olay.
        window.dispatchEvent(
          new CustomEvent("wortspiel:stats", {
            detail: { xp: data.totalXp, streak: data.currentStreak },
          }),
        );
      } catch {
        setFailed(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wrong = results.filter((r) => !r.correct);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto w-full max-w-md space-y-4"
    >
      <Confetti fire={perfect ? 1 : 0} count={22} />

      <div className="card overflow-hidden">
        <div className="brand-gradient-deep px-6 py-5 text-center text-white">
          <motion.div
            initial={{ scale: 0.6, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 250, damping: 16 }}
            className="mx-auto w-fit"
          >
            <Mascot mood={perfect ? "cheer" : accuracy >= 60 ? "happy" : "sad"} size={84} />
          </motion.div>
          <p className="mt-1 text-sm opacity-90">{title}</p>
          <h2 className="mt-0.5 text-2xl font-black">
            {correct} / {results.length}
          </h2>
          {xp !== null ? (
            <p className="mt-1 text-sm opacity-90">+{xp} XP</p>
          ) : failed ? (
            <p className="mt-1 text-sm opacity-90">Sonuç kaydedilemedi</p>
          ) : (
            <p className="mt-1 text-sm opacity-70">kaydediliyor…</p>
          )}
        </div>
        <div className="px-5 py-4">
          <p className="muted text-xs">
            Yanlış bilinenler birkaç dakika içinde, doğru bilinenler aralık uzayarak geri
            geliyor — kelime tekrarıyla aynı plan.
          </p>
        </div>
      </div>

      {wrong.length ? (
        <div className="card px-5 py-4">
          <p className="text-sm font-bold">Zorlandıkların</p>
          <ul className="mt-2 space-y-1 text-sm">
            {wrong.map((r) => (
              <li key={r.itemId} className="muted">
                {r.itemId.split("|").slice(1).join(" · ")}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <button onClick={onClose} className="btn btn-primary w-full px-5 py-3.5">
        Sayfaya dön
      </button>
    </motion.div>
  );
}

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}
