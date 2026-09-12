import React, { useEffect, useState } from "react";
import { t, dateLocale } from "../lib/i18n";
import { View, ScrollView, ActivityIndicator, Linking, Platform, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { PurchasesPackage } from "react-native-purchases";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, CheckIcon, CrownIcon, ShareIcon } from "../ui/icons";
import { SkeletonLine, SkeletonTile } from "../ui/Skeleton";
import { track } from "../lib/track";
import { haptic } from "../lib/haptics";
import { billingAvailable, getPackages, purchase, restore } from "../lib/billing";
import { usePremiumStatus, refreshPremium } from "../lib/premium";
import { shareInvite } from "../lib/share";
import { api } from "../api/client";
import { openLegal } from "../lib/legal";
import { hasMockExams } from "../data/exams";
import { currentCourseId } from "../lib/courses";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

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

/** Mağazanın bildirdiği ücretsiz deneme (giriş fiyatı 0) — yoksa deneme vaadi yok. */
function freeTrialOf(pkg: PurchasesPackage | undefined): string | null {
  const intro = pkg?.product.introPrice;
  if (!intro || intro.price !== 0) return null;
  return `${intro.periodNumberOfUnits} ${intro.periodUnit === "DAY" ? t("paywall.days") : intro.periodUnit === "WEEK" ? t("paywall.weeks") : t("paywall.ay")}`;
}

