import { Platform } from "react-native";
import { APP_VERSION, APP_VERSION_CODE } from "../version";

/**
 * Mobil API istemcisi — canlı web API'sini çağırır (www.lernomi.app; veritabanı
 * ve tüm backend yeniden kullanılır, tek doğruluk kaynağı).
 *
 * Oturum ÇEREZLE taşınır: giriş yapılınca Better Auth Set-Cookie yazar, RN'in
 * yerel ağ katmanı (Android cookie jar) çerezi saklar ve sonraki her istekte
 * kendiliğinden gönderir — Bearer başlığı ya da elle çerez yönetimi gerekmez.
 * 401 ayrı bir hata tipiyle döner ki çağıran "oturum yok"u diğer hatalardan
 * ayırabilsin (giriş ekranına yönlendirme kararı buna bağlı).
 */
/**
 * DİKKAT: bu adres APK'ye gömülür. Yayımlanmış eski sürümler ömür boyu
 * exfe.me'ye istek atmaya devam eder — o alan adı kapatılamaz, aynı sunucuda
 * ikinci bir server_name olarak yaşamalı (yönlendirme yetmez: çerez alan adı
 * ve POST gövdeleri yönlendirmede bozulur).
 */
export const API_BASE = "https://www.lernomi.app";

/**
 * İSTEMCİ SÜRÜMÜ her istekte: `x-lernomi-client: android/1.0.3/14`.
 *
 * Hangi kullanıcının hangi build'i kullandığı bilinmiyordu; zorunlu
 * güncellemenin kime etki edeceği de bilinemiyordu. Sunucu `/api/me`de okuyup
 * kullanıcı başına yazıyor (`lib/app-control` recordClient). Kişisel veri
 * değil, teknik bilgi - analitik tercihinden bağımsız.
 */
export const CLIENT_HEADER_VALUE = `${Platform.OS === "ios" ? "ios" : "android"}/${APP_VERSION}/${APP_VERSION_CODE}`;

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * ZAMAN AŞIMI — webin `lib/assess-client` kalıbının karşılığı.
 *
 * `api()` hiç zaman aşımı taşımıyordu: yapay zekâ uçları (`/api/assess`,
 * `/api/chat`) otuz saniyeyi aşabiliyor ve RN'in `fetch`i işletim sistemi
 * vazgeçene kadar bekliyor. Kullanıcı dönmeyen bir spinner'a bakıyordu ve
 * çıkış yolu yoktu. Web aynı çağrıyı yirmi saniyede kesiyor
 * (`ASSESS_TIMEOUT_MS`) ve `timeout` sebebini ayrı gösteriyor.
 *
 * Varsayılan yirmi beş saniye: webin yirmisinden biraz yukarı, çünkü mobil
 * ses yükleyen uçları da (`/api/stt`) aynı istemciden çağırıyor. Çağıran
 * `timeoutMs` ile değiştirebilir; `0` kapatır (yükleme gibi uzun işler için).
 *
 * Kesildiğinde `ApiError(0, "timeout")` atılıyor. Durum 0, çünkü sunucudan
 * bir yanıt gelmedi - `failReason` gibi sınıflandırıcılar onu doğru biçimde
 * "ulaşılamadı" sayıyor, ama mesaj artık sebebi söylüyor.
 */
export const API_TIMEOUT_MS = 25_000;

/**
 * Değerlendirme uçlarının kendi tavanları — web `lib/assess-client` ile AYNI
 * ADLA, aynı sayılarla.
 *
 * `/api/assess` çağrıları genel tavana (25 sn) düşüyordu, web ise yirmi
 * saniye bekliyor; rol yapma sınavı ise burada otuz saniye geçiyordu, webde
 * yirmi. Yani aynı cevap iki platformda farklı noktada "zaman aşımı"
 * oluyordu. Adlar web'dekiyle birebir aynı, o yüzden ayrışmayı "ortak sayısal
 * sabitler" kapısı kendiliğinden yakalıyor.
 */
export const ASSESS_TIMEOUT_MS = 20000;

/** Rol yapma sınavı: konuşmanın TAMAMI gönderiliyor, tavan daha uzun. */
export const ASSESS_ROLEPLAY_TIMEOUT_MS = 30000;

