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
