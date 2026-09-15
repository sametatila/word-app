import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiError } from "../src/api/client";
import { accountRequiredError, claimGuest, deleteGuestData, discardGuestClaim, previewGuestClaim, GUEST_KEY, isAccountRequired, loadGuestRecord, resumeGuest, startGuest } from "../src/lib/guest";

/**
 * MİSAFİR KAYDI (mağaza ön inceleme B24).
 *
 * NEDEN TEST: buradaki hatalar da SESSİZ ve bedeli ilerleme. Misafirin geri
 * giriş yolu yok; kimliğini kanıtlayan tek şey cihazdaki jeton. Kurallar:
 *  - açılışta jeton cihaza yazılır,
 *  - birleşme bitince ya da sunucu misafiri tanımayınca kayıt silinir,
 *  - ağ/sunucu hatasında kayıt DURUR (bir sonraki açılışta yeniden denenir),
 *  - yarım kalan birleşme yalnız AYNI hesap için yeniden denenir.
 */
jest.mock("../src/api/client", () => {
  class Err extends Error {
    status: number;
    constructor(status: number, message = "") { super(message); this.status = status; }
  }
  return { api: jest.fn(), fetchWithTimeout: jest.fn(), API_BASE: "https://example.test", ApiError: Err };
});

const { api, fetchWithTimeout } = require("../src/api/client") as { api: jest.Mock; fetchWithTimeout: jest.Mock };
const record = { id: "guest-1", token: "t".repeat(32), at: 1 };

beforeEach(async () => {
  api.mockReset();
  fetchWithTimeout.mockReset();
  await AsyncStorage.clear();
});

test("misafir açılınca kimlik ve jeton cihaza yazılır", async () => {
  fetchWithTimeout.mockResolvedValue({ ok: true, status: 200, json: async () => ({ token: record.token, user: { id: record.id } }) });
  const r = await startGuest();
  expect(r.ok).toBe(true);
  expect(await loadGuestRecord()).toMatchObject({ id: record.id, token: record.token });
});

test("kimlik açma sınırı (429) kayıt yazmaz ve sebebi döndürür", async () => {
  fetchWithTimeout.mockResolvedValue({ ok: false, status: 429, json: async () => ({ message: "Too many requests" }) });
  const r = await startGuest();
  expect(r).toMatchObject({ ok: false, status: 429 });
  expect(await AsyncStorage.getItem(GUEST_KEY)).toBeNull();
});

test("birleşme bitince kayıt silinir", async () => {
  await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(record));
  api.mockResolvedValue({ merged: true, targetHadProgress: true });
  expect(await claimGuest(record, "acc-1")).toEqual({ kind: "merged", hadProgress: true });
  expect(await AsyncStorage.getItem(GUEST_KEY)).toBeNull();
});

test("sunucu misafiri tanımıyorsa (404) kayıt silinir", async () => {
  await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(record));
  api.mockRejectedValue(new ApiError(404, "guest_not_found"));
  expect(await claimGuest(record, "acc-1")).toEqual({ kind: "gone" });
  expect(await AsyncStorage.getItem(GUEST_KEY)).toBeNull();
});

test("ağ hatasında kayıt durur ve denenen hesap işaretlenir", async () => {
  await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(record));
  api.mockRejectedValue(new Error("network"));
  expect(await claimGuest(record, "acc-1")).toEqual({ kind: "retry" });
  expect(await loadGuestRecord()).toMatchObject({ id: record.id, for: "acc-1" });
});

test("yarım kalan birleşme başka bir hesaba yapılmaz", async () => {
  const pending = { ...record, for: "acc-1" };
  await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(pending));
  expect(await claimGuest(pending, "acc-2")).toEqual({ kind: "gone" });
  expect(api).not.toHaveBeenCalled();
  // Kayıt ilk hesap için duruyor.
  expect(await loadGuestRecord()).toMatchObject({ for: "acc-1" });
});

test("hesap isteyen uç tanınıyor", () => {
  expect(isAccountRequired(new ApiError(403, "account_required"))).toBe(true);
  expect(isAccountRequired(new ApiError(403, "ai_consent_required"))).toBe(false);
  expect(isAccountRequired(new ApiError(401, "account_required"))).toBe(false);
});

