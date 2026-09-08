import { usePremiumStatus } from "./premium";

/**
 * Kullanıcının premium durumu — TEK BOOLEAN.
 *
 * Kaynak SUNUCU (`/api/premium/status`), mağaza SDK'sı değil. Eskiden burası
 * `Purchases.getCustomerInfo()` çağırıp RevenueCat'in entitlement'ına bakıyordu;
 * o kurgunun iki kusuru vardı ve ikisi de kullanıcıya yansıyordu:
 *
 *  - Sağlayıcıya bağlıydı: RevenueCat'i çıkarmak bu ekranı ve ona bakan her
 *    ekranı yeniden yazmak demekti.
 *  - Mağazadan GELMEYEN yetkiyi göremiyordu. Promo kodu bozduran, referans ödülü
 *    kazanan ya da elle premium verilen kullanıcı uygulamada ücretsiz
 *    görünüyordu — yani kazandığı şeyi kullanamıyordu.
 *
 * Ayrıntılı durum (bitiş tarihi, kaynak, bekleyen hediye, kotalar) gerekiyorsa
 * `usePremiumStatus()` kullanılır; burası yalnız "açık mı" sorusuna cevap verir.
 */
export function usePremium(): boolean {
  const { status } = usePremiumStatus();
  return !!status?.premium;
}
