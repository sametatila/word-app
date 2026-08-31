import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Uygulama adı Wortspiel'den Nomi'ye geçti (2026-08-31). Cihazda "wortspiel"
 * önekli anahtarlar (onboarding, hatırlatma, ders ilerlemesi) yeni öneke bir
 * kez taşınır; taşınmış anahtarın üstüne yazılmaz. Hata olursa sessiz: göç
 * başarısızsa kullanıcı en kötü ihtimalle onboarding'i bir kez daha görür.
 */
export async function migrateLegacyKeys(): Promise<void> {
  try {
    const all = await AsyncStorage.getAllKeys();
    const legacy = all.filter((k) => k.startsWith("wortspiel"));
    if (!legacy.length) return;
    const existing = new Set(all);
    const values = await AsyncStorage.getMany(legacy);
    const writes: Record<string, string> = {};
    for (const k of legacy) {
      const v = values[k];
      const nk = "nomi" + k.slice("wortspiel".length);
      if (v != null && !existing.has(nk)) writes[nk] = v;
    }
    if (Object.keys(writes).length) await AsyncStorage.setMany(writes);
    await AsyncStorage.removeMany(legacy);
  } catch {
    // sessiz
  }
}
