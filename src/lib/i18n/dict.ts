import { ALL_DICTS } from "@/lib/i18n/dicts-all";
import { NATIVE_LANGS, DEFAULT_NATIVE, type NativeLang } from "@/lib/courses";

/**
 * Arayüz sözlükleri — mobilden çekilen taban + web'e özel anahtarlar.
 *
 * Web bugüne kadar tek dile (Türkçe) GÖMÜLÜYDÜ: 964 anahtarlık tr/en/de seti
 * mobilde vardı, web'de metin doğrudan JSX'in içine yazılıyordu. Sonucu şu:
 * Türkçe bilmeyen bir kullanıcı uygulamayı telefonda kullanabiliyor, tarayıcıda
 * kullanamıyordu.
 *
 * Sunucu tarafı zaten hazırdı — `profiles.native_lang` sütunu var, `/api/me` ve
 * `/api/profile` okuyup yazıyor. Eksik olan yalnız arayüzün onu kullanmasıydı.
 */
/*
 * KAYIT, SABİT DEĞİL (2026-10-02): sunucuda üç dil baştan dolu; tarayıcıda boş
 * başlar ve yalnız arayüz dili yüklenir (`lib/i18n/dicts-all` gerekçesi).
 */
export const DICTS: Partial<Record<NativeLang, Record<string, string>>> = ALL_DICTS;

/** Yüklenen sözlüğü kaydeder (`lib/i18n/dict-load`). Aynı dil için aynı içerik: tekrar çağrı zararsız. */
export function registerDict(lang: NativeLang, dict: Record<string, string>): void {
  DICTS[lang] = dict;
}

export { NATIVE_LANGS, DEFAULT_NATIVE };
export type { NativeLang };

/** Dillerin KENDİ adları — arayüz yanlış dildeyken bile kullanıcı kendi dilini tanısın. */
export const LANG_LABEL: Record<NativeLang, string> = { tr: "Türkçe", en: "English", de: "Deutsch" };

/**
 * Arayüz dilinin kendi adı — "{anadil} ipucunu duyacaksın" gibi metinler için.
 * Mobil `nativeLangName()` ile aynı harita.
 */
export function nativeLangName(lang: NativeLang): string {
  return LANG_LABEL[lang] ?? LANG_LABEL[DEFAULT_NATIVE];
}

export function isNativeLang(v: string | null | undefined): v is NativeLang {
  return typeof v === "string" && (NATIVE_LANGS as readonly string[]).includes(v);
}

/**
 * Anahtarı çevirir. Eksik çeviri Türkçeye, o da yoksa ANAHTARIN KENDİSİNE düşer
 * — mobil `t()` ile birebir aynı kural, aynı `{n}` yer tutucu biçimi.
 *
 * Anahtarın kendisine düşmek bilinçli: boş bir metin yerine ekranda
 * "profile.my_words" görmek, eksik çeviriyi test sırasında görünür kılıyor.
 */
export function translate(
  lang: NativeLang,
  key: string,
  vars?: Record<string, string | number>,
): string {
  /*
   * TEKİL BİÇİM. Sözlükte çoğul yoktu: "{n} friends" bir arkadaşta "1 friends"
   * diye çıkıyordu, Almancada "1 Freunde". Türkçede sorun yok — sayıdan sonra
   * isim tekil kalır — ama İngilizce ve Almanca hem ismi hem fiili değiştirir
   * ("1 word is due", "1 Wort droht").
   *
   * Ek NOKTALI (`.one`), alt çizgili değil: sözlükte adı doğal olarak "_one"
   * ile biten bir anahtar zaten var (`practice.all_game_types_in_one`) ve alt
   * çizgili ek onunla karışıyordu — denetim onu öksüz bir tekil biçim sanıp
   * düştü. Nokta anahtar adlarında ayraç, sözcük içinde geçmiyor.
   *
   * Kural küçük bilerek: `n` birse ve `<anahtar>.one` varsa o kullanılıyor,
   * yoksa temel anahtar. Yani çoğul biçimi olmayan hiçbir anahtar bundan
   * etkilenmiyor. İkiden fazla biçim isteyen diller (Lehçe, Rusça) gelirse
   * burası `Intl.PluralRules`e döner; üç dil için o makine fazla.
   */
  /* Tarayıcıda yalnız arayüz dili yüklü: istenen dil de Türkçe de yoksa
     yüklü olan sözlük (anahtar adından iyidir; anahtarlar üç dilde eşit). */
  const bul = (k: string): string | undefined =>
    DICTS[lang]?.[k] ?? DICTS[DEFAULT_NATIVE]?.[k] ?? Object.values(DICTS).find((d) => d?.[k] !== undefined)?.[k];
  const tekil = vars?.n !== undefined && Number(vars.n) === 1;
  const raw = (tekil ? bul(`${key}.one`) : undefined) ?? bul(key) ?? key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (m, name: string) => {
    const v = vars[name];
    return v === undefined ? m : String(v);
  });
}

