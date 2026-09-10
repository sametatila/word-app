import { AccessibilityInfo } from "react-native";

/**
 * "Hareketi azalt" sistem tercihi — animasyon kararı veren her yerin ortak
 * kaynağı. Web karşılığı `src/lib/fx.ts` `reducedMotion()` + `lib/use-still`.
 *
 * WEBDE VARDI, MOBİLDE HİÇ YOKTU. Web altı yerde tercihi onurlandırıyor
 * (konfeti, sayaç animasyonu, ders oynatıcısı, `globals.css` medya sorgusu);
 * mobilde `AccessibilityInfo` hiç çağrılmıyordu, yani Android'de "Animasyonları
 * kaldır" açık olan kullanıcı yüz on parçacıklı konfetiyi ve her dokunuşta
 * ölçek yayını olduğu gibi alıyordu. Bu, referans platformun geride kaldığı
 * bir erişilebilirlik ayarı.
 *
 * Değer SENKRON okunuyor: `isReduceMotionEnabled()` bir Promise döner ve
 * animasyon kararı render sırasında veriliyor. Açılışta bir kez okunup
 * saklanıyor, `reduceMotionChanged` olayı da dinleniyor - kullanıcı ayarı
 * uygulama açıkken değiştirirse bir sonraki animasyon doğru kararı verir.
 * Okunmadan önceki ilk anlarda `false`, yani animasyon açık: webin
 * `useStill()`ü de ilk render'da `false` diyor ve aynı sebeple - erişilemeyen
 * bir tercih yüzünden içeriği gizlemek daha kötü.
 */
let enabled = false;

export function reduceMotion(): boolean {
  return enabled;
}

/** Açılışta bir kez; `App.tsx` önyükleme zincirinde çağrılıyor. */
export async function loadReduceMotion(): Promise<boolean> {
  try {
    enabled = await AccessibilityInfo.isReduceMotionEnabled();
  } catch {
    enabled = false;
  }
  AccessibilityInfo.addEventListener("reduceMotionChanged", (on) => {
    enabled = on;
  });
  return enabled;
}
