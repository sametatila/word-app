import "server-only";
import type { MockLevel, MockPaper } from "./types";
import { packItems, packItemsAt } from "@/lib/content/serve";
import { mockIndexPack, packCourseOf, packCourseOfId, paperPack } from "@/lib/content/packs";

/**
 * KÂĞIT OKUYUCULARI — SUNUCU TARAFI.
 *
 * `server-only` ve bu dosyanın AYRI olmasının tek sebebi bu: `lib/mock-exams`
 * (index) istemci bileşenleri tarafından da içe alınıyor — oynatıcı oradan
 * tip ve süre hesabı okuyor. Okuyucular index'te dururken derleme
 * "'server-only' cannot be imported from a Client Component" diye kırıldı;
 * ölçülen bir kusur, tahmin değil.
 *
 * Kural: index SAF kalır (tip + hesap), veritabanına bakan her şey burada.
 */

/** Kataloğun künyeleri — başlık ve süre, madde yok (`mockindex` paketi). */
export type MockCatalogEntry = {
  id: string;
  no: number;
  level: MockLevel;
  course: "de" | "en";
  theme: string;
  themeTr: string;
  minutes: number;
  parts: { skill: string; minutes: number; points: number }[];
};

export async function mockCatalogFor(level: MockLevel, course = "de"): Promise<MockCatalogEntry[]> {
  const list = await packItems<MockCatalogEntry>(mockIndexPack(packCourseOf(course), level));
  return [...list].sort((a, b) => a.no - b.no);
}

/** Seviyenin kâğıtları — TAM gövde. Liste ekranları künyeyi tercih etmeli. */
export async function mockPapersFor(level: MockLevel, course = "de"): Promise<MockPaper[]> {
  const all = await packItems<MockPaper>(paperPack(packCourseOf(course)));
  return all.filter((p) => p.level === level).sort((a, b) => a.no - b.no);
}

export async function mockPaperById(id: string): Promise<MockPaper | null> {
  const all = await packItems<MockPaper>(paperPack(packCourseOfId(id)));
  return all.find((p) => p.id === id) ?? null;
}

/**
 * Kâğıdın BELİRLİ bir sürümdeki hâli — puanlamanın okuduğu yol.
 *
 * `release` yoksa (sabitlemeden önce açılmış deneme) canlı sürüme düşüyor:
 * başka bir doğru cevap yok.
 */
export async function mockPaperAt(release: number | null, id: string): Promise<MockPaper | null> {
  if (!release) return mockPaperById(id);
  const all = await packItemsAt<MockPaper>(release, paperPack(packCourseOfId(id)));
  return all.find((p) => p.id === id) ?? null;
}

/**
 * Kursun deneme sınavı KATALOĞU var mı.
 *
 * Seviyeden bağımsız ve AĞA ÇIKMIYOR: kâğıdı olan kurslar kapalı bir liste ve
 * bu soru kama çizilirken, her istekte soruluyor. Yeni bir kursa kâğıt
 * yazıldığında buraya da eklenecek — eklenmezse o kursta kama hiç görünmez.
 */
const MOCK_COURSES = ["de", "en"];

export function supportsMockExams(course: string): boolean {
  return MOCK_COURSES.includes(course);
}
