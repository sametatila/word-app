import { PageSkeleton } from "@/components/skeleton";

/** Sıralama gelene kadar iskelet — mobil `LeaderboardScreen` ile aynı davranış. */
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <PageSkeleton rows={6} />
    </div>
  );
}
