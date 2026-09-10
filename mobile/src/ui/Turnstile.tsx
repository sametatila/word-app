import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { API_BASE } from "../api/client";
import { useTheme } from "../theme";

/**
 * Cloudflare Turnstile — mobil.
 *
 * Sunucu kayıt, giriş ve sıfırlama uçlarında `x-captcha-response` başlığını
 * ŞART koşuyor (bkz. web'de lib/auth/captcha.ts). Turnstile bir tarayıcı
 * bileşeni olduğu için jetonu üreten tek yol bir WebView.
 *
 * WIDGET KENDİ ALAN ADIMIZDAN GELİYOR (`/api/turnstile`), gömülü HTML'den
 * değil: Turnstile jetonu hangi kökende üretildiğini de imzalıyor ve gömülü
 * HTML'in kökeni `about:blank` olurdu — Cloudflare panelindeki alan adı
 * listesine takılırdı. Sayfanın kaynağı orada, gerekçesiyle birlikte.
 *
 * GÖRÜNÜR duruyor. Turnstile çoğu ziyaretçide hiçbir şey sormuyor ama gerektiğinde
 * bir soru sorabiliyor; sıfır yükseklikte bir WebView'de o soru çizilecek yer
 * bulamaz ve kullanıcı sebebini göremeden giriş yapamaz hâle gelirdi.
 */

/** Köprüde kullandığımız tek yöntem — WebView tipinin jeneriğine takılmamak için yapısal. */
type Injectable = { injectJavaScript: (script: string) => void };

type Message =
  | { type: "token"; token: string }
  | { type: "expired" }
  | { type: "error" };

export function Turnstile({
  resetSignal,
  onToken,
}: {
  /** Her artışta widget sıfırlanır: jeton tek kullanımlık. */
  resetSignal: number;
  onToken: (token: string | null) => void;
}) {
  const { isDark } = useTheme();
  const view = useRef<Injectable | null>(null);
  const cb = useRef(onToken);
  cb.current = onToken;

  useEffect(() => {
    if (resetSignal === 0) return; // ilk çizimde widget zaten taze
    cb.current(null);
    try { view.current?.injectJavaScript("window.lernomiReset && window.lernomiReset(); true;"); } catch { /* yut */ }
  }, [resetSignal]);

  return (
    <View style={{ height: 74, overflow: "hidden" }}>
      <WebView
        ref={(r) => { view.current = r; }}
        source={{ uri: `${API_BASE}/api/turnstile?theme=${isDark ? "dark" : "light"}` }}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
        // Sayfa saydam; uygulamanın kendi zemini görünsün.
        style={{ backgroundColor: "transparent" }}
        // Android'de varsayılan beyaz zemin saydamlığı eziyor.
        androidLayerType="software"
        onMessage={(e) => {
          let m: Message;
          try { m = JSON.parse(e.nativeEvent.data) as Message; } catch { return; }
          if (m.type === "token") cb.current(m.token);
          else if (m.type === "expired" || m.type === "error") cb.current(null);
        }}
        onError={() => cb.current(null)}
      />
    </View>
  );
}
