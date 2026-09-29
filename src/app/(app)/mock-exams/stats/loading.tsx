import { LoadingRegion } from "@/components/loading-region";
import { SkeletonBar, SkeletonTile } from "@/components/skeleton";
import { TextSlot } from "@/components/flow-skeleton";

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
          <TextSlot chars={17} className="line-clamp-2 break-words text-h2" />
        </div>
      </div>
      <section aria-hidden className="card p-4">
        <TextSlot chars={14} className="text-micro" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="mt-2">
            <div className="flex items-baseline justify-between">
              <TextSlot as="span" chars={[5, 6, 11, 9][i]} className="text-body" />
              <TextSlot as="span" chars={3} className="text-strong" />
            </div>
            <SkeletonBar height={4} className="mt-1" />
            <TextSlot chars={24} className="mt-0.5 text-micro" />
          </div>
        ))}
      </section>
      <section aria-hidden className="card p-4">
        <TextSlot chars={15} className="text-micro" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="mt-2 flex justify-between">
            <TextSlot as="span" chars={2} className="text-body" />
            <TextSlot as="span" chars={14} className="text-strong" />
          </div>
        ))}
      </section>
      <section aria-hidden className="card p-4">
        <TextSlot chars={13} className="text-micro" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="mt-2 flex items-center justify-between gap-3">
            <span className="min-w-0 flex-1">
              <TextSlot as="span" chars={18} className="block truncate text-body" />
              <TextSlot as="span" chars={12} className="block text-micro" />
            </span>
            <TextSlot as="span" chars={3} className="shrink-0 text-strong" />
          </div>
        ))}
      </section>
    </LoadingRegion>
  );
}
