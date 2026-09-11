import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonBar, SkeletonPill } from "@/components/skeleton";

/**
 * İlerleme gelene kadar iskelet — iki blok: iki haftalık ritim ve yetkinlik
 * paneli. Sayfa üç ayrı veritabanı okuması yapıyor ve `force-dynamic`;
 * iskelet yokken ekran o süre boyunca boş kalıyordu.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-4">
      <SkeletonLine variant="h2" width={160} />
      <section className="card p-4">
        <div className="flex items-baseline justify-between">
          <SkeletonLine variant="strong" width={120} />
          <SkeletonLine variant="caption" width={64} />
        </div>
        {/* On dört günün çubukları: ritim şeridinin yeri. */}
        <div className="mt-4 flex items-end gap-1.5">
          {Array.from({ length: 14 }).map((_, i) => (
            <SkeletonBar key={i} height={18 + ((i * 7) % 30)} className="flex-1" />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <SkeletonLine key={i} variant="body" width="80%" />
          ))}
        </div>
      </section>
      <section className="card p-4">
        <div className="flex items-baseline justify-between">
          <SkeletonLine variant="strong" width={140} />
          <SkeletonLine variant="caption" width={72} />
        </div>
        <div className="mt-3 flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <SkeletonPill key={i} width={44} height={28} />
          ))}
        </div>
        <div className="mt-3 space-y-2">
          {[0, 1, 2].map((i) => (
            <SkeletonLine key={i} variant="body" width={`${88 - i * 10}%`} />
          ))}
        </div>
      </section>
    </LoadingRegion>
  );
}
