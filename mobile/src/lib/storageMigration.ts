import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Cihazdaki anahtarlar uygulama adının önekini taşıyor. Ad iki kez değişti:
 * Wortspiel -> Nomi (2026-08-31) -> Lernomi (2026-09-04). Her iki eski önek de
 * tek seferde yeni öneke taşınır ki kimse onboarding'ini, ders ilerlemesini,
 * sesini, avatarını ya da hatırlatma tercihini kaybetmesin.
 *
 * Taşınmış anahtarın üstüne yazılmaz. "lernomi" öneki "nomi" ile BAŞLAMADIĞI
 * için göç kendi çıktısını yeniden işlemez; tekrar çalışması zararsızdır.
 * Hata olursa sessiz: en kötü ihtimalle kullanıcı onboarding'i bir kez daha görür.
 */
const LEGACY_PREFIXES = ["wortspiel", "nomi"] as const;
const PREFIX = "lernomi";

export async function migrateLegacyKeys(): Promise<void> {
  try {
    const all = await AsyncStorage.getAllKeys();
    const existing = new Set(all);
    const legacy = all.filter((k) => LEGACY_PREFIXES.some((p) => k.startsWith(p)));
    if (!legacy.length) return;
    const values = await AsyncStorage.getMany(legacy);
    const writes: Record<string, string> = {};
    for (const k of legacy) {
      const p = LEGACY_PREFIXES.find((x) => k.startsWith(x));
      if (!p) continue;
      const v = values[k];
      const nk = PREFIX + k.slice(p.length);
      if (v != null && !existing.has(nk)) writes[nk] = v;
    }
    if (Object.keys(writes).length) await AsyncStorage.setMany(writes);
    await AsyncStorage.removeMany(legacy);
  } catch {
    // sessiz
  }
}
