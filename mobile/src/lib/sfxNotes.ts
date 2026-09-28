/**
 * SFX nota tablosu — TEK KAYNAK. Üç çalma yolu da bu tabloyu aynı sentez modeliyle çalar:
 *  - ttsBridge.bridgeSfx: WebView WebAudio (ekran açık, köprü hazırken)
 *  - ekran-kapalı yürüyüşte native ton sentezi — İKİ platformda da tablo BİREBİR kopyadır:
 *      LernomiSpeechModule.playSfx (Kotlin, AudioTrack ham PCM) ← `render-sfx.py --kotlin`
 *      LernomiSpeech.sfxNotes     (Swift, AVAudioPlayer + WAV)  ← `render-sfx.py --swift`
 *    Tabloyu değiştirince İKİ çıktıyı da yapıştır; kapı __tests__/sfxNotes.test.ts.
 *  - mp3 yedeği (react-native-sound): `python3 scripts/render-sfx.py` iki pakete birden
 *    yazar — android res/raw + ios/Lernomi/sfx.
 * ÇALMA TARİFİ (spec): üç yol da `sfx.ts` `sfxSpec()` dizgisini alıyor: "ad", "ad+katman"
 * ve isteğe bağlı "@oran" — ör. "correct+sparkle@1.498501". Parçaların notaları
 * birleştirilir, frekans/glide/lp `oran` ile çarpılır (perde kaydırma; kombo merdiveni).
 * Sesler: Duolingo tarzı ksilofon ailesi (artifact'ta seçilen D10 / Y10 / A2 / K2 / B11).
 *
 * Nota: [freq, start, dur, peak, wave, glide, lp, attack, hold, release]
 *  wave 0 sine · 1 triangle · 2 square — glide: hedef Hz (0 yok; dur boyunca üstel kayma)
 *  lp: alçak geçiren kesim Hz (0 yok; Q 0.707) — attack: saniye
 *  hold 0: pluck (peak'ten dur sonunda 0.0001'e üstel iniş) · 1: peak'te tut, son `release` saniyede in
 */
export type SfxKind =
  | "correct"
  | "wrong"
  | "tap"
  | "micon"
  | "micoff"
  | "finish"
  | "premium"
  /* Beş ipucu webde vardı, mobilde YOKTU (web-parity §11.15'te kayıtlıydı):
     turun açılışı, rozet açılışı, süre azalması, rekor ve kusursuz tur. Varlık
     farkı sanılıyordu ama üç çalma yolu da bu tablodan sentezliyor - eksik olan
     nota satırlarıydı. Tarifler web `lib/sfx` içindeki karşılıklarının aynısı. */
  | "start"
  | "unlock"
  | "danger"
  | "record"
  | "perfect"
  /* Etap bitti - web `lib/sfx` `stage` ile aynı tarif. Etap duraklaması
     mobilde hiç yoktu, sesi de yoktu. */
  | "stage"
  /* Ortak ses sözleşmesi (2026-09-28): Neredeyse ve seri anı. Web `lib/sfx`
     `near` / `streak` bu tablonun BİREBİR kopyasını çalıyor. */
  | "near"
  | "streak";

/**
 * Tabloda olup kendi başına ÇALINMAYAN katman: kombo merdiveninin ışıltısı.
 * `sfx("correct")` 4. basamaktan sonra bunu doğru sesinin üstüne bindiriyor
 * (bkz. `sfx.ts` `comboSpec`). Tabloda durması şart — üç çalma yolu (köprü,
 * Kotlin, Swift) katmanı da aynı tablodan buluyor.
 */
export type SfxLayer = "sparkle";

/** Ana kazanç — tüm yollarda aynı (köprü, native, mp3). */
export const SFX_MASTER = 0.8;

