"use client";

/** Cihazın saat dilimini taşıyan çerez. Sunucu fiyat bölgesini bundan okuyor. */
export const TZ_COOKIE = "tz";

/**
 * Cihazın saat dilimini çereze yazar.
 *
 * NEDEN ÇEREZ: fiyat bölgesi SUNUCUDA, sayfa çizilirken belli olmalı — yoksa
 * fiyat sonradan yerine oturur ve kullanıcı bir an yanlış para birimi görür.
 * Sunucunun tarayıcıdan öğrenebileceği tek şey istek başlıkları ve çerezler.
 *
 * NEDEN PROFİLDEKİ ALAN YETMİYOR: `profiles.timezone` NOT NULL ve varsayılanı
 * "Europe/Istanbul"; bildirimleri hiç açmamış bir kullanıcıda o alan cihazın
 * değil VARSAYILANIN değerini taşıyor. Yani orası "kullanıcı nerede"
 * sorusunun cevabı değil.
 *
 * KONUM İZNİ YOK: `Intl` cihazın kendi ayarını okuyor, tarayıcı hiçbir şey
 * sormuyor ve adres dışarı çıkmıyor.
 */
export function writeTzCookie(): void {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // "Europe/Istanbul" biçiminde olmayan bir şey gelirse hiç yazma: sunucu
    // tanımadığı bir değeri zaten GLOBAL sayar, ama çöp çerez de bırakmayalım.
    if (!tz || !/^[A-Za-z]+\/[A-Za-z0-9_+-]+$/.test(tz)) return;
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${TZ_COOKIE}=${encodeURIComponent(tz)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  } catch {
    /* çerez yazılamıyorsa fiyat GLOBAL'e düşer — yanlış bölge göstermekten iyi */
  }
}
