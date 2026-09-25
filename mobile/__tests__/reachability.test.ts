import { diagnoseNetwork, resetNetworkDiagnosis } from "../src/lib/reachability";

/**
 * AĞ TEŞHİSİ: bizim sunucuya ulaşılamadığında "internet yok" mu, "bu ağ
 * Lernomi'yi engelliyor" mu (bazı okul/iş ağları yeni alan adını SNI'dan
 * sıfırlıyor). Yanlış teşhis kullanıcıyı ya cihazını kurcalamaya ya da
 * boşuna ağ değiştirmeye yollar.
 */
type Reply = { status: number; body?: string } | "neterror";

function mockFetch(byHost: Record<string, Reply>) {
  const calls: string[] = [];
  (globalThis as { fetch: unknown }).fetch = jest.fn(async (url: string) => {
    calls.push(url);
    const r = Object.entries(byHost).find(([h]) => url.includes(h))?.[1] ?? "neterror";
    if (r === "neterror") throw new TypeError("Network request failed");
    return { ok: r.status >= 200 && r.status < 300, status: r.status, text: async () => r.body ?? "" };
  });
  return calls;
}

beforeEach(() => resetNetworkDiagnosis());

test("gstatic 204 dönüyorsa internet var, Lernomi engelli: blocked", async () => {
  mockFetch({ "gstatic.com": { status: 204 } });
  await expect(diagnoseNetwork()).resolves.toBe("blocked");
});

test("yalnız Cloudflare izi cevap veriyorsa da blocked", async () => {
  mockFetch({ "cloudflare.com": { status: 200, body: "fl=1\nh=cloudflare.com\ncolo=FRA\n" } });
  await expect(diagnoseNetwork()).resolves.toBe("blocked");
});

test("her yoklama ağ hatası veriyorsa offline", async () => {
  mockFetch({});
  await expect(diagnoseNetwork()).resolves.toBe("offline");
});

test("esir portal (200 HTML) internet sayılmıyor: unknown", async () => {
  mockFetch({ "gstatic.com": { status: 200, body: "<html>login</html>" }, "cloudflare.com": { status: 200, body: "<html>login</html>" } });
  await expect(diagnoseNetwork()).resolves.toBe("unknown");
});

test("sonuç önbellekte: arka arkaya çağrı ağı yeniden yoklamıyor", async () => {
  const calls = mockFetch({ "gstatic.com": { status: 204 } });
  await Promise.all([diagnoseNetwork(), diagnoseNetwork()]);
  await diagnoseNetwork();
  expect(calls).toHaveLength(2); // iki yoklama, bir kez
});

