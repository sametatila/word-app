/**
 * Konuşma pratiği kaydının saklama süresi — GİZLİLİK POLİTİKASINA VERİLEN SÖZ.
 *
 * `lib/lessons/log` `server-only`; politika metni ise "konuşma pratiği
 * kayıtları 30 gün, sonra kendiliğinden silinir" diye üç dilde yazılı.
 * Sayı iki yerde ayrı durduğu sürece biri değiştiğinde öteki eski sözü
 * söylemeye devam ederdi — ve burada eski söz yalnız yanlış değil, Play
 * Console ve App Store Connect'e URL olarak verilmiş bir sayfada TUTULMAYAN
 * bir taahhüt olurdu. Bu yüzden sayı burada duruyor ve politika metni onu
 * `{{speechLogDays}}` belirteciyle okuyor.
 */

/** Kaydın kaç gün tutulacağı. */
export const SPEECH_LOG_RETENTION_DAYS = 30;
