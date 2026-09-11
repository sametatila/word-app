import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine } from "@/components/skeleton";

/**
 * Yerleştirme sınavı gelene kadar iskelet — kapak: başlık, açıklama ve
 * başlat düğmesi. Android `PlacementScreen` `RoundSkeleton` çiziyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-4 pt-6">
      <div className="flex flex-col items-center gap-3">
        <SkeletonLine variant="h2" width={220} />
        <SkeletonLine variant="caption" width={170} />
      </div>
      <section className="card space-y-2 p-5">
        {[0, 1, 2].map((i) => (
          <SkeletonLine key={i} variant="body" width={`${88 - i * 13}%`} />
        ))}
      </section>
      <div className="h-12 w-full rounded-card" style={{ background: "var(--surface-2)" }} />
    </LoadingRegion>
  );
}
