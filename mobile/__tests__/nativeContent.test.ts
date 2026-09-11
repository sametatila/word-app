/// <reference types="node" />
import { setLang } from "../src/lib/i18n";
import { nativeLesson, nativeExercise, translatedCourse } from "../src/lib/nativeContent";
import de from "../src/data/lessons/de-a1.json";
import en from "../src/data/lessons/en-a1.json";

/**
 * İKİ YÖNLÜ ÇEVİRİ — mobil tarafın kapısı.
 *
 * NEDEN TEST: hata SESSİZ. Çevrilmemiş içerik hata vermiyor, yalnız
 * kullanıcı anlamadığı dilde ders görüyor — ve bu bir kez zaten oldu:
 * `nativeContent` "yalnız en" diyordu, anadili Almanca olan kullanıcı
 * için sözlük pakette DURUYOR ama hiç açılmıyordu.
 *
 * Üç kural: çevirinin uygulandığı kurs anadille birlikte değişiyor,
 * Türkçe kullanan kaynağı olduğu gibi görüyor, ve karşılığı olmayan
 * içerik Türkçeye DÜŞÜYOR (yarım çeviri yok).
 */
type Lesson = { id: string; course?: string; titleTr: string; vocab: { de: string; tr: string }[] };
const deLesson = (de as unknown as Lesson[])[0];
const enLesson = (en as unknown as Lesson[])[0];

afterAll(async () => { await setLang("tr"); });

test("çevrilen kurs anadile göre değişiyor", async () => {
  await setLang("tr");
  expect(translatedCourse()).toBeNull();
  await setLang("en");
  expect(translatedCourse()).toBe("de");
  await setLang("de");
  expect(translatedCourse()).toBe("en");
});

test("anadili Almanca olan İngilizce dersi Almanca görüyor", async () => {
  await setLang("de");
  const out = nativeLesson(enLesson);
  expect(out.titleTr).not.toBe(enLesson.titleTr);
  // Türkçeye özgü harf kalmamalı: kalan bir `ş` çevrilmemiş metin demek.
  expect(out.vocab.map((v) => v.tr).join(" ")).not.toMatch(/[ışğİŞĞ]/);
  // Almanca kursun dersi bu anadil için çevrilmiyor (kendi dilini öğretmiyoruz).
  expect(nativeLesson(deLesson).titleTr).toBe(deLesson.titleTr);
});

test("anadili İngilizce olan Almanca dersi İngilizce görüyor", async () => {
  await setLang("en");
  const out = nativeLesson(deLesson);
  expect(out.titleTr).not.toBe(deLesson.titleTr);
  expect(nativeLesson(enLesson).titleTr).toBe(enLesson.titleTr);
});

test("Türkçe kullanan kaynağı olduğu gibi görüyor", async () => {
  await setLang("tr");
  expect(nativeLesson(enLesson)).toBe(enLesson);
  expect(nativeLesson(deLesson)).toBe(deLesson);
  expect(nativeExercise({ id: "yok", course: "en" })).toEqual({ id: "yok", course: "en" });
});
