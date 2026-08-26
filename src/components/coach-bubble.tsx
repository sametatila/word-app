"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mascot, type Mood } from "@/components/mascot";
import { useStill } from "@/lib/use-still";
import { pickCoachLine, type CoachMoment, type CoachVars } from "@/lib/coach-lines";
import { track } from "@/lib/track";

/**
 * Koç balonu (WP-66): Erdi'nin yanında tek cümlelik Türkçe metin.
 *
 * Balon 4 saniye durur, sonra kaybolur; Erdi kalır (kendi ritminde idle'a
 * geçer). Metin bilgi değil eşlik — bu yüzden kaybolması sorun değil; kalıcı
 * bilgi kartın kendi metninde.
 *
 * Hareket azaltmada Erdi klibi yok, yalnız metin: kalıcı ve sade.
 *
 * Tek Erdi kuralı: bu Erdi "yerleşik" (sahne almaz); yürüyüş ya da kutlama
 * sahneyi aldığında görünmez olur, balon yine durur — cümle sahneye bağlı
 * değil. Cümle ilk çizimden SONRA seçiliyor (localStorage'daki "son
 * söylenenler" sunucuda yok; sunucu HTML'i ile ilk çizim ayrışmasın).
 */
export function CoachBubble({
  moment,
  mood,
  vars,
  text,
  size = 56,
  hold = 4000,
  stage,
  className = "",
  tone = "card",
}: {
  moment: CoachMoment;
  mood: Mood;
  vars?: CoachVars;
  /** Verilirse listeden seçim yapılmaz, bu cümle söylenir. */
  text?: string;
  size?: number;
  /** Balonun ekranda kalma süresi (ms); 0 = kalıcı. */
  hold?: number;
  stage?: string;
  className?: string;
  /** Koyu zeminde (sonuç başlığı) balon açık kalır, metin koyu. */
  tone?: "card" | "dark";
}) {
  const still = useStill();
  const [line, setLine] = useState<string | null>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setLine(text ?? pickCoachLine(moment, vars));
    setOpen(true);
    track("coach_show", 0, moment);
    // vars nesnesi her çizimde yeni; cümle an değişince seçilir, isim/puan an ile gelir.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moment, text]);

  useEffect(() => {
    if (!hold || still || !line) return;
    const t = setTimeout(() => setOpen(false), hold);
    return () => clearTimeout(t);
  }, [hold, still, line]);

  if (!line) return null;

  if (still) {
    return (
      <p role="status" className={`text-sm leading-snug ${tone === "dark" ? "" : "muted"} ${className}`}>
        {line}
      </p>
    );
  }

  const bubble =
    tone === "dark"
      ? /* Koyu zeminde balon hep açık; metin rengi temadan BAĞIMSIZ koyu, yoksa
           gece temasında açık metin açık balona düşer. */
        { background: "rgba(255,255,255,0.94)", color: "#2b1d12" }
      : { background: "var(--surface-2)", color: "var(--text)" };

  return (
    <div className={`flex items-end gap-2 ${className}`}>
      <Mascot mood={mood} size={size} stage={stage} />
      <AnimatePresence initial={false}>
        {open ? (
          <motion.p
            key="bubble"
            role="status"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="relative mb-3 min-w-0 rounded-2xl rounded-bl-md px-3 py-2 text-sm leading-snug"
            style={bubble}
          >
            {/* Kuyruk: balonun Erdi'ye bakan alt köşesi. */}
            <span
              aria-hidden
              className="absolute -left-1.5 bottom-2 h-3 w-3 rotate-45"
              style={{ background: bubble.background }}
            />
            {line}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
