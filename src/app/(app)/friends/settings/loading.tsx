import { LoadingRegion } from "@/components/loading-region";
import { SettingsPageSkeleton } from "../../profile/settings/skeleton";

/**
 * Eski adres Ayarlar › Gizlilik'e yönleniyor (bkz. `page.tsx`): yönlenme
 * sürerken gidilen yerin, Gizlilik'in iskeleti — ayarlar düzeniyle birlikte
 * (başlık + sol menü; bu adres düzenin dışında) — çiziliyor.
 */
export default function Loading() {
  return (
    <LoadingRegion>
      <SettingsPageSkeleton section="privacy" />
    </LoadingRegion>
  );
}
