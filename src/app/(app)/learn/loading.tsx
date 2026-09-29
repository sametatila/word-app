import { LoadingRegion } from "@/components/loading-region";
import { CardGrid } from "@/components/layout";
import { AppHeaderSkeleton, SkeletonLine, SkeletonTile, textHeight } from "@/components/skeleton";
import { QuestCardSkeleton } from "@/components/quest-card";

/**
 * Öğren iskeleti — `LearnHub`ın bölüm sırasıyla: başlık, günlük tur
 * kahramanı, günün görevleri, öne çıkan iki kama, "daha fazlası" satırları.
 *
 * Eskisi başlığı hiç çizmiyordu ve kahramanın altında dört karolu bir ızgara
 * vardı; gerçek ekranda görevler, iki kama ve üç satır var. Ölçüler gerçek
 * bileşenin sınıflarından ve tipografi ölçeğinden (göz kararı yükseklik yok).
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <AppHeaderSkeleton titleWidth={180} />

      {/* Kahraman: dolu marka kartı. Tek nabızlı blok; içteki boş kutular
          yalnız yüksekliği gerçek düzenden türetmek için. */}
      <div aria-hidden className="mb-5 animate-pulse overflow-hidden rounded-card surface-2">
        <div className="p-5">
          <div className="mb-2 h-11" />
          <div style={{ height: textHeight("h1") }} />
          <div className="mt-1" style={{ height: textHeight("body") }} />
          {/* Başla hapı: py-2.5 + strong satırı. */}
          <div className="mt-4" style={{ height: 20 + textHeight("strong") }} />
        </div>
        {/* Hedef şeridi: micro satır + 6 px çizgi. */}
        <div className="px-5 pb-4">
          <div className="mb-1.5" style={{ height: textHeight("micro") }} />
          <div className="h-1.5" />
        </div>
      </div>

      <div className="mb-5">
        <QuestCardSkeleton />
      </div>

      <section aria-hidden className="mb-5 mt-2">
        <SkeletonLine variant="h3" width={110} className="mb-2 ml-1" />
        <div className="grid grid-cols-2 gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="card flex min-h-[8.25rem] flex-col justify-between gap-3 p-4">
              <SkeletonTile size={44} />
              <div>
                <SkeletonLine variant="h3" width="60%" />
                <SkeletonLine variant="caption" width="85%" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <SkeletonLine variant="h3" width={120} className="mb-2 ml-1" />
      <CardGrid min={360} className="mb-5">
        {[0, 1, 2].map((i) => (
          <div key={i} aria-hidden className="card flex items-center gap-3 p-4">
            <SkeletonTile size={48} />
            <div className="min-w-0 flex-1">
              <SkeletonLine variant="h3" width={`${56 - i * 8}%`} />
              <SkeletonLine variant="caption" width="80%" />
            </div>
          </div>
        ))}
      </CardGrid>
    </LoadingRegion>
  );
}

