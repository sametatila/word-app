import { LoadingRegion } from "@/components/loading-region";
import { SkeletonBar, SkeletonLine } from "@/components/skeleton";

/**
 * Huni gelene kadar iskelet — sayfanın sırasıyla: başlık + açıklama, iki üç
 * sütunlu ölçü bölümü (Genel, Retention), paywall hunisinin üç satırı ve en
 * çok olay çubukları. `computeFunnel()` bütün olay tablosunu tarıyor, yani bu
 * sayfanın bekleme süresi en uzun olanı.
 *
 * Eskisi dört sütunlu tek ölçü satırı ve iki metin kartıydı; sayfa üçer
 * sütunlu iki bölüme ve çubuk listesine geçmişti.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-6 pb-10">
      <div aria-hidden>
        <SkeletonLine variant="h1" width={220} />
        <SkeletonLine variant="body" width="70%" />
      </div>

      {[0, 1].map((s) => (
        <section key={s} aria-hidden>
          <SkeletonLine variant="micro" width={90} className="mb-2" />
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="card px-4 py-3">
                <SkeletonLine variant="h1" width="50%" />
                <SkeletonLine variant="micro" width="80%" />
                <SkeletonLine variant="micro" width="60%" className="mt-0.5" />
              </div>
            ))}
          </div>
        </section>
      ))}

      <section aria-hidden>
        <SkeletonLine variant="micro" width={110} className="mb-2" />
        <div className="card divide-y divide-[color:var(--border)]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2.5">
              <SkeletonLine variant="strong" width={150} />
              <SkeletonLine variant="body" width={130} />
            </div>
          ))}
        </div>
      </section>

      <section aria-hidden>
        <SkeletonLine variant="micro" width={90} className="mb-2" />
        <div className="space-y-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <SkeletonLine variant="caption" width={160} className="shrink-0" />
              <SkeletonBar height={16} className="flex-1" />
              <SkeletonLine variant="caption" width={48} className="shrink-0" />
            </div>
          ))}
        </div>
      </section>
    </LoadingRegion>
  );
}
