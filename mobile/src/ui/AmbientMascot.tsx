import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { Mascot, type Mood } from "./Mascot";

/**
 * Ortam maskotu — rastgele aralıklarla ekranın sağ kenarından "dikizler" ve
 * geri çekilir. Web MascotFx Peeker'ın mobil karşılığı: rastgele ama kurallı
 * (ilk 20-60 sn, sonra 90-210 sn arası; oturum boyunca ara ara). Dokunulmaz.
 */
const MOODS: Mood[] = ["wave", "happy", "idle"];

export function AmbientPeek({ size = 78 }: { size?: number }) {
  const x = useRef(new Animated.Value(size + 30)).current; // sağdan gizli başlar
  const [mood, setMood] = useState<Mood>("wave");
  const [show, setShow] = useState(false);
  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;
    let out: ReturnType<typeof setTimeout>;
    function schedule(first: boolean) {
      const wait = first ? 20000 + Math.random() * 40000 : 90000 + Math.random() * 120000;
      timer = setTimeout(() => {
        if (!alive) return;
        setMood(MOODS[Math.floor(Math.random() * MOODS.length)]);
        setShow(true);
        Animated.spring(x, { toValue: 0, useNativeDriver: true, speed: 8, bounciness: 6 }).start();
        out = setTimeout(() => {
          if (!alive) return;
          Animated.timing(x, { toValue: size + 30, duration: 420, useNativeDriver: true }).start(({ finished }) => {
            if (finished && alive) setShow(false);
          });
          schedule(false);
        }, 4200);
      }, wait);
    }
    schedule(true);
    return () => { alive = false; clearTimeout(timer); clearTimeout(out); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!show) return null;
  return (
    <Animated.View pointerEvents="none" style={{ position: "absolute", right: 0, bottom: 130, transform: [{ translateX: x }] }}>
      <Mascot mood={mood} size={size} />
    </Animated.View>
  );
}
