import React, { useEffect, useState } from "react";
import { t, dateLocale } from "../lib/i18n";
import { View, ActivityIndicator, AppState, Linking, Platform, TextInput } from "react-native";
import { KeyboardAwareScroll } from "../ui/KeyboardAwareScroll";
import { useLayout } from "../lib/useLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { PurchasesPackage } from "react-native-purchases";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, CheckIcon, CrownIcon, ShareIcon } from "../ui/icons";
import { SkeletonLine, SkeletonTile } from "../ui/Skeleton";
import { track } from "../lib/track";
import { haptic } from "../lib/haptics";
import { awaitProcessedPurchase, billingAvailable, getPackages, offerCodesAvailable, presentOfferCodeRedemption, purchase, purchaseGroupTrial, restore, trialEligibleProducts, type PurchaseOutcome } from "../lib/billing";
import { usePremiumStatus, refreshPremium } from "../lib/premium";
import { inviteLink, shareInvite } from "../lib/share";
import { api } from "../api/client";
import { openLegal } from "../lib/legal";
import { hasMockExams } from "../data/exams";
import { currentCourseId } from "../lib/courses";
import { useTheme, spacing, radii, softShadow, type Palette, ds } from "../theme";
import { useAuth } from "../lib/AuthContext";

/**
 * Paywall — YALNIZ mağaza entegrasyonu canlıyken (RevenueCat anahtarı) anlamlı; canlı
 * değilken hiçbir giriş noktası buraya gelmez (Profil bandı ve sınav kilidi gizli) ve
 * ekran açılsa bile satın alma vaadi vermez. Play ve App Store abonelik politikaları aynı
 * şeyi istiyor: fiyat, süre ve deneme yalnız mağazadan (PurchasesPackage); sabit fiyat,
 * uydurma avantaj ("reklamsız"), gizli geri yükleme yok. Yalnız gerçekten kilitli olan
 * şey listelenir.
 */
/** "Aboneliği yönet" — abonelik hangi mağazadan alındıysa oranın abonelik ekranı. */
const SUBSCRIPTIONS_URL = Platform.OS === "ios"
  ? "https://apps.apple.com/account/subscriptions"
  : "https://play.google.com/store/account/subscriptions";

function planLabel(pkg: PurchasesPackage): string {
  if (pkg.packageType === "ANNUAL") return t("paywall.yearly");
  if (pkg.packageType === "MONTHLY") return t("paywall.monthly");
  return pkg.product.title;
}

/**
 * KENDİ PROMO KODUMUZ iOS'TA YOK. Guideline 3.1.1 özellik kilidini uygulama içi
 * satın alma dışında bir mekanizmayla (lisans anahtarı, kod) açmayı yasaklıyor ve
 * paywall incelemede mutlaka açılan ekran. iOS'ta kodun meşru karşılığı Apple'ın
 * teklif kodları (`presentOfferCodeRedemption`). Android ve web'de kutu kalıyor.
 */
const OWN_PROMO_CODES = Platform.OS !== "ios";

/**
 * GRUP KODU ("2 ay ücretsiz" mağaza denemesi) — YALNIZ ANDROID.
 *
 * Aynı 3.1.1 gerekçesi, daha da kesin: grup kodu bir aboneliğin teklifini
 * AÇIYOR, yani tam olarak "kendi kodunla kilit açma". iOS'ta ne kutu ne metin
 * ne de webdeki `/g/` sayfasına bağlantı var (yönlendirme de 3.1.1 ve
 * 3.1.3 kapsamında): iPhone kullanıcısı gruptaki bağlantıyı Safari'de açıyor
 * ve oradan Apple'ın KENDİ teklif kodu sayfasına gidiyor. iOS'ta uygulamada
 * kalan tek kod yolu Apple'ın bozdurma sayfası (`presentOfferCodeRedemption`).
 */
const GROUP_CODES = Platform.OS === "android";

/**
 * Mağazanın bildirdiği ücretsiz deneme (giriş fiyatı 0) — yoksa deneme vaadi yok.
 *
 * Süre TEKİL/ÇOĞUL anahtarla kuruluyor: "1" + "months" birleştirmesi İngilizcede
 * "1 months", Almancada "1 Monate" basıyordu. Yıllık birim de eksikti ve aya
 * düşüyordu.
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

/**
 * Faturalama dönemi — önce mağazanın ISO 8601 süresinden (`P1Y`, `P1M`, `P3M`,
 * `P1W`), yoksa paket türünden. Bilinmiyorsa `null` ve satır dönemsiz kalıyor
 * (ör. ömür boyu ürün).
 */
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

/**
 * Satın almadan önce görünen ücret satırı: DÖNEMİYLE birlikte.
 *
 * "1 ay ücretsiz, sonra 1.199,99 ₺" yazıyordu; dönem yalnız plan satırındaydı.
 * Apple denemenin süresini ve bittikten sonra faturalanacak tutarı, Play fatura
 * döngüsünü açıkça istiyor — satırın kendisi eksiksiz okunmalı: "1 ay ücretsiz,
 * sonra yılda 1.199,99 ₺". Cümle dilden dile farklı dizildiği için dönem ayrı
 * bir sözcük değil, her dönem kendi cümlesi.
 */
/* Anahtarlar DÜZ YAZILI: sözlük denetimi kodda geçen anahtarı arıyor ve
   `paywall.price_${…}` gibi kurulmuş bir ad onu ölü sanardı. */
const TRIAL_THEN = { year: "paywall.trial_then_year", month: "paywall.trial_then_month", week: "paywall.trial_then_week", months: "paywall.trial_then_months", years: "paywall.trial_then_years", weeks: "paywall.trial_then_weeks" } as const;
const PRICE_PER = { year: "paywall.price_year", month: "paywall.price_month", week: "paywall.price_week", months: "paywall.price_months", years: "paywall.price_years", weeks: "paywall.price_weeks" } as const;

