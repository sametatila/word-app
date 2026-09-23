import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { notify } from "@/lib/social/notify";

/**
 * Şikâyet kuyruğu — yönetim panelinin moderasyon sayfası (/admin/moderation).
 *
 * İKİ KUYRUK, TEK YER. `content_reports` yapay zekâ çıktısını, `user_reports`
 * bir kullanıcıyı şikâyet ediyor. İkincisi panoda hiç görünmüyordu: mobil ve
 * webdeki "şikâyet et" düğmesi bir tabloya yazıyor, o tabloyu okuyan kimse
 * yoktu. Otomatik yaptırım yok (bkz. `schema.ts` userReports): karar insanın.
 *
 * Kapatma kararı `moderation_actions`'a yazılıyor; tablo henüz canlıya
 * uygulanmamışsa sayfa yine açılıyor, yalnız kapatma düğmesi yerine uyarı
 * çıkıyor (`ready=false`).
 */

type Row = Record<string, unknown>;
async function rows(q: ReturnType<typeof sql>): Promise<Row[]> {
  const r = (await db.execute(q)) as unknown;
  if (Array.isArray(r)) return r as Row[];
  return ((r as { rows?: Row[] }).rows ?? []) as Row[];
}
const num = (v: unknown) => Number(v) || 0;
const str = (v: unknown) => (v == null ? "" : String(v));
/** Zaman damgası ISO olarak iner; biçimlendirme görünümde (kullanıcının yerel saati). */
const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : v ? new Date(String(v)).toISOString() : "");

export type ReportedPerson = { id: string; username: string; name: string; joined: string; guest: boolean };

export type UserReportRow = {
  id: number;
  at: string;
  reason: string;
  detail: string;
  reporter: ReportedPerson;
  reported: ReportedPerson;
  /** Bu kişi hakkındaki TÜM şikâyetler (açık + kapalı) — tekrar eden hedefi öne çıkarır. */
  reportsAgainst: number;
  /** Bu kişiyi engelleyen hesap sayısı — şikâyet etmeden engelleyenler de sinyal. */
  blockedBy: number;
};

export type ContentReportRow = {
  id: number;
  at: string;
  kind: string;
  ref: string;
  reason: string;
  content: string;
  reporter: ReportedPerson;
};

export type ClosedRow = { target: string; refId: number; action: string; actor: string; note: string; at: string };

export type ModerationData = {
  /** `moderation_actions` tablosu var mı — yoksa kapatma yapılamaz. */
  ready: boolean;
  userReports: UserReportRow[];
  contentReports: ContentReportRow[];
  closed: ClosedRow[];
  /** En çok engellenen hesaplar — şikâyet gelmese bile bakılacak yer. */
  mostBlocked: { person: ReportedPerson; count: number }[];
};

const person = (r: Row, p: string): ReportedPerson => ({
  id: str(r[`${p}_id`]),
  username: str(r[`${p}_username`]),
  name: str(r[`${p}_name`]),
  joined: iso(r[`${p}_joined`]),
  guest: r[`${p}_guest`] === true,
});

/** Kişi sütunları — `alias` profil, `ualias` auth kullanıcısı. */
function who(prefix: string, idCol: string) {
  return sql.raw(`
    ${idCol} as ${prefix}_id,
    coalesce(${prefix}p.username, '') as ${prefix}_username,
    coalesce(${prefix}p.display_name, ${prefix}u.name, '') as ${prefix}_name,
    ${prefix}p.created_at as ${prefix}_joined,
    coalesce(${prefix}u."isAnonymous", false) as ${prefix}_guest`);
}
function joinWho(prefix: string, idCol: string) {
  return sql.raw(`
    left join profiles ${prefix}p on ${prefix}p.user_id = ${idCol}
    left join "user" ${prefix}u on ${prefix}u.id = ${idCol}`);
}

