/**
 * İki adımlı doğrulamanın sayıları — sunucudaki değerlerin KOPYASI.
 *
 * Kaynak: web'de src/lib/auth/two-factor-config.ts; oradaki değerler
 * better-auth eklentisinin yapılandırmasına gidiyor. Buradaki kopya yalnız
 * ekranda söylenen söz için ("kod {n} dakika geçerli"). Ayrışırlarsa ekran
 * yanlış bir süre söyler — kodun kendisi yine sunucudaki süreye tabidir.
 */

/** Kodun ömrü, DAKİKA. */
export const TWO_FACTOR_CODE_MINUTES = 5;

/** Kodun hane sayısı. */
export const TWO_FACTOR_CODE_DIGITS = 6;

/** "Bu cihazda kod sorma" işaretinin ömrü, GÜN — yalnız ekranda söylenen söz için. */
export const TWO_FACTOR_TRUST_DAYS = 30;
