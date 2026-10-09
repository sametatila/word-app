import React, { useEffect, useState } from "react";
import { t, formatDay } from "../lib/i18n";
import { View, AppState, Platform, TextInput, ScrollView, Modal, Pressable, KeyboardAvoidingView, useWindowDimensions, type NativeSyntheticEvent, type NativeScrollEvent } from "react-native";
import { useLayout } from "../lib/useLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { PurchasesPackage } from "react-native-purchases";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { PrimaryButton } from "../ui/PrimaryButton";
import { Card } from "../ui/Card";
import { FlowActions } from "../ui/flow";
import { CheckIcon, PremiumIcon } from "../ui/icons";
import { SkeletonLine } from "../ui/Skeleton";
import { track } from "../lib/track";
import { haptic } from "../lib/haptics";
import { awaitProcessedPurchase, billingAvailable, getPackages, offerCodesAvailable, openManageSubscriptions, presentOfferCodeRedemption, purchase, purchaseGroupTrial, restore, trialEligibleProducts, type PurchaseOutcome } from "../lib/billing";
import { usePremiumStatus, refreshPremium, type PremiumStatus } from "../lib/premium";
import { api } from "../api/client";
import { openLegal } from "../lib/legal";
import { hasMockExams } from "../data/exams";
import { currentCourseId } from "../lib/courses";
import { useTheme, spacing, radii, softShadow, type Palette, ds } from "../theme";
import { useAuth } from "../lib/AuthContext";
import { IconLine } from "../ui/IconLine";

/**
 * Paywall — yeniden tasarım 2026-09-29 ("C3", Samet onayı): turuncu bantta ürün
 * vitrini, başlık, sınırları alt satırında dört madde, yan yana iki plan,
 * cayma satırı; altta sabit düğme, şart satırı ve bağlantılar. Tek ekran;
 * kısa ekranda gövde kayar, düğme yerinde kalır.
 *
 * MAĞAZA KURALLARI: fiyat, süre ve deneme yalnız mağazadan (PurchasesPackage);
 * faturalanan tutar düğmenin altında dönemiyle yazılı (App Store 3.1.2, Play
 * abonelik beyanı); "sınırsız" yok, sınırlar maddelerin altında ve panelden
 * geliyor; geri yükleme, şartlar ve gizlilik her dalda görünür.
 *
 * Web karşılığı `src/components/premium-paywall.tsx`; ikisi aynı anahtarları
 * ve aynı sayıları kullanıyor.
 */
const IOS = Platform.OS === "ios";

/**
 * KENDİ KODUMUZ iOS'TA YOK (Guideline 3.1.1): promo ve grup kodu özellik
 * kilidini uygulama içi satın alma dışında açıyor. iOS'ta "Kodun var mı?"
 * Apple'ın teklif kodu sayfasını açıyor (`presentOfferCodeRedemption`);
 * Android'de kendi kutumuz (`CodeSheet`) hem promo hem grup kodunu alıyor.
 */
const OWN_CODES = Platform.OS === "android";

function planLabel(pkg: PurchasesPackage): string {
  if (pkg.packageType === "ANNUAL") return t("paywall.yearly");
  if (pkg.packageType === "MONTHLY") return t("paywall.monthly");
  return pkg.product.title;
}

/**
 * Mağazanın bildirdiği ücretsiz deneme (giriş fiyatı 0) — yoksa deneme vaadi yok.
 *
 * `eligible`: iOS'ta denemeye uygun ürünler (`trialEligibleProducts`). Listede
 * olmayan ürün için deneme metni YOK — iOS `introPrice`ı uygun olmayana da
 * dolduruyor (IAP-6). `null` (Android) süzgeçsiz: Play yalnız uygun teklifi veriyor.
 */
function freeTrialOf(pkg: PurchasesPackage | undefined, eligible: Set<string> | null): string | null {
  const intro = pkg?.product.introPrice;
  if (!intro || intro.price !== 0) return null;
  if (eligible && !eligible.has(pkg.product.identifier)) return null;
  const n = intro.periodNumberOfUnits;
  const unit = intro.periodUnit;
  const key = unit === "DAY" ? "paywall.trial_days" : unit === "WEEK" ? "paywall.trial_weeks" : unit === "YEAR" ? "paywall.trial_years" : "paywall.trial_months";
  return t(key, { n });
}

type BillingPeriod = { unit: "year" | "month" | "week"; n: number };

/** Faturalama dönemi — önce mağazanın ISO 8601 süresinden, yoksa paket türünden. */
function billingPeriodOf(pkg: PurchasesPackage): BillingPeriod | null {
  const m = /^P(\d+)([YMWD])$/.exec(pkg.product.subscriptionPeriod ?? "");
  if (m) {
    const n = Number(m[1]);
    if (m[2] === "Y") return { unit: "year", n };
    if (m[2] === "M") return n % 12 === 0 ? { unit: "year", n: n / 12 } : { unit: "month", n };
    if (m[2] === "W") return { unit: "week", n };
    if (m[2] === "D" && n % 7 === 0) return { unit: "week", n: n / 7 };
  }
  switch (pkg.packageType) {
    case "ANNUAL": return { unit: "year", n: 1 };
    case "SIX_MONTH": return { unit: "month", n: 6 };
    case "THREE_MONTH": return { unit: "month", n: 3 };
    case "TWO_MONTH": return { unit: "month", n: 2 };
    case "MONTHLY": return { unit: "month", n: 1 };
    case "WEEKLY": return { unit: "week", n: 1 };
    default: return null;
  }
}

