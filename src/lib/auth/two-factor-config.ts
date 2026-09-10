/**
 * İki adımlı doğrulamanın sayıları — SUNUCU ve ARAYÜZ ortak sabitleri.
 *
 * Kodun kaç hane olduğu ve kaç dakika yaşadığı kullanıcıya söylenen bir söz
 * ("kod {n} dakika geçerli") ve aynı anda sunucudaki eklentinin
 * yapılandırması. İki yerde ayrı yazılsalardı ekrandaki süre sessizce
 * yalan söylemeye başlardı. Ayrı dosyada çünkü `lib/auth/server.ts`
 * `server-only` ve istemci ondan bir sabit okuyamaz.
 *
 * Mobil tarafta aynı değerlerin kopyası var (mobile/src/lib/twoFactor.ts);
 * orada da bu dosya kaynak gösteriliyor.
 */

/** Kodun ömrü, DAKİKA. better-auth `otpOptions.period` de bunu dakika sayıyor. */
export const TWO_FACTOR_CODE_MINUTES = 5;

/** Kodun hane sayısı. */
export const TWO_FACTOR_CODE_DIGITS = 6;

/** Yanlış kod denemesi hakkı; aşılınca giriş denemesi baştan başlar. */
export const TWO_FACTOR_ALLOWED_ATTEMPTS = 5;
