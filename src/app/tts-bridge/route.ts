import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Mobil TTS köprüsü — gizli bir WebView bu sayfayı yükler ve Almanca metni
 * `/api/tts` (Edge/Azure nöral ses) ile çalar. WebView oturum çerezini
 * paylaştığı için (sharedCookies) `/api/tts` isteği kimlik doğrulanır; böylece
 * mobil, web'le BİREBİR aynı sesi (Katja/Conrad/Leni/Jan) verir — cihazın kendi
 * TTS'inin aksine. RN tarafı `injectJavaScript("ttsSpeak(v,t,slow)")` ile sürer.
 *
 * Sayfa veri taşımaz; ses ucu (/api/tts) korumalı olduğundan herkese açık
 * kalabilir. CSP script-src tanımlı değil, satır içi betik çalışır.
 */
const HTML = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#14100e">
<script>
(function () {
  var a = null;
  function post(m) { try { window.ReactNativeWebView && window.ReactNativeWebView.postMessage(m); } catch (e) {} }
  window.ttsSpeak = function (voice, text, slow) {
    try { if (a) { a.pause(); a = null; } } catch (e) {}
    if (!text) return;
    var u = "/api/tts?v=" + encodeURIComponent(voice) + "&t=" + encodeURIComponent(text) + (slow ? "&r=slow" : "");
    a = new Audio(u);
    a.addEventListener("ended", function () { post("end"); });
    a.addEventListener("error", function () { post("error"); });
    a.play().then(function () { post("play"); }).catch(function () { post("error"); });
  };
  window.ttsStop = function () { try { if (a) { a.pause(); a = null; } } catch (e) {} };
  post("ready");
})();
</script>
</body></html>`;

export function GET() {
  return new NextResponse(HTML, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
