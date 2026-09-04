import { api } from "../api/client";

/**
 * Herkese açık sunucu yapılandırması (GET /api/config): hangi giriş sağlayıcıları açık.
 * Hata ya da eski sunucu: sağlayıcılar kapalı sayılır (yalnız e-posta) — düğme
 * gösterip başarısız olmaktan iyidir. Apple için bu ayrıca ZORUNLU: sunucuda
 * sağlayıcı yokken düğmeyi çizmek, iOS'ta çalışmayan bir "Apple ile devam et"
 * demek olur ve inceleme onu bozuk işlevsellik sayar.
 */
export type ServerConfig = { auth: boolean; providers: { google: boolean; apple: boolean } };

let cached: ServerConfig | null = null;

export async function fetchServerConfig(): Promise<ServerConfig> {
  if (cached) return cached;
  try {
    const c = await api<Partial<ServerConfig>>("/api/config");
    cached = {
      auth: c.auth !== false,
      providers: { google: Boolean(c.providers?.google), apple: Boolean(c.providers?.apple) },
    };
  } catch {
    cached = { auth: true, providers: { google: false, apple: false } };
  }
  return cached;
}
