import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { closeContentReportIds, finishReleaseHold } from "@/lib/moderation-admin";
import { closeClaudeTask } from "@/lib/claude-tasks";

/**
 * SONRAKİ SÜRÜMDE DÜZELECEK (2026-10-06, Samet: "bir sonraki sürümde düzelecekler,
 * bunu doğru planlamak önemli").
 *
 * Düzeltmesi mobil build'de olan bir bildirimi şimdi kapatmak, bildirene
 * "düzeltildi" deyip telefonundaki eski uygulamada hatayı göstermeye devam etmek
 * demekti. Bunun yerine panelde "Build N'de düzelecek" deniyor ve:
 *  - iş "Sürüm bekliyor" bölümüne iner; yanıt süresi ve gecikme uyarısı durur
 *    (düzeltme yapıldı, iş bizden çıktı; `response-queue` bekleyeni saymıyor);
 *  - HER BİLDİREN AYRI kapanır: uygulaması N'e geçtiği an (`recordClient`,
 *    açılışta) o kişinin bildirimleri "gereği yapıldı" ile kapanır ve sonucu
 *    gider. Mesaj söylendiği anda doğru; yeni metin ya da build gerekmiyor;
 *  - web'den (ya da platformu bilinmeyen) bildiren ve zaten N'e geçmiş olan
 *    bekleme kurulurken kapanır;
 *  - hepsi kapanınca bekleme `done`; 30. gününde güncellememiş bildiren kalırsa
 *    uyarı motoru bir kez hatırlatır (`staleReleaseHolds`).
 * Elle kapatma her zaman mümkün (`closeContentGroup`/`closeReport` beklemeyi bitirir).
 */

export type HoldQueue = "content_feedback" | "ai_report";
export const HOLD_QUEUES: HoldQueue[] = ["content_feedback", "ai_report"];
export const isHoldQueue = (v: unknown): v is HoldQueue => typeof v === "string" && (HOLD_QUEUES as string[]).includes(v);

const MOBILE = ["android", "ios"];
const REMIND_AFTER_DAYS = 30;

type Row = Record<string, unknown>;
async function rows(q: ReturnType<typeof sql>): Promise<Row[]> {
  const r = (await db.execute(q)) as unknown;
  if (Array.isArray(r)) return r as Row[];
  return ((r as { rows?: Row[] }).rows ?? []) as Row[];
}
const num = (v: unknown) => Number(v) || 0;
const str = (v: unknown) => (v == null ? "" : String(v));

export type HoldView = { build: number; note: string | null; at: string; open: number; reporters: number; updated: number };

/** Beklemenin kapsamındaki açık bildirimler (+ bildirenin o platformdaki güncel build'i). */
function scope(queue: HoldQueue, ref: string) {
  const where =
    queue === "content_feedback"
      ? sql`coalesce(r.group_key, 'legacy:' || r.kind || ':' || r.ref) = ${ref}`
      : sql`r.id = ${Number(ref) || 0}`;
  return sql`select r.id, r.user_id, r.platform, c.build
    from content_reports r left join user_clients c on c.user_id = r.user_id and c.platform = r.platform
    where ${where} and r.status = 'open'`;
}

const noteFor = (build: number, note: string | null) => {
  const head = `build ${build} ile düzeldi (bildirenin uygulaması güncellendi)`;
  return note ? `${head} · ${note}` : head;
};

/**
 * Kapsamda kapanabilecekleri kapatır: web/bilinmeyen platform ya da build'i yeten.
 * `onlyUser` verilirse yalnız o kişinin bildirimleri (açılışta çağrılan yol).
 */
async function settle(id: number, queue: HoldQueue, ref: string, build: number, note: string | null, actor: string | null, onlyUser?: string) {
  const open = await rows(scope(queue, ref));
  const ready = open.filter(
    (r) => (!onlyUser || str(r.user_id) === onlyUser) && (!MOBILE.includes(str(r.platform)) || num(r.build) >= build),
  );
  let closed = 0;
  if (ready.length) closed = (await closeContentReportIds(ready.map((r) => num(r.id)), "resolved", actor ?? "sürüm", noteFor(build, note))).closed;
  if (open.length - closed <= 0) {
    await finishReleaseHold(queue, ref);
    await closeClaudeTask(queue, ref);
    await db.execute(sql`update release_holds set status = 'done', done_at = now(), updated_at = now() where id = ${id} and status = 'waiting'`);
  }
  return { closed, left: Math.max(0, open.length - closed) };
}

