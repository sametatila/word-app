import "server-only";
import { timingSafeEqual } from "node:crypto";
import type { StoreAdapter, StoreEvent, StoreLedger, StoreLedgerType, StoreState, WebhookResult } from "../ports";

/**
 * RevenueCat adaptörü — sağlayıcının kelime dağarcığının BİTTİĞİ yer.
 *
 * Dışarıya yalnız `StoreEvent` çıkıyor; "entitlement_ids", "period_type",
 * "PLAY_STORE" gibi RevenueCat'e özgü hiçbir kavram bu dosyanın dışına
 * sızmıyor. Sağlayıcıdan ayrılmak, bunun yanına ikinci bir dosya koymak demek.
 *
 * Olay sözlüğü: https://www.revenuecat.com/docs/webhooks
 */

type RcEvent = {
  id?: string;
  type?: string;
  app_user_id?: string;
  original_app_user_id?: string;
  product_id?: string;
  /** TRIAL | INTRO | NORMAL | PROMOTIONAL */
  period_type?: string;
  expiration_at_ms?: number;
  grace_period_expiration_at_ms?: number;
  /** APP_STORE | MAC_APP_STORE | PLAY_STORE | AMAZON | STRIPE | PROMOTIONAL */
  store?: string;
  /** SANDBOX | PRODUCTION */
  environment?: string;
  cancel_reason?: string;
  original_transaction_id?: string;
  transaction_id?: string;
  entitlement_ids?: string[];
  /** Yalnız TRANSFER olayında: aboneliğin ayrıldığı ve geçtiği kimlikler. */
  transferred_from?: string[];
  transferred_to?: string[];
  /** Gelir defteri alanları (https://www.revenuecat.com/docs/webhooks). */
  price?: number;
  currency?: string;
  price_in_purchased_currency?: number;
  event_timestamp_ms?: number;
  is_trial_conversion?: boolean;
};

const LEDGER_TYPE: Record<string, StoreLedgerType> = {
  INITIAL_PURCHASE: "purchase",
  RENEWAL: "renewal",
  PRODUCT_CHANGE: "product_change",
  CANCELLATION: "cancellation",
  UNCANCELLATION: "uncancellation",
  EXPIRATION: "expiration",
  REFUND: "refund",
  BILLING_ISSUE: "billing_issue",
  SUBSCRIPTION_PAUSED: "paused",
  NON_RENEWING_PURCHASE: "one_time",
};

/** RevenueCat olayının mali ayrıntısı → sağlayıcıdan bağımsız defter satırı. */
function ledgerOf(ev: RcEvent, type: string): StoreLedger {
  const period = ev.period_type === "TRIAL" ? "trial" : ev.period_type === "INTRO" ? "intro" : ev.period_type === "PROMOTIONAL" ? "promo" : ev.period_type === "NORMAL" ? "normal" : null;
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);
  return {
    type: LEDGER_TYPE[type] ?? "other",
    period,
    environment: ev.environment === "SANDBOX" ? "sandbox" : ev.environment === "PRODUCTION" ? "production" : null,
    // RevenueCat iadeyi negatif fiyatla bildirebiliyor; defterde tutar pozitif, tür "refund".
    priceUsd: num(ev.price) == null ? null : Math.abs(num(ev.price) as number),
    currency: typeof ev.currency === "string" ? ev.currency.slice(0, 8) : null,
    priceLocal: num(ev.price_in_purchased_currency) == null ? null : Math.abs(num(ev.price_in_purchased_currency) as number),
    eventAt: num(ev.event_timestamp_ms) ? new Date(ev.event_timestamp_ms as number) : null,
    trialConversion: ev.is_trial_conversion === true,
  };
}

/**
 * Olay türü → bizim durumumuz.
 *
 * `CANCELLATION` bilerek `canceled`: RevenueCat'te bu "otomatik yenileme
 * kapatıldı" demek, "erişim bitti" demek DEĞİL. Yetki süresi dolana dek sürer
 * ve `STATE_GRANTS` bunu böyle sayıyor. İkisini karıştırmak, parasını ödemiş
 * kullanıcıyı ay ortasında kapı dışarı etmek olurdu.
 *
 * `BILLING_ISSUE` → `grace`: mağaza kartı yeniden deniyor, erişim sürüyor.
 */
const STATE_BY_TYPE: Record<string, StoreState> = {
  INITIAL_PURCHASE: "active",
  RENEWAL: "active",
  PRODUCT_CHANGE: "active",
  UNCANCELLATION: "active",
  NON_RENEWING_PURCHASE: "active",
  SUBSCRIPTION_EXTENDED: "active",
  CANCELLATION: "canceled",
  BILLING_ISSUE: "grace",
  SUBSCRIPTION_PAUSED: "paused",
  EXPIRATION: "expired",
  REFUND: "refunded",
};

/** Yetkiye hiç dokunmayan olaylar — sessizce kabul edilir. */
const IGNORED = new Set(["TEST", "SUBSCRIBER_ALIAS", "INVOICE_ISSUANCE", "TEMPORARY_ENTITLEMENT_GRANT"]);

