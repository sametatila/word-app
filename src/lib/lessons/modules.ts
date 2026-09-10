import { DEFAULT_NATIVE, type NativeLang } from "@/lib/courses";

/**
 * Yol haritasının modül (ünite) katmanı.
 *
 * Müfredat her seviyeyi 10 derslik 10 tematik modüle bölüyor
 * (data/lessons-plan/topics-*.md) ama ders verisi bunu taşımıyor: modül,
 * içerik motorunun değil sunumun kavramı. Harita dersleri katalog sırasıyla
 * 10'arlı dilimleyip temayı buradan alıyor — dersin kendisine modül alanı
 * eklemek, 500 dosyalık içerikte tekrarlanan ama yalnızca tek ekranda
 * kullanılan bir alan yaratırdı.
 *
 * Adlar topics dosyalarındaki modül başlıklarının tema kısmı; parantez içi
 * dilbilgisi notları öğrenciye değil üreticiye yazıldığı için burada yok.
 */
export const MODULE_SIZE = 10;

/**
 * Temalar ÜÇ DİLDE ve bu bir arayüz sözlüğü değil.
 *
 * Ünite başlığı Patika'nın en görünür metni: hub kartında, ünite sayfasının
 * başlığında, quiz ve dilbilgisi alt başlığında, modül sınavı satırında.
 * Tek dilde tutulduğu sürece anadili İngilizce ya da Almanca olan kullanıcı
 * ekranın ortasında Türkçe bir başlık görüyordu — en→de paritesi açıkken de
 * böyleydi, yani canlı bir kusurdu.
 *
 * `src/i18n`'e KONMADI, çünkü bunlar müfredatın adları: hangi on dersin bir
 * arada durduğunu söylüyorlar ve ders listesiyle birlikte değişiyorlar
 * (B1 2026-09-05'te on sekiz modüle çıktığında liste de uzadı). Arayüz
 * sözlüğüne taşımak, müfredat değiştikçe iki dosyanın ayrışması demek olurdu.
 * Bunun yerine tek tablo, üç sütun — ve `test:gloss` üç sütunun aynı boyda
 * kalmasını ölçüyor.
 *
 * Kaynak dil Türkçe: eksik bir çeviride başlık KAYBOLMUYOR, Türkçe kalıyor.
 * Kartın kimliği o başlık; boş bırakmak üniteyi adsız bırakırdı.
 */
export const MODULE_THEMES: Record<string, string[]> = {
  A1: [
    "Tanışma ve ben",
    "Aile ve insanlar",
    "Yeme-içme",
    "Günlük düzen",
    "Alışveriş",
    "Şehirde",
    "Ev ve yaşam",
    "Boş zaman",
    "Sağlık ve vücut",
    "İletişim ve geçmişe ilk adım",
  ],
  A2: [
    "Geçmişi anlatmak",
    "Benim hikâyem",
    "Sağlık",
    "Ev ve mahalle",
    "İş hayatı",
    "Alışveriş ve hizmetler",
    "Seyahat",
    "Kutlamalar ve ilişkiler",
    "Medya ve teknoloji",
    "Şehir ve resmî işler",
  ],
  B1: [
    "İş dünyası",
    "Ev ve kira dünyası",
    "Bağlaç ustalığı",
    "İlgi cümleleri",
    "Bürokrasi",
    "Eğitim ve gelişim",
    "Fikir ve tartışma",
    "Sağlık sistemi",
    "Çevre ve şehir yaşamı",
    "Duygular ve hayaller",
    // 11-18: B1 katmanının kalan yarısını kapsayan genişleme (2026-09-05).
    // Temalar uydurulmadı — modül 1-10 bittikten sonra havuzda KAPSANMAYAN
    // 1059 B1 maddesi kümelendi ve her tema en az 80 madde bulduğu yerde
    // açıldı. Bkz. docs/plan/b1-yeniden-kurgu.md §5 Adım 2.
    "Mutfak ve sofra",
    "Alışveriş, para ve banka",
    "Yolculuk ve ulaşım",
    "Beden, bakım ve yaşlanma",
    "Evde teknik ve onarım",
    "Meslekler ve iş yaşamı",
    "Toplum, hukuk ve göç",
    "Kültür, spor ve doğa",
  ],
  B2: [
    "Profesyonel iletişim",
    "Müzakere ve şikâyet",
    "Edilgenin bütün hâlleri",
    "Medya ve aktarılan söz",
    "Bilim ve teknoloji",
    "Toplum ve ekonomi",
    "Kültür ve sanat",
    "Para ve kariyer stratejisi",
    "İnsan ilişkileri ve psikoloji",
    "Resmî yazışma ve kapanış",
  ],
  C1: [
    "Zarif iş iletişimi",
    "Kip parçacıkları",
    "Retorik ve sunum sanatı",
    "Deyimler ve mecazlar",
    "Basın ve akademik aktarım",
    "Hukuk ve sözleşme dili",
    "Karmaşık yapılar",
    "Toplumsal tartışma",
    "Mizah, ironi ve incelik",
    "Ustalık sahneleri",
  ],
};

/** Türkçe listenin ÇEVİRİSİ — sıra ve uzunluk birebir aynı olmak zorunda.
 *  Kaynak dil (`tr`) burada YOK: karşılığı kendisidir. */
