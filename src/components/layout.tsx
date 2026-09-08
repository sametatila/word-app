import type { CSSProperties, ReactNode } from "react";

/**
 * İçerik kapları — mobil `M/src/ui/ContentColumn.tsx` ve `CardGrid.tsx`ın
 * karşılıkları.
 *
 * Mobilde ayrım net: KABUK (sekme çubuğu, zemin) ekran kadar geniş, İÇERİK
 * okunabilir bir sütunda. Ve sütun tek değil iki: metin ağırlıklı ekranlar
 * satır ölçüsünü koruyan dar sütunda kalıyor, ızgara ekranları geniş kaba
 * çıkıyor — kartların satır ölçüsü yok, genişlikten yalnız kazanıyorlar.
 *
 * Web'de bu ayrım hiç yoktu: her sayfa kendi `max-w-md`/`max-w-2xl`/`max-w-3xl`
 * değerini seçiyordu ve aynı yoğunluktaki iki sayfa iki ayrı genişlikteydi.
 */

/** Metin ağırlıklı ekranın sütunu — mobilde 520/640/720dp, tavanı 720. */
export function ContentColumn({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`mx-auto w-full max-w-[45rem] ${className}`} style={style}>
      {children}
    </div>
  );
}

/**
 * Izgara ağırlıklı ekranın kabı — kalan genişliğin tamamı.
 *
 * Mobilde tablette "ekran eksi kenar payı"; web'de kabuk zaten `max-w-6xl` ile
 * sınırlı ve kenar çubuğu payını da o alıyor, yani burada ayrıca sınırlamak
 * genişliği İKİ kez kısmak olurdu.
 */
export function WideColumn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`w-full ${className}`}>{children}</div>;
}

/**
 * Yığılmış kart listesini geniş ekranda sütunlara böler.
 *
 * NEDEN GEREKLİ: kabı genişletmek tek başına yetmiyor. Izgara ekranlarında
 * kazanç doğrudan (kartlar zaten sarmalanıyor, sayıları artıyor) ama gezinme
 * ekranlarının çoğu kartları DİKEY YIĞIYOR — orada kap genişleyince kart da
 * uzuyor ve tek bir 900 piksellik "devam et" kartı çıkıyor. Doğru çözüm kabı
 * dar tutmak değil, listeyi sütunlara bölmek.
 *
 * Üç sütun tavanı CSS'in kendi içinde: her sütunun alt sınırı hem `min`
 * pikselden hem de kabın üçte birinden büyük olmak zorunda, yani dördüncü
 * sütun matematiksel olarak sığmıyor. Medya sorgusu ya da ölçüm gerekmiyor —
 * kap ne kadar genişse o kadar; `auto-fill` gerisini hallediyor.
 *
 * Dar kapta tek sütuna düşüyor, yani telefonda düzen birebir eskisi.
 */
export function CardGrid({
  children,
  min = 420,
  className = "",
}: {
  children: ReactNode;
  /** Bir kartın altına düşmemesi gereken genişlik (px). */
  min?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid gap-3 ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(max(${min}px, (100% - 1.5rem) / 3), 1fr))`,
        alignItems: "start",
      }}
    >
      {children}
    </div>
  );
}
