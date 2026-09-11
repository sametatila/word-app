/**
 * Telaffuz puanının geçme eşiği — hem puanlama hem ARAYÜZ okuyor.
 *
 * Eşik `lib/pronounce` içindeydi; o modül puanlama mantığının tamamını
 * taşıyor, yani bir bileşenin oradan tek bir sayı için değer içe alması
 * gereksiz ağırlık olurdu. Beceri konuşma oynatıcısı bu yüzden `PASS = 80`
 * diye KENDİ kopyasını tutuyordu ve başında "lib/pronounce'daki PASS_SCORE
 * ile aynı olmalı" diyen bir yorum vardı — zorunluluğu yazan bir cümle, ölçen
 * bir şey yok. Sayı artık burada; iki taraf da buradan okuyor.
 */

/** Telaffuz maddesinin geçmiş sayılması için gereken bütünsel puan. */
export const PASS_SCORE = 80;

/**
 * Söyleyiş drilinde tek kaydın üst sınırı (ms).
 *
 * Söylenecek şey TEK BİR CÜMLE, o yüzden sınavın serbest cevap penceresinden
 * (`exam-player` `SPEAK_MAX_MS`, 12 s) kısa. Sayı iki platformda ayrışmıştı:
 * web `MAX_MS = 8000` diye kendi kopyasını tutuyordu, Android ise
 * `listenOnce(..., 9000)` diye satır içinde ADSIZ bir 9 saniye yazıyordu —
 * aynı dril iki platformda başka bir pencere veriyordu ve Android'in sayısını
 * kimse savunmuyordu çünkü adı yoktu.
 *
 * Mobil karşılığı `mobile/src/lib/learningRules.ts` `SPEAK_CLIP_MS`.
 */
export const SPEAK_CLIP_MS = 8000;
