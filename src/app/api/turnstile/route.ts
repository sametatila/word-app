import { NextResponse } from "next/server";
import { CAPTCHA_ACTION, turnstileSiteKey } from "@/lib/auth/captcha";

/**
 * Turnstile widget'ının MOBİL için barındırıldığı sayfa.
 *
 * NEDEN BİR SAYFA: Turnstile bir tarayıcı bileşeni, React Native'de karşılığı
 * yok. Uygulama bunu bir WebView'de açıyor ve jetonu köprüden alıyor.
 *
 * NEDEN `source={{ html }}` DEĞİL: Turnstile jetonu hangi ALAN ADINDA
 * üretildiğini de imzalıyor ve Cloudflare panelindeki alan adı listesine
 * bakıyor. WebView'e gömülü ham HTML'in kökeni `about:blank` olur ve
 * doğrulama panel listesine takılır. Sayfa kendi alan adımızdan geldiğinde
 * köken web'dekiyle aynı oluyor, yani tek bir widget yapılandırması iki
 * istemciye birden yetiyor.
 *
 * Anahtar yokken 404: uygulama zaten `/api/config`e bakıp WebView'i hiç
 * çizmiyor, bu yalnız ikinci kapı.
 */
export const dynamic = "force-dynamic";

/** Yalnız Turnstile'ın tanıdığı üç değer; gerisi `auto`ya düşer. */
const THEMES = new Set(["auto", "light", "dark"]);

export async function GET(request: Request) {
  if (!turnstileSiteKey) return new NextResponse("not configured", { status: 404 });

  const asked = new URL(request.url).searchParams.get("theme") ?? "auto";
  const theme = THEMES.has(asked) ? asked : "auto";

  /*
    Gömülen üç değerin üçü de dar bir kümeden geliyor: site anahtarı
    Cloudflare'ın ürettiği alfanümerik dize, eylem sabit, tema üç değerden
    biri (yukarıda süzülüyor). Yine de hiçbiri script'in içine değil,
    özniteliğe yazılıyor.
  */
  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<style>
  html,body{margin:0;padding:0;background:transparent;overflow:hidden}
  #box{display:flex;justify-content:center;align-items:center;min-height:70px}
</style>
</head>
<body>
<!--
  ÖRTÜK ÇİZİM (data-* öznitelikleri), açık render DEĞİL. İlk yazım
  \`render=explicit\` + \`onloadTurnstileCallback\` kullanıyordu ve widget hiç
  çizilmiyordu: api.js \`async\` yükleniyor, yani geri çağrıyı tanımlayan satır
  daha çalışmadan çalışabiliyor ve Turnstile çağıracak bir şey bulamıyor
  (emülatörde boş sayfa olarak görüldü). Öznitelikli biçimde geri çağrılar
  ADLARIYLA aranıyor ve arama çizim anında yapılıyor — sıra tuzağı kalmıyor.
-->
<div id="box" class="cf-turnstile"
     data-sitekey="${turnstileSiteKey}"
     data-action="${CAPTCHA_ACTION}"
     data-theme="${theme}"
     data-callback="lernomiToken"
     data-expired-callback="lernomiExpired"
     data-error-callback="lernomiError"></div>
<script>
  (function () {
    function send(msg) {
      if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(msg));
    }
    window.lernomiToken = function (token) { send({ type: "token", token: token }); };
    window.lernomiExpired = function () { send({ type: "expired" }); };
    // \`true\`: hatayı Turnstile'ın kendi arayüzü göstersin, sayfa çökmesin.
    window.lernomiError = function () { send({ type: "error" }); return true; };
    // Uygulama jetonu harcadıktan sonra buradan yenisini istiyor.
    window.lernomiReset = function () { if (window.turnstile) window.turnstile.reset("#box"); };
  })();
</script>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      /*
        KISA ÖNBELLEK. Sayfa iki kilobayt ama site anahtarını taşıyor: anahtar
        değiştiğinde eski kopyayı tutan istemcinin ürettiği jetonlar reddedilir
        ve o kullanıcı giriş yapamaz. Bir dakika, bu pencereyi kapatacak kadar
        kısa; her açılışta yeniden indirmeyi engelleyecek kadar uzun.
      */
      "cache-control": "public, max-age=60",
    },
  });
}
