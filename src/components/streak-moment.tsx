"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlameIcon } from "@/components/icons";
import { vibrate } from "@/lib/fx";
import { useStill } from "@/lib/use-still";
import { useT } from "@/lib/i18n/client";

/** Sahnenin ekranda kaldığı süre; sonra sonuç ekranı kendiliğinden geliyor. */
export const STREAK_MOMENT_MS = 1200;
/** Eski sayı bu kadar durup yerini yenisine bırakıyor: önce alev, sonra sayı. */
const SWAP_MS = 380;

/**
 * SERİ ANI — günün ilk turu bitince, sonuç ekranından ÖNCE kısa bir sahne.
 *
 * Samet'in kararı (2026-09-28): seri artışı sonuç ekranındaki üç sayıdan biri
 * olarak geçip gidiyordu; günün tek "bugün de oldu" anı buydu ve hiç
 * işaretlenmiyordu. Sahne yalnız serinin O İSTEKTE arttığı günde oynuyor
 * (sunucu `/api/answers` `streakUp`), günün ikinci turunda oynamıyor —
 * her turda çıkan bir kutlama değersizleşir.
 *
 * Kurallar kutlama kurallarıyla aynı: kısa (`STREAK_MOMENT_MS`), dokununca /
 * tıklayınca / tuşla hemen geçiyor, "Hareketi azalt" açıkken hareket yok ama
 * bilgi aynı (yeni sayı doğrudan yazılı). Ses ve titreşim tek çağrı:
 * `vibrate("streak")` sesi de çalıyor.
 *
 * Mobil karşılığı `ui/StreakMoment`: aynı sıra, aynı süre, aynı metinler.
 */
export function StreakMoment({ streak, onDone }: { streak: number; onDone: () => void }) {
  const t = useT();
  const still = useStill();
  const [swapped, setSwapped] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  /* Sayı bir artıyor. Seri kırılıp yeniden başladıysa (1) önceki değer 0:
     "yeni başladı" da bir artış ve aynı sahneyle söyleniyor. */
  const from = Math.max(0, streak - 1);

  // `onDone` her çizimde yeniden doğabilir; zamanlayıcı onu ref'ten okuyor.
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  });

  useEffect(() => {
    vibrate("streak");
    box.current?.focus();
    const swap = setTimeout(() => setSwapped(true), SWAP_MS);
    const end = setTimeout(() => done.current(), STREAK_MOMENT_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" && e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      done.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(swap);
      clearTimeout(end);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const shown = still || swapped ? streak : from;

  return (
    <div
      ref={box}
      tabIndex={-1}
      role="status"
      aria-label={t("streak_moment.title", { n: streak })}
      onClick={() => done.current()}
      className="mx-auto flex min-h-[60vh] w-full max-w-md cursor-pointer flex-col items-center justify-center gap-3 px-4 text-center outline-none"
    >
      {/* ALEV: ölçek yayı. Küçükten biraz taşarak yerine oturuyor; "Hareketi
          azalt"ta `MotionConfig` dönüşümü zaten kapatıyor. */}
      <motion.span
        initial={still ? false : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 11 }}
        className="glow-tint flex h-24 w-24 items-center justify-center rounded-full on-fill"
        style={{ background: "var(--color-flame-500)", "--tint-fill": "var(--color-flame-500)" } as React.CSSProperties}
      >
        <FlameIcon size={52} />
      </motion.span>

      {/* SAYI: eski değer yukarı kayıp sönüyor, yenisi alttan geliyor. */}
      <span className="relative block h-[1.2em] overflow-hidden text-display tabular-nums" aria-hidden>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={shown}
            className="block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
          >
            {shown}
          </motion.span>
        </AnimatePresence>
      </span>

      <h2 className="text-h2">{t("streak_moment.title", { n: streak })}</h2>
      <p className="muted text-body">{t("streak_moment.sub", { n: streak + 1 })}</p>
    </div>
  );
}
