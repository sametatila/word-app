import "server-only";
import type { Lesson } from "./types";
import {
  resolveLesson,
  resolveExam,
  resolveExercise,
  resolveMockPaper,
  mockKey,
  type NativeDict,
  type ExamShape,
  type ExerciseShape,
  type MockShape,
} from "./native";
import { resolveEnLesson, deKey, type DeDict } from "./native-de";
import { DEFAULT_NATIVE, type NativeLang } from "@/lib/courses";

/**
 * Anlatım sözlüğünü SUNUCUDA, yalnız gerektiğinde yükler.
 *
 * Sözlük 1,7 MB — 8.824 anlatım dizesi, 4.640 kelime karşılığı, 580 ders
 * başlığı. Arayüz sözlükleriyle (`src/lib/i18n/dict.ts`) aynı yere konsaydı
 * her isteğe, her kullanıcıya, her dil için binerdi. Oysa Türkçe kullanan
 * biri onu HİÇ kullanmıyor: içerik zaten Türkçe.
 *
 * O yüzden `import()` gecikmeli ve sonucu modül düzeyinde tutuluyor —
 * Node süreci boyunca bir kez okunuyor. `native_lang` Türkçe olan bir
 * kurulumda dosya hiç açılmıyor.
 *
 * ÜRETİLEN DOSYA: `data/lessons/apply.mjs` yazıyor ve depoda durmuyor.
 * Yoksa özellik sessizce kapanıyor (ders Türkçe kalıyor) — çünkü eksik
 * sözlük yüzünden ders sayfasının açılmaması, çeviriden çok daha kötü.
 */
let cache: NativeDict | null | undefined;

async function nativeDict(): Promise<NativeDict | null> {
  if (cache !== undefined) return cache;
  try {
    const mod = await import("./generated/native-en.json");
    cache = (mod.default ?? mod) as unknown as NativeDict;
  } catch (err) {
    console.error("[native] sözlük yüklenemedi — `npm run lessons:apply` çalıştırıldı mı?", err);
    cache = null;
  }
  return cache;
}

/**
 * ALMANCA sözlük — anadili Almanca olan kullanıcı için, aynı gecikmeli yükleme.
 *
 * NEDEN İKİNCİ BİR SÖZLÜK. `native-en.json` Almanca kursun Türkçesini
 * İngilizceye çeviriyor; bu ise İngilizce kursun Türkçesini Almancaya.
 * İki yönün kaynağı da şekli de başka (bkz. `data/lessons/apply-de.mjs`)
 * ve bir kullanıcı ikisini birden kullanmıyor: Türkçe kullanan hiçbirini,
 * anadili İngilizce olan yalnız birincisini, anadili Almanca olan yalnız
 * ikincisini açıyor. Tek dosyada birleştirmek her isteğe okunmayan yarıyı
 * bindirirdi.
 */
let cacheDe: DeDict | null | undefined;

async function deDict(): Promise<DeDict | null> {
  if (cacheDe !== undefined) return cacheDe;
  try {
    const mod = await import("./generated/native-de.json");
    cacheDe = (mod.default ?? mod) as unknown as DeDict;
  } catch (err) {
    console.error("[native] Almanca sözlük yüklenemedi — `npm run lessons:apply-de` çalıştırıldı mı?", err);
    cacheDe = null;
  }
  return cacheDe;
}

/* `resolveExercise` ve `resolveMockPaper` `NativeDict` bekliyor ama yalnız
   `prose` ile `mock` alanlarına dokunuyorlar; `DeDict`in o iki alanı aynı
   adı ve aynı anahtar biçimini taşıyor, eksik alanlar hiç okunmuyor.
   Kapı bunu gerçek içerik üzerinde ölçüyor: `scripts/check-native-de.ts`. */
const asNative = (dict: DeDict): NativeDict => dict as unknown as NativeDict;

/**
 * Dersi öğrencinin ana diline çevirir; çeviremezse dersi OLDUĞU GİBİ döner.
 *
 * Geri düşüş bilinçli ve yarım ders DEĞİL: `resolveLesson` hep-ya-hiç
 * çalışıyor, yani sonuç ya tümüyle İngilizce ya tümüyle Türkçe. Yasak olan
 * ikisinin karışması.
 *
 * Türkçe bir dersi İngilizce konuşana göstermek işe yaramaz ama ders
 * sayfasını hiç açmamak daha kötü. Asıl çözüm daha yukarıda: içeriği
 * çevrilmemiş bir kurs, o ana dil için kurs listesinde HİÇ görünmemeli
 * (`PAIR_READY`). Burası son çare.
 */
