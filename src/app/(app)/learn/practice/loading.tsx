import { LoadingRegion } from "@/components/loading-region";
import { CardGrid } from "@/components/layout";
import { SkeletonLine, SkeletonTile, TextBox } from "@/components/skeleton";

/**
 * Pratik iskeleti — sayfanın sırasıyla: geri satırı (`PageBack`), karışık tur
 * kahramanı, "tek oyun" başlığı ve oyun karoları, en altta not.
 *
 * Eskisi geri düğmesini çizmiyordu, karoları sabit iki/üç sütunda ve gerçek
 * karodan (min 8.25rem) kısa çiziyordu; sayfa ise `CardGrid min={150}` ile
 * genişliğe göre sütun açıyor. İskelet aynı ızgarayı kullanıyor. Karo sayısı
 * kursa göre değişiyor (Almanca 11); ilk ekranı dolduran altısı çiziliyor:
 * iki sütunda (telefon, md) üç tam satır, üç sütunda (sm, lg+) iki tam satır.
 *
 * Karonun alt yazısı dar karoda iki satır (telefon 133 px, sm'de üç sütun
 * 162 px), md'den sonra tek satır; alttaki not lg'ye kadar üç satır.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-5">
      <div aria-hidden className="mb-4 flex items-center gap-3">
        <SkeletonTile size={44} />
        <div className="min-w-0 flex-1">
          <SkeletonLine variant="h2" width={120} />
          <SkeletonLine variant="caption" width={220} />
        </div>
      </div>

      {/* Karışık tur: p-5, 48 px karo + h3/caption iki satır. */}
      <div aria-hidden className="flex animate-pulse items-center gap-3 rounded-card p-5 surface-2">
        <div className="h-12 w-12 shrink-0" />
        <div>
          <TextBox variant="h3" />
          <TextBox variant="caption" />
        </div>
      </div>

      <section aria-hidden className="space-y-3">
        <SkeletonLine variant="micro" width={80} />
        <CardGrid min={150}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card flex min-h-[8.25rem] flex-col justify-between gap-3 p-4">
              <SkeletonTile size={44} />
              <div>
                <SkeletonLine variant="h3" width="65%" />
                <SkeletonLine variant="caption" width="90%" />
                <SkeletonLine variant="caption" width="45%" className="md:hidden" />
              </div>
            </div>
          ))}
        </CardGrid>
      </section>

      <div aria-hidden className="px-1">
        <SkeletonLine variant="caption" width="92%" />
        <SkeletonLine variant="caption" width="96%" className="lg:hidden" />
        <SkeletonLine variant="caption" width="60%" />
      </div>
    </LoadingRegion>
  );
}
