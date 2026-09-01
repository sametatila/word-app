import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { API_BASE } from "../api/client";
import type { VoiceId } from "./voices";
import { SFX_MASTER, SFX_NOTES, type SfxKind } from "./sfxNotes";

export type { SfxKind } from "./sfxNotes";

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

/**
 * Ses efektini WebView'de WebAudio ile SENTEZLER ve çalar. Nota tablosu ve sentez modeli
 * `sfxNotes.ts`'te (TEK KAYNAK); native ekran-kapalı yol (NomiSpeechModule.playSfx) ve
 * res/raw mp3 yedeği aynı tabloyu aynı zarf/filtre modeliyle üretir → üç yol birebir aynı ses.
 * Kademeli (combo) mantık YOK — correct/wrong SABİT. Marka sesleri ksilofon ailesi:
 *  - correct: Do–Mi–Sol–Do yükselen staccato · wrong: Sol–Mi♭–Do inen minör
 *  - micon/micoff: Do–Sol / Sol–Do iki nota (yürüyüş mic aç/kapa) · finish: soru–cevap jingle'ı
 * Dosya/res-raw gerektirmez; köprü hazırsa en güvenilir yol. Tanım bir kez enjekte + çağrılır.
 */
const SFX_DEF =
  "(function(){if(window.__nomiSfx)return;var A=window.AudioContext||window.webkitAudioContext;if(!A)return;" +
  "var T=" + JSON.stringify(SFX_NOTES) + ";var M=" + SFX_MASTER + ";var ctx,master;" +
  "function bus(){if(!ctx)ctx=new A();if(ctx.state==='suspended'){try{ctx.resume();}catch(e){}}" +
  "if(!master){master=ctx.createGain();master.gain.value=M;master.connect(ctx.destination);}return ctx;}" +
  // n = [freq, start, dur, peak, wave, glide, lp, attack, hold, release] — bkz. sfxNotes.ts
  "function note(t0,n){var c=bus();if(!c)return;var f=n[0],t=t0+n[1],d=n[2],p=n[3],w=n[4],to=n[5],lp=n[6],a=n[7]||0.004,h=n[8],r=n[9];" +
  "var o=c.createOscillator(),g=c.createGain();o.type=w===2?'square':w===1?'triangle':'sine';o.frequency.setValueAtTime(f,t);" +
  "if(to>0)o.frequency.exponentialRampToValueAtTime(Math.max(20,to),t+d);var src=o;" +
  "if(lp>0){var q=c.createBiquadFilter();q.type='lowpass';q.Q.value=0.7;q.frequency.setValueAtTime(lp,t);o.connect(q);src=q;}" +
  "g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(p,t+a);" +
  "if(h>=0.5){g.gain.setValueAtTime(p,t+d-r);g.gain.exponentialRampToValueAtTime(0.0001,t+d);}else{g.gain.exponentialRampToValueAtTime(0.0001,t+d);}" +
  "src.connect(g).connect(master);o.start(t);o.stop(t+d+0.03);}" +
  "window.__nomiSfx=function(k){try{var ns=T[k]||T.tap;var c=bus();if(!c)return;var t0=c.currentTime+0.01;for(var i=0;i<ns.length;i++)note(t0,ns[i]);}catch(e){}};})();";
export function bridgeSfx(kind: SfxKind): void {
  if (!bridgeReady()) return;
  const js = SFX_DEF + " window.__nomiSfx&&window.__nomiSfx(" + JSON.stringify(kind) + "); true;";
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
