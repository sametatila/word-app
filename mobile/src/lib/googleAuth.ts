import { Platform } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { sameEmail, tokenEmail } from "./accountLinks";
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
 * istemcisi › iOS, paket kimliği `app.lernomi.ios`).
 *
 * ELLE DOLDURMA: aynı kimlik Info.plist'te de, TERS yazımla duruyor
 * (`com.googleusercontent.apps.<num>-<karma>`) ve yalnız biri dolarsa giriş
 * çalışmaz — üstelik iki yarım durumun hatası da yanıltıcı (biri hesap seçiciden
 * geri dönemez, öteki düğmeyi hiç çizmez). İkisini tek komut yazıyor:
 *
 *     npm run google:ios -- <istemci-kimliği>      # aç
 *     npm run google:ios -- --clear                # kapat
 *
 * Kapı `scripts/check-ios.py` › "Google iOS istemcisi": yarım kurulum CI'da düşer.
 *
 * `: string` ZORUNLU, süs değil. Olmasa TypeScript sabiti değişmez LİTERAL tip
 * sayıyor; değer dolduğu an aşağıdaki `!== ""` karşılaştırması "bu iki tipin
 * kesişimi yok" (TS2367) ile HATA veriyor ve `npx tsc --noEmit` — yani CI —
 * kırılıyor. Yani kimliği doldurmak, başka hiçbir şey yapmadan, derlemeyi
 * bozardı. Ölçüldü: örnek bir kimlikle koşuldu, hata çıktı, açıklama buraya
 * düşüldü. Kaldırılmamalı.
 */
const IOS_CLIENT_ID: string = "";

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

/**
 * Google hesabını AÇIK OTURUMA bağlar (Ayarlar → Giriş yöntemleri).
 *
 * Girişle aynı yoldan gidiyor: better-auth'un `link-social` ucu idToken kabul
 * etmiyor, yalnız tarayıcı yönlendirmesi veriyor; native token'ı kabul eden uç
 * `sign-in/social` ve o uç, e-posta eşleşen mevcut hesaba bağlıyor.
 *
 * KORUMA: o uç "bu e-postanın hesabına gir" demek. Kullanıcı hesap seçicide
 * BAŞKA bir Google hesabı seçerse bağlama olmaz — sessizce o hesaba geçilir ya
 * da yeni hesap açılır, yani kişi kendi hesabını bağlamaya çalışırken başka bir
 * hesaba düşer. Bu yüzden token'daki e-posta oturumunkiyle karşılaştırılıyor ve
 * uymuyorsa çağrı hiç kurulmuyor.
 *
 * Hesap seçici her seferinde açılsın diye önce SDK oturumu kapatılıyor; yoksa
 * son kullanılan hesapla sessizce devam ediyor ve kullanıcı seçemiyor.
 */
export async function googleLink(expectEmail: string | null): Promise<AuthOutcome> {
  if (!googleSupported()) return { ok: false, code: "GOOGLE", message: t("autherror.google_failed") };
  try {
    ensureConfigured();
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    try { await GoogleSignin.signOut(); } catch { /* yut */ }
    const res = (await GoogleSignin.signIn()) as
      | { type?: string; data?: { idToken?: string | null }; idToken?: string | null };
    if (res?.type === "cancelled") return { ok: false, code: "CANCELLED", message: t("autherror.cancelled") };
    const idToken = res?.data?.idToken ?? res?.idToken ?? null;
    if (!idToken) return { ok: false, code: "NO_TOKEN", message: t("autherror.no_google_token") };
    if (expectEmail && !sameEmail(tokenEmail(idToken), expectEmail)) {
      return { ok: false, code: "EMAIL_MISMATCH", message: t("links.email_mismatch") };
    }
    return await signInGoogleNative(idToken);
  } catch (e) {
    const code = (e as { code?: string })?.code ?? "";
    if (code === "SIGN_IN_CANCELLED" || code === "-5" || code === "12501") {
      return { ok: false, code: "CANCELLED", message: t("autherror.cancelled") };
    }
    return { ok: false, code: "GOOGLE", message: t("autherror.google_failed") };
  }
}
