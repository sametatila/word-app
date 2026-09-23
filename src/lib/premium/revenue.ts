import "server-only";
import { sql } from "drizzle-orm";
import { queryRunner, type QueryIssue } from "@/lib/admin-query";
import { premiumConfig } from "./config";

/**
 * GELİR METRİKLERİ — panelin "Gelir" bölümü.
 *
 * İki kaynak, bilerek:
 *   1. KENDİ DEFTERİMİZ (`store_events` + `entitlements`): her zaman var,
 *      platform/ürün kırılımı, deneme dönüşümü, iptal, iade, ödeme sorunu.
 *      Tutarlar sağlayıcının bildirdiği USD karşılığı; mağaza komisyonu ve
 *      vergi DÜŞÜLMEMİŞ (brüt).
 *   2. REVENUECAT GENEL BAKIŞI (v2 API, `REVENUECAT_API_KEY` +
 *      `REVENUECAT_PROJECT_ID`): MRR ve 28 günlük gelirin sağlayıcıdaki
 *      resmi hâli. Anahtar yoksa bölüm yalnız defterle çalışıyor.
 * İkisi farklı sayı gösterebilir (dönem sınırı, komisyon, sandbox); panel
 * ikisini yan yana ve kaynağıyla yazıyor, birini ötekinin yerine koymuyor.
 */

export type Revenue = {
  webhookConfigured: boolean;
  window: {
    grossUsd: number; refundsUsd: number; netUsd: number;
    trialsStarted: number; newPaid: number; trialConversions: number; renewals: number;
    cancellations: number; refunds: number; billingIssues: number; expirations: number;
  };
  now: { activePaid: number; activeTrials: number; willNotRenew: number; inGrace: number; mrrUsd: number };
  byPlatform: { platform: string; grossUsd: number; payments: number; active: number }[];
  byProduct: { product: string; grossUsd: number; payments: number }[];
  /** Aralığın GÜN GÜN hâli — boş günler dahil (grafik boşluğu sıfır olarak görsün). */
  daily: { day: string; grossUsd: number; newPaid: number; trials: number; cancellations: number }[];
  revenuecat: { mrrUsd: number | null; revenue28dUsd: number | null; activeSubscriptions: number | null; activeTrials: number | null; newCustomers28d: number | null } | { error: string } | null;
  issues: QueryIssue[];
};

let rcCache: { at: number; value: Revenue["revenuecat"] } | null = null;

