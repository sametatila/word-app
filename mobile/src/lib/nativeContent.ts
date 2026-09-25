/**
 * İçeriği kullanıcının ANA DİLİNE çeviren mobil katman.
 *
 * Web'deki `src/lib/conversations/native-server.ts`in karşılığı ve aynı kuralları
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
 * SÖZLÜK ARTIK PAKETTE DEĞİL, İNDİRİLİYOR.
 *
 * İki sözlük ikilinin içinde duruyordu (5,6 MB + 4,9 MB = 10,5 MB ham) ve
 * `require` gövde içinde olduğu için yalnız AYRIŞTIRMA erteleniyordu —
 * baytlar her kullanıcının telefonuna iniyordu. Oysa çeviri yönü tek: anadili
 * İngilizce olan yalnız `native/en`i, Almanca olan yalnız `native/de`yi
 * kullanıyor ve anadili TÜRKÇE olan HİÇBİRİNİ (kaynağı zaten görüyor).
 * Yani kullanıcıların çoğu için bu 10,5 MB tamamen boşunaydı.
 *
 * Sözlük şimdi içerik hattından iniyor (`content/store`), bir kez, diske
 * yazılıyor ve oradan belleğe alınıyor. `ensureNativeDict()` açılışta ve dil
 * değişince çağrılıyor.
 *
 * YÜKLENENE KADAR ÇEVİRİ YOK ve bu hep-ya-hiç kuralının doğal uzantısı:
 * sözlük yoksa içerik kaynak dilinde kalıyor, yarım çevrilmiş hâlde değil.
 *
 * ÇÖZÜLEN SONUÇ ÖNBELLEKTE. Aynı ders bir oturumda onlarca kez okunuyor
 * (liste, oynatıcı, ilerleme) ve her seferinde 200 adımlık bir anlatımı
 * yeniden kurmak boşuna. Dil değişince önbellek tümden boşalıyor (en altta).
 */
import { currentLang, onLangChange } from "./i18n";
import {
  resolveConversation,
  resolveExercise,
  mockKey,
  type Conversation,
  type NativeDict,
} from "./native";
import { resolveEnConversation, type DeDict } from "./native-de";
import { ensurePack, getContentItem, listContentItems } from "../content/store";

/** Sözlük paketleri — anadile göre en fazla biri iniyor. */
const PACK_EN = "native/en";
const PACK_DE = "native/de";

let dict: NativeDict | null = null;
let dictDe: DeDict | null = null;
let loading: Promise<void> | null = null;
let loadedFor: string | null = null;

/**
 * Paketi indirir ve belleğe kurar.
 *
 * Sözlük üst anahtarlarına göre madde madde yayınlanıyor (`lecture`, `vocab`,
 * `exam`…), yani bir alanın metni değiştiğinde yalnız o alan yeniden iniyor.
 * Burada hepsi tek nesnede birleştiriliyor — çözücüler sözlüğü bütün olarak
 * bekliyor.
 */
async function loadDict(pack: string): Promise<Record<string, unknown> | null> {
  const ok = await ensurePack(pack);
  if (!ok) return null;
  const keys = await listContentItems(pack);
  if (keys.length === 0) return null;
  const out: Record<string, unknown> = {};
  for (const key of keys) {
    const value = await getContentItem<unknown>(pack, key);
    /* Eksik parça = eksik sözlük. Yarım sözlükle çevirmek, hep-ya-hiç
       kuralını çözücünün altından delmek olurdu. */
    if (value === null) return null;
    out[key] = value;
  }
  return out;
}

/**
 * Anadil sözlüğünü hazırlar — açılışta ve dil değişince çağrılıyor.
 *
 * Türkçe kullanan için hiçbir şey yapmıyor: indirme de yok, bellek de.
 * Aynı anda iki çağrı gelirse ikincisi birincinin sözünü bekliyor.
 */
export function ensureNativeDict(): Promise<void> {
  const lang = currentLang();
  if (lang !== "en" && lang !== "de") return Promise.resolve();
  if (loadedFor === lang) return Promise.resolve();
  if (loading) return loading;
  loading = (async () => {
    const loaded = await loadDict(lang === "en" ? PACK_EN : PACK_DE);
    if (currentLang() !== lang) return;
    if (lang === "en") dict = (loaded as NativeDict | null) ?? null;
    else dictDe = (loaded as DeDict | null) ?? null;
    loadedFor = loaded ? lang : null;
    cache.clear();
  })().finally(() => {
    loading = null;
  });
  return loading;
}

function nativeDict(): NativeDict | null {
  return dict;
}

function deDict(): DeDict | null {
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
export function nativeConversation<T extends { id: string; course?: string }>(conversation: T): T {
  const course = translatedCourse();
  if (!course || (conversation.course ?? "de") !== course) return conversation;
  if (course === "en") {
    /* AYRI ÇÖZÜCÜ: İngilizce kursun dersleri kendi kendine yeten JSON,
       `resolveConversation`ın beklediği şablon yapısı yok. */
    const de = deDict();
    if (!de) return conversation;
    return once(`conversation:${conversation.id}`, () => resolveEnConversation(de, conversation as unknown as Conversation) as T | null, conversation);
  }
  const d = nativeDict();
  if (!d) return conversation;
  return once(`conversation:${conversation.id}`, () => resolveConversation(d, conversation as unknown as Conversation) as T | null, conversation);
}

export function nativeExercise<T extends { id: string; course?: string }>(ex: T): T {
  const course = translatedCourse();
  if (!course || (ex.course ?? "de") !== course) return ex;
  const d = skillDict(course);
  if (!d) return ex;
  return once(`ex:${ex.id}`, () => resolveExercise(d, ex as never) as T | null, ex);
}

/*
  `nativeMockPaper` KALDIRILDI. Deneme kâğıdı artık sunucudan ÇEVRİLMİŞ
  iniyor (`/api/mock-exam`, `localiseMockPaper`); mobilde çevrilecek bir kâğıt
  kalmadı. Sözlüğün `mock` alanı yalnız `nativeMockText` için duruyor —
  liste satırındaki tema karşılığı.
*/


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
export function nativeConversationMeta(id: string): { title: string; summary: string } | null {
  return activeDict()?.meta[id] ?? null;
}

/* Dil değişince önbellek boşalıyor. Anahtar dili taşımıyor çünkü bir oturumda
   tek dil geçerli; taşısaydı Türkçeye dönen kullanıcının belleğinde 995
   egzersizin İngilizce kopyası asılı kalırdı. */
onLangChange(() => {
  /* Dil değişti: eldeki sözlük artık yanlış yönün sözlüğü. Bellekten
     düşürülüyor ve yenisi indiriliyor — inene kadar içerik kaynak dilinde
     kalıyor, yarım çevrilmiş değil. */
  dict = null;
  dictDe = null;
  loadedFor = null;
  clearNativeCache();
  void ensureNativeDict();
});
