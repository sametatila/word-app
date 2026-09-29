import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonPill, SkeletonTile } from "@/components/skeleton";

/**
 * Beceri alıştırması gelene kadar iskelet — `PlayerShell` kabuğu ve en sık
 * açılan oynatıcının (okuma) gövdesi: kapat karosu + seviye/tür + başlık,
 * yönerge, metin kartı, sorular.
 *
 * Bu sayfa sunucuda ON İSTEK yapıyor (egzersiz, profil, yerelleştirme,
 * ilerleme, sıradaki egzersiz); iskelet olmadan dokunan kişi boş ekran
 * görüyordu. Eski iskelet kabuğun ölçüsünü tutmuyordu: kap `max-w-3xl`
 * (gerçeği 2xl), başlıkta metin "geri" satırı (gerçeği 44'lük kapat karosu
 * yanında seviye hapı + başlık), soru başlığı ve şık kapları yoktu. Mobil
 * `ItemScreen` aynı sırayı çiziyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-2xl">
      {/* PlayerShell başlığı: `RoundExit` (h-11) + seviye hapı, tür satırı, başlık. */}
      <div className="mb-5 flex items-center gap-3">
        <SkeletonTile size={44} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <SkeletonPill width={28} height={22} />
            <SkeletonLine variant="caption" width={150} />
          </div>
          <SkeletonLine variant="h3" width="55%" />
        </div>
      </div>

      {/* Yönerge (`muted px-1 text-body`). */}
      <div className="px-1">
        <SkeletonLine variant="body" width="92%" />
        <SkeletonLine variant="body" width="58%" />
      </div>

      {/* Okuma parçası: `card mt-3 p-5`. */}
      <article className="card mt-3 p-5">
        {[94, 88, 91, 63].map((w, i) => (
          <SkeletonLine key={i} variant="body" width={`${w}%`} />
        ))}
      </article>

      {/* QuestionList: başlık + ilk soru kartı, şıklar `option` kabında. */}
      <div className="mt-5 space-y-4">
        <div className="px-1">
          <SkeletonLine variant="strong" width={90} />
        </div>
        <section className="card p-4">
          <SkeletonLine variant="strong" width="72%" />
          <div className="mt-3 grid gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="option px-3.5 py-2.5">
                <SkeletonLine variant="strong" width={`${56 - i * 10}%`} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </LoadingRegion>
  );
}
