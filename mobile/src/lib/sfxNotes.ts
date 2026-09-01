/**
 * SFX nota tablosu — TEK KAYNAK. Üç çalma yolu da bu tabloyu aynı sentez modeliyle çalar:
 *  - ttsBridge.bridgeSfx: WebView WebAudio (ekran açık, köprü hazırken)
 *  - NomiSpeechModule.playSfx (Kotlin): ekran-kapalı yürüyüş, AudioTrack ham PCM — tablo orada
 *    BİREBİR kopyadır; değiştirince `python3 scripts/render-sfx.py --kotlin` çıktısını oraya yapıştır.
 *  - android res/raw mp3 (react-native-sound yedeği): `python3 scripts/render-sfx.py` ile üretilir.
 * Sesler: Duolingo tarzı ksilofon ailesi (artifact'ta seçilen D10 / Y10 / A2 / K2 / B11).
 *
 * Nota: [freq, start, dur, peak, wave, glide, lp, attack, hold, release]
 *  wave 0 sine · 1 triangle · 2 square — glide: hedef Hz (0 yok; dur boyunca üstel kayma)
 *  lp: alçak geçiren kesim Hz (0 yok; Q 0.707) — attack: saniye
 *  hold 0: pluck (peak'ten dur sonunda 0.0001'e üstel iniş) · 1: peak'te tut, son `release` saniyede in
 */
export type SfxKind = "correct" | "wrong" | "tap" | "micon" | "micoff" | "finish";

/** Ana kazanç — tüm yollarda aynı (köprü, native, mp3). */
export const SFX_MASTER = 0.8;

// sfx-notes-begin
export const SFX_NOTES: Record<SfxKind, number[][]> = {
  // D10 Ksilofon: Do–Mi–Sol–Do (C5 E5 G5 C6), 80 ms aralık, 240 ms nota. Filtreli kare + sinüs gövde.
  correct: [
    [523.25, 0.0, 0.204, 0.07, 2, 0, 2400, 0.004, 0, 0],
    [523.25, 0.0, 0.24, 0.2, 0, 0, 0, 0.004, 0, 0],
    [659.25, 0.08, 0.204, 0.07, 2, 0, 2400, 0.004, 0, 0],
    [659.25, 0.08, 0.24, 0.2, 0, 0, 0, 0.004, 0, 0],
    [783.99, 0.16, 0.204, 0.07, 2, 0, 2400, 0.004, 0, 0],
    [783.99, 0.16, 0.24, 0.2, 0, 0, 0, 0.004, 0, 0],
    [1046.5, 0.24, 0.204, 0.07, 2, 0, 2400, 0.004, 0, 0],
    [1046.5, 0.24, 0.24, 0.2, 0, 0, 0, 0.004, 0, 0],
  ],
  // Y10 Üç aşağı: Sol–Mi♭–Do (G4 Eb4 C4) minör, 90 ms aralık, üçgen + sinüs.
  wrong: [
    [392.0, 0.0, 0.26, 0.22, 1, 0, 0, 0.004, 0, 0],
    [392.0, 0.0, 0.221, 0.12, 0, 0, 0, 0.004, 0, 0],
    [311.13, 0.09, 0.26, 0.22, 1, 0, 0, 0.004, 0, 0],
    [311.13, 0.09, 0.221, 0.12, 0, 0, 0, 0.004, 0, 0],
    [261.63, 0.18, 0.26, 0.22, 1, 0, 0, 0.004, 0, 0],
    [261.63, 0.18, 0.221, 0.12, 0, 0, 0, 0.004, 0, 0],
  ],
  // A2 İki yukarı: Do–Sol (C5 G5) 60 ms, doğrudan daha kısa ve sessiz.
  micon: [
    [523.25, 0.0, 0.17, 0.05, 2, 0, 2400, 0.004, 0, 0],
    [523.25, 0.0, 0.2, 0.16, 0, 0, 0, 0.004, 0, 0],
    [783.99, 0.06, 0.17, 0.05, 2, 0, 2400, 0.004, 0, 0],
    [783.99, 0.06, 0.2, 0.16, 0, 0, 0, 0.004, 0, 0],
  ],
  // K2 İki aşağı: Sol–Do (G5 C5) 60 ms, A2'nin aynası, daha boğuk filtre (1800 Hz).
  micoff: [
    [783.99, 0.0, 0.17, 0.05, 2, 0, 1800, 0.004, 0, 0],
    [783.99, 0.0, 0.2, 0.16, 0, 0, 0, 0.004, 0, 0],
    [523.25, 0.06, 0.17, 0.05, 2, 0, 1800, 0.004, 0, 0],
    [523.25, 0.06, 0.2, 0.16, 0, 0, 0, 0.004, 0, 0],
  ],
  // B11 Soru–cevap sade: Do–Mi–Sol–Do, Fa–La–Do–Fa, sonra Do6+Mi6 uzun akor ve üçgen pad (C4 G4).
  finish: [
    [523.25, 0.0, 0.187, 0.07, 2, 0, 2400, 0.004, 0, 0],
    [523.25, 0.0, 0.22, 0.2, 0, 0, 0, 0.004, 0, 0],
    [659.25, 0.075, 0.187, 0.07, 2, 0, 2400, 0.004, 0, 0],
    [659.25, 0.075, 0.22, 0.2, 0, 0, 0, 0.004, 0, 0],
    [783.99, 0.15, 0.187, 0.07, 2, 0, 2400, 0.004, 0, 0],
    [783.99, 0.15, 0.22, 0.2, 0, 0, 0, 0.004, 0, 0],
    [1046.5, 0.225, 0.187, 0.07, 2, 0, 2400, 0.004, 0, 0],
    [1046.5, 0.225, 0.22, 0.2, 0, 0, 0, 0.004, 0, 0],
    [698.46, 0.42, 0.187, 0.07, 2, 0, 2400, 0.004, 0, 0],
    [698.46, 0.42, 0.22, 0.2, 0, 0, 0, 0.004, 0, 0],
    [880.0, 0.495, 0.187, 0.07, 2, 0, 2400, 0.004, 0, 0],
    [880.0, 0.495, 0.22, 0.2, 0, 0, 0, 0.004, 0, 0],
    [1046.5, 0.57, 0.187, 0.07, 2, 0, 2400, 0.004, 0, 0],
    [1046.5, 0.57, 0.22, 0.2, 0, 0, 0, 0.004, 0, 0],
    [1396.91, 0.645, 0.187, 0.07, 2, 0, 2400, 0.004, 0, 0],
    [1396.91, 0.645, 0.22, 0.2, 0, 0, 0, 0.004, 0, 0],
    [1046.5, 0.92, 0.68, 0.05, 2, 0, 2400, 0.004, 0, 0],
    [1046.5, 0.92, 0.8, 0.2, 0, 0, 0, 0.004, 0, 0],
    [1318.51, 0.92, 0.68, 0.03, 2, 0, 2400, 0.004, 0, 0],
    [1318.51, 0.92, 0.8, 0.1, 0, 0, 0, 0.004, 0, 0],
    [261.63, 0.92, 0.8, 0.07, 1, 0, 1400, 0.03, 1, 0.4],
    [392.0, 0.92, 0.8, 0.07, 1, 0, 1400, 0.03, 1, 0.4],
  ],
  // Kısa dokunuş blip'i (scramble/order karo yerleştirme).
  tap: [
    [1174.66, 0, 0.05, 0.06, 0, 0, 0, 0.008, 0, 0],
  ],
};
// sfx-notes-end
