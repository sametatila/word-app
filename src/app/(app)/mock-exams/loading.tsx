import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonTile } from "@/components/skeleton";

/**
 * Deneme sınavları gelene kadar iskelet — sayfanın kendi sırasıyla: geri +
 * başlık + İstatistik düğmesi, seviye/kapsam kartı, seviye çipleri, giriş
 * metni, kâğıt kartları (üst satır, tema, süre, dört bölüm satırı).
 *
 * Eskiden `PageSkeleton` (başlık + beş düz blok) çiziyordu: seviye kartı,
 * çipler ve bölüm satırları hiç yoktu, veri gelince her şey yer değiştiriyordu.
 * Çip ve satır yerleri gerçek sınıflarla ve görünmez metinle çiziliyor —
 * yükseklik tahmin değil, sınıfın kendisi. Mobil `MockExamsScreen` aynı sırada.
 */
export default function Loading() {
  const pulse = { background: "var(--surface-2)", borderColor: "transparent" };
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-3">
      <div aria-hidden className="mb-4 flex items-center gap-3">
        <SkeletonTile size={44} />
        <div className="min-w-0 flex-1">
          <SkeletonLine variant="h2" width="55%" />
        </div>
        {/* İstatistik düğmesi: `btn btn-ghost h-11` — yarıçapı düğmeninki (panel). */}
        <div className="h-11 w-28 shrink-0 animate-pulse rounded-panel" style={{ background: "var(--surface-2)" }} />
      </div>
      <section aria-hidden className="card flex items-center justify-between gap-4 p-4">
        <span>
          <SkeletonLine variant="micro" width={56} />
          <SkeletonLine variant="h1" width={44} />
        </span>
        <span className="flex flex-col items-end">
          <SkeletonLine variant="micro" width={96} />
          <SkeletonLine variant="h1" width={56} />
        </span>
      </section>
      <div aria-hidden className="flex flex-wrap gap-2">
        {["A1", "A2", "B1", "B2", "C1"].map((l) => (
          <span key={l} className="chip animate-pulse px-3 py-1.5 text-strong" style={pulse}>
            <span className="invisible">{l}</span>
          </span>
        ))}
      </div>
      <div aria-hidden>
        <SkeletonLine variant="body" width="96%" />
        <SkeletonLine variant="body" width="64%" />
      </div>
      {[0, 1].map((p) => (
        <section key={p} aria-hidden className="card p-4">
          <SkeletonLine variant="micro" width={72} />
          <SkeletonLine variant="h3" width="48%" className="mt-0.5" />
          <SkeletonLine variant="body" width="62%" />
          <div className="mt-3 space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-panel p-3 text-body" style={pulse}>
                <span className="invisible">.</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </LoadingRegion>
  );
}
