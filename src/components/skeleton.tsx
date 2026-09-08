/**
 * Sayfa iskeleti.
 *
 * Ana ekrana eklenmiş uygulamada tarayıcının kendi yükleme göstergesi yok;
 * sunucudan veri gelene kadar ekran boş kalırsa uygulama donmuş gibi
 * görünüyor. Bu iskelet, gelecek içeriğin şeklini hemen çizerek o boşluğu
 * doldurur.
 */
function Skeleton({ className = "", opacity = 1 }: { className?: string; opacity?: number }) {
  return (
    <div
      className={`animate-pulse rounded-xl ${className}`}
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

/**
 * Kendi verisini çeken bir kartın YERİ.
 *
 * Bu kartlar yüklenirken `null` dönüyordu ve sonuç ekranda görünür bir
 * sarsıntıydı: sayfa açılıyor, yarım saniye sonra araya bir kart giriyor ve
 * altındaki her şey aşağı kayıyor. Kullanıcı bunu "bir şeyler ters gitti"
 * diye okuyor — oysa sistem doğru çalışıyor, yalnızca yerini önceden
 * ayırmıyordu.
 *
 * Yükseklik kartın GERÇEK yüksekliğine yakın seçiliyor: iskelet kartın
 * yerine geçmiyorsa kaymayı azaltır ama bitirmez.
 *
 * Veri gelip de gösterilecek bir şey ÇIKMAZSA kart yine hiç görünmüyor. O
 * ayrım korunuyor: boş bir "zayıf noktan yok" kartı ne bilgi verir ne motive
 * eder. İskelet yalnızca BEKLERKEN var.
 */
export function CardSkeleton({
  height = 120,
  label,
}: {
  /** Piksel — yerini tutacağı kartın yaklaşık boyu. */
  height?: number;
  /** Ekran okuyucuya durum: "yükleniyor". */
  label?: string;
}) {
  return (
    <div
      className="card animate-pulse"
      style={{ height, background: "var(--surface-2)", borderColor: "transparent" }}
      role="status"
      aria-busy="true"
      aria-label={label ?? "Yükleniyor"}
    />
  );
}

/** Satır iskeleti — menü ve liste satırlarının yeri. */
export function RowSkeleton({ rows = 3, height = 56 }: { rows?: number; height?: number }) {
  return (
    <div aria-hidden className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl"
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

/** Tek bir metin satırının yeri. */
export function SkeletonLine({
  variant = "body",
  width = "100%",
  className = "",
}: {
  variant?: TextVariant;
  width?: number | string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded-chip ${className}`}
      style={{ height: textHeight(variant), width, background: "var(--surface-2)" }}
    />
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
 * `CardSkeleton` boş bir kutu; bu, kartın kendi çerçevesini (yarıçap, kenarlık,
 * dolgu) koruyup içine gerçek düzenin parçalarını almayı sağlıyor. Kartın
 * yüksekliği böylece varsayılmıyor, içeriğinden çıkıyor.
 */
export function SkeletonCard({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`card p-4 ${className}`} role="status" aria-busy="true" aria-label="Yükleniyor">
      {children}
    </div>
  );
}
