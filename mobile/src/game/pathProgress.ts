/**
 * Biten Patika adımlarının cihaz kaydı — /api/immersion canlı olmadan
 * ilerleme. Konuşma id'leri ve beceri egzersizi id'leri aynı kümede (hepsi item
 * ref'i). Sunucuya da yazılır (/api/conversation, /api/skills); bu yerel set yalnız
 * gerçek track gelene kadar Patika'ya hangi adımın bittiğini söyler.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, ApiError } from "../api/client";
import { isSkillDone, scoreOf } from "../lib/learningRules";

const KEY = "lernomi-items-done";
let cache: Set<string> | null = null;

export async function getDoneItems(): Promise<Set<string>> {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cache = new Set<string>(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    cache = new Set<string>();
  }
  return cache;
}

export async function markItemDone(id: string): Promise<void> {
  const s = await getDoneItems();
  if (s.has(id)) return;
  s.add(id);
  try { await AsyncStorage.setItem(KEY, JSON.stringify([...s])); } catch { /* yut */ }
}

export function isItemDoneSync(id: string): boolean {
  return cache?.has(id) ?? false;
}

/** Egzersiz başına son puan — sunucudan gelen durum, yerelde önbellekli. */
const SCORE_KEY = "lernomi-item-scores";
let scoreCache: Record<string, number> | null = null;

/**
 * ÇEVRİMDIŞI BİTİRİLENİN KENDİ KAYDI.
 *
 * Egzersiz bitince sonuç sunucuya yazılıyor, ama ağ yoksa o istek düşüyor ve
 * bir daha DENENMİYORDU: kullanıcı metroda çalıştığı egzersizi cihaz
 * değiştirince kaybediyordu. Sunucuya taşımak için `correct`/`total` gerekiyor
 * (`PUT /api/skills` bunları istiyor); yalnız puan yetmiyor.
 */
const PENDING_KEY = "lernomi-items-pending";
/** `score`: rubrik puanı (monolog, yazma); yoksa sunucu doğru/toplamdan hesaplıyor. */
type PendingRecord = { id: string; correct: number; total: number; at: string; score?: number };
let pendingCache: Record<string, PendingRecord> | null = null;

async function getPending(): Promise<Record<string, PendingRecord>> {
  if (pendingCache) return pendingCache;
  try {
    const raw = await AsyncStorage.getItem(PENDING_KEY);
    pendingCache = raw ? (JSON.parse(raw) as Record<string, PendingRecord>) : {};
  } catch {
    pendingCache = {};
  }
  return pendingCache;
}

/** Sunucuya yazılamayan sonuç — bir sonraki bağlantıda taşınacak. */
export async function queueItemRecord(id: string, correct: number, total: number, score?: number): Promise<void> {
  const q = await getPending();
  q[id] = { id, correct, total, at: new Date().toISOString(), ...(typeof score === "number" ? { score } : {}) };
  pendingCache = q;
  try { await AsyncStorage.setItem(PENDING_KEY, JSON.stringify(q)); } catch { /* yut */ }
}

/**
 * ÖNCEKİ SONUÇ (Samet, 2026-10-07: "her açtığımda sıfırdan gösteriyor; önceki başarı
 * istatistiğim varsa onu göstermeli"). Puanın yanında en iyi puan, deneme sayısı ve son
 * deneme anı; alıştırma açılınca "Önceki sonucun" ekranı (`ui/PreviousResult`) bunu
 * çiziyor. Kaynak sunucu (`syncItemProgress`), bitirişte yerelde de güncelleniyor.
 */
export type ItemResult = { pct: number; best: number; attempts: number; at: string | null };
const RESULT_KEY = "lernomi-item-results";
let resultCache: Record<string, ItemResult> | null = null;

export async function getItemResults(): Promise<Record<string, ItemResult>> {
  if (resultCache) return resultCache;
  try {
    const raw = await AsyncStorage.getItem(RESULT_KEY);
    resultCache = raw ? (JSON.parse(raw) as Record<string, ItemResult>) : {};
  } catch {
    resultCache = {};
  }
  return resultCache;
}

