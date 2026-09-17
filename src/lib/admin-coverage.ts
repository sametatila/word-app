import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

/**
 * Panonun 31 Ağustos'tan sonra gelen özelliklere bakan kısmı.
 *
 * NEDEN AYRI DOSYA. `lib/admin.ts` panonun ilk kurulduğu günün ürününü
 * ölçüyordu: kelime turu, yürüyüş, oyunlar. Sonra ürünün ağırlığı başka yere
 * kaydı (dersler ve Patika, beceri egzersizleri, seviye/deneme sınavları,
 * yerleştirme, rol yapma, haftalık lig, misafir modu, üç dil çifti) ve panoda
 * bunların hiçbiri görünmüyordu. Tablolar doluyordu, olaylar akıyordu, kimse
 * bakmıyordu. Buradaki her sorgu o boşluklardan birine karşılık geliyor.
 *
 * Her sorgu kendi hatasını yutuyor (boş liste): bir tablonun eksik olması
 * panonun tamamını düşürmesin — `lib/admin.ts` ile aynı kural.
 */

type Row = Record<string, unknown>;
async function rows(q: ReturnType<typeof sql>): Promise<Row[]> {
  try {
    const r = (await db.execute(q)) as unknown;
    if (Array.isArray(r)) return r as Row[];
    return ((r as { rows?: Row[] }).rows ?? []) as Row[];
  } catch (err) {
    console.error("[admin-coverage] sorgu hatası", err);
    return [];
  }
}
const num = (v: unknown) => Number(v) || 0;
const str = (v: unknown) => (v == null ? "" : String(v));

type Kv = { key: string; count: number; users: number; avg: number };
const kv = (r: Row): Kv => ({ key: str(r.k), count: num(r.c), users: num(r.u), avg: num(r.a) });

/**
 * Zamanlanmış işlerin BEKLENEN listesi ve en uzun sessizlik süresi (saat).
 *
 * Eski bölüm yalnız son yedi günde koşmuş işleri listeliyordu; hiç koşmayan
 * iş listede HİÇ görünmüyordu — yani en kötü hâl görünmez kalıyordu. Liste
 * `lib/cron-runs.ts` `CronName` ile ve AGENTS.md'deki timer tablosuyla aynı.
 */
export const CRON_EXPECTED: { name: string; label: string; maxGapH: number }[] = [
  { name: "reminders", label: "Hatırlatma (her gün 18:00 UTC)", maxGapH: 26 },
  { name: "assess", label: "Değerlendirme kuyruğu (her gün 04:15 UTC)", maxGapH: 26 },
  { name: "streak-alert", label: "Seri koruma (her gün 17–21 UTC)", maxGapH: 26 },
  { name: "summary", label: "Haftalık özet + kayıt silme (pazartesi)", maxGapH: 24 * 7 + 6 },
  { name: "weekly-reminder", label: "Haftalık sınav çağrısı (pazar)", maxGapH: 24 * 7 + 6 },
];

export type CronHealth = {
  name: string; label: string; lastAt: string | null; lastOk: boolean; ageH: number | null;
  /** Beklenen aralıktan uzun süredir koşmadı (ya da hiç koşmadı). */
  stale: boolean; ok7: number; fail7: number; detail: string | null;
};

