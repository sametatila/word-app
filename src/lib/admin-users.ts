import "server-only";
import { sql } from "drizzle-orm";
import { queryRunner, type QueryIssue } from "@/lib/admin-query";

/**
 * Kullanıcı listesi — SUNUCUDA arama, süzme, sıralama ve sayfalama
 * (/admin/users).
 *
 * Pano eskiden 500 profili tek seferde çekip tarayıcıda süzüyordu: 500'ün
 * ötesi hiç görünmüyordu ve her açılışta bütün `user_words` tablosu kullanıcı
 * başına sayılıyordu. Burada yalnız istenen sayfa (50 satır) çekiliyor, kelime
 * sayısı da yalnız o 50 kişi için hesaplanıyor.
 *
 * Arama: e-posta, görünen ad, kullanıcı adı (içinde geçen) ve kimlik (baştan).
 */

export const USERS_PAGE_SIZE = 50;
export type UsersKind = "all" | "account" | "guest" | "premium" | "suspended";
export type UsersSort = "active" | "joined" | "xp" | "streak";

export type UsersQuery = { q: string; kind: UsersKind; sort: UsersSort; page: number };

export function parseUsersQuery(sp: Record<string, string | string[] | undefined>): UsersQuery {
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const kinds: UsersKind[] = ["all", "account", "guest", "premium", "suspended"];
  const sorts: UsersSort[] = ["active", "joined", "xp", "streak"];
  const kind = kinds.includes(one(sp.tur) as UsersKind) ? (one(sp.tur) as UsersKind) : "all";
  const sort = sorts.includes(one(sp.sira) as UsersSort) ? (one(sp.sira) as UsersSort) : "active";
  const page = Math.max(1, Math.min(10_000, Math.floor(Number(one(sp.sayfa)) || 1)));
  return { q: one(sp.q).trim().slice(0, 120), kind, sort, page };
}

export type UserRow = {
  userId: string; email: string; name: string; username: string; pair: string; level: string;
  streak: number; xp: number; words: number; lastActive: string; joined: string;
  guest: boolean; premium: boolean; suspended: boolean;
};

export async function listUsers(query: UsersQuery): Promise<{ rows: UserRow[]; total: number; issues: QueryIssue[] }> {
  const { rows, issues } = queryRunner("kullanıcılar");
  const like = `%${query.q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
  const search = query.q
    ? sql`and (u.email ilike ${like} or p.display_name ilike ${like} or p.username ilike ${like} or p.user_id like ${`${query.q}%`})`
    : sql``;
  const kind =
    query.kind === "guest" ? sql`and coalesce(u."isAnonymous", false)`
    : query.kind === "account" ? sql`and not coalesce(u."isAnonymous", false)`
    : query.kind === "premium" ? sql`and p.premium_until > now()`
    : query.kind === "suspended" ? sql`and exists (select 1 from account_suspensions s where s.user_id = p.user_id and s.lifted_at is null and (s.until is null or s.until > now()))`
    : sql``;
  const order =
    query.sort === "joined" ? sql`p.created_at desc`
    : query.sort === "xp" ? sql`p.total_xp desc, p.last_active_day desc nulls last`
    : query.sort === "streak" ? sql`p.current_streak desc, p.total_xp desc`
    : sql`p.last_active_day desc nulls last, p.total_xp desc`;
  const offset = (query.page - 1) * USERS_PAGE_SIZE;

  const [list, count] = await Promise.all([
    rows(sql`
      select p.user_id, coalesce(u.email, '') email, coalesce(p.display_name, '') name, coalesce(p.username, '') username,
        coalesce(p.native_lang, 'tr') || '→' || p.course pair, p.level, p.current_streak streak, p.total_xp xp,
        coalesce(to_char(p.last_active_day, 'YYYY-MM-DD'), '') last_active, to_char(p.created_at, 'YYYY-MM-DD') joined,
        coalesce(u."isAnonymous", false) guest, coalesce(p.premium_until > now(), false) premium,
        exists (select 1 from account_suspensions s where s.user_id = p.user_id and s.lifted_at is null and (s.until is null or s.until > now())) suspended,
        (select count(*) from user_words w where w.user_id = p.user_id and w.state > 0)::int words
      from profiles p left join "user" u on u.id = p.user_id
      where true ${search} ${kind}
      order by ${order}
      limit ${USERS_PAGE_SIZE} offset ${offset}`),
    rows(sql`select count(*)::int n from profiles p left join "user" u on u.id = p.user_id where true ${search} ${kind}`),
  ]);
  return {
    total: Number(count[0]?.n) || 0,
    issues,
    rows: list.map((r) => ({
      userId: String(r.user_id), email: String(r.email), name: String(r.name), username: String(r.username),
      pair: String(r.pair), level: String(r.level), streak: Number(r.streak) || 0, xp: Number(r.xp) || 0,
      words: Number(r.words) || 0, lastActive: String(r.last_active), joined: String(r.joined),
      guest: r.guest === true, premium: r.premium === true, suspended: r.suspended === true,
    })),
  };
}
