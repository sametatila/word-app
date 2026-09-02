/**
 * Hukuki metinlerin tek kaynağı: kimlik, iletişim, yürürlük tarihi ve veri işleyen
 * üçüncü taraflar. Gizlilik politikası (/privacy), kullanım şartları (/terms) ve Play
 * Veri Güvenliği beyanı (docs/play/data-safety.md) bu listeyle tutarlı olmalı — yeni
 * bir sağlayıcı eklenince önce burası güncellenir.
 */
export const LEGAL_EFFECTIVE_DATE = "2026-09-03";
export const LEGAL_VERSION = "1.0";

/** Veri sorumlusu. Şirketleşince ünvan ve adres buraya. */
export const LEGAL_CONTROLLER = "Nomi — Samet Atila (bireysel geliştirici)";
/** Gizlilik ve hesap talepleri için posta kutusu; gerçek bir kutu olmalı. */
export const LEGAL_CONTACT_EMAIL = "destek@exfe.me";
/** Sunucuların bulunduğu yer (Netcup VPS). */
export const LEGAL_HOSTING = "Netcup GmbH, Almanya (AB)";

export const LEGAL_PATHS = {
  privacy: "/privacy",
  terms: "/terms",
  deleteAccount: "/account/delete",
} as const;

export type Processor = {
  name: string;
  purpose: string;
  data: string;
  region: string;
  /** Yalnız belirli özellikte devreye giren sağlayıcı. */
  when?: string;
};

/** Verinin ulaştığı hizmet sağlayıcılar (KVKK "aktarım", Play "paylaşım"). */
export const PROCESSORS: Processor[] = [
  { name: "Microsoft Azure Speech", purpose: "Konuşma tanıma ve seslendirme", data: "Ses kaydı (geçici), seslendirilecek metin", region: "AB", when: "Yürüyüş modu (ekran kapalı / cepte) ve seslendirme" },
  { name: "Groq", purpose: "Konuşma tanıma (Whisper) ve dil modeli", data: "Ses kaydı (geçici), konuşma ve değerlendirme metinleri", region: "ABD" },
  { name: "Cloudflare Workers AI", purpose: "Konuşma tanıma (Whisper)", data: "Ses kaydı (geçici)", region: "Küresel ağ" },
  { name: "Speechmatics", purpose: "Konuşma tanıma", data: "Ses kaydı (geçici)", region: "Birleşik Krallık" },
  { name: "Deepgram", purpose: "Konuşma tanıma", data: "Ses kaydı (geçici)", region: "ABD" },
  { name: "Mistral AI", purpose: "Konuşma tanıma ve dil modeli", data: "Ses kaydı (geçici), konuşma ve değerlendirme metinleri", region: "AB" },
  { name: "Cerebras", purpose: "Dil modeli", data: "Konuşma ve değerlendirme metinleri", region: "ABD" },
  { name: "Google Gemini", purpose: "Dil modeli", data: "Konuşma ve değerlendirme metinleri", region: "ABD" },
  { name: "OpenRouter", purpose: "Dil modeli yönlendirme", data: "Konuşma ve değerlendirme metinleri", region: "ABD" },
  { name: "Google (Sign-In)", purpose: "Google ile giriş", data: "Google hesabı kimliği, ad, e-posta", region: "ABD", when: "Google ile giriş seçilirse" },
  { name: "Google Play", purpose: "Uygulama dağıtımı ve abonelik ödemeleri", data: "Satın alma bilgisi", region: "ABD", when: "Android uygulaması ve abonelik" },
  { name: "RevenueCat", purpose: "Abonelik durumu yönetimi", data: "Kullanıcı kimliği, satın alma bilgisi", region: "ABD", when: "Premium abonelik açılınca" },
  { name: "E-posta sağlayıcısı (SMTP)", purpose: "Doğrulama ve parola sıfırlama e-postaları", data: "E-posta adresi", region: "AB" },
];
