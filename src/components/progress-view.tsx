"use client";

import { motion } from "framer-motion";
import { GAME_LABELS, type GameId } from "@/lib/types";
import Link from "next/link";
import { BookIcon, ChevronRightIcon, FlameIcon, SparkIcon, TrophyIcon } from "@/components/icons";
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
  A1: "var(--color-mint)",
  A2: "var(--color-sky)",
  B1: "var(--color-violet)",
  B2: "var(--color-brand)",
  C1: "var(--color-rose)",
};

/**
 * İstatistikler KONUSUNA göre ikiye ayrıldı.
 *
 * Tek bir "ilerleme" bloğu vardı ve içinde iki ayrı soru duruyordu: "kelime
 * dağarcığım ne durumda" (seviye kapsamı, tekrar kuyruğu) ve "ben ne kadar
 * çalıştım" (seri, süre, hangi günler, hangi oyunda ne kadar iyiyim). Birincisi
 * Kelimeler ekranının, ikincisi profilin sorusu. Aynı kutuda durunca ikisi de
 * yanlış yerde oluyordu.
 *
 * Bölünme kod tekrarı yaratmıyor: ortak parçalar (KPI kartı, ısı haritası,
 * halka) aşağıda tek kopya.
 */
export function WordProgress({
  levels,
  dueNow,
  upcoming,
  leeches,
}: {
  levels: LevelRow[];
  dueNow: number;
  upcoming: number;
  leeches: number;
}) {
  const totalSeen = levels.reduce((s, l) => s + l.seen, 0);
  const totalWords = levels.reduce((s, l) => s + l.total, 0);

  return (
    <div className="space-y-4">
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
                    style={{ background: LEVEL_COLOR[l.niveau] ?? "var(--color-brand)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 140, damping: 24 }}
                  />
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: LEVEL_COLOR[l.niveau] ?? "var(--color-brand)" }}
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

      <section className="card p-5">
          <h2 className="mb-3 font-bold">Tekrar kuyruğu</h2>
          <div className="flex items-center gap-4">
            <Donut value={dueNow} total={Math.max(1, dueNow + upcoming)} />
            <div className="text-sm">
              <p>
                <strong className="text-[color:var(--color-flame)]">{dueNow}</strong> kelime şu an
                hazır
              </p>
              <p className="muted mt-1">{upcoming} kelime ileri tarihe planlandı</p>
              {leeches > 0 ? (
                <p className="mt-1 text-[color:var(--color-rose)]">
                  {leeches} kelimede zorlanıyorsun — sık sık geri gelecekler
                </p>
              ) : null}
            </div>
          </div>
      </section>
    </div>
  );
}

/**
 * Profilin istatistik bloğu: emek, hangi günler çalışıldı, hangi oyunda ne
 * kadar iyi. Hepsi kişi hakkında — kelime hakkında olanlar Kelimeler ekranında.
 */
export function ActivityProgress({
  days,
  games,
  streak,
  longest,
  seconds,
  mastered,
  today,
}: {
  days: DayRow[];
  games: GameRow[];
  streak: number;
  longest: number;
  seconds: number;
  /** Pekişmiş kelime sayısı — kart Kelimeler ekranına götürüyor. */
  mastered: number;
  today: string;
}) {
  const byDay = new Map(days.map((d) => [d.day, d]));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <KpiCard label="Güncel seri" value={`${streak} gün`} tone="var(--color-flame)" Icon={FlameIcon} />
        <KpiCard label="En uzun seri" value={`${longest} gün`} tone="var(--color-brand)" Icon={TrophyIcon} />
        <KpiCard label="Çalışma süresi" value={formatDuration(seconds)} tone="var(--color-violet)" Icon={SparkIcon} />
        {/* Tek dokunuşla kelime ekranına: kapsamın ayrıntısı orada. */}
        <KpiCard
          label="Pekişen kelime"
          value={mastered.toLocaleString("tr-TR")}
          tone="var(--color-mint)"
          Icon={BookIcon}
          href="/words"
        />
      </div>

      <ActivityStrip byDay={byDay} today={today} />

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
  href,
}: {
  label: string;
  value: string;
  tone: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  /**
   * Verilirse kart bir bağlantı olur.
   *
   * "Pekişen kelime" sayısı için: sayının ayrıntısı Kelimeler ekranında ve
   * meraklanan kişi zaten bu karta bakıyor. Ayrı bir menü satırı eklemek
   * yerine sayının kendisini kapı yapmak hem daha az yer tutuyor hem de
   * bağlantıyı merakın doğduğu yere koyuyor.
   */
  href?: string;
}) {
  const body = (
    <>
      <div className="flex items-center justify-between" style={{ color: tone }}>
        <Icon size={20} />
        {href ? (
          <span className="muted">
            <ChevronRightIcon size={14} />
          </span>
        ) : null}
      </div>
      <div className="mt-1 text-xl font-bold tabular-nums">{value}</div>
      <div className="muted text-xs">{label}</div>
    </>
  );

  if (href) {
    return (
      <Link href={href} prefetch={false} className="card block p-4">
        {body}
      </Link>
    );
  }
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
      {body}
    </motion.div>
  );
}

