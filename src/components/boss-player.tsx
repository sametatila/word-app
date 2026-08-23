"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Answer, Round } from "@/lib/types";
import type { GameResult } from "@/components/games/types";
import { GameSwitch } from "@/components/game-switch";
import { FitBox } from "@/components/fit-box";
import { AnswerPulse } from "@/components/answer-pulse";
import { Confetti, CountUp } from "@/components/celebrate";
import { play, resetCombo } from "@/lib/sfx";
import { track } from "@/lib/track";
import { AlertIcon, ClockIcon, TrophyIcon } from "@/components/icons";

/**
 * Modül sınavı — patron turu.
 *
 * Ders yolu on derslik modüllere bölünmüştü ama modülün bitişinde hiçbir şey
 * olmuyordu: pankartta bir kupa beliriyor, yol devam ediyordu. Sınav o boşluğu
 * dolduruyor.
 *
 * Hayatta kalma turundan ayıran şey KAYBETME koşulu. Orada amaç puanı
 * büyütmek ve turun bir sonu yok; burada on beş turu süre bitmeden bitirmek
 * zorundasın. Patron turu tam olarak budur — yenilebilir bir şey. Kaybedince
 * hiçbir şey silinmiyor: cevaplar zaten tekrar planına işledi, kaybedilen tek
 * şey taç.
 *
 * Süre başlangıçta cömert (60 sn) ama doğru cevap yalnızca 3 saniye
 * kazandırıyor, yanlış 5 saniye yakıyor: yani hız değil İSABET kazandırıyor.
 * Hayatta kalma turunda tersi — orada hız da ödüllendiriliyor çünkü orada
 * amaç dayanmak.
 */

const DANGER_SECONDS = 10;

type Status = "loading" | "ready" | "playing" | "won" | "lost" | "empty" | "error";