/* Anahtarlar DÜZ YAZILI: sözlük denetimi kodda geçen anahtarı arıyor. */
const TRIAL_THEN = { year: "paywall.trial_then_year", month: "paywall.trial_then_month", week: "paywall.trial_then_week", months: "paywall.trial_then_months", years: "paywall.trial_then_years", weeks: "paywall.trial_then_weeks" } as const;
const PRICE_PER = { year: "paywall.price_year", month: "paywall.price_month", week: "paywall.price_week", months: "paywall.price_months", years: "paywall.price_years", weeks: "paywall.price_weeks" } as const;

/**
 * Satın almadan önce görünen ücret: DÖNEMİYLE birlikte ("1 ay ücretsiz, sonra
 * yılda 1.199,99 ₺"). Apple denemenin süresini ve sonra faturalanacak tutarı,
 * Play fatura döngüsünü açıkça istiyor; çok birimli dönem de adlandırılıyor.
 */
function priceLine(pkg: PurchasesPackage, trial: string | null): string {
  const price = pkg.product.priceString;
  const p = billingPeriodOf(pkg);
  const kind = !p ? null : p.n === 1 ? p.unit : p.unit === "month" ? "months" : p.unit === "year" ? "years" : "weeks";
  const n = p?.n ?? 1;
  if (trial) return kind ? t(TRIAL_THEN[kind], { duration: trial, price, n }) : t("paywall.free_then", { duration: trial, price });
  return kind ? t(PRICE_PER[kind], { price, n }) : t("paywall.fiyat_donem", { price });
}

/**
 * Düğmenin altındaki şart satırı: ücret + yenileme + iptal (Samet, 2026-09-29:
 * "1 ay ücretsiz, sonra yılda X; otomatik yenilenir. Deneme bitmeden iptal
 * edersen ücret alınmaz."). iOS'ta Apple'ın kuralı gereği "en az 24 saat önce".
 */
function termsLine(pkg: PurchasesPackage, trial: string | null): string {
  const renew = trial
    ? t(IOS ? "paywall.renew_trial_appstore" : "paywall.renew_trial_play")
    : t(IOS ? "paywall.renew_plain_appstore" : "paywall.renew_plain_play");
  /* ABONELİĞİN ADI satın almadan önce (App Store 3.1.2: ad, süre, fiyat): kartlarda yalnız
     "Yıllık/Aylık" yazıyordu, "Lernomi Premium" yalnız abone olmuşun ekranındaydı. */
  return `${t("paywall.plan_title", { plan: planLabel(pkg) })}: ${priceLine(pkg, trial)}; ${renew}`;
}

/**
 * Yıllığın aylığa göre tasarrufu — mağazanın iki fiyatından. Para birimleri
 * farklıysa (olmamalı) ya da paketlerden biri yoksa rozet yok.
 */
function savingsPct(pkgs: PurchasesPackage[]): number {
  const y = pkgs.find((p) => p.packageType === "ANNUAL")?.product;
  const m = pkgs.find((p) => p.packageType === "MONTHLY")?.product;
  if (!y || !m || y.currencyCode !== m.currencyCode || m.price <= 0) return 0;
  const pct = Math.round((1 - y.price / (m.price * 12)) * 100);
  return pct >= 5 ? pct : 0;
}

/**
 * Vitrin — konuşma ve metin ÖĞRENİLEN dilde, düzeltmenin açıklaması ANADİLDE
 * (Samet, 2026-09-29). Web `premium-showcase` ile aynı anahtarlar ve sayılar.
 */
const SHOW = {
  de: { ask: "paywall.show1_ask.de", reply: "paywall.show1_reply.de", fix: "paywall.show1_fix.de", why: "paywall.show1_why.de", text: "paywall.show2_text.de", fix2: "paywall.show2_fix.de", why2: "paywall.show2_why.de" },
  en: { ask: "paywall.show1_ask.en", reply: "paywall.show1_reply.en", fix: "paywall.show1_fix.en", why: "paywall.show1_why.en", text: "paywall.show2_text.en", fix2: "paywall.show2_fix.en", why2: "paywall.show2_why.en" },
} as const;
const EXAM: [string, number][] = [["skills.reading", 18], ["skills.listening", 15], ["skills.writing", 14], ["skills.speaking", 16]];

/** Maddeler — sınırlar sunucunun yapılandırmasından (panelden değişince metin de değişir). */
function bulletsOf(status: PremiumStatus | null, exams: boolean): { title: string; cap?: string }[] {
  const fair = status?.limits.fairUse;
  const avatars = status?.limits.avatarSet ?? 0;
  return [
    { title: t("paywall.b_ai"), cap: t("paywall.b_ai_cap", { a: fair?.aiPracticePerDay ?? 30, c: fair?.chatTurnsPerDay ?? 300 }) },
    ...(exams ? [{ title: t("paywall.b_mock") }] : []),
    { title: t("paywall.b_walk"), cap: t("paywall.b_walk_cap", { n: fair?.walkRoundsPerDay ?? fair?.pocketWalksPerDay ?? 20 }) },
    ...(avatars > 0 ? [{ title: t("paywall.b_avatar"), cap: t("paywall.b_avatar_cap", { n: avatars }) }] : []),
  ];
}

