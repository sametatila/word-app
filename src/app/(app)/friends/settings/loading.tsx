import { LoadingRegion } from "@/components/loading-region";
import { SettingsFrame } from "../../profile/settings/frame";
import { SettingsFormSkeleton, SettingsNavSkeleton } from "../../profile/settings/skeleton";

/**
 * Eski adres Ayarlar › Gizlilik'e yönleniyor (bkz. `page.tsx`): yönlenme
 * sürerken gidilen yerin iskeleti çiziliyor. Eskisi kaldırılan sosyal ayarlar
 * sayfasının üç kartını çiziyordu.
 */
export default function Loading() {
  return (
    <LoadingRegion>
      <SettingsFrame nav={<SettingsNavSkeleton />}>
        <SettingsFormSkeleton />
      </SettingsFrame>
    </LoadingRegion>
  );
}
