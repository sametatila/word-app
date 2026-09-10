import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * HESABA AİT cihaz anahtarları — çıkışta silinir.
 *
 * Web karşılığı `components/session-keeper.tsx` `ACCOUNT_SCOPED_PREFIXES`:
 * kullanıcı kimliği değişince o önekle başlayan her `localStorage` anahtarını
 * siliyor. Gerekçesi orada yazılı - ortak cihazda bir hesabın verisi ötekine
 * görünmemeli.
 *
 * MOBİLDE BU HİÇ YOKTU. `signOut()` sunucuya çıkış atıyor, itme jetonunu
 * siliyor, RevenueCat oturumunu ve bellekteki premium durumunu kapatıyor -
 * ama `AsyncStorage` olduğu gibi kalıyordu. Yani aynı telefonda A çıkıp B
 * girdiğinde B, A'nın avatarını, serisini, günün turu/haftalık önbelleğini,
 * yarım kalmış dersini ve deneme sınavı koşularını görüyordu. `AuthContext`in
 * kendi yorumu bu sorunu bellek katmanı için anlatıyor ("bir sonraki kullanıcı
 * öncekinin yetkisini görmesin"); bu, aynı sorunun KALICI katmanı.
 *
 * CİHAZIN tercihi olanlar bilerek dışarıda ve web de öyle yapıyor: arayüz dili,
 * tema, mikrofon onayı, analitik tercihi, bildirim ayarları/kimlikleri,
 * "ilk açılış görüldü" işareti ve misafir onboarding tercihleri. Bunlar
 * telefona ait, hesaba değil - çıkışta silinseler kullanıcı her seferinde
 * baştan kurar.
 */
const ACCOUNT_SCOPED_PREFIXES = [
  "lernomi-avatar", //             avatar aksesuarları
  "lernomi-voice", //              okuma sesi (webde de hesaba ait)
  "lernomi-streak", //             seri önbelleği
  "lernomi-daily", //              günün turu önbelleği
  "lernomi-weekly", //             haftalık sınav önbelleği
  "lernomi-items-done", //         bitirilen ünite öğeleri
  "lernomi-lesson-resume:", //     yarım kalmış ders
  "lernomi:mock-done", //          bitirilen deneme kâğıtları
  "lernomi:mock-run:", //          yarım kalmış deneme koşusu
];

/** Çıkışta çağrılır. Hata yutulur: temizlik çıkışı engellememeli. */
export async function forgetAccountScoped(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const doomed = keys.filter((k) => ACCOUNT_SCOPED_PREFIXES.some((p) => k.startsWith(p)));
    /* Tek tek siliniyor: bu paket sürümünün tipinde `multiRemove` yok
       (`AsyncStorage.d.ts` yalnız `removeItem`/`getAllKeys` sayıyor).
       Anahtar sayısı bir elin parmakları kadar, toplu silmeye gerek yok. */
    for (const k of doomed) await AsyncStorage.removeItem(k);
  } catch {
    /* yut */
  }
}
