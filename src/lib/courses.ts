/**
 * Kurs kayıt defteri (sunucu) — TEK KAYNAK.
 *
 * Kurs kimlikleri bugüne kadar literal dizilerle doğrulanıyordu
 * (`["de","gsw-zh"].includes(...)`) ve içerik çözümleyicileri
 * `course === "gsw-zh" ? … : "de"` kalıbıyla yazılmıştı. İkisi de yeni bir dil
 * eklendiğinde sessizce yanlış davranır: API yeni kursu reddeder, çözümleyici
 * ise onu Almancaya sayar. Burası o iki kararı tek yerde topluyor.
 *
 * Mobildeki `mobile/src/lib/courses.ts` ile aynı modeli taşır: `course` HEDEF
 * dili tutar, kullanıcının anadili ayrı bir eksendir (parite = anadil + kurs).
 * İki dosya ayrı çünkü web ile mobil ayrı paketler — ses kataloğu da öyle.
 */

export type CourseId = "de" | "gsw-zh" | "en";

export type Course = {
  id: CourseId;
  /** Konuşma/tanıma için temel dil kodu — aynı dilin lehçeleri bunu paylaşır. */
  targetLang: "de" | "en";
  /**
   * İçeriği hazır mı.
   *
   * API yalnızca hazır kursları kabul eder: içeriği olmayan bir kursa geçen
   * kullanıcı boş bir uygulamada kalırdı. Kurs hazır olduğunda burayı `true`
   * yapmak hem seçimi hem API kabulünü birlikte açar.
   */
  enabled: boolean;
};

export const COURSES: Course[] = [
  { id: "de", targetLang: "de", enabled: true },
  { id: "gsw-zh", targetLang: "de", enabled: true },
  // İçerik hattı (kelime + ders + beceri) hazır olunca açılacak.
  { id: "en", targetLang: "en", enabled: false },
];

const BY_ID = new Map<string, Course>(COURSES.map((c) => [c.id, c]));

export function isCourseId(value: string): value is CourseId {
  return BY_ID.has(value);
}

/** Kursu getirir; bilinmiyorsa `undefined` — sessizce Almancaya düşmez. */
export function getCourse(id: string | null | undefined): Course | undefined {
  return id ? BY_ID.get(id) : undefined;
}

/** Zorunlu bir `Course` gereken yerler için son çare (eski/bozuk tercih). */
export function courseOrDefault(id: string | null | undefined): Course {
  return getCourse(id) ?? BY_ID.get("de")!;
}

/**
 * Profilde saklanmasına izin verilen kurslar.
 *
 * `/api/profile` bunu kullanıyor. Hazır olmayan kurs kabul edilmez, yani
 * `enabled` bayrağı hem seçim ekranını hem sunucu doğrulamasını tek yerden
 * yönetiyor ve ikisi asla ayrışmıyor.
 */
export function acceptsCourse(value: string): boolean {
  return COURSES.some((c) => c.id === value && c.enabled);
}
