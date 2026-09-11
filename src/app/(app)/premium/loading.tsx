import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine } from "@/components/skeleton";

/**
 * Premium sayfası gelene kadar iskelet — kapak, iki paket kartı ve düğme.
 * Sayfa beş okumayı birden yapıyor (yapılandırma, metin, durum, davet,
 * kavanoz); Android `PaywallScreen` aynı yerde iskelet çiziyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-2xl space-y-4">
      <div className="flex flex-col items-center gap-3 pt-4">
        <SkeletonLine variant="h1" width={240} />
        <SkeletonLine variant="caption" width={200} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className="h-[120px] rounded-card" style={{ background: "var(--surface-2)" }} />
        ))}
      </div>
      <div className="h-12 w-full rounded-card" style={{ background: "var(--surface-2)" }} />
      <section className="card space-y-2 p-4">
        {[0, 1, 2].map((i) => (
          <SkeletonLine key={i} variant="body" width={`${90 - i * 11}%`} />
        ))}
      </section>
    </LoadingRegion>
  );
}
