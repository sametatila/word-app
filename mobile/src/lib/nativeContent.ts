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
 * 2. YALNIZ "en". Türkçe kullanan zaten kaynağı görüyor; Almanca anadil
 *    (`de`) için sözlük henüz yok ve `PAIR_READY.de` boş.
 * 3. ÖĞRENİLEN DİL DEĞİŞMİYOR. Çevrilen yalnız anadil yüzü: yönerge,
 *    açıklama, kalıp notu, sözlükçe karşılığı. Almanca metin sınavın ve
 *    dersin kendisidir.
 *
 * SÖZLÜK GEÇ YÜKLENİYOR. 4,62 MB ve Türkçe kullanan onu HİÇ açmıyor.
 * `require` gövde içinde duruyor: Metro modülü ilk çağrıda çalıştırıyor,
 * paketin başında değil. Statik `import` olsaydı her açılışta ayrıştırılırdı.
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

let dict: NativeDict | null | undefined;

function nativeDict(): NativeDict | null {
  if (dict !== undefined) return dict;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    dict = require("../data/native/en.json") as NativeDict;
  } catch (err) {
    console.warn("[native] sözlük yüklenemedi", err);
    dict = null;
  }
  return dict;
}

/** Çeviri gerekiyor mu — gerekmiyorsa sözlük hiç açılmıyor. */
function activeDict(): NativeDict | null {
  return currentLang() === "en" ? nativeDict() : null;
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
  const d = activeDict();
  if (!d || (lesson.course ?? "de") !== "de") return lesson;
  return once(`lesson:${lesson.id}`, () => resolveLesson(d, lesson as unknown as Lesson) as T | null, lesson);
}

export function nativeExercise<T extends { id: string; course?: string }>(ex: T): T {
  const d = activeDict();
  if (!d || (ex.course ?? "de") !== "de") return ex;
  return once(`ex:${ex.id}`, () => resolveExercise(d, ex as never) as T | null, ex);
}

export function nativeMockPaper<T extends { id: string; course?: string }>(paper: T): T {
  const d = activeDict();
  if (!d || (paper.course ?? "de") !== "de") return paper;
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
  const d = activeDict();
  return d?.mock[mockKey(kind, tr)] ?? tr;
}

/** Ders başlığı/özeti — liste satırları için, yine hep-ya-hiç olmadan. */
export function nativeLessonMeta(id: string): { title: string; summary: string } | null {
  return activeDict()?.meta[id] ?? null;
}

/* Dil değişince önbellek boşalıyor. Anahtar dili taşımıyor çünkü bir oturumda
   tek dil geçerli; taşısaydı Türkçeye dönen kullanıcının belleğinde 995
   egzersizin İngilizce kopyası asılı kalırdı. */
onLangChange(clearNativeCache);