export type Coverage = {
  /** Anadil → kurs çiftleri; misafirler ayrıca. */
  pairs: { native: string; course: string; users: number; guests: number; active7: number }[];
  premium: {
    active: number; store: number; bonus: number; byPlatform: { key: string; count: number }[];
    /**
     * WEB → UYGULAMA HUNİSİ (30g, tekil kullanıcı). Web satmıyor; paywall'ı
     * mağazaya/uygulamaya yönlendiriyor (lib/store-link). Basamaklar:
     * web paywall gördü → yönlendirmeye dokundu → sunucu mağazaya yolladı →
     * uygulamada web bağlantısıyla paywall açtı → uygulamada satın aldı
     * (web paywall'ı daha önce görmüş olanlar).
     */
    webFunnel: { webViews: number; taps: number; redirects: number; appViews: number; purchases: number };
  };
  learning: {
    lessons: { started: number; finished: number; users: number; rulesTracked: number; rulesDue: number; roleplayDone: number };
    topLessons: { lesson: string; users: number; avgPct: number }[];
    path: { items: number; users: number; attempts: number; passed: number; avgBest: number };
    pathWeakest: { item: string; users: number; avgBest: number; passRate: number }[];
    skills: Kv[];
    exams: Kv[];
    mock: { level: string; skill: string; started: number; finished: number; passed: number; avgScore: number }[];
    placements: { level: string; count: number; accepted: number }[];
    roleplay: { turns30: number; users30: number; byMode: { key: string; count: number }[] };
    assessments: { kind: string; provider: string; count: number }[];
    pronounce: { count: number; users: number; avg: number };
    tts: { plays: number; fallbacks: { key: string; count: number }[] };
    walkListen: { key: string; count: number }[];
  };
  growth: {
    guests: { total: number; active7: number; stale20: number; starts30: number; nudges: Kv[]; upgrades: Kv[] };
    warmup: { seen: number; done: number; existingAccount: number };
    installPrompt: Kv[];
    social: {
      usernames: number; publicProfiles: number; friendsAccepted: number; friendsPending: number;
      leagueThisWeek: number; nudges30: number; reactions30: number; blocks: number; feedViews30: number;
      questsActive: number; leagueUps30: number;
    };
    referrals: { total: number; rewarded: number; last30: number };
    pushReach: { key: string; count: number }[];
    remindersOn: { reminders: number; streakAlert: number; weeklyReminder: number };
    consents: { purpose: string; granted: number; denied: number }[];
    quota: { key: string; users: number; total: number }[];
  };
  cron: CronHealth[];
  /**
   * İkinci denetimde (2026-09-17) panonun HİÇ okumadığı çıkan tablolar.
   * Beceri ilerlemesi olaydan değil tablodan: `skill_finish` yalnız POST'ta
   * yazılıyor, çevrimdışı biriken kayıtlar PUT ile gidiyor ve olay bırakmıyor.
   */
  engagement: {
    skillProgress: { skill: string; level: string; users: number; exercises: number; avgScore: number }[];
    boss: { level: string; users: number; cleared: number; avgAttempts: number }[];
    bossEvents: { plays: number; clears: number };
    achievements: { id: string; users: number; last30: number }[];
    quests: { id: string; claims: number; users: number }[];
    challenge: { plays30: number; users30: number; withBest: number; avgBest: number; maxBest: number };
    inbox: { type: string; unread: number; total: number }[];
    feed: { type: string; count: number }[];
    promoRedemptions30: number;
    aiByKind: { kind: string; calls: number; errors: number; tokens: number; audioSec: number; chars: number }[];
  };
  auth: {
    providers: { key: string; count: number }[];
    twoFactor: number; activeSessions: number; unverified: number; accounts: number;
  };
};