export function PaywallScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const nav = useNavigation<{ goBack: () => void; navigate: (name: "Auth") => void }>();
  /*
    MİSAFİR SATIN ALAMIYOR (mağaza ön inceleme B24): abonelik hesaba bağlı;
    misafirde başka cihazda geri yüklenemez. Kapsam ve fiyat görünür, düğmenin
    yerinde hesap oluşturma çağrısı var.
  */
  const guest = Boolean(useAuth().user?.guest);
  const [guestRestore, setGuestRestore] = useState(false);
  const { compactHeight } = useLayout();
  const routeParams = useRoute<{ key: string; name: string; params?: { ref?: string; from?: "web"; group?: string } }>().params;
  const refResult = routeParams?.ref ?? "";
  const fromWeb = routeParams?.from === "web";
  /* Grup bağlantısıyla (`/g/<KOD>`) gelindiyse kod kutusu açık ve dolu gelir. */
  const [codeOpen, setCodeOpen] = useState(OWN_CODES && Boolean(routeParams?.group));
  const configured = billingAvailable();
  const { status, refresh } = usePremiumStatus();
  const exams = hasMockExams(currentCourseId());

  const refLine = ((): { ok: boolean; text: string } | null => {
    switch (refResult) {
      case "ok": return { ok: true, text: t("promo.referral_linked") };
      case "linked": return { ok: true, text: t("referral.linked_quiet") };
      case "pending": return { ok: true, text: t("referral.pending") };
      case "already": return { ok: false, text: t("referral.already_linked") };
      case "self": return { ok: false, text: t("promo.self") };
      case "unknown": return { ok: false, text: t("promo.not_found") };
      case "error": return { ok: false, text: t("promo.failed") };
      default: return null;
    }
  })();
  const refNotice = refLine ? (
    <Text
      accessibilityLiveRegion="polite"
      variant="caption"
      color={refLine.ok ? colors.successText : colors.textMuted}
      style={{ textAlign: "center", backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
    >
      {refLine.text}
    </Text>
  ) : null;

  /* `pkgs === null` yükleniyor; boş liste = mağaza satmıyor (anahtar var ama
     offering bu platform için ürün döndürmüyor ya da mağaza kesintide). */
  const [pkgs, setPkgs] = useState<PurchasesPackage[] | null>(null);
  const [trialOk, setTrialOk] = useState<Set<string> | null>(null);
  const storeOpen = configured && (pkgs === null || pkgs.length > 0);
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /* Hata DEĞİL bilgi: "satın alma alındı, açılıyor" / "onay bekliyor" (IAP-7). */
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    track("paywall_view", 0, fromWeb ? "web_link" : "mobile");
    if (!configured) { setPkgs([]); return; }
    let alive = true;
    void getPackages().then(async (p) => {
      const eligible = await trialEligibleProducts(p.map((x) => x.product.identifier));
      if (!alive) return;
      const sorted = [...p].sort((a, b) => (a.packageType === "ANNUAL" ? -1 : b.packageType === "ANNUAL" ? 1 : 0));
      setTrialOk(eligible);
      setPkgs(sorted);
      setSelected(sorted[0]?.identifier ?? null);
    });
    return () => { alive = false; };
  }, [configured, fromWeb]);

  const pkg = pkgs?.find((p) => p.identifier === selected);
  const trial = freeTrialOf(pkg, trialOk);

  /* Apple'ın teklif kodu sayfası uygulamanın ÜSTÜNDE açılıyor; yetki webhook'la
     geliyor, uygulama öne dönünce durum bir kez tazeleniyor. */
  async function redeemOfferCode() {
    const sub = AppState.addEventListener("change", (st) => {
      if (st !== "active") return;
      sub.remove();
      void refreshPremium().then(refresh);
    });
    await presentOfferCodeRedemption();
  }

  /** Satın almanın sonucu — normal satın alma ve grup denemesi ORTAK (IAP-7). */
  function settle(outcome: PurchaseOutcome, kind: string): void {
    if (outcome === "done") {
      haptic("correct");
      track("purchase_done", 0, kind);
      nav.goBack();
      return;
    }
    if (outcome === "cancelled") return;
    if (outcome === "pending") { setNotice(t("paywall.pending")); return; }
    if (outcome === "processing") {
      setNotice(t("paywall.processing"));
      void awaitProcessedPurchase().then((ok) => {
        if (!ok) return;
        haptic("correct");
        track("purchase_done", 0, kind);
        nav.goBack();
      });
      return;
    }
    setError(t("paywall.purchase_wasn_t_completed"));
  }

  async function start() {
    if (!pkg || busy) return;
    track("purchase_start", 0, pkg.packageType);
    setBusy(true);
    setError(null);
    setNotice(null);
    const outcome = await purchase(pkg);
    setBusy(false);
    settle(outcome, pkg.packageType);
  }

  async function doRestore() {
    if (busy) return;
    if (guest) { setGuestRestore(true); return; }
    setBusy(true);
    setError(null);
    const ok = await restore();
    setBusy(false);
    if (ok) nav.goBack();
    else setError(t("paywall.no_purchase_to_restore_on_this"));
  }

  const onCode = OWN_CODES
    ? () => setCodeOpen(true)
    : offerCodesAvailable()
      ? () => { void redeemOfferCode(); }
      : null;

  const link = (label: string, onPress: () => void, strong = false) => (
    <PressableScale key={label} onPress={onPress} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.xs + 2 }}>
      <Text variant="caption" color={strong ? colors.primaryText : colors.textMuted} style={strong ? { fontWeight: "700" } : { textDecorationLine: "underline" }}>{label}</Text>
    </PressableScale>
  );
  /*
    BAĞLANTI SATIRI HER DALDA: şartlar + gizlilik (Apple Schedule 2 §3.8(b),
    abonelik retlerinin en sık sebebi), abonelik yönetimi ve "Kodun var mı?".
    Satır sarıyor: en dar telefonda (320pt) kırpılmak yerine ikinci satıra iniyor.
  */
  const links = (
    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", columnGap: spacing.lg }}>
      {onCode && (!guest || codeOpen) ? link(t("promo.title"), onCode, true) : null}
      {link(t("auth.terms_of_use"), () => openLegal("terms"))}
      {link(t("auth.privacy_policy"), () => openLegal("privacy"))}
      {link(t("paywall.manage_subscription"), () => { void openManageSubscriptions(); })}
    </View>
  );
  const codeSheet = OWN_CODES ? (
    <CodeSheet
      visible={codeOpen}
      onClose={() => setCodeOpen(false)}
      colors={colors}
      pkg={pkg}
      initialGroup={routeParams?.group ?? ""}
      guest={guest}
      onAuth={() => { setCodeOpen(false); nav.navigate("Auth"); }}
      onRedeemed={() => { void refreshPremium().then(refresh); }}
      onOutcome={(o) => { setCodeOpen(false); settle(o, `group:${pkg?.packageType ?? ""}`); }}
    />
  ) : null;

  const maxW = 560;
  const bodyStyle = { width: "100%" as const, maxWidth: maxW, alignSelf: "center" as const, paddingHorizontal: spacing.xl + 4 };

  /**
   * Zaten premium: plan listesi yok (ikinci bir abonelik başlatabilir). Durum,
   * bitiş tarihi, bekleyen hediye ve kapsam; durum SUNUCUDAN, yani promo ya da
   * davetle premium olan da doğru görünür.
   */
  if (status?.premium) {
    /* Tarih ARAYÜZ dilinde (`dateLocale`), cihazın dilinde değil. */
    const until = status.until ? formatDay(status.until, { year: true, month: "long" }) : "";
    const line =
      status.source === "bonus"
        ? t("premiumstate.bonus_until", { date: until })
        : status.store?.state === "trial"
          ? t("premiumstate.trial_until", { date: until })
          : status.store?.canceled
            ? t("premiumstate.canceled_until", { date: until })
            : status.store?.state === "grace"
              ? t("premiumstate.grace")
              : t("premiumstate.active_until", { date: until });
    return (
      /* Bilgi ekranı: üstte X yok, dipte tek eylem birincil "Kapat" (öteki
         bilgi ekranlarıyla aynı, 2026-09-30). Geri tuşu ve kaydırma yığının. */
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm }}>
        <ScrollView contentContainerStyle={{ paddingBottom: spacing.lg }}>
          <View style={[bodyStyle, { gap: spacing.lg }]}>
            <View style={{ alignItems: "center", marginTop: spacing.sm }}>
              <View style={[{ width: ds(84), height: ds(84), borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
                <PremiumIcon color={colors.onPrimary} size={44} />
              </View>
              <Text accessibilityRole="header" variant="display" style={{ marginTop: spacing.md }}>{t("paywall.nomi_premium")}</Text>
              <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, textAlign: "center" }}>{line}</Text>
              {status.bonusDaysPending > 0 ? (
                <Text variant="caption" color={colors.successText} style={{ marginTop: spacing.xs, textAlign: "center" }}>
                  {t("premiumstate.bonus_pending", { n: status.bonusDaysPending })}
                </Text>
              ) : null}
            </View>
            {refNotice}
            <Card padded>
              <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{t("paywall.what_you_get")}</Text>
              <Bullets items={bulletsOf(status, exams)} colors={colors} />
            </Card>
            {links}
          </View>
        </ScrollView>
        <View style={{ width: "100%", maxWidth: maxW, alignSelf: "center", paddingHorizontal: spacing.xl + 4, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.md }}>
          <FlowActions primary={{ label: t("common.close"), onPress: () => nav.goBack() }} />
        </View>
        {codeSheet}
      </View>
    );
  }

  const bullets = bulletsOf(status ?? null, exams);
  const save = pkgs ? savingsPct(pkgs) : 0;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.lg }} showsVerticalScrollIndicator={false}>
        {/* BANT: geri yükle, vitrin. Üstte X YOK (2026-09-30, bilgi ekranlarının
            ortak kuralı): çıkış dipteki "Kapat", satın alma düğmesinin altında.
            Geri yükle sağda kalıyor; satır yüksekliği aynı, vitrin kaymıyor. */}
        <View style={{ backgroundColor: colors.primary, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, paddingTop: insets.top + spacing.sm, paddingBottom: spacing.md }}>
          <View style={{ width: "100%", maxWidth: maxW, alignSelf: "center", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", paddingHorizontal: spacing.md, minHeight: 44 }}>
            {/* GERİ YÜKLEME HER DALDA (App Store 3.1.1): mağaza bağlıyken, paket
                listesi boş olsa bile; misafirde giriş yoluna götürüyor. */}
            {configured || guest ? (
              <PressableScale onPress={doRestore} hitSlop={6} accessibilityRole="button" accessibilityLabel={t("paywall.restore_purchase")} style={{ height: 44, justifyContent: "center", paddingHorizontal: spacing.sm }}>
                <Text variant="bodyStrong" color={colors.onPrimary}>{t("paywall.restore_short")}</Text>
              </PressableScale>
            ) : null}
          </View>
          {compactHeight ? null : <Showcase width={Math.min(width, maxW)} colors={colors} exams={exams} />}
        </View>

        <View style={[bodyStyle, { paddingTop: spacing.lg, gap: spacing.md + 2 }]}>
          <Text accessibilityRole="header" variant="h1">{t("paywall.headline")}</Text>
          <Bullets items={bullets} colors={colors} />
          {refNotice}

          {!storeOpen ? (
            <View style={{ borderRadius: radii.lg, backgroundColor: colors.surface2, padding: spacing.lg, gap: 6 }}>
              <Text variant="bodyStrong">{t("paywall.store_not_open")}</Text>
              {/* iOS'ta metin koda yönlendirmiyor (3.1.1). */}
              <Text variant="caption" color={colors.textMuted}>{t(OWN_CODES ? "paywall.store_not_open_sub" : "paywall.store_not_open_sub_ios")}</Text>
            </View>
          ) : pkgs === null ? (
            <View style={{ flexDirection: "row", gap: spacing.sm + 2, paddingTop: spacing.xs }}>
              {[0, 1].map((i) => (
                <View key={i} style={{ flex: 1, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.md + 2, gap: spacing.xs }}>
                  <SkeletonLine variant="bodyStrong" width="50%" />
                  <SkeletonLine variant="h2" width="75%" />
                  <SkeletonLine variant="caption" width="60%" />
                </View>
              ))}
            </View>
          ) : (
            <>
            {/* Planların başlığı: aboneliğin adı (bkz. `termsLine`). */}
            <Text variant="bodyStrong" style={{ marginBottom: -spacing.xs }}>{t("paywall.nomi_premium")}</Text>
            <View accessibilityRole="radiogroup" accessibilityLabel={t("paywall.nomi_premium")} style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm + 2, paddingTop: spacing.xs + 2 }}>
              {pkgs.map((p) => {
                const active = selected === p.identifier;
                const annual = p.packageType === "ANNUAL";
                const sub = annual && p.product.pricePerMonthString
                  ? t("paywall.per_month_approx", { price: p.product.pricePerMonthString })
                  : p.packageType === "MONTHLY" ? t("paywall.billed_monthly") : priceLine(p, null);
                return (
                  <PressableScale
                    key={p.identifier}
                    onPress={() => setSelected(p.identifier)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={`${planLabel(p)}, ${priceLine(p, freeTrialOf(p, trialOk))}`}
                    /* Seçili hâl RENKLE: turuncu kenar, dolgu yok (2026-09-29 Samet: seçim B). */
                    style={[{ flexGrow: 1, flexBasis: "40%", borderRadius: radii.lg, borderWidth: 1, borderColor: active ? colors.primary : colors.border, backgroundColor: colors.surface, padding: spacing.md + 2, gap: 2 }]}
                  >
                    {annual && save > 0 ? (
                      <View style={{ position: "absolute", top: -10, left: spacing.md, backgroundColor: colors.success, borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: 1 }}>
                        <Text variant="micro" color={colors.onFill}>{t("paywall.save_pct", { n: save })}</Text>
                      </View>
                    ) : null}
                    <Text variant="bodyStrong">{planLabel(p)}</Text>
                    <Text variant="h2">{p.product.priceString}</Text>
                    <Text variant="caption" color={colors.textMuted}>{sub}</Text>
                  </PressableScale>
                );
              })}
            </View>
            </>
          )}

          {/* Cayma ve iade satırı (şartlar §7): satışı mağaza yapıyor, metin yolu söylüyor. */}
          <Text variant="micro" color={colors.textMuted} style={{ fontWeight: "500", letterSpacing: 0 }}>
            {t(IOS ? "paywall.withdrawal_appstore" : "paywall.withdrawal_play")}
          </Text>
          {/* Kısa ekranda misafir açıklaması kaydırılan alanda (aşağıdaki sabit alan dar). */}
          {guest && compactHeight ? <GuestPitch colors={colors} /> : null}
        </View>
      </ScrollView>

      <View style={{ width: "100%", maxWidth: maxW, alignSelf: "center", paddingHorizontal: spacing.xl + 4, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.sm, gap: spacing.xs + 2 }}>
        {error ? <Text accessibilityLiveRegion="assertive" variant="caption" color={colors.dangerText} style={{ textAlign: "center" }}>{error}</Text> : null}
        {notice ? <Text accessibilityLiveRegion="polite" variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>{notice}</Text> : null}
        {guest ? (
          <>
            {compactHeight ? null : <GuestPitch colors={colors} />}
            <PrimaryButton label={t("guest.create_account")} onPress={() => nav.navigate("Auth")} />
            {/* Misafirin geri yükleme yolu giriş yapmak (denetim S6): sessizce saklanmıyor. */}
            {guestRestore ? (
              <View style={{ alignItems: "center", gap: spacing.xs }}>
                <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>{t("guest.restore_body")}</Text>
                <PressableScale onPress={() => nav.navigate("Auth")} hitSlop={6} accessibilityRole="button" accessibilityLabel={t("auth.sign_in")} style={{ paddingVertical: spacing.xs }}>
                  <Text variant="bodyStrong" color={colors.primary}>{t("auth.sign_in")}</Text>
                </PressableScale>
              </View>
            ) : null}
          </>
        ) : storeOpen ? (
          <>
            <PrimaryButton label={trial ? t("paywall.start_free_trial") : t("paywall.subscribe")} onPress={start} disabled={!pkg} busy={busy} />
            {/* Abonelik politikası (Play ve App Store): süre, fiyat, yenileme ve iptal satın almadan önce görünür. */}
            <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", fontWeight: "500", letterSpacing: 0 }}>
              {pkg ? termsLine(pkg, trial) : " "}
            </Text>
          </>
        ) : null}
        <FlowActions close={() => nav.goBack()} />
        {links}
      </View>
      {codeSheet}
    </View>
  );
}

