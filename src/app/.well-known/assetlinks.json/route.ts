import { NextResponse } from "next/server";

/**
 * Android App Links beyanı.
 *
 * Android bu dosyayı `https://<alan>/.well-known/assetlinks.json` adresinden
 * okuyor ve manifest'teki `android:autoVerify="true"` filtresini ancak burada
 * KENDİ imzasını görürse doğruluyor. Doğrulanmazsa bağlantı uygulamaya
 * gitmez, tarayıcıda açılır — yani eksik beyan sessizce "eski davranış"a
 * düşüyor, bir şeyi bozmuyor.
 *
 * PARMAK İZİ HANGİSİ: uygulama Play'e AAB olarak gidiyor ve Play onu KENDİ
 * anahtarıyla yeniden imzalıyor. Buradaki değer bu yüzden Play Console ›
 * Uygulama imzalama › "Uygulama imzalama anahtarı sertifikası" altındaki
 * SHA-256 olmalı; yereldeki YÜKLEME anahtarınınki değil. İkisi karıştırılırsa
 * doğrulama mağazadan kurulan sürümde başarısız olur ve bu ancak cihazda fark
 * edilir.
 *
 * Değer env'de (`ANDROID_CERT_SHA256`) çünkü ortama göre değişiyor: yerel
 * hata ayıklama yapısı, iç test ve mağaza sürümü farklı anahtarlarla
 * imzalanabiliyor. Boşken dosya HİÇ yayımlanmıyor.
 */
export const dynamic = "force-dynamic";

/** Uygulamanın Android tarafındaki paket kimliği (build.gradle applicationId). */
const PACKAGE = "com.lernomi.learn";

export async function GET() {
  const raw = process.env.ANDROID_CERT_SHA256;
  if (!raw) return new NextResponse("not configured", { status: 404 });

  /*
    Birden çok parmak izi olabilir (yükleme anahtarı + Play'in imzası, ya da
    geçiş dönemi). Virgülle ayrılıp normalleştiriliyor: Play Console değeri
    iki nokta üst üsteyle ve büyük harfle veriyor, Android da bu biçimi
    bekliyor — yine de boşluk ve küçük harf tolere edilsin.
  */
  const fingerprints = raw
    .split(",")
    .map((f) => f.trim().toUpperCase())
    .filter(Boolean);
  if (!fingerprints.length) return new NextResponse("not configured", { status: 404 });

  const body = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: PACKAGE,
        sha256_cert_fingerprints: fingerprints,
      },
    },
  ];

  return NextResponse.json(body, {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=3600",
    },
  });
}
