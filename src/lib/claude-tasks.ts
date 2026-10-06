import "server-only";
import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { claudeTasks } from "@/lib/db/schema";
import { slaState, type QueueId } from "@/lib/response-sla";

/**
 * CLAUDE'A BIRAKILAN İŞLER (2026-10-06, Samet).
 *
 * Panelde bir bildirim "Claude'a bırak" ile bu kuyruğa düşüyor. Kurallar (Samet):
 *  - Bildirim KAPANMIYOR, beklemeye alınıyor; yanıt süresi işlemeye DEVAM ediyor
 *    (kullanıcı hâlâ bekliyor). Claude'un listesi en yakın son tarihten başlıyor,
 *    son tarihe 24 saat kala uyarı motoru hatırlatıyor (`lib/alerts` `claude`).
 *  - Claude işi yapınca durumu `done` yapıyor ve ne yaptığını yazıyor; bildirim
 *    Samet'in gelen kutusunda "Claude bitirdi, kontrol et" diye öne çıkıyor.
 *    Kapatma ve kullanıcıya giden sonuç Samet'in kararıyla.
 *  - Bildirim kapanınca (`closeReport`, `closeContentGroup`) görev `closed`.
 *
 * Claude'un ucu: `npm run claude:tasks -- list` / `done <id> <not>` (sunucuda,
 * `scripts/claude-tasks.ts`).
 */

export type ClaudeQueue = Extract<QueueId, "content_feedback" | "ai_report" | "user_report">;
export const CLAUDE_QUEUES: ClaudeQueue[] = ["content_feedback", "ai_report", "user_report"];
export type ClaudeStatus = "waiting" | "done" | "closed" | "cancelled";

export type ClaudeTask = {
  id: number;
  queue: ClaudeQueue;
  ref: string;
  status: ClaudeStatus;
  note: string | null;
  result: string | null;
  assignedBy: string | null;
  createdAt: string;
  doneAt: string | null;
};

export const taskKey = (queue: string, ref: string) => `${queue}:${ref}`;

export function isClaudeQueue(v: unknown): v is ClaudeQueue {
  return typeof v === "string" && (CLAUDE_QUEUES as string[]).includes(v);
}

function view(r: typeof claudeTasks.$inferSelect): ClaudeTask {
  return {
    id: r.id,
    queue: r.queue as ClaudeQueue,
    ref: r.ref,
    status: r.status as ClaudeStatus,
    note: r.note,
    result: r.result,
    assignedBy: r.assignedBy,
    createdAt: r.createdAt.toISOString(),
    doneAt: r.doneAt ? r.doneAt.toISOString() : null,
  };
}

/** Bırak (ya da yeniden bırak): durum `waiting`, önceki sonuç silinir. */
export async function assignToClaude(queue: ClaudeQueue, ref: string, note: string | null, actor: string | null): Promise<ClaudeTask> {
  const [r] = await db
    .insert(claudeTasks)
    .values({ queue, ref, status: "waiting", note, assignedBy: actor })
    .onConflictDoUpdate({
      target: [claudeTasks.queue, claudeTasks.ref],
      set: { status: "waiting", note, result: null, doneAt: null, assignedBy: actor, updatedAt: sql`now()` },
    })
    .returning();
  return view(r);
}

/** Geri al: görev iptal, bildirim normal kuyrukta. */
export async function cancelClaudeTask(queue: ClaudeQueue, ref: string): Promise<boolean> {
  const r = await db
    .update(claudeTasks)
    .set({ status: "cancelled", updatedAt: sql`now()` })
    .where(and(eq(claudeTasks.queue, queue), eq(claudeTasks.ref, ref), inArray(claudeTasks.status, ["waiting", "done"])))
    .returning({ id: claudeTasks.id });
  return r.length > 0;
}

/** Bildirim kapandı: açık görev de kapanır. Tablo yoksa (göç uygulanmamış) sessiz. */
export async function closeClaudeTask(queue: ClaudeQueue, ref: string): Promise<void> {
  await db
    .update(claudeTasks)
    .set({ status: "closed", updatedAt: sql`now()` })
    .where(and(eq(claudeTasks.queue, queue), eq(claudeTasks.ref, ref), inArray(claudeTasks.status, ["waiting", "done"])))
    .catch((err) => console.error("[claude-tasks] kapatılamadı", queue, ref, err));
}

/** Claude bitirdi: `done` + not. Yalnız bekleyen görevde. */
export async function markClaudeDone(id: number, result: string): Promise<ClaudeTask | null> {
  const [r] = await db
    .update(claudeTasks)
    .set({ status: "done", result: result.slice(0, 4000), doneAt: sql`now()`, updatedAt: sql`now()` })
    .where(and(eq(claudeTasks.id, id), eq(claudeTasks.status, "waiting")))
    .returning();
  return r ? view(r) : null;
}

/** Açık görevler (bekleyen ve bitmiş), anahtar `queue:ref`. Gelen kutusu satırlara ekliyor. */
export async function openClaudeTasks(): Promise<Map<string, ClaudeTask>> {
  const rs = await db.select().from(claudeTasks).where(inArray(claudeTasks.status, ["waiting", "done"]));
  return new Map(rs.map((r) => [taskKey(r.queue, r.ref), view(r)]));
}

/** Bildirimin başladığı an (yanıt süresinin başlangıcı): grubun ilk açık bildirimi ya da bildirimin kendisi. */
async function startedAt(queue: ClaudeQueue, ref: string): Promise<string | null> {
  const q =
    queue === "content_feedback"
      ? sql`select min(created_at) at from content_reports where coalesce(group_key, 'legacy:' || kind || ':' || ref) = ${ref} and status = 'open'`
      : queue === "ai_report"
        ? sql`select created_at at from content_reports where id = ${Number(ref) || 0}`
        : sql`select created_at at from user_reports where id = ${Number(ref) || 0}`;
  const r = (await db.execute(q)) as unknown as { rows?: { at: Date | string | null }[] } | { at: Date | string | null }[];
  const row = Array.isArray(r) ? r[0] : r.rows?.[0];
  if (!row?.at) return null;
  return new Date(row.at).toISOString();
}

/** Bekleyen görevler + yanıt süresinin dolacağı an; en yakın son tarih önce. */
export async function claudeQueue(status: ClaudeStatus = "waiting", now = Date.now()): Promise<(ClaudeTask & { started: string | null; due: number | null })[]> {
  const rs = await db.select().from(claudeTasks).where(eq(claudeTasks.status, status));
  const out = [];
  for (const r of rs) {
    const t = view(r);
    const started = await startedAt(t.queue, t.ref);
    const due = started ? (slaState(t.queue, started, now)?.due ?? null) : null;
    out.push({ ...t, started, due });
  }
  return out.sort((a, b) => (a.due ?? Infinity) - (b.due ?? Infinity));
}
