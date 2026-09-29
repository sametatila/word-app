import { LoadingRegion } from "@/components/loading-region";
import { SettingsSkeleton } from "../skeleton";

/** Abonelik paneli gelene kadar kendi iskeleti (bkz. `../skeleton.tsx`). */
export default function Loading() {
  return (
    <LoadingRegion>
      <SettingsSkeleton section="subscription" />
    </LoadingRegion>
  );
}
