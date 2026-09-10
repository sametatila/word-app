import AsyncStorage from "@react-native-async-storage/async-storage";
import { flushPendingLessons, queueLessonResult, type PendingLesson } from "../src/game/lessonProgress";

/**
 * ÇEVRİMDIŞI BİTİRİLEN DERSİN KUYRUĞU.
 *
 * NEDEN TEST: cevap kuyruğuyla aynı sebep - hata SESSİZ. Ders bitmiş
 * görünüyor (yerel işaret), sunucu onu hiç öğrenmiyor. Üç kural sınanıyor:
 * kayıt kendi gününü taşıyor, aynı ders iki kez bitirilirse tek kayıt kalıyor,
 * gönderilemeyen kayıt kuyrukta duruyor.
 */
const KEY = "lernomi-lessons-pending";
const item: PendingLesson = { lessonId: "a1-01", correct: 7, roleplayDone: true, day: "2026-09-01", seconds: 300 };

jest.mock("../src/api/client", () => ({ api: jest.fn(), ApiError: class extends Error { status = 0; } }));
const { api } = require("../src/api/client") as { api: jest.Mock };

beforeEach(async () => { api.mockReset(); await AsyncStorage.clear(); });

test("kayıt kendi günüyle saklanıyor", async () => {
  await queueLessonResult(item);
  expect(JSON.parse((await AsyncStorage.getItem(KEY)) ?? "[]")).toEqual([item]);
});

test("aynı ders iki kez bitirilirse son kayıt kalıyor", async () => {
  await queueLessonResult(item);
  await queueLessonResult({ ...item, correct: 9 });
  const list = JSON.parse((await AsyncStorage.getItem(KEY)) ?? "[]") as PendingLesson[];
  expect(list).toHaveLength(1);
  expect(list[0].correct).toBe(9);
});

test("bağlantı dönünce kuyruk boşalıyor", async () => {
  await queueLessonResult(item);
  api.mockResolvedValue({});
  await flushPendingLessons();
  expect(api).toHaveBeenCalledWith("/api/lesson", expect.objectContaining({ method: "POST" }));
  expect(await AsyncStorage.getItem(KEY)).toBeNull();
});

test("gönderilemeyen kayıt kuyrukta kalıyor", async () => {
  await queueLessonResult(item);
  api.mockRejectedValue(new Error("network"));
  await flushPendingLessons();
  expect(JSON.parse((await AsyncStorage.getItem(KEY)) ?? "[]")).toHaveLength(1);
});