/* ─────────────────────────── paywall parçaları ─────────────────────────── */

function GuestPitch({ colors }: { colors: Palette }) {
  return (
    <View style={{ gap: spacing.xs }}>
      <Text variant="h3" style={{ textAlign: "center" }}>{t("guest.premium_title")}</Text>
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>{t("guest.premium_body")}</Text>
    </View>
  );
}

function Bullets({ items, colors }: { items: { title: string; cap?: string }[]; colors: Palette }) {
  return (
    <View style={{ gap: spacing.sm + 1 }}>
      {items.map((b) => (
        <View key={b.title} style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm + 2 }}>
          {/* İşaret METİN tonunda (`primaryText`): dolgu tonu zemin üstünde grafik eşiğinin altında kalıyordu. */}
          <IconLine variant="bodyStrong"><CheckIcon color={colors.primaryText} size={18} /></IconLine>
          <View style={{ flex: 1 }}>
            <Text variant="bodyStrong">{b.title}</Text>
            {b.cap ? <Text variant="caption" color={colors.textMuted} style={{ fontWeight: "500" }}>{b.cap}</Text> : null}
          </View>
        </View>
      ))}
    </View>
  );
}

/**
 * Vitrin — kaydırılan üç örnek (Konuşma adımı, yazma geri bildirimi, deneme
 * sınavı). Sayfa noktaları bandın İÇİNDE: bant yüksekliği içerikten geliyor,
 * sabit yükseklikte iki satıra inen balon noktaları dışarı taşırıyordu.
 */
