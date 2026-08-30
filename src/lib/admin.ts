import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { getUserEmail } from "@/lib/auth/server";
import { computeFunnel, type Funnel } from "@/lib/funnel";

/**
 * Admin panosu veri katmanı (exfe.me/admin). Sahibin sistemi yönetmesi + tüm
 * istatistik/telemetriyi en ince detayına kadar görmesi için. Erişim yalnız
 * ADMIN_EMAILS ortam değişkenindeki e-postalara açık (virgülle ayrılmış).
 */
const ADMINS = (process.env.ADMIN_EMAILS ?? "")
  .split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);

export function adminAllowlistEmpty(): boolean {
  return ADMINS.length === 0;
}

export async function isAdmin(): Promise<boolean> {
  const email = (await getUserEmail())?.toLowerCase();
  return !!email && ADMINS.includes(email);
}

type Row = Record<string, unknown>;
async function rows(q: ReturnType<typeof sql>): Promise<Row[]> {
  try {
    const r = (await db.execute(q)) as unknown;
    if (Array.isArray(r)) return r as Row[];
    return ((r as { rows?: Row[] }).rows ?? []) as Row[];
  } catch (err) {
    console.error("[admin] sorgu hatası", err);
    return [];
  }
}
const num = (v: unknown) => Number(v) || 0;
const str = (v: unknown) => (v == null ? "" : String(v));

export type AdminData = {
  kpi: {
    totalUsers: number; new1d: number; new7d: number; new30d: number;
    dau: number; wau: number; mau: number; streakUsers: number;
    totalXp: number; totalReviews: number; accuracy: number; avgStreak: number;
    reviews1d: number; seconds30d: number;
  };
  trend: { day: string; active: number; reviews: number; xp: number; newWords: number }[];
  levels: { level: string; count: number }[];
  courses: { course: string; count: number }[];
  funnel: Funnel;
  events30: { name: string; count: number; users: number }[];
  recentEvents: { day: string; name: string; kind: string; value: number; userId: string }[];
  hardWords: { de: string; tr: string; niveau: string; lapses: number; leeches: number }[];
  errors: { type: string; count: number }[];
  games: { game: string; count: number; accuracy: number }[];
  users: {
    userId: string; name: string; level: string; course: string; streak: number;
    longest: number; xp: number; words: number; lastActive: string; joined: string;
  }[];
  generatedAt: string;
};

