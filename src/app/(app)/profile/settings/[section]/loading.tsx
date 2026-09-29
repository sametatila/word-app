import { LoadingRegion } from "@/components/loading-region";
import { SettingsSkeleton } from "../skeleton";

/** Tek ayar grubu gelene kadar o grubun iskeleti (grup adresten, bkz. `../skeleton.tsx`). */
export default function Loading() {
  return (
    <LoadingRegion>
      <SettingsSkeleton />
    </LoadingRegion>
  );
}