function priceLine(pkg: PurchasesPackage, trial: string | null): string {
  const price = pkg.product.priceString;
  const p = billingPeriodOf(pkg);
  /* ÇOK BİRİMLİ DÖNEM DE ADLANDIRILIYOR. Eskiden yalnız `n === 1` ve çok aylık
     durum karşılanıyordu; `P2Y` ya da `P2W` gibi bir ürün `null`a düşüp
     DÖNEMSİZ fiyat satırına iniyordu ("7 gün ücretsiz, sonra 99,99 ₺") —
     App Store ve Play dönem bildirimini şart koşuyor. Bugünkü katalogda böyle
     bir ürün yok; yarın eklenirse satır sessizce eksik beyan olurdu. */
  const kind = !p ? null : p.n === 1 ? p.unit : p.unit === "month" ? "months" : p.unit === "year" ? "years" : "weeks";
  const n = p?.n ?? 1;
  if (trial) return kind ? t(TRIAL_THEN[kind], { duration: trial, price, n }) : t("paywall.free_then", { duration: trial, price });
  return kind ? t(PRICE_PER[kind], { price, n }) : t("paywall.fiyat_donem", { price });
}

export function PaywallScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void; navigate: (name: "Auth") => void }>();
  /*
    MİSAFİR SATIN ALAMIYOR (mağaza ön inceleme B24). Premium iPhone, iPad,
    Android ve web'de aynı hesapla çalışan bir abonelik: misafir kimliğiyle
    alınsaydı başka cihazda geri yüklenemez, kimlik hesaba birleşince de
    yenilemeleri sahipsiz kalırdı (RevenueCat misafirde hesap kimliğine
    eşlenmiyor, bkz. AuthContext). Kapsam, sınırlar ve fiyatlar misafire de
    görünüyor; satın alma çubuğunun yerinde hesap oluşturma çağrısı var.
    Promosyon kodu ve davet de hesap istiyor.
  */
  const guest = Boolean(useAuth().user?.guest);
  const { compactHeight } = useLayout();
  const guestPitch = (
    <View style={{ gap: spacing.sm, marginTop: compactHeight ? spacing.lg : 0 }}>
      <Text variant="h3" style={{ textAlign: "center" }}>{t("guest.premium_title")}</Text>
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>{t("guest.premium_body")}</Text>
    </View>
  );
  /*
    DAVET BAĞLANTISININ SONUCU. Bağ `/r/<KOD>`a dokunulduğunda kuruluyor ve
    kullanıcı hiçbir şey yazmıyor — sessiz bir başarı ile sessiz bir
    başarısızlık ona aynı görünürdü. Web `/premium?ref=…` ile aynı durumlar ve
    aynı cümleler.
  */
  const routeParams = useRoute<{ key: string; name: string; params?: { ref?: string; from?: "web"; group?: string } }>().params;
  const refResult = routeParams?.ref ?? "";
  const fromWeb = routeParams?.from === "web";
  /*
    `configured` = anahtar var mı; `storeOpen` = gerçekten satılacak bir şey var mı.

    İkisi eskiden aynıydı ve arada sessiz bir boşluk kalıyordu: anahtar dolu ama
    offering o platform için ürün döndürmüyorsa ekran plansız ve düğmesi sönük
    bir iskelet olarak kalıyordu — kullanıcı neden satın alamadığını hiçbir
    yerden öğrenemiyordu. Android anahtarı Play ürünleri açılmadan girildiğinde
    tam olarak bu oluyor, ama aynı şey bozuk bir offering ya da mağaza
    kesintisinde de oluyor. Paket listesi BOŞ dönerse artık "mağaza henüz açık
    değil" metnine düşülüyor: sebebi ne olursa olsun söylenen şey doğru.

    `pkgs === null` yükleniyor demek, boş demek değil — o durumda iskelet kalıyor.
  */
  const configured = billingAvailable();
  // Durum SUNUCUDAN: kapsam metinleri, sınırlar, davet kodu ve "zaten premium
  // miyim" sorusunun cevabı. Mağaza SDK'sı yalnız fiyat ve satın alma için.
  const { status, refresh } = usePremiumStatus();

  /*
    Cümlelerin çoğu promo kutusunda baştan beri yazılı ve aynı şeyi söylüyor
    ("kendi kodun", "böyle bir kod yok", "uygulanamadı"): ikinci kez yazmak iki
    metnin zamanla ayrışması demekti. Web `premium-paywall` de aynı eşlemeyi
    yapıyor.
  */
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
      style={{ textAlign: "center", marginBottom: spacing.lg, backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
    >
      {refLine.text}
    </Text>
  ) : null;
  const [pkgs, setPkgs] = useState<PurchasesPackage[] | null>(null);
  /* iOS'ta denemeye uygun ürünler; paketlerle BİRLİKTE yazılıyor ki uygunluk
     gelmeden deneme metni bir an bile görünmesin. Android'de null (süzgeç yok). */
  const [trialOk, setTrialOk] = useState<Set<string> | null>(null);
  const storeOpen = configured && (pkgs === null || pkgs.length > 0);
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /* Hata DEĞİL bilgi: "satın alma alındı, açılıyor" / "onay bekliyor". Kırmızı
     hata satırıyla aynı yerde ama nötr renkte (IAP-7). */
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    /* Webden yönlendirilen görüntüleme ayrı etiketle: web → uygulama hunisi
       (`store_redirect` → `paywall_view:web_link` → `purchase_done`) ancak
       böyle ölçülebiliyor. */
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
    /* `fromWeb` ekran açılışında sabit (rota parametresi); görüntüleme ekran başına bir kez. */
  }, [configured, fromWeb]);

  const pkg = pkgs?.find((p) => p.identifier === selected);
  const trial = freeTrialOf(pkg, trialOk);

  /* Apple'ın teklif kodu sayfası uygulamanın ÜSTÜNDE açılıyor ve sözü sayfa
     gösterilince çözülüyor. Bozdurulan kodun yetkisi webhook'la sunucuya
     geliyor; sayfa kapanıp uygulama öne döndüğünde durum bir kez tazeleniyor. */
  async function redeemOfferCode() {
    const sub = AppState.addEventListener("change", (st) => {
      if (st !== "active") return;
      sub.remove();
      void refreshPremium().then(refresh);
    });
    await presentOfferCodeRedemption();
  }

  /**
   * Satın almanın sonucu — normal satın alma ve grup denemesi ORTAK (IAP-7).
   *
   * İptal SESSİZ. `processing`: mağaza aldı, sunucu henüz görmedi — kullanıcıya
   * "alındı, açılıyor" deniyor ve beklemeye arka planda devam ediliyor; yetki
   * gelince ekran kendiliğinden kapanıyor. `pending`: ödeme onay bekliyor
   * (Aile Paylaşımı, bankanın ek doğrulaması); hata değil.
   */
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
    setBusy(true);
    setError(null);
    const ok = await restore();
    setBusy(false);
    if (ok) nav.goBack();
    else setError(t("paywall.no_purchase_to_restore_on_this"));
  }

  const close = (
    <View style={{ alignItems: "flex-end", paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg }}>
      <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityRole="button" accessibilityLabel={t("common.close")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
        <XIcon color={colors.textMuted} size={22} />
      </PressableScale>
    </View>
  );

  /**
   * Zaten premium: plan listesi gösterilmiyor.
   *
   * Ödemiş bir kullanıcıya satın alma ekranı çizmek hem anlamsız hem riskli —
   * ikinci bir abonelik başlatabilir. Bunun yerine durumu, bitiş tarihini ve
   * bekleyen hediye süresini gösteriyoruz. Durum SUNUCUDAN geldiği için promo
   * kodu ya da davet ödülüyle premium olan kullanıcı da burada doğru görünüyor;
   * mağazaya sorulsaydı "abonelik yok" derdi.
   */
  if (status?.premium) {
    /* TARİH ARAYÜZ DİLİNDE: yerel hiç verilmiyordu, yani tarih CİHAZIN
       dilinden biçimleniyordu. Arayüzü Türkçe seçmiş ama telefonu İngilizce
       olan kullanıcı "September 11, 2026" görüyordu. Sözlüğün kendi yereli
       var (`lib/i18n` `dateLocale`) ve webde de aynı hata duruyordu. */
    const until = status.until ? new Date(status.until).toLocaleDateString(dateLocale(), { day: "numeric", month: "long", year: "numeric" }) : "";
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
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        {close}
        {/*
        KLAVYE ACIKKEN ILK DOKUNUS DUGMEYE GITMELI.
        `keyboardShouldPersistTaps` verilmemişti: promo kodu yazan kullanıcı
        "Uygula"ya bastığında ilk dokunuş yalnız klavyeyi kapatıyor, kodu
        uygulamak için ikinci kez basmak gerekiyordu. On iki kaydırılabilir
        yüzeyin on ikisi bunu veriyor, bu ekran tek istisnaydı.
      */}
      <KeyboardAwareScroll automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xl }}>
          <View style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.lg }}>
            <View style={[{ width: ds(84), height: ds(84), borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
              <CrownIcon color={colors.onPrimary} size={44} />
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

          <Section title={t("paywall.what_you_get")} colors={colors}>
            {(status.copy.premium ?? []).map((l) => (
              <Bullet key={l.key} text={t(l.key, l.params)} colors={colors} tone="premium" />
            ))}
          </Section>

          {OWN_PROMO_CODES ? <PromoBox colors={colors} onRedeemed={refresh} /> : null}
          {status.referral ? <ReferralBox colors={colors} referral={status.referral} /> : null}

          <PressableScale onPress={() => Linking.openURL(SUBSCRIPTIONS_URL).catch(() => {})} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.md, alignItems: "center" }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>
              {t(Platform.OS === "ios" ? "premiumstate.manage_ios" : "premiumstate.manage_android")}
            </Text>
          </PressableScale>
        </KeyboardAwareScroll>
      </View>
    );
  }

  /*
   * MAĞAZA KAPALIYKEN DE TAM SAYFA.
   *
   * Burada eskiden erken bir dönüş vardı: "Premium satışta değil · tüm
   * özellikler şimdilik ücretsiz". İki sorunu vardı. Birincisi YANLIŞTI —
   * ekran kapalı yürüyüş ücretsiz katmanda yok (yalnız premium),
   * yani uygulama her şeyin ücretsiz olduğunu söylerken sunucu o yolu
   * reddediyordu. İkincisi çıkmaz sokaktı: promo kodu kutusu da davet kutusu da
   * o dalın arkasında kalıyordu, oysa ikisi mağazadan BAĞIMSIZ çalışıyor ve
   * bugün premium olmanın tek yolu onlar.
   *
   * Artık sayfa her zaman tam: kapsam, sınırlar, davet ve promo kodu görünüyor.
   * Koşullu olan yalnız SATIN ALMA bloğu — mağaza bağlanınca planlar ve düğme
   * kendiliğinden geliyor, başka hiçbir yere dokunmak gerekmiyor.
   */
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {close}
      <KeyboardAwareScroll contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.xl }}>
          <View style={[{ width: ds(84), height: ds(84), borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
            <CrownIcon color={colors.onPrimary} size={44} />
          </View>
          <Text accessibilityRole="header" variant="display" style={{ marginTop: spacing.md }}>{t("paywall.nomi_premium")}</Text>
          {/* "SINIRSIZ" YOK. Premium'un adil kullanım tavanı var ve aşağıda
              yazılı; tavanı olan bir aboneliği "sınırsız" diye sunmak App Store
              3.1.2(a) ve Play'in aldatıcı teklif kuralına takılır, şartlar §7a
              ile de çelişir. Cümle gerçek kapsamı sayıyor; deneme sınavı yalnız
              sınavı OLAN kursta anılıyor. */}
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, textAlign: "center" }}>{t(hasMockExams(currentCourseId()) ? "paywall.pitch_exams" : "paywall.pitch")}</Text>
          {/* DURUM SATIRI webde vardı, mobilde yoktu: iki yüzey aynı şeyi
              anlatmalı. Premium'u olan kullanıcı bu dalı hiç görmüyor, o yüzden
              satır sabit — "Ücretsiz hesap". */}
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2, textAlign: "center" }}>{t(guest ? "guest.name" : "premiumstate.free")}</Text>
        </View>

        {refNotice}

        {/* PLANLAR ÖNCE: fiyat iki özellik listesinin arkasında kalıyordu.
            Alttaki satın alma çubuğu zaten sabit ama ne ödeneceği de
            başlıktan hemen sonra görünmeli — webde de sıra aynı. */}
        {!storeOpen ? (
          <View style={{ borderRadius: radii.lg, backgroundColor: colors.surface2, padding: spacing.lg, gap: 6 }}>
            <Text variant="bodyStrong">{t("paywall.store_not_open")}</Text>
            {/* iOS'ta metin davet ödülüne ya da promo koduna YÖNLENDİRMİYOR (3.1.1). */}
            <Text variant="caption" color={colors.textMuted}>{t(OWN_PROMO_CODES ? "paywall.store_not_open_sub" : "paywall.store_not_open_sub_ios")}</Text>
          </View>
        ) : pkgs === null ? (
          // Plan satırları gelene dek aynı boyda iskelet: liste dolunca kaydırma
          // konumu ve alttaki düğme yerinden oynamıyor.
          <View style={{ gap: spacing.md }}>
            {[0, 1].map((i) => (
              <View key={i} style={{ borderRadius: radii.lg, borderWidth: 2, borderColor: colors.border, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <SkeletonTile size={24} radius={12} />
                <View style={{ flex: 1 }}>
                  <SkeletonLine variant="h3" width="45%" />
                  <SkeletonLine variant="caption" width="65%" />
                </View>
                <SkeletonLine variant="h3" width={72} />
              </View>
            ))}
          </View>
        ) : (
          <View style={{ gap: spacing.md }}>
            {pkgs.map((p) => {
              const active = selected === p.identifier;
              const tr = freeTrialOf(p, trialOk);
              return (
                <PressableScale key={p.identifier} onPress={() => setSelected(p.identifier)} accessibilityRole="radio" accessibilityState={{ selected: active }} accessibilityLabel={`${planLabel(p)}, ${priceLine(p, tr)}`} style={{ borderRadius: radii.lg, borderWidth: 2, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                  <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: active ? colors.primary : colors.border, alignItems: "center", justifyContent: "center" }}>
                    {active && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary }} />}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="h3">{planLabel(p)}</Text>
                    <Text variant="caption" color={colors.textMuted}>{tr ? t("paywall.first_free", { duration: tr }) : t("paywall.cancel_anytime")}</Text>
                  </View>
                  <Text variant="h3" color={active ? colors.primaryText : colors.text}>{p.product.priceString}</Text>
                </PressableScale>
              );
            })}
          </View>
        )}

        {/* Grup kodu planların HEMEN ALTINDA: seçili planı kullanıyor ve şart
            satırı o planın fiyatını söylüyor; araya kapsam listesi girerse
            hangi fiyatın geçerli olduğu kopuyor. Yalnız Android (GROUP_CODES). */}
        {GROUP_CODES && storeOpen && pkgs && pkgs.length > 0 ? (
          <GroupCodeBox
            colors={colors}
            pkg={pkg}
            initialCode={routeParams?.group ?? ""}
            guest={guest}
            onAuth={() => nav.navigate("Auth")}
            onOutcome={(o) => settle(o, `group:${pkg?.packageType ?? ""}`)}
            busy={busy}
            setBusy={setBusy}
          />
        ) : null}

        {/* KAPSAM SUNUCUDAN. Eskiden burada elle yazılmış bir karşılaştırma
            tablosu vardı ve gerçeği anlatmıyordu: tek satırı "Schreiben
            alıştırmaları" idi ve o ekran aylar önce kaldırılmıştı, yani paywall
            olmayan bir şeyi vaat ediyordu. Artık satırlar yapılandırmadan
            üretiliyor (`describeLimits`) ve çeviri anahtarı olarak geliyor —
            panelden bir sınır değişince buradaki metin de değişiyor, beyan
            gerçekle ayrışamıyor. */}
        {/*
          KAPSAM TEK KART. "Premium'da neler var" ve "Ücretsizde ne var" iki
          ayrı kutuydu ve ikisi de aynı onay işaretini kullanıyordu: yan yana
          durduklarında hangisinin neyi anlattığı ayırt edilmiyordu. Aynı
          kartın iki bölümü oldular; ücretsiz taraf sönük yazılıyor. Webde de
          düzen aynı (`premium-paywall`).
        */}
        <Section title={t("paywall.what_you_get")} colors={colors}>
          {(status?.copy.premium ?? []).map((l) => (
            <Bullet key={l.key} text={t(l.key, l.params)} colors={colors} tone="premium" />
          ))}
          <View style={{ marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
            <Text variant="caption" color={colors.textMuted} style={{ marginBottom: 6, letterSpacing: 0.5 }}>{t("paywall.whats_free")}</Text>
            {(status?.copy.free ?? []).map((l) => (
              <Bullet key={l.key} text={t(l.key, l.params)} colors={colors} tone="free" />
            ))}
          </View>
        </Section>

        {/*
          İNCE YAZI TEK PARAGRAF. Adil kullanım kendi kutusundaydı, içerik
          vaadi ikonlu ayrı bir satırdaydı; ikisi de okunması gereken ama karar
          vermeyen metinler — kutu hak etmiyorlar. Adil kullanım AÇIKÇA
          yazılıyor: tavanı olan bir şeyi "sınırsız" diye sunmak App Store
          3.1.2 ve Play'in abonelik beyanı kurallarına aykırı. Sınav vaadi
          yalnız gerçekten deneme sınavı OLAN kursta.
        */}
        <View style={{ marginBottom: spacing.xl, gap: spacing.xs }}>
          {status?.limits ? (
            <Text variant="micro" color={colors.textMuted}>
              {/* Üç tavan tek cümlede ve "sınırsız" denmeden (App Store 3.1.2).
                  Sohbet mesajı tavanı sabit (sunucu `lib/quotas`); eski sunucu
                  göndermiyorsa aynı sayı. `pocketWalksPerDay` eski sunucunun adı. */}
              {t("plan.pro_fair_use", {
                w: status.limits.fairUse.walkSessionsPerDay ?? status.limits.fairUse.pocketWalksPerDay ?? 20,
                a: status.limits.fairUse.aiPracticePerDay,
                c: status.limits.fairUse.chatTurnsPerDay ?? 300,
              })}
            </Text>
          ) : null}
          {/* İçerik vaadi AYRI satır: adil kullanım tavanlarıyla aynı cümlede
              birleşince iki ayrı konu tek bir cümle gibi okunuyordu. */}
          <Text variant="micro" color={colors.textMuted}>
            {t(hasMockExams(currentCourseId()) ? "paywall.content_is_built_around_cefr_a1" : "paywall.content_is_built_around_cefr")}
          </Text>
        </View>

        {OWN_PROMO_CODES && !guest ? <PromoBox colors={colors} onRedeemed={refresh} /> : null}
        {status?.referral && !guest ? <ReferralBox colors={colors} referral={status.referral} /> : null}
        {/* Kısa ekranda misafir açıklaması kaydırılan alana iniyor (aşağıda). */}
        {guest && compactHeight ? guestPitch : null}
      </KeyboardAwareScroll>

      {guest ? (
        /* Misafir alt alanı: başlık + açıklama + düğme + bağlantılar 320dp'de
           ekranın yarısını kaplıyor, faydalar listesine ~180dp kalıyordu. Kısa
           ekranda yapışık kalan yalnız EYLEM; açıklama içeriğin sonunda. */
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.sm, gap: spacing.sm }}>
          {compactHeight ? null : guestPitch}
          <PressableScale onPress={() => nav.navigate("Auth")} accessibilityRole="button" accessibilityLabel={t("guest.create_account")} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 12)]}>
            <Text variant="h3" color={colors.onPrimary}>{t("guest.create_account")}</Text>
          </PressableScale>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", columnGap: spacing.lg }}>
            <LegalLinks colors={colors} />
          </View>
        </View>
      ) : !storeOpen ? (
        /*
          MAĞAZA KAPALI: satın alma çubuğu yok ama GERİ YÜKLEME ve hukuki
          bağlantılar kalıyor.

          Geri yükleme eskiden bu dalda hiç çizilmiyordu ve bu bir POLİTİKA
          açığıydı: App Store 3.1.1 geri yükleme yolunu şart koşuyor, oysa
          düğme yalnız paket listesi doluyken görünüyordu. Offering'in boş
          dönmesi istisna değil — mağaza kesintisinde, bozuk bir offering'de
          ve ürünler yayına alınmadan önce hep böyle. Yani tam da incelemeye
          girilen hâlde düğme yoktu.

          Geri yükleme mağaza bağlıyken anlamlı (SDK anahtarı var), paket
          listesinin dolu olmasına bağlı değil: kullanıcının aboneliği başka
          bir cihazda alınmış olabilir.
        */
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.sm, gap: spacing.xs }}>
          {error ? <Text accessibilityLiveRegion="assertive" variant="caption" color={colors.dangerText} style={{ textAlign: "center" }}>{error}</Text> : null}
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", columnGap: spacing.lg }}>
            {configured ? (
              <PressableScale onPress={doRestore} hitSlop={6} accessibilityRole="button" accessibilityLabel={t("paywall.restore_purchase")} style={{ paddingVertical: spacing.sm }}>
                <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("paywall.restore_purchase")}</Text>
              </PressableScale>
            ) : null}
            <LegalLinks colors={colors} />
          </View>
        </View>
      ) : (
      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.sm }}>
        {/* Satın alma hatası duyuruluyor — web `premium-paywall` `role="status"`
            taşıyor; sessiz kalırsa kullanıcı düğmeye basıp hiçbir şey olmadığını
            sanıyor. */}
        {error ? <Text accessibilityLiveRegion="assertive" variant="caption" color={colors.dangerText} style={{ textAlign: "center", marginBottom: spacing.sm }}>{error}</Text> : null}
        {notice ? <Text accessibilityLiveRegion="polite" variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginBottom: spacing.sm }}>{notice}</Text> : null}
        <PressableScale onPress={start} disabled={busy || !pkg} accessibilityRole="button" accessibilityLabel={trial ? t("paywall.start_free_trial") : t("paywall.subscribe")} style={[{ borderRadius: radii.lg, backgroundColor: pkg ? colors.primary : colors.surface2, paddingVertical: spacing.lg, alignItems: "center" }, pkg ? softShadow(colors.primary, 12) : {}]}>
          {busy ? <ActivityIndicator color={colors.onPrimary} /> : <Text variant="h3" color={pkg ? colors.onPrimary : colors.textFaint}>{trial ? t("paywall.start_free_trial") : t("paywall.subscribe")}</Text>}
        </PressableScale>
        {/* Abonelik politikası (Play ve App Store): süre, fiyat, yenileme ve iptal yolu
            satın almadan önce görünür. İptal yolu mağazaya göre ayrı metin. */}
        <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm }}>
          {pkg ? priceLine(pkg, trial) : ""}
          {" · "}{t(Platform.OS === "ios" ? "paywall.renew_cancel_appstore" : "paywall.renew_cancel_play")}
        </Text>
        {/* Cayma ve iade satırı (şartlar §7, sürüm 1.2). Şartlar eskiden cayma
            hakkının "satın alma ekranında istenen onayla" bittiğini söylüyordu ve
            burada öyle bir onay yoktu. Satışı mağaza yapıyor; uygulama ayrı bir
            onay istemiyor, yolu söylüyor. */}
        <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginTop: 2 }}>
          {t(Platform.OS === "ios" ? "paywall.withdrawal_appstore" : "paywall.withdrawal_play")}
        </Text>
        {/*
          SATIN ALMA ALANINDA İKİ HUKUKİ BAĞLANTI BİRDEN. Burada yalnız
          Kullanım Şartları vardı; Apple'ın lisans sözleşmesi (Schedule 2
          §3.8(b)) otomatik yenilenen abonelik satan ekranda Gizlilik
          Politikası'nı da istiyor ve eksik bağlantı abonelik retlerinin en
          sık sebebi. Satır sarıyor: dört bağlantı en dar telefonda (320pt)
          tek satıra sığmıyor, kırpılmak yerine ikinci satıra iniyor.
        */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", columnGap: spacing.lg, marginTop: spacing.xs }}>
          <PressableScale onPress={doRestore} hitSlop={6} accessibilityLabel={t("paywall.restore_purchase")} style={{ paddingVertical: spacing.sm }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("paywall.restore_purchase")}</Text>
          </PressableScale>
          <PressableScale onPress={() => Linking.openURL(SUBSCRIPTIONS_URL).catch(() => {})} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.sm }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("paywall.manage_subscription")}</Text>
          </PressableScale>
          {offerCodesAvailable() ? (
            <PressableScale onPress={() => { void redeemOfferCode(); }} hitSlop={6} accessibilityRole="button" style={{ paddingVertical: spacing.sm }}>
              <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("paywall.redeem_offer_code")}</Text>
            </PressableScale>
          ) : null}
          <LegalLinks colors={colors} />
        </View>
      </View>
      )}
    </View>
  );
}

