/**
 * Mobil API istemcisi — canlı web API'sini çağırır (Neon + tüm backend yeniden
 * kullanılır, tek doğruluk kaynağı). Auth: Neon Auth token'ı (sonra bağlanacak);
 * şimdilik Bearer başlığı için yer tutucu.
 */
const BASE = "https://www.exfe.me";
let authToken: string | null = null;
export const setAuthToken = (t: string | null) => { authToken = t; };

export async function api<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(authToken ? { authorization: `Bearer ${authToken}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`api ${res.status}: ${path}`);
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}