async function hasActionsTable(): Promise<boolean> {
  try {
    const r = await rows(sql`select to_regclass('public.moderation_actions') is not null as ok`);
    return r[0]?.ok === true;
  } catch {
    return false;
  }
}

export async function moderationData(): Promise<ModerationData> {
  const ready = await hasActionsTable();
  const openUser = ready
    ? sql`not exists (select 1 from moderation_actions m where m.target = 'user_report' and m.ref_id = r.id)`
    : sql`true`;

  const [ur, cr, closed, blocked] = await Promise.all([
    rows(sql`
      select r.id, r.created_at as at, r.reason, coalesce(r.detail, '') as detail,
        ${who("a", "r.reporter_id")}, ${who("b", "r.reported_id")},
        (select count(*) from user_reports x where x.reported_id = r.reported_id)::int as reports_against,
        (select count(*) from user_blocks k where k.blocked_id = r.reported_id)::int as blocked_by
      from user_reports r ${joinWho("a", "r.reporter_id")} ${joinWho("b", "r.reported_id")}
      where ${openUser}
      order by r.id desc limit 100`).catch(() => [] as Row[]),
    rows(sql`
      select r.id, r.created_at as at, r.kind, r.ref, r.reason, coalesce(r.content, '') as content,
        ${who("a", "r.user_id")}
      from content_reports r ${joinWho("a", "r.user_id")}
      where r.status = 'open'
      order by r.id desc limit 100`).catch(() => [] as Row[]),
    ready
      ? rows(sql`select target, ref_id, action, coalesce(actor, '') as actor, coalesce(note, '') as note,
          created_at as at from moderation_actions order by id desc limit 30`).catch(() => [] as Row[])
      : Promise.resolve([] as Row[]),
    rows(sql`
      select k.blocked_id as c_id, count(*)::int as n,
        coalesce(cp.username, '') as c_username, coalesce(cp.display_name, cu.name, '') as c_name,
        cp.created_at as c_joined, coalesce(cu."isAnonymous", false) as c_guest
      from user_blocks k ${joinWho("c", "k.blocked_id")}
      group by k.blocked_id, cp.username, cp.display_name, cu.name, cp.created_at, cu."isAnonymous"
      order by n desc limit 10`).catch(() => [] as Row[]),
  ]);

  return {
    ready,
    userReports: ur.map((r) => ({
      id: num(r.id), at: iso(r.at), reason: str(r.reason), detail: str(r.detail),
      reporter: person(r, "a"), reported: person(r, "b"),
      reportsAgainst: num(r.reports_against), blockedBy: num(r.blocked_by),
    })),
    contentReports: cr.map((r) => ({
      id: num(r.id), at: iso(r.at), kind: str(r.kind), ref: str(r.ref), reason: str(r.reason),
      content: str(r.content), reporter: person(r, "a"),
    })),
    closed: closed.map((r) => ({
      target: str(r.target), refId: num(r.ref_id), action: str(r.action), actor: str(r.actor), note: str(r.note), at: iso(r.at),
    })),
    mostBlocked: blocked.map((r) => ({ person: person(r, "c"), count: num(r.n) })),
  };
}

/** Panonun başlığındaki sayaç: açık şikâyet toplamı. Hata = 0 (pano açılsın). */
export async function openReportCount(): Promise<number> {
  try {
    const ready = await hasActionsTable();
    const r = await rows(sql`
      select
        (select count(*) from content_reports where status = 'open')::int
        + (select count(*) from user_reports r where ${ready
          ? sql`not exists (select 1 from moderation_actions m where m.target = 'user_report' and m.ref_id = r.id)`
          : sql`true`})::int as n`);
    return num(r[0]?.n);
  } catch {
    return 0;
  }
}

export type ModerationTarget = "content_report" | "user_report";
export type ModerationDecision = "resolved" | "dismissed";

/**
 * Bir şikâyeti kapatır. Aynı kayıt iki kez kapatılırsa ilk karar kalır
 * (benzersiz indeks) — iki sekmeden aynı anda basılan düğme kararı ezmesin.
 */
