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
