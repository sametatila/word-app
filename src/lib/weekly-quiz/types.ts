/**
 * Haftalık quiz içerik modeli.
 *
 * NEDEN YENİ BİR MODEL. Bugünkü haftalık sınav (`lib/weekly.ts`) kâğıdı
 * ÜRETİYOR: öğrencinin kendi pekişmiş kelimelerinden 15 üretim turu. Ölçtüğü tek
 * şey sözcük geri çağırma — dilbilgisi, okuma, dinleme yok, açıklama hiç yok.
 * Quiz bambaşka bir şey yapıyor: haftanın yetkinliklerini YAZILI bir omurga
 * üzerinden yokluyor ve her yanlıştan sonra nedenini söylüyor. Bu yüzden
 * maddeler türetilemez, elle yazılır.
 *
 * SINAV DEĞİL. Quiz 10 madde ve 5–7 dakika; deneme sınavı 80 dakika. Amaç
 * öğrenciyi yakalamak değil, ne bildiğini ve neyi KARIŞTIRDIĞINI göstermek.
 * Ölçüt şu: bir madde yalnızca "öğrenci bunu bilmiyorsa hangi yanlışı yapar"
 * sorusunun net bir cevabı varsa iyidir, ve `why` o cevabı açıklar.
 *
 * OMURGA YAZILI, DERİ UYARLANIR. Hangi bloktan kaç madde geleceği (`QUIZ_PLAN`)
 * herkes için aynı; maddelerin seçimi öğrencinin zayıf yetkinliğine göre
 * ağırlıklanıyor ve `personal` blok onun kendi tekrar kuyruğundan geliyor.
 * Sabit dağılım olmadan iki haftanın skoru karşılaştırılamaz — deneme
 * sınavlarındaki `PLAN` tablosuyla aynı gerekçe.
 *
 * UYARAN KURS BAŞINA, ÇELDİRİCİ ANADİL BAŞINA. Okuma metni ve dinleme diyaloğu
 * HEDEF dilde; bir A1 Almanca metni, öğrencinin anadili ne olursa olsun aynı
 * metindir ve iki kez yazılmaz. Çeldirici öyle değil: değeri tam olarak anadil
 * girişiminden geliyor. Türkçede tamlayan cinsiyeti yok, o yüzden `der/die/das`
 * bir Türk öğrenci için gerçek bir tuzak; İngilizce konuşan için değil, onun
 * tuzağı Akkusativ/Dativ ayrımı ve `bekommen`/`become` gibi sahte dostlar. Bu
 * yüzden madde tek gövde taşıyor ama `byNative` ile çeldiricisini
 * değiştirebiliyor (aşağıda).
 *
 * TÜRKÇE YAZILIR, ÇEVİRİ HATTI TAŞIR. `why` ve öğrenciye söylenen her şey
 * Türkçe yazılıyor; en/de anadilli öğrenciye `data/weekly-quiz/prose/out*`
 * hattından, sunucuda (`native.ts`, `/api/quiz`) çözülerek ulaşıyor. Ev kuralı bu (bkz. `data/content/SPEC.md`); burada üç dil elle
 * yazılsaydı çeviri kapıları bu aileyi hiç görmezdi.
 */

/** Quiz'in seviyesi — `skills/types` `CefrLevel` ile aynı küme. */
export type QuizLevel = "A1" | "A2" | "B1" | "B2" | "C1";

/**
 * Quiz'in kursu = ÖĞRETİLEN dil. `gsw-zh` burada yok: lehçe kursu duraklatılmış
 * ve kendi sözcük havuzuyla ayrı bir içerik gerektirir (bkz. `lib/courses`).
 */
export type QuizCourse = "de" | "en";

/** Öğrencinin anadili — çeldiricinin hangi girişime göre kurulduğunu söyler. */
export type QuizNative = "tr" | "en" | "de";

/**
 * Ölçülen yetkinlik. Anahtarlar SÖZLEŞME: telemetriye giden ad, yetkinlik
 * profilinin anahtarı ve blueprint'in satır adı aynı dizge.
 */
export type QuizBlock = "read" | "listen" | "grammar" | "vocab" | "personal";

/**
 * BLUEPRINT — hafta başına blok dağılımı, üç platformda da aynı.
 *
 * `personal` yazılmaz, çalışma anında öğrencinin SRS'inden üretilir; içerik
 * dosyalarında karşılığı yoktur. Kontrol betiği yazılı blokları bu tabloya göre
 * doğruluyor.
 */
export const QUIZ_PLAN: Record<Exclude<QuizBlock, "personal">, number> = {
  read: 2,
  listen: 2,
  grammar: 3,
  vocab: 2,
};

/** Bir quiz'deki toplam madde (yazılı 9 + kişisel 1). */
export const QUIZ_ITEMS = 10;

