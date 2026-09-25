import { ApiError } from "../src/api/client";
import { isNetworkError } from "../src/lib/auth";

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
