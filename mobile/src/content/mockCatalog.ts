import { ensurePack, getContentItem, listContentItems } from "./store";
import { mockCourseOf, type MockCourse, type MockLevel, type MockSkill } from "../data/exams";
import { nativeMockText, translatedCourse } from "../lib/nativeContent";
import { currentCourseId, type CourseId } from "../lib/courses";

/**
 * DENEME SINAVI KÜNYELERİ — listenin ihtiyacı olan her şey, kâğıtlar olmadan.
 *
 * Liste ekranı eskiden kâğıtların TAMAMINI okuyordu (`papers.json`, 5,4 MB,
 * ikilinin içinde), oysa çizdiği şey başlık, süre ve bölüm başına puandan
 * ibaret. Künye kâğıt başına ~320 bayt: tam kâğıdın doksan birde biri.
 *
 * Künyeler F0 içerik hattından geliyor (`mockindex/<kurs>-<seviye>` paketi) ve
 * KAPILI DEĞİL: liste kilitli kâğıtları da göstermek zorunda, kilidi görmeden
 * premium'un ne verdiği anlaşılmıyor. Kâğıdın kendisi kapılı ve ayrı yoldan
 * iniyor (`/api/mock-exam`, yetki kontrolüyle).
 *
 * İndirilen künye diskte kalıyor, yani liste ÇEVRİMDIŞI da açılıyor — sınavın
 * kendisi açılmıyor, ama "hangi kâğıtlar var" sorusu ağsız da cevaplanıyor.
 */

export type MockCatalogPart = { skill: MockSkill; minutes: number; points: number };

export type MockCatalogEntry = {
  id: string;
  no: number;
  level: MockLevel;
  course: MockCourse;
  theme: string;
  themeTr: string;
  minutes: number;
  parts: MockCatalogPart[];
};

function packOf(course: CourseId, level: MockLevel): string {
  return `mockindex/${mockCourseOf(course)}-${level.toLowerCase()}`;
}

/**
 * Bir seviyenin künyeleri, kâğıt numarasına göre sıralı.
 *
 * `themeTr` BURADA çevriliyor: künye kaynağın dilinde (Türkçe) yayınlanıyor ve
 * anadili İngilizce ya da Almanca olan kullanıcı karşılığını kendi
 * sözlüğünden alıyor — eski `mockPapersFor` ile aynı kural, aynı yerde.
 * Süzgeç kursa değil ANADİLE bağlı: çevrilen kurs anadille birlikte değişiyor.
 */
export async function mockCatalogFor(course: CourseId, level: MockLevel): Promise<MockCatalogEntry[]> {
  const pack = packOf(course, level);
  await ensurePack(pack);
  const ids = await listContentItems(pack);
  const out: MockCatalogEntry[] = [];
  for (const id of ids) {
    const entry = await getContentItem<MockCatalogEntry>(pack, id);
    if (entry) out.push(entry);
  }
  return out
    .sort((a, b) => a.no - b.no)
    .map((e) => (e.course === translatedCourse() ? { ...e, themeTr: nativeMockText("themeTr", e.themeTr) } : e));
}

/**
 * Kâğıt kimliğinden kurs: `de-a1-01` → `de`.
 *
 * İstatistik ekranı bunu etiketler için soruyordu ve cevabı kâğıdı BULARAK
 * veriyordu (`mockPaperById`) — yani 5,4 MB'lık paketi yalnız bir önek için
 * taşıyordu. Kimlik zaten kursu söylüyor; tanınmayan bir kimlikte kullanıcının
 * kendi kursu doğru varsayılan.
 */
export function mockCourseOfPaperId(paperId: string | null | undefined): MockCourse {
  const prefix = (paperId ?? "").split("-")[0];
  return prefix === "en" || prefix === "de" ? prefix : mockCourseOf(currentCourseId());
}
