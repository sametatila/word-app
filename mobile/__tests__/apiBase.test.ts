import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  apiBase, BASE_STORAGE_KEY, baseReady, decideFailover, decideRecheck, FALLBACK_BASE, failover, initialBase,
  onBaseChange, ownBaseOf, parseSaved, PRIMARY_BASE, rebaseUrl, recheckPrimary, resetBaseState, STICKY_MS,
} from "../src/api/base";
import { api, fetchWithTimeout } from "../src/api/client";
import { resetNetworkDiagnosis } from "../src/lib/reachability";

/*
  YEDEK ADRES: bazı ağlar www.lernomi.app'i engelliyor (SNI), uygulama o zaman
  lernomi.rumpuskit.com'a geçiyor (bkz. src/api/base).
*/

describe("taban seçimi (saf)", () => {
  it("asıl ölü, öteki diri, internet var → yedeğe geç", () => {
    expect(decideFailover({ diagnosis: "blocked", failedAlive: false, otherAlive: true })).toBe("switch");
  });

  it("ikisi de düşük, internet yok → offline", () => {
    expect(decideFailover({ diagnosis: "offline", failedAlive: false, otherAlive: false })).toBe("offline");
  });

  it("ikisi de ölü ama internet var (ikisini de engelleyen ağ) → kal", () => {
    expect(decideFailover({ diagnosis: "blocked", failedAlive: false, otherAlive: false })).toBe("stay");
  });

  it("düşen taban aslında cevap veriyor (geçici hata) → kal", () => {
    expect(decideFailover({ diagnosis: "blocked", failedAlive: true, otherAlive: true })).toBe("stay");
  });

  it("yedekteyken asıl adres açıldı → geri dön; açılmadı → kal", () => {
    expect(decideRecheck(FALLBACK_BASE, true)).toBe(PRIMARY_BASE);
    expect(decideRecheck(FALLBACK_BASE, false)).toBe(FALLBACK_BASE);
    expect(decideRecheck(PRIMARY_BASE, false)).toBe(PRIMARY_BASE);
  });

  it("yedek seçimi 24 saat geçerli, bozuk ya da ileri tarihli kayıt yok sayılır", () => {
    const now = 1_000_000_000_000;
    expect(initialBase({ base: FALLBACK_BASE, at: now - 1000 }, now)).toBe(FALLBACK_BASE);
    expect(initialBase({ base: FALLBACK_BASE, at: now - STICKY_MS - 1 }, now)).toBe(PRIMARY_BASE);
    expect(initialBase({ base: FALLBACK_BASE, at: now + 60_000 }, now)).toBe(PRIMARY_BASE);
    expect(initialBase(null, now)).toBe(PRIMARY_BASE);
    expect(parseSaved("{")).toBeNull();
    expect(parseSaved(JSON.stringify({ base: "https://evil.example", at: 1 }))).toBeNull();
  });

  it("kendi adresimizi kesin önekle tanır, taklitlere kanmaz", () => {
    expect(ownBaseOf(`${PRIMARY_BASE}/api/x`)).toBe(PRIMARY_BASE);
    expect(ownBaseOf(`${FALLBACK_BASE}/api/x`)).toBe(FALLBACK_BASE);
    expect(ownBaseOf("https://www.lernomi.app.saldirgan.com/api/x")).toBeNull();
    expect(ownBaseOf("https://saldirgan.com/@www.lernomi.app/api/x")).toBeNull();
    expect(rebaseUrl(`${PRIMARY_BASE}/api/x?a=1`, FALLBACK_BASE)).toBe(`${FALLBACK_BASE}/api/x?a=1`);
    expect(rebaseUrl("https://gstatic.com/x", FALLBACK_BASE)).toBe("https://gstatic.com/x");
  });
});

