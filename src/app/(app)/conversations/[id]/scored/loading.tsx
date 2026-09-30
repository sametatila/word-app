import { LoadingRegion } from "@/components/loading-region";
import { CoverSkeleton } from "@/components/flow-skeleton";

/**
 * Puanlı kısım gelene kadar iskelet — `ConversationScored`in kapağı, aynı
 * sırayla: koç cümlesi, ikon karosu, konuşmanın adı + sınavın adı, sahne,
 * üç kural, kalıplar kartı, Başla / Kapat. Eskiden ortalanmış başlık + tek
 * kart çiziyordu. Android `ConversationScoredScreen` aynı kapağı çiziyor.
 */
export default function Loading() {
  return (
    <LoadingRegion>
      <CoverSkeleton kind="scored" />
    </LoadingRegion>
  );
}
