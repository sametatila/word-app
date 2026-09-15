"use client";

import Link from "next/link";
import { track } from "@/lib/track";
import { whyLabel, type Why } from "@/lib/why";
import { CharDiff } from "@/components/feedback/diff-text";
import { useLang, useT } from "@/lib/i18n/client";

/**
 * "Neden" satırı (plan WP-13/61): [hata etiketi] [gerekçe] [Kural ↗].
 *
 * Değerlendirme kartında (`assessment-card`) ve örnek sayfasında çiziliyor.
 * Tur sonuç katmanı (`games/round-sheet`) artık bunu kullanmıyor: orada
 * "Neden" etiketli bir satır, harf farkı ise cevabın kendi satırında — yalnız
 * `RuleLink` ortak. Tek satır, küçük yazı, taşarsa sarar.
 *
 * "Anladım" düğmesi yok: otomatik ilerleme korunuyor; bağlantıya dokunmak
 * `feedback_why_opened` olayı üretiyor — kaç kişinin gerekçeyi gerçekten
 * kurcaladığı KPI'da izleniyor.
 */
export function FeedbackLine({ why, compact = false }: { why: Why; compact?: boolean }) {
  const lang = useLang();
  return (
    <span className={`${compact ? "text-caption" : "text-body"} block leading-snug opacity-90`}>
      <span
        className="mr-1.5 inline-block rounded-chip px-1.5 py-px text-micro uppercase tracking-eyebrow"
        style={{ background: "color-mix(in srgb, currentColor 14%, transparent)" }}
      >
        {whyLabel(why.type, lang)}
      </span>
      {why.diff ? (
        <>
          <CharDiff diff={why.diff} /> — {why.text}
        </>
      ) : (
        why.text
      )}
      <RuleLink why={why} />
    </span>
  );
}

/**
 * "Kural ↗" bağlantısı — gerekçenin dilbilgisi sayfasındaki tablosu.
 *
 * Ayrı dışa aktarılıyor çünkü tur sonuç katmanı (`games/round-sheet`) "Neden"
 * satırını kendi düzeniyle çiziyor (etiket + gerekçe, harf farkı cevap
 * satırında) ama bağlantıyı ve olayını aynı kalıpla istiyor.
 */
export function RuleLink({ why }: { why: Why }) {
  const t = useT();
  if (!why.href) return null;
  return (
    <Link
      href={why.href}
      onClick={() => track("feedback_why_opened", 0, why.type)}
      className="ml-1.5 whitespace-nowrap font-semibold underline decoration-dotted underline-offset-2"
    >
      {t("why.rule_link")}
    </Link>
  );
}
