import { createPrivateKey, createSign, randomUUID } from "node:crypto";

/**
 * Apple ile Giriş — token değişimi ve İPTAL (revoke).
 *
 * NEDEN VAR: App Store Review Guidelines 5.1.1(v) hesap silmeyi zorunlu kılıyor ve
 * Apple ile Giriş sunan uygulamalardan silme anında kullanıcının token'ını **Sign in
 * with Apple REST API ile iptal etmesini** istiyor. İptal edilmezse kullanıcı hesabı
 * bizde silinse bile Apple tarafında uygulamaya verilmiş izin duruyor: Ayarlar ›
 * Apple Hesabı › Oturum Açma ve Güvenlik listesinde Lernomi kalıyor ve aynı e-postayla
 * yeniden giriş "zaten yetkilendirilmiş" akışına düşüyor. İnceleyicinin bakabildiği
 * bir şey.
 *
 * NEDEN AYRI BİR DOSYA: giriş akışının kendisi native id token ile çalışıyor ve orada
 * client secret HİÇ gerekmiyor (bkz. lib/auth/server.ts). İptal ise gerekiyor —
 * Apple'ın /auth/revoke ucu client_id + client_secret + token istiyor. Yani bu dosya
 * girişin değil, SİLMENİN bağımlılığı.
 *
 * NEDEN `jose` DEĞİL: jose depoda doğrudan bağımlılık değil (better-auth'un altında
 * duruyor). Client secret tek bir ES256 JWT; Node'un kendi crypto'su onu bağımlılık
 * eklemeden imzalıyor. Tek incelik imza biçimi: Node DER üretir, JWT ham r||s ister.
 *
 * ENV — dördü birden dolu olmadan bu dosyadaki hiçbir şey çalışmaz ve çalışmaya da
 * kalkışmaz (`appleRevokeConfigured`):
 *   APPLE_BUNDLE_ID   uygulamanın bundle kimliği (girişin de kullandığı anahtar)
 *   APPLE_TEAM_ID     Apple Developer takım kimliği (10 karakter)
 *   APPLE_KEY_ID      "Sign in with Apple" anahtarının kimliği (10 karakter)
 *   APPLE_PRIVATE_KEY .p8 dosyasının içeriği (PEM). Tek satıra sığsın diye "\n"
 *                     kaçışlarıyla yazılabilir; burada geri açılıyor.
 *
 * Yapılandırılmamışken hesap silme AYNEN çalışıyor: iptal adımı atlanıyor. Bugün
 * Apple girişi zaten kapalı (APPLE_BUNDLE_ID boş), yani iptal edilecek bir token da yok.
 *
 * `server-only` işareti bilerek YOK: dosya `node:crypto` dışında hiçbir şeye
 * dokunmuyor (o zaten istemci paketine giremez) ve birim testi
 * `npm run test:apple` onu doğrudan çağırıyor. Veritabanına dokunan taraf
 * lib/account/apple-revoke.ts'te ve orada işaret duruyor.
 */

const TOKEN_URL = "https://appleid.apple.com/auth/token";
const REVOKE_URL = "https://appleid.apple.com/auth/revoke";

/** Apple client secret'ın azami ömrü 6 ay; biz her kullanımda taze üretiyoruz (5 dk). */
const SECRET_TTL_SECONDS = 300;

function env(name: string): string {
  return (process.env[name] ?? "").trim();
}

