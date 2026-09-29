import { LoadingRegion } from "@/components/loading-region";
import { SkeletonBar, SkeletonTile, TextBox } from "@/components/skeleton";
import { TextSlot } from "@/components/flow-skeleton";

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
              <TextSlot as="span" chars={8} className="text-micro" />
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden className="shrink-0 short:hidden">
        <SkeletonBar height={6} />
        <p className="mt-1 flex flex-wrap gap-x-3 text-micro">
          <TextSlot as="span" chars={10} />
          <TextSlot as="span" chars={9} />
        </p>
      </div>
      <section aria-hidden className="card flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="shrink-0 border-b px-4 py-3 short:py-2 kb:hidden" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <TextSlot chars={20} className="truncate text-strong" />
              <TextSlot chars={18} className="truncate text-caption" />
            </div>
            <TextBox variant="caption" className="w-24 shrink-0 animate-pulse rounded-full py-1" style={{ background: "var(--surface-2)" }} />
          </div>
        </div>
        <div className="flex-1 space-y-3 overflow-hidden p-4">
          {[96, 70].map((chars, i) => (
            <div key={i} className="flex flex-col items-start gap-1">
              {/* Baloncuğun kendisi: sınıflar gerçeğinden, içi görünmez bir
                  anlatım cümlesi (~100 harf). Genişlik ve satır sayısı sabit
                  değil: telefonda üç, masaüstünde iki satır, kısa cümlede dar. */}
              <div className="flex w-full items-end gap-1.5">
                <div
                  className="max-w-[85%] animate-pulse select-none rounded-panel rounded-bl-chip px-3 py-2.5 text-body leading-relaxed"
                  style={{ background: "var(--surface-2)", color: "transparent" }}
                >
                  {"Baskıya dayanıklıyım ve çok sabırlıyım demek. Lütfen söyle: Ich bin belastbar und sehr geduldig heute.".slice(0, chars)}
                </div>
              </div>
              <TextSlot as="span" chars={8} className="text-micro" />
            </div>
          ))}
        </div>
        <div className="shrink-0 border-t p-4 short:p-3" style={{ borderColor: "var(--border)" }}>
          <div className="flex flex-col items-center gap-2">
            <div className="btn w-full animate-pulse px-5 py-4" style={{ background: "var(--surface-2)" }}>
              <span className="invisible">.</span>
            </div>
            <TextSlot chars={24} className="text-center text-caption" />
          </div>
        </div>
      </section>
    </LoadingRegion>
  );
}
