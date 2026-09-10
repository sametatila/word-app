import { SkeletonLine, RowSkeleton } from "@/components/skeleton";

/**
 * Ünite gelene kadar iskelet — başlık, alt başlık ve adım satırları.
 * Mobil `UnitScreen` de aynı sırayı çiziyor.
 */
export default function Loading() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-2xl space-y-3">
      <SkeletonLine variant="h2" width={200} />
      <SkeletonLine variant="caption" width={140} />
      <div className="h-2" />
      <RowSkeleton rows={6} height={64} />
    </div>
  );
}
