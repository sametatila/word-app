import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonBar, SkeletonTile } from "@/components/skeleton";

/**
 * İlerleme iskeleti — sayfanın GERÇEK sırasıyla: başlık, seri kartı, dört
 * karo, iki menü satırı, kelime hakimiyeti şeridi, iki haftalık ritim ve
 * yetkinlik paneli (`ActivityProgress` + `ProgressPanel`).
 *
 * Eskisi yalnız ritim ve yetkinlik kartlarını çiziyordu; seri kartı, karolar
 * ve menü sonradan eklendi. İçerik gelince ritim kartı yarım ekran aşağı
 * atlıyordu.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-4">
      {/* `PageBack`: 44'lük geri düğmesi + `text-h2` başlık. */}
      <div className="mb-4 flex items-center gap-3">
        <SkeletonTile size={44} />
        <SkeletonLine variant="h2" width={140} />
      </div>

      <div className="space-y-4">
        {/* Seri kartı: 64'lük karo, `display` sayı, `strong` etiket, en uzun seri. */}
        <div className="card flex items-center gap-4 p-5">
          <SkeletonTile size={64} />
          <span className="min-w-0 flex-1">
            <SkeletonLine variant="display" width={72} />
            <SkeletonLine variant="strong" width={112} />
            <SkeletonLine variant="caption" width={140} />
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="card p-4">
              <SkeletonTile size={20} />
              <SkeletonLine variant="h2" width="55%" className="mt-1" />
              <SkeletonLine variant="caption" width="80%" />
            </div>
          ))}
        </div>

        {/* Yapabildiklerim + Yazılarım: `MenuRow` (38'lik karo, `py-3`). */}
        <div className="card px-4">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-3"
              style={i === 0 ? { borderBottom: "1px solid var(--hairline)" } : undefined}
            >
              <SkeletonTile size={38} />
              <SkeletonLine variant="strong" width="45%" />
            </div>
          ))}
        </div>

        <div className="card p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <SkeletonLine variant="strong" width={130} />
            <SkeletonLine variant="caption" width={72} />
          </div>
          <SkeletonBar height={8} />
        </div>

        {/* İki haftalık ritim: `h-11` şerit ve altında gün harfleri. */}
        <section className="card px-4 py-3.5">
          <div className="mb-2.5 flex items-baseline justify-between gap-3">
            <SkeletonLine variant="strong" width={120} />
            <SkeletonLine variant="caption" width={110} />
          </div>
          <div className="flex h-11 items-end gap-[3px]">
            {Array.from({ length: 14 }).map((_, i) => (
              <SkeletonBar key={i} height={10 + ((i * 7) % 30)} className="min-w-0 flex-1" />
            ))}
          </div>
          <div className="mt-1.5 flex gap-[3px]">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="min-w-0 flex-1 text-center text-micro leading-none">
                &nbsp;
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Yetkinlik paneli — `ProgressPanel`in kendi yükleme dalıyla aynı. */}
      <section className="card p-4">
        <div className="flex items-baseline justify-between gap-3">
          <SkeletonLine variant="strong" width={150} />
          <SkeletonLine variant="caption" width={88} />
        </div>
        <SkeletonLine variant="body" width="92%" className="mt-1.5" />
        <div className="mt-3 grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between gap-2">
                <SkeletonLine variant="micro" width={72} />
                <SkeletonLine variant="micro" width={34} />
              </div>
              <SkeletonBar height={6} className="mt-1" />
            </div>
          ))}
        </div>
      </section>
    </LoadingRegion>
  );
}
