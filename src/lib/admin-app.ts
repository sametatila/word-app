import "server-only";
import { sql } from "drizzle-orm";
import { queryRunner, type QueryIssue } from "@/lib/admin-query";

/**
 * /admin/app sayfasının okuduğu işletim verisi: sürüm dağılımı, hesap silme
 * kaydı, yürürlükteki askılar. Her sorgu kendi hatasını yutuyor.
 */

const num = (v: unknown) => Number(v) || 0;
const str = (v: unknown) => (v == null ? "" : String(v));
const iso = (v: unknown) => (v ? new Date(String(v)).toISOString() : "");

export type AppAdminData = {
  versions: { platform: string; version: string; build: number; users: number; active7: number }[];
  deletions: { source: string; count30: number; total: number; avgAgeDays: number; reasons: string }[];
  suspensions: { userId: string; name: string; reason: string; until: string; admin: string; at: string }[];
  issues: QueryIssue[];
};

export async function appAdminData(): Promise<AppAdminData> {
  const { rows, issues } = queryRunner("uygulama");
  const [versions, deletions, suspensions] = await Promise.all([
    rows(sql`
      select platform, app_version, build, count(*)::int users,
        count(*) filter (where last_seen >= now() - interval '7 days')::int active7
      from user_clients group by 1, 2, 3 order by 1, 3 desc`),
    rows(sql`
      select source, count(*) filter (where created_at >= now() - interval '30 days')::int c30, count(*)::int total,
        coalesce(avg(age_days), 0)::int avg_age,
        coalesce(string_agg(distinct reason, ', '), '') reasons
      from account_deletions group by 1 order by 1`),
    rows(sql`
      select s.user_id, coalesce(p.display_name, p.username, u.email, '') name, s.reason, s.until,
        coalesce(s.admin_email, '') admin, s.created_at
      from account_suspensions s
      left join profiles p on p.user_id = s.user_id
      left join "user" u on u.id = s.user_id
      where s.lifted_at is null and (s.until is null or s.until > now())
      order by s.id desc limit 50`),
  ]);
  return {
    versions: versions.map((r) => ({ platform: str(r.platform), version: str(r.app_version), build: num(r.build), users: num(r.users), active7: num(r.active7) })),
    deletions: deletions.map((r) => ({ source: str(r.source), count30: num(r.c30), total: num(r.total), avgAgeDays: num(r.avg_age), reasons: str(r.reasons) })),
    issues,
    suspensions: suspensions.map((r) => ({ userId: str(r.user_id), name: str(r.name), reason: str(r.reason), until: iso(r.until), admin: str(r.admin), at: iso(r.created_at) })),
  };
}
