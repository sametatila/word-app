"use client";

import Link from "next/link";
import { Group, Row } from "@/components/settings-section";
import { PremiumIcon } from "@/components/icons";
import { useShell } from "@/components/app-shell";
import { useLang, useT } from "@/lib/i18n/client";
import { formatDay } from "@/lib/i18n/dict";
import { supportsMockExams } from "@/lib/mock-exams";
import { premiumManageKey, premiumStateKey, type PremiumStatusView } from "@/lib/premium/state-copy";

/**
 * AYARLAR › ABONELİK — planın özeti (2026-09-29 Samet: web ayarlar masaüstü
 * düzeni).
 *
 * Premium sayfasının tamamı (kapak, iki paket, mağaza QR'ı, kapsam listesi,
 * promo kodu, davet) bir ayarlar panelinde pazarlama sayfası gibi duruyordu:
 * sol menünün yanında 1500 piksellik bir satış akışı. Ayarlar'da sorulan tek
 * şey "planım ne, ne zaman bitiyor, nereden yönetirim". Panel bunu söylüyor
 * ve ayrıntıya `/premium` götürüyor (yükseltme, promo, davet orada).
 *
 * Durum cümlesi Premium sayfasıyla aynı kaynaktan (`lib/premium/state-copy`).
 * Mobilde karşılığı ayrı bir ekran (`PaywallScreen`, satın alma orada); web'de
 * satın alma yok, özet + bağlantı yeterli.
 */
export function SubscriptionSummary({ status }: { status: PremiumStatusView | null }) {
  const t = useT();
  const lang = useLang();
  const { course } = useShell();
  const premium = !!status?.premium;
  const state = premiumStateKey(status);
  /* Tarih arayüz dilinde (bkz. `premium-paywall` `date`). */
  const date = status?.until
    ? formatDay(status.until, lang, { year: true, month: "long" })
    : "";
  const manage = premiumManageKey(status);
  return (
    <Group>
      <Row>
        <div className="flex items-center gap-3">
          {/* Premium sayfasının kapak karosunun küçüğü: dolu marka zemini. */}
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile"
            style={{ background: "var(--brand-fill)", color: "var(--on-brand)" }}
          >
            <PremiumIcon size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-strong">{t(premium ? "settings.plan_premium" : "settings.plan_free")}</p>
            {/* Ücretsizde durum cümlesi ("Ücretsiz hesap") başlığı tekrarlıyor:
                yerine Premium'un tek cümlelik kapsamı (Premium sayfasının sloganı). */}
            <p className="muted mt-0.5 text-caption leading-snug">
              {premium
                ? t(state.key, state.dated ? { date } : undefined)
                : t(supportsMockExams(course) ? "paywall.pitch_exams" : "paywall.pitch")}
            </p>
          </div>
        </div>
        {status?.bonusDaysPending ? (
          <p className="mt-3 text-caption" style={{ color: "var(--color-mint)" }}>
            {t("premiumstate.bonus_pending", { n: status.bonusDaysPending })}
          </p>
        ) : null}
        {manage ? <p className="muted mt-3 text-caption">{t(manage)}</p> : null}
      </Row>
      <Row>
        <Link
          href="/premium?from=settings"
          prefetch={false}
          className={`btn flex w-full items-center justify-center px-5 py-3 ${premium ? "" : "btn-primary"}`}
        >
          {t(premium ? "paywall.manage_subscription" : "profile.go_premium")}
        </Link>
      </Row>
    </Group>
  );
}
