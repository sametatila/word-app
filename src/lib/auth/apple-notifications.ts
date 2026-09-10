import { createPublicKey, createVerify } from "node:crypto";

/**
 * Apple ile Giriş — sunucudan sunucuya bildirimlerin DOĞRULANMASI.
 *
 * NEDEN VAR: kullanıcı Apple Hesabı › Oturum Açma ve Güvenlik ekranından
 * Lernomi'nin iznini kaldırdığında ya da Apple hesabını tamamen sildiğinde
 * uygulama bunu başka hiçbir yoldan ÖĞRENEMEZ. Kullanıcı bir daha giremez, biz
 * ise hesabı "Apple bağlı" göstermeye devam ederiz. Apple bunu haber vermek
 * için imzalı bir bildirim gönderiyor; bu dosya o bildirimin gerçekten
 * Apple'dan geldiğini kanıtlıyor.
 *
 * NEDEN AYRI DOSYA: doğrulama saf — ağdan yalnız Apple'ın açık anahtarlarını
 * çekiyor, veritabanına hiç dokunmuyor. Böylece `npm run test:apple` içinde
 * gerçek bir anahtar çiftiyle uçtan uca sınanabiliyor. Veriye dokunan taraf
 * `lib/account/apple-notify.ts`te ve `server-only` işareti orada.
 *
 * NEDEN `jose` DEĞİL: `lib/auth/apple.ts` ile aynı gerekçe — jose depoda
 * doğrudan bağımlılık değil, better-auth'un altında duruyor. Doğrulama tek bir
 * RS256 imzası; Node'un kendi crypto'su JWK'yi doğrudan okuyabiliyor
 * (`createPublicKey({ format: "jwk" })`), bağımlılık eklemeye değmez.
 *
 * GÜVENLİK: bu uç kimlik doğrulamasız, herkese açık. Tek kapı imza. Bu yüzden
 * üç şey birden isteniyor ve biri eksikse bildirim REDDEDİLİYOR: Apple'ın
 * anahtarıyla geçerli imza, `iss` = appleid.apple.com, `aud` = bizim bundle
 * kimliğimiz. `aud` kontrolü olmasa başka bir geliştiricinin uygulamasına ait
 * gerçek bir Apple bildirimi bize karşı kullanılabilirdi.
 */

const JWKS_URL = "https://appleid.apple.com/auth/keys";
const ISSUER = "https://appleid.apple.com";

/** Anahtar önbelleği ömrü. Apple anahtarları nadiren döner; bir saat bol. */
const JWKS_TTL_MS = 60 * 60 * 1000;

/**
 * Tanınmayan `kid` görüldüğünde önbellek tazeleniyor — ama en fazla bu sıklıkta.
 *
 * Sınır olmasaydı uydurma `kid` taşıyan bir istek akışı bizi Apple'a saniyede
 * bir istek atmaya zorlardı: kimlik doğrulamasız bir uçta bu bedava bir
 * yükseltme kolu olurdu.
 */
const JWKS_REFETCH_MS = 60 * 1000;

/** Saat kayması payı. Apple'ın `exp`i kısa; birkaç saniyelik fark reddetmemeli. */
const SKEW_SECONDS = 300;

/** `exp` taşımayan bir bildirimde kabul edilen azami yaş — sonsuz tekrar oynatmayı keser. */
const MAX_AGE_SECONDS = 24 * 60 * 60;

export type AppleEventType = "email-disabled" | "email-enabled" | "consent-revoked" | "account-delete";

const EVENT_TYPES: readonly string[] = [
  "email-disabled",
  "email-enabled",
  "consent-revoked",
  "account-delete",
];

export type AppleNotification = {
  type: AppleEventType;
  /** Apple'ın kullanıcı kimliği. `account.accountId` ile aynı değer. */
  sub: string;
  /** Yalnız e-posta olaylarında dolu. */
  email?: string;
  isPrivateEmail?: boolean;
  eventTimeMs?: number;
};

export type VerifyResult =
  | { ok: true; event: AppleNotification }
  | { ok: false; reason: string };

type Jwk = { kid?: string; kty?: string; alg?: string; n?: string; e?: string; use?: string };

let cache: { at: number; keys: Jwk[] } | null = null;
let lastFetchAt = 0;

function env(name: string): string {
  return (process.env[name] ?? "").trim();
}

export function appleNotificationsConfigured(): boolean {
  return Boolean(env("APPLE_BUNDLE_ID"));
}

