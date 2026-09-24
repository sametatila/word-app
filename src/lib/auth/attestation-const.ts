/**
 * Cihaz doğrulaması kaydının (`guest_attestations`) saklama süresi —
 * GİZLİLİK POLİTİKASINA VERİLEN SÖZ.
 *
 * `lib/auth/play-integrity` `server-only`; politika metni ise "cihaz bütünlüğü
 * sonucu 90 gün" diye üç dilde yazılı. `lib/lessons/log-const` ile aynı
 * gerekçe: sayı tek yerde duruyor, politika onu `{{attestationDays}}`
 * belirteciyle okuyor, süpürme (`purgeExpiredGuestAttestations`, günlük
 * cron `api/cron/assess`) de buradan. Biri değişip öteki eski sözü
 * söyleyemesin diye kapı `scripts/test-legal.ts`.
 *
 * 90 gün: Aşama 3 (engelleme) kararı haftalık ve aylık geçme oranlarına
 * bakacak; bir çeyrek, sürüm geçişlerini (eski sürümün `missing`i) ve
 * mevsimsel dalgalanmayı görmeye yetiyor. Kayıt yalnız hüküm ve sebep
 * taşıyor, belgenin kendisi hiç yazılmıyor.
 */

/** Kaydın kaç gün tutulacağı. */
export const ATTESTATION_RETENTION_DAYS = 90;
