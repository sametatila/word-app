"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * framer-motion animasyonlarını "hareketi azalt" tercihine bağlar.
 *
 * `globals.css`teki medya sorgusu CSS animasyonlarını ve geçişlerini kesiyor
 * (`animation-duration: 0.01ms`), ama framer-motion CSS geçişi KULLANMIYOR:
 * satır içi `transform`u kendi zamanlayıcısıyla sürüyor. Yani `whileTap`
 * ölçekleri, giriş/çıkış hareketleri ve düzen animasyonları o bloğun DIŞINDA
 * kalıyordu - ölçüm: kırk dokuz bileşen framer-motion kullanıyor, tercihi
 * okuyan sekiz tanesi (bkz. docs/plan/web-parity.md §11.57).
 *
 * `reducedMotion="user"` tek yerden hepsini kapsıyor: kütüphane tercihi
 * kendisi okuyup dönüşüm ve düzen animasyonlarını atlıyor, opaklık gibi
 * hareket İÇERMEYEN geçişleri bırakıyor. Bileşen bileşen `useStill()`
 * çağırmaktan iyi - kırk dokuz dosyaya dokunmak yerine bir sarmalayıcı, ve
 * yeni bir bileşen eklendiğinde kimsenin bir şey hatırlamasına gerek yok.
 *
 * Mobil karşılığı `lib/reduceMotion.ts`; orada tek bir kütüphane olmadığı için
 * sekiz yüzey tek tek okuyor.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
