import "server-only";
import { lt } from "drizzle-orm";
import { db } from "@/lib/db";
import { cronRuns } from "@/lib/db/schema";

/**
 * Zamanlanmış işin koşu kaydı.
 *
 * NEDEN VAR. Beş cron ucu yalnız `console`a yazıyordu ve bu tam olarak bir kez
 * başımıza geldi: `vercel.json`daki üç cron, Vercel bırakılınca çağıransız
 * kaldı ve uçlar AYLARCA hiç çalışmadı. Üç ayrı sessiz kırılma var ve üçü de
 * aynı şekilde görünmezdi:
 *   1. timer susar (systemd unit bozulur, sunucu yeniden kurulur),
 *   2. `CRON_SECRET` kayar - uç 401 döner, iş hiç başlamaz,
 *   3. işin içinde bir hata çıkar - uç 500 döner.
 *
 * Üçü de artık bir satır bırakıyor; pano son koşuyu ve yedi günlük
 * başarı/başarısızlık sayısını gösteriyor. "Dün çalıştı mı" sorusu böylece
 * sorgulanabilir bir soru oluyor.
 *
 * YAZMA HİÇBİR ZAMAN HATA FIRLATMIYOR: kaydı tutulan iş, kaydı yüzünden
 * bozulmamalı (`ai-usage` ve `events` ile aynı kural).
 */

/** Kayıt penceresi — gizlilik politikasının yedek penceresiyle aynı sayı. */
const KEEP_DAYS = 30;

export type CronName = "reminders" | "assess" | "summary" | "streak-alert" | "weekly-reminder";

export async function recordCronRun(
  name: CronName,
  ok: boolean,
  ms: number,
  detail?: string,
): Promise<void> {
  try {
    await db.insert(cronRuns).values({ name, ok, ms: Math.max(0, Math.round(ms)), detail: detail?.slice(0, 300) ?? null });
    /* Kendi kendini süpürüyor: beş iş günde birkaç satır bırakıyor, yani
       tablo küçük kalıyor ama sınırsız da büyümemeli. */
    await db.delete(cronRuns).where(lt(cronRuns.ranAt, new Date(Date.now() - KEEP_DAYS * 86_400_000)));
  } catch (err) {
    console.error("[cron-runs] yazılamadı", name, err);
  }
}
