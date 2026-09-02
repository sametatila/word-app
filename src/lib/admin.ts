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
// Yetki listesi yalnız ADMIN_EMAILS'ten okunur; koda gömülü varsayılan yok.
// Repo herkese açık: koddaki bir e-posta hem hedef gösterir hem de sunucudaki
// .env'den bağımsız, geri alınamaz bir yetki olurdu. Liste boşsa kimse admin
// değildir (kapalı varsayılan).
const ADMINS = Array.from(new Set(
  (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean),
));

/** Admin kapısı — hem yetki hem de tanılama için giriş e-postasını da döndürür. */
export async function adminGate(): Promise<{ ok: boolean; email: string | null }> {
  const email = (await getUserEmail()) ?? null;
  return { ok: !!email && ADMINS.includes(email.toLowerCase()), email };
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
  // — UX / platform / öğrenme kalitesi / ops (WP-admin genişletme) —
  platform: { key: string; count: number; users: number }[];
  screens: { screen: string; views: number; avgSec: number }[];
  sessionFunnel: { startCard: number; started: number; done: number; stopped: number };
  onboarding: { step: string; users: number }[];
  walk: { reason: number; count: number }[];
  production: { task: string; count: number; avgScore: number }[];
  clientErrors: { screen: string; count: number }[];
  premium: { views: number; gates: number; starts: number; done: number };
  premiumGates: { feature: string; count: number }[];
  notifications: { optinYes: number; optinNo: number; sent: number; opened: number };
  ai: { provider: string; calls: number; okPct: number; avgMs: number; errors: number; tokens: number }[];
  /** İçerik bildirimleri (yapay zekâ yanıtı / değerlendirme): açık olanlar, en yeni önce. */
  reports: { id: number; day: string; kind: string; ref: string; reason: string; content: string; userId: string }[];
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

  const reports = await rows(sql`
    select id, to_char(created_at,'YYYY-MM-DD') as day, kind, ref, reason, coalesce(content,'') as content, user_id
    from content_reports where status = 'open' order by id desc limit 50
  `).catch(() => [] as Record<string, unknown>[]);

  const [platform, screens, sess, onb, walk, production, clientErrors, prem, premGates, notif, ai] = await Promise.all([
    rows(sql`select coalesce(kind,'?') k, count(*)::int c, count(distinct user_id)::int u from events where name='app_open' and day >= current_date - 29 group by kind order by c desc`),
    rows(sql`select coalesce(kind,'?') screen, count(*) filter (where name='page_view')::int views, coalesce(avg(value) filter (where name='time_spent'),0)::int avg_sec from events where name in ('page_view','time_spent') and day >= current_date - 29 group by kind order by views desc limit 20`),
    rows(sql`select count(*) filter (where name='start_card')::int start_card, count(*) filter (where name='session_start')::int started, count(*) filter (where name='session_done')::int done, count(*) filter (where name='session_stop')::int stopped from events where day >= current_date - 29`),
    rows(sql`select coalesce(kind,'?') step, count(distinct user_id)::int users from events where name='onboarding_step' and day >= current_date - 29 group by kind`),
    rows(sql`select value reason, count(*)::int c from events where name='walk_end' and day >= current_date - 29 group by value order by value`),
    rows(sql`select coalesce(kind,'?') task, count(*)::int c, coalesce(avg(value),0)::int avg_score from events where name='production_attempt' and day >= current_date - 29 group by kind order by c desc`),
    rows(sql`select coalesce(kind,'?') screen, count(*)::int c from events where name='client_error' and day >= current_date - 29 group by kind order by c desc limit 12`),
    rows(sql`select count(*) filter (where name='paywall_view')::int views, count(*) filter (where name='premium_gate')::int gates, count(*) filter (where name='purchase_start')::int starts, count(*) filter (where name='purchase_done')::int done from events where day >= current_date - 29`),
    rows(sql`select coalesce(kind,'?') feature, count(*)::int c from events where name='premium_gate' and day >= current_date - 29 group by kind order by c desc limit 8`),
    rows(sql`select count(*) filter (where name='push_optin' and value=1)::int optin_yes, count(*) filter (where name='push_optin' and value=0)::int optin_no, count(*) filter (where name='push_sent')::int sent, count(*) filter (where name='push_open')::int opened from events where day >= current_date - 29`),
    rows(sql`select provider, count(*)::int calls, round(avg(case when ok then 1.0 else 0.0 end)*100,1) ok_pct, coalesce(avg(ms),0)::int avg_ms, count(*) filter (where not ok)::int errors, coalesce(sum(prompt_tokens),0)::bigint tokens from ai_usage where day >= current_date - 6 group by provider order by calls desc`),
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
    platform: platform.map((r) => ({ key: str(r.k), count: num(r.c), users: num(r.u) })),
    screens: screens.map((r) => ({ screen: str(r.screen), views: num(r.views), avgSec: num(r.avg_sec) })),
    sessionFunnel: { startCard: num(sess[0]?.start_card), started: num(sess[0]?.started), done: num(sess[0]?.done), stopped: num(sess[0]?.stopped) },
    onboarding: onb.map((r) => ({ step: str(r.step), users: num(r.users) })),
    walk: walk.map((r) => ({ reason: num(r.reason), count: num(r.c) })),
    production: production.map((r) => ({ task: str(r.task), count: num(r.c), avgScore: num(r.avg_score) })),
    clientErrors: clientErrors.map((r) => ({ screen: str(r.screen), count: num(r.c) })),
    premium: { views: num(prem[0]?.views), gates: num(prem[0]?.gates), starts: num(prem[0]?.starts), done: num(prem[0]?.done) },
    premiumGates: premGates.map((r) => ({ feature: str(r.feature), count: num(r.c) })),
    notifications: { optinYes: num(notif[0]?.optin_yes), optinNo: num(notif[0]?.optin_no), sent: num(notif[0]?.sent), opened: num(notif[0]?.opened) },
    ai: ai.map((r) => ({ provider: str(r.provider), calls: num(r.calls), okPct: num(r.ok_pct), avgMs: num(r.avg_ms), errors: num(r.errors), tokens: num(r.tokens) })),
    reports: reports.map((r) => ({ id: num(r.id), day: str(r.day), kind: str(r.kind), ref: str(r.ref), reason: str(r.reason), content: str(r.content), userId: str(r.user_id) })),
    generatedAt: new Date().toISOString(),
  };
}
