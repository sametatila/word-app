import { LoadingRegion } from "@/components/loading-region";
import { SkeletonBar, SkeletonLine } from "@/components/skeleton";

/**
 * Ünite sınavı gelene kadar iskelet — ilerleme şeridi, soru ve şıklar.
 * Sorular sunucuda ünite özetlerinden üretiliyor (`nativeUnitBriefs`).
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-4">
      <div className="flex items-center justify-between gap-3">
        <SkeletonLine variant="strong" width={110} />
        <SkeletonLine variant="caption" width={48} />
      </div>
      <SkeletonBar height={7} />
      <section className="card space-y-3 p-4">
        <SkeletonLine variant="h3" width="80%" />
        <SkeletonLine variant="caption" width="40%" />
      </section>
      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-12 w-full rounded-tile" style={{ background: "var(--surface-2)" }} />
        ))}
      </div>
    </LoadingRegion>
  );
}
