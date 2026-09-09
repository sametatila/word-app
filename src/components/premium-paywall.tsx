"use client";

import { useEffect, useState } from "react";
import { supportsMockExams } from "@/lib/mock-exams";
import { useShell } from "@/components/app-shell";
import { track } from "@/lib/track";
import { useT } from "@/lib/i18n/client";
import { CrownIcon, CheckIcon } from "@/components/icons";
import type { CopyLine, PlanPrice } from "@/lib/premium/gates";

type Plans = { productMonthly: string; productYearly: string; trialDays: number; prices: PlanPrice[] };
type FairUse = { pocketWalksPerDay: number; aiPracticePerDay: number };
type Status = {
  premium: boolean;
  until: string | null;
  entSource: "store" | "bonus" | null;
  storeState: string | null;
  storePlatform: string | null;
  bonusDaysPending: number;
  bonusUntil: string | null;
};
type Referral = { code: string; invited: number; rewarded: number; earnedDays: number } | null;

/**
 * Premium sayfasının gövdesi — durum, kapsam, promo kodu ve davet.
 *
 * METİNLERİN TAMAMI ÇEVİRİ KATMANINDAN. Kapsam satırları sunucuda YAPILANDIRMADAN
 * üretiliyor ama cümle olarak değil, anahtar + parametre olarak geliyor
 * (`lib/premium/gates.ts` `describeLimits`). Böylece panelden bir sınır
 * değiştirildiğinde paywall'ın söylediği şey de değişiyor — beyan ile gerçek
 * ayrışamıyor — ve üç dil korunuyor.
 */
