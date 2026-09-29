import { LoadingRegion } from "@/components/loading-region";
import { SettingsSkeleton } from "./skeleton";

/**
 * Ayarlar gelene kadar iskelet. `/profile`dan bir gruba doğrudan gidilirken
 * de bu dosya çiziliyor (ilk değişen parça `settings`); iskelet adresteki
 * grubu okuyor, gerekçesi `skeleton.tsx`te.
 */
export default function Loading() {
  return (
    <LoadingRegion>
      <SettingsSkeleton />
    </LoadingRegion>
  );
}
