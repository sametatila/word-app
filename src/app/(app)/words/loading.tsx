import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonPill, SkeletonTile } from "@/components/skeleton";

/**
 * Kelime listesi iskeleti — `WordList`in sırası ve kapları: `PageBack`
 * başlığı, katlı ilerleme kartı, arama kutusu, İKİ süzgeç şeridi (seviye,
 * durum), kelime kartları.
 *
 * Eski iskelet göz kararı bloklardı (h-16 "şerit", tek sıra altı çip, 72'lik
 * satırlar): süzgeçler iki şeride ayrılınca ve ilerleme katlı karta dönünce
 * hiçbiri gerçeğiyle örtüşmüyordu. Artık yükseklikler kapların kendi
 * dolgusundan ve tipografiden çıkıyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-4">
      {/* PageBack: 44'lük geri karosu + `text-h2` başlık + sayaç alt satırı. */}
      <div className="mb-4 flex items-center gap-3">
        <SkeletonTile size={44} />
        <div className="min-w-0 flex-1">
          <SkeletonLine variant="h2" width={150} />
          <SkeletonLine variant="caption" width={110} />
        </div>
      </div>

      {/* Katlı ilerleme kartı: başlık + özet satırı + ok. */}
      <div className="card flex items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <SkeletonLine variant="strong" width={90} />
          <SkeletonLine variant="caption" width="70%" />
        </div>
        <SkeletonTile size={18} />
      </div>

      <div className="space-y-3">
        {/* Arama kutusu: gerçek `.input` kabı, başta büyüteç. */}
        <div className="input flex items-center gap-2 pl-3">
          <SkeletonTile size={20} className="rounded-full" />
          <SkeletonLine variant="body" width="55%" />
        </div>
        {/* Seviye şeridi (Seviye + beş seviye) ve durum şeridi (dört durum);
            `chip-filter px-3.5 py-2 text-caption` = 36 px hap. */}
        <div className="flex flex-wrap items-center gap-2">
          {[72, 44, 44, 44, 44, 44].map((w, i) => (
            <SkeletonPill key={i} width={w} height={36} />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {[56, 60, 90, 88].map((w, i) => (
            <SkeletonPill key={i} width={w} height={36} />
          ))}
        </div>
      </div>

      {/* Kelime kartları: kelime + anlam, sağda durum ve seviye. */}
      <ul className="space-y-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <li key={i} className="card flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <SkeletonLine variant="strong" width={`${44 - (i % 3) * 6}%`} />
              <SkeletonLine variant="body" width={`${62 - (i % 2) * 14}%`} />
            </div>
            <SkeletonLine variant="caption" width={52} />
            <SkeletonLine variant="caption" width={20} />
          </li>
        ))}
      </ul>
    </LoadingRegion>
  );
}
