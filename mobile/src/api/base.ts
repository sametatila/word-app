import AsyncStorage from "@react-native-async-storage/async-storage";
import { diagnoseNetwork, type NetworkDiagnosis } from "../lib/reachability";

/**
 * API TABANI: asıl adres mi, yedek adres mi?
 *
 * Bazı kurum ağları (ör. TU Dortmund Wi-Fi) www.lernomi.app'e giden bağlantıyı
 * SNI'ya bakıp sıfırlıyor: alan adı yeni (2026-09-04) ve "yeni alan adı"
 * filtresine takılıyor. Aynı uygulama aynı sunucuda ikinci bir adreste de
 * servis ediliyor (sunucu `lib/site` FALLBACK_ORIGIN): rumpuskit.com daha eski
 * ve bu filtrelere takılmıyor.
 *
 * KURAL (`decideFailover`, saf ve testli):
 *  - İstek o anki tabana AĞ HATASI aldıysa (bkz. api/client `send`) teşhis
 *    yapılıyor (lib/reachability). İnternet yoksa hiçbir şey değişmiyor.
 *  - Aynı anda iki taban da yoklanıyor (`/api/config`, kısa zaman aşımı).
 *    Düşen taban cevap veriyorsa hıçkırıktı, kalınıyor; düşen ölü, öteki
 *    diriyse ötekine geçiliyor. İkisi de ölüyse kalınıyor ("engelli" notu).
 *  - Yedeğe geçiş cihaza yazılıyor ve 24 saat geçerli: aynı ağda her açılışta
 *    önce asıl adresin sıfırlanmasını beklemek gerekmiyor.
 *  - Yedekteyken asıl adres periyodik olarak (ön plana dönüş, en sık dakikada
 *    bir) yeniden yoklanıyor; açıldıysa geri dönülüyor ve kayıt siliniyor.
 *
 * ÇEREZ TABAN BAŞINA AYRI. Oturum çerezi host'a bağlı (sunucu Domain
 * özniteliği yazmıyor), yani yedeğe geçen gerçek hesap orada oturumsuz; bunu
 * `AuthContext` kullanıcıya söylüyor. Misafir jetonla kendini geri kuruyor.
 * Uygulamanın KENDİ saklama anahtarları tabana göre bölünmüyor.
 *
 * NE ASIL ADRESTE KALIYOR: paylaşım/davet bağlantıları, e-postalar, OAuth
 * geri dönüşleri (Android Apple tarayıcı akışı), derin bağlantı alan adları.
 * Bunlar `PRIMARY_BASE`i doğrudan kullanıyor.
 */
export const PRIMARY_BASE = "https://www.lernomi.app";
export const FALLBACK_BASE = "https://lernomi.rumpuskit.com";
export type Base = typeof PRIMARY_BASE | typeof FALLBACK_BASE;
export const BASES: readonly Base[] = [PRIMARY_BASE, FALLBACK_BASE];

/** Yedek seçimi cihazda bu kadar geçerli; sonra açılış yine asıl adresten. */
export const STICKY_MS = 24 * 60 * 60_000;
/** Yedekteyken asıl adres en sık bu aralıkla yoklanır. */
export const RECHECK_MIN_MS = 60_000;
/** Yoklama ikisini de ölü bulduysa bu süre yeniden yoklanmaz (her istek ağı yormasın). */
export const FAILOVER_COOLDOWN_MS = 30_000;
export const BASE_PROBE_TIMEOUT_MS = 4000;
export const BASE_STORAGE_KEY = "lernomi:api-base";

export type SavedBase = { base: Base; at: number } | null;

/* ---------------- saf kararlar ---------------- */

export function otherBase(b: Base): Base {
  return b === PRIMARY_BASE ? FALLBACK_BASE : PRIMARY_BASE;
}

