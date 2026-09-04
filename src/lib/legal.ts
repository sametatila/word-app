/**
 * Hukuki metinlerin tek kaynağı: kimlik bilgileri, yürürlük tarihi ve veri işleyen
 * üçüncü taraflar. Gizlilik politikası (/privacy), kullanım şartları (/terms) ve Play
 * Veri Güvenliği beyanı (docs/play/data-safety.md) bu listeyle tutarlı olmalı.
 *
 * KİMLİK: İKİ TARAF, İKİ AYRI ROL
 *
 * Roller eskiden tek kişide toplanıyordu; artık ayrı:
 *
 *   - VERİ SORUMLUSU (controller*): amaç ve araçlara karar veren, Almanya'da
 *     yerleşik gerçek kişi. Veri koruma yükümlülüğü onda.
 *   - YAYINCI (publisher*): uygulamayı Google Play'de yayımlayan, Google'dan
 *     ödeme alan ve Türkiye'de vergilenen gerçek kişi. Veri sorumlusunun
 *     talimatıyla hareket eden VERİ İŞLEYEN sıfatını da taşıyor (Play Console
 *     sipariş, abone ve yorum verisine erişim). Aralarında GDPR m.28 / KVKK m.12
 *     işleme sözleşmesi gerekiyor.
 *
 * Bu ayrımın iki büyük sonucu var ve ikisi de birbirinin aynası:
 *
 *   1. Veri sorumlusu AB'de yerleşik olduğu için GDPR m.3(1) üzerinden
 *      uygulanıyor, m.3(2) üzerinden değil. m.27 AB TEMSİLCİSİ YÜKÜMLÜLÜĞÜ YOK
 *      (m.27 yalnız m.3(2) hâlinde işliyor). Denetim otoritesi, yerleşim yerine
 *      göre Kuzey Ren-Vestfalya (LDI NRW).
 *   2. Buna karşılık veri sorumlusu Türkiye'de YERLEŞİK DEĞİL ve Türkiye'deki
 *      başvurular için bir veri sorumlusu temsilcisi belirlenmiştir (yayıncı).
 *      VERBİS kaydı YAPILMAYACAK: yıllık çalışan sayısı 50'den az ve mali
 *      bilanço eşiğinin altında kalan veri sorumluları Kurul kararlarıyla kayıt
 *      yükümlülüğünden istisna tutuluyor. Bu istisnanın yurt dışında yerleşik
 *      veri sorumlusuna da uygulanıp uygulanmadığı tartışmalı; karar bilinçli
 *      alındı ve metin kayıtlı olduğunu İDDİA ETMİYOR — yalnız temsilciyi
 *      gösteriyor. Kayıt yapılırsa bu not ve metin birlikte güncellenir.
 *
 * Vergi tarafı yayıncıya ait: Gelir Vergisi Kanunu mükerrer m.20/B'deki mobil
 * uygulama geliştiriciliği kazanç istisnası, platformdan kazancı elde eden kişiye
 * uygulanır. İstisnanın koşulları (Türkiye'de banka hesabı, hasılatın yalnız o
 * hesaptan tahsili, istisna belgesi, GVK m.103 dördüncü dilim sınırı) mali
 * müşavirle doğrulanır; istisna yalnız Play/App Store kazancını kapsar.
 *
 * TCKN/VKN buraya YAZILMAZ: sayfalar herkese açık, kimlik numarası yayımlamak
 * kimlik hırsızlığına davetiye. Tanıtıcı bilgi için ad, adres, vergi dairesi ve
 * iletişim kanalı yeterli. Doldurulmamış alanlar [[...]] biçiminde kalır ve
 * sayfalarda vurguyla basılır (bkz. legal-shell Ph).
 */
export const LEGAL_EFFECTIVE_DATE = "2026-09-04";
export const LEGAL_VERSION = "1.2";

