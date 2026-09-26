import { courseOrDefault, DEFAULT_NATIVE, type NativeLang } from "@/lib/courses";

/**
 * Yol haritasının modül (ünite) katmanı.
 *
 * Müfredat her seviyeyi 10 konuşmalık tematik modüllere bölüyor
 * (data/conversations-plan/topics-*.md) ama konuşma verisi bunu taşımıyor: modül,
 * içerik motorunun değil sunumun kavramı. Harita konuşmaları katalog sırasıyla
 * 10'arlı dilimleyip temayı buradan alıyor — konuşmanın kendisine modül alanı
 * eklemek, 500 dosyalık içerikte tekrarlanan ama yalnızca tek ekranda
 * kullanılan bir alan yaratırdı.
 *
 * Adlar topics dosyalarındaki modül başlıklarının tema kısmı; parantez içi
 * dilbilgisi notları öğrenciye değil üreticiye yazıldığı için burada yok.
 */
export const MODULE_SIZE = 10;

/**
 * Temalar KURSA VE SEVİYEYE göre, üç dilde.
 *
 * Ünite başlığı Patika'nın en görünür metni: hub kartında, ünite sayfasının
 * başlığında, quiz ve dilbilgisi alt başlığında, modül sınavı satırında.
 *
 * KURS BOYUTU 2026-09-21'de eklendi ve eklenene kadar sessiz bir kusurdu.
 * Tablo yalnız seviyeye göre anahtarlıydı, yani iki kurs aynı listeyi
 * paylaşıyordu; bu A1-B2'de doğru (İngilizce konuşmalar aynı temalara oturuyor,
 * ölçüldü: 40/40) ama C1'de ONUNDA BİRDEN yanlıştı — Almanca C1 müfredatı
 * dilin kendisini konu ediyor ("Kip parçacıkları", "Deyimler ve mecazlar"),
 * İngilizce C1 ise alan konularını (hukuk, göç, tarım, iklim). İngilizce
 * öğrenen biri Patika'da on ünitenin onunda da başka bir konuşmanın adını
 * görüyordu. `moduleCount` da aynı tablodan okuduğu için İngilizce B1'i on
 * sekiz modül sanıyordu; gerçekte on.
 *
 * Seviye listesinin UZUNLUĞU o kursun gerçek modül sayısı: Almanca B1 on
 * sekiz, İngilizce B1 on. Olmayan modüle tema yazmak, konuşmalar eklendikçe
 * başlığın içeriğinden ayrılması demek.
 *
 * `src/i18n`'e KONMADI, çünkü bunlar müfredatın adları: hangi on konuşmanın bir
 * arada durduğunu söylüyorlar ve konuşma listesiyle birlikte değişiyorlar
 * (B1 2026-09-05'te on sekiz modüle çıktığında liste de uzadı). Arayüz
 * sözlüğüne taşımak, müfredat değiştikçe iki dosyanın ayrışması demek olurdu.
 * Bunun yerine tek tablo, üç dil — ve `test:gloss` üçünün de tam olmasını
 * ölçüyor.
 *
 * Kaynak dil Türkçe: eksik bir çeviride başlık KAYBOLMUYOR, Türkçe kalıyor.
 * Kartın kimliği o başlık; boş bırakmak üniteyi adsız bırakırdı.
 *
 * İki kursun A1-B2 listeleri bugün birebir aynı ve AÇIKÇA iki kez yazılıyor,
 * biri ötekinden türetilmiyor. Türetme, İngilizce bir modülün teması
 * değiştiği gün Almancasını da değiştirirdi — oysa bunlar iki ayrı
 * müfredat ve bugünkü örtüşme bir tesadüf, bir kural değil.
 *
 * Mobilde ikizi var (`mobile/src/data/moduleThemes.ts`): React Native bu
 * dosyayı içe aktaramıyor. İkisini `npm run parity` ve mobilin
 * `__tests__/moduleThemes.test.ts` kapısı birlikte tutuyor.
 */
export const MODULE_THEMES: Record<string, Record<string, string[]>> = {
  // Almanca kurs (Zürih Almancası da bu listeyi kullanıyor: aynı müfredat,
  // aynı konuşmalar, yalnız hedef ağız farklı).
  de: {
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
      // açıldı (plan git geçmişinde: docs/plan/b1-yeniden-kurgu.md §5).
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
  },
  // İngilizce kurs. A1-B2 bugün Almanca kursla aynı temalara oturuyor (konuşma
  // konuşma ölçüldü); C1 ayrışıyor, çünkü müfredat orada dilin yapısını değil
  // alanları geziyor.
  en: {
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
      "Cümleleri bağlamak",
      "Tarif etmek ve karar vermek",
      "Bürokrasi",
      "Eğitim ve gelişim",
      "Fikir ve tartışma",
      "Sağlık sistemi",
      "Çevre ve şehir yaşamı",
      "Duygular ve hayaller",
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
      "Üslup ve dil düzeyi",
      "Tartışma ve karşı çıkma",
      "Hukuk ve sözleşme dili",
      "Edebiyat ve yorum",
      "Göç, aidiyet ve kültür",
      "Çalışma dünyası ve toplu sözleşme",
      "Toprak, gıda ve tarım",
      "İklim ve kent",
      "Ekonomi ve finans",
      "Kanıt, yargı ve seçim",
    ],
  },
};

