import AsyncStorage from "@react-native-async-storage/async-storage";
import { trigger, type HapticFeedbackTypes } from "react-native-haptic-feedback";
import { sfx } from "./sfx";

/**
 * Geri bildirim — haptik + kısa ses efekti BİRLİKTE: çağıran yalnız `haptic()`
 * çağırıyor, ses buradan gidiyor. Dört çağrı yeri ikisini birden yazıyordu
 * (`haptic("correct"); sfx("correct")`) ve ses yalnızca `sfx` içindeki 120 ms
 * yineleme penceresi sayesinde tek duyuluyordu — pencere kısalsa ya da kalksa
 * aynı ses üst üste iki kez çalardı. Web de tek çağrı kullanıyor (`vibrate`
 * içeriden `play` ediyor).
 *
 * BEŞİNCİ ÇAĞRI YERİ ATLANMIŞTI: `game/rounds` `markAnswer`, yani HER oyun
 * cevabının geçtiği yol. Kapı (`check:parity` 84) yeşildi çünkü ölçüsü kipi
 * DİZGİ olarak ve iki çağrıyı AYNI SATIRDA arıyordu; buradaki çift üçlü koşul
 * kullanıyor ve alt alta yazılıydı. Webde de aynı artık `walk-player`da
 * duruyordu. İkisi de temizlendi ve kapı artık kipe bakmıyor.
 * react-native-haptic-feedback
 * iOS'ta gerçek Taptic desenleri verir (eski `Vibration` iOS'ta süreyi/deseni yok
 * sayıyordu; doğru/yanlış aynı hissediliyordu). Android'de titreşim; sistem
 * kapalıysa `enableVibrateFallback` ile yine dener. Motor/ses yoksa sessizce yutulur.
 */
type HapticKind = "correct" | "wrong" | "tap" | "near" | "streak";

const MAP: Record<HapticKind, HapticFeedbackTypes> = {
  correct: "notificationSuccess" as HapticFeedbackTypes,
  wrong: "notificationError" as HapticFeedbackTypes,
  tap: "impactLight" as HapticFeedbackTypes,
  // Neredeyse: ne başarı ne hata deseni — orta bir darbe (ortak ses sözleşmesi).
  near: "impactMedium" as HapticFeedbackTypes,
  // Seri anı: başarı deseni, sesi (`streak`) ayrı ve daha parlak.
  streak: "notificationSuccess" as HapticFeedbackTypes,
};

/**
 * TİTREŞİM AÇIK MI — oyun seslerinden AYRI bayrak. `haptic()` hem sesi hem
 * titreşimi çalıyordu ve ikisi tek anahtara bağlıydı: sesi kapatan titreşimi
 * de kaybediyordu (ya da tersi, kütüphanede sessizce çalışmak isteyen
 * titreşimi istiyor, sesi istemiyor). Şimdi ses `sfx` içinde `soundEnabled`e,
 * titreşim buradaki bayrağa bakıyor; ikisi birbirinden bağımsız.
 *
 * `lib/sfx` `loadSoundPref` kalıbı: tercih AÇILIŞTA okunuyor (`App.tsx`
 * önyükleme zinciri), okunmadan önce varsayılan açık; yalnız "kapalı" yazılı.
 * Anahtar mobil önekiyle (`lernomi:`); web karşılığı `lib/fx` `lernomi-haptics`
 * (ses de böyle ayrık: `lernomi:sound` / `lernomi-sound`).
 */
const HAPTICS_PREF_KEY = "lernomi:haptics";
let hapticsOn = true;

export async function loadHapticsPref(): Promise<boolean> {
  try { hapticsOn = (await AsyncStorage.getItem(HAPTICS_PREF_KEY)) !== "off"; } catch { hapticsOn = true; }
  return hapticsOn;
}
export function hapticsEnabled(): boolean { return hapticsOn; }
export async function setHapticsEnabled(on: boolean): Promise<void> {
  hapticsOn = on;
  try { if (on) await AsyncStorage.removeItem(HAPTICS_PREF_KEY); else await AsyncStorage.setItem(HAPTICS_PREF_KEY, "off"); } catch { /* yut */ }
}

/** Yalnız titreşim (ses yok) — sesi ayrı seçen çağıranlar için (ör. lig atlama). */
export function vibrate(kind: HapticKind): void {
  if (!hapticsOn) return;
  try {
    trigger(MAP[kind], { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
  } catch {
    /* haptik motoru yoksa yut */
  }
}

/** Titreşim (titreşim ayarına bağlı) + aynı adın sesi (ses ayarına bağlı, `sfx` içinde). */
export function haptic(kind: HapticKind): void {
  vibrate(kind);
  sfx(kind);
}
