/// <reference types="node" />
import { setLang } from "../src/lib/i18n";
import { ensureNativeDict, nativeContentReady, nativeConversation, nativeExercise, onNativeContentChange, translatedCourse } from "../src/lib/nativeContent";
import { ensurePack } from "../src/content/store";
import de from "../src/data/conversations/de-a1.json";
import en from "../src/data/conversations/en-a1.json";

/**
 * İKİ YÖNLÜ ÇEVİRİ — mobil tarafın kapısı.
 *
 * NEDEN TEST: hata SESSİZ. Çevrilmemiş içerik hata vermiyor, yalnız
 * kullanıcı anlamadığı dilde konuşma görüyor — ve bu bir kez zaten oldu:
 * `nativeContent` "yalnız en" diyordu, anadili Almanca olan kullanıcı
 * için sözlük pakette DURUYOR ama hiç açılmıyordu.
 *
 * Üç kural: çevirinin uygulandığı kurs anadille birlikte değişiyor,
 * Türkçe kullanan kaynağı olduğu gibi görüyor, ve karşılığı olmayan
 * içerik Türkçeye DÜŞÜYOR (yarım çeviri yok).
 *
 * SÖZLÜK ARTIK PAKETTE DEĞİL, İNDİRİLİYOR (10,5 MB ikiliden çıktı). Test
 * içerik deposunu taklit edip sözlüğü KAYNAKTAN veriyor; böylece hem eski üç
 * kural hem de yeni yükleme yolu (`ensureNativeDict`) ölçülmüş oluyor.
 */
jest.mock("../src/content/store", () => {
  const fs = require("node:fs") as typeof import("node:fs");
  const path = require("node:path") as typeof import("node:path");
  const file = (pack: string) =>
    path.join(__dirname, "..", "..", "src", "lib", "conversations", "generated", pack === "native/de" ? "native-de.json" : "native-en.json");
  const load = (pack: string) => JSON.parse(fs.readFileSync(file(pack), "utf8")) as Record<string, unknown>;
  return {
    ensurePack: jest.fn(async () => true),
    listContentItems: jest.fn(async (pack: string) => Object.keys(load(pack))),
    getContentItem: jest.fn(async (pack: string, item: string) => load(pack)[item] ?? null),
    syncContentPointer: jest.fn(async () => ({ r: 1, d: [] })),
    isContentDisabled: jest.fn(() => false),
    contentRelease: jest.fn(() => 1),
  };
});
type Conversation = { id: string; course?: string; titleTr: string; vocab: { de: string; tr: string }[] };
const deConversation = (de as unknown as Conversation[])[0];
const enConversation = (en as unknown as Conversation[])[0];

afterAll(async () => { await setLang("tr"); });

test("çevrilen kurs anadile göre değişiyor", async () => {
  await setLang("tr");
  expect(translatedCourse()).toBeNull();
  await setLang("en");
  expect(translatedCourse()).toBe("de");
  await setLang("de");
  expect(translatedCourse()).toBe("en");
});

test("anadili Almanca olan İngilizce konuşmayı Almanca görüyor", async () => {
  await setLang("de");
  await ensureNativeDict();
  const out = nativeConversation(enConversation);
  expect(out.titleTr).not.toBe(enConversation.titleTr);
  // Türkçeye özgü harf kalmamalı: kalan bir `ş` çevrilmemiş metin demek.
  expect(out.vocab.map((v) => v.tr).join(" ")).not.toMatch(/[ışğİŞĞ]/);
  // Almanca kursun konuşması bu anadil için çevrilmiyor (kendi dilini öğretmiyoruz).
  expect(nativeConversation(deConversation).titleTr).toBe(deConversation.titleTr);
});

test("anadili İngilizce olan Almanca konuşmayı İngilizce görüyor", async () => {
  await setLang("en");
  await ensureNativeDict();
  const out = nativeConversation(deConversation);
  expect(out.titleTr).not.toBe(deConversation.titleTr);
  expect(nativeConversation(enConversation).titleTr).toBe(enConversation.titleTr);
});

test("Türkçe kullanan kaynağı olduğu gibi görüyor", async () => {
  await setLang("tr");
  /* Türkçe için indirme HİÇ yapılmıyor; çağrı bir şey yapmadan dönüyor. */
  await ensureNativeDict();
  expect(nativeConversation(enConversation)).toBe(enConversation);
  expect(nativeConversation(deConversation)).toBe(deConversation);
  expect(nativeExercise({ id: "yok", course: "en" })).toEqual({ id: "yok", course: "en" });
});

/*
  SÖZLÜK İNİNCE HABER VERİLİYOR. Ekranlar sözlükten önce çizilebiliyor ve
  eskiden sözlük inince hiçbir şey yeniden çizilmiyordu: kullanıcı ekranı
  kapatıp açana dek Türkçe görüyordu.
*/
test("sözlük kurulunca aboneler haber alıyor", async () => {
  await setLang("tr");
  const seen = jest.fn();
  const off = onNativeContentChange(seen);
  await setLang("en");
  expect(nativeContentReady()).toBe(false);
  await ensureNativeDict();
  expect(nativeContentReady()).toBe(true);
  expect(seen).toHaveBeenCalled();
  off();
});

/*
  YARIŞ: İngilizce sözlük inerken Almancaya geçen kullanıcı eskiden süren
  (İngilizce) indirmenin sözünü alıyordu; o söz dil değiştiği için hiçbir şey
  kurmadan bitiyor ve Almanca sözlük hiç istenmiyordu.
*/
test("indirme sürerken dil değişirse yeni dilin sözlüğü iniyor", async () => {
  await setLang("tr");
  await setLang("en");
  const first = ensureNativeDict();
  await setLang("de");
  await ensureNativeDict();
  await first;
  expect(nativeContentReady()).toBe(true);
  expect(nativeConversation(enConversation).titleTr).not.toBe(enConversation.titleTr);
});

/* İNEMEYEN SÖZLÜK yeniden deneniyor — eskiden bir sonraki ön plana dönüşe kadar kimse denemiyordu. */
test("inemeyen sözlük kendiliğinden yeniden deneniyor", async () => {
  await setLang("tr");
  jest.useFakeTimers();
  try {
    (ensurePack as jest.Mock).mockResolvedValueOnce(false);
    await setLang("en");
    await ensureNativeDict();
    expect(nativeContentReady()).toBe(false);
    /* Kimse çağırmadan: yalnız zamanlayıcı ilerliyor, haber abonelikten geliyor. */
    const arrived = new Promise<void>((resolve) => {
      const off = onNativeContentChange(() => { off(); resolve(); });
    });
    jest.advanceTimersByTime(10_000);
    jest.useRealTimers();
    await arrived;
    expect(nativeContentReady()).toBe(true);
  } finally {
    jest.useRealTimers();
  }
});
