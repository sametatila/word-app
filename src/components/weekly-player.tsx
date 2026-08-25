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

type Payload = { status: WeeklyStatus; rounds: Round[] };
type Phase = "loading" | "ready" | "playing" | "saving" | "done" | "empty" | "error";

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * Haftalık kullanım sınavı oynatıcısı (WP-42): tek hak, ipuçsuz, yalnız
 * üretim oyunları. Günün turu deseninde ama tablo yok — rakip yok, ölçülen
 * şey kişinin kendi pekişmiş kelimeleri. Sonuçta kelime kelime doğru/yanlış
 * ve "yanlışlar tekrar kuyruğuna döndü" notu: pekişmiş sayılan kelime
 * düştüyse bunu saklamamak gerekir.
 */
export function WeeklyPlayer() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [data, setData] = useState<Payload | null>(null);
  const [index, setIndex] = useState(0);
  const answers = useRef<Answer[]>([]);
  const [result, setResult] = useState<{ score: number; correct: number; total: number } | null>(null);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    let alive = true;
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
  }, []);

  function start() {
    track("exam_start", 0, "usage");
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
      setPhase("done");
    } catch {
      setPhase("error");
    }
  }

  const wordOf = (r: Round) => (r.game === "match" ? r.words[0] : r.word);

  if (phase === "loading" || phase === "saving") {
    return (
      <section className="card mx-auto w-full max-w-md p-5" aria-busy>
        <p className="muted text-sm">{phase === "loading" ? "Sınav hazırlanıyor…" : "Sonuç kaydediliyor…"}</p>
        <div className="mt-3 h-10 animate-pulse rounded-xl surface-2" />
      </section>
    );
  }
  if (phase === "error") {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <p className="text-sm">Sınav şu an yüklenemedi. Biraz sonra tekrar dene.</p>
        <Link href="/learn" className="btn btn-ghost mt-3 px-4 py-2 text-sm">
          Öğren'e dön
        </Link>
      </section>
    );
  }
  if (phase === "empty") {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <h1 className="text-lg font-bold">Henüz sınav kurulamıyor</h1>
        <p className="muted mt-2 text-sm">Önce birkaç tur oyna: sınav senin çalıştığın kelimelerden kuruluyor.</p>
        <Link href="/learn" className="btn btn-primary mt-4 w-full px-5 py-3 text-sm">
          Tura başla
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
            <h1 className="text-lg font-bold">{data.status.short ? "Haftanın kısa kontrolü" : "Haftanın kullanım sınavı"}</h1>
            <p className="muted mt-1 text-sm">
              {data.rounds.length} soru · yalnız yazarak · ipucu yok · tek hak.{" "}
              {data.status.short ? `Pekişmiş kelimen ${data.status.mastered} — 30'a ulaşınca sınav pekişmişlerden kurulur.` : `Kendi pekişmiş kelimelerinden (${data.status.mastered}).`}
            </p>
            <p className="muted mt-1 text-xs">Yanlış bilinen kelime tekrar kuyruğuna döner — dürüst ölçüm.</p>
          </div>
        </div>
        <button type="button" onClick={start} className="btn btn-primary mt-4 w-full px-5 py-3.5 text-base">
          Başla
        </button>
        <Link href="/learn" className="btn btn-ghost mt-2 w-full px-5 py-3 text-sm">
          Sonra
        </Link>
      </section>
    );
  }
  if (phase === "done" && result) {
    const byWord = new Map<number, boolean>();
    for (const a of answers.current) byWord.set(a.wordId, (byWord.get(a.wordId) ?? true) && a.correct);
    const wrong = (data?.rounds ?? []).map(wordOf).filter((w) => byWord.get(w.id) === false);
    const tone = result.score >= 80 ? "var(--color-mint)" : result.score >= 60 ? "var(--color-flame)" : "var(--color-rose)";
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-black text-white" style={{ background: tone }}>
            {result.score}
          </div>
          <div>
            <h1 className="text-lg font-bold">Kullanım skorun</h1>
            <p className="muted text-sm">
              {result.correct} / {result.total} doğru · hafta {data?.status.week}
            </p>
          </div>
        </div>
        {wrong.length ? (
          <div className="mt-4">
            <p className="text-sm font-semibold">Tekrar kuyruğuna dönenler</p>
            <ul className="mt-1 flex flex-wrap gap-2">
              {wrong.map((w) => (
                <li key={w.id} className="chip px-3 py-1 text-xs" lang="de">
                  {w.artikel ? `${w.artikel} ` : ""}
                  {w.de} <span className="muted ml-1">{w.tr}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : answers.current.length ? (
          <p className="mt-4 text-sm" style={{ color: "var(--color-mint)" }}>
            Hepsi doğru — pekişmiş kelimelerin gerçekten pekişmiş.
          </p>
        ) : null}
        <p className="muted mt-3 text-xs">Sınav haftada bir; sonraki Pazartesi yeni sorular gelir. Trend profilde (yakında).</p>
        <Link href="/learn" className="btn btn-primary mt-4 w-full px-5 py-3 text-sm">
          Öğren'e dön
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
            {index + 1} / {data!.rounds.length} · kullanım sınavı
          </span>
          <span className="muted">ipucu yok</span>
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
