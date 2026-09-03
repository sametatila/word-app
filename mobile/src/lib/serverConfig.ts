import { api } from "../api/client";

/**
 * Herkese açık sunucu yapılandırması (GET /api/config): hangi giriş sağlayıcıları açık.
 * Hata ya da eski sunucu: sağlayıcılar kapalı sayılır (yalnız e-posta) — düğme
 * gösterip başarısız olmaktan iyidir.
 */
export type ServerConfig = { auth: boolean; providers: { google: boolean } };

let cached: ServerConfig | null = null;

export async function fetchServerConfig(): Promise<ServerConfig> {
  if (cached) return cached;
  try {
    const c = await api<Partial<ServerConfig>>("/api/config");
    cached = { auth: c.auth !== false, providers: { google: Boolean(c.providers?.google) } };
  } catch {
    cached = { auth: true, providers: { google: false } };
  }
  return cached;
}
