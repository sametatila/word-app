import "server-only";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { appSettings } from "@/lib/db/schema";
import { DEFAULT_APP_CONTROL, parseAppControl, parseClientHeader, type AppControl } from "./app-control-shared";

/**
 * Uygulama denetimi — sunucu tarafı: panelden okunan/yazılan yapılandırma ve
 * istemci sürümü kaydı. Paylaşılan kısım ve gerekçe `app-control-shared.ts`.
 */

const KEY = "app.control";
/** Premium yapılandırmasıyla aynı pencere: panel kaydı en geç yarım dakikada yürürlükte. */
const TTL_MS = 30_000;
let cache: { at: number; value: AppControl } | null = null;

export async function appControl(): Promise<AppControl> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) return cache.value;
  try {
    const [row] = await db.select({ value: appSettings.value }).from(appSettings).where(eq(appSettings.key, KEY)).limit(1);
    const value = parseAppControl(row?.value);
    cache = { at: now, value };
    return value;
  } catch {
    // Okunamadı: varsayılan (bakım kapalı, zorunlu güncelleme yok). Önbelleğe
    // alınmıyor ki geçici bir kesinti yarım dakika boyunca sürmesin.
    return DEFAULT_APP_CONTROL;
  }
}

export async function saveAppControl(raw: unknown, actor: string | null): Promise<AppControl> {
  const value = parseAppControl(raw);
  await db
    .insert(appSettings)
    .values({ key: KEY, value, updatedBy: actor })
    .onConflictDoUpdate({ target: appSettings.key, set: { value, updatedBy: actor, updatedAt: new Date() } });
  cache = { at: Date.now(), value };
  return value;
}

/**
 * İstemci sürümünü yazar. Her istekte yazmamak için koşullu upsert: satır
 * yalnız build değiştiyse ya da son görülme altı saatten eskiyse güncelleniyor.
 * Hata yutuluyor — sürüm kaydı çağıran ucu hiçbir zaman bozmamalı.
 *
 * `testLab`: istek Firebase Test Lab cihazından (`TEST_LAB_HEADER`, gerekçe
 * `lib/test-lab`). İşaret YAPIŞKAN: bir kez true olunca bu kod onu hiçbir
 * zaman geri false yapmıyor (`or`), yani aynı hesabın sonraki gerçek cihaz
 * açılışı da işareti silmiyor. İşaret yeni geldiyse koşullu upsert altı saati
 * beklemeden yazıyor: robot hesabı ilk `/api/me`de işaretlensin.
 */
export async function recordClient(userId: string, header: string | null, testLab = false): Promise<void> {
  const c = parseClientHeader(header);
  if (!c) return;
  try {
    await db.execute(sql`
      insert into user_clients (user_id, platform, app_version, build, test_lab)
      values (${userId}, ${c.platform}, ${c.version}, ${c.build}, ${testLab})
      on conflict (user_id, platform) do update
        set app_version = excluded.app_version, build = excluded.build, last_seen = now(),
            test_lab = user_clients.test_lab or excluded.test_lab
        where user_clients.build <> excluded.build or user_clients.last_seen < now() - interval '6 hours'
           or (excluded.test_lab and not user_clients.test_lab)`);
  } catch (err) {
    console.error("[app-control] sürüm yazılamadı", err);
  }
}
