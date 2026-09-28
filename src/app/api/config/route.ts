import { NextResponse } from "next/server";
import { authEnabled, googleConfigured, appleConfigured, appleWebConfigured } from "@/lib/auth/server";
import { turnstileSiteKey } from "@/lib/auth/captcha";
import { appControl } from "@/lib/app-control";
import { guestAttestationConfig } from "@/lib/auth/play-integrity";
import { avatar3dBaseFor } from "@/lib/avatar-items";

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
export async function GET(req: Request) {
  /*
    UYGULAMA DENETİMİ de buradan iniyor: en düşük/önerilen build, bakım modu,
    mağaza bağlantıları (bkz. lib/app-control-shared). Açılışta zaten okunan
    tek herkese açık uç bu; ikinci bir istek eklemek yerine buraya kondu.
    Önbellek penceresi (5 dk) zorunlu güncellemenin en geç ne kadar sürede
    yürürlüğe girdiğini belirliyor — panelde de öyle yazılı.
  */
  const app = await appControl();
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
      /*
        Misafir açılışında cihaz doğrulaması (lib/auth/play-integrity). Kip
        kapalıyken `null`: Android istemci Play Integrity'ye hiç gitmiyor
        (kota ve gecikme yok). Açıkken hazırlık isteğinin istediği Cloud
        proje numarası; sır değil.
      */
      guestAttestation: guestAttestationConfig(),
      /*
        Nomi 3B avatar kataloğunun kökü (`AVATAR_3D_BASE`). Boşken `null` ve
        iki istemci bugünkü 2B maskotu çiziyor; dolunca `katalog.json` ve
        katmanlar buradan iniyor — uygulama güncellemesi gerekmeden açılır.
        Yedek adresten gelen istemciye yedek adresteki kopya (`avatar3dBaseFor`).
      */
      avatar3d: avatar3dBaseFor(req.headers.get("host")),
      app,
    },
    { headers: { "cache-control": "public, max-age=300" } },
  );
}