export async function getAdminData(): Promise<AdminData> {
  const [kpiRows, trend, levels, courses, funnel, events30, recent, hard, errors, games, users] = await Promise.all([
    rows(sql`
      select
        (select count(*) from profiles)::int as total_users,
        (select count(*) from profiles where created_at >= now() - interval '1 day')::int as new1d,
        (select count(*) from profiles where created_at >= now() - interval '7 days')::int as new7d,
        (select count(*) from profiles where created_at >= now() - interval '30 days')::int as new30d,
        (select count(distinct user_id) from daily_stats where day >= current_date)::int as dau,
        (select count(distinct user_id) from daily_stats where day >= current_date - 6)::int as wau,
        (select count(distinct user_id) from daily_stats where day >= current_date - 29)::int as mau,
        (select count(*) from profiles where current_streak > 0)::int as streak_users,
        (select coalesce(sum(total_xp),0) from profiles)::bigint as total_xp,
        (select count(*) from reviews)::bigint as total_reviews,
        (select coalesce(sum(correct),0)::float / nullif(sum(reviews),0) from daily_stats) as accuracy,
        (select coalesce(avg(current_streak),0) from profiles where current_streak > 0) as avg_streak,
        (select coalesce(sum(reviews),0) from daily_stats where day >= current_date)::int as reviews1d,
        (select coalesce(sum(seconds),0) from daily_stats where day >= current_date - 29)::bigint as seconds30d
    `),
    rows(sql`
      select to_char(day,'YYYY-MM-DD') as day,
             count(distinct user_id)::int as active,
             sum(reviews)::int as reviews, sum(xp)::int as xp, sum(new_words)::int as new_words
      from daily_stats where day >= current_date - 29 group by day order by day
    `),
    rows(sql`select level, count(*)::int as count from profiles group by level order by level`),
    rows(sql`select course, count(*)::int as count from profiles group by course order by count desc`),
    computeFunnel(),
    rows(sql`
      select name, count(*)::int as count, count(distinct user_id)::int as users
      from events where day >= current_date - 29 group by name order by count desc
    `),
    rows(sql`
      select to_char(day,'YYYY-MM-DD') as day, name, coalesce(kind,'') as kind, value, user_id
      from events order by id desc limit 40
    `),
    rows(sql`
      select w.de, w.tr, w.niveau,
             sum(uw.lapses)::int as lapses,
             count(*) filter (where uw.leech)::int as leeches
      from user_words uw join words w on w.id = uw.word_id
      group by w.de, w.tr, w.niveau having sum(uw.lapses) > 0
      order by sum(uw.lapses) desc limit 15
    `),
    rows(sql`select coalesce(error_type,'—') as type, count(*)::int as count from reviews where error_type is not null group by error_type order by count desc limit 12`),
    rows(sql`
      select game, count(*)::int as count,
             coalesce(avg(case when correct then 1.0 else 0.0 end),0) as accuracy
      from reviews group by game order by count desc limit 12
    `),
    rows(sql`
      select p.user_id, coalesce(p.display_name,'') as name, p.level, p.course,
             p.current_streak as streak, p.longest_streak as longest, p.total_xp as xp,
             coalesce(w.cnt,0)::int as words,
             coalesce(to_char(p.last_active_day,'YYYY-MM-DD'),'') as last_active,
             to_char(p.created_at,'YYYY-MM-DD') as joined
      from profiles p
      left join (select user_id, count(*) as cnt from user_words where state > 0 group by user_id) w on w.user_id = p.user_id
      order by p.last_active_day desc nulls last, p.total_xp desc
      limit 500
    `),
  ]);

  const k = kpiRows[0] ?? {};
  return {
    kpi: {
      totalUsers: num(k.total_users), new1d: num(k.new1d), new7d: num(k.new7d), new30d: num(k.new30d),
      dau: num(k.dau), wau: num(k.wau), mau: num(k.mau), streakUsers: num(k.streak_users),
      totalXp: num(k.total_xp), totalReviews: num(k.total_reviews), accuracy: num(k.accuracy),
      avgStreak: num(k.avg_streak), reviews1d: num(k.reviews1d), seconds30d: num(k.seconds30d),
    },
    trend: trend.map((r) => ({ day: str(r.day), active: num(r.active), reviews: num(r.reviews), xp: num(r.xp), newWords: num(r.new_words) })),
    levels: levels.map((r) => ({ level: str(r.level), count: num(r.count) })),
    courses: courses.map((r) => ({ course: str(r.course), count: num(r.count) })),
    funnel,
    events30: events30.map((r) => ({ name: str(r.name), count: num(r.count), users: num(r.users) })),
    recentEvents: recent.map((r) => ({ day: str(r.day), name: str(r.name), kind: str(r.kind), value: num(r.value), userId: str(r.user_id) })),
    hardWords: hard.map((r) => ({ de: str(r.de), tr: str(r.tr), niveau: str(r.niveau), lapses: num(r.lapses), leeches: num(r.leeches) })),
    errors: errors.map((r) => ({ type: str(r.type), count: num(r.count) })),
    games: games.map((r) => ({ game: str(r.game), count: num(r.count), accuracy: num(r.accuracy) })),
    users: users.map((r) => ({
      userId: str(r.user_id), name: str(r.name), level: str(r.level), course: str(r.course),
      streak: num(r.streak), longest: num(r.longest), xp: num(r.xp), words: num(r.words),
      lastActive: str(r.last_active), joined: str(r.joined),
    })),
    generatedAt: new Date().toISOString(),
  };
}
