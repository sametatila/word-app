import { SkeletonLine } from "@/components/skeleton";

/**
 * Ders gelene kadar iskelet — oynatıcının kapağı: karakter yuvarlağı,
 * başlık ve iki satır giriş metni.
 *
 * Ders gövdesi sunucuda kuruluyor; iskelet yokken listeden derse dokunan
 * kişi boş bir ekran görüyordu.
 */
export default function Loading() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-3xl space-y-4 pt-6">
      <div className="flex flex-col items-center gap-3">
        <div className="size-20 rounded-full" style={{ background: "var(--surface-2)" }} />
        <SkeletonLine variant="h2" width={220} />
        <SkeletonLine variant="caption" width={160} />
      </div>
      <section className="card space-y-2 p-5">
        {[0, 1, 2].map((i) => (
          <SkeletonLine key={i} variant="body" width={`${92 - i * 14}%`} />
        ))}
      </section>
      <div className="h-12 w-full rounded-card" style={{ background: "var(--surface-2)" }} />
    </div>
  );
}