async function saveItemResults(r: Record<string, ItemResult>): Promise<void> {
  resultCache = r;
  try { await AsyncStorage.setItem(RESULT_KEY, JSON.stringify(r)); } catch { /* yut */ }
}

/**
 * Bellekteki önbellekler çıkışta sıfırlanıyor (`lib/accountScope` `forgetAccountScoped`):
 * cihazdaki anahtarlar silinse de önbellek kalıyordu ve uygulama kapanmadan girilen
 * başka hesap öncekinin puanlarını görüyordu.
 */
export function forgetItemCaches(): void {
  scoreCache = null;
  resultCache = null;
}

export async function getItemResult(id: string): Promise<ItemResult | null> {
  return (await getItemResults())[id] ?? null;
}

export async function getItemScores(): Promise<Record<string, number>> {
  if (scoreCache) return scoreCache;
  try {
    const raw = await AsyncStorage.getItem(SCORE_KEY);
    scoreCache = raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    scoreCache = {};
  }
  return scoreCache;
}

/**
 * SUNUCUDAKİ DURUMU YERELE KATAR.
 *
 * Yerel küme yalnız BU cihazda bitirilenleri biliyordu: webde ya da başka bir
 * telefonda çalışılan egzersizler Android'de hiç bitmemiş görünüyordu ve
 * "sıradaki" önerisi baştan başlıyordu. Sunucu durumu (`GET /api/skills`)
 * aylardır duruyor ve mobilde onu okuyan hiçbir şey yoktu (web
 * `syncSkillProgress` ile okuyor).
 *
 * Birleştirme TEK YÖNLÜ değil: sunucudan gelenler yerele ekleniyor, yerelde
 * olup sunucuda olmayanlar (çevrimdışı bitirilmiş) korunuyor.
 */
/**
 * Çevrimdışı bitirilen alıştırmaları sunucuya gönderir (`PUT /api/skills`).
 *
 * YALNIZ BECERİLER SEKMESİ BOŞALTIYORDU (2026-10-06): kuyruk `syncItemProgress`
 * içindeydi ve onu yalnız Beceriler odakta çağırıyordu; Gelişim ve Patika kuyruğu
 * hiç göndermiyordu, yani sunucu (ve Gelişim'in "Sıradaki"si) kullanıcı Beceriler'i
 * açana dek tamamlanmayı görmüyordu. Artık Gelişim ve Patika da yeniliyor.
 * Sunucu yeni kaydı deneme olarak işliyor; yeniden gönderim zararsız.
 */
export async function flushPendingItems(): Promise<void> {
  const bekleyen = Object.values(await getPending());
  if (!bekleyen.length) return;
  await api("/api/skills", { method: "PUT", body: JSON.stringify({ records: bekleyen.slice(0, 200) }) });
  pendingCache = {};
  try { await AsyncStorage.removeItem(PENDING_KEY); } catch { /* yut */ }
}