/* ─────────────────────────── paywall parçaları ─────────────────────────── */

/**
 * Kullanım Şartları + Gizlilik Politikası — satın alma ekranının iki dalında da
 * AYNI ikili. Mağaza kapalıyken tek şartlar bağlantısı kalıyordu ve gizlilik
 * hiç yoktu; ikisi tek bileşende durunca biri öbürü olmadan basılamıyor.
 */
function LegalLinks({ colors }: { colors: Palette }) {
  return (
    <>
      <PressableScale onPress={() => openLegal("terms")} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.sm }}>
        <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("auth.terms_of_use")}</Text>
      </PressableScale>
      <PressableScale onPress={() => openLegal("privacy")} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.sm }}>
        <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("auth.privacy_policy")}</Text>
      </PressableScale>
    </>
  );
}

function Section({ title, colors, children }: { title: string; colors: Palette; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: spacing.lg }}>
      <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.xs }}>{title.toLocaleUpperCase(dateLocale())}</Text>
      <View style={{ backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.md, borderWidth: 1, borderColor: colors.hairline }}>
        {children}
      </View>
    </View>
  );
}

function Bullet({ text, colors, tone }: { text: string; colors: Palette; tone: "premium" | "free" }) {
  const premium = tone === "premium";
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm, paddingVertical: 5 }}>
      {premium ? (
        <View style={{ width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center", backgroundColor: colors.primarySoft, marginTop: 1 }}>
          {/* İkon METİN varyantında: dolgu tonu (500) yumuşak turuncu zemin
              üstünde 2.24 veriyordu, grafik eşiği 3.0 bile değil. Web aynı
              işareti rol takma adıyla çiziyor (`premium-paywall`:
              `--color-brand`) ve açık temada o ad bu değer (4.37). */}
          <CheckIcon color={colors.primaryText} size={14} />
        </View>
      ) : (
        /* ÜCRETSİZ TARAFTA ONAY İŞARETİ YOK: aynı işaret iki listede de
           kullanılınca "premium'da olan" ile "zaten sende olan" ayırt
           edilmiyordu. Webde de aynı ayrım var (`premium-paywall` Row). */
        <View style={{ width: 22, alignItems: "center", marginTop: spacing.sm }}>
          <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: colors.textFaint }} />
        </View>
      )}
      <Text variant="caption" color={premium ? colors.text : colors.textMuted} style={{ flex: 1 }}>{text}</Text>
    </View>
  );
}

