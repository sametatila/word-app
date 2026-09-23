import "server-only";

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
 * EN İYİ ÇABA. Anahtar ya da proje kimliği yoksa sessizce atlanır (günlüğe
 * bir satır); hata silmeyi DURDURMAZ, yalnız günlüğe düşer. Silme hiçbir
 * zaman üçüncü tarafın o anki durumuna bağlı olmamalı.
 */
export type RevenueCatDeleteResult = "deleted" | "absent" | "skipped" | "failed";

const TIMEOUT_MS = 6_000;

export async function deleteRevenueCatCustomer(
  userId: string,
  deps: { fetch?: typeof fetch; env?: Record<string, string | undefined> } = {},
): Promise<RevenueCatDeleteResult> {
  const env = deps.env ?? process.env;
  const key = env.REVENUECAT_API_KEY;
  const project = env.REVENUECAT_PROJECT_ID;
  if (!key || !project) {
    console.info("[revenuecat] customer delete skipped: REVENUECAT_API_KEY/PROJECT_ID not set");
    return "skipped";
  }
  const doFetch = deps.fetch ?? fetch;
  const url = `https://api.revenuecat.com/v2/projects/${encodeURIComponent(project)}/customers/${encodeURIComponent(userId)}`;
  try {
    const res = await doFetch(url, {
      method: "DELETE",
      headers: { authorization: `Bearer ${key}`, accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.ok) return "deleted";
    // Hiç satın alma ekranı açmamış kullanıcının RevenueCat kaydı yok.
    if (res.status === 404) return "absent";
    console.error("[revenuecat] customer delete failed", res.status);
    return "failed";
  } catch (err) {
    console.error("[revenuecat] customer delete failed", err instanceof Error ? err.name : err);
    return "failed";
  }
}
