/**
 * Haftalık sınavın istemcinin de bilmesi gereken sayısı.
 *
 * `lib/weekly` `server-only`; sınavın tanıtım cümlesi ("pekişmiş kelimen {n}
 * — {min}'a ulaşınca sınav pekişmişlerden kurulur") ise iki platformun
 * ekranında yazılıyor. Sayı sözlüğün İÇİNDE düz metin durduğu sürece eşik
 * değişince cümle eski sayıyı söylemeye devam ederdi.
 */

/** Sınavın pekişmiş banttan kurulması için gereken en az pekişmiş kelime. */
export const MIN_MASTERED = 30;