export async function syncItemProgress(level?: string): Promise<void> {
  try {
    await flushPendingItems();
    const r = await api<{ progress?: Record<string, { correct: number; total: number; attempts?: number; lastScore: number | null; lastAt: string }> }>(
      `/api/skills${level ? `?level=${encodeURIComponent(level)}` : ""}`,
    );
    const progress = r?.progress;
    if (!progress) return;
    /* Önceki sonuç ayrıntısı her eşitlemede sunucudan (otorite). */
    const results = { ...(await getItemResults()) };
    for (const [id, v] of Object.entries(progress)) {
      const best = v.total > 0 ? scoreOf(v.correct, v.total) : 0;
      const last = v.lastScore ?? best;
      results[id] = { pct: last, best: Math.max(best, last), attempts: v.attempts ?? 1, at: v.lastAt ?? null };
    }
    await saveItemResults(results);
    const s = await getDoneItems();
    const scores = await getItemScores();
    let degisti = false;
    for (const [id, v] of Object.entries(progress)) {
      const puan = v.lastScore ?? (v.total > 0 ? scoreOf(v.correct, v.total) : null);
      /* SATIRIN VARLIGI "BITTI" DEMEK DEGIL. Once her satir kumeye
         katiliyordu: %10 alan bir egzersiz Beceriler listesinde yesil onayli,
         "3/5 tamamlandi" sayacinda ve Patika'nin beceri yuvasinda bitmis
         goruunuyordu - web ve sunucu ise ayni egzersizi hala "siradaki"
         sayiyor (esik `SKILL_DONE_PCT`, sahibi sunucu). Eksik puan bir
         karar degil bir bilgisizlik: o satira dokunulmuyor. */
      if (puan === null) continue;
      const bitti = isSkillDone(puan);
      if (bitti && !s.has(id)) { s.add(id); degisti = true; }
      /* Sunucu otorite: yerelde bitmis isaretli ama puani yetmeyen egzersiz
         (cevrimdisi bitirilip yukari tasinmis bir deneme) isareti kaybediyor. */
      if (!bitti && s.has(id)) { s.delete(id); degisti = true; }
      if (scores[id] !== puan) { scores[id] = puan; degisti = true; }
    }
    if (!degisti) return;
    scoreCache = scores;
    try { await AsyncStorage.setItem(KEY, JSON.stringify([...s])); } catch { /* yut */ }
    try { await AsyncStorage.setItem(SCORE_KEY, JSON.stringify(scores)); } catch { /* yut */ }
  } catch { /* çevrimdışı: yerel küme yeterli */ }
}

/**
 * ÇEVRİMDIŞI BİTİRİLEN KONUŞMA.
 *
 * Konuşma bitince sonuç `/api/conversation`a yazılıyor; ağ yoksa istek düşüyor ve bir
 * daha DENENMİYORDU. Yerel işaret (`markItemDone`) Patika'yı bitmiş
 * gösteriyor ama sunucu konuşmayı hiç öğrenmiyor: XP verilmiyor, aralıklı tekrar
 * merdiveni kurulmuyor, kullanıcı cihaz değiştirince konuşma geri geliyor.
 * Beceri egzersizlerinde aynı boşluk kuyrukla kapandı (`queueItemRecord`);
 * konuşma da aynı yolu izliyor.
 *
 * `day` KAYITLA BİRLİKTE saklanıyor: seri kullanıcının O gününe ait, ertesi
 * gün gönderilen konuşmayı bugüne yazmak seriyi yanlış hesaplardı.
 *
 * `finishId` de öyle: bitirişin kimliği. `ConversationScreen`in anlık yeniden
 * denemesi ve kuyruktan gönderim aynı kimlikle gidiyor; sunucu ilk isteği
 * işlemişse ikinciyi yazmıyor (`recordConversation`). Bu değişiklikten önce
 * kuyruğa girmiş kayıtta yok; sunucu kimliksiz isteği eskisi gibi işliyor.
 */
const CONVERSATION_KEY = "lernomi-conversations-pending";
export type PendingConversation = { conversationId: string; correct: number; chatDone: boolean; day: string; seconds: number; finishId?: string };

/**
 * Bir bitirişin kimliği (idempotency anahtarı): bitirişte BİR KEZ üretiliyor,
 * yeniden deneme ve kuyruk aynısını gönderiyor. Web `conversation-queue` aynı
 * gövdeyle; sunucu biçimi `isFinishId` (8-64, harf/rakam/-/_). Hermes'te
 * `crypto.randomUUID` olmayabilir: zaman + rastgele parça yedeği yeterli, kimlik
 * yalnız aynı kullanıcının aynı konuşmasındaki son bitirişle karşılaştırılıyor.
 */
export function newFinishId(): string {
  const c = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto;
  if (typeof c?.randomUUID === "function") return c.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
}

