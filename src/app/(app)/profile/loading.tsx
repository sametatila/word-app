import { RowSkeleton } from "@/components/skeleton";

/**
 * Profil iskeleti — ekranın GERÇEK şeklinde.
 *
 * Genel bir "beş kutu" iskeleti vardı ve profil artık kimlik + beş satırlık
 * menü. İskelet gelecek içeriğin şeklini çizmezse boşluğu doldurmuş olmuyor,
 * yalnızca yerine başka bir boşluk koyuyor: içerik gelince düzen yine
 * zıplıyor.
 */
export default function Loading() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-3xl space-y-5">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full surface-2" />
        <div className="h-13 w-13 shrink-0 animate-pulse rounded-full surface-2" style={{ height: 52, width: 52 }} />
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="h-5 w-40 animate-pulse rounded-lg surface-2" />
          <div className="h-4 w-56 animate-pulse rounded-lg surface-2" />
        </div>
      </div>
      <RowSkeleton rows={5} height={62} />
    </div>
  );
}
