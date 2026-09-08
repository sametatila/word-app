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

/**
 * Kullanıcının anadili — arayüz ve anlatım dili. Kurs (hedef dil) ile birlikte
 * pariteyi kurar. Mobildeki NativeLang ile aynı küme.
 */
export type NativeLang = "tr" | "en" | "de";
export const NATIVE_LANGS: NativeLang[] = ["tr", "en", "de"];
/** Anadil yazılmamış eski hesaplar Türkçe sayılır (göç gerekmesin diye). */
export const DEFAULT_NATIVE: NativeLang = "tr";

export type Course = {
  id: CourseId;
  /** Konuşma/tanıma için temel dil kodu — aynı dilin lehçeleri bunu paylaşır. */
  targetLang: "de" | "en";
  /**
   * Kursun adı, ARAYÜZ dilinde. "Almanca öğren" / "Learn German" /
   * "Deutsch lernen" — üçü de aynı kursun adı, üç ayrı okuyucu için.
   *
   * Sabit yazılıydı ("Almanca") ve arayüz tek dile gömülü olduğu sürece sorun
   * değildi. Mobilde bu harita baştan beri var (`M/src/lib/courses.ts`) ve
   * değerler oradan birebir alındı.
   */
  label: Record<NativeLang, string>;
  /** Kursun alt satırı — lehçe/kapsam bilgisi, yine arayüz dilinde. */
  sub: Record<NativeLang, string>;
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
  {
    id: "de",
    targetLang: "de",
    label: { tr: "Almanca", en: "German", de: "Deutsch" },
    sub: {
      tr: "Hochdeutsch · CEFR A1–C1",
      en: "Standard German · CEFR A1–C1",
      de: "Hochdeutsch · CEFR A1–C1",
    },
    enabled: true,
  },
  {
    id: "gsw-zh",
    targetLang: "de",
    label: { tr: "Zürih Almancası", en: "Zurich German", de: "Züritüütsch" },
    sub: {
      tr: "Züritüütsch · İsviçre lehçesi",
      en: "Züritüütsch · Swiss dialect",
      de: "Züritüütsch · Schweizer Dialekt",
    },
    enabled: true,
  },
  // Kelime katmanı hazır; ders/beceri içeriği henüz yok.
  {
    id: "en",
    targetLang: "en",
    label: { tr: "İngilizce", en: "English", de: "Englisch" },
    sub: {
      tr: "İngilizce · CEFR A1–C1",
      en: "English · CEFR A1–C1",
      de: "Englisch · CEFR A1–C1",
    },
    enabled: true,
  },
];

/** Kursun adı, verilen arayüz dilinde — mobil `targetLangName()` karşılığı. */
export function courseName(courseId: string | null | undefined, lang: NativeLang): string {
  return courseOrDefault(courseId).label[lang];
}

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

/**
 * Profilde saklanmasına izin verilen anadiller.
 *
 * Kurs doğrulamasının eşi: arayüz dili de sunucuya yazılıyor (cihaz değişince
 * tercih kaybolmasın diye) ve serbest metin kabul edilmemeli.
 */
export function acceptsNativeLang(value: string): boolean {
  return (NATIVE_LANGS as readonly string[]).includes(value);
}

/**
 * Kursun deneme sınavı dili.
 *
 * Kâğıtlar kurs kimliğine değil HEDEF dile bağlı: Züritüütsch kursunun hedefi
 * de Almanca olduğu için aynı Almanca kâğıtları çözer, ayrı bir katalog
 * gerekmez. Bilinmeyen kurs Almancaya düşüyor çünkü çağıran yerde (liste
 * sayfası) boş katalog ile Almanca katalog arasındaki fark kullanıcı için
 * "sınav yok" demek; varsayılan kursun kâğıtlarını göstermek daha az kırık.
 */
export function mockCourseOf(id: string | null | undefined): "de" | "en" {
  return courseOrDefault(id).targetLang;
}
