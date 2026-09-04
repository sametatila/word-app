import { Platform } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { signInGoogleNative } from "./auth";
import { t } from "./i18n";
import type { AuthOutcome } from "./auth";

/**
 * Native Google Sign-In (WebView değil).
 *
 * `webClientId` = Google Cloud'daki **Web** OAuth client. Bununla dönen idToken'ın
 * `aud`'u Web client ID olur; sunucudaki GOOGLE_CLIENT_ID de o olduğu için
 * better-auth idToken'ı doğrular. Android client'ı ayrıca kayıtlı olmalı ama koda
 * girmez (Google paket adı + SHA-1 ile eşler); iOS client'ı ise girmek ZORUNDA —
 * bkz. IOS_CLIENT_ID.
 *
 * Client ID gizli değildir (uygulama paketinde zaten gömülü) — sabit tutulur.
 */
const WEB_CLIENT_ID = "658160017552-9vkn1d5rbie1utdspf5f61n497p668hu.apps.googleusercontent.com";

/**
 * iOS OAuth istemcisi. Android'in aksine iOS'ta client id KODA GİRMEK ZORUNDA:
 * Google eşlemeyi paket adı + SHA-1 ile yapamıyor, uygulamanın kendisini bu
 * kimlikle tanıyor. Sır değil (uygulama paketinde zaten gömülü).
 *
 * WEB_CLIENT_ID'nin YERİNE GEÇMEZ, yanına gelir: idToken'ın `aud`'u web client
 * ID olmaya devam eder, sunucudaki GOOGLE_CLIENT_ID de odur. İkisi karıştırılırsa
 * better-auth token'ı reddeder.
 *
 * BOŞ = iOS istemcisi henüz açılmadı (Google Cloud › Kimlik Bilgileri › OAuth
 * istemcisi › iOS, bundle kimliğiyle). Doldurulduğu gün TERS yazımı da
 * Info.plist'e CFBundleURLTypes olarak girmeli (Şerit P'ye teslim edildi,
 * docs/plan/ios-parity-A-teslim.md §1.2) — ikisi ayrışırsa giriş "invalid client"
 * ile düşer.
 */
const IOS_CLIENT_ID = "";

/** iOS'ta Google girişi kurulu mu; Android'de her zaman true (istemci koda girmez). */
export function googleSupported(): boolean {
  return Platform.OS !== "ios" || IOS_CLIENT_ID !== "";
}

let configured = false;
function ensureConfigured() {
  if (configured) return;
  // iosClientId yalnız DOLUYKEN gönderilir: boş dize göndermek, kütüphaneye
  // "şu kimliği kullan" demek olur ve Android'de de yapılandırmayı bozardı.
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    ...(IOS_CLIENT_ID ? { iosClientId: IOS_CLIENT_ID } : {}),
  });
  configured = true;
}

/**
 * Google SDK oturumunu kapatır — önbellekteki hesabı temizler ki bir sonraki
 * girişte cihaz hesap SEÇİCİSİ tekrar açılsın (aksi halde SDK son hesabı sessizce
 * seçip aynı hesaba giriyor). better-auth oturumundan bağımsızdır. Sessiz.
 */
export async function googleSignOut(): Promise<void> {
  try { ensureConfigured(); await GoogleSignin.signOut(); } catch { /* yut */ }
}

/**
 * Cihaz hesap seçiciyi açar, idToken alır, better-auth'a idToken ile giriş yapar.
 * İptal edilirse sessiz (CANCELLED). Play Services yoksa net mesaj döner.
 */
export async function googleSignIn(): Promise<AuthOutcome> {
  if (!googleSupported()) return { ok: false, code: "GOOGLE", message: t("autherror.google_failed") };
  try {
    ensureConfigured();
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // v16: { type: "success", data: { idToken, ... } } | { type: "cancelled" }
    const res = (await GoogleSignin.signIn()) as
      | { type?: string; data?: { idToken?: string | null }; idToken?: string | null };
    if (res?.type === "cancelled") return { ok: false, code: "CANCELLED", message: t("autherror.cancelled") };
    const idToken = res?.data?.idToken ?? res?.idToken ?? null;
    if (!idToken) return { ok: false, code: "NO_TOKEN", message: t("autherror.no_google_token") };
    return await signInGoogleNative(idToken);
  } catch (e) {
    const code = (e as { code?: string })?.code ?? "";
    // Kullanıcı iptali sessiz geçilir; gerisi net hata.
    if (code === "SIGN_IN_CANCELLED" || code === "-5" || code === "12501") {
      return { ok: false, code: "CANCELLED", message: t("autherror.cancelled") };
    }
    return { ok: false, code: "GOOGLE", message: t("autherror.google_failed") };
  }
}
