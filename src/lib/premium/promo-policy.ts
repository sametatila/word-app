/**
 * Promo kodlarının süresi — TEK DEĞER (2026-09-30, Samet).
 *
 * Kodlar yalnız ücretsiz, pazarlama amacıyla dağıtılır ve yalnız 2 ay Premium
 * verir; hiçbir kanalda satılmaz. Sebep Play Ödemeler politikası: Android'deki
 * kod kutusu Play Faturalandırma dışında Premium açıyor ve bu ancak kod
 * bedelsizken savunulabilir (docs/premium/README.md §4 "Promo kodu").
 *
 * Panel API'si (`create_codes`) istemcinin gönderdiği süreyi YOK SAYAR ve bunu
 * yazar; panel formu da yalnız gösterir. Kütüphane (`createCodes`) testler için
 * süre almaya devam ediyor, üretimdeki tek giriş kapısı panel.
 */
export const PROMO_CODE_DAYS = 60;
