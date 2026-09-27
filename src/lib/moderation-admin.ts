import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { notify } from "@/lib/social/notify";
import { disableItem } from "@/lib/content/publish";

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
  /** Kullanıcının açıklaması (yeni istemci). */
  detail: string;
  /** İçerik geri bildirimi grubunun anahtarı — aynı hedefin öteki bildirimleri. */
  group: string;
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
  /** Açık öğrenme içeriği bildirimi (`kind = 'content'`) — ayrı sekmede (/admin/moderation/content). */
  openContentFeedback: number;
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

  const [ur, cr, closed, blocked, feedback] = await Promise.all([
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
        coalesce(r.detail, '') as detail, coalesce(r.group_key, 'legacy:' || r.kind || ':' || r.ref) as gkey,
        ${who("a", "r.user_id")}
      from content_reports r ${joinWho("a", "r.user_id")}
      where r.status = 'open' and r.kind <> 'content'
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
    rows(sql`select count(*)::int n from content_reports where status = 'open' and kind = 'content'`).catch(() => [] as Row[]),
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
      content: str(r.content), detail: str(r.detail), group: str(r.gkey), reporter: person(r, "a"),
    })),
    closed: closed.map((r) => ({
      target: str(r.target), refId: num(r.ref_id), action: str(r.action), actor: str(r.actor), note: str(r.note), at: iso(r.at),
    })),
    mostBlocked: blocked.map((r) => ({ person: person(r, "c"), count: num(r.n) })),
    openContentFeedback: num(feedback[0]?.n),
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
 * Saklama süresi dolan şikâyet kayıtları (hukuk denetimi LEG-17).
 *
 * Gizlilik §3 bildirim kayıtlarını "inceleme kapanana kadar" tutacağını
 * söylüyordu; kapanan satırları silen iş yoktu. Karar KAPANIŞTAN 1 YIL sonra
 * düşüyor: itiraz, tekrar eden hedefin geçmişi ve olası bir resmî soru için
 * makul bir pencere. Kapanış anı karar tablosundan (`moderation_actions.
 * created_at`); karar kaydı olmadan kapanmış eski içerik bildiriminde
 * oluşturulma anı. Kararın kendisi de (notunda eski ad olabilir) birlikte
 * gidiyor. Açık şikâyete dokunulmuyor. Günlük cron (api/cron/assess) çağırıyor;
 * tekrar çalışması zararsız.
 */
