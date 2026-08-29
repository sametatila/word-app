import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";

/**
 * Dönüşüm hunisi ölçümü (WP-90, dönüşüm planı §4). Ham olaylar hem web hem
 * mobilden `events` tablosuna yazılıyor; burada okunur ve huni çıkarılır:
 * aktivasyon (ilk turu bitiren), D1/D7/D30 retention, paywall görüntüleme →
 * satın alma. Sorgular defansif — biri düşse bile sayfa açılır.
 */
export type Funnel = {
  totalUsers: number;
  activated: number;
  paywallView: number;
  purchaseStart: number;
  purchaseDone: number;
  d1: number;
  d7: number;
  d30: number;
  retentionBase: number;
  topEvents: { name: string; count: number }[];
};

const ZERO: Funnel = { totalUsers: 0, activated: 0, paywallView: 0, purchaseStart: 0, purchaseDone: 0, d1: 0, d7: 0, d30: 0, retentionBase: 0, topEvents: [] };

export async function computeFunnel(): Promise<Funnel> {
  const out: Funnel = { ...ZERO, topEvents: [] };

  try {
    const [t] = await db
      .select({
        totalUsers: sql<number>`count(distinct ${events.userId})::int`,
        activated: sql<number>`count(distinct ${events.userId}) filter (where ${events.name} = 'session_done')::int`,
        paywallView: sql<number>`count(distinct ${events.userId}) filter (where ${events.name} = 'paywall_view')::int`,
        purchaseStart: sql<number>`count(distinct ${events.userId}) filter (where ${events.name} = 'purchase_start')::int`,
        purchaseDone: sql<number>`count(distinct ${events.userId}) filter (where ${events.name} = 'purchase_done')::int`,
      })
      .from(events);
    if (t) {
      out.totalUsers = Number(t.totalUsers) || 0;
      out.activated = Number(t.activated) || 0;
      out.paywallView = Number(t.paywallView) || 0;
      out.purchaseStart = Number(t.purchaseStart) || 0;
      out.purchaseDone = Number(t.purchaseDone) || 0;
    }
  } catch (err) {
    console.error("[funnel] toplamlar", err);
  }

  try {
    const top = await db
      .select({ name: events.name, count: sql<number>`count(*)::int` })
      .from(events)
      .groupBy(events.name)
      .orderBy(sql`count(*) desc`)
      .limit(12);
    out.topEvents = top.map((r) => ({ name: String(r.name), count: Number(r.count) || 0 }));
  } catch (err) {
    console.error("[funnel] top olaylar", err);
  }

  // Retention: kullanıcının ilk günü (d0); d0+1 / d0+7 / d0+30'da tekrar aktif mi.
  try {
    const res = await db.execute(sql`
      with firsts as (select user_id, min(day) as d0 from ${events} group by user_id),
           act as (select distinct user_id, day from ${events})
      select
        count(*)::int as base,
        count(*) filter (where exists (select 1 from act a where a.user_id = f.user_id and a.day = f.d0 + 1))::int as d1,
        count(*) filter (where exists (select 1 from act a where a.user_id = f.user_id and a.day = f.d0 + 7))::int as d7,
        count(*) filter (where exists (select 1 from act a where a.user_id = f.user_id and a.day = f.d0 + 30))::int as d30
      from firsts f
    `);
    const rows = (Array.isArray(res) ? res : (res as { rows?: unknown[] }).rows) ?? [];
    const row = (rows[0] ?? {}) as { base?: number; d1?: number; d7?: number; d30?: number };
    const base = Number(row.base) || 0;
    out.retentionBase = base;
    out.d1 = base ? Math.round((Number(row.d1) / base) * 100) : 0;
    out.d7 = base ? Math.round((Number(row.d7) / base) * 100) : 0;
    out.d30 = base ? Math.round((Number(row.d30) / base) * 100) : 0;
  } catch (err) {
    console.error("[funnel] retention", err);
  }

  return out;
}
