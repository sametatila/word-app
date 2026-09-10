/**
 * Turnstile widget'ının `action` alanı — İSTEMCİ ve SUNUCU ortak sabiti.
 *
 * Widget jetonu bu etiketle imzalıyor, sunucu doğrulamada aynı etiketi arıyor
 * (`expectedAction`). Başka bir bağlamda üretilmiş bir jeton buraya
 * taşınamasın diye. Ayrı bir dosyada çünkü `lib/auth/captcha.ts` `server-only`
 * ve better-auth eklentisini içeri alıyor: bir sabit uğruna o modülün istemci
 * paketine girmesi gerekmesin.
 */
export const CAPTCHA_ACTION = "auth";