function Showcase({ width, colors, exams }: { width: number; colors: Palette; exams: boolean }) {
  const [page, setPage] = useState(0);
  const course = currentCourseId() === "en" ? "en" : "de";
  const k = SHOW[course];
  const pages = exams ? 3 : 2;
  const onEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => setPage(Math.round(e.nativeEvent.contentOffset.x / width));
  const card = (children: React.ReactNode, key: number) => (
    <View key={key} style={{ width, paddingHorizontal: spacing.xl + 4 }}>
      <View style={[{ backgroundColor: colors.surface, borderRadius: radii.lg + 2, padding: spacing.md + 2, gap: spacing.sm }, softShadow(colors.primaryStrong, 14)]}>
        {children}
      </View>
    </View>
  );
  const label = (text: string) => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success }} />
      <Text variant="caption" color={colors.textMuted} style={{ fontWeight: "700" }}>{text}</Text>
    </View>
  );
  const fix = (a: string, b: string) => (
    <View style={{ flexDirection: "row", gap: spacing.sm, alignItems: "flex-start", backgroundColor: `${colors.success}1f`, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
      <IconLine variant="caption"><View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success }} /></IconLine>
      <Text variant="caption" style={{ flex: 1, fontWeight: "500" }}>
        <Text variant="caption" style={{ fontWeight: "800" }}>{a}</Text> <Text variant="caption" color={colors.textMuted} style={{ fontWeight: "500" }}>{b}</Text>
      </Text>
    </View>
  );
  const bubble = (text: string, right: boolean) => (
    <View style={{ alignSelf: right ? "flex-end" : "flex-start", maxWidth: "85%", backgroundColor: right ? colors.primarySoft : colors.surface2, borderRadius: radii.lg, borderBottomLeftRadius: right ? radii.lg : 4, borderBottomRightRadius: right ? 4 : radii.lg, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
      <Text variant="body" color={right ? colors.onPrimarySoft : colors.text}>{text}</Text>
    </View>
  );
  return (
    <View accessible accessibilityLabel={t("paywall.show_a11y")} style={{ marginTop: spacing.xs }}>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={onEnd} contentContainerStyle={{ paddingVertical: spacing.sm }}>
        {card(<>{label(t("paywall.show1_label"))}{bubble(t(k.ask), false)}{bubble(t(k.reply), true)}{fix(t(k.fix), t(k.why))}</>, 0)}
        {card(<>{label(t("paywall.show2_label"))}<View style={{ backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.md }}><Text variant="body">{t(k.text)}</Text></View>{fix(t(k.fix2), t(k.why2))}</>, 1)}
        {exams ? card(
          <>
            {label(t("paywall.show3_label"))}
            {EXAM.map(([key, score]) => (
              <View key={key} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <Text variant="caption" color={colors.textMuted} style={{ width: 84 }}>{t(key)}</Text>
                <View style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
                  <View style={{ width: `${(score / 20) * 100}%`, height: 8, borderRadius: 4, backgroundColor: colors.success }} />
                </View>
                <Text variant="caption" style={{ width: 40, textAlign: "right", fontWeight: "800" }}>{score}/20</Text>
              </View>
            ))}
          </>, 2) : null}
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 6, marginTop: spacing.xs }}>
        {Array.from({ length: pages }, (_, n) => (
          <View key={n} accessibilityLabel={n === page ? t("paywall.show_page", { n: n + 1 }) : undefined} style={{ width: n === page ? 18 : 6, height: 6, borderRadius: 3, backgroundColor: colors.onPrimary, opacity: n === page ? 1 : 0.5 }} />
        ))}
      </View>
    </View>
  );
}

