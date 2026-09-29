import { LoadingRegion } from "@/components/loading-region";
import { CardGrid } from "@/components/layout";
import { AppHeaderSkeleton, SkeletonLine, SkeletonTile, TextBox } from "@/components/skeleton";
import { QuestCardSkeleton } from "@/components/quest-card";

/**
 * Öğren iskeleti — `LearnHub`ın bölüm sırasıyla: başlık, günlük tur
 * kahramanı, günün görevleri, öne çıkan iki kama, "daha fazlası" satırları.
 *
 * Eskisi başlığı hiç çizmiyordu ve kahramanın altında dört karolu bir ızgara
 * vardı; gerçek ekranda görevler, iki kama ve üç satır var. Ölçüler gerçek
 * bileşenin sınıflarından ve tipografi ölçeğinden (göz kararı yükseklik yok).
 *
 * KIRILIMLAR GERÇEK KARTIN. Maskot `hidden sm:block`, iki kama her genişlikte
 * yan yana, satırlar aynı `CardGrid min={360}`. Metnin SATIR SAYISI da
 * genişliğe bağlı ve Türkçe metinle ölçüldü: kahraman cümlesi ve kama cümlesi
 * telefonda ve md'de (kenar çubuğu açılınca kap 464 px) iki satır, sm ve
 * lg'den sonra tek satır; ilk satırın alt yazısı yalnız telefonda iki satır.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <AppHeaderSkeleton titleWidth={180} />

      {/* Kahraman: dolu marka kartı. Tek nabızlı blok; içteki boş kutular
          yalnız yüksekliği gerçek düzenden türetmek için. */}
      <div aria-hidden className="mb-5 animate-pulse overflow-hidden rounded-card surface-2">
        <div className="flex items-end gap-3 p-5">
          <div className="min-w-0 flex-1">
            <div className="mb-2 h-11" />
            <TextBox variant="h1" />
            <TextBox variant="body" className="mt-1" />
            <TextBox variant="body" className="sm:hidden md:block lg:hidden" />
            {/* Başla hapı: py-2.5 + strong satırı. */}
            <TextBox variant="strong" className="mt-4 py-2.5" />
          </div>
          {/* Maskotun yeri (`MASCOT_CARD`, -mb-3): metin sütununu gerçekteki
              kadar daraltsın. */}
          <div className="-mb-3 hidden h-24 w-24 shrink-0 sm:block" />
        </div>
        {/* Hedef şeridi: micro satır + 6 px çizgi. */}
        <div className="px-5 pb-4">
          <TextBox variant="micro" className="mb-1.5" />
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
                <SkeletonLine variant="caption" width="50%" className="sm:hidden md:flex lg:hidden" />
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
              {i === 0 ? <SkeletonLine variant="caption" width="40%" className="sm:hidden" /> : null}
            </div>
            {/* Ok simgesinin yeri (20 px). */}
            <div className="w-5 shrink-0" />
          </div>
        ))}
      </CardGrid>
    </LoadingRegion>
  );
}

