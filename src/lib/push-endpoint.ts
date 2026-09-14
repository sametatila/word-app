/**
 * Web Push abonelik adresi — sunucunun POST attığı yer — bilinen bir push
 * servisine mi ait?
 *
 * Adresi tarayıcı üretiyor ama uca istemci gönderiyor, yani herhangi bir URL
 * olabilir. Önceki doğrulama bir YASAK listesiydi (localhost, .local, ondalık
 * IPv4) ve atlatılıyordu: `https://0x7f.0x0.0x0.0x1/` nokta içerdiği için
 * "ad" sayılıyordu, `x.127.0.0.1.nip.io` gibi özel adrese çözülen her genel
 * DNS adı da geçiyordu. Kayıtlı bir kullanıcı sunucuya iç ağdaki bir adrese
 * VAPID imzalı POST attırabiliyor, `{ sent }` cevabından da hedefin kabul edip
 * etmediğini okuyabiliyordu (kör SSRF, güvenlik denetimi 2026-09-14, #7).
 *
 * İZİN LİSTESİ: yalnız tarayıcıların gerçekten kullandığı servisler. Alan
 * adları servis sağlayıcılarının kendi alanları olduğu için DNS yeniden
 * bağlama da kapanıyor; saldırgan bu adları özel bir IP'ye çözdüremez.
 *
 *   Chrome, Edge (Chromium), Opera, Brave, Samsung → fcm.googleapis.com
 *   Firefox                                        → *.push.services.mozilla.com
 *   Safari (macOS 13+, iOS 16.4+)                  → *.push.apple.com
 *   Eski Edge / Windows                            → *.notify.windows.com
 *
 * Yeni bir tarayıcı başka bir servis kullanırsa abonelik 400 döner ve o
 * tarayıcıda bildirim açılmaz. Sessiz bir güvenlik açığı yerine görünür bir
 * eksiklik; eklemek bu listeye bir satır.
 */

const EXACT_HOSTS = new Set(["fcm.googleapis.com"]);
const HOST_SUFFIXES = [".push.services.mozilla.com", ".push.apple.com", ".notify.windows.com"];

export function isPushEndpoint(value: string): boolean {
  if (value.length > 2048) return false;
  let u: URL;
  try {
    u = new URL(value);
  } catch {
    return false;
  }
  // Özel port, kullanıcı bilgisi ya da https dışı şema: gerçek servislerin
  // hiçbiri bunları üretmiyor.
  if (u.protocol !== "https:" || u.username || u.password || u.port) return false;
  const host = u.hostname.toLowerCase();
  return EXACT_HOSTS.has(host) || HOST_SUFFIXES.some((s) => host.endsWith(s));
}
