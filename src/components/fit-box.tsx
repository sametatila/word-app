"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * İçeriği kalan dikey alana sığdırır.
 *
 * Oyun ekranlarında kaydırma istemiyoruz: uzun kelimeler, sekiz kartlı
 * eşleştirme ya da küçük ekranlı telefonlar yüzünden içerik taşarsa burada
 * kademeli olarak küçültülür. Sığıyorsa hiçbir şey yapılmaz, yani normal
 * ekranlarda tipografi hiç bozulmaz.
 *
 * Küçültmenin bir alt sınırı var (okunaksız hâle gelmemeli) ve o sınırda bile
 * sığmayan içerik olabiliyor. Eskiden bu durumda içerik `overflow-hidden` ile
 * kırpılıyordu: taşan kısım hem görünmüyor hem de ulaşılamıyordu, çünkü
 * kaydırma da yoktu. Artık sığmadığında küçültme bırakılıp kaydırmaya izin
 * veriliyor — küçültülmüş ama yine de kesik bir ekran, tam boyutlu ama
 * kaydırılabilir bir ekrandan kötü.
 */
export function FitBox({ children, min = 0.62 }: { children: ReactNode; min?: number }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  /** Alt sınırda bile sığmıyorsa küçültmek yerine kaydırmaya geçiliyor. */
  const [scrolls, setScrolls] = useState(false);

  // scrollHeight dönüşümden etkilenmediği için ölçüm kendi kendini tetiklemez.
  const measure = useCallback(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const avail = o.clientHeight;
    const need = i.scrollHeight;
    if (!avail || !need) return;
    if (need <= avail) {
      setScale(1);
      setScrolls(false);
      return;
    }
    const wanted = avail / need;
    if (wanted >= min) {
      // Küçülterek sığıyor: kaydırma gerekmiyor.
      setScale(wanted);
      setScrolls(false);
    } else {
      // Sığmıyor. Küçültülmüş içeriği kaydırmak ölçüyü de bozardı (dönüşüm
      // yerleşim yüksekliğini değiştirmiyor, altta boşluk kalırdı), o yüzden
      // küçültme tamamen bırakılıyor.
      setScale(1);
      setScrolls(true);
    }
  }, [min]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (outer.current) ro.observe(outer.current);
    if (inner.current) ro.observe(inner.current);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [measure]);

  return (
    <div
      ref={outer}
      className={`flex min-h-0 flex-1 flex-col ${
        scrolls ? "overflow-y-auto overscroll-contain" : "justify-center overflow-hidden"
      }`}
    >
      <div
        ref={inner}
        style={{
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: "center center",
          transition: "transform .2s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}
