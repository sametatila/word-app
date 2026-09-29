import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonTile } from "@/components/skeleton";

/**
 * Avatar düzenleyicisinin iskeleti — `AvatarEditor`in GERÇEK düzeninde:
 * sahne (kapat, başlık hapı, sıfırla), üstüne binen kâğıt, yuva sekmeleri,
 * parça karoları ızgarası ve Kaydet.
 *
 * Eskisi başlık satırı + 140 px'lik yuvarlak maskot + üç yatay seçenek
 * şeridiydi; düzenleyici sahne ve sekmeli ızgaraya geçince (mobil
 * `AvatarScreen` ile aynı kurgu) iskelet eski ekranı çizmeye devam ediyordu.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-2xl">
      <div aria-hidden className="-mx-4 overflow-hidden sm:mx-0 sm:rounded-card">
        {/* Sahne: `AvatarStage height={260}`. */}
        <div className="relative animate-pulse" style={{ height: 260, background: "var(--surface-2)" }}>
          <div className="absolute inset-x-3 top-3 flex items-center">
            <span className="h-11 w-11 rounded-full" style={{ background: "var(--surface)" }} />
            <div className="flex flex-1 justify-center">
              {/* Başlık hapı: `text-h3` + `py-2`. */}
              <span className="h-[37px] w-36 rounded-full" style={{ background: "var(--surface)" }} />
            </div>
            <span className="h-11 w-11 rounded-full" style={{ background: "var(--surface)" }} />
          </div>
        </div>
      </div>

      <div className="relative -mx-4 -mt-6 rounded-t-[1.5rem] px-4 pt-4 sm:mx-0" style={{ background: "var(--bg)" }}>
        {/* Yuva sekmeleri: `text-strong` + `py-2`, köşe `tile`. */}
        <div className="flex gap-1.5 overflow-hidden pb-2">
          {[88, 72, 80, 76].map((w) => (
            <div key={w} className="h-[39px] shrink-0 animate-pulse rounded-tile" style={{ width: w, background: "var(--surface-2)" }} />
          ))}
        </div>

        {/* Parça karoları: 64'lük önizleme + `text-micro` ad, `p-2`, 1 px kenarlık.
            12 karo: ilk yuva (şapka) katalogla 50'yi aşıyor, yani satırlar dolu;
            12 hem 3 sütunda (telefon) hem 4 sütunda (sm) tam satır. 6 iken
            sm'de ikinci satır yarımdı. */}
        <div className="grid grid-cols-3 gap-2 py-2 sm:grid-cols-4">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 rounded-panel p-2"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <SkeletonTile size={64} className="rounded-full" />
              <SkeletonLine variant="micro" width="70%" />
            </div>
          ))}
        </div>

        {/* Kaydet: `btn btn-primary py-4`. */}
        <div className="mt-4 h-14 w-full animate-pulse rounded-tile" style={{ background: "var(--surface-2)" }} />
      </div>
    </LoadingRegion>
  );
}
