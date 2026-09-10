import { api } from "../api/client";

/**
 * Herkese açık sunucu yapılandırması (GET /api/config): hangi giriş sağlayıcıları açık.
 * Hata ya da eski sunucu: sağlayıcılar kapalı sayılır (yalnız e-posta) — düğme
 * gösterip başarısız olmaktan iyidir. Apple için bu ayrıca ZORUNLU: sunucuda
 * sağlayıcı yokken düğmeyi çizmek, iOS'ta çalışmayan bir "Apple ile devam et"
 * demek olur ve inceleme onu bozuk işlevsellik sayar.
 */
/**
 * `turnstileSiteKey`: bot koruması açıksa Turnstile'ın genel anahtarı, kapalıysa
 * boş dize. Boşken uygulama doğrulama kutusunu HİÇ çizmiyor; doluyken kayıt,
 * giriş ve sıfırlama isteklerine jeton iliştirmek ZORUNLU (sunucu jetonsuz
 * isteği reddediyor).
 */
export type ServerConfig = {
  auth: boolean;
  /**
   * `apple` NATIVE akış (iOS), `appleWeb` TARAYICI akışı (Android).
   * Android'de Apple'ın native yolu yok; oradaki düğme ancak sunucuda Services
   * ID tanımlıyken anlamlı, yoksa kullanıcıyı Apple'ın hata sayfasına götürür.
   */
  providers: { google: boolean; apple: boolean; appleWeb: boolean };
  turnstileSiteKey: string;
};

let cached: ServerConfig | null = null;

export async function fetchServerConfig(): Promise<ServerConfig> {
  if (cached) return cached;
  try {
    const c = await api<Partial<ServerConfig>>("/api/config");
    cached = {
      auth: c.auth !== false,
      providers: { google: Boolean(c.providers?.google), apple: Boolean(c.providers?.apple), appleWeb: Boolean(c.providers?.appleWeb) },
      turnstileSiteKey: typeof c.turnstileSiteKey === "string" ? c.turnstileSiteKey : "",
    };
  } catch {
    cached = { auth: true, providers: { google: false, apple: false, appleWeb: false }, turnstileSiteKey: "" };
  }
  return cached;
}
