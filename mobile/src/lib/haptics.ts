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
const MAP: Record<"correct" | "wrong" | "tap", HapticFeedbackTypes> = {
  correct: "notificationSuccess" as HapticFeedbackTypes,
  wrong: "notificationError" as HapticFeedbackTypes,
  tap: "impactLight" as HapticFeedbackTypes,
};

export function haptic(kind: "correct" | "wrong" | "tap"): void {
  try {
    trigger(MAP[kind], { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
  } catch {
    /* haptik motoru yoksa yut */
  }
  sfx(kind);
}
