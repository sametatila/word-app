import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonTile } from "@/components/skeleton";

/**
 * Avatar düzenleyicisinin iskeleti — başlık, 140 px'lik maskot ve üç seçenek
 * şeridi (şapka, gözlük, bıyık).
 *
 * Sayfa kazanılmış rozetleri sunucuda okuyor. Bu dosya yokken üstteki profil
 * iskeleti çiziliyordu: kimlik + beş satırlık menü, yani gelecek ekranla
 * ilgisi olmayan bir şekil ve içerik gelince düzen baştan zıplıyordu.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-2xl">
      <div className="mb-4 flex items-center gap-3">
        <SkeletonTile size={44} />
        <SkeletonLine variant="h2" width={140} />
      </div>
      <div className="my-5 flex justify-center">
        <div className="h-[140px] w-[140px] animate-pulse rounded-full surface-2" />
      </div>
      {[0, 1, 2].map((g) => (
        <div key={g} className="mt-4">
          <SkeletonLine variant="caption" width={72} className="mb-2 ml-1" />
          {/* Seçenek: 54 px önizleme + 4 px dolgu + 2 px kenarlık, iki yanda. */}
          <div className="flex gap-2 overflow-hidden pb-1">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-[62px] w-[62px] shrink-0 animate-pulse rounded-panel surface-2" />
            ))}
          </div>
        </div>
      ))}
      <div className="mt-7 h-14 w-full animate-pulse rounded-tile surface-2" />
    </LoadingRegion>
  );
}
