import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonPill, SkeletonTile } from "@/components/skeleton";

/**
 * Premium sayfası gelene kadar iskelet — `PremiumPaywall`in sırası: geri
 * karosu, ortalı kapak (taç karosu, başlık, slogan, durum), iki paket kartı +
 * deneme notu, mağaza yönlendirmesi, kapsam kartı, ince yazı.
 *
 * Sayfa beş okumayı birden yapıyor (yapılandırma, metin, durum, davet,
 * kavanoz). Eski iskelette taç karosu ve kapsam kartı yoktu, paket kartları
 * göz kararı 120 px'lik bloktu ve düğme şeridi mağaza kutusunun yerinde
 * değildi. Kaplar gerçeğinkiyle aynı; Android `PaywallScreen` aynı yerde
 * iskelet çiziyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl pb-12">
      <SkeletonTile size={44} />
      <div className="mt-2 flex flex-col items-center">
        <SkeletonTile size={80} className="rounded-card" />
        <SkeletonLine variant="display" width={220} className="mt-4" />
        <SkeletonLine variant="body" width={280} className="mt-1 max-w-full" />
        <SkeletonLine variant="body" width={160} className="mt-1" />
      </div>

      {/* Paket kartları: `card card-flat p-4 text-center`, yıllıkta indirim hapı. */}
      <section className="mt-6">
        <div className="grid grid-cols-2 gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="card card-flat flex flex-col items-center p-4">
              <SkeletonLine variant="caption" width={64} />
              <SkeletonLine variant="h2" width={96} className="mt-1" />
              {i === 1 ? <SkeletonPill width={44} height={22} className="mt-2" /> : null}
            </div>
          ))}
        </div>
        <SkeletonLine variant="caption" width={180} className="mx-auto mt-3" />
      </section>

      {/* Mağaza yönlendirmesi (`PremiumStoreCta`): başlık, iki satır, düğme, notlar. */}
      <section className="card card-flat mt-4 flex flex-col items-center rounded-panel px-4 py-4">
        <SkeletonLine variant="strong" width={160} />
        <SkeletonLine variant="body" width="70%" className="mt-1" />
        <SkeletonLine variant="caption" width="55%" className="mt-1" />
        <SkeletonPill width={180} height={44} className="mt-3" />
        <SkeletonLine variant="caption" width="60%" className="mt-3" />
        <SkeletonLine variant="caption" width="50%" className="mt-1" />
      </section>

      {/* Kapsam kartı: premium satırları (onaylı), ayraç, ücretsiz satırları. */}
      <section className="mt-6">
        <SkeletonLine variant="micro" width={120} className="mb-2" />
        <div className="card p-4">
          {[82, 70, 76, 64].map((w, i) => (
            <div key={i} className="flex items-start gap-3 py-1.5">
              <SkeletonTile size={24} className="rounded-full" />
              <SkeletonLine variant="body" width={`${w}%`} />
            </div>
          ))}
          <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
            <SkeletonLine variant="caption" width={110} className="mb-1.5" />
            {[60, 52].map((w, i) => (
              <div key={i} className="py-1.5 pl-[18px]">
                <SkeletonLine variant="body" width={`${w}%`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-4 space-y-1">
        <SkeletonLine variant="caption" width="92%" />
        <SkeletonLine variant="caption" width="64%" />
      </div>
    </LoadingRegion>
  );
}