export const MODULE_THEMES_NATIVE: Partial<Record<NativeLang, Record<string, string[]>>> = {
  en: {
    A1: [
      "Introductions and me",
      "Family and people",
      "Food and drink",
      "Daily routine",
      "Shopping",
      "In town",
      "Home and living",
      "Free time",
      "Health and the body",
      "Communication and a first step into the past",
    ],
    A2: [
      "Talking about the past",
      "My story",
      "Health",
      "Home and neighbourhood",
      "Working life",
      "Shopping and services",
      "Travel",
      "Celebrations and relationships",
      "Media and technology",
      "The city and official business",
    ],
    B1: [
      "The world of work",
      "Housing and renting",
      "Mastering connectors",
      "Relative clauses",
      "Bureaucracy",
      "Education and development",
      "Opinion and debate",
      "The health system",
      "Environment and city life",
      "Feelings and dreams",
      "Kitchen and table",
      "Shopping, money and banking",
      "Journeys and transport",
      "Body, care and ageing",
      "Technology and repairs at home",
      "Professions and working life",
      "Society, law and migration",
      "Culture, sport and nature",
    ],
    B2: [
      "Professional communication",
      "Negotiating and complaining",
      "The passive in all its forms",
      "Media and reported speech",
      "Science and technology",
      "Society and the economy",
      "Culture and the arts",
      "Money and career strategy",
      "Relationships and psychology",
      "Formal correspondence and closing",
    ],
    C1: [
      "Elegant business communication",
      "Modal particles",
      "Rhetoric and the art of presenting",
      "Idioms and metaphors",
      "Press and academic reporting",
      "Legal and contract language",
      "Complex structures",
      "Public debate",
      "Humour, irony and nuance",
      "Mastery scenes",
    ],
  },
  de: {
    A1: [
      "Vorstellen und ich",
      "Familie und Menschen",
      "Essen und Trinken",
      "Tagesablauf",
      "Einkaufen",
      "In der Stadt",
      "Wohnen und Leben",
      "Freizeit",
      "Gesundheit und Körper",
      "Kommunikation und der erste Schritt in die Vergangenheit",
    ],
    A2: [
      "Von der Vergangenheit erzählen",
      "Meine Geschichte",
      "Gesundheit",
      "Wohnung und Viertel",
      "Arbeitsleben",
      "Einkaufen und Dienstleistungen",
      "Reisen",
      "Feiern und Beziehungen",
      "Medien und Technik",
      "Stadt und Behördengänge",
    ],
    B1: [
      "Arbeitswelt",
      "Wohnen und Mieten",
      "Konnektoren meistern",
      "Relativsätze",
      "Behörden",
      "Bildung und Weiterbildung",
      "Meinung und Diskussion",
      "Gesundheitssystem",
      "Umwelt und Stadtleben",
      "Gefühle und Träume",
      "Küche und Tisch",
      "Einkauf, Geld und Bank",
      "Reise und Verkehr",
      "Körper, Pflege und Altern",
      "Technik und Reparatur zu Hause",
      "Berufe und Berufsleben",
      "Gesellschaft, Recht und Migration",
      "Kultur, Sport und Natur",
    ],
    B2: [
      "Professionelle Kommunikation",
      "Verhandeln und Reklamieren",
      "Das Passiv in allen Formen",
      "Medien und indirekte Rede",
      "Wissenschaft und Technik",
      "Gesellschaft und Wirtschaft",
      "Kultur und Kunst",
      "Geld und Karrierestrategie",
      "Beziehungen und Psychologie",
      "Formeller Schriftverkehr und Abschluss",
    ],
    C1: [
      "Eleganter Geschäftston",
      "Modalpartikeln",
      "Rhetorik und Präsentationskunst",
      "Redewendungen und Metaphern",
      "Presse und akademische Wiedergabe",
      "Rechts- und Vertragssprache",
      "Komplexe Strukturen",
      "Gesellschaftliche Debatte",
      "Humor, Ironie und Feinheit",
      "Meisterszenen",
    ],
  },
};

/**
 * Seviyedeki modül sayısı — tema listesinin uzunluğu tek doğru kaynak.
 *
 * B1 on değil ON SEKİZ modül taşıyor; bu sayı çağrı yerlerine elle yazıldığında
 * (`level === "B1" ? 18 : 10`) her yeni seviyede yeniden unutuluyor. Sayı
 * TÜRKÇE listeden okunuyor: çeviri eksik kalsa bile modül sayısı değişmemeli.
 */
export function moduleCount(level: string): number {
  return MODULE_THEMES[level]?.length ?? 0;
}

/**
 * Modül teması — bilinmeyen seviye ya da taşan dilim için boş döner.
 *
 * DİL ZORUNLU ARGÜMAN, varsayılanı yok. Varsayılan Türkçe olsaydı yeni bir
 * çağrı yeri sessizce Türkçe başlık basardı ve bunu hiçbir kapı görmezdi —
 * bu kusurun ilk hâli tam olarak böyle oluşmuştu.
 */
export function moduleTheme(level: string, moduleIdx: number, lang: NativeLang): string {
  const tr = MODULE_THEMES[level]?.[moduleIdx] ?? "";
  if (!tr || lang === DEFAULT_NATIVE) return tr;
  return MODULE_THEMES_NATIVE[lang]?.[level]?.[moduleIdx] ?? tr;
}
