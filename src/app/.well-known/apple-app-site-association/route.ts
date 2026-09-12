import { NextResponse } from "next/server";

/**
 * iOS Universal Links beyanı.
 *
 * Apple bu dosyayı `https://<alan>/.well-known/apple-app-site-association`
 * adresinden, UZANTISIZ ve `application/json` olarak istiyor; yönlendirme
 * kabul etmiyor. `public/` altına konsaydı Next uzantısız dosyaya doğru
 * içerik türünü vermezdi, o yüzden rota olarak yazıldı.
 *
 * SADECE UYGULAMANIN KARŞILAYABİLDİĞİ YOLLAR İDDİA EDİLİYOR. Bir yolu iddia
 * edip karşılamamak, bugünkü davranıştan (tarayıcıda açılır) KÖTÜ: bağlantı
 * uygulamayı açar ve kullanıcı boş bir ekranda kalır.
 *
 * `/api/auth/callback/*` BİLEREK DIŞARIDA. Google girişi o adrese dönüyor;
 * iddia edilseydi OAuth dönüşü tarayıcı yerine uygulamaya sıçrar ve giriş
 * kırılırdı. Bu yüzden joker değil, TEK TEK yol yazılıyor.
 *
 * Takım kimliği ve paket kimliği env'den: ikisi de zaten `.env` üçlüsünde
 * (APPLE_TEAM_ID, APPLE_BUNDLE_ID). Biri boşsa dosya HİÇ yayımlanmıyor —
 * yarım bir beyan, Apple'ın doğrulamayı sessizce reddetmesi demek.
 */
export const dynamic = "force-dynamic";

/**
 * Uygulamanın karşıladığı yollar (bkz. mobil `lib/deepLink`).
 *
 * ÜÇÜNCÜ YOL SONRADAN EKLENDİ VE BURASI GERİDE KALMIŞTI. `/auth/app`, sistem
 * tarayıcısında tamamlanan girişin uygulamaya dönüş adresi: `/auth/handoff`
 * tek kullanımlık bir token üretip buraya yönlendiriyor. Android tarafı bunu
 * hem manifesto'da iddia ediyor hem `parseDeepLink`te karşılıyordu; iOS beyanı
 * ise iki yolda kalmıştı. Sonucu şu: Apple'ın yerel girişinin desteklenmediği
 * bir iOS sürümünde akış tarayıcıya düşüyor ve dönüş bağlantısı uygulamayı
 * AÇMIYOR — token üç dakika yaşayıp ölüyor, kullanıcı uygulamada hâlâ girmemiş
 * oluyor.
 *
 * Liste `check:parity`de manifesto ve `parseDeepLink` ile karşılaştırılıyor:
 * üçü birlikte değişmeli.
 */
/**
 * DÖRDÜNCÜ YOL: DAVET BAĞLANTISI. `/u/<kullanıcıadı>` paylaşılan profil
 * adresi - büyüme döngüsünün kendisi. Uygulaması kurulu bir Android
 * kullanıcısı arkadaşının bağlantısına dokunduğunda uygulama değil TARAYICI
 * açılıyordu.
 *
 * Yukarıdaki kural ("yalnız karşılanabilen yol iddia edilir") burada da
 * tutuyor ve ölçüldü: web'in `/u/[username]` sayfası da oturum istiyor
 * (oturumsuz ziyaretçi girişe yollanıyor), mobil `UserScreen` ise adı konmuş
 * bir kart ve "Giriş yap" düğmesi gösteriyor. Yani iki taraf eşit ve
 * uygulamanın cevabı daha açık.
 *
 * Yol ÖNEK: kullanıcı adı değişken. Apple'ın bileşen biçiminde bu `*` ile
 * yazılıyor, Android'de `pathPrefix`, `parseDeepLink`te `startsWith`.
 */
export const APP_LINK_PATHS = ["/reset-password", "/api/auth/verify-email", "/auth/app", "/u/"] as const;

export async function GET() {
  const team = process.env.APPLE_TEAM_ID;
  const bundle = process.env.APPLE_BUNDLE_ID;
  if (!team || !bundle) return new NextResponse("not configured", { status: 404 });

  const body = {
    applinks: {
      details: [
        {
          appIDs: [`${team}.${bundle}`],
          /* Önek yolları `*` ile: `/u/` altındaki her kullanıcı adı. Tam
             eşleşen yollar olduğu gibi kalıyor - joker bir yol, iddia
             edilmemesi gereken adresleri de içine alabilir. */
          components: APP_LINK_PATHS.map((path) => ({
            "/": path.endsWith("/") ? `${path}*` : path,
            comment: `Lernomi ${path}`,
          })),
        },
      ],
    },
  };

  return NextResponse.json(body, {
    headers: {
      "content-type": "application/json",
      // Apple dosyayı arada bir tazeliyor; uzun önbellek beyanı geciktirir.
      "cache-control": "public, max-age=3600",
    },
  });
}
