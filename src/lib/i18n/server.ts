import "server-only";
import { cookies, headers } from "next/headers";
import { DEFAULT_NATIVE, isNativeLang, translate, type NativeLang } from "@/lib/i18n/dict";
import { LANG_COOKIE } from "@/lib/i18n/cookie";

/**
 * Sunucu tarafında arayüz dili.
 *
 * KAYNAK ÇEREZ, PROFİL DEĞİL — ve bu bir taviz değil, zorunluluk. Sayfa
 * çizilirken dilin BİLİNMESİ gerekiyor; profili okumak bir veritabanı
 * gidişi demek ve o gidişi her sayfa için, metin yazmak uğruna yapmak
 * ölçülebilir bir maliyet. Üstelik oturumu olmayan yüzeylerde (açılış sayfası,
 * onboarding, ısınma) profil zaten yok.
 *
 * Çerez profilin AYNASI: dil ayarı değiştiğinde ikisi birlikte yazılıyor ve
 * uygulama kabuğu her açılışta ikisini karşılaştırıp çerezi tazeliyor
 * (bkz. components/lang-sync). Yani yetkili kaynak yine profil; çerez onun
 * sayfa çizimi sırasında okunabilen kopyası.
 */
export { LANG_COOKIE };

/**
 * Çerez YOKKEN tarayıcının dili.
 *
 * İlk ziyarette çerez de profil de yok ve sunucu doğrudan Türkçeye
 * düşüyordu: tarayıcısı Almanca olan biri açılış sayfasını, onboarding'i ve
 * ilk kelimeleri Türkçe görüyordu. Mobil bu soruyu onboarding'de AÇIKÇA
 * soruyor (`OnboardingScreen` 2. adım); web'de tarayıcı zaten cevabı
 * taşıyor, sormadan önce onu dinlemek doğru başlangıç.
 *
 * Yalnız desteklenen üç dil kabul ediliyor; "de-CH" gibi bölge ekleri
 * kırpılıyor. Kullanıcı ayarlardan değiştirdiği anda çerez yazılıyor ve
 * bu tahmin bir daha devreye girmiyor.
 */
async function fromAcceptLanguage(): Promise<NativeLang | null> {
  try {
    const raw = (await headers()).get("accept-language");
    if (!raw) return null;
    for (const part of raw.split(",")) {
      const tag = part.split(";")[0]!.trim().toLowerCase().split("-")[0];
      if (isNativeLang(tag)) return tag;
    }
  } catch {
    /* başlık okunamıyorsa varsayılan */
  }
  return null;
}

export async function getLang(): Promise<NativeLang> {
  try {
    const v = (await cookies()).get(LANG_COOKIE)?.value;
    if (isNativeLang(v)) return v;
  } catch {
    /* çerez okunamıyorsa tarayıcıya, sonra varsayılana */
  }
  return (await fromAcceptLanguage()) ?? DEFAULT_NATIVE;
}

/** Sunucu bileşenleri için bağlanmış `t` — `const t = await getT()`. */
export async function getT() {
  const lang = await getLang();
  return (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);
}
