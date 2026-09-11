/**
 * Oturumun en uzun ömrü — GİZLİLİK POLİTİKASINA VERİLEN SÖZ.
 *
 * Politika üç dilde "oturum süresince, en çok 30 gün" ve "oturum çerezi …
 * 30 gün" diyor; sayı ise `lib/auth/server` içindeki `expiresIn`
 * hesabının içinde duruyordu (`60 * 60 * 24 * 30`). İkisi ayrı yazıldığı
 * sürece süre uzatıldığında politika eski sayıyı söylemeye devam ederdi.
 *
 * Ayrı dosyada çünkü `lib/auth/server` `server-only` ve politika metnini
 * besleyen `lib/legal` ondan bir sabit okuyamaz.
 */

/** Oturumun en uzun ömrü (gün). */
export const SESSION_MAX_DAYS = 30;