export async function queueConversationResult(item: PendingConversation): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(CONVERSATION_KEY);
    const list = raw ? (JSON.parse(raw) as PendingConversation[]) : [];
    /* Aynı konuşma iki kez bitirilmişse sonuncusu kalıyor: uç en iyi denemeyi
       tutuyor ama iki kayıt göndermenin de bir faydası yok. */
    const kalan = list.filter((x) => x.conversationId !== item.conversationId);
    kalan.push(item);
    await AsyncStorage.setItem(CONVERSATION_KEY, JSON.stringify(kalan.slice(-20)));
  } catch { /* depolama yoksa yapacak bir şey yok */ }
}

/**
 * Sunucu bu kaydı bir daha kabul etmeyecek mi (4xx) — kuyrukta tutmak her
 * boşaltmada aynı isteği tekrarlar ve arkasındakileri de bekletirdi. Web
 * `conversation-queue` 4xx'i aynı biçimde düşürüyor. İstisnalar geçici: oturum
 * yok (401, ör. yedek tabanda henüz girilmemiş), zaman aşımı (408), tavan (429).
 */
function kaliciRet(e: unknown): boolean {
  return e instanceof ApiError && e.status >= 400 && e.status < 500 && e.status !== 401 && e.status !== 408 && e.status !== 429;
}

let konusmaBosaltiliyor: Promise<number> | null = null;

/**
 * Bekleyen konuşma sonuçlarını gönderir; biri düşerse kalanı kuyrukta bırakır.
 * Gönderilen kayıt sayısını döndürür.
 *
 * NE ZAMAN: uygulama açılışında (`App.tsx`) ve PATİKA HER YÜKLENİRKEN, isteğin
 * ÖNÜNDE (`useLearningPath`). Yalnız açılışta boşaltılıyordu: tek bir ağ
 * hıçkırığında kuyruğa düşen konuşma, uygulama yeniden başlatılana kadar
 * sunucuya gitmiyordu ve Patika adımı "0/13 · Şimdi" gösterirken Konuşma hakkı
 * (ilk sohbet turunda düşüyor) harcanmış görünüyordu (iOS, 2026-09-28).
 *
 * Aynı anda iki boşaltma aynı kaydı iki kez göndermesin diye tek uçuş.
 */
export function flushPendingConversations(): Promise<number> {
  if (!konusmaBosaltiliyor) konusmaBosaltiliyor = konusmalariBosalt().finally(() => { konusmaBosaltiliyor = null; });
  return konusmaBosaltiliyor;
}

async function konusmalariBosalt(): Promise<number> {
  let list: PendingConversation[] = [];
  try {
    const raw = await AsyncStorage.getItem(CONVERSATION_KEY);
    list = raw ? (JSON.parse(raw) as PendingConversation[]) : [];
  } catch { return 0; }
  if (!list.length) return 0;
  const kalan: PendingConversation[] = [];
  let giden = 0;
  for (const [i, item] of list.entries()) {
    try {
      /* `finishId` taşıyan kayıt tekrarı zararsız (uç aynı bitirişi yeniden yazmıyor); eski kayıtta yok. */
      await api("/api/conversation", { method: "POST", body: JSON.stringify(item), replay: Boolean(item.finishId) });
      giden++;
    } catch (e) {
      if (kaliciRet(e)) continue;
      kalan.push(...list.slice(i));
      break;
    }
  }
  try {
    /* Boşaltma sürerken yeni bir sonuç kuyruğa girmiş olabilir: yazmadan önce
       güncel liste okunuyor, gönderilen kayıtlar ondan düşülüyor. */
    const raw = await AsyncStorage.getItem(CONVERSATION_KEY);
    const simdiki = raw ? (JSON.parse(raw) as PendingConversation[]) : [];
    const islenen = new Set(list.filter((x) => !kalan.includes(x)).map((x) => JSON.stringify(x)));
    const yeni = simdiki.filter((x) => !islenen.has(JSON.stringify(x)));
    if (yeni.length) await AsyncStorage.setItem(CONVERSATION_KEY, JSON.stringify(yeni));
    else await AsyncStorage.removeItem(CONVERSATION_KEY);
  } catch { /* yut */ }
  return giden;
}

