import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import type { StoreEvent } from "./ports";

/**
 * Gelir defteri — webhook'a gelen her mağaza olayı `store_events`e.
 *
 * `entitlements` yalnız ŞU ANKİ durumu tutuyor ("kim ne zamana kadar
 * premium"); gelir, deneme dönüşümü, iptal ve iade ancak olay geçmişinden
 * hesaplanabiliyor. Defter yetkiyi etkilemiyor: yazılamazsa webhook yine
 * yetkiyi uyguluyor (hata loga düşüyor), tekrar teslimat (aynı olay kimliği)
 * tek satır.
 *
 * `period_type` sütununa deneme dönüşümü ayrı değer olarak yazılıyor
 * (`trial_conversion`): denemeden ücretliye geçen yenileme, sıradan
 * yenilemeden ayrı sayılmalı ve ayrı bir sütun açmaya değmeyecek kadar tek amaçlı.
 */
export async function recordStoreLedger(ev: StoreEvent): Promise<void> {
  const l = ev.ledger;
  if (!l) return;
  try {
    await db.execute(sql`
      insert into store_events (provider, event_id, type, user_id, platform, product, period_type, environment, price_usd, currency, price_local, event_at)
      values (${ev.provider}, ${ev.eventId}, ${l.type}, ${ev.userId}, ${ev.platform}, ${ev.productId},
        ${l.trialConversion ? "trial_conversion" : l.period}, ${l.environment}, ${l.priceUsd}, ${l.currency}, ${l.priceLocal}, ${l.eventAt ?? new Date()})
      on conflict (provider, event_id) do nothing`);
  } catch (err) {
    console.error("[premium/ledger]", (err as Error).message);
  }
}
