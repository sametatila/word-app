import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { API_BASE } from "../api/client";
import type { VoiceId } from "./voices";

/** Köprüde kullandığımız tek yöntem — WebView tipinin jeneriğine takılmamak için yapısal. */
type Injectable = { injectJavaScript: (script: string) => void };

/**
 * TTS köprüsü — gizli bir WebView web'in `/tts-bridge` sayfasını yükler ve
 * Almanca metni `/api/tts` (Edge/Azure nöral ses) ile çalar. WebView oturum
 * çerezini paylaştığı için (sharedCookies) `/api/tts` kimlik doğrulanır; böylece
 * mobil web'le BİREBİR aynı sesi verir — cihazın kendi TTS'inin aksine gerçek
 * Katja/Conrad/Leni/Jan. Hazır değilse (yükleniyor/çevrimdışı) çağıran cihaz
 * TTS'ine düşer (bkz. lib/tts.ts).
 */
let viewRef: Injectable | null = null;
let ready = false;
let healthy = true; // ses hataları (çerez/ağ) üst üste gelirse cihaz TTS'ine düş
let errors = 0;

export function bridgeReady(): boolean {
  return ready && healthy && viewRef !== null;
}

export function bridgeSpeak(voice: VoiceId, text: string, slow: boolean): void {
  if (!bridgeReady() || !text) return;
  const js = `window.ttsSpeak && window.ttsSpeak(${JSON.stringify(voice)},${JSON.stringify(text)},${slow ? "true" : "false"}); true;`;
  try { viewRef!.injectJavaScript(js); } catch { /* yut */ }
}

export function bridgeStop(): void {
  if (!bridgeReady()) return;
  try { viewRef!.injectJavaScript("window.ttsStop && window.ttsStop(); true;"); } catch { /* yut */ }
}

/**
 * Uygulama kökünde bir kez mount edilir; GÖRÜNMEZ ve SIFIR YERLEŞİM AYAK İZİ.
 *
 * WebView'in kendisi 0×0'a güvenilmez (react-native-webview bunu düzgün
 * uygulamıyor ve ekranın üstünü kaplayıp içeriği aşağı itebiliyordu). Bu yüzden
 * mutlak konumlu, ekran DIŞINDA, 0 boyutlu, overflow-hidden bir sarmalayıcıya
 * alınır; WebView 1×1 olarak içeride çalışır (JS/ses çalışır) ama düzeni etkilemez.
 */
export function TtsBridge() {
  return (
    <View style={{ position: "absolute", width: 0, height: 0, top: -10000, left: -10000, overflow: "hidden" }} pointerEvents="none">
      <WebView
        ref={(r) => { viewRef = r; }}
        source={{ uri: `${API_BASE}/tts-bridge` }}
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        javaScriptEnabled
        domStorageEnabled
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        cacheEnabled
        onMessage={(e) => {
          const m = e.nativeEvent.data;
          if (m === "ready") { ready = true; healthy = true; errors = 0; }
          else if (m === "play" || m === "end") { healthy = true; errors = 0; } // başarı sağlığı geri getirir
          else if (m === "error") { if (++errors >= 2) healthy = false; } // üst üste hata → cihaz TTS'i
        }}
        onError={() => { ready = false; }}
        onHttpError={() => { ready = false; }}
        style={{ width: 1, height: 1 }}
      />
    </View>
  );
}
