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
 *
 * ## Boşluğu kim paylaştırıyor
 *
 * Telefonda artan boşluk BURADA paylaştırılmıyor — içeriğe bırakılıyor. Oyun
 * kartı kendi içinde okuma ve dokunma bölgelerine ayrılıyor ve boşluğu o iki
 * bölge arasında dağıtıyor (bkz. games/game-shell). Bunun için içeriğin kalan
 * alanı GÖRMESİ gerekiyor: iç kutuya `min-height: 100%` veriliyor.
 *
 * `min-height` — `flex-1` DEĞİL, ve fark ölçümde. Esneyen bir kutu her zaman
 * alan boyunda olur; içerik taşsa bile kutunun kendi yüksekliği değişmez ve
 * `scrollHeight` "tam sığıyor" demeye devam eder. Denendi: küçük ekranlarda
 * küçültme hiç devreye girmiyor, şıklar sessizce kırpılıyordu — 320×480'de
 * dört şıkkın üçü ekran dışında kalıyordu. `min-height` ise yalnızca ALT
 * sınır koyuyor: içerik sığıyorsa kutu alanı dolduruyor (kart boşluğu
 * paylaştırabiliyor), taşıyorsa kutu içerikle birlikte büyüyor ve ölçüm
 * taşmayı olduğu gibi görüyor.
 *
 * `md`den itibaren bu alt sınır kalkıyor: kutu yine içerik boyunda ve
 * `justify-center` ile ortalanıyor. Masaüstünde ulaşım diye bir sorun yok,
 * ikiye bölünmüş bir kart yalnızca dağınık görünürdü.
 *
 * Küçültme kutunun TEPESİNDEN uygulanıyor. Ortadan uygulamak yalnızca kutu da
 * ortalanmışken doğru sonuç veriyor; alanı dolduran kutu ortalanmıyor. Bu
 * yüzden küçültme devredeyken hizalama da başa alınıyor. İki durumda da sonuç
 * aynı: küçültülmüş içerik alanın tam üstünden başlayıp tam altında bitiyor.
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
        scrolls ? "overflow-y-auto overscroll-contain" : "overflow-hidden"
      } ${scale < 1 ? "justify-start" : "justify-center"}`}
    >
      <div
        ref={inner}
        // `shrink-0` şart: açık bir `min-height` yazmak, esnek kutunun içeriğin
        // altına inmesini engelleyen otomatik en-az-boyutu devre dışı bırakıyor.
        // Onsuz kutu alan boyuna kadar EZİLİYOR, içerik sessizce taşıyor ve
        // `scrollHeight` yine "tam sığıyor" diyor — küçültme hiç devreye
        // girmiyordu.
        className="flex min-h-full shrink-0 flex-col md:min-h-0"
        style={{
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: "top center",
          transition: "transform .2s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}