/** "Build N'de düzelecek": beklemeyi kurar (ya da build/notu günceller), hemen kapanabilecekleri kapatır. */
export async function holdForRelease(queue: HoldQueue, ref: string, build: number, note: string | null, actor: string | null) {
  const [h] = await rows(sql`
    insert into release_holds (queue, ref, build, note, actor)
    values (${queue}, ${ref}, ${build}, ${note}, ${actor})
    on conflict (queue, ref) do update
      set build = excluded.build, note = excluded.note, actor = excluded.actor, status = 'waiting',
          created_at = now(), done_at = null, updated_at = now()
    returning id`);
  return settle(num(h.id), queue, ref, build, note, actor);
}

/** Geri al: iş normal kuyruğa döner (yanıt süresi ilk bildirimden işlemeye devam). */
export async function cancelReleaseHold(queue: HoldQueue, ref: string): Promise<boolean> {
  const r = await rows(sql`update release_holds set status = 'cancelled', updated_at = now()
    where queue = ${queue} and ref = ${ref} and status = 'waiting' returning id`);
  return r.length > 0;
}

/**
 * AÇILIŞTA (`recordClient`): bu kişinin bu platformdaki build'i bir beklemeyi
 * karşılıyorsa onun bildirimleri kapanır, sonuç gider. Çoğu açılışta bekleyen
 * yok: tek ucuz sorgu.
 */
export async function releaseForUser(userId: string, platform: string, build: number): Promise<number> {
  if (!MOBILE.includes(platform)) return 0;
  const holds = await rows(sql`
    select distinct h.id, h.queue, h.ref, h.build, h.note, h.actor
    from release_holds h
    join content_reports r on r.status = 'open' and r.user_id = ${userId} and r.platform = ${platform}
      and ((h.queue = 'content_feedback' and coalesce(r.group_key, 'legacy:' || r.kind || ':' || r.ref) = h.ref)
        or (h.queue = 'ai_report' and r.id::text = h.ref))
    where h.status = 'waiting' and h.build <= ${build}`);
  let closed = 0;
  for (const h of holds) {
    const q = str(h.queue);
    if (!isHoldQueue(q)) continue;
    closed += (await settle(num(h.id), q, str(h.ref), num(h.build), h.note == null ? null : str(h.note), h.actor == null ? null : str(h.actor), userId)).closed;
  }
  return closed;
}

/** Gelen kutusu için: bekleyenler, anahtar `queue:ref`; kaç bildiren kaldı, kaçı güncelledi. */
export async function openReleaseHolds(): Promise<Map<string, HoldView>> {
  const hs = await rows(sql`select id, queue, ref, build, note, created_at from release_holds where status = 'waiting'`);
  const out = new Map<string, HoldView>();
  for (const h of hs) {
    const q = str(h.queue);
    if (!isHoldQueue(q)) continue;
    const open = await rows(scope(q, str(h.ref)));
    const people = new Set(open.map((r) => str(r.user_id)));
    const updated = new Set(open.filter((r) => num(r.build) >= num(h.build)).map((r) => str(r.user_id)));
    out.set(`${q}:${str(h.ref)}`, {
      build: num(h.build),
      note: h.note == null ? null : str(h.note),
      at: new Date(String(h.created_at)).toISOString(),
      open: open.length,
      reporters: people.size,
      updated: updated.size,
    });
  }
  return out;
}

/** Panelin önerisi: görülen en yüksek build + 1 (düzeltme bir sonraki build'de). */
export async function suggestedBuild(): Promise<number> {
  const [r] = await rows(sql`select max(build) b from user_clients where platform in ('android', 'ios')`);
  return num(r?.b) + 1;
}

/**
 * Uyarı motoru: 30. gününü dolduran (30-31 gün arası), hâlâ bekleyen beklemeler.
 * YAZMIYOR: `collectAlerts` panelde de koşuyor, "hatırlatıldı" işareti orada
 * harcanırdı. Pencere bir gün; tek seferlik `err-` anahtarı o gün bir kez gider.
 */
export async function staleReleaseHolds(): Promise<{ id: number; queue: string; ref: string; build: number }[]> {
  const rs = await rows(sql`
    select id, queue, ref, build from release_holds
    where status = 'waiting'
      and created_at <= now() - make_interval(days => ${REMIND_AFTER_DAYS})
      and created_at > now() - make_interval(days => ${REMIND_AFTER_DAYS + 1})`);
  return rs.map((r) => ({ id: num(r.id), queue: str(r.queue), ref: str(r.ref), build: num(r.build) }));
}
