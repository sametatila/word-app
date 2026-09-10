/**
 * İçeriği kullanıcının ANA DİLİNE çeviren mobil katman.
 *
 * Web'deki `src/lib/lessons/native-server.ts`in karşılığı ve aynı kuralları
 * taşıyor; farkı, sunucu olmaması. Çözücünün kendisi ELLE YAZILMIYOR:
 * `mobile/src/lib/native.ts` kaynaktan dökülüyor
 * (`npm run dump:native`), sözlük de öyle.
 *
 * ÜÇ KURAL, üçü de web'le aynı:
 *
 * 1. HEP-YA-HİÇ. Bir dize bile eksikse çözücü `null` dönüyor ve içerik
 *    OLDUĞU GİBİ kalıyor. Yarım çevrilmiş bir ders — içinde tek bir Türkçe
 *    cümle kalmış İngilizce anlatım — çalışıyor görünen en kötü biçim.
 * 2. İKİ YÖN, İKİ SÖZLÜK. Türkçe kullanan zaten kaynağı görüyor. Anadili
 *    İngilizce olan ALMANCA kursu alıyor (`en.json`), anadili Almanca olan
 *    İNGİLİZCE kursu (`de.json`) — yani çevirinin uygulandığı kurs anadile
 *    göre değişiyor ve kural tek yerde: `translatedCourse()`.
 * 3. ÖĞRENİLEN DİL DEĞİŞMİYOR. Çevrilen yalnız anadil yüzü: yönerge,
 *    açıklama, kalıp notu, sözlükçe karşılığı. Almanca metin sınavın ve
 *    dersin kendisidir.
 *
 * SÖZLÜK GEÇ YÜKLENİYOR. 4,62 MB + 3,45 MB ve bir kullanıcı yalnız BİRİNİ
 * açıyor; Türkçe kullanan hiçbirini. `require` gövde içinde duruyor: Metro
 * modülü ilk çağrıda çalıştırıyor, paketin başında değil. Statik `import`
 * olsaydı ikisi de her açılışta ayrıştırılırdı.
 *
 * ÇÖZÜLEN SONUÇ ÖNBELLEKTE. Aynı ders bir oturumda onlarca kez okunuyor
 * (liste, oynatıcı, ilerleme) ve her seferinde 200 adımlık bir anlatımı
 * yeniden kurmak boşuna. Dil değişince önbellek tümden boşalıyor (en altta).
 */
import { currentLang, onLangChange } from "./i18n";
import {
  resolveLesson,
  resolveExercise,
  resolveMockPaper,
  mockKey,
  type Lesson,
  type NativeDict,
} from "./native";
import { resolveEnLesson, type DeDict } from "./native-de";

let dict: NativeDict | null | undefined;
let dictDe: DeDict | null | undefined;

function nativeDict(): NativeDict | null {
  if (dict !== undefined) return dict;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    dict = require("../data/native/en.json") as NativeDict;
  } catch (err) {
    console.warn("[native] dictionary load failed", err);
    dict = null;
  }
  return dict;
}

function deDict(): DeDict | null {
  if (dictDe !== undefined) return dictDe;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    dictDe = require("../data/native/de.json") as DeDict;
  } catch (err) {
    console.warn("[native] German dictionary load failed", err);
    dictDe = null;
  }
  return dictDe;
}

/**
 * Çevirinin uygulandığı KURS — anadile göre, tek yerde.
 *
 * Anadili İngilizce olan Almanca kursu alıyor, anadili Almanca olan
 * İngilizce kursu; Türkçe kullanan için çeviri yok. Çağıranlar bunu
 * kendileri hesaplamasın diye dışarı veriliyor: kâğıt listesi tek bir alanı
 * çeviriyor ve o süzgeç orada da lazım.
 */
export function translatedCourse(): "de" | "en" | null {
  const lang = currentLang();
  return lang === "en" ? "de" : lang === "de" ? "en" : null;
}

/** Çeviri gerekiyor mu — gerekmiyorsa sözlük hiç açılmıyor. */
function activeDict(): NativeDict | null {
  return currentLang() === "en" ? nativeDict() : null;
}

/**
 * Egzersiz ve kâğıt çözücüsünün okuduğu sözlük — iki yön için de aynı tip.
 *
 * `resolveExercise` ve `resolveMockPaper` `NativeDict` bekliyor ama yalnız
 * `prose` ile `mock` alanlarına dokunuyorlar; Almanca sözlükte o iki alan
 * aynı adı ve aynı anahtar biçimini taşıyor (web'de de böyle, kapı:
 * `scripts/check-native-de.ts`). Bu yüzden iki yön için ikinci bir çözücü
 * gerekmiyor — yalnız hangi dosyanın açılacağı değişiyor.
 */
