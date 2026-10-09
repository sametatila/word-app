import type { Insets } from "react-native";

/**
 * DOKUNMA HEDEFİNİN ALT SINIRI — Android 48 dp (Material), iOS 44 pt (HIG).
 *
 * QA (F-0051, build 22): hoparlör simgeleri, anahtarlar, "+XP al", "Bildir" ve
 * "Şikâyet et" bayrakları, "Kapat" / "Burada bırak" metin düğmeleri 48'in
 * altındaydı. Her çağrı yeri kendi `hitSlop` sayısını yazıyordu (4, 6, 8, 10)
 * ve toplam hiçbirinde ölçülmemişti. Görünen boyut değişmeden dokunma alanı
 * buradan tamamlanıyor: görünen ölçü verilir, eksik kısım `hitSlop` olur.
 * Web karşılığı `globals.css` `.tap-target` (44 px).
 */
export const MIN_TOUCH = 48;

/**
 * Görünen genişlik/yükseklik → dokunma alanını `MIN_TOUCH`e tamamlayan `hitSlop`.
 * Zaten yeterli eksende 0. `maxX`: yan yana sıkı dizilen öğelerde (renk şeridi)
 * komşunun alanına taşmasın diye yatay payın üst sınırı (aralığın yarısı).
 */
export function hitSlopFor(width: number, height: number = width, maxX = Infinity): Insets {
  const x = Math.min(maxX, Math.max(0, Math.ceil((MIN_TOUCH - width) / 2)));
  const y = Math.max(0, Math.ceil((MIN_TOUCH - height) / 2));
  return { top: y, bottom: y, left: x, right: x };
}
