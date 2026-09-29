"use client";

import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonTile } from "@/components/skeleton";
import { TextSlot, TileSlot, filler } from "@/components/flow-skeleton";
import { useCourse } from "@/components/app-shell";
import { supportsMockExams } from "@/lib/mock-exams";
import { DEFAULT_PREMIUM_CONFIG, describeLimits } from "@/lib/premium/gates";
import { DAILY_QUOTAS } from "@/lib/quotas";

/**
 * Premium sayfası gelene kadar iskelet — `PremiumPaywall`in sırası: geri
 * karosu, ortalı kapak (taç karosu, başlık, slogan, durum), iki paket kartı +
 * deneme notu, mağaza yönlendirmesi, kapsam kartı, ince yazı.
 *
 * Sayfa beş okumayı birden yapıyor (yapılandırma, metin, durum, davet,
 * kavanoz). Kaplar gerçeğinkiyle aynı; Android `PaywallScreen` aynı yerde
 * iskelet çiziyor.
 *
 * METİN GERÇEĞİNİN KENDİSİ (2026-09-29). Sayfa metin ağırlıklı ve satır
 * sayısı hem genişlikle hem dille değişiyor. İskelet önce Türkçe metinden
 * ölçülmüş satır tablosuyla (telefon / sm–md / lg+) çiziliyordu: İngilizce
 * ve Almancada, bant kenarlarında tutmuyordu. Artık her paragraf gerçek
 * cümlenin görünmez hâli (`TextSlot`), kapsam satırları gerçeğiyle aynı
 * kaynaktan (`describeLimits`; panel değerleri gelmeden varsayılanlar):
 * sarılmayı tarayıcı yapıyor. İstemci bileşeni, çünkü slogan ve içerik vaadi
 * kursa bağlı (`useCourse`).
 */
export default function Loading() {
  const exams = supportsMockExams(useCourse());
  const copy = describeLimits(DEFAULT_PREMIUM_CONFIG);
  const fair = DEFAULT_PREMIUM_CONFIG.fairUse;
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl pb-12">
      <SkeletonTile size={44} />
      <div className="mt-2 flex flex-col items-center text-center">
        <TileSlot shape="card" className="h-20 w-20" />
        <TextSlot k="paywall.nomi_premium" className="mt-4 text-display" />
        <TextSlot k={exams ? "paywall.pitch_exams" : "paywall.pitch"} className="mt-1 text-body" />
        {/* Durum satırının gerçeği yazı sınıfı taşımıyor, gövdeden alıyor. */}
        <TextSlot k="premiumstate.free" className="mt-1" />
      </div>

      {/* Paket kartları: `card card-flat p-4 text-center`, yıllıkta indirim hapı. */}
      <section className="mt-6">
        <div className="grid grid-cols-2 gap-3">
          {(["paywall.monthly", "paywall.yearly"] as const).map((k, i) => (
            <div key={k} className="card card-flat flex flex-col items-center p-4 text-center">
              <TextSlot k={k} className="text-caption tracking-wide" />
              <SkeletonLine variant="h2" width={96} className="mt-1" />
              {i === 1 ? <TextSlot as="span" text="−50%" className="mt-2 inline-block rounded-full px-2 py-0.5 text-micro" /> : null}
            </div>
          ))}
        </div>
        <TextSlot k="paywallw.trial_one_month" className="mt-3 text-center text-caption" />
      </section>

      {/* Mağaza yönlendirmesi (`PremiumStoreCta`): başlık, iki satır, platform
          bloğu, dört not. */}
      {/* Kap gerçeğinin ölçüsüyle: `rounded-panel px-4 py-4`, KENARLIKSIZ (gerçeği
          marka gradyanı; `card` kenarlığı 2 px uzatıyordu). */}
      <section className="card card-flat mt-4 flex flex-col items-center rounded-panel border-0 px-4 py-4 text-center">
        <TextSlot k="store.cta_title" className="text-strong" />
        <TextSlot k="paywall.upgrade_in_app" className="mt-1 text-body" />
        <TextSlot k="store.cta_body" className="mt-1 text-caption" />
        {/* Platform bloğu `platformOf(user-agent)`tan: telefon ve Android
            tablet "uygulamada aç" düğmesi, masaüstü QR + mağaza bağlantıları.
            İskelet UA'yı okumuyor (önceden getirilen yükleme sınırı isteğe
            bağlanmasın); en yakın CSS karşılığı işaretçi: ince işaretçi
            masaüstü. Tek sapma iPad (masaüstü UA, dokunmatik). */}
        {/* Gerçeği bir bağlantı: dar ekranda dokunma tabanı onu 44'te tutuyor
            (`globals.css`), `div`i tutmuyor — taban burada elle. */}
        <div
          className="btn mt-3 inline-flex min-h-11 animate-pulse items-center justify-center rounded-full px-5 py-2 text-strong pointer-fine:hidden"
          style={{ background: "var(--surface-2)", minHeight: 44 }}
        >
          <TextSlot as="span" k="store.open_app" ghost />
        </div>
        <div className="mt-3 hidden w-full flex-col items-center gap-3 pointer-fine:flex sm:flex-row sm:justify-center">
          <TileSlot className="h-36 w-36" />
          <div className="flex max-w-xs flex-col gap-2 text-left">
            <TextSlot k="store.scan_qr" className="text-caption" />
            {/* Mağaza çipleri gerçeğinin sınıfı ve etiketiyle: Almancada ikisi
                bir satıra sığmıyor, ikinci satıra iniyor. */}
            <div className="flex flex-wrap gap-2">
              {["store.app_store", "store.google_play"].map((k) => (
                <span key={k} className="chip min-h-9 animate-pulse px-3 text-caption" style={{ background: "var(--surface-2)", borderColor: "transparent", minHeight: 36 }}>
                  <TextSlot as="span" k={k} ghost />
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Hesap satırı e-postayı taşıyor: uzunluğu veri, ortanca adres. */}
        <TextSlot k="store.same_account" v={{ account: filler(22) }} className="mt-3 text-caption" />
        {["paywall.price_note_store", "paywall.renew_note_web", "store.auto_refresh"].map((k) => (
          <TextSlot key={k} k={k} className="mt-1 text-caption" />
        ))}
      </section>

      {/* Kapsam kartı: premium satırları (onaylı), ayraç, ücretsiz satırları. */}
      <section className="mt-6">
        <TextSlot k="paywall.what_you_get" className="mb-2 text-micro uppercase tracking-eyebrow" />
        <div className="card p-4">
          {copy.premium.map((l) => (
            <div key={l.key} className="flex items-start gap-3 py-1.5">
              <TileSlot shape="full" className="mt-0.5 h-6 w-6" />
              <TextSlot as="span" k={l.key} v={l.params} className="text-body" />
            </div>
          ))}
          <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
            <TextSlot k="paywall.whats_free" className="mb-1.5 text-caption tracking-wide" />
            {copy.free.map((l) => (
              <div key={l.key} className="flex items-start gap-3 py-1.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0" />
                <TextSlot as="span" k={l.key} v={l.params} className="text-body" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İnce yazı: adil kullanım + içerik vaadi, iki paragraf. */}
      <div className="mt-4 space-y-1 text-caption leading-relaxed">
        <TextSlot k="plan.pro_fair_use" v={{ w: fair.walkRoundsPerDay, a: fair.aiPracticePerDay, c: DAILY_QUOTAS.chatTurns }} />
        <TextSlot k={exams ? "paywall.content_is_built_around_cefr_a1" : "paywall.content_is_built_around_cefr"} />
      </div>
    </LoadingRegion>
  );
}
