/**
 * DEĞERLENDİRME TABANLARI — mobil `lib/learningRules.ts` ile aynı sayılar.
 *
 * Bunlar görevin kendi alt sınırı DEĞİL (`task.minWords`, kâğıda göre 40-120
 * kelime olabiliyor). Bunlar yapay zekâ çağrısının tabanı: iki kelimeye puan
 * istemek hem anlamsız bir puan üretir hem kotadan yer yer. İki sayı sekiz
 * yerde ELLE yazılıydı ve hiçbir yerde adı geçmiyordu; kullanıcı ölü bir
 * düğmeye bakıyor, düğmenin uyduğu sayı ile ekranda yazan sayı (`{n}/{min}`)
 * birbirinden farklıydı.
 */

/** Serbest yazma ve açık sınav görevlerinde puan istemenin tabanı. */
export const MIN_ASSESS_WORDS = 5;

/** Tek cümlelik görevlerin tabanı (cümle kurma, çeviri yazma). */
export const MIN_FREE_WORDS = 2;
