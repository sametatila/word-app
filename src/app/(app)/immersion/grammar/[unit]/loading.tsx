import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonTile } from "@/components/skeleton";

/**
 * Ünitenin gramer turu gelene kadar iskelet — sınav turuyla aynı oynatıcı
 * (`ImmersionQuizPlayer`), o yüzden aynı ilk kare: dar sütun (`max-w-2xl
 * py-6`), çarpı + tür karosu + başlık, tanıtım cümlesi, soru kartları.
 *
 * Eskisi oynatıcıda OLMAYAN bir ilerleme şeridi ve sayaç çiziyordu (soruların
 * hepsi aynı sayfada, şerit yok) ve kabı geniş sütundu.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-2xl py-6">
      {/* Başlık: çarpı (44), tür karosu (36), başlık + alt başlık. */}
      <div aria-hidden className="mb-5 flex items-center gap-3">
        <SkeletonTile size={44} />
        <SkeletonTile size={36} />
        <div className="min-w-0 flex-1">
          <SkeletonLine variant="h3" width="55%" />
          <SkeletonLine variant="caption" width="35%" />
        </div>
      </div>

      {/* Ne yapıldığını söyleyen tek cümle (`intro`). */}
      <div aria-hidden className="mb-4">
        <SkeletonLine variant="body" width="92%" />
        <SkeletonLine variant="body" width="48%" />
      </div>

      {/* `QuestionList`: başlık, sonra soru kartları (soru + şıklar). */}
      <div aria-hidden className="mt-5 space-y-4">
        <SkeletonLine variant="h3" width={90} className="px-1" />
        {[0, 1].map((i) => (
          <section key={i} className="card p-4">
            <SkeletonLine variant="strong" width={`${80 - i * 12}%`} />
            <div className="mt-3 grid gap-2">
              {[0, 1, 2, 3].map((j) => (
                <div key={j} className="option px-3.5 py-2.5">
                  <SkeletonLine variant="strong" width={`${40 + ((i + j) % 3) * 12}%`} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </LoadingRegion>
  );
}
