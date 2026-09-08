import "server-only";
import { cookies } from "next/headers";
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
export async function getLang(): Promise<NativeLang> {
  try {
    const v = (await cookies()).get(LANG_COOKIE)?.value;
    if (isNativeLang(v)) return v;
  } catch {
    /* çerez okunamıyorsa varsayılan */
  }
  return DEFAULT_NATIVE;
}

/** Sunucu bileşenleri için bağlanmış `t` — `const t = await getT()`. */
export async function getT() {
  const lang = await getLang();
  return (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);
}
