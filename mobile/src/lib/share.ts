import { Share } from "react-native";
import { track } from "./track";

/**
 * Paylaşım / davet (§4 — referral & paylaşım). RN'in yerleşik Share API'siyle
 * (native dep yok) OS paylaşım sayfasını açar. Davet bağlantısı web'in
 * `invite_open` hunisiyle uyumlu (?ref=...); sonuç paylaşımı seriyi/başarıyı
 * yayar. Şimdilik ref kodu yerel/anonim — auth gelince kullanıcıya bağlanır.
 */
const APP_URL = "https://www.exfe.me";

export async function shareInvite(): Promise<void> {
  try {
    track("share", 0, "invite");
    await Share.share({
      message: `Almancayı Nomi ile oyun gibi öğreniyorum — sen de dene! ${APP_URL}?ref=davet`,
    });
  } catch { /* kullanıcı vazgeçti / paylaşım kapalı */ }
}

export async function shareResult(correct: number, total: number): Promise<void> {
  try {
    track("share", correct, "result");
    await Share.share({
      message: `Bugün Nomi'de ${total} kelimeden ${correct}'ini doğru bildim! Sen de dene: ${APP_URL}?ref=sonuc`,
    });
  } catch { /* kullanıcı vazgeçti */ }
}

export async function shareStreak(days: number): Promise<void> {
  try {
    track("share", days, "streak");
    await Share.share({
      message: `Nomi'de ${days} günlük serim var — Almanca öğrenmeye sen de başla: ${APP_URL}?ref=seri`,
    });
  } catch { /* kullanıcı vazgeçti */ }
}
