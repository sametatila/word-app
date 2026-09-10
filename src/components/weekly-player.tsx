"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Answer, Round } from "@/lib/types";
import type { GameResult } from "@/components/games/types";
import { GameSwitch } from "@/components/game-switch";
import { FitBox } from "@/components/fit-box";
import { Mascot } from "@/components/mascot";
import { track } from "@/lib/track";
import type { WeeklyStatus } from "@/lib/weekly";
import { useT } from "@/lib/i18n/client";
import { useCourse } from "@/components/app-shell";
import { localDay } from "@/lib/day";

type Payload = { status: WeeklyStatus; rounds: Round[] };
type Phase = "loading" | "ready" | "playing" | "saving" | "done" | "empty" | "error";

/**
 * Haftalık kullanım sınavı oynatıcısı (WP-42): tek hak, ipuçsuz, yalnız
 * üretim oyunları. Günün turu deseninde ama tablo yok — rakip yok, ölçülen
 * şey kişinin kendi pekişmiş kelimeleri. Sonuçta kelime kelime doğru/yanlış
 * ve "yanlışlar tekrar kuyruğuna döndü" notu: pekişmiş sayılan kelime
 * düştüyse bunu saklamamak gerekir.
 */
export function WeeklyPlayer() {
  const course = useCourse();
  const t = useT();
  const [phase, setPhase] = useState<Phase>("loading");
  const [data, setData] = useState<Payload | null>(null);
  const [index, setIndex] = useState(0);
  const answers = useRef<Answer[]>([]);
  const [result, setResult] = useState<{ score: number; correct: number; total: number } | null>(null);
  const startedAt = useRef(Date.now());
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setPhase("loading");
    (async () => {
      try {
        const res = await fetch(`/api/weekly?day=${localDay()}`, { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const p = (await res.json()) as Payload;
        if (!alive) return;
        setData(p);
        if (p.status.done) {
          setResult({ score: p.status.score ?? 0, correct: p.status.correct ?? 0, total: p.status.total ?? 0 });
          setPhase("done");
        } else if (!p.rounds.length) setPhase("empty");
        else setPhase("ready");
      } catch {
        if (alive) setPhase("error");
      }
    })();
    return () => {
      alive = false;
    };
  }, [attempt]);

  function start() {
    /*
     * HAFTALIK SINAV OTURUM OLARAK ÖLÇÜLÜYOR, `exam_start` olarak DEĞİL.
     *
     * Burada `track("exam_start", 0, "usage")` yazıyordu ve iki şeyi birden
     * bozuyordu: (1) sözlüğün sözleşmesi `exam_start` için "kind = sınav
     * türü:seviye" diyor ("level:B1"), "usage" o biçime hiç uymuyor;
     * (2) gerçek sınav `exam_start`ı SUNUCUDA yazıyor (`api/exam`), yani
     * haftalık test aynı seride gerçek sınavlarla karışıyordu. Mobil
     * `WeeklyScreen` baştan beri `session_start`/`session_done` + kind
     * "weekly" yazıyor; web de aynı şeyi yazıyor (bkz. web-parity §11.29).
     */
    track("session_start", 0, "weekly");
    answers.current = [];
    startedAt.current = Date.now();
    setIndex(0);
    setPhase("playing");
  }

  async function handleDone(round: Round, results: GameResult[]) {
    answers.current.push(...results.map((r) => ({ ...r, game: round.game })));
    if (index + 1 < data!.rounds.length) return setIndex(index + 1);
    setPhase("saving");
    try {
      const res = await fetch("/api/weekly", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers: answers.current, day: localDay(), seconds: Math.round((Date.now() - startedAt.current) / 1000) }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const r = (await res.json()) as { score: number; correct: number; total: number };
      setResult(r);
      track("session_done", r.correct, "weekly");
      setPhase("done");
    } catch {
      setPhase("error");
    }
  }

  const wordOf = (r: Round) => (r.game === "match" ? r.words[0] : r.word);

  if (phase === "loading" || phase === "saving") {
    return (
      <section className="card mx-auto w-full max-w-md p-5" aria-busy>
        <p className="muted text-sm">{t(phase === "loading" ? "weekly.preparing" : "weekly.saving")}</p>
        <div className="mt-3 h-10 animate-pulse rounded-xl surface-2" />
      </section>
    );
  }
  if (phase === "error") {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <p className="text-sm">{t("weekly.load_failed")}</p>
        {/* YERİNDE TEKRAR DENEME — Android'deki sıra: birincil "tekrar dene",
            ikincil çıkış. Yalnız çıkış sunmak geçici bir ağ hatasında
            kullanıcıyı ekrandan atıyordu. */}
        <button
          type="button"
          onClick={() => setAttempt((n) => n + 1)}
          className="btn btn-primary mt-3 w-full px-4 py-2 text-sm"
        >
          {t("weekly.try_again")}
        </button>
        <Link href="/learn" className="btn btn-ghost mt-2 block px-4 py-2 text-center text-sm">
          {t("weekly.back_to_learn")}
        </Link>
      </section>
    );
  }
  if (phase === "empty") {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <h1 className="text-lg font-bold">{t("weekly.none_title")}</h1>
        <p className="muted mt-2 text-sm">{t("weekly.none_sub")}</p>
        <Link href="/learn" className="btn btn-primary mt-4 w-full px-5 py-3 text-sm">
          {t("weekly.start_round")}
        </Link>
      </section>
    );
  }
  if (phase === "ready" && data) {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <div className="flex items-start gap-3">
          <Mascot mood="think" size={64} />
          <div>
            <h1 className="text-lg font-bold">{t(data.status.short ? "plan.weekly_short" : "plan.weekly_exam")}</h1>
            <p className="muted mt-1 text-sm">
              {t("weekly.pitch", { n: data.rounds.length })}{" "}
              {data.status.short
                ? t("weekly.pitch_short", { n: data.status.mastered })
                : t("weekly.pitch_full", { n: data.status.mastered })}
            </p>
            <p className="muted mt-1 text-xs">{t("weekly.honest_note")}</p>
          </div>
        </div>
        <button type="button" onClick={start} className="btn btn-primary mt-4 w-full px-5 py-3.5 text-base">
          {t("common.start")}
        </button>
        <Link href="/learn" className="btn btn-ghost mt-2 w-full px-5 py-3 text-sm">
          {t("common.later")}
        </Link>
      </section>
    );
  }
  if (phase === "done" && result) {
    const byWord = new Map<number, boolean>();
    for (const a of answers.current) byWord.set(a.wordId, (byWord.get(a.wordId) ?? true) && a.correct);
    const wrong = (data?.rounds ?? []).map(wordOf).filter((w) => byWord.get(w.id) === false);
    /* Basamak sabit: beyaz yazılı dolu daire koyu temada 300'e düşünce
       okunmuyordu (bkz. `writings-card`). 600'de iki temada da geçiyor. */
    const tone = result.score >= 80 ? "var(--color-mint-600)" : result.score >= 60 ? "var(--color-flame-600)" : "var(--color-rose-600)";
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-black text-white" style={{ background: tone }}>
            {result.score}
          </div>
          <div>
            <h1 className="text-lg font-bold">{t("weekly.your_score")}</h1>
            <p className="muted text-sm">
              {t("common.n_correct", { correct: result.correct, total: result.total })} ·{" "}
              {t("weekly.week_n", { n: data?.status.week ?? 0 })}
            </p>
          </div>
        </div>
        {wrong.length ? (
          <div className="mt-4">
            <p className="text-sm font-semibold">{t("weekly.back_in_queue")}</p>
            <ul className="mt-1 flex flex-wrap gap-2">
              {wrong.map((w) => (
                <li key={w.id} className="chip px-3 py-1 text-xs" lang={course}>
                  {w.artikel ? `${w.artikel} ` : ""}
                  {w.de} <span className="muted ml-1">{w.tr}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : answers.current.length ? (
          <p className="mt-4 text-sm" style={{ color: "var(--color-mint)" }}>
            {t("weekly.all_correct")}
          </p>
        ) : null}
        <p className="muted mt-3 text-xs">{t("weekly.once_a_week")}</p>
        <Link href="/learn" className="btn btn-primary mt-4 w-full px-5 py-3 text-sm">
          {t("weekly.back_to_learn")}
        </Link>
      </section>
    );
  }

  const round = data!.rounds[index];
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
      <div className="mb-3 shrink-0">
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
          <span className="muted">
            {index + 1} / {data!.rounds.length} · {t("weekly.usage_exam")}
          </span>
          <span className="muted">{t("weekly.no_hints")}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full surface-2">
          <motion.div className="brand-gradient h-full rounded-full" animate={{ width: `${((index + 1) / data!.rounds.length) * 100}%` }} transition={{ type: "spring", stiffness: 160, damping: 24 }} />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={round.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18, ease: "easeOut" }} className="flex min-h-0 flex-1 flex-col">
          <FitBox>
            <GameSwitch round={round} onDone={(res) => void handleDone(round, res)} />
          </FitBox>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
