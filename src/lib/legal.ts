/**
 * Hukuki metinlerin tek kaynağı: kimlik yer tutucuları, yürürlük tarihi ve veri işleyen
 * üçüncü taraflar. Gizlilik politikası (/privacy), kullanım şartları (/terms) ve Play
 * Veri Güvenliği beyanı (docs/play/data-safety.md) bu listeyle tutarlı olmalı — yeni
 * bir sağlayıcı eklenince önce burası güncellenir.
 *
 * Kimlik alanları [[...]] biçiminde YER TUTUCU: geliştirici/yayıncı Türkiye'de yerleşik,
 * ünvan-adres-e-posta kesinleşince yalnız bu nesne doldurulur; sayfalar yer tutucuyu
 * görünür bir etiketle basar ki yayından önce gözden kaçmasın (bkz. legal-shell Ph).
 */
export const LEGAL_EFFECTIVE_DATE = "2026-09-03";
export const LEGAL_VERSION = "1.1";

export const LEGAL_ENTITY = {
  /** Veri sorumlusu ve hizmet sağlayıcı ünvanı (şirket ünvanı ya da ad soyad). */
  name: "[[GELİŞTİRİCİ_ÜNVANI]]",
  /** Tam posta adresi. */
  address: "[[ADRES]]",
  /** Ticaret sicil / MERSİS numarası (şahıs işletmesiyse vergi dairesi ve numarası). */
  registry: "[[TİCARET_SİCİL_VEYA_MERSİS_NO]]",
  /** Gizlilik ve veri hakları talepleri için e-posta. */
  privacyEmail: "[[GİZLİLİK_E_POSTASI]]",
  /** Genel destek e-postası. */
  supportEmail: "[[DESTEK_E_POSTASI]]",
  /** Kayıtlı elektronik posta (KEP) adresi — Türkiye'de resmi tebligat. */
  kep: "[[KEP_ADRESİ]]",
  /** GDPR m.27 AB temsilcisi (ad ve adres); atanmadıysa metin bunu söyler. */
  euRepresentative: "[[AB_TEMSİLCİSİ_AD_VE_ADRES]]",
  /** UK GDPR m.27 Birleşik Krallık temsilcisi; atanmadıysa metin bunu söyler. */
  ukRepresentative: "[[BK_TEMSİLCİSİ_AD_VE_ADRES]]",
  /** Uyuşmazlıklarda yetkili mahkeme ve icra dairelerinin bulunduğu şehir. */
  court: "[[YETKİLİ_MAHKEME_ŞEHRİ]]",
  /** VERBİS kayıt numarası (yükümlülük kapsamındaysa; değilse "kapsam dışı" yazılır). */
  verbis: "[[VERBİS_KAYIT_NO_VEYA_KAPSAM_DIŞI]]",
  /** Sunucu yedeklerinin en uzun saklama süresi (gün) — silinen hesabın yedekten düşme süresi. */
  backupRetentionDays: "[[YEDEK_SAKLAMA_SÜRESİ_GÜN]]",
} as const;

/** Adil kullanım sınırları — koddaki gerçek kotalar (route dosyalarındaki sabitler). */
export const FAIR_USE = {
  roleplayTurnsPerDay: 300,
  sttRequestsPerDay: 400,
  pronounceRequestsPerDay: 120,
  reportsPerDay: 20,
} as const;

export type LegalField = keyof typeof LEGAL_ENTITY;

/** Yer tutucu mu (henüz doldurulmamış)? */
export function isLegalPlaceholder(value: string): boolean {
  return /^\[\[.+\]\]$/.test(value.trim());
}

/** Sunucuların bulunduğu yer (Netcup VPS). */
export const LEGAL_HOSTING = "Netcup GmbH, Almanya (AB)";

export const LEGAL_PATHS = {
  privacy: "/privacy",
  terms: "/terms",
  deleteAccount: "/account/delete",
} as const;

export type LegalDoc = keyof typeof LEGAL_PATHS;

/**
 * Hukuki metinlerin dilleri. Türkçe BAĞLAYICI metindir (şartlar §12b); en ve de
 * bilgi amaçlı çeviridir. Uygulamanın arayüzü üç dilde olduğu için mobil,
 * kullanıcının diline göre bağlantı veriyor — Türkçe olmayan bir arayüzden
 * yalnız Türkçe bir gizlilik politikasına düşmek Play için de kabul edilebilir
 * bir sunum değil.
 */
