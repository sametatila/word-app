import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine } from "@/components/skeleton";

/**
 * Yürüyüş modu gelene kadar iskelet. Sayfa artık bugünkü tur hakkını
 * sunucuda okuyor (`walkQuota`); oynatıcının kendi ilk karesi de tek satırlık
 * "hazırlanıyor" notu, iskelet onun yerini tutuyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center space-y-3">
      <SkeletonLine variant="h2" width={180} />
      <SkeletonLine variant="caption" width={240} />
    </LoadingRegion>
  );
}
