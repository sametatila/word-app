"use client";

import { motion } from "framer-motion";

const TONE: Record<string, string> = {
  A1: "var(--color-mint-500)",
  A2: "var(--color-sky-400)",
  B1: "var(--color-violet-400)",
  B2: "var(--color-brand-500)",
  C1: "var(--color-flame-500)",
};

/**
 * Seçilen CEFR seviyesi ve o seviyenin pekişme durumu.
 *
 * Burada bilerek bir rütbe yok. Seviye kullanıcının kendi beyanıdır ve yalnızca
 * profilden değişir; gösterilen şey biriktirdiği kelimedir. Ölçü yalnızca artar
 * — kimseye "geriye gittin" denmez, çünkü bir oturumun doğruluk oranı zaten
 * yetkinliği değil kuyruğun bileşimini ölçer.
 */
export function LevelBadge({
  level,
  mastered,
  total,
  compact = false,
}: {
  level: string;
  mastered: number;
  total: number;
  compact?: boolean;
}) {
  const tone = TONE[level] ?? "var(--color-brand-500)";
  const pct = total > 0 ? Math.min(100, (mastered / total) * 100) : 0;

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
              {mastered > 0
                ? `${mastered.toLocaleString("tr-TR")} kelime pekişti`
                : "kelimeler pekiştikçe burada birikecek"}
            </span>
          ) : null}
        </div>
        {!compact && total > 0 ? (
          <span className="muted text-xs font-semibold tabular-nums">
            %{pct < 1 && mastered > 0 ? "<1" : Math.round(pct)}
          </span>
        ) : null}
      </div>

      {!compact ? (
        <div className="h-1.5 w-full overflow-hidden rounded-full surface-2">
          <motion.div
            className="h-full rounded-full"
            style={{ background: tone }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(pct, mastered > 0 ? 1.5 : 0)}%` }}
            transition={{ type: "spring", stiffness: 140, damping: 24 }}
          />
        </div>
      ) : null}
    </div>
  );
}