/* ÇEREZİNİ KAYBEDEN MİSAFİR (iki adımlı doğrulamada vazgeçilen giriş). Kayıt
   yalnız sunucunun AÇIK hükmüyle silinmeli: çıplak bir 404 (uç henüz yayında
   değil) kaydı silseydi ilerleme bir daha birleştirilemezdi. */
const reply = (status: number, body: unknown) => ({ ok: status >= 200 && status < 300, status, json: async () => body });

test("oturum jetonla geri kurulur; yeni jeton kayda yazılır", async () => {
  await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(record));
  fetchWithTimeout.mockResolvedValue(reply(200, { token: "n".repeat(32), user: { id: record.id } }));
  expect(await resumeGuest(record)).toBe("resumed");
  expect((await loadGuestRecord())?.token).toBe("n".repeat(32));
});

test("sunucu GUEST_NOT_FOUND derse kayıt silinir", async () => {
  await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(record));
  fetchWithTimeout.mockResolvedValue(reply(404, { code: "GUEST_NOT_FOUND" }));
  expect(await resumeGuest(record)).toBe("gone");
  expect(await AsyncStorage.getItem(GUEST_KEY)).toBeNull();
});

test("kodsuz 404 ve ağ hatası kaydı silmez", async () => {
  await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(record));
  fetchWithTimeout.mockResolvedValueOnce(reply(404, null));
  expect(await resumeGuest(record)).toBe("retry");
  fetchWithTimeout.mockRejectedValueOnce(new Error("network"));
  expect(await resumeGuest(record)).toBe("retry");
  expect(await loadGuestRecord()).toMatchObject({ id: record.id });
});

test("hesaba sabitlenmiş kayıt geri kurulmaz (bekleyen birleşme)", async () => {
  expect(await resumeGuest({ ...record, for: "acc-1" })).toBe("gone");
  expect(fetchWithTimeout).not.toHaveBeenCalled();
});

test("silme 401 alırsa önce oturumu geri kurup yeniden dener", async () => {
  await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(record));
  api.mockRejectedValueOnce(new ApiError(401, "unauthorized")).mockResolvedValueOnce({ ok: true });
  fetchWithTimeout.mockResolvedValue(reply(200, { token: record.token, user: { id: record.id } }));
  expect(await deleteGuestData()).toBe(true);
  expect(api).toHaveBeenCalledTimes(2);
});

test("silme 401 alır ve geri kurma da olmazsa başarı sayılmaz", async () => {
  await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(record));
  api.mockRejectedValueOnce(new ApiError(401, "unauthorized"));
  fetchWithTimeout.mockRejectedValue(new Error("network"));
  expect(await deleteGuestData()).toBe(false);
});

test("misafirde atılmayan çağrının hatası hesap reddiyle aynı", () => {
  expect(isAccountRequired(accountRequiredError())).toBe(true);
});

/* "HESABINA EKLENSİN Mİ?" Önizleme hiçbir şeyi değiştirmemeli; kipi tanımayan
   eski sunucu doğrudan birleştirirse bu da doğru okunmalı. */
test("önizleme iki tarafın ilerlemesini döndürür, kaydı silmez", async () => {
  await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(record));
  api.mockResolvedValue({ guestHasProgress: true, targetHasProgress: true });
  expect(await previewGuestClaim(record)).toEqual({ kind: "preview", guestHasProgress: true, targetHasProgress: true });
  expect(JSON.parse(api.mock.calls[0][1].body)).toMatchObject({ mode: "preview" });
  expect(await loadGuestRecord()).toMatchObject({ id: record.id });
});

test("kipi tanımayan sunucu birleştirdiyse sonuç birleşme sayılır", async () => {
  await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(record));
  api.mockResolvedValue({ merged: true, targetHadProgress: true });
  expect(await previewGuestClaim(record)).toEqual({ kind: "merged", hadProgress: true });
  expect(await AsyncStorage.getItem(GUEST_KEY)).toBeNull();
});

test("eklememe misafiri siler; ağ hatasında kayıt durur", async () => {
  await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(record));
  api.mockRejectedValueOnce(new Error("network"));
  expect(await discardGuestClaim(record)).toBe("retry");
  expect(await loadGuestRecord()).toMatchObject({ id: record.id });
  api.mockResolvedValueOnce({ discarded: true });
  expect(await discardGuestClaim(record)).toBe("discarded");
  expect(await AsyncStorage.getItem(GUEST_KEY)).toBeNull();
});
