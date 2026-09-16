import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

/**
 * Tarayıcıdan uygulamaya giriş devri için TEK SEFERLİK bağlama değeri.
 *
 * SALDIRI. `/auth/handoff` tek kullanımlık bir giriş jetonu üretip
 * `/auth/app?ott=…` adresine yönlendiriyor, uygulama da o adresi yakalayıp
 * jetonu oturuma çeviriyordu. Jetonu KİMİN ürettiğine bakılmıyordu: saldırgan
 * kendi hesabıyla tarayıcıda giriş yapıp jetonu alabilir ve bağlantıyı
 * kurbana gönderebilirdi (mesaj, e-posta ya da telefondaki kötü niyetli bir
 * uygulamanın açık `Intent`i). Kurbanın uygulaması sessizce SALDIRGANIN
 * hesabına geçiyordu. Kurban sonra yazdığı metinleri, konuşma kayıtlarını ve
 * misafirse bütün ilerlemesini o hesaba taşıyordu (misafir birleştirmesi yeni
 * hesapta soru sormuyor).
 *
 * ÇÖZÜM. Uygulama tarayıcıyı açmadan ÖNCE buradan bir değer alıp saklıyor ve
 * dönüş adresine koyuyor (`/auth/handoff?n=…`). Sunucu değeri devir adresine
 * geçiriyor, uygulama yalnız KENDİ sakladığı değerle gelen devri kabul ediyor.
 * Saldırganın bağlantısındaki değer kurbanın cihazındakiyle eşleşmiyor.
 *
 * Sunucu bir şey saklamıyor: sır cihazda duruyor, sunucunun işi yalnız
 * tahmin edilemez bir değer üretmek (Hermes'te güvenli rastgele sayı yok).
 */
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { nonce: randomBytes(24).toString("base64url") },
    { headers: { "cache-control": "no-store" } },
  );
}
