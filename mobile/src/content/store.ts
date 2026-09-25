import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiBase, fetchWithTimeout } from "../api/client";

/**
 * İÇERİK İSTEMCİSİ — sunucudan inen içeriğin cihazdaki hâli.
 *
 * BU DOSYA 1 NUMARALI BUILD'DE OLMAK ZORUNDA. Sunucu ne yayınlarsa
 * yayınlasın, onu sormayı bilmeyen bir uygulamaya hiçbir şey ulaşmaz: ne yeni
 * konuşma, ne düzeltme, ne bozuk maddenin kapatılması. Kanca eksik çıkarsa o
 * sürümdeki kullanıcılar için tek çare zorunlu güncelleme olur.
 *
 * ÜÇ İSTEK, ÜÇ AYRI ÖMÜR:
 *
 *   gösterge   `/api/content/pointer`        her ön plana gelişte, ~14 bayt
 *   manifest   `/api/content/manifest?pack=` paket açılırken, delta
 *   gövde      `/api/content/i/<hash>`       yalnız hash'i değişen madde
 *
 * Gövdenin adresi içeriğinin hash'i, yani bir daha asla değişmiyor: indirilen
 * bir madde için ikinci kez istek atılmıyor, sunucunun önbelleği de onu
 * Node'a hiç sormuyor. Bir kelime düzeltildiğinde inen şey 27 MB değil, o
 * maddenin birkaç kilobaytı.
 *
 * SIKIŞTIRMA BAŞLIĞI ELLE YAZILMIYOR ve bu bilinçli. Android'in ağ katmanı
 * `Accept-Encoding`i KENDİSİ ekleyince cevabı kendisi açıyor; başlığı biz
 * yazarsak açmayı bırakıyor ve elimize çözülmemiş baytlar geliyor. iOS zaten
 * brotli dahil istiyor ve açıyor. Yani hiçbir şey yazmamak her iki platformda
 * da doğru olan.
 *
 * ANAHTARLAR ÇIKIŞTA SİLİNMİYOR. `lib/accountScope` hesaba ait önekleri
 * süpürüyor; içerik hesaba ait değil, CİHAZA ait — aynı telefonda başka bir
 * hesap açıldığında aynı konuşmalar geçerli. Süpürülseydi her hesap değişimi
 * megabaytlarca yeniden indirme demek olurdu. `content:` öneki bu yüzden o
 * listede yok.
 */

/* Yollar TAM ve AÇIK yazılı, parça parça kurulmuyor: `check:endpoints` her
   ucun bir çağıranı olduğunu kaynakta yolu ARAYARAK doğruluyor ve
   `${BASE}/pointer` gibi bir kuruluş o gözden kaçar — uç çağrılıyor olsa bile
   "çağıransız" görünür. */
/* Adresler İSTEK ANINDA kuruluyor: taban engelli ağda yedeğe geçebiliyor (bkz. api/base). */
const urlPointer = () => `${apiBase()}/api/content/pointer`;
const urlManifest = () => `${apiBase()}/api/content/manifest`;
const urlBody = (hash: string) => `${apiBase()}/api/content/i/${hash}`;

/** Gösterge: son görülen yayın sürümü ve kapatılan maddeler. */
const K_POINTER = "content:pointer";
/** Paket dizini: elimizde hangi sürümden hangi maddeler var. */
const packKey = (pack: string) => `content:pack:${pack}`;
/** Gövde. */
const bodyKey = (hash: string) => `content:body:${hash}`;

/**
 * SIRA MADDESİ — `src/lib/content/ids` `ORDER_ITEM` ile AYNI değer.
 *
 * Paket bir eşleme ve eşlemenin sırası taşınmıyor; sırası anlamlı içerikler
 * (konuşmalar, beceriler) kimlik listesini ayrı bir maddede yayınlıyor. İçerik
 * değil, bu yüzden `listContentItems` onu süzüyor — ekranlar onu bir konuşma
 * sanmasın.
 */
const ORDER_ITEM = "index";

/**
 * Tek bir AsyncStorage değerinin tavanı.
 *
 * Android'de depo SQLite ve satır başına imleç penceresi 2 MB; o sınıra yakın
 * bir değer okunurken sessizce düşüyor. Anadil sözlüğünün bazı maddeleri tek
 * başına megabaytlarca — bu yüzden büyük gövde parçalara bölünüyor. Bölme
 * saf JS: yeni bir native bağımlılık, yeni bir derleme riski yok.
 */
const CHUNK = 256 * 1024;

type Pointer = { r: number; d: string[] };
type PackIndex = { r: number; items: Record<string, string> };

