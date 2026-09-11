"use client";

import { useEffect, useState } from "react";
import type { ReferralStats } from "@/lib/premium/referral-types";
import { supportsMockExams } from "@/lib/mock-exams";
import { useShell } from "@/components/app-shell";
import { track } from "@/lib/track";
import { useLang, useT } from "@/lib/i18n/client";
import { localeOf } from "@/lib/i18n/dict";
import { CrownIcon, CheckIcon } from "@/components/icons";
import type { CopyLine, PlanPrice } from "@/lib/premium/gates";

type Plans = { productMonthly: string; productYearly: string; trialDays: number };
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
/* Biçim tek yerde: `lib/premium/referral-types`. */
type Referral = ReferralStats | null;

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
  price,
  fairUse,
  referral,
  prefillCode = "",
}: {
  source?: string;
  signedIn: boolean;
  status: Status | null | undefined;
  copy: { free: CopyLine[]; premium: CopyLine[] };
  plans: Plans;
  /**
   * ZİYARETÇİNİN BÖLGESİNİN fiyatı — tek satır. Sayfa eskiden üç bölgeyi
   * (TR/EU/GLOBAL) yan yana listeliyordu: kullanıcı kendi para biriminin
   * hangisi olduğunu tahmin etmek zorunda kalıyor, ötekiler yalnız kıyas
   * malzemesi oluyordu. Bölge sunucuda, konum izni İSTEMEDEN bulunuyor
   * (bkz. lib/premium/region.ts). `null` = panelde hiç fiyat tanımlı değil.
   */
  price: PlanPrice | null;
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

  const lang = useLang();
  const line = (l: CopyLine) => t(l.key, l.params);
  /*
   * TARİH ARAYÜZ DİLİNDE, TARAYICININ DİLİNDE DEĞİL.
   *
   * Yerel `undefined` bırakılmıştı, yani tarih TARAYICININ dilinden
   * biçimleniyordu: arayüzü Türkçe olan ama tarayıcısı İngilizce olan
   * kullanıcı "September 11, 2026" görüyordu. Uygulamanın kuralı bunun tersi
   * ve tek yeri var (`lib/i18n/dict` `localeOf`); aynı hata Androidde de
   * vardı (`PaywallScreen`, orada yerel HİÇ verilmiyordu) ve ikisi birlikte
   * düzeltildi. Premium bitiş tarihi ödeme kararının dayanağı, yani en
   * okunması gereken tarih.
   */
  const date = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString(localeOf(lang), { day: "numeric", month: "long", year: "numeric" }) : "";

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
    <div className="mx-auto w-full max-w-3xl px-4 pb-12 pt-6">
      <header className="flex flex-col items-center text-center">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-card on-fill"
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
          <p className="mt-1 text-sm font-semibold" style={{ color: "var(--color-mint)" }}>
            {t("premiumstate.bonus_pending", { n: status.bonusDaysPending })}
          </p>
        )}
        {manageLine() && <p className="mt-1 text-xs muted">{manageLine()}</p>}
      </header>

      {!premium && (
        <>
          {/*
            KARAR ÖNCE. Fiyat sayfanın dibindeydi: kullanıcı iki özellik
            listesini, adil kullanım notunu ve içerik vaadini geçtikten sonra
            ne ödeyeceğini öğreniyordu. Artık başlıktan hemen sonra geliyor ve
            ardından tek bir yönlendirme var.
          */}
          {price && (
            <section className="mt-6">
              <div className="grid grid-cols-2 gap-3">
                <PlanCard label={t("paywall.monthly")} price={price.monthly} />
                <PlanCard label={t("paywall.yearly")} price={price.yearly} savePct={price.yearlySavePct} highlight />
              </div>
              {plans.trialDays > 0 && (
                <p className="muted mt-3 text-center text-xs">{t("paywall.trial_note", { days: plans.trialDays })}</p>
              )}
            </section>
          )}

          {/* Web'de satın alma yok — yönlendirme dürüstçe yazılı. */}
          <div className="brand-gradient mt-4 rounded-panel px-4 py-4 text-center on-fill">
            <p className="text-base font-extrabold">{t("paywall.upgrade_in_app")}</p>
            {/* Vitrin fiyatının bağlayıcı olmadığı burada yazıyor: App Store
                3.1.2 ve Play, fiyatın yanıltıcı olmamasını istiyor. */}
            <p className="mt-1 text-xs opacity-90">{t("paywall.price_note_store")}</p>
          </div>

          {/*
            KAPSAM TEK KART. "Premium'da neler var" ve "Ücretsizde ne var"
            iki ayrı kutuydu ve ikisi de aynı yeşil onay işaretini kullanıyordu:
            yan yana durduklarında hangisinin neyi anlattığı ayırt edilmiyordu.
            Aynı kartın iki bölümü oldular ve ücretsiz taraf sönük bir noktayla
            yazılıyor — onay işareti "bu da sende var" diyordu.
          */}
          <Section title={t("paywall.what_you_get")}>
            {copy.premium.map((l) => (
              <Row key={l.key} text={line(l)} tone="premium" />
            ))}
            <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
              <p className="muted mb-1.5 text-caption tracking-wide">{t("paywall.whats_free")}</p>
              {copy.free.map((l) => (
                <Row key={l.key} text={line(l)} tone="free" />
              ))}
            </div>
          </Section>

          {/*
            İNCE YAZI TEK PARAGRAF. Adil kullanım kendi kutusunda, içerik vaadi
            ayrı bir satırdaydı; ikisi de okunması gereken ama karar vermeyen
            metinler, yani kutu hak etmiyorlar. Adil kullanım AÇIKÇA yazılıyor:
            tavanı olan bir şeyi "sınırsız" diye sunmak iki mağazanın da beyan
            kuralına aykırı.
          */}
          <div className="muted mt-4 space-y-1 text-caption leading-relaxed">
            <p>
              <strong className="mr-1">{t("paywall.fair_use_title")}:</strong>
              {t("plan.pro_walk_cap", { n: fairUse.pocketWalksPerDay })} · {t("plan.pro_ai", { n: fairUse.aiPracticePerDay })}
            </p>
            {/* İçerik vaadi AYRI satır: adil kullanım tavanlarıyla aynı cümlede
                birleşince iki ayrı konu tek bir cümle gibi okunuyordu. */}
            <p>{t(supportsMockExams(course) ? "paywall.content_is_built_around_cefr_a1" : "paywall.content_is_built_around_cefr")}</p>
          </div>
        </>
      )}

      {signedIn && <PromoBox prefill={prefillCode} />}
      {signedIn && referral && <ReferralBox referral={referral} />}
    </div>
  );
}