function skillDict(course: "de" | "en"): NativeDict | null {
  if (course !== "en") return nativeDict();
  const de = deDict();
  return de ? (de as unknown as NativeDict) : null;
}

const cache = new Map<string, unknown>();

function once<T>(key: string, make: () => T | null, fallback: T): T {
  const hit = cache.get(key);
  if (hit !== undefined) return hit as T;
  const out = make() ?? fallback;
  cache.set(key, out);
  return out;
}

/** Dil değişince çağrılıyor; dışarıdan da çağrılabilir (testler). */
export function clearNativeCache(): void {
  cache.clear();
}

/**
 * Dersi ana dile çevirir. Kurs süzgeci ÇAĞIRANDA değil burada: sözlük
 * yalnız Almanca kursun içeriğini tanıyor ve İngilizce kursun dersi
 * verilirse hep-ya-hiç kuralı onu zaten reddeder — ama boşuna 200 adım
 * gezmenin anlamı yok.
 */
export function nativeLesson<T extends { id: string; course?: string }>(lesson: T): T {
  const course = translatedCourse();
  if (!course || (lesson.course ?? "de") !== course) return lesson;
  if (course === "en") {
    /* AYRI ÇÖZÜCÜ: İngilizce kursun dersleri kendi kendine yeten JSON,
       `resolveLesson`ın beklediği şablon yapısı yok. */
    const de = deDict();
    if (!de) return lesson;
    return once(`lesson:${lesson.id}`, () => resolveEnLesson(de, lesson as unknown as Lesson) as T | null, lesson);
  }
  const d = nativeDict();
  if (!d) return lesson;
  return once(`lesson:${lesson.id}`, () => resolveLesson(d, lesson as unknown as Lesson) as T | null, lesson);
}

export function nativeExercise<T extends { id: string; course?: string }>(ex: T): T {
  const course = translatedCourse();
  if (!course || (ex.course ?? "de") !== course) return ex;
  const d = skillDict(course);
  if (!d) return ex;
  return once(`ex:${ex.id}`, () => resolveExercise(d, ex as never) as T | null, ex);
}

export function nativeMockPaper<T extends { id: string; course?: string }>(paper: T): T {
  const course = translatedCourse();
  if (!course || (paper.course ?? "de") !== course) return paper;
  const d = skillDict(course);
  if (!d) return paper;
  return once(`mock:${paper.id}`, () => resolveMockPaper(d, paper as never) as T | null, paper);
}

/**
 * Kâğıdın TEK bir Türkçe alanı — liste satırları için.
 *
 * Web'deki `nativeMockText` ile aynı ve aynı bilinçli gevşeklik: burada
 * hep-ya-hiç YOK. Satırın kimliği Almanca tema ve o yanında duruyor;
 * karşılığı bulunamayan bir alt başlık lekedir, satırı düşürmek ise o
 * kâğıdı listeden gizler. Bütün kâğıt bölüm ekranında çözülüyor.
 */
export function nativeMockText(kind: string, tr: string): string {
  const course = translatedCourse();
  if (!course) return tr;
  const d = course === "en" ? deDict() : nativeDict();
  return d?.mock[mockKey(kind, tr)] ?? tr;
}

/**
 * Ders başlığı/özeti — liste satırları için, yine hep-ya-hiç olmadan.
 *
 * ALMANCA TARAFTA YOK: `meta` id'ye göre indeksli bir alan ve Almanca
 * sözlükte yalnız METNİN KENDİSİ anahtar (başlık `titleTr` türüyle ders
 * düzyazısı hattında duruyor). Bu işlevin mobilde çağıranı da yok; Almanca
 * için ikinci bir indeks üretmek, kullanılmayan 11.011 satırlık sözlüğe
 * 200 satır daha eklemek olurdu.
 */
export function nativeLessonMeta(id: string): { title: string; summary: string } | null {
  return activeDict()?.meta[id] ?? null;
}

/* Dil değişince önbellek boşalıyor. Anahtar dili taşımıyor çünkü bir oturumda
   tek dil geçerli; taşısaydı Türkçeye dönen kullanıcının belleğinde 995
   egzersizin İngilizce kopyası asılı kalırdı. */
onLangChange(clearNativeCache);