export async function localiseLesson(lesson: Lesson, lang: NativeLang | null | undefined): Promise<Lesson> {
  if (!lang || lang === DEFAULT_NATIVE) return lesson;
  if (lang === "de") {
    /* AYRI ÇÖZÜCÜ, ayrı sözlük: İngilizce kursun dersleri kendi kendine
       yeten JSON, `resolveLesson`ın beklediği şablon yapısı yok. */
    const de = await deDict();
    if (!de) return lesson;
    const out = resolveEnLesson(de, lesson);
    if (!out) {
      // İngilizce kursun 200 dersinin hepsi çözülüyor (kapı: check:native-de).
      // Buraya düşen ders başka bir kurstan geliyor demektir.
      console.warn(`[native] ders Almancaya çevrilemedi, Türkçe kalıyor: ${lesson.id}`);
      return lesson;
    }
    return out;
  }
  const dict = await nativeDict();
  if (!dict) return lesson;
  const out = resolveLesson(dict, lesson);
  if (!out) {
    // `de-*` derslerinin hepsi çözülüyor (kapı: check:lessons-native).
    // Buraya düşen ders başka bir kurstan geliyor demektir.
    console.warn(`[native] ders çevrilemedi, Türkçe kalıyor: ${lesson.id}`);
    return lesson;
  }
  return out;
}

/**
 * Bir dersin ana dildeki BAŞLIĞI — bütün dersi çözmeye gerek olmayan yerler
 * için (sıradaki ders köprüsü, liste satırı).
 *
 * Karşılık yoksa `null`: çağıran taraf Türkçeye düşmek yerine o parçayı
 * göstermemeyi seçebilsin. İngilizce bir sayfanın içinde tek bir Türkçe
 * başlık, yarım çevirinin en görünür hâli.
 */
export async function nativeTitle(
  lessonId: string,
  lang: NativeLang | null | undefined,
): Promise<string | null> {
  if (!lang || lang === DEFAULT_NATIVE) return null;
  if (lang === "de") {
    /* ALMANCA SÖZLÜKTE `meta` YOK ve olmasına gerek de yok: başlık ders
       düzyazısı hattında `titleTr` türüyle zaten duruyor, anahtarı METNİN
       KENDİSİ. Dersi id'den bulup başlığını sormak, sözlüğe ikinci bir
       indeks eklemekten ucuz — `findLesson` zaten bellekte duran diziye
       bakıyor. Ders paketi yalnız bu dalda yükleniyor. */
    const de = await deDict();
    if (!de) return null;
    const { findLesson } = await import("./index");
    const titleTr = findLesson(lessonId)?.titleTr;
    if (!titleTr) return null;
    return de.lesson[deKey("titleTr", titleTr)] ?? null;
  }
  const dict = await nativeDict();
  return dict?.meta[lessonId]?.title ?? null;
}

/**
 * Can-do ifadelerinin ana dildeki karşılıkları.
 *
 * `Cando` tipinde yalnız `tr` var; İngilizcesi kendi hattında
 * (`data/lessons/cando/`) duruyor ve anahtarı `id` (`A1.SPK.1`). Kaynak
 * dosyaya yedinci bir konumsal argüman eklemek yerine dışarıdan bağlandı.
 *
 * Karşılığı olmayan ifade DÜŞÜYOR — İngilizce bir listenin ortasında tek
 * bir Türkçe madde, yarım çevirinin en görünür hâli.
 */
export async function nativeCando(
  ids: string[],
  lang: NativeLang | null | undefined,
): Promise<string[] | null> {
  if (!lang || lang === DEFAULT_NATIVE) return null;
  if (lang === "de") {
    const de = await deDict();
    if (!de) return null;
    return ids.map((id) => de.cando[id]).filter((t): t is string => Boolean(t));
  }
  const dict = await nativeDict();
  if (!dict) return null;
  return ids.map((id) => dict.cando[id]).filter((t): t is string => Boolean(t));
}

