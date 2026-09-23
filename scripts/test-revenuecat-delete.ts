/**
 * RevenueCat müşteri silme — `lib/account/revenuecat-delete` birim testi.
 *
 * Çalıştır: npm run test:rc-delete  (ağ yok: fetch taklit ediliyor)
 *
 * Kanıtlar: (1) doğru uç, yöntem ve Bearer; (2) env yoksa istek hiç atılmıyor;
 * (3) 404 "kayıt yok", 5xx ve ağ hatası "başarısız" — hiçbiri fırlatmıyor,
 * yani hesap silmeyi durduramıyor.
 */
import { deleteRevenueCatCustomer } from "@/lib/account/revenuecat-delete";

let fail = 0;
function check(label: string, cond: boolean): void {
  console.log(`${cond ? "ok  " : "FAIL"} ${label}`);
  if (!cond) fail++;
}

const env = { REVENUECAT_API_KEY: "sk_test", REVENUECAT_PROJECT_ID: "proj1" };
type Call = { url: string; init?: RequestInit };

function fake(status: number | "throw"): { fetch: typeof fetch; calls: Call[] } {
  const calls: Call[] = [];
  const f = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    if (status === "throw") throw new TypeError("network down");
    return new Response(null, { status });
  }) as typeof fetch;
  return { fetch: f, calls };
}

(async () => {
  const ok = fake(200);
  const r1 = await deleteRevenueCatCustomer("user/ä 1", { fetch: ok.fetch, env });
  check("200 → deleted", r1 === "deleted");
  check("tek istek", ok.calls.length === 1);
  check("uç v2 customers, kimlik kodlanmış", ok.calls[0]?.url === "https://api.revenuecat.com/v2/projects/proj1/customers/user%2F%C3%A4%201");
  check("yöntem DELETE", ok.calls[0]?.init?.method === "DELETE");
  check("Bearer anahtar", (ok.calls[0]?.init?.headers as Record<string, string>)?.authorization === "Bearer sk_test");

  const none = fake(200);
  check("env yok → skipped", (await deleteRevenueCatCustomer("u", { fetch: none.fetch, env: {} })) === "skipped");
  check("env yok → istek yok", none.calls.length === 0);
  check("yalnız anahtar → skipped", (await deleteRevenueCatCustomer("u", { fetch: none.fetch, env: { REVENUECAT_API_KEY: "k" } })) === "skipped");

  check("404 → absent", (await deleteRevenueCatCustomer("u", { fetch: fake(404).fetch, env })) === "absent");
  check("403 → failed (fırlatmaz)", (await deleteRevenueCatCustomer("u", { fetch: fake(403).fetch, env })) === "failed");
  check("500 → failed (fırlatmaz)", (await deleteRevenueCatCustomer("u", { fetch: fake(500).fetch, env })) === "failed");
  check("ağ hatası → failed (fırlatmaz)", (await deleteRevenueCatCustomer("u", { fetch: fake("throw").fetch, env })) === "failed");

  console.log(fail ? `\n${fail} BAŞARISIZ` : "\nRevenueCat silme testleri geçti.");
  process.exit(fail ? 1 : 0);
})();
