import type { CefrLevel } from "../skills/types";

/**
 * Ders — konuşma tabanlı öğretim birimi.
 *
 * İki fazdan oluşuyor ve sıra tasarımın kendisi:
 *
 *   1. **Anlatım (lecture)** — yazılı bir senaryo üzerinden ilerleyen sesli
 *      diyalog. Öğretmen Türkçe anlatıyor, hedefler Almanca: kelimeler tek tek
 *      tekrar ettiriliyor, kalıp açıklanıyor, örnek söyletiliyor, sonra
 *      öğrenciden kendi cümlesini ÜRETMESİ isteniyor. Her adım konuşarak
 *      cevaplanıyor; yanlışta ipucu verilip yeniden deneniyor.
 *   2. **Konuşma (practice)** — anlatımda öğrenilenlerin kullanılmak zorunda
 *      olduğu serbest rol yapma. Model kalıpları biliyor ve konuşmayı onların
 *      kullanılacağı yöne sürüyor. Asıl öğrenme burada; anlatım buna hazırlık.
 *
 * Anlatımın yazılı senaryo olması bilinçli bir tercih: içerik elle yazılınca
 * her cümlenin sesi önceden sentezlenip önbelleklenebiliyor, akış hiç model
 * beklemiyor ve iki dilin (anlatım Türkçe, hedef Almanca) nerede başlayıp
 * bittiği kesin olarak biliniyor — seslendirme ve tanıma dili adım adım buna
 * göre seçiliyor.
 */

/**
 * Dil bazında bölünmüş metin parçası.
 *
 * Anlatım cümleleri iki dili aynı anda taşıyor: "İlk kelimemiz: das Wasser."
 * Parçalara bölmek seslendirmenin temelidir — Türkçe parça Türkçe nöral sesle,
 * Almanca parça kursun Almanca sesiyle okunur. Tek parçada karıştırmak iki
 * dilden birinin telaffuzunu bozar ve bozulan telaffuz dersin öğrettiği şeyin
 * kendisidir.
 */
export type Segment = { lang: "tr" | "de"; text: string };

/** İçerik dosyaları için kısayollar — segment yazımını okunur tutuyor. */
export const tr = (text: string): Segment => ({ lang: "tr", text });
export const de = (text: string): Segment => ({ lang: "de", text });

/**
 * Adımın öğrenciden beklediği cevap.
 *
 * Beklentinin türü yalnızca arayüzü değil **mikrofonun dilini** de belirliyor:
 * Almanca hedef beklenirken tanıyıcı de-DE, Türkçe onay ya da doğru/yanlış
 * beklenirken tr-TR dinliyor. Yanlış dilde dinlemek tanıyıcının en yakın
 * kelimeyi uydurması demek — "doğru" derken "Torf" duyulması gibi.
 */
export type Expectation =
  /** Türkçe onay — "hazır mısın?" sorusuna herhangi bir cevap yeterli. */
  | { kind: "confirm" }
  /**
   * Almanca tekrar — verilen hedefi söylemesi bekleniyor.
   *
   * Puanlanmıyor: tekrar bir alıştırma değil, kelimeyi ağza alma denemesi.
   * Yanlışta eksik kelimeler söylenip yeniden deneniyor; üçüncü denemeden
   * sonra ders takılmadan devam ediyor.
   */
  | { kind: "repeat"; target: string }
  /**
   * Almanca üretim — Türkçe verilen cümleyi Almanca kurması bekleniyor.
   *
   * Dersin puanlanan adımı bu (doğru/yanlış ile birlikte): kelimeyi tekrar
   * etmekle cümleyi kurmak ayrı işler ve ders "geçildi" sayılırken ölçülen
   * şey kurabilmek. `accept` eşdeğer doğru cevaplar; `hint` ilk yanlıştan
   * sonra okunacak, hatanın tipik sebebini söyleyen ipucu.
   */
  | { kind: "produce"; target: string; accept?: string[]; hint: Segment[] }
  /**
   * Doğru/yanlış — Almanca bir cümle hakkında Türkçe hüküm bekleniyor.
   *
   * Cevaptan sonra `why` okunuyor: hüküm tek başına öğretmiyor, gerekçe
   * öğretiyor. Yanlış cevapta da aynı gerekçe okunuyor ve ders ilerliyor —
   * doğru/yanlışta ikinci deneme anlamsız, cevap artık biliniyor.
   */
  | { kind: "truefalse"; statement: string; answer: boolean; why: Segment[] };

/**
 * Anlatımın bir adımı: öğretmen `say` parçalarını sesli söylüyor, sonra
 * `expect` varsa cevabı bekliyor, yoksa bir sonraki adıma geçiyor.
 * Beklentisiz adımlar açıklama baloncukları — kalıbın ne işe yaradığı gibi.
 */