/**
 * Sunucunun sebebi doğrudan anahtar adı; tanımadığımız sebep genel mesaja düşer.
 * `self` = kendi davet kodu (tekrar denemek hiçbir zaman işe yaramaz).
 */
const PROMO_ERRORS = ["not_found", "already", "used_up", "expired", "disabled", "rate_limited", "self", "store_trial"];
function promoErrorKey(reason: string | undefined): string {
  return PROMO_ERRORS.includes(reason ?? "") ? `promo.${reason}` : "promo.failed";
}

/** Grup kodu sebebi → sözlük anahtarı (ortak durumlar promo cümleleriyle). */
const GROUP_ERRORS: Record<string, string> = {
  not_found: "promo.not_found",
  disabled: "promo.disabled",
  expired: "promo.expired",
  used_up: "promo.used_up",
  already: "promo.already",
  rate_limited: "promo.rate_limited",
  trial_used: "grupkod.trial_used",
  wrong_kind: "grupkod.wrong_kind",
  already_subscribed: "grupkod.already_subscribed",
  account_required: "grupkod.guest",
};
const groupErrorKey = (reason: string | undefined): string => GROUP_ERRORS[reason ?? ""] ?? "promo.failed";

/**
 * "Kodun var mı?" — YALNIZ ANDROID (bkz. OWN_CODES). Tek kutu iki tür kodu alıyor:
 *
 *  - PROMO / DAVET kodu: `/api/premium/redeem` bozduruyor (gün ya da davet bağı).
 *  - GRUP kodu ("2 ay ücretsiz" mağaza denemesi): redeem `store_trial` diyor;
 *    kutu grup moduna geçiyor, grubu gösteriyor ve seçili planın şart satırını
 *    ("2 ay ücretsiz, sonra yılda X") düğmenin yanında söylüyor. Play abonelik
 *    beyanı denemenin bitince ne olacağının satın almadan ÖNCE okunmasını istiyor.
 *    Talep sunucuda (`/api/premium/trial-code`), satın alma etiketli teklifle.
 *
 * Eskiden paywall'da iki büyük kutu vardı (promo + grup) ve kodu olmayan
 * çoğunluğa "bilmediğim bir indirim var" dedirtiyordu; artık küçük bir bağlantı.
 */
