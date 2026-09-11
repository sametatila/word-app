import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine } from "@/components/skeleton";

/**
 * Huni gelene kadar iskelet — dört ölçü kutusu ve iki tablo bloğu.
 * `computeFunnel()` bütün olay tablosunu tarıyor, yani bu sayfanın bekleme
 * süresi en uzun olanı; iskelet yokken ekran o süre boyunca boş kalıyordu.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-6 pb-10">
      <SkeletonLine variant="h2" width={140} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[68px] rounded-card" style={{ background: "var(--surface-2)" }} />
        ))}
      </div>
      {[0, 1].map((s) => (
        <section key={s} className="card space-y-2 p-4">
          <SkeletonLine variant="strong" width={150} />
          {[0, 1, 2, 3].map((i) => (
            <SkeletonLine key={i} variant="body" width={`${92 - i * 8}%`} />
          ))}
        </section>
      ))}
    </LoadingRegion>
  );
}
