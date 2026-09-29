import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonPill, SkeletonTile } from "@/components/skeleton";

/**
 * Profil iskeleti — `ProfileView`in GERÇEK şeklinde.
 *
 * Eskisi kimlik satırı + beş satırlık menüydü; profil o menüyü kaldırıp
 * sahne (avatar), kâğıt, seri · XP · lig kartı, Gelişim karoları, son
 * başarımlar ve Premium kartına geçti (mobil `ProfileScreen` ile aynı kurgu).
 * İskelet eski düzeni çizdiği için içerik gelince her şey yer değiştiriyordu.
 *
 * Son başarımların rozet satırı ÇİZİLMİYOR: gerçek sayfa da onu yalnız kendi
 * isteği dönünce ve kazanılmış rozet varsa çiziyor; olmayan bir satırın
 * sözünü vermek içerik gelince boşluğu kapatıp zıplatırdı.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <div aria-hidden className="-mx-4 overflow-hidden sm:mx-0 sm:rounded-card">
        {/* Sahne: `AvatarStage height={300}`; iki köşe düğmesi 44'lük kare. */}
        <div className="relative animate-pulse" style={{ height: 300, background: "var(--surface-2)" }}>
          <div className="absolute inset-x-3 top-3 flex justify-between">
            <span className="h-11 w-11 rounded-tile" style={{ background: "var(--surface)" }} />
            <span className="h-11 w-11 rounded-tile" style={{ background: "var(--surface)" }} />
          </div>
        </div>
      </div>

      {/* Kâğıt — sahnenin üstüne biniyor, ölçüler `ProfileView`dan. */}
      <div className="relative -mx-4 -mt-7 space-y-5 rounded-t-[1.75rem] px-4 pt-4 sm:mx-0" style={{ background: "var(--bg)" }}>
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <SkeletonLine variant="h1" width={180} />
            <SkeletonLine variant="caption" width={160} />
          </div>
          {/* "Avatarı düzenle" hapı: `text-strong` satırı + `py-2`. */}
          <SkeletonPill width={150} height={39} />
        </div>

        <div className="card grid grid-cols-3 divide-x divide-[color:var(--hairline)]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center py-3">
              <SkeletonLine variant="h2" width={44} />
              <SkeletonLine variant="caption" width={64} />
            </div>
          ))}
        </div>

        <section className="space-y-2">
          <Head />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="card flex min-h-24 flex-col gap-1.5 p-3">
                <SkeletonTile size={28} />
                {/* Yalnız "Kelimelerim" karosu sayı taşıyor. */}
                {i === 0 ? <SkeletonLine variant="h3" width={36} /> : null}
                <SkeletonLine variant="caption" width="75%" />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <Head />
        </section>

        <div className="card flex items-center gap-3 p-4">
          <SkeletonTile size={24} />
          <span className="min-w-0 flex-1">
            <SkeletonLine variant="h3" width="45%" />
            <SkeletonLine variant="caption" width="70%" />
          </span>
        </div>
      </div>
    </LoadingRegion>
  );
}

/** Bölüm başlığı: solda `text-h3` ad, sağda "Tümü ›" bağlantısı. */
function Head() {
  return (
    <div className="flex items-baseline justify-between px-1">
      <SkeletonLine variant="h3" width={110} />
      <SkeletonLine variant="strong" width={56} />
    </div>
  );
}
