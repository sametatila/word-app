/**
 * Hukuki metinlerin tek kaynağı: kimlik yer tutucuları, yürürlük tarihi ve veri işleyen
 * üçüncü taraflar. Gizlilik politikası (/privacy), kullanım şartları (/terms) ve Play
 * Veri Güvenliği beyanı (docs/play/data-safety.md) bu listeyle tutarlı olmalı — yeni
 * bir sağlayıcı eklenince önce burası güncellenir.
 *
 * KİMLİK PROFİLİ: ŞİRKETSİZ GERÇEK KİŞİ
 *
 * Geliştirici Türkiye'de yerleşik bir gerçek kişi ve Gelir Vergisi Kanunu mükerrer
 * m.20/B'deki "mobil cihazlar için uygulama geliştiriciliği kazanç istisnası"
 * kapsamında çalışıyor. Bu, metinlerin şeklini değiştiriyor:
 *
 *   - Ticaret siciline kayıtlı bir tacir YOK: ticaret sicil numarası ve MERSİS
 *     numarası da yok. Onların yerine bağlı olunan vergi dairesi yazılıyor.
 *   - TCKN/VKN buraya YAZILMAZ. Sayfalar herkese açık; kimlik numarasını yayımlamak
 *     kimlik hırsızlığına davetiye. KVKK aydınlatması ve 6563 tanıtıcı bilgi
 *     yükümlülüğü için ad-soyad, adres ve iletişim kanalı yeterli.
 *   - KEP zorunlu değil (TTK m.18/3 tacirler için). Yoksa bu alan BOŞ bırakılır;
 *     boş alan sayfalarda satırı ve tebligat cümlesini kendiliğinden düşürür.
 *   - İstisna kapsamındaki kazanç için belge düzenleme yükümlülüğü yok; satış
 *     belgesini Google Play düzenliyor (bkz. şartlar §7).
 *   - Adres, Play Console'da bireysel geliştirici hesabı için zaten doğrulanıyor ve
 *     mağaza sayfasında herkese görünüyor; burada gizlenebilecek bir şey değil.
 *     Ev adresi vermek istenmiyorsa kullanılacak şey bir yazışma adresidir.
 *
 * İstisnanın kendi koşulları (Türkiye'de banka hesabı, hasılatın yalnız o hesaptan
 * tahsili, vergi dairesinden istisna belgesi, GVK m.103 dördüncü dilim sınırı) bu
 * dosyanın konusu değil — mali müşavirle doğrulanır. Buradaki tek etkisi: metinler
 * şirket varsaymıyor. İstisna yalnız uygulama paylaşım platformlarından (Play,
 * App Store) elde edilen kazancı kapsıyor; web'den doğrudan tahsilat eklenirse o
 * gelir istisna dışında kalır ve bu metinlerin fatura maddesi yeniden yazılmalıdır.
 *
 * Kimlik alanları [[...]] biçiminde YER TUTUCU: kesinleşince yalnız bu nesne
 * doldurulur; sayfalar yer tutucuyu görünür bir etiketle basar ki yayından önce
 * gözden kaçmasın (bkz. legal-shell Ph).
 */
export const LEGAL_EFFECTIVE_DATE = "2026-09-03";
export const LEGAL_VERSION = "1.1";

