import { LoadingRegion } from "@/components/loading-region";
import { AppHeaderSkeleton, SkeletonBar, SkeletonLine, SkeletonTile, TextBox } from "@/components/skeleton";

/**
 * Patika iskeleti — `ImmersionHub`ın sırasıyla: başlık (`AppHeader`),
 * ilerleme şeridi + "n/m ünite" satırı, öne çıkan ünite kartı, modül başlığı
 * ve iki sütunlu ünite ızgarası.
 *
 * Eskisi `px-4 pt-11` ile sayfanın kendi kabından farklı bir kapta, başlık
 * yerine kısa bir çubuk ve şeridin altındaki sayaç satırı olmadan çiziliyordu;
 * öne çıkan kart da içsiz bir bloktu. Ölçüler gerçek sınıflardan.
 *
 * XL'DE İKİ PANEL. Hub 1280 px'ten (`TWO_PANE_MIN`, Tailwind `xl` ile aynı)
 * itibaren kabı açıp (`xl:max-w-none`) solda bu gövdeyi, sağda seçili ünitenin
 * `UnitPane`ini çiziyor; iskelet tek sütunda kalınca geniş ekranda gövde
 * 848 px'e yayılıp sonra %45'e daralıyordu. Aynı ızgara burada CSS ile.
 * Ünite ızgarası her genişlikte iki sütun; ilk modül üç, ikinci iki ünite
 * (modül 10, ünite 4 konuşma: 3-2-3-2 dizilişi).
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl xl:max-w-none">
      <AppHeaderSkeleton titleWidth={120} />

      <div className="xl:grid xl:grid-cols-[45fr_55fr] xl:items-start xl:gap-4">
        <div>
          <HubBody />
        </div>
        {/* Sağ panel: `UnitPane embedded` — konuşma başlıkları (bu genişlikte
            iki satır), şerit + sayaç, adım kartları. */}
        <div aria-hidden className="card hidden p-4 xl:block">
          <SkeletonLine variant="caption" width="94%" />
          <SkeletonLine variant="caption" width="50%" className="mb-3" />
          <SkeletonBar height={10} />
          <SkeletonLine variant="caption" width={90} className="mb-4 mt-1.5" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card flex items-center gap-3 p-4">
                <SkeletonTile size={46} />
                <div className="min-w-0 flex-1">
                  <SkeletonLine variant="micro" width={64} />
                  <SkeletonLine variant="strong" width={`${72 - (i % 3) * 10}%`} />
                </div>
                <SkeletonTile size={28} className="rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </LoadingRegion>
  );
}

function HubBody() {
  return (
    <>
      <SkeletonBar height={10} />
      <SkeletonLine variant="caption" width={140} className="mb-4 mt-1.5" />

      {/* Öne çıkan ünite: 56 px numara karosu + üç satır, adım sayacı ve
          şeridi, sıradaki adım satırı, tam genişlik düğme. */}
      <section aria-hidden className="card p-4">
        <div className="flex items-center gap-3">
          <SkeletonTile size={56} />
          <div className="min-w-0 flex-1">
            <SkeletonLine variant="micro" width={110} />
            <SkeletonLine variant="h2" width="70%" />
            <SkeletonLine variant="caption" width="85%" />
          </div>
        </div>
        <SkeletonLine variant="caption" width={90} className="mt-3" />
        <SkeletonBar height={10} className="mt-1.5" />
        <div className="mt-3 flex items-center gap-3 rounded-panel p-3" style={{ background: "var(--surface-2)" }}>
          {/* Satırın zemini zaten surface-2; karo ve metin bir ton koyu
              görünsün diye kenarlık rengiyle. */}
          <div className="h-11 w-11 shrink-0 animate-pulse rounded-tile" style={{ background: "var(--border)" }} />
          <div className="min-w-0 flex-1">
            <TextBox variant="micro" />
            <TextBox variant="strong" />
          </div>
        </div>
        <div className="mt-3 animate-pulse rounded-panel py-4 surface-2">
          <TextBox variant="h3" />
        </div>
      </section>

      {[3, 2].map((n, g) => (
        <section key={g} aria-hidden className="mt-5">
          <SkeletonLine variant="micro" width={70} className="ml-1" />
          <SkeletonLine variant="h3" width={160 - g * 30} className="mb-2 ml-1" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: n }).map((_, i) => (
              <div key={i} className="card flex min-h-[7.25rem] flex-col items-start p-4">
                <SkeletonTile size={44} className="rounded-full" />
                {/* Konuşma başlıkları `line-clamp-2`: dört başlık her genişlikte iki satırı doldurur. */}
                <SkeletonLine variant="strong" width="90%" className="mt-2" />
                <SkeletonLine variant="strong" width="55%" />
                <div className="mt-auto w-full pt-2">
                  <SkeletonBar height={6} />
                  <SkeletonLine variant="micro" width="45%" className="mt-1" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

