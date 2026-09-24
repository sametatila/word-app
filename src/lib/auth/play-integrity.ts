import "server-only";
import { createHash, createSign } from "node:crypto";
import { promises as fs } from "node:fs";
import { eq, lt, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { guestAttestations } from "@/lib/db/schema";
import { parseClientHeader } from "@/lib/app-control-shared";
import { ATTESTATION_RETENTION_DAYS } from "./attestation-const";

export { ATTESTATION_RETENTION_DAYS };

/**
 * MİSAFİR AÇILIŞINDA CİHAZ DOĞRULAMASI — Play Integrity, KAYIT KİPİ.
 *
 * "Hesapsız devam et" (`POST /sign-in/anonymous`) e-postasız bir kimlik açıyor
 * ve tek koruma IP başına saatte 10 kimlik. IP değiştiren bir betik binlerce
 * misafir açıp her birine seslendirme kotası ve bir yapay zekâ değerlendirmesi
 * harcatabiliyor; okul ağı ya da CGNAT arkasındaki 11. gerçek kişi ise takılıyor.
 * Mağazanın imzalı belgesi isteğin gerçek bir cihazdaki, Play'den gelen,
 * değiştirilmemiş uygulamadan geldiğini kanıtlıyor (docs/plan/device-attestation.md).
 *
 * BU AŞAMADA KİMSE REDDEDİLMİYOR. Belge Google'a çözdürülüyor, sonuç
 * `guest_attestations`a yazılıyor ve o kadar. Engelleme (Aşama 3) ancak gerçek
 * kullanıcıların geçme oranı ölçüldükten sonra açılacak: Google Play hizmetleri
 * olmayan cihazlar, eski telefonlar ve emülatörler şimdiden bilinemiyor.
 *
 * KİP `GUEST_ATTESTATION` ile: boş/`off` = hiçbir şey olmaz (istemciye de bayrak
 * inmiyor, Google'a istek gitmiyor); `log` = kayıt; `enforce` = HENÜZ YOK,
 * `log` gibi davranıyor ve bunu bir kez log'a yazıyor. Servis hesabı anahtarı
 * (`PLAY_INTEGRITY_KEY_PATH`) yoksa kip ne derse desin kapalı: doğrulanamayan
 * belgeyi istemciye ürettirmek boşa kota ve gecikme.
 *
 * STANDART İSTEK ve `requestHash`. İstemci her açılışta rastgele bir tek
 * kullanımlık değer (nonce) üretiyor, belgeyi
 * `sha256("lernomi/guest-sign-in/v1:" + nonce)` (base64url) özetiyle istiyor ve
 * ikisini birlikte gönderiyor. Sunucu özeti kendisi hesaplayıp belgedekiyle
 * karşılaştırıyor: başka bir istek için alınmış belge burada geçmiyor. Aynı
 * özet daha önce görüldüyse belge tekrar kullanılıyor demektir (`replay`).
 * Kotlin tarafı: mobile/android/.../integrity/LernomiIntegrityModule.kt.
 */

export type GuestAttestationMode = "off" | "log" | "enforce";
export type AttestationResult = "pass" | "fail" | "missing" | "error";

/** Google Cloud proje NUMARASI (`nomi-507213`); istemcinin hazırlık isteği bunu ister. Sır değil. */
export const PLAY_INTEGRITY_CLOUD_PROJECT_NUMBER = "658160017552";
export const PLAY_INTEGRITY_PACKAGE = "com.lernomi.learn";

/** İstemcinin özetlediği önek: belge başka bir amaç için alınmışsa özet tutmaz. */
export const GUEST_REQUEST_HASH_PREFIX = "lernomi/guest-sign-in/v1:";

/** Belgenin geçerli sayıldığı yaş. Standart isteğin belgesi zaten tek istek için alınıyor. */
const MAX_AGE_MS = 10 * 60_000;
/** Cihaz saati ileri olabilir; bu kadarı hoş görülüyor. */
const MAX_SKEW_MS = 2 * 60_000;
/** Google çağrılarının tavanı. Kayıt misafir açılışını beklemiyor ama asılı istek birikmesin. */
const TIMEOUT_MS = 8_000;

let warnedEnforce = false;

export function guestAttestationMode(): GuestAttestationMode {
  const raw = (process.env.GUEST_ATTESTATION ?? "").trim().toLowerCase();
  const mode: GuestAttestationMode = raw === "log" || raw === "enforce" ? raw : "off";
  if (mode === "off" || !process.env.PLAY_INTEGRITY_KEY_PATH) return "off";
  if (mode === "enforce" && !warnedEnforce) {
    warnedEnforce = true;
    console.warn("[attest] GUEST_ATTESTATION=enforce is not implemented yet (stage 3); running as log, nobody is rejected");
  }
  return mode;
}

/**
 * `/api/config`e inen bayrak: kip açıksa istemcinin belge alması için gereken
 * proje numarası, kapalıysa `null` (istemci Google'a hiç gitmiyor).
 */
export function guestAttestationConfig(): { cloudProjectNumber: string } | null {
  return guestAttestationMode() === "off" ? null : { cloudProjectNumber: PLAY_INTEGRITY_CLOUD_PROJECT_NUMBER };
}

export function guestRequestHash(nonce: string): string {
  return createHash("sha256").update(GUEST_REQUEST_HASH_PREFIX + nonce).digest("base64url");
}

/** İsteğin gövdesindeki `attestation` alanı. Beklenmeyen her şey düşüyor. */
export type AttestationInput = { token: string | null; nonce: string | null; clientError: string | null };

export function readAttestationInput(body: unknown): AttestationInput {
  const a = (body as { attestation?: unknown } | null | undefined)?.attestation;
  const o = (typeof a === "object" && a !== null ? a : {}) as Record<string, unknown>;
  const token = typeof o.token === "string" && /^[A-Za-z0-9._-]{20,32768}$/.test(o.token) ? o.token : null;
  const nonce = typeof o.nonce === "string" && /^[A-Za-z0-9_-]{16,128}$/.test(o.nonce) ? o.nonce : null;
  /* İstemcinin hata kodu (ör. Play Integrity -1 API_NOT_AVAILABLE, "timeout"):
     Google Play hizmetleri olmayan cihazların kaç olduğunu yalnız bu söylüyor.
     Serbest metin değil, dar bir karakter kümesi. */
  const clientError = typeof o.error === "string" && /^[A-Za-z0-9_:-]{1,48}$/.test(o.error) ? o.error : null;
  return { token, nonce, clientError };
}

/** decodeIntegrityToken'ın döndürdüğü `tokenPayloadExternal`in kullandığımız kısmı. */
export type IntegrityPayload = {
  requestDetails?: { requestPackageName?: string; requestHash?: string; timestampMillis?: string | number };
  appIntegrity?: { appRecognitionVerdict?: string; packageName?: string; versionCode?: string };
  deviceIntegrity?: { deviceRecognitionVerdict?: string[] };
  accountDetails?: { appLicensingVerdict?: string };
};

export type Evaluation = {
  result: AttestationResult;
  reasons: string[];
  appVerdict: string | null;
  deviceVerdict: string | null;
  licensingVerdict: string | null;
};

/**
 * Hüküm. GEÇMEK için hepsi: paket bizim, özet bu isteğin, belge taze,
 * uygulama Play'in tanıdığı sürüm, cihaz MEETS_DEVICE_INTEGRITY. Lisans
 * hükmü yalnız kaydediliyor (Play dışından yüklenen ama değiştirilmemiş
 * kopyayı Aşama 3 ayrıca düşünecek).
 */
export function evaluateIntegrity(payload: IntegrityPayload, expectedHash: string | null, now = Date.now()): Evaluation {
  const reasons: string[] = [];
  const req = payload.requestDetails ?? {};
  const app = payload.appIntegrity?.appRecognitionVerdict ?? null;
  const device = payload.deviceIntegrity?.deviceRecognitionVerdict ?? [];
  const licensing = payload.accountDetails?.appLicensingVerdict ?? null;

  if (req.requestPackageName !== PLAY_INTEGRITY_PACKAGE) reasons.push("package");
  if (!expectedHash) reasons.push("nonce");
  else if (req.requestHash !== expectedHash) reasons.push("hash");
  const ts = Number(req.timestampMillis);
  if (!Number.isFinite(ts) || now - ts > MAX_AGE_MS || ts - now > MAX_SKEW_MS) reasons.push("stale");
  if (app !== "PLAY_RECOGNIZED") reasons.push(`app:${app ?? "none"}`);
  if (!device.includes("MEETS_DEVICE_INTEGRITY")) reasons.push(`device:${device.length ? device.join("+") : "none"}`);

  return {
    result: reasons.length ? "fail" : "pass",
    reasons,
    appVerdict: app,
    deviceVerdict: device.length ? device.join(",") : null,
    licensingVerdict: licensing,
  };
}

/* ── Google çağrısı ───────────────────────────────────────────────────────── */

/** Çözme hatası: `invalid` Google'ın belgeyi reddettiği (400), kalanı bizim/ağın sorunu. */
export class DecodeError extends Error {
  constructor(readonly kind: "invalid" | "http" | "network" | "key", detail: string) {
    super(detail);
  }
}

export type Decoder = (token: string) => Promise<IntegrityPayload>;

type ServiceAccount = { client_email: string; private_key: string; private_key_id?: string; token_uri?: string };
let cachedAccess: { token: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string> {
  if (cachedAccess && cachedAccess.expiresAt > Date.now() + 60_000) return cachedAccess.token;
  let sa: ServiceAccount;
  try {
    sa = JSON.parse(await fs.readFile(process.env.PLAY_INTEGRITY_KEY_PATH ?? "", "utf8")) as ServiceAccount;
  } catch (err) {
    throw new DecodeError("key", (err as Error).message);
  }
  const tokenUri = sa.token_uri ?? "https://oauth2.googleapis.com/token";
  const b64 = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const iat = Math.floor(Date.now() / 1000);
  const head = `${b64({ alg: "RS256", typ: "JWT", ...(sa.private_key_id ? { kid: sa.private_key_id } : {}) })}.${b64({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/playintegrity",
    aud: tokenUri,
    iat,
    exp: iat + 3600,
  })}`;
  let sig: string;
  try {
    sig = createSign("RSA-SHA256").update(head).sign(sa.private_key, "base64url");
  } catch (err) {
    throw new DecodeError("key", (err as Error).message);
  }
  let res: Response;
  try {
    res = await fetch(tokenUri, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${sig}` }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    throw new DecodeError("network", `oauth ${(err as Error).name}`);
  }
  const body = (await res.json().catch(() => null)) as { access_token?: string; expires_in?: number } | null;
  if (!res.ok || !body?.access_token) throw new DecodeError("key", `oauth http ${res.status}`);
  cachedAccess = { token: body.access_token, expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000 };
  return cachedAccess.token;
}

const googleDecoder: Decoder = async (token) => {
  const access = await accessToken();
  let res: Response;
  try {
    res = await fetch(`https://playintegrity.googleapis.com/v1/${PLAY_INTEGRITY_PACKAGE}:decodeIntegrityToken`, {
      method: "POST",
      headers: { authorization: `Bearer ${access}`, "content-type": "application/json" },
      body: JSON.stringify({ integrity_token: token }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    throw new DecodeError("network", `decode ${(err as Error).name}`);
  }
  if (res.status === 400) throw new DecodeError("invalid", "decode http 400");
  if (!res.ok) throw new DecodeError("http", `decode http ${res.status}`);
  const body = (await res.json().catch(() => null)) as { tokenPayloadExternal?: IntegrityPayload } | null;
  if (!body?.tokenPayloadExternal) throw new DecodeError("http", "decode empty");
  return body.tokenPayloadExternal;
};

let decoder: Decoder = googleDecoder;

/** YALNIZ TEST: Google yerine sahte çözücü. `null` gerçeğine döndürür. */
export function setIntegrityDecoderForTests(d: Decoder | null) {
  decoder = d ?? googleDecoder;
}

/* ── Kayıt ────────────────────────────────────────────────────────────────── */

/*
 * Kayıt misafir açılışını BEKLETMİYOR (Google'a gidiş yüzlerce ms); kanca işi
 * başlatıp dönüyor. Testler yazılanı okuyabilsin diye süren işler burada.
 */
const inflight = new Set<Promise<unknown>>();

/** YALNIZ TEST: başlatılmış kayıtların bitmesini bekler. */
export async function settleGuestAttestations(): Promise<void> {
  while (inflight.size) await Promise.allSettled([...inflight]);
}

export type AttestationRecord = Evaluation & { platform: string | null; build: number | null; requestHash: string | null };

/**
 * Bir misafir açılışının belgesini değerlendirip yazar. HİÇBİR ZAMAN
 * fırlatmaz ve hiçbir şeyi reddetmez; iOS'ta (App Attest Aşama 4) yazmaz.
 */
export async function recordGuestAttestation(input: {
  userId: string;
  mode: Exclude<GuestAttestationMode, "off">;
  clientHeader: string | null | undefined;
  body: unknown;
}): Promise<AttestationRecord | null> {
  const client = parseClientHeader(input.clientHeader);
  if (client?.platform === "ios") return null;
  const { token, nonce, clientError } = readAttestationInput(input.body);
  const requestHash = nonce ? guestRequestHash(nonce) : null;

  let ev: Evaluation;
  if (!token) {
    ev = { result: "missing", reasons: [clientError ? `client:${clientError}` : "no_token"], appVerdict: null, deviceVerdict: null, licensingVerdict: null };
  } else {
    try {
      ev = evaluateIntegrity(await decoder(token), requestHash);
    } catch (err) {
      const kind = err instanceof DecodeError ? err.kind : "network";
      ev = { result: kind === "invalid" ? "fail" : "error", reasons: [`decode:${kind}`], appVerdict: null, deviceVerdict: null, licensingVerdict: null };
      if (kind !== "invalid") console.warn(`[attest] decode failed (${kind}): ${(err as Error).message}`);
    }
    if (requestHash) {
      const seen = await db.select({ id: guestAttestations.id }).from(guestAttestations).where(eq(guestAttestations.requestHash, requestHash)).limit(1);
      if (seen.length) ev = { ...ev, result: ev.result === "error" ? "error" : "fail", reasons: [...ev.reasons, "replay"] };
    }
  }

  const row: AttestationRecord = { ...ev, platform: client?.platform ?? null, build: client?.build ?? null, requestHash };
  await db.insert(guestAttestations).values({
    userId: input.userId,
    platform: row.platform,
    build: row.build,
    mode: input.mode,
    result: row.result,
    reasons: row.reasons.length ? row.reasons.join(",") : null,
    appVerdict: row.appVerdict,
    deviceVerdict: row.deviceVerdict,
    licensingVerdict: row.licensingVerdict,
    requestHash,
    createdAt: sql`now()`,
  });
  return row;
}

/**
 * Kancanın çağırdığı yol: işi başlatır, beklemez, hatayı yutar. Misafir
 * açılışı bu kaydın başarısına hiçbir biçimde bağlı değil.
 */
export function startGuestAttestation(input: Parameters<typeof recordGuestAttestation>[0]): void {
  const p = recordGuestAttestation(input).catch((err) => {
    console.warn("[attest] record failed:", (err as Error).message);
    return null;
  });
  inflight.add(p);
  void p.finally(() => inflight.delete(p));
}

/* ── Saklama ──────────────────────────────────────────────────────────────── */

/**
 * Süresi dolan kayıtları siler (Gizlilik §3 ve §9: "cihaz bütünlüğü sonucu
 * {{attestationDays}} gün"). Günlük cron (`api/cron/assess`, 04:15 UTC)
 * çağırıyor, yani satır en geç süre + bir gün yaşıyor. Tekrar çalışması
 * zararsız; hatayı yutup 0 döner ki öteki temizlikler ve kuyruk sürsün.
 * Kimliği boşalmış (hesabı silinmiş) satırlar da aynı süreyle gidiyor.
 */
export async function purgeExpiredGuestAttestations(now = new Date()): Promise<number> {
  try {
    const cutoff = new Date(now.getTime() - ATTESTATION_RETENTION_DAYS * 86_400_000);
    const gone = await db.delete(guestAttestations).where(lt(guestAttestations.createdAt, cutoff));
    return (gone as unknown as { rowCount?: number }).rowCount ?? 0;
  } catch (err) {
    console.error("[attest] purge failed", err);
    return 0;
  }
}
