import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiError } from "../src/api/client";
import { flushPendingAnswers, submitAnswers } from "../src/game/session";
import type { AnswerOut } from "../src/game/session";

/**
 * ÇEVRİMDIŞI CEVAP KUYRUĞU.
 *
 * NEDEN TEST: buradaki hata SESSİZ. Tur biter, ekranda puan artar, cevaplar
 * sunucuya hiç ulaşmaz - ne derleme ne de gözle bakma bunu gösterir. Üç kural
 * birden tutmak zorunda ve üçü de veri kaybı ya da veri bozulması demek:
 *  - ağ yokken batch CİHAZDA kalır (uygulama kapansa bile),
 *  - biçim hatası (400) kuyruğa GİRMEZ - girerse kuyruktaki her turu batırır,
 *  - oturum düşmesi (401) kuyruğu SİLMEZ - kullanıcı yeniden girince gider.
 */
const KEY = "lernomi-answer-queue";
const answers: AnswerOut[] = [{ wordId: 1, game: "mc", correct: true, latencyMs: 900 }];

jest.mock("../src/api/client", () => {
  class Err extends Error {
    status: number;
    constructor(status: number, message = "") { super(message); this.status = status; }
  }
  return { api: jest.fn(), ApiError: Err };
});

const { api } = require("../src/api/client") as { api: jest.Mock };

beforeEach(async () => {
  api.mockReset();
  await AsyncStorage.clear();
});

test("ağ yokken tur kuyruğa alınır ve günü korunur", async () => {
  api.mockRejectedValue(new Error("network"));
  await expect(submitAnswers(answers, "2026-09-01", 42)).rejects.toBeTruthy();
  const raw = await AsyncStorage.getItem(KEY);
  expect(JSON.parse(raw ?? "[]")).toEqual([{ answers, day: "2026-09-01", seconds: 42 }]);
});

test("biçim hatası (400) kuyruğa girmez", async () => {
  api.mockRejectedValue(new ApiError(400, "bad_request"));
  await expect(submitAnswers(answers, "2026-09-01", 42)).rejects.toBeTruthy();
  expect(await AsyncStorage.getItem(KEY)).toBeNull();
});

test("oturum düşmesi (401) kuyruğu silmez", async () => {
  await AsyncStorage.setItem(KEY, JSON.stringify([{ answers, day: "2026-09-01", seconds: 42 }]));
  api.mockRejectedValue(new ApiError(401, "unauthorized"));
  await flushPendingAnswers();
  expect(JSON.parse((await AsyncStorage.getItem(KEY)) ?? "[]")).toHaveLength(1);
});

test("bağlantı dönünce kuyruk boşalır", async () => {
  await AsyncStorage.setItem(KEY, JSON.stringify([
    { answers, day: "2026-09-01", seconds: 42 },
    { answers, day: "2026-09-02", seconds: 12 },
  ]));
  api.mockResolvedValue({});
  await flushPendingAnswers();
  expect(api).toHaveBeenCalledTimes(2);
  expect(await AsyncStorage.getItem(KEY)).toBeNull();
});

test("başarılı gönderim bekleyenleri de gönderir", async () => {
  await AsyncStorage.setItem(KEY, JSON.stringify([{ answers, day: "2026-09-01", seconds: 42 }]));
  api.mockResolvedValue({ dueTomorrow: 0 });
  await submitAnswers(answers, "2026-09-03", 30);
  await new Promise((r) => setImmediate(r));
  expect(await AsyncStorage.getItem(KEY)).toBeNull();
});
