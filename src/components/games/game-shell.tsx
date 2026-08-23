"use client";

import type { ReactNode } from "react";

/**
 * Her oyunun ortak çerçevesi.
 *
 * Giriş/çıkış animasyonu üstteki tur sarmalayıcısına aittir; burada tekrar
 * animasyon yapılmaz, yoksa iki hareket üst üste binip titrek görünür.
 *
 * ## Ekran iki bölge
 *
 * Telefonda kart bir bütün olarak dikey ortalanıyordu ve bu tek elle
 * oynanamıyordu: başparmağın rahat ulaştığı yer ekranın alt yarısıyken
 * şıklar tam ortada duruyor, üsttekilere uzanmak için elin kayması ya da
 * ikinci el gerekiyordu.
 *
 * Çözüm kartı aşağı ötelemek DEĞİL — o yalnızca aynı yığını başka bir yere
 * taşır ve üstte kocaman bir boşluk bırakır. Ekran işlevine göre ikiye
 * ayrılıyor:
 *
 *   OKUMA bölgesi (üstte)   — oyun etiketi, soru, ipucu. Gözün gittiği yer;
 *                             yukarıda durması gerekiyor çünkü cevaplarken
 *                             elin altında kalmamalı.
 *   DOKUNMA bölgesi (altta) — şıklar, klavye, butonlar ve cevaptan sonraki
 *                             geri bildirim. Başparmağın çalışma alanı.
 *
 * Artan boşluk üç yere dağılıyor ve ikisinin TAVANI var:
 *
 *   iki bölge arası — en çok 7rem. Ayrımı görünür kılmaya bu yetiyor.
 *   dokunma bölgesinin altı — en çok 2rem. Alt gezinme çubuğuyla arasındaki
 *                             emniyet payı: cevap verirken sekme değiştirmek
 *                             istemiyoruz.
 *   okuma bölgesinin üstü — tavansız, artan ne varsa buraya gidiyor.
 *
 * Tavanlar meselenin can alıcı yeri. Boşluğu üçe oranlayıp bırakmak, tek
 * kelimelik bir soruda (Artikel Yarışı) soruyla şıklar arasında 250 pikselden
 * fazla ölü alan bırakıyordu — iki bölge ayrılmıştı ama ekran boşalmıştı.
 * Tavanla birlikte artan boşluk yukarı toplanıyor: soru ekranın üst yarısında
 * kalmayı sürdürüyor, şıklar aşağıda kalıyor, ikisi arasındaki mesafe ise
 * ekran ne kadar uzun olursa olsun okunabilir bir aralıkta duruyor.
 *
 * Şıkların yüksekliğini belirleyen tek şeyin ALT pay olduğuna dikkat: üstteki
 * ve aradaki payı değiştirmek yalnızca sorunun yerini oynatıyor. Bu yüzden
 * ulaşım alt payla, görsel denge ara payla ayarlanıyor.
 *
 * Boşluk azaldıkça üç pay da birlikte küçülüyor; hiç boşluk kalmadığında
 * ikisi sıfırlanıp yalnızca aradaki en az pay (`min-h-5`) kalıyor — yani
 * sıkışık ekranda düzen eski hâline dönüyor ve dar telefonda bir piksel bile
 * israf edilmiyor.
 *
 * `md`den itibaren (tablet/masaüstü) bölge ayrımı kapanıyor: orada ulaşım
 * diye bir sorun yok, imleç her yere aynı uzaklıkta ve ikiye bölünmüş bir
 * kart yalnızca dağınık görünürdü. Kart yine tek parça ve ortalanmış
 * (bkz. FitBox).
 */
export function GameShell({
  label,
  prompt,
  hint,
  children,
  footer,
}: {
  label: string;
  /** Sorunun kendisi. Oyunun içeriği zaten yeterince açıksa boş bırakılabilir. */
  prompt?: ReactNode;
  hint?: ReactNode;
  /** Dokunma bölgesi: şıklar, girdi, butonlar. */
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col md:block">
      {/* Okuma bölgesinin üstü — tavansız, artan boşluk burada toplanıyor. */}
      <div aria-hidden className="grow md:hidden" />

      <div className="text-center">
        <span className="brand-gradient inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {label}
        </span>
        {prompt ? <div className="mt-2.5 text-lg font-medium sm:text-xl">{prompt}</div> : null}
        {hint ? <div className="muted mt-1 text-sm">{hint}</div> : null}
      </div>

      {/* İki bölge arası — en az bir nefes payı, en çok okunabilir bir aralık. */}
      <div aria-hidden className="min-h-5 max-h-28 grow-[3] md:hidden" />

      <div className="md:mt-5">{children}</div>
      {footer ? <div className="mt-4">{footer}</div> : null}

      {/* Dokunma bölgesiyle alt gezinme arasındaki emniyet payı. En az sınırı
          yok: sıkışık ekranda tamamen kapanıp yeri içeriğe bırakıyor. */}
      <div aria-hidden className="max-h-8 grow md:hidden" />
    </div>
  );
}
