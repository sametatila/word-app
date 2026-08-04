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
 * Seviye puanı -8 ile 10 arasında; 10'a ulaşınca terfi, -6'ya düşünce geri iner.
 * Amaç: öğrencinin yükselişi/düşüşü anlık olarak görmesi.
 */
export function LevelBadge({
  level,
  score,
  ceiling,
  compact = false,
}: {
  level: string;
  score: number;
  ceiling: string;
  compact?: boolean;
}) {
  const idx = Math.max(0, LEVELS.indexOf(level));
  const ceilIdx = Math.max(0, LEVELS.indexOf(ceiling));
  const atCeiling = idx >= ceilIdx;
  const next = atCeiling ? null : LEVELS[idx + 1];
  const pct = Math.max(0, Math.min(100, ((score + 8) / 18) * 100));
  const tone = TONE[level] ?? "var(--color-brand-500)";

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
          {!compact ? (
            <span className="muted text-xs font-semibold">
              {next ? `${next} seviyesine ilerliyorsun` : "en üst seviyendesin"}
            </span>
          ) : null}
        </div>
        {!compact && next ? (
          <span className="muted text-xs font-semibold">{next}</span>
        ) : null}
      </div>

      {!compact ? (
        <div className="h-1.5 w-full overflow-hidden rounded-full surface-2">
          <motion.div
            className="h-full rounded-full"
            style={{ background: tone }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 140, damping: 24 }}
          />
        </div>
      ) : null}
    </div>
  );
}

/** Seviye değişimi duyurusu — oturum özetinde gösterilir. */
export function LevelChangeBanner({ up, down }: { up: string | null; down: string | null }) {
  if (!up && !down) return null;
  const isUp = Boolean(up);
  const level = (up ?? down)!;
  const tone = isUp ? "var(--color-mint-500)" : "var(--color-flame-500)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="mx-6 mt-4 rounded-2xl px-4 py-3 text-center"
      style={{ background: `color-mix(in srgb, ${tone} 14%, transparent)` }}
    >
      <p className="text-sm font-bold" style={{ color: tone }}>
        {isUp ? `${level} seviyesine yükseldin` : `${level} seviyesine döndük`}
      </p>
      <p className="muted mt-1 text-xs">
        {isUp
          ? "Doğruluk oranın yüksek — bundan sonra daha zorlu kelimeler gelecek."
          : "Son turlar zorlandı; temeli sağlamlaştırıp yeniden yükseleceksin."}
      </p>
    </motion.div>
  );
}