export function parseSaved(raw: string | null | undefined): SavedBase {
  if (!raw) return null;
  try {
    const o = JSON.parse(raw) as { base?: unknown; at?: unknown };
    if ((o.base === PRIMARY_BASE || o.base === FALLBACK_BASE) && typeof o.at === "number" && Number.isFinite(o.at)) {
      return { base: o.base, at: o.at };
    }
  } catch { /* bozuk kayıt: yok say */ }
  return null;
}

/** Açılışta hangi tabanla başlanır. Gelecekteki damga (saat oynatılmış) geçersiz. */
export function initialBase(saved: SavedBase, now: number): Base {
  if (saved?.base === FALLBACK_BASE && now >= saved.at && now - saved.at < STICKY_MS) return FALLBACK_BASE;
  return PRIMARY_BASE;
}

export type FailoverInput = {
  diagnosis: NetworkDiagnosis;
  /** Hatayı veren taban yoklamaya cevap verdi mi. */
  failedAlive: boolean;
  /** Öteki taban yoklamaya cevap verdi mi. */
  otherAlive: boolean;
};

/**
 * Ağ hatasından sonra ne yapılır.
 *  - "offline": internet yok; taban değişmez, çağıran "bağlantı yok" der.
 *  - "switch": öteki tabana geç (düşen ölü, öteki diri).
 *  - "stay": düşen taban aslında cevap veriyor (geçici hata) ya da ikisi de
 *    ölü (engelli ağ); taban değişmez.
 *
 * Öteki tabanın yoklamayı geçmesi (JSON cevap) internetin açık olduğunu zaten
 * kanıtlıyor; teşhis "unknown" (karışık) olsa da geçmek güvenli.
 */
export function decideFailover(i: FailoverInput): "offline" | "switch" | "stay" {
  if (i.diagnosis === "offline" && !i.otherAlive) return "offline";
  if (i.failedAlive) return "stay";
  return i.otherAlive ? "switch" : "stay";
}

/** Yedekteyken asıl adres yoklandı: geri dönülür mü. */
export function decideRecheck(current: Base, primaryAlive: boolean): Base {
  return current === FALLBACK_BASE && primaryAlive ? PRIMARY_BASE : current;
}

/**
 * Adres bizim tabanlardan birinde mi; öyleyse hangisi.
 *
 * `URL` ile ayrıştırılmıyor: RN'in `URL`i `https://saldirgan.com/@www.lernomi.app/`
 * gibi adreslerde ana makineyi yanlış okuyor. Kesin önek ve sondaki "/" bu
 * tuzağa düşmüyor (`www.lernomi.app.saldirgan.com` da geçmiyor).
 */
export function ownBaseOf(url: string): Base | null {
  for (const b of BASES) {
    if (url === b || url.startsWith(`${b}/`) || url.startsWith(`${b}?`)) return b;
  }
  return null;
}

/** Bizim tabanlardan birindeki adresi `to` tabanına taşır; değilse aynen döner. */
export function rebaseUrl(url: string, to: Base): string {
  const from = ownBaseOf(url);
  return from && from !== to ? to + url.slice(from.length) : url;
}

/* ---------------- çalışma zamanı durumu ---------------- */

let current: Base = PRIMARY_BASE;
let loaded: Promise<void> | null = null;
/**
 * `initial`: kayıtlı seçim açılışta okundu (kullanıcının gördüğü bir değişiklik
 * değil). Native izinli host ve WebView'ler bunu da bilmeli; oturum akışı
 * (AuthContext) ise yok sayıyor, açılış oturumu zaten o tabandan okunuyor.
 */
type Listener = (next: Base, prev: Base, initial: boolean) => void;
const listeners = new Set<Listener>();
let failoverInflight: Promise<Base | null> | null = null;
let lastDeadEnd = 0;
let lastRecheck = 0;

/** O anki taban. Senkron: adres kuran her yer bunu çağırır (sabit değil). */
export function apiBase(): Base {
  return current;
}

