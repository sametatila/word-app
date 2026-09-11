import { LoadingRegion } from "@/components/loading-region";
import { SkeletonBar, SkeletonLine } from "@/components/skeleton";

/**
 * Deneme sınavı bölümü gelene kadar iskelet — oynatıcının ilk karesi: üstte
 * ilerleme şeridi, metin kutusu, soru ve şıklar.
 *
 * Kâğıt sunucuda yerelleştiriliyor (dört istek). İskelet yokken listeden bir
 * bölüme dokunan kişi boş ekran görüyordu — sınav başlarken en kötü an.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-4">
      <div className="flex items-center justify-between gap-3">
        <SkeletonLine variant="strong" width={120} />
        <SkeletonLine variant="caption" width={56} />
      </div>
      <SkeletonBar height={7} />
      <section className="card space-y-2 p-5">
        {[0, 1, 2, 3, 4].map((i) => (
          <SkeletonLine key={i} variant="body" width={`${96 - i * 7}%`} />
        ))}
      </section>
      <section className="space-y-3">
        <SkeletonLine variant="strong" width="60%" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-12 w-full rounded-tile" style={{ background: "var(--surface-2)" }} />
        ))}
      </section>
    </LoadingRegion>
  );
}
