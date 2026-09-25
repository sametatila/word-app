import AsyncStorage from "@react-native-async-storage/async-storage";
import { migrateLegacyKeys, sweepDeadKeys } from "../src/lib/storageMigration";
import { pruneConversationResumes } from "../src/game/pathProgress";

/**
 * CİHAZ DEPOSU TEMİZLİĞİ.
 *  - kodu silinmiş anahtarlar gider, güncel olanlar kalır,
 *  - eski marka adındaki sahipsiz anahtar da göçten sonra gider,
 *  - süresi geçmiş (ya da bozuk) yarım konuşma silinir, taze olan kalır.
 */
jest.mock("../src/api/client", () => ({ api: jest.fn(), fetchWithTimeout: jest.fn(), apiBase: () => "https://example.test", onBaseChange: () => () => {}, PRIMARY_BASE: "https://www.lernomi.app", FALLBACK_BASE: "https://lernomi.rumpuskit.com" }));

beforeEach(async () => {
  await AsyncStorage.clear();
});

test("sahipsiz anahtarlar silinir, güncel olanlar kalır", async () => {
  await AsyncStorage.setMany({
    "lernomi-lessons-done": "[]",
    "lernomi:mic-consent:v1": "x",
    "wortspiel-lessons-done": "[]",
    "lernomi:mic-consent:v2": "keep",
    "lernomi-items-done": "[]",
  });
  await migrateLegacyKeys();
  await sweepDeadKeys();
  expect([...(await AsyncStorage.getAllKeys())].sort()).toEqual(["lernomi-items-done", "lernomi:mic-consent:v2"]);
});

test("süresi geçmiş ve bozuk yarım konuşma silinir, taze olan kalır", async () => {
  const now = Date.now();
  await AsyncStorage.setMany({
    "lernomi-conversation-resume:eski": JSON.stringify({ cursor: 2, correct: 1, at: now - 4 * 86400000, phase: "chat", roleMsgs: [{ role: "user", content: "özel" }] }),
    "lernomi-conversation-resume:taze": JSON.stringify({ cursor: 2, correct: 1, at: now - 86400000 }),
    "lernomi-conversation-resume:bozuk": "{",
    "lernomi-theme": "dark",
  });
  await pruneConversationResumes();
  expect([...(await AsyncStorage.getAllKeys())].sort()).toEqual(["lernomi-conversation-resume:taze", "lernomi-theme"]);
});
