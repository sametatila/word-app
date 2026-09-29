import { LoadingRegion } from "@/components/loading-region";
import { AppHeaderSkeleton, SkeletonBar, SkeletonLine, SkeletonTile, textHeight } from "@/components/skeleton";

/**
 * Patika iskeleti — `ImmersionHub`ın sırasıyla: başlık (`AppHeader`),
 * ilerleme şeridi + "n/m ünite" satırı, öne çıkan ünite kartı, modül başlığı
 * ve iki sütunlu ünite ızgarası.
 *
 * Eskisi `px-4 pt-11` ile sayfanın kendi kabından farklı bir kapta, başlık
 * yerine kısa bir çubuk ve şeridin altındaki sayaç satırı olmadan çiziliyordu;
 * öne çıkan kart da içsiz bir bloktu. Ölçüler gerçek sınıflardan.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <AppHeaderSkeleton titleWidth={120} />

      <SkeletonBar height={10} />
      <SkeletonLine variant="caption" width={140} className="mb-4 mt-1.5" />

      {/* Öne çıkan ünite: 56 px numara karosu + üç satır, adım sayacı ve
          şeridi, sıradaki adım satırı, tam genişlik düğme. */}
      <section aria-hidden className="card p-4">
        <div className="flex items-center gap-3">
          <SkeletonTile size={56} />
          <div className="min-w-0 flex-1">
            <SkeletonLine variant="micro" width={110} />
            <SkeletonLine variant="h2" width="70%" />
            <SkeletonLine variant="caption" width="85%" />
          </div>
        </div>
        <SkeletonLine variant="caption" width={90} className="mt-3" />
        <SkeletonBar height={10} className="mt-1.5" />
        <div className="mt-3 flex items-center gap-3 rounded-panel p-3" style={{ background: "var(--surface-2)" }}>
          {/* Satırın zemini zaten surface-2; karo ve metin bir ton koyu
              görünsün diye kenarlık rengiyle. */}
          <div className="h-11 w-11 shrink-0 animate-pulse rounded-tile" style={{ background: "var(--border)" }} />
          <div className="min-w-0 flex-1">
            <div style={{ height: textHeight("micro") }} />
            <div style={{ height: textHeight("strong") }} />
          </div>
        </div>
        <div className="mt-3 animate-pulse rounded-panel py-4 surface-2">
          <div style={{ height: textHeight("h3") }} />
        </div>
      </section>

      <section aria-hidden className="mt-5">
        <SkeletonLine variant="micro" width={70} className="ml-1" />
        <SkeletonLine variant="h3" width={160} className="mb-2 ml-1" />
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="card flex min-h-[7.25rem] flex-col items-start p-4">
              <SkeletonTile size={44} className="rounded-full" />
              <SkeletonLine variant="strong" width="80%" className="mt-2" />
              <div className="mt-auto w-full pt-2">
                <SkeletonBar height={6} />
                <SkeletonLine variant="micro" width="45%" className="mt-1" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </LoadingRegion>
  );
}

