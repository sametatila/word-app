import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine } from "@/components/skeleton";

/**
 * Yürüyüş modu gelene kadar iskelet. Sayfa sunucuda bugünkü tur hakkını
 * okuyor (`walkQuota`); ardından oynatıcının İLK KARESİ geliyor: dar sütunda
 * (`max-w-md`) tek bir kart, içinde "hazırlanıyor" satırı (`walk-player`
 * `Frame`). İskelet o kartı çiziyor.
 *
 * Eskisi ekranın ortasına kartsız iki satır koyuyordu; kart üstte açılınca
 * içerik ortadan tepeye zıplıyordu.
 */
export default function Loading() {
  return (
    <LoadingRegion className="flex min-h-0 flex-1 flex-col">
      <div aria-hidden className="mx-auto w-full max-w-md">
        <div className="card p-6">
          <SkeletonLine variant="body" width={180} />
        </div>
      </div>
    </LoadingRegion>
  );
}
