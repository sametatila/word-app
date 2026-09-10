import "server-only";
import Redis from "ioredis";

/**
 * Kimlik katmanının paylaştığı Redis bağlantısı.
 *
 * İki çağıranı var ve ikisi de aynı soruyu soruyor: "bu sayacı üç instance
 * birlikte görsün". Hız sınırı sayacı (rate-limit-store) ve hesap başına
 * başarısız giriş sayacı (login-throttle). Ayrı ayrı bağlantı açmalarının
 * bir gerekçesi yok; buradaki tek istemciyi paylaşıyorlar.
 *
 * BAĞLANTI TEMBEL: modülün yüklenmesi Redis'e bağlı değil. İlk komut
 * bağlantıyı kuruyor ve `connectTimeout` o beklemeyi yarım saniyeyle
 * sınırlıyor. `enableOfflineQueue` varsayılanında (açık) bırakıldı — kapalıyken
 * ilk komut bağlantı kurulmadan reddediliyor ve her şey sessizce açığa
 * düşüyordu (ölçüldü 2026-09-10).
 */
let client: Redis | null = null;

export function redisClient(): Redis | null {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  if (!client) {
    client = new Redis(url, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      connectTimeout: 500,
      commandTimeout: 500,
    });
    // Dinleyici olmazsa ioredis bağlantı hatasını fırlatır; her komut zaten
    // kendi try/catch'inde karşılanıyor.
    client.on("error", () => { /* çağıranların catch'i karşılıyor */ });
  }
  return client;
}

/**
 * Açığa düşüş SESSİZ OLMAMALI.
 *
 * İlk sürümde catch hiçbir şey yazmıyordu ve bir yapılandırma hatası yüzünden
 * her komut düşüyordu: sayaçlar fiilen yoktu ama her şey yolunda görünüyordu.
 * Sessiz bir "açığa düş", hiç sayaç koymamaktan daha kötü çünkü yanlış bir
 * güven veriyor. Log bir kez basılıp susuluyor — her istekte basmak, Redis
 * kesintisinde günlüğü boğardı.
 *
 * Metin İNGİLİZCE: bu bir arayüz dizgisi değil, sunucu log'u.
 */
let warned = false;
export function warnRedisOnce(err: unknown): void {
  if (warned) return;
  warned = true;
  console.error("[auth/redis] unreachable, counters skipped (nginx limit still applies):", err);
}
