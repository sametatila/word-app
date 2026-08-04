"use client";

import { motion } from "framer-motion";
import { GAME_LABELS, type GameId } from "@/lib/types";
import { BookIcon, FlameIcon, SparkIcon, TrophyIcon } from "@/components/icons";
import type { ComponentType, SVGProps } from "react";

type LevelRow = {
  niveau: string;
  total: number;
  seen: number;
  mastered: number;
  familiar: number;
  learning: number;
};
type DayRow = { day: string; reviews: number; correct: number; xp: number };
type GameRow = { game: string; total: number; correct: number; avgMs: number };

const LEVEL_COLOR: Record<string, string> = {
  A1: "var(--color-mint-500)",
  A2: "var(--color-sky-400)",
  B1: "var(--color-violet-400)",
  B2: "var(--color-brand-500)",
  C1: "var(--color-flame-500)",
};

export function ProgressView({
  levels,
  days,
  dueNow,
  upcoming,
  games,
  streak,
  longest,
  seconds,
  leeches,
  today,
}: {
  levels: LevelRow[];
  days: DayRow[];
  dueNow: number;
  upcoming: number;
  games: GameRow[];
  streak: number;
  longest: number;
  seconds: number;
  leeches: number;
  today: string;
}) {
  const totalSeen = levels.reduce((s, l) => s + l.seen, 0);
  const totalMastered = levels.reduce((s, l) => s + l.mastered, 0);
  const totalWords = levels.reduce((s, l) => s + l.total, 0);
  const byDay = new Map(days.map((d) => [d.day, d]));

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold">İlerlemen</h1>
        <p className="muted mt-1 text-sm">
          Tekrarları uygulama planlıyor — sen sadece oynamaya devam et.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard label="Güncel seri" value={`${streak} gün`} tone="var(--color-flame-500)" Icon={FlameIcon} />
        <KpiCard label="En uzun seri" value={`${longest} gün`} tone="var(--color-brand-500)" Icon={TrophyIcon} />
        <KpiCard label="Çalışma süresi" value={formatDuration(seconds)} tone="var(--color-violet-400)" Icon={SparkIcon} />
        <KpiCard label="Öğrenilen" value={`${totalMastered}`} tone="var(--color-mint-500)" Icon={BookIcon} />
      </div>

      {/* CEFR seviyeleri */}
      <section className="card p-5">
        <h2 className="mb-4 font-bold">CEFR seviyesine göre</h2>
        <div className="space-y-4">
          {levels.map((l, i) => {
            const pct = l.total ? (l.seen / l.total) * 100 : 0;
            const masteredPct = l.total ? (l.mastered / l.total) * 100 : 0;
            return (
              <div key={l.niveau}>
                <div className="mb-1.5 flex items-baseline justify-between text-sm">
                  <span className="font-semibold">{l.niveau}</span>
                  <span className="muted text-xs">
                    {l.seen} / {l.total} kelime · {l.mastered} pekişmiş
                  </span>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full surface-2">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full opacity-40"
                    style={{ background: LEVEL_COLOR[l.niveau] ?? "var(--color-brand-500)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 140, damping: 24 }}
                  />
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: LEVEL_COLOR[l.niveau] ?? "var(--color-brand-500)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${masteredPct}%` }}
                    transition={{ delay: i * 0.08 + 0.1, type: "spring", stiffness: 140, damping: 24 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="muted mt-4 text-xs">
          Koyu bölüm pekişmiş (21+ gün aralık), açık bölüm görülmüş kelimeleri gösterir. Toplam{" "}
          {totalSeen}/{totalWords}.
        </p>
      </section>

      {/* Aktivite ısı haritası */}
      <section className="card p-5">
        <h2 className="mb-4 font-bold">Son 8 hafta</h2>
        <Heatmap byDay={byDay} today={today} />
        <div className="muted mt-3 flex items-center gap-2 text-xs">
          <span>az</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span
              key={l}
              className="h-3 w-3 rounded-sm"
              style={{ background: heatColor(l * 8) }}
            />
          ))}
          <span>çok</span>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="card p-5">
          <h2 className="mb-3 font-bold">Tekrar kuyruğu</h2>
          <div className="flex items-center gap-4">
            <Donut value={dueNow} total={Math.max(1, dueNow + upcoming)} />
            <div className="text-sm">
              <p>
                <strong className="text-[color:var(--color-flame-500)]">{dueNow}</strong> kelime şu an
                hazır
              </p>
              <p className="muted mt-1">{upcoming} kelime ileri tarihe planlandı</p>
              {leeches > 0 ? (
                <p className="mt-1 text-[color:var(--color-rose-500)]">
                  {leeches} kelimede zorlanıyorsun — sık sık geri gelecekler
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="card p-5">
          <h2 className="mb-3 font-bold">Oyun performansın</h2>
          {games.length === 0 ? (
            <p className="muted text-sm">Henüz veri yok — birkaç tur oyna.</p>
          ) : (
            <ul className="space-y-2.5">
              {games.map((g) => {
                const pct = g.total ? Math.round((g.correct / g.total) * 100) : 0;
                return (
                  <li key={g.game} className="text-sm">
                    <div className="mb-1 flex justify-between">
                      <span>{GAME_LABELS[g.game as GameId] ?? g.game}</span>
                      <span className="muted">
                        %{pct}
                        {g.avgMs ? ` · ${(g.avgMs / 1000).toFixed(1)} sn` : ""}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full surface-2">
                      <motion.div
                        className="brand-gradient h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ type: "spring", stiffness: 150, damping: 24 }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function formatDuration(totalSeconds: number): string {
  const m = Math.round(totalSeconds / 60);
  if (m < 60) return `${m} dk`;
  const h = Math.floor(m / 60);
  return `${h} sa ${m % 60} dk`;
}

function KpiCard({
  label,
  value,
  tone,
  Icon,
}: {
  label: string;
  value: string;
  tone: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-4"
    >
      <div style={{ color: tone }}>
        <Icon size={20} />
      </div>
      <div className="mt-1 text-xl font-bold">{value}</div>
      <div className="muted text-xs">{label}</div>
    </motion.div>
  );
}

function Heatmap({ byDay, today }: { byDay: Map<string, DayRow>; today: string }) {
  const weeks: string[][] = [];
  const end = new Date(`${today}T00:00:00Z`);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 55);
  // Pazartesi başlangıcına hizala
  const offset = (start.getUTCDay() + 6) % 7;
  start.setUTCDate(start.getUTCDate() - offset);

  const cursor = new Date(start);
  while (cursor <= end) {
    const week: string[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(cursor.toISOString().slice(0, 10));
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    weeks.push(week);
  }

  return (
    <div className="flex gap-1 overflow-x-auto pb-1">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-1">
          {week.map((day) => {
            const row = byDay.get(day);
            const count = row?.reviews ?? 0;
            const future = day > today;
            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: future ? 0.25 : 1, scale: 1 }}
                transition={{ delay: wi * 0.012 }}
                title={`${day}: ${count} tekrar`}
                className="h-3.5 w-3.5 rounded-sm"
                style={{ background: future ? "var(--surface-2)" : heatColor(count) }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function heatColor(count: number) {
  if (count <= 0) return "var(--surface-2)";
  if (count < 8) return "color-mix(in srgb, var(--color-brand-500) 28%, var(--surface-2))";
  if (count < 16) return "color-mix(in srgb, var(--color-brand-500) 50%, var(--surface-2))";
  if (count < 32) return "color-mix(in srgb, var(--color-brand-500) 72%, var(--surface-2))";
  return "var(--color-brand-500)";
}

function Donut({ value, total }: { value: number; total: number }) {
  const pct = Math.min(100, (value / total) * 100);
  return (
    <div
      className="relative h-20 w-20 shrink-0 rounded-full"
      style={{
        background: `conic-gradient(var(--color-flame-500) ${pct}%, var(--surface-2) ${pct}% 100%)`,
      }}
    >
      <div
        className="absolute inset-2 flex items-center justify-center rounded-full text-sm font-bold"
        style={{ background: "var(--surface)" }}
      >
        {value}
      </div>
    </div>
  );
}
