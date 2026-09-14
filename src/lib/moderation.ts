/**
 * Başkalarına görünen kullanıcı metni için asgari moderasyon (görünen ad, kullanıcı adı, biyografi).
 * Amaç: bağlantı/e-posta/telefon gibi kişisel veri ve reklam, kontrol karakterleri ve
 * açık küfür/hakaret geçmesin. Liste bilerek kısa ve açık; yanlış pozitif (masum adın
 * reddi) küfürden daha kötü bir deneyim. Şüpheli durumlar kullanıcı bildirimiyle
 * (content_reports, user_reports) insan incelemesine düşer.
 */
// Sınırlı nicelikler (ReDoS koruması). Eski `+` / `{2,}` çalıştırıcıları uzun
// girdide O(n²) geri-izlemeye yol açıyor, tek bir 1 MB gövde event-loop'u
// kilitliyordu (güvenlik denetimi #3). Üst sınırlar RFC azamileri (yerel 64,
// etiket 63) ve makul biçim uzunlukları; gerçek adres/e-posta/telefon tespiti
// DEĞİŞMEDİ (parite: scripts/test-moderation.ts).
const URL_OR_CONTACT = /(https?:\/\/|www\.|\.[a-z]{2,24}\/|@[a-z0-9_]{2,64}|[\w.+-]{1,64}@[\w-]{1,63}\.[a-z]{2,24}|\+?\d[\d\s().-]{7,32}\d)/i;
const CONTROL = /[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u2028-\u202f\ufeff]/;

/**
 * Moderasyon süzgeçlerine giren en uzun makul metin. Görünen ad (40) ve
 * biyografi (birkaç yüz) bunun çok altında; ötesi meşru bir alan değil ve
 * regex hiç çalıştırılmadan reddedilir — çağıran kırpmayı unutsa bile emniyet
 * freni. Asıl sınır çağıranda (api/profile, social/profile); bu son savunma.
 */
const MAX_MODERATED_LEN = 4096;

/**
 * Açık küfür/hakaret. İki liste var çünkü tek kural iki hatadan birini yapıyordu:
 *
 * - `STEMS` başta sınır arar, sonuna ek gelebilir — Türkçe ve Almanca sondan
 *   eklemeli ("piçler", "fuckyou" da yakalanır).
 * - `WORDS` iki yanında da sınır arar. Bunlar masum sözcüklerin başında geçen
 *   kısa köklerdi ve eskiden "aqua", "cocktail", "Götz" gibi gerçek adları
 *   reddediyorlardı; yanlış pozitif küfürden daha kötü bir deneyim.
 */
const BLOCKED_STEMS = [
  "amk", "orospu", "piç", "sikt", "sikik", "yarrak", "ibne", "pezevenk", "kahpe", "gavat", "götver",
  "hurensohn", "fotze", "wichser", "schlampe", "arschloch", "missgeburt", "nutte",
  "fuck", "cunt", "nigger", "faggot", "bitch", "whore", "retard",
];
const BLOCKED_WORDS = ["aq", "oç", "göt", "cock"];
const esc = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const EDGE = "[^\\p{L}\\p{N}]";
const BLOCK_RE = new RegExp(
  `(^|${EDGE})(?:(?:${BLOCKED_STEMS.map(esc).join("|")})|(?:${BLOCKED_WORDS.map(esc).join("|")})(?=$|${EDGE}))`,
  "iu",
);

/** Küçük harfe indirger; kaçamak yazımları (kombine aksan) tek biçime toplar. */
const fold = (s: string) => s.toLocaleLowerCase("tr-TR").normalize("NFKC");

/** Küfür/hakaret içeriyor mu — üç alanın da ortak süzgeci. */
function abusive(text: string): boolean {
  return BLOCK_RE.test(fold(text));
}

/**
 * Görünen ad: başkalarına görünür (sıralama, arkadaş listesi, akış).
 * Bağlantı/iletişim bilgisi, kontrol karakteri ve küfür kabul edilmez.
 */
export function displayNameAllowed(name: string): boolean {
  if (name.length > MAX_MODERATED_LEN) return false;
  if (CONTROL.test(name)) return false;
  if (URL_OR_CONTACT.test(name)) return false;
  return !abusive(name);
}

/**
 * Kullanıcı adı: karakter kümesi (a-z0-9_) zaten bağlantı, e-posta, telefon ve
 * kontrol karakterini dışarıda bırakıyor — geriye küfür süzgeci kalıyor.
 * Alt çizgi sınır sayıldığı için "kral_amk" da yakalanır.
 */
export function usernameAllowed(username: string): boolean {
  if (username.length > MAX_MODERATED_LEN) return false;
  return !abusive(username);
}

/**
 * Serbest metin (biyografi): profil sayfasında herkese görünüyor ve en kolay
 * reklam/iletişim kanalı burası. Görünen adla aynı kurallar uygulanıyor.
 */
export function bioAllowed(text: string): boolean {
  if (text.length > MAX_MODERATED_LEN) return false;
  if (CONTROL.test(text)) return false;
  if (URL_OR_CONTACT.test(text)) return false;
  return !abusive(text);
}
