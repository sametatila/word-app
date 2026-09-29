import "server-only";
import { sql } from "drizzle-orm";
import { queryRunner, type QueryIssue } from "@/lib/admin-query";
import { real } from "@/lib/test-lab";
import type { TrendMetric } from "@/lib/admin-trends-shared";

export type { TrendMetric } from "@/lib/admin-trends-shared";

/**
 * HAFTALIK KARŞILAŞTIRMA — "kötüleşiyor mu" sorusunun cevabı.
 *
 * Panonun sayıları sabit 30 günlük pencerelerdi: bir oranın düştüğü ancak
 * iki ekran görüntüsü karşılaştırılarak görülüyordu. Burada her gösterge
 * son 7 gün (bugün hariç, tam günler) ile ondan önceki 7 gün yan yana.
 *
 * `good`: artışın iyi mi kötü mü olduğu (hatalar için "down"). Küçük sayıda
 * yüzde yanıltıcı olduğu için görünüm tabanı 20'nin altındaysa yüzdeyi değil
 * farkı yazıyor.
 */


export async function weeklyTrends(): Promise<{ metrics: TrendMetric[]; issues: QueryIssue[] }> {
  const { rows, issues } = queryRunner("haftalık");
  // İki pencere: [bugün-7, bugün) ve [bugün-14, bugün-7). Bugün yarım gün, dışarıda.
  const [r] = await rows(sql`
    with w as (select current_date - 7 as a, current_date as b, current_date - 14 as pa, current_date - 7 as pb)
    select
      (select count(distinct user_id) from ${real("daily_stats")}, w where day >= w.a and day < w.b)::int active_c,
      (select count(distinct user_id) from ${real("daily_stats")}, w where day >= w.pa and day < w.pb)::int active_p,
      (select count(*) from ${real("profiles")}, w where created_at >= w.a and created_at < w.b)::int signup_c,
      (select count(*) from ${real("profiles")}, w where created_at >= w.pa and created_at < w.pb)::int signup_p,
      (select coalesce(sum(n), 0) from reviews_daily, w where day >= w.a and day < w.b)::int reviews_c,
      (select coalesce(sum(n), 0) from reviews_daily, w where day >= w.pa and day < w.pb)::int reviews_p,
      (select coalesce(sum(seconds), 0) / 60 from ${real("daily_stats")}, w where day >= w.a and day < w.b)::int minutes_c,
      (select coalesce(sum(seconds), 0) / 60 from ${real("daily_stats")}, w where day >= w.pa and day < w.pb)::int minutes_p,
      (select count(*) filter (where name = 'session_done') * 100 / nullif(count(*) filter (where name = 'session_start'), 0) from ${real("events")}, w where name in ('session_start', 'session_done') and day >= w.a and day < w.b)::int completion_c,
      (select count(*) filter (where name = 'session_done') * 100 / nullif(count(*) filter (where name = 'session_start'), 0) from ${real("events")}, w where name in ('session_start', 'session_done') and day >= w.pa and day < w.pb)::int completion_p,
      (select count(*) from ${real("events")}, w where name = 'conversation_finish' and day >= w.a and day < w.b)::int conversations_c,
      (select count(*) from ${real("events")}, w where name = 'conversation_finish' and day >= w.pa and day < w.pb)::int conversations_p,
      (select count(*) from store_events, w where type in ('purchase', 'renewal') and coalesce(period_type, '') <> 'trial' and coalesce(environment, 'production') = 'production' and coalesce(event_at, created_at) >= w.a and coalesce(event_at, created_at) < w.b)::int paid_c,
      (select count(*) from store_events, w where type in ('purchase', 'renewal') and coalesce(period_type, '') <> 'trial' and coalesce(environment, 'production') = 'production' and coalesce(event_at, created_at) >= w.pa and coalesce(event_at, created_at) < w.pb)::int paid_p,
      (select count(*) from ${real("events")}, w where name = 'client_error' and day >= w.a and day < w.b)::int errors_c,
      (select count(*) from ${real("events")}, w where name = 'client_error' and day >= w.pa and day < w.pb)::int errors_p`);
  const n = (k: string) => Number(r?.[k]) || 0;
  return {
    issues,
    metrics: [
      { key: "active", label: "Aktif kullanıcı", current: n("active_c"), previous: n("active_p"), good: "up" },
      { key: "signup", label: "Yeni kayıt", current: n("signup_c"), previous: n("signup_p"), good: "up" },
      { key: "reviews", label: "Cevap", current: n("reviews_c"), previous: n("reviews_p"), good: "up" },
      { key: "minutes", label: "Çalışma", current: n("minutes_c"), previous: n("minutes_p"), good: "up", unit: "min" },
      { key: "completion", label: "Tur tamamlama", current: n("completion_c"), previous: n("completion_p"), good: "up", unit: "pct" },
      { key: "conversations", label: "Biten konuşma", current: n("conversations_c"), previous: n("conversations_p"), good: "up" },
      { key: "paid", label: "Ödeme", current: n("paid_c"), previous: n("paid_p"), good: "up" },
      { key: "errors", label: "İstemci hatası", current: n("errors_c"), previous: n("errors_p"), good: "down" },
    ],
  };
}

export type PulseDay = { day: string; active: number; signup: number; grossUsd: number; errors: number };

/**
 * GÖSTERGE ŞERİDİNİN GÜNLÜK DİZİSİ — panelin her sayfasında, menünün altındaki
 * dört küçük grafik (aktif, kayıt, gelir, hata).
 *
 * Pencere `weeklyTrends` ile aynı: bugün hariç son 14 tam gün, ilk yedisi
 * "önceki hafta", son yedisi "bu hafta". Böylece şeritteki eğri ile yanındaki
 * haftalık sayı aynı günleri anlatıyor. Aktif kullanıcı GÜNLÜK tekil sayı
 * (haftalık tekil sayı `weeklyTrends`te); gelir brüt USD, deneme hariç,
 * sandbox hariç (`lib/premium/revenue` ile aynı tanım).
 */
export async function dailyPulse(): Promise<{ days: PulseDay[]; issues: QueryIssue[] }> {
  const { rows, issues } = queryRunner("gösterge şeridi");
  const r = await rows(sql`
    select g.day::date::text as day,
      (select count(distinct user_id) from ${real("daily_stats", "d")} where d.day = g.day::date)::int active,
      (select count(*) from ${real("profiles", "p")} where p.created_at >= g.day and p.created_at < g.day + interval '1 day')::int signup,
      (select coalesce(sum(s.price_usd), 0) from store_events s
        where s.type in ('purchase', 'renewal', 'product_change', 'one_time') and coalesce(s.period_type, '') <> 'trial'
          and coalesce(s.environment, 'production') = 'production'
          and coalesce(s.event_at, s.created_at) >= g.day and coalesce(s.event_at, s.created_at) < g.day + interval '1 day')::float gross,
      (select count(*) from ${real("events", "e")} where e.name = 'client_error' and e.day = g.day::date)::int errors
    from generate_series(current_date - 14, current_date - 1, interval '1 day') g(day)
    order by g.day`);
  const n = (v: unknown) => Number(v) || 0;
  return {
    issues,
    days: r.map((x) => ({ day: String(x.day), active: n(x.active), signup: n(x.signup), grossUsd: Math.round(n(x.gross) * 100) / 100, errors: n(x.errors) })),
  };
}
