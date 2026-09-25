import { Platform } from "react-native";
import { api, ApiError, AI_CONSENT_DECLINED, setAiConsentHandler, type AiConsentPrompt } from "../api/client";
import { currentLang } from "./i18n";

/**
 * Yapay zekâ işleme rızası — web `lib/ai-consent-shared` + `lib/ai-consent-client`
 * karşılığı; adlar ve kurallar aynı.
 *
 * NEDEN. Yazdığın ve söylediğin metin dil modeli sağlayıcılarına, ekran kapalı
 * yürüyüşteki ses konuşma tanıma sağlayıcılarına gidiyor. App Store 5.1.2(i)
 * ve Play Kullanıcı Verileri politikası bunun için, adları sayılmış alıcılara
 * gönderimden ÖNCE açık izin istiyor. Rıza SUNUCUDA tutuluyor ve uçlar izin
 * yoksa isteği sağlayıcıya iletmiyor; bu dosya yalnız istemcinin payı:
 * durumu okumak, kararı yazmak ve istenince ekranı açtırmak.
 *
 *   ai_text   metin → dil modeli (değerlendirme, sohbet, sınav geri bildirimi)
 *   ai_voice  ses → konuşma tanıma (ekran kapalı yürüyüş)
 */

export const AI_CONSENT_PURPOSES = ["ai_text", "ai_voice"] as const;
export type AiConsentPurpose = (typeof AI_CONSENT_PURPOSES)[number];
export type AiConsentState = "granted" | "unset" | "declined" | "outdated";

export type AiConsentStatus = {
  purpose: AiConsentPurpose;
  state: AiConsentState;
  version: number | null;
  current: number;
  decidedAt: string | null;
};

/** Alıcı satırı — sunucu gizlilik politikasının tablosundan, kullanıcının dilinde üretiyor. */
export type AiConsentProcessor = { name: string; purpose: string; region: string; safeguard: string };

export type AiConsentInfo = {
  statuses: Record<AiConsentPurpose, AiConsentStatus>;
  processors: Record<AiConsentPurpose, AiConsentProcessor[]>;
};

/** Durum + alıcı listesi, arayüz dilinde. */
export function fetchAiConsent(): Promise<AiConsentInfo> {
  return api<AiConsentInfo>(`/api/consent?lang=${currentLang()}`);
}

/** Kararı yazar; sunucu yürürlükteki sürümü kendisi kaydediyor. */
export async function decideAiConsent(purpose: AiConsentPurpose, granted: boolean): Promise<AiConsentStatus> {
  const r = await api<{ status: AiConsentStatus }>("/api/consent", {
    method: "POST",
    body: JSON.stringify({ purpose, granted, platform: Platform.OS === "ios" ? "ios" : "android" }),
  });
  return r.status;
}

/** Yapay zekâya izin verilmediği için vazgeçilen çağrı mı? Çağıranlar yedeğe düşer. */
export function isAiConsentDeclined(e: unknown): boolean {
  return e instanceof ApiError && e.status === 403 && e.message === AI_CONSENT_DECLINED;
}

/* ── ekranı açtırmak ──────────────────────────────────────────────────────── */

type Opener = (purpose: AiConsentPurpose) => Promise<boolean>;
let opener: Opener | null = null;
const pending = new Map<AiConsentPurpose, Promise<boolean>>();
/** Ekranlar SIRAYLA açılıyor: biri açıkken gelen öteki amaç onun bitmesini bekliyor. */
let queue: Promise<unknown> = Promise.resolve();

/**
 * Ekranın sahibi kökteki `AiConsentHost`. Bağlı değilse (duman testi, giriş
 * öncesi) istek sessizce "hayır" döner: izin ekranı gösterilemiyorsa izin de
 * alınmış sayılmaz.
 */
export function registerAiConsentHost(fn: Opener | null): void {
  opener = fn;
}

/**
 * İzin ekranını açar; onay gelirse true.
 *
 * Aynı amaç için aynı anda gelen iki istek (iki paralel değerlendirme) TEK
 * ekran görür ve aynı cevabı alır. İki FARKLI amaç sıraya giriyor: açık olan
 * soru, öteki geldi diye cevapsız kapatılmıyor — kullanıcı "hayır" demeden
 * bir isteği yedeğe düşürmek olurdu (web `lib/ai-consent-client` ile aynı).
 */
export function requestAiConsent(purpose: AiConsentPurpose): Promise<boolean> {
  if (!opener) return Promise.resolve(false);
  const open = pending.get(purpose);
  if (open) return open;
  const p = queue
    .then(() => (opener ? opener(purpose) : false))
    .catch(() => false)
    .finally(() => pending.delete(purpose));
  queue = p;
  pending.set(purpose, p);
  return p;
}

/**
 * Süreli bir bölüm BAŞLAMADAN izni sorar — web `askAiConsentUpfront` ile aynı.
 *
 * Yakalayıcı izni ilk yapay zekâ çağrısında soruyor ve çoğu ekranda doğru an
 * o. Süreli sınavda değil: ekran görevin ortasında açılınca kullanıcı
 * sağlayıcı listesini okurken sınav süresi akıyordu. Yalnız henüz sorulmamış
 * ya da alıcı listesi değişmiş amaçlar soruluyor; "hayır" demiş kullanıcıya
 * ekran kendiliğinden açılmıyor. Durum okunamazsa sessizce geçiliyor — izin
 * çağrı anında yakalayıcıda yine sorulur.
 */
export async function askAiConsentUpfront(purposes: readonly AiConsentPurpose[]): Promise<void> {
  if (!purposes.length) return;
  try {
    const info = await fetchAiConsent();
    for (const purpose of purposes) {
      const state = info.statuses[purpose].state;
      if (state === "unset" || state === "outdated") await requestAiConsent(purpose);
    }
  } catch {
    /* okunamadı: çağrı anında sorulur */
  }
}

/* API istemcisinin yakalayıcısı buraya bağlanıyor (bkz. `api/client`). */
setAiConsentHandler((req: AiConsentPrompt) => requestAiConsent(req.purpose));
