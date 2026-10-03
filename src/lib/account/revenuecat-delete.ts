import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { vendorDeletionRetries } from "@/lib/db/schema";

/**
 * Hesap silinince RevenueCat'teki müşteri kaydı da silinir.
 *
 * Gizlilik §11 "hesabın … kalıcı olarak silinir" diyor; RevenueCat müşteri
 * kaydı (uygulama kullanıcı kimliği, cihaz ve mağaza bilgisi, satın alma
 * geçmişinin aynası) `purgeUserData`in dokunamadığı tek yerdi (hukuk
 * denetimi). Mali kaydın asıl yeri mağaza (Apple/Google); RevenueCat
 * yalnız aracı olduğu için silmek yasal saklamayı bozmuyor, bizim
 * defterimizdeki para satırları zaten anonimleşiyor (bkz. purge.ts).
 *
 * Uç: `DELETE /v2/projects/{project_id}/customers/{customer_id}` (v2 gizli
 * anahtar, "customer_information:customers" YAZMA izni ister). Müşteri kimliği
 * bizim kullanıcı kimliğimiz: mobil `Purchases.logIn(userId)` ile bağlıyor.
 *
 * EN İYİ ÇABA, AMA SESSİZ DEĞİL. Anahtar ya da proje kimliği yoksa atlanır
 * (günlüğe bir satır); hata hesap silmeyi DURDURMAZ. Eskiden hata yalnız
 * günlüğe düşüyordu ve müşteri kaydı RevenueCat'te kimse fark etmeden
 * kalıyordu (güvenlik denetimi 2026-10-03 D27). Artık başarısız silme
 * `vendor_deletion_retries`e yazılıyor, günlük cron yeniden deniyor
 * (`retryRevenueCatDeletions`) ve bir günü geçen kayıt uyarı motorunda
 * (`vendor-delete`) görünüyor. Silme hiçbir zaman üçüncü tarafın o anki
 * durumuna bağlı olmamalı; ama tamamlanması takip edilmeli.
 *
 * Kuyruktaki tek kişisel iz, silinmiş hesabın opak kimliği: RevenueCat'teki
 * müşteri kimliği o, silmeyi tamamlamak için gerekli. Silme başarılı olunca
 * satır da gidiyor.
 */
export type RevenueCatDeleteResult = "deleted" | "absent" | "skipped" | "failed";

const TIMEOUT_MS = 6_000;

type Deps = {
  fetch?: typeof fetch;
  env?: Record<string, string | undefined>;
  /** Başarısız silmeyi yeniden deneme kuyruğuna yazar; test ağsız/veritabanısız koşsun diye değiştirilebilir. */
  enqueue?: (userId: string, error: string) => Promise<void>;
};

export async function deleteRevenueCatCustomer(userId: string, deps: Deps = {}): Promise<RevenueCatDeleteResult> {
  const out = await attemptDelete(userId, deps);
  if (out.result === "failed") await (deps.enqueue ?? enqueueRetry)(userId, out.error ?? "unknown");
  return out.result;
}

async function attemptDelete(userId: string, deps: Deps): Promise<{ result: RevenueCatDeleteResult; error?: string }> {
  const env = deps.env ?? process.env;
  const key = env.REVENUECAT_API_KEY;
  const project = env.REVENUECAT_PROJECT_ID;
  if (!key || !project) {
    console.info("[revenuecat] customer delete skipped: REVENUECAT_API_KEY/PROJECT_ID not set");
    return { result: "skipped" };
  }
  const doFetch = deps.fetch ?? fetch;
  const url = `https://api.revenuecat.com/v2/projects/${encodeURIComponent(project)}/customers/${encodeURIComponent(userId)}`;
  try {
    const res = await doFetch(url, {
      method: "DELETE",
      headers: { authorization: `Bearer ${key}`, accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.ok) return { result: "deleted" };
    // Hiç satın alma ekranı açmamış kullanıcının RevenueCat kaydı yok.
    if (res.status === 404) return { result: "absent" };
    console.error("[revenuecat] customer delete failed", res.status);
    return { result: "failed", error: `http ${res.status}` };
  } catch (err) {
    const name = err instanceof Error ? err.name : String(err);
    console.error("[revenuecat] customer delete failed", name);
    return { result: "failed", error: name.slice(0, 80) };
  }
}

const VENDOR = "revenuecat";

async function enqueueRetry(userId: string, error: string): Promise<void> {
  try {
    await db
      .insert(vendorDeletionRetries)
      .values({ vendor: VENDOR, subjectId: userId, lastError: error })
      .onConflictDoUpdate({
        target: [vendorDeletionRetries.vendor, vendorDeletionRetries.subjectId],
        set: { attempts: sql`${vendorDeletionRetries.attempts} + 1`, lastError: error, updatedAt: new Date() },
      });
  } catch (err) {
    console.error("[revenuecat] retry queue write failed", err instanceof Error ? err.message : err);
  }
}

/**
 * Kuyruktaki başarısız silmeleri yeniden dener — günlük cron (`api/cron/assess`).
 * Silindi ya da kayıt yoksa satır düşer; yine başarısızsa deneme sayısı artar.
 * Yapılandırma yoksa (`skipped`) satıra dokunmaz. Dönen: tamamlanan sayısı.
 */
export async function retryRevenueCatDeletions(limit = 50, deps: Omit<Deps, "enqueue"> = {}): Promise<number> {
  let done = 0;
  try {
    const rows = await db
      .select({ id: vendorDeletionRetries.id, subjectId: vendorDeletionRetries.subjectId })
      .from(vendorDeletionRetries)
      .where(eq(vendorDeletionRetries.vendor, VENDOR))
      .orderBy(vendorDeletionRetries.updatedAt)
      .limit(limit);
    for (const r of rows) {
      const out = await attemptDelete(r.subjectId, deps);
      if (out.result === "deleted" || out.result === "absent") {
        await db.delete(vendorDeletionRetries).where(and(eq(vendorDeletionRetries.id, r.id), eq(vendorDeletionRetries.vendor, VENDOR)));
        done++;
      } else if (out.result === "failed") {
        await enqueueRetry(r.subjectId, out.error ?? "unknown");
      }
    }
  } catch (err) {
    console.error("[revenuecat] retry failed", err instanceof Error ? err.message : err);
  }
  return done;
}