// sfx-notes-begin
export const SFX_NOTES: Record<SfxKind | SfxLayer, number[][]> = {
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
  /* ÇALINMIYOR (2026-09-17): yürüyüşte mikrofon kapanışı artık sessiz, kararın
     sesi onu da haber veriyor. Tablo duruyor ki geri açmak tek satır olsun. */
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
  // Premium jingle: yürüyüş modunda ekran kapalı yol premium'a kapalıyken, sesli
  // bilgilendirmenin ÖNÜNDE çalıyor. Görevi kesmek değil hazırlamak — kullanıcı
  // telefonu cebinde, konuşmanın geldiğini önce bu haber veriyor.
  //
  // Ailenin geri kalanından BİLEREK ayrı duruyor: ötekiler ksilofon vuruşu (kısa
  // atak + filtreli kare "ping"), bu ise açılan bir zemin. Önce C4+G4 üçgen pad
  // giriyor, motif (Do–Sol–Do) onun üstüne yavaş atakla biniyor; kare katman
  // yalnız tek bir noktada ve çok kısık — ksilofon izi kalsın ama öne çıkmasın.
  // ~1,05 sn: sözden önce duyulacak kadar uzun, beklemeye dönüşmeyecek kadar kısa.
  premium: [
    [261.63, 0.0, 1.05, 0.1, 1, 0, 1100, 0.09, 1, 0.55],
    [392.0, 0.0, 1.05, 0.08, 1, 0, 1100, 0.09, 1, 0.55],
    [523.25, 0.1, 0.34, 0.13, 0, 0, 0, 0.03, 0, 0],
    [783.99, 0.24, 0.34, 0.12, 0, 0, 0, 0.03, 0, 0],
    [1046.5, 0.38, 0.46, 0.12, 0, 0, 0, 0.035, 0, 0],
    [1046.5, 0.38, 0.3, 0.025, 2, 0, 1200, 0.02, 0, 0],
  ],
  // Turun açılışı: alçaktan yükseğe iki nota — "başlıyoruz" (web `start`).
  start: [
    [392.0, 0.0, 0.14, 0.13, 0, 0, 0, 0.004, 0, 0],
    [587.33, 0.08, 0.14, 0.13, 0, 0, 0, 0.004, 0, 0],
  ],
  // Rozet açıldı: parıltı. Aşağıdan yukarı — açılan şey bir kapı (web `unlock`).
  unlock: [
    [880.0, 0.0, 0.22, 0.13, 1, 0, 0, 0.004, 0, 0],
    [1174.66, 0.06, 0.22, 0.13, 1, 0, 0, 0.004, 0, 0],
    [1318.51, 0.12, 0.22, 0.13, 1, 0, 0, 0.004, 0, 0],
    [1760.0, 0.18, 0.5, 0.06, 0, 0, 0, 0.004, 0, 0],
  ],
  // Süre azalıyor: alçak, kısa uyarı tıkı (web `danger`).
  danger: [
    [349.23, 0.0, 0.07, 0.12, 2, 0, 0, 0.004, 0, 0],
  ],
  // Rekor: yükselen dörtlü + altında tutulan bir beşli (web `record`).
  record: [
    [261.63, 0.0, 0.65, 0.07, 0, 0, 0, 0.004, 0, 0],
    [523.25, 0.0, 0.24, 0.17, 0, 0, 0, 0.004, 0, 0],
    [698.46, 0.085, 0.24, 0.17, 0, 0, 0, 0.004, 0, 0],
    [880.0, 0.17, 0.24, 0.17, 0, 0, 0, 0.004, 0, 0],
    [1174.66, 0.255, 0.24, 0.17, 0, 0, 0, 0.004, 0, 0],
  ],
  // Kusursuz tur: majör üçlü, oktavla taçlanıyor (web `perfect`).
  perfect: [
    [523.25, 0.0, 0.2, 0.16, 0, 0, 0, 0.004, 0, 0],
    [659.25, 0.07, 0.2, 0.16, 0, 0, 0, 0.004, 0, 0],
    [783.99, 0.14, 0.2, 0.16, 0, 0, 0, 0.004, 0, 0],
    [1046.5, 0.21, 0.2, 0.16, 0, 0, 0, 0.004, 0, 0],
    [1567.98, 0.28, 0.35, 0.09, 1, 0, 0, 0.004, 0, 0],
  ],
  // Etap bitti: küçük bir majör üçlü (web `stage`).
  stage: [
    [523.25, 0.0, 0.18, 0.15, 0, 0, 0, 0.004, 0, 0],
    [659.25, 0.075, 0.18, 0.15, 0, 0, 0, 0.004, 0, 0],
    [783.99, 0.15, 0.18, 0.15, 0, 0, 0, 0.004, 0, 0],
  ],
  // Neredeyse (yazım hatası, küçük eksik): Mi–Sol (E5 G5) iki yumuşak nota, 100 ms
  // aralık. Doğrunun Do'ya çözülen yükselişinin YARISI — çözülmüyor, "az kaldı" diyor.
  // Sinüs gövde + boğuk üçgen (1600 Hz), kare yok: doğrudan daha yumuşak. ~0,35 sn.
  near: [
    [659.25, 0.0, 0.2, 0.13, 0, 0, 0, 0.006, 0, 0],
    [659.25, 0.0, 0.18, 0.04, 1, 0, 1600, 0.006, 0, 0],
    [783.99, 0.1, 0.25, 0.13, 0, 0, 0, 0.006, 0, 0],
    [783.99, 0.1, 0.22, 0.04, 1, 0, 1600, 0.006, 0, 0],
  ],
  // Seri anı: Sol–La–Do–Re–Mi (G5→E6) pentatonik hızlı tırmanış (50 ms), Sol6'da
  // durup ışıldıyor: üstte Do7–Mi7–Sol7 üçgen ışıltı. Ksilofon ailesi (kare + sinüs).
  // ~0,87 sn — kutlama ≤1,5 sn kuralının içinde.
  streak: [
    [783.99, 0.0, 0.14, 0.05, 2, 0, 3000, 0.004, 0, 0],
    [783.99, 0.0, 0.16, 0.15, 0, 0, 0, 0.004, 0, 0],
    [880.0, 0.05, 0.14, 0.05, 2, 0, 3000, 0.004, 0, 0],
    [880.0, 0.05, 0.16, 0.15, 0, 0, 0, 0.004, 0, 0],
    [1046.5, 0.1, 0.14, 0.05, 2, 0, 3000, 0.004, 0, 0],
    [1046.5, 0.1, 0.16, 0.15, 0, 0, 0, 0.004, 0, 0],
    [1174.66, 0.15, 0.14, 0.05, 2, 0, 3000, 0.004, 0, 0],
    [1174.66, 0.15, 0.16, 0.15, 0, 0, 0, 0.004, 0, 0],
    [1318.51, 0.2, 0.14, 0.05, 2, 0, 3000, 0.004, 0, 0],
    [1318.51, 0.2, 0.16, 0.15, 0, 0, 0, 0.004, 0, 0],
    [1567.98, 0.27, 0.45, 0.04, 2, 0, 3000, 0.004, 0, 0],
    [1567.98, 0.27, 0.55, 0.14, 0, 0, 0, 0.004, 0, 0],
    [2093.0, 0.33, 0.2, 0.05, 1, 0, 0, 0.008, 0, 0],
    [2637.02, 0.4, 0.2, 0.04, 1, 0, 0, 0.008, 0, 0],
    [3135.96, 0.47, 0.4, 0.035, 1, 0, 0, 0.008, 0, 0],
  ],
  // KATMAN (tek başına çalınmaz): kombo ışıltısı. Web `correctCue` 4. doğrudan sonra
  // `note(0.05, root * 3, 0.12, 0.05, "triangle")` çalıyor; kök burada C5 (523.25),
  // merdiven perdesi `@oran` ile birlikte kaydırılıyor → root * 3 birebir.
  sparkle: [
    [1569.75, 0.05, 0.12, 0.05, 1, 0, 0, 0.008, 0, 0],
  ],
  // Kısa dokunuş blip'i (scramble/order karo yerleştirme).
  tap: [
    [1174.66, 0, 0.05, 0.06, 0, 0, 0, 0.008, 0, 0],
  ],
};
// sfx-notes-end
