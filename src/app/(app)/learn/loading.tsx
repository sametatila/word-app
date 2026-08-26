/**
 * Öğren iskeleti — "Bugün" kartı, dört döşeme, görevler.
 *
 * Genel bir satır iskeleti vardı ve ekran artık üç bloktan oluşuyor. İskelet
 * gelecek düzenin şeklini çizmezse içerik geldiğinde göz yine bir sıçrama
 * görüyor.
 */
export default function Loading() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-md space-y-4">
      <div className="card overflow-hidden">
        <div className="h-32 animate-pulse surface-2" />
        <div className="space-y-3 p-4">
          <div className="flex gap-2">
            <div className="h-7 w-24 animate-pulse rounded-full surface-2" />
            <div className="h-7 w-20 animate-pulse rounded-full surface-2" />
          </div>
          <div className="h-11 w-full animate-pulse rounded-xl surface-2" />
          <div className="h-13 w-full animate-pulse rounded-2xl surface-2" style={{ height: 52 }} />
        </div>
      </div>
      <div className="h-4 w-32 animate-pulse rounded-lg surface-2" />
      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl surface-2" style={{ opacity: 1 - i * 0.08 }} />
        ))}
      </div>
    </div>
  );
}
