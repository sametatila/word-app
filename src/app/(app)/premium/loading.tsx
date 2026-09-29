"use client";

import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonTile } from "@/components/skeleton";
import { TextSlot, TileSlot } from "@/components/flow-skeleton";
import { useCourse } from "@/components/app-shell";
import { supportsMockExams } from "@/lib/mock-exams";
import { DEFAULT_PREMIUM_CONFIG } from "@/lib/premium/gates";
import { DAILY_QUOTAS } from "@/lib/quotas";

/**
 * Premium sayfası gelene kadar iskelet — `PremiumPaywall`in düzeni: geri
 * karosu; solda turuncu vitrin bandı, başlık, iki sütun madde, tablo; sağda
 * plan kartları, çizelge, mağaza kartı ve düğmeler.
 *
 * METİN GERÇEĞİNİN KENDİSİ: her paragraf gerçek cümlenin görünmez hâli
 * (`TextSlot`), sarılmayı tarayıcı yapıyor; sayılar panel değerleri gelmeden
 * varsayılanlar. İstemci bileşeni, çünkü sınav maddesi kursa bağlı.
 */
export default function Loading() {
  const exams = supportsMockExams(useCourse());
  const fair = DEFAULT_PREMIUM_CONFIG.fairUse;
  const bullets = ["paywall.b_ai", ...(exams ? ["paywall.b_mock"] : []), "paywall.b_walk", "paywall.b_avatar"];
  return (
    <LoadingRegion className="mx-auto w-full max-w-6xl pb-12">
      <SkeletonTile size={44} />
      <div className="mt-3 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="flex min-w-0 flex-col gap-8">
          <TileSlot shape="card" className="h-72 w-full" />
          <section className="flex flex-col gap-4">
            <TextSlot k="paywall.headline" className="text-display" />
            <div className="grid gap-x-7 gap-y-3.5 sm:grid-cols-2">
              {bullets.map((k) => (
                <div key={k} className="flex items-start gap-2.5">
                  <TileSlot shape="full" className="mt-0.5 h-5 w-5" />
                  <span className="flex min-w-0 flex-col">
                    <TextSlot as="span" k={k} className="text-strong" />
                    <TextSlot as="span" k="paywall.b_ai_cap" v={{ a: fair.aiPracticePerDay, c: DAILY_QUOTAS.chatTurns }} className="text-caption" />
                  </span>
                </div>
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-3">
            <TextSlot k="paywallw.table_title" className="text-h2" />
            <TileSlot shape="card" className="h-72 w-full" />
          </section>
        </div>
        <aside className="flex flex-col gap-4">
          <div className="card flex flex-col gap-4 p-5">
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {[0, 1].map((i) => (
                <div key={i} className="flex flex-col gap-1 rounded-panel border p-3.5" style={{ borderColor: "var(--border)" }}>
                  <TextSlot k={i ? "paywall.monthly" : "paywall.yearly"} className="text-strong" />
                  <SkeletonLine variant="h2" width={96} />
                  <TextSlot k="paywall.billed_monthly" className="text-caption" />
                </div>
              ))}
            </div>
            <TileSlot className="h-20 w-full" />
            <TileSlot className="h-28 w-full" />
            <TileSlot className="h-12 w-full" />
          </div>
        </aside>
      </div>
    </LoadingRegion>
  );
}
