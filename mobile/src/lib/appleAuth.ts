import { Platform } from "react-native";
import appleAuth from "@invertase/react-native-apple-authentication";
import { signInAppleNative, updateUserName } from "./auth";
import { t } from "./i18n";
import type { AuthOutcome } from "./auth";

/**
 * Apple ile Giriş (iOS native) — Google'ın `googleAuth.ts`teki eşi.
 *
 * App Store Review Guidelines 4.8: üçüncü taraf girişi (Google) sunan uygulama
 * Apple ile Giriş'i de sunmak zorunda. Yayın engeli, metin işi değil.
 *
 * Akış Google'la aynı: sistem ekranı → idToken → better-auth `sign-in/social`.
 * Sunucu tarafı `lib/auth/server.ts`teki `apple` sağlayıcısı; token'ın `aud`'u
 * uygulamanın bundle kimliği olduğu için orada `appBundleIdentifier` bekleniyor.
 *
 * ## NONCE neden gönderilmiyor
 *
 * Kütüphane isteğe her zaman bir nonce koyuyor ama ARADA HASHLİYOR: verdiğin ham
 * nonce'u SHA-256'layıp Apple'a onu yolluyor, cevapta ise HAM olanı geri veriyor
 * (RNAppleAuthModule.m: `appleIdRequest.nonce = sha256(rawNonce)`). Yani id
 * token'ın içindeki `nonce` iddiası ham değerin ÖZETİ. better-auth ise gönderdiğin
 * dizgiyi token'daki iddiayla düz karşılaştırıyor — doğrulamanın tutması için
 * sunucuya özeti yollamak gerekir, JS tarafında SHA-256 ise ya yeni bir bağımlılık
 * ya elle yazılmış bir kripto demek. Yanlış hesaplanırsa giriş %100 kırılır ve bu
 * makinede denenemez.
 *
 * Bu yüzden `nonceEnabled: false` (kütüphanenin "nonce desteklemeyen sağlayıcılar"
 * için koyduğu seçenek) ve sunucuya nonce gitmiyor. Token yine tam doğrulanıyor:
 * Apple imzası, `iss`, `aud` = bundle kimliği ve 1 saatlik yaş sınırı. Bugünkü
 * Google native akışında da nonce yok, iki yol aynı duruşta.
 *
 * Açmak istenirse: JS'te ham nonce üret → `performRequest({ nonce: raw })` → sunucuya
 * `idToken.nonce` olarak SHA-256'nın KÜÇÜK HARF HEX'ini yolla. Cihazda doğrulanmadan
 * açılmamalı.
 */

/** Cihaz Apple girişini destekliyor mu (iOS 13+; Android'de her zaman false). */
export function appleSupported(): boolean {
  return Platform.OS === "ios" && appleAuth.isSupported;
}

/** Apple'ın verdiği ad parçalarını tek dizgeye indirir; hiçbiri yoksa null. */
function fullNameOf(res: { fullName: { givenName: string | null; familyName: string | null } | null }): string | null {
  const parts = [res.fullName?.givenName, res.fullName?.familyName].filter((p): p is string => !!p?.trim());
  const name = parts.join(" ").trim();
  return name.length >= 2 ? name : null;
}

/**
 * Apple oturum ekranını açar, idToken alır, better-auth'a girer.
 * İptal edilirse sessiz (CANCELLED); gerisi net hata döner.
 */
export async function appleSignIn(): Promise<AuthOutcome> {
  if (!appleSupported()) return { ok: false, code: "APPLE", message: t("autherror.apple_failed") };
  try {
    const res = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // FULL_NAME + EMAIL yalnız İLK yetkilendirmede dolu gelir; ikinci girişte
      // Apple ikisini de null döner. Bu yüzden ad hemen aşağıda yazılıyor —
      // kaçırılırsa bir daha sorulamaz (kullanıcı Ayarlar'dan izni sıfırlamadıkça).
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      nonceEnabled: false, // gerekçe yukarıdaki docblock'ta
    });
    const idToken = res.identityToken;
    if (!idToken) return { ok: false, code: "NO_TOKEN", message: t("autherror.no_apple_token") };

    const outcome = await signInAppleNative(idToken);
    if (!outcome.ok) return outcome;

    // Oturum açıldı; adı ancak şimdi yazabiliriz (uç oturum istiyor). Başarısız
    // olursa giriş yine geçerli, kullanıcı adını Ayarlar'dan düzeltebilir.
    const name = fullNameOf(res);
    if (name) await updateUserName(name);
    return outcome;
  } catch (e) {
    // 1001 = kullanıcı iptali (appleAuth.Error.CANCELED). Sessiz geçilir.
    const code = String((e as { code?: string | number })?.code ?? "");
    if (code === appleAuth.Error.CANCELED) {
      return { ok: false, code: "CANCELLED", message: t("autherror.cancelled") };
    }
    return { ok: false, code: "APPLE", message: t("autherror.apple_failed") };
  }
}