let pointerCache: Pointer = { r: 0, d: [] };
let pointerLoaded = false;
/** Süreç ömrü boyunca çözülmüş gövdeler — ekran her karede diske gitmesin. */
const memory = new Map<string, unknown>();

async function readJson<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

async function writeJson(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Disk dolu ya da yazma reddedildi: elimizdeki içerikle devam ediyoruz.
       Bir sonraki açılışta yeniden denenecek. */
  }
}

/** Büyük gövdeyi parçalara bölerek yazar; küçük olan tek anahtarda kalır. */
async function writeBody(hash: string, text: string): Promise<void> {
  try {
    if (text.length <= CHUNK) {
      await AsyncStorage.setItem(bodyKey(hash), text);
      return;
    }
    const parts = Math.ceil(text.length / CHUNK);
    for (let i = 0; i < parts; i++) {
      await AsyncStorage.setItem(`${bodyKey(hash)}#${i}`, text.slice(i * CHUNK, (i + 1) * CHUNK));
    }
    /* Parça sayısı EN SONA yazılıyor: yarım kalan bir yazma "n parça var"
       diyen bir başlık bırakmasın, yoksa okuma eksik parçayı arar. */
    await AsyncStorage.setItem(bodyKey(hash), `#${parts}`);
  } catch {
    /* yut — gövde yoksa madde bir dahaki sefere indirilir */
  }
}

async function readBody(hash: string): Promise<string | null> {
  try {
    const head = await AsyncStorage.getItem(bodyKey(hash));
    if (head === null) return null;
    if (!head.startsWith("#")) return head;
    const parts = Number(head.slice(1));
    if (!Number.isFinite(parts) || parts <= 0) return null;
    let out = "";
    for (let i = 0; i < parts; i++) {
      const chunk = await AsyncStorage.getItem(`${bodyKey(hash)}#${i}`);
      if (chunk === null) return null;
      out += chunk;
    }
    return out;
  } catch {
    return null;
  }
}

async function dropBody(hash: string): Promise<void> {
  try {
    const head = await AsyncStorage.getItem(bodyKey(hash));
    if (head?.startsWith("#")) {
      const parts = Number(head.slice(1));
      for (let i = 0; i < parts; i++) await AsyncStorage.removeItem(`${bodyKey(hash)}#${i}`);
    }
    await AsyncStorage.removeItem(bodyKey(hash));
  } catch {
    /* yut */
  }
}

/**
 * Göstergeyi tazeler — ön plana her dönüşte çağrılıyor (`ui/AppGate`).
 *
 * Cevap değişmediyse sunucu 304 dönüyor ve gövde hiç inmiyor. Ağ yoksa
 * eldeki gösterge korunuyor: kapatılmış bir madde çevrimdışıyken yeniden
 * görünmemeli.
 */
export async function syncContentPointer(): Promise<Pointer> {
  if (!pointerLoaded) {
    pointerCache = (await readJson<Pointer>(K_POINTER)) ?? pointerCache;
    pointerLoaded = true;
  }
  try {
    const res = await fetchWithTimeout(urlPointer(), { timeoutMs: 8000 });
    if (!res.ok) return pointerCache;
    const next = (await res.json()) as Partial<Pointer>;
    if (typeof next.r !== "number") return pointerCache;
    pointerCache = { r: next.r, d: Array.isArray(next.d) ? next.d.filter((x) => typeof x === "string") : [] };
    await writeJson(K_POINTER, pointerCache);
  } catch {
    /* Ağ yok ya da sunucu sustu: eldeki gösterge geçerli kalıyor. */
  }
  return pointerCache;
}

/** Kapatılmış madde mi — gövdesi cihazda olsa bile gizleniyor. */
export function isContentDisabled(pack: string, item: string): boolean {
  return pointerCache.d.includes(`${pack}:${item}`);
}

/** Cihazdaki yayın sürümü (0 = hiç içerik inmemiş). */
export function contentRelease(): number {
  return pointerCache.r;
}

/**
 * Paketi güncel hâle getirir.
 *
 * Elde hiçbir şey yoksa paketin TAMAMI tek arşiv isteğiyle iniyor (yüz ayrı
 * istek yerine bir tane); sonraki her güncellemede yalnız hash'i değişen
 * maddeler. Düşen maddeler dizinden ve diskten atılıyor.
 *
 * Sürüm elimizdekiyle aynıysa HİÇBİR İSTEK atılmıyor — güncel bir paket için
 * bu işlev bedava.
 */
