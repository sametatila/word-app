import { LoadingRegion } from "@/components/loading-region";
import { CardGrid } from "@/components/layout";
import { SkeletonLine, SkeletonTile, textHeight } from "@/components/skeleton";

/**
 * Pratik iskeleti — sayfanın sırasıyla: geri satırı (`PageBack`), karışık tur
 * kahramanı, "tek oyun" başlığı ve oyun karoları, en altta not.
 *
 * Eskisi geri düğmesini çizmiyordu, karoları sabit iki/üç sütunda ve gerçek
 * karodan (min 8.25rem) kısa çiziyordu; sayfa ise `CardGrid min={150}` ile
 * genişliğe göre sütun açıyor. İskelet aynı ızgarayı kullanıyor. Karo sayısı
 * kursa göre değişiyor (Almanca 11); ilk ekranı dolduran altısı çiziliyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-5">
      <div aria-hidden className="mb-4 flex items-center gap-3">
        <SkeletonTile size={44} />
        <div className="min-w-0 flex-1">
          <SkeletonLine variant="h2" width={120} />
          <SkeletonLine variant="caption" width={220} />
        </div>
      </div>

      {/* Karışık tur: p-5, 48 px karo + h3/caption iki satır. */}
      <div
        aria-hidden
        className="animate-pulse rounded-card p-5 surface-2"
        style={{ height: 40 + Math.max(48, textHeight("h3") + textHeight("caption")) }}
      />

      <section aria-hidden className="space-y-3">
        <SkeletonLine variant="micro" width={80} />
        <CardGrid min={150}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card flex min-h-[8.25rem] flex-col justify-between gap-3 p-4">
              <SkeletonTile size={44} />
              <div>
                <SkeletonLine variant="h3" width="65%" />
                <SkeletonLine variant="caption" width="90%" />
              </div>
            </div>
          ))}
        </CardGrid>
      </section>

      <div aria-hidden className="px-1">
        <SkeletonLine variant="caption" width="92%" />
        <SkeletonLine variant="caption" width="60%" />
      </div>
    </LoadingRegion>
  );
}
