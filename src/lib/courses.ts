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

/** Kursun ÖĞRETTİĞİ dil — karşılaştırma katlamaları buna bakıyor. */
export type TargetLang = "de" | "en";

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
   * Sentez ve TANIMA için tam yerel kod — lehçe burada ayrışıyor.
   *
   * Mobilde bu alan baştan beri var (`M/src/lib/courses.ts`); web'de yoktu ve
   * iki oynatıcı `course === "gsw-zh" ? "de-CH" : "de-DE"` yazıyordu. İngilizce
   * kursta bu, tanıyıcıyı Almancaya kuruyordu: öğrenci İngilizce konuşuyor,
   * tarayıcı Almanca duyuyordu.
   */
  speechLocale: string;
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
   * İlk açılışta gösterilen tanıtım cümlesinin sözlük anahtarı.
   *
   * Metnin kendisi değil ANAHTAR: cümle üç dilde ve sözlükte duruyor. Kayıt
   * defterine anahtarın girmesinin sebebi, onboarding'in kurs listesini artık
   * buradan alması — metin orada elle yazılıydı ve İngilizce kursu listede
   * olmadığı için tanıtımı da yoktu.
   */
  descKey: string;
  /**
   * İçeriği hazır mı.
   *
   * API yalnızca hazır kursları kabul eder: içeriği olmayan bir kursa geçen
   * kullanıcı boş bir uygulamada kalırdı. Kurs hazır olduğunda burayı `true`
   * yapmak hem seçimi hem API kabulünü birlikte açar.
   */
  enabled: boolean;
  /**
   * İlk açılışta yeni kullanıcıya sunulur mu.
   *
   * `enabled`den AYRI: duraklatılmış bir kurs (Züritüütsch) mevcut
   * öğrencisi için açık kalmalı ama yeni gelene önerilmemeli. Mobil bu
   * ayrımı baştan beri taşıyordu; web'de alan yoktu ve onboarding elle
   * yazılmış bir listeyle Züritüütsch'ü yeni kullanıcıya sunuyordu.
   */
  offeredToNewUsers: boolean;
  /**
   * Cinsiyetli isim sistemi var mı — Artikel Yarışı ve Çoğul Bilmece bu
   * kursta üretilebilir mi.
   *
   * Web bunu `targetLang === "de"` diye çıkarıyordu. Bugünkü kataloğun üç
   * kursunda sonuç aynı ama kural yanlış: artikel Almancaya değil, DİLİN
   * kendisine ait bir özellik. Fransızca eklenseydi web artikel oyunlarını
   * sessizce gizlerdi. Mobil baştan beri bu bayrağı taşıyor
   * (`M/src/lib/courses.ts` `hasArticles`); web de artık taşıyor.
   */
  hasArticles: boolean;
};

export const COURSES: Course[] = [
  {
    id: "de",
    targetLang: "de",
    speechLocale: "de-DE",
    hasArticles: true,
    label: { tr: "Almanca", en: "German", de: "Deutsch" },
    sub: {
      tr: "Hochdeutsch · CEFR A1–C1",
      en: "Standard German · CEFR A1–C1",
      de: "Hochdeutsch · CEFR A1–C1",
    },
    descKey: "onb.course_de",
    enabled: true,
    offeredToNewUsers: true,
  },
  {
    id: "gsw-zh",
    targetLang: "de",
    speechLocale: "de-CH",
    hasArticles: true,
    label: { tr: "Zürih Almancası", en: "Zurich German", de: "Züritüütsch" },
    sub: {
      tr: "Züritüütsch · İsviçre lehçesi",
      en: "Züritüütsch · Swiss dialect",
      de: "Züritüütsch · Schweizer Dialekt",
    },
    descKey: "onb.course_gsw",
    enabled: true,
    offeredToNewUsers: false, // duraklatılmış lehçe kursu — mevcut öğrenciye açık, yeniye sunulmuyor
  },
  // Kelime, ders, beceri ve deneme sınavı katmanları hazır.
  {
    id: "en",
    targetLang: "en",
    speechLocale: "en-US",
    hasArticles: false,
    label: { tr: "İngilizce", en: "English", de: "Englisch" },
    sub: {
      tr: "İngilizce · CEFR A1–C1",
      en: "English · CEFR A1–C1",
      de: "Englisch · CEFR A1–C1",
    },
    descKey: "onb.course_en",
    enabled: true,
    offeredToNewUsers: true,
  },
];

