import type { AppControl, ClientPlatform } from "@/lib/app-control-shared";

/**
 * Web → mağaza yönlendirmesinin kararları (sunucu ve istemci ortak, saf).
 *
 * NEDEN WEB SATMIYOR. Satın alma yalnız App Store ve Google Play'de: web'de
 * ödeme almak mesafeli satış yükümlülükleri, ayrı fatura/iade süreci ve iki
 * mağazanın dışında ikinci bir abonelik defteri demek. Premium hakkı
 * sağlayıcıdan bağımsız tek deftere yazıldığı için (`lib/premium`) mağazada
 * alınan abonelik webde de aynı anda açılıyor; kullanıcının webden kaybettiği
 * bir şey yok, yalnız ödeme adımı telefonda.
 *
 * KURGU, cihaza göre:
 *   iOS / Android tarayıcı  tek düğme → `/get/premium`: uygulama kuruluysa
 *                           uygulamanın paywall'ı açılır (App Link / Universal
 *                           Link), değilse sunucu mağaza sayfasına yollar.
 *   Masaüstü                QR kod (aynı adres) + yayındaki mağazaların bağlantısı.
 *   Mağaza yayında değil    kırık bağlantı yerine "yakında" satırı.
 * Her yolda "uygulamada AYNI HESAPLA giriş yap" hatırlatması: başka hesapla
 * alınan abonelik bu hesapta görünmez ve en sık destek sorusu budur.
 *
 * BİLİNEN SINIR: iOS Safari, AYNI alan adındaki bir sayfadan dokunulan
 * Universal Link'i uygulamada açmıyor (Apple'ın kuralı). O durumda istek
 * sunucuya düşüyor ve App Store sayfasına gidiliyor; uygulama kuruluysa orada
 * "Aç" düğmesi var. QR ile (başka cihazdan, kamera uygulamasından) açılan
 * bağlantıda bu sınır yok.
 */

export type WebPlatform = ClientPlatform | "desktop";

/** Kaba ama yeterli: yönlendirme yalnız mağaza seçimi için. iPadOS masaüstü UA'sı masaüstü sayılır (QR gösterilir). */
export function platformOf(userAgent: string | null | undefined): WebPlatform {
  const ua = userAgent ?? "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

export type StoreLinks = Record<ClientPlatform, { live: boolean; url: string }>;

export function storeLinks(control: AppControl): StoreLinks {
  return control.store;
}

/** `/get/premium` kaynağı: yalnız bilinen etiketler olaya yazılır. */
export function cleanSource(v: string | null | undefined): string {
  return v && /^[a-z_]{1,20}$/.test(v) ? v : "paywall";
}

export const GET_PREMIUM_PATH = "/get/premium";