/**
 * Promo kodu. Panelden üretilen kodların bozdurulduğu yer — mağazadan
 * BAĞIMSIZ, yani satın alma yolu kapalıyken de çalışıyor.
 *
 * Hata sebepleri ayrı ayrı gösteriliyor ("kod yok" / "zaten kullandın" /
 * "tükendi"): üçünde de kullanıcının yapacağı şey farklı ve tek bir "geçersiz
 * kod" mesajı doğrudan destek çağrısı üretir.
 */
/** Promo kodu kutusu — bulunamayan kod DAVET kodu olabilir, uç ikisini ayırıyor. */
function PromoBox({ colors, onRedeemed }: { colors: Palette; onRedeemed: () => void }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

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
        // Davet kodu premium AÇMIYOR, yalnız bağ kuruyor.
        setMsg({ ok: true, text: t(r.result === "linked" ? "referral.linked_quiet" : "promo.referral_linked") });
        setCode("");
      } else if (r.ok) {
        setMsg({ ok: true, text: t("promo.success", { n: r.days ?? 0 }) });
        setCode("");
        void refreshPremium().then(onRedeemed);
      } else {
        setMsg({ ok: false, text: t(promoErrorKey(r.error)) });
      }
    } catch (e) {
      /* `api` HTTP hatasında `ApiError` fırlatıyor ve sunucunun sebebini
         (`error`) MESAJ olarak taşıyor (api/client). Burada `.body.error`
         okunuyordu, öyle bir alan yok: her sebep "Kod uygulanamadı"ya
         düşüyordu — "bulunamadı", "tükendi" ve grup kodunun "yanlış kutu"
         cümlesi hiç görünmüyordu. */
      const reason = (e as { message?: string } | null)?.message;
      setMsg({ ok: false, text: t(promoErrorKey(reason)) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section title={t("promo.title")} colors={colors}>
      <View style={{ flexDirection: "row", gap: spacing.sm, alignItems: "center" }}>
        {/* Enter = Uygula: webde kod alanı bir form içinde, yani klavyenin
            return tuşu kodu uyguluyor. Mobilde tuş hiçbir şey yapmıyordu. */}
        <TextInput
          value={code}
          onChangeText={(v) => setCode(v.toUpperCase())}
          placeholder={t("promo.placeholder")}
          accessibilityLabel={t("promo.placeholder")}
          placeholderTextColor={colors.textFaint}
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={() => { if (!busy && code.trim()) void apply(); }}
          style={{ flex: 1, backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 10, color: colors.text, letterSpacing: 2 }}
        />
        <PressableScale onPress={apply} disabled={busy || !code.trim()} accessibilityRole="button" accessibilityLabel={t("promo.apply")} style={{ borderRadius: radii.md, backgroundColor: code.trim() ? colors.primary : colors.surface2, paddingHorizontal: spacing.lg, paddingVertical: 11 }}>
          {busy ? <ActivityIndicator color={colors.onPrimary} /> : <Text variant="bodyStrong" color={code.trim() ? colors.onPrimary : colors.textFaint}>{t("promo.apply")}</Text>}
        </PressableScale>
      </View>
      {/* Sonuç duyuruluyor — bkz. `profile-form` içindeki not. Promo kodunun tutup tutmadığı ödeme kararının ta kendisi. */}
      {/* HATA `assertive`, BASARI `polite`. Tek oge iki durumu tasiyordu ve
          hep `polite` diyordu: TalkBack kullanan biri basarisiz bir promo
          kodunu, sirasi gelince - yani belki hic - duyuyordu. Ayni ekranin
          odeme hatasi (yukarida) baştan beri `assertive`. Web karsiligi
          `role="alert"`. */}
      {msg ? <Text accessibilityLiveRegion={msg.ok ? "polite" : "assertive"} variant="caption" color={msg.ok ? colors.successText : colors.dangerText} style={{ marginTop: spacing.sm }}>{msg.text}</Text> : null}
    </Section>
  );
}

/**
 * Sunucunun sebebi doğrudan anahtar adı; tanımadığımız sebep genel mesaja düşer.
 *
 * `self` EKSİKTİ: kendi davet kodunu giren kullanıcı "Kod uygulanamadı, daha
 * sonra tekrar dene" görüyordu — oysa yapması gereken belli ve tekrar denemek
 * hiçbir zaman işe yaramayacak. Sunucu bu sebebi `attachReferral` üzerinden
 * gönderiyor (`AttachResult`); iki istemci de tanımıyordu.
 */
const PROMO_ERRORS = ["not_found", "already", "used_up", "expired", "disabled", "rate_limited", "self", "store_trial"];
function promoErrorKey(reason: string | undefined): string {
  return PROMO_ERRORS.includes(reason ?? "") ? `promo.${reason}` : "promo.failed";
}

/**
 * Grup kodu sebebi → sözlük anahtarı. Promo kutusunun cümleleri ortak olanlarda
 * (bulunamadı, tükendi, süresi doldu) aynen kullanılıyor: iki kutu aynı durumu
 * iki ayrı cümleyle anlatmasın. Tanınmayan sebep genel mesaja düşer.
 */
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
 * Grup kodu — "2 ay ücretsiz, sonra ücretli" (YALNIZ ANDROID, bkz. GROUP_CODES).
 *
 * AKIŞ: kod sunucuda talep ediliyor (`/api/premium/trial-code`, hak sayacı ve
 * hesap başına tek deneme orada), sunucu Play teklifinin ETİKETİNİ veriyor ve
 * uygulama seçili planın o etiketli seçeneğini satın alıyor. Yetki her zamanki
 * yoldan, webhook'la geliyor; sonuç normal satın almayla aynı sözlükte.
 *
 * ŞART SATIRI DÜĞMENİN YANINDA: "2 ay ücretsiz, sonra yılda X", ödeme yöntemi,
 * 24 saat kuralı ve iptal yolu. Play abonelik beyanı denemenin bitince ne
 * olacağının satın almadan ÖNCE okunmasını istiyor.
 *
 * Bağlantıyla gelindiyse (`/g/<KOD>`) kod dolu geliyor ve bir kez doğrulanıyor
 * (hiçbir şey harcamadan): grup adı görünüyor, geçersiz kod baştan söyleniyor.
 */
function GroupCodeBox({
  colors,
  pkg,
  initialCode,
  guest,
  onAuth,
  onOutcome,
  busy,
  setBusy,
}: {
  colors: Palette;
  pkg: PurchasesPackage | undefined;
  initialCode: string;
  guest: boolean;
  onAuth: () => void;
  onOutcome: (o: PurchaseOutcome) => void;
  busy: boolean;
  setBusy: (b: boolean) => void;
}) {
  const [code, setCode] = useState(initialCode.toUpperCase());
  const [group, setGroup] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const plan = pkg?.packageType === "ANNUAL" ? "yearly" : pkg?.packageType === "MONTHLY" ? "monthly" : null;

  useEffect(() => {
    if (!initialCode) return;
    let alive = true;
    void api<{ status?: string; group?: string | null }>(`/api/premium/trial-code?code=${encodeURIComponent(initialCode)}`)
      .then((r) => {
        if (!alive) return;
        if (r.status === "valid") setGroup(r.group ?? null);
        else setMsg({ ok: false, text: t(groupErrorKey(r.status)) });
      })
      .catch(() => { /* ön bakış yalnız bilgi; başarısızsa kutu yine çalışır */ });
    return () => { alive = false; };
  }, [initialCode]);

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
      // Sunucunun sebebi `ApiError.message`ta (bkz. PromoBox).
      const reason = (e as { message?: string } | null)?.message;
      setMsg({ ok: false, text: t(groupErrorKey(reason)) });
    } finally {
      setBusy(false);
    }
  }

  if (guest) {
    return (
      <Section title={t("grupkod.title")} colors={colors}>
        <Text variant="caption" color={colors.textMuted}>{t("grupkod.guest")}</Text>
        <PressableScale onPress={onAuth} accessibilityRole="button" accessibilityLabel={t("guest.create_account")} style={{ marginTop: spacing.sm, alignSelf: "flex-start", borderRadius: radii.md, backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: 11 }}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("guest.create_account")}</Text>
        </PressableScale>
      </Section>
    );
  }

  const ready = Boolean(code.trim()) && !busy;
  return (
    <View style={{ marginTop: spacing.lg }}>
      <Section title={t("grupkod.title")} colors={colors}>
        {group ? <Text variant="caption" color={colors.successText} style={{ marginBottom: spacing.xs }}>{t("grupkod.group", { group })}</Text> : null}
        <TextInput
          value={code}
          onChangeText={(v) => setCode(v.toUpperCase())}
          placeholder={t("grupkod.placeholder")}
          accessibilityLabel={t("grupkod.placeholder")}
          placeholderTextColor={colors.textFaint}
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={() => { if (ready) void begin(); }}
          style={{ backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 10, color: colors.text, letterSpacing: 2 }}
        />
        {pkg ? (
          <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.sm }}>
            {priceLine(pkg, t("paywall.trial_months", { n: 2 }))} · {t("grupkod.terms")}
          </Text>
        ) : null}
        <PressableScale onPress={begin} disabled={!ready} accessibilityRole="button" accessibilityLabel={t("grupkod.start")} style={{ marginTop: spacing.sm, borderRadius: radii.md, backgroundColor: ready ? colors.primary : colors.surface2, paddingVertical: 11, alignItems: "center" }}>
          {busy ? <ActivityIndicator color={colors.onPrimary} /> : <Text variant="bodyStrong" color={ready ? colors.onPrimary : colors.textFaint}>{t("grupkod.start")}</Text>}
        </PressableScale>
        {msg ? <Text accessibilityLiveRegion={msg.ok ? "polite" : "assertive"} variant="caption" color={msg.ok ? colors.successText : colors.dangerText} style={{ marginTop: spacing.sm }}>{msg.text}</Text> : null}
      </Section>
    </View>
  );
}

