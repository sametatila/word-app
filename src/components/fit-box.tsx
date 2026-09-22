"use client";

import type { ReactNode } from "react";

/**
 * Oyun ekranının kalan dikey alanı — KÜÇÜLTMEDEN, akışla.
 *
 * ## Neden artık ölçek yok
 *
 * Bu kutu eskiden içeriği `transform: scale()` ile alana sığdırıyordu. Küçük
 * telefonda bunun bedeli ağırdı: 320×568'de yeni kelime kartı 0,68'e, dinleme
 * sorusu 0,74'e iniyordu; 375×667'de bile 0,82. Ölçek her şeyi birlikte
 * küçültüyordu — 11 piksellik etiketler 7-8 piksele, düğmeler 31 piksel
 * yüksekliğe (dokunma hedefinin altına) iniyor, kart ekranın ortasında 197
 * piksellik bir adaya dönüşüyordu. Cevaptan sonra ölçek yeniden hesaplandığı
 * için (0,74 → 0,80) düzen bir de zıplıyordu. Yani "sığdırmak" okunaklılığı
 * ve dokunulabilirliği feda ediyordu; ikisi de oyunun kendisi.
 *
 * Artık düzen gerçek boyutta kalıyor ve sığmayan içerik KAYIYOR. Kısa ekranda
 * yer açmak ölçeğin işi değil, düzenin işi: süs öğeleri (maskot, geniş
 * boşluklar) yükseklik sorgularıyla kısa ekranda kalkıyor, soru kartı
 * sıkışıyor — bunlar oyun kabuğunda (games/game-shell) ve oyunların kendisinde.
 *
 * ## Boşluğu kim paylaştırıyor
 *
 * Telefonda artan boşluk BURADA paylaştırılmıyor — içeriğe bırakılıyor. Oyun
 * kartı kendi içinde okuma ve dokunma bölgelerine ayrılıyor ve boşluğu o iki
 * bölge arasında dağıtıyor (bkz. games/game-shell). Bunun için içeriğin kalan
 * alanı GÖRMESİ gerekiyor: iç kutuya `min-height: 100%` veriliyor. `min-height`
 * — `flex-1` değil: esneyen kutu içerik taşsa da alan boyunda kalır ve taşan
 * kısım kaydırma alanına hiç girmezdi; `min-height` yalnızca alt sınır, taşan
 * içerikte kutu içerikle birlikte büyüyor ve dış kutu onu kaydırıyor.
 *
 * `shrink-0` şart: açık bir `min-height` yazmak, esnek kutunun içeriğin altına
 * inmesini engelleyen otomatik en-az-boyutu devre dışı bırakıyor; onsuz kutu
 * alan boyuna kadar EZİLİP içerik kaydırılamadan taşardı.
 *
 * ## Ortalama
 *
 * `md`den itibaren alt sınır kalkıyor ve kart ortalanıyor — ama
 * `justify-center` ile DEĞİL, `my-auto` ile. Alanından uzun, `justify-center`
 * ile ortalanmış bir çocuk hem üstten hem alttan taşar ve üstten taşan kısım
 * kaydırılarak geri getirilemez. Otomatik kenar payı ise yalnızca ARTAN boşluğu
 * paylaştırıyor; içerik uzunsa pay sıfıra iniyor ve içerik baştan başlıyor.
 */
export function FitBox({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
      <div className="flex min-h-full shrink-0 flex-col md:my-auto md:min-h-0">{children}</div>
    </div>
  );
}
