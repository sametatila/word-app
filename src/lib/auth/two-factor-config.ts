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

/**
 * "Bu cihazda kod sorma" işaretinin ömrü, GÜN.
 *
 * Bu sayı buraya yazılana kadar HİÇBİR yerde yazılı değildi: better-auth'un
 * `trustDeviceMaxAge` varsayılanı (30 gün) kullanılıyordu ve kullanıcıya
 * söylenen cümle ("bu cihazda 30 gün kod sorulmaz") o varsayılanın DOĞRU
 * kalmasına güveniyordu. Kütüphane varsayılanını değiştirse ekran eski süreyi
 * söylemeye devam ederdi ve hiçbir şey uyarmazdı. Artık eklentiye açıkça
 * geçiliyor ve cümle de buradan besleniyor.
 */
export const TWO_FACTOR_TRUST_DAYS = 30;
