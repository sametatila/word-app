import { LoadingRegion } from "@/components/loading-region";
import { PersonRowSkeleton, SkeletonLine, SkeletonPill, SkeletonTile } from "@/components/skeleton";

/**
 * Herkese açık profil gelene kadar iskelet — avatar, ad, rozet şeridi ve
 * satırlar. Android `UserScreen` tam bu sırayı iskeletle çiziyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-4">
      <SkeletonLine variant="h2" width={120} />
      <section className="card flex items-center gap-3 p-4">
        <SkeletonTile size={56} />
        <div className="flex-1 space-y-2">
          <SkeletonLine variant="strong" width={160} />
          <SkeletonLine variant="caption" width={110} />
        </div>
      </section>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <SkeletonPill key={i} width={72} height={28} />
        ))}
      </div>
      <PersonRowSkeleton rows={3} />
    </LoadingRegion>
  );
}
