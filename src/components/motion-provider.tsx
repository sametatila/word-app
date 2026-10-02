"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LANDING_PATH } from "@/lib/landing-path";

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
/*
 * TANITIM SAYFASINDA YOK (2026-10-02). Sağlayıcı kök düzendeydi ve
 * framer-motion'ın çekirdeğini (~53 KB sıkıştırılmış) her sayfanın ilk
 * script listesine koyuyordu; tanıtım sayfası framer-motion KULLANMIYOR
 * (kendi hareketi `LandingMotion`, düz CSS/JS). Mobil Lighthouse'ta ilk
 * çizimden önce istenen her bayt LCP tahmine giriyor. Ayar artık ayrı bir
 * parçada (`motion-config`) ve tanıtım adreslerinde hiç çizilmiyor; öteki
 * sayfalarda sunucu çiziminde de var, yani davranış aynı. Tanıtımdan
 * uygulamaya istemci içi geçişte parça o an yükleniyor.
 */
const MotionConfigUser = dynamic(() => import("@/components/motion-config"));
const LANDING = new Set(Object.values(LANDING_PATH));

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (LANDING.has(pathname)) return <>{children}</>;
  return <MotionConfigUser>{children}</MotionConfigUser>;
}