/**
 * Bir plan kutusu. Yıllık VURGULU: indirim oranı orada ve kullanıcıyı oraya
 * yönlendiriyoruz (yıllığa geçiş nakit akışını öne çekiyor, iptal oranını
 * düşürüyor). Seçilebilir DEĞİL — webde satın alma yok ve seçilemeyecek bir
 * şeye tıklatmak, tıklamanın bir şey yapacağı sözünü vermek olurdu.
 */
function PlanCard({
  label,
  price,
  savePct = 0,
  highlight = false,
}: {
  label: string;
  price: string;
  savePct?: number;
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-panel border p-4 text-center"
      style={
        highlight
          ? { borderColor: "var(--color-brand)", background: "color-mix(in srgb, var(--color-brand-500) 8%, transparent)" }
          : { borderColor: "var(--border)", background: "var(--surface)" }
      }
    >
      <p className="muted text-caption tracking-wide">{label}</p>
      <p className="mt-1 text-xl font-extrabold">{price}</p>
      {savePct > 0 && (
        /* 500 değil 600: beyaz yazı 500 üstünde 3.55, 11 piksellik yazı için
           eşik 4.5. 600'de 5.30. */
        <span
          className="mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
          style={{ background: "var(--color-mint-600)" }}
        >
          −{savePct}%
        </span>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-sm font-bold uppercase tracking-wide muted">{title}</h2>
      <div className="rounded-card border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        {children}
      </div>
    </section>
  );
}

function Row({ text, tone }: { text: string; tone: "premium" | "free" }) {
  const premium = tone === "premium";
  return (
    <div className="flex items-start gap-3 py-1.5">
      {premium ? (
        <span
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
          style={{ background: "color-mix(in srgb, var(--color-brand-500) 14%, transparent)", color: "var(--color-brand)" }}
        >
          <CheckIcon size={14} />
        </span>
      ) : (
        /* Ücretsiz tarafta ONAY İŞARETİ YOK: aynı işaret iki listede de
           kullanılınca "premium" ile "zaten sende olan" ayırt edilmiyordu. */
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--text-faint)" }} />
      )}
      <span className={premium ? "text-[15px]" : "muted text-[15px]"}>{text}</span>
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
        // `self` = kendi davet kodu; sunucu bunu `attachReferral`dan gönderiyor
        // ve iki istemci de tanımıyordu, yani "daha sonra tekrar dene" diyordu.
        const known = ["not_found", "already", "used_up", "expired", "disabled", "rate_limited", "self"];
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
          className="rounded-xl px-4 py-2 text-sm font-bold on-fill disabled:opacity-60"
          style={{ background: "var(--color-brand)" }}
        >
          {t("promo.apply")}
        </button>
      </div>
      {/*
        İKİ YAN DA ANLAMSAL JETON. Başarı yanı sabit `mint-600` basamağıydı,
        yani temayla değişmiyordu: koyu temada #237a4c koyu kartın (#211a14)
        üstünde 3.24 veriyordu - küçük yazı eşiği 4.5. Hata yanı zaten anlamsal
        jetonla (`--color-danger`) yazılıydı ve doğru çalışıyordu, yani tek
        satırın iki yanı iki ayrı kurala uyuyordu. `--color-success` koyu
        temada mint-300'e geçiyor: 9.22.

        Ölü yedek de atıldı: `--color-danger` tanımlı (globals.css), yani
        `#dc2626` hiç çizilmiyordu ama jeton bir gün yeniden adlandırılsa
        sessizce paletin dışında bir kırmızıya düşerdi. Android iki yanı da
        tema jetonuyla yazıyor (`PaywallScreen`: successText / dangerText).
      */}
      {/* Sonuç duyuruluyor — bkz. `profile-form` içindeki not. Promo kodunun tutup tutmadığı ödeme kararının ta
          kendisi. */}
      {msg && (
        <p role="status" className="mt-2 text-sm font-semibold" style={{ color: msg.ok ? "var(--color-success)" : "var(--color-danger)" }}>
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
      <p className="text-sm">{t("referral.explain", { days: referral.rewardDays })}</p>
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
          ? { background: "color-mix(in srgb, var(--color-mint-500) 14%, transparent)", color: "var(--color-mint)" }
          : { background: "var(--surface-2)" }
      }
    >
      {text}
    </span>
  );
}
