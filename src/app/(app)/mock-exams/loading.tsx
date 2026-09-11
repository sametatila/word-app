import { LoadingRegion } from "@/components/loading-region";
import { PageSkeleton } from "@/components/skeleton";

/** Deneme sınavları gelene kadar iskelet — mobil `MockExamsScreen` ile aynı. */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <PageSkeleton rows={5} />
    </LoadingRegion>
  );
}