export async function closeReport(
  target: ModerationTarget,
  refId: number,
  action: ModerationDecision,
  actor: string | null,
  note: string | null,
): Promise<"ok" | "not_ready"> {
  const ready = await hasActionsTable();
  // İçerik bildiriminin kendi `status` sütunu var: karar kaydı yazılamasa da
  // kapanabiliyor. Kullanıcı şikâyetinin tek kapanma yeri karar tablosu.
  if (!ready && target === "user_report") return "not_ready";
  let first = false;
  if (ready) {
    const ins = await rows(sql`
      insert into moderation_actions (target, ref_id, action, actor, note)
      values (${target}, ${refId}, ${action}, ${actor}, ${note})
      on conflict (target, ref_id) do nothing
      returning id`);
    first = ins.length > 0;
  }
  let reporter: string | null = null;
  if (target === "content_report") {
    const upd = await rows(sql`update content_reports set status = 'closed' where id = ${refId} and status <> 'closed' returning user_id`);
    if (!ready) first = upd.length > 0;
    reporter = upd.length ? str(upd[0].user_id) : null;
    if (!reporter && first) {
      const r = await rows(sql`select user_id from content_reports where id = ${refId}`);
      reporter = r.length ? str(r[0].user_id) : null;
    }
  } else if (first) {
    const r = await rows(sql`select reporter_id from user_reports where id = ${refId}`);
    reporter = r.length ? str(r[0].reporter_id) : null;
  }
  /*
    BİLDİRENE SONUÇ (içerik denetimi CNT-7; DSA m.16(5), Şartlar §5 "karar
    bildirene iletilir"). Yalnız İLK kararda: aynı kaydı iki sekmeden kapatmak
    iki bildirim üretmesin. Gelen kutusuna düşüyor (her hesapta var, izin
    istemiyor); metin tarafsız, kimin bildirildiği yazmıyor. Hata kararı
    geri almaz: karar yazıldı, bildirim yalnız bir nezaket.
  */
  if (first && reporter) {
    await notify(reporter, { type: "report_closed", refType: target, refId }).catch((err) =>
      console.error("[moderation] report notice failed", refId, err),
    );
  }
  return "ok";
}

/**
 * İhlalli ad/kullanıcı adını SIFIRLAR ve şikâyeti "gereği yapıldı" diye kapatır.
 *
 * Mağaza kuralı yalnız şikâyeti okumayı değil İÇERİĞİ KALDIRABİLMEYİ de istiyor;
 * bu uygulamada kullanıcının başkasına görünen tek serbest metni görünen ad ve
 * kullanıcı adı. Önceden tek yol veritabanına elle bağlanmaktı.
 *
 * Kullanıcı adı boşalınca kişi yenisini seçebiliyor (14 günlük bekleme sayacı
 * değiştirilmiyor: yeni ad da süzgeçten geçecek). Eski değerler karar notuna
 * yazılıyor ki neyin kaldırıldığı sonradan görülebilsin.
 */
export async function resetReportedName(
  reportId: number,
  actor: string | null,
  note: string | null,
): Promise<"ok" | "not_ready" | "not_found"> {
  if (!(await hasActionsTable())) return "not_ready";
  const found = await rows(sql`
    select r.reported_id, coalesce(p.username, '') username, coalesce(p.display_name, '') display_name
    from user_reports r left join profiles p on p.user_id = r.reported_id where r.id = ${reportId}`);
  const row = found[0];
  if (!row) return "not_found";
  await db.execute(sql`update profiles set username = null, display_name = null where user_id = ${str(row.reported_id)}`);
  const removed = `ad sıfırlandı (eski: "${str(row.display_name)}" @${str(row.username)})`;
  await closeReport("user_report", reportId, "resolved", actor, note ? `${removed} · ${note}` : removed);
  return "ok";
}
