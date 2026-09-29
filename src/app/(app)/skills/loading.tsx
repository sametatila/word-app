import { LoadingRegion } from "@/components/loading-region";
import { AppHeaderSkeleton, SkeletonBar, SkeletonLine, SkeletonTile } from "@/components/skeleton";

/**
 * Beceriler gelene kadar iskelet — sayfanın KENDİ düzeni.
 *
 * Genel `PageSkeleton` (başlık + altı düz blok) kullanılıyordu; beceri
 * karoları gelince sayfanın şekli değişti ve iskelet onunla hiçbir yerde
 * örtüşmüyordu: öneri kartının ve karoların yeri yoktu, içerik gelince her
 * şey aşağı kayıyordu. Artık her parça gerçeğin kabını (aynı sınıflar, aynı
 * dolgu ve kenarlık) kullanıyor ve yüksekliği içinden çıkıyor. Mobilde aynı
 * ekran (`SkillsScreen`) aynı sırayı çiziyor.
 *
 * Genişlik: sayfa her genişlikte tek sütun (`max-w-3xl`), duyarlı tek sınıf
 * karo aralığı (`sm:gap-2`) ve karo adının dar ekranda iki satıra kırılması;
 * ikisi de burada aynı.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <AppHeaderSkeleton titleWidth={160} />

      {/* Seviye etiketi + sayaç, beş eşit sekme. */}
      <div className="mb-2 ml-1 flex items-center justify-between">
        <SkeletonLine variant="caption" width={52} />
        <SkeletonLine variant="caption" width={96} />
      </div>
      <div className="mb-4 flex gap-2">
        {/* Gerçek sekmenin kendi `chip` sınıfı: kenarlık, zemin, yarıçap ondan. */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="chip flex-1 py-2.5">
            <SkeletonLine variant="strong" width="40%" className="mx-auto" />
          </div>
        ))}
      </div>

      {/* Öneri kartı: 40 px karo + üç satır. */}
      <div className="card mb-4 flex items-center gap-3 p-4">
        <SkeletonTile size={40} />
        <div className="min-w-0 flex-1">
          <SkeletonLine variant="micro" width="35%" />
          <SkeletonLine variant="strong" width="60%" />
          <SkeletonLine variant="caption" width="80%" />
        </div>
      </div>

      {/* Beş beceri karosu — `SkillBrowser` karosuyla aynı kap. */}
      <div className="mb-4 grid grid-cols-5 gap-1.5 sm:gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex min-w-0 flex-col items-center gap-1 rounded-tile px-0.5 pb-2 pt-2.5"
            style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            <SkeletonTile size={20} />
            {/* Karo adı `text-caption leading-tight`: satır 20 değil ~16 px.
                `line-clamp-2`: ~400 px'in altında karo metni ~60 px'e iniyor ve
                tek boşluklu ad ("Dil bilgisi", yalnız Türkçe) iki satıra
                kırılıyor; satırdaki beş karo en uzununa uzuyor. Öteki adlar
                tek sözcük, kırılmıyor. `:lang` `<html lang>`ı (arayüz dili) okur. */}
            <span className="block w-[70%] text-caption leading-tight">
              <span className="flex h-[1lh] items-center">
                <SkeletonBar height={10} className="w-full" />
              </span>
              <span className="hidden h-[1lh] items-center max-[400px]:[&:lang(tr)]:flex">
                <SkeletonBar height={10} className="w-full" />
              </span>
            </span>
            <SkeletonLine variant="micro" width="40%" className="mt-auto" />
            <SkeletonBar height={4} className="w-4/5" />
          </div>
        ))}
      </div>

      {/* Seçili becerinin başlığı ve listesi. */}
      <div className="mb-2 ml-1 flex items-center gap-2">
        <SkeletonTile size={18} />
        <SkeletonLine variant="h3" width={96} />
        <SkeletonLine variant="caption" width={36} />
      </div>
      <ul className="card divide-y divide-[color:var(--hairline)] px-4">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <li key={i} className="flex items-center gap-3 py-3">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--surface-2)" }} />
            <span className="min-w-0 flex-1">
              <SkeletonLine variant="strong" width="65%" />
              <SkeletonLine variant="caption" width="40%" />
            </span>
            <SkeletonTile size={20} />
          </li>
        ))}
      </ul>
    </LoadingRegion>
  );
}