export async function getCoverage(): Promise<Coverage> {
  const [
    pairs, prem, premPlat, webFunnel, lessonEv, lessonRows, topLessons, path, pathWeak, skills, exams, mock, placements,
    rpTotals, rpModes, assessments, pron, ttsPlays, ttsFb, walkListen,
  ] = await Promise.all([
    rows(sql`
      select coalesce(p.native_lang, 'tr') native, p.course,
        count(*)::int users,
        count(*) filter (where u."isAnonymous")::int guests,
        count(*) filter (where p.last_active_day >= current_date - 6)::int active7
      from profiles p left join "user" u on u.id = p.user_id
      group by 1, 2 order by users desc`),
    rows(sql`
      select
        (select count(*) from profiles where premium_until > now())::int active,
        (select count(*) from entitlements where store_until > now())::int store,
        (select count(*) from entitlements where bonus_until > now())::int bonus`),
    rows(sql`select coalesce(store_platform, '?') k, count(*)::int c from entitlements where store_until > now() group by 1 order by 2 desc`),
    rows(sql`
      with w as (
        select user_id, min(created_at) first_view from events
        where name = 'paywall_view' and day >= current_date - 29 and coalesce(kind, '') not in ('mobile', 'web_link')
        group by user_id
      )
      select
        (select count(*) from w)::int web_views,
        (select count(distinct user_id) from events where name = 'store_redirect' and day >= current_date - 29 and (kind like '%_tap' or kind like 'desktop:%_ios' or kind like 'desktop:%_android'))::int taps,
        (select count(distinct user_id) from events where name = 'store_redirect' and day >= current_date - 29 and kind not like '%_tap' and kind not like 'desktop:%_ios' and kind not like 'desktop:%_android')::int redirects,
        (select count(distinct user_id) from events where name = 'paywall_view' and kind = 'web_link' and day >= current_date - 29)::int app_views,
        (select count(distinct e.user_id) from events e join w on w.user_id = e.user_id
          where e.name = 'purchase_done' and e.created_at >= w.first_view)::int purchases`),
    rows(sql`
      select count(*) filter (where name = 'lesson_start')::int started,
        count(*) filter (where name = 'lesson_finish')::int finished,
        count(distinct user_id) filter (where name in ('lesson_start', 'lesson_finish'))::int users
      from events where day >= current_date - 29 and name in ('lesson_start', 'lesson_finish')`),
    rows(sql`
      select count(*)::int rules, count(*) filter (where due_at <= now())::int due,
        count(*) filter (where roleplay_done)::int rp
      from user_lessons`),
    rows(sql`
      select lesson_id k, count(distinct user_id)::int u,
        coalesce(avg(case when total > 0 then correct * 100.0 / total end), 0)::int a
      from user_lessons group by 1 order by u desc, a asc limit 12`),
    rows(sql`
      select count(distinct item_id)::int items, count(distinct user_id)::int users,
        coalesce(sum(attempts), 0)::int attempts, count(*) filter (where passed_at is not null)::int passed,
        coalesce(avg(best_pct), 0)::int avg_best
      from user_path_items`),
    /* Zayıf halka: en az iki kişinin denediği, ortalama en iyi puanı en düşük
       öğeler. Tek denemeli öğe gürültü; iki kişide düşükse içeriğe bakılır. */
    rows(sql`
      select item_id k, count(*)::int u, avg(best_pct)::int a,
        round(avg(case when passed_at is not null then 1.0 else 0.0 end) * 100)::int pr
      from user_path_items group by 1 having count(*) >= 2 order by a asc limit 10`),
    rows(sql`
      select coalesce(kind, '?') k, count(*)::int c, count(distinct user_id)::int u, coalesce(avg(value), 0)::int a
      from events where name = 'skill_finish' and day >= current_date - 29 group by 1 order by c desc limit 20`),
    rows(sql`
      select coalesce(kind, '?') k, count(*)::int c, count(distinct user_id)::int u, coalesce(avg(score), 0)::int a
      from exams where created_at >= now() - interval '30 days' group by 1 order by c desc limit 20`),
    rows(sql`
      select level, skill, count(*)::int started,
        count(*) filter (where finished_at is not null)::int finished,
        count(*) filter (where passed)::int passed,
        coalesce(avg(score) filter (where finished_at is not null), 0)::int avg_score
      from mock_exam_attempts group by 1, 2 order by 1, 2`),
    rows(sql`
      select coalesce(suggested, '?') k, count(*)::int c, count(*) filter (where accepted = suggested)::int u
      from placements group by 1 order by 1`),
    rows(sql`
      select count(*)::int turns, count(distinct user_id)::int users
      from roleplay_logs where created_at >= now() - interval '30 days'`),
    rows(sql`select coalesce(mode, 'lesson') k, count(*)::int c from roleplay_logs where created_at >= now() - interval '30 days' group by 1 order by 2 desc`),
    rows(sql`
      select kind, coalesce(provider, '—') provider, count(*)::int c
      from assessments where created_at >= now() - interval '30 days' group by 1, 2 order by 3 desc limit 16`),
    rows(sql`
      select count(*)::int c, count(distinct user_id)::int u, coalesce(avg(value), 0)::int a
      from events where name = 'pronounce' and day >= current_date - 29`),
    rows(sql`select count(*)::int c from events where name = 'tts_play' and day >= current_date - 29`),
    rows(sql`select coalesce(kind, '?') k, count(*)::int c from events where name = 'tts_fallback' and day >= current_date - 29 group by 1 order by 2 desc`),
    rows(sql`select coalesce(kind, '?') k, count(*)::int c from events where name = 'walk_listen' and day >= current_date - 29 group by 1 order by 2 desc limit 16`),
  ]);

  const [
    guests, guestEv, guestNudges, guestUpgrades, warm, install, social, refs, pushReach, remind, consents, quota, cron,
  ] = await Promise.all([
    /* Misafir 30 gün kullanılmayınca siliniyor; 20 gündür sessiz olanlar
       silinmeye yaklaşanlar — hesaba geçirme çağrısının son şansı. */
    rows(sql`
      select count(*)::int total,
        count(*) filter (where p.last_active_day >= current_date - 6)::int active7,
        count(*) filter (where coalesce(p.last_active_day, p.created_at::date) < current_date - 20)::int stale20
      from "user" u left join profiles p on p.user_id = u.id where u."isAnonymous"`),
    rows(sql`select count(*)::int c from events where name = 'guest_start' and day >= current_date - 29`),
    rows(sql`select coalesce(kind, '?') k, count(*)::int c, count(distinct user_id)::int u from events where name = 'guest_nudge' and day >= current_date - 29 group by 1 order by 2 desc`),
    rows(sql`select coalesce(kind, '?') k, count(*)::int c, count(distinct user_id)::int u from events where name = 'guest_upgrade' and day >= current_date - 29 group by 1 order by 2 desc`),
    rows(sql`
      select count(distinct user_id) filter (where name = 'first_practice')::int seen,
        count(*) filter (where name = 'first_practice_done')::int done,
        count(*) filter (where name = 'onboarding_existing_account')::int existing
      from events where day >= current_date - 29 and name in ('first_practice', 'first_practice_done', 'onboarding_existing_account')`),
    rows(sql`select value::text k, count(*)::int c, count(distinct user_id)::int u from events where name = 'install_prompt' and day >= current_date - 29 group by 1 order by 1`),
    rows(sql`
      select
        (select count(*) from profiles where username is not null)::int usernames,
        (select count(*) from profiles where visibility = 'public')::int public_profiles,
        (select count(*) from friendships where status = 'accepted')::int friends_accepted,
        (select count(*) from friendships where status = 'pending')::int friends_pending,
        (select count(*) from league_members where week_start = date_trunc('week', current_date)::date)::int league_week,
        (select count(*) from nudges where created_at >= now() - interval '30 days')::int nudges30,
        (select count(*) from event_reactions where created_at >= now() - interval '30 days')::int reactions30,
        (select count(*) from user_blocks)::int blocks,
        (select count(*) from events where name = 'feed_view' and day >= current_date - 29)::int feed30,
        (select count(*) from friend_quests where status = 'active')::int quests_active,
        (select count(*) from events where name = 'league_up' and day >= current_date - 29)::int league_ups30`),
    rows(sql`
      select count(*)::int total, count(*) filter (where rewarded_at is not null)::int rewarded,
        count(*) filter (where created_at >= now() - interval '30 days')::int last30
      from referrals`),
    /* Push ULAŞABİLİRLİĞİ: mobil jetonlar platforma göre + web aboneliği.
       "İzin verildi" olayı geçmişi sayıyor; bu ise bugün bildirim alabilecek
       cihaz sayısı. */
    rows(sql`
      select platform k, count(*)::int c from device_tokens where failures < 3 group by 1
      union all
      select 'web' k, count(*)::int c from push_subscriptions where failures < 3`),
    rows(sql`
      select count(*) filter (where reminders_enabled)::int reminders,
        count(*) filter (where streak_alert)::int streak_alert,
        count(*) filter (where weekly_reminder)::int weekly_reminder
      from profiles`),
    /* Rıza: her kullanıcının her amaç için SON kararı. */
    rows(sql`
      select purpose, count(*) filter (where granted)::int granted, count(*) filter (where not granted)::int denied
      from (select distinct on (user_id, purpose) user_id, purpose, granted from user_consents order by user_id, purpose, decided_at desc) x
      group by 1 order by 1`),
    rows(sql`
      select key k, count(distinct user_id)::int u, coalesce(sum(count), 0)::int c
      from usage_counters where updated_at >= now() - interval '30 days' group by 1 order by 3 desc`),
    rows(sql`
      select r.name,
        max(r.ran_at)::text last_at,
        extract(epoch from now() - max(r.ran_at)) / 3600 age_h,
        (array_agg(r.ok order by r.ran_at desc))[1] last_ok,
        (array_agg(r.detail order by r.ran_at desc))[1] detail,
        count(*) filter (where r.ok and r.ran_at >= now() - interval '7 days')::int ok7,
        count(*) filter (where not r.ok and r.ran_at >= now() - interval '7 days')::int fail7
      from cron_runs r group by r.name`),
  ]);

  const [skillProg, boss, bossEv, ach, quests, chal, inbox, feed, promo, aiKind, providers, authRow] = await Promise.all([
    rows(sql`
      select skill, level, count(distinct user_id)::int u, count(*)::int n, coalesce(avg(last_score), 0)::int a
      from user_skills group by 1, 2 order by 2, 1`),
    rows(sql`
      select level, count(distinct user_id)::int u, count(*) filter (where cleared_at is not null)::int cleared,
        round(coalesce(avg(attempts), 0), 1)::float att
      from module_clears group by 1 order by 1`),
    rows(sql`
      select count(*) filter (where name = 'boss_play')::int plays, count(*) filter (where name = 'boss_clear')::int clears
      from events where day >= current_date - 29 and name in ('boss_play', 'boss_clear')`),
    rows(sql`
      select achievement_id k, count(*)::int u, count(*) filter (where unlocked_at >= now() - interval '30 days')::int n
      from achievements group by 1 order by 2 desc limit 20`),
    rows(sql`
      select quest_id k, count(*)::int n, count(distinct user_id)::int u
      from quest_claims where day >= current_date - 29 group by 1 order by 2 desc`),
    rows(sql`
      select
        (select count(*) from events where name = 'challenge_play' and day >= current_date - 29)::int plays,
        (select count(distinct user_id) from events where name = 'challenge_play' and day >= current_date - 29)::int users,
        (select count(*) from profiles where challenge_best > 0)::int with_best,
        (select coalesce(avg(challenge_best) filter (where challenge_best > 0), 0) from profiles)::int avg_best,
        (select coalesce(max(challenge_best), 0) from profiles)::int max_best`),
    /* Okunmamış sosyal bildirim birikimi: şişiyorsa ya gelen kutusu
       açılmıyor ya da gürültü üretiyoruz. */
    rows(sql`select type k, count(*) filter (where not read)::int unread, count(*)::int total from social_notifications group by 1 order by 2 desc`),
    rows(sql`select type k, count(*)::int c from activity_events where created_at >= now() - interval '30 days' group by 1 order by 2 desc`),
    rows(sql`select count(*)::int c from promo_redemptions where created_at >= now() - interval '30 days'`),
    /* Yapay zekâ maliyeti ÖZELLİK başına: sağlayıcı sağlığı ayrı bölümde,
       burada "parayı hangi özellik yakıyor". */
    rows(sql`
      select coalesce(kind, '?') k, count(*)::int calls, count(*) filter (where not ok)::int errors,
        coalesce(sum(coalesce(prompt_tokens, 0) + coalesce(completion_tokens, 0)), 0)::bigint tokens,
        coalesce(sum(audio_seconds), 0)::bigint audio, coalesce(sum(chars), 0)::bigint chars
      from ai_usage where day >= current_date - 29 group by 1 order by 2 desc`),
    rows(sql`select "providerId" k, count(*)::int c from account group by 1 order by 2 desc`),
    rows(sql`
      select
        (select count(*) from "user" where "twoFactorEnabled")::int two_factor,
        (select count(*) from session where "expiresAt" > now())::int sessions,
        (select count(*) from "user" where not "emailVerified" and not coalesce("isAnonymous", false))::int unverified,
        (select count(*) from "user" where not coalesce("isAnonymous", false))::int accounts`),
  ]);
  const ch = chal[0] ?? {};
  const au = authRow[0] ?? {};

  const g = guests[0] ?? {};
  const s = social[0] ?? {};
  const ref = refs[0] ?? {};
  const w = warm[0] ?? {};
  const le = lessonEv[0] ?? {};
  const lr = lessonRows[0] ?? {};
  const pt = path[0] ?? {};
  const rp = rpTotals[0] ?? {};
  const rm = remind[0] ?? {};
  const pr = prem[0] ?? {};

  const cronByName = new Map(cron.map((r) => [str(r.name), r]));
  const cronNames = [...CRON_EXPECTED.map((c) => c.name), ...[...cronByName.keys()].filter((n) => !CRON_EXPECTED.some((c) => c.name === n))];

  return {
    pairs: pairs.map((r) => ({ native: str(r.native), course: str(r.course), users: num(r.users), guests: num(r.guests), active7: num(r.active7) })),
    premium: {
      active: num(pr.active), store: num(pr.store), bonus: num(pr.bonus),
      byPlatform: premPlat.map((r) => ({ key: str(r.k), count: num(r.c) })),
      webFunnel: {
        webViews: num(webFunnel[0]?.web_views), taps: num(webFunnel[0]?.taps), redirects: num(webFunnel[0]?.redirects),
        appViews: num(webFunnel[0]?.app_views), purchases: num(webFunnel[0]?.purchases),
      },
    },
    learning: {
      lessons: {
        started: num(le.started), finished: num(le.finished), users: num(le.users),
        rulesTracked: num(lr.rules), rulesDue: num(lr.due), roleplayDone: num(lr.rp),
      },
      topLessons: topLessons.map((r) => ({ lesson: str(r.k), users: num(r.u), avgPct: num(r.a) })),
      path: { items: num(pt.items), users: num(pt.users), attempts: num(pt.attempts), passed: num(pt.passed), avgBest: num(pt.avg_best) },
      pathWeakest: pathWeak.map((r) => ({ item: str(r.k), users: num(r.u), avgBest: num(r.a), passRate: num(r.pr) })),
      skills: skills.map(kv),
      exams: exams.map(kv),
      mock: mock.map((r) => ({
        level: str(r.level), skill: str(r.skill), started: num(r.started), finished: num(r.finished),
        passed: num(r.passed), avgScore: num(r.avg_score),
      })),
      placements: placements.map((r) => ({ level: str(r.k), count: num(r.c), accepted: num(r.u) })),
      roleplay: { turns30: num(rp.turns), users30: num(rp.users), byMode: rpModes.map((r) => ({ key: str(r.k), count: num(r.c) })) },
      assessments: assessments.map((r) => ({ kind: str(r.kind), provider: str(r.provider), count: num(r.c) })),
      pronounce: { count: num(pron[0]?.c), users: num(pron[0]?.u), avg: num(pron[0]?.a) },
      tts: { plays: num(ttsPlays[0]?.c), fallbacks: ttsFb.map((r) => ({ key: str(r.k), count: num(r.c) })) },
      walkListen: walkListen.map((r) => ({ key: str(r.k), count: num(r.c) })),
    },
    growth: {
      guests: {
        total: num(g.total), active7: num(g.active7), stale20: num(g.stale20), starts30: num(guestEv[0]?.c),
        nudges: guestNudges.map(kv), upgrades: guestUpgrades.map(kv),
      },
      warmup: { seen: num(w.seen), done: num(w.done), existingAccount: num(w.existing) },
      installPrompt: install.map(kv),
      social: {
        usernames: num(s.usernames), publicProfiles: num(s.public_profiles), friendsAccepted: num(s.friends_accepted),
        friendsPending: num(s.friends_pending), leagueThisWeek: num(s.league_week), nudges30: num(s.nudges30),
        reactions30: num(s.reactions30), blocks: num(s.blocks), feedViews30: num(s.feed30),
        questsActive: num(s.quests_active), leagueUps30: num(s.league_ups30),
      },
      referrals: { total: num(ref.total), rewarded: num(ref.rewarded), last30: num(ref.last30) },
      pushReach: pushReach.map((r) => ({ key: str(r.k), count: num(r.c) })),
      remindersOn: { reminders: num(rm.reminders), streakAlert: num(rm.streak_alert), weeklyReminder: num(rm.weekly_reminder) },
      consents: consents.map((r) => ({ purpose: str(r.purpose), granted: num(r.granted), denied: num(r.denied) })),
      quota: quota.map((r) => ({ key: str(r.k), users: num(r.u), total: num(r.c) })),
    },
    engagement: {
      skillProgress: skillProg.map((r) => ({ skill: str(r.skill), level: str(r.level), users: num(r.u), exercises: num(r.n), avgScore: num(r.a) })),
      boss: boss.map((r) => ({ level: str(r.level), users: num(r.u), cleared: num(r.cleared), avgAttempts: num(r.att) })),
      bossEvents: { plays: num(bossEv[0]?.plays), clears: num(bossEv[0]?.clears) },
      achievements: ach.map((r) => ({ id: str(r.k), users: num(r.u), last30: num(r.n) })),
      quests: quests.map((r) => ({ id: str(r.k), claims: num(r.n), users: num(r.u) })),
      challenge: { plays30: num(ch.plays), users30: num(ch.users), withBest: num(ch.with_best), avgBest: num(ch.avg_best), maxBest: num(ch.max_best) },
      inbox: inbox.map((r) => ({ type: str(r.k), unread: num(r.unread), total: num(r.total) })),
      feed: feed.map((r) => ({ type: str(r.k), count: num(r.c) })),
      promoRedemptions30: num(promo[0]?.c),
      aiByKind: aiKind.map((r) => ({ kind: str(r.k), calls: num(r.calls), errors: num(r.errors), tokens: num(r.tokens), audioSec: num(r.audio), chars: num(r.chars) })),
    },
    auth: {
      providers: providers.map((r) => ({ key: str(r.k), count: num(r.c) })),
      twoFactor: num(au.two_factor), activeSessions: num(au.sessions), unverified: num(au.unverified), accounts: num(au.accounts),
    },
    cron: cronNames.map((name) => {
      const r = cronByName.get(name);
      const exp = CRON_EXPECTED.find((c) => c.name === name);
      const ageH = r ? Math.round(num(r.age_h) * 10) / 10 : null;
      return {
        name,
        label: exp?.label ?? name,
        lastAt: r ? str(r.last_at) : null,
        lastOk: r ? r.last_ok === true : false,
        ageH,
        stale: ageH == null || (exp ? ageH > exp.maxGapH : false),
        ok7: num(r?.ok7), fail7: num(r?.fail7),
        detail: r?.detail ? str(r.detail) : null,
      };
    }),
  };
}
