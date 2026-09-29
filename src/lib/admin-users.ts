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
  /** Hesap var ama profil satırı yok: uygulamada kurulumu hiç bitirmemiş (ör. yalnız web'de kayıt). */
  noProfile: boolean;
};

/*
  LİSTENİN TABANI hesap VE profil. Eskiden `profiles`ten başlıyordu: kaydolup
  uygulamada kurulumu hiç bitirmeyen hesabın profil satırı yok ve listede hiç
  görünmüyordu (2026-09-29: 18 hesabın 4'ü, mağaza inceleme hesabı
  google-review-free dahil). Tam birleşim: profilsiz hesap da, hesabı silinmiş
  artık profil de satır olarak görünür.
*/
const ID = sql.raw(`coalesce(p.user_id, u.id)`);
const FROM = sql.raw(`"user" u full join profiles p on p.user_id = u.id`);

export async function listUsers(query: UsersQuery): Promise<{ rows: UserRow[]; total: number; issues: QueryIssue[] }> {
  const { rows, issues } = queryRunner("kullanıcılar");
  const like = `%${query.q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
  const search = query.q
    ? sql`and (u.email ilike ${like} or p.display_name ilike ${like} or u.name ilike ${like} or p.username ilike ${like} or ${ID} like ${`${query.q}%`})`
    : sql``;
  const kind =
    query.kind === "guest" ? sql`and coalesce(u."isAnonymous", false)`
    : query.kind === "account" ? sql`and not coalesce(u."isAnonymous", false)`
    : query.kind === "premium" ? sql`and p.premium_until > now()`
    : query.kind === "suspended" ? sql`and exists (select 1 from account_suspensions s where s.user_id = ${ID} and s.lifted_at is null and (s.until is null or s.until > now()))`
    : sql``;
  const order =
    query.sort === "joined" ? sql`coalesce(p.created_at, u."createdAt") desc`
    : query.sort === "xp" ? sql`p.total_xp desc nulls last, p.last_active_day desc nulls last`
    : query.sort === "streak" ? sql`p.current_streak desc nulls last, p.total_xp desc nulls last`
    : sql`p.last_active_day desc nulls last, p.total_xp desc nulls last, u."createdAt" desc`;
  const offset = (query.page - 1) * USERS_PAGE_SIZE;

  const [list, count] = await Promise.all([
    rows(sql`
      select ${ID} user_id, coalesce(u.email, '') email, coalesce(nullif(p.display_name, ''), u.name, '') name, coalesce(p.username, '') username,
        case when p.course is null then '' else coalesce(p.native_lang, 'tr') || '→' || p.course end pair, coalesce(p.level, '') level,
        coalesce(p.current_streak, 0) streak, coalesce(p.total_xp, 0) xp,
        coalesce(to_char(p.last_active_day, 'YYYY-MM-DD'), '') last_active, to_char(coalesce(p.created_at, u."createdAt"), 'YYYY-MM-DD') joined,
        coalesce(u."isAnonymous", false) guest, coalesce(p.premium_until > now(), false) premium,
        exists (select 1 from account_suspensions s where s.user_id = ${ID} and s.lifted_at is null and (s.until is null or s.until > now())) suspended,
        (select count(*) from user_words w where w.user_id = ${ID} and w.state > 0)::int words,
        p.user_id is null no_profile
      from ${FROM}
      where true ${search} ${kind}
      order by ${order}
      limit ${USERS_PAGE_SIZE} offset ${offset}`),
    rows(sql`select count(*)::int n from ${FROM} where true ${search} ${kind}`),
  ]);
  return {
    total: Number(count[0]?.n) || 0,
    issues,
    rows: list.map((r) => ({
      userId: String(r.user_id), email: String(r.email), name: String(r.name), username: String(r.username),
      pair: String(r.pair), level: String(r.level), streak: Number(r.streak) || 0, xp: Number(r.xp) || 0,
      words: Number(r.words) || 0, lastActive: String(r.last_active), joined: String(r.joined),
      guest: r.guest === true, premium: r.premium === true, suspended: r.suspended === true, noProfile: r.no_profile === true,
    })),
  };
}
