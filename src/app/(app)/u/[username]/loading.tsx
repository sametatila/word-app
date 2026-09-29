import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonTile } from "@/components/skeleton";

/**
 * Herkese açık profil gelene kadar iskelet — `PublicProfile`in sırasıyla:
 * başlık (`PageBack`), kimlik kartı (64'lük avatar, ad, @kullanıcı · seviye,
 * künye satırı, eylem satırı) ve üç sütunlu altı istatistik karosu.
 *
 * Eskisi kimlik kartından sonra bir hap şeridi ve kişi satırları çiziyordu;
 * profilde ikisi de yok, istatistik ızgarası ise hiç çizilmiyordu.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <div aria-hidden className="mb-4 flex items-center gap-3">
        <SkeletonTile size={44} />
        <SkeletonLine variant="h2" width={120} />
      </div>
      <div aria-hidden className="mx-auto flex w-full max-w-3xl flex-col gap-3">
        <section className="card p-5">
          <div className="flex items-start gap-4">
            <SkeletonTile size={64} className="rounded-full" />
            <div className="min-w-0 flex-1">
              <SkeletonLine variant="h3" width={160} />
              <SkeletonLine variant="body" width={130} />
              <SkeletonLine variant="micro" width={150} className="mt-2" />
            </div>
          </div>
          {/* Eylem satırı: `UserAction` (`h-9`) ve sağda "Engelle ya da bildir". */}
          <div className="mt-4 flex items-center gap-2">
            <div className="h-9 w-28 animate-pulse rounded-tile" style={{ background: "var(--surface-2)" }} />
            <SkeletonLine variant="micro" width={96} className="ml-auto" />
          </div>
        </section>
        <section className="grid grid-cols-3 gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="card flex flex-col items-center px-3 py-2.5">
              <SkeletonLine variant="strong" width={36} />
              <SkeletonLine variant="micro" width="75%" />
            </div>
          ))}
        </section>
      </div>
    </LoadingRegion>
  );
}
