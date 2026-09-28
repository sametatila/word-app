import AsyncStorage from "@react-native-async-storage/async-storage";
import { flushPendingConversations, queueConversationResult, type PendingConversation } from "../src/game/pathProgress";

/**
 * ÇEVRİMDIŞI BİTİRİLEN KONUŞMANIN KUYRUĞU.
 *
 * NEDEN TEST: cevap kuyruğuyla aynı sebep - hata SESSİZ. Konuşma bitmiş
 * görünüyor (yerel işaret), sunucu onu hiç öğrenmiyor. Üç kural sınanıyor:
 * kayıt kendi gününü taşıyor, aynı konuşma iki kez bitirilirse tek kayıt kalıyor,
 * gönderilemeyen kayıt kuyrukta duruyor.
 */
const KEY = "lernomi-conversations-pending";
const item: PendingConversation = { conversationId: "a1-01", correct: 7, chatDone: true, day: "2026-09-01", seconds: 300 };

jest.mock("../src/api/client", () => ({
  api: jest.fn(),
  ApiError: class extends Error {
    status: number;
    constructor(status = 0, message = "") { super(message); this.status = status; }
  },
}));
const { api, ApiError } = require("../src/api/client") as { api: jest.Mock; ApiError: new (status: number, message?: string) => Error };

beforeEach(async () => { api.mockReset(); await AsyncStorage.clear(); });

test("kayıt kendi günüyle saklanıyor", async () => {
  await queueConversationResult(item);
  expect(JSON.parse((await AsyncStorage.getItem(KEY)) ?? "[]")).toEqual([item]);
});

test("aynı konuşma iki kez bitirilirse son kayıt kalıyor", async () => {
  await queueConversationResult(item);
  await queueConversationResult({ ...item, correct: 9 });
  const list = JSON.parse((await AsyncStorage.getItem(KEY)) ?? "[]") as PendingConversation[];
  expect(list).toHaveLength(1);
  expect(list[0].correct).toBe(9);
});

test("bağlantı dönünce kuyruk boşalıyor", async () => {
  await queueConversationResult(item);
  api.mockResolvedValue({});
  await flushPendingConversations();
  expect(api).toHaveBeenCalledWith("/api/conversation", expect.objectContaining({ method: "POST" }));
  expect(await AsyncStorage.getItem(KEY)).toBeNull();
});

test("gönderilemeyen kayıt kuyrukta kalıyor", async () => {
  await queueConversationResult(item);
  api.mockRejectedValue(new Error("network"));
  await flushPendingConversations();
  expect(JSON.parse((await AsyncStorage.getItem(KEY)) ?? "[]")).toHaveLength(1);
});

test("gönderilen kayıt sayısı dönüyor", async () => {
  await queueConversationResult(item);
  await queueConversationResult({ ...item, conversationId: "a1-02" });
  api.mockResolvedValue({});
  expect(await flushPendingConversations()).toBe(2);
});

/* Sunucunun bir daha kabul etmeyeceği kayıt (4xx) kuyruğu tıkamıyor; web
   `conversation-queue` aynı biçimde düşürüyor. Oturum yok (401) geçici. */
test("kalıcı ret düşüyor, arkasındaki gidiyor", async () => {
  await queueConversationResult(item);
  await queueConversationResult({ ...item, conversationId: "a1-02" });
  api.mockRejectedValueOnce(new ApiError(400, "bad_conversation")).mockResolvedValueOnce({});
  expect(await flushPendingConversations()).toBe(1);
  expect(api).toHaveBeenCalledTimes(2);
  expect(await AsyncStorage.getItem(KEY)).toBeNull();
});

test("oturum yoksa (401) kayıt bekliyor", async () => {
  await queueConversationResult(item);
  api.mockRejectedValue(new ApiError(401, "unauthorized"));
  await flushPendingConversations();
  expect(JSON.parse((await AsyncStorage.getItem(KEY)) ?? "[]")).toHaveLength(1);
});

/* Patika yüklenirken ve uygulama açılışında aynı anda boşaltılabiliyor:
   aynı kayıt iki kez gitmemeli. */
test("eşzamanlı iki boşaltma kaydı bir kez gönderiyor", async () => {
  await queueConversationResult(item);
  api.mockResolvedValue({});
  await Promise.all([flushPendingConversations(), flushPendingConversations()]);
  expect(api).toHaveBeenCalledTimes(1);
});

test("boşaltma sürerken kuyruğa giren sonuç kaybolmuyor", async () => {
  await queueConversationResult(item);
  api.mockImplementation(async () => {
    await queueConversationResult({ ...item, conversationId: "a1-03" });
    return {};
  });
  await flushPendingConversations();
  const list = JSON.parse((await AsyncStorage.getItem(KEY)) ?? "[]") as PendingConversation[];
  expect(list.map((x) => x.conversationId)).toEqual(["a1-03"]);
});