export type LectureStep = {
  say: Segment[];
  expect?: Expectation;
};

/** Derste öğretilen kelime — anlatım bunları tek tek tekrar ettiriyor. */
export type VocabItem = { de: string; tr: string };

/** Derste öğretilen kalıp — konuşma fazının istemi bunlardan kuruluyor. */
export type PatternItem = {
  /** Kalıbın kendisi, Almanca: "Ich möchte …". */
  de: string;
  /** Ne işe yaradığı, Türkçe: "bir şey isterken kullanılır". */
  tr: string;
};

/** Konuşma fazının sahnesi. */
export type LessonRoleplay = {
  /** Durum, Türkçe: öğrenci nerede ve ne yapıyor. */
  scene: string;
  /** Modelin oynadığı kişi (Almanca sıfat + rol). */
  partner: string;
  /** Modelin açılış repliği — konuşma sessiz başlamasın. */
  opening: string;
  openingTr: string;
  /**
   * Öğrencinin kalıpları kullanmış sayılması için gereken tur sayısı.
   *
   * Konuşma "yeterince konuşuldu"da değil, kalıplar kullanıldığında bitiyor;
   * bu sayı yalnızca alt sınır.
   */
  minTurns: number;
};

/**
 * Yol haritasındaki düğüm simgesi — dersin konusunu tek bakışta söylüyor.
 *
 * Küme bilerek kapalı ve önden geniş: 500 derslik müfredatın bütün konu
 * aileleri için birer simge var (bkz. data/lessons-plan/SPEC.md). İçerik
 * üreten ajan bu listeden seçiyor ve ikon dosyalarına hiç dokunmuyor.
 */
export type LessonIcon =
  | "greet"
  | "cafe"
  | "doctor"
  | "vacation"
  | "job"
  | "home"
  | "shopping"
  | "transport"
  | "family"
  | "phone"
  | "school"
  | "food"
  | "weather"
  | "money"
  | "calendar"
  | "sport"
  | "nature"
  | "city"
  | "media"
  | "feelings"
  | "culture"
  | "repair"
  | "office"
  | "music"
  | "mail"
  | "party"
  | "tech"
  | "clock"
  | "bed"
  | "car"
  | "train"
  | "plane"
  | "map"
  | "camera"
  | "book"
  | "pen"
  | "gift"
  | "cake"
  | "ring"
  | "baby"
  | "dog"
  | "flower"
  | "sun"
  | "snow"
  | "rain"
  | "tooth"
  | "pill"
  | "run"
  | "bike"
  | "film"
  | "art"
  | "law"
  | "flag"
  | "suitcase"
  | "ticket"
  | "chart"
  | "idea"
  | "handshake"
  | "recycle"
  | "shirt"
  | "bread"
  | "mountain"
  | "star"
  | "question"
  | "key";

export type Lesson = {
  id: string;
  level: CefrLevel;
  course: "de" | "gsw-zh";
  /** Yol haritasında düğümün simgesi. */
  icon: LessonIcon;
  /** Dersin konusu, Almanca — senaryonun adı: "Beim Arzt", "Im Café". */
  title: string;
  /** Konunun Türkçesi — listede başlığın altında duruyor. */
  titleTr: string;
  /** Bir cümlede ne öğretiyor, Türkçe. */
  summary: string;
  minutes: number;
  /**
   * Dersin odağının kimliği — tekrar kuyruğu bunu izliyor.
   *
   * Konuşma düzeltmelerinin ürettiği etiketlerle (Akkusativ, V2-Regel,
   * Modalverb-sollen) aynı uzayda: ileride düzeltmeler doğrudan bu kuyruğu
   * besleyebilir.
   */
  focusId: string;
  /** Öğretilen kelimeler, anlatım sırasıyla. */
  vocab: VocabItem[];
  /** Öğretilen kalıplar — konuşma fazı bunları kullandırıyor. */
  patterns: PatternItem[];
  /** Anlatım senaryosu. */
  lecture: LectureStep[];
  /** Konuşma fazı. */
  roleplay: LessonRoleplay;
};

/**
 * Puanlanan adım sayısı — ders kaydının paydası.
 *
 * Yalnızca üretim ve doğru/yanlış sayılıyor: tekrar adımları deneme alanı,
 * onay adımları akış. Ölçülen şey "söyleyebildi mi" değil "kurabildi mi".
 */
export function scoredSteps(lesson: Lesson): number {
  return lesson.lecture.filter(
    (s) => s.expect?.kind === "produce" || s.expect?.kind === "truefalse",
  ).length;
}
