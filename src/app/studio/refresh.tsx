"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Stüdyo sayfalarını kendiliğinden tazeler: işçiler (Instagram dakikada bir, TikTok 5, YouTube 10 dakikada bir) durumu
 * ve metrikleri arka planda yazıyor; açık kalan sayfa eski durumu göstermesin, eski durumla kaydetmesin. Sekme
 * görünürken dakikada bir, sekmeye dönünce ve tarayıcının geri/ileri düğmesinden sonra (önbellekten gelen sayfa)
 * sunucu bileşenleri yeniden çizilir. Formlar kendi taslağını korur (takvim ve editör yeni veriyi taslağı ezmeden alır).
 */
export function StudioRefresh({ every = 60_000 }: { every?: number }) {
  const router = useRouter();
  useEffect(() => {
    let last = Date.now();
    const go = () => {
      if (document.visibilityState !== "visible" || Date.now() - last < 5_000) return;
      last = Date.now();
      router.refresh();
    };
    const back = () => setTimeout(() => {
      last = 0;
      go();
    }, 0);
    const shown = (e: PageTransitionEvent) => e.persisted && back();
    const timer = setInterval(go, every);
    window.addEventListener("focus", go);
    document.addEventListener("visibilitychange", go);
    window.addEventListener("popstate", back);
    window.addEventListener("pageshow", shown);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", go);
      document.removeEventListener("visibilitychange", go);
      window.removeEventListener("popstate", back);
      window.removeEventListener("pageshow", shown);
    };
  }, [router, every]);
  return null;
}
