/**
 * Paket ve madde kimlikleri — sunucunun da istemcinin de tanıdığı biçim.
 *
 * `server-only` DEĞİL: mobil istemci de aynı kuralları uyguluyor ve panel
 * (istemci bileşeni) paket adını çiziyor. Doğrulayıcılar burada duruyor ki
 * kimlik biçimi tek yerde yazılı kalsın.
 *
 * Kimlik ADRESİN parçası (`/api/content/manifest?pack=...`) ve dosya adının
 * parçası (mobil disk önbelleği). Bu yüzden biçim kapalı bir kümeyle
 * sınırlı: nokta-nokta ile dizin dışına çıkma, boşluk, eğik çizgi yığını
 * hiçbiri geçmiyor. Süzgeç reddetmeyi tercih ediyor — tanımadığı bir kimliği
 * temizlemeye çalışmak, temizlenmiş hâlin başka bir maddeye denk gelmesi
 * riskini doğurur.
 */

/** Paketin TAMAMININ tek arşivi. Sıfırdan dolan istemci bunu indiriyor. */
export const FULL_PACK = "*";

/**
 * SIRA MADDESİ — paketin maddelerinin KAYNAKTAKİ sırası.
 *
 * Paket bir eşleme (madde → gövde) ve eşlemenin sırası taşınmıyor: soğuk
 * dolumda arşivin anahtar sırası korunuyor ama delta güncellemesinde değişen
 * maddeler sona ekleniyor. Oysa bazı içeriklerde SIRA ANLAM taşıyor —
 * patika üniteleri ders listesini sırayla tüketiyor, beceri havuzları da.
 * Sıra kaybolursa hiçbir şey hata vermez; müfredat sessizce karışır.
 *
 * Bu yüzden sıra AÇIKÇA yayınlanıyor: paket içinde kimlik listesi taşıyan
 * ayrılmış bir madde. İçerik değil, bu yüzden madde listelerinden süzülüyor.
 */
export const ORDER_ITEM = "index";

/** "conversations/de-a1" · "papers/de" · "native/en" · "skills/de-b1" */
const PACK_RE = /^[a-z]{3,16}\/[a-z0-9-]{1,24}$/;
/** "de-a1-b03" · "de-b1-01" · "*" */
const ITEM_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;
/** sha-256'nın ilk 32 hex hanesi. */
const HASH_RE = /^[0-9a-f]{32}$/;

export function isPackId(v: unknown): v is string {
  return typeof v === "string" && PACK_RE.test(v);
}

export function isItemId(v: unknown): v is string {
  return typeof v === "string" && (v === FULL_PACK || ITEM_RE.test(v));
}

export function isContentHash(v: unknown): v is string {
  return typeof v === "string" && HASH_RE.test(v);
}

/**
 * KAPILI PAKETLER — herkese açık uçlardan hiç geçmeyenler.
 *
 * Deneme sınavı kâğıtları da aynı hattan yayınlanıyor: tek üretim yolu, tek
 * doğrulama, tek sürüm defteri. Ama manifest herkese açık, yani kâğıtlar
 * orada görünseydi hash'leri de görünürdü ve hash gövdenin adresi — premium
 * içerik tek bir liste okumasıyla sızardı. Kapı bu yüzden yayının değil
 * TESLİMİN üstünde: bu önekli paketler manifestte yok, gövdeleri
 * `/api/content/i/` tarafından reddediliyor, yalnız yetki kontrolünden geçen
 * imzalı uç veriyor.
 *
 * Liste kapalı ve elle yazılı: yeni bir kapılı içerik türü eklenirken buraya
 * yazmayı unutmak, onu herkese açmak demek. Bu yüzden karar burada duruyor,
 * çağıranın insafında değil.
 */
const GATED_PREFIXES = ["papers/"];

export function isGatedPack(pack: string): boolean {
  return GATED_PREFIXES.some((prefix) => pack.startsWith(prefix));
}

/**
 * Kapatma listesinin tel üzerindeki biçimi: `"<paket>:<madde>"`.
 *
 * Gösterge her istemcinin açılışta okuduğu en küçük cevap; kapatılan madde
 * orada iki alanlı bir nesne olarak değil tek dize olarak duruyor. Otuz
 * kapalı maddede fark yüz bayt değil kilobayt seviyesinde.
 */
export function flagKey(pack: string, item: string): string {
  return `${pack}:${item}`;
}
