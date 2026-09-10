import { api } from "../api/client";

/**
 * Etkin oturumlar — web'deki ActiveSessions bölümünün mobil karşılığı.
 *
 * İKİ UCUN TAZELİK KOŞULU FARKLI:
 *   - `/list-sessions` oturumun 24 saatten TAZE olmasını istiyor
 *     (freshSessionMiddleware); değilse 403 SESSION_NOT_FRESH.
 *   - `/revoke-other-sessions` yalnız geçerli bir oturum istiyor, yaşına
 *     bakmıyor.
 *
 * Bu yüzden çağıran, listenin yokluğunu bir arıza gibi göstermemeli: "stale"
 * ayrı bir durum ve o hâlde bile çıkış düğmesi çalışıyor.
 */
export type ActiveSession = {
  id: string;
  token: string;
  createdAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
};

export type SessionsResult =
  | { state: "ok"; rows: ActiveSession[] }
  /** Oturum 24 saatten eski: liste yok ama çıkış yapılabilir. */
  | { state: "stale" }
  | { state: "failed" };

export async function listSessions(): Promise<SessionsResult> {
  try {
    const raw = await api<Partial<ActiveSession>[]>("/api/auth/list-sessions");
    // Süzgeç şart: `api<T>()` tip ATAMASI yapıyor, doğrulama değil.
    const rows = (Array.isArray(raw) ? raw : []).filter(
      (s): s is ActiveSession => typeof s?.token === "string" && typeof s?.id === "string",
    );
    return { state: "ok", rows };
  } catch (e) {
    const status = (e as { status?: number })?.status;
    return status === 403 ? { state: "stale" } : { state: "failed" };
  }
}

/** Tek bir oturumu kapatır. */
export async function revokeSession(token: string): Promise<boolean> {
  try {
    await api("/api/auth/revoke-session", { method: "POST", body: JSON.stringify({ token }) });
    return true;
  } catch {
    return false;
  }
}

/**
 * Bu cihaz DIŞINDAKİ bütün oturumları kapatır.
 *
 * `revoke-sessions` değil: kullanıcı kendini de atmak istemiyor, "benden
 * başka herkes çıksın" diyor.
 */
export async function revokeOtherSessions(): Promise<boolean> {
  try {
    await api("/api/auth/revoke-other-sessions", { method: "POST", body: JSON.stringify({}) });
    return true;
  } catch {
    return false;
  }
}