export function onBaseChange(fn: Listener): () => void {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

async function persist(next: Base): Promise<void> {
  try {
    if (next === FALLBACK_BASE) await AsyncStorage.setItem(BASE_STORAGE_KEY, JSON.stringify({ base: next, at: Date.now() }));
    else await AsyncStorage.removeItem(BASE_STORAGE_KEY);
  } catch { /* depolama kapalıysa yalnız bu süreç */ }
}

function setCurrent(next: Base, save: boolean, initial = false): void {
  if (next === current) return;
  const prev = current;
  current = next;
  if (save) void persist(next);
  for (const fn of [...listeners]) {
    try { fn(next, prev, initial); } catch { /* dinleyici hatası tabanı bozmasın */ }
  }
}

/**
 * Kayıtlı seçimi bir kez okur. İstemci ilk istekten önce bekliyor (bkz.
 * api/client `send`); ikinci çağrı aynı sözü döndürüyor.
 */
export function baseReady(): Promise<void> {
  if (!loaded) {
    loaded = (async () => {
      try {
        const b = initialBase(parseSaved(await AsyncStorage.getItem(BASE_STORAGE_KEY)), Date.now());
        setCurrent(b, false, true);
      } catch { /* asıl adresle devam */ }
    })();
  }
  return loaded;
}

/**
 * Taban cevap veriyor mu: `/api/config` 2xx VE JSON nesnesi. Esir portal
 * (otel/kafe ağı) 200 ile HTML giriş sayfası döndürüyor; o "diri" sayılmıyor.
 */
export async function probeBase(base: Base): Promise<boolean> {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), BASE_PROBE_TIMEOUT_MS);
  try {
    const res = await fetch(`${base}/api/config`, {
      headers: { accept: "application/json" },
      signal: ctl.signal as RequestInit["signal"],
    });
    if (!res.ok) return false;
    const j = (await res.json().catch(() => null)) as unknown;
    return typeof j === "object" && j !== null;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * `failed` tabanına ağ hatası alındı: gerekirse öteki tabana geçer.
 * Dönen değer: yeniden denemek için KULLANILACAK taban (değiştiyse), yoksa null.
 * Aynı anda gelen hatalar tek yoklamayı paylaşıyor; hiçbir zaman fırlatmaz.
 */
export function failover(failed: Base): Promise<Base | null> {
  if (failed !== current) return Promise.resolve(current); // başka bir istek zaten geçirdi
  if (failoverInflight) return failoverInflight;
  if (Date.now() - lastDeadEnd < FAILOVER_COOLDOWN_MS) return Promise.resolve(null);
  failoverInflight = (async () => {
    try {
      const other = otherBase(failed);
      const [diagnosis, failedAlive, otherAlive] = await Promise.all([diagnoseNetwork(), probeBase(failed), probeBase(other)]);
      const d = decideFailover({ diagnosis, failedAlive, otherAlive });
      if (d === "switch" && current === failed) {
        setCurrent(other, true);
        return other;
      }
      if (d !== "switch" && !failedAlive) lastDeadEnd = Date.now();
      return null;
    } catch {
      return null;
    } finally {
      failoverInflight = null;
    }
  })();
  return failoverInflight;
}

/**
 * Yedekteyken asıl adres açıldı mı (ön plana dönüşte çağrılır). Açıldıysa geri
 * dönülür; açılmadıysa yedek kaydı tazelenir (aynı ağda yarın da yedekten
 * başlansın). `force` aralık sınırını atlar.
 */
export async function recheckPrimary(force = false): Promise<Base> {
  await baseReady();
  if (current !== FALLBACK_BASE) return current;
  const now = Date.now();
  if (!force && now - lastRecheck < RECHECK_MIN_MS) return current;
  lastRecheck = now;
  const alive = await probeBase(PRIMARY_BASE);
  const next = decideRecheck(current, alive);
  if (next !== current) setCurrent(next, true);
  else void persist(current);
  return current;
}

/** Yalnız testler için. */
export function resetBaseState(): void {
  current = PRIMARY_BASE;
  loaded = null;
  listeners.clear();
  failoverInflight = null;
  lastDeadEnd = 0;
  lastRecheck = 0;
}
