import { LoadingRegion } from "@/components/loading-region";
import { SkeletonBar, SkeletonLine, SkeletonTile } from "@/components/skeleton";

/**
 * Deneme istatistiği gelene kadar iskelet — sayfanın gerçek sırası: geri +
 * başlık (`PageBack`), bölüm kartı (ad + yüzde, çubuk, deneme/en iyi satırı),
 * seviye kartı, son denemeler kartı. Satır aralığı gerçeğindeki gibi `mt-2`.
 *
 * Sayfa veritabanından okuyor ve `force-dynamic`: iskelet yokken gezinme
 * sunucu cevaplayana dek boş ekranda duruyordu. Mobil `MockStatsScreen`
 * aynı üç kartı aynı sırada çiziyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-3">
      <div aria-hidden className="mb-4 flex items-center gap-3">
        <SkeletonTile size={44} />
        <div className="min-w-0 flex-1">
          <SkeletonLine variant="h2" width="50%" />
        </div>
      </div>
      <section aria-hidden className="card p-4">
        <SkeletonLine variant="micro" width={90} />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="mt-2">
            <div className="flex items-baseline justify-between">
              <SkeletonLine variant="body" width={110} />
              <SkeletonLine variant="strong" width={44} />
            </div>
            <SkeletonBar height={4} className="mt-1" />
            <SkeletonLine variant="micro" width={130} className="mt-0.5" />
          </div>
        ))}
      </section>
      <section aria-hidden className="card p-4">
        <SkeletonLine variant="micro" width={80} />
        {[0, 1, 2].map((i) => (
          <div key={i} className="mt-2 flex justify-between">
            <SkeletonLine variant="body" width={40} />
            <SkeletonLine variant="strong" width={90} />
          </div>
        ))}
      </section>
      <section aria-hidden className="card p-4">
        <SkeletonLine variant="micro" width={70} />
        {[0, 1, 2].map((i) => (
          <div key={i} className="mt-2 flex items-center justify-between gap-3">
            <span className="min-w-0 flex-1">
              <SkeletonLine variant="body" width="70%" />
              <SkeletonLine variant="micro" width={120} />
            </span>
            <SkeletonLine variant="strong" width={44} className="shrink-0" />
          </div>
        ))}
      </section>
    </LoadingRegion>
  );
}
