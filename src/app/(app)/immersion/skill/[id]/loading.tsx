import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine } from "@/components/skeleton";

/**
 * Beceri alıştırması gelene kadar iskelet — oynatıcının kapağı: geri satırı,
 * başlık, metin kutusu ve soru bloğu.
 *
 * Bu sayfa sunucuda ON İSTEK yapıyor (egzersiz, profil, yerelleştirme,
 * ilerleme, sıradaki egzersiz) ve `loading.tsx`i yoktu: Patika'dan ya da
 * beceri listesinden bir alıştırmaya dokunan kişi o süre boyunca BOŞ EKRAN
 * görüyordu. Android'de aynı içerik yerelde paketli olduğu için iskelete
 * gerek yok — yani burada ölçüt karşılaştırma değil mutlak: sunucudan içerik
 * bekleyen sayfa boş kalmaz.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-4">
      <div className="flex items-center gap-3">
        <SkeletonLine variant="strong" width={80} />
      </div>
      <SkeletonLine variant="h2" width={240} />
      <section className="card space-y-2 p-5">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonLine key={i} variant="body" width={`${94 - i * 9}%`} />
        ))}
      </section>
      <section className="card space-y-3 p-5">
        <SkeletonLine variant="strong" width="70%" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-12 w-full rounded-tile" style={{ background: "var(--surface-2)" }} />
        ))}
      </section>
    </LoadingRegion>
  );
}