/** Şeritteki gün sayısı — iki tam hafta, hafta sonu ritmi görünsün diye. */
const STRIP_DAYS = 14;

/*
  İki harf, tek harf değil. Tek harfle şerit "P C C P P S Ç" oluyor ve bu
  okunmuyor: Pazartesi, Perşembe ve Pazar aynı harfe, Cuma ile Cumartesi de
  aynı harfe düşüyor. Şeridin altına gün adı koymanın tek sebebi hafta sonu
  ritmini görünür kılmaktı; ayırt edilemeyen bir harf o işi yapmıyor.
*/
const WEEKDAY = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pa"];

/**
 * Son iki haftanın çalışma ritmi.
 *
 * Burada sekiz haftalık bir ısı haritası vardı: yedi sıra, sekiz sütun,
 * altında bir de "az/çok" göstergesi. Kart tek başına 314 piksel yer
 * kaplıyordu ve profildeki en uzun bloktu — oysa söylediği tek şey "hangi
 * günler çalıştım".
 *
 * Günlük ayrıntıyı sekiz haftaya yaymak ya yedi sıra ya da çok uzun bir şerit
 * istiyor; kompakt olmanın yolu iki boyuttan birini bırakmaktan geçiyor.
 * Bırakılan boyut MENZİL oldu, ayrıntı değil: "dün çalıştım mı, hafta sonları
 * düşüyor muyum" sorusu davranışı değiştiren soru; iki ay önceki salı değil.
 * Uzun vadeli emek zaten üstteki "en uzun seri" ve "çalışma süresi"nde duruyor.
 *
 * Sütun yüksekliği o günün tekrar sayısı, pencerenin en yoğun gününe göre
 * ölçekleniyor — mutlak bir eşik olsaydı az çalışan birinde şerit hep dümdüz,
 * çok çalışanda hep tavanda görünürdü. Çalışılmayan gün ince bir taban çizgisi
 * bırakıyor: boşluk da bir bilgi, ama sütunlar hizasını kaybetmemeli.
 */
function ActivityStrip({ byDay, today }: { byDay: Map<string, DayRow>; today: string }) {
  const end = new Date(`${today}T00:00:00Z`);
  const days: { day: string; reviews: number; weekday: number }[] = [];
  for (let i = STRIP_DAYS - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ day: key, reviews: byDay.get(key)?.reviews ?? 0, weekday: (d.getUTCDay() + 6) % 7 });
  }

  const peak = Math.max(1, ...days.map((d) => d.reviews));
  const active = days.filter((d) => d.reviews > 0).length;
  const total = days.reduce((s, d) => s + d.reviews, 0);

  return (
    <section className="card px-4 py-3.5">
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-bold">Son iki hafta</h2>
        <p className="muted text-xs font-semibold tabular-nums">
          {active} gün · {total.toLocaleString("tr-TR")} tekrar
        </p>
      </div>

      <div className="flex h-11 items-end gap-[3px]">
        {days.map((d, i) => {
          const isToday = d.day === today;
          // Çalışılan en düşük gün bile görünür olmalı: %14 taban, üstüne oran.
          const pct = d.reviews > 0 ? 14 + Math.round((d.reviews / peak) * 86) : 0;
          return (
            <div key={d.day} className="flex min-w-0 flex-1 items-end" style={{ height: "100%" }}>
              {d.reviews > 0 ? (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ delay: i * 0.02, type: "spring", stiffness: 180, damping: 22 }}
                  title={`${d.day}: ${d.reviews} tekrar`}
                  className={`w-full rounded-[3px] ${isToday ? "brand-gradient" : ""}`}
                  style={isToday ? undefined : { background: heatColor(d.reviews) }}
                />
              ) : (
                <div
                  title={`${d.day}: çalışılmadı`}
                  className="w-full rounded-full surface-2"
                  style={{ height: 3 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Gün harfleri hafta sonu düşüşünü görünür kılıyor — şeridin tek başına
          söyleyemediği şey bu. Bugün koyu, geri kalanı silik. */}
      <div className="mt-1.5 flex gap-[3px]">
        {days.map((d) => (
          <span
            key={d.day}
            className={`min-w-0 flex-1 text-center text-[10px] leading-none ${
              d.day === today ? "font-bold" : d.weekday >= 5 ? "muted opacity-60" : "muted"
            }`}
          >
            {WEEKDAY[d.weekday]}
          </span>
        ))}
      </div>
    </section>
  );
}

function heatColor(count: number) {
  if (count <= 0) return "var(--surface-2)";
  if (count < 8) return "color-mix(in srgb, var(--color-brand) 28%, var(--surface-2))";
  if (count < 16) return "color-mix(in srgb, var(--color-brand) 50%, var(--surface-2))";
  if (count < 32) return "color-mix(in srgb, var(--color-brand) 72%, var(--surface-2))";
  return "var(--color-brand)";
}

function Donut({ value, total }: { value: number; total: number }) {
  const pct = Math.min(100, (value / total) * 100);
  return (
    <div
      className="relative h-20 w-20 shrink-0 rounded-full"
      style={{
        background: `conic-gradient(var(--color-flame) ${pct}%, var(--surface-2) ${pct}% 100%)`,
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
