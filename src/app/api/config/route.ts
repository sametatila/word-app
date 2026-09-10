import { NextResponse } from "next/server";
import { authEnabled, googleConfigured, appleConfigured, appleWebConfigured } from "@/lib/auth/server";
import { turnstileSiteKey } from "@/lib/auth/captcha";

export const dynamic = "force-dynamic";

/**
 * Herkese açık istemci yapılandırması — oturum gerektirmez.
 *
 * Mobil giriş ekranı, sunucuda kapalı bir sağlayıcının düğmesini göstermesin diye
 * açılışta buraya bakar: Google OAuth ortam değişkenleri yoksa "Google ile devam et"
 * hiç çizilmez (çalışmayan düğme Play "bozuk işlevsellik" sayılır). Apple aynı
 * kapıdan geçiyor; APPLE_BUNDLE_ID tanımlı değilken iOS'ta da düğme çizilmez.
 * Sır içermez — dönen tek şey "bu sağlayıcı açık mı".
 *
 * `turnstileSiteKey` de buradan iniyor ve GEREKLİ: bot koruması açıkken mobil
 * uygulamanın her giriş isteğine bir jeton iliştirmesi şart, kapalıyken de
 * kullanıcıya boş bir doğrulama kutusu göstermemesi. Anahtar genel — Turnstile
 * widget'ı onu zaten sayfa kaynağında taşıyor.
 */
export async function GET() {
  return NextResponse.json(
    {
      auth: authEnabled,
      providers: {
        google: authEnabled && googleConfigured,
        apple: authEnabled && appleConfigured,
        /*
          Apple'ın TARAYICI akışı ayrı bir kapı: Services ID ve client secret
          ister (bkz. lib/auth/server `appleWebConfigured`). Native akışı olan
          iOS `apple`e bakıyor; Android'in native yolu YOK, orada düğme ancak
          bu açıkken çizilebilir. İkisi tek bayrak olsaydı Android'de çalışmayan
          bir düğme çıkardı.
        */
        appleWeb: authEnabled && appleWebConfigured,
      },
      turnstileSiteKey,
    },
    { headers: { "cache-control": "public, max-age=300" } },
  );
}