/**
 * Havuz boyu — quiz'in kullandığından FAZLA madde yazılır.
 *
 * Uyarlama buradan geliyor: aynı haftanın havuzundan, öğrencinin zayıf olduğu
 * yetkinliğe ağırlık verilerek seçim yapılıyor. Havuz quiz kadar olsaydı
 * "uyarlanan" hiçbir şey kalmazdı.
 */
export const QUIZ_POOL_MIN = 14;

/**
 * Okuma metni ya da dinleme diyaloğu.
 *
 * `plays`: dinleme parçasının kaç kez çalınabileceği. Sunucu tarafında
 * kısıtlanır — deneme sınavlarında da öyle (`mock_exam_attempts.plays`), yoksa
 * dinleme maddesi sessizce okuma maddesine dönüşür.
 */
export type QuizStimulus =
  | { kind: "text"; id: string; genre: string; genreTr: string; title?: string; body: string }
  | {
      kind: "audio";
      id: string;
      genre: string;
      genreTr: string;
      segments: { speaker?: string; text: string }[];
      plays: 1 | 2;
    };

/**
 * Anadile göre değişen çeldirici kümesi.
 *
 * Yalnız girişimin GERÇEK olduğu maddelerde yazılır. Okuduğunu anlama maddesinde
 * yazılmaz: metni anlamak anadile göre değişmez, uydurma bir fark icat etmek
 * maddeyi bozar. Kontrol betiği `read`/`listen` bloklarında `byNative`
 * kullanımını uyarı olarak işaretliyor.
 */
export type QuizNativeVariant = {
  options: string[];
  /** `options` içindeki doğru şıkkın sırası. */
  answer: number;
  /** Bu anadile özgü açıklama — girişimin adını koyar. */
  why: string;
};

/**
 * Tek madde.
 *
 * `targets` ARALIKLI TEKRARIN taşıyıcısı: madde neyi yokluyor
 * (`"sein.1sg"`, `"artikel.akk"`, `"wortstellung.v2"`). Sonraki haftaların
 * maddeleri önceki haftaların hedeflerini yeniden yoklarken bu alana bakıyor ve
 * kontrol betiği her haftada en az bir geri dönüş arıyor. Serbest metin değil,
 * nokta ile ayrılmış kısa etiket — iki hafta iki farklı yazımla aynı şeyi
 * kastederse tekrar zinciri sessizce kopar.
 *
 * `why` ZORUNLU: yanlıştan sonra gösterilir. Kuralı söyler, cevabı tekrar etmez.
 * Açıklamayan quiz ölçer, öğretmez — "gelişim odaklı" isteğinin karşılığı tam
 * olarak bu alan.
 */
export type QuizItem = {
  /** `<course>-<level>-w<NN>-<block><n>`, ör. `de-a1-w01-g2`. Kalıcı. */
  id: string;
  /**
   * Yazılı içerikte `personal` KULLANILMAZ — kontrol betiği reddediyor.
   * Tipte açık kalmasının sebebi çalışma anında üretilen kişisel maddenin
   * (bkz. `build.ts` `personalItem`) aynı biçimi taşıması: tek bir madde
   * ortak puanlayıcının dışında kalsaydı bütün kurgu delinirdi.
   */
  block: QuizBlock;
  /** Hangi uyarana bağlı — `read`/`listen` maddelerinde zorunlu. */
  ref?: string;
  /** Sorunun kendisi. Hedef dilde. */
  stem: string;
  options: string[];
  answer: number;
  /** Türkçe açıklama, ≥20 karakter. */
  why: string;
  targets: string[];
  /**
   * Anadile göre çeldirici değişimi. Yazılmayan anadil taban `options`/`answer`
   * ile devam eder, yani her madde her öğrenci için çalışır.
   */
  byNative?: Partial<Record<QuizNative, QuizNativeVariant>>;
};

/**
 * Bir haftanın paketi.
 *
 * `no` TAKVİM sırası: herkes aynı hafta aynı quiz'i çözüyor (karar, 2026-09-16).
 * Öğrencinin kendi başlangıcına göre değil — ortak hafta ortak sohbet demek,
 * karşılığında içerik takvimle tükeniyor ve yazım temposu takvimin önünde
 * kalmak zorunda.
 */
export type QuizWeek = {
  /** `<course>-<level>-w<NN>`, ör. `de-a1-w01`. */
  id: string;
  course: QuizCourse;
  level: QuizLevel;
  no: number;
  /** Haftanın teması — hedef dilde ve Türkçe. */
  theme: string;
  themeTr: string;
  /** Yokladığı can-do ifadeleri (`lib/cando` kimlikleri). */
  canDo: string[];
  stimuli: QuizStimulus[];
  /** En az `QUIZ_POOL_MIN` madde. */
  items: QuizItem[];
};

/** Quiz geçme çizgisi yok: bu bir sınav değil. Skor yalnız geri bildirim. */
export const QUIZ_FEEDBACK_BANDS = [
  { min: 90, key: "wquiz.band_strong" },
  { min: 60, key: "wquiz.band_solid" },
  { min: 0, key: "wquiz.band_practice" },
] as const;