export const LEGAL_ENTITY = {
  /** Veri sorumlusu ve hizmet sağlayıcı: gerçek kişinin adı ve soyadı. */
  name: "[[AD_SOYAD]]",
  /** Yazışma adresi (tebligata elverişli). Ev adresi verilmek istenmiyorsa iş/yazışma adresi. */
  address: "[[YAZIŞMA_ADRESİ]]",
  /**
   * Bağlı olunan vergi dairesi. Ticaret sicil/MERSİS numarasının yerini alıyor:
   * şirketsiz gerçek kişinin ikisi de yok. TCKN/VKN BURAYA YAZILMAZ.
   */
  taxOffice: "[[VERGİ_DAİRESİ]]",
  /** Gizlilik ve veri hakları talepleri için e-posta. */
  privacyEmail: "[[GİZLİLİK_E_POSTASI]]",
  /** Genel destek e-postası. */
  supportEmail: "[[DESTEK_E_POSTASI]]",
  /**
   * Kayıtlı elektronik posta (KEP). Gerçek kişi için ZORUNLU DEĞİL.
   * Yoksa boş dize bırak — satır ve tebligat cümlesi kendiliğinden düşer.
   */
  kep: "[[KEP_ADRESİ_VARSA_YOKSA_BOŞ]]",
  /**
   * GDPR m.27 AB temsilcisi (ad ve adres). AB'deki kullanıcılara düzenli hizmet
   * veren, AB'de yerleşik olmayan veri sorumlusu için kural olarak ZORUNLU;
   * m.27(2)(a) istisnası ("arızi işleme") bir dil uygulamasına uymaz. Atanmadığı
   * sürece burası yer tutucu kalır ve sayfa bunu vurguyla gösterir.
   */
  euRepresentative: "[[AB_TEMSİLCİSİ_AD_VE_ADRES]]",
  /** UK GDPR m.27 Birleşik Krallık temsilcisi; aynı mantık. */
  ukRepresentative: "[[BK_TEMSİLCİSİ_AD_VE_ADRES]]",
  /** Yerleşim yerinin bulunduğu il — yetkili mahkeme ve icra daireleri buna göre. */
  court: "[[YERLEŞİM_YERİ_İLİ]]",
  /**
   * VERBİS. Yıllık çalışan sayısı 50'den az ve yıllık mali bilanço toplamı 25 milyon
   * TL'den az olan, ana faaliyeti özel nitelikli kişisel veri işleme olmayan veri
   * sorumluları kayıt yükümlülüğünden istisna (Kurul kararları 2018/87, 2019/265).
   * Tek kişilik bir geliştirici bu istisnaya girer; o hâlde "Kapsam dışı" yazılır.
   */
  verbis: "[[VERBİS_NO_VEYA_KAPSAM_DIŞI]]",
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

/**
 * Alan bu kimlik için uygulanmıyor mu? Boş dize "bu profilde yok" demek (ör. KEP);
 * satırı ve ona atıf yapan cümleyi tamamen düşürmek için kullanılıyor. Yer tutucu
 * boş sayılmaz — o "henüz doldurulmadı" demek ve vurguyla görünmeye devam eder.
 */
export function isLegalOmitted(value: string): boolean {
  return value.trim() === "";
}

/** KEP adresi var mı — yoksa ona atıf yapan cümleler hiç yazılmıyor. */
export function hasKep(): boolean {
  return !isLegalOmitted(LEGAL_ENTITY.kep);
}

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

/**
 * Sağlayıcı tablosunun metinleri ANAHTARLA tutuluyor, düz Türkçe dizgiyle değil.
 *
 * Tablo üç dilde basılıyor ve alanların çoğu tekrar ediyor (aynı amaç sekiz
 * sağlayıcıda, aynı güvence dokuzunda). Türkçe dizgiyi anahtar yapan bir çeviri
 * sözlüğü, bir dizgi değişince sessizce Türkçeye düşerdi; İngilizce sayfada
 * Türkçe bir hücre, eksik çeviriden daha kötü çünkü fark edilmez. Anahtarla
 * tutulunca eksik çeviri derleme hatası oluyor.
 */
type Trio = { tr: string; en: string; de: string };

const PROCESSOR_NAMES = {
  smtp: { tr: "E-posta sağlayıcısı (SMTP)", en: "E-mail provider (SMTP)", de: "E-Mail-Anbieter (SMTP)" },
} as const satisfies Record<string, Trio>;

const PURPOSES = {
  sttTts: { tr: "Konuşma tanıma ve seslendirme", en: "Speech recognition and speech synthesis", de: "Spracherkennung und Sprachausgabe" },
  sttWhisperLlm: { tr: "Konuşma tanıma (Whisper) ve dil modeli", en: "Speech recognition (Whisper) and language model", de: "Spracherkennung (Whisper) und Sprachmodell" },
  sttWhisper: { tr: "Konuşma tanıma (Whisper)", en: "Speech recognition (Whisper)", de: "Spracherkennung (Whisper)" },
  stt: { tr: "Konuşma tanıma", en: "Speech recognition", de: "Spracherkennung" },
  sttLlm: { tr: "Konuşma tanıma ve dil modeli", en: "Speech recognition and language model", de: "Spracherkennung und Sprachmodell" },
  llm: { tr: "Dil modeli", en: "Language model", de: "Sprachmodell" },
  llmRouting: { tr: "Dil modeli yönlendirme", en: "Language model routing", de: "Weiterleitung an Sprachmodelle" },
  googleSignIn: { tr: "Google ile giriş", en: "Sign-in with Google", de: "Anmeldung mit Google" },
  distribution: { tr: "Uygulama dağıtımı ve abonelik ödemeleri", en: "App distribution and subscription payments", de: "App-Vertrieb und Abonnementzahlungen" },
  subscriptionState: { tr: "Abonelik durumu yönetimi", en: "Subscription state management", de: "Verwaltung des Abonnementstatus" },
  transactionalMail: { tr: "Doğrulama ve parola sıfırlama e-postaları", en: "Verification and password reset e-mails", de: "Bestätigungs- und Passwort-Reset-E-Mails" },
} as const satisfies Record<string, Trio>;

const DATA_KINDS = {
  audioAndTtsText: { tr: "Ses kaydı (geçici), seslendirilecek metin", en: "Audio recording (temporary), text to be spoken", de: "Audioaufnahme (temporär), zu sprechender Text" },
  audioAndTexts: { tr: "Ses kaydı (geçici), konuşma ve değerlendirme metinleri", en: "Audio recording (temporary), conversation and assessment texts", de: "Audioaufnahme (temporär), Gesprächs- und Bewertungstexte" },
  audio: { tr: "Ses kaydı (geçici)", en: "Audio recording (temporary)", de: "Audioaufnahme (temporär)" },
  texts: { tr: "Konuşma ve değerlendirme metinleri", en: "Conversation and assessment texts", de: "Gesprächs- und Bewertungstexte" },
  googleIdentity: { tr: "Google hesabı kimliği, ad, e-posta", en: "Google account id, name, e-mail", de: "Google-Konto-ID, Name, E-Mail" },
  purchase: { tr: "Satın alma bilgisi", en: "Purchase information", de: "Kaufinformationen" },
  userAndPurchase: { tr: "Kullanıcı kimliği, satın alma bilgisi", en: "User id, purchase information", de: "Nutzer-ID, Kaufinformationen" },
  email: { tr: "E-posta adresi", en: "E-mail address", de: "E-Mail-Adresse" },
} as const satisfies Record<string, Trio>;

const REGIONS = {
  eu: { tr: "AB", en: "EU", de: "EU" },
  us: { tr: "ABD", en: "USA", de: "USA" },
  uk: { tr: "Birleşik Krallık", en: "United Kingdom", de: "Vereinigtes Königreich" },
  globalNetwork: { tr: "Küresel ağ", en: "Global network", de: "Globales Netz" },
} as const satisfies Record<string, Trio>;

const SAFEGUARDS = {
  scc: {
    tr: "Standart sözleşme hükümleri + veri işleme sözleşmesi",
    en: "Standard contractual clauses + data processing agreement",
    de: "Standardvertragsklauseln + Auftragsverarbeitungsvertrag",
  },
  euAdequacy: { tr: "AB içi (yeterlilik)", en: "Within the EU (adequacy)", de: "Innerhalb der EU (Angemessenheit)" },
  adequacyPlusDpa: {
    tr: "Yeterlilik kararı + veri işleme sözleşmesi",
    en: "Adequacy decision + data processing agreement",
    de: "Angemessenheitsbeschluss + Auftragsverarbeitungsvertrag",
  },
} as const satisfies Record<string, Trio>;

const OCCASIONS = {
  always: { tr: "Her zaman", en: "Always", de: "Immer" },
  walkAndTts: {
    tr: "Yürüyüş modu (ekran kapalı / cepte) ve seslendirme",
    en: "Walk mode (screen off / in pocket) and speech synthesis",
    de: "Gehmodus (Bildschirm aus / in der Tasche) und Sprachausgabe",
  },
  googleSignInChosen: { tr: "Google ile giriş seçilirse", en: "If sign-in with Google is chosen", de: "Wenn die Anmeldung mit Google gewählt wird" },
  androidAndSubscription: { tr: "Android uygulaması ve abonelik", en: "Android app and subscription", de: "Android-App und Abonnement" },
  premiumEnabled: { tr: "Premium abonelik açılınca", en: "Once a Premium subscription is active", de: "Sobald ein Premium-Abonnement aktiv ist" },
} as const satisfies Record<string, Trio>;

export type Processor = {
  /** Sağlayıcının kendi adı — marka, çevrilmez. Türkçe bir tanım ise anahtar. */
  name: string | keyof typeof PROCESSOR_NAMES;
  purpose: keyof typeof PURPOSES;
  data: keyof typeof DATA_KINDS;
  region: keyof typeof REGIONS;
  /** Aktarım güvencesi (KVKK m.9 / GDPR Bölüm V). */
  safeguard: keyof typeof SAFEGUARDS;
  /** Yalnız belirli özellikte devreye giren sağlayıcı; yoksa "her zaman". */
  when?: keyof typeof OCCASIONS;
};

/** Verinin ulaştığı hizmet sağlayıcılar (KVKK "aktarım", GDPR "işleyici", Play "paylaşım"). */
export const PROCESSORS: Processor[] = [
  { name: "Microsoft Azure Speech", purpose: "sttTts", data: "audioAndTtsText", region: "eu", safeguard: "euAdequacy", when: "walkAndTts" },
  { name: "Groq", purpose: "sttWhisperLlm", data: "audioAndTexts", region: "us", safeguard: "scc" },
  { name: "Cloudflare Workers AI", purpose: "sttWhisper", data: "audio", region: "globalNetwork", safeguard: "scc" },
  { name: "Speechmatics", purpose: "stt", data: "audio", region: "uk", safeguard: "adequacyPlusDpa" },
  { name: "Deepgram", purpose: "stt", data: "audio", region: "us", safeguard: "scc" },
  { name: "Mistral AI", purpose: "sttLlm", data: "audioAndTexts", region: "eu", safeguard: "euAdequacy" },
  { name: "Cerebras", purpose: "llm", data: "texts", region: "us", safeguard: "scc" },
  { name: "Google Gemini", purpose: "llm", data: "texts", region: "us", safeguard: "scc" },
  { name: "OpenRouter", purpose: "llmRouting", data: "texts", region: "us", safeguard: "scc" },
  { name: "Google (Sign-In)", purpose: "googleSignIn", data: "googleIdentity", region: "us", safeguard: "scc", when: "googleSignInChosen" },
  { name: "Google Play", purpose: "distribution", data: "purchase", region: "us", safeguard: "scc", when: "androidAndSubscription" },
  { name: "RevenueCat", purpose: "subscriptionState", data: "userAndPurchase", region: "us", safeguard: "scc", when: "premiumEnabled" },
  { name: "smtp", purpose: "transactionalMail", data: "email", region: "eu", safeguard: "euAdequacy" },
];

/** Tablonun bir satırı, istenen dilde. */
export function processorRow(p: Processor, locale: LegalLocale): {
  name: string; purpose: string; data: string; region: string; safeguard: string; when: string;
} {
  const named = (PROCESSOR_NAMES as Record<string, Trio>)[p.name];
  return {
    name: named ? named[locale] : p.name,
    purpose: PURPOSES[p.purpose][locale],
    data: DATA_KINDS[p.data][locale],
    region: REGIONS[p.region][locale],
    safeguard: SAFEGUARDS[p.safeguard][locale],
    when: OCCASIONS[p.when ?? "always"][locale],
  };
}

/** Sunucuların bulunduğu yer (Netcup VPS) — üç dilde. */
export const LEGAL_HOSTING_TEXT: Trio = {
  tr: "Netcup GmbH, Almanya (AB)",
  en: "Netcup GmbH, Germany (EU)",
  de: "Netcup GmbH, Deutschland (EU)",
};
