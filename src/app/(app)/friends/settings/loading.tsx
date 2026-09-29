import { LoadingRegion } from "@/components/loading-region";
import { SettingsSkeleton } from "../../profile/settings/skeleton";

/**
 * Eski adres Ayarlar › Gizlilik'e yönleniyor (bkz. `page.tsx`): yönlenme
 * sürerken gidilen yerin, Gizlilik'in iskeleti çiziliyor.
 */
export default function Loading() {
  return (
    <LoadingRegion>
      <SettingsSkeleton section="privacy" />
    </LoadingRegion>
  );
}