export function PaywallScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
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
  const [pkgs, setPkgs] = useState<PurchasesPackage[] | null>(null);
  const storeOpen = configured && (pkgs === null || pkgs.length > 0);
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    track("paywall_view", 0, "mobile");
    if (!configured) { setPkgs([]); return; }
    let alive = true;
    void getPackages().then((p) => {
      if (!alive) return;
      const sorted = [...p].sort((a, b) => (a.packageType === "ANNUAL" ? -1 : b.packageType === "ANNUAL" ? 1 : 0));
      setPkgs(sorted);
      setSelected(sorted[0]?.identifier ?? null);
    });
    return () => { alive = false; };
  }, [configured]);

  const pkg = pkgs?.find((p) => p.identifier === selected);
  const trial = freeTrialOf(pkg);

  async function start() {
    if (!pkg || busy) return;
    track("purchase_start", 0, pkg.packageType);
    setBusy(true);
    setError(null);
    const ok = await purchase(pkg);
    setBusy(false);
    if (ok) { haptic("correct"); track("purchase_done", 0, pkg.packageType); nav.goBack(); }
    else setError(t("paywall.purchase_wasn_t_completed"));
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
      <ScrollView automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xl }}>
          <View style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.lg }}>
            <View style={[{ width: 84, height: 84, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
              <CrownIcon color={colors.onPrimary} size={44} />
            </View>
            <Text accessibilityRole="header" variant="display" style={{ marginTop: spacing.md }}>{t("paywall.nomi_premium")}</Text>
            <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>{line}</Text>
            {status.bonusDaysPending > 0 ? (
              <Text variant="caption" color={colors.successText} style={{ marginTop: 4, textAlign: "center" }}>
                {t("premiumstate.bonus_pending", { n: status.bonusDaysPending })}
              </Text>
            ) : null}
          </View>

          <Section title={t("paywall.what_you_get")} colors={colors}>
            {(status.copy.premium ?? []).map((l) => (
              <Bullet key={l.key} text={t(l.key, l.params)} colors={colors} tone="premium" />
            ))}
          </Section>

          <PromoBox colors={colors} onRedeemed={refresh} />
          {status.referral ? <ReferralBox colors={colors} referral={status.referral} /> : null}

          <PressableScale onPress={() => Linking.openURL(SUBSCRIPTIONS_URL).catch(() => {})} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.md, alignItems: "center" }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>
              {t(Platform.OS === "ios" ? "premiumstate.manage_ios" : "premiumstate.manage_android")}
            </Text>
          </PressableScale>
        </ScrollView>
      </View>
    );
  }

  /*
   * MAĞAZA KAPALIYKEN DE TAM SAYFA.
   *
   * Burada eskiden erken bir dönüş vardı: "Premium satışta değil · tüm
   * özellikler şimdilik ücretsiz". İki sorunu vardı. Birincisi YANLIŞTI —
   * ekran kapalı yürüyüş ücretsiz katmanda kapalı (`free.pocketWalksPerDay: 0`),
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
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.xl }}>
          <View style={[{ width: 84, height: 84, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
            <CrownIcon color={colors.onPrimary} size={44} />
          </View>
          <Text accessibilityRole="header" variant="display" style={{ marginTop: spacing.md }}>{t("paywall.nomi_premium")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>{t("paywall.unlimited_learning_full_exam")}</Text>
          {/* DURUM SATIRI webde vardı, mobilde yoktu: iki yüzey aynı şeyi
              anlatmalı. Premium'u olan kullanıcı bu dalı hiç görmüyor, o yüzden
              satır sabit — "Ücretsiz hesap". */}
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2, textAlign: "center" }}>{t("premiumstate.free")}</Text>
        </View>

        {/* PLANLAR ÖNCE: fiyat iki özellik listesinin arkasında kalıyordu.
            Alttaki satın alma çubuğu zaten sabit ama ne ödeneceği de
            başlıktan hemen sonra görünmeli — webde de sıra aynı. */}
        {!storeOpen ? (
          <View style={{ borderRadius: radii.lg, backgroundColor: colors.surface2, padding: spacing.lg, gap: 6 }}>
            <Text variant="bodyStrong">{t("paywall.store_not_open")}</Text>
            <Text variant="caption" color={colors.textMuted} style={{ lineHeight: 19 }}>{t("paywall.store_not_open_sub")}</Text>
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
              const tr = freeTrialOf(p);
              return (
                <PressableScale key={p.identifier} onPress={() => setSelected(p.identifier)} accessibilityRole="radio" accessibilityState={{ selected: active }} accessibilityLabel={`${planLabel(p)}, ${p.product.priceString}`} style={{ borderRadius: radii.lg, borderWidth: 2, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
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
        <View style={{ marginBottom: spacing.xl, gap: 4 }}>
          {status?.limits ? (
            <Text variant="micro" color={colors.textMuted} style={{ lineHeight: 18 }}>
              {t("paywall.fair_use_title")}: {t("plan.pro_walk_cap", { n: status.limits.fairUse.pocketWalksPerDay })} · {t("plan.pro_ai", { n: status.limits.fairUse.aiPracticePerDay })}
            </Text>
          ) : null}
          {/* İçerik vaadi AYRI satır: adil kullanım tavanlarıyla aynı cümlede
              birleşince iki ayrı konu tek bir cümle gibi okunuyordu. */}
          <Text variant="micro" color={colors.textMuted} style={{ lineHeight: 18 }}>
            {t(hasMockExams(currentCourseId()) ? "paywall.content_is_built_around_cefr_a1" : "paywall.content_is_built_around_cefr")}
          </Text>
        </View>

        <PromoBox colors={colors} onRedeemed={refresh} />
        {status?.referral ? <ReferralBox colors={colors} referral={status.referral} /> : null}
      </ScrollView>

      {!storeOpen ? (
        // Mağaza kapalı: satın alma çubuğu yok ama şartlar bağlantısı kalıyor —
        // sayfanın hukuki metne açılan tek kapısı orası.
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.sm, alignItems: "center" }}>
          <PressableScale onPress={() => openLegal("terms")} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.sm }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("auth.terms_of_use")}</Text>
          </PressableScale>
        </View>
      ) : (
      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.sm }}>
        {/* Satın alma hatası duyuruluyor — web `premium-paywall` `role="status"`
            taşıyor; sessiz kalırsa kullanıcı düğmeye basıp hiçbir şey olmadığını
            sanıyor. */}
        {error ? <Text accessibilityLiveRegion="assertive" variant="caption" color={colors.dangerText} style={{ textAlign: "center", marginBottom: spacing.sm }}>{error}</Text> : null}
        <PressableScale onPress={start} disabled={busy || !pkg} accessibilityRole="button" accessibilityLabel={trial ? t("paywall.start_free_trial") : t("paywall.subscribe")} style={[{ borderRadius: radii.lg, backgroundColor: pkg ? colors.primary : colors.surface2, paddingVertical: 17, alignItems: "center" }, pkg ? softShadow(colors.primary, 12) : {}]}>
          {busy ? <ActivityIndicator color={colors.onPrimary} /> : <Text variant="h3" color={pkg ? colors.onPrimary : colors.textFaint}>{trial ? t("paywall.start_free_trial") : t("paywall.subscribe")}</Text>}
        </PressableScale>
        {/* Abonelik politikası (Play ve App Store): süre, fiyat, yenileme ve iptal yolu
            satın almadan önce görünür. İptal yolu mağazaya göre ayrı metin. */}
        <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm, lineHeight: 16 }}>
          {pkg ? (trial ? t("paywall.free_then", { duration: trial, price: pkg.product.priceString }) : t("paywall.fiyat_donem", { price: pkg.product.priceString })) : ""}
          {" · "}{t(Platform.OS === "ios" ? "paywall.renew_cancel_appstore" : "paywall.renew_cancel_play")}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", gap: spacing.lg, marginTop: spacing.xs }}>
          <PressableScale onPress={doRestore} hitSlop={6} accessibilityLabel={t("paywall.restore_purchase")} style={{ paddingVertical: spacing.sm }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("paywall.restore_purchase")}</Text>
          </PressableScale>
          <PressableScale onPress={() => Linking.openURL(SUBSCRIPTIONS_URL).catch(() => {})} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.sm }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("paywall.manage_subscription")}</Text>
          </PressableScale>
          <PressableScale onPress={() => openLegal("terms")} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.sm }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("auth.terms_of_use")}</Text>
          </PressableScale>
        </View>
      </View>
      )}
    </View>
  );
}

