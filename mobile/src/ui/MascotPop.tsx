import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { Mascot, type Mood } from "./Mascot";
import { reduceMotion } from "../lib/reduceMotion";
import { claimStage, releaseStage } from "../lib/mascotStage";

/**
 * Kutlama maskotu — `trigger` her arttığında ekranın alt-sağ kenarından zıplar,
 * ~2 sn sonra iner. Web MascotPop'un mobil karşılığı: ardışık doğru serisi 5'in
 * katına gelince çağrılır; rastgele ama kurallı bir kutlama modu seçilir.
 */
const CHEERS: Mood[] = ["celebrate", "happy", "thumbsup", "wave"];

/** Ekranda kalma süresi — sahne kilidi de bu süre kadar alınıyor. */
const HOLD_MS = 1900;

export function MascotPop({ trigger, size = 120 }: { trigger: number; size?: number }) {
  const y = useRef(new Animated.Value(240)).current;
  const [mood, setMood] = useState<Mood>("celebrate");
  const [visible, setVisible] = useState(false);
  /*
    SAHNE ALINIYOR (`lib/mascotStage`, web `mascot-pop` ile aynı kural).
    Sahne doluysa (ortam dikizlemesi sürüyor) kutlama beklemeye alınıyor:
    üç yüz milisaniyede bir yeniden deniyor, sekiz saniye içinde sahne
    boşalmazsa vazgeçiliyor — gecikmiş kutlama neyi kutladığı belli olmayan
    bir kutlamadır.
  */
  useEffect(() => {
    if (!trigger) return;
    let hide: ReturnType<typeof setTimeout> | null = null;
    let poll: ReturnType<typeof setInterval> | null = null;
    const giveUpAt = Date.now() + 8000;
    const stopPolling = () => { if (poll) clearInterval(poll); poll = null; };
    const tryShow = () => {
      if (!claimStage("pop", HOLD_MS + 400)) {
        if (Date.now() > giveUpAt) stopPolling();
        return;
      }
      stopPolling();
      setMood(CHEERS[Math.floor(Math.random() * CHEERS.length)]);
      setVisible(true);
      /* "Hareketi azalt": maskot kayarak girmiyor, yerinde beliriyor. Bilgi
         aynı (maskot görünüyor), yalnız hareket yok. */
      if (reduceMotion()) y.setValue(0);
      else Animated.spring(y, { toValue: 0, useNativeDriver: true, speed: 12, bounciness: 10 }).start();
      hide = setTimeout(() => {
        const bitir = () => { setVisible(false); releaseStage("pop"); };
        if (reduceMotion()) { y.setValue(240); bitir(); return; }
        Animated.timing(y, { toValue: 240, duration: 320, useNativeDriver: true }).start(({ finished }) => {
          if (finished) bitir();
        });
      }, HOLD_MS);
    };
    tryShow();
    if (!hide) poll = setInterval(tryShow, 300);
    return () => {
      if (hide) clearTimeout(hide);
      if (poll) clearInterval(poll);
      releaseStage("pop");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
  if (!visible) return null;
  return (
    <Animated.View pointerEvents="none" style={{ position: "absolute", right: 10, bottom: 0, transform: [{ translateY: y }] }}>
      <Mascot mood={mood} size={size} stage="pop" />
    </Animated.View>
  );
}
