import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { Mascot, type Mood } from "./Mascot";
import { reduceMotion } from "../lib/reduceMotion";
import { claimStage, releaseStage } from "../lib/mascotStage";

/**
 * Ortam maskotu — rastgele aralıklarla ekranın bir kenarından "dikizler" ve
 * geri çekilir. Web `components/mascot-fx` `Peeker`ın mobil karşılığı.
 *
 * ÜÇ NOKTADA AYRIŞIYORDU, üçü de düzeltildi:
 *
 *  1. "Hareketi azalt" tercihi. Web `useStill()` ile MascotFx'i HİÇ
 *     çizmiyor; burada maskot yerinde beliriyordu — belirip kaybolmanın
 *     kendisi de hareket, ve o dalda bir sonraki randevu da kurulmuyordu
 *     (`schedule(false)` erken dönüşün arkasında kalıyordu), yani tercih açık
 *     olan kullanıcı bir kez dikizleme görüp sonrasında hiç görmüyordu.
 *     Kural artık webinki: tercih açıksa bileşen hiç çizilmez.
 *  2. Zamanlama. Web ilk randevuyu 60-150 sn arasına, sonrakileri klibin
 *     süresi + 150-330 sn arasına koyuyor; burada 20-60 ve 90-210 yazılıydı,
 *     yani aynı sürpriz Android'de iki kat sık geliyordu.
 *  3. Kenar. Web iki yandan da dikizliyor, burada yalnız sağdan geliyordu.
 *
 * Sahne de alınıyor (`lib/mascotStage`): dikizleme sürerken cevap şeridinin
 * ya da kutlama pop'unun maskotu görünmez olur — tek Erdi kuralı.
 *
 * AÇIK KALAN: web dikizlemeyi kendi klibiyle yapıyor (`peek` / `peek-mirror`,
 * gövdenin yarısı kadraj dışında) ve ayrıca EKRANIN ALTINDAN GEÇEN bir
 * yürüyüşü var (`Walker`, `walk-*`/`stroll-*` klipleri). İkisi de mobil pakete
 * kopyalanmamış klipler istiyor; burada şimdilik ruh hâli klibi kullanılıyor.
 */
const MOODS: Mood[] = ["wave", "happy", "idle"];

/** Ekranda kalma süresi — web `PEEK_MS` ile aynı. */
const PEEK_MS = 4600;
const rastgele = (min: number, max: number) => min + Math.random() * (max - min);

/* Randevu modül kapsamında: ekran geçişlerinde bileşen yeniden kurulsa da
   geri sayım yaşamaya devam eder (web `peekNextAt` ile aynı sebep). */
let peekNextAt = 0;

export function AmbientPeek({ size = 78 }: { size?: number }) {
  const [side, setSide] = useState<"left" | "right" | null>(null);
  const [mood, setMood] = useState<Mood>("wave");
  const x = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduceMotion()) return;
    if (peekNextAt === 0) peekNextAt = Date.now() + rastgele(60_000, 150_000);
    const tick = setInterval(() => {
      if (side || Date.now() < peekNextAt) return;
      if (!claimStage("peek", PEEK_MS + 400)) return;
      peekNextAt = Date.now() + PEEK_MS + rastgele(150_000, 330_000);
      setMood(MOODS[Math.floor(Math.random() * MOODS.length)]);
      setSide(Math.random() < 0.5 ? "left" : "right");
    }, 1000);
    return () => clearInterval(tick);
  }, [side]);

  useEffect(() => {
    if (!side) return;
    const gizli = side === "right" ? size + 30 : -(size + 30);
    x.setValue(gizli);
    Animated.spring(x, { toValue: 0, useNativeDriver: true, speed: 8, bounciness: 6 }).start();
    const t = setTimeout(() => {
      Animated.timing(x, { toValue: gizli, duration: 420, useNativeDriver: true }).start(({ finished }) => {
        if (finished) setSide(null);
      });
    }, PEEK_MS - 420);
    return () => {
      clearTimeout(t);
      releaseStage("peek");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side]);

  if (reduceMotion() || !side) return null;
  return (
    <Animated.View
      pointerEvents="none"
      style={{ position: "absolute", [side]: 0, bottom: 130, transform: [{ translateX: x }] }}
    >
      <Mascot mood={mood} size={size} stage="peek" />
    </Animated.View>
  );
}
