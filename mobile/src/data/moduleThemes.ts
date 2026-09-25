import { courseOrDefault } from "../lib/courses";
import { currentLang } from "../lib/i18n";

/**
 * Patika modül temaları — her 10 konuşmanın ortak başlığı ("Tanışma ve ben",
 * "Bürokrasi"…). Kursun MÜFREDATINI anlatır, arayüz metni değil: hangi on
 * konuşmanın bir arada durduğunu söyler ve konuşma listesiyle birlikte değişir.
 *
 * İki yerde birebir kopyalanmış duruyordu (immersionTrack ve immersionQuiz);
 * ünite başlığı ile o ünitenin quiz'i aynı listeden gelmek zorunda, kopya ikisinin
 * sessizce ayrışmasına açık kapı bırakıyordu. Tek kaynak burası.
 *
 * Kursa göre anahtarlı. Aynı hedef dili paylaşan kursa düşülür (gsw-zh → de),
 * başka dile asla — konuşma yükleyicisiyle aynı kural. Bir kursun listesi yoksa
 * Patika ünitelere "A1 Ünite 3" gibi jenerik ad verir (bkz. immersionTrack).
 */
const BY_COURSE: Record<string, Record<string, string[]>> = {
  de: {
    A1: ["Tanışma ve ben", "Aile ve insanlar", "Yeme-içme", "Günlük düzen", "Alışveriş", "Şehirde", "Ev ve yaşam", "Boş zaman", "Sağlık ve vücut", "İletişim ve geçmişe ilk adım"],
    A2: ["Geçmişi anlatmak", "Benim hikâyem", "Sağlık", "Ev ve mahalle", "İş hayatı", "Alışveriş ve hizmetler", "Seyahat", "Kutlamalar ve ilişkiler", "Medya ve teknoloji", "Şehir ve resmî işler"],
    /* 11-18 web `lib/conversations/modules.ts` ile birebir. Web B1'i 2026-09-05'te on
       sekiz modüle genişletmişti (kapsanmayan 1059 B1 maddesi kümelendi, bkz.
       docs/plan/b1-yeniden-kurgu.md); mobil listede on tema kalmıştı. Oysa
       `de-b1.json` 180 konuşma taşıyor, yani 18 modül: Patika'nın 11-18. üniteleri
       adını bulamayıp "B1 Ünite 11" gibi jenerik etikete düşüyordu. */
    B1: ["İş dünyası", "Ev ve kira dünyası", "Bağlaç ustalığı", "İlgi cümleleri", "Bürokrasi", "Eğitim ve gelişim", "Fikir ve tartışma", "Sağlık sistemi", "Çevre ve şehir yaşamı", "Duygular ve hayaller", "Mutfak ve sofra", "Alışveriş, para ve banka", "Yolculuk ve ulaşım", "Beden, bakım ve yaşlanma", "Evde teknik ve onarım", "Meslekler ve iş yaşamı", "Toplum, hukuk ve göç", "Kültür, spor ve doğa"],
    B2: ["Profesyonel iletişim", "Müzakere ve şikâyet", "Edilgenin bütün hâlleri", "Medya ve aktarılan söz", "Bilim ve teknoloji", "Toplum ve ekonomi", "Kültür ve sanat", "Para ve kariyer stratejisi", "İnsan ilişkileri ve psikoloji", "Resmî yazışma ve kapanış"],
    C1: ["Zarif iş iletişimi", "Kip parçacıkları", "Retorik ve sunum sanatı", "Deyimler ve mecazlar", "Basın ve akademik aktarım", "Hukuk ve sözleşme dili", "Karmaşık yapılar", "Toplumsal tartışma", "Mizah, ironi ve incelik", "Ustalık sahneleri"],
  },
  /* İngilizce kurs — BEŞ SEVİYE.
     Önce yalnız A1 ve A2 vardı ("A2 henüz yalnız ilk modül" notuyla) ve o gün
     doğruydu. Kurs 2026-09-21'de elli modüle çıkınca eksik kalan otuz ünite
     Patika'da adını bulamayıp "B1 Ünite 3" gibi jenerik etikete düşüyordu.
     A1-B2 bugün Almanca kursla aynı temalara oturuyor (konuşma konuşma ölçüldü);
     C1 ayrışıyor, çünkü Almanca C1 dilin kendisini konu ediyor ("Kip
     parçacıkları"), İngilizce C1 ise alanları (hukuk, göç, tarım, iklim).
     Liste GERÇEK içerik kadar uzun: olmayan modüle tema yazmak, konuşmalar
     eklenirken sıranın kaymasıyla başlığın içeriğinden ayrılması demek. */
  en: {
    A1: ["Tanışma ve ben", "Aile ve insanlar", "Yeme-içme", "Günlük düzen", "Alışveriş", "Şehirde", "Ev ve yaşam", "Boş zaman", "Sağlık ve vücut", "İletişim ve geçmişe ilk adım"],
    A2: ["Geçmişi anlatmak", "Benim hikâyem", "Sağlık", "Ev ve mahalle", "İş hayatı", "Alışveriş ve hizmetler", "Seyahat", "Kutlamalar ve ilişkiler", "Medya ve teknoloji", "Şehir ve resmî işler"],
    B1: ["İş dünyası", "Ev ve kira dünyası", "Bağlaç ustalığı", "İlgi cümleleri", "Bürokrasi", "Eğitim ve gelişim", "Fikir ve tartışma", "Sağlık sistemi", "Çevre ve şehir yaşamı", "Duygular ve hayaller"],
    B2: ["Profesyonel iletişim", "Müzakere ve şikâyet", "Edilgenin bütün hâlleri", "Medya ve aktarılan söz", "Bilim ve teknoloji", "Toplum ve ekonomi", "Kültür ve sanat", "Para ve kariyer stratejisi", "İnsan ilişkileri ve psikoloji", "Resmî yazışma ve kapanış"],
    C1: ["Üslup ve kayıt", "Tartışma ve karşı çıkma", "Hukuk ve sözleşme dili", "Edebiyat ve yorum", "Göç, aidiyet ve kültür", "Çalışma dünyası ve toplu sözleşme", "Toprak, gıda ve tarım", "İklim ve kent", "Ekonomi ve finans", "Kanıt, yargı ve seçim"],
  },
};

