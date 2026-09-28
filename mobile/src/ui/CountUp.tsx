import React, { useEffect, useRef, useState } from "react";
import { reduceMotion } from "../lib/reduceMotion";

/**
 * Sayıyı sıfırdan (ya da `from`dan) hedefe sayarak gösterir — web
 * `components/celebrate` `CountUp` ile aynı alanlar, aynı eğri (yavaşlayarak
 * biten kübik).
 *
 * Metin içeriği yerel sürücüyle canlandırılamıyor (`useNativeDriver` yalnız
 * dönüşüm ve saydamlık taşır); değer kare başına JS'te hesaplanıyor, sayı
 * kısa sürdüğü için (≤ 1 sn) yük önemsiz. Dönen değer düz metin: `Text`in
 * içine yazılıyor, kendisi bir `Text` değil — çağıranın puntosu ve rengi
 * geçerli.
 *
 * `delay`: sayma başlamadan beklenen süre (tur sonunda XP → doğruluk → seri
 * sırası, bkz. `GameScreen`). Beklerken başlangıç değeri görünüyor.
 * `format`: ekrandaki biçim (yüzde, "5 gün"); ara değerler de o biçimde.
 * "Hareketi azalt" açıkken doğrudan son değer.
 */
export function CountUp({ value, duration = 900, delay = 0, from = 0, format }: {
  value: number;
  duration?: number;
  delay?: number;
  from?: number;
  format?: (n: number) => string;
}) {
  const [shown, setShown] = useState(from);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reduceMotion() || value <= from) {
      setShown(value);
      return;
    }
    let start: number | null = null;
    const step = (now: number) => {
      if (start === null) start = now + delay;
      const k = Math.max(0, Math.min(1, (now - start) / duration));
      setShown(Math.round(from + (value - from) * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [value, duration, delay, from]);

  return <>{format ? format(shown) : String(shown)}</>;
}
