/**
 * Kurs kayıt defteri — TEK KAYNAK.
 *
 * Kurs listesi bugüne kadar dört ayrı yerde elle tekrarlanıyordu (onboarding,
 * ayarlar, ses kataloğu, sunucu doğrulaması); yeni bir dil eklemek dördünü de
 * tek tek bulmayı gerektiriyordu. Daha tehlikelisi, içerik çözümleyicileri
 * `course === "gsw-zh" ? … : "de"` kalıbıyla yazılmıştı: tanınmayan bir kurs
 * hata vermeden **Almancaya düşüyordu**. Üçüncü bir dil eklendiğinde bu,
 * kullanıcıya sessizce yanlış dilde içerik göstermek demek. Bu yüzden burada
 * arama açık: bilinmeyen id `undefined` döner, çağıran ne yapacağına kendisi
 * karar verir.
 *
 * ## Model: hedef dil + anadil
 *
 * `course` **hedef** dili tutar (öğrenilen dil), `nativeLang` ise **kaynak**
 * dili (arayüz ve soru metni). Parite ikisinin bileşimidir:
 *
 *   tr → de   nativeLang "tr" + course "de"     (bugünkü tek parite)
 *   tr → en   nativeLang "tr" + course "en"
 *   en → de   nativeLang "en" + course "de"
 *   de → en   nativeLang "de" + course "en"
 *
 * Bu ayrım geriye dönük uyumlu: mevcut profillerde `course="de"` duruyor ve
 * `nativeLang` yokken Türkçe varsayıldığı için hepsi tr→de olarak kalıyor.
 * Ayrıca kelime satırları üç dilli olduğundan (Almanca terim + Türkçe ve
 * İngilizce karşılık) **en→de paritesi yeni kelime verisi istemiyor**: soru
 * metni mevcut satırın İngilizce karşılığından gelir.
 */

export type CourseId = "de" | "gsw-zh" | "en";
export type NativeLang = "tr" | "en" | "de";

export const NATIVE_LANGS: NativeLang[] = ["tr", "en", "de"];
export const DEFAULT_NATIVE: NativeLang = "tr";

export type Course = {
  id: CourseId;
  /** Konuşma tanıma/sentez için temel dil kodu. */
  targetLang: "de" | "en";
  /** TTS ve STT'ye gidecek yerel kod. */
  speechLocale: string;
  /** Anadile göre gösterilecek ad. */
  label: Record<NativeLang, string>;
  /** Ada eşlik eden kısa açıklama. */
  sub: Record<NativeLang, string>;
  /**
   * Hedef dilde dilbilgisel artikel var mı.
   *
   * Artikel Yarışı ve Çoğul Bilmece turları buna bağlı: İngilizcede der/die/das
   * karşılığı olmadığı için o iki mod İngilizce kursunda hiç üretilmemeli.
   */
  hasArticles: boolean;
  /**
   * İçeriği hazır mı.
   *
   * Hazır olmayan kurs seçim ekranlarında görünmez — kullanıcının boş bir
   * kursa girip kırık bir deneyim yaşamasındansa hiç görmemesi iyidir.
   */
  enabled: boolean;
};

export const COURSES: Course[] = [
  {
    id: "de",
    targetLang: "de",
    speechLocale: "de-DE",
    label: { tr: "Almanca", en: "German", de: "Deutsch" },
    sub: {
      tr: "Hochdeutsch · Goethe A1–C1",
      en: "Standard German · Goethe A1–C1",
      de: "Hochdeutsch · Goethe A1–C1",
    },
    hasArticles: true,
    enabled: true,
  },
  {
    id: "gsw-zh",
    targetLang: "de",
    speechLocale: "de-CH",
    label: { tr: "Zürih Almancası", en: "Zurich German", de: "Züritüütsch" },
    sub: {
      tr: "Züritüütsch · İsviçre lehçesi",
      en: "Züritüütsch · Swiss dialect",
      de: "Züritüütsch · Schweizer Dialekt",
    },
    hasArticles: true,
    enabled: true,
  },
  {
    id: "en",
    targetLang: "en",
    speechLocale: "en-US",
    label: { tr: "İngilizce", en: "English", de: "Englisch" },
    sub: {
      tr: "İngilizce · A1–C1",
      en: "English · A1–C1",
      de: "Englisch · A1–C1",
    },
    // İngilizcede isimlerin cinsiyeti yok; artikel/çoğul turları anlamsız.
    hasArticles: false,
    // İçerik hattı (kelime + ders + beceri) hazır olunca açılacak.
    enabled: false,
  },
];

const BY_ID = new Map<string, Course>(COURSES.map((c) => [c.id, c]));

/** Bilinen kurs mu? Sunucudan/depodan gelen ham dizgeyi daraltmak için. */
export function isCourseId(value: string): value is CourseId {
  return BY_ID.has(value);
}

/** Kursu getirir; bilinmiyorsa `undefined` — sessizce Almancaya düşmez. */
export function getCourse(id: string | null | undefined): Course | undefined {
  return id ? BY_ID.get(id) : undefined;
}

/**
 * Zorunlu bir `Course` gereken yerler için son çare.
 *
 * Yalnızca eski/bozuk bir tercih okunduğunda devreye girer; yeni kod
 * `getCourse` kullanıp bilinmeyeni açıkça ele almalı.
 */
export function courseOrDefault(id: string | null | undefined): Course {
  return getCourse(id) ?? BY_ID.get("de")!;
}

/** Seçim ekranlarının listeleyeceği kurslar — içeriği hazır olanlar. */
export function enabledCourses(): Course[] {
  return COURSES.filter((c) => c.enabled);
}

/** Kursun konuşma yerel kodu (TTS/STT). */
export function speechLocaleOf(id: string | null | undefined): string {
  return courseOrDefault(id).speechLocale;
}

/**
 * Bu tur tipi bu kursta üretilebilir mi?
 *
 * `artikel` ve `plural` Almancanın cinsiyetli isim sistemine dayanıyor;
 * İngilizcede karşılıkları yok. Tur listesi bunları kursa bakarak elemeli.
 */
export function supportsGame(id: string | null | undefined, game: string): boolean {
  if (game === "artikel" || game === "plural") return courseOrDefault(id).hasArticles;
  return true;
}