async function revenueCatOverview(): Promise<Revenue["revenuecat"]> {
  const key = process.env.REVENUECAT_API_KEY;
  const project = process.env.REVENUECAT_PROJECT_ID;
  if (!key || !project) return null;
  if (rcCache && Date.now() - rcCache.at < 10 * 60_000) return rcCache.value;
  let value: Revenue["revenuecat"];
  try {
    const res = await fetch(`https://api.revenuecat.com/v2/projects/${encodeURIComponent(project)}/metrics/overview`, {
      headers: { authorization: `Bearer ${key}`, accept: "application/json" },
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) {
      value = { error: `RevenueCat API HTTP ${res.status}` };
    } else {
      const body = (await res.json()) as { metrics?: { id?: string; value?: number }[] };
      const m = new Map((body.metrics ?? []).map((x) => [x.id ?? "", typeof x.value === "number" ? x.value : null]));
      value = {
        mrrUsd: m.get("mrr") ?? null,
        revenue28dUsd: m.get("revenue") ?? null,
        activeSubscriptions: m.get("active_subscriptions") ?? null,
        activeTrials: m.get("active_trials") ?? null,
        newCustomers28d: m.get("new_customers") ?? null,
      };
    }
  } catch (err) {
    value = { error: `RevenueCat API: ${(err as Error).name}` };
  }
  rcCache = { at: Date.now(), value };
  return value;
}

export async function revenueMetrics(days = 30): Promise<Revenue> {
  const { rows, issues } = queryRunner("gelir");
  const cfg = await premiumConfig();
  const yearly = cfg.plans.productYearly;
  const since = sql`now() - make_interval(days => ${days})`;
  const PAID_TYPES = sql`('purchase', 'renewal', 'product_change', 'one_time')`;

  const [w, now, plat, prod, rc, daily] = await Promise.all([
    rows(sql`
      select
        coalesce(sum(price_usd) filter (where type in ${PAID_TYPES} and coalesce(period_type, '') <> 'trial'), 0)::float gross,
        coalesce(sum(price_usd) filter (where type = 'refund'), 0)::float refunds_usd,
        count(*) filter (where type = 'purchase' and period_type = 'trial')::int trials,
        count(*) filter (where type = 'purchase' and coalesce(period_type, 'normal') in ('normal', 'intro'))::int new_paid,
        count(*) filter (where period_type = 'trial_conversion')::int conversions,
        count(*) filter (where type = 'renewal' and coalesce(period_type, '') <> 'trial_conversion')::int renewals,
        count(*) filter (where type = 'cancellation')::int cancellations,
        count(*) filter (where type = 'refund')::int refunds,
        count(*) filter (where type = 'billing_issue')::int billing,
        count(*) filter (where type = 'expiration')::int expirations
      from store_events
      where coalesce(environment, 'production') = 'production' and coalesce(event_at, created_at) >= ${since}`),
    rows(sql`
      select
        count(*) filter (where store_until > now() and store_state in ('active', 'canceled', 'grace'))::int active_paid,
        count(*) filter (where store_until > now() and store_state = 'trial')::int active_trials,
        count(*) filter (where store_until > now() and store_state = 'canceled')::int will_not_renew,
        count(*) filter (where store_until > now() and store_state = 'grace')::int in_grace,
        coalesce(sum(
          case when e.store_until > now() and e.store_state in ('active', 'grace') then
            (select s.price_usd / case when e.store_product = ${yearly} then 12 else 1 end
               from store_events s
              where s.user_id = e.user_id and s.type in ${PAID_TYPES} and s.price_usd > 0
              order by coalesce(s.event_at, s.created_at) desc limit 1)
          end), 0)::float mrr
      from entitlements e
      -- Sandbox satırları yetki alıyor (IAP-1) ama abone değil: TestFlight ve
      -- Play iç test aboneliği sayılsaydı "aktif ücretli" ve MRR şişerdi.
      where coalesce(e.store_environment, 'production') = 'production'`),
    rows(sql`
      select coalesce(s.platform, '?') platform,
        coalesce(sum(s.price_usd) filter (where s.type in ${PAID_TYPES} and coalesce(s.period_type, '') <> 'trial' and coalesce(s.event_at, s.created_at) >= ${since}), 0)::float gross,
        count(*) filter (where s.type in ${PAID_TYPES} and coalesce(s.period_type, '') <> 'trial' and coalesce(s.event_at, s.created_at) >= ${since})::int payments,
        (select count(*) from entitlements e where e.store_platform = s.platform and e.store_until > now() and e.store_state in ('active', 'canceled', 'grace')
          and coalesce(e.store_environment, 'production') = 'production')::int active
      from store_events s where coalesce(s.environment, 'production') = 'production'
      group by s.platform order by 2 desc`),
    rows(sql`
      select coalesce(product, '?') product,
        coalesce(sum(price_usd), 0)::float gross, count(*)::int payments
      from store_events
      where coalesce(environment, 'production') = 'production' and type in ${PAID_TYPES}
        and coalesce(period_type, '') <> 'trial' and coalesce(event_at, created_at) >= ${since}
      group by 1 order by 2 desc`),
    revenueCatOverview(),
    rows(sql`
      select to_char(g.day, 'YYYY-MM-DD') as day,
        coalesce(sum(s.price_usd) filter (where s.type in ${PAID_TYPES} and coalesce(s.period_type, '') <> 'trial'), 0)::float gross,
        count(s.*) filter (where s.type = 'purchase' and coalesce(s.period_type, 'normal') in ('normal', 'intro'))::int new_paid,
        count(s.*) filter (where s.type = 'purchase' and s.period_type = 'trial')::int trials,
        count(s.*) filter (where s.type = 'cancellation')::int cancellations
      from generate_series(current_date - ${days - 1}::int, current_date, interval '1 day') g(day)
      left join store_events s on coalesce(s.environment, 'production') = 'production'
        and coalesce(s.event_at, s.created_at)::date = g.day::date
      group by g.day order by g.day`),
  ]);

  const x = w[0] ?? {};
  const n = now[0] ?? {};
  const f = (v: unknown) => Math.round((Number(v) || 0) * 100) / 100;
  const i = (v: unknown) => Number(v) || 0;
  return {
    webhookConfigured: Boolean(process.env.REVENUECAT_WEBHOOK_AUTH),
    window: {
      grossUsd: f(x.gross), refundsUsd: f(x.refunds_usd), netUsd: f(i(x.gross) - i(x.refunds_usd)),
      trialsStarted: i(x.trials), newPaid: i(x.new_paid), trialConversions: i(x.conversions), renewals: i(x.renewals),
      cancellations: i(x.cancellations), refunds: i(x.refunds), billingIssues: i(x.billing), expirations: i(x.expirations),
    },
    now: { activePaid: i(n.active_paid), activeTrials: i(n.active_trials), willNotRenew: i(n.will_not_renew), inGrace: i(n.in_grace), mrrUsd: f(n.mrr) },
    byPlatform: plat.map((r) => ({ platform: String(r.platform), grossUsd: f(r.gross), payments: i(r.payments), active: i(r.active) })),
    daily: daily.map((r) => ({ day: String(r.day), grossUsd: f(r.gross), newPaid: i(r.new_paid), trials: i(r.trials), cancellations: i(r.cancellations) })),
    byProduct: prod.map((r) => ({ product: String(r.product), grossUsd: f(r.gross), payments: i(r.payments) })),
    revenuecat: rc,
    issues,
  };
}