/**
 * Arayüz dilinin sayı biçimi yerel adı.
 *
 * Binlik ayracı dile göre değişiyor (1.234 / 1,234 / 1.234) ve her yerde
 * `toLocaleString("tr-TR")` yazılıydı: İngilizce arayüzde bile Türkçe biçim
 * çıkıyordu. Kurs değil ARAYÜZ dili belirliyor — sayıyı okuyan kişi bu.
 */
const LOCALE: Record<NativeLang, string> = { tr: "tr-TR", en: "en-US", de: "de-DE" };

export function localeOf(lang: NativeLang): string {
  return LOCALE[lang] ?? LOCALE[DEFAULT_NATIVE];
}

/**
 * Binlik ayraçlı sayı, arayüz dilinde.
 *
 * `Math.round` Android ile aynı (`lib/i18n` `formatNumber`): iki taraf da
 * tam sayı yazıyor. Web'de yuvarlama yoktu ve bir kesirli değer geçtiği gün
 * iki platform aynı sayıyı farklı yazardı.
 */
export function formatNumber(n: number, lang: NativeLang): string {
  return Math.round(n).toLocaleString(localeOf(lang));
}

/**
 * Yüzde — işaretin YERİ dile göre değişiyor: Türkçe "%45", İngilizce "45%",
 * Almanca "45 %" (ve Almanca'daki boşluk BÖLÜNMEZ).
 *
 * Bu üç biçim `Intl`in zaten bildiği bir şey ve Android onu okuyor
 * (`lib/i18n` `formatPercent`). Web'de aynı bilgi ÜÇ ELLE YAZILMIŞ DİZGİDE
 * duruyordu (`common.pct`) ve iki sorunu vardı: aynı olgunun iki kaynağı
 * oluyor (biri değişirse diğeri sessizce ayrışır) ve Almanca kopyada normal
 * boşluk yazılıydı, yani sayı ile işaret satır sonunda ayrılabiliyordu.
 *
 * Ayrıca web'de yüzde yazmanın İKİ yolu vardı: bu işlev ve doğrudan
 * `t("common.pct")`. Sözlük anahtarı kalktı, tek yol bu.
 */
export function formatPercent(n: number, lang: NativeLang): string {
  try {
    return new Intl.NumberFormat(localeOf(lang), { style: "percent", maximumFractionDigits: 0 }).format(n / 100);
  } catch {
    return `${Math.round(n)}%`;
  }
}

/**
 * SAAT, arayüz dilinde: Türkçe ve Almanca "20:30", İngilizce "8:30 PM".
 *
 * Saat her yerde elle kuruluyordu: hatırlatma çipleri `HH:00` yazıyor, seri
 * koruma satırı ise sözlükte sabit "20.30" diyordu — aynı ekranda iki biçim
 * (QA F-0036). Tek yer burası; Android karşılığı `lib/i18n` `formatClock`.
 * 24 saatlik dillerde saat iki haneli ("09:00"); İngilizcede "9:00 AM".
 */
export function formatClock(hour: number, minute: number, lang: NativeLang): string {
  try {
    return new Intl.DateTimeFormat(localeOf(lang), { hour: localeOf(lang).startsWith("en") ? "numeric" : "2-digit", minute: "2-digit" }).format(new Date(2000, 0, 1, hour, minute));
  } catch {
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }
}

/**
 * GÜN, arayüz dilinde: Türkçe "9 Eki", İngilizce "Oct 9", Almanca "9. Okt.".
 * Yıl yalnız bu yılın dışındaysa eklenir ("9 Eki 2025"); `year: true` hep ekler.
 *
 * Günler kimi yerde ham ISO basılıyordu ("2026-10-09", QA F-0067: Yazılarım
 * kartı) ve kimi yerde elle `toLocaleDateString` ile kuruluyordu; tek yer
 * burası. Girdi "YYYY-MM-DD" (yerel gün, saat dilimi kaydırmadan) ya da tam
 * ISO zaman damgası. Android karşılığı `lib/i18n` `formatDay`.
 */
export function formatDay(day: string, lang: NativeLang, opts: { year?: boolean; month?: "short" | "long" } = {}): string {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(day) ? new Date(`${day}T00:00:00`) : new Date(day);
  if (Number.isNaN(d.getTime())) return day;
  const year = opts.year || d.getFullYear() !== new Date().getFullYear();
  try {
    return d.toLocaleDateString(localeOf(lang), { day: "numeric", month: opts.month ?? "short", ...(year ? { year: "numeric" } : {}) });
  } catch {
    return day;
  }
}

/**
 * Ondalıklı sayı — sayaçlar için (`8,3 sn`).
 *
 * `toFixed` SABİT NOKTA yazıyor: meydan okuma ve boss sayaçları Türkçe ve
 * Almanca arayüzde de "8.3" diyordu, oysa iki dilde de ayraç virgül. Aynı
 * kusur Android'de de vardı (`ChallengeScreen`, `BossScreen`) ve ikisi
 * birlikte düzeltildi.
 */
export function formatDecimal(n: number, lang: NativeLang, digits = 1): string {
  return n.toLocaleString(localeOf(lang), { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
