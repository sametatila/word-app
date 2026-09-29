import "server-only";
import { sql } from "drizzle-orm";
import { queryRunner, type QueryIssue } from "@/lib/admin-query";

/**
 * GENEL DURUM — "işler nasıl gidiyor" sorusunun verisi (`/admin/durum`).
 *
 * Her sayı SEÇİLİ ARALIKTA (7 / 30 / 90 gün, bugün hariç tam günler) ve aynı
 * uzunluktaki ÖNCEKİ dönemle yan yana. Eski sayfa sabit 7 günlük bir satır ve
 * tüm zamanlar toplamlarıydı: aralık seçici çoğu sayıyı değiştirmiyordu,
 * eğilim tek grafikteydi.
 *
 *   günlük dizi   önceki + şimdiki dönem, gün gün (grafikler iki dönemi üst üste çiziyor)
 *   özet          aktif kişi, kayıt, aktivasyon, haftalık tutma, kişi başı çalışma, gelir
 *   kohort        son 8 haftanın kayıt kohortları, hafta hafta aktif kalan payı
 *   yüzeyler      öğrenme yüzeyini kullanan kişi (tur, konuşma, yürüyüş, sınav …)
 *   kırılım       aralıkta aktif kişi: dil çifti, seviye
 *
 * "Aktif" = o gün `daily_stats` satırı olan (çalışmış) kişi; uygulamayı açıp
 * çalışmayan sayılmıyor. Gelir tanımı `lib/premium/revenue` ile aynı (brüt,
 * deneme ve sandbox hariç).
 */
export type OverviewDay = { day: string; active: number; signups: number; guestSignups: number; reviews: number; minutes: number; sessions: number; grossUsd: number; errors: number };
export type Period = { active: number; avgDau: number; signups: number; activation: number | null; retention: number | null; minutesPerActive: number; grossUsd: number; reviews: number; sessions: number };
export type Cohort = { week: string; size: number; cells: (number | null)[] };
export type Surface = { key: string; label: string; users: number; prevUsers: number; count: number };
export type Overview = {
  days: number;
  /** 2 × `days` gün: ilk yarı önceki dönem, ikinci yarı şimdiki. */
  daily: OverviewDay[];
  current: Period;
  previous: Period;
  cohorts: Cohort[];
  surfaces: Surface[];
  pairs: { key: string; users: number }[];
  levels: { key: string; users: number }[];
  issues: QueryIssue[];
};

const SURFACES: [string, string][] = [
  ["session_start", "Tekrar turu"],
  ["conversation_start", "Patika konuşması"],
  ["walk_start", "Yürüyüş"],
  ["production_attempt", "Üretim görevi"],
  ["exam_start", "Sınav"],
  ["boss_play", "Modül sınavı"],
  ["challenge_play", "Hayatta kalma"],
];
const PAID = sql.raw(`('purchase', 'renewal', 'product_change', 'one_time')`);
const n = (v: unknown) => Number(v) || 0;