/**
 * Sohbet (roleplay) ÜRETİMİ — değerlendirmeden de uzun.
 *
 * Model burada bir cevap YAZIYOR (değerlendirmede olduğu gibi hazır bir
 * metni puanlamıyor) ve uzun bir turda kırk saniyeye kadar sürebiliyor.
 * Sayı web `lib/api-fetch` ile AYNI ADLA duruyor: webde bu çağrı genel
 * tavana (25 sn) düşüyordu, yani aynı cevap mobilde geliyor webde
 * kesiliyordu.
 */
export const ROLEPLAY_TIMEOUT_MS = 45_000;

export type ApiInit = RequestInit & {
  timeoutMs?: number;
  /** İç bayrak: rıza onayından sonraki TEK yeniden deneme (döngü olmasın). */
  consentRetry?: boolean;
};

/**
 * YAPAY ZEKÂ RIZASI — kırk çağrı yerine tek yakalayıcı.
 *
 * Sunucu, metni ya da sesi yapay zekâ sağlayıcısına göndermeden önce izni
 * kendisi okuyor ve izin yoksa isteği sağlayıcıya hiç iletmeden
 * `403 { error: "ai_consent_required", purpose, state }` döndürüyor (web
 * `lib/ai-consent`). İstemcinin işi o anda izin ekranını açmak: onay gelirse
 * aynı istek BİR KEZ yeniden gidiyor, gelmezse `AI_CONSENT_DECLINED` atılıyor
 * ve çağrı yerlerinin zaten var olan yedeği (senaryolu konuşma, kural tabanlı
 * puan) devralıyor.
 *
 * Ekranı açan kod burada değil (`lib/aiConsent` + `ui/AiConsentSheet`); o
 * modül bu dosyayı içe aktardığı için ters yönde bir kayıt kancası kuruldu,
 * yoksa döngüsel içe aktarma olurdu.
 */
export const AI_CONSENT_REQUIRED = "ai_consent_required";
export const AI_CONSENT_DECLINED = "ai_consent_declined";

export type AiConsentPrompt = { purpose: "ai_text" | "ai_voice"; state: "unset" | "declined" | "outdated" };
type ConsentHandler = (req: AiConsentPrompt) => Promise<boolean>;
let consentHandler: ConsentHandler | null = null;

export function setAiConsentHandler(h: ConsentHandler | null): void {
  consentHandler = h;
}

