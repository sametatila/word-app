"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AchievementBadge, TIER_COLOR, TIER_LABEL, type BadgeRow } from "@/components/achievement-badge";
import { TrophyIcon } from "@/components/icons";

/**
 * Profildeki rozet duvarı.
 *
 * Kilitli rozetler GİZLENMİYOR. Gizlenmiş bir hedef hedef değildir: "gece
 * yarısıyla 05:00 arası 50 soru" rozeti ancak görüldüğünde bir gece
 * çalışmaya sebep olur. Görünen ama sönük rozet, uygulamanın kullanıcıya
 * "burada daha çok şey var" demesinin en sessiz yolu.
 *
 * Sıralama kasten karıştırılmıyor: gruplar müfredat mantığında, grup içi
 * kolaydan zora. Kullanıcı duvara baktığında bir vitrin değil bir yol
 * görüyor.
 */

type Row = BadgeRow & { group: string; unlockedAt: string | null };
type Board = { rows: Row[]; unlockedCount: number; total: number };

const GROUP_LABELS: Record<string, string> = {
  seri: "Seri",
  kelime: "Kelime",
  oyun: "Oyunlar",
  ders: "Dersler",
  beceri: "Beceriler",
  tur: "Turlar",
  keşif: "Keşif",
};

const GROUP_ORDER = ["seri", "kelime", "oyun", "ders", "beceri", "tur", "keşif"];

export function AchievementWall() {
  const [board, setBoard] = useState<Board | null>(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState<Row | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/achievements", { cache: "no-store" });
        if (!res.ok) return alive && setFailed(true);
        const data = (await res.json()) as Board;
        if (alive) setBoard(data);
      } catch {
        if (alive) setFailed(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (failed) return null;

  if (!board) {
    return (
      <section className="card p-5">
        <h2 className="mb-3 flex items-center gap-2 font-bold">
          <TrophyIcon size={18} /> Rozetler
        </h2>
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-7">
          {Array.from({ length: 14 }, (_, i) => (
            <div key={i} className="h-[58px] animate-pulse rounded-2xl" style={{ background: "var(--surface-2)" }} />
          ))}
        </div>
      </section>
    );
  }

  const pct = Math.round((board.unlockedCount / Math.max(1, board.total)) * 100);

  return (
    <section className="card p-5">
      <div className="mb-1 flex items-baseline justify-between">
        <h2 className="flex items-center gap-2 font-bold">
          <TrophyIcon size={18} /> Rozetler
        </h2>
        <span className="muted text-xs font-semibold tabular-nums">
          {board.unlockedCount} / {board.total}
        </span>
      </div>

      <div className="mb-4 h-1.5 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
        <motion.div
          className="brand-gradient h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        />
      </div>

      <div className="space-y-5">
        {GROUP_ORDER.map((g) => {
          const rows = board.rows.filter((r) => r.group === g);
          if (!rows.length) return null;
          const got = rows.filter((r) => r.unlocked).length;
          return (
            <div key={g}>
              <div className="mb-2 flex items-baseline justify-between">
                <h3 className="text-sm font-bold">{GROUP_LABELS[g] ?? g}</h3>
                <span className="muted text-[11px] tabular-nums">
                  {got}/{rows.length}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7">
                {rows.map((r) => (
                  <AchievementBadge
                    key={r.id}
                    row={r}
                    selected={open?.id === r.id}
                    onClick={() => setOpen((cur) => (cur?.id === r.id ? null : r))}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Ayrıntı, rozetin altında açılan tek bir satır: her rozetin yanına
          açıklama yazmak duvarı okunmaz yapıyordu. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key={open.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-4 rounded-xl p-3.5"
            style={{ background: "var(--surface-2)" }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-bold">{open.title}</p>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide"
                style={{
                  background: `color-mix(in srgb, ${TIER_COLOR[open.tier]} 18%, transparent)`,
                  color: TIER_COLOR[open.tier],
                }}
              >
                {TIER_LABEL[open.tier]}
              </span>
            </div>
            <p className="muted mt-1 text-sm">{open.hint}</p>
            {open.unlocked ? (
              <p className="mt-1.5 text-xs font-semibold" style={{ color: "var(--color-mint-500)" }}>
                Açıldı
                {open.unlockedAt
                  ? ` · ${new Date(open.unlockedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}`
                  : ""}
              </p>
            ) : (
              <p className="mt-1.5 text-xs font-semibold tabular-nums" style={{ color: "var(--color-brand-500)" }}>
                {open.done.toLocaleString("tr-TR")} / {open.target.toLocaleString("tr-TR")}
              </p>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
