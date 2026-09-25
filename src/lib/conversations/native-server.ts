import "server-only";
import type { Conversation } from "./types";
import {
  resolveConversation,
  resolveExam,
  resolveExamDe,
  resolveExercise,
  resolveMockPaper,
  mockKey,
  type NativeDict,
  type ExamShape,
  type ExerciseShape,
  type MockShape,
} from "./native";
import { resolveEnConversation, deKey, type DeDict } from "./native-de";
import { DEFAULT_NATIVE, type NativeLang } from "@/lib/courses";
import { packObject } from "@/lib/content/serve";

/**
 * Anlatım sözlüğünü SUNUCUDA, yalnız gerektiğinde yükler.
 *
 * Sözlük 1,7 MB — 8.824 anlatım dizesi, 4.640 kelime karşılığı, 580 konuşma
 * başlığı. Arayüz sözlükleriyle (`src/lib/i18n/dict.ts`) aynı yere konsaydı
 * her isteğe, her kullanıcıya, her dil için binerdi. Oysa Türkçe kullanan
 * biri onu HİÇ kullanmıyor: içerik zaten Türkçe.
 *
 * O yüzden `import()` gecikmeli ve sonucu modül düzeyinde tutuluyor —
 * Node süreci boyunca bir kez okunuyor. `native_lang` Türkçe olan bir
 * kurulumda dosya hiç açılmıyor.
 *
 * ÜRETİLEN DOSYA: `data/conversations/apply.mjs` yazıyor ve depoda durmuyor.
 * Yoksa özellik sessizce kapanıyor (konuşma Türkçe kalıyor) — çünkü eksik
 * sözlük yüzünden konuşma sayfasının açılmaması, çeviriden çok daha kötü.
 */
let cache: NativeDict | null | undefined;

/**
 * SÖZLÜK YAYIN HATTINDAN — 4,9 MB statik içe alım kalktı.
 *
 * Sözlük `native/en` paketi olarak yayınlanıyor ve üst anahtarları (lecture,
 * vocab, exam…) paketin maddeleri. Mobil de aynı paketi indiriyor: tek kaynak.
 *
 * Önbellek süreç ömrü boyunca duruyor ama `packObject` sürüm anahtarı
 * kullandığı için yeni yayın kendiliğinden yeni bir nesne veriyor; buradaki
 * `cache` yalnız aynı istek dizisinde tekrar okumayı önlüyor.
 */
async function nativeDict(): Promise<NativeDict | null> {
  if (cache !== undefined) return cache;
  const built = await packObject<unknown>("native/en");
  if (!built) {
    console.error("[native] sözlük yayında yok — `content:publish` çalıştırıldı mı?");
    cache = null;
    return cache;
  }
  cache = built as unknown as NativeDict;
  return cache;
}

/**
 * ALMANCA sözlük — anadili Almanca olan kullanıcı için, aynı gecikmeli yükleme.
 *
 * NEDEN İKİNCİ BİR SÖZLÜK. `native-en.json` Almanca kursun Türkçesini
 * İngilizceye çeviriyor; bu ise İngilizce kursun Türkçesini Almancaya.
 * İki yönün kaynağı da şekli de başka (bkz. `data/conversations/apply-de.mjs`)
 * ve bir kullanıcı ikisini birden kullanmıyor: Türkçe kullanan hiçbirini,
 * anadili İngilizce olan yalnız birincisini, anadili Almanca olan yalnız
 * ikincisini açıyor. Tek dosyada birleştirmek her isteğe okunmayan yarıyı
 * bindirirdi.
 */
let cacheDe: DeDict | null | undefined;

async function deDict(): Promise<DeDict | null> {
  if (cacheDe !== undefined) return cacheDe;
  const built = await packObject<unknown>("native/de");
  if (!built) {
    console.error("[native] Almanca sözlük yayında yok — `content:publish` çalıştırıldı mı?");
    cacheDe = null;
    return cacheDe;
  }
  cacheDe = built as unknown as DeDict;
  return cacheDe;
}

/* `resolveExercise`, `resolveMockPaper` ve `resolveExamDe` `NativeDict`
   bekliyor ama yalnız `prose`, `mock` ve `exam` alanlarına dokunuyorlar;
   `DeDict`in o üç alanı aynı adı ve aynı anahtar biçimini taşıyor, eksik
   alanlar hiç okunmuyor. Kapı bunu gerçek içerik üzerinde ölçüyor:
   `scripts/check-native-de.ts`. */
const asNative = (dict: DeDict): NativeDict => dict as unknown as NativeDict;

/**
 * Konuşmayı öğrencinin ana diline çevirir; çeviremezse konuşmayı OLDUĞU GİBİ döner.
 *
 * Geri düşüş bilinçli ve yarım konuşma DEĞİL: `resolveConversation` hep-ya-hiç
 * çalışıyor, yani sonuç ya tümüyle İngilizce ya tümüyle Türkçe. Yasak olan
 * ikisinin karışması.
 *
 * Türkçe bir konuşmayı İngilizce konuşana göstermek işe yaramaz ama konuşma
 * sayfasını hiç açmamak daha kötü. Asıl çözüm daha yukarıda: içeriği
 * çevrilmemiş bir kurs, o ana dil için kurs listesinde HİÇ görünmemeli
 * (`PAIR_READY`). Burası son çare.
 */
