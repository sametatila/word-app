/**
 * iPhone / iPad üzerinde WebKit mi (Safari, ana ekrana eklenmiş PWA, iOS'taki
 * her tarayıcı — hepsi WebKit).
 *
 * iPadOS 13'ten beri kendini Mac olarak tanıtıyor; dokunma noktası sayısı
 * ayırıyor (bkz. `install-guide` aynı kural). Sunucuda `false`.
 */
export function isAppleMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && typeof navigator.maxTouchPoints === "number" && navigator.maxTouchPoints > 1);
}
