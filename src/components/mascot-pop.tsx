"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mascot, type Mood } from "@/components/mascot";
import { useStill } from "@/lib/use-still";
import { claimStage, releaseStage } from "@/lib/mascot-stage";

/** Kutlama çeşitleri — hep aynı klip kutlamayı ezberletiyor, aralarında dönüyor. */
const CHEERS: Mood[] = ["celebrate", "dance", "happy"];

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
  mood = "celebrate",
  side = "right",
  /** Ekranda kalma süresi (ms). */
  /* MASKOT NE KADAR DURUYOR. Android 1900 ms (`ui/MascotPop` `HOLD_MS`);
     web 2600 yazıyordu, yani aynı kutlama web'de yedi yüz milisaniye daha
     uzun kalıyor ve tur bitişini geciktiriyordu. Sahne protokolü de aynı
     sayıdan besleniyor (`claimStage("pop", hold + 400)`). */
  hold = 1900,
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
    () => (mood === "celebrate" ? CHEERS[Math.floor(Math.random() * CHEERS.length)] : mood),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trigger, mood]
  );

  /*
    Sahne doluysa (Erdi altta yürüyor, şeridi çekiyor) kutlama beklemeye
    alınır: sahne boşalınca çıkar, sekiz saniye içinde boşalmazsa vazgeçilir —
    gecikmiş kutlama neyi kutladığı belli olmayan bir kutlamadır.
  */
  useEffect(() => {
    if (!trigger) return;
    let hide: ReturnType<typeof setTimeout> | null = null;
    let poll: ReturnType<typeof setInterval> | null = null;
    const giveUpAt = Date.now() + 8000;
    const stopPolling = () => {
      if (poll) clearInterval(poll);
      poll = null;
    };
    const tryShow = () => {
      if (!claimStage("pop", hold + 400)) {
        if (Date.now() > giveUpAt) stopPolling();
        return;
      }
      stopPolling();
      setShow(true);
      hide = setTimeout(() => {
        setShow(false);
        releaseStage("pop");
      }, hold);
    };
    tryShow();
    if (!hide) poll = setInterval(tryShow, 300);
    return () => {
      if (hide) clearTimeout(hide);
      if (poll) clearInterval(poll);
      releaseStage("pop");
    };
  }, [trigger, hold]);

  /*
    Hareket azaltma tercihinde kutlama KALKMIYOR, yalnızca hareketi kalkıyor:
    karakter kenardan kaymak yerine olduğu yerde beliriyor. Önce tercih açıkken
    hiç çıkmıyordu ve bu yanlıştı — "hareketi azalt" hareketi azaltmayı ister,
    içeriği gizlemeyi değil; o kullanıcı kutlamayı hiç görmüyordu.
  */
  /*
   * GİRİŞ YÖNÜ ANDROID'İNKİ: AŞAĞIDAN YUKARI.
   *
   * Web maskotu yandan kaydırıyordu (x ±120) ve 12 derece eğiyordu; Android
   * aynı kutlamada onu ekranın ALT kenarından yukarı kaldırıyor
   * (`ui/MascotPop`: `translateY` 240 → 0, çıkışta geri 240) ve hiç
   * eğmiyor. Aynı olay iki uygulamada iki ayrı yönden geliyordu.
   *
   * Yay da Android'inki: `speed: 12, bounciness: 10` RN'de tension 40 /
   * friction 7 demek, framer'ın karşılığı `stiffness` 40 / `damping` 7 -
   * eskisi (260/20) yaklaşık iki buçuk kat hızlıydı.
   */
  const lift = still ? 0 : 240;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key={trigger}
          aria-hidden
          initial={{ y: lift, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: lift, opacity: 0 }}
          transition={
            still ? { duration: 0.15 } : { type: "spring", stiffness: 40, damping: 7 }
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
            /* Sağ kenar boşluğu Android'le aynı (`right: 10`). */
            ...(side === "right" ? { right: 10 } : { left: 10 }),
          }}
        >
          {/* Hepsi aynı boy: dans geniş tuvalde diye büyütülmüştü, ekranda iri kaçıyordu. */}
          <Mascot mood={shown} size={92} stage="pop" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