export const LEGAL_ENTITY = {
  /** Veri sorumlusu: amaç ve araçlara karar veren gerçek kişi (AB'de yerleşik). */
  controllerName: "Samet Atila",
  controllerAddress: "Emil-Figge-Str. 9, Zimmer 421, 44227 Dortmund, Almanya",

  /** Yayıncı: Play hesabı sahibi, tahsilat tarafı ve veri işleyen (Türkiye'de yerleşik). */
  publisherName: "Musa Atila",
  publisherAddress: "Akpınar Mah. Akpınar Merkez Küme Evler No:6, Tufanbeyli, Adana, Türkiye",
  /** Yayıncının bağlı olduğu vergi dairesi — ticaret sicil/MERSİS yok, tacir değil. */
  publisherTaxOffice: "Tufanbeyli Vergi Dairesi",

  /**
   * KVKK veri sorumlusu temsilcisi: Türkiye'de yerleşik olmayan veri sorumlusu
   * için zorunlu. Bu görevi YAYINCI üstleniyor — aynı kişi, aynı adres; adres
   * değişirse ikisini birlikte güncelle.
   *
   * Temsilci olabilmenin şartı Türkiye'de yerleşik Türk vatandaşı gerçek kişi ya
   * da Türkiye'de kurulu tüzel kişi olmak; yayıncı bunu karşılıyor. Atama, veri
   * sorumlusunun yazılı kararıyla yapılıp Kuruma bildiriliyor ve VERBİS kaydı
   * temsilci üzerinden açılıyor. VERBİS ayrıca bir "irtibat kişisi" istiyor
   * (Türkiye'de yerleşik Türk vatandaşı); bu alan Sicil'e girilen bir bilgi,
   * yayımlanan metnin parçası değil.
   *
   * DİKKAT: aşağıdaki metin "temsilci atanmıştır" diyor. Atama kararı
   * imzalanmadan yayına çıkarsa bu cümle doğru olmaz.
   */
  trRepresentative: "Musa Atila, Akpınar Mah. Akpınar Merkez Küme Evler No:6, Tufanbeyli, Adana, Türkiye",

  /**
   * Veri hakları başvuruları iki ayrı adrese gidiyor çünkü iki ayrı rejim ve iki
   * ayrı süre var: KVKK m.13 otuz gün, GDPR m.12(3) bir ay + gerekirse iki ay
   * uzatma. Türkçe metin KVKK adresini, İngilizce ve Almanca metinler GDPR
   * adresini öne çıkarıyor; hakların anlatıldığı bölümde ikisi de yazılı.
   */
  privacyEmailTr: "kvkk@rumpuskit.com",
  privacyEmailEu: "gdpr@rumpuskit.com",
  /** Genel destek e-postası. */
  supportEmail: "support@rumpuskit.com",
  /** Türkiye'deki uyuşmazlıklarda yetkili mahkeme ve icra dairelerinin ili. */
  court: "Adana",
  /**
   * Sunucu yedeklerinin en uzun saklama süresi (gün) — silinen hesabın yedekten
   * düşme süresi. 30 gün seçildi ve seçim keyfî değil:
   *
   *   - Uygulamadaki öteki iki saklama penceresiyle aynı (oturum kaydı en çok
   *     30 gün, rol yapma kaydı 30 gün); tek bir üst sınır akılda kalıyor.
   *   - KVKK m.13 otuz gün, GDPR m.12(3) bir ay içinde cevap istiyor. Yedek
   *     penceresi de 30 gün olunca silme talebi cevaplandığında veri gerçekten
   *     her yerden düşmüş oluyor; "sildik ama yedekte duruyor" boşluğu kalmıyor.
   *   - Haftalar sonra fark edilen bir bozulmadan dönmeye yetecek kadar uzun.
   *
   * Bunu karşılayan basit bir düzen: gecelik pg_dump, 7 günlük + 3 haftalık
   * kopya (en eskisi 28 gün) — hepsi 30 günün içinde kalır.
   */
  backupRetentionDays: "30",
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


export const LEGAL_PATHS = {
  privacy: "/privacy",
  terms: "/terms",
  deleteAccount: "/account/delete",
} as const;

/**
 * Sürüm geçmişi — iki belge de aynı LEGAL_VERSION'ı taşıdığı için tek liste.
 *
 * Sürüm numarası değişip "ne değişti" yazılmazsa, okuyucunun kabul ettiği metnin
 * neresinin oynadığını anlamasının yolu yok. Yeni sürümde buraya bir kayıt
 * eklenmeden LEGAL_VERSION artırılmamalı. En yeni kayıt başa yazılır.
 */
export const LEGAL_CHANGELOG: readonly {
  version: string;
  date: string;
  changes: Record<LegalLocale, readonly string[]>;
}[] = [
  {
    version: "1.2",
    date: "2026-09-04",
    changes: {
      tr: [
        "Uygulamanın adı Lernomi oldu ve adresi www.lernomi.app'e taşındı; eski adres çalışmaya devam ediyor.",
        "Hesap açma yaşı 16'dan 18'e çıkarıldı; içerik yetişkin öğrenciye yönelik.",
        "Kurslar doğru sayıldı: Almanca, Zürih Almancası ve İngilizce (metin yalnız Almanca diyordu).",
        "Veri sorumlusu ile uygulamayı Play'de yayımlayan taraf ayrı ayrı tanıtıldı.",
        "Veri hakları başvuruları için KVKK ve GDPR'a ayrı adresler açıldı.",
        "Ürün analitiğinde bir olayın yanında taşınabilecek etiketin sınırları yazıldı.",
        "Sunucu yedeklerinin saklama süresi 30 gün olarak belirtildi.",
        "Metinler İngilizce ve Almanca olarak da yayımlandı; bağlayıcı metin Türkçe.",
      ],
      en: [
        "The app is now called Lernomi and moved to www.lernomi.app; the old address keeps working.",
        "The minimum age for an account was raised from 16 to 18; the content is aimed at adult learners.",
        "The courses are now stated correctly: German, Zurich German and English (the text said German only).",
        "The data controller and the person who publishes the app on Play are now identified separately.",
        "Separate addresses were opened for data rights requests under KVKK and under the GDPR.",
        "The limits of the technical label an analytics event may carry are now written down.",
        "The retention period for server backups is stated as 30 days.",
        "The texts are also published in English and German; the binding text is Turkish.",
      ],
      de: [
        "Die App heißt jetzt Lernomi und ist unter www.lernomi.app erreichbar; die alte Adresse funktioniert weiterhin.",
        "Das Mindestalter für ein Konto wurde von 16 auf 18 angehoben; die Inhalte richten sich an erwachsene Lernende.",
        "Die Kurse werden jetzt richtig genannt: Deutsch, Zürichdeutsch und Englisch (der Text nannte nur Deutsch).",
        "Der Verantwortliche und die Person, die die App bei Play veröffentlicht, werden getrennt ausgewiesen.",
        "Für Anträge nach KVKK und nach DSGVO wurden getrennte Adressen eingerichtet.",
        "Die Grenzen der technischen Kennzeichnung, die ein Analyse-Ereignis tragen darf, sind jetzt festgehalten.",
        "Die Aufbewahrungsfrist für Server-Backups ist mit 30 Tagen angegeben.",
        "Die Texte erscheinen auch auf Englisch und Deutsch; verbindlich ist die türkische Fassung.",
      ],
    },
  },
  {
    version: "1.1",
    date: "2026-09-03",
    changes: {
      tr: ["İlk yayımlanan sürüm."],
      en: ["First published version."],
      de: ["Erste veröffentlichte Fassung."],
    },
  },
];

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
