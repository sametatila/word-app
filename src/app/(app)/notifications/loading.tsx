import { LoadingRegion } from "@/components/loading-region";
import { SettingsPageSkeleton } from "../profile/settings/skeleton";

/** Eski adres Ayarlar › Hatırlatmalar'a yönleniyor: yönlenme sürerken onun iskeleti. */
export default function Loading() {
  return (
    <LoadingRegion>
      <SettingsPageSkeleton section="reminders" />
    </LoadingRegion>
  );
}
