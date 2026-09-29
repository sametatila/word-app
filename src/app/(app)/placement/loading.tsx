import { LoadingRegion } from "@/components/loading-region";
import { CoverSkeleton } from "@/components/flow-skeleton";

/**
 * Yerleştirme sınavı gelene kadar iskelet — `PlacementTest`in kapağı
 * (`CoverBody`): ikon karosu, başlık, tanıtım, beş kural satırı, Başla /
 * Sonra. Eskiden ortalanmış başlık + tek kart çiziyordu; kapak sola yaslı
 * ve kurallı. Android `PlacementScreen` aynı kapağı `CoverSkeleton`la çiziyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <CoverSkeleton kind="placement" />
    </LoadingRegion>
  );
}
