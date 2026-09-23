import type { Metadata } from "next";
import { headers } from "next/headers";
import { appControl } from "@/lib/app-control";
import { platformOf } from "@/lib/store-link";
import { iosRedeemUrl, peekStoreTrialCode } from "@/lib/premium/store-trial";
import { getT } from "@/lib/i18n/server";
import { TrialLanding } from "./trial-landing";

export const dynamic = "force-dynamic";

/**
 * Grup kodu karşılama sayfası — `lernomi.app/g/<KOD>`.
 *
 * KAMPANYA: WhatsApp ve Telegram gruplarına her gruba ayrı bir kodla dağıtılan
 * "2 ay ücretsiz, sonra ücretli" teklifi (lib/premium/store-trial). Deneme
 * MAĞAZANIN denemesi: ödeme yöntemi istiyor ve iptal edilmezse seçilen planla
 * yenileniyor. Sayfa bunu teklifin YANINDA ve açıkça yazıyor; "ücretsiz" deyip
 * ödeme yöntemini ve yenilemeyi saklamak hem mağaza kurallarına hem tüketici
 * hukukuna aykırı, hem de ilk faturada iade ve tek yıldız demek.
 *
 * PLATFORMA GÖRE İKİ YOL (UA'dan, `lib/store-link` `platformOf`):
 *   Android  Kod UYGULAMADA uygulanıyor. Uygulama kuruluysa bu adres App Link
 *            olarak doğrudan uygulamayı açıyor ve bu sayfa hiç görünmüyor;
 *            görünüyorsa uygulama kurulu değil (ya da tarayıcı bağlantıyı
 *            kendisi açtı): "uygulamada aç" + Google Play + kopyalanabilir kod.
 *   iOS      Kod UYGULAMADA UYGULANMIYOR — App Store Guideline 3.1.1 uygulamanın
 *            kendi koduyla içerik açmasını yasaklıyor. AASA `/g/`yi bilerek
 *            iddia etmiyor, yani iPhone'da bu sayfa her zaman Safari'de açılıyor.
 *            Buradan Apple'ın KENDİ teklif kodu sayfasına gidiliyor
 *            (`/g/<KOD>/ios?plan=…`, tıklamayı sayıp yönlendiriyor).
 *   Masaüstü İki bölüm birden: ziyaretçinin telefonunu bilmiyoruz.
 *
 * Geçersiz / süresi dolmuş / tükenmiş kod açık bir cümleyle söyleniyor;
 * düğmeler çizilmiyor ki kullanıcı işe yaramayacak bir mağaza akışına girmesin.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function GroupTrialPage({ params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;
  /* Bozuk yüzde dizisi `decodeURIComponent`i fırlatıyor ve adres dışarıdan
     geliyor (bkz. `app/r/[code]`): ham hâliyle devam, sadeleştirme eliyor. */
  let ham = raw ?? "";
  try {
    ham = decodeURIComponent(ham);
  } catch {
    /* ham hâliyle devam */
  }

  const [peek, control, hdr, t] = await Promise.all([peekStoreTrialCode(ham), appControl(), headers(), getT()]);
  const platform = platformOf(hdr.get("user-agent"));
  const code = peek.code;

  if (peek.status !== "valid") {
    const lead =
      peek.status === "expired"
        ? t("groupw.expired")
        : peek.status === "used_up"
          ? t("groupw.used_up")
          : peek.status === "disabled"
            ? t("groupw.disabled")
            : t("groupw.unknown_code");
    return <TrialLanding invalid={{ title: t("groupw.bad_title"), lead }} />;
  }

  const android = control.store.android;
  /* Android'de "uygulamada aç": `intent:` adresi uygulama kuruluysa onu
     açıyor, değilse Play'e düşüyor. Düz https bağlantısı aynı sayfadan
     dokunulduğunda tarayıcıda kalabiliyor (Chrome aynı sayfanın App Link'ini
     her zaman uygulamaya vermiyor). Masaüstünde açılacak uygulama yok: düğme
     çizilmiyor, Play bağlantısı ve kod kalıyor. */
  const appUrl =
    platform === "android"
      ? `intent://www.lernomi.app/g/${code}#Intent;scheme=https;package=com.lernomi.learn;${
          android.live ? `S.browser_fallback_url=${encodeURIComponent(android.url)};` : ""
        }end`
      : null;
  const iosReady = Boolean(iosRedeemUrl("monthly") && iosRedeemUrl("yearly"));

  return (
    <TrialLanding
      valid={{
        code,
        group: peek.group,
        showAndroid: platform !== "ios",
        showIos: platform !== "android",
        androidAppUrl: appUrl,
        playUrl: android.live ? android.url : null,
        iosReady,
        iosMonthlyHref: `/g/${code}/ios?plan=monthly`,
        iosYearlyHref: `/g/${code}/ios?plan=yearly`,
      }}
      t={{
        title: t("groupw.title"),
        lead: peek.group ? t("groupw.lead_group", { group: peek.group }) : t("groupw.lead"),
        termsTitle: t("groupw.terms_title"),
        termFree: t("groupw.term_free"),
        termRenew: t("groupw.term_renew"),
        termCancelIos: t("groupw.term_cancel_ios"),
        termCancelAndroid: t("groupw.term_cancel_android"),
        account: t("groupw.account"),
        androidTitle: t("groupw.android_title"),
        androidHow: t("groupw.android_how"),
        androidOpen: t("groupw.android_open"),
        androidPlay: t("groupw.android_play"),
        androidPlaySoon: t("groupw.android_play_soon"),
        codeLabel: t("groupw.code_label"),
        copy: t("groupw.copy"),
        copied: t("groupw.copied"),
        iosTitle: t("groupw.ios_title"),
        iosMonthly: t("groupw.ios_monthly"),
        iosYearly: t("groupw.ios_yearly"),
        iosNote: t("groupw.ios_note"),
        iosSoon: t("groupw.ios_soon"),
      }}
    />
  );
}
