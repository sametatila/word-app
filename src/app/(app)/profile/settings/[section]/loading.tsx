import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine } from "@/components/skeleton";

/**
 * Ayarlar gelene kadar iskelet — form alanlarının yeri.
 *
 * Sayfa profili ve giriş yöntemlerini sunucuda okuyor; iskelet yokken
 * "Ayarlar"a dokunan kişi boş bir ekrana bakıyordu. Mobil `SettingsScreen`
 * satırları hemen çiziyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-4">
      <SkeletonLine variant="h2" width={140} />
      {[0, 1, 2].map((s) => (
        <section key={s} className="card space-y-3 p-4">
          <SkeletonLine variant="micro" width={96} />
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-1.5">
              <SkeletonLine variant="caption" width={110} />
              <div className="h-11 w-full rounded-tile" style={{ background: "var(--surface-2)" }} />
            </div>
          ))}
        </section>
      ))}
    </LoadingRegion>
  );
}
