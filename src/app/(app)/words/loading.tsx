import { RowSkeleton } from "@/components/skeleton";

/** Kelime listesi iskeleti — başlık, ilerleme şeridi, arama, çipler, satırlar. */
export default function Loading() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-3xl space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full surface-2" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="h-6 w-44 animate-pulse rounded-lg surface-2" />
          <div className="h-3.5 w-60 animate-pulse rounded-lg surface-2" />
        </div>
      </div>
      <div className="h-16 w-full animate-pulse rounded-2xl surface-2" />
      <div className="h-12 w-full animate-pulse rounded-2xl surface-2" />
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-8 w-14 animate-pulse rounded-full surface-2" />
        ))}
      </div>
      <RowSkeleton rows={6} height={72} />
    </div>
  );
}
