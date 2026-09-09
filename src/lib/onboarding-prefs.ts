"use client";

/**
 * Hesap AÇILMADAN önce verilen kararlar — kurs, seviye, günlük hedef.
 *
 * NEDEN GEREKLİ: web'de akış "önce hesap, sonra kurulum"du. Kullanıcı değer
 * görmeden kayıt olmak zorundaydı; açılış sayfasının bütün çağrıları `/learn`e,
 * yani `/login`e gidiyordu. Mobilde sıra tersine ve bilerek öyle: Onboarding →
 * ilk kelimeler → Auth. Kullanıcı önce beş kelime öğreniyor, sonra "bunları
 * kaydetmek için" hesap açıyor.
 *
 * Kararlar o sırada saklanacak bir yer istiyor: sunucuda kullanıcı yok. Mobil
 * bunu AsyncStorage'da tutuyor (`saveOnboardingPrefs`) ve giriş yapılınca
 * profile taşıyor (`adoptAccount`). Burası aynı iş, aynı alanlar, aynı sıra.
 *
 * Anahtar mobilinkiyle aynı DEĞİL (`lernomi-onboarding`): iki depolama zaten
 * ayrı cihazlarda ve aynı adı taşımak, ileride paylaşılan bir göç yazılırsa
 * yanlış bir eşdeğerlik vaat ederdi.
 */
export type OnboardingPrefs = {
  displayName?: string;
  /**
   * Arayüz dili. Onboarding'de seçilen dil YALNIZ çerezde kalırsa hesap
   * açıldığında kayboluyordu: profil varsayılanla oluşuyor, `LangSync` de
   * profili çereze aynalayıp kullanıcının seçimini eziyordu. Karar bu yüzden
   * diğerleriyle birlikte taşınıyor.
   */
  nativeLang?: string;
  course?: string;
  voice?: string;
  goal?: string;
  level?: string;
  dailyGoal?: number;
};

const KEY = "lernomi-onboarding";

export function readOnboardingPrefs(): OnboardingPrefs {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as OnboardingPrefs) : {};
  } catch {
    return {};
  }
}

export function saveOnboardingPrefs(patch: OnboardingPrefs): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...readOnboardingPrefs(), ...patch }));
  } catch {
    /* depolama kapalıysa kararlar hesap açılışında yeniden sorulur */
  }
}

export function clearOnboardingPrefs(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* yut */
  }
}

export function hasOnboardingPrefs(): boolean {
  const p = readOnboardingPrefs();
  return Boolean(p.course || p.level || p.dailyGoal || p.displayName);
}
