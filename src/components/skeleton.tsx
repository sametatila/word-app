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
