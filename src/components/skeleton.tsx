/**
 * Sayfa iskeleti.
 *
 * Ana ekrana eklenmiş uygulamada tarayıcının kendi yükleme göstergesi yok;
 * sunucudan veri gelene kadar ekran boş kalırsa uygulama donmuş gibi
 * görünüyor. Bu iskelet, gelecek içeriğin şeklini hemen çizerek o boşluğu
 * doldurur.
 */
/*
 * YARIÇAP ÖLÇEKTEN. İskelet, yerini tuttuğu şeyin şeklini almalı: burası
 * Tailwind'in kendi `rounded-xl`ini (12) kullanıyordu, oysa yerini tuttuğu
 * satır ve kutular ölçeğin 14 ve 20'sinde. İçerik gelince yarıçap zıplıyordu.
 * Mobil karşılıkları da öyle: `Skeleton` md (14), `SkeletonRows` lg (20).
 */
function Skeleton({ className = "", opacity = 1 }: { className?: string; opacity?: number }) {
  return (
    <div
      className={`animate-pulse rounded-tile ${className}`}
      style={{ background: "var(--surface-2)", opacity }}
    />
  );
}

export function PageSkeleton({ rows = 5, header = true }: { rows?: number; header?: boolean }) {
  return (
    <div aria-hidden className="mx-auto w-full max-w-2xl space-y-3">
      {header ? (
        <>
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-64" />
          <div className="h-3" />
        </>
      ) : null}
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full" opacity={1 - i * 0.13} />
      ))}
    </div>
  );
}

/*
 * `CardSkeleton` KALDIRILDI.
 *
 * Kendi verisini çeken kartların yerini ayırmak için yazılmıştı ve yüksekliği
 * elle veriliyordu ("bu kart aşağı yukarı 220 piksel"). Tuttuğu sürece işini
 * görüyordu ama tutmadığında iskeletin çözdüğü sarsıntıyı iskeletin kendisi
 * üretiyordu — beş çağrı yerinin hiçbirinde ölçü gerçek kartla aynı değildi.
 *
 * Yerine aşağıdaki ölçülü parçalar geçti; beş kart da kendi düzenini çiziyor.
 * Bileşen bilerek geri konmadı: kalırsa göz kararı yükseklik yazma yolu açık
 * kalır ve sessizce geri gelir.
 */

/** Satır iskeleti — menü ve liste satırlarının yeri. */
export function RowSkeleton({ rows = 3, height = 56 }: { rows?: number; height?: number }) {
  return (
    <div aria-hidden className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-panel"
          style={{ height, background: "var(--surface-2)", opacity: 1 - i * 0.12 }}
        />
      ))}
    </div>
  );
}

/*
 * ── ÖLÇÜYE OTURAN İSKELET ─────────────────────────────────────────────────
 *
 * Mobilde iskelet gerçek düzenin ölçüleriyle çiziliyor (`M/src/ui/Skeleton.tsx`):
 * bir başlık satırının yeri o başlığın satır yüksekliği kadar, bir kartın yeri
 * kartın kendi dolgusu kadar. Sonuç, veri gelince hiçbir şeyin yerinden
 * oynamaması.
 *
 * Web'de tek bir `CardSkeleton height={…}` vardı ve yükseklik göz kararı
 * yazılıyordu; tutmadığında iskeletin çözdüğü sarsıntıyı iskeletin kendisi
 * üretiyordu. Aşağıdakiler tipografi ölçeğinden TÜRÜYOR, o yüzden ölçek
 * değişirse iskelet de değişiyor.
 */

/** Tipografi ölçeğinin punto ve satır yükseklikleri — globals.css `@theme` ile aynı. */
const TEXT: Record<string, [size: number, lineHeight: number]> = {
  display: [32, 1.15],
  h1: [26, 1.2],
  h2: [20, 1.3],
  h3: [16, 1.35],
  body: [15, 1.5],
  strong: [15, 1.5],
  caption: [12.5, 1.4],
  micro: [11, 1.35],
};
export type TextVariant = keyof typeof TEXT;

/** Bir metin satırının gerçek yüksekliği (px) — iskelet ölçüsü buradan. */
export function textHeight(variant: TextVariant): number {
  const [size, lh] = TEXT[variant];
  return Math.round(size * lh);
}

/**
 * Tek bir metin satırının yeri.
 *
 * Dış kap gerçek satırın TAM yüksekliğini kaplar, çubuk onun içinde 4 px daha
 * kısadır ve ortalanır — mobil `ui/Skeleton.tsx` ile aynı kural. Web çubuğu
 * satırın tamamına yayıyordu: boşluksuz dizilen satırlar tek bir blok gibi
 * görünüyordu, oysa gerçek metinde aralarında nefes var. Blok yüksekliği
 * bozulmadan aradaki boşluk geri geldi.
 */
export function SkeletonLine({
  variant = "body",
  width = "100%",
  className = "",
}: {
  variant?: TextVariant;
  width?: number | string;
  className?: string;
}) {
  const h = textHeight(variant);
  const bar = Math.max(6, h - 4);
  return (
    <div aria-hidden className={`flex items-center ${className}`} style={{ height: h, width }}>
      <div
        className="w-full animate-pulse"
        style={{ height: bar, borderRadius: Math.min(10, bar / 2), background: "var(--surface-2)" }}
      />
    </div>
  );
}

/** Yatay çubuk — ilerleme çizgisi, ayraç. */
export function SkeletonBar({ height = 8, className = "" }: { height?: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded-full ${className}`}
      style={{ height, background: "var(--surface-2)" }}
    />
  );
}

/** Kare karo — ikon kutusu, avatar, rozet. */
export function SkeletonTile({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={`shrink-0 animate-pulse rounded-tile ${className}`}
      style={{ height: size, width: size, background: "var(--surface-2)" }}
    />
  );
}

/** Hap — seri/XP rozetlerinin yeri. */
export function SkeletonPill({
  width = 96,
  height = 32,
  className = "",
}: {
  width?: number | string;
  height?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded-full ${className}`}
      style={{ width, height, background: "var(--surface-2)" }}
    />
  );
}

/**
 * Kart iskeleti — İÇİ olan.
 *
 * Kartın kendi çerçevesini (yarıçap, kenarlık, dolgu) koruyup içine gerçek
 * düzenin parçalarını alıyor. Kartın yüksekliği böylece VARSAYILMIYOR,
 * içeriğinden çıkıyor — kaldırılan `CardSkeleton`ın yapamadığı da buydu.
 */
export function SkeletonCard({
  children,
  className = "",
  label,
}: {
  children?: React.ReactNode;
  className?: string;
  /** Ekran okuyucu etiketi; verilmezse yalnız "meşgul" durumu duyurulur. */
  label?: string;
}) {
  return (
    <div className={`card p-4 ${className}`} role="status" aria-busy="true" aria-label={label}>
      {children}
    </div>
  );
}