function privateKeyPem(): string {
  // .env tek satır tutuyor: "-----BEGIN PRIVATE KEY-----\nMIG..." biçimindeki
  // kaçışlar gerçek satır sonuna çevrilmezse createPrivateKey PEM'i tanımıyor.
  return env("APPLE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

export function appleRevokeConfigured(): boolean {
  return Boolean(env("APPLE_BUNDLE_ID") && env("APPLE_TEAM_ID") && env("APPLE_KEY_ID") && privateKeyPem());
}

function b64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Node'un ECDSA imzası DER kodlu (SEQUENCE { INTEGER r, INTEGER s }); JWS ise sabit
 * uzunlukta ham `r||s` istiyor (ES256 için 2 × 32 bayt). Dönüşüm yapılmazsa Apple
 * "invalid_client" diyor ve sebebi hiçbir yerde yazmıyor.
 */
function derToJose(der: Buffer, size = 32): Buffer {
  if (der[0] !== 0x30) throw new Error("apple: beklenmeyen imza biçimi");
  let offset = der[1] & 0x80 ? 2 + (der[1] & 0x7f) : 2;
  const readInt = (): Buffer => {
    if (der[offset] !== 0x02) throw new Error("apple: beklenmeyen imza biçimi");
    const len = der[offset + 1];
    const start = offset + 2;
    offset = start + len;
    let v = der.subarray(start, offset);
    // DER önde sıfır bayt taşıyabilir (işaret biti), ham biçim taşımaz.
    while (v.length > size && v[0] === 0x00) v = v.subarray(1);
    return Buffer.concat([Buffer.alloc(Math.max(0, size - v.length)), v]);
  };
  const r = readInt();
  const s = readInt();
  return Buffer.concat([r, s]);
}

/**
 * Apple'ın istediği client secret: takımın .p8 anahtarıyla ES256 imzalanmış,
 * `aud` = appleid.apple.com, `sub` = bundle kimliği olan kısa ömürlü bir JWT.
 * Dışa açık olmasının tek sebebi test edilebilirliği (scripts/test-apple.ts).
 */
export function appleClientSecret(nowMs = Date.now()): string {
  const now = Math.floor(nowMs / 1000);
  const header = { alg: "ES256", kid: env("APPLE_KEY_ID"), typ: "JWT" };
  const payload = {
    iss: env("APPLE_TEAM_ID"),
    iat: now,
    exp: now + SECRET_TTL_SECONDS,
    aud: "https://appleid.apple.com",
    sub: env("APPLE_BUNDLE_ID"),
    jti: randomUUID(),
  };
  const signingInput = `${b64url(Buffer.from(JSON.stringify(header)))}.${b64url(Buffer.from(JSON.stringify(payload)))}`;
  const signer = createSign("SHA256");
  signer.update(signingInput);
  signer.end();
  const der = signer.sign(createPrivateKey(privateKeyPem()));
  return `${signingInput}.${b64url(derToJose(der))}`;
}

/**
 * Giriş sırasında alınan authorization code'u refresh token'a çevirir.
 *
 * Native akışta id token tek başına yetiyor (giriş için), ama iptal edilebilecek bir
 * token bırakmıyor — Apple id token'ı iptal etmiyor. Bu yüzden kod bir kez burada
 * bozdurulup refresh token saklanıyor; silme anında iptal edilen o.
 * Kod TEK KULLANIMLIK ve ~5 dakika yaşıyor, yani giriş anında çağrılmalı.
 */
export async function exchangeAppleCode(code: string): Promise<string | null> {
  if (!appleRevokeConfigured() || !code) return null;
  const body = new URLSearchParams({
    client_id: env("APPLE_BUNDLE_ID"),
    client_secret: appleClientSecret(),
    code,
    grant_type: "authorization_code",
  });
  try {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { refresh_token?: string };
    return json.refresh_token ?? null;
  } catch {
    return null;
  }
}

/**
 * Token'ı iptal eder. Hesap silme yolunda çağrılıyor ve BAŞARISIZLIĞI silmeyi
 * durdurmuyor: Apple'ın ucu erişilemez diye kullanıcının hesabı silinemez kalırsa
 * 5.1.1(v) baştan ihlal edilir. Sonuç yalnız günlüğe yazılır.
 */
export async function revokeAppleToken(token: string, hint: "refresh_token" | "access_token" = "refresh_token"): Promise<boolean> {
  if (!appleRevokeConfigured() || !token) return false;
  const body = new URLSearchParams({
    client_id: env("APPLE_BUNDLE_ID"),
    client_secret: appleClientSecret(),
    token,
    token_type_hint: hint,
  });
  try {
    const res = await fetch(REVOKE_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    // Apple başarıda boş gövdeli 200 dönüyor.
    return res.ok;
  } catch {
    return false;
  }
}
