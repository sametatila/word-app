"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { supportsMockExams } from "@/lib/mock-exams";
import { useCourse } from "@/components/app-shell";
import { track } from "@/lib/track";
import { useLang, useT } from "@/lib/i18n/client";
import { formatDay } from "@/lib/i18n/dict";
import { CheckIcon, PremiumIcon } from "@/components/icons";
import type { FreeLimits, PlanPrice } from "@/lib/premium/gates";
import { PremiumStoreCta } from "@/components/premium-store-cta";
import { PremiumShowcase } from "@/components/premium-showcase";
import { BackButton } from "@/components/page-back";
import type { StoreLinks, WebPlatform } from "@/lib/store-link";
import { premiumManageKey, premiumStateKey, type PremiumStatusView } from "@/lib/premium/state-copy";
import { IconLine } from "@/components/icon-line";

type FairUse = { walkRoundsPerDay: number; aiPracticePerDay: number; chatTurnsPerDay: number };

/**
 * Premium sayfası — ürün vitrini, dört madde, plan ve mağaza (yeniden tasarım
 * 2026-09-29, "C3"; mobil `PaywallScreen` ile aynı dil, web daha fazlasını
 * gösteriyor: karşılaştırma tablosu, deneme çizelgesi, sık sorulanlar).
 *
 * METİNLERİN TAMAMI ÇEVİRİ KATMANINDAN, SAYILARIN TAMAMI YAPILANDIRMADAN.
 * Maddelerin altındaki sınırlar, tablo hücreleri ve adil kullanım notu panelin
 * değerleriyle kuruluyor (`premiumConfig`): panelden bir sınır değişince
 * sayfanın söylediği de değişiyor, beyan gerçekle ayrışamıyor (App Store
 * 3.1.2, Play abonelik beyanı). "Sınırsız" yazılmıyor.
 *
 * WEB SATMIYOR: planlar seçilebilir ama yalnız şart satırını ve çizelgeyi
 * değiştiriyor; satın alma uygulamada (`PremiumStoreCta`).
 */
