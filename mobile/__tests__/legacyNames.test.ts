import AsyncStorage from "@react-native-async-storage/async-storage";
import { migrateLegacyStorage } from "../src/lib/legacyNames";

/**
 * ESKİ ADLARIN CİHAZDAKİ TAŞIMASI (build 6 → 7, `lib/legacyNames`).
 *
 * NEDEN TEST: taşıma bozulursa hiçbir şey hata vermez; kullanıcı yarım
 * bıraktığı Konuşma adımını ve çevrimdışı bitirdiği adımın sonucunu sessizce
 * kaybeder. Sınananlar: bekleyen sonuç alan adlarıyla birlikte yeni anahtara
 * geçiyor, yarım adım yeni öneke ve yeni faz adına geçiyor, eski anahtarlar
 * kalmıyor, eski içerik paketi dizini siliniyor.
 */
jest.mock("../src/api/client", () => ({ api: jest.fn(), fetchWithTimeout: jest.fn(), API_BASE: "https://example.test" }));

beforeEach(async () => {
  await AsyncStorage.clear();
});

test("eski kayıtlar yeni anahtarlara bir kez taşınıyor", async () => {
  await AsyncStorage.setMany({
    "lernomi-lessons-pending": JSON.stringify([{ lessonId: "de-a1-hallo", correct: 3, roleplayDone: true, day: "2026-09-20", seconds: 60 }]),
    "lernomi-lesson-resume:de-a1-hallo": JSON.stringify({ cursor: 5, correct: 2, at: 1, phase: "roleplay", roleMsgs: [] }),
    "content:pack:lessons/de-a1": JSON.stringify({ r: 3, items: { "de-a1-hallo": "h1" } }),
    "content:body:h1": "{}",
    "lernomi-theme": "dark",
  });
  await migrateLegacyStorage();

  const keys = [...(await AsyncStorage.getAllKeys())].sort();
  expect(keys).toEqual(["lernomi-conversation-resume:de-a1-hallo", "lernomi-conversations-pending", "lernomi-theme"]);
  expect(JSON.parse((await AsyncStorage.getItem("lernomi-conversations-pending")) ?? "[]")).toEqual([
    { conversationId: "de-a1-hallo", correct: 3, chatDone: true, day: "2026-09-20", seconds: 60 },
  ]);
  expect(JSON.parse((await AsyncStorage.getItem("lernomi-conversation-resume:de-a1-hallo")) ?? "{}").phase).toBe("chat");
});

test("taşıma tekrar çalışınca yeni kayda dokunmuyor", async () => {
  await AsyncStorage.setItem("lernomi-conversations-pending", JSON.stringify([{ conversationId: "x", correct: 1, chatDone: false, day: "2026-09-21", seconds: 1 }]));
  await migrateLegacyStorage();
  expect(JSON.parse((await AsyncStorage.getItem("lernomi-conversations-pending")) ?? "[]")).toHaveLength(1);
});
