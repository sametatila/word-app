import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonBar } from "@/components/skeleton";

/**
 * Deneme istatistiği gelene kadar iskelet — sayfanın gerçek yapısında:
 * beceri başına satır + çubuk, sonra seviye satırları.
 *
 * Sayfa veritabanından okuyor ve `force-dynamic`: iskelet yokken gezinme
 * sunucu cevaplayana dek boş ekranda duruyordu. Mobil `MockStatsScreen`
 * aynı anda kendi iskeletini çiziyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-3">
      <SkeletonLine variant="h2" width={180} />
      <section className="card p-4">
        <SkeletonLine variant="micro" width={90} />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="mt-3">
            <div className="flex justify-between">
              <SkeletonLine variant="body" width={110} />
              <SkeletonLine variant="body" width={44} />
            </div>
            <SkeletonBar height={4} className="mt-1" />
          </div>
        ))}
      </section>
      <section className="card p-4">
        <SkeletonLine variant="micro" width={80} />
        {[0, 1, 2].map((i) => (
          <div key={i} className="mt-2 flex justify-between">
            <SkeletonLine variant="body" width={64} />
            <SkeletonLine variant="body" width={72} />
          </div>
        ))}
      </section>
    </LoadingRegion>
  );
}
