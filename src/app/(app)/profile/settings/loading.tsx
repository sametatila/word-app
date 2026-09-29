import { LoadingRegion } from "@/components/loading-region";
import { SettingsFrame } from "./frame";
import { SettingsBackSkeleton, SettingsFormSkeleton, SettingsNavSkeleton } from "./skeleton";

/**
 * Ayarlar gelene kadar iskelet — sayfanın kendi çerçevesiyle: telefonda başlık
 * + grup listesi, masaüstünde solda liste ve sağda Öğrenme grubu (bkz.
 * `page.tsx`, parçaların gerekçesi `skeleton.tsx`te).
 */
export default function Loading() {
  return (
    <LoadingRegion>
      <SettingsFrame nav={<SettingsNavSkeleton />}>
        <div className="md:hidden">
          <SettingsBackSkeleton />
          <SettingsNavSkeleton values />
        </div>
        <div className="hidden md:block">
          <SettingsFormSkeleton />
        </div>
      </SettingsFrame>
    </LoadingRegion>
  );
}
