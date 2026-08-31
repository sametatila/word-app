import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { signInGoogleNative } from "./auth";
import type { AuthOutcome } from "./auth";

/**
 * Native Google Sign-In (WebView değil).
 *
 * `webClientId` = Google Cloud'daki **Web** OAuth client (Android/iOS client'lar
 * ayrıca kayıtlı olmalı ama koda girmez — Google paket adı + SHA-1 ile eşler).
 * Bununla dönen idToken'ın `aud`'u Web client ID olur; sunucudaki
 * GOOGLE_CLIENT_ID de o olduğu için better-auth idToken'ı doğrular.
 *
 * Client ID gizli değildir (uygulama paketinde zaten gömülü) — sabit tutulur.
 */
const WEB_CLIENT_ID = "658160017552-9vkn1d5rbie1utdspf5f61n497p668hu.apps.googleusercontent.com";

let configured = false;
function ensureConfigured() {
  if (configured) return;
  GoogleSignin.configure({ webClientId: WEB_CLIENT_ID });
  configured = true;
}

/**
 * Cihaz hesap seçiciyi açar, idToken alır, better-auth'a idToken ile giriş yapar.
 * İptal edilirse sessiz (CANCELLED). Play Services yoksa net mesaj döner.
 */
export async function googleSignIn(): Promise<AuthOutcome> {
  try {
    ensureConfigured();
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // v16: { type: "success", data: { idToken, ... } } | { type: "cancelled" }
    const res = (await GoogleSignin.signIn()) as
      | { type?: string; data?: { idToken?: string | null }; idToken?: string | null };
    if (res?.type === "cancelled") return { ok: false, code: "CANCELLED", message: "İptal edildi" };
    const idToken = res?.data?.idToken ?? res?.idToken ?? null;
    if (!idToken) return { ok: false, code: "NO_TOKEN", message: "Google kimliği alınamadı" };
    return await signInGoogleNative(idToken);
  } catch (e) {
    const code = (e as { code?: string })?.code ?? "";
    // Kullanıcı iptali sessiz geçilir; gerisi net hata.
    if (code === "SIGN_IN_CANCELLED" || code === "-5" || code === "12501") {
      return { ok: false, code: "CANCELLED", message: "İptal edildi" };
    }
    return { ok: false, code: "GOOGLE", message: "Google girişi başarısız oldu. E-posta ile deneyebilirsin." };
  }
}