/**
 * Can-do ifadesinin TEK tek çevirisi — Yapabildiklerim listesi için.
 *
 * `nativeCando` ile aynı sözlük, BAŞKA bir kural: orada karşılığı olmayan
 * ifade DÜŞÜYOR, çünkü ders sayfasının altındaki köprü bir özet ve eksik
 * madde orada yalnızca kısalık. Yapabildiklerim ekranı öyle değil: satırın
 * kimliği ifadenin KENDİSİ ve yanında kullanıcının kanıt sayacı duruyor.
 * Satırı düşürmek kullanıcının ilerlemesini gizler, seviye sayaçlarını da
 * tutarsız bırakır — o yüzden burada Türkçeye düşmek doğru geri düşüş.
 *
 * `nativeExamText` ve `nativeMockText` ile aynı biçim: eşleyici dönüyor,
 * sözlük bir kez açılıyor ve çağıran her satır için yeniden beklemiyor.
 */
export async function nativeCandoText(
  lang: NativeLang | null | undefined,
): Promise<(id: string, tr: string) => string> {
  if (!lang || lang === DEFAULT_NATIVE) return (_id, tr) => tr;
  if (lang === "de") {
    const de = await deDict();
    if (!de) return (_id, tr) => tr;
    return (id, tr) => de.cando[id] ?? tr;
  }
  const dict = await nativeDict();
  if (!dict) return (_id, tr) => tr;
  return (id, tr) => dict.cando[id] ?? tr;
}

/**
 * Modül sınavı kâğıdını ana dile çevirir; çeviremezse kâğıdı OLDUĞU GİBİ döner.
 *
 * Ders çözücüsüyle aynı geri düşüş: yarım değil, tümden Türkçe. Kâğıt
 * Almancayı ölçmeye devam ediyor — çevrilen yalnız yönergeler, durumlar ve
 * soru köklerinin altındaki karşılık.
 */
export async function localiseExam<T extends ExamShape>(
  plan: T | undefined,
  lang: NativeLang | null | undefined,
): Promise<T | undefined> {
  /* ALMANCA DALI YOK ve bu bir eksik değil: modül sınavı yalnız Almanca
     kursta var (`hasModuleExams`, kurs `en` ise false). Anadili Almanca
     olan kullanıcı yalnız İngilizce kursu alıyor, yani buraya bir plan
     hiç gelmiyor. Gelirse Türkçe kalıyor — kardeşleriyle aynı geri düşüş. */
  if (!plan || !lang || lang === DEFAULT_NATIVE || lang !== "en") return plan;
  const dict = await nativeDict();
  if (!dict) return plan;
  const out = resolveExam(dict, plan);
  if (!out) {
    console.warn("[native] sınav kâğıdı çevrilemedi, Türkçe kalıyor");
    return plan;
  }
  return out;
}

/**
 * Sınav kâğıdının TEK bir Türkçe alanını çeviren eşleyici — liste satırları
 * için. Bütün kâğıdı çözmek gerekmeyen yerlerde kullanılıyor.
 *
 * BURADA HEP-YA-HİÇ YOK, bilerek. `resolveExam` bir alan bile eksikse kâğıdı
 * reddediyor çünkü yarım bir sınav kâğıdı öğrencinin yönergeye güvenemediği
 * bir kâğıt. Liste satırı öyle değil: satırın kimliği ALMANCA başlık
 * (`titleDe`) ve o yanında zaten duruyor. Karşılığı bulunamayan bir alt
 * başlık lekedir; satırı düşürmek ise o modülün sınavını gizler.
 */
export async function nativeExamText(
  lang: NativeLang | null | undefined,
): Promise<(tr: string) => string> {
  /* `localiseExam` ile aynı gerekçe: modül sınavı Almanca kursa ait. */
  if (!lang || lang === DEFAULT_NATIVE || lang !== "en") return (tr) => tr;
  const dict = await nativeDict();
  if (!dict) return (tr) => tr;
  return (tr) => dict.exam[tr] ?? tr;
}

/**
 * Beceri egzersizini ana dile çevirir; çeviremezse egzersizi OLDUĞU GİBİ döner.
 *
 * Kardeşleriyle aynı geri düşüş. Çevrilen yalnız iki alan: `intro` (ne
 * yapacağını söyleyen çerçeve) ve `questions[].explain` (cevaptan sonraki
 * gerekçe). Metin, soru kökü ve şıklar ÖĞRENİLEN dilde ve öyle kalıyor —
 * egzersizin ölçtüğü şey onlar.
 *
 * Çağıran TEK yer var: `/immersion/skill/[id]` sayfası. `getExercise` bu
 * işi kendisi yapmıyor çünkü öteki üç çağıranı (puanlama, kayıt, rol yapma
 * uç noktası) düz metni HİÇ kullanmıyor; oralarda çeviri boşa yüklenen bir
 * 1,7 MB sözlük olurdu.
 */
