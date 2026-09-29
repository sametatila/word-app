import { LoadingRegion } from "@/components/loading-region";
import { FriendsSkeleton } from "../friends/skeleton";

/**
 * Eski adres `/friends?tab=league`e yönleniyor (bkz. `page.tsx`): yönlenme
 * sürerken gidilen yerin iskeleti çiziliyor, genel "altı blok" değil — yoksa
 * ekran iki ayrı iskelet arasında zıplıyordu.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <FriendsSkeleton />
    </LoadingRegion>
  );
}
