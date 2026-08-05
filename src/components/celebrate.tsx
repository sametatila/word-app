"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { reducedMotion, vibrate } from "@/lib/fx";
import { FlameIcon, TrophyIcon } from "@/components/icons";

const COLORS = ["#6366f1", "#c084fc", "#38bdf8", "#34d399", "#fbbf24", "#fb7185"];

/** Deterministik olmayan ama tur boyunca sabit kalan parçacık listesi. */
function particles(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * (0.12 + 0.76 * (i / count))) * -1; // yukarı doğru yelpaze
    const speed = 140 + Math.random() * 190;
    return {
      id: i,
      x: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1) * 0.7,
      y: Math.sin(angle) * speed - Math.random() * 90,
      rotate: Math.random() * 720 - 360,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 7,
      round: Math.random() > 0.6,
      delay: Math.random() * 0.12,
    };
  });
}

/**
 * Konfeti patlaması. `fire` her arttığında yeniden patlar.
 * Hareket azaltma tercihi açıksa hiç çizilmez.
 */
export function Confetti({ fire, count = 34 }: { fire: number; count?: number }) {
  const [burst, setBurst] = useState<{ key: number; items: ReturnType<typeof particles> } | null>(
    null,
  );

  useEffect(() => {
    if (!fire || reducedMotion()) return;
    setBurst({ key: fire, items: particles(count) });
    const t = setTimeout(() => setBurst(null), 1700);
    return () => clearTimeout(t);
  }, [fire, count]);

  if (!burst) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 z-30 flex justify-center">
      {burst.items.map((p) => (
        <motion.span
          key={`${burst.key}-${p.id}`}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.6 }}
          animate={{ opacity: [1, 1, 0], x: p.x, y: [0, p.y, p.y + 320], rotate: p.rotate, scale: 1 }}
          transition={{ duration: 1.5, delay: p.delay, ease: [0.2, 0.7, 0.4, 1] }}
          className="absolute"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.42,
            borderRadius: p.round ? "50%" : 2,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

/** Sayıyı sıfırdan hedefe sayarak gösterir — kazanım hissini güçlendirir. */
export function CountUp({ value, duration = 900 }: { value: number; duration?: number }) {
  const [shown, setShown] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion() || value <= 0) {
      setShown(value);
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // yavaşlayarak biten eğri
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [value, duration]);

  return <>{shown}</>;
}

/** Kombo/rekor gibi anlık başarıların ekranın ortasında beliren rozeti. */
export function AchievementFlash({
  message,
  tone = "flame",
  fire,
}: {
  message: string;
  tone?: "flame" | "mint";
  fire: number;
}) {
  const [shown, setShown] = useState<{ key: number; text: string } | null>(null);
  const color = tone === "mint" ? "var(--color-mint-500)" : "var(--color-flame-500)";

  useEffect(() => {
    if (!fire) return;
    setShown({ key: fire, text: message });
    vibrate("correct");
    const t = setTimeout(() => setShown(null), 1100);
    return () => clearTimeout(t);
  }, [fire, message]);

  return (
    <AnimatePresence>
      {shown ? (
        <motion.div
          key={shown.key}
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.25, y: -18 }}
          transition={{ type: "spring", stiffness: 340, damping: 16 }}
          className="pointer-events-none absolute inset-x-0 top-24 z-40 flex justify-center"
        >
          <span
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black text-white"
            style={{ background: color, boxShadow: `0 14px 34px -12px ${color}` }}
          >
            {tone === "mint" ? <TrophyIcon size={16} /> : <FlameIcon size={16} />}
            {shown.text}
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
