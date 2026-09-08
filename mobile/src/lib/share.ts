import { Share } from "react-native";
import { track } from "./track";
import { t, targetLangName } from "./i18n";

/**
 * Paylaşım / davet. RN'in yerleşik Share API'siyle (native dep yok) OS paylaşım
 * sayfasını açar.
 *
 * DAVET KODU ARTIK GERÇEK. Bağlantı eskiden sabit `?ref=davet` taşıyordu, yani
 * kimin davet ettiği hiçbir yerde yazmıyordu ve ödül verilemezdi — dosyanın
 * kendi notu "auth gelince kullanıcıya bağlanır" diyordu. Kod çağıranın
 * verdiği: `usePremiumStatus().referral.code` ya da `/api/premium/referral`.
 * Kod yoksa bağlantı yine paylaşılıyor ama ödül üretmiyor; paylaşımı büsbütün
 * engellemek daha kötü olurdu.
 *
 * `?code=` biçimi web'deki promo/davet açılış sayfasıyla aynı
 * (`/premium?code=…`): tek bağlantı hem kodu tanıtıyor hem paywall'ı açıyor.
 */
const APP_URL = "https://www.lernomi.app";

export async function shareInvite(referralCode?: string | null): Promise<void> {
  try {
    track("share", 0, "invite");
    const link = referralCode ? `${APP_URL}/premium?code=${referralCode}` : APP_URL;
    await Share.share({
      message: t("share.invite", { lang: targetLangName(), link }),
    });
  } catch { /* kullanıcı vazgeçti / paylaşım kapalı */ }
}

export async function shareResult(correct: number, total: number): Promise<void> {
  try {
    track("share", correct, "result");
    await Share.share({
      message: t("share.result", { total: total, correct: correct, link: `${APP_URL}?ref=sonuc` }),
    });
  } catch { /* kullanıcı vazgeçti */ }
}

export async function shareStreak(days: number): Promise<void> {
  try {
    track("share", days, "streak");
    await Share.share({
      message: t("share.streak", { n: days, lang: targetLangName(), link: `${APP_URL}?ref=seri` }),
    });
  } catch { /* kullanıcı vazgeçti */ }
}