export function PremiumPaywall({
  source = "other",
  signedIn,
  status,
  plans,
  price,
  free,
  fairUse,
  avatarCount,
  prefillCode = "",
  refResult = "",
  storeCta,
}: {
  source?: string;
  signedIn: boolean;
  status: PremiumStatusView | null | undefined;
  plans: { trialDays: number };
  /**
   * ZİYARETÇİNİN BÖLGESİNİN fiyatı — tek satır (bkz. lib/premium/region.ts).
   * `null` = panelde hiç fiyat tanımlı değil.
   */
  price: PlanPrice | null;
  free: FreeLimits;
  fairUse: FairUse;
  /** Premium avatar setindeki parça sayısı (`avatarPremiumSet`, panelden değişebilir). */
  avatarCount: number;
  prefillCode?: string;
  /** `/r/<kod>` davet bağlantısının sonucu (`?ref=`). */
  refResult?: string;
  storeCta: { platform: WebPlatform; stores: StoreLinks; qrSvg: string | null; account: string | null; soonNotice: boolean };
}) {
  const t = useT();
  const lang = useLang();
  const course = useCourse();
  const premium = !!status?.premium;
  const exams = supportsMockExams(course);
  /* Kod kutusu davet bağlantısıyla gelindiyse (`?code=`) açık geliyor. */
  const [codeOpen, setCodeOpen] = useState(!!prefillCode);
  const [yearly, setYearly] = useState(true);

  useEffect(() => {
    if (!premium) track("paywall_view", 0, source);
  }, [source, premium]);

  /* Tarih ARAYÜZ dilinde, tarayıcının dilinde değil (`localeOf`). */
  const date = (iso: string | null) =>
    iso ? formatDay(iso, lang, { year: true, month: "long" }) : "";
  const state = premiumStateKey(status);
  const stateLine = t(state.key, state.dated ? { date: date(status?.until ?? null) } : undefined);
  const manageKey = premiumManageKey(status);

  const refNotice = refNoticeOf(refResult, t);

  /* Maddeler — mobil ile aynı dört madde, sınırlar alt satırda. */
  const bullets: { title: string; cap?: string }[] = [
    { title: t("paywall.b_ai"), cap: t("paywall.b_ai_cap", { a: fairUse.aiPracticePerDay, c: fairUse.chatTurnsPerDay }) },
    ...(exams ? [{ title: t("paywall.b_mock") }] : []),
    { title: t("paywall.b_walk"), cap: t("paywall.b_walk_cap", { n: fairUse.walkRoundsPerDay }) },
    ...(avatarCount > 0 ? [{ title: t("paywall.b_avatar"), cap: t("paywall.b_avatar_cap", { n: avatarCount }) }] : []),
  ];

  const codeLink = signedIn ? (
    <button
      type="button"
      onClick={() => setCodeOpen((v) => !v)}
      aria-expanded={codeOpen}
      data-panel="premium-code"
      className="text-strong"
      style={{ color: "var(--color-brand)" }}
    >
      {t("promo.title")}
    </button>
  ) : null;

  if (premium) {
    return (
      <div className="mx-auto w-full max-w-3xl pb-12">
        <BackButton fallback="/profile" />
        <header className="mt-2 flex flex-col items-center text-center">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-card"
            style={{ background: "var(--brand-fill)", color: "var(--on-brand)", boxShadow: "0 12px 24px -10px var(--brand-fill)" }}
          >
            <PremiumIcon size={42} />
          </div>
          <h1 className="mt-4 text-display">{t("paywall.nomi_premium")}</h1>
          <p className="muted mt-1">{stateLine}</p>
          {/* Bekleyen hediye her durumda: kazandığı ama başlamamış süreyi görmeli. */}
          {!!status?.bonusDaysPending && (
            <p className="mt-1 text-strong" style={{ color: "var(--color-mint)" }}>
              {t("premiumstate.bonus_pending", { n: status.bonusDaysPending })}
            </p>
          )}
          {manageKey && <p className="muted mt-1 text-caption">{t(manageKey)}</p>}
        </header>
        {refNotice && <Notice {...refNotice} />}
        <section className="card mt-6 p-4">
          <h2 className="muted mb-2 text-caption font-bold">{t("paywall.what_you_get")}</h2>
          <Bullets items={bullets} />
        </section>
        <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-caption">
          {codeLink}
          <Link href="/profile/settings/subscription" className="muted underline">{t("paywall.manage_subscription")}</Link>
        </div>
        {signedIn && codeOpen && <PromoBox prefill={prefillCode} />}
      </div>
    );
  }

  const trialLabel =
    plans.trialDays <= 0 ? null : plans.trialDays >= 28 && plans.trialDays <= 31 ? t("paywall.trial_months", { n: 1 }) : t("paywall.trial_days", { n: plans.trialDays });
  const shown = price ? (yearly ? price.yearly : price.monthly) : null;
  /* ABONELİĞİN ADI şart satırında (App Store 3.1.2; mobil `PaywallScreen` `termsLine` aynı). */
  const planTitle = t("paywall.plan_title", { plan: t(yearly ? "paywall.yearly" : "paywall.monthly") });
  const terms = shown
    ? planTitle + ": " + (trialLabel
      ? `${t(yearly ? "paywall.trial_then_year" : "paywall.trial_then_month", { duration: trialLabel, price: shown })}; ${t("paywall.renew_trial_store")}`
      : `${t(yearly ? "paywall.price_year" : "paywall.price_month", { price: shown })}. ${t("paywall.renew_note_web")}`)
    : null;

  return (
    /* Yan dolgu kabuktan (`AppShell` main `px-4`); burada ikinci kez yok. */
    <div className="mx-auto w-full max-w-6xl pb-12">
      <BackButton fallback="/profile" />
      {refNotice && <Notice {...refNotice} />}

      {/*
        SIRA TELEFONDA: vitrin ve maddeler → plan ve satın alma → tablo ve SSS.
        Geniş ekranda satın alma sağ sütunda yapışık duruyor, tablo solda
        maddelerin altında. Satın alma bloğu uzun tablonun ARKASINDA kalmasın
        diye sol sütun iki parça (üst, alt) ve sağ sütun ikisinin boyunca.
      */}
      <div className="mt-3 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:grid-rows-[auto_1fr]">
        <div className="flex min-w-0 flex-col gap-8 lg:col-start-1">
          <div className="rounded-card px-4 py-6 sm:px-8" style={{ background: "var(--brand-fill)" }}>
            <PremiumShowcase course={course} withExam={exams} />
          </div>

          <section className="flex flex-col gap-4">
            <h1 className="text-display" style={{ textWrap: "balance" }}>{t("paywall.headline")}</h1>
            <Bullets items={bullets} columns />
          </section>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="card flex flex-col gap-4 p-5">
            {price && <h2 className="text-strong">{t("paywall.nomi_premium")}</h2>}
            {price && (
              <div role="radiogroup" aria-label={t("paywall.nomi_premium")} className="-mt-2 grid grid-cols-2 gap-2.5 pt-2">
                <PlanCard
                  selected={yearly}
                  onSelect={() => setYearly(true)}
                  label={t("paywall.yearly")}
                  price={price.yearly}
                  sub={perMonth(price.yearly) ? t("paywall.per_month_approx", { price: perMonth(price.yearly)! }) : ""}
                  badge={price.yearlySavePct > 0 ? t("paywall.save_pct", { n: price.yearlySavePct }) : null}
                />
                <PlanCard selected={!yearly} onSelect={() => setYearly(false)} label={t("paywall.monthly")} price={price.monthly} sub={t("paywall.billed_monthly")} badge={null} />
              </div>
            )}

            {trialLabel && shown && (
              <ol className="flex flex-col gap-2 text-caption">
                <Step dot="var(--brand-fill)" title={t("paywallw.tl_today")} text={t("paywallw.tl_today_d")} />
                <Step dot="var(--brand-fill)" faded title={t("paywallw.tl_remind")} text={t("paywallw.tl_remind_d")} />
                <Step
                  dot="var(--text-faint)"
                  title={plans.trialDays >= 28 && plans.trialDays <= 31 ? t("paywallw.tl_end_month") : t("paywallw.tl_end_days", { n: plans.trialDays })}
                  text={t(yearly ? "paywallw.tl_end_y" : "paywallw.tl_end_m", { price: shown })}
                />
              </ol>
            )}

            <PremiumStoreCta {...storeCta} source={source} />

            {terms && <p className="muted text-center text-caption">{terms} {t("paywall.price_note_store")}</p>}
            {/* Cayma ve iade satırı (şartlar §7). Satışı mağaza yapıyor; metin yolu söylüyor. */}
            <p className="muted text-center text-micro font-normal">{t("paywallw.withdrawal")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-caption">
            {codeLink}
            <Link href="/profile/settings/subscription" className="muted underline">{t("paywall.manage_subscription")}</Link>
            <Link href="/terms" className="muted underline">{t("auth.terms_of_use")}</Link>
            <Link href="/privacy" className="muted underline">{t("auth.privacy_policy")}</Link>
          </div>
          {signedIn && codeOpen && <PromoBox prefill={prefillCode} />}

          <section className="flex flex-col gap-2">
            <h2 className="text-h3">{t("paywallw.faq_title")}</h2>
            <div className="card divide-y p-0" style={{ borderColor: "var(--hairline)" }}>
              {(
                [
                  ["paywallw.faq1_q", "paywallw.faq1_a"],
                  ["paywallw.faq2_q", "paywallw.faq2_a"],
                  ["paywallw.faq3_q", "paywallw.faq3_a"],
                ] as const
              ).map(([q, a]) => (
                <div key={q} className="flex flex-col gap-1 px-4 py-3" style={{ borderColor: "var(--hairline)" }}>
                  <h3 className="text-strong">{t(q)}</h3>
                  <p className="muted text-caption">{t(a)}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <div className="flex min-w-0 flex-col gap-4 lg:col-start-1">
          <CompareTable free={free} exams={exams} avatarCount={avatarCount} />
          <div className="muted flex flex-col gap-1 text-caption leading-relaxed">
            {free.streakBonus > 0 && free.streakStep > 0 && <p>{t("plan.free_streak_ai", { d: free.streakStep, n: free.streakBonus, m: free.mockStreakBonus })}</p>}
            <p>{t("plan.pro_fair_use", { w: fairUse.walkRoundsPerDay, a: fairUse.aiPracticePerDay, c: fairUse.chatTurnsPerDay })}</p>
            <p>{t(exams ? "paywall.content_is_built_around_cefr_a1" : "paywall.content_is_built_around_cefr")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Yıllık fiyatın aylık karşılığı ("1.199,99 ₺" → "99,99 ₺").
 *
 * Panelin fiyat dizgisinden hesaplanıyor: sayı kısmı ayrıştırılıyor (nokta
 * binlik, virgül ondalık — paneldeki bütün fiyatlar böyle yazılı), 12'ye
 * bölünüp KURUŞA AŞAĞI yuvarlanıyor (yukarı yuvarlamak tasarrufu olduğundan
 * büyük gösterirdi) ve aynı biçimle geri yazılıyor. Ayrıştırılamayan dizgide
 * satır çizilmiyor.
 */
function perMonth(yearly: string): string | null {
  const m = /(\d{1,3}(?:\.\d{3})*|\d+)(?:,(\d{1,2}))?/.exec(yearly);
  if (!m) return null;
  const value = Number(m[1].replace(/\./g, "")) + (m[2] ? Number(m[2].padEnd(2, "0")) / 100 : 0);
  if (!Number.isFinite(value) || value <= 0) return null;
  const cents = Math.floor((value / 12) * 100 + 1e-6);
  const whole = Math.floor(cents / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const frac = String(cents % 100).padStart(2, "0");
  return yearly.replace(m[0], `${whole},${frac}`);
}

function refNoticeOf(refResult: string, t: (k: string) => string): { ok: boolean; text: string } | null {
  /* Davet bağlantısının sonucu. Cümlelerin çoğu promo kutusunda yazılı ve
     aynı şeyi söylüyor; yalnız "zaten davetlisin" kendi anahtarında. */
  switch (refResult) {
    case "ok":
      return { ok: true, text: t("promo.referral_linked") };
    case "linked":
      return { ok: true, text: t("referral.linked_quiet") };
    case "already":
      return { ok: false, text: t("referral.already_linked") };
    case "self":
      return { ok: false, text: t("promo.self") };
    case "unknown":
      return { ok: false, text: t("promo.not_found") };
    case "error":
      return { ok: false, text: t("promo.failed") };
    default:
      return null;
  }
}

function Notice({ ok, text }: { ok: boolean; text: string }) {
  /* `role="status"`: kullanıcı bunu istemedi, bağlantıya dokundu ve sayfa kendiliğinden söylüyor. */
  return (
    <p
      role="status"
      className="mt-4 rounded-panel px-4 py-3 text-center text-body"
      style={{ background: "var(--surface-2)", color: ok ? "var(--color-mint)" : "var(--text-muted)" }}
    >
      {text}
    </p>
  );
}

function Bullets({ items, columns = false }: { items: { title: string; cap?: string }[]; columns?: boolean }) {
  return (
    <ul className={columns ? "grid gap-x-7 gap-y-3.5 sm:grid-cols-2" : "flex flex-col gap-3"}>
      {items.map((b) => (
        <li key={b.title} className="flex items-start gap-2.5">
          <IconLine className="text-strong" style={{ color: "var(--brand-fill)" }}>
            <CheckIcon size={20} />
          </IconLine>
          <span className="flex min-w-0 flex-col">
            <span className="text-strong">{b.title}</span>
            {b.cap && <span className="muted text-caption">{b.cap}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Ücretsiz ve Premium tablosu — hücreler panelin değerlerinden.
 *
 * Ücretsiz taraftaki hak TABAN (seviye başına); seriyle açılan ek hak altındaki
 * notta. Deneme sınavı satırı yalnız sınavı olan kursta.
 */
function CompareTable({ free, exams, avatarCount }: { free: FreeLimits; exams: boolean; avatarCount: number }) {
  const t = useT();
  const rows: { label: string; free: string | true | null; premium: string | true }[] = [
    { label: t("paywallw.row_core"), free: true, premium: true },
    { label: t("paywallw.row_path"), free: t("paywallw.per_level_pair", { a: free.conversationsPerLevel, b: free.pathWritingPerLevel }), premium: t("paywallw.all") },
    { label: t("paywallw.row_skills"), free: t("paywallw.per_level_pair", { a: free.speakingSkills, b: free.writingSkills }), premium: t("paywallw.all") },
    ...(exams ? [{ label: t("paywallw.row_mock"), free: t("paywallw.per_level", { n: free.mockExamsPerLevel }), premium: t("paywallw.all") }] : []),
    {
      label: t("paywallw.row_walk"),
      free: free.walkRoundsPerDay > 0 ? t("paywallw.walk_free", { n: free.walkRoundsPerDay }) : null,
      premium: t("paywallw.walk_premium"),
    },
    ...(avatarCount > 0 ? [{ label: t("paywall.b_avatar"), free: null, premium: t("paywallw.items", { n: avatarCount }) }] : []),
  ];
  const cell = (v: string | true | null, strong: boolean) =>
    v === true ? (
      <span aria-label="✓" style={{ color: "var(--color-mint)" }} className="inline-flex justify-center">
        <CheckIcon size={18} />
      </span>
    ) : v === null ? (
      <span className="faint">—</span>
    ) : (
      <span className={strong ? "text-strong" : "muted"}>{v}</span>
    );
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-h2">{t("paywallw.table_title")}</h2>
      {/* Büyük harf dönüşümü YOK: Türkçe yerelde "PREMİUM" basıyordu (marka adı
          noktalı İ ile). Telefonda da sığıyor: sütunlar dar, hücreler sarıyor. */}
      <div className="overflow-x-auto">
        <table className="card w-full border-separate border-spacing-0 overflow-hidden p-0 text-body">
          <thead>
            <tr className="muted text-caption">
              <th className="px-3 py-2.5 text-left font-bold sm:px-4" />
              <th className="w-24 px-2 py-2.5 text-center font-bold sm:w-36">{t("paywallw.col_free")}</th>
              <th className="w-24 px-2 py-2.5 text-center font-bold sm:w-36" style={{ color: "var(--color-brand)" }}>{t("paywallw.col_premium")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row" className="border-t px-3 py-3 text-left font-normal sm:px-4" style={{ borderColor: "var(--hairline)" }}>{r.label}</th>
                <td className="border-t px-2 py-3 text-center text-caption" style={{ borderColor: "var(--hairline)", textWrap: "balance" }}>{cell(r.free, false)}</td>
                <td className="border-t px-2 py-3 text-center" style={{ borderColor: "var(--hairline)", textWrap: "balance" }}>{cell(r.premium, true)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PlanCard({
  selected,
  onSelect,
  label,
  price,
  sub,
  badge,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  price: string;
  sub: string;
  badge: string | null;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className="relative flex flex-col items-start gap-0.5 rounded-panel p-3.5 text-left"
      /* Seçili hâl RENKLE: turuncu kenar, dolgu yok (mobil ile aynı; 2026-09-29 Samet: seçim B). */
      style={{ background: "var(--surface)", border: `1px solid ${selected ? "var(--brand-fill)" : "var(--border)"}` }}
    >
      {badge && (
        /* 600 basamağı: beyaz yazı 500 üstünde 3.55, 11 piksel için eşik 4.5. */
        <span className="absolute -top-2.5 left-3 rounded-full px-2 py-px text-micro" style={{ background: "var(--color-mint)", color: "var(--on-fill)" }}>
          {badge}
        </span>
      )}
      <span className="text-strong">{label}</span>
      <span className="text-h2 tabular-nums">{price}</span>
      <span className="muted text-caption">{sub}</span>
    </button>
  );
}

function Step({ dot, title, text, faded = false }: { dot: string; title: string; text: string; faded?: boolean }) {
  return (
    <li className="flex items-start gap-2.5">
      <IconLine>
        <span className="h-2 w-2 rounded-full" style={{ background: dot, opacity: faded ? 0.5 : 1 }} />
      </IconLine>
      <span>
        <b>{title}</b> <span className="muted">{text}</span>
      </span>
    </li>
  );
}

/**
 * Kod kutusu — "Kodun var mı?" bağlantısıyla açılıyor.
 *
 * Premium'u satın alma kararının yanında büyük bir kod kutusu durmuyor:
 * kutu, kodu olmayan çoğunluğa "benim bilmediğim bir indirim var" dedirtiyordu.
 * Bağlantı küçük, kutu dokununca açılıyor. Bulunamayan kod DAVET kodu olabilir:
 * uç ikisini ayırıyor (`api/premium/redeem`).
 */
function PromoBox({ prefill }: { prefill: string }) {
  const t = useT();
  const [code, setCode] = useState(prefill);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function apply() {
    if (!code.trim() || busy) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await apiFetch("/api/premium/redeem", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = (await res.json()) as { ok?: boolean; kind?: string; result?: string; days?: number; error?: string };
      if (data.ok && data.kind === "referral") {
        /* Davet kodu premium AÇMIYOR — bağı kuruyor; istek gerçekten gittiyse onu söylüyoruz. */
        setMsg({ ok: true, text: t(data.result === "linked" ? "referral.linked_quiet" : "promo.referral_linked") });
      } else if (data.ok) {
        setMsg({ ok: true, text: t("promo.success", { n: data.days ?? 0 }) });
        // Yetki değişti: sayfayı tazele ki durum ve kilitler güncellensin.
        setTimeout(() => window.location.reload(), 1200);
      } else {
        /* Sunucunun sebebi doğrudan anahtar adı; `store_trial` = grup kodu (mobilde bozdurulur). */
        const known = ["not_found", "already", "used_up", "expired", "disabled", "rate_limited", "self", "store_trial"];
        const key = known.includes(data.error ?? "") ? `promo.${data.error}` : "promo.failed";
        setMsg({ ok: false, text: t(key) });
      }
    } catch {
      setMsg({ ok: false, text: t("promo.failed") });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card p-4">
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder={t("promo.placeholder")}
          aria-label={t("promo.placeholder")}
          autoCapitalize="characters"
          spellCheck={false}
          autoFocus={!prefill}
          /* Enter kodu uyguluyor (Android `onSubmitEditing` ile aynı). */
          enterKeyHint="done"
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            if (!busy && code.trim()) apply();
          }}
          className="min-w-0 flex-1 rounded-tile border px-3 py-2 font-mono text-body tracking-widest"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
        />
        <button
          type="button"
          onClick={apply}
          disabled={busy || !code.trim()}
          className="rounded-panel px-4 py-2 text-strong disabled:opacity-60"
          style={{ background: "var(--brand-fill)", color: "var(--on-brand)" }}
        >
          {t("promo.apply")}
        </button>
      </div>
      {/* HATA `alert`, BAŞARI `status` (ekran okuyucu başarısız kodu hemen duysun). */}
      {msg && (
        <p role={msg.ok ? "status" : "alert"} className="mt-2 text-strong" style={{ color: msg.ok ? "var(--color-success)" : "var(--color-danger)" }}>
          {msg.text}
        </p>
      )}
    </div>
  );
}
