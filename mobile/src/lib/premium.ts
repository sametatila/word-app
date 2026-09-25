import { track } from "./track";
import { useCallback, useEffect, useState } from "react";
import { api } from "../api/client";

/**
 * PREMIUM DURUMU — SUNUCUDAN. Mağaza SDK'sından değil.
 *
 * Uygulama "premium miyim" sorusunu RevenueCat'e sormuyor; `/api/premium/status`
 * uçuna soruyor. İki sebep var ve ikisi de zorunlu:
 *
 *  1. SAĞLAYICI BAĞIMSIZLIĞI. Mağaza SDK'sına sorulsaydı sağlayıcıyı değiştirmek
 *     uygulamanın her ekranını dolaşmak demek olurdu. Bugün RevenueCat yalnız
 *     SATIN ALMA arayüzü; yetkinin kaynağı sunucudaki defter.
 *  2. İŞLEVSELLİK. Promo kodu, referans ödülü ve elle verilen premium mağazada
 *     YOK. Sağlayıcıya sorulsaydı hediye alan kullanıcı uygulamada ücretsiz
 *     görünürdü — kilit açılmaz, kullanıcı ödediğini/kazandığını göremezdi.
 *
 * Durum süreç içinde tek yerde tutuluyor ve abone ekranlar birlikte tazeleniyor:
 * satın alma bitince ya da kod bozdurulunca tek `refreshPremium()` yeter.
 */

export type Quota = { allowed: boolean; used: number; limit: number; remaining: number; period: "day" | "week" | "all" };

/*
 * KİLİT AÇMA GÖRÜNÜMÜ — sunucu `lib/premium/unlock` + `access.unlockOverview`
 * aynası. Hesap SUNUCUDA; mobil yalnız çiziyor (cümle seçimi `lib/unlock`).
 */
export type UnlockNext = {
  gain: number;
  complete: { done: number; needed: number };
  streak: { current: number; needed: number; met: boolean };
  days: number;
};
export type FreeUnlock = { premium: false; open: number; used: number; done: number; remaining: number; tier: number; next: UnlockNext | null };
export type TieredUnlock = FreeUnlock | { premium: true };
export type PremiumMockUnlock = { premium: true; open: number; done: number; packSize: number; next: { complete: { done: number; needed: number } } | null };
export type MockUnlock = FreeUnlock | PremiumMockUnlock;
export type WalkUnlock = { premium: boolean; perDay: number; used: number; remaining: number; pocket: boolean };
export type LevelUnlock = { conversation: TieredUnlock; pathWriting: TieredUnlock; skillSpeaking: TieredUnlock; skillWriting: TieredUnlock; mock: MockUnlock | null };
export type UnlockOverview = {
  streak: { current: number; longest: number; step: number };
  walk: WalkUnlock;
  levels: Record<string, LevelUnlock>;
  owned: { conversation: string[]; pathWriting: string[]; skills: string[] };
  chatTurnsPerDay: number;
};
export type GateInfo = { allowed: boolean; reason: string; gate: string; quota?: Quota } | null;

export type PremiumStatus = {
  premium: boolean;
  until: string | null;
  source: "store" | "bonus" | null;
  store: { state: string | null; platform: string | null; product: string | null; canceled: boolean } | null;
  /** Kazanılmış ama henüz başlamamış hediye gün — "aboneliğin bitince başlayacak". */
  bonusDaysPending: number;
  limits: {
    free: Record<string, number>;
    /* `pocketWalksPerDay` eski sunucunun adı (sunucu takma ad olarak da gönderiyor). */
    fairUse: { walkRoundsPerDay?: number; aiPracticePerDay: number; chatTurnsPerDay?: number; pocketWalksPerDay?: number };
    mock: { packSize: number };
  };
  plans: { productMonthly: string; productYearly: string; trialDays: number; prices: { region: string; currency: string; monthly: string; yearly: string; yearlySavePct: number }[] };
  /** Paywall satırları: çeviri anahtarı + parametre (cümle sunucuda kurulmuyor). */
  copy: { free: { key: string; params?: Record<string, string | number> }[]; premium: { key: string; params?: Record<string, string | number> }[] };
  /* Ödül alanları kalktı (2026-09-17): davetin karşılığı premium süresi değil,
     arkadaşlık bağı (bkz. sunucu `lib/premium/referral`). */
  referral: { code: string; invited: number } | null;
  /** Misafirin kalan yapay zekâ deneme hakkı (sunucu lib/auth/guest); hesapta null, eski sunucuda yok. */
  guestAiLeft?: number | null;
  gates: { pocket_walk: GateInfo; speaking: GateInfo; writing: GateInfo } | null;
  /** Kilit açma görünümü — eski sunucuda yok, misafir olmayan oturumsuz hâlde null. */
  unlock?: UnlockOverview | null;
};

let cached: PremiumStatus | null = null;
let inflight: Promise<PremiumStatus | null> | null = null;
const listeners = new Set<(s: PremiumStatus | null) => void>();

function publish(s: PremiumStatus | null): void {
  cached = s;
  listeners.forEach((fn) => {
    try { fn(s); } catch { /* bir dinleyicinin hatası ötekini düşürmesin */ }
  });
}

