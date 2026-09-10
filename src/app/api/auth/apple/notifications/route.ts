import { NextResponse } from "next/server";
import { appleNotificationsConfigured, verifyAppleNotification } from "@/lib/auth/apple-notifications";
import { applyAppleNotification } from "@/lib/account/apple-notify";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // node:crypto ile imza doğrulaması

/**
 * Apple ile Giriş — sunucudan sunucuya bildirim ucu.
 *
 * Apple Developer › Identifiers › app.lernomi.ios › Sign in with Apple ›
 * Configure › "Server-to-Server Notification Endpoint" alanına bu adres
 * yazılıyor: `https://www.lernomi.app/api/auth/apple/notifications`
 *
 * NE GELİYOR: `{"payload": "<imzalı JWS>"}`. Dört olay var — kullanıcı gizli
 * e-posta yönlendirmesini açtı/kapattı, uygulamanın iznini kaldırdı
 * (`consent-revoked`), Apple hesabını kalıcı sildi (`account-delete`).
 *
 * NEDEN GEREKLİ: son ikisi başka hiçbir yoldan öğrenilemiyor. Bildirim
 * olmadan kullanıcı Apple ile bir daha giremez ama hesabı bizde "Apple bağlı"
 * durur; Apple hesabını silen kişinin Lernomi hesabı da ulaşılmaz hâlde
 * sonsuza kadar kalır.
 *
 * ROTA ÖNCELİĞİ: `/api/auth/*` altındaki catch-all (`[...path]`) Better Auth'a
 * ait. Next.js'te SABİT segment catch-all'ı yener, yani bu dosya o isteği
 * kendisi karşılıyor ve Better Auth hiç görmüyor. Adresin burada durmasının
 * sebebi anlamı: bu bir hesap yönetimi ucu değil, bir kimlik sağlayıcı
 * webhook'u.
 *
 * YANIT KODLARI. Apple 2xx dışını yeniden deniyor; hangi hatanın tekrar
 * denenmeye değdiği buna göre seçildi:
 *   200  işlendi, ya da bilerek yok sayıldı (bilinmeyen kullanıcı, e-posta
 *        tercihi). Yeniden denemek bir şey değiştirmez.
 *   400  gövde JSON değil ya da `payload` yok. Aynı gövde tekrar gelse yine
 *        bozuk olur.
 *   401  imza, `iss` ya da `aud` doğrulanamadı. Bu istek Apple'dan gelmiş
 *        SAYILAMAZ; sessizce 200 dönmek gerçek bir saldırıyı görünmez yapardı.
 *   503  APPLE_BUNDLE_ID boş — `aud` karşılaştırılamıyor, yani doğrulama
 *        yapılamıyor. Yapılandırma girilince tekrar denenmesi doğru.
 *   500  veritabanı. Olay kaybolmasın diye Apple'ın tekrar denemesi isteniyor.
 */
export async function POST(req: Request) {
  if (!appleNotificationsConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let payload = "";
  try {
    payload = String(((await req.json()) as { payload?: unknown }).payload ?? "");
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!payload) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const verified = await verifyAppleNotification(payload);
  if (!verified.ok) {
    // Anahtarlara ulaşılamadıysa suç bizde değil: Apple tekrar denesin.
    const status = verified.reason === "jwks_unavailable" ? 503 : 401;
    console.warn("[apple/notifications] doğrulanamadı:", verified.reason);
    return NextResponse.json({ error: verified.reason }, { status });
  }

  try {
    const outcome = await applyAppleNotification(verified.event);
    // `sub` kullanıcıyı tanımlayan bir değer; günlüğe tamamı değil kuyruğu
    // yazılıyor — bir olayı izlemeye yetiyor, kimliği tek başına vermiyor.
    console.warn(
      `[apple/notifications] ${verified.event.type} sub=…${verified.event.sub.slice(-6)} → ${outcome}`,
    );
    return NextResponse.json({ ok: true, outcome });
  } catch (err) {
    console.error("[apple/notifications]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
