import { courseOrDefault, type CourseId } from "../lib/courses";

/**
 * Deneme sınavı kataloğu — HEDEF DİLE göre.
 *
 * Bu ekran eskiden "Sınav hazırlık"tı ve iki şeyi listeliyordu, ikisi de
 * BAŞKA YERİN içeriğiydi:
 *
 *   - Lesen/Hören/Schreiben modülleri: aslında beceri alıştırmalarıydı; tam
 *     listesi Beceriler sekmesinde, aynı egzersizler Patika ünitelerinde de
 *     açılıyor. Burası her modülün yalnız İLK alıştırmasını açıyordu, yani
 *     eksik bir kopyaydı.
 *   - Seviye sınavı ve modül kâğıtları: `lib/exam.ts` bunları ders
 *     içeriğinden üretiyor, yani Patika'nın türevi.
 *
 * Ekran artık DENEME SINAVI demek: elle yazılmış, kendi başına duran sınav
 * kâğıtları. Başka bir yerin içeriği buraya türetilerek girmiyor — liste
 * bugün boş ve içerik buraya yazılacak.
 *
 * Hedef dile bağlanması bilinçli: Zürih Almancası kursunun hedefi de Almanca,
 * dolayısıyla aynı sınava hazırlanır. İngilizce kursunun karşılığı yok.
 *
 * İKİ AYRI SORU, İKİ AYRI FONKSİYON — karıştırılırsa ya kapı kapanır ya da
 * olmayan bir şeyin sözü verilir:
 *   supportsMockExams  kursun deneme sınavı KATALOĞU var mı → Öğren
 *                      sekmesindeki kutucuğun koşulu. Liste boşken de kapı
 *                      açık kalır; ekran o zaman dürüst boş durumunu gösterir.
 *   hasMockExams       kursta gerçekten sınav VAR mı → vaat içeren metinlerin
 *                      (paywall) koşulu. Olmayan sınavın sözü verilmez.
 */

export type ExamCatalog = {
  /**
   * Deneme sınavları. İçerik buraya girecek; girene kadar liste BOŞ kalır ve
   * ekran o seviyede sınav olmadığını söyler. Türetilmiş sınav (ders/ünite
   * üzerinden hesaplanan kâğıt) buraya konmaz — o Patika'nın işi.
   */
  mocks: readonly MockExam[];
};

export type MockExam = {
  /** Kalıcı kimlik; sonuç ve ilerleme kaydı buna bağlanır. */
  id: string;
  /** Sınavın adı. Sınavın kendi terimi olabilir, o hâlde çevrilmez. */
  label: string;
  /** Hangi CEFR seviyesi için. */
  level: string;
  /** Kâğıdın kendi süresi (dakika). */
  minutes: number;
};

const GERMAN: ExamCatalog = { mocks: [] };

const EMPTY: ExamCatalog = { mocks: [] };

const BY_TARGET: Record<string, ExamCatalog> = { de: GERMAN };

export function examCatalogFor(course: CourseId): ExamCatalog {
  return BY_TARGET[courseOrDefault(course).targetLang] ?? EMPTY;
}

/** Kursun deneme sınavı KATALOĞU var mı — Öğren sekmesindeki kutucuğun koşulu. */
export function supportsMockExams(course: CourseId): boolean {
  return courseOrDefault(course).targetLang in BY_TARGET;
}

/** Kursta gerçekten deneme sınavı VAR mı — vaat içeren metinlerin koşulu. */
export function hasMockExams(course: CourseId): boolean {
  return examCatalogFor(course).mocks.length > 0;
}
