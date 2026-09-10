import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { Mascot, type Mood } from "./Mascot";
import { reduceMotion } from "../lib/reduceMotion";

/**
 * Kutlama maskotu — `trigger` her arttığında ekranın alt-sağ kenarından zıplar,
 * ~2 sn sonra iner. Web MascotPop'un mobil karşılığı: ardışık doğru serisi 5'in
 * katına gelince çağrılır; rastgele ama kurallı bir kutlama modu seçilir.
 */
const CHEERS: Mood[] = ["celebrate", "happy", "thumbsup", "wave"];

export function MascotPop({ trigger, size = 120 }: { trigger: number; size?: number }) {
  const y = useRef(new Animated.Value(240)).current;
  const [mood, setMood] = useState<Mood>("celebrate");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!trigger) return;
    setMood(CHEERS[Math.floor(Math.random() * CHEERS.length)]);
    setVisible(true);
    /* "Hareketi azalt": maskot kayarak girmiyor, yerinde beliriyor. Bilgi
       aynı (maskot görünüyor), yalnız hareket yok. */
    if (reduceMotion()) y.setValue(0);
    else Animated.spring(y, { toValue: 0, useNativeDriver: true, speed: 12, bounciness: 10 }).start();
    const t = setTimeout(() => {
      if (reduceMotion()) { y.setValue(240); setVisible(false); return; }
      Animated.timing(y, { toValue: 240, duration: 320, useNativeDriver: true }).start(({ finished }) => {
        if (finished) setVisible(false);
      });
    }, 1900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
  if (!visible) return null;
  return (
    <Animated.View pointerEvents="none" style={{ position: "absolute", right: 10, bottom: 0, transform: [{ translateY: y }] }}>
      <Mascot mood={mood} size={size} />
    </Animated.View>
  );
}