export async function localiseConversation(conversation: Conversation, lang: NativeLang | null | undefined): Promise<Conversation> {
  if (!lang || lang === DEFAULT_NATIVE) return conversation;
  if (lang === "de") {
    /* AYRI ÇÖZÜCÜ, ayrı sözlük: İngilizce kursun konuşmaları kendi kendine
       yeten JSON, `resolveConversation`ın beklediği şablon yapısı yok. */
    const de = await deDict();
    if (!de) return conversation;
    const out = resolveEnConversation(de, conversation);
    if (!out) {
      // İngilizce kursun 200 konuşmasının hepsi çözülüyor (kapı: check:native-de).
      // Buraya düşen konuşma başka bir kurstan geliyor demektir.
      console.warn(`[native] konuşma Almancaya çevrilemedi, Türkçe kalıyor: ${conversation.id}`);
      return conversation;
    }
    return out;
  }
  const dict = await nativeDict();
  if (!dict) return conversation;
  const out = resolveConversation(dict, conversation);
  if (!out) {
    // `de-*` konuşmalarının hepsi çözülüyor (kapı: check:conversations-native).
    // Buraya düşen konuşma başka bir kurstan geliyor demektir.
    console.warn(`[native] konuşma çevrilemedi, Türkçe kalıyor: ${conversation.id}`);
    return conversation;
  }
  return out;
}

/**
 * Bir konuşmanın ana dildeki BAŞLIĞI — bütün konuşması çözmeye gerek olmayan yerler
 * için (sıradaki konuşma köprüsü, liste satırı).
 *
 * Karşılık yoksa `null`: çağıran taraf Türkçeye düşmek yerine o parçayı
 * göstermemeyi seçebilsin. İngilizce bir sayfanın içinde tek bir Türkçe
 * başlık, yarım çevirinin en görünür hâli.
 */
export async function nativeTitle(
  conversationId: string,
  lang: NativeLang | null | undefined,
): Promise<string | null> {
  if (!lang || lang === DEFAULT_NATIVE) return null;
  if (lang === "de") {
    /* ALMANCA SÖZLÜKTE `meta` YOK ve olmasına gerek de yok: başlık konuşma
       düzyazısı hattında `titleTr` türüyle zaten duruyor, anahtarı METNİN
       KENDİSİ. Konuşmayı id'den bulup başlığını sormak, sözlüğe ikinci bir
       indeks eklemekten ucuz — `findConversation` zaten bellekte duran diziye
       bakıyor. Konuşma paketi yalnız bu dalda yükleniyor. */
    const de = await deDict();
    if (!de) return null;
    const { findConversation } = await import("./index");
    const titleTr = (await findConversation(conversationId))?.titleTr;
    if (!titleTr) return null;
    return de.conversation[deKey("titleTr", titleTr)] ?? null;
  }
  const dict = await nativeDict();
  return dict?.meta[conversationId]?.title ?? null;
}

/**
 * Can-do ifadelerinin ana dildeki karşılıkları.
 *
 * `Cando` tipinde yalnız `tr` var; İngilizcesi kendi hattında
 * (`data/conversations/cando/`) duruyor ve anahtarı `id` (`A1.SPK.1`). Kaynak
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
 * ifade DÜŞÜYOR, çünkü konuşma sayfasının altındaki köprü bir özet ve eksik
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
 * Konuşma çözücüsüyle aynı geri düşüş: yarım değil, tümden Türkçe. Kâğıt hedef
 * dili ölçmeye devam ediyor — çevrilen yalnız yönergeler, durumlar ve soru
 * köklerinin altındaki karşılık.
 *
 * İKİ YÖN, İKİ SÖZLÜK. Anadili İngilizce olan kullanıcı Almanca kursu alıyor
 * ve o kâğıtları `native/en` çözüyor; anadili Almanca olan kullanıcı
 * İngilizce kursu alıyor ve onunkileri `native/de`. Almanca dal 2026-09-21'de
 * açıldı: o güne kadar modül sınavı yalnız Almanca kursta vardı, yani Almanca
 * okurun önüne hiç kâğıt gelmiyordu ve buradaki yorum bunu gerekçe
 * gösteriyordu. İngilizce kursun elli kâğıdıyla o gerekçe düştü.
 */
export async function localiseExam<T extends ExamShape>(
  plan: T | undefined,
  lang: NativeLang | null | undefined,
): Promise<T | undefined> {
  if (!plan || !lang || lang === DEFAULT_NATIVE) return plan;
  if (lang === "de") {
    const de = await deDict();
    if (!de) return plan;
    const out = resolveExamDe(asNative(de), plan);
    if (!out) {
      console.warn("[native] sınav kâğıdı Almancaya çevrilemedi, Türkçe kalıyor");
      return plan;
    }
    return out;
  }
  if (lang !== "en") return plan;
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
  /* `localiseExam` ile aynı iki yön: `en` Almanca kursun kâğıtlarını,
     `de` İngilizce kursunkileri çözüyor. */
  if (!lang || lang === DEFAULT_NATIVE) return (tr) => tr;
  if (lang === "de") {
    const de = await deDict();
    if (!de) return (tr) => tr;
    return (tr) => de.exam[tr] ?? tr;
  }
  if (lang !== "en") return (tr) => tr;
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
 * işi kendisi yapmıyor çünkü öteki üç çağıranı (puanlama, kayıt, sohbet
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
