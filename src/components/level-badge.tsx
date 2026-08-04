"use client";

import { motion } from "framer-motion";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

const TONE: Record<string, string> = {
  A1: "var(--color-mint-500)",
  A2: "var(--color-sky-400)",
  B1: "var(--color-violet-400)",
  B2: "var(--color-brand-500)",
  C1: "var(--color-flame-500)",
};

/**
 * Güncel CEFR seviyesi ve bir sonraki seviyeye ilerleme.
 *
 * Seviyeyi performans belirler: profildeki seçim yalnızca başlangıç noktasıdır,
 * tavan değildir. Puan -8 ile 10 arasında; 10'a ulaşınca terfi, -6'ya düşünce
 * bir alt seviyeye iniş olur. Amaç öğrencinin yükselişini/düşüşünü anlık görmesi.
 */
export function LevelBadge({
  level,
  score,
  compact = false,
  calibrating = false,
}: {
  level: string;
  score: number;
  compact?: boolean;
  calibrating?: boolean;
}) {
  const idx = Math.max(0, LEVELS.indexOf(level));
  const next = idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
  const prev = idx > 0 ? LEVELS[idx - 1] : null;
  const pct = Math.max(0, Math.min(100, ((score + 8) / 18) * 100));
  const tone = TONE[level] ?? "var(--color-brand-500)";

  const label = calibrating
    ? "seviyeni yeniden ölçüyoruz"
    : next
      ? `${next} seviyesine ilerliyorsun`
      : "en üst seviyedesin";

  return (
    <div className={compact ? "flex items-center gap-2" : "space-y-1.5"}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <motion.span
            key={level}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="rounded-lg px-2 py-0.5 text-sm font-black text-white"
            style={{ background: tone }}
          >
            {level}
          </motion.span>
          {!compact ? <span className="muted text-xs font-semibold">{label}</span> : null}
        </div>
        {!compact ? (
          <span className="muted text-xs font-semibold">{next ?? "C1"}</span>
        ) : null}
      </div>

      {!compact ? (
        <div className="relative h-1.5 w-full overflow-hidden rounded-full surface-2">
          <motion.div
            className="h-full rounded-full"
            style={{ background: tone }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 140, damping: 24 }}
          />
          {/* Düşüş eşiği: puan buranın altına inerse bir alt seviyeye dönülür. */}
          {prev ? (
            <span
              className="absolute inset-y-0 w-px opacity-50"
              style={{ left: `${((-6 + 8) / 18) * 100}%`, background: "var(--color-rose-500)" }}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
