import { NativeModules, Platform } from "react-native";

/**
 * MİSAFİR AÇILIŞINDA CİHAZ DOĞRULAMASI — istemci (Android, Play Integrity).
 *
 * Sunucu kayıt kipinde (`GUEST_ATTESTATION=log`) "Hesapsız devam et" isteğine
 * Play Integrity belgesi istiyor, sonucu yalnız KAYDEDİYOR ve kimseyi
 * reddetmiyor (sunucu lib/auth/play-integrity, docs/plan/device-attestation.md).
 * Kip kapalıyken `/api/config` `guestAttestation: null` diyor ve burada hiçbir
 * şey yapılmıyor: Google'a istek gitmiyor.
 *
 * MİSAFİR AÇILIŞI TAKILMIYOR: belge en çok `ATTESTATION_TIMEOUT_MS` bekleniyor.
 * Gelmezse, native modül yoksa ya da Play hizmetleri hata verirse açılış
 * belgesiz sürüyor ve sunucuya yalnız hata kodu gidiyor (Google Play hizmetleri
 * olmayan cihazları saymanın tek yolu bu).
 *
 * iOS: App Attest sonraki aşama (Aşama 4); burada hiçbir şey yapılmıyor.
 * Native taraf: android/.../integrity/LernomiIntegrityModule.kt.
 */
type IntegrityNative = {
  prepare(projectNumber: string): Promise<boolean>;
  requestGuestToken(projectNumber: string): Promise<{ token: string; nonce: string }>;
};

const ANDROID = Platform.OS === "android";
const Native: IntegrityNative | undefined = ANDROID ? (NativeModules.LernomiIntegrity as IntegrityNative | undefined) : undefined;

/** Sunucuya giden `attestation` alanı: belge ya da neden alınamadığı. */
export type GuestAttestation = { token: string; nonce: string } | { error: string };

/** Belgenin beklendiği en uzun süre; hazırlık önceden yapıldıysa belge çoğu zaman 1 sn altında. */
export const ATTESTATION_TIMEOUT_MS = 4000;

let warmed: string | null = null;

/**
 * Sağlayıcıyı önceden hazırlar (ilk hazırlık birkaç saniye sürebiliyor). Giriş
 * ekranı açılınca çağrılıyor; sonuç beklenmiyor, hata yutuluyor.
 */
export function warmUpIntegrity(projectNumber: string | null | undefined): void {
  if (!Native || !projectNumber || warmed === projectNumber) return;
  warmed = projectNumber;
  Native.prepare(projectNumber).catch(() => {
    warmed = null; // bir sonraki deneme yeniden hazırlasın
  });
}

function codeOf(e: unknown): string {
  const c = (e as { code?: unknown } | null)?.code;
  const s = typeof c === "string" || typeof c === "number" ? String(c) : "native";
  return /^[A-Za-z0-9_:-]{1,48}$/.test(s) ? s : "native";
}

/**
 * Misafir açılışı için belge. `null`: gönderilecek bir şey yok (iOS, kip kapalı).
 * Hiçbir zaman fırlatmaz.
 */
export async function guestAttestation(projectNumber: string | null | undefined, timeoutMs = ATTESTATION_TIMEOUT_MS): Promise<GuestAttestation | null> {
  if (!ANDROID || !projectNumber) return null;
  if (!Native) return { error: "no_module" };
  let timer: ReturnType<typeof setTimeout> | null = null;
  try {
    const timeout = new Promise<GuestAttestation>((resolve) => {
      timer = setTimeout(() => resolve({ error: "timeout" }), timeoutMs);
    });
    const request = Native.requestGuestToken(projectNumber).then(
      (r): GuestAttestation => (typeof r?.token === "string" && typeof r?.nonce === "string" ? { token: r.token, nonce: r.nonce } : { error: "empty" }),
      (e): GuestAttestation => ({ error: codeOf(e) }),
    );
    return await Promise.race([request, timeout]);
  } catch (e) {
    return { error: codeOf(e) };
  } finally {
    if (timer) clearTimeout(timer);
  }
}
