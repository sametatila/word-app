import { Platform } from "react-native";
import Purchases, { type PurchasesPackage } from "react-native-purchases";
import { REVENUECAT, billingConfigured } from "./billingConfig";
import { awaitPremiumAfterPurchase, refreshPremium } from "./premium";

/**
 * SATIN ALMA KAPISI — sağlayıcının uygulamadaki TEK görevi.
 *
 * Bu dosya bilerek küçük ve bilerek tek yerde: RevenueCat'e (ya da yarın onun
 * yerine geçecek şeye) yapılan çağrıların HEPSİ burada. Uygulamanın geri kalanı
 * `hasPremium` diye bir şey bilmiyor; yetkiyi `lib/premium.ts` sunucudan
 * okuyor. Sağlayıcı değişirse değişecek dosya bu dosyadır — ekranlar değil.
 *
 * ROL AYRIMI, mimarinin özeti:
 *   sağlayıcı → satın alma ARAYÜZÜ (fiyat, ödeme akışı, geri yükleme)
 *   sunucu    → YETKİ (kim, ne zamana kadar, hangi kaynaktan)
 *
 * Bu yüzden `purchase()` "premium oldu mu" sorusunu sağlayıcının cevabına
 * DAYANDIRMIYOR: satın alma mağazada tamamlanır, yetki sunucuya webhook'la
 * gelir, uygulama sunucuya sorar. Sağlayıcının "entitlement aktif" demesine
 * güvenip yerel bir bayrak açmak, sunucu ile istemcinin ayrışabileceği bir
 * kapı açardı.
 *
 * FİYAT MAĞAZADAN. `getPackages()` mağazanın yerelleştirilmiş fiyatını
 * döndürüyor ve paywall onu gösteriyor; Apple ve Google bunu şart koşuyor.
 * Sunucudaki fiyat tablosu yalnız web vitrini ve mağaza kurulumu için.
 */
let configured = false;
const platform = (): "android" | "ios" => (Platform.OS === "ios" ? "ios" : "android");

/** Satın alma yolu açık mı (anahtar tanımlı mı). Yetki ile İLGİSİ YOK. */
export function billingAvailable(): boolean {
  return billingConfigured(platform());
}

/**
 * SDK'yı kurar ve kullanıcıyı eşler.
 *
 * `appUserID` bizim kullanıcı kimliğimiz: webhook'un `app_user_id` alanı bu
 * olduğu için yetki doğru hesaba yazılıyor. Kimlik verilmezse sağlayıcı anonim
 * bir kimlik üretir ve o satın alma hiçbir hesaba bağlanamaz.
 */
export async function configureBilling(userId: string | null): Promise<void> {
  if (!billingAvailable()) return;
  try {
    if (!configured) {
      Purchases.configure({
        apiKey: platform() === "ios" ? REVENUECAT.iosKey : REVENUECAT.androidKey,
        appUserID: userId ?? undefined,
      });
      configured = true;
    } else if (userId) {
      await Purchases.logIn(userId);
    }
  } catch { /* yut — satın alma yolu kapalı kalır, uygulama çalışmaya devam eder */ }
}

/** Oturum kapanınca: sonraki kullanıcı öncekinin satın almasını devralmasın. */
export async function billingLogout(): Promise<void> {
  if (!configured) return;
  try { await Purchases.logOut(); } catch { /* yut */ }
}

/** Mağazadaki paketler — fiyat, süre ve deneme bilgisi buradan gelir. */
export async function getPackages(): Promise<PurchasesPackage[]> {
  if (!configured) return [];
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current?.availablePackages ?? [];
  } catch {
    return [];
  }
}

/**
 * Satın alma. Dönen değer YETKİNİN sunucuda göründüğü anlamına gelir.
 *
 * Kullanıcı iptal ederse sessizce false — iptal bir hata değil.
 */
export async function purchase(pkg: PurchasesPackage): Promise<boolean> {
  if (!configured) return false;
  try {
    await Purchases.purchasePackage(pkg);
  } catch {
    return false; // iptal ya da mağaza hatası
  }
  // Mağaza tamam dedi; yetkinin webhook'la gelmesini bekliyoruz.
  return awaitPremiumAfterPurchase();
}

/**
 * Geri yükleme. Mağaza satın almayı bu cihaza/hesaba yeniden bağlıyor, sağlayıcı
 * webhook yolluyor, biz sunucuya soruyoruz.
 *
 * Geri yükleme düğmesi POLİTİKA GEREĞİ zorunlu (App Store 3.1.1): kullanıcı
 * cihaz değiştirdiğinde aboneliğine yeniden ulaşabilmeli.
 */
export async function restore(): Promise<boolean> {
  if (!configured) return false;
  try {
    await Purchases.restorePurchases();
  } catch {
    return false;
  }
  return awaitPremiumAfterPurchase(3);
}

/** Satın alma dışı bir sebeple yetki değiştiyse (kod, ödül) durumu tazele. */
export const refreshEntitlement = refreshPremium;