export async function localiseExercise<T extends ExerciseShape>(
  ex: T,
  lang: NativeLang | null | undefined,
): Promise<T> {
  if (!lang || lang === DEFAULT_NATIVE) return ex;
  if (lang === "de") {
    const de = await deDict();
    if (!de) return ex;
    const out = resolveExercise(asNative(de), ex);
    if (!out) {
      // İngilizce kursun 189 egzersizinin hepsi çözülüyor (kapı: check:native-de).
      console.warn("[native] egzersiz Almancaya çevrilemedi, Türkçe kalıyor");
      return ex;
    }
    return out;
  }
  const dict = await nativeDict();
  if (!dict) return ex;
  const out = resolveExercise(dict, ex);
  if (!out) {
    // `de` kursunun egzersizlerinin hepsi çözülüyor (kapı: check:skills-prose).
    // Buraya düşen egzersiz başka bir kurstan geliyor demektir.
    console.warn("[native] egzersiz çevrilemedi, Türkçe kalıyor");
    return ex;
  }
  return out;
}

/**
 * Deneme kâğıdını ana dile çevirir; çeviremezse kâğıdı OLDUĞU GİBİ döner.
 *
 * Kardeşleriyle aynı geri düşüş ve aynı gerekçe: yarım değil, tümden Türkçe.
 * Kâğıt Almancayı ölçmeye devam ediyor — çevrilen yalnız yönerge, durum
 * tarifi, görev metni, değerlendirme ölçütleri ve cevaptan sonraki gerekçe.
 * Metinlerin gövdesi, madde kökleri, şıklar ve `partner` replikleri sınav
 * malzemesi ve olduğu gibi kalıyor.
 *
 * Çağıran: `/mock-exams/[paper]/[skill]`. Liste sayfası bunu KULLANMIYOR
 * (bkz. `nativeMockText`): orada tek bir alan var ve hep-ya-hiç kuralı bir
 * kâğıdı listeden düşürürdü.
 */
export async function localiseMockPaper<T extends MockShape>(
  paper: T,
  lang: NativeLang | null | undefined,
): Promise<T> {
  if (!lang || lang === DEFAULT_NATIVE) return paper;
  if (lang === "de") {
    const de = await deDict();
    if (!de) return paper;
    const out = resolveMockPaper(asNative(de), paper);
    if (!out) {
      // İngilizce kursun 60 kâğıdının hepsi çözülüyor (kapı: check:native-de).
      console.warn("[native] deneme kâğıdı Almancaya çevrilemedi, Türkçe kalıyor");
      return paper;
    }
    return out;
  }
  const dict = await nativeDict();
  if (!dict) return paper;
  const out = resolveMockPaper(dict, paper);
  if (!out) {
    // 60 Almanca kâğıdın hepsi çözülüyor (kapı: check:mock-native).
    // Buraya düşen kâğıt başka bir kurstan geliyor demektir.
    console.warn("[native] deneme kâğıdı çevrilemedi, Türkçe kalıyor");
    return paper;
  }
  return out;
}

/**
 * Kâğıdın TEK bir Türkçe alanını çeviren eşleyici — liste satırları için.
 *
 * `nativeExamText` ile aynı düşünce ve aynı bilinçli gevşeklik: burada
 * hep-ya-hiç YOK. Satırın kimliği ALMANCA tema (`theme`) ve o yanında zaten
 * duruyor; karşılığı bulunamayan bir alt başlık lekedir, satırı düşürmek
 * ise o kâğıdı listeden gizler.
 *
 * Anahtar bileşik olduğu için TÜR de isteniyor — çağıran hangi alanı
 * çevirdiğini biliyor, sözlük bilmiyor.
 */
export async function nativeMockText(
  lang: NativeLang | null | undefined,
): Promise<(kind: string, tr: string) => string> {
  if (!lang || lang === DEFAULT_NATIVE) return (_kind, tr) => tr;
  if (lang === "de") {
    const de = await deDict();
    if (!de) return (_kind, tr) => tr;
    return (kind, tr) => de.mock[mockKey(kind, tr)] ?? tr;
  }
  const dict = await nativeDict();
  if (!dict) return (_kind, tr) => tr;
  return (kind, tr) => dict.mock[mockKey(kind, tr)] ?? tr;
}