export async function ensurePack(pack: string): Promise<boolean> {
  const local = (await readJson<PackIndex>(packKey(pack))) ?? { r: 0, items: {} };
  if (pointerCache.r > 0 && local.r === pointerCache.r) return true;

  try {
    const res = await fetchWithTimeout(`${urlManifest()}?pack=${encodeURIComponent(pack)}&since=${local.r}`, {
      timeoutMs: 15_000,
    });
    if (!res.ok) return Object.keys(local.items).length > 0;
    const m = (await res.json()) as {
      r: number;
      f: { h: string } | null;
      i: { i: string; h: string }[];
      x: string[];
    };
    if (!m || typeof m.r !== "number" || m.r === 0) return Object.keys(local.items).length > 0;

    const items = { ...local.items };
    const cold = Object.keys(items).length === 0;

    if (cold && m.f) {
      /* SOĞUK DOLUM: paketin tamamı tek istekte. Arşiv `{madde: gövde}`
         biçiminde; parçalanıp tek tek saklanıyor ki sonraki güncellemeler
         madde düzeyinde olabilsin. */
      const archive = await fetchJson<Record<string, unknown>>(urlBody(m.f.h));
      if (!archive) return false;
      const wanted = new Map(m.i.map((entry) => [entry.i, entry.h]));
      for (const [item, value] of Object.entries(archive)) {
        const hash = wanted.get(item);
        if (!hash) continue;
        await writeBody(hash, JSON.stringify(value));
        items[item] = hash;
        memory.set(hash, value);
      }
    } else {
      for (const entry of m.i) {
        const text = await fetchText(urlBody(entry.h));
        if (text === null) continue;
        await writeBody(entry.h, text);
        const previous = items[entry.i];
        items[entry.i] = entry.h;
        /* Eski gövde başka bir madde tarafından kullanılmıyorsa diskten
           atılıyor: güncelleme cihazda yer biriktirmemeli. */
        if (previous && previous !== entry.h && !Object.values(items).includes(previous)) {
          memory.delete(previous);
          await dropBody(previous);
        }
      }
    }

    for (const gone of m.x) {
      const hash = items[gone];
      delete items[gone];
      if (hash && !Object.values(items).includes(hash)) {
        memory.delete(hash);
        await dropBody(hash);
      }
    }

    await writeJson(packKey(pack), { r: m.r, items });
    return true;
  } catch {
    /* İndirme yarıda kaldı: dizin GÜNCELLENMİYOR, yani eldeki sürüm geçerli
       kalıyor ve bir sonraki denemede aynı delta yeniden isteniyor. Yarım bir
       paketi güncel saymak, eksik içerikle konuşma açmak olurdu. */
    return Object.keys(local.items).length > 0;
  }
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetchWithTimeout(url, { timeoutMs: 20_000 });
    return res.ok ? await res.text() : null;
  } catch {
    return null;
  }
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const text = await fetchText(url);
  if (text === null) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

/**
 * Cihazdaki bir maddeyi okur. Kapatılmış madde `null` dönüyor.
 *
 * Ağa HİÇ çıkmıyor: çağıran ekran önce `ensurePack` ile paketin güncel
 * olduğundan emin oluyor, sonra buradan okuyor. Böylece çizim yolu her zaman
 * senkron hızında ve çevrimdışı çalışıyor.
 */
export async function getContentItem<T>(pack: string, item: string): Promise<T | null> {
  if (isContentDisabled(pack, item)) return null;
  const index = await readJson<PackIndex>(packKey(pack));
  const hash = index?.items[item];
  if (!hash) return null;
  const hit = memory.get(hash);
  if (hit !== undefined) return hit as T;
  const text = await readBody(hash);
  if (text === null) return null;
  try {
    const value = JSON.parse(text) as T;
    memory.set(hash, value);
    return value;
  } catch {
    return null;
  }
}

/**
 * Paketteki madde kimlikleri — KAYNAK SIRASINDA, kapatılmışlar hariç.
 *
 * Paket sıra maddesi taşıyorsa o sıra geçerli; taşımıyorsa eldeki sıra
 * korunuyor. Sıra maddesinde olmayan bir madde (yeni eklenmiş, sıra listesi
 * eski) sona geliyor — kaybolmasındansa sonda dursun.
 */
export async function listContentItems(pack: string): Promise<string[]> {
  const index = await readJson<PackIndex>(packKey(pack));
  if (!index) return [];
  const have = Object.keys(index.items).filter((item) => item !== ORDER_ITEM && !isContentDisabled(pack, item));
  const order = index.items[ORDER_ITEM] ? await getContentItem<string[]>(pack, ORDER_ITEM) : null;
  if (!Array.isArray(order)) return have;
  const rank = new Map(order.map((id, i) => [id, i]));
  return have.sort((a, b) => (rank.get(a) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b) ?? Number.MAX_SAFE_INTEGER));
}
