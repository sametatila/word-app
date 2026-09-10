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
    Değerler JSON.stringify ile gömülüyor: ikisi de bizim denetimimizde ama
    sayfaya dize olarak giren her şeyin kaçışı tek yerde durmalı, yoksa
    yarın env'den gelen bir değer sessizce script'i kırar.
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
<div id="box"></div>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer></script>
<script>
  (function () {
    var id = null;
    function send(msg) {
      if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(msg));
    }
    // Uygulama jetonu harcadıktan sonra buradan yenisini istiyor.
    window.lernomiReset = function () { if (id !== null && window.turnstile) window.turnstile.reset(id); };
    window.onloadTurnstileCallback = function () {
      id = window.turnstile.render("#box", {
        sitekey: ${JSON.stringify(turnstileSiteKey)},
        action: ${JSON.stringify(CAPTCHA_ACTION)},
        theme: ${JSON.stringify(theme)},
        callback: function (token) { send({ type: "token", token: token }); },
        "expired-callback": function () { send({ type: "expired" }); },
        "error-callback": function () { send({ type: "error" }); return true; },
      });
      send({ type: "ready" });
    };
  })();
</script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
