import { LoadingRegion } from "@/components/loading-region";
import { SettingsFrame } from "../frame";
import { SettingsFormSkeleton, SettingsNavSkeleton } from "../skeleton";

/**
 * Tek ayar grubu gelene kadar iskelet — sayfanın kendi çerçevesiyle:
 * masaüstünde solda liste, sağda (telefonda yalnız) grubun başlığı ve kartı.
 * Grup iskeleti Öğrenme'nin şeklinde; parçaların gerekçesi `../skeleton.tsx`.
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
