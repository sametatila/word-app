import { LoadingRegion } from "@/components/loading-region";
import { SkeletonTile } from "@/components/skeleton";
import { TextSlot } from "@/components/flow-skeleton";

/**
 * Deneme sınavları gelene kadar iskelet — sayfanın kendi sırasıyla: geri +
 * başlık + İstatistik düğmesi, seviye/kapsam kartı, seviye çipleri, giriş
 * metni, kâğıt kartları (üst satır, tema, süre, dört bölüm satırı).
 *
 * Eskiden `PageSkeleton` (başlık + beş düz blok) çiziyordu: seviye kartı,
 * çipler ve bölüm satırları hiç yoktu, veri gelince her şey yer değiştiriyordu.
 * Çip ve satır yerleri gerçek sınıflarla ve görünmez metinle çiziliyor —
 * yükseklik tahmin değil, sınıfın kendisi. Mobil `MockExamsScreen` aynı sırada.
 */
export default function Loading() {
  const pulse = { background: "var(--surface-2)", borderColor: "transparent" };
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-3">
      <div aria-hidden className="mb-4 flex items-center gap-3">
        <SkeletonTile size={44} />
        <div className="min-w-0 flex-1">
          <TextSlot chars={16} className="line-clamp-2 break-words text-h2" />
        </div>
        {/* İstatistik düğmesi: gerçek `btn h-11 px-3.5 text-caption`, görünmez etiketle — genişliği de etiketten. */}
        <div className="btn h-11 shrink-0 animate-pulse px-3.5 text-caption" style={{ background: "var(--surface-2)" }}>
          <span className="invisible">Sınav istatistiği</span>
        </div>
      </div>
      <section aria-hidden className="card flex items-center justify-between gap-4 p-4">
        <span>
          <TextSlot as="span" chars={6} className="block text-micro uppercase tracking-eyebrow" />
          <TextSlot as="span" chars={2} className="block text-h1" />
        </span>
        <span className="text-right">
          <TextSlot as="span" chars={16} className="block text-micro uppercase tracking-eyebrow" />
          <TextSlot as="span" chars={3} className="block text-h1" />
        </span>
      </section>
      <div aria-hidden className="flex flex-wrap gap-2">
        {["A1", "A2", "B1", "B2", "C1"].map((l) => (
          <span key={l} className="chip animate-pulse px-3 py-1.5 text-strong" style={pulse}>
            <span className="invisible">{l}</span>
          </span>
        ))}
      </div>
      {/* Giriş metni 180 harf: 375 px'te beş, geniş masaüstünde iki satır. */}
      <TextSlot chars={180} className="text-body" />
      {[0, 1].map((p) => (
        <section key={p} aria-hidden className="card p-4">
          <TextSlot chars={9} className="text-micro uppercase tracking-eyebrow" />
          <TextSlot chars={24} className="mt-0.5 text-h3" />
          <TextSlot chars={42} className="text-body" />
          <div className="mt-3 space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-panel p-3 text-body" style={pulse}>
                <span className="invisible">.</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </LoadingRegion>
  );
}
