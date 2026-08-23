"use client";

import { useEffect, useState } from "react";
import { reducedMotion } from "@/lib/fx";

/**
 * "Hareketi azalt" tercihi — animasyon kararı veren her yerin ortak kaynağı.
 *
 * Neden hook, neden doğrudan `reducedMotion()` değil: `reducedMotion()` sunucuda
 * her zaman `false` döner (orada `window` yok). Render sırasında çağrılırsa
 * sunucunun ürettiği HTML ile tarayıcının ilk render'ı ayrışıyor — tercih açık
 * olan kullanıcıda hydration uyuşmazlığı çıkıyor ve daha kötüsü, sunucudan
 * `opacity: 0` ile gelen içerik JS yüklenene kadar GÖRÜNMÜYOR.
 *
 * Hook ilk render'da her iki tarafta da `false` diyor (yani içerik görünür
 * hâlde kuruluyor), tercihi ilk boyamadan sonra okuyup güncelliyor.
 */
export function useStill(): boolean {
  const [still, setStill] = useState(false);
  useEffect(() => setStill(reducedMotion()), []);
  return still;
}
