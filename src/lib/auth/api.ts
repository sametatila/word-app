"use client";

/**
 * Neon Auth uçlarına doğrudan istek.
 *
 * SDK hatayı kendi sarmalayıcısında farklı biçimlerde döndürebiliyor; bu da
 * "Email not verified" gibi net yanıtların yanlış mesaja eşlenmesine yol açtı.
 * Burada durum kodu ve gövde sunucudan geldiği gibi okunur — arada yorum yok.
 * İstekler kendi `/api/auth/[...path]` proxy'mize gider, çerezler otomatik işlenir.
 */
type AuthOk<T> = { ok: true; data: T };
type AuthFail = { ok: false; status: number; code: string; message: string };
export type AuthResult<T> = AuthOk<T> | AuthFail;

export async function authApi<T = Record<string, unknown>>(
  path: string,
  body?: Record<string, unknown>,
): Promise<AuthResult<T>> {
  let res: Response;
  try {
    res = await fetch(`/api/auth/${path}`, {
      method: body === undefined ? "GET" : "POST",
      headers: body === undefined ? undefined : { "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: "same-origin",
      cache: "no-store",
    });
  } catch {
    return { ok: false, status: 0, code: "NETWORK_ERROR", message: "network request failed" };
  }

  const text = await res.text().catch(() => "");
  let json: unknown = null;
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      /* JSON değilse ham metni mesaj olarak kullanırız */
    }
  }
  const obj = (json ?? {}) as Record<string, unknown>;

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      code: typeof obj.code === "string" ? obj.code : "",
      message: typeof obj.message === "string" ? obj.message : text.slice(0, 200),
    };
  }
  return { ok: true, data: (json ?? {}) as T };
}

export type SignUpResponse = {
  token?: string | null;
  user?: { id?: string; email?: string; emailVerified?: boolean };
};
