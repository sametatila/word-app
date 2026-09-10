import { courseOrDefault } from "../lib/courses";
import { currentLang } from "../lib/i18n";

/**
 * Patika modül temaları — her 10 dersin ortak başlığı ("Tanışma ve ben",
 * "Bürokrasi"…). Kursun MÜFREDATINI anlatır, arayüz metni değil: Almanca kursunun
 * modül sırası bu.
 *
 * İki yerde birebir kopyalanmış duruyordu (immersionTrack ve immersionQuiz);
 * ünite başlığı ile o ünitenin quiz'i aynı listeden gelmek zorunda, kopya ikisinin
 * sessizce ayrışmasına açık kapı bırakıyordu. Tek kaynak burası.
 *
 * Kursa göre anahtarlı. Aynı hedef dili paylaşan kursa düşülür (gsw-zh → de),
 * başka dile asla — ders yükleyicisiyle aynı kural. Bir kursun listesi yoksa
 * Patika ünitelere "A1 Ünite 3" gibi jenerik ad verir (bkz. immersionTrack).
 */
const BY_COURSE: Record<string, Record<string, string[]>> = {
  de: {
    A1: ["Tanışma ve ben", "Aile ve insanlar", "Yeme-içme", "Günlük düzen", "Alışveriş", "Şehirde", "Ev ve yaşam", "Boş zaman", "Sağlık ve vücut", "İletişim ve geçmişe ilk adım"],
    A2: ["Geçmişi anlatmak", "Benim hikâyem", "Sağlık", "Ev ve mahalle", "İş hayatı", "Alışveriş ve hizmetler", "Seyahat", "Kutlamalar ve ilişkiler", "Medya ve teknoloji", "Şehir ve resmî işler"],
    /* 11-18 web `lib/lessons/modules.ts` ile birebir. Web B1'i 2026-09-05'te on
       sekiz modüle genişletmişti (kapsanmayan 1059 B1 maddesi kümelendi, bkz.
       docs/plan/b1-yeniden-kurgu.md); mobil listede on tema kalmıştı. Oysa
       `de-b1.json` 180 ders taşıyor, yani 18 modül: Patika'nın 11-18. üniteleri
       adını bulamayıp "B1 Ünite 11" gibi jenerik etikete düşüyordu. */
    B1: ["İş dünyası", "Ev ve kira dünyası", "Bağlaç ustalığı", "İlgi cümleleri", "Bürokrasi", "Eğitim ve gelişim", "Fikir ve tartışma", "Sağlık sistemi", "Çevre ve şehir yaşamı", "Duygular ve hayaller", "Mutfak ve sofra", "Alışveriş, para ve banka", "Yolculuk ve ulaşım", "Beden, bakım ve yaşlanma", "Evde teknik ve onarım", "Meslekler ve iş yaşamı", "Toplum, hukuk ve göç", "Kültür, spor ve doğa"],
    B2: ["Profesyonel iletişim", "Müzakere ve şikâyet", "Edilgenin bütün hâlleri", "Medya ve aktarılan söz", "Bilim ve teknoloji", "Toplum ve ekonomi", "Kültür ve sanat", "Para ve kariyer stratejisi", "İnsan ilişkileri ve psikoloji", "Resmî yazışma ve kapanış"],
    C1: ["Zarif iş iletişimi", "Kip parçacıkları", "Retorik ve sunum sanatı", "Deyimler ve mecazlar", "Basın ve akademik aktarım", "Hukuk ve sözleşme dili", "Karmaşık yapılar", "Toplumsal tartışma", "Mizah, ironi ve incelik", "Ustalık sahneleri"],
  },
  // İngilizce kursu A1'de 100 ders = 10 tam modül. Sıra derslerin dizi sırasıyla
  // birebir aynı (mobile/src/data/lessons/en-a1.json); ders eklerken modülün
  // 10'luk sınırı korunmazsa ünite başlığı ile içeriği ayrışır.
  en: {
    A1: ["Tanışma ve ben", "Aile ve insanlar", "Yeme-içme", "Günlük düzen", "Alışveriş", "Şehirde", "Ev ve yaşam", "Boş zaman", "Sağlık ve vücut", "İletişim ve geçmişe ilk adım"],
    // A2 henüz yalnız ilk modül. Liste GERÇEK içerik kadar uzun tutuluyor:
    // olmayan modüle tema yazmak, dersler eklenirken sıranın kaymasıyla
    // başlığın içeriğinden ayrılmasına yol açar.
    A2: ["Geçmişi anlatmak", "Benim hikâyem", "Sağlık", "Ev ve mahalle", "İş hayatı", "Alışveriş ve hizmetler", "Seyahat", "Kutlamalar ve ilişkiler", "Medya ve teknoloji", "Şehir ve resmî işler"],
  },
};

