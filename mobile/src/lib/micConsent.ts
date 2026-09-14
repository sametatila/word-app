import AsyncStorage from "@react-native-async-storage/async-storage";
import { decideAiConsent } from "./aiConsent";

/**
 * Yürüyüş modu mikrofon onayı — Play "belirgin açıklama ve rıza": ses ekran kapalıyken
 * de kaydedilip sunucuya ve konuşma tanıma sağlayıcılarına gittiği için sistem izin
 * diyaloğundan AYRI, uygulama içi bir açıklama ve olumlu onay gerekir. Onay cihazda
 * tutulur; Ayarlar › Gizlilik'ten geri alınabilir (geri alınca ekran yeniden gelir).
 * Anahtardaki sürüm, açıklama metni anlamlı değişirse artırılır → yeniden onay.
 */
/*
  v2 (2026-09-14): açıklama artık sesin gidebileceği sağlayıcıları ADIYLA
  sayıyor ve onay sunucuya da "ai_voice" rızası olarak yazılıyor (uç izin
  yoksa sesi sağlayıcıya iletmiyor). v1 onayları "Microsoft Azure ve benzeri"
  diyen metne verilmişti; App Store 5.1.2(i) alıcıların adıyla söylenmesini
  istediği için o onaylar yeniden soruluyor.
*/
const KEY = "lernomi:mic-consent:v2";

export async function hasMicConsent(): Promise<boolean> {
  try { return (await AsyncStorage.getItem(KEY)) !== null; } catch { return false; }
}

/**
 * Onayı GERİ ALIR: cihazdaki bayrak ve sunucudaki ses rızası birlikte. Ağ
 * yoksa sunucu tarafı yazılamaz; yürüyüş modu yine başlamaz (cihazdaki bayrak
 * kapalı) ve açıklama ekranı yeniden sorar.
 */
export async function revokeMicConsent(): Promise<void> {
  await setMicConsent(false);
  try { await decideAiConsent("ai_voice", false); } catch { /* yut */ }
}

export async function setMicConsent(on: boolean): Promise<void> {
  try {
    if (on) await AsyncStorage.setItem(KEY, new Date().toISOString());
    else await AsyncStorage.removeItem(KEY);
  } catch { /* yut */ }
}
