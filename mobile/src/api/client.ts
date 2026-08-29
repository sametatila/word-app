/**
 * Mobil API istemcisi — canlı web API'sini çağırır (www.exfe.me; Neon + tüm
 * backend yeniden kullanılır, tek doğruluk kaynağı).
 *
 * Oturum ÇEREZLE taşınır: giriş yapılınca Better Auth Set-Cookie yazar, RN'in
 * yerel ağ katmanı (Android cookie jar) çerezi saklar ve sonraki her istekte
 * kendiliğinden gönderir — Bearer başlığı ya da elle çerez yönetimi gerekmez.
 * 401 ayrı bir hata tipiyle döner ki çağıran "oturum yok"u diğer hatalardan
 * ayırabilsin (giriş ekranına yönlendirme kararı buna bağlı).
 */
export const API_BASE = "https://www.exfe.me";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function api<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      accept: "application/json",
      ...(init?.body ? { "content-type": "application/json" } : {}),
      ...(init?.headers ?? {}),
    },
  });
  const text = await res.text().catch(() => "");
  if (!res.ok) {
    let msg = text.slice(0, 200);
    try { const j = JSON.parse(text); msg = j.error ?? j.message ?? msg; } catch { /* düz metin */ }
    throw new ApiError(res.status, msg || `api ${res.status}`);
  }
  return (text ? JSON.parse(text) : null) as T;
}
