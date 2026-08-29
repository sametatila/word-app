import { Vibration } from "react-native";

/**
 * Dokunsal geri bildirim — web'deki lib/fx vibrate desenleriyle aynı.
 * Doğru: kısa tek titreşim; yanlış: çift; dokunuş: çok kısa. Sessizce yutulur.
 */
export function haptic(kind: "correct" | "wrong" | "tap"): void {
  try {
    if (kind === "correct") Vibration.vibrate(18);
    else if (kind === "wrong") Vibration.vibrate([0, 34, 60, 34]);
    else Vibration.vibrate(8);
  } catch {
    /* titreşim yoksa yut */
  }
}
