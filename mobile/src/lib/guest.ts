import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, API_BASE, ApiError, fetchWithTimeout } from "../api/client";

/**
 * MİSAFİR KİMLİĞİ — istemci tarafı (mağaza ön inceleme B24, App Store 5.1.1(v)).
 *
 * "Hesapsız devam et" sunucuda e-postasız, adsız bir kimlik açıyor
 * (`/api/auth/sign-in/anonymous`); oturum çerezi gerçek hesabınki gibi yerel
 * kavanozda duruyor ve öğrenme uçları o oturumla çalışıyor. Sosyal, yapay
 * zekâ, satın alma ve bildirim hesap istiyor: sunucu misafire
 * `403 account_required` dönüyor (bkz. `isAccountRequired`).
 *
 * JETON CİHAZDA AYRICA SAKLANIYOR. Misafir hesap oluşturduğunda ya da var olan
 * hesabına girdiğinde çerez kavanozundaki misafir oturumunun yerini gerçek
 * oturum alıyor; misafirin kim olduğunu kanıtlayan tek şey açılışta dönen bu
 * jeton. Gerçek oturum açılır açılmaz `claimGuest` onu sunucuya veriyor ve
 * misafirin ilerlemesi hesaba birleşiyor.
 *
 * Anahtar CİHAZA ait (`accountScope` dışında): çıkışta silinmiyor, çünkü
 * birleşme tamamlanmadan silinirse misafirin ilerlemesi kurtarılamaz. Kayıt
 * birleşme bitince, misafir silinince ya da sunucu misafiri tanımayınca siliniyor.
 */
export const GUEST_KEY = "lernomi:guest";

/** Sunucunun hesap isteyen uçlardaki cevabı (bkz. sunucu lib/auth/guest). */
export const ACCOUNT_REQUIRED = "account_required";

export type GuestRecord = { id: string; token: string; at: number };

/** Hata "bu özellik hesap istiyor" mu. */
export function isAccountRequired(e: unknown): boolean {
  return e instanceof ApiError && e.status === 403 && e.message === ACCOUNT_REQUIRED;
}

export async function loadGuestRecord(): Promise<GuestRecord | null> {
  try {
    const raw = await AsyncStorage.getItem(GUEST_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<GuestRecord>;
    return typeof v.id === "string" && typeof v.token === "string" ? { id: v.id, token: v.token, at: Number(v.at) || 0 } : null;
  } catch {
    return null;
  }
}

export async function clearGuestRecord(): Promise<void> {
  try { await AsyncStorage.removeItem(GUEST_KEY); } catch { /* depolama kapalıysa geç */ }
}

export type GuestStart =
  | { ok: true; record: GuestRecord }
  /** `status` 429: kimlik açma sınırı (IP başına saatte 10); 0: ağ yok. */
  | { ok: false; status: number; code: string };

/** Sunucuda misafir kimliği açar ve jetonunu cihaza yazar. */
export async function startGuest(): Promise<GuestStart> {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/auth/sign-in/anonymous`, {
      method: "POST",
      // `origin` elle: RN koymuyor, Better Auth çerez taşıyan POST'ta şart koşuyor.
      headers: { "content-type": "application/json", accept: "application/json", origin: API_BASE },
      body: "{}",
    });
    const json = (await res.json().catch(() => null)) as { token?: unknown; user?: { id?: unknown }; code?: unknown } | null;
    const token = typeof json?.token === "string" ? json.token : "";
    const id = typeof json?.user?.id === "string" ? json.user.id : "";
    if (!res.ok || !token || !id) return { ok: false, status: res.status, code: typeof json?.code === "string" ? json.code : "" };
    const record: GuestRecord = { id, token, at: Date.now() };
    await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(record));
    return { ok: true, record };
  } catch {
    return { ok: false, status: 0, code: "NETWORK" };
  }
}

export type ClaimOutcome =
  /** Misafirin ilerlemesi hesaba birleşti; `hadProgress` hesapta önceden ilerleme vardı. */
  | { kind: "merged"; hadProgress: boolean }
  /** Birleştirilecek misafir yok (temizlik silmiş, jeton geçersiz, zaten birleşmiş). */
  | { kind: "gone" }
  /** Ağ, sınır ya da sunucu hatası: kayıt duruyor, bir sonraki açılışta yeniden denenir. */
  | { kind: "retry" };

/**
 * Gerçek hesabın oturumuyla misafiri hesaba birleştirir. Oturum açıldıktan
 * SONRA ve hesabın başka bir isteğinden ÖNCE çağrılır: önce çağrılırsa (profil
 * yazımı, kuyruk boşaltma) hesap misafirin seçimlerini görmeden kendi boş
 * satırlarını kurar.
 */
export async function claimGuest(record: GuestRecord): Promise<ClaimOutcome> {
  try {
    const r = await api<{ merged?: boolean; targetHadProgress?: boolean }>("/api/account/guest/claim", {
      method: "POST",
      body: JSON.stringify({ guestId: record.id, token: record.token }),
    });
    await clearGuestRecord();
    return { kind: "merged", hadProgress: Boolean(r?.targetHadProgress) };
  } catch (e) {
    if (e instanceof ApiError && (e.status === 400 || e.status === 404 || e.status === 409)) {
      await clearGuestRecord();
      return { kind: "gone" };
    }
    return { kind: "retry" };
  }
}

/** Misafirin sunucudaki verisini siler (Profil › Misafir verilerini sil). */
export async function deleteGuestData(): Promise<boolean> {
  try {
    await api("/api/account/guest", { method: "DELETE" });
    return true;
  } catch (e) {
    // Oturum zaten yoksa silinecek misafir de yok.
    return e instanceof ApiError && e.status === 401;
  }
}
