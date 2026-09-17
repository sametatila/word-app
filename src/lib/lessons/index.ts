import type { Lesson } from "./types";
import { isCourseId } from "../courses";
import { packItems, packItemsAll } from "@/lib/content/serve";
import { lessonPack, packCourseOf, packCourseOfId, levelOfId } from "@/lib/content/packs";
import { courseOrDefault } from "../courses";

/**
 * DERS KATALOĞU — YAYIN HATTINDAN.
 *
 * İçerik eskiden burada statik `import` ile duruyordu (8,5 MB) ve mobil aynı
 * içeriği kendi paketinden okuyordu: iki platform, iki kaynak. Artık ikisi de
 * yayınlanmış paketleri okuyor — aynı baytlar, aynı sürüm.
 *
 * Kaynağın kendisi `./source` dosyasında ve oraya yalnız doğrulama betikleri,
 * mobil tohum dökümü ve yayın bakıyor. Bir rota onu içe alsaydı içerik yine
 * derlemeye girerdi.
 *
 * OKUMALAR ASYNC ve bu kaçınılmaz: paket veritabanından geliyor. Bedeli tek
 * seferlik — `lib/content/serve` paketi süreç belleğinde sürüm anahtarıyla
 * tutuyor, yani ikinci okuma bellekten. Sürüm değişince anahtar da değişiyor,
 * geçersizleştirme diye bir iş yok.
 */

export const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"] as const;

/** Seviyenin sıradaki dizini — karşılaştırma için. Bilinmeyen seviye 0 sayılır. */
export function levelIndex(level: string): number {
  const at = LEVEL_ORDER.indexOf(level as (typeof LEVEL_ORDER)[number]);
  return at < 0 ? 0 : at;
}

/** Kursun paket kursu: hedef dile göre (gsw-zh → de). */
function packCourseFor(course: string): "de" | "en" {
  return packCourseOf(courseOrDefault(isCourseId(course) ? course : "de").targetLang);
}

/**
 * Kursun dersleri, seviye sırasında.
 *
 * Eşleşme TAM: her kurs yalnız kendi derslerini alır. Yalnızca BİLİNMEYEN bir
 * id Almancaya düşer. Not: gsw-zh'ın diskte hiç dersi yok, bu yüzden Almanca
 * paketlerini okuyor — hedefi de Almanca.
 */
export async function lessonsFor(course: string): Promise<Lesson[]> {
  const key = isCourseId(course) ? course : "de";
  const pc = packCourseFor(key);
  const all = await packItemsAll<Lesson>(LEVEL_ORDER.map((level) => lessonPack(pc, level)));
  /* Paket kursu ile KURS aynı şey değil: gsw-zh Almanca paketlerini okuyor ama
     dersin kendi `course` alanı "de". Süzgeç ders alanına bakıyor. */
  return all.filter((l) => l.course === (pc === "en" ? "en" : "de") || l.course === key);
}

/** Bir seviyenin dersleri — tek paket, en ucuz okuma. */
export async function lessonsForLevel(course: string, level: string): Promise<Lesson[]> {
  return packItems<Lesson>(lessonPack(packCourseFor(course), level));
}

/**
 * Dersi kimliğinden bulur — kurs ve seviye kimliğin İÇİNDE ("de-b1-bewerbung").
 * Doğru pakete doğrudan gidiliyor; bütün katalogu okumak gerekmiyor.
 */
export async function findLesson(id: string): Promise<Lesson | undefined> {
  const level = levelOfId(id);
  if (!level) return undefined;
  const list = await packItems<Lesson>(lessonPack(packCourseOfId(id), level));
  return list.find((l) => l.id === id);
}

/** Tüm dersler — yalnız katalog geneli gereken yerler için (pahalı). */
export async function allLessons(): Promise<Lesson[]> {
  const packs: string[] = [];
  for (const pc of ["de", "en"] as const) for (const level of LEVEL_ORDER) packs.push(lessonPack(pc, level));
  return packItemsAll<Lesson>(packs);
}

/**
 * Dersin kendi seviyesindeki sırası (0 tabanlı).
 *
 * Modül pankartları ve rol yapma karakterleri bu sayıdan türüyor: paket
 * kaynak sırasını taşıdığı için dizin doğrudan o sıradan çıkıyor.
 */
export async function lessonIndexInLevel(lesson: Lesson): Promise<number> {
  const list = await packItems<Lesson>(lessonPack(packCourseOfId(lesson.id), lesson.level));
  const at = list.findIndex((l) => l.id === lesson.id);
  return at < 0 ? 0 : at;
}
