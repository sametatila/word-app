import { LoadingRegion } from "@/components/loading-region";
import { FriendsSkeleton } from "./skeleton";

/** Topluluk gelene kadar iskelet — parçalar ve gerekçesi `skeleton.tsx`te. */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <FriendsSkeleton />
    </LoadingRegion>
  );
}