export async function overview(days: number): Promise<Overview> {
  const { rows, issues } = queryRunner("genel durum");
  const N = days;
  const [daily, cur, prev, cohorts, surfaces, pairs, levels] = await Promise.all([
    rows(sql`
      with g as (select generate_series(current_date - ${2 * N}::int, current_date - 1, interval '1 day')::date d),
      ds as (select day, count(distinct user_id)::int active, sum(reviews)::int reviews, (sum(seconds) / 60)::int minutes
             from daily_stats where day >= current_date - ${2 * N}::int and day < current_date group by day),
      su as (select "createdAt"::date d, count(*)::int n, count(*) filter (where coalesce("isAnonymous", false))::int guests
             from "user" where "createdAt" >= current_date - ${2 * N}::int and "createdAt" < current_date group by 1),
      ev as (select day, count(*) filter (where name = 'session_done')::int sessions, count(*) filter (where name = 'client_error')::int errors
             from events where day >= current_date - ${2 * N}::int and day < current_date and name in ('session_done', 'client_error') group by day),
      rv as (select coalesce(event_at, created_at)::date d, sum(price_usd)::float gross from store_events
             where type in ${PAID} and coalesce(period_type, '') <> 'trial' and coalesce(environment, 'production') = 'production'
               and coalesce(event_at, created_at) >= current_date - ${2 * N}::int and coalesce(event_at, created_at) < current_date group by 1)
      select g.d::text as day, coalesce(ds.active, 0) active, coalesce(su.n, 0) signups, coalesce(su.guests, 0) guests,
        coalesce(ds.reviews, 0) reviews, coalesce(ds.minutes, 0) minutes, coalesce(ev.sessions, 0) sessions,
        coalesce(rv.gross, 0) gross, coalesce(ev.errors, 0) errors
      from g left join ds on ds.day = g.d left join su on su.d = g.d left join ev on ev.day = g.d left join rv on rv.d = g.d
      order by g.d`),
    period(rows, N, 0),
    period(rows, N, N),
    rows(sql`
      with c as (select user_id, date_trunc('week', created_at)::date wk from profiles
                 where created_at >= date_trunc('week', current_date) - interval '7 weeks'),
      a as (select c.wk, c.user_id, ((d.day - c.wk) / 7)::int k from c join daily_stats d on d.user_id = c.user_id and d.day >= c.wk group by 1, 2, 3)
      select c.wk::text week, count(distinct c.user_id)::int size,
        (select coalesce(json_object_agg(k, m), '{}'::json) from (select k, count(distinct user_id)::int m from a where a.wk = c.wk and k between 0 and 7 group by k) x) cells
      from c group by c.wk order by c.wk`),
    rows(sql`
      select name, count(distinct user_id) filter (where day >= current_date - ${N}::int)::int users,
        count(distinct user_id) filter (where day < current_date - ${N}::int)::int prev_users,
        count(*) filter (where day >= current_date - ${N}::int)::int cnt
      from events where day >= current_date - ${2 * N}::int and day < current_date
        and name in (${sql.join(SURFACES.map(([k]) => sql`${k}`), sql`, `)})
      group by name`),
    rows(sql`
      select coalesce(p.native_lang, 'tr') || ' → ' || p.course k, count(distinct d.user_id)::int users
      from daily_stats d join profiles p on p.user_id = d.user_id
      where d.day >= current_date - ${N}::int and d.day < current_date group by 1 order by 2 desc`),
    rows(sql`
      select p.level k, count(distinct d.user_id)::int users
      from daily_stats d join profiles p on p.user_id = d.user_id
      where d.day >= current_date - ${N}::int and d.day < current_date group by 1 order by 1`),
  ]);

  const today = new Date();
  const weekMs = 7 * 86_400_000;
  return {
    days: N,
    daily: daily.map((r) => ({
      day: String(r.day), active: n(r.active), signups: n(r.signups), guestSignups: n(r.guests), reviews: n(r.reviews),
      minutes: n(r.minutes), sessions: n(r.sessions), grossUsd: Math.round(n(r.gross) * 100) / 100, errors: n(r.errors),
    })),
    current: cur,
    previous: prev,
    cohorts: cohorts.map((r) => {
      const cells = (r.cells ?? {}) as Record<string, number>;
      const size = n(r.size);
      const start = Date.parse(`${String(r.week)}T00:00:00`);
      /* Henüz gelmemiş hafta null (0 değil): "kimse kalmadı" ile "daha erken" ayrı. */
      return { week: String(r.week), size, cells: Array.from({ length: 8 }, (_, k) => (start + k * weekMs > today.getTime() ? null : size ? Math.round((n(cells[k]) / size) * 100) : 0)) };
    }),
    surfaces: SURFACES.map(([key, label]) => {
      const r = surfaces.find((x) => x.name === key);
      return { key, label, users: n(r?.users), prevUsers: n(r?.prev_users), count: n(r?.cnt) };
    }),
    pairs: pairs.map((r) => ({ key: String(r.k), users: n(r.users) })),
    levels: levels.map((r) => ({ key: String(r.k), users: n(r.users) })),
    issues,
  };
}

/**
 * Bir dönemin özeti; `shift` gün kadar geriye kaydırılmış. Aralık
 * [current_date - shift - N, current_date - shift).
 */
async function period(rows: ReturnType<typeof queryRunner>["rows"], N: number, shift: number): Promise<Period> {
  const [r] = await rows(sql`
    with w as (select current_date - ${shift + N}::int a, current_date - ${shift}::int b),
    act as (select distinct d.user_id from daily_stats d, w where d.day >= w.a and d.day < w.b),
    sg as (select u.id, u."createdAt"::date c from "user" u, w where u."createdAt" >= w.a and u."createdAt" < w.b)
    select
      (select count(*) from act)::int active,
      (select coalesce(avg(x.n), 0) from (select count(distinct user_id) n from daily_stats d, w where d.day >= w.a and d.day < w.b group by d.day) x)::float avg_dau,
      (select count(*) from sg)::int signups,
      (select count(*) from sg where exists (select 1 from daily_stats d, w where d.user_id = sg.id and d.day >= sg.c and d.day < w.b))::int activated,
      (select count(*) from (select distinct user_id from daily_stats d, w where d.day >= w.b - 14 and d.day < w.b - 7) p)::int ret_base,
      (select count(*) from (select distinct user_id from daily_stats d, w where d.day >= w.b - 14 and d.day < w.b - 7
                              intersect select distinct user_id from daily_stats d, w where d.day >= w.b - 7 and d.day < w.b) q)::int ret_kept,
      (select coalesce(sum(seconds), 0) / 60 from daily_stats d, w where d.day >= w.a and d.day < w.b)::int minutes,
      (select coalesce(sum(reviews), 0) from daily_stats d, w where d.day >= w.a and d.day < w.b)::int reviews,
      (select count(*) from events e, w where e.name = 'session_done' and e.day >= w.a and e.day < w.b)::int sessions,
      (select coalesce(sum(price_usd), 0) from store_events s, w where s.type in ${PAID} and coalesce(s.period_type, '') <> 'trial'
         and coalesce(s.environment, 'production') = 'production' and coalesce(s.event_at, s.created_at) >= w.a and coalesce(s.event_at, s.created_at) < w.b)::float gross`);
  const active = n(r?.active);
  const signups = n(r?.signups);
  const base = n(r?.ret_base);
  return {
    active,
    avgDau: Math.round(n(r?.avg_dau) * 10) / 10,
    signups,
    activation: signups ? Math.round((n(r?.activated) / signups) * 100) : null,
    retention: base ? Math.round((n(r?.ret_kept) / base) * 100) : null,
    minutesPerActive: active ? Math.round((n(r?.minutes) / active) * 10) / 10 : 0,
    grossUsd: Math.round(n(r?.gross) * 100) / 100,
    reviews: n(r?.reviews),
    sessions: n(r?.sessions),
  };
}
