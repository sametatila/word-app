import { ApiError } from "../src/api/client";
import { isNetworkError, signIn } from "../src/lib/auth";
import { translateAuthError } from "../src/lib/authErrors";
import { t } from "../src/lib/i18n";
import { resetNetworkDiagnosis } from "../src/lib/reachability";

/*
  "Bağlantı kurulamadı" yalnız gerçek ağ hatasında. Uygulama içi bir istisna
  "internetini kontrol et" diye maskelenmemeli (build 7, 2026-09-25).
*/
describe("isNetworkError", () => {
  it("RN fetch'in ağ hatası ağ hatasıdır", () => {
    expect(isNetworkError(new TypeError("Network request failed"))).toBe(true);
  });

  it("zaman aşımı (ApiError durum 0) ağ hatasıdır", () => {
    expect(isNetworkError(new ApiError(0, "timeout"))).toBe(true);
  });

  it("sunucu cevabı ağ hatası değildir", () => {
    expect(isNetworkError(new ApiError(500, "server"))).toBe(false);
  });

  it("uygulama içi istisna ağ hatası değildir", () => {
    expect(isNetworkError(new TypeError("Cannot read properties of undefined (reading 'x')"))).toBe(false);
    expect(isNetworkError(new Error("boom"))).toBe(false);
  });
});

/*
  AĞ ENGELİ: Lernomi'ye ulaşılamıyor ama internet var (okul/iş ağı yeni alan
  adını engelliyor). Kullanıcı "internetini kontrol et" değil "başka ağla dene"
  görmeli (bkz. lib/reachability).
*/
describe("BLOCKED", () => {
  const realFetch = globalThis.fetch;
  afterEach(() => { (globalThis as { fetch: unknown }).fetch = realFetch; resetNetworkDiagnosis(); });

  function mockFetch(internet: boolean) {
    (globalThis as { fetch: unknown }).fetch = jest.fn(async (url: string) => {
      if (internet && url.includes("gstatic.com")) return { ok: true, status: 204, text: async () => "" };
      throw new TypeError("Network request failed");
    });
  }

  it("internet varken giriş ağ hatası BLOCKED dönüyor", async () => {
    mockFetch(true);
    const r = await signIn("a@b.c", "x");
    expect(r).toMatchObject({ ok: false, code: "BLOCKED", message: t("common.network_blocked") });
  });

  it("internet yokken NETWORK kalıyor", async () => {
    mockFetch(false);
    const r = await signIn("a@b.c", "x");
    expect(r).toMatchObject({ ok: false, code: "NETWORK" });
  });

  it("authErrors: BLOCKED ağ engeli cümlesine, NETWORK bağlantı cümlesine eşleniyor", () => {
    expect(translateAuthError("BLOCKED", "")).toBe(t("common.network_blocked"));
    expect(translateAuthError("NETWORK", "")).toBe(t("autherror.could_not_connect_check_your"));
    expect(t("common.network_blocked")).not.toBe("common.network_blocked");
  });
});