/** Kursun adı, verilen arayüz dilinde — mobil `targetLangName()` karşılığı. */
export function courseName(courseId: string | null | undefined, lang: NativeLang): string {
  return courseOrDefault(courseId).label[lang];
}

/** Kursun konuşma/tanıma yerel kodu — `de-DE`, `de-CH`, `en-US`. */
export function speechLocaleOf(courseId: string | null | undefined): string {
  return courseOrDefault(courseId).speechLocale;
}

/** Kursun alt satırı (lehçe/kapsam), verilen arayüz dilinde. */
export function courseSub(courseId: string | null | undefined, lang: NativeLang): string {
  return courseOrDefault(courseId).sub[lang];
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

/** İçeriği hazır kurslar. */
export function enabledCourses(): Course[] {
  return COURSES.filter((c) => c.enabled);
}

/**
 * SUNULAN ÇİFTLER — hangi (anadil, hedef) ikilisi kullanıcıya gösteriliyor.
 *
 * Bir çiftin "çalışması" tek katman değil: kelime karşılıkları, beceri
 * egzersizlerinin yönergeleri ve derslerin ANLATIM metni. Kelime katmanı
 * hazırken ötekiler Türkçe kalırsa kullanıcı alıştırmayı kendi dilinde,
 * dersi Türkçe görür — yarım bir parite, çalışıyormuş gibi görünen.
 *
 * Bu yüzden sunum bir BEYAN: burada yazılı olmayan çift hiç gösterilmiyor.
 * Beyanın iyimser kalmaması `npm run check:pairs` ile veriden doğrulanıyor —
 * hazır dediğimiz bir çiftte eksik varsa CI kırılır, hazır olmayan bir çiftin
 * verisi tamamlandığında da uyarır ("artık açılabilir").
 *
 * ÜÇ ANADİLİN ÜÇÜ DE AÇIK (2026-09-11). Sıra ve ölçüm
 * `docs/plan/native-language.md`'de; gsw-zh yalnız Türkçe için sunuluyor
 * (gerekçe aşağıda).
 */
export const PAIR_READY: Record<NativeLang, CourseId[]> = {
  tr: ["de", "gsw-zh", "en"],
  /*
    en→de AÇILDI (2026-09-10). Üç katman da tam:
      kelime      üretimde 8.707/8.707 İngilizce karşılık + örnek çevirisi
      ders/beceri/deneme  altı kapı yeşil (check:lessons-native,
                  check:lessons-swap, check:skills-native, check:skills-task,
                  check:mock-prose, check:mock-native)
      arayüz      1.203 anahtar × 3 dil (i18n:check)

    gsw-zh BURADA YOK ve bu bir unutma değil: lehçe örnek çevirileri yerelde
    yazıldı ama üretimde `beispiel_en` 0/8.267. Karşılık var, örnek yok —
    kelime kartının yarısı İngilizce yarısı boş olurdu.
  */
  en: ["de"],
  /*
    de→en AÇILDI (2026-09-11). Dört katman da tam:
      kelime      üretimde 7.175/7.175 Almanca karşılık + örnek çevirisi
                  (`db:seed:en`, 6.801 türetildi + 374 elle yazılmış)
      ders/beceri/deneme/can-do  `check:native-de` yeşil — ders 200/200,
                  egzersiz 189/189, kâğıt 60/60, can-do 11/11; yazan
                  hatların kendi kapıları da CI'da (prose-de 11.011,
                  skills-prose-de 1.725, skills-task-de 1.325, mock-prose-de
                  6.828, cando-de 131)
      mobil       sözlük ve çözücü dökülüyor (`dump:native`, `check:dumps`)
      arayüz      1.411 anahtar × 3 dil (i18n:check)

    Almanca kursu bu anadile HİÇ sunulmuyor, kendi dilini öğretmiyoruz —
    `coursesForNative` hedef dile bakıyor, yani Züritüütsch de birlikte
    düşüyor.
  */
  de: ["en"],
};

/**
 * Kullanıcının ANADİLİNE göre seçilebilecek kurslar.
 *
 * Kendi anadilini "öğrenilecek dil" olarak sunmak anlamsız: arayüz dili
 * İngilizce olan kullanıcıya "English · A1–C1" öneriliyordu. Eleme HEDEF DİLE
 * göre, kurs id'sine göre değil — böylece anadili Almanca olan kullanıcıdan hem
 * Hochdeutsch hem Züritüütsch birlikte düşüyor (ikisinin de hedefi Almanca).
 *
 * Türkçe için sonuç değişmiyor: hiçbir kursun hedefi Türkçe değil.
 *
 * Mobilde bu işlev baştan beri var; web'de yoktu ve kurs listesi iki ayrı
 * dosyada ELLE yazılıydı (`profile-form`, `course-onboarding`). Sonucu:
 * İngilizce kursu web'den hiç seçilemiyordu, duraklatılmış Züritüütsch ise
 * yeni kullanıcıya sunuluyordu.
 */
export function coursesForNative(lang: NativeLang): Course[] {
  const ready = new Set(PAIR_READY[lang] ?? []);
  return enabledCourses().filter((c) => c.targetLang !== lang && ready.has(c.id));
}

/**
 * Anadil seçeneği olarak sunulacak diller.
 *
 * Hiç hazır çifti olmayan bir anadili seçtirmek, kullanıcıyı kurssuz bir
 * uygulamada bırakmak olurdu. Liste `PAIR_READY` dolduğunda kendiliğinden
 * genişliyor — ayrıca bakım istemiyor.
 */
export function offeredNativeLangs(): NativeLang[] {
  return NATIVE_LANGS.filter((l) => coursesForNative(l).length > 0);
}

/** İlk açılışta sunulanlar — duraklatılmış kurslar elenir. */
export function onboardingCoursesFor(lang: NativeLang): Course[] {
  return coursesForNative(lang).filter((c) => c.offeredToNewUsers);
}

/**
 * Anadil + kurs ÇİFTİ geçerli mi — sunucunun kapısı.
 *
 * İkisi ayrı ayrı doğrulanıyordu (`acceptsCourse`, `acceptsNativeLang`) ama
 * BİRLİKTE hiç bakılmıyordu: `nativeLang="en"` + `course="en"` sunucuda kabul
 * ediliyordu, yani kullanıcı kendi anadilini öğrenmeye başlayabiliyordu.
 * Mobil arayüzü buna izin vermiyordu, web veriyordu; asıl kapı burası olmalı.
 */
export function acceptsPair(native: string, course: string): boolean {
  if (!acceptsNativeLang(native) || !acceptsCourse(course)) return false;
  return coursesForNative(native as NativeLang).some((c) => c.id === course);
}

/**
 * Profilde saklanmasına izin verilen anadiller.
 *
 * Kurs doğrulamasının eşi: arayüz dili de sunucuya yazılıyor (cihaz değişince
 * tercih kaybolmasın diye) ve serbest metin kabul edilmemeli.
 */
/**
 * Profilden okunan ham değeri geçerli bir anadile çevirir.
 *
 * `profiles.native_lang` NULL olabilir (alan sonradan eklendi) ve serbest
 * metin taşımamalı. Tek bir normalleştirici olması önemli: her çağıran kendi
 * `?? "tr"` düşüşünü yazsaydı, bir gün biri onu unutur ve o yolda anlam yanlış
 * dilde gelirdi.
 */
export function nativeOf(value: string | null | undefined): NativeLang {
  return value && acceptsNativeLang(value) ? (value as NativeLang) : DEFAULT_NATIVE;
}

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

/** Kursun hedef dili — mobil `lib/courses` `currentTargetLang()` karşılığı. */
export function targetLangOf(id: string | null | undefined): TargetLang {
  return courseOrDefault(id).targetLang;
}
