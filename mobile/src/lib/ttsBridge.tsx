import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { API_BASE } from "../api/client";
import type { VoiceId } from "./voices";

/** Köprüde kullandığımız yöntemler — WebView tipinin jeneriğine takılmamak için yapısal. */
type Injectable = { injectJavaScript: (script: string) => void; reload?: () => void };

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

let lastReloadAt = 0;
/**
 * Köprüyü tazeler: WebView'i yeniden yükler ve sağlık bayraklarını sıfırlar.
 *
 * Girişte çağrılır (force=true): köprü uygulama kökünde girişten ÖNCE yüklenip
 * oturumsuz kalıyor (taze kurulum/silip-yükle). Giriş sonrası oturum çerezi artık
 * CookieManager'da (Android'de fetch ile paylaşımlı; iOS'ta sharedCookies) olduğundan
 * reload köprüyü kimlikli hâle getirir — Katja/Conrad/Emel yeni kurulumda da çalışır.
 * Hata-zehirlenmesinde de (force=false, 8sn throttle) kendini iyileştirmek için çağrılır,
 * ki geçici bir 401/ağ o oturumu kalıcı olarak cihaz TTS'ine düşürmesin.
 */
export function bridgeRefresh(force = false): void {
  const now = Date.now();
  if (!force && now - lastReloadAt < 8000) return; // reload döngüsünü engelle
  lastReloadAt = now;
  ready = false; healthy = true; errors = 0;
  finishPending();
  try { viewRef?.reload?.(); } catch { /* yut */ }
}

export type SfxKind = "correct" | "wrong" | "tap" | "micon" | "micoff" | "finish";

/**
 * Ses efektini WebView'de WebAudio ile SENTEZLER ve çalar. Kademeli (combo) mantık YOK —
 * correct/wrong SABİT sesler. Marka sesleri (Duolingo gibi akılda kalıcı, "Nomi"):
 *  - correct: net YÜKSELEN majör üçlü (E–G#–B) + oktav parıltı → belirgin mutlu/olumlu.
 *  - wrong: yumuşak İNEN iki nota → "bu değildi" ama cezalandırmayan (sert/sawtooth değil).
 *  - finish: tamamlanma fanfarı (C–E–G–C majör arpej + parıltı) → tur/etap bitişi.
 *  - micon/micoff: yürüyüş mic aç/kapa; tap: kısa dokunuş.
 * Dosya/res-raw gerektirmez; köprü hazırsa en güvenilir yol. Tanım bir kez enjekte + çağrılır.
 */
export function bridgeSfx(kind: SfxKind): void {
  if (!bridgeReady()) return;
  const def = "(function(){if(window.__nomiSfx)return;var A=window.AudioContext||window.webkitAudioContext;if(!A)return;var ctx,master;function bus(){if(!ctx)ctx=new A();if(ctx.state==='suspended'){try{ctx.resume();}catch(e){}}if(!master){master=ctx.createGain();master.gain.value=0.55;master.connect(ctx.destination);}return ctx;}function note(at,f,d,p,w,to){var c=bus();if(!c)return;var t=c.currentTime+at;var o=c.createOscillator(),g=c.createGain();o.type=w||'sine';o.frequency.setValueAtTime(f,t);if(to)o.frequency.exponentialRampToValueAtTime(Math.max(20,to),t+d);g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(p,t+0.008);g.gain.exponentialRampToValueAtTime(0.0001,t+d);o.connect(g).connect(master);o.start(t);o.stop(t+d+0.03);}window.__nomiSfx=function(k){try{if(k==='correct'){note(0,659.25,0.09,0.22);note(0.075,830.61,0.09,0.2);note(0.15,987.77,0.22,0.22);note(0.15,1975.53,0.16,0.05,'triangle');}else if(k==='wrong'){note(0,311.13,0.16,0.16,'sine',261.63);note(0.09,196,0.22,0.09,'sine');}else if(k==='finish'){note(0,523.25,0.12,0.2);note(0.1,659.25,0.12,0.2);note(0.2,783.99,0.12,0.2);note(0.3,1046.5,0.32,0.24);note(0.3,1567.98,0.4,0.07,'triangle');}else if(k==='micon'){note(0,587.33,0.09,0.13);note(0.07,880,0.12,0.11);}else if(k==='micoff'){note(0,587.33,0.08,0.11);note(0.06,392,0.14,0.1);}else{note(0,1174.66,0.05,0.09);}}catch(e){}};})();";
  const js = def + " window.__nomiSfx&&window.__nomiSfx(" + JSON.stringify(kind) + "); true;";
  try { viewRef!.injectJavaScript(js); } catch { /* yut */ }
}

/**
 * Speak-and-WAIT — yürüyüş modu için: konuşma BİTENE ("end" mesajı) kadar bekler.
 * Sıralı çağrılır (aynı anda tek utterance) → tek bekleyen resolver yeterli.
 * "end"/"error" gelmezse metin uzunluğuna göre bir üst sınırla yine de çözülür.
 */
let pendingResolve: (() => void) | null = null;
let pendingTimer: ReturnType<typeof setTimeout> | null = null;
function finishPending(): void {
  if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }
  const r = pendingResolve;
  pendingResolve = null;
  if (r) r();
}
export function bridgeSpeakAndWait(voice: VoiceId, text: string, slow = false): Promise<void> {
  return new Promise((resolve) => {
    if (!bridgeReady() || !text) { resolve(); return; }
    finishPending(); // önceki bekleyeni serbest bırak
    pendingResolve = resolve;
    const cap = Math.min(14000, Math.max(3000, text.length * 120));
    pendingTimer = setTimeout(finishPending, cap);
    const js = `window.ttsSpeak && window.ttsSpeak(${JSON.stringify(voice)},${JSON.stringify(text)},${slow ? "true" : "false"}); true;`;
    try { viewRef!.injectJavaScript(js); } catch { finishPending(); }
  });
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
          else if (m === "play") { healthy = true; errors = 0; }
          else if (m === "end") { healthy = true; errors = 0; finishPending(); } // bekleyen speak-and-wait'i çöz
          else if (m === "error") {
            // Üst üste hata → cihaz TTS'ine düş; ama köprüyü bir kez tazeleyerek (throttle'lı)
            // kendini iyileştirmeyi dene — geçici 401/ağ o oturumu kalıcı susturmasın.
            if (++errors >= 2) { healthy = false; bridgeRefresh(false); }
            finishPending();
          }
        }}
        onError={() => { ready = false; }}
        onHttpError={() => { ready = false; }}
        style={{ width: 1, height: 1 }}
      />
    </View>
  );
}
