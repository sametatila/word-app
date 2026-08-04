import "server-only";

/**
 * Durum değiştiren uçlar için aynı-köken kontrolü (CSRF savunması).
 *
 * Oturum çerezle taşındığı için, başka bir site kullanıcının tarayıcısından
 * bizim uçlarımıza istek attırmayı deneyebilir. Çerezin SameSite ayarı ve
 * JSON içerik türü bunu zaten büyük ölçüde engelliyor; bu kontrol o savunmaların
 * herhangi biri (SDK güncellemesi, çerez ayarı değişikliği) zayıfladığında
 * devreye giren ikinci katman.
 *
 * Origin başlığı yoksa istek reddedilmez: tarayıcı dışı istemciler (sendBeacon
 * bazı sürümlerde, sağlık kontrolleri) başlık göndermeyebiliyor ve bunlar
 * çerez de taşımadığı için zaten oturumsuz kalıyor.
 */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  // Host başlığıyla karşılaştırılır: vekil sunucu arkasında req.url iç adrese
  // çözülebiliyor, Host ise tarayıcının gördüğü genel alan adı olarak kalıyor.
  const host = req.headers.get("host");
  if (!host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