/**
 * Temaların ANA DİLDEKİ karşılığı — anahtar Türkçe metnin kendisi.
 *
 * Metne göre anahtarlı, çünkü tablo kursa göre bölünmüş ve aynı tema iki
 * kursta birden geçiyor (`de` ve `en` A1-B2 listelerinin kırk teması birebir
 * aynı). Paralel dizi bunları dört kez yazdırırdı — iki kurs × iki dil — ve
 * dördünün sırası ayrı ayrı kayabilirdi. Web 2026-09-21'de aynı şekle geçti
 * (`lib/conversations/modules.ts`): iki tablodaki Türkçe tema kümesi birebir aynı,
 * 67 = 67.
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
    // İngilizce kursun C1 temaları (2026-09-21). Almanca kursta karşılığı
    // yok: iki müfredat C1'de ayrışıyor.
    "Üslup ve kayıt": "Register and tone",
    "Tartışma ve karşı çıkma": "Debate and dissent",
    "Edebiyat ve yorum": "Literature and interpretation",
    "Göç, aidiyet ve kültür": "Migration, belonging and culture",
    "Çalışma dünyası ve toplu sözleşme": "Working life and collective bargaining",
    "Toprak, gıda ve tarım": "Land, food and farming",
    "İklim ve kent": "Climate and the city",
    "Ekonomi ve finans": "Economy and finance",
    "Kanıt, yargı ve seçim": "Evidence, judgement and choice",
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
    // İngilizce kursun C1 temaları (2026-09-21). Almanca kursta karşılığı
    // yok: iki müfredat C1'de ayrışıyor.
    "Üslup ve kayıt": "Register und Ton",
    "Tartışma ve karşı çıkma": "Debatte und Widerspruch",
    "Edebiyat ve yorum": "Literatur und Deutung",
    "Göç, aidiyet ve kültür": "Migration, Zugehörigkeit und Kultur",
    "Çalışma dünyası ve toplu sözleşme": "Arbeitswelt und Tarifverhandlungen",
    "Toprak, gıda ve tarım": "Boden, Ernährung und Landwirtschaft",
    "İklim ve kent": "Klima und Stadt",
    "Ekonomi ve finans": "Wirtschaft und Finanzen",
    "Kanıt, yargı ve seçim": "Beweis, Urteil und Wahl",
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
