import AsyncStorage from "@react-native-async-storage/async-storage";
import { migrateLegacyKeys, sweepDeadKeys } from "../src/lib/storageMigration";
import { pruneLessonResumes } from "../src/game/lessonProgress";

/**
 * CİHAZ DEPOSU TEMİZLİĞİ.
 *  - kodu silinmiş anahtarlar gider, güncel olanlar kalır,
 *  - eski marka adındaki sahipsiz anahtar da göçten sonra gider,
 *  - süresi geçmiş (ya da bozuk) yarım ders silinir, taze olan kalır.
 */
jest.mock("../src/api/client", () => ({ api: jest.fn(), fetchWithTimeout: jest.fn(), API_BASE: "https://example.test" }));

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

test("süresi geçmiş ve bozuk yarım ders silinir, taze olan kalır", async () => {
  const now = Date.now();
  await AsyncStorage.setMany({
    "lernomi-lesson-resume:eski": JSON.stringify({ cursor: 2, correct: 1, at: now - 4 * 86400000, phase: "roleplay", roleMsgs: [{ role: "user", content: "özel" }] }),
    "lernomi-lesson-resume:taze": JSON.stringify({ cursor: 2, correct: 1, at: now - 86400000 }),
    "lernomi-lesson-resume:bozuk": "{",
    "lernomi-theme": "dark",
  });
  await pruneLessonResumes();
  expect([...(await AsyncStorage.getAllKeys())].sort()).toEqual(["lernomi-lesson-resume:taze", "lernomi-theme"]);
});