export async function purgeClosedReports(): Promise<{ content: number; user: number }> {
  const ready = await hasActionsTable();
  const content = await rows(sql`
    delete from content_reports c
    where c.status = 'closed'
      and coalesce(${ready
        ? sql`(select m.created_at from moderation_actions m where m.target = 'content_report' and m.ref_id = c.id)`
        : sql`null`}, c.created_at) < now() - interval '1 year'
    returning c.id`);
  let user: Row[] = [];
  if (ready) {
    user = await rows(sql`
      delete from user_reports r
      using moderation_actions m
      where m.target = 'user_report' and m.ref_id = r.id and m.created_at < now() - interval '1 year'
      returning r.id`);
    // Şikâyeti artık olmayan, bir yılı geçmiş kararlar (bu koşunun sildikleri
    // ve hesap silmede giden şikâyetlerin arkada kalan kararları).
    await db.execute(sql`
      delete from moderation_actions m
      where m.created_at < now() - interval '1 year'
        and ((m.target = 'content_report' and not exists (select 1 from content_reports c where c.id = m.ref_id))
          or (m.target = 'user_report' and not exists (select 1 from user_reports r where r.id = m.ref_id)))`);
  }
  return { content: content.length, user: user.length };
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

/* ───────────────────── İçerik geri bildirimi (docs/plan/content-feedback.md) ─────────────────────
 *
 * Her ekrandaki "Bildir" (`kind = 'content'`) ve eski yapay zekâ bildirimleri AYNI
 * tabloda; bu sekme onları HEDEFE GÖRE gruplu okuyor: aynı soruyu beş kişinin
 * bildirmesi beş iş değil tek iş. Grup anahtarı `group_key`; o sütundan önceki
 * satırlarda `legacy:<kind>:<ref>` (eski istemci hedef göndermiyordu).
 *
 * Süzgeçler SATIR düzeyinde uygulanıyor, sonra gruplanıyor: "açık" sekmesi grubun
 * açık bildirimlerini sayıyor, kapalıları değil.
 */

export const CONTENT_PAGE_SIZE = 50;

export type ContentQuery = {
  status: "open" | "closed" | "all";
  surface: string;
  reason: string;
  course: string;
  native: string;
  platform: string;
  /** YYYY-MM-DD, İstanbul günü değil UTC günü (sorgu `created_at::date`). */
  from: string;
  to: string;
  q: string;
  page: number;
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const TOKEN = /^[a-z0-9_-]{1,24}$/i;
const DAY = /^\d{4}-\d{2}-\d{2}$/;

/** Adres parametreleri → sorgu. Tanınmayan değer süzgeci kapatıyor (boş), 400 değil: panel adresi elle yazılabiliyor. */
export function parseContentQuery(sp: Record<string, string | string[] | undefined>): ContentQuery {
  const status = one(sp.durum);
  const tok = (k: string) => (TOKEN.test(one(sp[k])) ? one(sp[k]) : "");
  const day = (k: string) => (DAY.test(one(sp[k])) ? one(sp[k]) : "");
  const page = Math.max(1, Math.min(10_000, Number.parseInt(one(sp.sayfa), 10) || 1));
  return {
    status: status === "closed" || status === "all" ? status : "open",
    surface: tok("yuzey"),
    reason: tok("neden"),
    course: tok("kurs"),
    native: tok("anadil"),
    platform: tok("platform"),
    from: day("bas"),
    to: day("son"),
    q: one(sp.q).trim().slice(0, 120),
    page,
  };
}

/** Sorgu → adres parametreleri (sayfa, CSV ve süzgeç bağlantıları aynı kuralı kullanıyor). */
export function contentQueryParams(q: ContentQuery, patch: Partial<ContentQuery> = {}): URLSearchParams {
  const n = { ...q, ...patch };
  const p = new URLSearchParams();
  if (n.status !== "open") p.set("durum", n.status);
  if (n.surface) p.set("yuzey", n.surface);
  if (n.reason) p.set("neden", n.reason);
  if (n.course) p.set("kurs", n.course);
  if (n.native) p.set("anadil", n.native);
  if (n.platform) p.set("platform", n.platform);
  if (n.from) p.set("bas", n.from);
  if (n.to) p.set("son", n.to);
  if (n.q) p.set("q", n.q);
  if (n.page > 1) p.set("sayfa", String(n.page));
  return p;
}

/** Grup anahtarı ifadesi: yeni satırda `group_key`, eskide `legacy:<kind>:<ref>`. */
const GKEY = sql.raw(`coalesce(r.group_key, 'legacy:' || r.kind || ':' || r.ref)`);

function contentWhere(q: ContentQuery) {
  const parts = [sql`true`];
  if (q.status !== "all") parts.push(sql`r.status = ${q.status}`);
  if (q.surface) parts.push(q.surface === "-" ? sql`r.surface is null` : sql`r.surface = ${q.surface}`);
  if (q.reason) parts.push(sql`r.reason = ${q.reason}`);
  if (q.course) parts.push(sql`r.course = ${q.course}`);
  if (q.native) parts.push(sql`r.native_lang = ${q.native}`);
  if (q.platform) parts.push(sql`r.platform = ${q.platform}`);
  if (q.from) parts.push(sql`r.created_at >= ${q.from}::date`);
  if (q.to) parts.push(sql`r.created_at < ${q.to}::date + 1`);
  if (q.q) {
    const like = `%${q.q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
    parts.push(sql`(r.target_id ilike ${like} or r.ref ilike ${like} or r.group_key ilike ${like}
      or r.content ilike ${like} or r.detail ilike ${like} or r.item ilike ${like})`);
  }
  return sql.join(parts, sql` and `);
}

export type ContentGroupRow = {
  key: string;
  kind: string;
  targetType: string;
  targetId: string;
  targetSub: string;
  /** Eski satır: hedef yok, `ref` var. */
  ref: string;
  surfaces: string[];
  topReason: string;
  reasons: Record<string, number>;
  count: number;
  open: number;
  first: string;
  last: string;
  courses: string[];
  natives: string[];
  platforms: string[];
  pack: string;
  item: string;
  /** En yeni bildirimin anlık görüntüsünden kısa parça — "hangi soru" diye tanımak için. */
  sample: string;
};

const arr = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x) => x != null && x !== "").map(String) : []);

function groupRow(r: Row): ContentGroupRow {
  const reasons: Record<string, number> = {};
  for (const [k, v] of Object.entries((r.reasons as Record<string, unknown>) ?? {})) reasons[k] = num(v);
  const top = Object.entries(reasons).sort((a, b) => b[1] - a[1])[0];
  return {
    key: str(r.gkey),
    kind: str(r.kind),
    targetType: str(r.target_type),
    targetId: str(r.target_id),
    targetSub: str(r.target_sub),
    ref: str(r.ref),
    surfaces: arr(r.surfaces),
    topReason: top ? top[0] : "",
    reasons,
    count: num(r.n),
    open: num(r.open_n),
    first: iso(r.first),
    last: iso(r.last),
    courses: arr(r.courses),
    natives: arr(r.natives),
    platforms: arr(r.platforms),
    pack: str(r.pack),
    item: str(r.item),
    sample: str(r.sample).replace(/\s+/g, " ").slice(0, 160),
  };
}

/** Bir grubun özet sütunları — liste ve CSV aynı sorguyu kullanıyor. */
function groupSelect(where: ReturnType<typeof sql>) {
  return sql`
    with f as (select r.*, ${GKEY} as gkey from content_reports r where ${where}),
    rc as (select gkey, reason, count(*)::int c from f group by gkey, reason)
    select f.gkey,
      count(*)::int n,
      count(*) filter (where f.status = 'open')::int open_n,
      min(f.created_at) first, max(f.created_at) last,
      (select jsonb_object_agg(rc.reason, rc.c) from rc where rc.gkey = f.gkey) reasons,
      max(f.kind) kind, max(f.ref) ref, max(f.target_type) target_type, max(f.target_id) target_id, max(f.target_sub) target_sub,
      max(f.pack) pack, max(f.item) item,
      array_remove(array_agg(distinct f.surface), null) surfaces,
      array_remove(array_agg(distinct f.course), null) courses,
      array_remove(array_agg(distinct f.native_lang), null) natives,
      array_remove(array_agg(distinct f.platform), null) platforms,
      (array_agg(coalesce(f.content, f.detail, '') order by f.created_at desc))[1] sample,
      count(*) over ()::int total
    from f group by f.gkey`;
}

export type ContentFeedbackList = {
  groups: ContentGroupRow[];
  total: number;
  /** Süzgeç seçenekleri: tabloda gerçekten geçen değerler. */
  options: { surfaces: string[]; reasons: string[]; courses: string[]; natives: string[]; platforms: string[] };
  /** Açık bildirim / açık grup — başlık satırı. */
  openReports: number;
  openGroups: number;
  error: string | null;
};

export async function contentFeedbackList(q: ContentQuery): Promise<ContentFeedbackList> {
  const empty: ContentFeedbackList = {
    groups: [], total: 0, options: { surfaces: [], reasons: [], courses: [], natives: [], platforms: [] }, openReports: 0, openGroups: 0, error: null,
  };
  try {
    const [list, opts, head] = await Promise.all([
      rows(sql`${groupSelect(contentWhere(q))}
        order by max(f.created_at) desc, f.gkey
        limit ${CONTENT_PAGE_SIZE} offset ${(q.page - 1) * CONTENT_PAGE_SIZE}`),
      rows(sql`select
        array_remove(array_agg(distinct surface), null) surfaces, array_agg(distinct reason) reasons,
        array_remove(array_agg(distinct course), null) courses, array_remove(array_agg(distinct native_lang), null) natives,
        array_remove(array_agg(distinct platform), null) platforms
        from content_reports`),
      rows(sql`select count(*)::int n, count(distinct ${GKEY})::int g from content_reports r where r.status = 'open'`),
    ]);
    const o = opts[0] ?? {};
    return {
      groups: list.map(groupRow),
      total: num(list[0]?.total),
      options: { surfaces: arr(o.surfaces).sort(), reasons: arr(o.reasons).sort(), courses: arr(o.courses).sort(), natives: arr(o.natives).sort(), platforms: arr(o.platforms).sort() },
      openReports: num(head[0]?.n),
      openGroups: num(head[0]?.g),
      error: null,
    };
  } catch (err) {
    console.error("[moderation] content list", err);
    return { ...empty, error: (err as Error).message?.slice(0, 200) ?? "sorgu başarısız" };
  }
}

/** CSV: süzgecin TAMAMI (sayfa değil), en çok 5000 grup. */
export async function contentFeedbackCsv(q: ContentQuery): Promise<string> {
  const list = (await rows(sql`${groupSelect(contentWhere(q))} order by max(f.created_at) desc, f.gkey limit 5000`)).map(groupRow);
  const cell = (v: string | number) => {
    const t = String(v);
    /* Hesap tablosunda formül olarak çalışmasın (CSV enjeksiyonu): =, +, -, @ ile başlayan hücre tırnak + kesme işareti. */
    const safe = /^[=+\-@\t\r]/.test(t) ? `'${t}` : t;
    return /[",\n;]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
  };
  const head = ["grup", "tur", "hedef_turu", "hedef", "alt", "yuzeyler", "en_sik_neden", "nedenler", "bildirim", "acik", "ilk", "son", "kurslar", "anadiller", "platformlar", "paket", "madde", "ornek"];
  const lines = [head.join(",")];
  for (const g of list) {
    lines.push([
      g.key, g.kind, g.targetType, g.targetId || g.ref, g.targetSub, g.surfaces.join(" "), g.topReason,
      Object.entries(g.reasons).map(([k, v]) => `${k}:${v}`).join(" "), g.count, g.open, g.first, g.last,
      g.courses.join(" "), g.natives.join(" "), g.platforms.join(" "), g.pack, g.item, g.sample,
    ].map(cell).join(","));
  }
  return "﻿" + lines.join("\n");
}

export type ContentReportDetail = {
  id: number;
  at: string;
  status: string;
  kind: string;
  reason: string;
  ref: string;
  surface: string;
  targetType: string;
  targetId: string;
  targetSub: string;
  game: string;
  detail: string;
  content: string;
  platform: string;
  appVersion: string;
  course: string;
  nativeLang: string;
  contentVersion: number | null;
  reporter: ReportedPerson;
  decision: { action: string; actor: string; note: string; at: string } | null;
};

export type ContentGroupDetail = {
  key: string;
  summary: ContentGroupRow | null;
  reports: ContentReportDetail[];
  /** `content_flags` satırı: madde kapatılmış mı, kim, neden. */
  flag: { reason: string; by: string; at: string } | null;
  ready: boolean;
};

/** Grup anahtarının biçimi: `group_key` ya da `legacy:<kind>:<ref>`; ikisi de ≤ ~250 karakter. */
export function isGroupKey(v: unknown): v is string {
  return typeof v === "string" && v.length > 2 && v.length <= 300 && !/[\u0000-\u001f]/.test(v);
}

export async function contentGroupDetail(key: string): Promise<ContentGroupDetail> {
  const ready = await hasActionsTable();
  const [sum, list] = await Promise.all([
    rows(sql`${groupSelect(sql`${GKEY} = ${key}`)}`),
    rows(sql`
      select r.id, r.created_at as at, r.status, r.kind, r.reason, r.ref, r.surface, r.target_type, r.target_id, r.target_sub, r.game,
        r.detail, r.content, r.platform, r.app_version, r.course, r.native_lang, r.content_version,
        ${ready
          ? sql`m.action as m_action, m.actor as m_actor, m.note as m_note, m.created_at as m_at,`
          : sql`null as m_action, null as m_actor, null as m_note, null as m_at,`}
        ${who("a", "r.user_id")}
      from content_reports r ${joinWho("a", "r.user_id")}
      ${ready ? sql`left join moderation_actions m on m.target = 'content_report' and m.ref_id = r.id` : sql``}
      where ${GKEY} = ${key}
      order by r.id desc limit 500`),
  ]);
  const summary = sum.length ? groupRow(sum[0]) : null;
  let flag: ContentGroupDetail["flag"] = null;
  if (summary?.pack && summary.item) {
    const f = await rows(sql`select reason, disabled_by, created_at from content_flags where pack = ${summary.pack} and item = ${summary.item}`).catch(() => [] as Row[]);
    if (f[0]) flag = { reason: str(f[0].reason), by: str(f[0].disabled_by), at: iso(f[0].created_at) };
  }
  return {
    key,
    summary,
    ready,
    flag,
    reports: list.map((r) => ({
      id: num(r.id), at: iso(r.at), status: str(r.status), kind: str(r.kind), reason: str(r.reason), ref: str(r.ref),
      surface: str(r.surface), targetType: str(r.target_type), targetId: str(r.target_id), targetSub: str(r.target_sub), game: str(r.game),
      detail: str(r.detail), content: str(r.content), platform: str(r.platform), appVersion: str(r.app_version), course: str(r.course),
      nativeLang: str(r.native_lang), contentVersion: r.content_version == null ? null : num(r.content_version),
      reporter: person(r, "a"),
      decision: r.m_action ? { action: str(r.m_action), actor: str(r.m_actor), note: str(r.m_note), at: iso(r.m_at) } : null,
    })),
  };
}

/**
 * GRUBU KAPATIR: gruptaki bütün AÇIK bildirimler aynı kararla kapanıyor.
 *
 * Bildirene sonuç kişi başına BİR KEZ (aynı kişi aynı hedefi farklı günlerde iki
 * kez bildirmiş olabilir; iki gelen kutusu satırı gürültü). Bu yüzden
 * `closeReport` tek tek çağrılmıyor: kararlar yazılıyor, sonra her bildirene
 * kendi ilk kapanan bildirimi üzerinden tek `report_closed` gidiyor (gelen
 * kutusu kararı `moderation_actions`tan okuyor, bkz. `social/notify`).
 */
export async function closeContentGroup(
  key: string,
  action: ModerationDecision,
  actor: string | null,
  note: string | null,
): Promise<{ closed: number; notified: number }> {
  const ready = await hasActionsTable();
  const open = await rows(sql`select r.id, r.user_id from content_reports r where ${GKEY} = ${key} and r.status = 'open' order by r.id`);
  const firstByUser = new Map<string, number>();
  let closed = 0;
  for (const r of open) {
    const id = num(r.id);
    let first = true;
    if (ready) {
      const ins = await rows(sql`
        insert into moderation_actions (target, ref_id, action, actor, note)
        values ('content_report', ${id}, ${action}, ${actor}, ${note})
        on conflict (target, ref_id) do nothing
        returning id`);
      first = ins.length > 0;
    }
    const upd = await rows(sql`update content_reports set status = 'closed' where id = ${id} and status <> 'closed' returning id`);
    if (upd.length) closed++;
    if (!ready) first = upd.length > 0;
    const uid = str(r.user_id);
    if (first && uid && !firstByUser.has(uid)) firstByUser.set(uid, id);
  }
  let notified = 0;
  for (const [uid, refId] of firstByUser) {
    try {
      await notify(uid, { type: "report_closed", refType: "content_report", refId });
      notified++;
    } catch (err) {
      console.error("[moderation] report notice failed", refId, err);
    }
  }
  return { closed, notified };
}

/**
 * "İÇERİĞİ KAPAT": grubun hedefi içerik hattında türetilebildiyse (`pack/item`)
 * maddeyi yayından kaldırır (`content_flags`, sebep `reported`) ve grubu "gereği
 * yapıldı" diye kapatır; karar notuna neyin kapatıldığı yazılıyor. Geri almak
 * `/admin/content`teki "aç".
 */
export async function disableContentGroup(
  key: string,
  actor: string | null,
  note: string | null,
): Promise<"ok" | "not_found" | "no_target"> {
  const r = await rows(sql`select max(r.pack) pack, max(r.item) item, count(*)::int n from content_reports r where ${GKEY} = ${key}`);
  if (!r[0] || num(r[0].n) === 0) return "not_found";
  const pack = str(r[0].pack);
  const item = str(r[0].item);
  if (!pack || !item) return "no_target";
  await disableItem(pack, item, "reported", actor);
  const done = `içerik kapatıldı (${pack}:${item})`;
  await closeContentGroup(key, "resolved", actor, note ? `${done} · ${note}` : done);
  return "ok";
}
