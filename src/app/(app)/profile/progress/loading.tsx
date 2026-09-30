import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonBar, SkeletonTile, TextBox } from "@/components/skeleton";

/**
 * Gelişim iskeleti — sayfanın GERÇEK sırasıyla (`ActivityProgress`): başlık,
 * turuncu seri kahramanı (bu hafta noktalarıyla), "Nasıl gidiyorum" başlığı ve
 * kartı, dört karo, kelime ustalığı + seviye satırları, tekrar kuyruğu, iki
 * haftalık ritim. Altındakiler (zayıf noktalar, zaman içinde, menü satırları)
 * veri gelince açılıyor; ilk ekranın dışında kalıyorlar.
 *
 * Kahraman TEMADAN BAĞIMSIZ turuncu: iskelet de turuncu kabuk ve üstünde
 * beyaz/25 çubuklar (Öğren kahramanının hedef şeridi gibi). Gri bir blok
 * veri gelince renk değiştirip "yanıp" sönüyordu.
 */
/** Kahramanın turuncusu üstünde iskelet çubuğu — beyaz %25. */
const ON_HERO = "rgb(255 255 255 / 0.25)";

export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-4">
      {/* `PageBack`: 44'lük geri düğmesi + `text-h2` başlık. */}
      <div className="mb-4 flex items-center gap-3">
        <SkeletonTile size={44} />
        <SkeletonLine variant="h2" width={140} />
      </div>

      <div className="space-y-5">
        {/* Seri kahramanı: 64'lük karo, `display` sayı, `strong` etiket, en uzun seri, bu hafta. */}
        <div aria-hidden className="overflow-hidden rounded-card" style={{ background: "var(--brand-fill)" }}>
          <div className="flex items-center gap-4 p-5">
            <span className="h-16 w-16 shrink-0 rounded-tile bg-white/20" />
            <span className="min-w-0 flex-1">
              <SkeletonLine variant="display" width={64} tone={ON_HERO} />
              <SkeletonLine variant="strong" width={112} tone={ON_HERO} />
              <SkeletonLine variant="caption" width={140} tone={ON_HERO} />
            </span>
          </div>
          <div className="px-5 pb-4">
            <div className="mb-2 flex justify-between">
              <SkeletonLine variant="micro" width={70} tone={ON_HERO} />
              <SkeletonLine variant="micro" width={50} tone={ON_HERO} />
            </div>
            <div className="flex justify-between gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className="flex flex-1 flex-col items-center gap-1">
                  <span className="h-6 w-6 rounded-full bg-white/25" />
                  <TextBox variant="micro" className="leading-none" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Nasıl gidiyorum — `HowAmIDoing`in kendi yükleme dalıyla aynı. */}
        <section>
          <div className="mb-2 flex items-baseline justify-between gap-3 px-1">
            <SkeletonLine variant="h3" width={150} />
            <SkeletonLine variant="caption" width={120} />
          </div>
          <div className="card p-4">
            <SkeletonLine variant="strong" width="80%" />
            <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <div className="flex items-center justify-between gap-2">
                    <SkeletonLine variant="strong" width={110} />
                    <SkeletonLine variant="caption" width={70} />
                  </div>
                  <SkeletonBar height={6} className="mt-1.5" />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-panel p-3 surface-2">
              <SkeletonTile size={40} />
              <span className="min-w-0 flex-1">
                <SkeletonLine variant="strong" width="60%" />
                <SkeletonLine variant="caption" width="80%" />
              </span>
              <TextBox variant="caption" className="h-9 shrink-0" style={{ width: 64 }} />
            </div>
          </div>
        </section>

        {/* Dört karo: 40'lık dolu karo, `h2` değer, `caption` etiket. */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="card p-4">
              <SkeletonTile size={40} />
              <SkeletonLine variant="h2" width="55%" className="mt-2" />
              <SkeletonLine variant="caption" width="80%" />
            </div>
          ))}
        </div>

        {/* Kelime ustalığı: başlık + 10'luk şerit, seviye etiketi ve beş satır. */}
        <div className="card p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <SkeletonLine variant="h3" width={130} />
            <SkeletonLine variant="caption" width={72} />
          </div>
          <SkeletonBar height={10} />
          <div className="mt-4 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
            <SkeletonLine variant="micro" width={90} className="mb-2" />
            <div className="space-y-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <SkeletonLine variant="body" width={28} />
                    <SkeletonLine variant="caption" width={140} />
                  </div>
                  <SkeletonBar height={6} />
                </div>
              ))}
            </div>
            <SkeletonLine variant="caption" width="90%" className="mt-3" />
          </div>
        </div>

        {/* Tekrar kuyruğu: başlık + iki satır. */}
        <div className="card p-4">
          <SkeletonLine variant="h3" width={120} className="mb-2" />
          <SkeletonLine variant="body" width="45%" />
          <SkeletonLine variant="body" width="55%" />
        </div>

        {/* İki haftalık ritim: `h-11` şerit ve altında gün harfleri. */}
        <section className="card p-4">
          <div className="mb-2.5 flex items-baseline justify-between gap-3">
            <SkeletonLine variant="h3" width={120} />
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
    </LoadingRegion>
  );
}