type Meta = {
  level: string;
  moduleIndex: number;
  title: string;
  lessonsDone: number;
  lessonsTotal: number;
  bestLeft: number | null;
};
type Payload = {
  meta: Meta;
  rounds: Round[];
  pool: number;
  seconds: number;
  bonus: number;
  penalty: number;
  maxSeconds: number;
};

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function BossPlayer({
  level,
  moduleIndex,
  onExitHref,
}: {
  level: string;
  moduleIndex: number;
  /** Çıkışta dönülecek adres — sınav kendi sayfasında açılıyor. */
  onExitHref: string;
}) {
  const router = useRouter();
  const onExit = useCallback(() => router.push(onExitHref), [router, onExitHref]);
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<Payload | null>(null);
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(0);
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  const [best, setBest] = useState<number | null>(null);
  const [isRecord, setIsRecord] = useState(false);

  const deadline = useRef(0);
  const finished = useRef(false);
  const pending = useRef<Answer[]>([]);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/boss?level=${level}&module=${moduleIndex}`, {
          cache: "no-store",
        });
        if (!res.ok) return alive && setStatus("error");
        const payload = (await res.json()) as Payload;
        if (!alive) return;
        setData(payload);
        setBest(payload.meta.bestLeft);
        setStatus(payload.rounds.length ? "ready" : "empty");
      } catch {
        if (alive) setStatus("error");
      }
    })();
    return () => {
      alive = false;
    };
  }, [level, moduleIndex]);

  /** Cevapları gönderir — sınav da tekrar planını besliyor. */
  const flush = useCallback(async () => {
    const batch = pending.current;
    pending.current = [];
    if (!batch.length) return;
    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          answers: batch,
          day: localDay(),
          seconds: Math.round((Date.now() - startedAt.current) / 1000),
        }),
        keepalive: true,
      });
      if (!res.ok) return;
      const out = (await res.json()) as { totalXp: number; currentStreak: number };
      window.dispatchEvent(
        new CustomEvent("wortspiel:stats", {
          detail: { xp: out.totalXp, streak: out.currentStreak },
        }),
      );
    } catch {
      /* çevrimdışıysa bu turun cevapları kaybolur */
    }
  }, []);

  const finish = useCallback(
    async (won: boolean, secondsLeft: number) => {
      if (finished.current) return;
      finished.current = true;
      setStatus(won ? "won" : "lost");
      play(won ? "record" : "wrong");
      await flush();
      if (!won) return;
      track("boss_clear", Math.round(secondsLeft));
      try {
        const res = await fetch("/api/boss", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ level, module: moduleIndex, secondsLeft: Math.round(secondsLeft) }),
        });
        if (res.ok) {
          const out = (await res.json()) as { bestLeft: number; isRecord: boolean };
          setBest(out.bestLeft);
          setIsRecord(out.isRecord);
        }
      } catch {
        /* kayıt başarısızsa sonuç ekranı yine doğru, taç bir sonraki geçişte gelir */
      }
    },
    [flush, level, moduleIndex],
  );

  // Geri sayım. Son saniyelerde tık: sınav ekranın ortasında oynanıyor, süreyi
  // gören değil DUYAN hızlanıyor.
  useEffect(() => {
    if (status !== "playing") return;
    let lastTick = Infinity;
    const tick = () => {
      const remaining = (deadline.current - Date.now()) / 1000;
      setLeft(Math.max(0, remaining));
      const whole = Math.ceil(remaining);
      if (remaining > 0 && remaining <= DANGER_SECONDS && whole !== lastTick) {
        lastTick = whole;
        play("danger");
      }
      if (remaining > DANGER_SECONDS) lastTick = Infinity;
      if (remaining <= 0) void finish(false, 0);
    };
    const t = setInterval(tick, 100);
    return () => clearInterval(t);
  }, [status, finish]);

  function start() {
    if (!data) return;
    finished.current = false;
    deadline.current = Date.now() + data.seconds * 1000;
    setLeft(data.seconds);
    setIndex(0);
    setTally({ correct: 0, total: 0 });
    setIsRecord(false);
    pending.current = [];
    startedAt.current = Date.now();
    resetCombo();
    play("start");
    track("boss_play", moduleIndex);
    setStatus("playing");
  }

  function handleDone(round: Round, results: GameResult[]) {
    if (finished.current || !data) return;
    pending.current.push(...results.map((r) => ({ ...r, game: round.game })));

    let delta = 0;
    for (const r of results) delta += r.correct ? data.bonus : -data.penalty;
    deadline.current = Math.min(
      Date.now() + data.maxSeconds * 1000,
      deadline.current + delta * 1000,
    );

    setTally((t) => ({
      correct: t.correct + results.filter((r) => r.correct).length,
      total: t.total + results.length,
    }));

    const last = index >= data.rounds.length - 1;
    if (last) void finish(true, Math.max(0, (deadline.current - Date.now()) / 1000));
    else setIndex((i) => i + 1);
  }

  // ── Görünüm ────────────────────────────────────────────────────────

  if (status === "loading") return <Frame><p className="muted">Sınav hazırlanıyor…</p></Frame>;

  if (status === "error")
    return (
      <Frame>
        <AlertIcon size={26} />
        <h2 className="mt-2 text-lg font-bold">Sınav açılamadı</h2>
        <button onClick={onExit} className="btn btn-ghost mt-5 w-full px-5 py-3">Geri dön</button>
      </Frame>
    );

  if (status === "empty")
    return (
      <Frame>
        <h2 className="text-lg font-bold">Bu modülün sınavı henüz kurulamıyor</h2>
        <p className="muted mt-2 text-sm">
          Sınav modülün derslerindeki kelimelerden kuruluyor ve bu modülde yeterli kelime
          eşleşmedi.
        </p>
        <button onClick={onExit} className="btn btn-ghost mt-5 w-full px-5 py-3">Geri dön</button>
      </Frame>
    );

  if (status === "ready" && data) {
    const ready = data.meta.lessonsDone >= data.meta.lessonsTotal;
    return (
      <Frame>
        <div className="brand-gradient mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl text-white">
          <TrophyIcon size={26} />
        </div>
        <p className="muted text-xs font-bold uppercase tracking-wide">
          {data.meta.level} · {data.meta.moduleIndex + 1}. modül
        </p>
        <h2 className="mt-1 text-xl font-bold">{data.meta.title} sınavı</h2>
        <ul className="mt-4 space-y-1.5 text-left text-sm">
          <li>· {data.rounds.length} soru, {data.seconds} saniyeyle başlıyorsun.</li>
          <li>· Her doğru +{data.bonus} sn, her yanlış −{data.penalty} sn.</li>
          <li>· Süre bitmeden hepsini bitirirsen modül tacı senin.</li>
          <li className="muted">· Sorular bu modülün {data.pool} kelimesinden geliyor.</li>
        </ul>

        {!ready ? (
          <p
            className="mt-4 rounded-xl px-3 py-2.5 text-sm"
            style={{
              background: "color-mix(in srgb, var(--color-flame-500) 10%, transparent)",
              color: "var(--color-flame-500)",
            }}
          >
            Bu modülün {data.meta.lessonsDone}/{data.meta.lessonsTotal} dersini bitirdin. Sınav
            yine de açık — ama kelimeleri görmeden girmek zor.
          </p>
        ) : null}

        {best !== null ? (
          <p className="muted mt-3 text-sm">Geçtin · en iyi kalan süren {best} sn</p>
        ) : null}

        <button onClick={start} className="btn btn-primary mt-5 w-full px-5 py-3.5 text-base">
          {best !== null ? "Rekoru kır" : "Sınava gir"}
        </button>
        <button onClick={onExit} className="btn btn-ghost mt-2 w-full px-5 py-3">
          Yola dön
        </button>
      </Frame>
    );
  }

  if (status === "won" || status === "lost") {
    const won = status === "won";
    const secondsLeft = Math.round(left);
    return (
      <Frame>
        <Confetti fire={won ? 1 : 0} count={won ? 40 : 0} />
        <div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background: won ? "var(--color-mint-500)" : "var(--surface-2)",
            color: won ? "#fff" : "var(--text-muted)",
          }}
        >
          {won ? <TrophyIcon size={26} /> : <ClockIcon size={26} />}
        </div>
        <h2 className="text-2xl font-black">{won ? "Modül geçildi" : "Süre bitti"}</h2>
        <p className="muted mt-1 text-sm">
          {won
            ? `${secondsLeft} saniye kala · ${tally.correct}/${tally.total} doğru`
            : `${tally.correct}/${tally.total} doğru — bu sefer yetmedi.`}
        </p>
        {won && isRecord ? (
          <p className="mt-1 text-sm font-bold" style={{ color: "var(--color-mint-500)" }}>
            Yeni rekor: <CountUp value={secondsLeft} /> sn kalan
          </p>
        ) : null}
        {!won ? (
          <p className="muted mt-3 text-sm">
            Cevapların yine de sayıldı: tekrar planın ve günlük hedefin güncellendi.
          </p>
        ) : null}
        <button onClick={start} className="btn btn-primary mt-5 w-full px-5 py-3.5">
          {won ? "Yeniden dene" : "Tekrar dene"}
        </button>
        <button onClick={onExit} className="btn btn-ghost mt-2 w-full px-5 py-3">
          Yola dön
        </button>
      </Frame>
    );
  }

  // playing
  const round = data!.rounds[index];
  const urgent = left <= DANGER_SECONDS;
  const pct = Math.min(100, (left / data!.maxSeconds) * 100);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
      <AnswerPulse />
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="text-sm font-bold tabular-nums">
          {index + 1} / {data!.rounds.length}
        </span>
        <motion.span
          key={`${urgent}-${Math.ceil(left)}`}
          animate={urgent ? { scale: [1, 1.12, 1] } : {}}
          className="text-sm font-black tabular-nums"
          style={{ color: urgent ? "var(--color-flame-500)" : "var(--text)" }}
        >
          {left.toFixed(1)} sn
        </motion.span>
      </div>
      <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
        <div
          className="h-full rounded-full transition-[width] duration-100"
          style={{
            width: `${pct}%`,
            background: urgent ? "var(--color-flame-500)" : "var(--color-brand-500)",
          }}
        />
      </div>
      <FitBox>
        <GameSwitch round={round} onDone={(results) => handleDone(round, results)} />
      </FitBox>
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="card p-6 text-center">{children}</div>
    </div>
  );
}
