import { LoadingRegion } from "@/components/loading-region";
import { SkeletonBar, SkeletonLine, SkeletonPill, SkeletonTile, textHeight } from "@/components/skeleton";

/**
 * Konuşma gelene kadar iskelet — `ConversationPlayer`in anlatım adımının
 * kendisi, aynı sırayla: çıkış + üç adım şeridi, anlatımın ilerleme çizgisi,
 * anlatım kartı (başlık satırı, öğretmen baloncukları, altta "Hazırım").
 *
 * Eskiden ortalanmış bir karakter yuvarlağı ve kapak çiziyordu; oynatıcının
 * kapağı yok, açılır açılmaz anlatım başlıyor. Kap sınıfları oynatıcının
 * kökünden: kart kalan yüksekliği dolduruyor, "Hazırım" dipte duruyor.
 * Android `ConversationScreen` aynı düzeni kendi iskeletinde çiziyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col gap-4 short:gap-2">
      <div aria-hidden className="flex shrink-0 items-center gap-3 kb:hidden">
        <SkeletonTile size={44} />
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-1 flex-col gap-1">
              <SkeletonBar height={4} />
              <SkeletonLine variant="micro" width="60%" />
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden className="shrink-0 short:hidden">
        <SkeletonBar height={6} />
        <div className="mt-1 flex gap-3">
          <SkeletonLine variant="micro" width={64} />
          <SkeletonLine variant="micro" width={56} />
        </div>
      </div>
      <section aria-hidden className="card flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="shrink-0 border-b px-4 py-3 short:py-2 kb:hidden" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <SkeletonLine variant="strong" width="55%" />
              <SkeletonLine variant="caption" width="38%" />
            </div>
            <SkeletonPill width={96} height={textHeight("caption") + 8} className="shrink-0" />
          </div>
        </div>
        <div className="flex-1 space-y-3 overflow-hidden p-4">
          {["72%", "56%"].map((w, i) => (
            <div key={i} className="flex flex-col items-start gap-1">
              {/* Baloncuğun kendisi: dolgu ve satır yüksekliği gerçeğinden,
                  iki görünmez satırla. */}
              <div
                className="max-w-[85%] animate-pulse rounded-panel rounded-bl-chip px-3 py-2.5 text-body leading-relaxed"
                style={{ width: w, background: "var(--surface-2)" }}
              >
                <span className="invisible">.<br />.</span>
              </div>
              <SkeletonLine variant="micro" width={54} />
            </div>
          ))}
        </div>
        <div className="shrink-0 border-t p-4 short:p-3" style={{ borderColor: "var(--border)" }}>
          <div className="flex flex-col items-center gap-2">
            <div className="btn w-full animate-pulse px-5 py-4" style={{ background: "var(--surface-2)" }}>
              <span className="invisible">.</span>
            </div>
            <SkeletonLine variant="caption" width={150} />
          </div>
        </div>
      </section>
    </LoadingRegion>
  );
}
