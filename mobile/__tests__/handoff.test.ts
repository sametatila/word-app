import AsyncStorage from "@react-native-async-storage/async-storage";
import { beginHandoff, consumeHandoff } from "../src/lib/handoff";
import { parseDeepLink } from "../src/lib/deepLink";

/**
 * TARAYICIDAN DEVİR CİHAZA BAĞLI (oturum dayatma).
 *
 * Başkasının ürettiği `/auth/app?ott=…` bağlantısı uygulamayı o kişinin
 * hesabına geçiriyordu. Kurallar:
 *  - devir yalnız bu cihazın başlattığı girişin değeriyle kabul edilir,
 *  - değer tek kullanımlık, süresi geçince geçersiz,
 *  - eşleşmeyen bir bağlantı gerçek dönüşü bozmaz,
 *  - yabancı ana makineli adres (RN `URL` tuzağı dahil) hiç ayrıştırılmaz.
 */
jest.mock("../src/api/client", () => ({ fetchWithTimeout: jest.fn(), apiBase: () => "https://example.test", onBaseChange: () => () => {}, PRIMARY_BASE: "https://www.lernomi.app", FALLBACK_BASE: "https://lernomi.rumpuskit.com" }));

const { fetchWithTimeout } = require("../src/api/client") as { fetchWithTimeout: jest.Mock };
const NONCE = "n".repeat(32);

function serverGives(nonce: unknown) {
  fetchWithTimeout.mockResolvedValue({ ok: true, json: async () => ({ nonce }) });
}

beforeEach(async () => {
  fetchWithTimeout.mockReset();
  await AsyncStorage.clear();
});

test("başlatılmamış devir reddedilir", async () => {
  expect(await consumeHandoff(NONCE)).toBe(false);
});

test("kendi değeriyle gelen devir bir kez kabul edilir", async () => {
  serverGives(NONCE);
  expect(await beginHandoff()).toBe(NONCE);
  expect(await consumeHandoff(NONCE)).toBe(true);
  expect(await consumeHandoff(NONCE)).toBe(false);
});

test("başkasının değeri reddedilir ve gerçek dönüşü bozmaz", async () => {
  serverGives(NONCE);
  await beginHandoff();
  expect(await consumeHandoff("x".repeat(32))).toBe(false);
  expect(await consumeHandoff(null)).toBe(false);
  expect(await consumeHandoff(NONCE)).toBe(true);
});

test("süresi geçmiş değer reddedilir", async () => {
  await AsyncStorage.setItem("lernomi:handoff", JSON.stringify({ n: NONCE, at: Date.now() - 16 * 60 * 1000 }));
  expect(await consumeHandoff(NONCE)).toBe(false);
});

test("sunucu değer vermezse giriş başlatılmaz", async () => {
  serverGives(42);
  expect(await beginHandoff()).toBeNull();
  fetchWithTimeout.mockRejectedValue(new Error("ağ yok"));
  expect(await beginHandoff()).toBeNull();
});

test("derin bağlantı değeri taşır, yabancı ana makineyi reddeder", () => {
  expect(parseDeepLink(`https://www.lernomi.app/auth/app?ott=abc&n=${NONCE}`)).toEqual({ kind: "auth-handoff", token: "abc", nonce: NONCE });
  expect(parseDeepLink("https://www.lernomi.app/auth/app?ott=abc")).toEqual({ kind: "auth-handoff", token: "abc", nonce: null });
  expect(parseDeepLink("https://saldirgan.com/@www.lernomi.app/auth/app?ott=abc")).toBeNull();
  expect(parseDeepLink("https://www.lernomi.app.saldirgan.com/auth/app?ott=abc")).toBeNull();
  expect(parseDeepLink("http://www.lernomi.app/auth/app?ott=abc")).toBeNull();
});
