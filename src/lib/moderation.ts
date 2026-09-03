/**
 * Başkalarına görünen kullanıcı metni için asgari moderasyon (görünen ad, kullanıcı adı).
 * Amaç: bağlantı/e-posta/telefon gibi kişisel veri ve reklam, kontrol karakterleri ve
 * açık küfür/hakaret geçmesin. Liste bilerek kısa ve açık; yanlış pozitif (masum adın
 * reddi) küfürden daha kötü bir deneyim. Şüpheli durumlar kullanıcı bildirimiyle
 * (content_reports, user_reports) insan incelemesine düşer.
 */
const URL_OR_CONTACT = /(https?:\/\/|www\.|\.[a-z]{2,}\/|@[a-z0-9_]{2,}|[\w.+-]+@[\w-]+\.[a-z]{2,}|\+?\d[\d\s().-]{7,}\d)/i;
const CONTROL = /[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u2028-\u202f\ufeff]/;

/** Tam-kelime eşleşen açık küfür/hakaret kökleri (tr, de, en). Büyük/küçük harf duyarsız. */
const BLOCKED = [
  "amk", "aq", "orospu", "oç", "piç", "sikt", "sikik", "yarrak", "göt", "ibne", "pezevenk", "kahpe", "gavat",
  "hurensohn", "fotze", "wichser", "schlampe", "arschloch", "missgeburt", "nutte",
  "fuck", "cunt", "nigger", "faggot", "bitch", "whore", "retard", "cock",
];
const BLOCK_RE = new RegExp(`(^|[^\\p{L}\\p{N}])(${BLOCKED.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "iu");

export function displayNameAllowed(name: string): boolean {
  if (CONTROL.test(name)) return false;
  if (URL_OR_CONTACT.test(name)) return false;
  const folded = name.toLocaleLowerCase("tr-TR").normalize("NFKC");
  if (BLOCK_RE.test(folded)) return false;
  return true;
}