function b64url(part: string): Buffer {
  return Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

/**
 * Apple'ın açık anahtarları. `force` yalnız tanınmayan `kid`de veriliyor;
 * çağrı sıklığı `JWKS_REFETCH_MS` ile sınırlı.
 */
async function jwks(force = false): Promise<Jwk[]> {
  const now = Date.now();
  const fresh = cache && now - cache.at < JWKS_TTL_MS;
  if (fresh && !force) return cache!.keys;
  if (force && now - lastFetchAt < JWKS_REFETCH_MS) return cache?.keys ?? [];

  lastFetchAt = now;
  const res = await fetch(JWKS_URL, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) {
    // Ağ hatasında ESKİ anahtarlar korunuyor: Apple'ın uca erişilemediği bir
    // dakika boyunca geçerli bildirimleri reddetmek, kaçırmak demek.
    if (cache) return cache.keys;
    throw new Error(`apple jwks: ${res.status}`);
  }
  const body = (await res.json()) as { keys?: Jwk[] };
  const keys = Array.isArray(body.keys) ? body.keys : [];
  cache = { at: now, keys };
  return keys;
}

/**
 * Yalnız test içindir: modül düzeyindeki anahtar önbelleğini elle doldurur.
 *
 * `lastFetchAt` da "az önce çekildi" sayılıyor. Sayılmasaydı tanınmayan bir
 * `kid` gören ilk doğrulama tazeleme hakkını kullanıp GERÇEK Apple ucuna
 * çıkardı ve testin anahtarlarını ezerdi — ilk yazımda tam olarak bu oldu.
 */
export function __setAppleJwksForTest(keys: Jwk[] | null): void {
  cache = keys ? { at: Date.now(), keys } : null;
  lastFetchAt = keys ? Date.now() : 0;
}

/**
 * `events` iddiası Apple'da JSON DİZGİ olarak geliyor (JSON içinde JSON).
 * Belgelerin bazı örneklerinde nesne olarak görünüyor; ikisi de kabul ediliyor,
 * çünkü hangisinin geldiğine bakıp kırılmak gereksiz bir kırılganlık.
 */
function parseEvents(raw: unknown): Record<string, unknown> | null {
  if (raw && typeof raw === "object") return raw as Record<string, unknown>;
  if (typeof raw !== "string" || !raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** Apple `is_private_email`i "true"/"false" DİZGİ olarak da gönderiyor. */
function asBool(v: unknown): boolean | undefined {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") return v === "true";
  return undefined;
}

/**
 * Bildirimi doğrular ve olaya çevirir.
 *
 * `payload` Apple'ın gövdesindeki JWS (compact serialization). Dönen her
 * başarısızlık bir REDDİR: çağıran bunu 401'e çevirir, çünkü doğrulanamayan
 * bir bildirim Apple'dan gelmiş sayılamaz.
 */
export async function verifyAppleNotification(payload: string, nowMs = Date.now()): Promise<VerifyResult> {
  const audience = env("APPLE_BUNDLE_ID");
  if (!audience) return { ok: false, reason: "not_configured" };
  if (typeof payload !== "string" || !payload) return { ok: false, reason: "empty_payload" };

  const parts = payload.split(".");
  if (parts.length !== 3) return { ok: false, reason: "malformed_jws" };
  const [rawHeader, rawBody, rawSig] = parts;

  let header: { alg?: string; kid?: string };
  let claims: Record<string, unknown>;
  try {
    header = JSON.parse(b64url(rawHeader).toString("utf8")) as typeof header;
    claims = JSON.parse(b64url(rawBody).toString("utf8")) as Record<string, unknown>;
  } catch {
    return { ok: false, reason: "malformed_jws" };
  }

  // Algoritma SABİT. `header.alg`e uymak, saldırganın "alg: none" ya da HS256
  // seçmesine izin vermek olurdu — JWT'nin en bilinen zafiyeti.
  if (header.alg !== "RS256") return { ok: false, reason: "bad_alg" };
  if (!header.kid) return { ok: false, reason: "no_kid" };

  let keys: Jwk[];
  try {
    keys = await jwks();
    if (!keys.some((k) => k.kid === header.kid)) keys = await jwks(true);
  } catch {
    return { ok: false, reason: "jwks_unavailable" };
  }
  const jwk = keys.find((k) => k.kid === header.kid && k.kty === "RSA" && k.n && k.e);
  if (!jwk) return { ok: false, reason: "unknown_kid" };

  let verified = false;
  try {
    const key = createPublicKey({ key: jwk as never, format: "jwk" });
    const verifier = createVerify("RSA-SHA256");
    verifier.update(`${rawHeader}.${rawBody}`);
    verifier.end();
    verified = verifier.verify(key, b64url(rawSig));
  } catch {
    return { ok: false, reason: "bad_signature" };
  }
  if (!verified) return { ok: false, reason: "bad_signature" };

  if (claims.iss !== ISSUER) return { ok: false, reason: "bad_issuer" };

  // `aud` tek dizgi ya da dizi olabiliyor; ikisi de bizim kimliğimizi taşımalı.
  const aud = claims.aud;
  const audOk = Array.isArray(aud) ? aud.includes(audience) : aud === audience;
  if (!audOk) return { ok: false, reason: "bad_audience" };

  const now = Math.floor(nowMs / 1000);
  const exp = typeof claims.exp === "number" ? claims.exp : null;
  const iat = typeof claims.iat === "number" ? claims.iat : null;
  if (exp !== null) {
    if (now > exp + SKEW_SECONDS) return { ok: false, reason: "expired" };
  } else if (iat !== null && now - iat > MAX_AGE_SECONDS) {
    return { ok: false, reason: "too_old" };
  }
  if (iat !== null && iat - SKEW_SECONDS > now) return { ok: false, reason: "future_iat" };

  const ev = parseEvents(claims.events);
  if (!ev) return { ok: false, reason: "no_events" };

  const type = String(ev.type ?? "");
  const sub = String(ev.sub ?? "").trim();
  if (!EVENT_TYPES.includes(type)) return { ok: false, reason: `unknown_type:${type || "-"}` };
  if (!sub) return { ok: false, reason: "no_sub" };

  const eventTime = Number(ev.event_time);
  return {
    ok: true,
    event: {
      type: type as AppleEventType,
      sub,
      email: typeof ev.email === "string" && ev.email ? ev.email : undefined,
      isPrivateEmail: asBool(ev.is_private_email),
      eventTimeMs: Number.isFinite(eventTime) ? eventTime : undefined,
    },
  };
}
