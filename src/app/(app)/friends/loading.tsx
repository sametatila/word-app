import { LoadingRegion } from "@/components/loading-region";
import { PageSkeleton } from "@/components/skeleton";

/** Arkadaşlar gelene kadar iskelet — mobil `FriendsScreen` ile aynı davranış. */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <PageSkeleton rows={4} />
    </LoadingRegion>
  );
}
