import "server-only";
import type { Lesson } from "./types";
import { resolveLesson, type NativeDict } from "./native";
import { DEFAULT_NATIVE, type NativeLang } from "@/lib/courses";

/**
 * Anlatım sözlüğünü SUNUCUDA, yalnız gerektiğinde yükler.
 *
 * Sözlük 1,7 MB — 8.824 anlatım dizesi, 4.640 kelime karşılığı, 580 ders
 * başlığı. Arayüz sözlükleriyle (`src/lib/i18n/dict.ts`) aynı yere konsaydı
 * her isteğe, her kullanıcıya, her dil için binerdi. Oysa Türkçe kullanan
 * biri onu HİÇ kullanmıyor: içerik zaten Türkçe.
 *
 * O yüzden `import()` gecikmeli ve sonucu modül düzeyinde tutuluyor —
 * Node süreci boyunca bir kez okunuyor. `native_lang` Türkçe olan bir
 * kurulumda dosya hiç açılmıyor.
 *
 * ÜRETİLEN DOSYA: `data/lessons/apply.mjs` yazıyor ve depoda durmuyor.
 * Yoksa özellik sessizce kapanıyor (ders Türkçe kalıyor) — çünkü eksik
 * sözlük yüzünden ders sayfasının açılmaması, çeviriden çok daha kötü.
 */
let cache: NativeDict | null | undefined;

async function nativeDict(): Promise<NativeDict | null> {
  if (cache !== undefined) return cache;
  try {
    const mod = await import("./generated/native-en.json");
    cache = (mod.default ?? mod) as unknown as NativeDict;
  } catch (err) {
    console.error("[native] sözlük yüklenemedi — `npm run lessons:apply` çalıştırıldı mı?", err);
    cache = null;
  }
  return cache;
}

/**
 * Dersi öğrencinin ana diline çevirir; çeviremezse dersi OLDUĞU GİBİ döner.
 *
 * Geri düşüş bilinçli ve yarım ders DEĞİL: `resolveLesson` hep-ya-hiç
 * çalışıyor, yani sonuç ya tümüyle İngilizce ya tümüyle Türkçe. Yasak olan
 * ikisinin karışması.
 *
 * Türkçe bir dersi İngilizce konuşana göstermek işe yaramaz ama ders
 * sayfasını hiç açmamak daha kötü. Asıl çözüm daha yukarıda: içeriği
 * çevrilmemiş bir kurs, o ana dil için kurs listesinde HİÇ görünmemeli
 * (`PAIR_READY`). Burası son çare.
 */
export async function localiseLesson(lesson: Lesson, lang: NativeLang | null | undefined): Promise<Lesson> {
  if (!lang || lang === DEFAULT_NATIVE) return lesson;
  if (lang !== "en") return lesson;
  const dict = await nativeDict();
  if (!dict) return lesson;
  const out = resolveLesson(dict, lesson);
  if (!out) {
    // `de-*` derslerinin hepsi çözülüyor (kapı: check:lessons-native).
    // Buraya düşen ders başka bir kurstan geliyor demektir.
    console.warn(`[native] ders çevrilemedi, Türkçe kalıyor: ${lesson.id}`);
    return lesson;
  }
  return out;
}

/**
 * Bir dersin ana dildeki BAŞLIĞI — bütün dersi çözmeye gerek olmayan yerler
 * için (sıradaki ders köprüsü, liste satırı).
 *
 * Karşılık yoksa `null`: çağıran taraf Türkçeye düşmek yerine o parçayı
 * göstermemeyi seçebilsin. İngilizce bir sayfanın içinde tek bir Türkçe
 * başlık, yarım çevirinin en görünür hâli.
 */
export async function nativeTitle(
  lessonId: string,
  lang: NativeLang | null | undefined,
): Promise<string | null> {
  if (!lang || lang === DEFAULT_NATIVE || lang !== "en") return null;
  const dict = await nativeDict();
  return dict?.meta[lessonId]?.title ?? null;
}