/**
 * Temaların ANA DİLDEKİ karşılığı — anahtar TÜRKÇE METNİN KENDİSİ.
 *
 * Eskiden paralel DİZİ tutuluyordu (seviye başına aynı sırada bir çeviri
 * listesi) ve tek kurs varken bu yeterliydi. Kurs boyutu gelince yetmedi:
 * iki kursun kırk teması birebir aynı, paralel dizi onları dört kez
 * yazdırırdı (iki kurs × iki dil) ve dördünün sırası ayrı ayrı kayabilirdi.
 * Metne göre anahtarlamak her temayı bir kez yazdırıyor, sıra diye bir
 * kırılma noktası bırakmıyor ve mobil tablonun şekliyle de aynı.
 *
 * Kaynak dil (`tr`) burada YOK: karşılığı kendisidir.
 */
export const MODULE_THEMES_NATIVE: Partial<Record<NativeLang, Record<string, string>>> = {
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
    "Ev ve mahalle": "Home and neighborhood",
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
    "Beden, bakım ve yaşlanma": "Body, care and aging",
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
    "Mizah, ironi ve incelik": "Humor, irony and nuance",
    "Ustalık sahneleri": "Mastery scenes",
    "Üslup ve dil düzeyi": "Register and tone",
    "Tartışma ve karşı çıkma": "Debate and dissent",
    "Edebiyat ve yorum": "Literature and interpretation",
    "Göç, aidiyet ve kültür": "Migration, belonging and culture",
    "Çalışma dünyası ve toplu sözleşme": "Working life and collective bargaining",
    "Toprak, gıda ve tarım": "Land, food and farming",
    "İklim ve kent": "Climate and the city",
    "Ekonomi ve finans": "Economy and finance",
    "Kanıt, yargı ve seçim": "Evidence, judgment and choice",
    "Cümleleri bağlamak": "Linking ideas",
    "Tarif etmek ve karar vermek": "Describing and deciding",
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
    "Üslup ve dil düzeyi": "Register und Ton",
    "Tartışma ve karşı çıkma": "Debatte und Widerspruch",
    "Edebiyat ve yorum": "Literatur und Deutung",
    "Göç, aidiyet ve kültür": "Migration, Zugehörigkeit und Kultur",
    "Çalışma dünyası ve toplu sözleşme": "Arbeitswelt und Tarifverhandlungen",
    "Toprak, gıda ve tarım": "Boden, Ernährung und Landwirtschaft",
    "İklim ve kent": "Klima und Stadt",
    "Ekonomi ve finans": "Wirtschaft und Finanzen",
    "Kanıt, yargı ve seçim": "Beweis, Urteil und Wahl",
    "Cümleleri bağlamak": "Gedanken verbinden",
    "Tarif etmek ve karar vermek": "Beschreiben und entscheiden",
  },
};

/**
 * Kursun tema listesi — kendi listesi yoksa AYNI HEDEF DİLİ paylaşan kursunki.
 *
 * Zürih Almancası kursu Almanca kursun konuşmalarını okuyor, dolayısıyla
 * modülleri de onunkiler. Başka bir dile asla düşülmüyor: konuşma yükleyicisiyle
 * aynı kural, mobil `moduleThemes.ts` ile aynı davranış.
 */
function themesFor(course: string, level: string): string[] {
  const own = MODULE_THEMES[course];
  if (own) return own[level] ?? [];
  const target = courseOrDefault(course).targetLang;
  for (const id of Object.keys(MODULE_THEMES)) {
    if (courseOrDefault(id).targetLang === target) return MODULE_THEMES[id][level] ?? [];
  }
  return [];
}

/**
 * Seviyedeki modül sayısı — tema listesinin uzunluğu tek doğru kaynak.
 *
 * Almanca B1 on değil ON SEKİZ modül taşıyor, İngilizce B1 on; bu sayı çağrı
 * yerlerine elle yazıldığında (`level === "B1" ? 18 : 10`) her yeni seviyede
 * ve her yeni kursta yeniden unutuluyor. Sayı TÜRKÇE listeden okunuyor:
 * çeviri eksik kalsa bile modül sayısı değişmemeli.
 */
export function moduleCount(course: string, level: string): number {
  return themesFor(course, level).length;
}

/**
 * Modül teması — bilinmeyen kurs/seviye ya da taşan dilim için boş döner.
 *
 * KURS VE DİL ZORUNLU ARGÜMAN, ikisinin de varsayılanı yok. Dilin varsayılanı
 * Türkçe olsaydı yeni bir çağrı yeri sessizce Türkçe başlık basardı ve bunu
 * hiçbir kapı görmezdi — bu kusurun ilk hâli tam olarak böyle oluşmuştu.
 * Kursun varsayılanı da aynı şeyi yapardı: İngilizce öğrenciye Almanca
 * müfredatın başlığı, hatasız ve sessiz.
 */
export function moduleTheme(course: string, level: string, moduleIdx: number, lang: NativeLang): string {
  const tr = themesFor(course, level)[moduleIdx] ?? "";
  if (!tr || lang === DEFAULT_NATIVE) return tr;
  return MODULE_THEMES_NATIVE[lang]?.[tr] ?? tr;
}
