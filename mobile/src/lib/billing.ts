import { Platform } from "react-native";
import Purchases, { type CustomerInfo, type PurchasesPackage, type SubscriptionOption } from "react-native-purchases";
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
 * Satın almanın SONUCU — ekran her birinde başka bir şey söylüyor (denetim IAP-7).
 *
 *   done        yetki sunucuda görünüyor; paywall kapanır
 *   processing  mağaza parayı/denemeyi ALDI (SDK yetkiyi aktif görüyor) ama
 *               webhook henüz sunucuya düşmedi. "Satın alma alındı, birkaç
 *               saniye içinde açılacak" + arka planda beklemeye devam. Eskiden
 *               bu durum "Satın alma tamamlanmadı" hatası basıyordu: parası
 *               çekilmiş kullanıcıya en kötü cümle, ikinci kez satın almaya
 *               iten cümle.
 *   pending     ödeme onay bekliyor (Aile Paylaşımı onayı, nakit/kurye ödeme,
 *               bankanın ek doğrulaması). Hata değil; onaylanınca webhook gelir.
 *   cancelled   kullanıcı mağaza sayfasını kapattı — SESSİZ, iptal bir hata değil.
 *   failed      gerçek hata (mağaza reddetti, teklif yok, ağ).
 */
export type PurchaseOutcome = "done" | "processing" | "pending" | "cancelled" | "failed";

/**
 * Mağaza hatasını sonuca çevirir. Kodlar RevenueCat'in `PURCHASES_ERROR_CODE`
 * sözlüğünden (`PURCHASE_CANCELLED_ERROR` = "1", `PAYMENT_PENDING_ERROR` =
 * "20"); sabit dizge olarak yazılı çünkü enum SDK'nın yerel modülünden geliyor
 * ve testte (jest mock'unda) yok — karşılaştırma orada `undefined`a düşerdi.
 */
export function purchaseOutcomeOf(err: unknown): PurchaseOutcome {
  const e = err as { code?: string | number; userCancelled?: boolean | null } | null;
  const code = e?.code == null ? "" : String(e.code);
  if (e?.userCancelled || code === "1") return "cancelled";
  if (code === "20") return "pending";
  return "failed";
}

/** SDK'nın müşteri bilgisi yetkiyi aktif gösteriyor mu (sunucu henüz görmese de). */
function entitlementActive(info: CustomerInfo | null | undefined): boolean {
  return Boolean(info?.entitlements?.active?.[REVENUECAT.entitlementId]);
}

/**
 * Mağaza "tamam" dedikten sonrası — normal satın alma ve grup denemesi ORTAK.
 *
 * Yetki sunucuya webhook'la geliyor; önce kısa bir bekleme (`awaitPremiumAfterPurchase`).
 * Gelmediyse SDK'nın kendi müşteri bilgisine bakılıyor: aktifse satın alma
 * ALINMIŞ, yalnız teslimat gecikiyor → `processing`. Yetkiyi yine SDK'dan
 * AÇMIYORUZ (tek kaynak sunucu, dosya başı); yalnız doğru cümleyi seçiyoruz.
 */
async function afterStore(info: CustomerInfo | null | undefined): Promise<PurchaseOutcome> {
  if (await awaitPremiumAfterPurchase()) return "done";
  return entitlementActive(info) ? "processing" : "failed";
}

/**
 * Satın alma. `done` YETKİNİN sunucuda göründüğü anlamına gelir; öteki
 * sonuçlar `PurchaseOutcome`da.
 */
export async function purchase(pkg: PurchasesPackage): Promise<PurchaseOutcome> {
  if (!configured) return "failed";
  let info: CustomerInfo | null = null;
  try {
    info = (await Purchases.purchasePackage(pkg)).customerInfo;
  } catch (e) {
    return purchaseOutcomeOf(e);
  }
  return afterStore(info);
}

/**
 * Play'deki grup teklifi (`promo-2m`, etiket sunucudan: `offerTag`).
 *
 * Teklif "geliştiricinin belirlediği uygunluk" ile açık: Play onu herkese
 * göstermiyor, paket listesinde varsayılan seçenek değil. Etiketi taşıyan
 * seçenek paketin `subscriptionOptions` listesinden bulunuyor. Yoksa null:
 * ürün bu cihazda teklifi taşımıyor (Play henüz yaymadı, yanlış paket) —
 * çağıran "teklif şu an görünmüyor" diyor, normal fiyattan satın almaya
 * SESSİZCE düşmüyor.
 */
export function groupTrialOption(pkg: PurchasesPackage, tag: string): SubscriptionOption | null {
  return pkg.product.subscriptionOptions?.find((o) => o.tags?.includes(tag)) ?? null;
}

/**
 * Grup kodu denemesini başlatır (YALNIZ ANDROID — iOS'ta grup kodu uygulamada
 * yok, App Store Guideline 3.1.1). Sunucu kodu talep edip etiketi verdikten
 * SONRA çağrılır; sonuç `purchase` ile aynı sözlükte.
 */
export async function purchaseGroupTrial(pkg: PurchasesPackage, tag: string): Promise<PurchaseOutcome | "no_offer"> {
  if (!configured || platform() !== "android") return "failed";
  const option = groupTrialOption(pkg, tag);
  if (!option) return "no_offer";
  let info: CustomerInfo | null = null;
  try {
    info = (await Purchases.purchaseSubscriptionOption(option)).customerInfo;
  } catch (e) {
    return purchaseOutcomeOf(e);
  }
  return afterStore(info);
}

/**
 * `processing` sonrası arka plan beklemesi: webhook birkaç saniye, kimi zaman
 * bir dakika gecikiyor. Ekran açık kaldıkça daha seyrek soruluyor; yetki gelince
 * true. Satın alma kaybolmuyor — gelmezse bir sonraki açılışta görünür.
 */
export async function awaitProcessedPurchase(): Promise<boolean> {
  for (let i = 0; i < 12; i++) {
    const s = await refreshPremium();
    if (s?.premium) return true;
    await new Promise((r) => setTimeout(r, 3000 + i * 1000));
  }
  return false;
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

/**
 * App Store TEKLİF KODU (Offer Codes) — iOS'ta kodla abonelik vermenin tek meşru yolu.
 *
 * Kendi promo kodu kutumuz iOS'ta çizilmiyor: Guideline 3.1.1 özellik kilidini
 * uygulama içi satın alma dışında bir mekanizmayla (lisans anahtarı, kod) açmayı
 * yasaklıyor. Kod dağıtmak gerekirse App Store Connect'te teklif kodu üretilir ve
 * burada Apple'ın KENDİ bozdurma sayfası açılır; abonelik ve yetki normal satın
 * alma yolundan gelir (App Store → RevenueCat → webhook → sunucu).
 *
 * Yalnız mağaza bağlıyken anlamlı: bağlı değilken bozdurulan kodun gideceği bir
 * abonelik ürünü de yok.
 */
export function offerCodesAvailable(): boolean {
  return platform() === "ios" && billingAvailable();
}

/**
 * Sayfayı açar. Söz sayfa GÖSTERİLİNCE çözülüyor, kod bozdurulunca değil; çağıran
 * durumu uygulama öne döndüğünde tazeliyor (PaywallScreen).
 */
export async function presentOfferCodeRedemption(): Promise<void> {
  if (!configured || platform() !== "ios") return;
  try {
    await Purchases.presentCodeRedemptionSheet();
  } catch { /* yut — sayfa açılamazsa kullanıcı hiçbir şey kaybetmiyor */ }
}
