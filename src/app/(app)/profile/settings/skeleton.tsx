import { SkeletonLine, SkeletonTile } from "@/components/skeleton";

/**
 * Ayarlar iskeletinin parçaları — iki `loading.tsx` (liste ve tek grup) aynı
 * çerçeveyi (`SettingsFrame`) ve aynı parçaları çiziyor.
 *
 * Eskisi üç kartta "etiket + 44'lük kutu" form alanlarıydı: ayarlar ise
 * telefonda grup LİSTESİ (`SettingsNav`: üç kart, yedi satır, Çıkış yap),
 * masaüstünde solda o liste ve sağda grubun kartı. İçerik gelince ekranın
 * tamamı yer değiştiriyordu.
 */

/**
 * `SettingsNav`in kartları: satır başına sağda değer var mı. Değerler yalnız
 * telefon listesinde (masaüstü sol sütunu `compact`): Öğrenme, Uygulama |
 * Hesap, Abonelik | sürüm; Hatırlatmalar ve Gizlilik değersiz.
 */
const VALUE_ROWS = [
  [true, true, false],
  [true, false, true],
  [true],
];

/** `SettingsNav`: 3 + 3 + 1 satırlık üç kart ve altında Çıkış yap. */
export function SettingsNavSkeleton({ values = false }: { values?: boolean }) {
  return (
    <div aria-hidden className="space-y-4">
      {VALUE_ROWS.map((rows, c) => (
        <div key={c} className="card px-4">
          {rows.map((hasValue, i, { length: n }) => (
            <div
              key={i}
              className="flex items-center gap-3 py-3"
              style={i < n - 1 ? { borderBottom: "1px solid var(--hairline)" } : undefined}
            >
              {/* `MenuRow`: 38'lik karo, `text-strong` etiket, sönük değer, şevron. */}
              <SkeletonTile size={38} />
              <span className="min-w-0 flex-1">
                <SkeletonLine variant="strong" width={`${60 - ((i + c) % 3) * 10}%`} />
              </span>
              {values && hasValue ? <SkeletonLine variant="caption" width={64} /> : null}
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-center py-3">
        <SkeletonLine variant="strong" width={96} />
      </div>
    </div>
  );
}

/** `PageBack`: 44'lük geri düğmesi + `text-h2` başlık. */
export function SettingsBackSkeleton() {
  return (
    <div aria-hidden className="mb-4 flex items-center gap-3">
      <SkeletonTile size={44} />
      <SkeletonLine variant="h2" width={140} />
    </div>
  );
}

/**
 * `ProfileForm`un Öğrenme grubu (masaüstünde ilk açılan grup): kurs
 * seçenekleri, beş seviye çipi, iki kaydırıcı. Grup kartı `settings-section`
 * `Group` + `Row` ölçüsünde.
 */
export function SettingsFormSkeleton() {
  return (
    <div aria-hidden className="w-full space-y-4">
      <SettingsBackSkeleton />
      <section className="mx-auto w-full max-w-3xl">
        <div className="card divide-y divide-[color:var(--hairline)] px-4">
          <div className="py-4">
            <SkeletonLine variant="caption" width={120} className="mb-2" />
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded-panel px-3 py-3" style={{ border: "1px solid var(--border)" }}>
                  <SkeletonLine variant="strong" width="60%" />
                  <SkeletonLine variant="caption" width="80%" />
                </div>
              ))}
            </div>
          </div>
          <div className="py-4">
            <SkeletonLine variant="caption" width={72} className="mb-2" />
            <div className="grid grid-cols-5 gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-center rounded-panel py-2.5" style={{ border: "1px solid var(--border)" }}>
                  <SkeletonLine variant="strong" width={24} />
                </div>
              ))}
            </div>
            <SkeletonLine variant="caption" width="70%" className="mt-1.5" />
            <SkeletonLine variant="caption" width="55%" className="mt-2.5" />
          </div>
          <div className="py-4">
            <SkeletonLine variant="caption" width={140} className="mb-2" />
            {[0, 1].map((i) => (
              <div key={i}>
                <div className="mb-1.5 flex items-center justify-between">
                  <SkeletonLine variant="strong" width={110} />
                  <SkeletonLine variant="strong" width={72} />
                </div>
                {/* `.range`: 22 px yüksek, içinde 6 px çubuk. */}
                <div className="flex h-[22px] items-center">
                  <div className="h-1.5 w-full animate-pulse rounded-full" style={{ background: "var(--surface-2)" }} />
                </div>
              </div>
            ))}
            <SkeletonLine variant="caption" width="85%" />
          </div>
        </div>
      </section>
    </div>
  );
}