function platformOf(store: string | undefined): StoreEvent["platform"] {
  switch (store) {
    case "APP_STORE":
    case "MAC_APP_STORE":
      return "ios";
    case "PLAY_STORE":
    case "AMAZON":
      return "android";
    case "STRIPE":
      return "web";
    default:
      return null;
  }
}

/** Sabit zamanlı karşılaştırma — sır uzunluğu bile sızmasın. */
function secretOk(given: string, want: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(want);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const revenuecat: StoreAdapter = {
  name: "revenuecat",

  configured: () => Boolean(process.env.REVENUECAT_WEBHOOK_AUTH),

  async parse(req: Request, raw: string): Promise<WebhookResult> {
    const secret = process.env.REVENUECAT_WEBHOOK_AUTH;
    if (!secret) return { ok: false, status: 503, reason: "not_configured" };

    // RevenueCat panelde yazdığın değeri Authorization başlığına AYNEN koyuyor.
    // "Bearer " öneki de kabul ediliyor çünkü panele öyle yazmak yaygın bir
    // alışkanlık ve aradaki farkı hata mesajından anlamak imkânsız.
    const header = req.headers.get("authorization") ?? "";
    const given = header.startsWith("Bearer ") ? header.slice(7) : header;
    if (!secretOk(given, secret)) return { ok: false, status: 401, reason: "unauthorized" };

    let body: { event?: RcEvent };
    try {
      body = JSON.parse(raw) as { event?: RcEvent };
    } catch {
      return { ok: false, status: 400, reason: "bad_json" };
    }

    const ev = body.event;
    const type = ev?.type;
    const userId = ev?.app_user_id;
    if (!ev || !type) return { ok: false, status: 400, reason: "bad_event" };

    // SANDBOX olayları üretim yetkisi ÜRETMEZ. RevenueCat test satın almalarını
    // aynı webhook'a yolluyor; ayrılmazsa geliştirici cihazındaki bir deneme
    // gerçek bir aboneliğe dönüşür. Bilerek açmak için ortam değişkeni var.
    if (ev.environment === "SANDBOX" && process.env.REVENUECAT_ALLOW_SANDBOX !== "1") {
      return { ok: false, status: 400, reason: "sandbox_ignored" };
    }

    if (IGNORED.has(type)) return { ok: false, status: 400, reason: "ignored_type" };

    /*
      TRANSFER YETKİYİ TAŞIR. Önceden yok sayılıyordu: başka bir uygulama
      hesabında "geri yükle" denince RevenueCat aboneliği yeni kimliğe
      geçiriyor, biz eski hesabı premium bırakıyorduk; yeni hesap da ilk
      yenilemede premium oluyordu. Tek satın alım iki hesaba yayılıyordu
      (güvenlik denetimi 2026-09-14, bilgi maddesi: app_user_id güveni).
      Olayda `app_user_id` yok; kimlikler iki dizide geliyor.
    */
    if (type === "TRANSFER") {
      const from = (ev.transferred_from ?? []).filter((x) => typeof x === "string" && x);
      const to = (ev.transferred_to ?? []).filter((x) => typeof x === "string" && x);
      if (!from.length || to.length !== 1) return { ok: false, status: 400, reason: "bad_transfer" };
      if (!ev.id) return { ok: false, status: 400, reason: "no_event_id" };
      return { ok: true, transfer: { provider: "revenuecat", eventId: ev.id, from, to: to[0] } };
    }

    const state = STATE_BY_TYPE[type];
    if (!state) return { ok: false, status: 400, reason: `unknown_type:${type}` };
    if (!userId) return { ok: false, status: 400, reason: "no_user" };

    // İade, `CANCELLATION` içinde de gelebiliyor (eski olay sözlüğü): sebebi
    // müşteri desteğiyse erişim DERHAL biter, süre sonunu beklemez.
    const refunded = type === "REFUND" || ev.cancel_reason === "CUSTOMER_SUPPORT";

    // Ödeme gerçekten alındı mı. TRIAL = deneme (para yok), PROMOTIONAL =
    // RevenueCat panelinden elle verilmiş hediye. Referans ödülünün tetiği
    // yalnız gerçek para: NORMAL ya da indirimli giriş teklifi (INTRO).
    const paidPeriod = ev.period_type === "NORMAL" || ev.period_type === "INTRO";

    const expires = ev.grace_period_expiration_at_ms ?? ev.expiration_at_ms;

    const out: StoreEvent = {
      provider: "revenuecat",
      // Olay kimliği yoksa işlem kimliğine düşülüyor: tekrar teslimat elemesi
      // bir anahtar olmadan çalışmaz ve o eleme referans ödülünün de koruması.
      eventId: ev.id ?? ev.transaction_id ?? `${type}:${userId}:${expires ?? 0}`,
      userId,
      state: refunded ? "refunded" : state,
      expiresAt: expires ? new Date(expires) : null,
      platform: platformOf(ev.store),
      productId: ev.product_id ?? null,
      ref: ev.original_transaction_id ?? null,
      paid: !refunded && paidPeriod && state === "active",
      ledger: ledgerOf(ev, type),
    };
    return { ok: true, event: out };
  },
};