function CodeSheet({
  visible,
  onClose,
  colors,
  pkg,
  initialGroup,
  guest,
  onAuth,
  onRedeemed,
  onOutcome,
}: {
  visible: boolean;
  onClose: () => void;
  colors: Palette;
  pkg: PurchasesPackage | undefined;
  initialGroup: string;
  guest: boolean;
  onAuth: () => void;
  onRedeemed: () => void;
  onOutcome: (o: PurchaseOutcome) => void;
}) {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState(initialGroup.toUpperCase());
  const [mode, setMode] = useState<"code" | "group">(initialGroup ? "group" : "code");
  const [group, setGroup] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const plan = pkg?.packageType === "ANNUAL" ? "yearly" : pkg?.packageType === "MONTHLY" ? "monthly" : null;

  /* Grup koduna geçince bir kez, hiçbir şey harcamadan doğrula: grup adı
     görünür, geçersiz kod baştan söylenir. */
  async function peek(c: string) {
    try {
      const r = await api<{ status?: string; group?: string | null }>(`/api/premium/trial-code?code=${encodeURIComponent(c)}`);
      if (r.status === "valid") setGroup(r.group ?? null);
      else setMsg({ ok: false, text: t(groupErrorKey(r.status)) });
    } catch { /* ön bakış yalnız bilgi */ }
  }
  useEffect(() => {
    if (initialGroup) void peek(initialGroup);
  }, [initialGroup]);

  async function apply() {
    if (!code.trim() || busy) return;
    setBusy(true);
    setMsg(null);
    try {
      const r = await api<{ ok?: boolean; kind?: string; result?: string; days?: number; error?: string }>("/api/premium/redeem", {
        method: "POST",
        body: JSON.stringify({ code }),
      });
      if (r.ok && r.kind === "referral") {
        setMsg({ ok: true, text: t(r.result === "linked" ? "referral.linked_quiet" : "promo.referral_linked") });
      } else if (r.ok) {
        setMsg({ ok: true, text: t("promo.success", { n: r.days ?? 0 }) });
        onRedeemed();
      } else if (r.error === "store_trial") {
        setMode("group");
        void peek(code);
      } else {
        setMsg({ ok: false, text: t(promoErrorKey(r.error)) });
      }
    } catch (e) {
      /* `api` HTTP hatasında sunucunun sebebini MESAJ olarak taşıyor (api/client). */
      const reason = (e as { message?: string } | null)?.message;
      if (reason === "store_trial") { setMode("group"); void peek(code); }
      else setMsg({ ok: false, text: t(promoErrorKey(reason)) });
    } finally {
      setBusy(false);
    }
  }

  async function begin() {
    if (!code.trim() || busy) return;
    if (!pkg || !plan) { setMsg({ ok: false, text: t("grupkod.pick_plan") }); return; }
    track("purchase_start", 0, `group:${pkg.packageType}`);
    setBusy(true);
    setMsg(null);
    try {
      const r = await api<{ ok?: boolean; offerTag?: string; error?: string }>("/api/premium/trial-code", {
        method: "POST",
        body: JSON.stringify({ code, platform: "android", plan }),
      });
      if (!r.ok || !r.offerTag) { setMsg({ ok: false, text: t(groupErrorKey(r.error)) }); return; }
      const outcome = await purchaseGroupTrial(pkg, r.offerTag);
      if (outcome === "no_offer") { setMsg({ ok: false, text: t("grupkod.no_offer") }); return; }
      onOutcome(outcome);
    } catch (e) {
      const reason = (e as { message?: string } | null)?.message;
      setMsg({ ok: false, text: t(groupErrorKey(reason)) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <Pressable accessibilityRole="button" accessibilityLabel={t("common.close")} onPress={onClose} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }} />
        <View accessibilityViewIsModal style={{ backgroundColor: colors.bg, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, padding: spacing.xl, paddingBottom: insets.bottom + spacing.xl, gap: spacing.md }}>
          <Text accessibilityRole="header" variant="h3">{t("promo.title")}</Text>
          {guest ? (
            <>
              <Text variant="caption" color={colors.textMuted}>{t("grupkod.guest")}</Text>
              <PrimaryButton size="md" label={t("guest.create_account")} onPress={onAuth} />
            </>
          ) : (
            <>
              {group ? <Text variant="caption" color={colors.successText}>{t("grupkod.group", { group })}</Text> : null}
              <View style={{ flexDirection: "row", gap: spacing.sm, alignItems: "center" }}>
                <TextInput
                  value={code}
                  onChangeText={(v) => { setCode(v.toUpperCase()); if (mode === "group") { setMode("code"); setGroup(null); } }}
                  placeholder={t("promo.placeholder")}
                  accessibilityLabel={t("promo.placeholder")}
                  placeholderTextColor={colors.textFaint}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  autoFocus={!initialGroup}
                  returnKeyType="done"
                  onSubmitEditing={() => { if (!busy && code.trim()) void (mode === "group" ? begin() : apply()); }}
                  style={{ flex: 1, backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: spacing.md, color: colors.text, letterSpacing: 2 }}
                />
                {mode === "code" ? <PrimaryButton size="md" label={t("promo.apply")} onPress={apply} disabled={!code.trim()} busy={busy} /> : null}
              </View>
              {mode === "group" ? (
                <>
                  {pkg ? (
                    <Text variant="micro" color={colors.textMuted} style={{ fontWeight: "500", letterSpacing: 0 }}>
                      {t("paywall.plan_title", { plan: planLabel(pkg) })}: {priceLine(pkg, t("paywall.trial_months", { n: 2 }))} · {t("grupkod.terms")}
                    </Text>
                  ) : null}
                  <PrimaryButton label={t("grupkod.start")} onPress={begin} disabled={!code.trim()} busy={busy} />
                </>
              ) : null}
            </>
          )}
          {/* HATA `assertive`, BAŞARI `polite` (web: role alert/status). */}
          {msg ? <Text accessibilityLiveRegion={msg.ok ? "polite" : "assertive"} variant="caption" color={msg.ok ? colors.successText : colors.dangerText}>{msg.text}</Text> : null}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
