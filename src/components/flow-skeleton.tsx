import { SkeletonBar, SkeletonLine, SkeletonPill, SkeletonTile, textHeight } from "@/components/skeleton";

/*
 * AKIŞ ŞABLONUNUN İSKELETLERİ — kapak (`flow` `CoverBody`) ve tur kabuğu
 * (`session-player` + `games/game-shell`).
 *
 * Yedi bekleme yeri aynı iki ekrana açılıyor: yerleştirme, deneme sınavı
 * bölümü, puanlı konuşma, meydan okuma, patron ve haftalık sınav bir KAPAĞA;
 * günün turu bir TURA. Her biri kendi göz kararı iskeletini çiziyordu
 * (ortalanmış başlık + tek kart + düğme; ya da dönen halka) ve hiçbiri
 * gerçek ekranın sırasını tutmuyordu. Ölçüler burada gerçek bileşenin
 * sınıflarından: biri değişirse diğeri de burada değişmeli.
 * Mobil karşılığı `M/src/game/RoundSkeleton.tsx` (`RoundSkeleton`,
 * `CoverSkeleton`).
 */

/** Düğme yeri — gerçek `.btn`in kendisi, görünmez bir harfle: yüksekliği sınıftan çıkıyor. */
export function ButtonSlot({ className }: { className: string }) {
  return (
    <div aria-hidden className={`btn w-full animate-pulse ${className}`} style={{ background: "var(--surface-2)" }}>
      <span className="invisible">.</span>
    </div>
  );
}

/**
 * Kapak iskeleti: `FlowColumn` > (koç satırı) > `CoverBody` (ikon karosu,
 * üst satır, başlık, tanıtım, kural kartı, not, ayrıntı kartı) > `FlowActions`.
 */
export function CoverSkeleton({
  rules = 3,
  pitch = true,
  note = 0,
  footnote = false,
  coach = false,
  detailRows = 0,
  secondary = false,
  tertiary = true,
}: {
  rules?: number;
  pitch?: boolean;
  /** Kuralların altındaki soluk not satırı sayısı. */
  note?: number;
  /** Notun dibindeki küçük bağımsızlık satırı (`exam.independent_note`). */
  footnote?: boolean;
  /** Kapağın üstündeki koç cümlesi (`CoachLine`). */
  coach?: boolean;
  /** Kapağın içindeki `DetailCard` satır sayısı (0 = kart yok). */
  detailRows?: number;
  secondary?: boolean;
  tertiary?: boolean;
}) {
  return (
    <div aria-hidden className="relative mx-auto flex w-full max-w-md flex-col gap-3">
      {coach ? <SkeletonLine variant="body" width="78%" /> : null}
      <div className="flex flex-col gap-3">
        <div className="h-14 w-14 animate-pulse rounded-panel" style={{ background: "var(--surface-2)" }} />
        <div>
          <SkeletonLine variant="micro" width="38%" />
          <SkeletonLine variant="h1" width="72%" />
          {pitch ? (
            <div className="mt-1">
              <SkeletonLine variant="body" width="94%" />
              <SkeletonLine variant="body" width="58%" />
            </div>
          ) : null}
        </div>
        {rules ? (
          <ul className="card flex flex-col gap-3 p-4">
            {Array.from({ length: rules }, (_, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="block h-7 w-7 shrink-0 animate-pulse rounded-chip" style={{ background: "var(--surface-2)" }} />
                <span className="min-w-0 flex-1 pt-0.5">
                  <SkeletonLine variant="body" width={`${86 - (i % 3) * 14}%`} />
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        {note || footnote ? (
          <div>
            {Array.from({ length: note }, (_, i) => (
              <SkeletonLine key={i} variant="caption" width={`${70 - i * 12}%`} />
            ))}
            {footnote ? <SkeletonLine variant="micro" width="84%" className="mt-2" /> : null}
          </div>
        ) : null}
        {detailRows ? (
          <section className="card flex flex-col gap-2 p-4">
            <SkeletonLine variant="micro" width="34%" />
            {Array.from({ length: detailRows }, (_, i) => (
              <div key={i} className="flex items-baseline justify-between gap-3">
                <SkeletonLine variant="strong" width="42%" />
                <SkeletonLine variant="caption" width="30%" />
              </div>
            ))}
          </section>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <ButtonSlot className="px-5 py-4" />
        {secondary ? <ButtonSlot className="border px-5 py-4 text-strong" /> : null}
        {tertiary ? (
          <div className="flex w-full justify-center px-5 py-2.5">
            <SkeletonLine variant="strong" width={96} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Tur iskeleti: çıkış + çubuk + yeni/tekrar çipi + sayaç satırı, (tek oyun
 * etiketi), soru kartı ve dört şık — `session-player` oynama dalının ve
 * `GameShell`in kapları, aynı sırayla. Aradaki esneyen paylar (`grow`)
 * da gerçeğindeki gibi: şıklar ilk soru geldiğinde yerinden oynamıyor.
 */
export function RoundSkeleton({ label = false, options = 4 }: { label?: boolean; options?: number }) {
  return (
    <div aria-hidden className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
      <div className="mb-3 flex shrink-0 items-center gap-3 text-caption">
        <SkeletonTile size={44} />
        <SkeletonBar height={8} className="min-w-0 flex-1" />
        <SkeletonPill width={48} height={textHeight("micro") + 4} className="shrink-0" />
        <SkeletonLine variant="caption" width={36} className="shrink-0" />
      </div>
      {label ? (
        <div className="mb-2 flex shrink-0 justify-center">
          <SkeletonLine variant="micro" width={140} />
        </div>
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-full shrink-0 flex-col md:my-auto md:min-h-0">
          <div className="mx-auto flex w-full max-w-md flex-1 flex-col md:block">
            <div className="card flex flex-col items-center px-4 py-6">
              <SkeletonLine variant="micro" width={112} />
              <div className="mt-1.5 flex w-full justify-center sm:hidden">
                <SkeletonLine variant="h1" width="55%" />
              </div>
              <div className="mt-1.5 hidden w-full justify-center sm:flex">
                <SkeletonLine variant="display" width="45%" />
              </div>
            </div>
            <div className="min-h-5 grow md:hidden" />
            <div className="grid gap-3 md:mt-5">
              {Array.from({ length: options }, (_, i) => (
                <div key={i} className="option flex items-center px-4 py-3">
                  <SkeletonLine variant="body" width={`${58 - (i % 3) * 12}%`} />
                </div>
              ))}
            </div>
            <div className="max-h-8 grow md:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
