/**
 * ESKİ ADRES — GEÇİCİ TAKMA AD. Yeni adres `/api/chat`.
 *
 * Testteki iOS/Android build 6 Konuşma adımının sohbetini hâlâ buraya
 * gönderiyor (eski gövde alanları `lessonId` ve `mode: "exam"` yeni uçta da
 * kabul ediliyor). İşleyici aynı; burada yalnız yeniden dışa aktarılıyor.
 *
 * BUILD 7 HERKESE ULAŞINCA SİLİNECEK (liste: docs/premium/README.md §2.2).
 */
export const dynamic = "force-dynamic";
export { GET, POST } from "../chat/route";
