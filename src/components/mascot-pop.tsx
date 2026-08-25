"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mascot, type Mood } from "@/components/mascot";
import { useStill } from "@/lib/use-still";

/** Kutlama çeşitleri — hep aynı klip kutlamayı ezberletiyor, aralarında dönüyor. */
const CHEERS: Mood[] = ["cheer", "dance", "happy"];

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
  hold = 2600,
}: {
  trigger: number;
  mood?: Mood;
  side?: "left" | "right";
  hold?: number;
}) {
  const [show, setShow] = useState(false);
  const still = useStill();
  /* Varsayılan kutlamada her tetikte rastgele bir kutlama klibi seçilir;
     çağıran açıkça başka bir duygu istediyse ona dokunulmaz. */
  const shown = useMemo<Mood>(
    () => (mood === "cheer" ? CHEERS[Math.floor(Math.random() * CHEERS.length)] : mood),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trigger, mood]
  );

  useEffect(() => {
    if (!trigger) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), hold);
    return () => clearTimeout(t);
  }, [trigger, hold]);

  /*
    Hareket azaltma tercihinde kutlama KALKMIYOR, yalnızca hareketi kalkıyor:
    karakter kenardan kaymak yerine olduğu yerde beliriyor. Önce tercih açıkken
    hiç çıkmıyordu ve bu yanlıştı — "hareketi azalt" hareketi azaltmayı ister,
    içeriği gizlemeyi değil; o kullanıcı kutlamayı hiç görmüyordu.
  */
  const from = still ? 0 : side === "right" ? 120 : -120;
  const lift = still ? 0 : 30;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key={trigger}
          aria-hidden
          initial={{ x: from, y: lift, opacity: 0, rotate: still ? 0 : side === "right" ? 12 : -12 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          exit={{ x: from, y: lift, opacity: 0 }}
          transition={
            still ? { duration: 0.15 } : { type: "spring", stiffness: 260, damping: 20 }
          }
          className="pointer-events-none fixed z-40"
          /*
            Alt kenar sabit 6rem idi. Alt gezinme çubuğunun yüksekliği sabit
            değil — cihazın alt güvenli alanı ve kullanıcının yazı tipi ölçeği
            onu değiştiriyor (kabuk bu yüzden `--nav-h` diye ölçüyor). Sabit
            değer, çubuğun yüksek olduğu telefonlarda karakteri onun üstüne
            bindiriyordu. Değişken yoksa eski değere düşüyor.
          */
          style={{
            bottom: "calc(var(--nav-h, 6rem) + 1rem)",
            ...(side === "right" ? { right: 8 } : { left: 8 }),
          }}
        >
          {/* Hepsi aynı boy: dans geniş tuvalde diye büyütülmüştü, ekranda iri kaçıyordu. */}
          <Mascot mood={shown} size={92} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
