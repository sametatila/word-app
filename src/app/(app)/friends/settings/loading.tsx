import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine } from "@/components/skeleton";

/**
 * Sosyal ayarlar gelene kadar iskelet — geri satırı, başlık ve üç bölüm.
 * Android `SocialSettingsScreen` de iskelet çiziyor (`SkeletonCard`), webde
 * karşılığı yoktu.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-4">
      <SkeletonLine variant="h2" width={180} />
      {[0, 1, 2].map((s) => (
        <section key={s} className="card space-y-3 p-4">
          <SkeletonLine variant="strong" width={130} />
          {[0, 1].map((i) => (
            <div key={i} className="h-12 w-full rounded-tile" style={{ background: "var(--surface-2)" }} />
          ))}
        </section>
      ))}
    </LoadingRegion>
  );
}
