import { SkeletonLine } from "@/components/skeleton";

/**
 * Pratik listesi gelene kadar iskelet — karışık tur kartı, sonra oyun
 * kutucukları. Kutucuk sayısı kursa göre değişiyor; iskelet en yaygın
 * durumu (Almanca, on bir oyun) değil, ilk ekranı dolduran kadarını
 * çiziyor ki içerik gelince liste kısalmasın.
 */
export default function Loading() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-2xl space-y-5">
      <SkeletonLine variant="h2" width={120} />
      <div className="h-[92px] w-full rounded-card" style={{ background: "var(--surface-2)" }} />
      <section className="space-y-3">
        <SkeletonLine variant="micro" width={80} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[104px] rounded-card" style={{ background: "var(--surface-2)" }} />
          ))}
        </div>
      </section>
    </div>
  );
}