/** 403 gövdesi bir rıza isteği mi — değilse null. */
function consentPromptOf(status: number, body: unknown): AiConsentPrompt | null {
  if (status !== 403 || typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (b.error !== AI_CONSENT_REQUIRED || (b.purpose !== "ai_text" && b.purpose !== "ai_voice")) return null;
  const state = b.state === "declined" || b.state === "outdated" ? b.state : "unset";
  return { purpose: b.purpose, state };
}

/**
 * Ekran açılacak mı, açılırsa onay geldi mi. "declined" ekranı KENDİLİĞİNDEN
 * açtırmaz: hayır diyene her çağrıda yeniden sormak rızayı yıpratarak koparmak
 * olurdu; kapalı amaç Ayarlar'dan açılıyor.
 */
async function askConsent(req: AiConsentPrompt): Promise<boolean> {
  if (req.state === "declined" || !consentHandler) return false;
  try { return await consentHandler(req); } catch { return false; }
}

/**
 * Zaman aşımlı ham `fetch` — `api()`yi KULLANAMAYAN çağrılar için.
 *
 * Altı çağrı yeri paylaşılan istemciyi atlıyor ve her birinin sebebi var:
 * rol yapma metin döndürüyor (`api()` JSON çözüyor), ilerleme POST'ları
 * yanıtı hiç okumuyor, oturum/hesap uçları ham yanıtla çalışıyor. Hepsinin
 * ORTAK eksiği zaman aşımıydı: sunucu yanıt vermezse istek işletim sistemi
 * vazgeçene kadar duruyordu.
 *
 * Yanıtı olduğu gibi döndürüyor - çağıranın kendi çözümlemesi bozulmasın.
 * Kesilirse `ApiError(0, "timeout")`.
 */
export async function fetchWithTimeout(url: string, init?: ApiInit): Promise<Response> {
  const ms = init?.timeoutMs ?? API_TIMEOUT_MS;
  const ctl = ms > 0 ? new AbortController() : null;
  const timer = ctl ? setTimeout(() => ctl.abort(), ms) : null;
  let res: Response;
  try {
    /* Başlık yalnız BİZİM sunucumuza: ham `fetch` başka adreslere de gidebiliyor. */
    const own = url.startsWith(API_BASE);
    const headers = own ? { "x-lernomi-client": CLIENT_HEADER_VALUE, ...((init?.headers as Record<string, string>) ?? {}) } : init?.headers;
    res = await fetch(url, { ...init, headers, signal: ctl?.signal as RequestInit["signal"] });
  } catch (e) {
    if (timer && (e as Error)?.name === "AbortError") throw new ApiError(0, "timeout");
    throw e;
  } finally {
    if (timer) clearTimeout(timer);
  }
  /* Rıza isteği: gövde küçük bir JSON, kopyasından okunuyor ki çağıran asıl
     yanıtı yine kendisi çözebilsin. */
  if (res.status === 403 && !init?.consentRetry) {
    const prompt = consentPromptOf(403, await res.clone().json().catch(() => null));
    if (prompt) {
      if (await askConsent(prompt)) return fetchWithTimeout(url, { ...init, consentRetry: true });
      throw new ApiError(403, AI_CONSENT_DECLINED);
    }
  }
  return res;
}

export async function api<T = unknown>(path: string, init?: ApiInit): Promise<T> {
  const ms = init?.timeoutMs ?? API_TIMEOUT_MS;
  const ctl = ms > 0 ? new AbortController() : null;
  const timer = ctl ? setTimeout(() => ctl.abort(), ms) : null;
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      /* RN'in `AbortSignal` tipi DOM'unkiyle birebir değil; dönüşüm burada.
         Çağıranın kendi `signal`ını taşımıyoruz çünkü hiçbir çağrı yeri
         vermiyor (ölçüldü: sıfır) - gerekirse o zaman eklenir. */
      signal: ctl?.signal as RequestInit["signal"],
      headers: {
        accept: "application/json",
        /*
          ORIGIN ELLE EKLENIYOR. Tarayıcı bu başlığı kendisi koyar; React
          Native koymaz. Better Auth'un CSRF kontrolü ise ÇEREZ TAŞIYAN her
          POST'ta onu şart koşuyor ve yoksa isteği MISSING_OR_NULL_ORIGIN ile
          reddediyor (api/middlewares/origin-check). Cihazda görüldü
          2026-09-10: parola değiştirme ekranda "Missing or null Origin"
          diyordu.

          Güvenliği ZAYIFLATMIYOR: kontrolün amacı BAŞKA bir sitenin
          tarayıcıdaki çerezle bize istek attırmasını engellemek. Native
          uygulama tarayıcı değil ve zaten istediği başlığı koyabilir; burada
          yapılan, kendi kökenimizi kendi istemcimizden doğru bildirmek.
          `API_BASE` uygulamaya gömülü ve `trustedOrigins` listesinde.
        */
        origin: API_BASE,
        "x-lernomi-client": CLIENT_HEADER_VALUE,
        ...(init?.body ? { "content-type": "application/json" } : {}),
        ...(init?.headers ?? {}),
      },
    });
  } catch (e) {
    /* Tek iptal sebebi bizim zaman aşımımız (çağıran `signal` vermiyor). */
    if (timer && (e as Error)?.name === "AbortError") throw new ApiError(0, "timeout");
    throw e;
  } finally {
    if (timer) clearTimeout(timer);
  }
  const text = await res.text().catch(() => "");
  if (!res.ok) {
    let msg = text.slice(0, 200);
    let parsed: unknown = null;
    try { parsed = JSON.parse(text); const j = parsed as { error?: string; message?: string }; msg = j.error ?? j.message ?? msg; } catch { /* düz metin */ }
    const prompt = init?.consentRetry ? null : consentPromptOf(res.status, parsed);
    if (prompt) {
      if (await askConsent(prompt)) return api<T>(path, { ...init, consentRetry: true });
      throw new ApiError(403, AI_CONSENT_DECLINED);
    }
    throw new ApiError(res.status, msg || `api ${res.status}`);
  }
  return (text ? JSON.parse(text) : null) as T;
}
