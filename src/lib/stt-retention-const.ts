/**
 * Yürüyüş modunda tanınan metnin saklama süresi — GİZLİLİK POLİTİKASINA VERİLEN SÖZ.
 *
 * `ai_usage.heard` / `expected` (bkz. schema) "doğru söyledim ama saymadı"
 * şikâyetini ayıklamak için tutuluyor; tanıyıcı ortamdaki başka sesleri de
 * yazıya dökebildiği için süresiz kalmamalı (güvenlik denetimi 2026-10-03
 * D27). Süpürme `lib/account/retention`, metin `{{heardDays}}` belirteciyle
 * buradan okuyor (aynı gerekçe: `lib/conversations/log-const`).
 */

/** Tanınan metin ve beklenen kelime kaç gün tutulur. */
export const HEARD_RETENTION_DAYS = 30;