/**
 * Davet. Kod ömür boyu sabit; bağlantı web'in promo açılışıyla aynı biçimde
 * (`/premium?code=…`), yani tek bağlantı hem kodu tanıtıyor hem paywall'ı açıyor.
 */
function ReferralBox({ colors, referral }: { colors: Palette; referral: { code: string; invited: number } }) {
  return (
    <Section title={t("referral.title")} colors={colors}>
      <Text variant="caption">{t("referral.explain")}</Text>
      <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("referral.reward_note")}</Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.md }}>
        {/*
          iOS'TA KOD DEĞİL BAĞLANTI GÖSTERİLİYOR.

          iOS'ta kod girilecek bir yer YOK ve bilerek yok (Guideline 3.1.1,
          bkz. `OWN_PROMO_CODES`). Çıplak kodu orada büyük büyük göstermek,
          iOS'taki alıcının hiçbir yere giremeyeceği bir şeyi "paylaş" diye
          sunmak olurdu — davet eden iyi niyetle kodu okur, karşı taraf
          çıkmaza girer. Her yerde çalışan şey bağlantı.

          Android'de kod DURUYOR: kutu orada çizili, yani kod uçtan uca
          işleyen bir yol.
        */}
        <View style={{ flex: 1, backgroundColor: colors.surface2, borderRadius: radii.md, paddingVertical: 11, alignItems: "center", paddingHorizontal: spacing.sm }}>
          {OWN_PROMO_CODES ? (
            <Text variant="h3" style={{ letterSpacing: 4 }}>{referral.code}</Text>
          ) : (
            <Text variant="caption" color={colors.textMuted} numberOfLines={1}>{inviteLink(referral.code)}</Text>
          )}
        </View>
        <PressableScale onPress={() => void shareInvite(referral.code)} accessibilityRole="button" accessibilityLabel={t("referral.copy_link")} style={{ borderRadius: radii.md, backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: 11, flexDirection: "row", alignItems: "center", gap: 6 }}>
          <ShareIcon color={colors.onPrimary} size={16} />
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.share")}</Text>
        </PressableScale>
      </View>

      <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.sm }}>
        {referral.invited === 0
          ? t("referral.none_yet")
          : t("referral.invited", { n: referral.invited })}
      </Text>
    </Section>
  );
}