/**
 * Temaların ANA DİLDEKİ karşılığı — anahtar Türkçe metnin kendisi.
 *
 * Web'de aynı çeviriler paralel DİZİ olarak duruyor (`lib/lessons/modules.ts`),
 * burada metne göre anahtarlı: mobil tablo kursa göre bölünmüş ve aynı tema
 * iki kursta birden geçiyor (`de` ve `en` A1/A2 listeleri birebir aynı).
 * Metne göre anahtarlamak o tekrarı bir kez yazdırıyor ve çağrı yerlerine
 * hiç dokunmuyor. Ölçüldü: iki tablodaki Türkçe tema kümesi birebir aynı,
 * 58 = 58.
 *
 * Eksik çeviride başlık KAYBOLMUYOR, Türkçe kalıyor — kartın kimliği o
 * başlık. Kapı: `__tests__/moduleThemes.test.ts`.
 */
const NATIVE: Record<"en" | "de", Record<string, string>> = {
  en: {
    "Tanışma ve ben": "Introductions and me",
    "Aile ve insanlar": "Family and people",
    "Yeme-içme": "Food and drink",
    "Günlük düzen": "Daily routine",
    "Alışveriş": "Shopping",
    "Şehirde": "In town",
    "Ev ve yaşam": "Home and living",
    "Boş zaman": "Free time",
    "Sağlık ve vücut": "Health and the body",
    "İletişim ve geçmişe ilk adım": "Communication and a first step into the past",
    "Geçmişi anlatmak": "Talking about the past",
    "Benim hikâyem": "My story",
    "Sağlık": "Health",
    "Ev ve mahalle": "Home and neighbourhood",
    "İş hayatı": "Working life",
    "Alışveriş ve hizmetler": "Shopping and services",
    "Seyahat": "Travel",
    "Kutlamalar ve ilişkiler": "Celebrations and relationships",
    "Medya ve teknoloji": "Media and technology",
    "Şehir ve resmî işler": "The city and official business",
    "İş dünyası": "The world of work",
    "Ev ve kira dünyası": "Housing and renting",
    "Bağlaç ustalığı": "Mastering connectors",
    "İlgi cümleleri": "Relative clauses",
    "Bürokrasi": "Bureaucracy",
    "Eğitim ve gelişim": "Education and development",
    "Fikir ve tartışma": "Opinion and debate",
    "Sağlık sistemi": "The health system",
    "Çevre ve şehir yaşamı": "Environment and city life",
    "Duygular ve hayaller": "Feelings and dreams",
    "Mutfak ve sofra": "Kitchen and table",
    "Alışveriş, para ve banka": "Shopping, money and banking",
    "Yolculuk ve ulaşım": "Journeys and transport",
    "Beden, bakım ve yaşlanma": "Body, care and ageing",
    "Evde teknik ve onarım": "Technology and repairs at home",
    "Meslekler ve iş yaşamı": "Professions and working life",
    "Toplum, hukuk ve göç": "Society, law and migration",
    "Kültür, spor ve doğa": "Culture, sport and nature",
    "Profesyonel iletişim": "Professional communication",
    "Müzakere ve şikâyet": "Negotiating and complaining",
    "Edilgenin bütün hâlleri": "The passive in all its forms",
    "Medya ve aktarılan söz": "Media and reported speech",
    "Bilim ve teknoloji": "Science and technology",
    "Toplum ve ekonomi": "Society and the economy",
    "Kültür ve sanat": "Culture and the arts",
    "Para ve kariyer stratejisi": "Money and career strategy",
    "İnsan ilişkileri ve psikoloji": "Relationships and psychology",
    "Resmî yazışma ve kapanış": "Formal correspondence and closing",
    "Zarif iş iletişimi": "Elegant business communication",
    "Kip parçacıkları": "Modal particles",
    "Retorik ve sunum sanatı": "Rhetoric and the art of presenting",
    "Deyimler ve mecazlar": "Idioms and metaphors",
    "Basın ve akademik aktarım": "Press and academic reporting",
    "Hukuk ve sözleşme dili": "Legal and contract language",
    "Karmaşık yapılar": "Complex structures",
    "Toplumsal tartışma": "Public debate",
    "Mizah, ironi ve incelik": "Humour, irony and nuance",
    "Ustalık sahneleri": "Mastery scenes",
  },
  de: {
    "Tanışma ve ben": "Vorstellen und ich",
    "Aile ve insanlar": "Familie und Menschen",
    "Yeme-içme": "Essen und Trinken",
    "Günlük düzen": "Tagesablauf",
    "Alışveriş": "Einkaufen",
    "Şehirde": "In der Stadt",
    "Ev ve yaşam": "Wohnen und Leben",
    "Boş zaman": "Freizeit",
    "Sağlık ve vücut": "Gesundheit und Körper",
    "İletişim ve geçmişe ilk adım": "Kommunikation und der erste Schritt in die Vergangenheit",
    "Geçmişi anlatmak": "Von der Vergangenheit erzählen",
    "Benim hikâyem": "Meine Geschichte",
    "Sağlık": "Gesundheit",
    "Ev ve mahalle": "Wohnung und Viertel",
    "İş hayatı": "Arbeitsleben",
    "Alışveriş ve hizmetler": "Einkaufen und Dienstleistungen",
    "Seyahat": "Reisen",
    "Kutlamalar ve ilişkiler": "Feiern und Beziehungen",
    "Medya ve teknoloji": "Medien und Technik",
    "Şehir ve resmî işler": "Stadt und Behördengänge",
    "İş dünyası": "Arbeitswelt",
    "Ev ve kira dünyası": "Wohnen und Mieten",
    "Bağlaç ustalığı": "Konnektoren meistern",
    "İlgi cümleleri": "Relativsätze",
    "Bürokrasi": "Behörden",
    "Eğitim ve gelişim": "Bildung und Weiterbildung",
    "Fikir ve tartışma": "Meinung und Diskussion",
    "Sağlık sistemi": "Gesundheitssystem",
    "Çevre ve şehir yaşamı": "Umwelt und Stadtleben",
    "Duygular ve hayaller": "Gefühle und Träume",
    "Mutfak ve sofra": "Küche und Tisch",
    "Alışveriş, para ve banka": "Einkauf, Geld und Bank",
    "Yolculuk ve ulaşım": "Reise und Verkehr",
    "Beden, bakım ve yaşlanma": "Körper, Pflege und Altern",
    "Evde teknik ve onarım": "Technik und Reparatur zu Hause",
    "Meslekler ve iş yaşamı": "Berufe und Berufsleben",
    "Toplum, hukuk ve göç": "Gesellschaft, Recht und Migration",
    "Kültür, spor ve doğa": "Kultur, Sport und Natur",
    "Profesyonel iletişim": "Professionelle Kommunikation",
    "Müzakere ve şikâyet": "Verhandeln und Reklamieren",
    "Edilgenin bütün hâlleri": "Das Passiv in allen Formen",
    "Medya ve aktarılan söz": "Medien und indirekte Rede",
    "Bilim ve teknoloji": "Wissenschaft und Technik",
    "Toplum ve ekonomi": "Gesellschaft und Wirtschaft",
    "Kültür ve sanat": "Kultur und Kunst",
    "Para ve kariyer stratejisi": "Geld und Karrierestrategie",
    "İnsan ilişkileri ve psikoloji": "Beziehungen und Psychologie",
    "Resmî yazışma ve kapanış": "Formeller Schriftverkehr und Abschluss",
    "Zarif iş iletişimi": "Eleganter Geschäftston",
    "Kip parçacıkları": "Modalpartikeln",
    "Retorik ve sunum sanatı": "Rhetorik und Präsentationskunst",
    "Deyimler ve mecazlar": "Redewendungen und Metaphern",
    "Basın ve akademik aktarım": "Presse und akademische Wiedergabe",
    "Hukuk ve sözleşme dili": "Rechts- und Vertragssprache",
    "Karmaşık yapılar": "Komplexe Strukturen",
    "Toplumsal tartışma": "Gesellschaftliche Debatte",
    "Mizah, ironi ve incelik": "Humor, Ironie und Feinheit",
    "Ustalık sahneleri": "Meisterszenen",
  },
};

function themesFor(course: string, level: string): string[] {
  const own = BY_COURSE[course];
  if (own) return own[level] ?? [];
  const target = courseOrDefault(course).targetLang;
  for (const id of Object.keys(BY_COURSE)) {
    if (courseOrDefault(id).targetLang === target) return BY_COURSE[id][level] ?? [];
  }
  return [];
}

/**
 * Modülün teması ÖĞRENCİNİN DİLİNDE; kursun listesi yoksa çağıran kendi
 * yedeğini kullanır.
 *
 * Dil argüman DEĞİL, `currentLang()`ten okunuyor — `nativeContent.ts` ile aynı
 * desen. Çağıranlar (Patika parkuru ve ünite quiz'i) cihazda türetiliyor ve
 * dil değişince ikisinin de önbelleği zaten boşalıyor.
 */
export function moduleTheme(course: string, level: string, moduleIndex: number): string | undefined {
  const tr = themesFor(course, level)[moduleIndex];
  if (!tr) return tr;
  const lang = currentLang();
  return lang === "tr" ? tr : (NATIVE[lang]?.[tr] ?? tr);
}
