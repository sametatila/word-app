import { LoadingRegion } from "@/components/loading-region";
import { SkeletonBar, SkeletonLine, SkeletonTile } from "@/components/skeleton";

/**
 * Ünite iskeleti — sayfanın sırasıyla: geri satırı (`PageBack`: tema +
 * "A1 · Ünite n"), konuşma başlıkları satırı, ilerleme şeridi + "n/m adım",
 * sonra adım kartları (46 px tür karosu, tür adı, başlık, sağda durum).
 *
 * Eskisi geri düğmesini ve ilerleme şeridini çizmiyordu, adımlar içsiz
 * bloklardı. Mobil `UnitScreen`in iskeleti yok: adımlar gezinme
 * parametresiyle geliyor, ekran ilk karede dolu.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <div aria-hidden className="mb-4 flex items-center gap-3">
        <SkeletonTile size={44} />
        <div className="min-w-0 flex-1">
          <SkeletonLine variant="h2" width={200} />
          <SkeletonLine variant="caption" width={110} />
        </div>
      </div>

      {/* Konuşma başlıkları (dört başlık, kırpılmıyor): kap 720 px'i bulana
          dek (lg) iki satır, sonra tek satır. */}
      <div aria-hidden className="mb-3">
        <SkeletonLine variant="caption" width="94%" />
        <SkeletonLine variant="caption" width="45%" className="lg:hidden" />
      </div>
      <SkeletonBar height={10} />
      <SkeletonLine variant="caption" width={90} className="mb-4 mt-1.5" />

      <div aria-hidden className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card flex items-center gap-3 p-4">
            <SkeletonTile size={46} />
            <div className="min-w-0 flex-1">
              <SkeletonLine variant="micro" width={64} />
              <SkeletonLine variant="strong" width={`${72 - (i % 3) * 10}%`} />
            </div>
            <SkeletonTile size={28} className="rounded-full" />
          </div>
        ))}
      </div>
    </LoadingRegion>
  );
}