/**
 * PATİKA PRATİK ADIMI — dil bilgisi, tekrar, ünite quizi.
 *
 * Bu adımların sonucu hiçbir yere yazılmıyordu; yalnız cihazda bir işaret
 * (`markItemDone`) vardı ve sunucu patikası onu hiç görmüyordu. Adım bitince
 * `POST /api/immersion/item`; ağ yoksa kuyruğa, uygulama açılışında
 * `flushPendingPathItems` gönderiyor (konuşmalarla aynı yol).
 */
const PATH_ITEM_KEY = "lernomi-path-items-pending";
export type PendingPathItem = { itemId: string; correct: number; total: number };

export async function recordPathItem(item: PendingPathItem): Promise<void> {
  try {
    await api("/api/immersion/item", { method: "POST", body: JSON.stringify(item) });
  } catch {
    try {
      const raw = await AsyncStorage.getItem(PATH_ITEM_KEY);
      const list = raw ? (JSON.parse(raw) as PendingPathItem[]) : [];
      /* Aynı adımın yalnız son denemesi bekliyor: sunucu en iyi puanı zaten tutuyor. */
      const kalan = list.filter((x) => x.itemId !== item.itemId);
      kalan.push(item);
      await AsyncStorage.setItem(PATH_ITEM_KEY, JSON.stringify(kalan.slice(-40)));
    } catch { /* depolama yoksa yapacak bir şey yok */ }
  }
}

let adimBosaltiliyor: Promise<number> | null = null;

/**
 * Bekleyen pratik adım sonuçlarını gönderir; biri düşerse kalanı kuyrukta bırakır.
 * Konuşma kuyruğuyla aynı kurallar: Patika yüklenirken de boşaltılıyor, tek
 * uçuş, kalıcı ret (4xx) düşürülüyor. Gönderilen kayıt sayısını döndürür.
 */
export function flushPendingPathItems(): Promise<number> {
  if (!adimBosaltiliyor) adimBosaltiliyor = adimlariBosalt().finally(() => { adimBosaltiliyor = null; });
  return adimBosaltiliyor;
}

async function adimlariBosalt(): Promise<number> {
  let list: PendingPathItem[] = [];
  try {
    const raw = await AsyncStorage.getItem(PATH_ITEM_KEY);
    list = raw ? (JSON.parse(raw) as PendingPathItem[]) : [];
  } catch { return 0; }
  if (!list.length) return 0;
  const kalan: PendingPathItem[] = [];
  let giden = 0;
  for (const [i, item] of list.entries()) {
    try {
      await api("/api/immersion/item", { method: "POST", body: JSON.stringify(item) });
      giden++;
    } catch (e) {
      if (kaliciRet(e)) continue;
      kalan.push(...list.slice(i));
      break;
    }
  }
  try {
    const raw = await AsyncStorage.getItem(PATH_ITEM_KEY);
    const simdiki = raw ? (JSON.parse(raw) as PendingPathItem[]) : [];
    const islenen = new Set(list.filter((x) => !kalan.includes(x)).map((x) => JSON.stringify(x)));
    const yeni = simdiki.filter((x) => !islenen.has(JSON.stringify(x)));
    if (yeni.length) await AsyncStorage.setItem(PATH_ITEM_KEY, JSON.stringify(yeni));
    else await AsyncStorage.removeItem(PATH_ITEM_KEY);
  } catch { /* yut */ }
  return giden;
}

/** Egzersiz bitince puanı da yerele yazılır (web `recordSkillResult` karşılığı). */
export async function recordItemScore(id: string, score: number): Promise<void> {
  const results = { ...(await getItemResults()) };
  const prev = results[id];
  results[id] = { pct: score, best: Math.max(prev?.best ?? 0, score), attempts: (prev?.attempts ?? 0) + 1, at: new Date().toISOString() };
  await saveItemResults(results);
  const scores = await getItemScores();
  if (scores[id] === score) return;
  scores[id] = score;
  scoreCache = scores;
  try { await AsyncStorage.setItem(SCORE_KEY, JSON.stringify(scores)); } catch { /* yut */ }
}

