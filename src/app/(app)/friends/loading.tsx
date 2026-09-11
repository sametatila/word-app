import { PageSkeleton } from "@/components/skeleton";

/** Arkadaşlar gelene kadar iskelet — mobil `FriendsScreen` ile aynı davranış. */
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <PageSkeleton rows={4} />
    </div>
  );
}
