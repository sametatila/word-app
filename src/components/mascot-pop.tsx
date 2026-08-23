"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mascot, type Mood } from "@/components/mascot";
import { reducedMotion } from "@/lib/fx";

/**
 * Ekranın kenarından girip kaybolan Erdi.
 *
 * Kutlama şimdiye kadar konfeti ve bir rozetle yapılıyordu; ikisi de olayı
 * bildiriyor ama kimse kutlamıyordu. Karakterin kenardan uzanıp bakması
 * kutlamayı birinin yaptığı bir şey hâline getiriyor — ve mirket zaten
 * yuvasından böyle çıkıp bakan bir hayvan, hareket karakterin kendisiyle
 * tutarlı.
 *
 * Oyunun ÜSTÜNDE duruyor ama tıklamayı yemiyor: kutlama sırasında verilen
 * cevabın kaybolması, kutlamayı cezaya çevirirdi.
 *
 * `trigger` her arttığında bir kez çıkıyor. Sayının kendisi önemli değil,
 * değişmesi önemli — çağıran taraf hangi eşiği kutlayacağına kendi karar
 * veriyor.
 */
export function MascotPop({
  trigger,
  mood = "cheer",
  side = "right",
  /** Ekranda kalma süresi (ms). */
  hold = 1500,
}: {
  trigger: number;
  mood?: Mood;
  side?: "left" | "right";
  hold?: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!trigger || reducedMotion()) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), hold);
    return () => clearTimeout(t);
  }, [trigger, hold]);

  const from = side === "right" ? 120 : -120;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key={trigger}
          aria-hidden
          initial={{ x: from, y: 30, opacity: 0, rotate: side === "right" ? 12 : -12 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          exit={{ x: from, y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="pointer-events-none fixed bottom-24 z-40"
          style={side === "right" ? { right: 8 } : { left: 8 }}
        >
          <Mascot mood={mood} size={92} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