/**
 * Durumu sunucudan çeker. Aynı anda gelen çağrılar TEK isteğe biniyor:
 * uygulama açılışında dört ekran birden soruyor ve dördü ayrı istek atarsa
 * hem gecikme hem gereksiz yük olur.
 */
/* Seviye parametresi YOK: sunucu bütün seviyelerin kilit açma durumunu tek
   çağrıda döndürüyor (`unlock.levels`), Patika seviye değiştirdikçe ayrı istek yok. */
export async function refreshPremium(): Promise<PremiumStatus | null> {
  if (inflight) return inflight;
  inflight = api<PremiumStatus>("/api/premium/status")
    .then((s) => { publish(s); return s; })
    .catch(() => {
      // Ağ yok / uç erişilemez: SON BİLİNEN durumu koru. Sıfırlamak, çevrimdışı
      // kalan ödeme yapmış kullanıcıyı kendi ürününden ederdi.
      return cached;
    })
    .finally(() => { inflight = null; });
  return inflight;
}

/** Durum değişince haber alır (kök bileşenler için; ekranlar `usePremiumStatus`). Aboneliği bırakan fonksiyon döner. */
export function subscribePremium(fn: (s: PremiumStatus | null) => void): () => void {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

/** Son bilinen durum — senkron okuma (kapı kontrolleri için). */
export function premiumSnapshot(): PremiumStatus | null {
  return cached;
}

/** Oturum kapanınca çağrılır: bir sonraki kullanıcı öncekinin yetkisini görmesin. */
export function clearPremium(): void {
  publish(null);
}

/** Tam durum — paywall, profil ve kilit ekranları bunu kullanır. */
export function usePremiumStatus(): {
  status: PremiumStatus | null;
  loading: boolean;
  refresh: () => Promise<void>;
} {
  const [status, setStatus] = useState<PremiumStatus | null>(cached);
  const [loading, setLoading] = useState(cached === null);

  useEffect(() => {
    listeners.add(setStatus);
    let alive = true;
    void refreshPremium().finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; listeners.delete(setStatus); };
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    await refreshPremium();
    setLoading(false);
  }, []);

  return { status, loading, refresh };
}

/**
 * Satın alma sonrası bekleme.
 *
 * Mağaza satın almayı onayladıktan sonra yetki bize SAĞLAYICI WEBHOOK'uyla
 * geliyor ve arada saniyeler olabiliyor. Kullanıcı o aralıkta hâlâ kilitli bir
 * ekran görürse satın almanın tutmadığını sanar. Bu yüzden birkaç kez, artan
 * aralıklarla soruluyor.
 *
 * Yetki yine gelmezse ekran kilitli kalır ama satın alma KAYBOLMAZ: webhook
 * geciken bir teslimatla sonradan düşüyor ve uygulama bir sonraki açılışta
 * premium görüyor.
 */
export async function awaitPremiumAfterPurchase(tries = 6): Promise<boolean> {
  for (let i = 0; i < tries; i++) {
    const s = await refreshPremium();
    if (s?.premium) return true;
    await new Promise((r) => setTimeout(r, 800 + i * 700));
  }
  return false;
}

/**
 * Sunucu bir PREMIUM KAPISI yüzünden mi reddetti?
 *
 * `/api/stt` ve `/api/assess` ücretsiz katmanın hakkı bittiğinde 403 +
 * `premium_required` döndürüyor. Bu bir hata değil bir kapı, ve çağıranın onu
 * ağ hatasından ayırması gerekiyor: "bir şey bozuldu" demek kullanıcıyı yanlış
 * yere bakmaya gönderiyor, üstelik uydurma bir yedek puan vermek kapıyı
 * görünmez kılıyor.
 */
/**
 * Premium kilide takılan an — huni ölçümünün eksik halkası.
 *
 * `premium_gate` olayı iki platformun da kayıt defterinde YAZILIYDI ve
 * gerekçesi de duruyordu ("paywall'ı hangi kısıt besliyor, oradan görülür")
 * ama HİÇBİRİ göndermiyordu: paywall'ı görenler sayılıyor, oraya iten kilit
 * sayılmıyordu. Tür adları sunucunun kendi sözlüğünden (`lib/premium/gates`
 * `PremiumGate`): mock_exam · pocket_walk · walk · conversation · speaking · writing.
 */
export function notePremiumGate(gate: "mock_exam" | "pocket_walk" | "walk" | "conversation" | "speaking" | "writing"): void {
  track("premium_gate", 0, gate);
}

export function isPremiumRefusal(e: unknown): boolean {
  const err = e as { status?: number; message?: string } | null;
  return err?.status === 403 && err?.message === "premium_required";
}

/**
 * Adil kullanım hakkı doldu mu (429 `quota`).
 *
 * Premium kapısından AYRI: kapı "bu senin katmanında yok" der, bu ise "var
 * ama bugünlük bitti". İkisi de bir KAPI, ikisi de ağ hatası DEĞİL - ve
 * ikisinde de uydurma bir yedek puan vermek kapıyı görünmez kılar.
 */
export function isQuotaRefusal(e: unknown): boolean {
  const err = e as { status?: number; message?: string } | null;
  return err?.status === 429 || err?.message === "quota";
}