/* ─────────────────────────── paywall parçaları ─────────────────────────── */

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
          <CheckIcon color={colors.primary} size={14} />
        </View>
      ) : (
        /* ÜCRETSİZ TARAFTA ONAY İŞARETİ YOK: aynı işaret iki listede de
           kullanılınca "premium'da olan" ile "zaten sende olan" ayırt
           edilmiyordu. Webde de aynı ayrım var (`premium-paywall` Row). */
        <View style={{ width: 22, alignItems: "center", marginTop: 8 }}>
          <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: colors.textFaint }} />
        </View>
      )}
      <Text variant="caption" color={premium ? colors.text : colors.textMuted} style={{ flex: 1, lineHeight: 19 }}>{text}</Text>
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
function PromoBox({ colors, onRedeemed }: { colors: Palette; onRedeemed: () => void }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function apply() {
    if (!code.trim() || busy) return;
    setBusy(true);
    setMsg(null);
    try {
      const r = await api<{ ok?: boolean; kind?: string; days?: number; error?: string }>("/api/premium/redeem", {
        method: "POST",
        body: JSON.stringify({ code }),
      });
      if (r.ok && r.kind === "referral") {
        // Davet kodu premium AÇMIYOR, yalnız bağ kuruyor.
        setMsg({ ok: true, text: t("promo.referral_linked") });
        setCode("");
      } else if (r.ok) {
        setMsg({ ok: true, text: t("promo.success", { days: r.days ?? 0 }) });
        setCode("");
        void refreshPremium().then(onRedeemed);
      } else {
        setMsg({ ok: false, text: t(promoErrorKey(r.error)) });
      }
    } catch (e) {
      // `api` HTTP hatasında fırlatıyor; sebep gövdede olabilir.
      const reason = (e as { body?: { error?: string } })?.body?.error;
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
const PROMO_ERRORS = ["not_found", "already", "used_up", "expired", "disabled", "rate_limited", "self"];
function promoErrorKey(reason: string | undefined): string {
  return PROMO_ERRORS.includes(reason ?? "") ? `promo.${reason}` : "promo.failed";
}

/**
 * Davet. Kod ömür boyu sabit; bağlantı web'in promo açılışıyla aynı biçimde
 * (`/premium?code=…`), yani tek bağlantı hem kodu tanıtıyor hem paywall'ı açıyor.
 */
function ReferralBox({ colors, referral }: { colors: Palette; referral: { code: string; invited: number; rewarded: number; earnedDays: number; rewardDays: number } }) {
  return (
    <Section title={t("referral.title")} colors={colors}>
      <Text variant="caption" style={{ lineHeight: 19 }}>{t("referral.explain", { days: referral.rewardDays })}</Text>
      <Text variant="micro" color={colors.textMuted} style={{ marginTop: 4, lineHeight: 16 }}>{t("referral.reward_note")}</Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.md }}>
        <View style={{ flex: 1, backgroundColor: colors.surface2, borderRadius: radii.md, paddingVertical: 11, alignItems: "center" }}>
          <Text variant="h3" style={{ letterSpacing: 4 }}>{referral.code}</Text>
        </View>
        <PressableScale onPress={() => void shareInvite(referral.code)} accessibilityRole="button" accessibilityLabel={t("referral.copy_link")} style={{ borderRadius: radii.md, backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: 11, flexDirection: "row", alignItems: "center", gap: 6 }}>
          <ShareIcon color={colors.onPrimary} size={16} />
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.share")}</Text>
        </PressableScale>
      </View>

      <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.sm }}>
        {referral.invited === 0
          ? t("referral.none_yet")
          : `${t("referral.invited", { n: referral.invited })} · ${t("referral.rewarded", { n: referral.rewarded })}${referral.earnedDays > 0 ? ` · ${t("referral.earned", { n: referral.earnedDays })}` : ""}`}
      </Text>
    </Section>
  );
}
