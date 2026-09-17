import "server-only";
import { sql } from "drizzle-orm";
import { queryRunner, type QueryIssue } from "@/lib/admin-query";

/**
 * Tek kullanıcının yönetim görünümü (/admin/users/[id]).
 *
 * NEDEN VAR. Pano her şeyi TOPLAM olarak gösteriyordu. "Bu kişi neden
 * premium, neden bildirim almıyor, sınavı nerede bıraktı, kimi şikâyet etti"
 * soruları için veritabanına elle bağlanmak gerekiyordu. Bir destek e-postası
 * ya da şikâyet geldiğinde bakılacak yer burası.
 *
 * SALT OKUMA. Yazma işleri (premium ver/al, şikâyet kapat) kendi sayfalarında.
 * `resolveEntitlement` burada çağrılmıyor: o fonksiyon bekleyen bonusun
 * penceresini başlatıyor, bir hesaba BAKMAK saati çalıştırmamalı.
 */

type Row = Record<string, unknown>;
const num = (v: unknown) => Number(v) || 0;
const str = (v: unknown) => (v == null ? "" : String(v));

/** Sütun adı → değer; tablo tipinden bağımsız basit görünüm. */
export type Table = { columns: string[]; rows: string[][] };
function table(rs: Row[], columns: string[]): Table {
  return { columns, rows: rs.map((r) => columns.map((c) => str(r[c]))) };
}

export type AdminUser = {
  id: string;
  account: {
    email: string; name: string; verified: boolean; guest: boolean; twoFactor: boolean; createdAt: string;
    providers: string[]; activeSessions: number; lastSeen: string;
  } | null;
  profile: Record<string, string> | null;
  premium: { entitlement: Record<string, string> | null; grants: Table };
  activity: { days30: number; reviews30: number; xp30: number; seconds30: number; wordsByState: { state: number; count: number }[] };
  learning: {
    lessons: Table; path: Table; skills: Table; exams: Table; mock: Table; quiz: Table; placements: Table; boss: Table;
    achievements: number; quests30: number;
  };
  social: {
    friends: number; pending: number; league: Record<string, string> | null;
    reportsAgainst: Table; reportsBy: number; blockedBy: number; blocking: number; unreadInbox: number;
  };
  reach: { devices: Table; webPush: number; consents: Table; usage: Table; clients: Table };
  ai: Table;
  events: Table;
  errors: Table;
  issues: QueryIssue[];
};

