/** "Önceki sonucun" deposu (2026-10-07): son puan, en iyi, deneme, tarih; çıkışta temizlenir. */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { forgetItemCaches, getItemResult, recordItemScore } from "../src/game/pathProgress";
import { forgetAccountScoped } from "../src/lib/accountScope";

beforeEach(async () => {
  await AsyncStorage.clear();
  forgetItemCaches();
});

test("her bitiriş son puanı yazar, en iyiyi korur, denemeyi sayar", async () => {
  await recordItemScore("de-a1-read-01", 80);
  await recordItemScore("de-a1-read-01", 50);
  const r = await getItemResult("de-a1-read-01");
  expect(r?.pct).toBe(50);
  expect(r?.best).toBe(80);
  expect(r?.attempts).toBe(2);
  expect(r?.at).toBeTruthy();
});

test("denenmemiş alıştırmada sonuç yok", async () => {
  expect(await getItemResult("yok")).toBeNull();
});

test("çıkışta sonuçlar unutuluyor (cihaz deposu ve bellek)", async () => {
  await recordItemScore("de-a1-read-01", 90);
  await forgetAccountScoped();
  expect(await getItemResult("de-a1-read-01")).toBeNull();
});
