import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Yürüyüş modu mikrofon onayı — Play "belirgin açıklama ve rıza": ses ekran kapalıyken
 * de kaydedilip sunucuya ve konuşma tanıma sağlayıcılarına gittiği için sistem izin
 * diyaloğundan AYRI, uygulama içi bir açıklama ve olumlu onay gerekir. Onay cihazda
 * tutulur; Ayarlar › Gizlilik'ten geri alınabilir (geri alınca ekran yeniden gelir).
 * Anahtardaki sürüm, açıklama metni anlamlı değişirse artırılır → yeniden onay.
 */
const KEY = "lernomi:mic-consent:v1";

export async function hasMicConsent(): Promise<boolean> {
  try { return (await AsyncStorage.getItem(KEY)) !== null; } catch { return false; }
}

export async function setMicConsent(on: boolean): Promise<void> {
  try {
    if (on) await AsyncStorage.setItem(KEY, new Date().toISOString());
    else await AsyncStorage.removeItem(KEY);
  } catch { /* yut */ }
}
