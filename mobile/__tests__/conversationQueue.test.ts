import AsyncStorage from "@react-native-async-storage/async-storage";
import { flushPendingConversations, newFinishId, queueConversationResult, type PendingConversation } from "../src/game/pathProgress";

/**
 * ÇEVRİMDIŞI BİTİRİLEN KONUŞMANIN KUYRUĞU.
 *
 * NEDEN TEST: cevap kuyruğuyla aynı sebep - hata SESSİZ. Konuşma bitmiş
 * görünüyor (yerel işaret), sunucu onu hiç öğrenmiyor. Üç kural sınanıyor:
 * kayıt kendi gününü taşıyor, aynı konuşma iki kez bitirilirse tek kayıt kalıyor,
 * gönderilemeyen kayıt kuyrukta duruyor.
 */
const KEY = "lernomi-conversations-pending";
const item: PendingConversation = { conversationId: "a1-01", correct: 7, chatDone: true, day: "2026-09-01", seconds: 300, finishId: "f-0000-aaaa" };

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

/* BİTİRİŞ KİMLİĞİ: `ConversationScreen`in anlık yeniden denemesi ve kuyruktan
   gönderim aynı `finishId`i taşımalı — sunucu ikinci kopyayı ancak böyle
   tanıyıp yazmıyor. Kuyruk kimliği saklamalı ve gövdede aynen göndermeli. */
test("kuyruk bitiriş kimliğini saklıyor ve aynen gönderiyor", async () => {
  await queueConversationResult(item);
  expect((JSON.parse((await AsyncStorage.getItem(KEY)) ?? "[]") as PendingConversation[])[0].finishId).toBe("f-0000-aaaa");
  api.mockResolvedValue({});
  await flushPendingConversations();
  const body = JSON.parse((api.mock.calls[0][1] as { body: string }).body) as PendingConversation;
  expect(body.finishId).toBe("f-0000-aaaa");
});

test("aynı konuşmanın yeni bitirişi eskisinin kimliğini değiştiriyor", async () => {
  await queueConversationResult(item);
  await queueConversationResult({ ...item, finishId: "f-1111-bbbb" });
  const list = JSON.parse((await AsyncStorage.getItem(KEY)) ?? "[]") as PendingConversation[];
  expect(list.map((x) => x.finishId)).toEqual(["f-1111-bbbb"]);
});

/* Bu değişiklikten önce kuyruğa girmiş kayıt kimliksiz: yine gidiyor, sunucu
   kimliksiz isteği eskisi gibi işliyor. */
test("kimliksiz eski kayıt da gönderiliyor", async () => {
  const eski: PendingConversation = { ...item };
  delete eski.finishId;
  await AsyncStorage.setItem(KEY, JSON.stringify([eski]));
  api.mockResolvedValue({});
  expect(await flushPendingConversations()).toBe(1);
  expect(await AsyncStorage.getItem(KEY)).toBeNull();
});

/* Kimlik sunucunun biçimine uymalı (`isFinishId`: 8-64, harf/rakam/-/_);
   uymayan kimlik 400 alır ve kuyruk sonucu düşürür. randomUUID olmayan
   ortamdaki yedek biçim de sınanıyor. */
test("üretilen kimlik sunucu biçimine uyuyor ve her seferinde farklı", () => {
  const bicim = /^[A-Za-z0-9_-]{8,64}$/;
  const a = newFinishId();
  const b = newFinishId();
  expect(a).toMatch(bicim);
  expect(a).not.toBe(b);
  const asil = globalThis.crypto;
  try {
    Object.defineProperty(globalThis, "crypto", { value: undefined, configurable: true });
    const yedek = newFinishId();
    expect(yedek).toMatch(bicim);
    expect(yedek).not.toBe(newFinishId());
  } finally {
    Object.defineProperty(globalThis, "crypto", { value: asil, configurable: true });
  }
});
