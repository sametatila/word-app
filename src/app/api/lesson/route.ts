/**
 * ESKİ ADRES — GEÇİCİ TAKMA AD. Yeni adres `/api/conversation`.
 *
 * Testteki iOS/Android build 6 Konuşma adımının sonucunu hâlâ buraya yazıyor
 * (eski gövde alanları `lessonId`/`roleplayDone` yeni uçta da kabul ediliyor).
 * İşleyici aynı; burada yalnız yeniden dışa aktarılıyor.
 *
 * BUILD 7 HERKESE ULAŞINCA SİLİNECEK (liste: docs/premium/README.md §2.2).
 */
export const dynamic = "force-dynamic";
export { POST } from "../conversation/route";
