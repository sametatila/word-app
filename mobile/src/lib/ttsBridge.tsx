import React from "react";
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

export function bridgeReady(): boolean {
  return ready && viewRef !== null;
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

/** Uygulama kökünde bir kez mount edilir; görünmez. */
export function TtsBridge() {
  return (
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
      onMessage={(e) => { if (e.nativeEvent.data === "ready") ready = true; }}
      onError={() => { ready = false; }}
      onHttpError={() => { ready = false; }}
      style={{ width: 0, height: 0, position: "absolute", top: -1000, opacity: 0 }}
      pointerEvents="none"
    />
  );
}
