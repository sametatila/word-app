import { courseOrDefault } from "../lib/courses";

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

function themesFor(course: string, level: string): string[] {
  const own = BY_COURSE[course];
  if (own) return own[level] ?? [];
  const target = courseOrDefault(course).targetLang;
  for (const id of Object.keys(BY_COURSE)) {
    if (courseOrDefault(id).targetLang === target) return BY_COURSE[id][level] ?? [];
  }
  return [];
}

/** Modülün teması; kursun listesi yoksa çağıran kendi yedeğini kullanır. */
export function moduleTheme(course: string, level: string, moduleIndex: number): string | undefined {
  return themesFor(course, level)[moduleIndex];
}