export async function getAdminUser(userId: string): Promise<AdminUser> {
  const { rows, issues } = queryRunner("kullanıcı");
  const id = userId.slice(0, 64);
  const [
    acc, providers, sessions, prof, ent, grants, act, wordStates, lessons, path, skills, exams, mock, quiz, placements, boss,
    ach, quests, social, league, reportsAgainst, devices, webPush, consents, usage, ai, events, errors, clients,
  ] = await Promise.all([
    rows(sql`select email, coalesce(name, '') name, "emailVerified" verified, coalesce("isAnonymous", false) guest,
      coalesce("twoFactorEnabled", false) two_factor, to_char("createdAt", 'YYYY-MM-DD HH24:MI') created
      from "user" where id = ${id}`),
    rows(sql`select "providerId" p from account where "userId" = ${id} order by 1`),
    rows(sql`select count(*) filter (where "expiresAt" > now())::int active, to_char(max("updatedAt"), 'YYYY-MM-DD HH24:MI') last_seen
      from session where "userId" = ${id}`),
    rows(sql`select coalesce(display_name, '') display_name, coalesce(username, '') username, level, course,
      coalesce(native_lang, 'tr (varsayılan)') native_lang, coalesce(goal, '') goal, daily_goal, new_per_day, voice,
      current_streak, longest_streak, total_xp, challenge_best, to_char(last_active_day, 'YYYY-MM-DD') last_active_day,
      coalesce(timezone, '') timezone, reminder_hour, reminders_enabled, streak_alert, weekly_reminder,
      visibility, allow_requests, show_in_suggestions, show_activity, coalesce(referral_code, '') referral_code,
      to_char(premium_until, 'YYYY-MM-DD HH24:MI') premium_until, to_char(created_at, 'YYYY-MM-DD HH24:MI') created_at
      from profiles where user_id = ${id}`),
    rows(sql`select to_char(store_until, 'YYYY-MM-DD HH24:MI') store_until, coalesce(store_provider, '') store_provider,
      coalesce(store_platform, '') store_platform, coalesce(store_product, '') store_product, coalesce(store_state, '') store_state,
      bonus_minutes, to_char(bonus_until, 'YYYY-MM-DD HH24:MI') bonus_until, to_char(updated_at, 'YYYY-MM-DD HH24:MI') updated_at
      from entitlements where user_id = ${id}`),
    rows(sql`select to_char(created_at, 'YYYY-MM-DD HH24:MI') at, source, round(minutes / 1440.0, 1)::text days,
      coalesce(actor, '') actor, coalesce(note, '') note from premium_grants where user_id = ${id} order by created_at desc limit 20`),
    rows(sql`select count(*)::int days, coalesce(sum(reviews), 0)::int reviews, coalesce(sum(xp), 0)::int xp, coalesce(sum(seconds), 0)::int seconds
      from daily_stats where user_id = ${id} and day >= current_date - 29`),
    rows(sql`select state, count(*)::int c from user_words where user_id = ${id} group by 1 order by 1`),
    rows(sql`select lesson_id, rule_id, correct || '/' || total score, attempts, roleplay_done,
      to_char(due_at, 'YYYY-MM-DD') due, to_char(last_at, 'YYYY-MM-DD') last from user_lessons where user_id = ${id} order by last_at desc limit 40`),
    rows(sql`select item_id, last_pct, best_pct, attempts, to_char(passed_at, 'YYYY-MM-DD') passed, to_char(last_at, 'YYYY-MM-DD') last
      from user_path_items where user_id = ${id} order by last_at desc limit 40`),
    rows(sql`select exercise_id, skill, level, correct || '/' || total score, last_score, attempts, to_char(last_at, 'YYYY-MM-DD') last
      from user_skills where user_id = ${id} order by last_at desc limit 40`),
    rows(sql`select kind, level, score, correct || '/' || total score_raw, to_char(week, 'YYYY-MM-DD') week, to_char(created_at, 'YYYY-MM-DD') at
      from exams where user_id = ${id} order by created_at desc limit 20`),
    rows(sql`select paper_id, level, skill, state, score, passed, to_char(started_at, 'YYYY-MM-DD HH24:MI') started, to_char(finished_at, 'YYYY-MM-DD HH24:MI') finished
      from mock_exam_attempts where user_id = ${id} order by started_at desc limit 20`),
    rows(sql`select to_char(week, 'YYYY-MM-DD') week, quiz_id, state, score, correct || '/' || total score_raw
      from weekly_quiz_attempts where user_id = ${id} order by week desc limit 12`),
    rows(sql`select to_char(at, 'YYYY-MM-DD') at, suggested, accepted, score from placements where user_id = ${id} order by at desc limit 5`),
    rows(sql`select course, level, module_index, attempts, best_left, to_char(cleared_at, 'YYYY-MM-DD') cleared
      from module_clears where user_id = ${id} order by level, module_index`),
    rows(sql`select count(*)::int c from achievements where user_id = ${id}`),
    rows(sql`select count(*)::int c from quest_claims where user_id = ${id} and day >= current_date - 29`),
    rows(sql`select
      (select count(*) from friendships where status = 'accepted' and (requester_id = ${id} or addressee_id = ${id}))::int friends,
      (select count(*) from friendships where status = 'pending' and (requester_id = ${id} or addressee_id = ${id}))::int pending,
      (select count(*) from user_reports where reporter_id = ${id})::int reports_by,
      (select count(*) from user_blocks where blocked_id = ${id})::int blocked_by,
      (select count(*) from user_blocks where blocker_id = ${id})::int blocking,
      (select count(*) from social_notifications where user_id = ${id} and not read)::int unread`),
    rows(sql`select to_char(week_start, 'YYYY-MM-DD') week_start, tier, cohort, final_xp, rank, coalesce(outcome, '') outcome
      from league_members where user_id = ${id} order by week_start desc limit 1`),
    rows(sql`select id, to_char(created_at, 'YYYY-MM-DD HH24:MI') at, reason, coalesce(detail, '') detail
      from user_reports where reported_id = ${id} order by id desc limit 20`),
    rows(sql`select platform, failures, to_char(created_at, 'YYYY-MM-DD') created, to_char(seen_at, 'YYYY-MM-DD HH24:MI') seen
      from device_tokens where user_id = ${id} order by seen_at desc nulls last`),
    rows(sql`select count(*) filter (where failures < 3)::int c from push_subscriptions where user_id = ${id}`),
    rows(sql`select distinct on (purpose) purpose, granted, version, coalesce(platform, '') platform, to_char(decided_at, 'YYYY-MM-DD HH24:MI') decided
      from user_consents where user_id = ${id} order by purpose, decided_at desc`),
    rows(sql`select key, period, count from usage_counters where user_id = ${id} order by updated_at desc limit 20`),
    rows(sql`select coalesce(kind, '?') kind, provider, count(*)::int calls, count(*) filter (where not ok)::int errors
      from ai_usage where user_id = ${id} and day >= current_date - 29 group by 1, 2 order by 3 desc`),
    rows(sql`select to_char(created_at, 'MM-DD HH24:MI') at, name, coalesce(kind, '') kind, value
      from events where user_id = ${id} order by id desc limit 60`),
    rows(sql`select to_char(created_at, 'MM-DD HH24:MI') at, coalesce(kind, '') screen, value
      from events where user_id = ${id} and name = 'client_error' order by id desc limit 20`),
    rows(sql`select platform, app_version, build, to_char(first_seen, 'YYYY-MM-DD') first_seen, to_char(last_seen, 'YYYY-MM-DD HH24:MI') last_seen
      from user_clients where user_id = ${id} order by last_seen desc`),
  ]);

  const a = acc[0];
  const s = social[0] ?? {};
  const act0 = act[0] ?? {};
  const strRow = (r: Row | undefined) => (r ? Object.fromEntries(Object.entries(r).map(([k, v]) => [k, str(v)])) : null);

  return {
    id,
    account: a
      ? {
          email: str(a.email), name: str(a.name), verified: a.verified === true, guest: a.guest === true,
          twoFactor: a.two_factor === true, createdAt: str(a.created),
          providers: providers.map((r) => str(r.p)), activeSessions: num(sessions[0]?.active), lastSeen: str(sessions[0]?.last_seen),
        }
      : null,
    profile: strRow(prof[0]),
    premium: {
      entitlement: strRow(ent[0]),
      grants: table(grants, ["at", "source", "days", "actor", "note"]),
    },
    activity: {
      days30: num(act0.days), reviews30: num(act0.reviews), xp30: num(act0.xp), seconds30: num(act0.seconds),
      wordsByState: wordStates.map((r) => ({ state: num(r.state), count: num(r.c) })),
    },
    learning: {
      lessons: table(lessons, ["lesson_id", "rule_id", "score", "attempts", "roleplay_done", "due", "last"]),
      path: table(path, ["item_id", "last_pct", "best_pct", "attempts", "passed", "last"]),
      skills: table(skills, ["exercise_id", "skill", "level", "score", "last_score", "attempts", "last"]),
      exams: table(exams, ["kind", "level", "score", "score_raw", "week", "at"]),
      mock: table(mock, ["paper_id", "level", "skill", "state", "score", "passed", "started", "finished"]),
      quiz: table(quiz, ["week", "quiz_id", "state", "score", "score_raw"]),
      placements: table(placements, ["at", "suggested", "accepted", "score"]),
      boss: table(boss, ["course", "level", "module_index", "attempts", "best_left", "cleared"]),
      achievements: num(ach[0]?.c),
      quests30: num(quests[0]?.c),
    },
    social: {
      friends: num(s.friends), pending: num(s.pending), league: strRow(league[0]),
      reportsAgainst: table(reportsAgainst, ["id", "at", "reason", "detail"]),
      reportsBy: num(s.reports_by), blockedBy: num(s.blocked_by), blocking: num(s.blocking), unreadInbox: num(s.unread),
    },
    reach: {
      devices: table(devices, ["platform", "failures", "created", "seen"]),
      webPush: num(webPush[0]?.c),
      consents: table(consents, ["purpose", "granted", "version", "platform", "decided"]),
      usage: table(usage, ["key", "period", "count"]),
      clients: table(clients, ["platform", "app_version", "build", "first_seen", "last_seen"]),
    },
    ai: table(ai, ["kind", "provider", "calls", "errors"]),
    events: table(events, ["at", "name", "kind", "value"]),
    errors: table(errors, ["at", "screen", "value"]),
    issues,
  };
}
