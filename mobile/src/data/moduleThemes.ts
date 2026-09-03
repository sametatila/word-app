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
 * Kursa göre anahtarlı; bugün yalnız Almanca dolu. Aynı hedef dili paylaşan kursa
 * düşülür (gsw-zh → de), başka dile asla — ders yükleyicisiyle aynı kural.
 */
const BY_COURSE: Record<string, Record<string, string[]>> = {
  de: {
    A1: ["Tanışma ve ben", "Aile ve insanlar", "Yeme-içme", "Günlük düzen", "Alışveriş", "Şehirde", "Ev ve yaşam", "Boş zaman", "Sağlık ve vücut", "İletişim ve geçmişe ilk adım"],
    A2: ["Geçmişi anlatmak", "Benim hikâyem", "Sağlık", "Ev ve mahalle", "İş hayatı", "Alışveriş ve hizmetler", "Seyahat", "Kutlamalar ve ilişkiler", "Medya ve teknoloji", "Şehir ve resmî işler"],
    B1: ["İş dünyası", "Ev ve kira dünyası", "Bağlaç ustalığı", "İlgi cümleleri", "Bürokrasi", "Eğitim ve gelişim", "Fikir ve tartışma", "Sağlık sistemi", "Çevre ve şehir yaşamı", "Duygular ve hayaller"],
    B2: ["Profesyonel iletişim", "Müzakere ve şikâyet", "Edilgenin bütün hâlleri", "Medya ve aktarılan söz", "Bilim ve teknoloji", "Toplum ve ekonomi", "Kültür ve sanat", "Para ve kariyer stratejisi", "İnsan ilişkileri ve psikoloji", "Resmî yazışma ve kapanış"],
    C1: ["Zarif iş iletişimi", "Kip parçacıkları", "Retorik ve sunum sanatı", "Deyimler ve mecazlar", "Basın ve akademik aktarım", "Hukuk ve sözleşme dili", "Karmaşık yapılar", "Toplumsal tartışma", "Mizah, ironi ve incelik", "Ustalık sahneleri"],
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
