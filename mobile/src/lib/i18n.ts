import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager, NativeModules, Platform } from "react-native";
import type { NativeLang } from "./courses";
import { NATIVE_LANGS, DEFAULT_NATIVE, courseOrDefault, currentCourseId } from "./courses";
import { tr } from "../i18n/tr";
import { en } from "../i18n/en";
import { de } from "../i18n/de";

/**
 * Arayüz dili (anadil) — çeviri katmanı.
 *
 * Uygulama bugüne kadar tek anadile (Türkçe) gömülüydü: 635 dizgi 118 dosyaya
 * elle yazılmıştı. Çok-parite hedefi (de→en, en→de) arayüzün de kullanıcının
 * anadilinde olmasını gerektiriyor, bkz. lib/courses.ts — `course` HEDEF dili,
 * `nativeLang` ise KAYNAK/arayüz dilini tutar.
 *
 * ## Neden hem modül düzeyi hem context
 *
 * `t()` modül düzeyinde okunuyor çünkü çeviriye ihtiyaç duyan her yer bir React
 * bileşeni değil (api/social.ts hata metinleri, game/session.ts tur adları).
 * Modül değişkeni tek başına yeniden render tetiklemediği için dil değişimini
 * dinleyen bir sağlayıcı var (I18nProvider): o `useState` ile ağacı yeniden
 * render ediyor, `t()` çağrıları da güncel dili okuyor.
 *
 * Eksik anahtar Türkçeye, o da yoksa anahtarın kendisine düşer — yeni bir dil
 * yarım çevrildiğinde ekranda boşluk değil anlaşılır metin kalır.
 */

const KEY = "nomi-lang";

const DICTS: Record<NativeLang, Record<string, string>> = { tr, en, de };

let lang: NativeLang = DEFAULT_NATIVE;
const listeners = new Set<() => void>();

function isNativeLang(v: string): v is NativeLang {
  return (NATIVE_LANGS as string[]).includes(v);
}

/**
 * Cihazın dili — ilk açılışta varsayılan.
 *
 * Yeni mimaride (newArchEnabled) yerel modül sabitleri `NativeModules.X` nesnesine
 * DÜZLEŞTİRİLMİYOR: eski köprüde `NativeModules.I18nManager.localeIdentifier`
 * çalışıyordu, TurboModule'de `undefined` geliyor ve dil sessizce Türkçeye
 * düşüyordu — yani İngilizce/Almanca cihazda uygulama Türkçe açılıyordu.
 * RN'in kendi sarmalayıcısı da sabitleri `getConstants()` ile okuyor
 * (Libraries/ReactNative/I18nManager.js), burada da öyle yapılıyor.
 *
 * Sıra: RN sabiti → Hermes Intl → (iOS) SettingsManager. Her biri ayrı korumalı;
 * biri patlarsa sonraki denenir, hiçbiri tutmazsa Türkçeye düşülür.
 */
export function deviceLang(): NativeLang {
  const candidates: (string | undefined)[] = [];

  // 1) RN sabiti: Android'de "en_US", iOS'ta "en-US".
  try {
    candidates.push(I18nManager.getConstants().localeIdentifier ?? undefined);
  } catch { /* yut */ }

  // 2) Hermes Intl (Android'de derlemeye dâhil) — mimariden bağımsız yedek.
  try {
    candidates.push(Intl.DateTimeFormat().resolvedOptions().locale);
  } catch { /* yut */ }

  // 3) iOS ayarları: kullanıcının tercih ettiği dil listesi RN sabitinden daha doğru.
  if (Platform.OS === "ios") {
    try {
      const settings = NativeModules.SettingsManager?.settings as
        | { AppleLocale?: string; AppleLanguages?: string[] }
        | undefined;
      candidates.push(settings?.AppleLanguages?.[0], settings?.AppleLocale);
    } catch { /* yut */ }
  }

  for (const raw of candidates) {
    const two = (raw ?? "").slice(0, 2).toLowerCase();
    if (isNativeLang(two)) return two;
  }
  return DEFAULT_NATIVE;
}

export function currentLang(): NativeLang {
  return lang;
}

/** Saklı dil tercihini yükler (uygulama açılışında bir kez). */
export async function loadLang(): Promise<NativeLang> {
  try {
    const saved = await AsyncStorage.getItem(KEY);
    lang = saved && isNativeLang(saved) ? saved : deviceLang();
  } catch {
    lang = deviceLang();
  }
  listeners.forEach((fn) => fn());
  return lang;
}

/** Dili değiştirir ve saklar; dinleyenler yeniden render eder. */
export async function setLang(next: NativeLang): Promise<void> {
  lang = next;
  listeners.forEach((fn) => fn());
  try {
    await AsyncStorage.setItem(KEY, next);
  } catch {
    /* yut — tercih uçucu kalır, uygulama çalışmaya devam eder */
  }
}

export function onLangChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/**
 * Çeviri. `vars` verilirse `{ad}` yer tutucuları doldurulur.
 *
 *   t("home.greeting", { name: "Ada" })   // "Merhaba Ada"
 */
export function t(key: string, vars?: Record<string, string | number>): string {
  const raw = DICTS[lang]?.[key] ?? DICTS[DEFAULT_NATIVE]?.[key] ?? key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (m, name) => {
    const v = vars[name];
    return v === undefined ? m : String(v);
  });
}

/**
 * Dil değişimini dinleyen hook.
 *
 * `t()` modül düzeyinde okuduğu için tek başına yeniden render tetiklemez.
 * Bu hook ağacın tepesinde (App/Nav) kullanılınca dil değiştiğinde tüm ekranlar
 * yeniden render edilir ve çeviriler güncellenir.
 */
export function useLang(): NativeLang {
  const [value, setValue] = useState<NativeLang>(lang);
  useEffect(() => onLangChange(() => setValue(currentLang())), []);
  return value;
}

/**
 * Öğrenilen dilin adı, kullanıcının arayüz dilinde.
 *
 * "Almanca öğren", "Almancaya çevir" gibi metinler sabit yazılıydı; İngilizce
 * kurs açılınca öğrenciye yanlış dil adı gösteriyorlardı. Artık `{lang}` yer
 * tutucusu bununla dolduruluyor.
 *
 * Türkçe metinler bilerek EK ALMAYACAK biçimde kuruldu ("Almancasını yaz"
 * yerine "{lang} karşılığını yaz"): ek uyumu dile göre değişiyor
 * (Almanca+sını / İngilizce+sini) ve yer tutucuyla doğru üretilemez.
 */
export function targetLangName(): string {
  return courseOrDefault(currentCourseId()).label[currentLang()];
}