export function PremiumPaywall({
  source = "other",
  signedIn,
  status,
  copy,
  plans,
  fairUse,
  referral,
  prefillCode = "",
}: {
  source?: string;
  signedIn: boolean;
  status: Status | null | undefined;
  copy: { free: CopyLine[]; premium: CopyLine[] };
  plans: Plans;
  fairUse: FairUse;
  referral: Referral;
  prefillCode?: string;
}) {
  const t = useT();
  const { course } = useShell();
  const premium = !!status?.premium;

  useEffect(() => {
    if (!premium) track("paywall_view", 0, source);
  }, [source, premium]);

  const line = (l: CopyLine) => t(l.key, l.params);
  const date = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }) : "";

  /** Durum cümlesi — kaynağa ve mağaza durumuna göre değişiyor. */
  const stateLine = (): string => {
    if (!status || !status.premium) return t("premiumstate.free");
    if (status.entSource === "bonus") return t("premiumstate.bonus_until", { date: date(status.until) });
    if (status.storeState === "trial") return t("premiumstate.trial_until", { date: date(status.until) });
    if (status.storeState === "canceled") return t("premiumstate.canceled_until", { date: date(status.until) });
    if (status.storeState === "grace") return t("premiumstate.grace");
    return t("premiumstate.active_until", { date: date(status.until) });
  };

  const manageLine = (): string | null => {
    if (!status?.premium || status.entSource !== "store") return null;
    if (status.storePlatform === "ios") return t("premiumstate.manage_ios");
    if (status.storePlatform === "android") return t("premiumstate.manage_android");
    return t("premiumstate.manage_web");
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4 pb-12 pt-6">
      <header className="flex flex-col items-center text-center">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-3xl text-white"
          style={{ background: "var(--color-brand)", boxShadow: "0 12px 24px -10px var(--color-brand)" }}
        >
          <CrownIcon size={42} />
        </div>
        <h1 className="mt-4 text-3xl font-extrabold">{t("paywall.nomi_premium")}</h1>
        {/* Sloganı mobil başlığın hemen altında gösteriyor; web'de hiç yoktu.
            Premium'u olana pazarlama yapılmıyor. */}
        {!premium && <p className="muted mt-1 text-body">{t("paywall.unlimited_learning_full_exam")}</p>}
        <p className="mt-1 muted">{stateLine()}</p>
        {/* Bekleyen hediye her durumda gösteriliyor: kullanıcı kazandığı ama
            henüz başlamamış süreyi göremezse kazandığını bilmez. */}
        {!!status?.bonusDaysPending && (
          <p className="mt-1 text-sm font-semibold" style={{ color: "var(--color-mint-600)" }}>
            {t("premiumstate.bonus_pending", { n: status.bonusDaysPending })}
          </p>
        )}
        {manageLine() && <p className="mt-1 text-xs muted">{manageLine()}</p>}
      </header>

      {!premium && (
        <>
          <Section title={t("paywall.what_you_get")}>
            {copy.premium.map((l) => (
              <Row key={l.key} text={line(l)} tone="premium" />
            ))}
          </Section>

          <Section title={t("paywall.whats_free")}>
            {copy.free.map((l) => (
              <Row key={l.key} text={line(l)} tone="free" />
            ))}
          </Section>

          {/* Fiyatlar. Mobilde gerçek fiyat MAĞAZADAN gelir; buradakiler vitrin
              ve bunu söyleyen bir not var — App Store 3.1.2 ve Play, fiyatın
              yanıltıcı olmamasını istiyor. */}
          <Section title={`${t("paywall.monthly")} / ${t("paywall.yearly")}`}>
            <div className="flex flex-col gap-2">
              {plans.prices.map((p) => (
                <div key={p.region} className="flex items-center justify-between rounded-2xl border p-3" style={{ borderColor: "var(--border)" }}>
                  <span className="text-sm font-bold">{p.region}</span>
                  <span className="text-sm">
                    {p.monthly} · {p.yearly}
                    {p.yearlySavePct > 0 && (
                      <span className="ml-2 rounded-full px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: "var(--color-mint-500)" }}>
                        −{p.yearlySavePct}%
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs muted">{t("paywall.price_note_store")}</p>
            {plans.trialDays > 0 && <p className="mt-1 text-xs muted">{t("paywall.trial_note", { days: plans.trialDays })}</p>}
          </Section>

          {/* Adil kullanım AÇIKÇA yazılıyor: tavanı olan bir şeyi "sınırsız"
              diye sunmak iki mağazanın da beyan kuralına aykırı. */}
          <p className="mt-4 rounded-2xl border p-3 text-xs muted" style={{ borderColor: "var(--border)" }}>
            <strong className="mr-1">{t("paywall.fair_use_title")}:</strong>
            {t("plan.pro_walk_cap", { n: fairUse.pocketWalksPerDay })} · {t("plan.pro_ai", { n: fairUse.aiPracticePerDay })}
          </p>

          {/* İçerik vaadi — mobilde plan listesinin hemen altında. Sınav
              formatından yalnız o kursta gerçekten deneme sınavı varsa söz
              ediliyor; olmayan sınavın sözü verilmiyor. */}
          <p className="muted mt-3 text-center text-caption">
            {t(supportsMockExams(course) ? "paywall.content_is_built_around_cefr_a1" : "paywall.content_is_built_around_cefr")}
          </p>

          {/* Web'de satın alma yok — yönlendirme dürüstçe yazılı. */}
          <div className="brand-gradient mt-6 rounded-2xl px-4 py-4 text-center text-white">
            <p className="text-base font-extrabold">{t("paywall.upgrade_in_app")}</p>
          </div>
        </>
      )}

      {signedIn && <PromoBox prefill={prefillCode} />}
      {signedIn && referral && <ReferralBox referral={referral} />}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-sm font-bold uppercase tracking-wide muted">{title}</h2>
      <div className="rounded-3xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        {children}
      </div>
    </section>
  );
}

function Row({ text, tone }: { text: string; tone: "premium" | "free" }) {
  return (
    <div className="flex items-start gap-3 py-1.5">
      <span
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={
          tone === "premium"
            ? { background: "color-mix(in srgb, var(--color-brand) 18%, transparent)", color: "var(--color-brand)" }
            : { background: "color-mix(in srgb, var(--color-mint-500) 18%, transparent)", color: "var(--color-mint-600)" }
        }
      >
        <CheckIcon size={14} />
      </span>
      <span className="text-[15px]">{text}</span>
    </div>
  );
}

/** Promo kodu — panelden üretilen kodların bozdurulduğu yer. */
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
      const res = await fetch("/api/premium/redeem", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = (await res.json()) as { ok?: boolean; kind?: string; days?: number; error?: string };
      if (data.ok && data.kind === "referral") {
        // Davet kodu premium AÇMIYOR, yalnız bağ kuruyor — mesaj bunu söylemeli,
        // yoksa kullanıcı premium beklerken hiçbir şey açılmadığını görür.
        setMsg({ ok: true, text: t("promo.referral_linked") });
      } else if (data.ok) {
        setMsg({ ok: true, text: t("promo.success", { days: data.days ?? 0 }) });
        // Yetki değişti: sayfayı tazele ki durum ve kilitler güncellensin.
        setTimeout(() => window.location.reload(), 1200);
      } else {
        // Sunucunun sebebi doğrudan anahtar adı; bilinmeyen sebep genel mesaja düşer.
        const known = ["not_found", "already", "used_up", "expired", "disabled", "rate_limited"];
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
    <Section title={t("promo.title")}>
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder={t("promo.placeholder")}
          autoCapitalize="characters"
          spellCheck={false}
          className="min-w-0 flex-1 rounded-xl border px-3 py-2 font-mono text-sm tracking-widest"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
        />
        <button
          type="button"
          onClick={apply}
          disabled={busy || !code.trim()}
          className="rounded-xl px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
          style={{ background: "var(--color-brand)" }}
        >
          {t("promo.apply")}
        </button>
      </div>
      {msg && (
        <p className="mt-2 text-sm font-semibold" style={{ color: msg.ok ? "var(--color-mint-600)" : "var(--color-danger, #dc2626)" }}>
          {msg.text}
        </p>
      )}
    </Section>
  );
}

/** Davet — kod, bağlantı ve kazanım özeti. */
function ReferralBox({ referral }: { referral: NonNullable<Referral> }) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/premium?code=${referral.code}` : "";

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* pano yoksa kullanıcı kodu elle kopyalar — kod ekranda duruyor */
    }
  }

  return (
    <Section title={t("referral.title")}>
      <p className="text-sm">{t("referral.explain", { days: 7 })}</p>
      <p className="mt-1 text-xs muted">{t("referral.reward_note")}</p>

      <div className="mt-3 flex items-center gap-2">
        <code
          className="flex-1 rounded-xl border px-3 py-2 text-center font-mono text-lg font-bold tracking-[0.3em]"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
        >
          {referral.code}
        </code>
        <button
          type="button"
          onClick={copy}
          className="rounded-xl px-4 py-2 text-sm font-bold"
          style={{ background: "var(--surface-2)" }}
        >
          {copied ? t("referral.copied") : t("referral.copy_link")}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {referral.invited === 0 ? (
          <span className="muted">{t("referral.none_yet")}</span>
        ) : (
          <>
            <Chip text={t("referral.invited", { n: referral.invited })} />
            <Chip text={t("referral.rewarded", { n: referral.rewarded })} />
            {referral.earnedDays > 0 && <Chip text={t("referral.earned", { n: referral.earnedDays })} tone="good" />}
          </>
        )}
      </div>
    </Section>
  );
}

function Chip({ text, tone }: { text: string; tone?: "good" }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 font-semibold"
      style={
        tone === "good"
          ? { background: "color-mix(in srgb, var(--color-mint-500) 18%, transparent)", color: "var(--color-mint-600)" }
          : { background: "var(--surface-2)" }
      }
    >
      {text}
    </span>
  );
}
