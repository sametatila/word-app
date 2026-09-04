/**
 * Kullanıcı adı kuralları.
 *
 * Küçük harf, rakam, alt çizgi; 3-20 karakter; başta/sonda ya da art arda alt
 * çizgi yok. Türkçe karakter kabul edilmez — arama kutusuna "ş" yazamayan
 * klavyede bulunamayan ad, ad değildir. Rezerve liste sistem sayfalarıyla ve
 * yetkili gibi görünen adlarla çakışmayı engeller.
 */
const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

const RESERVED = new Set([
  "admin", "administrator", "root", "system", "sistem", "nomi", "support", "destek", "help", "yardim",
  "moderator", "mod", "staff", "official", "resmi", "api", "www", "app", "null", "undefined", "me",
  "ben", "profile", "profil", "settings", "ayarlar", "friends", "arkadaslar", "feed", "akis", "login",
  "giris", "signup", "kayit", "logout", "u", "user", "kullanici", "test", "premium", "wortspiel", "lernomi",
]);

export const USERNAME_CHANGE_COOLDOWN_DAYS = 14;
export const BIO_MAX = 140;

export function normalizeUsername(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const u = raw.trim().toLowerCase().replace(/^@+/, "");
  if (!USERNAME_RE.test(u)) return null;
  if (u.startsWith("_") || u.endsWith("_") || u.includes("__")) return null;
  if (RESERVED.has(u)) return null;
  return u;
}

/** Arama kutusundan gelen metni kullanıcı adı önekine indirger ("@Ali " → "ali"). */
export function usernameQuery(raw: string): string {
  return raw.trim().toLowerCase().replace(/^@+/, "").replace(/[^a-z0-9_]/g, "").slice(0, 20);
}

const TR_MAP: Record<string, string> = { ç: "c", ğ: "g", ı: "i", i: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };

/**
 * Görünen addan bir kullanıcı adı önerir: "Ayşe Yılmaz" → "ayseyilmaz".
 * Kısa kalırsa kullanıcı kimliğinden türeyen rakamlarla tamamlanır ki öneri
 * hem tahmin edilebilir hem de çakışmaya karşı çeşitli olsun.
 */
export function suggestUsername(name: string | null | undefined, seed: string): string {
  const base = (name ?? "")
    .toLocaleLowerCase("tr-TR")
    .split("")
    .map((ch) => TR_MAP[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 16);
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  const digits = String(h % 10000).padStart(4, "0");
  const stem = base.length >= 3 ? base : `lernomi${base}`;
  return `${stem}${digits}`.slice(0, 20);
}

export function normalizeBio(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const b = raw.replace(/\s+/g, " ").trim();
  return b ? b.slice(0, BIO_MAX) : null;
}
