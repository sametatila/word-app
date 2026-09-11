import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine } from "@/components/skeleton";

/**
 * Rol yapma sınavı gelene kadar iskelet — sahne kapağı: başlık, amaç kartı
 * ve başlat düğmesi. Ders sayfasının (`lessons/[id]/loading`) kardeşi;
 * sayfa aynı çözücüden geçiyor ve beş istek yapıyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-4 pt-6">
      <div className="flex flex-col items-center gap-3">
        <SkeletonLine variant="h2" width={200} />
        <SkeletonLine variant="caption" width={150} />
      </div>
      <section className="card space-y-2 p-5">
        {[0, 1, 2].map((i) => (
          <SkeletonLine key={i} variant="body" width={`${90 - i * 12}%`} />
        ))}
      </section>
      <div className="h-12 w-full rounded-card" style={{ background: "var(--surface-2)" }} />
    </LoadingRegion>
  );
}