export const LEGAL_LOCALES = ["tr", "en", "de"] as const;
export type LegalLocale = (typeof LEGAL_LOCALES)[number];
export const LEGAL_DEFAULT_LOCALE: LegalLocale = "tr";

export function isLegalLocale(value: string): value is LegalLocale {
  return (LEGAL_LOCALES as readonly string[]).includes(value);
}

/** Türkçe kanonik yolda kalır (/terms); çeviriler alt yolda (/terms/en). */
export function legalPath(doc: LegalDoc, locale: LegalLocale = LEGAL_DEFAULT_LOCALE): string {
  const base = LEGAL_PATHS[doc];
  if (locale === LEGAL_DEFAULT_LOCALE) return base;
  return doc === "deleteAccount" ? base : `${base}/${locale}`;
}

export type Processor = {
  name: string;
  purpose: string;
  data: string;
  region: string;
  /** Aktarım güvencesi (KVKK m.9 / GDPR Bölüm V). */
  safeguard: string;
  /** Yalnız belirli özellikte devreye giren sağlayıcı. */
  when?: string;
};

const SCC = "Standart sözleşme hükümleri + veri işleme sözleşmesi";
const EU = "AB içi (yeterlilik)";

/** Verinin ulaştığı hizmet sağlayıcılar (KVKK "aktarım", GDPR "işleyici", Play "paylaşım"). */
export const PROCESSORS: Processor[] = [
  { name: "Microsoft Azure Speech", purpose: "Konuşma tanıma ve seslendirme", data: "Ses kaydı (geçici), seslendirilecek metin", region: "AB", safeguard: EU, when: "Yürüyüş modu (ekran kapalı / cepte) ve seslendirme" },
  { name: "Groq", purpose: "Konuşma tanıma (Whisper) ve dil modeli", data: "Ses kaydı (geçici), konuşma ve değerlendirme metinleri", region: "ABD", safeguard: SCC },
  { name: "Cloudflare Workers AI", purpose: "Konuşma tanıma (Whisper)", data: "Ses kaydı (geçici)", region: "Küresel ağ", safeguard: SCC },
  { name: "Speechmatics", purpose: "Konuşma tanıma", data: "Ses kaydı (geçici)", region: "Birleşik Krallık", safeguard: "Yeterlilik kararı + veri işleme sözleşmesi" },
  { name: "Deepgram", purpose: "Konuşma tanıma", data: "Ses kaydı (geçici)", region: "ABD", safeguard: SCC },
  { name: "Mistral AI", purpose: "Konuşma tanıma ve dil modeli", data: "Ses kaydı (geçici), konuşma ve değerlendirme metinleri", region: "AB", safeguard: EU },
  { name: "Cerebras", purpose: "Dil modeli", data: "Konuşma ve değerlendirme metinleri", region: "ABD", safeguard: SCC },
  { name: "Google Gemini", purpose: "Dil modeli", data: "Konuşma ve değerlendirme metinleri", region: "ABD", safeguard: SCC },
  { name: "OpenRouter", purpose: "Dil modeli yönlendirme", data: "Konuşma ve değerlendirme metinleri", region: "ABD", safeguard: SCC },
  { name: "Google (Sign-In)", purpose: "Google ile giriş", data: "Google hesabı kimliği, ad, e-posta", region: "ABD", safeguard: SCC, when: "Google ile giriş seçilirse" },
  { name: "Google Play", purpose: "Uygulama dağıtımı ve abonelik ödemeleri", data: "Satın alma bilgisi", region: "ABD", safeguard: SCC, when: "Android uygulaması ve abonelik" },
  { name: "RevenueCat", purpose: "Abonelik durumu yönetimi", data: "Kullanıcı kimliği, satın alma bilgisi", region: "ABD", safeguard: SCC, when: "Premium abonelik açılınca" },
  { name: "E-posta sağlayıcısı (SMTP)", purpose: "Doğrulama ve parola sıfırlama e-postaları", data: "E-posta adresi", region: "AB", safeguard: EU },
];