/**
 * Yarım kalan konuşmanın cihazda saklanması (web conversation-player RESUME_KEY karşılığı).
 * Anlatım uzun; ortasında çıkan öğrenci baştan başlamamalı. 3 günden eski kayıt
 * atılır.
 *
 * KONUŞMA FAZI DA SAKLANIYOR. Eskiden yalnız anlatım saklanıyordu ve konuşmaya
 * geçildiği AN kayıt siliniyordu: yirmi adımlık anlatımı bitirip konuşmanın
 * ortasında çıkan öğrenci konuşmayı sıfırdan başlıyordu, sunucuda da hiçbir kayıt
 * olmadığı için Patika adımı "denenmemiş" gösteriyordu. Web konuşmayı ve
 * turlarını baştan beri saklıyor.
 */
const RESUME_PREFIX = "lernomi-conversation-resume:";
const RESUME_TTL_MS = 3 * 86400000;

export type ConversationResume = {
  cursor: number;
  correct: number;
  at: number;
  /** Yoksa anlatım (eski kayıtlar). */
  phase?: "lecture" | "chat";
  /** Konuşma fazı: sohbetin kendisi, tur sayısı ve senaryo yolunun durumu. */
  roleMsgs?: { role: "user" | "assistant"; content: string }[];
  roleTurns?: number;
  offline?: unknown;
  /** Sohbette gelen düzeltmeler — `roleMsgs` temizlenmiş gövdeyi tuttuğu için
   *  oradan yeniden çıkarılamıyor (bkz. ConversationScreen `corrections`). */
  corrections?: string[];
};

export async function saveConversationResume(
  id: string,
  cursor: number,
  correct: number,
  extra?: Pick<ConversationResume, "phase" | "roleMsgs" | "roleTurns" | "offline" | "corrections">,
): Promise<void> {
  try {
    await AsyncStorage.setItem(RESUME_PREFIX + id, JSON.stringify({ cursor, correct, at: Date.now(), ...extra }));
  } catch { /* yut */ }
}

export async function loadConversationResume(id: string): Promise<ConversationResume | null> {
  try {
    const raw = await AsyncStorage.getItem(RESUME_PREFIX + id);
    if (!raw) return null;
    const v = JSON.parse(raw) as ConversationResume;
    if (!v || typeof v.cursor !== "number" || typeof v.at !== "number") return null;
    if (Date.now() - v.at > RESUME_TTL_MS) return null;
    if (v.phase === "chat") return Array.isArray(v.roleMsgs) && v.roleMsgs.length ? v : null;
    if (v.cursor <= 0) return null;
    return v;
  } catch {
    return null;
  }
}

/**
 * Süresi geçmiş yarım konuşmaları siler.
 *
 * `loadConversationResume` üç günden eski kaydı yok sayıyor ama silmiyordu: dönülmeyen
 * her konuşma cihazda süresiz kalıyordu. Kayıt sohbet fazında konuşmanın
 * kendisini (`roleMsgs`, kullanıcının yazdıkları) taşıyor; sunucu aynı
 * konuşmayı 30 günde siliyor (gizlilik politikası §9), cihazdaki kopya hiç
 * gitmiyordu. Açılışta bir kez çağrılıyor.
 */
export async function pruneConversationResumes(): Promise<void> {
  try {
    const keys = (await AsyncStorage.getAllKeys()).filter((k) => k.startsWith(RESUME_PREFIX));
    if (!keys.length) return;
    const values = await AsyncStorage.getMany(keys);
    const stale = keys.filter((k) => {
      try {
        const at = Number((JSON.parse(values[k] ?? "null") as { at?: unknown } | null)?.at) || 0;
        return Date.now() - at > RESUME_TTL_MS;
      } catch {
        return true; // bozuk kayıt okunamıyor
      }
    });
    if (stale.length) await AsyncStorage.removeMany(stale);
  } catch { /* yut */ }
}

export async function clearConversationResume(id: string): Promise<void> {
  try { await AsyncStorage.removeItem(RESUME_PREFIX + id); } catch { /* yut */ }
}
