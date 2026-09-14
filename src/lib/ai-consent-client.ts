"use client";

import { apiFetch, setAiConsentHandler, AI_CONSENT_DECLINED } from "@/lib/api-fetch";
import type { NativeLang } from "@/lib/i18n/dict";
import { aiConsentShouldPrompt, type AiConsentPurpose, type AiConsentStatus } from "@/lib/ai-consent-shared";

/**
 * Yapay zekâ işleme rızası — İSTEMCİNİN payı: durumu okumak, kararı yazmak ve
 * istenince izin ekranını açtırmak. Neden ve kurallar `lib/ai-consent-shared`in
 * başında; mobil karşılığı `M/src/lib/aiConsent.ts` ve adlar orada da aynı.
 *
 * Kapı bu dosyada değil, uçta: izin yoksa sunucu metni ya da sesi sağlayıcıya
 * hiç iletmiyor. Bu dosyanın bozulması izinsiz bir gönderime yol açmaz, en
 * fazla gereksiz bir "hayır"a.
 */

export type { AiConsentPurpose, AiConsentState, AiConsentStatus } from "@/lib/ai-consent-shared";

/** Alıcı satırı — sunucu gizlilik politikasının tablosundan, istenen dilde üretiyor. */
export type AiConsentProcessor = { name: string; purpose: string; region: string; safeguard: string };

export type AiConsentInfo = {
  statuses: Record<AiConsentPurpose, AiConsentStatus>;
  processors: Record<AiConsentPurpose, AiConsentProcessor[]>;
  /** Politikanın o dildeki yolu. */
  privacyPath: string;
};

/**
 * Durum + alıcı listesi, ARAYÜZ dilinde.
 *
 * Dil parametre olarak geliyor, modülden okunmuyor: webde arayüz dili bir
 * React bağlamı (`useLang`) ve aynı süreç aynı anda üç dilde çizebiliyor
 * (bkz. `lib/i18n/client`). Mobil `currentLang()` okuyor; orada tek kullanıcı var.
 */
export async function fetchAiConsent(lang: NativeLang): Promise<AiConsentInfo> {
  const res = await apiFetch(`/api/consent?lang=${lang}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`consent ${res.status}`);
  return (await res.json()) as AiConsentInfo;
}

const listeners = new Set<() => void>();

/**
 * Bir karar yazılınca haber verir; dönen işlev aboneliği bırakır.
 *
 * Karar dört ayrı yerden yazılabiliyor (izin diyaloğu, Ayarlar'daki anahtar,
 * mikrofon onayının geri alınması, yürüyüş açıklaması) ve Ayarlar'daki
 * anahtarlar hepsinden sonra sunucudaki durumu göstermeli. Abonelik bir
 * tarayıcı olayı değil: aynı sekmedeki modüller arasında kalıyor.
 */
export function onAiConsentChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Kararı yazar; sunucu yürürlükteki sürümü kendisi kaydediyor. */
export async function decideAiConsent(purpose: AiConsentPurpose, granted: boolean): Promise<AiConsentStatus> {
  const res = await apiFetch("/api/consent", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ purpose, granted, platform: "web" }),
  });
  if (!res.ok) throw new Error(`consent ${res.status}`);
  const { status } = (await res.json()) as { status: AiConsentStatus };
  for (const fn of listeners) fn();
  return status;
}

/**
 * Yanıt, yapay zekâya izin verilmediği için vazgeçilen bir çağrı mı? Çağıranlar
 * yedeğe düşer ve "servis kapalı" DEMEZ. Gövde kopyadan okunuyor; çağıran
 * yanıtı yine kendisi çözebilir.
 */
export async function isAiConsentDeclined(res: Response): Promise<boolean> {
  if (res.status !== 403) return false;
  const body = (await res.clone().json().catch(() => null)) as { error?: unknown } | null;
  return body?.error === AI_CONSENT_DECLINED;
}

/* ── ekranı açtırmak ──────────────────────────────────────────────────────── */

type Opener = (purpose: AiConsentPurpose) => Promise<boolean>;
let opener: Opener | null = null;
const pending = new Map<AiConsentPurpose, Promise<boolean>>();
/** Ekranlar SIRAYLA açılıyor: biri açıkken gelen öteki amaç onun bitmesini bekliyor. */
let queue: Promise<unknown> = Promise.resolve();

/**
 * Ekranın sahibi uygulama kabuğundaki `AiConsentHost`. Bağlı değilse (kabuğun
 * dışındaki bir sayfa) istek sessizce "hayır" döner: izin ekranı
 * gösterilemiyorsa izin de alınmış sayılmaz.
 */
export function registerAiConsentHost(fn: Opener | null): void {
  opener = fn;
}

/**
 * İzin ekranını açar; onay gelirse true.
 *
 * Aynı amaç için aynı anda gelen iki istek (iki paralel değerlendirme) TEK
 * ekran görür ve aynı cevabı alır. İki FARKLI amaç sıraya giriyor: açık olan
 * soru, öteki geldi diye cevapsız kapatılmıyor. Mobil o durumda açık olanı
 * kaydetmeden "hayır" sayıyor ve o isteği yedeğe düşürüyor — kullanıcı hayır
 * demeden.
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
 * Süreli bir bölüm BAŞLAMADAN izni sorar.
 *
 * Yakalayıcı izni ilk yapay zekâ çağrısında soruyor ve çoğu ekranda doğru an
 * o. Süreli sınavda değil: diyalog görevin ortasında açılınca kullanıcı
 * sağlayıcı listesini okurken sınav süresi akıyordu. Burada yalnız henüz
 * sorulmamış ya da alıcı listesi değişmiş amaçlar soruluyor; "hayır" demiş
 * kullanıcıya diyalog yine kendiliğinden açılmıyor. Durum okunamazsa sessizce
 * geçiliyor — izin çağrı anında yakalayıcıda yine sorulur.
 */
export async function askAiConsentUpfront(lang: NativeLang, purposes: readonly AiConsentPurpose[]): Promise<void> {
  if (!purposes.length) return;
  try {
    const info = await fetchAiConsent(lang);
    for (const purpose of purposes) {
      if (aiConsentShouldPrompt(info.statuses[purpose].state)) await requestAiConsent(purpose);
    }
  } catch {
    /* okunamadı: çağrı anında sorulur */
  }
}

/* API yakalayıcısı buraya bağlanıyor (bkz. `lib/api-fetch`). */
setAiConsentHandler((req) => requestAiConsent(req.purpose));
