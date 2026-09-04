/**
 * Onboarding seçimleri (kurs / hedef / seviye) — kayıt-duvarsız akışta yerelde
 * tutulur, kullanıcı hesap açınca profile taşınır (bkz. AuthContext). Misafir
 * seçimlerini kaybetmemeli: giriş yapınca kaldığı yerden, seçtiği kursla devam.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "nomi:onboarding-prefs";
/**
 * `nativeLang` burada, canlı arayüz dilinin (i18n'in `nomi-lang` anahtarı)
 * KOPYASI değil: anlamı "bu seçim henüz hesaba devredilmedi". Devredilince
 * prefs temizleniyor ve sunucu yetkili hâle geliyor — kurs/seviye ile aynı
 * kural. İki anahtar farklı soruları yanıtlıyor: biri "arayüz şu an hangi
 * dilde", öteki "hesaba yazılmayı bekleyen bir seçim var mı".
 */
export type OnboardingPrefs = { course?: string; goal?: number; level?: string; nativeLang?: string };

export async function loadOnboardingPrefs(): Promise<OnboardingPrefs> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as OnboardingPrefs) : {};
  } catch {
    return {};
  }
}

export async function saveOnboardingPrefs(patch: OnboardingPrefs): Promise<void> {
  try {
    const cur = await loadOnboardingPrefs();
    await AsyncStorage.setItem(KEY, JSON.stringify({ ...cur, ...patch }));
  } catch { /* depolama kapalıysa geç */ }
}

export async function clearOnboardingPrefs(): Promise<void> {
  try { await AsyncStorage.removeItem(KEY); } catch { /* geç */ }
}

/** Profile taşınacak alanlar var mı (boş nesne değilse). */
export function hasPrefs(p: OnboardingPrefs): boolean {
  return p.course != null || p.goal != null || p.level != null || p.nativeLang != null;
}