describe("çalışma zamanı", () => {
  const realFetch = globalThis.fetch;
  type Net = { primary: boolean; fallback: boolean; internet: boolean };
  let calls: { url: string; origin?: string }[] = [];

  function mockNet(net: Net) {
    calls = [];
    (globalThis as { fetch: unknown }).fetch = jest.fn(async (url: string, init?: { headers?: Record<string, string> }) => {
      calls.push({ url, origin: init?.headers?.origin });
      const json = { ok: true, status: 200, json: async () => ({ ok: 1 }), text: async (): Promise<string> => JSON.stringify({ ok: 1 }) };
      if (url.startsWith(PRIMARY_BASE) && net.primary) return json;
      if (url.startsWith(FALLBACK_BASE) && net.fallback) return json;
      if (url.includes("gstatic.com") && net.internet) return { ok: true, status: 204, text: async (): Promise<string> => "" };
      throw new TypeError("Network request failed");
    });
  }

  beforeEach(async () => {
    resetBaseState();
    resetNetworkDiagnosis();
    await AsyncStorage.clear();
  });
  afterEach(() => { (globalThis as { fetch: unknown }).fetch = realFetch; });

  it("asıl engelli → istek yedekten gider, köken başlığı yedek, seçim cihaza yazılır", async () => {
    mockNet({ primary: false, fallback: true, internet: true });
    const seen: string[] = [];
    onBaseChange((next) => seen.push(next));
    const out = await api<{ ok: number }>("/api/me");
    expect(out).toEqual({ ok: 1 });
    expect(apiBase()).toBe(FALLBACK_BASE);
    expect(seen).toEqual([FALLBACK_BASE]);
    const last = calls[calls.length - 1];
    expect(last.url).toBe(`${FALLBACK_BASE}/api/me`);
    expect(last.origin).toBe(FALLBACK_BASE);
    await new Promise((r) => setImmediate(r));
    expect(parseSaved(await AsyncStorage.getItem(BASE_STORAGE_KEY))?.base).toBe(FALLBACK_BASE);
  });

  it("ikisi de düşük, internet yok → taban değişmez, hata çağırana gider", async () => {
    mockNet({ primary: false, fallback: false, internet: false });
    await expect(api("/api/me")).rejects.toThrow(/network/i);
    expect(apiBase()).toBe(PRIMARY_BASE);
  });

  it("kayıtlı yedek seçimi açılışta geçerli; asıl açılınca geri dönülür ve kayıt silinir", async () => {
    await AsyncStorage.setItem(BASE_STORAGE_KEY, JSON.stringify({ base: FALLBACK_BASE, at: Date.now() - 1000 }));
    await baseReady();
    expect(apiBase()).toBe(FALLBACK_BASE);

    mockNet({ primary: false, fallback: true, internet: true });
    expect(await recheckPrimary(true)).toBe(FALLBACK_BASE);

    mockNet({ primary: true, fallback: true, internet: true });
    expect(await recheckPrimary(true)).toBe(PRIMARY_BASE);
    await new Promise((r) => setImmediate(r));
    expect(await AsyncStorage.getItem(BASE_STORAGE_KEY)).toBeNull();
  });

  it("yedekteyken yedek düşer, asıl açıksa (ağdan çıkıldı) asıla dönülür", async () => {
    await AsyncStorage.setItem(BASE_STORAGE_KEY, JSON.stringify({ base: FALLBACK_BASE, at: Date.now() }));
    await baseReady();
    mockNet({ primary: true, fallback: false, internet: true });
    expect(await failover(FALLBACK_BASE)).toBe(PRIMARY_BASE);
    expect(apiBase()).toBe(PRIMARY_BASE);
  });

  it("asıl ile kurulmuş eski adres, istek anında o anki tabana taşınır", async () => {
    await AsyncStorage.setItem(BASE_STORAGE_KEY, JSON.stringify({ base: FALLBACK_BASE, at: Date.now() }));
    mockNet({ primary: false, fallback: true, internet: true });
    const res = await fetchWithTimeout(`${PRIMARY_BASE}/api/content/pointer`);
    expect(res.ok).toBe(true);
    expect(calls[0].url).toBe(`${FALLBACK_BASE}/api/content/pointer`);
  });
});
